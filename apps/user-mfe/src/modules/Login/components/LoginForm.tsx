import { useCallback } from "react";
import { observer } from 'mobx-react-lite';
import { AuthStore } from "../store";
import { Form } from '@repo/ui';
import type { InputOnChangeData } from "semantic-ui-react";

interface LoginFormProps {
    store: AuthStore
}

function LoginForm(props: LoginFormProps) {
    const { store } = props;

    const emailField = store.email;
    const passwordField = store.password;

    const handleChangeEmail = useCallback((_: React.ChangeEvent<HTMLInputElement, Element>, data: InputOnChangeData) => {
        store.setEmail(data.value);
    }, [store]);

    const handleChangePassword = useCallback((_: React.ChangeEvent<HTMLInputElement, Element>, data: InputOnChangeData) => {
        store.setPassword(data.value);
    }, [store]);

    const handleSubmit = useCallback(() => {
        store.login();
    }, [store]);
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Input
                name="email"
                placeholder="Введите email"
                onChange={handleChangeEmail}
                value={emailField.value}
                error={emailField.error}
            />

            <Form.Input
                name="password"
                placeholder="Введите пароль"
                value={passwordField.value}
                onChange={handleChangePassword}
                error={passwordField.error}
            />

            <Form.Button type='submit'>Войти</Form.Button>
        </Form>
    );
}

export default observer(LoginForm);