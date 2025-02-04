import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} EloShop. Todos os direitos reservados.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="/about" className="text-gray-400 hover:text-white transition">Sobre</a>
                    <a href="/contact" className="text-gray-400 hover:text-white transition">Contato</a>
                    <a href="/privacy" className="text-gray-400 hover:text-white transition">Política de Privacidade</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
