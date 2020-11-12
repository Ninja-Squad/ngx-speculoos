import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentTester, speculoosMatchers } from 'ngx-speculoos';
import { ReactiveFormsModule } from '@angular/forms';

class AppComponentTester extends ComponentTester<AppComponent> {
  constructor() {
    super(AppComponent);
  }

  get firstName() {
    return this.input('#firstName');
  }

  get submit() {
    return this.button('button');
  }

  get greeting() {
    return this.element('#greeting');
  }
}

describe('AppComponent', () => {
  let tester: AppComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        ReactiveFormsModule
      ]
    });
  });

  beforeEach(() => {
    tester = new AppComponentTester();

    // a first call to detectChanges() is necessary. If the component had inputs, you would initialize them
    // before calling detectChanges. For example:
    // tester.componentInstance.someInput = 'someValue';
    tester.detectChanges();

    jasmine.addMatchers(speculoosMatchers);
  });

  it('should display an empty form, with a disabled submit button and no greeting', () => {
    expect(tester.firstName).toHaveValue('');
    expect(tester.submit.disabled).toBe(true);
    expect(tester.greeting).toBeNull();
  });

  it('should enable the submit button when filling the first name', () => {
    tester.firstName.fillWith('John');
    expect(tester.submit.disabled).toBe(false);
  });

  it('should display the greeting when submitting the form', () => {
    tester.firstName.fillWith('John');
    tester.submit.click();
    expect(tester.greeting).toContainText('Hello John');
  });
});
