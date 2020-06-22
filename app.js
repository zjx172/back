const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const postsRoute =require('./routes/posts');
const cors=require('cors');
mongoose.set('useFindAndModify', false)

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));


// // 使用 body-parser 中间
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式

app.use(cors());

app.post('/test', (req, res)=>{
    // res.setHeader('Content-Type', 'text/plain')
    // res.write('you posted:\n')
    // res.end(JSON.stringify(req.body, null, 2))
     console.log(req.body);
});


app.use('/posts',postsRoute);


app.get('/',(req,res)=>{
    res.send('Hello')
})
app.get('/test',(req,res)=>{
    res.send('test')
})

mongoose.connect('mongodb://localhost:27017/myvx',{ useNewUrlParser: true,useUnifiedTopology: true  },()=>{
    console.log('connecting to DB')
})
app.listen(3001);
