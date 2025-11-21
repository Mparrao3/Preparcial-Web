import { Country } from '../../countries/entities/country.entity';
export declare class TravelPlan {
    id: string;
    countryCode: string;
    title: string;
    startDate: Date;
    endDate: Date;
    notes: string;
    createdAt: Date;
    country: Country;
}
