require('babel/register')({
  extensions: ['.es'],
  stage: 0
});

var lazy = require('lazily-require');
global.appRoot = require('approot')(__dirname).consolidate();
global.__ = require('lodash');
global.Promise = require('bluebird');
global.moment = require('moment');

// import enhancers
appRoot.enhancers.listChildren().forEach(function(item) {require(appRoot.enhancers(item));});

// require('./config/loadConfig');

// db client
// global.knex = require('knex')(Config.pgClient);

// Lazy folder loading
global.Components = lazy(appRoot.components());
global.Starters = lazy(appRoot.starters());
global.Routes = lazy(appRoot.routes());
global.Queries = lazy(appRoot.queries());
// global.Responses = lazy(appRoot.responses());
// global.Middlewares = lazy(appRoot.middlewares());
// global.Workers = lazy(appRoot.workers());

// Shortcut for frequently used modules
// global.Logger = Components.Logger;
// global.ResponseError = Responses.ResponseError;
// global.redis = Components.RedisClient.create();
