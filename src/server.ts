import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
