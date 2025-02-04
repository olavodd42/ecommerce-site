import multerConfig from '../config/multer'; // Importar o multer configurado
import Product from '../models/productModel';

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, sales, freight, description, specs } = req.body;
    const user_id = req.user.id;

    // URL da imagem (se enviada)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const product = await Product.create({
      name,
      user_id,
      category,
      price,
      quantity,
      sales,
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
    const product = await Product.findByPk(req.params.id);
    //console.log(req);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.findAll({
      order: [['sales', 'DESC']], // Ordena pelos mais vendidos
      limit: 10, // Retorna apenas os 10 mais vendidos
    });

    res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};



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
    const { category, price, quantity, sales, freight, description, specs, image } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (category) product.category = category;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (sales) product.sales = sales;
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
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Produto removido' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

exports.sellProduct = async (productId, quantity) => {
  try {
    if (!quantity || quantity <= 0) {
      throw new Error('Quantidade inválida');
    }

    const product = await Product.findByPk(productId); // ✅ Certificando-se de buscar pelo `productId`

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    if (product.quantity < quantity) {
      throw new Error('Estoque insuficiente');
    }

    // ✅ Atualizando o estoque corretamente
    product.quantity -= quantity;
    await product.save();

    return { success: true, message: 'Produto vendido com sucesso!', product };
  } catch (error) {
    console.error('Erro ao vender produto:', error);
    return { success: false, error: (error as Error).message };
  }
};


function async(req: any, res: any) {
  throw new Error('Function not implemented.');
}
