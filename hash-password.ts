// hash.js
const bcrypt = require('bcrypt');

const main = async () => {
    const password = process.argv[2];
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
}
main()