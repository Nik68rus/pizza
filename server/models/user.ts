import sequelize from '../db';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<number>;
  email: string;
  password: string;
  name: string;
  activationLink: string;
  isActivated: CreationOptional<boolean>;
  isAdmin: CreationOptional<boolean>;
}

export const User = sequelize.define<User>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activationLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

interface Token
  extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  id: CreationOptional<number>;
  userId: CreationOptional<number>;
  refreshToken: string;
}

export const Token = sequelize.define<Token>('token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: DataTypes.INTEGER,
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

User.hasOne(Token);
Token.belongsTo(User);
