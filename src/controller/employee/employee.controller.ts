import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../dto/update-employee.dto';
import { EmployeeService } from '../../service/employee/employee.service';

@Controller('Employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }
    // Se cambia nombre de la variable "EmployeeService" a "employeeService" para seguir las convenciones de nomenclatura.

    /**
     * Endpoint para crear un nuevo empleado.
     * 
     * @param response - La respuesta HTTP.
     * @param createEmployeeDto - Los datos del empleado a crear.
     * @returns Una respuesta JSON que indica el estado de la creación.
     */
    @Post()
    async createEmployee(@Res() response, @Body() createEmployeeDto: CreateEmployeeDto) {
        try {
            const newEmployee = await this.employeeService.createEmployee(createEmployeeDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Employee has been created successfully',
                newEmployee,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Employee not created!',
                error: 'Bad Request'
            });
        }
    }

    /**
     * Endpoint para actualizar un empleado existente por su ID.
     * 
     * @param response - La respuesta HTTP.
     * @param EmployeeId - El ID del empleado a actualizar.
     * @param updateEmployeeDto - Los datos actualizados del empleado.
     * @returns Una respuesta JSON que indica el estado de la actualización.
     */
    @Put('/:id')
    async updateEmployee(@Res() response,
        @Param('id') EmployeeId: string,
        @Body() updateEmployeeDto: UpdateEmployeeDto) {
        try {
            const existingEmployee = await this.employeeService.updateEmployee(EmployeeId, updateEmployeeDto);
            return response.status(HttpStatus.OK).json({
                message: 'Employee has been successfully updated',
                existingEmployee,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    /**
     * Endpoint para obtener todos los empleados.
     * 
     * @param response - La respuesta HTTP.
     * @returns Una respuesta JSON con los datos de todos los empleados.
     */
    @Get()
    async getEmployees(@Res() response) {
        try {
            const EmployeeData = await this.employeeService.getAllEmployees();
            return response.status(HttpStatus.OK).json({
                message: 'All employees data found successfully',
                EmployeeData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    /**
     * Endpoint para obtener un empleado por su ID.
     * 
     * @param response - La respuesta HTTP.
     * @param EmployeeId - El ID del empleado a obtener.
     * @returns Una respuesta JSON con los datos del empleado encontrado.
     */
    @Get('/:id')
    async getEmployee(@Res() response, @Param('id') EmployeeId: string) {
        try {
            const existingEmployee = await this.employeeService.getEmployee(EmployeeId);
            return response.status(HttpStatus.OK).json({
                message: 'Employee found successfully',
                existingEmployee,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    /**
     * Endpoint para eliminar un empleado por su ID.
     * 
     * @param response - La respuesta HTTP.
     * @param EmployeeId - El ID del empleado a eliminar.
     * @returns Una respuesta JSON que indica el estado de la eliminación.
     */
    @Delete('/:id')
    async deleteEmployee(@Res() response, @Param('id') EmployeeId: string) {
        try {
            const deletedEmployee = await this.employeeService.deleteEmployee(EmployeeId);
            return response.status(HttpStatus.OK).json({
                message: 'Employee deleted successfully',
                deletedEmployee,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
