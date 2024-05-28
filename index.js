const express = require("express");
const urlRoute = require("./routes/url")
const { connectToMongoDb } = require("./connect")
const URL = require("./models/url")
const path = require("path");

const app = express();
const Port = 8001;

app.use(express.json())

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Database Connected"))

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.get("/test", (req, res) => {
  return res.render("home")
})


app.use("/url", urlRoute)

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(Port, () => console.log(`Server Started ${Port}`))