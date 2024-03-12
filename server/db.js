const mongoose = require("mongoose");

mongoose.connect(
  // db_url
);

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String },
  password: String,
});

const adminSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: String,
});

const busRouteSchema = mongoose.Schema({
  origin: String,
  destination: String,
  departureTime: String,
  arrivalTime: String,
  fare: Number,
  seats: [{ seatNumber: Number, isBooked: Boolean }],
});

const bookingSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "BusRoute" },
  seats: [Number],
  totalFare: Number,
  bookingDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const BusRoute = mongoose.model("BusRoute", busRouteSchema);
const Booking = mongoose.model("Booking", bookingSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
  User,
  BusRoute,
  Booking,
  Admin,
};
