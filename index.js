const express = require("express");

const app = express();
const port = 3000;
app.use(express.json());

const authRouter = express.Router();



const users = ["John", "Mark"];
//const users = [];

const products  = ["keyboard", "mouse"]

///////////////////////////////////////
app.use((req, res, next)=>{
    if (users.length === 0){
        const err = new Error("No users");
        err.status = 500;
        next(err);
    }else{
        next()
    }
})

///////////
//practice 6 
app.use("*",(req, res, next)=>{

        const err = new Error("NOT FOUND");
        err.status = 404;
        next(err)
})





//////////////////////////////////


const logUsers = (req, res, next)=>{
    console.log(users)
    next()
}
//application-level 
app.use(logUsers)
/////////////////////////////////////////////////////
//midille function 

const logMethod = (req, res, next)=>{
    console.log(req.method);
        next()
}

const middileConsole =(req,res,next)=>{
    console.log(req.body)
    next()
}

//app.use("/users",logMethod)
////////////////////////////////////////
//////////////////////////////////
authRouter.use((req,res,next)=>{
    console.log("products router")
    next()
})

authRouter.get("/users",logMethod, (req, res, next) => {

  res.json(users);
});

/////////////////


authRouter.post("/users/create",middileConsole,(req,res,next)=>{
    const name = req.body.name
    users.push(name)
    res.json(users)

})

authRouter.put("/update",(req,res)=>{
const num = Math.floor(products.length*Math.random())
products[num] = req.body.name
res.status(200)
res.json(products)

})

app.use("/products", authRouter);
app.use("/users", authRouter);


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