import dotenv from "dotenv";

dotenv.config();


if(!process.env.PORT){
    throw new Error("PORT is not defined in enviroment varriables")
}

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in enviroment varriables")
}


export const configs={
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI
}