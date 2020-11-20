import { IsOptional } from 'class-validator';

export class GetCompaniesPagingDto {
  @IsOptional()
  take: number;

  @IsOptional()
  skip: number;

  @IsOptional()
  orderBy: string;
}
