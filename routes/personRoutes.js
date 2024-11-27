const express= require('express');
const router=express.Router();
const Person = require('./../models/Person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data
        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);
        // Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find(); // Fetching data from the Person model
        console.log('Data fetched');
        res.status(200).json(data); // Sending the fetched data as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the workType from the URL parameter
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('Response fetched');
            res.status(200).json(response); // Send the response
        } else {
            res.status(404).json({ error: 'Invalid workType' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the id from the URL parameter //
        const updatedPersonData = req.body; // updated data for the person //

        const response=await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new:true, // Return the updated document //
        runValidators:true, // Runs Mongoose validation //
        })

        if(!response){
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;  // Extract the person's ID from the URL parameter //
        const response = await Person.findByIdAndDelete(personId); // Use the correct Mongoose method

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data deleted');
        res.status(200).json({ message: 'Person deleted successfully' });  // Send the deleted document //
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;


