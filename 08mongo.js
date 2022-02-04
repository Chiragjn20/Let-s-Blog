
const express = require ('express');
const morgan = require ('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');

const Blog = require('./modules/blog');


//express app
const app = express();

const dbURI = 'mongodb+srv://chiragjn20:buletchali@nodejs.mylzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology : true })
  .then((result)=> app.listen(3000))
  .catch((err)=> console.log(err));
// register view engine
app.set('view engine', 'ejs' );

//middleware and static files

app.use(express.static('public1'));


//mongoose and mongo sendbox routes
app.get('/add-blog' ,(req, res) =>{
    const blog = new Blog({
        title : 'New blog 2', 
        snippet: 'About my new blog',
        body: 'More about blog'

    });
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })

})

app.get('/all-blog', (req,res )=> {
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });

})
app.get('/single-blog', (req,res )=> {
    Blog.findById('')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });

})




app.get('/',(req , res)=>{
    const blogs =[
    {title : 'Title 1', snippet:'content 1'},
    {title : 'Title 2', snippet:'content 2'},
    {title : 'Title 3', snippet:'content 3'},
     ];


    res.render('index', {title : 'Home', blogs});    

});
app.get('/about',(req , res)=>{

    res.render('about',{title : 'About'});    
});
app.get('/blogs/create',(req , res)=>{

    res.render('create',{title : 'create'});    
});
  
    // 404 error page
    app.use((req,res)=>{

        res.status(404).render('404',{title : 'Error'});    
    });