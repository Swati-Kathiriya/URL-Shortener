const express = require("express");
const app = express();
const path = require('path'); 
const static = require("./routes/static")
const URL = require("./models/url");
const userroutes = require("./routes/user");
const cookieparser = require("cookie-parser")
const {restrictto,checkforauthorization} = require('./middleware/auth')

// Connect to MongoDB
const { connectMongoDb } = require('./connection');
connectMongoDb("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"))

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkforauthorization());

app.route('/test', async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home",{
        urls:allurls
    });
});

// Handle short URL requests
app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        },
    );
    res.redirect(entry.redirectURL);
});

// Use URL routes
const urlRoutes = require("./routes/url");
app.use("/url",restrictto(["NORMAL","ADMIN"]),urlRoutes);
app.use("/user",userroutes)
app.use('/',static);

// Start the server
app.listen(8001, () => console.log("Server started on port"));
