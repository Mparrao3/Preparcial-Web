import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ICountryProvider } from '../interfaces/country-provider.interface';

@Injectable()
export class RestCountriesProvider implements ICountryProvider {
  constructor(private readonly httpService: HttpService) {}

  async getCountryByCode(code: string): Promise<any> {
    try {
      
      const url = `https://restcountries.com/v3.1/alpha/${code}?fields=name,cca3,region,subregion,capital,population,flags`;
      
      const { data } = await firstValueFrom(this.httpService.get(url));
      
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null; 
      }
      throw new InternalServerErrorException('Error connecting to RestCountries API');
    }
  }
}
