import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from '../../schema/employee.schema';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';


describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let model: Model<Employee>;

  const mockEmployee = {
    _id: "651b3ee9bec5168aa0dc5012",
    name: "Markos",
    employeeNumber: 224,
    role: "developer",
    gender: "Male",
    age: 32
  };

  const mockEmployeeService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getModelToken(Employee.name),
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    model = module.get<Model<Employee>>(getModelToken(Employee.name));
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {

      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockEmployee]),
            }),
          } as any),
      );

      const result = await employeeService.getAllEmployees();


      expect(result).toEqual([mockEmployee]);
    });
  });

  describe('create', () => {
    it('should create and return a employee', async () => {
      const newEmployee = {
        name: "Markos",
        employeeNumber: 224,
        role: "developer",
        gender: "Male",
        age: 32
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockEmployee));

      const result = await employeeService.createEmployee(
        newEmployee as CreateEmployeeDto
      );

      expect(result).toEqual(mockEmployee);
    });
  });

  describe('findById', () => {
    it('should find and return a employee by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockEmployee);

      const result = await employeeService.getEmployee(mockEmployee._id);

      expect(model.findById).toHaveBeenCalledWith(mockEmployee._id);
      expect(result).toEqual(mockEmployee);
    });

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(employeeService.getEmployee(id)).rejects.toThrow(
        BadRequestException,
      );

      expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
      isValidObjectIDMock.mockRestore();
    });

    it('should throw NotFoundException if employee is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(employeeService.getEmployee(mockEmployee._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findById).toHaveBeenCalledWith(mockEmployee._id);
    });
  });

  describe('updateById', () => {
    it('should update and return a employee', async () => {
      const updatedEmployee = { ...mockEmployee, name: 'Updated name' };
      const employee = { name: 'Updated name' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedEmployee);

      const result = await employeeService.updateEmployee(mockEmployee._id, employee as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockEmployee._id, employee, {
        new: true,
        runValidators: true,
      });

      expect(result.name).toEqual(employee.name);
    });
  });

  describe('deleteById', () => {
    it('should delete and return a employee', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockEmployee);

      const result = await employeeService.deleteEmployee(mockEmployee._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockEmployee._id);

      expect(result).toEqual(mockEmployee);
    });
  });
});