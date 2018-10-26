/**
 * 
 * Port
 * 
 */

process.env.PORT = process.env.PORT || 3000;

/** 
 * 
 * Enviroment
 * 
*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/** 
 * 
 * token seed
 * 
*/

process.env.TOKEN_SEED = process.env.TOKEN_SEED || "this-is-the-development-token-seed";

/** 
 * 
 * Token expiration
 * 
*/

process.env.TOKEN_EXPIRATION = 60 * 60 * 60 * 60;

/** 
 * Database configuration
*/

if (process.env.NODE_ENV === "dev") {

    process.env.MONGOURI = "mongodb://localhost:27017/GENBolivarianoDB";

} else {

    process.env.MONGOURI = process.env.MONGO_PRODUCTION;

}

