import { ComponentTester } from './component-tester';
import { TestElement } from './test-element';

export class TestTextArea extends TestElement<HTMLTextAreaElement> {
  constructor(tester: ComponentTester<any>, nativeElement: HTMLTextAreaElement) {
    super(tester, nativeElement);
  }

  fillWith(value: string) {
    this.nativeElement.value = value;
    this.dispatchEventOfType('input');
  }

  get value() {
    return this.nativeElement.value;
  }
}
