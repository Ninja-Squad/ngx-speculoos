import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { fakeRoute, fakeSnapshot } from './route';
import { of } from 'rxjs';

describe('routes', () => {
  describe('fakeSnapshot', () => {
    it('should create fake snapshot', () => {
      const snapshot: ActivatedRouteSnapshot = fakeSnapshot({});
      expect(snapshot).not.toBeNull();
    });

    it('should convert params to paramMap', () => {
      const snapshot: ActivatedRouteSnapshot = fakeSnapshot({
        params: {
          foo: 'bar'
        }
      });

      expect(snapshot.params).toEqual({
        foo: 'bar'
      });
      expect(snapshot.paramMap.get('foo')).toBe('bar');
    });

    it('should convert queryParams to queryParamMap', () => {
      const snapshot: ActivatedRouteSnapshot = fakeSnapshot({
        queryParams: {
          foo: 'bar'
        }
      });

      expect(snapshot.queryParams).toEqual({
        foo: 'bar'
      });
      expect(snapshot.queryParamMap.get('foo')).toBe('bar');
    });
  });

  describe('fakeRoute', () => {
    it('should create fake route', () => {
      const route: ActivatedRoute = fakeRoute({});
      expect(route).not.toBeNull();
    });

    it('should convert params to paramMap', () => {
      const route: ActivatedRoute = fakeRoute({
        params: of({
          foo: 'bar'
        })
      });

      route.params.subscribe(p => expect(p).toEqual({
        foo: 'bar'
      }));
      route.paramMap.subscribe(p => expect(p.get('foo')).toBe('bar'));
    });

    it('should convert queryParams to queryParamMap', () => {
      const route: ActivatedRoute = fakeRoute({
        queryParams: of({
          foo: 'bar'
        })
      });

      route.queryParams.subscribe(p => expect(p).toEqual({
        foo: 'bar'
      }));
      route.queryParamMap.subscribe(p => expect(p.get('foo')).toBe('bar'));
    });

    it('should allow accessing parent.snapshot or snapshot.parent when parent has snapshot and route has no snapshot', () => {
      const route = fakeRoute({
        parent: fakeRoute({
          snapshot: fakeSnapshot({
           data: {
             baz: 'bing'
           }
         })
        })
      });

      expect(route.snapshot.parent.data.baz).toBe('bing');
      expect(route.parent.snapshot.data.baz).toBe('bing');
    });

    it('should allow accessing parent.snapshot or snapshot.parent when parent has snapshot and route has snapshot', () => {
      const route = fakeRoute({
        snapshot: fakeSnapshot({}),
        parent: fakeRoute({
          snapshot: fakeSnapshot({
            data: {
              baz: 'bing'
            }
          })
        })
      });

      expect(route.snapshot.parent.data.baz).toBe('bing');
      expect(route.parent.snapshot.data.baz).toBe('bing');
    });

    it('should allow accessing parent.snapshot or snapshot.parent when snapshot has parent and route has no parent', () => {
      const route = fakeRoute({
        snapshot: fakeSnapshot({
          parent: fakeSnapshot({
            data: {
              baz: 'bing'
            }
          })
        })
      });

      expect(route.snapshot.parent.data.baz).toBe('bing');
      expect(route.parent.snapshot.data.baz).toBe('bing');
    });

    it('should allow accessing parent.snapshot or snapshot.parent when snapshot has parent and route has parent', () => {
      const route = fakeRoute({
        snapshot: fakeSnapshot({
          parent: fakeSnapshot({
            data: {
              baz: 'bing'
            }
          })
        }),
        parent: fakeRoute({})
      });

      expect(route.snapshot.parent.data.baz).toBe('bing');
      expect(route.parent.snapshot.data.baz).toBe('bing');
    });
  });
});
