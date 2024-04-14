// Imports
const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios")

// Static Files
app.use(express.static("public"));
// app.use("/css", express.static(__dirname + "public/css"));
// app.use("/js", express.static(__dirname + "public/js"));
// app.use("/img", express.static(__dirname + "public/img"));

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("", async (req, res) => {
  const articles = await fetchData(
    "https://backend.doxgamingconcept.com/api/articles?populate[images][fields][0]=url&fields[0]=*&pagination[pageSize]=5&pagination[page]=1"
  );
  console.log("🚀 ~ app.get ~ articles:", articles)

  res.render("index", {  article: articles });
});


app.get("/contact", (req, res) => {
  res.render("contact", { text: "This is EJS" });
});


app.get("/partners", (req, res) => {
  res.render("partners", { text: "This is EJS" });
});


app.get("/post", async (req, res) => {

  console.log(req.query,"query")

  const article = await fetchData(
    `https://backend.doxgamingconcept.com/api/articles/${parseInt(req.query.id)}?populate[images][fields][0]=url&fields[0]=*&pagination[pageSize]=5&pagination[page]=1`
  );
  console.log("🚀 ~ app.get ~ article:", article)

  res.render("post", { article: article });
});


app.get("/blog", async (req, res) => {

  const articles = await fetchData(
    "https://backend.doxgamingconcept.com/api/articles?populate[images][fields][0]=url&fields[0]=*&pagination[pageSize]=5&pagination[page]=1"
  );
  res.render("blog", { article: articles });
});


//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));
