/// <reference path="../custom-jasmine-types.d.ts" />

import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';
import { TestElement } from './test-element';

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
   * Checks that the receiver is a TestElement wrapping a DOM element and contains the given textContent
   */
  toContainText: (util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => {
    const assert = (isNegative: boolean, el: any, expected: string) => {
      if (!el) {
        return { pass: false, message: `Expected to check textContent '${expected}' on element, but element was falsy` };
      }
      if (!(el instanceof TestElement)) {
        return { pass: false, message: `Expected to check textContent '${expected}' on element, but element was not a TestElement` };
      }
      const actual = el.textContent;
      if (!actual) {
        return {
          pass: isNegative,
          message: `Expected element to ${isNegative ? 'not ' : ''}contain textContent '${expected}', but had no textContent`
        };
      }
      const pass = actual.indexOf(expected) !== -1;
      const message = `Expected element to ${isNegative ? 'not ' : ''}contain textContent '${expected}', but had textContent '${actual}'`;
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
