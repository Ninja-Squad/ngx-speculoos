import { Type } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function collectMethodNames(proto: unknown): Array<string> {
  if (!proto || proto === Object.prototype) {
    return [];
  }
  const methodNames: Array<string> = [];
  for (const key of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (descriptor && typeof descriptor.value === 'function' && key !== 'constructor') {
      methodNames.push(key);
    }
  }
  return [...methodNames, ...collectMethodNames(Object.getPrototypeOf(proto))];
}

/**
 * Creates a spy object for a class where all the methods of the class (and of its superclasses) are spies.
 * I.e., for a class `UserService` with methods `get()`, `create()`, `update()` and `delete()`, calling
 * `createMock(UserService)` is equivalent to calling
 * `jasmine.createSpyObj<UserService>('UserService', ['get', 'create', 'update', 'delete']).
 * @param type the type to mock (usually a service class)
 */
export function createMock<T>(type: Type<T>): jasmine.SpyObj<T> {
  return jasmine.createSpyObj<T>(type.name, collectMethodNames(type.prototype) as unknown as jasmine.SpyObjMethodNames<T>);
}
