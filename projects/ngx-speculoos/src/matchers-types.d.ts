declare namespace jasmine {
  interface Matchers<T> {
    toHaveClass(className: string): boolean;
  }
}
