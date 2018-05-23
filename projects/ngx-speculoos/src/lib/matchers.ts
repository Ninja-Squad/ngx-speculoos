import { TestElement } from './test-element';
const elementMatchers: jasmine.CustomMatcherFactories = {

  /**
   * Checks that an element has the specified class
   */
  toHaveClass: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    return {
      compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        if (!el) {
          return { pass: false, message: `Expected element to have class '${expected}', but element was falsy` };
        }
        if (!(el instanceof TestElement)) {
          return { pass: false, message: `Expected element to have class '${expected}', but element was not a TestElement` };
        }
        const actual = el.classes;
        const pass = actual.includes(expected);
        const message = `Expected element to have class '${expected}', but had ${actual.length ? '\'' + actual.join(', ') + '\'' : 'none'}`;
        return { pass, message };
      }
    };
  }
};

export { elementMatchers };
