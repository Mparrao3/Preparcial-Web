import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { ICountryProvider } from './interfaces/country-provider.interface';
export declare class CountriesService {
    private readonly countryRepository;
    private readonly countryProvider;
    constructor(countryRepository: Repository<Country>, countryProvider: ICountryProvider);
    findAll(): Promise<Country[]>;
    findOne(code: string): Promise<{
        data: Country;
        origin: string;
    }>;
    findOneEntity(code: string): Promise<Country>;
}
