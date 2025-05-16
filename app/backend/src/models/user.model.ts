// src/models/user.model.ts

import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

import type { User } from "../types/User.js";

// Define the User interface extending mongoose Document
export interface UserDocument extends User, Document {
  comparePassword(candidate: string): Promise<boolean>;
}

// Define the User schema
const UserSchema: Schema<UserDocument> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  // Check if the password is modified
  // If not, skip hashing
  if (!this.isModified("password")) return next();

  // Hash the password using bcrypt
  // The second argument is the salt rounds, which determines the complexity of the hash
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare plaintext password with hashed password
UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  // Compare the candidate password with the hashed password
  return bcrypt.compare(candidate, this.password);
};

// Create the User model using the schema
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  UserSchema
);
