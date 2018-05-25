import { TestInput } from './test-input';
import { TestElement } from './test-element';

const speculoosMatchers: jasmine.CustomMatcherFactories = {

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
        const pass = actual.indexOf(expected) !== -1;
        const message = `Expected element to have class '${expected}', but had ${actual.length ? '\'' + actual.join(', ') + '\'' : 'none'}`;
        return { pass, message };
      }
    };
  },

  /**
   * Checks that an element has the specified value
   */
  toHaveValue: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    return {
      compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        if (!el) {
          return { pass: false, message: `Expected element to have value '${expected}', but element was falsy` };
        }
        if (!(el instanceof TestInput)) {
          return { pass: false, message: `Expected element to have value '${expected}', but element was not a TestInput` };
        }
        const actual = el.value;
        const pass = actual === expected;
        const message = `Expected element to have value '${expected}', but had value '${actual}'`;
        return { pass, message };
      }
    };
  }
};

export { speculoosMatchers };
