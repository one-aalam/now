
import Layout from '../components/Layout';
import { SignInForm } from '../components/forms';

export default () => {
  return (
    <Layout>
      <div className="w-1/3 mt-20">
        <SignInForm heading="Login to our Website" onSubmit={ v => console.log(v)} />
      </div>
    </Layout>
  );
};