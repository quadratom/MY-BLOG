const express = require('express') 
const mongoose  = require('mongoose');
const Movies = require('./models/movie')
const moviesRouter = require('./routes/netflix')
const methodOverride = require('method-override')
const app = express() 



mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/movies');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req,res) =>{
    const movies = await Movies.find().sort({
      createdAt: 'desc'  })
    res.render('movie/index', { movies : movies})
})
app.use('/netflix', moviesRouter)




app.listen(5600, () => {
    console.log('Server is on port http://localhost:5600');
})