const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
