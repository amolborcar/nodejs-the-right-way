// This doesn't appear to work the way the text describes it, see p.18

#!/user/bin/env node --harmony
require('fs').createReadStream(process.argv[2]).pipe(process.stdout);