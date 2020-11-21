import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Company } from './companies.entity';
import { GetCompaniesFilterDto } from './dto/get-companies-filter.dto';
import { GetCompaniesPagingDto } from './dto/get-companies-paging.dto';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  private logger = new Logger('CompanyRepository');

  private DEFAULT_TAKE = 10;
  private DEFAULT_SKIP = 0;

  async getCompanies(
    filterDto: GetCompaniesFilterDto,
    pagingDto: GetCompaniesPagingDto,
  ): Promise<Company[]> {
    const { take, skip } = pagingDto;
    const queryBuilder = this.createQueryBuilder('company');

    try {
      const customQuery = this.applyCustomConditions(filterDto, queryBuilder);
      customQuery.leftJoinAndSelect('company.score', 'score');
      customQuery.take(take ?? this.DEFAULT_TAKE);
      customQuery.skip(skip ?? this.DEFAULT_SKIP);

      const companies = await customQuery.getMany();
      return companies;
    } catch (error) {
      this.logger.error(`Failed to get companies. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  private applyCustomConditions(
    filterDto: GetCompaniesFilterDto,
    queryBuilder: SelectQueryBuilder<Company>,
  ) {
    const { search, symbol, score, includeShares } = filterDto;

    if (search) {
      queryBuilder.andWhere(
        '(company.name LIKE :search OR company.tickerSymbol LIKE :search OR company.securityName LIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (symbol) {
      queryBuilder.andWhere('(company.exchangeSymbol LIKE :symbol)', { symbol: `%${symbol}%` });
    }

    if (score) {
      queryBuilder.leftJoin('company.score', 'swsCompanyScore.id', 'company.score');
      queryBuilder.andWhere('(score.total = :score)', { score });
    }

    if (includeShares) {
      queryBuilder.leftJoinAndSelect('company.shares', 'swsCompanyPriceClose');
    }

    return queryBuilder;
  }
}
