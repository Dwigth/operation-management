import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListQuery } from '@operation-management/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class PaginationService<T, K> {
  constructor(
    private datasource: DataSource,
    private entity: EntityTarget<K>
  ) {}
  async list({ take, skip }: ListQuery): Promise<K[]> {
    return this.datasource.manager.find(this.entity, {
      take,
      skip,
    });
  }
}
