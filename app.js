require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');
const authenticateUser = require('./middleware/authentication');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

//connect to database
const connectDB = require('./db/connect');

// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/jobs',authenticateUser ,jobRoutes);

app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); 
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
