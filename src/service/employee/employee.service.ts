import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { IEmployee } from 'src/interface/employee.interface';
import { Model } from "mongoose";
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    private readonly logger = new Logger(EmployeeService.name);
    constructor(@InjectModel('Employee') private employeeModel: Model<IEmployee>) { }

    /**
     * Crea un nuevo empleado.
     * @param createEmployeeDto - Los datos del nuevo empleado.
     * @returns Una promesa que resuelve en un objeto de empleado creado.
     */
    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<IEmployee> {
        try {
            const newEmployee = await new this.employeeModel(createEmployeeDto);
            const savedEmployee = await newEmployee.save();
            this.logger.log(`Employee created: ${savedEmployee._id}`);
            return savedEmployee;
        } catch (error) {
            this.logger.error(`Failed to create employee: ${error.message}`);
            throw error;
        }
    }

    /**
     * Actualiza un empleado existente por su ID.
     * @param employeeId - El ID del empleado a actualizar.
     * @param updateEmployeeDto - Los datos actualizados del empleado.
     * @returns Una promesa que resuelve en un objeto de empleado actualizado.
     * @throws NotFoundException si el empleado no se encuentra.
     */
    async updateEmployee(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<IEmployee> {
        try {
            const existingEmployee = await this.employeeModel.findByIdAndUpdate(employeeId, updateEmployeeDto, { new: true });
            if (!existingEmployee) {
                throw new NotFoundException(`Employee #${employeeId} not found`);
            }
            this.logger.log(`Employee updated: ${existingEmployee._id}`);
            return existingEmployee;
        } catch (error) {
            this.logger.error(`Failed to update employee: ${error.message}`);
            throw error;
        }
    }

    /**
     * Obtiene todos los empleados.
     * @returns Una promesa que resuelve en una matriz de objetos de empleados.
     * @throws NotFoundException si no se encuentran empleados.
     */
    async getAllEmployees(): Promise<IEmployee[]> {
        try {
            const employeeData = await this.employeeModel.find();
            if (!employeeData || employeeData.length === 0) {
                throw new NotFoundException('Employees data not found!');
            }
            this.logger.log(`Retrieved all employees`);
            return employeeData;
        } catch (error) {
            this.logger.error(`Failed to get all employees: ${error.message}`);
            throw error;
        }
    }

    /**
     * Obtiene un empleado por su ID.
     * @param employeeId - El ID del empleado a obtener.
     * @returns Una promesa que resuelve en un objeto de empleado encontrado.
     * @throws NotFoundException si el empleado no se encuentra.
     */
    async getEmployee(employeeId: string): Promise<IEmployee> {
        try {
            const existingEmployee = await this.employeeModel.findById(employeeId).exec();
            if (!existingEmployee) {
                throw new NotFoundException(`Employee #${employeeId} not found`);
            }
            this.logger.log(`Retrieved employee: ${existingEmployee._id}`);
            return existingEmployee;
        } catch (error) {
            this.logger.error(`Failed to get employee: ${error.message}`);
            throw error;
        }
    }

    /**
     * Elimina un empleado por su ID.
     * @param employeeId - El ID del empleado a eliminar.
     * @returns Una promesa que resuelve en un objeto de empleado eliminado.
     * @throws NotFoundException si el empleado no se encuentra.
     */
    async deleteEmployee(employeeId: string): Promise<IEmployee> {
        try {
            const deletedEmployee = await this.employeeModel.findByIdAndDelete(employeeId);
            if (!deletedEmployee) {
                throw new NotFoundException(`Employee #${employeeId} not found`);
            }
            this.logger.log(`Employee deleted: ${deletedEmployee._id}`);
            return deletedEmployee;
        } catch (error) {
            this.logger.error(`Failed to delete employee: ${error.message}`);
            throw error;
        }
    }
}
