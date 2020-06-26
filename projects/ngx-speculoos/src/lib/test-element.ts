import { ComponentTester } from './component-tester';
import { TestButton } from './test-button';
import { TestSelect } from './test-select';
import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';
import { TestElementQuerier } from './test-element-querier';
import { DebugElement } from '@angular/core';
import { TestHtmlElement } from './test-html-element';

/**
 * A wrapped DOM element, providing additional methods and attributes helping with writing tests
 */
export class TestElement<E extends Element = Element> {

  private querier: TestElementQuerier;

  constructor(
    protected tester: ComponentTester<unknown>,
    /**
     * the wrapped debug element
     */
    readonly debugElement: DebugElement
  ) {
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
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestHtmlElement&lt;HTMLDivElement> | null = tester.element('div');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<K extends keyof HTMLElementTagNameMap>(selector: K): TestHtmlElement<HTMLElementTagNameMap[K]> | null;
  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestElement&lt;SVGLineElement> | null = tester.element('line');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<K extends keyof SVGElementTagNameMap>(selector: K): TestElement<SVGElementTagNameMap[K]> | null;
  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestElement | null = tester.element('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element(selector: string): TestElement | null;
  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestInput | null = tester.element&lt;HTMLInputElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLInputElement>(selector: string): TestInput | null;
  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestTextArea | null = tester.element&lt;HTMLTextAreaElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLTextAreaElement>(selector: string): TestTextArea | null;
  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestSelect | null = tester.element&lt;HTMLSelectElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLSelectElement>(selector: string): TestSelect | null;
  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestButton | null = tester.element&lt;HTMLButtonElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLButtonElement>(selector: string): TestButton | null;
  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestHtmlElement&lt;HTMLDivElement> | null = tester.element&lt;HTMLDivElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLElement>(selector: string): TestHtmlElement<T> | null;
  /**
   * Gets the first element matching the given CSS selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestElement&lt;SVGLineElement> | null = tester.element&lt;SVGLineElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends Element>(selector: string): TestElement<T> | null;
  element(selector: string): TestElement | null {
    return this.querier.element(selector);
  }

  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestHtmlElement&lt;HTMLDivElement>> = tester.elements('div');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<K extends keyof HTMLElementTagNameMap>(selector: K): Array<TestHtmlElement<HTMLElementTagNameMap[K]>>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestElement&lt;SVGLineElement>> = tester.elements('line');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<K extends keyof SVGElementTagNameMap>(selector: K): Array<TestElement<SVGElementTagNameMap[K]>>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestElement> = tester.elements('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements(selector: string): Array<TestElement>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestInput> = tester.elements&lt;HTMLInputElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLInputElement>(selector: string): Array<TestInput>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestTextArea> = tester.elements&lt;HTMLTextAreaElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLTextAreaElement>(selector: string): Array<TestTextArea>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestButton> = tester.elements&lt;HTMLButtonElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLButtonElement>(selector: string): Array<TestButton>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestSelect> = tester.elements<HTMLSelectElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLSelectElement>(selector: string): Array<TestSelect>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestHtmlElement&lt;HTMLDivElement>> = tester.elements&lt;HTMLDivElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLElement>(selector: string): Array<TestHtmlElement<T>>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestElement&lt;SVGLineElement>> = tester.elements&lt;SVGLineElement>('.selector');
   * </code>
   * @param selector a CSS selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends Element>(selector: string): Array<TestElement<T>>;
  elements(selector: string): Array<TestElement> {
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
