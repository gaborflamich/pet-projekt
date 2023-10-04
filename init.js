const fs = require('fs');
const packageJson = require('./package.json');
let angularJson = require('./angular.json');
const ecosystemConfigJson = require('./ecosystem.config.json');

if (process.argv.length !== 3) {
  console.error('Nem megfelelő számú paraméter!');
  console.log('Használat: node init.js [projekt-név]');
  return;
}

if (!process.argv[2]) {
  console.error('Hiányzó projekt név paraméter');
  console.log('Használat: node init.js [projekt-név]');
  return;
}

const projectName = process.argv[2];
const defaultName = 'angular-skeleton';
const regex = new RegExp(defaultName, 'g');
console.log(`${defaultName} -> ${projectName}`);

// angular.json
console.log('\n----- angular.json -----');
const angularJsonString = JSON.stringify(angularJson, null, 2).replace(regex, projectName);

// package.json
console.log('\n----- package.json -----');
const packageJsonString = JSON.stringify(packageJson, null, 2).replace(regex, projectName);

// ecosystem.config.json
console.log('\n----- ecosystem.config.json -----');
ecosystemConfigJson.apps.forEach((config) => {
  const renamedConfig = config.name.replace(defaultName, projectName);
  console.log(`${config.name} -> ${renamedConfig}`);
  config.name = renamedConfig;
});
const ecosystemConfigJsonString = JSON.stringify(ecosystemConfigJson, null, 2);

// .gitlab-ci.yml
console.log('\n----- .gitlab-ci.yml -----');
const gitlabCiRenamed = fs.readFileSync('./.gitlab-ci.yml').toString().replace(defaultName, projectName);

// .gitlab-ci.yml
console.log('\n----- karma.conf.js -----');
const karmaConfRenamed = fs.readFileSync('./karma.conf.js').toString().replace(defaultName, projectName);

console.log('\n');
fs.writeFile('./angular.json', angularJsonString, 'utf8', () => {
  console.log('angular.json projekt átnevezés kész!');
});

fs.writeFile('./package.json', packageJsonString, 'utf8', () => {
  console.log('package.json projekt átnevezés kész!');
});

fs.writeFile('./ecosystem.config.json', ecosystemConfigJsonString, 'utf8', () => {
  console.log('ecosystem.config.json projekt átnevezés kész!');
});

fs.writeFile('./.gitlab-ci.yml', gitlabCiRenamed, 'utf8', () => {
  console.log('.gitlab-ci.yml projekt átnevezés kész!');
});

fs.writeFile('./karma.conf.js', karmaConfRenamed, 'utf8', () => {
  console.log('karma.conf.js projekt átnevezés kész!');
});
