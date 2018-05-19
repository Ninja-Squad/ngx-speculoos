import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Data, ParamMap, Params, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Type } from '@angular/core';

export function fakeRoute(options: {
  url?: Observable<UrlSegment[]>;
  /** An observable of the matrix parameters scoped to this route */
  params?: Observable<Params>;
  /** An observable of the query parameters shared by all the routes */
  queryParams?: Observable<Params>;
  /** An observable of the URL fragment shared by all the routes */
  fragment?: Observable<string>;
  /** An observable of the static and resolved data of this route. */
  data?: Observable<Data>;
  /** The outlet name of the route. It's a constant */
  outlet?: string;
  /** The component of the route. It's a constant */
  component?: Type<any> | string | null;
  /** The current snapshot of this route */
  snapshot?: ActivatedRouteSnapshot;
  /** The configuration used to match this route */
  routeConfig?: Route | null;
  /** The root of the router state */
  root?: ActivatedRoute;
  /** The parent of this route in the router state tree */
  parent?: ActivatedRoute | null;
  /** The first child of this route in the router state tree */
  firstChild?: ActivatedRoute;
  /** The children of this route in the router state tree */
  children?: ActivatedRoute[];
  /** The path from the root of the router state tree to this route */
  pathFromRoot?: ActivatedRoute[];
}): ActivatedRoute {
  const result = {
    url: options.url,
    params: options.params,
    paramMap: options.params && options.params.pipe(map(params => convertToParamMap(params))),
    queryParams: options.queryParams,
    queryParamMap: options.queryParams && options.queryParams.pipe(map(params => convertToParamMap(params))),
    fragment: options.fragment,
    data: options.data,
    outlet: options.outlet,
    component: options.component,
    snapshot: options.snapshot,
    routeConfig: options.routeConfig,
    root: options.root,
    parent: options.parent,
    firstChild: options.firstChild,
    children: options.children,
    pathFromRoot: options.pathFromRoot
  };

  if (result.parent && result.snapshot && !result.snapshot.parent) {
    (result.snapshot as any).parent = result.parent.snapshot;
  } else if (result.snapshot && result.snapshot.parent && !result.parent) {
    result.parent = fakeRoute({
      snapshot: result.snapshot.parent
    });
  }

  return result as ActivatedRoute;
}

export function fakeSnapshot(options: {
  url?: UrlSegment[];
  /** The matrix parameters scoped to this route */
  params?: Params;
  /** The query parameters shared by all the routes */
  queryParams?: Params;
  /** The URL fragment shared by all the routes */
  fragment?: string;
  /** The static and resolved data of this route */
  data?: Data;
  /** The outlet name of the route */
  outlet?: string;
  /** The component of the route */
  component?: Type<any> | string | null;
  /** The configuration used to match this route **/
  routeConfig?: Route;
  /** The root of the router state */
  root?: ActivatedRouteSnapshot;
  /** The parent of this route in the router state tree */
  parent?: ActivatedRouteSnapshot | null;
  /** The first child of this route in the router state tree */
  firstChild?: ActivatedRouteSnapshot | null;
  /** The children of this route in the router state tree */
  children?: ActivatedRouteSnapshot[];
  /** The path from the root of the router state tree to this route */
  pathFromRoot?: ActivatedRouteSnapshot[];
}): ActivatedRouteSnapshot {
  return {
    url: options.url,
    params: options.params,
    paramMap: options.params && convertToParamMap(options.params),
    queryParams: options.queryParams,
    queryParamMap: options.queryParams && convertToParamMap(options.queryParams),
    fragment: options.fragment,
    data: options.data,
    outlet: options.outlet,
    component: options.component,
    routeConfig: options.routeConfig,
    root: options.root,
    parent: options.parent,
    firstChild: options.firstChild,
    children: options.children,
    pathFromRoot: options.pathFromRoot
  } as ActivatedRouteSnapshot;
}
