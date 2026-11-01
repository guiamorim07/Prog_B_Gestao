import swaggerJSDoc, { type Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API de Gestão da Loja",
      version: "0.1.0",
      description: "Documentação da API de gestão da loja de roupas",
    },
    servers: [{ url: "http://localhost:3000", description: "Servidor Local" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./src/**/*.routes.ts", "./src/**/*.controller.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);