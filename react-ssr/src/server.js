import express from 'express';
import cors from 'cors';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath } from 'react-router';
import { StaticRouter } from 'react-router-dom/server';
import serialize from 'serialize-javascript';
import App from './App';
import routes from './routes';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

const app = express();

// Middleware
app.use(cors());
app.use(express.static('dist'));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
});

// Server-side rendering
app.get('*', async (req, res, next) => {
  try {
    const activeRoute = routes.find(route => matchPath(req.url, route.path)) || {};

    const initialState = {};

    const store = createStore(rootReducer, initialState);

    const data = activeRoute.fetchInitialData ? await activeRoute.fetchInitialData(req.path, store.dispatch) : {};

    const markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App serverData={data} />
        </StaticRouter>
      </Provider>
    );

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>React App</title>
          <link rel="stylesheet" href="/styles.css">
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          <script>window.__INITIAL_STATE__ = ${serialize(store.getState())}</script>
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
