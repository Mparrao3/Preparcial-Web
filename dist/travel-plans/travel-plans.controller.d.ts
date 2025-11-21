import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
export declare class TravelPlansController {
    private readonly travelPlansService;
    constructor(travelPlansService: TravelPlansService);
    create(createTravelPlanDto: CreateTravelPlanDto): Promise<import("./entities/travel-plan.entity").TravelPlan>;
    findAll(): Promise<import("./entities/travel-plan.entity").TravelPlan[]>;
    findOne(id: string): Promise<import("./entities/travel-plan.entity").TravelPlan>;
}
