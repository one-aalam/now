
import Layout from '../components/Layout';
import { SignInForm } from '../components/Forms';

export default () => {
  return (
    <Layout>
      <div className="w-1/3 mt-20">
        <SignInForm />
      </div>
    </Layout>
  );
};