/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from "sequelize-typescript";

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from "../../core/constants";
const databaseConfig = require("./database.config");
import { UserModel } from "src/infrastructure/db/user/user.model";

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([UserModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];