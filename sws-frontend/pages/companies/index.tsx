import Link from 'next/link';
import { Spin, Input, Row, Col, Divider } from 'antd';
import Layout from '../../components/Layout';
import { useCompaniesFacade } from '../../core/company/hooks/company.hook';
import CompanyTable from '../../components/company/Table';

const { Search } = Input;

const CompaniesPage = () => {
  const [{ companies, isSearching }, searchCompanies] = useCompaniesFacade();

  return (
    <Layout title="Companies">
      <h1>Companies</h1>

      { isSearching && <Spin /> }

      <Row gutter={18}>
        <Col span={6} offset={8}>
          <Search
          placeholder="search companies"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value: string) => searchCompanies(value)}
        />
        </Col>
      </Row>

      <Divider />

      <CompanyTable data={companies} />
      
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
} 

export default CompaniesPage;
