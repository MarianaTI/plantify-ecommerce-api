import User from "../models/user.js";

export const getAll = async (req, res) => {
  try {
    const users = await User.find();

    const userFilter = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
    }));

    const response = {
      users: userFilter,
      total: userFilter.length,
    };
    
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};
