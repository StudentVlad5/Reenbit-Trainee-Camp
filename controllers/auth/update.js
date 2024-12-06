const { ValidationError } = require("../../helpers");
const { Users } = require("../../models");
const {
  userMainField,
  userFieldReceivedFromFront,
  dataFilter,
} = require("../../helpers");
const bcrypt = require("bcryptjs");

const update = async (req, res, next) => {
  const { id } = req.params;
  const newData = dataFilter(req.body, userFieldReceivedFromFront);
  if (req.body?.password) {
    const hashPassword = bcrypt.hashSync(
      req.body?.password,
      bcrypt.genSaltSync(10)
    );
    newData.password = hashPassword;
  }
  if (!newData) {
    throw new ValidationError("Bad request, invalid data");
  }
  req.file?.path && (newData.avatar = req.file.path);
  const resUpdate = await Users.findByIdAndUpdate({ _id: id }, newData, {
    new: true,
  });
  const newResponse = dataFilter(resUpdate, userMainField);
  req.file?.path && (newResponse.avatar = req.file.path);
  res.status(201).json(newResponse);
};
module.exports = update;
