 const express = require('express')
 const mysql = require('mysql2')
 const dotenv = require('dotenv')
  
 const app = express()
 dotenv.config()

 const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
 })

 db.connect((error) => {
if(error) {
    return console.log("Error Conecting to mysql", error)
}
console.log("mysql connection successful")
 })

//get patients
 app.get('/get-patients', (req, res) => {
const getpatients = "SELECT * FROM patients"

db.query(getpatients, (error, results) => {
if (error) {
    return res.status(500).json("failed to fetch the patients")
}
res.status(200).send(results)
})
 })

 //get providers
 app.get('/get-providers', (req, res) => {
    const getproviders = "SELECT * FROM provider"
    
    db.query(getproviders, (error, results) => {
    if (error) {
        return res.status(500).json("failed to fetch the providers")
    }
    res.status(200).send(results)
    })
     })
    
    


   //get patients by first name
   app.get('/get-patients/first-name/:firstName', (req, res) => {
    const firstName = req.params.firstName;
    const getPatientsByFirstName = "SELECT * FROM patients WHERE first_name = ?";

    db.query(getPatientsByFirstName, [firstName], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Failed to fetch the patients" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No patients found with this first name" });
        }
        res.status(200).send(results);
    });
});


     //get providers by their specialty
     app.get('/get-providers/specialty/:specialty', (req, res) => {
        const specialty = req.params.specialty;
        const getProvidersBySpecialty = "SELECT * FROM provider WHERE specialty = ?";
    
        db.query(getProvidersBySpecialty, [specialty], (error, results) => {
            if (error) {
                return res.status(500).json({ message: "Failed to fetch the providers" });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "No providers found for this specialty" });
            }
            res.status(200).send(results);
        });
    });

   const PORT = 3000;
   app.listen(PORT, () => {
console.log(`server is running on PORT ${PORT}`)
   }) 