import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//Mongoose connection(Mongodb)
mongoose.connect("mongodb://127.0.0.1:27017", 
{dbName: "backend"}).then(()=>console.log("Database Connected!")).catch((e)=> console.log(e));

//Defined schema(Mongodb)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

//Model definition (Mongodb)
const user = mongoose.model('user', userSchema);
const app = express();


// const users = [];

app.set('view engine', 'ejs');

// Using middlewares.
app.use(express.static(path.join(path.resolve(),'public')));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies;
    // const token = req.cookies.token;
    if(token){
        const decoded = jwt.verify(token, 'jafskjfklsdjadfj');
        // console.log(decoded);
        // The user is fetched from the database using its id.
        req.user = await user.findById(decoded._id);
        // console.log(req.user);
        next();
    }
    else{
        res.redirect('/login');
    }
};

app.get('/',isAuthenticated,(req,res)=>{
    // res.send("The server can be seen working.");
    // res.statusCode=404;
    // res.sendStatus(404);
    // res.status(404).send("Meri marzi.");
    // res.json({
  
    //     name:"Kunal Tyagi",
    //     class: 6,
    //     Address: "16 Jagriti Vihar , Sanjay Nagar , GZB"
    // // });
    // const location = path.resolve();
    // const fullPath = path.join(location, 'index.html');
    // res.sendFile(fullPath);
    // res.render('index.ejs',{name: 'Kunal'} );
    // console.log(req.cookies.token);
    res.render('logout.ejs', {name: req.user.name});
});

app.get('/login', (req,res)=>{
    res.render('login.ejs');
})

app.get('/register',(req,res)=>{
    res.render('register.ejs');
});


app.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    let users = await user.findOne({email});
    if(!users){
        return res.redirect('/register');
    }
    // users = await user.create({
    //     name, email
    // })
    const isMatch = bcrypt.compare(password, users.password);
    if(!isMatch) res.render('login.ejs', {message: "OOPS! Wrong Password."}); 
    const token = jwt.sign({_id: users._id}, 'jafskjfklsdjadfj');
    res.cookie("token" , token, {
        httpOnly:true, expires: new Date(Date.now()+ 60*1000)
    });
    res.redirect("/");
    // const {token} = req.cookies;
    // console.log("Login called!");
    // const token = req.cookies.token;
    // if(token){
    //     res.render('logout.ejs');
    // }
    // else {
    //     res.render('login.ejs');
    // }
});

app.post('/register', async(req,res)=>{
    const {name, email, password} = req.body;
    let users = await user.findOne({email});
    if(users){
        return res.redirect('/login');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    users = await user.create({
        name, email, password: hashedPass
    })
    const token = jwt.sign({_id: users._id}, 'jafskjfklsdjadfj');
    res.cookie("token" , token, {
        httpOnly:true, expires: new Date(Date.now()+ 60*1000)
    });
    res.redirect("/");
});


app.get('/logout', (req,res)=>{
    // console.log("Logout called!");
    res.cookie("token", 'iamin',{
        httpOnly:true, expires: new Date(Date.now())
    });
    // res.render('login.ejs');
    res.redirect('/');
});


app.listen(5000, ()=>{
    console.log("Server is working.");
});


// app.get('/add', (req,res)=>{
//     Messge.create({name: 'Kunal Tyagi', email: 'kunaltyagi00000@gmail.com'}).then(()=>res.send('Nice to hear from !'));
// });

// app.get('/success',(req,res)=>{
//     // res.render('success.ejs');
// });


// app.get('/users',(req,res)=>{
//     res.json({
//         users
//     });
// });

// app.post('/contact', (req,res)=>{
//     // console.log(req.body); Undefined
//     // users.push({username: req.body.name, email: req.body.email});
//     Messge.create({name: req.body.name, email: req.body.email}).then(()=>console.log("Data is created for the person", req.body.name));
//     // res.send('Success')
//     // res.redirect('/success');
// });

