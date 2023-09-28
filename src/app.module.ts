import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeController } from './controller/employee/employee.controller';
import { EmployeeSchema } from './schema/employee.schema';
import { EmployeeService } from './service/employee/employee.service';

/**
 * Módulo principal de la aplicación.
 */
@Module({
  imports: [
    // Configuración de la conexión a la base de datos MongoDB.
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'employeedb' }),
    // Importación del esquema "Employee" para su uso en Mongoose.
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  controllers: [AppController, EmployeeController],
  providers: [AppService, EmployeeService],
})
export class AppModule {}
