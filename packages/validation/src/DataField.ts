// models/DataField.ts
import { makeAutoObservable } from "mobx";
import * as yup from "yup";

export class DataField<T> {
  private _value: T;
  private _initialValue: T;
  private _error: string | null = null;
  private _isTouched: boolean = false;
  private _schema: yup.Schema<T> | null;

  constructor(initialValue: T, schema?: yup.Schema<T>) {
    this._value = initialValue;
    this._initialValue = initialValue;
    this._schema = schema ?? null;

    makeAutoObservable<DataField<T>, "_value" | "_initialValue" | "_schema">(
      this,
      {
        _value: false,
        _initialValue: false,
        _schema: false,
      }
    );
  }

  // --- Геттеры (observable) ---
  get value(): T {
    return this._value;
  }

  get error(): string | null {
    return this._error;
  }

  get isValid(): boolean {
    return this._error === null;
  }

  get isTouched(): boolean {
    return this._isTouched;
  }

  get isDirty(): boolean {
    return this._value !== this._initialValue;
  }

  // --- Сеттеры (actions) ---
  setValue(newValue: T) {
    this._value = newValue;
    this._isTouched = true;
  }

  setError(error: string | null) {
    this._error = error;
  }

  touch() {
    this._isTouched = true;
  }

  // --- Валидация ---
  async validate(): Promise<boolean> {
    if (!this._schema) {
      this._error = null;
      return true;
    }

    try {
      // validate() может мутировать значение (например, привести строку к числу)
      const validated = await this._schema.validate(this._value, {
        abortEarly: false,
      });
      this._value = validated;
      this._error = null;
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        this._error = err.message;
      } else {
        this._error = "Ошибка валидации";
      }
      return false;
    }
  }

  // Валидация только если поле уже было тронуто (для UX)
  async validateIfTouched(): Promise<boolean> {
    if (!this._isTouched) return true;
    return this.validate();
  }

  // --- Сброс ---
  reset() {
    this._value = this._initialValue;
    this._error = null;
    this._isTouched = false;
  }
}