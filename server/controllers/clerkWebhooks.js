// import  User  from "../models/user.js";
// import { Webhook } from "svix";



// const clerkWebhooks = async (req, res)=>{
//     try {
//         // Create a Svix instance with clerk webhook secret.
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         // Getting Headers
//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"],
//         };

//         // Verifying Headers
//          await whook.verify(JSON.stringify(req.body), headers)
//          // Getting Data from request body
//         const {data, type} = req.body
//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email_address,
//             username: data.first_name + " " + data.last_name,
//             image: data.image_url,
//             }
//             // Switch Cases for differernt Events
//             switch (type) {
//                 case "user.created": {
//                     await User.create(userData);
//                     break;
//                 }

//                 case "user.updated": {
//                     await User.findByIdAndUpdate(data.id, userData);
//                     break;
//                 }

//                 case "user.updated": {
//                     await User.findByIdAndUpdate(data.id, userData);
//                     break;
//                 }

//                 case "user.deleted":{
//                     await User.findByIdAndDelete(data.id);
//                     break;
//                 }

//                 default:
//                     break;
//             }
//             res.json({success: true, message: "Webhook Recieved"})

//         } catch (error) {
//             console.log(error.message);
//             res.json({ success: false, message: error.message });
//         }

// }



// export default clerkWebhooks;

// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//     // console.log("=== WEBHOOK HIT ===");
//     // console.log(req.body);

//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     await whook.verify(JSON.stringify(req.body), headers);

//     const { data, type } = req.body;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses[0].email_address,
//       username: data.first_name + " " + data.last_name,
//       image: data.image_url,
//       recentSearchedCities: [],
//     };

//     // const userData = {
//     //   clerkId: data.id,  
//     //   email: data.email_addresses[0].email_address,
//     //   username: data.first_name + " " + data.last_name,
//     //   image: data.image_url,
//     //   recentSearchedCities: [],
//     //   };

//     switch (type) {
//       case "user.created":
//         await User.create(userData);
//         break;

//       case "user.updated":
//         await User.findByIdAndUpdate(
//           { _id: data.id },
//           userData
//         );
//         break;

//       case "user.deleted":
//         await User.findByIdAndDelete({ _id: data.id });
//         break;

//       default:
//         break;
//     }

//     res.json({ success: true, message: "Webhook Received" });

//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;


// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
// //   console.log("🔥 ROUTE HIT");
// // console.log(req.body);
  
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     const payload = JSON.stringify(req.body);

//     // verify webhook
//     const event = whook.verify(payload, headers);

//     const { data, type } = req.body;

//     // 🔥 IMPORTANT: always use clerkId separately
//     const clerkId = data.id;

//     const userData = {
//       clerkId, 
//       email: data.email_addresses?.[0]?.email_address,
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url,
//       recentSearchedCities: [],
//     };

//     switch (type) {
//       case "user.created":
//         await User.findOneAndUpdate(
//           { clerkId },
//           userData,
//           { upsert: true, new: true }
//         );
//         break;

//       case "user.updated":
//         await User.findOneAndUpdate(
//           { clerkId },
//           userData,
//           { new: true }
//         );
//         break;

//       case "user.deleted":
//         await User.findOneAndDelete({ clerkId });
//         break;

//       default:
//         break;
//     }

//     res.json({ success: true, message: "Webhook Received" });

//   } catch (error) {
//     console.log("Webhook Error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;

// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     //  IMPORTANT FIX
//     const payload = req.body.toString();

//     const event = whook.verify(payload, headers);

//     const { data, type } = event;

//     const clerkId = data.id;

//     const userData = {
//       clerkId,
//       email: data.email_addresses?.[0]?.email_address,
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url,
//       recentSearchedCities: [],
//     };

//     if (type === "user.created") {
//       await User.findOneAndUpdate({ clerkId }, userData, { upsert: true });
//     }

//     if (type === "user.updated") {
//       await User.findOneAndUpdate({ clerkId }, userData);
//     }

//     if (type === "user.deleted") {
//       await User.findOneAndDelete({ clerkId });
//     }

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     console.log(" WEBHOOK ERROR:", err.message);
//     return res.status(400).json({ success: false });
//   }
// };

// export default clerkWebhooks;
// 


// import { Webhook } from "svix";

// export default async function clerkWebhooks(req, res) {
//   try {
//     const payload = req.body.toString();
//     const headers = req.headers;

//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const evt = wh.verify(payload, {
//       "svix-id": headers["svix-id"],
//       "svix-timestamp": headers["svix-timestamp"],
//       "svix-signature": headers["svix-signature"],
//     });

//     console.log("Webhook event:", evt);

//     const event = whook.verify(payload, headers);

//     const { data, type } = event;

//     const clerkId = data.id;

//     const userData = {
//       clerkId,
//       email: data.email_addresses?.[0]?.email_address,
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url,
//       recentSearchedCities: [],
//     };

//     if (type === "user.created") {
//       await User.findOneAndUpdate({ clerkId }, userData, { upsert: true });
//     }

//     if (type === "user.updated") {
//       await User.findOneAndUpdate({ clerkId }, userData);
//     }

//     if (type === "user.deleted") {
//       await User.findOneAndDelete({ clerkId });
//     }

// //     return res.status(200).json({ success: true });
// //   } catch (err) {
// //     console.log(" WEBHOOK ERROR:", err.message);
// //     return res.status(400).json({ success: false });
// //   }
// // };

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.log("Webhook Error:", err.message);
//     res.status(400).json({ error: "Invalid signature" });
//   }
// }
// 

import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const payload = req.body.toString();
    const headers = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(payload, {
      "svix-id": headers["svix-id"],
      "svix-timestamp": headers["svix-timestamp"],
      "svix-signature": headers["svix-signature"],
    });

    console.log("EVENT TYPE:", evt.type);

    // 🔥 USER CREATED EVENT
    if (evt.type === "user.created") {
      const userData = evt.data;

      const newUser = new User({
        // _id: userData.id,
        clerkId: userData.id,
        username: userData.first_name || "user",
        email: data.email_addresses?.[0]?.email_address ||
              data.primary_email_address?.email_address ||
              "",
        image: userData.image_url || "",
      });

      await newUser.save(); // 🔥 IMPORTANT LINE

      console.log("User saved to MongoDB");
    }

    if (type === "user.created") {
      await User.findOneAndUpdate(
        { clerkId: userData.id },
        {
        clerkId: userData.id,
        username: userData.first_name || "user",
        email: data.email_addresses?.[0]?.email_address ||
                data.primary_email_address?.email_address ||"",
        image: userData.image_url || "",
        },
        { upsert: true, new: true }
  );
}

    if (type === "user.updated") {
      await User.findOneAndUpdate({ clerkId }, userData);
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("Webhook Error:", err.message);
    return res.status(400).json({ error: err.message });
  }
};
export default clerkWebhooks;