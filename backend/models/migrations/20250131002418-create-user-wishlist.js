module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserWishlist', {
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'users', // Deve ser minúsculo
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products', // Deve ser minúsculo
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    // Adicione índice único para evitar duplicatas
    await queryInterface.addConstraint('UserWishlist', {
      fields: ['userId', 'productId'],
      type: 'unique',
      name: 'unique_wishlist_entry'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('UserWishlist');
  }
};