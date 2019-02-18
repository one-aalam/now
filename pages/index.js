
import Layout from '../components/Layout';
import { Login } from '../components/Login';

export default () => {
  return (
    <Layout>
      <div className="w-1/3 mt-20">
        <Login />
      </div>
    </Layout>
  );
};