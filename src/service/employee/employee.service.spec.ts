import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from '../../schema/employee.schema';
/**
 * Pruebas unitarias para el servicio EmployeeService.
 */
describe('EmployeeService', () => {
  let service: EmployeeService;
  const MockEmployeeService = {};
  /**
   * Antes de cada prueba, se crea un módulo de prueba y se obtiene una instancia del servicio.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService, {provide: getModelToken(Employee.name), useValue:MockEmployeeService}],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  /**
   * Prueba para verificar que el servicio esté definido.
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

