import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Location1730375910529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'location',
                
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', isNullable: false },
                    { name: 'address', type: 'varchar', isNullable: true },
                    { name: 'area', type: 'varchar', isNullable: false },
                    { name: 'parentId', type: 'int', isNullable: true },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'location',
            new TableForeignKey({
                columnNames: ['parentId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'location',
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('location');
    }

}
