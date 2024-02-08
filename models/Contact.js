import mongoose, {model} from "mongoose";
    
const ContactSchema = new mongoose.Schema({
  phoneNumber: { type: String },
  email: { type: String },
 // linkedId: { type: Schema.Types.ObjectId, ref: "Contact" },
  linkPrecedence: {
    type: String,
    enum: ["primary", "secondary"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export const Contact = model("Contact", ContactSchema);