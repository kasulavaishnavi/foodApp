const mongoose = require("mongoose");

const DetailsSchema = mongoose.Schema({
  orderType: {
    type: String,
    required: true,
    enum: ['dine-in', 'takeaway'],
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
      return this.orderType === 'takeaway';
    }
  },
  city: {
    type: String,
    required: function() {
      return this.orderType === 'takeaway';
    }
  },
  state: {
    type: String,
    required: function() {
      return this.orderType === 'takeaway';
    }
  },
  zipCode: {
    type: Number,
    required: function() {
      return this.orderType === 'takeaway';
    }
  },
  country: {
    type: String,
    required: function() {
      return this.orderType === 'takeaway';
    }
  },
  table: {
    type: Number,
    required: function() {
      return this.orderType === 'dine-in';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {timestamps:true});


const Details = new mongoose.model("Details", DetailsSchema);

module.exports = Details;