//jshint esversion:6
//ejs-challenge
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-belal:Test123@cluster0.d3d6s.mongodb.net/blogDB",{useNewUrlParser: true,useUnifiedTopology: true});
//create blogSchema
const blogSchema ={
title:String,
body:String

};
// create model
 const Blog = mongoose.model("Blog", blogSchema);
const homeStartingContent = "Take notes about startups ideas";

const aboutContent =  "We make a full review about startups services so you can test their quality .we also mention their stories and news so if you wanna learn from their success make sure to follow us for more...";
const contactContent = "مفيش اي ارقام عشان مبنحبش الصداع";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res) {
  Blog.find({},function (err,posts) {

    res.render("home",{
      startingContent: homeStartingContent,
          content: posts
      });
  });
//  res.render("home",{content:posts});
});


app.get("/posts/:topic",function (req,res) {
  let topicName=req.params.topic;
  //console.log(topicName);
  Blog.find({title:topicName},function(err,fullPost) {
  res.render("post",{article:fullPost});

  });



});


app.post("/",function (req,res) {

const postTitle = req.body.title;
const postBody = req.body.desc;
const post = new Blog({
  title:postTitle,
  body:postBody

});

  post.save();


  res.redirect("/");

})




app.get("/contact",function (req,res) {

  res.render("contact",{contactus:contactContent});

})
app.get("/about",function (req,res) {

  res.render("about",{aboutUs:aboutContent});

})
app.get("/compose",function (req,res) {

  res.render("compose");

})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}





app.listen(port, function() {
  console.log("Server started greatly");
});
