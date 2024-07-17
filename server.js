const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const customerRouter = require("./routes/customerRoute")
const addressRouter = require("./routes/addressRoute")

const app = express()

app.use(express.json())
app.use(cors({
  origin: "*"
}))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use("/customer", customerRouter)
app.use("/address", addressRouter)

app.listen(9000, () => {
    console.log('Server is running on port 9000')
})
