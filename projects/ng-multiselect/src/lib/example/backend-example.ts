import { Controller, Post, Body } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DataSourceConfig } from '../ng-multiselect.service';

@Controller('api/multiselect')
export class MultiSelectController {
  constructor(private dataSource: DataSource) {}

  @Post('load')
  async loadData(@Body() config: DataSourceConfig) {
    const queryBuilder = this.dataSource
      .createQueryBuilder()
      .select([config.valueField, config.labelField])
      .from(config.table, config.table);

    if (config.disabledField) {
      queryBuilder.addSelect(config.disabledField);
    }

    if (config.where) {
      queryBuilder.where(config.where);
    }

    if (config.orderBy) {
      queryBuilder.orderBy(config.orderBy);
    }

    if (config.limit) {
      queryBuilder.limit(config.limit);
    }

    const results = await queryBuilder.getRawMany();

    return results.map(item => ({
      value: item[config.valueField],
      label: item[config.labelField],
      disabled: config.disabledField ? item[config.disabledField] : false
    }));
  }
}

// Beispiel für die Module-Konfiguration:
/*
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'myapp',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [MultiSelectController],
})
export class AppModule {}
*/ 