const dotenv = require('dotenv');
dotenv.load();
exports.DATABASE_URL = process.env.DATABASE_URL ||
global.DATABASE_URL ||
'mongodb://localhost/icode';


exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.CLIENT_ORIGIN = 'https://salty-falls-95504.herokuapp.com' || 'http://localhost:8080';

