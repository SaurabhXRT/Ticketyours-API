import { AdminMovieService } from "../../services/Admin.MovieService.js";
const service = new AdminMovieService();

export const addMovietodbcontroller = async(req:any,res:any) => {
    const moviedata = {
        title: req.body.title,
        posterUrl: req.body.posterUrl,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        duration: req.body.duration,
        description: req.body.description
    } 
    if(!moviedata.description || !moviedata.duration || !moviedata.genre || !moviedata.posterUrl || !moviedata.releaseDate || !moviedata.title){
        return res.status(400).json({
            message: "all fields are required",
        })
    }
    try{
        const response = await service.addMovietoDb(moviedata);
        if(response === "movie with this name already exist"){
            return res.status(400).json({
                code: "addmovie/movie-alreadyexist",
                message: "movie with this name already exist"
            });
        }

        res.status(200).json({
            code: "addmovie/movie-adedd",
            message: "movie adedd to the database successfully",
            data: response,
        });

    } catch(error){
        console.log(error);
        if(error.message.includes("error creating movie")){
            return res.status(500).json({
                code: "addmovie/error-creating-movie",
                message: "error creating movie",
            })
        }
        res.status(500).json({
            code: "adminmovie/server-error",
            message: "internal server occured while creating movie",
        });
    }
}

export const addCasttothedb = async(req:any,res:any) => {
    const castdata = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
    }
    if(!castdata.name || !castdata.imageUrl){
        return res.status(400).json({
            message: "all fields are required",
        });
    }
    try {
        const response = await service.addMovieCast(castdata);
        if(response === "this cast alrady adedd"){
            return res.status(400).json({
                code: "addcast/cast-already-present",
                message: "this cast alrady adedd",
            });
        }
        res.status(200).json({
            code: "addcast/cast-adedd-successfully",
            message: "cast adedd to movie successfully",
            data: response,
        });

    } catch(error){
        console.log(error);
        if(error.message.includes("error creating casts data")){
            return res.status(500).json({
                code: "addcast/cast-notcreated",
                message: "error creating casts data",
            });
        }
        res.status(500).json({
            code: "addcast/server-error",
            message: "internal server error while creating cast"
        })
    }
}

export const addCrewstothedb = async(req:any,res:any) => {
    const crewdata = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
    }
    if(!crewdata.name || !crewdata.imageUrl){
        return res.status(400).json({
            message: "all fields are required",
        })
    }
    try {
        const response = await service.addMovieCrews(crewdata);
        if(response === "this crew alrady adedd"){
            return res.status(400).json({
                code: "addcrew/crew-already-present",
                message: "this crew alrady adedd",
            });
        }
        res.status(200).json({
            code: "addcrew/crew-adedd-successfully",
            message: "crew adedd to the movie successfully",
            data: response,
        });

    } catch(error){
        console.log(error);
        if(error.message.includes("error creating crew data")){
            return res.status(500).json({
                code: "addcrew/crew-notcreated",
                message: "error creating crews data",
            });
        }
        res.status(500).json({
            code: "addcrew/server-error",
            message: "internal server error while creating crew"
        });
    }
}

export const searchCast = async(req:any,res:any) => {
    const castname = req.query.castname;
    if(!castname){
        return res.status(400).json({
            message: "castname query required",
        });
    }
    try {
        const response = await service.searchCasts(castname);
        return res.status(200).json({
            code: "searchcast/searched-succesfully",
            message: "cast serached successfully",
            data: response,
        });
    }catch(error){
        console.log(error);
        return  res.status(500).json({
            code: "searchcast/internal-server-error",
            message: "internel server error occured while searching cast"
        })
    }
}

export const searchCrew = async(req:any,res:any) => {
    const crewname = req.query.crewname;
    if(!crewname){
        return res.status(400).json({
            message: "crewname required",
        });
    }
    try {
        const response = await service.searchCrews(crewname);
        return res.status(200).json({
            code: "searchcrew/crews-fetched-successfully",
            message: "crews have been searched successfully",
            data: response,
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            code: "searchcrew/interenal-server-error",
            message: "internal server error occurred while searching crew",
        });
    }
}

export const addcastToTheMovie = async(req:any,res:any) => {
    const data = req.body.moviecastdetails;
    if(!data){
        return res.status(400).json({
            message: "all fields are required",
        });
    }
    try {
        const response = await service.addCastToMovie(data);
        return res.status(200).json({
            code: "addcastmovie/successfully-adeddd",
            message: "cast adedd to the movie",
            data: response,
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            code: "addcastmovie/internal-server",
            message: "internel server errror occured",
        });

    }
}

export const addCrewToTheMovie = async(req:any , res:any) => {
    const data = req.body.moviecrewdetails;
    if(!data){
        return res.status(400).json({
            message: "crew details are required for the movie",
        });
    }
    try {
        const response = await service.addCrewToMovie(data);
        return res.status(200).json({
            code: "addcrew/adedd-successfullly",
            message: "crew adedd to the movie successfully",
            data: response,
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            code: "addcrew/internal-server-error",
            message: "internal server occured while adding the crew to the movie",
        })
    }
}

export const addlanguagesToTheMovie = async(req:any,res:any) => {
    const data = req.body.movielanguages;
    if(!data){
        return res.status(400).json({
            message: "languages field are required",
        });
    }
    try {
        const response = await service.addMovielanguage(data);
        return res.status(200).json({
            code: "addlanguage/language-adedd",
            message: "languagae adedd to the movie successfully",
            data: response,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            code: "addlanguage/internel-server-error",
            message: "internel server error occurrerd occured while adding language to the movie"
        });
    }
}