module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('UserWishlist', {
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users', // Nome da tabela users
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'products', // Nome da tabela products
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
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('UserWishlist');
    }
  };
  