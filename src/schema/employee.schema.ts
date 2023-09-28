import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// Definición del esquema de empleado 
@Schema()
export class Employee {

    // Propiedad que representa el nombre del empleado
    @Prop()
    name: string;
    // Propiedad que representa el número de empleado
    @Prop()
    employeeNumber: number;
    // Propiedad que representa el rol del empleado
    @Prop()
    role: string;
    // Propiedad que representa el género del empleado
    @Prop()
    gender: string;
    // Propiedad que representa la edad del empleado
    @Prop()
    age: number;
}
// Creación del esquema de Mongoose para la clase Employee
export const EmployeeSchema = SchemaFactory.createForClass(Employee);