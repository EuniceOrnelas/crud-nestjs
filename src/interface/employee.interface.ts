import { Document } from 'mongoose';

/**
 * Interfaz que representa la estructura de un documento de empleado en la base de datos.
 * Extiende la interfaz `Document` de Mongoose para habilitar funcionalidades de Mongoose.
 */
export interface IEmployee extends Document {
    /**
     * Nombre del empleado.
     */
    readonly name: string;

    /**
     * Número de empleado.
     */
    readonly employeeNumber: number;

    /**
     * Rol del empleado.
     */
    readonly role: string;

    /**
     * Género del empleado.
     */
    readonly gender: string;

    /**
     * Edad del empleado.
     */
    readonly age: number;
}
