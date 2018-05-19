import { ComponentTester } from './component-tester';
import { TestElement } from './test-element';

export class TestButton extends TestElement<HTMLButtonElement> {
  constructor(tester: ComponentTester<any>, nativeElement: HTMLButtonElement) {
    super(tester, nativeElement);
  }

  click() {
    this.nativeElement.click();
    this.tester.detectChanges();
  }
}
