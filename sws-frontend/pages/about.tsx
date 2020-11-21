import Link from 'next/link';
import Layout from '../components/Layout';
import { Button, DatePicker, version } from 'antd';


const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page, using Ant design {version} </p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
