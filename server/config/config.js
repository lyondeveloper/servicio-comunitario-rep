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