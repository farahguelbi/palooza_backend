
const PizzaCustom = require("../models/PizzaCustom");
const Ingredient = require("../models/ingredient");

const mongoose = require("mongoose");

// Create a custom pizza


exports.createPizza = async (req, res) => {
  const { selectedSize, ingredients } = req.body;

  try {
  

    // Create the pizza document
    const pizza = new PizzaCustom(req.body);

    // Save to the database
   const savedPizza =  await pizza.save();

    // Return the response
    res.status(201).json({
      success: true,
      message: "Pizza created successfully",
      data: savedPizza
    });
  } catch (err) {
    console.error("Error:", err.message); // Log error for debugging
    res.status(500).json({ success: false, message: err.message });
  }
};



// Fetch all custom pizzas
exports.getAllPizzas = async (req, res) => {
  try {
    // Find all pizzas
    const pizzas = await PizzaCustom.find();

    // Return the list of pizzas
    res.status(200).json({ success: true, data: pizzas });
  } catch (err) {
    console.error("Error fetching all pizzas:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.getPizzaById = async (req, res) => {
  try {
    const pizzaId = req.params.id;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(pizzaId)) {
      return res.status(400).json({ success: false, message: "Invalid pizza ID" });
    }

    // Find the pizza by ID
    const pizza = await PizzaCustom.findById(pizzaId);

    if (!pizza) {
      return res.status(404).json({ success: false, message: "Pizza not found" });
    }

    // Return the pizza data
    res.status(200).json({ success: true, data: pizza });
  } catch (err) {
    console.error("Error fetching pizza by ID:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};