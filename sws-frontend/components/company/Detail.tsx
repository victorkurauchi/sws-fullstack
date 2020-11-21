import { Statistic, Card, Row, Col, Timeline, Divider } from 'antd';
import { format, parseISO } from 'date-fns';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { CompanyModel } from '../../core/company/company.model';

interface Props {
  data: CompanyModel;
}

export default function CompanyDetails({ data }: Props) {
  // const { username, email, id } = data;

  return (
    <div className="site-statistic-demo-card">
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
              <Timeline.Item>Share price was ${share.price} on {format(parseISO(share.date), 'dd-MM-yyyy')}</Timeline.Item>
            ))}
          </Timeline>
        </Col>
      </Row>
    </div>
  );
}
