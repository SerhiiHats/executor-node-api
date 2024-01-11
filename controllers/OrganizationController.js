import UserModel from "../models/User.js";
import OrganizationModel from "../models/Organization.js";
import jwt from "jsonwebtoken";

export const createOrganization = async (req, res) => {
  try {
    const createdBy_id = req.userId;
    const organizationId = req.organizationId;

    const user = await UserModel.findById(createdBy_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (organizationId) {
      const isExistOrganization = await OrganizationModel.findById(organizationId);

      if (isExistOrganization) {
        return res.status(404).json({
          message: "The organization already exists. " +
            "You can change just the name or delete the organization permanently."
        });
      }
    }

    const organization = new OrganizationModel({
      ...req.body,
      createdBy_id,
    });

    await organization.save();

    await UserModel.findByIdAndUpdate(
      {_id: createdBy_id},
      {
        organization_id: organization._id,
        createdBy_id: createdBy_id
      }
    );

    const jwtToken = jwt.sign(
      {
        _id: createdBy_id,
        _organization_id: organization._id,
      },
      "secretKeyForUser",
      {
        expiresIn: "30d"
      }
    );

    return res.status(201).json({
      jwtToken,
      ...organization._doc,
    })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Register organization failed"
    });
  }
}

export const getOrganization = async (req, res) => {
  try {

    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const organizationId = user.organization_id;

    const organization = await OrganizationModel.findById(organizationId);

    if (!organization) {
      return res.status(404).json({message: "Organization not found"});
    }

    return res.status(200).json(organization);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Organization fetching failed"
    });
  }
}

export const updateOrganization = async (req, res) => {
  try {
    const organizationId = req.organizationId;

    if (!organizationId) {
      return res.status(404).json({message: "Organization hasn't been created"});
    }

    const isExistOrganization = await OrganizationModel.findById(organizationId);

    if (!isExistOrganization) {
      return res.status(404).json({
        message: "Not found organization, please create it"
      });
    }

    const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
      organizationId,
      {...req.body},
      {new: true}
    );

    if (!updatedOrganization) {
      return res.status(404).json({message: "Organization not found"});
    }

    return res.status(200).json(updatedOrganization);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Organization update error"
    });

  }
}

export const removeOrganization = async (req, res) => {
  try {
    const organizationId = req.organizationId;
    if (!organizationId) {
      return res.status(404).json({message: "Organization hasn't been created"});
    }

    const removedOrganization = await OrganizationModel.findByIdAndDelete(organizationId);

    if (!removedOrganization) {
      return res.status(404).json({message: "Organization not found"});
    }
    return res.status(200).json(removedOrganization);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Organization deleted error"
    });
  }
}