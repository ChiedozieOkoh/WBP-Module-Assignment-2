const express = require('express');
const fs = require('graceful-fs');
const client = express();
const bodyParser = require('body-parser');

const {body,validationResult} = require('express-validator');

var ReadWriteLock = require('rwlock');
var lock = new ReadWriteLock();
client.use(bodyParser.urlencoded({ extended: true }));
client.use(bodyParser.json());
client.use(express.static('publicRep'));

const TEXT = 0;
const INTEGER = 1;
const ALPHA_NUMERIC = 2;
//const DATATYPE ["TEXT","INT","ALPHA_NUM"]



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

function containsNumber(inputString){

  let regexNum = /[0-9]/ ;
  return regexNum.test(inputString);
}

function containsAlpha(inputString){
  let regexAlpha = /[A-Za-z]/;
  return regexAlpha.test(inputString);
}
function containsSpace(inputString){
  let regexSpace = /\s/ ;
  return regexSpace.test(inputString);
}
function containsSpecialChars(inputString){
  let regexSPChar = /[^\W\0-9]/;
  return regexSPChar.test(inputString);
}

function validateBodyMember(element,indexOfDatatype){
  var errorMessage = "NO_ERROR";

  if (indexOfDatatype > -1 && indexOfDatatype < 3){
    switch (indexOfDatatype){
      case TEXT:

        if (containsSpace(element)){
          errorMessage = "no spaces allowed";
          return errorMessage;
        }
        if(containsNumber(element)){
          errorMessage = "no integral types allowed";
          return errorMessage;
        }
        if(containsSpecialChars(element)){
          errorMessage = "no special characters allowed";
          return errorMessage;
        }
        break;

        case INTEGER:
        if(containsSpace(element)){
          errorMessage ="no integral types allowed";
          return errorMessage;
        }
        if(containsAlpha(element)){
          errorMessage = "no letters allowed";
          return errorMessage;
        }
        if(containsSpecialChars(element)){
         errorMessage =  "no special characters allowed";
         return errorMessage;
        }
        break;

        case ALPHA_NUMERIC:
        if(containsSpace(element)){
          errorMessage ="no spaces allowed";
          return errorMessage;
        }
        if(containsSpecialChars(element)){
          errorMessage ="no special characters allowed";
          return errorMessage;
        }

    }
  }
  return errorMessage;
}

function isInDatabase(email){
  //block execution until whole file is read

}
//writes an object in JSON format
function serObject(obj , file){
  try {
    fs.writeFileSync(file,JSON.stringify(obj));
  }catch(err){
    console.log(err);
  }
}

// read database into memory
try{
let file = fs.readFileSync('database.JSON','utf8');
//record changes to the database via an object
var jsonList = JSON.parse(file);
}catch(err){
  console.log(err);
}
//uses regex to find numbers in any given string

client.get('/',function(req,res){
console.log("client on homepage");
});

client.get('/:foo/book',function (req , res){
  //user is requesting a form
  const name = req.params.foo;
  res.send('oh '+ name + ' we got your get request');
});




client.post('/booking-signup',[
  // replaces special characters with their html counterparts
  body('fName').trim().isLength({min :2}),
  body('lName').trim().escape().isLength({min : 2}),
  body('phoneNum').trim().escape().isLength({min:8}),
  body('houseNo').trim().escape().isLength({min:1}),
  body('postCode').trim().escape().isLength({min:3}),
  body('usrName').trim().escape().isLength({min:2}),
  body('age').trim().escape().isLength({min:1}),
  body('email').trim().escape().isEmail(),
  body('pwd').trim().escape().isLength({min:3})
],function(req,res){
  //user wants to submit form data
   console.log('got a form submission');
  responce = 'account creation successful';

   res.header('Access-Control-Allow-Origin','*');

   const errors = validationResult(req);

   if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() });
   }
 let errs = "";
 res.set('Content-Type','text/html');
  errs = validateBodyMember(req.body.fName,TEXT);
  console.log(req.body.fName);
  console.log(errs);
  if (errs != "NO_ERROR"){
     res.status(400);
     res.write('<html>');
     res.write('<body>');
     res.write('<h1>Error in first name: ' + errs + '</h1>');
     res.write('</body>');
     res.write('</html>');
     res.end();
     return res;
  }

  errs = validateBodyMember(req.body.lName,TEXT);
  if (errs != "NO_ERROR"){
    res.status(400);
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Error in lase name: ' + errs + '</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();
    return res;
  }

  errs = validateBodyMember(req.body.phoneNum,INTEGER);
  if (errs != "NO_ERROR"){
    res.status(400);
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Error in phone number: ' + errs + '</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();
    return res;
  }

  errs = validateBodyMember(req.body.houseNo,INTEGER);
  if (errs != "NO_ERROR"){
    res.status(400);
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Error in first house number: ' + errs + '</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();
    return res;
  }

errs = validateBodyMember(req.body.postCode,ALPHA_NUMERIC);
if (errs != "NO_ERROR"){
  res.status(400);
  res.write('<html>');
  res.write('<body>');
  res.write('<h1>Error in postCode: ' + errs + '</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
  return res;
}

errs = validateBodyMember(req.body.usrName,ALPHA_NUMERIC);
if (errs != "NO_ERROR"){
  res.status(400);
  res.write('<html>');
  res.write('<body>');
  res.write('<h1>Error in user name : ' + errs + '</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
  return res;
}

errs = validateBodyMember(req.body.age,INTEGER);
if (errs != "NO_ERROR"){
  res.status(400);
  res.write('<html>');
  res.write('<body>');
  res.write('<h1>Error in age ' + errs + '</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
  return res;
}

errs = validateBodyMember(req.body.pwd,ALPHA_NUMERIC);
if (errs != "NO_ERROR"){
  res.status(400);
  res.write('<html>');
  res.write('<body>');
  res.write('<h1>Error in password ' + errs + '</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
  return res;
}

  let newEntry = new Form(req.body.fName,

    req.body.lName,
    req.body.phoneNum,
    req.body.houseNo,
    req.body.postCode,
    req.body.usrName,
    req.body.age,
    req.body.email,
    req.body.pwd
  );

  console.log(req.body);
  console.log("in JSON form");
  console.log(JSON.stringify(req.body));
  console.log("obj created");
  console.log(JSON.stringify(newEntry));
  jsonList.push(newEntry);
  serObject(jsonList , 'database.JSON');
  console.log('account logged');

   res.send(responce);
});

client.listen(3000,function(){
  console.log('running');
});
