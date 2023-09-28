import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { IEmployee } from 'src/interface/employee.interface';
import { Model } from "mongoose";
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(@InjectModel('Employee') private employeeModel: Model<IEmployee>) { }

    /**
     * Crea un nuevo empleado.
     * @param createEmployeeDto - Los datos del nuevo empleado.
     * @returns Una promesa que resuelve en un objeto de empleado creado.
     */
    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<IEmployee> {
        const newEmployee = await new this.employeeModel(createEmployeeDto);
        return newEmployee.save();
    }

    /**
     * Actualiza un empleado existente por su ID.
     * @param employeeId - El ID del empleado a actualizar.
     * @param updateEmployeeDto - Los datos actualizados del empleado.
     * @returns Una promesa que resuelve en un objeto de empleado actualizado.
     * @throws NotFoundException si el empleado no se encuentra.
     */
    async updateEmployee(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<IEmployee> {
        const existingEmployee = await this.employeeModel.findByIdAndUpdate(employeeId, updateEmployeeDto, { new: true });
        if (!existingEmployee) {
            throw new NotFoundException(`Employee #${employeeId} not found`);
        }
        return existingEmployee;
    }

    /**
     * Obtiene todos los empleados.
     * @returns Una promesa que resuelve en una matriz de objetos de empleados.
     * @throws NotFoundException si no se encuentran empleados.
     */
    async getAllEmployees(): Promise<IEmployee[]> {
        const employeeData = await this.employeeModel.find();
        if (!employeeData || employeeData.length === 0) {
            throw new NotFoundException('Employees data not found!');
        }
        return employeeData;
    }

    /**
     * Obtiene un empleado por su ID.
     * @param employeeId - El ID del empleado a obtener.
     * @returns Una promesa que resuelve en un objeto de empleado encontrado.
     * @throws NotFoundException si el empleado no se encuentra.
     */
    async getEmployee(employeeId: string): Promise<IEmployee> {
        const existingEmployee = await this.employeeModel.findById(employeeId).exec();
        if (!existingEmployee) {
            throw new NotFoundException(`Employee #${employeeId} not found`);
        }
        return existingEmployee;
    }

    /**
     * Elimina un empleado por su ID.
     * @param employeeId - El ID del empleado a eliminar.
     * @returns Una promesa que resuelve en un objeto de empleado eliminado.
     * @throws NotFoundException si el empleado no se encuentra.
     */
    async deleteEmployee(employeeId: string): Promise<IEmployee> {
        const deletedEmployee = await this.employeeModel.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            throw new NotFoundException(`Employee #${employeeId} not found`);
        }
        return deletedEmployee;
    }
}
