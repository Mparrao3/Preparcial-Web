import { HttpService } from '@nestjs/axios';
import { ICountryProvider } from '../interfaces/country-provider.interface';
export declare class RestCountriesProvider implements ICountryProvider {
    private readonly httpService;
    constructor(httpService: HttpService);
    getCountryByCode(code: string): Promise<any>;
}
