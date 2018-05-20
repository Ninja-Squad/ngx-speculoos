import { ComponentTester } from './component-tester';
import { TestHtmlElement } from './test-html-element';

/**
 * A wrapped button element, providing additional methods and attributes helping with writing tests
 */
export class TestButton extends TestHtmlElement<HTMLButtonElement> {
  constructor(tester: ComponentTester<any>, nativeElement: HTMLButtonElement) {
    super(tester, nativeElement);
  }

  /**
   * the disabled flag of the button
   */
  get disabled() {
    return this.nativeElement.disabled;
  }
}
