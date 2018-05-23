declare namespace jasmine {
  interface Matchers<T> {
    toHaveClass(className: string): boolean;

    toHaveValue(value: string): boolean;
  }
}
