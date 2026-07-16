import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },

  phoneNumber: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  hasActiveSubscription: {
    type: Boolean,
    default: false
  },

  signUpDate: {
    type: Date,
    default: Date.now
  },

  subscriptionExpireDate: Date,

  favoriteTitle: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ],

  country: String,

  city: String
});

export const User = mongoose.model('User', userSchema);