import { makeAutoObservable } from "mobx";
import { authStorage } from '@repo/auth-storage';
import { BaseStore } from '@repo/core';
import { emailSchema, passwordSchema, DataField } from '@repo/validation';
import { authApi } from '../../api/auth.service';

const enum AuthStatus {
    unknown = 'unknown',
    authenticated = 'authenticated',
    guest = 'guest',
}

export class Auth extends BaseStore {
    email = new DataField<string>("", emailSchema);
    password = new DataField<string>("", passwordSchema);
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

    init () {

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

    async validate(): Promise<boolean> {
        const results = await Promise.all([
        this.email.validate(),
        this.password.validate(),
        ]);
        return results.every(Boolean);
    }
    
    async login() {
        const isValid = await this.validate();
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