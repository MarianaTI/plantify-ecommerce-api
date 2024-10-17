import Product from "../models/product.js";
import Categories from "../models/categories.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

export const create = async (req, res) => {
  try {
    const { name, description, price, stars } = req.body;

    if (!name || !description || !price || !stars)
      res.status(400).json({ message: "the field is empty" });

    const newProduct = new Product({
      name,
      description,
      price,
      stars,
      // id_category,
    });

    // if (req.files?.image) {
    //   const result = await uploadImage(req.files.image.tempFilePath);
    //   newProduct.image = {
    //     publicId: result.public_id,
    //     secureUrl: result.secure_url,
    //   };

    //   fs.unlink(req.files.image.tempFilePath);
    // }

    // if (req.files?.imageBackground) {
    //   const resultBackground = await uploadImage(
    //     req.files.imageBackground.tempFilePath
    //   );
    //   newProduct.imageBackground = {
    //     publicId: resultBackground.public_id,
    //     secureUrl: resultBackground.secure_url,
    //   };

    //   fs.unlink(req.files.imageBackground.tempFilePath);
    // }

    const productSave = await newProduct.save();
    return res.status(201).json({ message: "Product created: ", productSave });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("name");

    const productFilter = products.map((prod) => ({
      _id: prod._id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stars: prod.stars,
      // category: prod.id_category ? prod.id_category.name : "Unknown",
      // categoryId: prod.id_category._id,
      // image: prod.image,
      // imageBackground: prod.imageBackground,
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
    const product = await Product.findById(id).populate(
      "_id name"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productFilter = {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stars: product.stars,
      // category: {
      //   _id: product.id_category._id,
      //   name: product.id_category.name,
      // },
      // image: product.image,
      // imageBackground: product.imageBackground,
    };

    return res.status(200).json(productFilter);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const { name, description, price, stars } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (stars) updateData.stars = stars;
    // if (id_category) updateData.id_category = id_category;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // if (req.files?.image) {
    //   if (existingProduct.image?.publicId) {
    //     await deleteImage(existingProduct.image.publicId);  
    //   }
      
    //   const result = await uploadImage(req.files.image.tempFilePath);
    //   updateData.image = {
    //     publicId: result.public_id,
    //     secureUrl: result.secure_url,
    //   };

    //   await fs.unlink(req.files.image.tempFilePath);  
    // }

    // if (req.files?.imageBackground) {
    //   if (existingProduct.imageBackground?.publicId) {
    //     await deleteImage(existingProduct.imageBackground.publicId);  
    //   }

    //   const resultBackground = await uploadImage(req.files.imageBackground.tempFilePath);
    //   updateData.imageBackground = {
    //     publicId: resultBackground.public_id,
    //     secureUrl: resultBackground.secure_url,
    //   };

    //   await fs.unlink(req.files.imageBackground.tempFilePath);  
    // }

    Object.assign(existingProduct, updateData);

    const update = await existingProduct.save();

    return res.status(200).json({ message: "Producto actualizado con éxito", product: update });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
};


