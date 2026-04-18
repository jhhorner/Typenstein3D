/**
 * Base class for lazy-initialized singletons.
 * Subclasses should override the `instance` getter to narrow the return type.
 */
export abstract class Singleton {
  protected static _instance: Singleton | undefined;

  public static get instance(): Singleton {
    if (!this._instance) {
      this._instance = new (this as unknown as new () => Singleton)();
    }
    return this._instance;
  }
}
