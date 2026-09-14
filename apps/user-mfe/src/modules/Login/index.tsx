import { useMemo } from "react";
import { AuthStore } from "./store";
import { Segment } from '@repo/ui';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';

function Login() {
    const authStore = useMemo(() => new AuthStore(), [])

    return(
        <Segment>
            <LoginForm
                store={authStore}
            />
            <Link to='/register'>Зарегистрироваться</Link>
        </Segment>
    );
}

export default Login;