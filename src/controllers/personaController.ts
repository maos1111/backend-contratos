import { Request, Response } from 'express';
import Persona from '../models/Persona';

// @desc    Obtener todas las personas
// @route   GET /api/personas
export const obtenerPersonas = async (req: Request, res: Response): Promise<void> => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener personas', error: (error as Error).message });
  }
};

// @desc    Obtener una persona por ID
// @route   GET /api/personas/:id
export const obtenerPersonaPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      res.status(404).json({ mensaje: 'Persona no encontrada' });
      return;
    }
    res.json(persona);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener persona', error: (error as Error).message });
  }
};

// @desc    Crear una persona
// @route   POST /api/personas
export const crearPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tipoPersona, nombreCompleto, documento, email, telefono } = req.body;

    const persona = await Persona.create({
      tipoPersona,
      nombreCompleto,
      documento,
      email,
      telefono,
    });

    res.status(201).json(persona);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear persona', error: (error as Error).message });
  }
};

// @desc    Actualizar una persona
// @route   PUT /api/personas/:id
export const actualizarPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      res.status(404).json({ mensaje: 'Persona no encontrada' });
      return;
    }

    const personaActualizada = await Persona.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(personaActualizada);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al actualizar persona', error: (error as Error).message });
  }
};

// @desc    Eliminar una persona
// @route   DELETE /api/personas/:id
export const eliminarPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      res.status(404).json({ mensaje: 'Persona no encontrada' });
      return;
    }

    await Persona.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Persona eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar persona', error: (error as Error).message });
  }
};
