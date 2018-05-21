# How to cut a release?

1. Make sure everything you want to release is merged on master, and that you pulled it locally
2. From master, create a new branch for the release: `git checkout -b release-xxx`
3. Run `yarn release`. You might need to pass arguments depending on what type of release you want to do. 
   Otherwise, it will choose the version number based on the type of commits that were made (fix, feat, etc.). 
   Read [the guide](https://github.com/conventional-changelog/standard-version#cut-a-release) for more information. In any case, if you screw up, it's not a big deal: you haven't pushed anything yet, nor published the npm package to the registry.
4. You might want to check that the generated version in projects/ngx-fixture/package.json. 
   If something is wrong, you just need to delete the tag created by yarn-release, reset hard to master and start again.
5. Run `yarn build` and `yarn test` and `yarn doc` to make sure everything is fine. 
   The CI will also do it, but you'd better know sooner than later and check twice). 
   You can test the produced library release by linking it (`cd dist/ngx-fixture; yarn link`) and using it 
   in an external project: (in the project: `yarn link ngx-fixture`).
6. Push your branch to trigger a CI build, and ask for a review: you'd better be sure everything is fine: 
   `git push -u origin release-xxx`
7. If the CI build is fine, you can merge to master and push: 
   `git checkout master; git merge release-xxx; git push --follow-tags`.
8. You can now publish the release: `npm publish dist/ngx-fixture`
9. And publish the documentation (gh-pages branch). 
   Make sure you have an `ngx-fixture.github.io` folder as a sibling of the project folder, 
   containing the latest checkout of the gh-pages branch. 
   Then execute `yarn doc` to generate the documentation, and copy the `dist/documentation` 
   folder to the `ngx-fixture.github.io` folder. Add, commit and push everything.
