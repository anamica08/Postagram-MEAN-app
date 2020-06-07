const express = require('express');
const bodyParser = require('body-parser');

//this returns us an express app and wnow we can use it .
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    next();
})

//1s1N23MiycqxJwDT

app.post("/api/posts", (req, res, next) => { 
    const post = req.body;
    console.log("request body",post);
    res.status(201).json({message:'added succesfully'});
})


app.use('/api/posts', (req, res) => {
    const posts = [{
        id: "dgjdf3434",
        title: "first server side post",
        content: "this is coming from server"
    }, {
        id: "dgjdjsjdnf3434",
        title: "second server side post",
        content: "this is coming from server"
    }];
    //res.send('hello from ok express');
    res.status(200).json({
        message: "post fetched succesfully",
        posts: posts
    });
});

module.exports = app;