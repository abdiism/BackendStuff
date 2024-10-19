import express from 'express';
// const express = require('express');
const app = express(); //creating instance  an express app

const port =process.env.port || 3000;
app.use(express.json());
const requestLogger= (request,response,next)=>{
console.log(`Request is recieved: ${request.method} ${request.url}`);
next();
}
app.use(requestLogger);
let books=[];
const bookrouter=express.Router();

// creating a book or adding a book
bookrouter.post('/',(request,response)=>{
    const {title, author}=request.body;
    
    //checking if title and author are given or not
    if(!title || !author){
        response.status(400).send({message: 'Title and author are required'});
    }
    const newBook={
        id:books.length+1,
        title,
        author,
    };
    books.push(newBook);
    response.status(201).send(newBook);

});

//reading/getting  all books
bookrouter.get('/',  (request, response)=>{
response.send(books);
});
//reading/getting  a book by id
bookrouter.get('/:id', (req, res)=>{
    const book=books.find(b=> b.id === parseInt(req.params.id));
    if(book){
        res.send(book);
    }else{
        res.status(404).send({message: 'Book not found'});
    }
})
//updating a book by id
bookrouter.put('/:id',(req,res)=>{
    const book=books.find(b=> b.id === parseInt(req.params.id));//finding the book by id
  if(!book){
   return res.status(404).json({message: "Book ID not found"});
  }

        const {title, author}=req.body;
        if(!title || !author){
           return res.status(404).json({
                message: "Please give title and author"
            });
        }
   
            book.title=title;
            book.author=author;
            res.send(book);
       
})

//deleting a book by id
bookrouter.delete('/:id',(req,res)=>{
    const book=books.find(b=> b.id === parseInt(req.params.id));
    if(!book){
        return res.status(404).json({
            message: "Book ID not found"
        });
    }
    //deleting the book from the array using splice method and its index
    const index=books.findIndex(b=> b.id === parseInt(req.params.id));
    books.splice(index,1);
    res.send({message: "Book deleted successfully"});
    
});

app.use('/books',bookrouter);
app.listen(port,()=>{
    console.log(`Book Library is running on port http://localhost:${port}`);
    
})
