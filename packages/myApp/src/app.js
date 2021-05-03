import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const Shell = React.lazy(() => import('shell/Shell'));
const AboutApp = React.lazy(() => import('about/AboutApp'));
const HomeApp = React.lazy(() => import('home/HomeApp'));

export const MyApp = () => {
  return (
    <Suspense fallback='Loading...'>
      <BrowserRouter>
        <Shell>
          <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>

          <div>
            <Switch>
              <Route exact path="/">
                <HomeApp />
              </Route>
              <Route path="/about">
                <AboutApp />
              </Route>
            </Switch>
          </div>
        </Shell>
      </BrowserRouter>
    </Suspense>
  )
}