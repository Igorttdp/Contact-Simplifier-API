import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Sourcer initialization");
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
})();
