import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree('closure-table')
export class Location {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    address?: string;

    @Column()
    area!: string;

    @TreeParent()
    parent?: Location;

    @TreeChildren()
    children?: Location[];
}
