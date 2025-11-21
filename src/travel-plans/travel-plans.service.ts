import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from './entities/travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private readonly travelPlanRepository: Repository<TravelPlan>,
    private readonly countriesService: CountriesService,
  ) {}

  async create(createTravelPlanDto: CreateTravelPlanDto) {
    const { countryCode, startDate, endDate } = createTravelPlanDto;

    // 1. Validar fechas
    if (new Date(startDate) > new Date(endDate)) {
      throw new BadRequestException('Start date cannot be after end date');
    }

    // 2. Verificar si el país existe (usando lógica del CountriesModule)
    // Esto buscará en DB, si no está, va a la API y lo guarda.
    // Si falla la API, lanzará NotFoundException desde el servicio de countries.
    await this.countriesService.findOneEntity(countryCode);

    // 3. Crear el plan
    const newPlan = this.travelPlanRepository.create({
      ...createTravelPlanDto,
      countryCode: countryCode.toUpperCase(),
    });

    return await this.travelPlanRepository.save(newPlan);
  }

  async findAll() {
    return await this.travelPlanRepository.find({
        order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string) {
    const plan = await this.travelPlanRepository.findOneBy({ id });
    if (!plan) {
        throw new BadRequestException('Travel plan not found');
    }
    return plan;
  }
}
