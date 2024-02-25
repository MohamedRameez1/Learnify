const express = require("express")
const cors = require('cors')
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Rameez@localhost:5432/LEARNIFY')


/* Boiler Plate */
app = express()

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }

app.use(cors(corsOptions));//For allowing request from servers
app.use(express.json());//Parsing data to json
app.use(express.urlencoded({ extended: true }));//Encode URL



app.post("/login",(req,res)=>{

    let body = req.body

//
    db.one('select * from  users where user_email=$1 and user_password=$2',[body.mail, body.password])
    .then((data) => {
        res.status(200);
        res.cookie('Learnifyid', data.user_id, { 
            maxAge: 900000, // Expires in 15 minutes
            httpOnly: true, // Cookie is accessible only by the server
            // other options...
          });

        res.send("1");
    })
    .catch((error) => {
        res.status(200);
        res.send("0");
    })

//
    
})

app.listen(5000,(error)=>{
    if(!error){
        console.log("Server started")
    }
    else{
        console.log("Server not started")
    }
})