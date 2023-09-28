import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

/**
 * Clase DTO utilizada para actualizar un empleado existente.
 * Extiende la clase `CreateEmployeeDto` para reutilizar las reglas de validación de creación.
 */
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
