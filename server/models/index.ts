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

interface Pizza
  extends Model<InferAttributes<Pizza>, InferCreationAttributes<Pizza>> {
  id: CreationOptional<number>;
  title: string;
  imageUrl: string;
  sizes: number[];
  bases: TBaseType[];
  price: number;
  categoryId: CreationOptional<number>;
  rating?: number;
}

export const Pizza = sequelize.define('pizza', {
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
    type: DataTypes.ARRAY(DataTypes.STRING),
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
