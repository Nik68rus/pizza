import { TBaseType } from './../types/index';
import sequelize from '../db';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

interface Category
  extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  id: CreationOptional<number>;
  title: string;
}

export const Category = sequelize.define<Category>('category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export interface IPizza
  extends Model<InferAttributes<IPizza>, InferCreationAttributes<IPizza>> {
  id: CreationOptional<number>;
  title: string;
  imageUrl: string;
  sizes: number[];
  bases: string[];
  price: number;
  categoryId: CreationOptional<number>;
  rating?: number;
}

export const Pizza = sequelize.define<IPizza>('pizza', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sizes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  bases: {
    type: DataTypes.ARRAY(DataTypes.ENUM('традиционное', 'тонкое')),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  categoryId: DataTypes.INTEGER,
});

Category.hasMany(Pizza);
Pizza.belongsTo(Category);
