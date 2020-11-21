import { Statistic, Card, Row, Col, Timeline, Divider, Descriptions } from 'antd';
import { format, parseISO } from 'date-fns';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { CompanyModel } from '../../core/company/company.model';

interface Props {
  data: CompanyModel;
}

export default function CompanyDetails({ data }: Props) {
  
  const renderDescription = (data: CompanyModel) => {
    if (data) {
      return (
        <Descriptions title="Company Info">
          <Descriptions.Item label="Security name">{data.securityName}</Descriptions.Item>
          <Descriptions.Item label="Score">{data?.score?.total}</Descriptions.Item>
          <Descriptions.Item label="Unique symbol">{data.uniqueSymbol}</Descriptions.Item>
          <Descriptions.Item label="Exchange country">{data.exchangeCountryIso}</Descriptions.Item>
          <Descriptions.Item label="Address">
            1610/82 Hay St Sydney. NSW 2000
          </Descriptions.Item>
        </Descriptions>
      )
    }
  }

  return (
    <div className="site-statistic-demo-card">
      <h1>{data && `${data.name} (${data.tickerSymbol})`}</h1>
      <p>{data?.score && data.score.sentence}</p>

      {renderDescription(data)}

      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Active"
              // to-do: calculate period share price
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={16}>
        <Col span={12}>
          <Timeline>
            {data?.shares?.length && data.shares.map(share => (
              <Timeline.Item key={share.dateCreated}>Share price was ${share.price} on {format(parseISO(share.date), 'dd-MM-yyyy')}</Timeline.Item>
            ))}
          </Timeline>
        </Col>
      </Row>
    </div>
  );
}
