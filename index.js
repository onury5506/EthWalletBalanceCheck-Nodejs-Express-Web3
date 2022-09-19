require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080

app.use(express.json())

app.post("/EthWalletCheck",(req,res)=>{
    res.send(process.env.TEST)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})