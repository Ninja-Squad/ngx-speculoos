/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestButton } from './test-button';
import { TestSelect } from './test-select';
import { TestElement } from './test-element';
import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';
import { TestHtmlElement } from './test-html-element';
import { ComponentTester } from './component-tester';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * @internal
 */
export class TestElementQuerier {
  constructor(
    private tester: ComponentTester<unknown>,
    private root: DebugElement
  ) {}

  static wrap(childDebugElement: DebugElement, tester: ComponentTester<unknown>): TestElement {
    const childElement = childDebugElement.nativeElement;
    if (childElement instanceof HTMLButtonElement) {
      return new TestButton(tester, childDebugElement);
    } else if (childElement instanceof HTMLInputElement) {
      return new TestInput(tester, childDebugElement);
    } else if (childElement instanceof HTMLSelectElement) {
      return new TestSelect(tester, childDebugElement);
    } else if (childElement instanceof HTMLTextAreaElement) {
      return new TestTextArea(tester, childDebugElement);
    } else if (childElement instanceof HTMLElement) {
      return new TestHtmlElement(tester, childDebugElement);
    } else {
      return new TestElement(tester, childDebugElement);
    }
  }

  /**
   * Gets the first element matching the given selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput. You can thus use
   * `tester.element('#some-input') as TestInput`.
   * @param selector a CSS or directive selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element(selector: string | Type<any>): TestElement | null {
    const childElement = this.query(selector);
    return childElement && TestElementQuerier.wrap(childElement, this.tester);
  }

  /**
   * Gets all the elements matching the given selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput. You can thus use
   * `tester.elements('input') as Array<TestInput>`.
   * @param selector a CSS or directive selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements(selector: string | Type<any>): Array<TestElement> {
    const childElements = this.queryAll(selector);
    return childElements.map(debugElement => TestElementQuerier.wrap(debugElement, this.tester));
  }

  /**
   * Gets the first input matched by the given selector. Throws an Error if the matched element isn't actually an input.
   * @param selector a CSS or directive selector
   * @returns the wrapped input, or null if no element was matched
   */
  input(selector: string | Type<any>): TestInput | null {
    const childElement = this.query(selector);
    if (!childElement) {
      return null;
    } else if (!(childElement.nativeElement instanceof HTMLInputElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLInputElement`);
    }
    return new TestInput(this.tester, childElement);
  }

  /**
   * Gets the first select matched by the given selector. Throws an Error if the matched element isn't actually a select.
   * @param selector a CSS or directive selector
   * @returns the wrapped select, or null if no element was matched
   */
  select(selector: string | Type<any>): TestSelect | null {
    const childElement = this.query(selector);
    if (!childElement) {
      return null;
    } else if (!(childElement.nativeElement instanceof HTMLSelectElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLSelectElement`);
    }
    return new TestSelect(this.tester, childElement);
  }

  /**
   * Gets the first textarea matched by the given selector
   * @param selector a CSS or directive selector
   * @returns the wrapped textarea, or null if no element was matched. Throws an Error if the matched element isn't actually a textarea.
   * @throws {Error} if the matched element isn't actually a textarea
   */
  textarea(selector: string | Type<any>): TestTextArea | null {
    const childElement = this.query(selector);
    if (!childElement) {
      return null;
    } else if (!(childElement.nativeElement instanceof HTMLTextAreaElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLTextAreaElement`);
    }
    return new TestTextArea(this.tester, childElement);
  }

  /**
   * Gets the first button matched by the given selector. Throws an Error if the matched element isn't actually a button.
   * @param selector a CSS or directive selector
   * @returns the wrapped button, or null if no element was matched
   */
  button(selector: string | Type<any>): TestButton | null {
    const childElement = this.query(selector);
    if (!childElement) {
      return null;
    } else if (!(childElement.nativeElement instanceof HTMLButtonElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLButtonElement`);
    }
    return new TestButton(this.tester, childElement);
  }

  private query(selector: string | Type<any>): DebugElement | null {
    if (typeof selector === 'string') {
      return this.root.query(By.css(selector));
    } else {
      return this.root.query(By.directive(selector));
    }
  }

  private queryAll(selector: string | Type<any>): Array<DebugElement> {
    if (typeof selector === 'string') {
      return this.root.queryAll(By.css(selector));
    } else {
      return this.root.queryAll(By.directive(selector));
    }
  }
}
