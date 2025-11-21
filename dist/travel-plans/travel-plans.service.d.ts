import { Repository } from 'typeorm';
import { TravelPlan } from './entities/travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';
export declare class TravelPlansService {
    private readonly travelPlanRepository;
    private readonly countriesService;
    constructor(travelPlanRepository: Repository<TravelPlan>, countriesService: CountriesService);
    create(createTravelPlanDto: CreateTravelPlanDto): Promise<TravelPlan>;
    findAll(): Promise<TravelPlan[]>;
    findOne(id: string): Promise<TravelPlan>;
}
