const Pizza=require('../models/Pizza');
const Wishlist = require('../models/wishlist');
const mongoose = require('mongoose');

// add to wishlist
exports.addToWishlist = async (req, res) => {
  const { userID, pizzaId } = req.body;

  try {
     // Validate userId
     if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    // Check if the pizzaId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(pizzaId)) {
      return res.status(400).json({ message: 'Invalid pizzaId' });
    }

    // Convert pizzaId to ObjectId
    const pizzaObjectId = new mongoose.Types.ObjectId(pizzaId);

    let wishlist = await Wishlist.findOne({ userID });

    if (!wishlist) {
      // If no wishlist exists, create a new one
      wishlist = new Wishlist({
        userID,
        pizzas: [pizzaObjectId],  
      });
    } else {
      // If wishlist exists, check if pizza is already added
      if (wishlist.pizzas.includes(pizzaObjectId)) {
        return res.status(400).json({ message: 'Pizza already in wishlist' });
      }
      wishlist.pizzas.push(pizzaObjectId);  
    }

    // Save or update the wishlist
    await wishlist.save();
    res.status(200).json({ message: 'Pizza added to wishlist', wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// remove a pizza from the wishlist using DELETE
exports.removeFromWishlist = async (req, res) => {
  const { userId, pizzaId } = req.params; // Extract userId and pizzaId from route parameters

  try {
    // Find the wishlist associated with the user
    let wishlist = await Wishlist.findOne({ userID: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Convert pizzaId to ObjectId if necessary
    const pizzaObjId = new mongoose.Types.ObjectId(pizzaId);

    // Check if the pizza exists in the wishlist
    if (!wishlist.pizzas.includes(pizzaObjId)) {
      return res.status(400).json({ message: 'Pizza not in wishlist' });
    }

    // Remove pizza from the wishlist
    wishlist.pizzas = wishlist.pizzas.filter(id => id.toString() !== pizzaObjId.toString());

    // Save the updated wishlist
    await wishlist.save();
    res.status(200).json({ message: 'Pizza removed from wishlist', wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getWishlist = async (req, res) => {
  const userId = req.query.userID; // Use query parameter

  try {
    // Find the wishlist and populate the pizzas field
    const wishlist = await Wishlist.findOne({ userID: userId }).populate('pizzas');
    
    if (wishlist) {
      res.status(200).json(wishlist); // Send the populated wishlist
    } else {
      res.status(404).json({ msg: 'Wishlist not found' }); 
    }
  } catch (err) {
    console.error('Error fetching wishlist:', err); // Log the error
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};


exports.createWishList = async (req, res) => {
  try {
    console.log(" Creating Wishlist for user:", req.body.userID); 
    if (!req.body.userID) {
      return res.status(400).json({ message: " userID is required" });
    }
    const newWishList = new Wishlist(req.body); 
    await newWishList.save();

    res.status(201).json({ message: "Wishlist created successfully", newWishList });
  } catch (error) {
    console.error(" Error creating wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


