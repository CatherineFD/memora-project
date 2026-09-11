import { makeAutoObservable } from "mobx";
import { authStorage } from '@repo/auth-storage';
import { emailSchema, passwordSchema, DataField } from '@repo/validation';
import { authApi } from '../../api/auth.service';

export class Auth {
    email = new DataField<string>("", emailSchema);
    password = new DataField<string>("", passwordSchema);

    constructor() {
        makeAutoObservable(this);
    }

    setPassword(value: string) {
        this.password.setValue(value);
    }

    setEmail(value: string) {
        this.email.setValue(value);
    }

    getPassword = () => this.password;
    getEmail = () => this.email;

    isAuth = () => authStorage.isAuthenticated(); 

    async validateForm(): Promise<boolean> {
        const results = await Promise.all([
        this.email.validate(),
        this.password.validate(),
        ]);
        return results.every(Boolean);
    }
    
    async login() {
        const isValid = await this.validateForm();
        if (!isValid) return;

        try {
            const response = await authApi.login({
                email: this.email.value,
                password: this.password.value,
            });

            authStorage.setTokens(response)
        } catch (e) {
            console.log(e);
        }
    }
}