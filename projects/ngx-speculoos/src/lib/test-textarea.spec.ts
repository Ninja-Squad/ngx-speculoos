import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestTextArea } from './test-textarea';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideAutomaticChangeDetection } from './providers';

@Component({
  template: `
    <textarea id="t1" [formControl]="t1" (input)="onInput()"></textarea>
    <textarea id="t2" [formControl]="t2"></textarea>
    <span id="text">{{ t1.value }}</span>
  `,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  readonly t1 = new FormControl('hello');
  readonly t2 = new FormControl('');

  constructor() {
    this.t2.disable();
  }

  onInput() {}
}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get textBox() {
    return this.textarea('#t1');
  }

  get disabledTextBox() {
    return this.textarea('#t2');
  }

  get text() {
    return this.element('#text');
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
describe('TestTextArea', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.textBox instanceof TestTextArea).toBe(true);
  });

  it('should expose the value property', () => {
    expect(tester.textBox.value).toBe('hello');
  });

  it('should fill with new text', () => {
    spyOn(tester.componentInstance, 'onInput');
    spyOn(tester, 'change').and.callThrough();

    tester.textBox.fillWith('goodbye');

    expect(tester.textBox.value).toBe('goodbye');
    expect(tester.componentInstance.onInput).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
    expect(tester.text.textContent).toBe('goodbye');
  });

  it('should expose the disabled property', () => {
    expect(tester.textBox.disabled).toBe(false);
    expect(tester.disabledTextBox.disabled).toBe(true);
  });
});
/* eslint-enable @typescript-eslint/no-floating-promises */

describe('TestTextArea in automatic mode', () => {
  let tester: TestComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideAutomaticChangeDetection()]
    });
    tester = new TestComponentTester();
    await tester.change();
  });

  it('should fill with new text', async () => {
    spyOn(tester.componentInstance, 'onInput');
    spyOn(tester, 'change').and.callThrough();

    await tester.textBox.fillWith('goodbye');

    expect(tester.textBox.value).toBe('goodbye');
    expect(tester.componentInstance.onInput).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
    expect(tester.text.textContent).toBe('goodbye');
  });
});
