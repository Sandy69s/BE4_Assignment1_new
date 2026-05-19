const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Book = require("./modules/book.modules")

app.use(cors());
app.use(express.json());

initializeDatabase();


  
// const bookData = {
//   title:"I too had a love story",
//   author:"Ravindar Singh",
//   publishedYear:2000,
//   genre:"Romance",
//   language:"English",
//   country:"India",
//   rating:"4.7",
//   summary:"A real life emotional and romantic heart touching story of ravindar singh",
// }


//Add a book to database

async function createBook( bookData ){
  try{
    const book = new Book( bookData );
    const savedBook = await book.save();
    return savedBook;
  }
  catch(error){
    throw error
  }
}

app.post("/books", async(req, res) => {
  try{
    const book = await createBook( req.body );

    if(book){
      res.status(200).json({message:"Book added successfully", book:book});
    }else{
      res.status(404).json({error: "book not found"});
    }
  }
  catch(error){
    res.status(500).json({error: "Error adding data to database"});
  }
})

//Delete a book

async function DeleteBookById( bookId ){
  try{
    const deletedBook = await Book.findByIdAndDelete( bookId );
    console.log("Deleted Book", deletedBook);
  }
  catch(error){
    throw error
  }
}

app.get("/books/:bookId", async(req, res) => {
  try{
    const deletedBook = await DeleteBookById( req.params.bookId );

    if(deletedBook){
      res.status(202).json({message: "Book deleted successfully", book: deletedBook});
    }else{
      res.status(404).json({error: "Book not found"});
    }
  }
  catch(error){
    res.status(500).json({error: "Error deleting book"});
  }
})



//get All books

async function ReadAllBooks(){
  try{
    const allBooks = await Book.find();
    return allBooks;
  }
  catch(error){
    throw error
  }
}

app.get("/books", async (req, res) => {
  try{
    const allBooks = await ReadAllBooks();
    res.json(allBooks);
  }
  catch(error){
    res.status(500).json({error: "Error getting all books"})
  }
})

//get a book by title

async function ReadBookByTitle( bookTitle ){
  try{
    const book = await Book.findOne( {title: bookTitle} );
    return book;
  }
  catch(error){
    console.log(error);
  }
}

app.get("/books/:bookTitle", async (req, res) => {
  try{
    const book = await ReadBookByTitle( req.params.bookTitle );

    if(book){
      res.status(201).json({message: "Book found successfully", book: book});
    }else{
      res.status(404).json({error: "book not found"});
    }
  }
  catch(error){
    res.status(500).json({error: "Error getting a book by title"});
  }
})

//get all books by a author

async function ReadBooksByAuthor( bookAuthor ){
  try{
    const books = await Book.find( {author:bookAuthor} );
    return books;
  }
  catch(error){
    console.log(error);
  }
}

app.get("/books/author/:bookAuthor", async(req, res) => {
  try{
    const books = await ReadBooksByAuthor( req.params.bookAuthor );

    if(books.length != 0){
      res.status(201).json({message: "books found successfully", books: books});
    }else{
      res.status(404).json({error: "book with that author not found"});
    }
  }
  catch(error){
    res.status(500).json({error: "Error getting book by author"});
  }
})

// get all books with  genre (business genre)

async function ReadBooksWithBusinessGenre( bookGenre ){
  try{
    const books = await Book.find( {genre: bookGenre} );
    return books;
  }
  catch(error){
    throw error;
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try{
    const books = await ReadBooksWithBusinessGenre( req.params.bookGenre );

    if(books.length != 0){
      res.json(books);
    }else{
      res.status(400).json({error: "Books not found"});
    }
  }
  catch(error){
    res.status(500).json({error: "Error getting books"});
  }
})

//get all books with release Year 2012

async function ReadBooksByReleaseYear( bookReleaseYear ){
  try{
    const books = await Book.find( {publishedYear : bookReleaseYear} );
    return books;
  }
  catch(error){
    throw error;
  }
}

app.get("/books/releaseYear/:bookReleaseYear", async(req, res) => {
  try{
    const books = await ReadBooksByReleaseYear( req.params.bookReleaseYear );

    if(books.length != 0){
      res.json(books);
    }else{
      res.status(404).json({error: "Book not found"});
    }
  }
  catch(error){
    res.status(500).json({error: "Error getting books"});
  }
})

// update books rating by id

async function UpdateBookById( bookId, updatedData ){
  try{
    const updatedBook = await Book.findByIdAndUpdate( bookId, updatedData, {new : true} );
    return updatedBook;
  }
  catch(error){
    throw error
  }
}

app.post("/books/:bookId", async(req, res)=>{
  try{
    const updatedBook = await UpdateBookById( req.params.bookId, req.body );

    if(updatedBook){
      res.status(201).json({message: "book updated successfully", book: updatedBook});
    }else{
      res.status(404).json("Book not found");
    }
  }
  catch(error){
    res.status(500).json({error: "Error updating book"});
  }
})

// update book's rating by title

async function UpdateBookByTitle( bookTitle, updatedData ){
  try{
    const updatedBook = await Book.findOneAndUpdate( { title: bookTitle }, updatedData, { new: true } );
    return updatedBook;
  }
  catch(error){
    throw error
  }
}

app.post("/books/title/:bookTitle", async(req, res) => {
  try{
    const updatedBook = await UpdateBookByTitle( req.params.bookTitle, req.body );

    if(updatedBook){
      res.status(201).json({error: "Book updatedSuccessfully", book: updatedBook});
    }else{
      res.status(404).json({ error: "Book not found" });
    }
  }
  catch(error){
    res.status(500).json({error: "Error updating book"});
  }
});

// Delete a book by id

async function DeleteBook( bookId ){
  try{
    const book = await Book.findByIdAndDelete( bookId );
    return book;
  }
  catch(error){
    throw error
  }
}

app.delete("/books/:bookId", async(req, res) => {
  try{
    const book = await DeleteBook( req.params.bookId );

    if(book){
      res.status(201).json({error: "Book deleted successfully", book: book});
    }else{
      res.status(404).json({error: "Book not found"});
    }
  }
  catch(error){
    res.status(500).json({error: "Error deleting book"});
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
