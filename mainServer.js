const express = require('express');
const fs = require('graceful-fs');
const client = express();
const bodyParser = require('body-parser');


const {body,validationResult} = require('express-validator');


client.use(bodyParser.urlencoded({ extended: true }));
client.use(bodyParser.json());
client.use(express.static('publicRep'));

const TEXT = 0;
const INTEGER = 1;
const ALPHA_NUMERIC = 2;



// object to encapsulate form data
class Form{
    constructor(fName , lName , pNumber,houseNumber,postCode,usrName,age,email,ethnicity,password,fA,sA,weeks,day,gender){
      this.fName = fName;
      this.lName = lName;
      this.pNumber = pNumber;
      this.houseNumber = houseNumber;
      this.postCode = postCode;
      this.usrName = usrName;
      this.age = age;
      this.email = email;
      this.ethnicity = ethnicity;
      this.password = password;
      this.firAppointment = fA;
      this.secAppointment = sA;
      this.weeks = weeks;
      this.day = day;
      this.gender = gender;
    }
}
//methods to validate form input
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
  let regexSPChar = /[A-Za-z0-9]/;
  for (char = 0 ; char < inputString.length ; char++){
      result = regexSPChar.test(inputString[char]);
    if (result == false){
      return true ;
    }
  }

  return false;
}

function validateBodyMember(element,indexOfDatatype){
  let errorMessage = "NO_ERROR";

  if (indexOfDatatype > -1 && indexOfDatatype < 3){
    switch (indexOfDatatype){
      case TEXT:

        if (containsSpace(element)){
          errorMessage = "no spaces allowed";
          return errorMessage;
        }
        if(containsNumber(element)){
          errorMessage = "no numerical types allowed";
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
// returns a html message that can be render as a responce to the user's form
function createErrorMsg(responceObj ,field , error){

     responceObj.status(400);
     responceObj.write('<html>');
     responceObj.write('<body>');
     responceObj.write('<h1>Error in ' + field +":  "+ error + '</h1>');
     responceObj.write('</body>');
     responceObj.write('</html>');
     responceObj.end();
     return responceObj;

}
// returns html error message using errors from express validator
function createValidatorErrorMsg( responceObj , field){
  // the express validator is only used to check minimum lengths so we can assume that any time this function is called its for that reason
  switch (field){
    case 'phoneNum':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in phone number: minimum length required is eight  </h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
      break;
    case 'fName':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in first name: minimum length required is two  </h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
      break;
    case 'lName':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in last name: minimum length required is two </h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
      break;
    case 'houseNo':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in house number: field cannot be left empty</h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
      break;
    case 'postCode':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in post code: minimum length required is three</h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
      break;
    case 'usrName':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in user name: minimum length required is two </h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
      break;
    case 'age':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in age: field cannot be left empty</h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
      break;
    case 'email':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in email : not a valid email address</h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
      break;
    case 'pwd':
    responceObj.status(400);
    responceObj.write('<html>');
    responceObj.write('<body>');
    responceObj.write('<h1>Error in password: minimum length is three</h1>');
    responceObj.write('</body>');
    responceObj.write('</html>');
    responceObj.end();
    return responceObj;
  }

}
//writes an object in JSON format
function serObject(obj , file){
  try {
    //sourced from :
    //https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options
    // last accessed on : 13/12/20
    // adaptations : changed parameters to match my use case
    fs.writeFileSync(file,JSON.stringify(obj));
  }catch(err){
    console.log(err);
  }
}

var jsonList = [];
let entry = new Form(
  "System-gen",//first name
  "dummy-user",//last name
   '00110000',//phone number
   42,//house number
   'BN 101',//postCode
   'dummySYS',//username
   42,//age
   'sys@sysfs@null.com',//email
   'other',//ethinicity
   'undefined',
   'NAN',//first appointments
   'NAN',//second appointment
    '-1,0',//weeks
    'saturday',//saturday
    'binary'//gender
    );
    jsonList.push(entry);
// read database into memory
try{
  // sourced from :
  //https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
  // last accessed on 13/12/20
  //adaptations: changed statement to include file , passed encoding to the options parameters
let file = fs.readFileSync('database.JSON','utf8');
//record changes to the database via an object
jsonList = JSON.parse(file);
}catch(err){
  console.log(err);
  console.log('current data base lost attempting to create a new database');

}





function assignTimeSlots(requestObject , entryObject){
  errorMsg = "NO_ERROR";
  fA = requestObject.body.firstAm;
  fP = requestObject.body.firstPm;

  sA = requestObject.body.secondAm;
  sP = requestObject.body.secondPm;
  // check for multiple appointments on the same day
  if ((fA !=null && fP != null) || (sA !=null && sP != null)){
    errorMsg = "You may only have one appointment per day";

    return errorMsg;

  }
   // checks to see if either appointment slots have been left empty
  if ((fA == null && fP == null)||(sA == null && sP == null)){
    errorMsg = "You must book two appointments one week apart";
  }



  list = [fA,fP,sA,sP];
  for (i = 0 ; i < 4 ; i++){
    if (list[i] != null ){
        if(i <2){
          entryObject.firAppointment = list[i];
          console.log("First appointment: " + entryObject.firAppointment);
        }else{
          console.log(list[i]);
          entryObject.secAppointment = list[i];
          console.log("Second appointment: " + entryObject.secAppointment);
        }
    }
  }
  return errorMsg;
}
//validates gender , if more than one gender is selected on form user is advised to select the non-binary option
function assignGender(entryObject,male,female,nBinary){
  errorMsg = "NO_ERROR";
  genders = [male,female,nBinary];
  nActivated = 0;

  if (male!=null){
    entryObject.gender = "male";
  }
  if(female!=null){
    entryObject.gender = "female";
  }
  if(nBinary!=null){
    entryObject.gender = "non binary";
  }
  for (i = 0; i< 3 ; i++){
      if(genders[i] != null){
        nActivated++;
      }
      if (nActivated > 1 ){
        errorMsg = "more than one gender was selected , please select non binary if you feel you are neither exclusively male or female";
        return errorMsg;
      }
  }
  return errorMsg;
}

client.post('/booking-signup',[
  // replaces '\/'special characters with empty space
  //---
  // sourced from 
  //https://express-validator.github.io/docs/
  // last accessed 30/11/20
  //adaptations : changed variables to match fields in form requesting
  //changed min parameter to appropriate values
  body('fName').trim().escape().isLength({min :2}),
  body('lName').trim().escape().isLength({min : 2}),
  body('phoneNum').trim().escape().isLength({min:8}),
  body('houseNo').trim().escape().isLength({min:1}),
  body('postCode').trim().escape().isLength({min:3}),
  body('usrName').trim().escape().isLength({min:2}),
  body('age').trim().escape().isLength({min:1}),
  body('email').trim().escape().isEmail(),
  body('pwd').trim().escape().isLength({min:3})
  //---
],function(req,res){
  //user wants to submit form data
   console.log('got a form submission');
  responce = 'account creation successful';

   res.header('Access-Control-Allow-Origin','*');

   const errors = validationResult(req);

   if(!errors.isEmpty()){

     error = errors.array();

     return createValidatorErrorMsg(res,error[0].param);
     }


 let errs = "";
 res.set('Content-Type','text/html');

  errs = validateBodyMember(req.body.fName,TEXT);

  if (errs != "NO_ERROR"){

      return createErrorMsg(res,"first name",errs);
  }


  errs = validateBodyMember(req.body.lName,TEXT);
  if (errs != "NO_ERROR"){
    return  createErrorMsg(res,"last name",errs);
  }

  errs = validateBodyMember(req.body.phoneNum,INTEGER);
  if (errs != "NO_ERROR"){
    return  createErrorMsg(res," phone number",errs);
  }

  errs = validateBodyMember(req.body.houseNo,INTEGER);
  if (errs != "NO_ERROR"){
    return  createErrorMsg(res,"house number",errs);
  }

errs = validateBodyMember(req.body.postCode,ALPHA_NUMERIC);
if (errs != "NO_ERROR"){
  return  createErrorMsg(res,"post code",errs);
}

errs = validateBodyMember(req.body.usrName,ALPHA_NUMERIC);
if (errs != "NO_ERROR"){
  return createErrorMsg(res,"user name",errs);
}

errs = validateBodyMember(req.body.age,INTEGER);
if (errs != "NO_ERROR"){
  return createErrorMsg(res,"age ",errs);
}

errs = validateBodyMember(req.body.pwd,ALPHA_NUMERIC);
if (errs != "NO_ERROR"){
  return createErrorMsg(res,"password",errs);
}


  let newEntry = new Form(req.body.fName,

    req.body.lName,
    req.body.phoneNum,
    req.body.houseNo,
    req.body.postCode,
    req.body.usrName,
    req.body.age,
    req.body.email,
    req.body.ethnicity,
    req.body.pwd,
    null, // 1st appointment slot
    null, // 2nd appointment slot
    req.body.weeks,
    req.body.day,
    null //gender
  );
  errs = assignTimeSlots(req,newEntry);
  if (errs!= "NO_ERROR"){
    return createErrorMsg(res,"appointments",errs);
  }
  errs = assignGender(newEntry,req.body.male,req.body.female,req.body.nonBinary);
  if(errs != "NO_ERROR"){
    return createErrorMsg(res,"gender",errs);
  }
  console.log(req.body);
  console.log("in JSON form");
  console.log(JSON.stringify(req.body));
  console.log("obj created");
  console.log(JSON.stringify(newEntry));
  jsonList.push(newEntry);
  serObject(jsonList , 'database.JSON');
  console.log('account logged');
  console.log("email "+ newEntry.email);



   res.send(responce);
});

client.listen(3000,function(){
  console.log('running');
});
