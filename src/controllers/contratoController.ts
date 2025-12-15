import { Request, Response } from 'express';
import Contrato from '../models/Contrato';

// @desc    Obtener todos los contratos
// @route   GET /api/contratos
export const obtenerContratos = async (req: Request, res: Response): Promise<void> => {
  try {
    const contratos = await Contrato.find()
      .populate('locador', 'nombreCompleto documento')
      .populate('locatario', 'nombreCompleto documento')
      .populate('inmueble', 'tipo descripcion ubicacion')
      .populate('creadoPor', 'nombre email');

    res.json(contratos);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al obtener contratos', error: (error as Error).message });
  }
};

// @desc    Obtener un contrato por ID
// @route   GET /api/contratos/:id
export const obtenerContratoPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const contrato = await Contrato.findById(req.params.id)
      .populate('locador')
      .populate('locatario')
      .populate('inmueble')
      .populate('creadoPor', 'nombre email');

    if (!contrato) {
      res.status(404).json({ mensaje: 'Contrato no encontrado' });
      return;
    }

    res.json(contrato);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener contrato', error: (error as Error).message });
  }
};

// @desc    Crear un contrato
// @route   POST /api/contratos
export const crearContrato = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tipoContrato, locador, locatario, inmueble, fechaInicio, fechaFin, monto, usuario } =
      req.body;

    const contrato = await Contrato.create({
      tipoContrato,
      locador,
      locatario,
      inmueble,
      fechaInicio,
      fechaFin,
      monto,
      creadoPor: usuario.id,
    });

    const contratoCompleto = await Contrato.findById(contrato._id)
      .populate('locador')
      .populate('locatario')
      .populate('inmueble')
      .populate('creadoPor', 'nombre email');

    res.status(201).json(contratoCompleto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear contrato', error: (error as Error).message });
  }
};

// @desc    Actualizar un contrato
// @route   PUT /api/contratos/:id
export const actualizarContrato = async (req: Request, res: Response): Promise<void> => {
  try {
    const contrato = await Contrato.findById(req.params.id);
    if (!contrato) {
      res.status(404).json({ mensaje: 'Contrato no encontrado' });
      return;
    }

    const contratoActualizado = await Contrato.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('locador')
      .populate('locatario')
      .populate('inmueble')
      .populate('creadoPor', 'nombre email');

    res.json(contratoActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al actualizar contrato', error: (error as Error).message });
  }
};

// @desc    Eliminar un contrato
// @route   DELETE /api/contratos/:id
export const eliminarContrato = async (req: Request, res: Response): Promise<void> => {
  try {
    const contrato = await Contrato.findById(req.params.id);
    if (!contrato) {
      res.status(404).json({ mensaje: 'Contrato no encontrado' });
      return;
    }

    await Contrato.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Contrato eliminado correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al eliminar contrato', error: (error as Error).message });
  }
};
