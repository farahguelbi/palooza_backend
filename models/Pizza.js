const mongoose=require('mongoose');
const type = require('./type');

const pizzaSchema=new mongoose.Schema(
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
        reference:{
            type:String,
            default:''
        },
        description:{
            type:String,
            default:''
        },
        price:{
            type:Number,
            required:true,
            default:0
        },
        ingredients:
            [
                {
                   type:mongoose.Schema.Types.ObjectId,ref:'Ingredient',
                   quantity: { type: Number, default: 1 }
                }
            ],
       
    
      
        type:{
            type: String,
            enum: ['Full Pizza', 'Slice'],
            required: true,
            default:'Full Pizza'

        },

        size: { 
            small: {
              price: { type: Number, required: true },
            },
            medium: {
              price: { type: Number, required: true },
            },
            large: {
              price: { type: Number, required: true },
            }
          },
       
        },

       
         { timestamps: true });

module.exports = mongoose.model('Pizza', pizzaSchema);

    