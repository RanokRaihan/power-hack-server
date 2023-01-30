const Bill = require("../models/bill");

const addBill = async (req, res, next) => {
  let newBill = new Bill(req.body);

  try {
    // save to database
    const result = await newBill.save();

    res.status(200).json({
      message: "Billadded successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Bill adding failed!",
        },
      },
    });
  }
};

const billingList = async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    //get data from database
    const bills = await Bill.find({
      $or: [
        { fullName: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
        { mobile: { $regex: keyword, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(limit)
      .sort({ createddAt: -1 });
    if (bills && bills.length > 0) {
      try {
        // get total bill count
        const totalBillCount = await Bill.find({
          $or: [
            { fullName: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
            { mobile: { $regex: keyword, $options: "i" } },
          ],
        }).count();
        const totalBills = await Bill.find();
        const totalPaid = totalBills.reduce((total, current) => total + current.totalPaid, 0);
        res.status(200).json({
          bills,
          totalBills: totalBillCount,
          totalPaid,
        });
      } catch (error) {
        throw createError("Internal server Error!! Try again");
      }
    } else {
      throw createError("no bill found");
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// update bill
const updateBilling = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedBill = await Bill.updateOne({ _id: id }, req.body);

    res.status(200).json({
      updatedBill,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};
// delete bill
const deleteBilling = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Bill.deleteOne({ _id: id });

    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};
module.exports = { addBill, billingList, updateBilling, deleteBilling };
