import db from './db';
import { Sequelize, DataTypes, Model } from 'sequelize';


// class EventModel extends Model {}

// EventModel.init({
//   id: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   calId: {
//       type: DataTypes.STRING,
//       allowNull: false
//   }
// }, {
//   db,
//   modelName: 'EventModel'
// });

export default function(sequelize : any) {
  sequelize.define('EventsModel', {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    calId: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize: sequelize,
    modelName: 'EventModel'
  });
}
