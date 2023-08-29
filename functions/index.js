/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const functions=require("firebase-functions");
const express=require("express");
const core = require('cors')
const app=express();
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://wevois-office-management.firebaseio.com/"
})
app.use(express.json())
app.use(core({origin:true}))
app.get("/", (req,res)=>{
    const db = admin.database()
    const empref = db.ref("Employees")
    empref.get().then((data)=>{
        return res.status(200).json(data)
    })
})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.employee = functions.https.onRequest(app)
