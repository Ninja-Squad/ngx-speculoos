# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
