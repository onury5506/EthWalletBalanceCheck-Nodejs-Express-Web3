require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080

app.use(express.json())

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER))

app.post("/EthWalletBalanceCheck",async (req,res)=>{
    let wallets = req.body.wallets
    if(!Array.isArray(wallets)){
        return res.send({
            error:"Invalid Input!"
        })
    }
    let response = []
    let promises = []

    wallets.forEach((wallet,i)=>{

        let walletBalance = {
            wallet,
            error:false
        }

        response[i] = walletBalance

        if(web3.utils.isAddress(wallet)){
            let promise = web3.eth.getBalance(wallet,(err,balance)=>{
                if(err){
                    walletBalance.error=true
                    return walletBalance.errorMsg = err
                }
                walletBalance.balance = balance
            })
            promises.push(promise)
        }else{
            walletBalance.error=true
            walletBalance.errorMsg = "Wallet is not valid!"
        }
    })

    await Promise.all(promises)

    res.send(response)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})