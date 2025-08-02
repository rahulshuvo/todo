// swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ToDo API",
      version: "1.0.0",
      description: "API documentation for the ToDo app",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change this after deployment
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/schemas/*.ts"], // Include all route and schema files
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
