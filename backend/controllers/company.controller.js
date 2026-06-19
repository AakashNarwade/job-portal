import { Company } from "../models/company.model.js";

const registerCompany = async (req, res) => {
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
    console.log("error=> ", error);
  }
};

const getCompany = async (req, res) => {};
