const Ingredient= require('../models/ingredient');
//get All ingredients
exports.getAllIngredients=async(req,res)=>{
    try{
        const ingredients=await Ingredient.find();
        res.status(200).json(ingredients);
    }catch(err){
        res.status(500).json({message:err.message});        
    }
};
//get a specific ingredient By Id 
exports.getIngredientById=async(req,res)=>{
    try{
        const ingredient=await Ingredient.findById(req.params.id);
        if(!ingredient) return res.status(404).json({message:'Ingredient not found'});
        res.status(200).json(ingredient);

    }catch(err){
        res.status(500).json({ message: err.message }); 
    }
};











































// Fetch all ingredients categorized by layer
exports.getIngredientsByLayer = async (req, res) => {
    try {
      // Fetch all ingredients
      const ingredients = await Ingredient.find();
  
      // Categorize ingredients by layer (dough, sauce, cheese, topping)
      const categorizedIngredients = {
        dough: ingredients.filter(ingredient => ingredient.layer === 'dough'),
        sauce: ingredients.filter(ingredient => ingredient.layer === 'sauce'),
        cheese: ingredients.filter(ingredient => ingredient.layer === 'cheese'),
        topping: ingredients.filter(ingredient => ingredient.layer === 'topping'),
      };
  
      res.status(200).json(categorizedIngredients);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };