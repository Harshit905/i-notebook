const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017";
const connectToMongo = () => {
  mongoose.connect(mongoURI).then(()=>console.log ("Connected to Mongo Successfully")).catch((err) => console.log(err));

};
mongoose.set('strictQuery', true);
module.exports = connectToMongo; 