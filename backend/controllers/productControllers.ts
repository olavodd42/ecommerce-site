const multerConfig = require('../config/multer'); // Importar o multer configurado
const ProductModel = require('../models/productModel.ts');

exports.createProduct = async (req, res) => {
    try {
        const { name, category, price, freight, description, specs } = req.body;
        const user_id = req.user.id;

        // URL da imagem (se enviada)
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await ProductModel.create({
            name,
            user_id,
            category,
            price,
            freight,
            description,
            specs,
            image: imageUrl, // Salvar a URL da imagem
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

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
    const products = await ProductModel.findAll()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { name, category, price, freight, description, specs, image } = req.body;

    // Verifica se o usuário existe
    const product = await ProductModel.findByPk(req.product.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Atualiza campos fornecidos
    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = price;
    if (freight) product.freight = freight;
    if (description) product.description = description;
    if (specs) product.specs = specs;
    if (image) product.image = image;

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
    const product = await ProductModel.findByPk(req.product.id)
    await product.destroy()
    res.status(200).json({ message: 'Produto removido' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}