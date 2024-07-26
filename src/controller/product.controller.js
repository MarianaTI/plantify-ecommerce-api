import Product from "../models/product.js";
import Categories from "../models/categories.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

export const create = async (req, res) => {
  try {
    const { name, description, price, stars, id_category } = req.body;

    if (!name || !description || !price || !stars || !id_category)
      res.status(400).json({ message: "the field is empty" });

    const newProduct = new Product({
      name,
      description,
      price,
      stars,
      id_category,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      newProduct.image = {
        publicId: result.public_id,
        secureUrl: result.secure_url,
      };

      fs.unlink(req.files.image.tempFilePath);
    }

    if (req.files?.imageBackground) {
      const resultBackground = await uploadImage(
        req.files.imageBackground.tempFilePath
      );
      newProduct.imageBackground = {
        publicId: resultBackground.public_id,
        secureUrl: resultBackground.secure_url,
      };

      fs.unlink(req.files.imageBackground.tempFilePath);
    }

    const productSave = await newProduct.save();
    return res.status(201).json({ message: "Product created: ", productSave });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("id_category", "name");

    const productFilter = products.map((prod) => ({
      _id: prod._id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stars: prod.stars,
      category: prod.id_category ? prod.id_category.name : "Unknown",
      categoryId: prod.id_category._id,
      image: prod.image,
      imageBackground: prod.imageBackground,
    }));

    const response = {
      products: productFilter,
      total: productFilter.length,
    };

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("id_category", "_id name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productFilter = {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stars: product.stars,
      category: {
        _id: product.id_category._id,
        name: product.id_category.name,
      },
      image: product.image,
      imageBackground: product.imageBackground,
    };

    return res.status(200).json(productFilter);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto" });
  }
};
