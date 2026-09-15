import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterStore } from './store';
import { Segment } from "@repo/ui";
import RegisterForm from './components/RegisterForm';

function Register() {
    const registerStore = useMemo(() => new RegisterStore, []);
    const navigate = useNavigate();

    useEffect(() => {
        if (registerStore.isAuthenticated) {
            navigate("/user", { replace: true });
        }
    }, []);

     return(
        <Segment>
            <RegisterForm
                store={registerStore}
            />
            <Link to='/login'>Войти</Link>
        </Segment>
    );
}

export default Register;