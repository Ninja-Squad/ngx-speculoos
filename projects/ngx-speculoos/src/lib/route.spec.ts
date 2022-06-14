import { ActivatedRoute, ActivatedRouteSnapshot, Data, ParamMap, Params, Route, UrlSegment } from '@angular/router';
import { fakeRoute, fakeSnapshot, stubRoute } from './route';
import { of } from 'rxjs';

describe('routes', () => {
  describe('fakeSnapshot', () => {
    it('should create fake snapshot', () => {
      // eslint-disable-next-line deprecation/deprecation
      const snapshot: ActivatedRouteSnapshot = fakeSnapshot({});
      expect(snapshot).not.toBeNull();
    });

    it('should convert params to paramMap', () => {
      // eslint-disable-next-line deprecation/deprecation
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
      // eslint-disable-next-line deprecation/deprecation
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
      // eslint-disable-next-line deprecation/deprecation
      const route: ActivatedRoute = fakeRoute({});
      expect(route).not.toBeNull();
    });

    it('should convert params to paramMap', () => {
      // eslint-disable-next-line deprecation/deprecation
      const route: ActivatedRoute = fakeRoute({
        params: of({
          foo: 'bar'
        })
      });

      route.params.subscribe(p =>
        expect(p).toEqual({
          foo: 'bar'
        })
      );
      route.paramMap.subscribe(p => expect(p.get('foo')).toBe('bar'));
    });

    it('should convert queryParams to queryParamMap', () => {
      // eslint-disable-next-line deprecation/deprecation
      const route: ActivatedRoute = fakeRoute({
        queryParams: of({
          foo: 'bar'
        })
      });

      route.queryParams.subscribe(p =>
        expect(p).toEqual({
          foo: 'bar'
        })
      );
      route.queryParamMap.subscribe(p => expect(p.get('foo')).toBe('bar'));
    });

    it('should allow accessing parent.snapshot or snapshot.parent when parent has snapshot and route has no snapshot', () => {
      // eslint-disable-next-line deprecation/deprecation
      const route = fakeRoute({
        // eslint-disable-next-line deprecation/deprecation
        parent: fakeRoute({
          // eslint-disable-next-line deprecation/deprecation
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
      // eslint-disable-next-line deprecation/deprecation
      const route = fakeRoute({
        // eslint-disable-next-line deprecation/deprecation
        snapshot: fakeSnapshot({}),
        // eslint-disable-next-line deprecation/deprecation
        parent: fakeRoute({
          // eslint-disable-next-line deprecation/deprecation
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
      // eslint-disable-next-line deprecation/deprecation
      const route = fakeRoute({
        // eslint-disable-next-line deprecation/deprecation
        snapshot: fakeSnapshot({
          // eslint-disable-next-line deprecation/deprecation
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
      // eslint-disable-next-line deprecation/deprecation
      const route = fakeRoute({
        // eslint-disable-next-line deprecation/deprecation
        snapshot: fakeSnapshot({
          // eslint-disable-next-line deprecation/deprecation
          parent: fakeSnapshot({
            data: {
              baz: 'bing'
            }
          })
        }),
        // eslint-disable-next-line deprecation/deprecation
        parent: fakeRoute({})
      });

      expect(route.snapshot.parent.data.baz).toBe('bing');
      expect(route.parent.snapshot.data.baz).toBe('bing');
    });
  });

  describe('stubRoute', () => {
    it('should fill the snapshot and the route with empty values if no options are provided', () => {
      const route = stubRoute();

      expect(route.snapshot.params).toEqual({});
      expect(route.snapshot.paramMap.keys).toEqual([]);
      expect(route.snapshot.queryParams).toEqual({});
      expect(route.snapshot.queryParamMap.keys).toEqual([]);
      expect(route.snapshot.data).toEqual({});
      expect(route.snapshot.fragment).toBeNull();
      expect(route.snapshot.url).toEqual([]);
      expect(route.snapshot.parent).toBeNull();
      expect(route.snapshot.children).toEqual([]);
      expect(route.snapshot.firstChild).toBeNull();
      expect(route.snapshot.pathFromRoot).toEqual([route.snapshot]);
      expect(route.snapshot.root).toBe(route.snapshot);
      expect(route.snapshot.routeConfig).toBeNull();

      let params: Params;
      route.params.subscribe(p => (params = p));
      expect(params).toEqual({});

      let paramMap: ParamMap;
      route.paramMap.subscribe(p => (paramMap = p));
      expect(paramMap.keys).toEqual([]);

      let queryParams: Params;
      route.queryParams.subscribe(p => (queryParams = p));
      expect(queryParams).toEqual({});

      let queryParamMap: ParamMap;
      route.queryParamMap.subscribe(p => (queryParamMap = p));
      expect(queryParamMap.keys).toEqual([]);

      let fragment: string;
      route.fragment.subscribe(p => (fragment = p));
      expect(fragment).toBeNull();

      let data: Data;
      route.data.subscribe(p => (data = p));
      expect(data).toEqual({});

      let url: Array<UrlSegment>;
      route.url.subscribe(p => (url = p));
      expect(url).toEqual([]);

      expect(route.parent).toBeNull();
      expect(route.children).toEqual([]);
      expect(route.firstChild).toBeNull();
      expect(route.pathFromRoot).toEqual([route]);
      expect(route.root).toBe(route);
      expect(route.routeConfig).toBeNull();
    });

    it('should fill the snapshot and the route with values if options are provided', () => {
      const providedParams = { foo: 'bar' };
      const providedQueryParams = { baz: 'bing' };
      const providedData = { jing: 'zoom' };
      const providedFragment = 'hello';
      const providedUrl = [new UrlSegment('/path', {})];
      const providedRouteConfig: Route = { path: 'foo' };

      const parent = stubRoute();
      const firstChild = stubRoute();
      const children = [firstChild];

      const route = stubRoute({
        params: providedParams,
        queryParams: providedQueryParams,
        data: providedData,
        fragment: providedFragment,
        url: providedUrl,
        parent,
        firstChild,
        children,
        routeConfig: providedRouteConfig
      });

      expect(route.snapshot.params).toBe(providedParams);
      expect(route.snapshot.paramMap.get('foo')).toBe('bar');
      expect(route.snapshot.queryParams).toBe(providedQueryParams);
      expect(route.snapshot.queryParamMap.get('baz')).toBe('bing');
      expect(route.snapshot.data).toEqual(providedData);
      expect(route.snapshot.fragment).toBe(providedFragment);
      expect(route.snapshot.url).toBe(providedUrl);
      expect(route.snapshot.routeConfig).toBe(providedRouteConfig);
      expect(route.snapshot.parent).toBe(parent.snapshot);
      expect(route.snapshot.children).toEqual(children.map(c => c.snapshot));
      expect(route.snapshot.firstChild).toBe(firstChild.snapshot);
      expect(route.snapshot.pathFromRoot).toEqual([parent.snapshot, route.snapshot]);
      expect(route.snapshot.root).toBe(parent.snapshot);

      let params: Params;
      route.params.subscribe(p => (params = p));
      expect(params).toBe(providedParams);

      let paramMap: ParamMap;
      route.paramMap.subscribe(p => (paramMap = p));
      expect(paramMap.get('foo')).toBe('bar');

      let queryParams: Params;
      route.queryParams.subscribe(p => (queryParams = p));
      expect(queryParams).toBe(providedQueryParams);

      let queryParamMap: ParamMap;
      route.queryParamMap.subscribe(p => (queryParamMap = p));
      expect(queryParamMap.get('baz')).toBe('bing');

      let fragment: string;
      route.fragment.subscribe(p => (fragment = p));
      expect(fragment).toBe(providedFragment);

      let data: Data;
      route.data.subscribe(p => (data = p));
      expect(data).toBe(providedData);

      let url: Array<UrlSegment>;
      route.url.subscribe(p => (url = p));
      expect(url).toBe(providedUrl);

      expect(route.parent).toBe(parent);
      expect(route.children).toBe(children);
      expect(route.firstChild).toBe(firstChild);
      expect(route.pathFromRoot).toEqual([parent, route]);
      expect(route.root).toBe(parent);
      expect(route.routeConfig).toBe(providedRouteConfig);
    });

    it('should set a param', () => {
      const route = stubRoute({ params: { a: 'a1', b: 'b1' } });

      const expectedParams = { a: 'a2', b: 'b1' };

      let queryParamEmissionCount = 0;
      let snapshotAtEmissionTime: ActivatedRouteSnapshot;
      route.queryParams.subscribe(() => queryParamEmissionCount++);
      let params: Params;
      route.params.subscribe(p => {
        params = p;
        snapshotAtEmissionTime = route.snapshot;
      });

      route.setParam('a', 'a2');

      expect(route.snapshot.params).toEqual(expectedParams);
      expect(snapshotAtEmissionTime.params).toEqual(expectedParams);
      expect(params).toEqual(expectedParams);
      expect(queryParamEmissionCount).toBe(1);
    });

    it('should set a param in the map too, even if the map has already been read before', () => {
      const route = stubRoute();

      expect(route.snapshot.paramMap.get('a')).toBeNull();

      const expectedParams = { a: 'a2' };

      route.setParam('a', 'a2');

      expect(route.snapshot.params).toEqual(expectedParams);
      expect(route.snapshot.paramMap.get('a')).toBe('a2');
    });

    it('should set a query param', () => {
      const route = stubRoute({ queryParams: { a: 'a1', b: 'b1' } });

      const expectedQueryParams = { a: 'a2', b: 'b1' };
      let queryParams: Params;
      route.queryParams.subscribe(p => (queryParams = p));

      route.setQueryParam('a', 'a2');

      expect(route.snapshot.queryParams).toEqual(expectedQueryParams);
      expect(queryParams).toEqual(expectedQueryParams);
      expect(route.snapshot.queryParamMap.get('a')).toBe('a2');
      expect(route.snapshot.queryParamMap.get('b')).toBe('b1');
    });

    it('should set a query param in the map too, even if the map has already been read before', () => {
      const route = stubRoute();

      expect(route.snapshot.queryParamMap.get('a')).toBeNull();

      const expectedQueryParams = { a: 'a2' };

      route.setQueryParam('a', 'a2');

      expect(route.snapshot.queryParams).toEqual(expectedQueryParams);
      expect(route.snapshot.queryParamMap.get('a')).toBe('a2');
    });

    it('should set a datum', () => {
      const route = stubRoute({ data: { a: 'a1', b: 'b1' } });

      const expectedData = { a: 'a2', b: 'b1' };
      let data: Data;
      route.data.subscribe(p => (data = p));

      route.setDataItem('a', 'a2');

      expect(route.snapshot.data).toEqual(expectedData);
      expect(data).toEqual(expectedData);
    });

    it('should set a fragment', () => {
      const route = stubRoute();

      const expectedFragment = 'hello';
      let fragment: string;
      route.fragment.subscribe(p => (fragment = p));

      route.setFragment('hello');

      expect(route.snapshot.fragment).toEqual(expectedFragment);
      expect(fragment).toEqual(expectedFragment);
    });

    it('should set the url', () => {
      const route = stubRoute();

      const expectedUrl = [new UrlSegment('/foo', {})];
      let url: Array<UrlSegment>;
      route.url.subscribe(p => (url = p));

      route.setUrl(expectedUrl);

      expect(route.snapshot.url).toEqual(expectedUrl);
      expect(url).toEqual(expectedUrl);
    });
  });
});
