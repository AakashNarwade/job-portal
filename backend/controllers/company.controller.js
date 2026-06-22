import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: true });
    }
    let company = await Company.findOne({ companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "You can't register same company", success: false });
    }
    company = await Company.create({ companyName, userId: req.id });
    return res.status(200).json({
      message: "Company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select("fullName");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: `No company found for user ${user.fullName}!`,
        success: false,
      });
    }

    return res.status(200).json({
      message: `All companies registered by ${user.fullName}`,
      success: true,
      companies,
    });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ message: "No company found! ", success: false });
    }
    return res
      .status(200)
      .json({ message: "Companies listed", company, success: true });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  const { companyName, description, location, website, logo } = req.body;

  const file = req.file;

  try {
    const companyId = req.params.id;
    const updateData = { companyName, description, website, location, logo };

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { returnDocument: "after" },
    );
    if (!updatedCompany) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
      company: updatedCompany,
    });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
