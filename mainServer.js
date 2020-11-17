const express = require('express');
const parser = require('body-parser');

const client = express();
const jsonParser = parser.json();

client.use(express.static('publicRep'));
client.get('/',function(req,res){
console.log("client on homepage");
});
client.get('/:foo/book',function (req , res){
  //user is requesting a form
  const name = req.params.foo;
  res.send('oh '+ name + ' we got your get request');
});
client.post('/contact.html',jsonParser,function(req,res){
  //user wants to submit form data
   console.log('got a form submission');
   console.log(req.params);
   const body = req.body;
   const name = body.firstName;
   const email = body.email;

   res.header('Access-Control-Allow-Origin','*');
   res.send("Server res : Nice name " + name);
});

client.listen(3000,function(){
  console.log('running');
});
