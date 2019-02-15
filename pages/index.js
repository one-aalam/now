import Link from "next/link";
import Layout from '../components/Layout';

import Firebase, { FirebaseContext, config } from '../libs/firebase';

export default () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Layout>
      <Link href="/about">
        <a>Go to {process.env.customKey}</a>
      </Link>
      <FirebaseContext.Consumer>
        { firebase => {
          return <div onClick={() => firebase.signInWithGoogle()}> I've access to Firebase and render something.</div>
        }}
      </FirebaseContext.Consumer>
    </Layout>
  </FirebaseContext.Provider>
);