import { makeAutoObservable } from "mobx";

export type StoreStatus = "idle" | "loading" | "success" | "error";

export abstract class BaseStore {
  // --- Состояние ---
  status: StoreStatus = "idle";
  error: string | null = null;
  isInitialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // --- Геттеры ---
  get isLoading(): boolean {
    return this.status === "loading";
  }

  get isError(): boolean {
    return this.status === "error";
  }

  get isSuccess(): boolean {
    return this.status === "success";
  }

  // --- Абстрактные методы (обязательны для реализации) ---
  
  /**
   * Валидация данных модуля.
   * Возвращает true, если валидация прошла успешно.
   */
  abstract validate(): Promise<boolean>;

  /**
   * Инициализация модуля (загрузка данных, подписки и т.д.)
   */
  abstract init(): Promise<void>;

  /**
   * Очистка ресурсов при размонтировании.
   */
  dispose(): void {
    this.error = null;
    this.status = "idle";
    this.isInitialized = false;
  }

  /**
   * Сброс состояния модуля.
   */
  reset(): void {
    this.error = null;
    this.status = "idle";
  }

  // --- Вспомогательные методы ---

  protected setError(error: string | null): void {
    this.error = error;
    this.status = error ? "error" : "idle";
  }

  protected setLoading(): void {
    this.status = "loading";
    this.error = null;
  }

  protected setSuccess(): void {
    this.status = "success";
    this.error = null;
  }

  protected setInitializedStatus(value: boolean) {
    this.isInitialized = value;
  }
}