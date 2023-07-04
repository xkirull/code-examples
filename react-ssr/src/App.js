import * as React from 'react';
import routes from './routes';
import { Route, Routes } from 'react-router-dom';
import Page404 from './pages/404';
import Menu from './component/Menu';

export default function App({ serverData = null }) {
  return (
    <React.Fragment>
      <Routes>
        {routes.map(({ path, component: Element }) => (
          <Route
            key={path}
            path={path}
            element={<Element />}
          />
        ))}
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Menu />
    </React.Fragment>
  )
}