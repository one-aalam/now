
import Layout from '../components/Layout';
import { SignUpForm } from '../components/forms';

export default () => {
  return (
    <Layout>
      <div className="w-1/3 mt-20">
        <SignUpForm heading="Register to our Website" />
      </div>
    </Layout>
  );
};