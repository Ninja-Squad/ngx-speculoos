import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Data, ParamMap, Params, Route, UrlSegment } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Type } from '@angular/core';

/**
 * Creates a fake partial ActivatedRoute for tests.
 *
 * If you pass params, then the created route's paramMap will contain the same values.
 * The same goes for queryParams and queryParamMap.
 *
 * If you pass a parent route and a snapshot, and the passed snapshot doesn't have a parent, then the snapshot's
 * parent will be set to the parent route snapshot. This allows the code under test to use
 * `route.parent.snapshot` or `route.snapshot.parent`.
 *
 * If you pass a snapshot with a parent, but don't pass a parent or pass a parent without snapshot, then the route's
 * parent snapshot will be set to the given snapshot's parent. This allows the code under test to use
 * `route.parent.snapshot` or `route.snapshot.parent`.
 *
 * @returns a partially populated, fake ActivatedRoute, depending on what you passed in
 * @deprecated favor stubRoute, which creates an easier to use and more logical stub
 */
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
  component?: Type<unknown> | string | null;
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
  } as ActivatedRoute;

  for (let route: null | ActivatedRoute = result; route; route = route.parent) {
    if (route.parent && route.parent.snapshot && !route.snapshot) {
      // eslint-disable-next-line deprecation/deprecation
      route.snapshot = fakeSnapshot({});
    }
    if (route.parent && route.parent.snapshot && !route.snapshot.parent) {
      (route.snapshot as Omit<ActivatedRouteSnapshot, 'parent'> & { parent: ActivatedRouteSnapshot }).parent = route.parent.snapshot;
    }

    if (route.snapshot && route.snapshot.parent && !route.parent) {
      // eslint-disable-next-line deprecation/deprecation
      (route as Omit<ActivatedRoute, 'parent'> & { parent: ActivatedRoute }).parent = fakeRoute({});
    }
    if (route.snapshot && route.snapshot.parent && route.parent && !route.parent.snapshot) {
      route.parent.snapshot = route.snapshot.parent;
    }
  }

  return result;
}

/**
 * Creates a fake partial ActivatedRouteSnapshot for tests.
 *
 * If you pass params, then the created snapshot's paramMap will contain the same values.
 * The same goes for queryParams and queryParamMap.
 *
 * @returns a partially populated, fake ActivatedRoute, depending on what you passed in
 * @deprecated favor stubRoute, which creates an easier to use and more logical stub for both the route and its snapshot
 */
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
  component?: Type<unknown> | string | null;
  /** The configuration used to match this route */
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

/**
 * The options that are passed when creating an ActivatedRouteStub.
 */
export interface ActivatedRouteStubOptions {
  /**
   * The initial values of the parameters of the route
   */
  params?: Params;
  /**
   * The initial values of the query parameters of the route
   */
  queryParams?: Params;
  /**
   * The initial values of the data of the route
   */
  data?: Data;
  /**
   * The initial fragment of the route
   */
  fragment?: string | null;
  /**
   * The initial url of the route
   */
  url?: UrlSegment[];
  /**
   * The parent of the route
   */
  parent?: ActivatedRouteStub | null;
  /**
   * The first child of the route
   */
  firstChild?: ActivatedRouteStub | null;
  /**
   * The children of the route
   */
  children?: ActivatedRouteStub[] | null;
  /**
   * The configuration of the route
   */
  routeConfig?: Route | null;
}

class ActivatedRouteSnapshotStub extends ActivatedRouteSnapshot {
  private _parent: ActivatedRouteSnapshot | null = null;
  private _root: ActivatedRouteSnapshot;
  private _firstChild: ActivatedRouteSnapshot | null = null;
  private _children: Array<ActivatedRouteSnapshot> = [];
  private _pathFromRoot: Array<ActivatedRouteSnapshot> = [];
  private _routeConfig: Route | null = null;

  get parent(): ActivatedRouteSnapshot | null {
    return this._parent;
  }

  set parent(value: ActivatedRouteSnapshot | null) {
    this._parent = value;
  }

  get root(): ActivatedRouteSnapshot {
    return this._root;
  }

  set root(value: ActivatedRouteSnapshot) {
    this._root = value;
  }

  get firstChild(): ActivatedRouteSnapshot | null {
    return this._firstChild;
  }

  set firstChild(value: ActivatedRouteSnapshot | null) {
    this._firstChild = value;
  }

  get children(): Array<ActivatedRouteSnapshot> {
    return this._children;
  }

  set children(value: Array<ActivatedRouteSnapshot>) {
    this._children = value;
  }

  get pathFromRoot(): Array<ActivatedRouteSnapshot> {
    return this._pathFromRoot;
  }

  set pathFromRoot(value: Array<ActivatedRouteSnapshot>) {
    this._pathFromRoot = value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get routeConfig(): Route | null {
    return this._routeConfig;
  }

  set routeConfig(route: Route | null) {
    this._routeConfig = route;
  }

  get paramMap(): ParamMap {
    return convertToParamMap(this.params);
  }

  get queryParamMap(): ParamMap {
    return convertToParamMap(this.queryParams);
  }

  constructor() {
    super();
    this._root = this;
  }
}

/**
 * A stub for ActivatedRoute. It behaves almost the same way as the actual ActivatedRoute, exposing a snapshot
 * and observables for the params, query params etc., which are kept in sync.
 *
 * In addition, this stub allows simulating a navigation by changing the params, the query params, the fragment, etc.
 * When that happens, the snapshot is modified, then the relevant observables emit the new values.
 *
 * There are some things that don't really work the same way as the real ActivatedRoute though:
 * - the handling of the firstChild and of the children is entirely under the tester's responsibility. Setting the parent
 *   of a route stub does not add this route to the children of its parent, for example.
 * - when changing the params, query params, fragment, etc., their associated observable emits unconditionally, instead of
 *   first checking if the value is actually different from before. It's thus the responsibility of the tester to not
 *   change the values if they're the same as before.
 * - the params, paramMap, queryParams and queryParamMap objects of the route snapshot change when params or query params are set
 *   on the stub route. So if the code keeps a reference to params or paramMaps, it won't see the changes.
 */
export class ActivatedRouteStub extends ActivatedRoute {
  private _firstChild: ActivatedRouteStub | null;
  private _children: Array<ActivatedRouteStub>;

  private readonly paramsSubject: BehaviorSubject<Params>;
  private readonly queryParamsSubject: BehaviorSubject<Params>;
  private readonly dataSubject: BehaviorSubject<Data>;
  private readonly fragmentSubject: BehaviorSubject<string | null>;
  private readonly urlSubject: BehaviorSubject<Array<UrlSegment>>;

  private _parent: ActivatedRouteStub | null;
  private _root: ActivatedRouteStub;
  private _pathFromRoot: Array<ActivatedRouteStub>;

  /**
   * Constructs a new instance, based on the given options.
   * If an option is not provided (or if no option is provided at all), then the route has a default value for this option
   * (empty parameters for example, null fragment, etc.)
   * If no parent is passed, then this route has no parent and is thus set as the root. Otherwise, the root and the path
   * from root are created based on the root and path from root of the given parent route.
   */
  constructor(options?: ActivatedRouteStubOptions) {
    super();

    const snapshot = new ActivatedRouteSnapshotStub();
    this.snapshot = snapshot;

    this._firstChild = options?.firstChild ?? null;
    this._children = options?.children ?? [];
    this._parent = options?.parent ?? null;
    this._root = this.parent?.root ?? this;
    this._pathFromRoot = this.parent ? [...this.parent.pathFromRoot, this] : [this];

    snapshot.params = options?.params ?? {};
    snapshot.queryParams = options?.queryParams ?? {};
    snapshot.data = options?.data ?? {};
    snapshot.fragment = options?.fragment ?? null;
    snapshot.url = options?.url ?? [];
    snapshot.routeConfig = options?.routeConfig ?? null;

    snapshot.firstChild = this.firstChild?.snapshot ?? null;
    snapshot.children = this.children?.map(route => route.snapshot) ?? [];
    snapshot.parent = this.parent?.snapshot ?? null;
    snapshot.root = this.root.snapshot;
    snapshot.pathFromRoot = this.pathFromRoot.map(route => route.snapshot);

    this.paramsSubject = new BehaviorSubject<Params>(this.snapshot.params);
    this.queryParamsSubject = new BehaviorSubject<Params>(this.snapshot.queryParams);
    this.dataSubject = new BehaviorSubject<Data>(this.snapshot.data);
    this.fragmentSubject = new BehaviorSubject<string | null>(this.snapshot.fragment);
    this.urlSubject = new BehaviorSubject<Array<UrlSegment>>(this.snapshot.url);

    this.params = this.paramsSubject.asObservable();
    this.queryParams = this.queryParamsSubject.asObservable();
    this.data = this.dataSubject.asObservable();
    this.fragment = this.fragmentSubject.asObservable();
    this.url = this.urlSubject.asObservable();
  }

  get root() {
    return this._root;
  }

  get parent(): ActivatedRouteStub | null {
    return this._parent;
  }

  get pathFromRoot(): Array<ActivatedRouteStub> {
    return this._pathFromRoot;
  }

  get firstChild(): ActivatedRouteStub | null {
    return this._firstChild;
  }

  get children(): Array<ActivatedRouteStub> {
    return this._children;
  }

  get routeConfig(): Route | null {
    return this.snapshot.routeConfig;
  }

  /**
   * Triggers a navigation with the given new parameters. All the other parts (query params etc.) stay as the are.
   * This is a shortcut to `triggerNavigation` that can be used to only change the parameters.
   */
  public setParams(params: Params): void {
    this.triggerNavigation({ params });
  }

  /**
   * Triggers a navigation with the given new parameter. The other parameters, as well as all the other parts (query params etc.)
   * stay as the are.
   * This is a shortcut to `triggerNavigation` that can be used to only change one parameter.
   */
  public setParam(name: string, value: string): void {
    this.setParams({ ...this.snapshot.params, [name]: value });
  }

  /**
   * Triggers a navigation with the given new query parameters. All the other parts (params etc.) stay as the are.
   * This is a shortcut to `triggerNavigation` that can be used to only change the query parameters.
   */
  public setQueryParams(queryParams: Params): void {
    this.triggerNavigation({ queryParams });
  }

  /**
   * Triggers a navigation with the given new parameter. The other query parameters, as well as all the other parts (params etc.)
   * stay as the are.
   * This is a shortcut to `triggerNavigation` that can be used to only change one query parameter.
   */
  public setQueryParam(name: string, value: string): void {
    this.setQueryParams({ ...this.snapshot.queryParams, [name]: value });
  }

  /**
   * Triggers a navigation with the given new data. The other parameters, as well as all the other parts (params etc.)
   * stay as the are.
   * This is a shortcut to `triggerNavigation` that can be used to only change the data.
   */
  public setData(data: Data): void {
    this.triggerNavigation({ data });
  }

  /**
   * Triggers a navigation with the given new data item. The other data, as well as all the other parts (params etc.)
   * stay as the are.
   * This is a shortcut to `triggerNavigation` that can be used to only change one data item.
   */
  public setDataItem(name: string, value: unknown): void {
    this.setData({ ...this.snapshot.data, [name]: value });
  }

  /**
   * Triggers a navigation with the given new fragment. The other parts (params etc.)  stay as the are.
   * This is a shortcut to `triggerNavigation` that can be used to only change the fragment.
   */
  public setFragment(fragment: string | null): void {
    this.triggerNavigation({ fragment });
  }

  /**
   * Triggers a navigation with the given new url. The other parts (params etc.)  stay as the are.
   * This is a shortcut to `triggerNavigation` that can be used to only change the url.
   */
  public setUrl(url: Array<UrlSegment>): void {
    this.triggerNavigation({ url });
  }

  /**
   * Triggers a navigation based on the given options. If an option is undefined or null, it's ignored. Except for fragment, which is only
   * ignored if it's undefined, because null is a valid value for a fragment.
   *
   * The non-ignored values are used to change the snapshot of the route. Once the snapshot has been modified,
   * the observables corresponding to the updated parts emit the new value.
   *
   * So, setting params and query params will make the params and queryParams observables emit, but not the fragment, data and
   * url observables for example. This is consistent to how the router behaves.
   */
  public triggerNavigation(options: {
    params?: Params;
    queryParams?: Params;
    fragment?: string | null;
    data?: Data | null;
    url?: Array<UrlSegment> | null;
  }): void {
    // set the snapshot first
    if (options.params) {
      this.snapshot.params = options.params;
    }
    if (options.queryParams) {
      this.snapshot.queryParams = options.queryParams;
    }
    if (options.fragment !== undefined) {
      this.snapshot.fragment = options.fragment;
    }
    if (options.data) {
      this.snapshot.data = options.data;
    }
    if (options.url) {
      this.snapshot.url = options.url;
    }

    // then emit everything that has changed
    if (options.params) {
      this.paramsSubject.next(this.snapshot.params);
    }
    if (options.queryParams) {
      this.queryParamsSubject.next(this.snapshot.queryParams);
    }
    if (options.fragment !== undefined) {
      this.fragmentSubject.next(this.snapshot.fragment);
    }
    if (options.data) {
      this.dataSubject.next(this.snapshot.data);
    }
    if (options.url) {
      this.urlSubject.next(this.snapshot.url);
    }
  }

  public toString(): string {
    return 'ActivatedRouteStub';
  }
}

/**
 * Creates a new ActivatedRouteStub, by calling its constructor.
 */
export function stubRoute(options?: ActivatedRouteStubOptions): ActivatedRouteStub {
  return new ActivatedRouteStub(options);
}
