import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { Country } from './countries/entities/country.entity';
import { TravelPlan } from './travel-plans/entities/travel-plan.entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    // Configuración de Base de Datos SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'preparcial.sqlite', // Archivo local de la BD
      entities: [Country, TravelPlan],
      synchronize: true, // ¡Cuidado! Solo para desarrollo (crea tablas automáticamente)
    }),
    CountriesModule,
    TravelPlansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'countries', method: RequestMethod.ALL },
        { path: 'travel-plans', method: RequestMethod.ALL },
      );
  }
}
