import ShowtimeSlot from "../models/Showtime_slot.js";
import CinemaHall from "../models/cinema_hall/CinemaHall.js";
//import Movie from "../models/movie/Movie";
import MovieInCinemaHall from "../models/Moviemodel.js";
import SeatingArrangement from "../models/Seatingarrangement.js";

interface Seat {
  seat_number: string;
  seat_type: string;
  price: number;
  status: "available" | "booked" | "locked";
  locked_until?: Date;
}

export class ShowtimeSlotService {
  async createShowtimeSlot(
    operatorId: string,
    cinemaHallId: string,
    movieId: string,
    date: Date,
    startTime: Date,
    endTime: Date,
  ) {
    const session = await ShowtimeSlot.startSession();
    session.startTransaction();

    try {
      // Check if the cinema hall exists and belongs to the operator
      const cinemaHall = await CinemaHall.findOne({
        _id: cinemaHallId,
        operator_id: operatorId,
      }).session(session);

      if (!cinemaHall) {
        throw new Error("Cinema hall not found or does not belong to the operator");
      }

      // Check if the movie exists
      const movie = await MovieInCinemaHall.findById(movieId).session(session);
      if (!movie) {
        throw new Error("Movie not found");
      }

      const seatingArrangement = await SeatingArrangement.findOne({
        cinema_hall_id: cinemaHallId,
      });

      if (!seatingArrangement) {
        throw new Error("Seating arrangement not found for the specified cinema hall");
      }

      // Clone the seats from the seating arrangement
      const seats = seatingArrangement.seats.map((seat) => ({
        seat_number: seat.seat_number,
        seat_type: seat.seat_type,
        price: seat.price,
        status: "available",
      }));

      // Create the showtime slot
      const newShowtimeSlot = new ShowtimeSlot({
        movie_id: movieId,
        cinema_hall_id: cinemaHallId,
        start_time: startTime,
        end_time: endTime,
        date: date,
        seats: seats,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await newShowtimeSlot.save({ session });

      
      await session.commitTransaction();
      return newShowtimeSlot.toJSON();
    } catch (error) {
      await session.abortTransaction();
      console.error("Error creating showtime slot:", error);
      throw new Error("Failed to create showtime slot");
    } finally {
      session.endSession();
    }
  }
}
