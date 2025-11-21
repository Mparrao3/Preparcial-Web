import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { ICountryProvider } from './interfaces/country-provider.interface';
import { TravelPlan } from '../travel-plans/entities/travel-plan.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(TravelPlan)
    private readonly travelPlanRepository: Repository<TravelPlan>,
   
    @Inject('ICountryProvider')
    private readonly countryProvider: ICountryProvider,
  ) {}

  async findAll() {
    return await this.countryRepository.find();
  }

  async delete(code: string) {
    const upperCode = code.toUpperCase();
    const country = await this.countryRepository.findOneBy({ code: upperCode });

    if (!country) {
      throw new NotFoundException(`Country with code ${upperCode} not found`);
    }

    const hasPlans = await this.travelPlanRepository.count({
      where: { country: { code: upperCode } },
    });

    if (hasPlans > 0) {
      throw new BadRequestException(
        `Cannot delete country ${upperCode} because it has associated travel plans`,
      );
    }

    await this.countryRepository.remove(country);
    return { message: `Country ${upperCode} deleted successfully` };
  }

  async findOne(code: string) {
    const upperCode = code.toUpperCase();
    
    
    const cachedCountry = await this.countryRepository.findOneBy({ code: upperCode });
    
    if (cachedCountry) {
      return {
        data: cachedCountry,
        origin: 'cache',
      };
    }

    
    const apiData = await this.countryProvider.getCountryByCode(upperCode);

    if (!apiData) {
      throw new NotFoundException(`Country with code ${upperCode} not found in external API`);
    }

    
    const newCountry = this.countryRepository.create({
      code: apiData.cca3,
      name: apiData.name.common,
      region: apiData.region,
      subregion: apiData.subregion || 'N/A', // Algunos no tienen subregion
      capital: apiData.capital ? apiData.capital[0] : 'N/A',
      population: apiData.population,
      flagUrl: apiData.flags.png,
    });

    await this.countryRepository.save(newCountry);

    return {
      data: newCountry,
      origin: 'api',
    };
  }

  
  async findOneEntity(code: string): Promise<Country> {
    const result = await this.findOne(code);
    return result.data;
  }
}
