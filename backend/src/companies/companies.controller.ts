import { Controller, Get, Param, Query, ValidationPipe, Logger } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { GetCompaniesFilterDto } from './dto/get-companies-filter.dto';
import { Company } from './companies.entity';
import { GetCompaniesPagingDto } from './dto/get-companies-paging.dto';
import { PaginatedCompaniesDto } from './dto/paginated-companies.dto';

@Controller('companies')
export class CompaniesController {
  private logger = new Logger('CompaniesController');

  constructor(private companyService: CompaniesService) {}

  @Get()
  async getCompanies(
    @Query(ValidationPipe) filterDto: GetCompaniesFilterDto,
    @Query(ValidationPipe) pagingDto: GetCompaniesPagingDto,
  ): Promise<PaginatedCompaniesDto> {
    this.logger.verbose(`retrieving all companies. Filters: ${JSON.stringify(filterDto)}`);
    const companies = await this.companyService.getCompanies(filterDto, pagingDto);
    const totalCount = await this.companyService.getTotalCompanies();

    return {
      totalCount,
      data: companies,
      skip: pagingDto.skip,
      take: pagingDto.take,
    }
  }

  @Get('/:id')
  async getCompany(
    @Param('id') id: string,
  ): Promise<Company> {
    this.logger.verbose(`retrieving company ${id}`);
    return await this.companyService.getById(id);
  }
}
