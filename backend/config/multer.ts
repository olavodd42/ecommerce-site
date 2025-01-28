import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Diretório de armazenamento dos arquivos
const uploadDir = path.join(__dirname, 'uploads');

// Garantir que a pasta "uploads" existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Define o local onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Gera um nome único para o arquivo
    },
});

// Filtro para aceitar apenas imagens
const fileFilter = (req: Request, file: multer.File, cb: FileFilterCallback): void => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Aceita o arquivo
    } else {
        cb(new Error('Apenas imagens são permitidas!')); // Rejeita o arquivo
    }
};

// Configuração do multer
const Upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5MB por arquivo (opcional)
    },
});

export default Upload;
