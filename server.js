const connectDb = require("./config/dbConnections");
const express   = require("express"),
      dotenv    = require("dotenv").config(),
      cors      = require("cors"),
      errorHandler = require("./middleware/errorHandler"),
      app     = express(),
      port    = process.env.PORT || 5000;

connectDb();
app.use(cors());
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Cache-Control");

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);
app.use(express.json())
app.use('/api/contacts', require("./routes/contactRoutes"))
app.use('/api/users', require("./routes/userRoutes"))
app.use(errorHandler)




app.listen(port, () => {
    console.log(`Server running on ${port}`)
})