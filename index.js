import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import questionsRoute from './src/routes/questions.js';
import answersRoute from './src/routes/answers.js';
import usersRoute from './src/routes/users.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use(questionsRoute)
app.use(answersRoute)
app.use(usersRoute)


mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('Connected to the DB')
}).catch((err) => {
    console.log('Error connecting', err)
})

app.listen(process.env.PORT, () => {
    console.log(`App started on ${process.env.PORT}`)
}) 
