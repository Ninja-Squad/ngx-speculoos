import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
import { TestTextArea } from './test-textarea';
import { TestElement } from './test-element';
import { TestInput } from './test-input';
import { TestSelect } from './test-select';
import { TestButton } from './test-button';
import { TestElementQuerier } from './test-element-querier';
import { TestHtmlElement } from './test-html-element';

/**
 * The main entry point of the API. It wraps an Angular ComponentFixture<T>, and gives access to its
 * most used properties and methods. It also allows getting elements wrapped in TestElement (and its subclasses)
 * @param <C> the type of the component to test
 */
export class ComponentTester<C> {
  /**
   * The test element of the component
   */
  readonly testElement: TestElement<HTMLElement>;

  /**
   * The component fixture of the component
   */
  readonly fixture: ComponentFixture<C>;

  /**
   * Creates a component fixture of the given type with the TestBed and wraps it into a ComponentTester
   */
  static create<C>(componentType: Type<C>) {
    const fixture = TestBed.createComponent(componentType);
    return new ComponentTester(fixture);
  }

  /**
   * Creates a ComponentFixture for the given component type using the TestBed, and creates a ComponentTester
   * wrapping (and delegating) to this fixture. If a fixture is passed, then delegates to this fixture directly.
   *
   * Note that no `detectChanges()` call is made by this constructor. It's up to the subclass constructor,
   * or to the user of the created ComponentTester, to call `detectChanges()` at least once to trigger change
   * detection. This is necessary because some component templates can only be evaluated once inputs
   * have been set on the component instance.
   *
   * @param arg the type of the component to wrap, or a component fixture to wrap
   */
  constructor(arg: Type<C> | ComponentFixture<C>) {
    this.fixture = arg instanceof ComponentFixture ? arg : TestBed.createComponent(arg);
    this.testElement = TestElementQuerier.wrap(this.debugElement, this) as TestElement<HTMLElement>;
  }

  /**
   * The native DOM host element of the component
   */
  get nativeElement(): HTMLElement {
    return this.fixture.nativeElement;
  }

  /**
   * Gets the instance of the tested component from the wrapped fixture
   */
  get componentInstance(): C {
    return this.fixture.componentInstance;
  }

  /**
   * Gets the debug element from the wrapped fixture
   */
  get debugElement(): DebugElement {
    return this.fixture.debugElement;
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
    return this.testElement.element(selector);
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
    return this.testElement.elements(selector);
  }

  /**
   * Gets the first input matched by the given selector. Throws an Error if the matched element isn't actually an input.
   * @param selector a CSS selector
   * @returns the wrapped input, or null if no element was matched
   */
  input(selector: string): TestInput | null {
    return this.testElement.input(selector);
  }

  /**
   * Gets the first select matched by the given selector. Throws an Error if the matched element isn't actually a select.
   * @param selector a CSS selector
   * @returns the wrapped select, or null if no element was matched
   */
  select(selector: string): TestSelect | null {
    return this.testElement.select(selector);
  }

  /**
   * Gets the first textarea matched by the given selector
   * @param selector a CSS selector
   * @returns the wrapped textarea, or null if no element was matched. Throws an Error if the matched element isn't actually a textarea.
   * @throws {Error} if the matched element isn't actually a textarea
   */
  textarea(selector: string): TestTextArea | null {
    return this.testElement.textarea(selector);
  }

  /**
   * Gets the first button matched by the given selector. Throws an Error if the matched element isn't actually a button.
   * @param selector a CSS selector
   * @returns the wrapped button, or null if no element was matched
   */
  button(selector: string): TestButton | null {
    return this.testElement.button(selector);
  }

  /**
   * Triggers a change detection using the wrapped fixture
   */
  detectChanges(checkNoChanges?: boolean) {
    this.fixture.detectChanges(checkNoChanges);
  }
}
