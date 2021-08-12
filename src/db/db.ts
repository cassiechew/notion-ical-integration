
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
const basename = path.basename(__filename);
import EventsModel from './events';

const db : ndb.idb = {
  sequelize: null,
  Sequelize: null
}

// Creates database
let sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].hasOwnProperty('associate')) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync all models that are not
// already in the database
sequelize.sync() 

EventsModel(sequelize);

export default db;