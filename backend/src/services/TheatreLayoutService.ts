//import { Request, Response } from "express";
import { GetTheatreLayoutService } from "./GetTheatrelayout.js";
import { SeatStatusService } from "./SeatStatusService.js";

export class TheatreLayoutService {
  async getTheatreLayoutWithSeatStatus(showtimeId: any, screenId: any) {
    try {
      const layoutService = new GetTheatreLayoutService();
      const seatStatusService = new SeatStatusService();

      const { layout } = await layoutService.getLayoutByShowtimeId(showtimeId, screenId);

      if (!layout) {
        throw new Error("layout not found");
      }

      const seatStatuses = await seatStatusService.getSeatStatusesByShowtimeId(
        showtimeId
      );

      const updatedLayout = JSON.parse(JSON.stringify(layout.seatArrangement));

      seatStatuses.forEach((item) => {
        const { seatRow, seatNumber, status } = item;

        updatedLayout.divisions.forEach((division: { rows: any[]; }) => {
          division.rows.forEach((row: { seats: any[]; seatRow: any; }) => {
            row.seats.forEach((seat: { seatNumber: any; status: string; }) => {
              if (seat.seatNumber === seatNumber && row.seatRow === seatRow) {
                seat.status = status;
              } 
            });
          });
        });
      });

      return updatedLayout;
    } catch (error) {
      console.error("Error fetching theatre layout and seat statuses:", error);
      throw new Error("Failed to fetch theatre layout and seat statuses");
    }
  }
}
