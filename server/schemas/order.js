import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String, required: true },
  building: { type: String },
  apartment: { type: String }
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String },
  address: { type: AddressSchema, required: true }
});

const ProductSchema = new Schema({
  menu_name: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const OrderSchema = new Schema({
  date: { type: Date, default: Date.now },
  user: { type: UserSchema, required: true },
  products: { type: [ProductSchema], required: true }
});

export default mongoose.model('Order', OrderSchema);
