const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("DB Connected Successfully !");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;