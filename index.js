const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')


app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
// app.set('view engine', '.ht')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.get('/', (request, response) => {
  response.render('rules')
})

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
})

app.listen(3000)
