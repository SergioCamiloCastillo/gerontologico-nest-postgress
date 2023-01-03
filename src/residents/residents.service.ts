import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { Resident } from './entities/resident.entity';

@Injectable()
export class ResidentsService {
  private readonly logger = new Logger('ResidentsService');

  constructor(
    @InjectRepository(Resident)
    private readonly residentRepository: Repository<Resident>,
  ) {}

  async create(createResidentDto: CreateResidentDto) {
    try {
      const resident = this.residentRepository.create(createResidentDto);
      await this.residentRepository.save(resident);
      return resident;
    } catch (error) {
      console.log('el error fue este=>', error);
      this.handleDBException(error);
    }
  }

  findAll(paginationDTO: PaginationDTO) {
    const { limit = 10, offset = 0 } = paginationDTO;
    try {
      return this.residentRepository.find({ take: limit, skip: offset });
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(term: string) {
    let resident: Resident;
    if (isUUID(term)) {
      resident = await this.residentRepository.findOneBy({ id: term });
    } else {
      //resident = await this.residentRepository.findOneBy({ nickName: term });
      const queryBuilder = this.residentRepository.createQueryBuilder();
      resident = await queryBuilder
        .where('UPPER("nickName")=:nickName', {
          nickName: term.toLowerCase(),
        })
        .getOne();
    }
    if (!resident) {
      throw new NotFoundException('Resident con ID, no encontrado');
    }
    return resident;
  }

  async update(id: string, updateResidentDto: UpdateResidentDto) {
    const resident = await this.residentRepository.preload({
      id: id,
      ...updateResidentDto,
    });
    if (!resident)
      throw new NotFoundException(`Residente con id ${id} no existe`);

    try {
      return this.residentRepository.save(resident);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const resident = await this.findOne(id);
    await this.residentRepository.remove(resident);
  }
  private handleDBException(error: any) {
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
