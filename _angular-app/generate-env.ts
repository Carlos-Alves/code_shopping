const fs = require('fs');
const path = require('path');

const  envsPath = "src/environments";
const envMockDev = path.join(envsPath, 'environment.mock-dev.ts');
const envMockProd = path.join(envsPath, 'environment.mock-prod.ts');
const envDev = path.join(envsPath, 'environment.ts');
const envProd = path.join(envsPath, 'environment.prod.ts');

fs.createReadStream(envMockDev)
    .pipe(fs.createWriteStream(envDev));

fs.createReadStream(envMockProd)
    .pipe(fs.createWriteStream(envProd));
