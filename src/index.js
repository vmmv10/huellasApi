import express from 'express';
import expedicionesRoutes from './routes/expediciones.routes.js';

const app = express();

app.use(express.json())
app.use("/api", expedicionesRoutes)

app.listen(5000)
console.log('server on port', 5000)