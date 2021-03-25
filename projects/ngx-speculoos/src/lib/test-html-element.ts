import { ComponentTester } from './component-tester';
import { TestElement } from './test-element';
import { DebugElement } from '@angular/core';

/**
 * A wrapped DOM HTML element, providing additional methods and attributes helping with writing tests
 */
export class TestHtmlElement<E extends HTMLElement> extends TestElement<E> {
  constructor(tester: ComponentTester<unknown>, debugElement: DebugElement) {
    super(tester, debugElement);
  }

  /**
   * Clicks on the wrapped element, then triggers a change detection
   */
  click(): void {
    this.nativeElement.click();
    this.tester.detectChanges();
  }

  /**
   * Tests if the element is visible, in the same meaning (and implementation) as in jQuery, i.e.
   * present anywhere in the DOM, and visible.
   * An element is not visible typically, if its display style or any of its ancestors display style is none.
   */
  get visible(): boolean {
    return !!(this.nativeElement.offsetWidth || this.nativeElement.offsetHeight || this.nativeElement.getClientRects().length);
  }
}
