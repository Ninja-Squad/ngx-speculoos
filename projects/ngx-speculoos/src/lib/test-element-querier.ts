import { TestButton } from './test-button';
import { TestSelect } from './test-select';
import { TestElement } from './test-element';
import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';
import { TestHtmlElement } from './test-html-element';
import { ComponentTester } from './component-tester';

/**
 * @internal
 */
export class TestElementQuerier {

  constructor(private tester: ComponentTester<any>,
              private root: Element) { }

  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput. You can thus use
   * `tester.element('#some-input') as TestInput`.
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element(selector: string): TestElement<Element> | null {
    const childElement = this.query(selector);
    return childElement && this.wrap(childElement);
  }

  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput. You can thus use
   * `tester.elements('input') as Array<TestInput>`.
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements(selector: string): Array<TestElement<Element>> {
    const childElements = this.queryAll(selector);
    return childElements.map(debugElement => this.wrap(debugElement));
  }

  /**
   * Gets the first input matched by the given selector. Throws an Error if the matched element isn't actually an input.
   * @param selector a CSS selector
   * @returns the wrapped input, or null if no element was matched
   */
  input(selector: string): TestInput {
    const childElement = this.query(selector);
    if (!childElement) {
      return null;
    } else if (!(childElement instanceof HTMLInputElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLInputElement`);
    }
    return new TestInput(this.tester, childElement);
  }

  /**
   * Gets the first select matched by the given selector. Throws an Error if the matched element isn't actually a select.
   * @param selector a CSS selector
   * @returns the wrapped select, or null if no element was matched
   */
  select(selector: string): TestSelect {
    const childElement = this.query(selector);
    if (!childElement) {
      return null;
    } else if (!(childElement instanceof HTMLSelectElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLSelectElement`);
    }
    return new TestSelect(this.tester, childElement);
  }

  /**
   * Gets the first textarea matched by the given selector
   * @param selector a CSS selector
   * @returns the wrapped textarea, or null if no element was matched. Throws an Error if the matched element isn't actually a textarea.
   * @throws {Error} if the matched element isn't actually a textarea
   */
  textarea(selector: string): TestTextArea {
    const childElement = this.query(selector);
    if (!childElement) {
      return null;
    } else if (!(childElement instanceof HTMLTextAreaElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLTextAreaElement`);
    }
    return new TestTextArea(this.tester, childElement);
  }

  /**
   * Gets the first button matched by the given selector. Throws an Error if the matched element isn't actually a button.
   * @param selector a CSS selector
   * @returns the wrapped button, or null if no element was matched
   */
  button(selector: string): TestButton {
    const childElement = this.query(selector);
    if (!childElement) {
      return null;
    } else if (!(childElement instanceof HTMLButtonElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLButtonElement`);
    }
    return new TestButton(this.tester, childElement);
  }

  private query(selector: string): Element | null {
    return this.root.querySelector(selector);
  }

  private queryAll(selector: string): Array<Element> {
    return Array.prototype.slice.call(this.root.querySelectorAll(selector));
  }

  private wrap(childElement: Element): TestElement<any> {
    if (childElement instanceof HTMLButtonElement) {
      return new TestButton(this.tester, childElement);
    } else if (childElement instanceof HTMLInputElement) {
      return new TestInput(this.tester, childElement);
    } else if (childElement instanceof HTMLSelectElement) {
      return new TestSelect(this.tester, childElement);
    } else if (childElement instanceof HTMLTextAreaElement) {
      return new TestTextArea(this.tester, childElement);
    } else if (childElement instanceof HTMLElement) {
      return new TestHtmlElement(this.tester, childElement);
    } else {
      return new TestElement(this.tester, childElement);
    }
  }
}
