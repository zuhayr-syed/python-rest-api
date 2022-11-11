const express = require("express");
const connectDB = require("./config/db");

const app = express();

var cors = require("cors");
app.use(cors());

//Connect to db
connectDB();

app.use(express.json({ extended: false }));

// Define routes
app.use("/", require("./routes/index")); // Redirect to long url
app.use("/api/url", require("./routes/url")); // Make requests to create url
app.use("/api", require("./routes/list")); // Make requests to create url
app.use("/api/url/delete", require("./routes/delete")); // Make requests to delete url

const PORT = 5003;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
