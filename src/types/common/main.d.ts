// types/common/main.d.ts

declare namespace ndb {
    interface idb {
      [index: string]: any
      sequelize:       any,
      Sequelize:       Sequelize
    }
}