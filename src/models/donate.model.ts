import mongoose from "mongoose"

const DonateSchema = new mongoose.Schema({
  area: String,
  charity: String,
  account: String,
  type: String,
  phone: String,
  address: String
})

export const Donate = mongoose.model("Donate", DonateSchema)
