//---------- Import Dependencies ----------//
const mongoose = require('mongoose');       // Import Mongoose for MongoDB object modeling
const Schema = mongoose.Schema;             // Import Schema constructor from Mongoose
const bcrypt = require('bcrypt');           // Import bcrypt for hashing passwords
//----------------------------------------//


//---------- Define User Schema ----------//
const userSchema = new Schema({
  // User's first name (required)
  firstName: { 
    type: String, 
    required: true 
  },                  
  // User's last name (required)
  lastName: { 
    type: String, 
    required: true 
  },
  // User's email (required and must be unique)   
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // User's password (required)     
  password: { 
    type: String, 
    required: true 
  },
  // Add timestamps for createdAt and updatedAt fields            
}, { timestamps: true });  
//---------------------------------------//


//---------- Hash Password Before Save ----------//
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();           // Proceed if the password has not been modified

  try {
    const salt = await bcrypt.genSalt(10);                   // Generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password with the salt
    next();                                                  // Proceed to save the user
  } catch (err) {
    next(err);                                               // Pass any errors to the next middleware
  }
});
//----------------------------------------------//


//---------- Create User Model ----------//
const User = mongoose.model('User', userSchema);             // Create a Mongoose model using the user schema
//-------------------------------------//


//---------- Export User Model ----------//
module.exports = User;                                       // Export the User model for use in other parts of the application
//---------------------------------------//
