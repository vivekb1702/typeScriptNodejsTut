import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Movie } from '@interfaces/movies.interface';

export type movieCreationAttributes = Optional<Movie, 'id'>;

export class MovieModal extends Model<Movie, movieCreationAttributes> implements Movie {
  public id: number;
  public title: string;
  public genres: string[];
  public rating: number;
  public releaseDate: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof MovieModal {
  MovieModal.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      genres: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      rating: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      releaseDate: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
    },
    {
      tableName: 'movies',
      sequelize,
    },
  );
  return MovieModal;
}
