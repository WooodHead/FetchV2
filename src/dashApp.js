import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { client } from './apollo/client';

import { store, history } from './redux/store';
import PublicRoutes from './router';
import '../src/style/styles.less';

const DashApp = () =>
  <ApolloProvider store={store} client={client} >
    <Provider store={store}>
      <PublicRoutes history={history} />
    </Provider>
  </ApolloProvider>;

export default DashApp;
