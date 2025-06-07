import mongoose from "mongoose";

const connectiontoMogodbcluster = async () => {
    try {   
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectiontoMogodbcluster;
