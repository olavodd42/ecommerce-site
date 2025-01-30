import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

// Registro de novo usuário
exports.register = async (req, res) => {
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
        "string.pattern.base": "O telefone deve estar no formato (55) 55555-5555.",
        "any.required": "O campo telefone é obrigatório.",
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { email, name, password, phone } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, name, password: hashedPassword, phone });

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
    res.status(500).json({ error: (err as Error).message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Senha inválida." });
    }

    // Verifique se JWT_SECRET está definido
    const jwtSecret = process.env.JWT_SECRET;
    console.log(jwtSecret);
    if (!jwtSecret) {
      return res.status(500).json({ error: "JWT_SECRET não está definido." });
    }


    const expiresIn = 30 * 24 * 60 * 60; // 30 dias em segundos

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn }
    );

    res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      expiresIn,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Obter usuário atual
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const { email, name, phone, currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: "Senha atual é obrigatória para alterar a senha." });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha atual incorreta." });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (email) user.email = email;
    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();
    res.status(200).json({ message: "Usuário atualizado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    await user.destroy();
    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};