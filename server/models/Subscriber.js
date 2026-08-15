import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+\@.+\..+/, "Please enter a valid email"] 
    },
    subscribedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Subscriber", subscriberSchema);