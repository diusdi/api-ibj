const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const courseCategoryRoute = require('./src/routes/courseCategoryRoute');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/category', courseCategoryRoute);

app.listen(8080, ()=>{
    console.log('Server Berjalan di Port : 8080');
});