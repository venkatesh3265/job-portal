import { useState, useEffect } from 'react';
import { FormRow, Logo, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useNavigate } from 'react-router-dom';
// global context and useNavigate later
import { useAppContext } from '../context/appContext';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
};
// if possible prefer local state
// global state

function Register() {
    const [values, setValues] = useState(initialState);
    const { isLoading, showAlert,displayAlert,registerUser,loginUser } = useAppContext();
    // global context and useNavigate later
    console.log(showAlert);
    const { user } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      }, [user, navigate]);
    
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }
        const currentUser = {name, email, password};
        if(isMember){
            // delete currentUser.name;
            loginUser(currentUser)
        } else{
            registerUser(currentUser)
        }

    };
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {
                    showAlert && <Alert />
                }

                {/* name field */}

                {!values.isMember && (
                    <FormRow
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
                <FormRow type='email' name="email" value={values.email} handleChange={handleChange} />
                <FormRow type='password' name="password" value={values.password} handleChange={handleChange} />

                <button type='submit' className='btn btn-block' disabled={isLoading}>
                    submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}
export default Register