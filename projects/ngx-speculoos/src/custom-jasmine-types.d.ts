declare namespace jasmine {
  // the official CustomMatcher interface doesn't have negativeCompare
  interface CustomMatcher {
    negativeCompare?: (actual: any, ...expected: any[]) => CustomMatcherResult;
  }
}
