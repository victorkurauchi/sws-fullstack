import { BaseEntity, Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Company } from './companies.entity';

@Entity('swsCompanyPriceClose')
export class SharePrice extends BaseEntity {
  @ManyToOne(type => Company, company => company.shares)
  @JoinColumn()
  company: Company;
  
  @Column({ type: 'date' })
  @PrimaryColumn()
  date: Date;

  @Column({ type: 'float' })
  @PrimaryColumn()
  price: number;

  @Column({ type: 'datetime' })
  dateCreated: Date;
}
