import { Component } from '@angular/core';
import { ActivatedRoute, provideRouter, RouterLink } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RoutingTester } from './routing-tester';
import { RouterTestingHarness } from '@angular/router/testing';
import { speculoosMatchers } from './matchers';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Current page: {{ page }}</h1>
    <a routerLink="." [queryParams]="{ page: page + 1 }">Next</a>
  `
})
class PageComponent {
  page!: number;

  constructor(route: ActivatedRoute) {
    route.queryParamMap.subscribe(map => (this.page = parseInt(map.get('page'))));
  }
}

class PageComponentTester extends RoutingTester {
  constructor(harness: RouterTestingHarness) {
    super(harness);
  }

  get title() {
    return this.element('h1');
  }

  get link() {
    return this.element('a');
  }
}

describe('RoutingTester', () => {
  beforeEach(() => {
    jasmine.addMatchers(speculoosMatchers);
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'list', component: PageComponent }])]
    });
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
