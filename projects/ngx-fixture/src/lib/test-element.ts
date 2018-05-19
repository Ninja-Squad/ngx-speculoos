import { ComponentTester } from './component-tester';

export class TestElement<E extends Element> {
  constructor(protected tester: ComponentTester<any>, public nativeElement: E) { }

  get textContent() {
    return this.nativeElement.textContent;
  }

  dispatchEventOfType(type: string) {
    this.nativeElement.dispatchEvent(new Event(type));
    this.tester.detectChanges();
  }

  dispatchEvent(event: Event) {
    this.nativeElement.dispatchEvent(event);
    this.tester.detectChanges();
  }
}
