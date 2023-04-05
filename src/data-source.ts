import { DataSource } from "typeorm";
import "dotenv/config";

// Entities
import { User } from "./entities/user.entity";
import { Contact } from "./entities/contact.entity";

// Migrations
import { initial1679866426382 } from "./migrations/1679866426382-initial";
import { addSecundaryPhone1680697306912 } from "./migrations/1680697306912-addSecundaryPhone";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT!),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  logging: true,
  synchronize: false,
  entities: [User, Contact],
  migrations: [initial1679866426382, addSecundaryPhone1680697306912],
});

export default AppDataSource;
