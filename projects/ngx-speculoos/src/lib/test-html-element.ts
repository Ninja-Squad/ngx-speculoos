import { ComponentTester } from './component-tester';
import { TestElement } from './test-element';

/**
 * A wrapped DOM HTML element, providing additional methods and attributes helping with writing tests
 */
export class TestHtmlElement<E extends HTMLElement> extends TestElement<E> {
  constructor(tester: ComponentTester<any>, nativeElement: E) {
    super(tester, nativeElement);
  }

  /**
   * Clicks on the wrapped element, then triggers a change detection
   */
  click() {
    this.nativeElement.click();
    this.tester.detectChanges();
  }
}
