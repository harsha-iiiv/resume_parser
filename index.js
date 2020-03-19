const express = require('express');
const connectDB  = require('./config/db_config')
const app = express();
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index')
});
app.use('/', require('./routes/parser'))
app.use('/', require('./routes/result')) 
connectDB();

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000 ...');
});