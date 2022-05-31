import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface:QueryInterface): Promise<void> {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING(255)
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      rating: {
        type: DataTypes.NUMBER
      },
      releaseDate: {
        type: DataTypes.STRING(10)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface:QueryInterface) {
    await queryInterface.dropTable('Movies');
  }
};
