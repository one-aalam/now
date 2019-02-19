import Layout from '../components/Layout';
import { PasswordForgetForm } from '../components/forms';

export default () => {
  return (
    <Layout>
      <div className="w-1/3 mt-20">
        <PasswordForgetForm heading="Reset Password" onSubmit={ v => console.log(v)} />
      </div>
    </Layout>
  );
};