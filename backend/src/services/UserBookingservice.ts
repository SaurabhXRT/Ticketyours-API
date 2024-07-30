import Booking from "../models/Booking.js";
import ShowtimeSlot from "../models/Showtime_slot.js";
import { UserService } from "./UserService.js";
import { ShowtimeSlotService } from "./ShowtimeService.js";
import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import UserBooking from "../models/Booking.user.js"; 

const showtimeService = new ShowtimeSlotService();

class BookingService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  private updateSeatStatus(showtime: any, seatNumbers: string[]) {
    seatNumbers.forEach((seatNumber) => {
      const seat = showtime.seats.find((seat: any) => seat.seat_number === seatNumber);
      if (seat && seat.status === "available") {
        seat.status = "booked";
        seat.locked_until = undefined;
      } else {
        throw new Error(`Seat ${seatNumber} is not available`);
      }
    });
  }

  async saveUserBooking(booking: any, showtime: any, userId: any) {
    // Fetch movie details
    const movieDetails = await showtimeService.getMovieDetailsByShowtimeId(showtime._id);
    const cinemaHallDetails = await showtimeService.getCinemaDetailsByShowtimeId(showtime._id);

    // Create user booking
    const userBooking = new UserBooking({
      user_id: userId,
      cinema_hall_name: cinemaHallDetails.name,
      movie_title: movieDetails.title,
      seat_numbers: booking.seats,
      showtime: showtime.start_time,
      booking_date: booking.booking_date,
      total_price: booking.amount_paid,
    });

    await userBooking.save();
  }

  async bookSeats(showtimeId: string, seatNumbers: string[], userId: string, paymentId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Fetch the showtime with session
      const showtime = await ShowtimeSlot.findById(showtimeId).session(session);
      if (!showtime) {
        throw new Error("Showtime not found");
      }

      // Update seat status
      this.updateSeatStatus(showtime, seatNumbers);

      // Fetch or create user
      // let userData = await this.userService.get(user.phone);
      // if (!userData) {
      //   userData = await this.userService.create({
      //     phone: user.phone,
      //     email: user.email
      //   });
      // }

      // Fetch movie ID from showtime
      const movieId = showtime.movie_id;

      // Get payment details with session
      const payment = await Payment.findById(paymentId).session(session);
      if (!payment) {
        throw new Error("Payment not found");
      }

      // Calculate total amount paid
      const amountPaid = seatNumbers.length * showtime.seats.find((seat: { seat_number: string }) => seat.seat_number === seatNumbers[0]).price;

      // Create booking
      const booking = new Booking({
        user_id: userId,
        movie_id: movieId,
        showtime_id: showtimeId,
        booking_date: new Date(),
        seats: seatNumbers,
        amount_paid: amountPaid,
        payment_id: payment._id,
        ticket_id: new mongoose.Types.ObjectId().toString(),
      });

      await booking.save({ session });
      await showtime.save({ session });

      // Save user booking details
      await this.saveUserBooking(booking, showtime, userId);

      await session.commitTransaction();
      return booking;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default BookingService;
