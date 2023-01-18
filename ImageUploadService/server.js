import express from "express";
import * as path from "path";
import dotenv from 'dotenv'
import colors from "colors";
import cors from 'cors';
import uploadRoutes from "./Routes/uploadRoutes.js";
import createError from "http-errors";
const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID))

app.get('/', (req, res) => {
    res.send('API is running...');
})
// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.underline.bold));
