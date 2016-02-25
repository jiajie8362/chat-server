global.express = require('express');

import logger from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';

const app = express();

app.disable('etag');
app.use(logger('dev'));

// if(Config.compressBody) {
//   app.use(require('compression')());
// }

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(appRoot('public')));
app.use(Routes.api.index);
// app.use(Middlewares.notImplementHandler);
// app.use(Middlewares.uncaughtErrorHandler);

app.set('port', 3000);

export default app;
