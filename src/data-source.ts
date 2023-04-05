import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

// Entities
import { User } from "./entities/user.entity";
import { Contact } from "./entities/contact.entity";

// Migrations
import { initial1679866426382 } from "./migrations/1679866426382-initial";
import { addSecundaryPhone1680697306912 } from "./migrations/1680697306912-addSecundaryPhone";

const dataSourceConfig = (): DataSourceOptions => {
  const nodeEnv: string = process.env.NODE_ENV!;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [User, Contact],
      migrations: [initial1679866426382, addSecundaryPhone1680697306912],
    };
  }

  return {
    type: "postgres",
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT!),
    logging: true,
    synchronize: false,
    entities: [User, Contact],
    migrations: [initial1679866426382, addSecundaryPhone1680697306912],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export default AppDataSource;
