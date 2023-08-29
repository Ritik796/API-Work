const express = require('express')
const app = express()
app.use(express.json())
const port = 5000
const admin = require("firebase-admin")
const functions = require('firebase-functions')
const cors = require("cors")
const serviceaccount = require('./Servicekey/ServicekeyAccountKey.json')
app.use(cors({origin:true}))
admin.initializeApp({
    credential: admin.credential.cert(serviceaccount),
    databaseURL: "https://wevois-office-management.firebaseio.com/"
})
const db = admin.database()
app.get('/Employees-data',(req,res)=>{
    const empref = db.ref("Employees")
    empref.get().then((data)=>{
        return res.status(200).json(data)
    })
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
    exports.app = functions.https.onRequest(app)
})