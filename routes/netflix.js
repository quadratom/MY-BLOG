const express = require('express')
const Movies = require('./../models/movie')
const router = express.Router()

router.get('/add', (req,res) => {
   res.render('movie/add', {movies: new Movies() })
})

router.get('/edit/:id', async (req,res) => {
   const movie = await Movies.findById(req.params.id)
   res.render('movie/edit', {movie: movie })
})

router.get('/:slug', async (req,res) => {
   const movie = await Movies.findOne({ slug: req.params.slug })
   if (movie == null) res.redirect('/')
   res.render('movie/show', { movie: movie})
})


router.post('/', async (req,res) => {
   let movies = new Movies({
      title: req.body.title,
      link: req.body.link,
      rate: req.body.rate,
      moviesDetail: req.body.moviesDetail
   })
   try{
      movies = await movies.save()
      res.redirect(`/netflix/${movies.slug}`)
   }catch(e) {
      res.render('movie/add', { movies: movies})
   }
 
})

router.delete('/:id', async (req,res) => {
   await Movies.findByIdAndDelete(req.params.id)
   res.redirect('/')
})

module.exports = router














































//  const express = require('express')
// const Movies = require('./../models/movie')
// const router = express.Router()

// router.get('/add', (req,res) => {
//    res.render('movie/add', {movies: new Movies() })
// })

// router.get('/edit/:id', async (req,res) => {
//    const movie = await Movies.findById(req.params.id)
//    res.render('movie/edit', {movie: movie })
// })

// router.get('/:slug', async (req,res) => {
//    const movie = await Movies.findOne({ slug: req.params.slug })
//    if (movie == null) res.redirect('/')
//    res.render('movie/show', { movie: movie})
// })


// router.post('/', async (req,res, next) => {
//    req.movies = new Movies()
//    next()
// }, saveMoviesAndRedirect('add'))

// router.put('/:id', async (req,res, next) => {
//    req.movies = new Movies.findById(req.params.id)
//    next()
// }, saveMoviesAndRedirect('edit'))

// router.delete('/:id', async (req,res) => {
//    await Movies.findByIdAndDelete(req.params.id)
//    res.redirect('/')
// })


// function saveMoviesAndRedirect(path){
//    return async (req,res) => {
//       let movie = req.movies
//          movie.title = req.body.title
//          movie.link =req.body.link
//          movie.rate = req.body.rate
//          movie.moviesDetail = req.body.moviesDetail
//       try{
//          movies = await movies.save()
//          res.redirect(`/netflix/${movies.slug}`)
//       }catch(e) {
//          res.render(`movie/${path}`, { movies: movies})
//       }

//    }
          
// }

// module.exports = router 