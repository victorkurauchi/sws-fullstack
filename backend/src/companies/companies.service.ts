import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCompaniesFilterDto } from './dto/get-companies-filter.dto';
import { CompanyRepository } from './companies.repository';

import { Company } from './companies.entity';
import { GetCompaniesPagingDto } from './dto/get-companies-paging.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async getCompanies(
    filterDto: GetCompaniesFilterDto,
    pagingDto: GetCompaniesPagingDto,
  ): Promise<Company[]> {
    return this.companyRepository.getCompanies(filterDto, pagingDto);
  }

  async getById(
    id: string,
  ): Promise<Company> {
    const found = await this.companyRepository.findOne({ where: { id }, relations: ['score'] });

    if (!found) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }

    return found;
  }

  async getTotalCompanies(): Promise<number> {
    return this.companyRepository.count();
  }
}
