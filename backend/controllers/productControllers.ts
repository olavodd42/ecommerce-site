import multerConfig from '../config/multer'; // Importar o multer configurado
import Product from '../models/productModel';

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, freight, description, specs } = req.body;
    const user_id = req.user.id;

    // URL da imagem (se enviada)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const product = await Product.create({
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
    res.status(500).json({ error: (error as Error).message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.product.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, price, freight, description, specs, image } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

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
    res.status(500).json({ error: (error as Error).message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.product.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Produto removido' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};