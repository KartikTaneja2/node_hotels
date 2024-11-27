// function add(a,b){
//     return a+b;
// }

// var add=function(a,b){
//     return a+b;
// }

// var add=(a,b) => {return a+b};

// var add=(a,b)=>a+b; 

// var result=add(2,444);
// console.log(result);

// (function(){
//     console.log("kartik");
// })();


// (callback func in JavaScript) 

// function callback(){
//     console.log('now adding is successfully complete');
// }

// const add=function(a,b,callback){
//     var result=a+b;
//     console.log('result: '+result); //main func work complete //
//     callback();
// }

// add(3,4,callback);

// const add=function(a,b,kartik){
//     var result=a+b;
//     console.log('result: '+result);
//     kartik();
// }

// add(2,3,function(){
//     console.log('add completed');
// });

// add(2,3,()=>console.log('add completed'));

// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt','Hi' + user.username + '!\n',()=>{
//     console.log('file is created');
// });

// console.log(os);
// console.log(fs);


// const notes=require('./notes');
// var _ = require('lodash');

// console.log('server file is available');
// var age=notes.age;
// var result=notes.addNumber(age+6,12);
// console.log(age);
// console.log('result is now: '+result);

// var data = ["person", "person", 1, 2 , 1, 2, 'name', 'age', '2'];
// var filter=_.uniq(data);
// console.log(filter);

// console.log(_.isString('person'));

// Convert JSON to JavasScript Object //

// const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// const jsonObject = JSON.parse(jsonString) ;
// console. log (jsonObject.name)

// Convert Object to JSON //

// const objectToConvert = {
//     name:"Alice",
//     age: 25
//     };
//     const json = JSON. stringify(objectToConvert); 
//     console.log(json);

// console.log(typeof json);

// Create Sever in nodejs //


const express=require('express');
const app=express();
const db=require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send('hello world')
})

// Import the router files //
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes'); 

// Use the routers //
app.use('/person' , personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000,()=>{
    console.log('listening on port 3000');
})

