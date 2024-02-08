import mongoose  from "mongoose";
import express  from "express";
import { config } from "dotenv";
import { Contact } from "./models/Contact.js";

export const app = express();

config({
    path: "./data/config.env"
  });

app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    dbName:"FluxKart"
}).then(() => console.log("Connected to database"))
.catch(error => console.error("MongoDB connection error:", error));

app.post("/identify", async (req,res) =>{
    try{
const {email, phoneNumber} = req.body;
const matchingContacts = await Contact.find({
    $or: [
      { email },
      { phoneNumber },
    ],
  });
    // Create a new primary contact if no matching one found (using Mongoose create)
    const newContact = await Contact.create({ email, phoneNumber, linkPrecedence: "primary" });
    res.json({
      contact: {
        primaryContatctId: newContact._id,
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: [],
      },
    });
}
 catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}
});


app.listen(process.env.PORT, () => {
    console.log(`Server is working on port :${process.env.PORT}`);
  });