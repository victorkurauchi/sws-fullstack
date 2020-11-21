import { Table, Tag, Space } from 'antd';
import Link from 'next/link';
import { CompanyModel } from '../../core/company/company.model';

interface Props {
  data: CompanyModel[];
}

// canonicalUrl: "/stocks/au/software/asx-apt/afterpay-shares"
// dateGenerated: "2020-05-24T14:01:59.000Z"
// exchangeCountryIso: "AU"
// exchangeSymbol: "ASX"
// id: "46B285BC-B25F-4814-985C-390A4BFA2023"
// listingCurrencyIso: "AUD"
// name: "Afterpay"
// securityName: "Ordinary Shares"
// tickerSymbol: "APT"
// uniqueSymbol: "ASX:APT"
// uniqueSymbolSlug: "asx-apt"
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: CompanyModel) => (
      <Link href={`/companies/${record.id}`}>
        <a>{text}</a>
      </Link>
    ),
    sorter: (a: CompanyModel, b: CompanyModel) => a.name.localeCompare(b.name)
  },
  {
    title: 'Overall score',
    dataIndex: ['score', 'total'],
    key: 'overallScore',
    render: (text: string) => (
      <strong>{text}</strong>
    ),
    sorter: (a: CompanyModel, b: CompanyModel) => a!.score!.total - b!.score!.total
  },
  {
    title: 'Exchange country',
    dataIndex: 'exchangeCountryIso',
    key: 'exchangeCountryIso',
    sorter: (a: CompanyModel, b: CompanyModel) => a.exchangeCountryIso.localeCompare(b.exchangeCountryIso)
  },
  {
    title: 'Exchange symbol',
    dataIndex: 'exchangeSymbol',
    key: 'exchangeSymbol',
  },
  {
    title: 'Currency',
    dataIndex: 'listingCurrencyIso',
    key: 'listingCurrencyIso',
    sorter: (a: CompanyModel, b: CompanyModel) => a.listingCurrencyIso.localeCompare(b.listingCurrencyIso)
  },
  {
    title: 'Security name',
    dataIndex: 'securityName',
    key: 'securityName',
    sorter: (a: CompanyModel, b: CompanyModel) => a.securityName.localeCompare(b.securityName)
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: () => (
      <>
        <Tag color="green" key={1}>
          OK
        </Tag>
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: CompanyModel) => (
      <Space size="middle">
        <Link href={`/companies/${record?.id}`}>
          <a>details</a>
        </Link>
        <a>remove</a>
      </Space>
    )
  },
];

const CompanyTable = ({ data }: Props) => {
  return <Table columns={columns} dataSource={data} rowKey={(record: CompanyModel) => record && record.id} />;
}

export default CompanyTable;
