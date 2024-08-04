import { Repository } from 'typeorm';
import HasId from './interfaces/hasId.interface';
import InsertException from './exceptions/insert.exception';

export default abstract class BaseRepository<Entity extends HasId> {
  private entityRepository: Repository<Entity>;

  constructor(entityRepository: Repository<Entity>) {
    this.entityRepository = entityRepository;
  }

  async bulkInsert(entities: Entity[]): Promise<void> {
    try {
      await this.entityRepository.save(entities);
    } catch (error) {
      throw new InsertException();
    }
  }
}
