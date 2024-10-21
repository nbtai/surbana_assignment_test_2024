import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Location } from '../entities/location.entity';

@Entity()
@Tree('closure-table')
export class CreateLocationDto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    address?: string;

    @Column()
    area!: string; // Ensure this is a string type

    @TreeParent()
    parent?: Location;

    @TreeChildren()
    children?: Location[];
}
