import { useEffect, useMemo } from "react";
import { AuthStore } from "./store";
import { Segment } from '@repo/ui';
import LoginForm from './components/LoginForm';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const authStore = useMemo(() => new AuthStore(), []);

    useEffect(() => {
        if (authStore.isAuthenticated) {
            navigate("/user", { replace: true });
        }
    }, []);
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