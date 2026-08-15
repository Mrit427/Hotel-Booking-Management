// server/controllers/clerkWebhooks.js
import User from "../models/user.js";

const clerkWebhooks = async (req, res) => {
    try {
        const payload = req.rawBody.toString();
        const { data, type } = JSON.parse(payload);
        const emailAddress = data.email_addresses?.[0]?.email_address;

        console.log(`Webhook Event: ${type}`);

        if (type === "user.created" || type === "user.updated") {
            const userData = {
                _id: data.id,
                clerkId: data.id,
                email: emailAddress,
                username: (data.first_name || data.last_name) ? `${data.first_name} ${data.last_name}`.trim() : emailAddress.split('@')[0],
                image: data.image_url || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
                role: emailAddress === "mrittikamazumder72@gmail.com" ? "hotelOwner" : "user",
            };

            // findOneAndUpdate + upsert ব্যবহার করলে ডাটা সেভ হতে বাধ্য
            await User.findOneAndUpdate({ _id: data.id }, userData, { upsert: true, new: true });
            console.log(`Database Updated for: ${emailAddress}`);
        }

        if (type === "user.deleted") {
            await User.findByIdAndDelete(data.id);
            console.log("User Deleted from DB");
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Database Save Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default clerkWebhooks;