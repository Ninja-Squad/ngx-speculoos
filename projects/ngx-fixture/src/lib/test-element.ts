import { ComponentTester } from './component-tester';

/**
 * A wrapped DOM element, providing additional methods and attributes helping with writing tests
 */
export class TestElement<E extends Element> {
  constructor(protected tester: ComponentTester<any>,
              /**
               * The wrapped DOM element
               */
              public nativeElement: E) { }

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
}
