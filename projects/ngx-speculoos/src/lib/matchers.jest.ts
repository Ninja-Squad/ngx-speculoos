import {
  MatcherFunction,
  toBeChecked,
  toContainText,
  toHaveClass,
  toHaveSelectedIndex,
  toHaveSelectedLabel,
  toHaveSelectedValue,
  toHaveText,
  toHaveValue
} from './matchers';

const jestify: (v: MatcherFunction, isNot: boolean) => (received: any, argument: any) => { pass: boolean; message: () => string } =
  (v: MatcherFunction, isNot: boolean) => {
  return (received: any, argument: any) => {
    const {pass, message} = v(isNot, received, argument);
    // TODO: Waiting for PR & Release https://github.com/DefinitelyTyped/DefinitelyTyped/pull/27124
    return {pass: isNot ? !pass : pass, message: () => message};
  };
};

const jestSpeculoosMatchers: jest.ExpectExtendMap = {

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and has the given CSS class
   */
  toHaveClass(this: jest.MatcherUtils, received: any, argument: any) {
    return jestify(toHaveClass, this.isNot)(received, argument);
  },

  /**
   * Checks that the receiver is a TestInput or a TestTextArea and has the given value
   */
  toHaveValue(this: jest.MatcherUtils, received: any, argument: any) {
    return jestify(toHaveValue, this.isNot)(received, argument);
  },

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and has the exact given textContent
   */
  toHaveText(this: jest.MatcherUtils, received: any, argument: any) {
    return jestify(toHaveText, this.isNot)(received, argument);
  },

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and contains the given textContent
   */
  toContainText(this: jest.MatcherUtils, received: any, argument: any) {
    return jestify(toContainText, this.isNot)(received, argument);
  },

  /**
   * Checks that the receiver is a TestElement wrapping a DOM element and contains the given textContent
   */
  toBeChecked(this: jest.MatcherUtils, received: any, argument: any) {
    return jestify(toBeChecked, this.isNot)(received, argument);
  },

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element and has the given selected index
   */
  toHaveSelectedIndex(this: jest.MatcherUtils, received: any, argument: any) {
    return jestify(toHaveSelectedIndex, this.isNot)(received, argument);
  },

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element with the selected option's value equal to the given value
   */
  toHaveSelectedValue(this: jest.MatcherUtils, received: any, argument: any) {
    return jestify(toHaveSelectedValue, this.isNot)(received, argument);
  },

  /**
   * Checks that the receiver is a TestSelect wrapping a DOM element with the selected option's label equal to the given label
   */
  toHaveSelectedLabel(this: jest.MatcherUtils, received: any, argument: any) {
    return jestify(toHaveSelectedLabel, this.isNot)(received, argument);
  }
};

export {jestSpeculoosMatchers};
