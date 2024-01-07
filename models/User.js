import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {type: String, require: true, unique: true,},
    passwordHash: {type: String, require: true,},
    firstName: {type: String, require: false,},
    middleName: {type: String, require: false,},
    lastName: {type: String, require: false,},
    position: {type: String, require: false,},
    startDate: {type: Date, required: false},
    birthday: {type: Date, required: false},
    personnelNumber: {type: String, require: false,},
    gender: {type: String, require: false,},
    taxPayerNumber: {type: String, require: false,},
    phone: {type: String, require: false,},
    createdBy_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: false,},
    organization_id: {type: mongoose.Schema.Types.ObjectId, ref: "Organization", require: false,},
    role: {type: String, default: "user"},
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);