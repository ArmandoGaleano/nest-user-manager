/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export abstract class AbstractAutoSerializableClass<TPublicClassData = any> {
  constructor() {}

  toObject(): TPublicClassData {
    const result: Record<string, any> = {};

    // Serializa apenas as propriedades que não começam com '_'
    Object.keys(this).forEach((key) => {
      if (key.startsWith('_')) return; // ignora propriedades privadas
      result[key] = this.serializeValue(this[key]);
    });

    // Serializa propriedades definidas via getters no protótipo, ignorando as privadas
    const prototype = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(prototype).forEach((key) => {
      if (key === 'constructor') return;
      if (result.hasOwnProperty(key)) return;
      if (key.startsWith('_')) return; // ignora getters que representem propriedades privadas

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
