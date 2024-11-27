const express = require('express');
const router =express.Router();
const MenuItem=require('../models/MenuItem');

// POST Method to add a Menu Item
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the menu item data
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data saved');
        res.status(200).json(response); // Sending the saved data as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET method to get the Menu Items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find(); // Fetching data from the MenuItem model
        console.log('Data fetched');
        res.status(200).json(data); // Sending the fetched data as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:taste', async (req, res) => {
    try {
        const taste=req.params.taste;
        if(taste==='sweet' || taste==='spicy' || taste==='sour'){
            const response = await MenuItem.find({ taste });
            console.log('Response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({ error: 'Invalid taste' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:taste', async (req, res) => {
    try{
        const taste=req.params.taste;
        const updatedMenuItemData=req.body;

        const response=await MenuItem.findByIdAndUpdate(taste, updatedMenuItemData,{
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
});

router.delete('/:taste', async (req, res) => {

    try{
        const taste=req.params.taste;
        const response=await MenuItem.findByIdAndDelete(taste);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data deleted');
        res.status(200).json({ message: 'Person deleted successfully' });  // Send the deleted document //
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router;