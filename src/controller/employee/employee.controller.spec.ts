// Importaciones necesarias para las pruebas unitarias
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller'; // Importa el controlador de empleados a probar
import { EmployeeService } from '../../service/employee/employee.service'; // Importa el servicio de empleados
import { CreateEmployeeDto } from '../../dto/create-employee.dto'; // Importa el DTO para crear empleados
import { UpdateEmployeeDto } from '../../dto/update-employee.dto'; // Importa el DTO para actualizar empleados
import mongoose, { Model } from 'mongoose'; // Importa Mongoose y el modelo empleado (Employee)
import { Employee } from '../../schema/employee.schema'; // Importa el esquema empleado (Employee)

describe('EmployeeController', () => {
  let employeeController: EmployeeController; // Declara una variable para el controlador de empleados
  let employeeService: EmployeeService; // Declara una variable para el servicio de empleados
  let model: Model<Employee>; // Declara una variable para el modelo de empleados (Employee)

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController], // Define los controladores para las pruebas
      providers: [EmployeeService], // Define los proveedores/servicios para las pruebas
    }).compile(); // Compila el módulo de pruebas

    employeeController = module.get<EmployeeController>(EmployeeController); // Obtiene una instancia del controlador de empleados
    employeeService = module.get<EmployeeService>(EmployeeService); // Obtiene una instancia del servicio de empleados
  });

  // Prueba básica para verificar si el controlador está definido
  it('should be defined', () => {
    expect(employeeController).toBeDefined(); // Verifica que el controlador de empleados esté definido
  });

  // Bloque de pruebas para el método createEmployee del controlador
  describe('createEmployee', () => {
    // Prueba para verificar la creación de un nuevo empleado
    it('should create a new employee', async () => {
      // Define un objeto de ejemplo para simular la creación de un empleado
      const mockCreateEmployeeDto: CreateEmployeeDto = {
        name: "Markos",
        employeeNumber: 224,
        role: "developer",
        gender: "Male",
        age: 32
      };

      // Simula la creación de un empleado y devuelve el objeto simulado
      jest.spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockCreateEmployeeDto));

      // Ejecuta el método createEmployee del controlador con los datos simulados y espera la respuesta
      const response = await employeeController.createEmployee({} as any, mockCreateEmployeeDto);

      // Verifica que la respuesta coincida con el objeto esperado
      expect(response).toMatchObject({
        message: 'Employee has been created successfully',
        newEmployee: mockCreateEmployeeDto,
      });
    });

    // Prueba para verificar el manejo de errores al crear un empleado
    it('should handle error while creating employee', async () => {
      // Define un objeto de ejemplo para simular la creación de un empleado
      const mockCreateEmployeeDto: CreateEmployeeDto = {
        name: "Markos",
        employeeNumber: 224,
        role: "developer",
        gender: "Male",
        age: 32
      };

      // Simula un error al crear un empleado y devuelve un error
      jest.spyOn(employeeService, 'createEmployee').mockRejectedValueOnce(new Error('Failed to create employee'));

      // Ejecuta el método createEmployee del controlador con datos simulados y espera la respuesta de error
      const response = await employeeController.createEmployee({} as any, mockCreateEmployeeDto);

      // Verifica que la respuesta de error coincida con el objeto esperado
      expect(response).toMatchObject({
        statusCode: 400,
        message: 'Error: Employee not created!',
        error: 'Bad Request',
      });
    });
  });

});

