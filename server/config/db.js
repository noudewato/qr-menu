const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDB = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    // (err) => {
    //   if (!err) {
       
    //   } else {
        console.log(
          "Mongodb Connected Sucessfully!!!" + JSON.stringify(undefined, 2)
    )
    //     ;
    //   }
    // }
  );
};

module.exports = connectDB;


