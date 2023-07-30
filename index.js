import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = 3000;

const items = [];
const workItems = [];


app.post("/submit", (req, res) => {
    let header = req.body.heading;
    let body = req.body.detail;
    items.push({
        header: header,
        body: body
    })
  
    res.redirect("/");
})

app.get("/", (req, res) => {
    res.render("index.ejs", {
        date: getDate(),
        items: items
    })
})


app.post("/submit-work", (req, res) => {
    let header = req.body.workHeading;
    let body = req.body.workDetail;
    workItems.push({
        header: header,
        body: body
    })
  
    res.redirect("/work");
})


app.get("/work", (req, res) => {
    res.render("work.ejs", {
        items: workItems
    })
})



const getDate = () => {
    let fullDate = new Date();
 
    let weekday = fullDate.toLocaleDateString("fr-FR", {weekday: "long"});
    let day = fullDate.toLocaleDateString("fr-FR", {day: "numeric"});
    let month = fullDate.toLocaleDateString("fr-Fr", {month: "long"});
    let year = fullDate.toLocaleDateString("fr-Fr", {year: "numeric"});

    return `${weekday}, ${day} ${month} ${year}`

}

app.listen(port, () => {
    console.log("Running on " + port)
})