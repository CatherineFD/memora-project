import { Form } from '@memora/ui';
import { useCallback } from 'react';
import { RegisterStore } from '../store';
import type { InputOnChangeData } from 'semantic-ui-react';

interface RegisterFormProps {
    store: RegisterStore
}

function RegisterForm(props: RegisterFormProps) {
    const { store } = props;
    const emailField = store.email;
    const passwordField = store.password;
    const firstNameField = store.firstName;
    const lastNameField = store.lastName;
    const verifiedPasswordField = store.verifiedPassword;

    const handleChangeEmail = useCallback((_: React.ChangeEvent<HTMLInputElement, Element>, data: InputOnChangeData) => {
        store.setEmail(data.value);
    }, [store]);

    const handleChangePassword = useCallback((_: React.ChangeEvent<HTMLInputElement, Element>, data: InputOnChangeData) => {
        store.setPassword(data.value);
    }, [store]);

    const handleConfirmPassword = useCallback((_: React.ChangeEvent<HTMLInputElement, Element>, data: InputOnChangeData) => {
        store.setVerifiedPassword(data.value);
    }, [store]);

    const handleFirstName = useCallback((_: React.ChangeEvent<HTMLInputElement, Element>, data: InputOnChangeData) => {
        store.setFirstName(data.value);
    }, [store]);

    const handleLastName = useCallback((_: React.ChangeEvent<HTMLInputElement, Element>, data: InputOnChangeData) => {
        store.setLastName(data.value);
    }, [store]);

    const handleSubmit = useCallback(() => {
            store.register();
        }, [store]);

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Input
                name="first_name"
                placeholder="Введите имя"
                onChange={handleFirstName}
                value={firstNameField.value}
                error={firstNameField.error}
            />

            <Form.Input
                name="last_name"
                placeholder="Введите фамилию"
                onChange={handleLastName}
                value={lastNameField.value}
                error={lastNameField.error}
            />

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

             <Form.Input
                name="password"
                placeholder="Подтвердите пароль"
                value={verifiedPasswordField.value}
                onChange={handleConfirmPassword}
                error={verifiedPasswordField.error}
            />

            <Form.Button type='submit'>Зарегистрироваться</Form.Button>
        </Form>
    );
}

export default RegisterForm;