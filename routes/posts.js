const express=require('express');
const router=express.Router();
const request=require('request');
const Person=require('../models/Person');
const Post=require('../models/Post');
// var openid;
// //获取用户喜欢接口
router.post('/home',async(req,res)=>{
    console.log(req.body);
    const openid=req.body.openid;
    console.log(openid);
    const person=await Person.findOne({openid:openid});
    // const posts=await Post.find({users_like_this_post: person._id});
    // posts.forEach((item)=>{
    //     item.like=1;
    // })
    console.log(person);
    const posts=await Post.find();
    posts.forEach((item)=>{
        console.log(item.users_like_this_post);
        console.log(item.users_like_this_post.indexOf(person._id));
        if(item.users_like_this_post.indexOf(person._id)!=-1){
            item.like=1;
            console.log(">>>>");
        }
    })
    res.json(posts);
})
router.get('/',async(req,res)=>{
    // res.send('cnm');
    // console.log(openid);
    try{ 
        // if(openid!=undefined){
        //     const person=await Person.findOne({openid:openid});
        //     console.log('>>');
        //     console.log(person); 
            const posts=await Post.find();
            // const posts=await Post.find({users_like_this_post: person._id});
            // console.log(posts);
            res.json(posts);
        // }else{
        //     res.send('完蛋！');
        //     console.log('??');
        // }
    }catch(err){
        res.json({message:err});

    }
});
router.post('/login',async(req,res)=>{
    // console.log(req.body);
    var r=request({
        url:"https://api.weixin.qq.com/sns/jscode2session?appid=wx342e3e915edfc939&secret=61f099ac633daefd867665a6587824f0&js_code="+req.body.code+"&grant_type=authorization_code",
        method:'GET',
        headers:{'Content-Type':'text/json' }
    }, async function(err,response,body){
        if(!err&&response.statusCode==200){
            const data=JSON.parse(body);
            // console.log(data);
            res.json({'data':JSON.parse(body)});
            const person=new Person({
                openid:data.openid
            })
            try{
                const savePerson=await person.save();
                // res.send('用户id已经保存至后端');
                // res.json({'data':JSON.parse(body)});
                console.log('用户id已经保存至后端');
                // console.log(savePerson);
                // openid=savePerson.openid;
                // console.log(openid);
                // res.json(savePost);
            }catch(err){
                return res.json({message:err});
            }
        }
    });
});

router.post('/',async(req,res)=>{
    // console.log(req.body);
    const post=new Post({
        text:req.body.text,
        photo:req.body.photo
    })
    // // res.send(post);
    try{
        const savePost=await post.save();
        res.send('success');
        console.log('success');
        // res.json(savePost);
    }catch(err){
        return res.json({message:err});
    }
    
    // post.save().then(data=>{
    //     return res.json(data);
    // }).catch(err=>{
    //     return res.json({message:err})
    // })
    
    // console.log(req.body);
});

// router.get('/',async(req,res)=>{
//     try{
//         const post= await Post.find();
//         res.json(post)
//     }catch(err){
//         res.json({message:err});
//     }
// })

router.get('/:postId',async(req,res)=>{
    try{
        const post= await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
    // console.log(req.params.postId);
})
router.post('/:postId',async(req,res)=>{
    // console.log(req.body);
    const person=await Person.findOne({openid:req.body.openid});
    console.log('找到了');
    if(req.body.like==1){ 
        const querypost= await Post.findById({_id:req.body.id});
        const likenumber=querypost.likenumber+1;
        const post= await Post.findByIdAndUpdate({_id:req.body.id},{likenumber:likenumber,$addToSet:{users_like_this_post:person._id}},{new:true},function(err,data){
            if(err){
                console.log("数据库错误");
            }else if(data){
                console.log("成功");
                data.save();
                // console.log(data);
                res.json(data);
            }
        });
      //  post.save();
    }else{
        const querypost= await Post.findById({_id:req.body.id});
        const likenumber=querypost.likenumber-1;
        const post= await Post.findByIdAndUpdate({_id:req.body.id},{likenumber:likenumber,$pull:{users_like_this_post:person._id}},{new:true},function(err ,data){
            if(err){
                console.log("数据库错误");
            }else if(data){
                console.log("成功");
                data.save();
                // console.log(data);
                res.json(data);
            }
        });
      //  post.save();
    }
    // const post= await Post.findByIdAndUpdate({_id:req.body.id},{likenumber:req.body.likenumber});
    // // console.log(post);
    // const person=new Person({
    //     openid:req.body.openid,
    //     post:post
    // })
    // try{
    //     const savePost=await person.save();
    //     // res.send('success');
    //     // console.log('success');
    //     res.json(savePost);
    // }catch(err){
    //     return res.json({message:err});
    // }
    
    // const post=new Post({
    //     text:req.body.text,
    //     photo:req.body.photo
    // })

    // try{
    //     const post= await Post.findById(req.params.postId);
    //     res.json(post);
    // }catch(err){
    //     res.json({message:err});
    // }
    // console.log(req.params.postId);
})

module.exports=router;