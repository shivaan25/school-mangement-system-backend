import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management System API",
      version: "1.0.0",
      description: "Backend APIs for School Management System",
    },
    servers: [
      {
        url: "http://localhost:3002/api-docs",
        description: "Local server",
      },
    ],

    // 🔐 JWT SECURITY CONFIG
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // 👇 IMPORTANT: where swagger will look for comments
  apis: ["./src/modules/**/*.ts"],
};

export const swaggerSpecs = swaggerJSDoc(options);
