import { Request, Response } from 'express';
import Inmueble from '../models/Inmueble';

// @desc    Obtener todos los inmuebles
// @route   GET /api/inmuebles
export const obtenerInmuebles = async (req: Request, res: Response): Promise<void> => {
  try {
    const inmuebles = await Inmueble.find();
    res.json(inmuebles);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al obtener inmuebles', error: (error as Error).message });
  }
};

// @desc    Obtener un inmueble por ID
// @route   GET /api/inmuebles/:id
export const obtenerInmueblePorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const inmueble = await Inmueble.findById(req.params.id);
    if (!inmueble) {
      res.status(404).json({ mensaje: 'Inmueble no encontrado' });
      return;
    }
    res.json(inmueble);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener inmueble', error: (error as Error).message });
  }
};

// @desc    Crear un inmueble
// @route   POST /api/inmuebles
export const crearInmueble = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tipo, descripcion, ubicacion, hectareas } = req.body;

    const inmueble = await Inmueble.create({
      tipo,
      descripcion,
      ubicacion,
      hectareas,
    });

    res.status(201).json(inmueble);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear inmueble', error: (error as Error).message });
  }
};

// @desc    Actualizar un inmueble
// @route   PUT /api/inmuebles/:id
export const actualizarInmueble = async (req: Request, res: Response): Promise<void> => {
  try {
    const inmueble = await Inmueble.findById(req.params.id);
    if (!inmueble) {
      res.status(404).json({ mensaje: 'Inmueble no encontrado' });
      return;
    }

    const inmuebleActualizado = await Inmueble.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(inmuebleActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al actualizar inmueble', error: (error as Error).message });
  }
};

// @desc    Eliminar un inmueble
// @route   DELETE /api/inmuebles/:id
export const eliminarInmueble = async (req: Request, res: Response): Promise<void> => {
  try {
    const inmueble = await Inmueble.findById(req.params.id);
    if (!inmueble) {
      res.status(404).json({ mensaje: 'Inmueble no encontrado' });
      return;
    }

    await Inmueble.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Inmueble eliminado correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al eliminar inmueble', error: (error as Error).message });
  }
};
