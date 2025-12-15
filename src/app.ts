import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import routes from './routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ mensaje: 'API de Contratos Inmobiliarios' });
});

// Rutas de la API
app.use('/api', routes);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

export default app;
