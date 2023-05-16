const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    name :{
        type : String,
        required :[true ,"category required"],
        unique : [true , 'category must be unique'],
        minlength : [3,"category name is too short"],
        maxlength : [32,"category name is too long"]
    },
    //A and B => shopping.com/A and B
    slug:{
        type:String,
        lowercase:true
    },
    image : String
},

{timestamps : true});


const CategoryModel = mongoose.model('category',categoryschema);

module.exports = CategoryModel;
