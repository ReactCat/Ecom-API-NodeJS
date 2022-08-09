const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")

dotenv.config();

mongoose
.connect(process.env.MONGO_DB)
.then( ()=>(console.log("Mongoose Connection Succesful")))
.catch( (err)=>{console.log(err)
});

app.use(express.json());
app.use("/api/users", userRoute)


app.listen(process.env.PORT || 5000, () =>{
  console.log("API backend server is running")
})