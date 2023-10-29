import express from 'express';
import expedicionesRoutes from './routes/expediciones.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors())

app.use("/api", expedicionesRoutes)
app.use("/api", authRoutes)

app.listen(5000)
console.log('server on port', 5000)