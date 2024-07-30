import SeatingArrangement from "../models/Seatingarrangement.js";

interface SeatConfiguration {
  seat_type: string;
  rows: number;
  seats_per_row: number;
  price: number;
}

export class SeatingArrangementService {
  async createSeatingArrangement(cinema_hall_id: string, seatConfigurations: SeatConfiguration[]) {
    const seats = this.generateSeats(seatConfigurations);
    const seatingArrangementData = { cinema_hall_id, seats };

    try {
      const seatingArrangement = new SeatingArrangement(seatingArrangementData);
      await seatingArrangement.save();
      return seatingArrangement.toJSON();
    } catch (error) {
      console.error("Error creating seating arrangement:", error);
      throw new Error("Failed to create seating arrangement");
    }
  }

  generateSeats(configurations: SeatConfiguration[]): any[] {
    let seats = [];
    let seatNumber = 1;

    configurations.forEach(config => {
      for (let row = 1; row <= config.rows; row++) {
        for (let col = 1; col <= config.seats_per_row; col++) {
          seats.push({
            seat_number: `S${seatNumber}`,
            seat_type: config.seat_type,
            row: row,
            column: col,
            price: config.price,
          });
          seatNumber++;
        }
      }
    });

    return seats;
  }
}
