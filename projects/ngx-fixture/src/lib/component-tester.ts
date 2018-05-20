import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
import { TestTextArea } from './test-textarea';
import { TestElement } from './test-element';
import { TestInput } from './test-input';
import { TestSelect } from './test-select';
import { TestButton } from './test-button';
import { TestHtmlElement } from './test-html-element';

/**
 * The main entry point of the API. It wraps an Angular ComponentFixture<T>, and gives access to its
 * most used properties and methods. It also allows getting elements wrapped in TestElement (and its subclasses)
 * @param <T> the type of the component to test
 */
export class ComponentTester<T> {

  /**
   * The native DOM host element of the component
   */
  readonly nativeElement: HTMLElement;

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
    this.nativeElement = fixture.nativeElement;
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
    const el = this.nativeElement.querySelector(selector);
    return el && this.wrap(el);
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
    const elements = Array.prototype.slice.call(this.nativeElement.querySelectorAll(selector));
    return elements.map(el => this.wrap(el));
  }

  /**
   * Gets the first input matched by the given selector. Throws an Error if the matched element isn't actually an input.
   * @param selector a CSS selector
   * @returns the wrapped input, or null if no element was matched
   */
  input(selector: string): TestInput {
    const el = this.nativeElement.querySelector(selector);
    if (!el) {
      return null;
    } else if (!(el instanceof HTMLInputElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLInputElement`);
    }
    return new TestInput(this, el);
  }

  /**
   * Gets the first select matched by the given selector. Throws an Error if the matched element isn't actually a select.
   * @param selector a CSS selector
   * @returns the wrapped select, or null if no element was matched
   */
  select(selector: string): TestSelect {
    const el = this.nativeElement.querySelector(selector);
    if (!el) {
      return null;
    } else if (!(el instanceof HTMLSelectElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLSelectElement`);
    }
    return new TestSelect(this, el);
  }

  /**
   * Gets the first textarea matched by the given selector
   * @param selector a CSS selector
   * @returns the wrapped textarea, or null if no element was matched. Throws an Error if the matched element isn't actually a textarea.
   * @throws {Error} if the matched element isn't actually a textarea
   */
  textarea(selector: string): TestTextArea {
    const el = this.nativeElement.querySelector(selector);
    if (!el) {
      return null;
    } else if (!(el instanceof HTMLTextAreaElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLTextAreaElement`);
    }
    return new TestTextArea(this, el);
  }

  /**
   * Gets the first button matched by the given selector. Throws an Error if the matched element isn't actually a button.
   * @param selector a CSS selector
   * @returns the wrapped button, or null if no element was matched
   */
  button(selector: string): TestButton {
    const el = this.nativeElement.querySelector(selector);
    if (!el) {
      return null;
    } else if (!(el instanceof HTMLButtonElement)) {
      throw new Error(`Element with selector ${selector} is not an HTMLButtonElement`);
    }
    return el && new TestButton(this, el);
  }

  /**
   * Triggers a change detection using the wrapped fixture
   */
  detectChanges(checkNoChanges?: boolean) {
    this.fixture.detectChanges(checkNoChanges);
  }

  private wrap(el: Element): TestElement<any> {
    if (el instanceof HTMLButtonElement) {
      return new TestButton(this, el);
    } else if (el instanceof HTMLInputElement) {
      return new TestInput(this, el);
    } else if (el instanceof HTMLSelectElement) {
      return new TestSelect(this, el);
    } else if (el instanceof HTMLTextAreaElement) {
      return new TestTextArea(this, el);
    } else if (el instanceof HTMLElement) {
      return new TestHtmlElement(this, el);
    } else {
      return new TestElement(this, el);
    }
  }
}
