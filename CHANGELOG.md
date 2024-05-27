# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [12.0.1](https://github.com/Ninja-Squad/ngx-speculoos/compare/v12.0.0...v12.0.1) (2024-05-27)


### Bug Fixes

* missing ending parenthesis in error message ([e9f07a0](https://github.com/Ninja-Squad/ngx-speculoos/commit/e9f07a0dc644f735b9a0e38737a7273e3052a561))

## [12.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v11.1.0...v12.0.0) (2024-05-26)


### ⚠ BREAKING CHANGES

* `ngx-speculoos` is now based on Angular 18.x. If you want to use it with an older version of Angular, then stick to a previous version of `ngx-speculoos
* `TestSelect`'s `selectIndex`, `selectValue` and `selectLabel` methods now throw if an invalid index, value or label is passed, instead of ignoring it.
* The deprecated `fakeRoute` and `fakeSnapshot` functions have been dropped.
Use `stubRoute`, or the `RoutingTester` instead.

### Features

* drop the deprecated fakeRoute and fakeSnapshot functions ([6a5225a](https://github.com/Ninja-Squad/ngx-speculoos/commit/6a5225a6c4a99cfc26ee7387d04cd68a2ca0c0c4))
* throw when selecting invalid index, value or label ([093cb5a](https://github.com/Ninja-Squad/ngx-speculoos/commit/093cb5aca96732b0bcbeefb68be198fddb691bf2))
* upgrade to Angular and CLI 18 ([99af81c](https://github.com/Ninja-Squad/ngx-speculoos/commit/99af81ce92905d9ee91da5c785475e25be211b79))

## [11.1.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v11.0.0...v11.1.0) (2024-02-16)


### Features

* introduce routing tester to test with the RouterTestingHarness ([4bebe7c](https://github.com/Ninja-Squad/ngx-speculoos/commit/4bebe7cedda53d2d9f49288b291548a9c4286658))

## [11.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v10.0.0...v11.0.0) (2023-11-15)


### ⚠ BREAKING CHANGES

* `ngx-speculoos` is now based on Angular 17.x. If you want to use it with an older version of Angular, then stick to a previous version of `ngx-speculoos`.

### Features

* upgrade to Angular and CLI 17 ([a838a69](https://github.com/Ninja-Squad/ngx-speculoos/commit/a838a69bf53f1784f64f3e5e173141878684e57d))

## [10.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v9.0.0...v10.0.0) (2023-05-05)


### ⚠ BREAKING CHANGES

* `ngx-speculoos` is now based on Angular 16.x. If you want to use it with an older version of Angular, then stick to a previous version of `ngx-speculoos`.

### Features

* upgrade to Angular 16 ([fdd1c4d](https://github.com/Ninja-Squad/ngx-speculoos/commit/fdd1c4d3cf004a2ce7138e0530cea400ed8c34c9))

## [9.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v8.0.1...v9.0.0) (2022-11-18)


### ⚠ BREAKING CHANGES

* `ngx-speculoos` is now based on Angular 15.x. If you want to use it with an older version of Angular, then stick to a previous version of `ngx-speculoos`.

### Features

* **route:** Allows setting the title of a route and of its snapshot ([06d70d8](https://github.com/Ninja-Squad/ngx-speculoos/commit/06d70d8eb0fa1b7c40a1dbb572209bd45f662d38))
* upgrade to Angular 15 ([8662e7d](https://github.com/Ninja-Squad/ngx-speculoos/commit/8662e7de40f4f9f3db06578ad149fe9f003a989e))

### [8.0.1](https://github.com/Ninja-Squad/ngx-speculoos/compare/v8.0.0...v8.0.1) (2022-06-17)


### Bug Fixes

* **route:** make sure param maps contain the same values as params ([c7859a1](https://github.com/Ninja-Squad/ngx-speculoos/commit/c7859a1ac1191c9625f54ddb5cd05bcd06506c0b))

## [8.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v7.2.0...v8.0.0) (2022-06-03)

### ⚠ BREAKING CHANGES

* `ngx-speculoos` is now based on Angular 14.x. It also needs RxJS v7.5+. If you want to use it with an older version of Angular, then stick to the previous version of `ngx-speculoos`.

### Bug Fixes

* ngx-speculoos.d.ts is now index.d.ts ([7bf3ed0](https://github.com/Ninja-Squad/ngx-speculoos/commit/7bf3ed0ebdacf7bcea7f9d446ff192ae65cf6a0b))

## [7.2.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v7.1.0...v7.2.0) (2022-03-03)


### Features

* add routeConfig to the stub snapshot and route ([768c113](https://github.com/Ninja-Squad/ngx-speculoos/commit/768c1132d04d55c59bc0e9c8881622ba06e3593f))

## [7.1.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v7.0.0...v7.1.0) (2022-02-21)


### Features

* allow selecting by type, and getting tokens ([a84096b](https://github.com/Ninja-Squad/ngx-speculoos/commit/a84096ba3c726e80f175ae1ee625330535631521))
* createMock, for easier SpyObj creations ([bf9309e](https://github.com/Ninja-Squad/ngx-speculoos/commit/bf9309edf0575534ae7ef8265f094fd2dcda2f70))
* introduce stubRoute and deprecate fakeRoute and fakeSnapshot ([55de6e2](https://github.com/Ninja-Squad/ngx-speculoos/commit/55de6e2f8f126d4b1851388e3fb377a06b14c69b))
* query for custom test elements ([53b3a45](https://github.com/Ninja-Squad/ngx-speculoos/commit/53b3a45780a882318a08481cf42c14e23fddf434))
* toHaveTrimmedText matcher ([825f19f](https://github.com/Ninja-Squad/ngx-speculoos/commit/825f19f267c8323d055d110135e6056d1fa746eb))

## [7.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v6.0.0...v7.0.0) (2021-11-04)


### ⚠ BREAKING CHANGES

* `ngx-speculoos` is now based on Angular 13.x. It also needs RxJS v7.4+. If you want to use it with an older version of Angular, then stick to the previous version of `ngx-speculoos`.

* bump to ng and cli v13 ([6ca161c](https://github.com/Ninja-Squad/ngx-speculoos/commit/6ca161c2fd757f6aafd2bc3666d38908c1e220ab))

## [6.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v5.0.0...v6.0.0) (2021-05-13)


### Features

* enable Ivy partial compilation ([5731919](https://github.com/Ninja-Squad/ngx-speculoos/commit/573191925e21a62f80ffafc15906f71db54fc83a))


### Bug Fixes

* renovate config ([2df1219](https://github.com/Ninja-Squad/ngx-speculoos/commit/2df12199bdd69c858daafdbbe54bb82816fb9999))

### ⚠ BREAKING CHANGES

* ngx-speculoos now targets Angular 12.0.0 and Ivy only. If you want to use it with Angular 11.x or View Engine, stick to the previous version of ngx-speculoos. Partial Ivy compilation is now enabled, allowing ngcc to skip this package and you to have faster builds! 🚀


## [5.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v4.1.0...v5.0.0) (2020-11-20)


### ⚠ BREAKING CHANGES

* ngx-speculoos is now built against Angular 11.0.0. If you want to use it with Angular 10.x, stick to the previous version of ngx-speculoos.

### Features

* bump to Angular v11 ([060449f](https://github.com/Ninja-Squad/ngx-speculoos/commit/060449f5997e2d6c921df89425996d0afb27b30a))

## [4.1.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v4.0.0...v4.1.0) (2020-08-15)


### Features

* test if html element is visible + corresponding matcher ([192a2bd](https://github.com/Ninja-Squad/ngx-speculoos/commit/192a2bdea64d54bead9b6bdc0760195448df3b41))

## [4.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v3.0.0...v4.0.0) (2020-06-26)


### Features

* strict and better typings ([822963d](https://github.com/Ninja-Squad/ngx-speculoos/commit/822963de66609826c44edf88d0b60c1931af5dc0))

We now properly infer (if possible) the type of the queried element(s).
For example:

    const testElement = tester.element('div'); // inferred as TestHtmlElement<HTMLDivElement> | null
    const testLink = tester.element<HTMLAnchorElement>('.selector'); // inferred as TestHtmlElement<HTMLAnchorElement> | null
    const testButtons = tester.elements<HTMLButtonElement>('.btn'); // inferred as Array<TestButton>
    const testElements = tester.elements('div'); // inferred as Array<TestHtmlElement<HTMLDivElement>>
    const testLinks = tester.elements<HTMLAnchorElement>('.selector'); // inferred as Array<TestHtmlElement<HTMLAnchorElement>>

### ⚠ BREAKING CHANGES

* ngx-speculoos is now built against Angular 10.0.0. If you want to use it with Angular 9.x, stick to the previous version of ngx-speculoos.

## [3.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v2.0.0...v3.0.0) (2020-02-07)


### ⚠ BREAKING CHANGES

* ngx-speculoos is now built against Angular 9.0.0. If you want to use it with Angular 8.x, stick to the previous version of ngx-speculoos.

### Features

* support basic ng-add ([80a3aac](https://github.com/Ninja-Squad/ngx-speculoos/commit/80a3aac1270c62c111986da826dabfbc7a66f080))


### Bug Fixes

* **matchers:** update signature for jasmine 3.4.3 ([09e1172](https://github.com/Ninja-Squad/ngx-speculoos/commit/09e1172738b82f34121126c2654185fb5d26f30e)), closes [/github.com/DefinitelyTyped/DefinitelyTyped/commit/b7d7813c5deacde98bcb7a5e63104431b85c09eb#diff-04770c66399ad864e0881886aaf0800](https://github.com/Ninja-Squad//github.com/DefinitelyTyped/DefinitelyTyped/commit/b7d7813c5deacde98bcb7a5e63104431b85c09eb/issues/diff-04770c66399ad864e0881886aaf0800)
* downgrade compodoc to 1.1.8 because of code block issue on README ([bba2b6b](https://github.com/Ninja-Squad/ngx-speculoos/commit/bba2b6b7a217338e69448deb9163fd803e94c08b)), closes [#146](https://github.com/Ninja-Squad/ngx-speculoos/issues/146) [compodoc/compodoc#765](https://github.com/compodoc/compodoc/issues/765)
* remove reflect polyfill ([592249a](https://github.com/Ninja-Squad/ngx-speculoos/commit/592249a145fe024296313f28be0cb76a9c53a87b))

### chore

* update to Angular and CLI 9.0.0 ([1c0395b](https://github.com/Ninja-Squad/ngx-speculoos/commit/1c0395bc48af885d86058ff16846990460f2cbb9))

## [2.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v1.1.0...v2.0.0) (2019-05-31)


### Bug Fixes

* add @angular/platform-browser as a peer dep ([e354723](https://github.com/Ninja-Squad/ngx-speculoos/commit/e354723))
* add ngx-speculoos as an implicit dependency ([df43796](https://github.com/Ninja-Squad/ngx-speculoos/commit/df43796))
* codelyzer rule name ([3b7ff6c](https://github.com/Ninja-Squad/ngx-speculoos/commit/3b7ff6c))
* combine imports ([17ac60f](https://github.com/Ninja-Squad/ngx-speculoos/commit/17ac60f))
* do not lint public_api.ts ([6179153](https://github.com/Ninja-Squad/ngx-speculoos/commit/6179153))
* jsdoc formatting ([3c95bc6](https://github.com/Ninja-Squad/ngx-speculoos/commit/3c95bc6))
* readonly is already public ([3a159e3](https://github.com/Ninja-Squad/ngx-speculoos/commit/3a159e3))
* update polyfill.ts with latest ([27b885a](https://github.com/Ninja-Squad/ngx-speculoos/commit/27b885a))


### chore

* upgrade to Angular 8.0.0 ([f46816e](https://github.com/Ninja-Squad/ngx-speculoos/commit/f46816e))


### BREAKING CHANGES

* ngx-speculoos is now built against Angular 8.0.0. If you want to use it with Angular 7.x, stick to the previous version of ngx-speculoos.



<a name="1.1.0"></a>
# [1.1.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v1.0.0...v1.1.0) (2018-11-17)


### Features

* add disabled property on TestInput, TestTextarea and TestSelect ([b2e77d6](https://github.com/Ninja-Squad/ngx-speculoos/commit/b2e77d6)), closes [#100](https://github.com/Ninja-Squad/ngx-speculoos/issues/100)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v0.2.3...v1.0.0) (2018-11-02)

This 1.0.0 version is based and tested on Angular 7.0.0, although it should run fine with Angular 6.
Future versions are not guaranteed to support Angular 6, though. We encourage you to ugrade.

### Bug Fixes

* **docs:** typo in readme ([2e6bce7](https://github.com/Ninja-Squad/ngx-speculoos/commit/2e6bce7)), closes [#42](https://github.com/Ninja-Squad/ngx-speculoos/issues/42)



<a name="0.2.3"></a>
## [0.2.3](https://github.com/Ninja-Squad/ngx-speculoos/compare/v0.2.2...v0.2.3) (2018-06-17)



<a name="0.2.2"></a>
## [0.2.2](https://github.com/Ninja-Squad/ngx-speculoos/compare/v0.2.1...v0.2.2) (2018-06-04)



<a name="0.2.1"></a>
## [0.2.1](https://github.com/Ninja-Squad/ngx-speculoos/compare/v0.2.0...v0.2.1) (2018-06-04)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/Ninja-Squad/ngx-speculoos/compare/v0.1.0...v0.2.0) (2018-05-28)


### Bug Fixes

* custom matchers always return false if no element ([a282826](https://github.com/Ninja-Squad/ngx-speculoos/commit/a282826))
* fix toHaveText on empty text contents ([0172de3](https://github.com/Ninja-Squad/ngx-speculoos/commit/0172de3))


### Features

* add custom matcher for class ([39d1f3a](https://github.com/Ninja-Squad/ngx-speculoos/commit/39d1f3a))
* add custom matcher for value ([eee2e97](https://github.com/Ninja-Squad/ngx-speculoos/commit/eee2e97))
* custom matcher toBeChecked ([065ab58](https://github.com/Ninja-Squad/ngx-speculoos/commit/065ab58))
* custom matcher toContainText ([#13](https://github.com/Ninja-Squad/ngx-speculoos/issues/13)) ([e0a0472](https://github.com/Ninja-Squad/ngx-speculoos/commit/e0a0472))
* custom matcher toHaveSelectedIndex ([e1163fb](https://github.com/Ninja-Squad/ngx-speculoos/commit/e1163fb))
* custom matcher toHaveSelectedLabel ([2c49330](https://github.com/Ninja-Squad/ngx-speculoos/commit/2c49330))
* custom matcher toHaveSelectedValue ([085fd65](https://github.com/Ninja-Squad/ngx-speculoos/commit/085fd65))
* custom matcher toHaveText ([8036c22](https://github.com/Ninja-Squad/ngx-speculoos/commit/8036c22))



<a name="0.1.0"></a>
# 0.1.0 (2018-05-25)

### Very first release :champagne:
