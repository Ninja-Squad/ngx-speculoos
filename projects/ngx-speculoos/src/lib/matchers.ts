import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';
import { TestElement } from './test-element';
import { TestSelect } from './test-select';

const speculoosMatchers: jasmine.CustomMatcherFactories = {

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and as the given CSS class
   */
  toHaveClass: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any, expected: string) => {
      if (!el) {
        return { pass: false, message: `Expected to check class '${expected}' on element, but element was falsy` };
      }
      if (!(el instanceof TestElement)) {
        return { pass: false, message: `Expected to check class '${expected}' on element, but element was not a TestElement` };
      }
      const actual = el.classes;
      const pass = actual.indexOf(expected) !== -1;
      const message = `Expected element to ${isNegative ? 'not ' : ''}have class '${expected}', `
      + `but had ${actual.length ? '\'' + actual.join(', ') + '\'' : 'none'}`;
      return { pass: isNegative ? !pass : pass, message };
    };
    return {
      compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(false, el, expected);
      },
      negativeCompare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(true, el, expected);
      }
    };
  },

  /**
   * Checks that the receiver is a TestInput or a TestTextArea and has the given value
   */
  toHaveValue: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any, expected: string) => {
      if (!el) {
        return { pass: false, message: `Expected to check value '${expected}' on element, but element was falsy` };
      }
      if (!(el instanceof TestInput) && !(el instanceof TestTextArea)) {
        return {
          pass: false,
          message: `Expected to check value '${expected}' on element, but element was neither a TestInput nor a TestTextArea`
        };
      }
      const actual = el.value;
      const pass = actual === expected;
      const message = `Expected element to ${isNegative ? 'not ' : ''}have value '${expected}', but had value '${actual}'`;
      return { pass: isNegative ? !pass : pass, message };
    };
    return {
      compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(false, el, expected);
      },
      negativeCompare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(true, el, expected);
      }
    };
  },

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and has the exact given textContent
   */
  toHaveText: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any, expected: string) => {
      if (!el) {
        return { pass: false, message: `Expected to check text '${expected}' on element, but element was falsy` };
      }
      if (!(el instanceof TestElement)) {
        return { pass: false, message: `Expected to check text '${expected}' on element, but element was not a TestElement` };
      }
      const actual = el.textContent;
      const pass = actual === expected;
      const message = `Expected element to ${isNegative ? 'not ' : ''}have text '${expected}', but had '${actual}'`;
      return { pass: isNegative ? !pass : pass, message };
    };
    return {
      compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(false, el, expected);
      },
      negativeCompare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(true, el, expected);
      }
    };
  },

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and contains the given textContent
   */
  toContainText: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any, expected: string) => {
      if (!el) {
        return { pass: false, message: `Expected to check text '${expected}' on element, but element was falsy` };
      }
      if (!(el instanceof TestElement)) {
        return { pass: false, message: `Expected to check text '${expected}' on element, but element was not a TestElement` };
      }
      const actual = el.textContent;
      if (!actual) {
        return {
          pass: isNegative,
          message: `Expected element to ${isNegative ? 'not ' : ''}contain text '${expected}', but had no text`
        };
      }
      const pass = actual.indexOf(expected) !== -1;
      const message = `Expected element to ${isNegative ? 'not ' : ''}contain text '${expected}', but had text '${actual}'`;
      return { pass: isNegative ? !pass : pass, message };
    };
    return {
      compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(false, el, expected);
      },
      negativeCompare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(true, el, expected);
      }
    };
  },

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and contains the given textContent
   */
  toBeChecked: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any) => {
      if (!el) {
        return { pass: false, message: `Expected to check if element was checked, but element was falsy` };
      }
      if (!(el instanceof TestInput)) {
        return { pass: false, message: `Expected to check if element was checked, but element was not a TestInput` };
      }
      const pass = el.checked;
      const message = `Expected element to be ${isNegative ? 'not ' : ''}checked, but was${!isNegative ? ' not' : ''}`;
      return { pass: isNegative ? !pass : pass, message };
    };
    return {
      compare: (el: any): jasmine.CustomMatcherResult => {
        return assert(false, el);
      },
      negativeCompare: (el: any): jasmine.CustomMatcherResult => {
        return assert(true, el);
      }
    };
  },

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element and has the given selected index
   */
  toHaveSelectedIndex: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any, expected: number) => {
      if (!el) {
        return { pass: false, message: `Expected to check selected index ${expected} on element, but element was falsy` };
      }
      if (!(el instanceof TestSelect)) {
        return { pass: false, message: `Expected to check selected index ${expected} on element, but element was not a TestSelect` };
      }
      const actual = el.selectedIndex;
      const pass = actual === expected;
      const message = `Expected element to ${isNegative ? 'not ' : ''}have selected index ${expected}, but had ${actual}`;
      return { pass: isNegative ? !pass : pass, message };
    };
    return {
      compare: (el: any, expected: number): jasmine.CustomMatcherResult => {
        return assert(false, el, expected);
      },
      negativeCompare: (el: any, expected: number): jasmine.CustomMatcherResult => {
        return assert(true, el, expected);
      }
    };
  },

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element with the selected option's value equal to the given value
   */
  toHaveSelectedValue: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any, expected: string) => {
      if (!el) {
        return { pass: false, message: `Expected to check selected value '${expected}' on element, but element was falsy` };
      }
      if (!(el instanceof TestSelect)) {
        return { pass: false, message: `Expected to check selected value '${expected}' on element, but element was not a TestSelect` };
      }
      const actual = el.selectedValue;
      const pass = actual  === expected;
      const message = `Expected element to ${isNegative ? 'not ' : ''}have selected value '${expected}', but had '${actual}'`;
      return { pass: isNegative ? !pass : pass, message };
    };
    return {
      compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(false, el, expected);
      },
      negativeCompare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(true, el, expected);
      }
    };
  },

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element with the selected option's label equal to the given label
   */
  toHaveSelectedLabel: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any, expected: string) => {
      if (!el) {
        return { pass: false, message: `Expected to check selected label '${expected}' on element, but element was falsy` };
      }
      if (!(el instanceof TestSelect)) {
        return { pass: false, message: `Expected to check selected label '${expected}' on element, but element was not a TestSelect` };
      }
      const actual = el.selectedLabel;
      const pass = actual  === expected;
      const message = `Expected element to ${isNegative ? 'not ' : ''}have selected label '${expected}', but had '${actual}'`;
      return { pass: isNegative ? !pass : pass, message };
    };
    return {
      compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(false, el, expected);
      },
      negativeCompare: (el: any, expected: string): jasmine.CustomMatcherResult => {
        return assert(true, el, expected);
      }
    };
  }
};

export { speculoosMatchers };
