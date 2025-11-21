import { CountriesService } from './countries.service';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    findAll(): Promise<import("./entities/country.entity").Country[]>;
    findOne(code: string): Promise<{
        data: import("./entities/country.entity").Country;
        origin: string;
    }>;
}
