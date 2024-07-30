import mongoose from "mongoose";
import City from "../models/city/City.js";
import CityModel from "../models/city/City.model.js";

const seedCities = async (): Promise<void> => {
    const cities: { name: string, state: string }[] = [
        { name: 'Mumbai', state: 'Maharashtra' },
        { name: 'Delhi', state: 'Delhi' },
        { name: 'Bengaluru', state: 'Karnataka' },
        { name: 'Hyderabad', state: 'Telangana' },
        { name: 'Ahmedabad', state: 'Gujarat' },
        { name: 'Chennai', state: 'Tamil Nadu' },
        { name: 'Kolkata', state: 'West Bengal' },
        { name: 'Surat', state: 'Gujarat' },
        { name: 'Pune', state: 'Maharashtra' },
        { name: 'Jaipur', state: 'Rajasthan' },
      
    ];

    try {
       
        const session = await mongoose.startSession();
        session.startTransaction();

      
        await City.deleteMany({}).session(session);
        await CityModel.deleteMany({}).session(session);

        for (let i = 0; i < cities.length; i++) {
           
            const city = new City({
                name: cities[i].name,
                state: cities[i].state,
            });
            const savedCity = await city.save({ session });

          
            const cityModel = new CityModel({
                name: savedCity.name,
                state: savedCity.state,
                cityId: savedCity._id,
                cinemaHalls: [],
                cinemaMovies: [],
            });
            await cityModel.save({ session });
        }

        
        await session.commitTransaction();
        session.endSession();

        console.log('Database seeded with cities and city models!');
    } catch (err) {
        console.error('Error seeding cities:', err.message);
        process.exit(1); 
    }
};

export default seedCities;
