'use strict'
import {DataTypes, Model} from 'sequelize'
import sequelize from '../sequelize'


class Car extends Model {
  public id: string | undefined
  public model: string | undefined
  public make: string | undefined
  public year: number | undefined
  public colour: string | undefined
  public wordsSimilarToMake: string | undefined
}

Car.init({
  id: {
    type: DataTypes.BIGINT,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  model: {
    type: DataTypes.STRING,
    field: 'model',
    allowNull: false
  },
  make: {
    type: DataTypes.STRING,
    field: 'make',
    allowNull: false
  },
  colour: {
    type: DataTypes.STRING,
    field: 'colour',
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    field: 'year',
    allowNull: false
  },
  wordsSimilarToMake: {
    type: DataTypes.STRING,
    field: 'wordsSimilarToMake',
    allowNull: true
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  modelName: 'Car',
  tableName: 'cars'
})

export default Car