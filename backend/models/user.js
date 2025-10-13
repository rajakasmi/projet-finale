
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // image par défaut
    },
    role: {
      type: [String],
      enum: ["admin", "client"],
      default: ["client"],
    },
  },
  { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

const User = mongoose.model("User", userSchema);

export default User;
