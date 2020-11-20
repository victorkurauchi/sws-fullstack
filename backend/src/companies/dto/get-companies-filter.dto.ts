import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetCompaniesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  symbol: string;

  @IsOptional()
  @IsNotEmpty()
  score: string;

  @IsOptional()
  includeShares: boolean;
}
