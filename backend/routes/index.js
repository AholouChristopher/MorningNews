var express = require('express');
var router = express.Router();
require('../models/bddconnect')
var userModel = require('../models/users');
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256")
var encBase64 = require("crypto-js/enc-base64");
/* GET home page. */
router.post('/sign-up', async function (req, res, next) {
  var sel = uid2(32)
  var result = false;

  var newUser = new userModel({
    username: req.body.usernameFrontFront,
    email: req.body.emailFrontFront,
    sel: sel,
    password: SHA256(req.body.passwordFrontFront + sel).toString(encBase64),
    token: uid2(32)

  });
  const saveUser = await newUser.save();
  //verification
  if (saveUser) {
    result = true;
    var token = saveUser.token;
  }

  res.json({ result, saveUser, token });
});

router.post('/sign-in', async function (req, res, next) {
  var result = false;
  const data = await userModel.findOne({
    email: req.body.emailFrontFront,
  });  
  try {
    if (SHA256(req.body.passwordFrontFront + data.sel).toString(encBase64) === data.password) {
      result = true
      var token = data.token;
    }
    res.status(200).json({ result, data, token });  

  }catch{ console.log("error")}

})

router.post('/SubmitArticleLiked', async function(req, res){
  let result = false;
  console.log(req.body.title)
  let user =  await userModel.findOne({ token : req.body.token})
  
  if( user !== null && !user.articles.find(article => article.title === req.body.title)){
    user.articles.push({
      title: req.body.title,
      description: req.body.description,
      urlToImage: req.body.urlToImage,
      url: req.body.url,
    })

    let userUpdate = await user.save();

    if(userUpdate){
      result = true;
    }else{
      console.log("article non save")
    }
  };
  
  res.json({result});
})

router.get('/wishlist/:token', async function(req, res){
  var result = false
  var user = await userModel.findOne( {token : req.params.token} )
  var articles = []
  if (user !== null){ 
    articles = user.articles;
    result = true;
  }else{
    console.log(" erreur user find")
  }
  
  res.json({ result, articles });
})

router.delete('/wishlist/delArticle', async function(req, res){
  let result = false
  let user = await userModel.findOne({token:req.body.token});

  console.log(req.body.title)
    if ( user !== null){
      user.articles = user.articles.filter(article => article.title !== req.body.title) 
      let userUpdate = await user.save();
      if (userUpdate) { 
        result = true
        console.log("article delete");
      }
    }
    res.json({result})
})

module.exports = router;

