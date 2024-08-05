import { Sequelize } from 'sequelize';


const db = new Sequelize('app', '', '', {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false,

});

export default db;


/* const sequelize = new Sequelize('sequelize_video', 'root', 'Charles@data', {
    dialect: 'mysql' }); */