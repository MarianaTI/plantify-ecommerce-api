import Categories from "../models/categories.js";

export const getAll = async (req, res) => {
  try {
    const categories = await Categories.find();

    const categoryFilter = categories.map((cat) => ({
      _id: cat._id,
      name: cat.name,
    }));

    const response = {
      categories: categoryFilter,
      total: categoryFilter.length,
    };

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las categorias" });
  }
};

export const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre es requerido" });
    }

    const newCategory = new Categories({name});

    const savedCategory = await newCategory.save(); 

    return res.status(201).json({ category: savedCategory });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la categoría" });
  }
};
