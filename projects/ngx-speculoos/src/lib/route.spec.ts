import { ActivatedRouteSnapshot, Data, ParamMap, Params, Route, UrlSegment } from '@angular/router';
import { stubRoute } from './route';

describe('routes', () => {
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
      expect(route.snapshot.title).toBeUndefined();

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

      let title: string | undefined = 'hello';
      route.title.subscribe(t => (title = t));
      expect(title).toBeUndefined();

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
      expect(route.snapshot.title).toBeUndefined();

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

      let title: string | undefined = 'hello';
      route.title.subscribe(t => (title = t));
      expect(title).toBeUndefined();

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

    it('should set a title', () => {
      const route = stubRoute();

      let title: string | undefined;
      route.title.subscribe(t => (title = t));

      route.setTitle('test');

      expect(route.snapshot.title).toBe('test');
      expect(title).toBe('test');

      route.setTitle(undefined);

      expect(route.snapshot.title).toBeUndefined();
      expect(title).toBeUndefined();
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
