import Link from 'next/link';
import { useState } from 'react';

import { Form, TextField } from './fields';

const initialState = {
  username: '',
  password: '',
  cpassword: '',
  email: ''
};

export const SignUpForm = ({ heading, onSubmit }) => {
  const [ state, setState ] = useState(initialState);

  const handleChange = evt => setState({ ...state, ...{[evt.target.name]: evt.target.value}});

  return (
  <>
    <Form heading={heading}>
      <TextField name="name" label="Username or Email" placeholder="Your Username" value={state['username']} onChange={handleChange} />
      <TextField name="email" type="email" label="Email" placeholder="Your email" value={state['email']} onChange={handleChange} />
      <TextField name="password" type="password" label="Password" placeholder="Your password" help="Must contain 8+ characters with at least 1 number" value={state['password']} onChange={handleChange} />
      <TextField name="cpassword" type="password" label="Confirm Password" placeholder="Re-type password" value={state['cpassword']} onChange={handleChange} />
      <div className="flex items-center justify-between">
        <button className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded" onClick={ () => console.log(state) } >
            Register
        </button>
      </div>
    </Form>
    <div className="text-center">
      <p className="text-grey-dark text-sm">Already have an account?&nbsp;
      <Link href="/signIn"><a className="no-underline text-blue font-bold">Sign In &rarr;</a></Link></p>
    </div>
  </>
  );
  }