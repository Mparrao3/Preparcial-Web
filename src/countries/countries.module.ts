import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { Country } from './entities/country.entity';
import { RestCountriesProvider } from './providers/rest-countries.provider';
import { TravelPlan } from '../travel-plans/entities/travel-plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, TravelPlan]),
    HttpModule, 
  ],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    {
      provide: 'ICountryProvider', 
      useClass: RestCountriesProvider, 
    },
  ],
  exports: [CountriesService], 
})
export class CountriesModule {}
