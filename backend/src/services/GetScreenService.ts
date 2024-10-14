import { Screen } from '../PGmodels/Theatorscreens/Screen.js';
import { CinemaHall } from "../PGmodels/CinemaHall/Cinemahall.js";

export class GetScreenService {
    async getscreen(cinemaHallId: any){
        const cinemahall = await CinemaHall.findByPk(cinemaHallId);
        if(!cinemahall){
            throw new Error("there is no any cinemahall");
        }
        const screen = await Screen.findAll({
            where: {
                cinemaHallId: cinemaHallId,
            }
        });
        if(!screen){
            throw new Error("screen not found");
        }
        return screen;
    }
}