

const mongoose = require('mongoose');

const pizzaCustomSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            default:'Custom pizza'
        },
        image:{
            type:String,
            default:''

        },
     
        price:{
            type:Number,
            required:true,
            default:0
        },
        ingredients: [
          {
            ingredient: {
             type:String,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
              default: 1,
            },
          },
        ],
        
    
      
          userId:{type : String , required : true},
          size:{type : String , required : true}

       
       
        },

      
         { timestamps: true });

module.exports = mongoose.model('PizzaCustom', pizzaCustomSchema);

    