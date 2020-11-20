const express = require('express');
const fs = require('graceful-fs');
const client = express();
const bodyParser = require('body-parser');

var ReadWriteLock = require('rwlock');
var lock = new ReadWriteLock();
client.use(bodyParser.urlencoded({ extended: true }));
client.use(bodyParser.json());
client.use(express.static('publicRep'));



client.get('/',function(req,res){
console.log("client on homepage");
});

client.get('/:foo/book',function (req , res){
  //user is requesting a form
  const name = req.params.foo;
  res.send('oh '+ name + ' we got your get request');
});

class Form{
    constructor(fName , lName , pNumber,houseNumber,postCode,usrName,age,email,password){
      this.fName = fName;
      this.lName = lName;
      this.pNumber = pNumber;
      this.houseNumber = houseNumber;
      this.postCode = postCode;
      this.usrName = usrName;
      this.age = age;
      this.email = email;
      this.password = password;

    }
}
try{
let file = fs.readFileSync('database.JSON','utf8');
var jsonList = JSON.parse(file);
}catch(err){
  console.log(err);
}

// check to see if a value is already present in the database
function isInDatabase(email){
  //block execution until whole file is read

}
function addToDatabase(jsonObject){
  try{
    fs.appendFileSync('database.JSON',jsonBody + '&');
    return true;
  }catch (err){
    return false;
  }

}
function serObject(obj , file){
  try {
    fs.writeFileSync(file,JSON.stringify(obj));
  }catch(err){
    console.log(err);
  }
}

client.post('/booking-signup',function(req,res){
  //user wants to submit form data
   console.log('got a form submission');
  responce = "";

   res.header('Access-Control-Allow-Origin','*');
//   input = jsonParser.parse(req.body);

  // if (isInDatabase(req.body.email)){
  //   responce = "FAIL: user already registered"
  // }else{
  //   if (addToDatabase(req.body) === true ){
  //     responce = "SUCCESS: user registered succesfully"
  //   }else{
  //     responce = "FAIL:Server currently unavailable"
  //   }
  // }
  let newEntry = new Form(req.body.fName,
    req.body.lName,
    req.body.phoneNum,
    req.body.houseNo,
    req.body.postCode,
    req.body.usrName,
    req.body.age,
    req.body.email,
    req.body.pwd,
  );

  console.log(req.body);
  console.log("in JSON form");
  console.log(JSON.stringify(req.body));
  console.log("obj created");
  console.log(JSON.stringify(newEntry));
  jsonList.push(newEntry);
  serObject(jsonList , 'database.JSON');
  //console.log("first name : "+req.body.fName );
  //console.log(isInDatabase(req.body.email));
   res.send(responce);
});

client.listen(3000,function(){
  console.log('running');
});
