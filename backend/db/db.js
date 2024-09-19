const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.osm2m7k.mongodb.net/realestate');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
},{timestamps: true});
const listingSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      regularPrice: {
        type: Number,
        required: true,
      },
      discountPrice: {
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: true,
      },
      bedrooms: {
        type: Number,
        required: true,
      },
      furnished: {
        type: Boolean,
        required: true,
      },
      parking: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      offer: {
        type: Boolean,
        required: true,
      },
      imageUrls: {
        type: Array,
        required: true,
      },
      userRef: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
);
  
const User = mongoose.model('User', userSchema);
const Listing = mongoose.model('Listing', listingSchema);
module.exports = {
    User,
    Listing
};