const list = require('./license_checker.json');

const allowedList = require('./allowed_licenses.json');

for (const dependency in list) {
    const licenseToCheck = list[dependency].licenses;

    // If license is not in the permissive ones
    if (allowedList.indexOf(licenseToCheck) === -1) {
        console.log('***************** ERROR *************************');
        console.log(list[dependency]);
        console.log('Is not a permissive license\n');
        throw new Error('Using unpermissive license');
    }
}

console.log('***************** SUCCESS *************************');
console.log('All your dependencies are permissive, you are good to go !');
