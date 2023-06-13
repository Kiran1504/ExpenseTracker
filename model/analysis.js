const mongoose=require("mongoose")
const Schema = mongoose.Schema

const analysisSchema = new Schema(
    {
        "amount": {
            type: Number
        },
        "category": String,
        "GroceryA":{
            type : Number,
            default: 0,
            require: true
        },
        "MedicalA":{
            type : Number,
            default: 0,
            require: true
        },
        "StationaryA":{
            type : Number,
            default: 0,
            require: true
        },
        "PetrolA":{
            type : Number,
            default: 0,
            require: true
        },
        "IncomeA":{
            type : Number,
            default: 0,
            require: true
        },
        "RentA":{
            type : Number,
            default: 0,
            require: true
        },
        "MiscelleneousA":{
            type : Number,
            default: 0,
            require: true
        },
        "byuser"  : String

    }
    // { timestamps: true }
)


//collection creation
const expenseA = mongoose.model('Expense', analysisSchema) //creates new collection if not exist and if exist then push data 

module.exports = expenseA