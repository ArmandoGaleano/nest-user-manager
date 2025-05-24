import { ApiProperty } from '@nestjs/swagger';

import { ISearchUsersRepositoryResultDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/search-users-repository-result.dto.interface';
import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';

export class SearchUsersRepositoryResultDto
  extends AbstractAutoSerializableClass<ISearchUsersRepositoryResultDto>
  implements ISearchUsersRepositoryResultDto
{
  @ApiProperty({
    type: 'array',
    description: 'Array of user data',
  })
  get data() {
    return this._dto.data;
  }

  @ApiProperty({
    type: 'number',
    description: 'Page number',
    example: 1,
  })
  get page() {
    return this._dto.page;
  }

  @ApiProperty({
    type: 'number',
    description: 'Number of items per page',
    example: 10,
  })
  get limit() {
    return this._dto.limit;
  }

  @ApiProperty({
    type: 'number',
    description: 'Total number of items',
    example: 100,
  })
  get total() {
    return this._dto.total;
  }

  constructor(private _dto: ISearchUsersRepositoryResultDto) {
    super();
  }
}
