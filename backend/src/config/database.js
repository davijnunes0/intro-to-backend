import mongoose from "mongoose";

const connectDB = async () => {
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI não está definida no arquivo .env");
        }
        
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected MongoDB!!!
             ${connectionInstance.connection.host}`);
    }catch(error){
        console.error("MongoDB connection failed!",error);
        process.exit();

    }
}

export default connectDB;