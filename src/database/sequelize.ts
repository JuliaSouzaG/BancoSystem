import { Sequelize } from 'sequelize'

const DATABASE_NAME = 'scb'
const USER_NAME = 'root'
const PASSWORD = '68012736Juju'
const HOST = 'localhost'

const sequelize = new Sequelize(DATABASE_NAME, USER_NAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
})

export default sequelize
