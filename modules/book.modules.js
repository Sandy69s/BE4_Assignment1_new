const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    publishedYear:{
        type:Number,
        require:true,
    },
    genre:[{
        type:String,
    }],
    language:[{
        type:String,
    }],
    country:{
        type:String,
    },
    rating:{
        type:Number,
        require:true,
    },
    summary:{
        type:String,
        require:true,
    },
},
{
    timestamps:true,
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;