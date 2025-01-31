'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_wishlist', { // Nome da tabela padronizado
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', // Nome correto da tabela users
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true, // Definindo como parte da chave primária
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products', // Nome correto da tabela products
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true, // Definindo como parte da chave primária
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Adicionar índice único para evitar duplicatas (caso primaryKey não esteja suficiente)
    await queryInterface.addConstraint('user_wishlist', {
      fields: ['userId', 'productId'],
      type: 'unique',
      name: 'unique_wishlist_entry'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user_wishlist');
  }
};
