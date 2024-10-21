// src/location/location.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
    ) {}

    async create(createLocationDto: CreateLocationDto): Promise<Location> {
        // Create a new Location instance using the DTO
        const location = this.locationRepository.create({
            name: createLocationDto.name,
            area: createLocationDto.area,
            address: createLocationDto.address, // optional
        });
        
        return this.locationRepository.save(location);
    }

    findAll(): Promise<Location[]> {
        return this.locationRepository.find({ relations: ['children'] });
    }

    async findOne(id: number): Promise<Location> {
        const location = await this.locationRepository.findOne({
            where: { id },
            relations: ['children'],
        });

        if (!location) {
            throw new NotFoundException(`Location with ID ${id} not found`);
        }

        return location;
    }

    async update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location> {
        // Create an object that omits the 'parent' and 'children' properties
        const { parent, children, ...updateData } = updateLocationDto;

        await this.locationRepository.update(id, updateData); // Use updateData here
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.locationRepository.delete(id);
    }
}
