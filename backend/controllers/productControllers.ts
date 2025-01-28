const ProductModel = require('../models/productModel.ts')


exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, specs } = req.body
        const product = await ProductModel.create({
            name,
            price,
            description,
            specs
        })
        res.status(201).json(Product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByPk(req.product.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllProducts = async (req, res) =>{
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, specs } = req.body;

    // Verifica se o usuário existe
    const product = await Product.findByPk(req.product.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Atualiza campos fornecidos
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (specs) product.specs = specs;

    // Salva alterações
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.product.id)
    await product.destroy()
    res.status(200).json({ message: 'Produto removido' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}