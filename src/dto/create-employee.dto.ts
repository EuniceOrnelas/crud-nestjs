import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

/**
 * Clase DTO (Data Transfer Object) utilizada para crear un nuevo empleado en la aplicación.
 * Contiene las reglas de validación para los campos del empleado.
 */
export class CreateEmployeeDto {
    /**
     * Nombre del empleado.
     * Debe ser una cadena de texto no vacía con una longitud máxima de 60 caracteres.
     */
    @IsString()
    @MaxLength(60)
    @IsNotEmpty()
    readonly name: string;

    /**
     * Número de empleado.
     * Debe ser un número no vacío.
     */
    @IsNumber()
    @IsNotEmpty()
    readonly employeeNumber: number;

    /**
     * Rol del empleado.
     * Debe ser una cadena de texto no vacía con una longitud máxima de 50 caracteres.
     */
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly role: string;

    /**
     * Género del empleado.
     * Debe ser una cadena de texto no vacía con una longitud máxima de 8 caracteres.
     */
    @IsString()
    @MaxLength(8)
    @IsNotEmpty()
    readonly gender: string;

    /**
     * Edad del empleado.
     * Debe ser un número no vacío.
     */
    @IsNumber()
    @IsNotEmpty()
    readonly age: number;
}
