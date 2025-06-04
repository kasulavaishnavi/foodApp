const mongoose = require("mongoose");

const DetailsSchema = mongoose.Schema({
  orderType: {
    type: String,
    required: true,
    enum: ['Dine In', 'Take Away'],
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: function() {
      return this.orderType === 'Take Away';
    }
  },
  city: {
    type: String,
    required: function() {
      return this.orderType === 'Take Away';
    }
  },
  state: {
    type: String,
    required: function() {
      return this.orderType === 'Take Away';
    }
  },
  zipCode: {
    type: Number,
    required: function() {
      return this.orderType === 'Take Away';
    }
  },
  country: {
    type: String,
    required: function() {
      return this.orderType === 'Take Away';
    }
  },
  table: {
    type: Number,
    required: function() {
      return this.orderType === 'Dine In';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {timestamps:true});


const Details = new mongoose.model("Details", DetailsSchema);

module.exports = Details;