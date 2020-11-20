import { IsNotEmpty } from 'class-validator';
import { Company } from '../companies.entity';

export class PaginatedCompaniesDto {
  @IsNotEmpty()
  take: number = 10;

  @IsNotEmpty()
  skip: number = 0;

  @IsNotEmpty()
  totalCount: number;

  @IsNotEmpty()
  data: Company[];
}
