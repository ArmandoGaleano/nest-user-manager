import { IUseCase } from '@/core/interfaces/base/use-case.interface';

export abstract class AbstractUseCase implements IUseCase {
  abstract execute(dto: any): any;
}
