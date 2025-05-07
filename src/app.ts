import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swaggerConfig";
import authRoutes from "./routes/authRoutes";
import tenantRoutes from "./routes/tenantRoutes";
import userRoutes from "./routes/userRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import listingRoutes from "./routes/listingRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API routes
app.use("/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
