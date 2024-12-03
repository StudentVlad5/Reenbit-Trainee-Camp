const {
  ValidationError,
  usersMainField,
  dataFilter,
} = require("../../helpers");
const { Users } = require("../../models");

const getAllUsers = async (req, res, next) => {
  const { id } = req.params;
  try {
    const allUsers = await Users.find().sort({ createdAt: -1 });
    const newallUsers = allUsers.filter((it) => it._id.toString() !== id.toString()).map(it=> dataFilter(it, usersMainField)
    );
    res.status(200).json(newallUsers);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllUsers;
