import { createMock } from './mock';

class Simple {
  foo(): string {
    return '';
  }
  bar(): string {
    return '';
  }
  baz(): string {
    return '';
  }
}

class GrandParent {
  foo(): string {
    return '';
  }
}
class Parent extends GrandParent {
  bar(): string {
    return '';
  }
}
class Child extends Parent {
  baz(): string {
    return '';
  }
}

abstract class AbstractBase {
  abstract foo(): string;
  bar(): string {
    return '';
  }
}
class AbstractChild extends AbstractBase {
  foo(): string {
    return '';
  }

  baz(): string {
    return '';
  }
}

describe('mock', () => {
  it('should create a mock for a simple class', () => {
    const mock = createMock(Simple);
    mock.foo.and.returnValue('foo');
    mock.bar.and.returnValue('bar');
    mock.baz.and.returnValue('baz');

    expect(mock.foo()).toBe('foo');
    expect(mock.bar()).toBe('bar');
    expect(mock.baz()).toBe('baz');
  });

  it('should create a mock for a child class class', () => {
    const mock = createMock(Child);
    mock.foo.and.returnValue('foo');
    mock.bar.and.returnValue('bar');
    mock.baz.and.returnValue('baz');

    expect(mock.foo()).toBe('foo');
    expect(mock.bar()).toBe('bar');
    expect(mock.baz()).toBe('baz');
  });

  it('should create a mock for a child class of an abstract class', () => {
    const mock = createMock(AbstractChild);
    mock.foo.and.returnValue('foo');
    mock.bar.and.returnValue('bar');
    mock.baz.and.returnValue('baz');

    expect(mock.foo()).toBe('foo');
    expect(mock.bar()).toBe('bar');
    expect(mock.baz()).toBe('baz');
  });
});
