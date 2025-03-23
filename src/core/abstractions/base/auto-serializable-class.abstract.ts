/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export abstract class AbstractAutoSerializableClass<TPublicClassData = any> {
  protected excludedFields: string[] = ['dto'];

  constructor() {
    // Torna a propriedade 'excludedFields' não enumerável
    Object.defineProperty(this, 'excludedFields', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: this.excludedFields,
    });
  }

  toObject(): TPublicClassData {
    const result: Record<string, any> = {};

    // Propriedades públicas da instância
    Object.keys(this)
      .filter((key) => !this.excludedFields.includes(key))
      .forEach((key) => {
        result[key] = this.serializeValue(this[key]);
      });

    // Propriedades definidas via getters no protótipo
    const prototype = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(prototype).forEach((key) => {
      if (key === 'constructor' || this.excludedFields.includes(key)) return;
      if (result.hasOwnProperty(key)) return;

      const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
      if (descriptor && typeof descriptor.get === 'function') {
        try {
          const value = this[key];
          result[key] = this.serializeValue(value);
        } catch (e) {
          result[key] = undefined;
        }
      }
    });

    return result as TPublicClassData;
  }

  toJSON(): any {
    const obj = this.toObject();
    return this.transformForJSON(obj);
  }

  protected serializeValue(value: any): any {
    if (value && typeof value.toObject === 'function') {
      return value.toObject();
    }
    return value;
  }

  private transformForJSON(obj: any): any {
    if (obj instanceof Date) {
      return obj.toISOString();
    } else if (Array.isArray(obj)) {
      return obj.map((item) => this.transformForJSON(item));
    } else if (obj !== null && typeof obj === 'object') {
      const result: Record<string, any> = {};
      Object.keys(obj).forEach((key) => {
        result[key] = this.transformForJSON(obj[key]);
      });
      return result;
    }
    return obj;
  }
}
