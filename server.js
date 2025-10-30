const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const app = express();
const PORT = 3000;
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/userdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
    
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use("/users", usersRoutes);

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);
});
