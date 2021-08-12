import { DataTypes } from 'sequelize';

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
