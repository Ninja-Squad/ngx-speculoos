module.exports = {
  scripts: {
    // Format the generated changelog before the release commit; the release script runs from projects/ngx-speculoos.
    postchangelog: 'pnpm --dir ../.. exec oxfmt --write CHANGELOG.md'
  }
};
