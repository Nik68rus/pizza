import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sequelize from './db';
import cors, { CorsOptions } from 'cors';
import router from './routes';
import errorHandler from './middleware/errorMiddleware';

dotenv.config();

let PORT = +(process.env.PORT as string);

if (isNaN(PORT)) {
  PORT = 8080;
}

const app = express();

const corsOptions: CorsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
  // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

//Обработка ошибок
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
