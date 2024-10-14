import { Movie } from "../PGmodels/Movie/Movie.js";
import { Crew } from "../PGmodels/MovieDetail/Crew.js";
import { Cast } from "../PGmodels/MovieDetail/Cast.js";
import { MovieLanguage } from "../PGmodels/Movie/Movielanguage.js";
import { MovieCast } from "../PGmodels/Movie/MovieCast.js";
import { MovieCrew } from "../PGmodels/Movie/MovieCrew.js";
import { Op } from "sequelize";

export class AdminMovieService {
  async addMovietoDb(moviedata: any) {
    try {
      const existingmovie = await Movie.findOne({
        where: {
          title: moviedata.title,
        },
      });
      if (existingmovie) {
        return "movie with this name already exist";
      }
      const movie = await Movie.create({ ...moviedata });
      return movie ? movie.toJSON() : null;
    } catch (error) {
      console.log(error);
      throw new Error("error creating movie");
    }
  }

  async addMovieCrews(crewdata: any) {
    try {
      const existingcrew = await Crew.findOne({
        where: {
          name: crewdata.name,
        },
      });
      if (existingcrew) {
        return "this crew alrady adedd";
      }
      const crew = await Crew.create({ ...crewdata });
      return crew ? crew.toJSON() : null;
    } catch (error) {
      console.log(error);
      throw new Error("error creating crew");
    }
  }

  async geAlltCrew() {
    try {
      const crews = await Crew.findAll();
      return crews;
    } catch (error) {
      console.log(error);
      throw new Error("error in getting crew data");
    }
  }

  async searchCrews(crewname: string) {
    try {
      const crews = await Crew.findAll({
        where: {
          name: {
            [Op.iLike]: `%${crewname}%`,
          },
        },
      });
      return crews;
    } catch (error) {
      console.log(error);
      throw new Error("error searching crew");
    }
  }

  async addMovieCast(castdata: any) {
    try {
      const existingcast = await Cast.findOne({
        where: {
          name: castdata.name,
        },
      });
      if (existingcast) {
        return "this cast alrady adedd";
      }
      const casts = await Cast.create({ ...castdata });
      return casts ? casts.toJSON() : null;
    } catch (error) {
      console.log(error);
      throw new Error("error creating casts data");
    }
  }

  async getAllCasts() {
    try {
      const allcasts = Cast.findAll();
      return allcasts;
    } catch (error) {
      console.log(error);
      throw new Error("error getting all casts");
    }
  }

  async searchCasts(castname: string) {
    try {
      const casts = await Cast.findAll({
        where: {
          name: {
            [Op.iLike]: `%${castname}%`,
          },
        },
      });
      return casts;
    } catch (error) {
      console.log(error);
      throw new Error("error searching casts");
    }
  }

  async addMovielanguage(languagedata: any) {
    try {
      for (let i = 0; i < languagedata.length; i++) {
        await MovieLanguage.create({
          movieId: languagedata[i].movieId,
          language: languagedata[i].language,
        });
      }
      return { message: "movie language created" };
    } catch (error) {
      console.log(error);
      throw new Error("error creating movie language");
    }
  }

  async addCastToMovie(moviecastdata: any) {
    try {
      for (let i = 0; i < moviecastdata.length; i++) {
        await MovieCast.create({
          movieId: moviecastdata[i].movieId,
          castId: moviecastdata[i].castId,
        });
      }
      return { message: "cast adedd to the movie" };
    } catch (error) {
      console.log(error);
      throw new Error("error adding cast to the movie");
    }
  }

  async addCrewToMovie(moviescrewdata: any) {
    try {
      for (let i = 0; i < moviescrewdata.length; i++) {
        await MovieCrew.create({
          crewId: moviescrewdata[i].crewId,
          movieId: moviescrewdata[i].movieId,
        });
      }
      return { message: "crews adedd to the movie" };
    } catch (error) {
      console.log(error);
      throw new Error("error adding crew to the movie");
    }
  }
}
