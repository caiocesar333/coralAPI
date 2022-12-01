const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user")

mongoose.connect(
    "mongodb+srv://caiocesar333:mega12345678@cluster0.jut0lkc.mongodb.net/?retryWrites=true&w=majority"
).then(()=>console.log("sucesso"))
.catch((err)=>console.log(err))

app.use(express.json())
app.use("/coral/users", userRoute)
  
app.listen(5000, () => {

})