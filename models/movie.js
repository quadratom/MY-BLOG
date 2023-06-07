const mongoose = require('mongoose');
const marked = require('marked')
const slugify = require('slugify')
// const createDompurify = require('dompurify')
// const { JSDOM } = require('jsdom').JSDOM 
// const dompurify = createDompurify(new JSDOM().window)

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link:{
        type: String
    },
    rate: {
        type: Number,
        required: true
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    moviesDetail: {
        type: String,
        required: true
    },  
    slug: {
        type: String,
        required: true,
        unique:  true
    }, 
//     sanitizerHtml: {
//         type: String,
//         required: true
//     }
})

moviesSchema.pre('validate', function(next) {
    if (this.title) { 
        this.slug = slugify(this.title, {lower: true, strict: true })
    }
    // if (this.moviesDetail) {
    //     this.sanitizeHtml = dompurify.sanitize(marked(this.moviesDetail))
    // }

     next()
 })  

module.exports = mongoose.model('Movies', moviesSchema)