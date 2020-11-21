import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Spin, notification } from 'antd';
import Layout from '../../components/Layout';
import { useCompanyDetailsFacade } from '../../core/company/hooks/company.hook';
import { CompanyModel } from '../../core/company/company.model';
import CompanyDetails from '../../components/company/Detail';

type Props = {
  item?: CompanyModel;
  errors?: string
}

const CompanyDetailPage = ({ errors }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [{ selectedCompany, isSearching, error }, getCompany] = useCompanyDetailsFacade();

  useEffect(() => {
    if (id) {
      getCompany(id);
    }
  }, [id]);

  useEffect(() => {
    if (errors) {
      notification.error({ message: JSON.stringify(errors) });
    }
  }, [errors]);

  useEffect(() => {
    if (error) {
      notification.error({ message: `${error.statusCode} - ${error.message}` });
    }
  }, [error]);

  return (
    <Layout title="Details">
      { isSearching && <Spin /> }

      <CompanyDetails data={selectedCompany} />
    </Layout>
  );
}

export default CompanyDetailPage;
