import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentTester, provideAutomaticChangeDetection, speculoosMatchers } from 'ngx-speculoos';

class AppComponentTester extends ComponentTester<AppComponent> {
  constructor() {
    super(AppComponent);
  }

  get firstName() {
    return this.input('#firstName')!;
  }

  get submit() {
    return this.button('button')!;
  }

  get greeting() {
    return this.element('#greeting')!;
  }
}

describe('AppComponent', () => {
  let tester: AppComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    tester = new AppComponentTester();

    // a first call to change() is necessary.
    void tester.change();

    jasmine.addMatchers(speculoosMatchers);
  });

  it('should display an empty form, with a disabled submit button and no greeting', () => {
    expect(tester.firstName).toHaveValue('');
    expect(tester.submit.disabled).toBe(true);
    expect(tester.greeting).toBeNull();
  });

  it('should enable the submit button when filling the first name', () => {
    void tester.firstName.fillWith('John');
    expect(tester.submit.disabled).toBe(false);
  });

  it('should display the greeting when submitting the form', () => {
    void tester.firstName.fillWith('John');
    void tester.submit.click();
    expect(tester.greeting).toContainText('Hello John');
  });
});

describe('AppComponent in automatic mode', () => {
  let tester: AppComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAutomaticChangeDetection()]
    });
  });

  beforeEach(async () => {
    tester = new AppComponentTester();

    // a first call to change() is necessary.
    await tester.change();

    jasmine.addMatchers(speculoosMatchers);
  });

  it('should display an empty form, with a disabled submit button and no greeting', () => {
    expect(tester.firstName).toHaveValue('');
    expect(tester.submit.disabled).toBe(true);
    expect(tester.greeting).toBeNull();
  });

  it('should enable the submit button when filling the first name', async () => {
    await tester.firstName.fillWith('John');
    expect(tester.submit.disabled).toBe(false);
  });

  it('should display the greeting when submitting the form', async () => {
    await tester.firstName.fillWith('John');
    await tester.submit.click();
    expect(tester.greeting).toContainText('Hello John');
  });
});
