import { GetStaticProps, GetStaticPaths } from 'next';
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

const StaticPropsDetail = ({ item, errors }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [{ selectedCompany, isSearching, error }, getCompany] = useCompanyDetailsFacade();

  useEffect(() => {
    getCompany(id);
  }, []);

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
      <h1>{selectedCompany && `${selectedCompany.name} (${selectedCompany.tickerSymbol})`}</h1>

      { isSearching && <Spin /> }

      <CompanyDetails data={selectedCompany} />
    </Layout>
  );
} 

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.

  // const paths = [{
  //   params: { id: user.id.toString() },
  // }];

  return { paths: [], fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    return { props: { id } };
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
