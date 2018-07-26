import {TestBed} from '@angular/core/testing';

import {TestComponent} from './test.component';
import {jestSpeculoosMatchers, ComponentTester} from 'ngx-speculoos';

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get div() {
    return this.element('#classes');
  }

  get none() {
    return this.element('#none');
  }

  get noTextDiv() {
    return this.element('#noTextDiv');
  }

  get name() {
    return this.input('#name');
  }

  get checkbox() {
    return this.input('#checkbox');
  }

  get textArea() {
    return this.textarea('textarea');
  }

  get selectBox() {
    return this.select('#selectBox');
  }
}

fdescribe('Custom matchers', () => {

  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TestComponent] });
    tester = new TestComponentTester();
    tester.detectChanges();

    // @ts-ignore
    expect.extend(jestSpeculoosMatchers);
  });

  describe('toHaveClass', () => {
    it('should check for a class', () => {
      expect(tester.div).toHaveClass('foo');
      expect(tester.div).not.toHaveClass('baz');
    });

    it('should check for a class', () => {
      expect(() =>
        expect(tester.div).toHaveClass('baz')
      ).toThrowError('Expected element to have class \'baz\', but had \'foo, bar\'');
    });

    it('should return false if class is missing', () => {
      const test = () => expect(tester.div).toHaveClass('baz');
      expect(test).toThrowError(`Expected element to have class 'baz', but had 'foo, bar'`);
    });

    it('should return false if class is present and .not', () => {
      const test = () => expect(tester.div).not.toHaveClass('foo');
      expect(test).toThrowError(`Expected element to not have class 'foo', but had 'foo, bar'`);
    });

    it('should return false if no class', () => {
      const test = () => expect(tester.none).toHaveClass('baz');
      expect(test).toThrowError(`Expected element to have class 'baz', but had none`);
    });

    it('should return true if class is absent and .not', () => {
      const test = () => expect(tester.none).not.toHaveClass('baz');
      expect(test).not.toThrow();
    });

    it('should return false if no element', () => {
      const test = () => expect(null).toHaveClass('baz');
      expect(test).toThrow(`Expected to check class 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const test = () => expect(null).not.toHaveClass('baz');
      expect(test).toThrow(`Expected to check class 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const test = () => expect('hello').not.toHaveClass('baz');
      expect(test).toThrow(`Expected to check class 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const test = () => expect('hello').not.toHaveClass('baz');
      expect(test ).toThrow(`Expected to check class 'baz' on element, but element was not a TestElement`);
    });

  });

  describe('toHaveValue', () => {
    it('should check for a value on an input', () => {
      expect(tester.name).toHaveValue('Hello');
      expect(tester.name).not.toHaveValue('baz');
    });

    it('should check for a value on a textArea', () => {
      // works with TestTextArea
      expect(tester.textArea).toHaveValue('Hi');
    });

    it('should return false if wrong value', () => {
      const test = () => expect(tester.name).toHaveValue('baz');
      expect(test).toThrow(`Expected element to have value 'baz', but had value 'Hello'`);
    });

    it('should return true if wrong value and .not', () => {
      const test = () => expect(tester.name).not.toHaveValue('baz');
      expect(test).not.toThrow();
    });

    it('should return false if matching value and .not', () => {
      const test = () => expect(tester.name).not.toHaveValue('Hello');
      expect(test).toThrow(`Expected element to not have value 'Hello', but had value 'Hello'`);
    });

    it('should return false if no element', () => {
      const test = () => expect(null).toHaveValue('baz');
      expect(test).toThrow(`Expected to check value 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const test = () => expect(null).not.toHaveValue('baz');
      expect(test).toThrow(`Expected to check value 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const test = () => expect('Hello').toHaveValue('baz');
      expect(test).toThrow(`Expected to check value 'baz' on element, but element was neither a TestInput nor a TestTextArea`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const test = () => expect('Hello').not.toHaveValue('baz');
      expect(test).toThrow(`Expected to check value 'baz' on element, but element was neither a TestInput nor a TestTextArea`);
    });
  });

  describe('toHaveText', () => {
    it('should check for a textContent', () => {
      expect(tester.div).toHaveText('Hello');
      expect(tester.div).not.toHaveText('He');
      expect(tester.div).not.toHaveText('baz');
    });

    it('should check for an empty textContent', () => {
      expect(tester.noTextDiv).toHaveText('');
      expect(tester.noTextDiv).not.toHaveText('Hello');
    });

    it('should return false if wrong textContent', () => {
      const test = () => expect(tester.div).toHaveText('baz');
      expect(test).toThrow(`Expected element to have text 'baz', but had 'Hello'`);
    });

    it('should return true if wrong textContent and .not', () => {
      const test = () => expect(tester.div).not.toHaveText('baz');
      expect(test).not.toThrow();
    });

    it('should return false if matching textContent and .not', () => {
      const test = () => expect(tester.div).not.toHaveText('Hello');
      expect(test).toThrow(`Expected element to not have text 'Hello', but had 'Hello'`);
    });

    it('should return false if no textContent', () => {
      const test = () => expect(tester.noTextDiv).toHaveText('baz');
      expect(test).toThrow(`Expected element to have text 'baz', but had ''`);
    });

    it('should return true if no textContent and .not', () => {
      const test = () => expect(tester.name).not.toHaveText('baz');
      expect(test).not.toThrow();
    });

    it('should return false if no element', () => {
      const test = () => expect(null).toHaveText('baz');
      expect(test).toThrow(`Expected to check text 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const test = () => expect(null).not.toHaveText('baz');
      expect(test).toThrow(`Expected to check text 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const test = () => expect('hello').toHaveText('baz');
      expect(test).toThrow(`Expected to check text 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const test = () => expect('hello').not.toHaveText('baz');
      expect(test).toThrow(`Expected to check text 'baz' on element, but element was not a TestElement`);
    });
  });

  describe('toContainText', () => {
    it('should check for a textContent', () => {
      expect(tester.div).toContainText('Hello');
      expect(tester.div).toContainText('He');
      expect(tester.div).not.toContainText('baz');
    });

    it('should return false if wrong textContent', () => {
      const test = () => expect(tester.div).toContainText('baz');
      expect(test).toThrow(`Expected element to contain text 'baz', but had text 'Hello'`);
    });

    it('should return true if wrong textContent and .not', () => {
      const test = () => expect(tester.div).not.toContainText('baz');
      expect(test).not.toThrow();
    });

    it('should return false if matching textContent and .not', () => {
      const test = () => expect(tester.div).not.toContainText('He');
      expect(test).toThrow(`Expected element to not contain text 'He', but had text 'Hello'`);
    });

    it('should return false if no textContent', () => {
      const test = () => expect(tester.name).toContainText('baz');
      expect(test).toThrow(`Expected element to contain text 'baz', but had no text`);
    });

    it('should return true if no textContent and .not', () => {
      const test = () => expect(tester.name).not.toContainText('baz');
      expect(test).not.toThrow();
    });

    it('should return false if no element', () => {
      const test = () => expect(null).toContainText('baz');
      expect(test).toThrow(`Expected to check text 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const test = () => expect(null).not.toContainText('baz');
      expect(test).toThrow(`Expected to check text 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const test = () => expect('hello').toContainText('baz');
      expect(test).toThrow(`Expected to check text 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const test = () => expect('hello').not.toContainText('baz');
      expect(test).toThrow(`Expected to check text 'baz' on element, but element was not a TestElement`);
    });

  });

  describe('toBeChecked', () => {
    it('should check if checked', () => {
      expect(tester.checkbox).toBeChecked();
      tester.checkbox.uncheck();
      expect(tester.checkbox).not.toBeChecked();
    });

    it('should return false if not checked', () => {
      tester.checkbox.uncheck();
      const test = () => expect(tester.checkbox).toBeChecked();
      expect(test).toThrow(`Expected element to be checked, but was not`);
    });

    it('should return true if not checked and .not', () => {
      tester.checkbox.uncheck();
      const test = () => expect(tester.checkbox).not.toBeChecked();
      expect(test).not.toThrow();
    });

    it('should return false if checked and .not', () => {
      const test = () => expect(tester.checkbox).not.toBeChecked();
      expect(test).toThrow(`Expected element to be not checked, but was`);
    });

    it('should return false if no element', () => {
      const test = () => expect(null).toBeChecked();
      expect(test).toThrow(`Expected to check if element was checked, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const test = () => expect(null).toBeChecked();
      expect(test).toThrow(`Expected to check if element was checked, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const test = () => expect('hello').toBeChecked();
      expect(test).toThrow(`Expected to check if element was checked, but element was not a TestInput`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const test = () => expect('hello').toBeChecked();
      expect(test).toThrow(`Expected to check if element was checked, but element was not a TestInput`);
    });
  });

  describe('toHaveSelectedIndex', () => {
    it('should check selected index on a select', () => {
      expect(tester.selectBox).toHaveSelectedIndex(1);
      expect(tester.selectBox).not.toHaveSelectedIndex(0);
    });
    it('should return false if wrong value', () => {
      const test = () => expect(tester.selectBox).toHaveSelectedIndex(0);
      expect(test).toThrow(`Expected element to have selected index 0, but had 1`);
    });
    it('should return true if wrong value and .not', () => {
      const test = () => expect(tester.selectBox).not.toHaveSelectedIndex(0);
      expect(test).not.toThrow();
    });

    it('should return false if matching value and .not', () => {
      const test = () => expect(tester.selectBox).not.toHaveSelectedIndex(1);
      expect(test).toThrow(`Expected element to not have selected index 1, but had 1`);
    });

    it('should return false if no element', () => {
      const test = () => expect(null).toHaveSelectedIndex(1);
      expect(test).toThrow(`Expected to check selected index 1 on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const test = () => expect(null).not.toHaveSelectedIndex(1);
      expect(test).toThrow(`Expected to check selected index 1 on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const test = () => expect(tester.textArea).toHaveSelectedIndex(1);
      expect(test).toThrow(`Expected to check selected index 1 on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const test = () => expect(tester.textArea).not.toHaveSelectedIndex(1);
      expect(test).toThrow(`Expected to check selected index 1 on element, but element was not a TestSelect`);
    });
  });

  describe('toHaveSelectedValue', () => {
    it('should check selected value on a select', () => {
      expect(tester.selectBox).toHaveSelectedValue('a');
      expect(tester.selectBox).not.toHaveSelectedValue('b');
    });

    it('should return false if wrong value', () => {
      const test = () => expect(tester.selectBox).toHaveSelectedValue('b');
      expect(test).toThrow(`Expected element to have selected value 'b', but had 'a'`);
    });

    it('should return true if wrong value and .not', () => {
      const test = () => expect(tester.selectBox).not.toHaveSelectedValue('b');
      expect(test).not.toThrow();
    });

    it('should return false if matching value and .not', () => {
      const test = () => expect(tester.selectBox).not.toHaveSelectedValue('a');
      expect(test).toThrow(`Expected element to not have selected value 'a', but had 'a'`);
    });

    it('should return false if no element', () => {
      const test = () => expect(null).toHaveSelectedValue('a');
      expect(test).toThrow(`Expected to check selected value 'a' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const test = () => expect(null).not.toHaveSelectedValue('a');
      expect(test).toThrow(`Expected to check selected value 'a' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const test = () => expect(tester.textArea).toHaveSelectedValue('a');
      expect(test).toThrow(`Expected to check selected value 'a' on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const test = () => expect(tester.textArea).not.toHaveSelectedValue('a');
      expect(test).toThrow(`Expected to check selected value 'a' on element, but element was not a TestSelect`);
    });
  });

  describe('toHaveSelectedLabel', () => {

    it('should check selected label on a select', () => {
      expect(tester.selectBox).toHaveSelectedLabel('A');
      expect(tester.selectBox).not.toHaveSelectedLabel('B');
    });

    it('should return false if wrong label', () => {
      const test = () => expect(tester.selectBox).toHaveSelectedLabel('B');
      expect(test).toThrow(`Expected element to have selected label 'B', but had 'A'`);
    });

    it('should return true if wrong label and .not', () => {
      const test = () => expect(tester.selectBox).not.toHaveSelectedLabel('b');
      expect(test).not.toThrow();
    });

    it('should return false if matching label and .not', () => {
      const test = () => expect(tester.selectBox).not.toHaveSelectedLabel('A');
      expect(test).toThrow(`Expected element to not have selected label 'A', but had 'A'`);
    });

    it('should return false if no element', () => {
      const test = () => expect(null).not.toHaveSelectedLabel('A');
      expect(test).toThrow(`Expected to check selected label 'A' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const test = () => expect(null).not.toHaveSelectedLabel('A');
      expect(test).toThrow(`Expected to check selected label 'A' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const test = () => expect(tester.textArea).toHaveSelectedLabel('A');
      expect(test).toThrow(`Expected to check selected label 'A' on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const test = () => expect(tester.textArea).not.toHaveSelectedLabel('A');
      expect(test).toThrow(`Expected to check selected label 'A' on element, but element was not a TestSelect`);
    });
  });
});
