import { ComponentTester } from './component-tester';
import { TestButton } from './test-button';
import { TestSelect } from './test-select';
import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';
import { TestElementQuerier } from './test-element-querier';
import { DebugElement } from '@angular/core';

/**
 * A wrapped DOM element, providing additional methods and attributes helping with writing tests
 */
export class TestElement<E extends Element> {

  private querier: TestElementQuerier;

  constructor(protected tester: ComponentTester<any>,
              /**
               * the wrapped debug element
               */
              public readonly debugElement: DebugElement) {
    this.querier = new TestElementQuerier(tester, debugElement);
  }

  get nativeElement(): E {
    return this.debugElement.nativeElement;
  }

  /**
   * the text content of this element
   */
  get textContent() {
    return this.nativeElement.textContent;
  }

  /**
   * dispatches an event of the given type from the wrapped element, then triggers a change detection
   */
  dispatchEventOfType(type: string) {
    this.nativeElement.dispatchEvent(new Event(type));
    this.tester.detectChanges();
  }

  /**
   * dispatches the given event from the wrapped element, then triggers a change detection
   */
  dispatchEvent(event: Event) {
    this.nativeElement.dispatchEvent(event);
    this.tester.detectChanges();
  }

  /**
   * Gets the CSS classes of the wrapped element, as an array
   */
  get classes(): Array<string> {
    return Array.prototype.slice.call(this.nativeElement.classList);
  }

  /**
   * Gets the attribute of the wrapped element with the given name
   * @param name the name of the attribute to get
   */
  attr(name: string) {
    return this.nativeElement.getAttribute(name);
  }

  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput. You can thus use
   * `tester.element('#some-input') as TestInput`.
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element(selector: string): TestElement<Element> | null {
    return this.querier.element(selector);
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
    return this.querier.elements(selector);
  }

  /**
   * Gets the first input matched by the given selector. Throws an Error if the matched element isn't actually an input.
   * @param selector a CSS selector
   * @returns the wrapped input, or null if no element was matched
   */
  input(selector: string): TestInput | null {
    return this.querier.input(selector);
  }

  /**
   * Gets the first select matched by the given selector. Throws an Error if the matched element isn't actually a select.
   * @param selector a CSS selector
   * @returns the wrapped select, or null if no element was matched
   */
  select(selector: string): TestSelect | null {
    return this.querier.select(selector);
  }

  /**
   * Gets the first textarea matched by the given selector
   * @param selector a CSS selector
   * @returns the wrapped textarea, or null if no element was matched. Throws an Error if the matched element isn't actually a textarea.
   * @throws {Error} if the matched element isn't actually a textarea
   */
  textarea(selector: string): TestTextArea | null {
    return this.querier.textarea(selector);
  }

  /**
   * Gets the first button matched by the given selector. Throws an Error if the matched element isn't actually a button.
   * @param selector a CSS selector
   * @returns the wrapped button, or null if no element was matched
   */
  button(selector: string): TestButton | null {
    return this.querier.button(selector);
  }
}
