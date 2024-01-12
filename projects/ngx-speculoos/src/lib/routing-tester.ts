import { ComponentTester } from './component-tester';
import { RouterTestingHarness } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';
import { TestBed } from '@angular/core/testing';

/**
 * A thin wrapper around Angular RouterTestingHarness which helps testing routed components.
 * It allows, based on a configured testing module where the router is provided, to initially navigate
 * to a given route, then test the routed component. It's then possible to either navigate again with
 * the wrapped harness, or to use the component to trigger navigation, and test that the URL has changed
 * for example.
 */
export class RoutingTester extends ComponentTester<unknown> {
  constructor(readonly harness: RouterTestingHarness) {
    super(harness.fixture);
  }

  /**
   * Creates a RouterTestngHarness and uses it to navigate to the given URL
   * @param url the URL to initially navigate to.
   * @return a promise which resolves to a RoutingTester which wraps the harness
   * and its fixture.
   */
  static async forUrl(url: string) {
    const harness = await RouterTestingHarness.create(url);
    return new RoutingTester(harness);
  }

  /**
   * Gets the current URL of the Router service as a string
   */
  get url(): string {
    const router = TestBed.inject(Router);
    return router.url;
  }

  /**
   * Gets the current URL of the Router service as an UrlTree, to be able to test its
   * elements (query params, etc.)
   */
  get urlTree(): UrlTree {
    const router = TestBed.inject(Router);
    return router.parseUrl(router.url);
  }
}
