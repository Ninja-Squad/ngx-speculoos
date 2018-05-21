import { ComponentTester } from './component-tester';
import { TestHtmlElement } from './test-html-element';

/**
 * A wrapped DOM HTML textarea element, providing additional methods and attributes helping with writing tests
 */
export class TestTextArea extends TestHtmlElement<HTMLTextAreaElement> {
  constructor(tester: ComponentTester<any>, nativeElement: HTMLTextAreaElement) {
    super(tester, nativeElement);
  }

  /**
   * Sets the value of the wrapped textarea, then dispatches an event of type input and triggers a change detection
   * @param value the new value of the textarea
   */
  fillWith(value: string) {
    this.nativeElement.value = value;
    this.dispatchEventOfType('input');
  }

  /**
   * the value of the wrapped textarea
   */
  get value() {
    return this.nativeElement.value;
  }
}
