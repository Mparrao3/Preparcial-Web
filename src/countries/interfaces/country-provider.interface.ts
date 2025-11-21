export interface ICountryProvider {
    getCountryByCode(code: string): Promise<any>;
}
