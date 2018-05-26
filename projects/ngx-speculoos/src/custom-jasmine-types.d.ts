declare namespace jasmine {
  // the official CustomMatcher interface doesn't have negativeCompare
  // can be removed once PR https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26051 is released
  interface CustomMatcher {
    negativeCompare?<T>(actual: T, expected: T, ...args: any[]): CustomMatcherResult;
    negativeCompare?(actual: any, ...expected: any[]): CustomMatcherResult;
  }
}
