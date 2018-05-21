import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
import { TestTextArea } from './test-textarea';
import { TestElement } from './test-element';
import { TestInput } from './test-input';
import { TestSelect } from './test-select';
import { TestButton } from './test-button';
import { TestElementQuerier } from './test-element-querier';

/**
 * The main entry point of the API. It wraps an Angular ComponentFixture<T>, and gives access to its
 * most used properties and methods. It also allows getting elements wrapped in TestElement (and its subclasses)
 * @param <T> the type of the component to test
 */
export class ComponentTester<T> {

  private querier: TestElementQuerier;

  /**
   * Creates a component fixture of the given type with the TestBed and wraps it into a ComponentTester
   */
  static create<T>(type: Type<T>) {
    const fixture = TestBed.createComponent(type);
    return new ComponentTester(fixture);
  }

  /**
   * Creates a ComponentTester wrapping (and delegating) to the given ComponentFixture
   * @param fixture the fixture to wrap
   */
  constructor(public fixture: ComponentFixture<T>) {
    this.querier = new TestElementQuerier(this, fixture.nativeElement);
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
  get componentInstance(): T {
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
  input(selector: string): TestInput | null  {
    return this.querier.input(selector);
  }

  /**
   * Gets the first select matched by the given selector. Throws an Error if the matched element isn't actually a select.
   * @param selector a CSS selector
   * @returns the wrapped select, or null if no element was matched
   */
  select(selector: string): TestSelect | null  {
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

  /**
   * Triggers a change detection using the wrapped fixture
   */
  detectChanges(checkNoChanges?: boolean) {
    this.fixture.detectChanges(checkNoChanges);
  }
}
