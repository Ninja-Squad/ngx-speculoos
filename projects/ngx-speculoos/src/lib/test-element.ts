/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentTester } from './component-tester';
import { TestButton } from './test-button';
import { TestSelect } from './test-select';
import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';
import { TestElementQuerier } from './test-element-querier';
import { DebugElement, ProviderToken, Type } from '@angular/core';
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
  get textContent(): string | null {
    return this.nativeElement.textContent;
  }

  /**
   * dispatches an event of the given type from the wrapped element, then triggers a change detection
   */
  dispatchEventOfType(type: string): void {
    this.nativeElement.dispatchEvent(new Event(type));
    this.tester.detectChanges();
  }

  /**
   * dispatches the given event from the wrapped element, then triggers a change detection
   */
  dispatchEvent(event: Event): void {
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
  attr(name: string): string | null {
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
   * @param selector a CSS or directive selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element(selector: string | Type<any>): TestElement | null;
  /**
   * Gets the first element matching the given selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestInput | null = tester.element&lt;HTMLInputElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLInputElement>(selector: string | Type<any>): TestInput | null;
  /**
   * Gets the first element matching the given selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestTextArea | null = tester.element&lt;HTMLTextAreaElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLTextAreaElement>(selector: string | Type<any>): TestTextArea | null;
  /**
   * Gets the first element matching the given selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestSelect | null = tester.element&lt;HTMLSelectElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLSelectElement>(selector: string | Type<any>): TestSelect | null;
  /**
   * Gets the first element matching the given selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestButton | null = tester.element&lt;HTMLButtonElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLButtonElement>(selector: string | Type<any>): TestButton | null;
  /**
   * Gets the first element matching the given selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestHtmlElement&lt;HTMLDivElement> | null = tester.element&lt;HTMLDivElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends HTMLElement>(selector: string | Type<any>): TestHtmlElement<T> | null;
  /**
   * Gets the first element matching the given selector and wraps it into a TestElement. The actual type
   * of the returned value is the TestElement subclass matching the type of the found element. So, if the
   * matched element is an input for example, the method will return a TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElement: TestElement&lt;SVGLineElement> | null = tester.element&lt;SVGLineElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the wrapped element, or null if no element matches the selector.
   */
  element<T extends Element>(selector: string | Type<any>): TestElement<T> | null;
  element(selector: string | Type<any>): TestElement | null {
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
   * Gets all the elements matching the given selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestElement> = tester.elements('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements(selector: string | Type<any>): Array<TestElement>;
  /**
   * Gets all the elements matching the given selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestInput> = tester.elements&lt;HTMLInputElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLInputElement>(selector: string | Type<any>): Array<TestInput>;
  /**
   * Gets all the elements matching the given selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestTextArea> = tester.elements&lt;HTMLTextAreaElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLTextAreaElement>(selector: string | Type<any>): Array<TestTextArea>;
  /**
   * Gets all the elements matching the given CSS selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestButton> = tester.elements&lt;HTMLButtonElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLButtonElement>(selector: string | Type<any>): Array<TestButton>;
  /**
   * Gets all the elements matching the given selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestSelect> = tester.elements<HTMLSelectElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLSelectElement>(selector: string | Type<any>): Array<TestSelect>;
  /**
   * Gets all the elements matching the given selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestHtmlElement&lt;HTMLDivElement>> = tester.elements&lt;HTMLDivElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends HTMLElement>(selector: string | Type<any>): Array<TestHtmlElement<T>>;
  /**
   * Gets all the elements matching the given selector and wraps them into a TestElement. The actual type
   * of the returned elements is the TestElement subclass matching the type of the found element. So, if the
   * matched elements are inputs for example, the method will return an array of TestInput.
   * <p>Usage:</p>
   * <code>
   * const testElements: Array&lt;TestElement&lt;SVGLineElement>> = tester.elements&lt;SVGLineElement>('.selector');
   * </code>
   * @param selector a CSS or directive selector
   * @returns the array of matched elements, empty if no element was matched
   */
  elements<T extends Element>(selector: string | Type<any>): Array<TestElement<T>>;
  elements(selector: string | Type<any>): Array<TestElement> {
    return this.querier.elements(selector);
  }

  /**
   * Gets the first input matched by the given selector. Throws an Error if the matched element isn't actually an input.
   * @param selector a CSS or directive selector
   * @returns the wrapped input, or null if no element was matched
   */
  input(selector: string | Type<any>): TestInput | null {
    return this.querier.input(selector);
  }

  /**
   * Gets the first select matched by the given selector. Throws an Error if the matched element isn't actually a select.
   * @param selector a CSS or directive selector
   * @returns the wrapped select, or null if no element was matched
   */
  select(selector: string | Type<any>): TestSelect | null {
    return this.querier.select(selector);
  }

  /**
   * Gets the first textarea matched by the given selector
   * @param selector a CSS or directive selector
   * @returns the wrapped textarea, or null if no element was matched. Throws an Error if the matched element isn't actually a textarea.
   * @throws {Error} if the matched element isn't actually a textarea
   */
  textarea(selector: string | Type<any>): TestTextArea | null {
    return this.querier.textarea(selector);
  }

  /**
   * Gets the first button matched by the given selector. Throws an Error if the matched element isn't actually a button.
   * @param selector a CSS or directive selector
   * @returns the wrapped button, or null if no element was matched
   */
  button(selector: string | Type<any>): TestButton | null {
    return this.querier.button(selector);
  }

  /**
   * Gets the first directive matching the given component directive selector and returns its component instance
   * @param selector the selector of a component directive
   */
  component<R>(selector: Type<R>): R {
    return this.querier.element(selector)?.debugElement?.componentInstance ?? null;
  }

  /**
   * Gets the directives matching the given component directive selector and returns their component instance
   * @param selector the selector of a component directive
   */
  components<R>(selector: Type<R>): Array<R> {
    return this.querier.elements(selector).map(e => e.debugElement.componentInstance);
  }

  /**
   * Gets the first element matching the given selector, then gets the given token from its injector, or null if there is no such token
   * @param selector a CSS or directive selector
   * @param token the token to get from the matched element injector
   */
  token<R>(selector: string | Type<any>, token: ProviderToken<R>): R | null {
    return this.querier.element(selector)?.debugElement?.injector?.get(token, null) ?? null;
  }

  /**
   * Gets the elements matching the given selector, then gets their given token from their injector, or null if there is no such token
   * @param selector a CSS or directive selector
   * @param token the token to get from the matched element injector
   */
  tokens<R>(selector: string | Type<any>, token: ProviderToken<R>): Array<R | null> {
    return this.querier.elements(selector).map(e => e.debugElement.injector.get(token, null) ?? null);
  }

  /**
   * Gets the element matching the given selector, and if found, creates and returns a custom TestElement of the provided
   * type. This is useful to create custom higher-level abstractions similar to TestInput, TestSelect, etc. for
   * custom elements or components.
   * @param selector a CSS or directive selector
   * @param customTestElementType the type of the TestElement subclass that will wrap the found element
   */
  custom<E extends TestElement>(selector: string | Type<any>, customTestElementType: Type<E>): E | null {
    const element = this.querier.element(selector);
    return element && new customTestElementType(this.tester, element.debugElement);
  }

  /**
   * Gets the elements matching the given selector, and creates and returns custom TestElements of the provided
   * type. This is useful to create custom higher-level abstractions similar to TestInput, TestSelect, etc. for
   * custom elements or components.
   * @param selector a CSS or directive selector
   * @param customTestElementType the type of the TestElement subclass that will wrap the found elements
   */
  customs<E extends TestElement>(selector: string | Type<any>, customTestElementType: Type<E>): Array<E> {
    return this.querier.elements(selector).map(element => new customTestElementType(this.tester, element.debugElement));
  }
}
