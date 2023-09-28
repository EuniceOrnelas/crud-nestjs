import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from '../../service/employee/employee.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from '../../schema/employee.schema';
/**
 * Pruebas unitarias para el controlador EmployeeController.
 */
describe('EmployeeController', () => {
  let controller: EmployeeController;
  const MockEmployeeService = {};
  /**
   * Antes de cada prueba, se crea un módulo de prueba y se obtiene una instancia del controlador.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService, {provide: getModelToken(Employee.name), useValue:MockEmployeeService}]
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  /**
   * Prueba para verificar que el controlador esté definido.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
