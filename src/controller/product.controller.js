import Product from "../models/product.js"

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
    });

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

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    Object.assign(existingProduct, updateData);

    const update = await existingProduct.save();

    return res.status(200).json({ message: "Producto actualizado con éxito", product: update });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
};


