var fs = require('fs');

// TODO add CHANGELOG
['README.md', 'LICENSE.md'].forEach(fileName => {
  fs.createReadStream(fileName).pipe(fs.createWriteStream(`projects/ngx-fixture/${fileName}`));
});
