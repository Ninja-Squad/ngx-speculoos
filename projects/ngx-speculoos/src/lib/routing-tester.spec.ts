import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, provideRouter, RouterLink } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RoutingTester } from './routing-tester';
import { RouterTestingHarness } from '@angular/router/testing';
import { speculoosMatchers } from './matchers';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { provideAutomaticChangeDetection } from './providers';

@Component({
  imports: [RouterLink],
  template: `
    <h1>Current page: {{ page() }}</h1>
    <a routerLink="." [queryParams]="{ page: page() + 1 }">Next</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class PageComponent {
  readonly page = toSignal(inject(ActivatedRoute).queryParamMap.pipe(map(m => parseInt(m.get('page') ?? '0'))));
}

class PageComponentTester extends RoutingTester {
  constructor(harness: RouterTestingHarness) {
    super(harness);
  }

  get title() {
    return this.element('h1')!;
  }

  get link() {
    return this.element('a')!;
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
describe('RoutingTester', () => {
  beforeEach(() => {
    jasmine.addMatchers(speculoosMatchers);
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'list', component: PageComponent }])]
    });
  });

  it('should create via forUrl factory method', async () => {
    const tester = await RoutingTester.forUrl('/list?page=42');

    expect(tester.url).toBe('/list?page=42');
    expect(tester.element('h1')!).toHaveText('Current page: 42');
  });

  it('should display the page of the query params', async () => {
    const tester = new PageComponentTester(await RouterTestingHarness.create('/list?page=42'));

    expect(tester.title).toHaveText('Current page: 42');

    await tester.harness.navigateByUrl('/list?page=54');

    expect(tester.title).toHaveText('Current page: 54');
  });

  it('should navigate to the next page when clicking the link', async () => {
    const tester = new PageComponentTester(await RouterTestingHarness.create('/list?page=42'));

    expect(tester.title).toHaveText('Current page: 42');

    tester.link.click();
    await tester.stable();

    expect(tester.urlTree.queryParamMap.get('page')).toBe('43');
    expect(tester.url).toBe('/list?page=43');
    expect(tester.title).toHaveText('Current page: 43');
  });
});
/* eslint-enable @typescript-eslint/no-floating-promises */

describe('RoutingTester in automatic mode', () => {
  beforeEach(() => {
    jasmine.addMatchers(speculoosMatchers);
    TestBed.configureTestingModule({
      providers: [provideAutomaticChangeDetection(), provideRouter([{ path: 'list', component: PageComponent }])]
    });
  });

  it('should create via forUrl factory method', async () => {
    const tester = await RoutingTester.forUrl('/list?page=42');

    expect(tester.url).toBe('/list?page=42');
    expect(tester.element('h1')!).toHaveText('Current page: 42');
  });

  it('should display the page of the query params', async () => {
    const tester = new PageComponentTester(await RouterTestingHarness.create('/list?page=42'));

    expect(tester.title).toHaveText('Current page: 42');

    await tester.harness.navigateByUrl('/list?page=54');

    expect(tester.title).toHaveText('Current page: 54');
  });

  it('should navigate to the next page when clicking the link', async () => {
    const tester = new PageComponentTester(await RouterTestingHarness.create('/list?page=42'));

    expect(tester.title).toHaveText('Current page: 42');

    await tester.link.click();

    expect(tester.urlTree.queryParamMap.get('page')).toBe('43');
    expect(tester.url).toBe('/list?page=43');
    expect(tester.title).toHaveText('Current page: 43');
  });
});
