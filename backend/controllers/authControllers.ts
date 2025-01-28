const User = require('../models/userModel.ts')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi'); // Para validação de entrada

exports.register = async (req, res) => {
  // Validação com Joi
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Por favor, insira um e-mail válido.",
      "any.required": "O campo e-mail é obrigatório.",
    }),
    name: Joi.string().min(3).required().messages({
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
      "any.required": "O campo nome é obrigatório.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "A senha deve ter pelo menos 6 caracteres.",
      "any.required": "O campo senha é obrigatório.",
    }),
    phone: Joi.string()
      .pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
      .required()
      .messages({
        "string.pattern.base":
          "O telefone deve estar no formato (55) 55555-5555.",
        "any.required": "O campo telefone é obrigatório.",
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { email, name, password, phone } = req.body;

    // Verificar se o e-mail já está cadastrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Criar novo usuário
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar usuário. Tente novamente." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validação dos dados de entrada
  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  // Encontrar o usuário pelo e-mail
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  // Verificar a senha
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: "Senha inválida." });
  }

  // Gerar token JWT com expiração de 1 hora
  const expiresIn = 3600; // 1 hora
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "defaultSecret", // Configuração de fallback
    { expiresIn }
  );

  res.status(200).json({
    message: "Login realizado com sucesso.",
    token,
    expiresIn, // Adicione isso para garantir que o front-end receba a expiração
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone
    }
  });
  
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllUsers = async (req, res) =>{
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { email, name, password, phone } = req.body;

    // Verifica se o usuário existe
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualiza campos fornecidos
    if (email) user.email = email;
    if (name) user.name = name;
    if (phone) user.phone = phone;

    // Apenas rehash se uma nova senha for fornecida
    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

    // Salva alterações
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    await user.destroy()
    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}