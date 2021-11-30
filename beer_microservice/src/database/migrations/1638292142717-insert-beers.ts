import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertBeers1638292142717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO beers (name, maximum_temperature, minimum_temperature, average_temperature, style, created_at, updated_at ) VALUES ('Weihenstephaner Hefe-Weiss', -1, 3, 1, 'Weissbier', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)), ('Eisenbahn Pilsen', -2, 4, 1, 'Pilsens', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)), ('Eisenbahn Weizenbier', -4, 6, 1, 'Weizenbier', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)), ('Irmãos Ferraro Pier', -5, 5, 0, 'Red ale', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)), ('India Pale Ale', -6, 7, 0.5,'India pale ale', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)), ('IPARTY', -7, 10, 1.5,'IPA', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)), ('Dunkel',-8, 2, -3, 'Dunkel', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)), ('Imperial Stouts', -10, 13, 1.5, 'Imperial Stouts', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)), ('Brown Ale', 0, 14, 7, 'Brown ale', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('beers');
  }
}
