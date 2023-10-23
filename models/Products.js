const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    supplier: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    product_location: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

// so, to create a object of Product model, you do Product({title:,.....})
//  which is Product(an_js_object_with_fields_required_in_this_model)
//this js_object is req.body . Ha aisa hi hai
// if any of the field asked in constructor is missing in this object, then error thrown, bc its a mongoose model
