// src/location/location.service.ts
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
        const parent = createLocationDto.parent ? await this.findOne(createLocationDto.parent?.id) : null;

        if (parent) {
            await this.validateParent(parent.id, createLocationDto.parent.id);
        }

        const location = this.locationRepository.create({
            name: createLocationDto.name,
            area: createLocationDto.area,
            address: createLocationDto.address, // optional
            parent,
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
        const currentLocation = await this.findOne(id);

        // Validate parent location
        if (updateLocationDto.parent) {
            const parentLocation = await this.locationRepository.findOne({
                where: { id: updateLocationDto.parent.id },
                relations: ['children'],
            });

            // Check if the parent location is the same as the current location or a descendant
            if (parentLocation && (parentLocation.id === currentLocation.id || this.isDescendant(parentLocation, currentLocation.id))) {
                throw new HttpException(
                    'Location cannot be a child of itself or an inherited child.',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        // Update the location
        await this.locationRepository.update(id, updateLocationDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.locationRepository.delete(id);
    }

    // Helper method to validate parent location
    private async validateParent(parentId: number, currentLocationId?: number): Promise<void> {
        if (!parentId) return; // No parent to validate

        const parentLocation = await this.locationRepository.findOne({
            where: { id: parentId },
            relations: ['children'], // Ensure you load children for checking inheritance
        });

        if (!parentLocation) {
            throw new BadRequestException(`Parent location with ID ${parentId} does not exist`);
        }

        // Check if the current location is a descendant of the parent location
        const isChild = await this.isDescendant(parentLocation, currentLocationId);
        if (isChild) {
            throw new BadRequestException(`Cannot set location as its own parent or as a descendant of itself`);
        }
    }

    // Recursive function to check if a location is a descendant of another
    private async isDescendant(parent: Location, childId?: number): Promise<boolean> {
        if (!parent.children || parent.children.length === 0) return false;

        for (const child of parent.children) {
            if (child.id === childId) {
                return true; // Current location is a child of the parent
            }
            const isChild = await this.isDescendant(child, childId); // Recursively check children
            if (isChild) return true;
        }
        return false;
    }
}
