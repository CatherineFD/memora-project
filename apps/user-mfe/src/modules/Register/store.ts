import { makeAutoObservable, action } from "mobx";
import { authStorage } from '@repo/auth-storage';
import { BaseStore } from '@repo/core';
import { emailSchema, passwordSchema, nameSchema, DataField } from '@repo/validation';
import { authApi } from '../../api/auth.service';

const enum AuthStatus {
    unknown = 'unknown',
    authenticated = 'authenticated',
    guest = 'guest',
}

export class RegisterStore extends BaseStore {
    readonly firstName = new DataField<string>("", nameSchema('Имя'));
    readonly lastName = new DataField<string>("", nameSchema('Фамилия'));
    readonly email = new DataField<string>("", emailSchema);
    readonly password = new DataField<string>("", passwordSchema);
    readonly verifiedPassword = new DataField<string>("", passwordSchema);
    authStatus = AuthStatus.unknown;

    constructor() {
        super();

        makeAutoObservable(this);
    }

    get isAuthenticated(): boolean {
        return this.authStatus === AuthStatus.authenticated;
    }

    get isGuest(): boolean {
        return this.authStatus === AuthStatus.guest;
    }

    get isChecking(): boolean {
        return this.authStatus === AuthStatus.unknown;
    }

    @action
    setAuthStatus(value: AuthStatus) {
        this.authStatus = value;
    }

    async init () {
        if (this.isInitialized) return;

        const isTokenValid = authStorage.isAuthenticated();

         if (isTokenValid) {
            this.setAuthStatus(AuthStatus.authenticated);
        } else {
            authStorage.clearTokens();
            this.setAuthStatus(AuthStatus.guest);
        }
        
        this.setInitializedStatus(true); 
    }

    setPassword(value: string) {
        this.password.setValue(value);
    }

    setVerifiedPassword(value: string) {
        this.verifiedPassword.setValue(value);
    }

    setEmail(value: string) {
        this.email.setValue(value);
    }

    setFirstName(value: string) {
        this.firstName.setValue(value);
    }

    setLastName(value: string) {
        this.lastName.setValue(value);
    }

    isAuth = () => authStorage.isAuthenticated(); 

    async validate(): Promise<boolean> {
        const results = await Promise.all([
        this.firstName.validate(),
        this.lastName.validate(),
        this.email.validate(),
        this.password.validate(),
        this.verifiedPassword.validate(),
        ]);

        return results.every(Boolean);
    }
    
    async register() {
        const isValid = await this.validate();
        if (!isValid) return;

        this.setLoading();

        try {
            const response = await authApi.register({
                email: this.email.value.trim(),
                password: this.password.value.trim(),
                first_name: this.firstName.value.trim(),
                last_name: this.lastName.value.trim(),
            });

            authStorage.setTokens(response);
            this.setAuthStatus(AuthStatus.authenticated);
            this.setSuccess();

            return true;
        } catch (e) {
            this.setError(e instanceof Error ? e.message : "Ошибка авторизации");
            return false;
        }
    }
}