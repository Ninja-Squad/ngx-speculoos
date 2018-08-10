import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';
import { TestElement } from './test-element';
import { TestSelect } from './test-select';

export type MatcherFunction = (isNegative: boolean, el: any, expected?: any) => ({ pass: boolean; message: string });

export const toHaveValue: MatcherFunction = (isNegative: boolean, el: any, expected: string) => {
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

export const toHaveClass: MatcherFunction = (isNegative: boolean, el: any, expected: string) => {
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

export const toHaveText: MatcherFunction = (isNegative: boolean, el: any, expected: string) => {
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

export const toContainText: MatcherFunction = (isNegative: boolean, el: any, expected: string) => {
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

export const toBeChecked: MatcherFunction = (isNegative: boolean, el: any) => {
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

export const toHaveSelectedIndex: MatcherFunction = (isNegative: boolean, el: any, expected: number) => {
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

export const toHaveSelectedValue: MatcherFunction = (isNegative: boolean, el: any, expected: string) => {
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

export const toHaveSelectedLabel: MatcherFunction = (isNegative: boolean, el: any, expected: string) => {
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
