import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    nameOrganization: {type: String, require: true,},
    nameInGenitiveCase: {type: String, require: false,},
    addressOrganization: {type: String, require: false,},
    enterpriseRegisterCode: {type: String, require: false,},
    emailOrganization: {type: String, require: false,},
    phoneOrganization: {type: String, require: false,},
    createdBy_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true,},
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Organization", organizationSchema);