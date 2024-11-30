import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

const COMPONENT_FIXTURE_AUTO_DETECTION: EnvironmentProviders = makeEnvironmentProviders([
  { provide: ComponentFixtureAutoDetect, useValue: true }
]);

/**
 * Provide function which returns the provider `{ provide: ComponentFixtureAutoDetect, useValue: true }`.
 * This provider can be added to the testing module to configure the component testers
 * (and the underlying ComponentFixture) in automatic mode:
 *
 * ```
 * TestBed.configureTestingModule({ providers: [provideAutomaticChangeDetection()] });
 * ```
 */
export function provideAutomaticChangeDetection(): EnvironmentProviders {
  return COMPONENT_FIXTURE_AUTO_DETECTION;
}
