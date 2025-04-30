const Command = require('../models/command');
const Sale = require('../models/sale');  
const User = require('../models/user');  
const Cart = require('../models/cart');



exports.createCommand = async (req, res) => {
  try {
    const { userId, address, paymentMethod } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ userId }).populate("salesID");
    console.log("Cart:", cart);
    console.log("Cart.salesID:", cart?.salesID);

    if (!cart || !cart.salesID || !Array.isArray(cart.salesID) || cart.salesID.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found" });
    }

    const saleIds = cart.salesID.map((sale) => sale._id);
    console.log("Extracted saleIds:", saleIds);

    // Create a new command
    const newCommand = new Command({
      userId,
      address,
      saleId: saleIds, 
      orderStatus: "Pending",
      paymentStatus: "Unpaid",
      paymentMethod,
      totalPrice: cart.cartTotal,
    });

    // Save the new command in the database
    const savedCommand = await newCommand.save();

    // Clear the cart after placing the order
    cart.salesID = [];
    cart.cartTotal = 0;
    await cart.save();

    res.status(201).json(savedCommand);
  } catch (error) {
    console.error("Error creating command:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all commands
exports.getAllCommands = async (req, res) => {
  try {
    const commands = await Command.find().populate("userId").populate("saleId");
    res.status(200).json(commands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a command by ID
exports.getCommandById = async (req, res) => {
  try {
    const commandId = req.params.id;

    // Find the command and populate userId and saleId
    const command = await Command.findById(commandId)
      .populate("userId") 
      .populate("saleId"); 

    // Log the command for debugging
    console.log("Command:", command);

    // Check if the command exists
    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    // Return the command as a JSON response
    res.status(200).json(command);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching command by ID:", error);

    // Return a 500 error with the error message
    res.status(500).json({ message: error.message });
  }
};

// Update a command
exports.updateCommand = async (req, res) => {
  try {
    const updatedCommand = await Command.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }
    res.status(200).json(updatedCommand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a command
exports.deleteCommand = async (req, res) => {
  try {
    const deletedCommand = await Command.findByIdAndDelete(req.params.id);
    if (!deletedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }
    res.status(200).json({ message: "Command successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
