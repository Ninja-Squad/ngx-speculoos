import {
  toBeChecked,
  toContainText,
  toHaveClass,
  toHaveSelectedIndex,
  toHaveSelectedLabel,
  toHaveSelectedValue,
  toHaveText,
  toHaveValue,
  MatcherFunction
} from 'ngx-speculoos';

const jasminify = (v: MatcherFunction) => {
  return (_: jasmine.MatchersUtil, __: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher => ({
    compare: (el: any, expected: string): jasmine.CustomMatcherResult => {
      return v(false, el, expected);
    },
    negativeCompare: (el: any, expected: string): jasmine.CustomMatcherResult => {
      return v(true, el, expected);
    }
  });
};

const speculoosMatchers: jasmine.CustomMatcherFactories = {

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and has the given CSS class
   */
  toHaveClass: jasminify(toHaveClass),

  /**
   * Checks that the receiver is a TestInput or a TestTextArea and has the given value
   */
  toHaveValue: jasminify(toHaveValue),

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and has the exact given textContent
   */
  toHaveText: jasminify(toHaveText),

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and contains the given textContent
   */
  toContainText: jasminify(toContainText),

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and contains the given textContent
   */
  toBeChecked: jasminify(toBeChecked),

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element and has the given selected index
   */
  toHaveSelectedIndex: jasminify(toHaveSelectedIndex),

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element with the selected option's value equal to the given value
   */
  toHaveSelectedValue: jasminify(toHaveSelectedValue),

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element with the selected option's label equal to the given label
   */
  toHaveSelectedLabel: jasminify(toHaveSelectedLabel)
};

export {speculoosMatchers};
