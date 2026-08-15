// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//     _id: {type: String, required: true},
//     username: {type: String, required: true},
//     email: {type: String, required: true},
//     image: {type: String, required: true},
//     role: {type: String, enum: ["user", "hotelOwner"], default: "user"},
//     recentSearchedCities: [{type: String, required: true}],
// },{timestamps: true}
// );

// // const User = mongoose.model("User", userSchema);
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// // export default User;
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   clerkId: {
//   type: String,
//   required: true,
//   unique: true,
// },
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   image: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ["user", "hotelOwner"],
//     default: "user",
//   },
// //   clerkId: {  //check
// //   type: String,
// //   unique: true,
// //   sparse: true,
// // },
//   recentSearchedCities: [{ type: String,default: [], required: true }],
// }, { timestamps: true });

// export default mongoose.models.User ||
//   mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: false },
    image: { type: String, default: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" }, 
    role: {
        type: String,
        enum: ["user", "hotelOwner"],
        default: "hotelOwner", // আপনি চেয়েছিলেন সবাই এডমিন হবে
    },
    recentSearchedCities: [{ type: String, default: [], required: true }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);