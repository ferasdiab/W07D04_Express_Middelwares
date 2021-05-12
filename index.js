const express = require("express");

const app = express();
const port = 3000;
app.use(express.json());


const users = ["John", "Mark"];
//const users = [];

///////////////////////////////////////

const logUsers = (req, res, next)=>{
    console.log(users)
    next()
}
//application-level 
app.use(logUsers)
/////////////////////////////////////////////////////
const logMethod = (req, res, next)=>{
    console.log(req.method);
        next()
}

//app.use("/users",logMethod)
////////////////////////////////////////
app.use((req, res, next)=>{
    if (users.length === 0){
        const err = new Error("No users");
        err.status = 500;
        next(err);
    }else{
        next()
    }
})




//////////////////////////////////
app.get("/users",logMethod, (req, res, next) => {

  res.json(users);
});


//////////
app.use((err, req, res, next) => {
    // set the status code
    res.status(err.status);
    // send the response in JSON format
    res.json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  });
  /////////////////////


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});