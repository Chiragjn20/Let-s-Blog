
const express = require ('express');
const morgan = require ('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');

const Blog = require('./modules/blog');
const { render } = require('ejs');

//express app
const app = express();
//connect to mongoD
const dbURI = 'mongodb+srv://chiragjn20:buletchali@nodejs.mylzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true ,useUnifiedTopology: true } )
.then((result) => app.listen(3000))
.catch((err) => console.log(err))
// register view engine
app.set('view engine', 'ejs' );

//middleware and static files

app.use(express.static('public1'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/',(req , res)=>{
   
res.redirect('/blogs');

});
app.get('/about',(req , res)=>{

    res.render('about',{title : 'About'});    
});

//blog routes
app.get('/blogs',(req , res)=>{
Blog.find().sort({ createdAt : -1 })

.then((result)=>{
    res.render('index' , {title : 'All blogs' , blogs :result})
})
.catch((err) =>{
    console.log(err);
})

});

app.post('/blogs', (req, res) => { 
 const blog = new Blog(req.body);
blog.time = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
blog.time = blog.time.split(' ').slice(0, 5).join(' ');
    blog.save()
      .then((result) => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
 });
 app.get('/blogs/%20:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details' , {blog : result , title : 'Blog Details' });
    })
    .catch(err => {
        console.log(err);
    })
  });
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
app.get('/blogs/create',(req , res)=>{

    res.render('create',{title : 'create'});    
});
  
    // 404 error page
    app.use((req,res)=>{

        res.status(404).render('404',{title : 'Error'});    
    });