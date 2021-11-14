import { Sequelize } from 'sequelize'

const database = process.env.DB_NAME || 'ecs_cars'
const username = process.env.DB_USER_NAME || 'postgres'
const password = process.env.DB_USER_PASSWORD || ''
const dialect = 'postgres'
const host = '127.0.0.1'
const port = 5432

const sequelize =  new Sequelize({ database, username, password, host, port, dialect, logging: false })


export default sequelize
