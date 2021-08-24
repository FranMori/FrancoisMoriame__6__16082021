const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const User = require ('./models/user')
const userRoutes = require('./routes/user')



const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb+srv://Dazak:openclassrooms@cluster0.8sae2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/auth', userRoutes)

module.exports = app
