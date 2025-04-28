const Booking = require("../models/Booking");

exports.bookSession = async (req, res) => {
  try {
    const { expertId, date, startTime, endTime } = req.body;

    const booking = new Booking({
      userId: req.user.id,
      expertId,
      date,
      startTime,
      endTime,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "expertId"
    );
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getExpertBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ expertId: req.user.id }).populate(
      "userId"
    );
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
