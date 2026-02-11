require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const path = require("path");

// Static frontend serve karega
app.use(express.static(path.join(__dirname, "public")));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected  http://localhost:5000")) 
              
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/vendor", require("./routes/vendor"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/scan", require("./routes/scan"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
