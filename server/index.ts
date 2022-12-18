import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db';
import cors from 'cors';
import router from './routes';
import errorHandler from './middleware/errorMiddleware';

dotenv.config();

let PORT = +(process.env.PORT as string);

if (isNaN(PORT)) {
  PORT = 8080;
}

const app = express();

app.use(cors());
app.use(express.json());
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
