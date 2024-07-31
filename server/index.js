const express = require("express")
const path = require("path")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const less = require("less")
dotenv.config()

const app = express()

app.use(express.static(path.resolve(__dirname, "./static")))

app.use(morgan("dev"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const whilelist = ["http://127.0.0.1:5173", "http://localhost:3001"]
app.use(
  cors({
    origin: function (origin, callback) {
      if (whilelist.indexOf(origin) !== -1 || !origin) {
        callback(null, "*")
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    exposedHeaders: ["WWW-Authenticate", "Server-Authorization", "x-test-code"],
    maxAge: 5,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "x-requested-with",
      "Content-Encoding",
    ],
  })
)

let htmlStr = ""
let cssStr = ""
let jsStr = ""
let completeHTML = ""

app.post("/server/save/html", (req, res) => {
  htmlStr = req.body.value
  res.send({
    status: 1,
    message: "Save HTML successful",
  })
  tryGenerateCompleteHTML(res)
})
app.post("/server/save/less", (req, res) => {
  const lessStr = req.body.value
  // exchange less to css by less compiler
  less.render(lessStr, (err, output) => {
    if (err) {
      res.send({
        status: 0,
        message: "Error compiling LESS",
      })
    } else {
      cssStr = output.css
      res.send({
        status: 1,
        message: "Save LESS successful",
      })
      tryGenerateCompleteHTML(res)
    }
  })
})
app.post("/server/save/js", (req, res) => {
  jsStr = req.body.value
  res.send({
    status: 1,
    message: "Save JS successful",
  })
  tryGenerateCompleteHTML(res)
})

app.post("/server/save/init", (req, res) => {
  htmlStr = req.body.html
  cssStr = req.body.less
  jsStr = req.body.js
  tryGenerateCompleteHTML()
  res.send({
    status: 1,
    message: "Init successful",
  })
})

function tryGenerateCompleteHTML() {
  completeHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>${cssStr}</style>
      </head>
      <body>
        ${htmlStr}
        <script>${jsStr}</script>
      </body>
      </html>
    `
}

app.get("/html*", (req, res) => {
  res.type("html")
  res.send(completeHTML)
})

const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
