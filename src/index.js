import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import registerServiceWorker from './registerServiceWorker';
import DashApp from './dashApp';
import AppLocale from './languageProvider';
import config, {
  getCurrentLanguage
} from './containers/LanguageSwitcher/config';
import { client } from './apollo/client';
import { store } from './redux/store'

const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];
    ReactDOM.render(
      <ApolloProvider store={store} client={client} >
        <LocaleProvider locale={currentAppLocale.antd}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <DashApp />
          </IntlProvider>
        </LocaleProvider>
      </ApolloProvider>,
      document.getElementById('root')
    );

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./dashApp.js', () => {
    const NextApp = require('./dashApp').default;
    ReactDOM.render(<NextApp />, document.getElementById('root'));
  });
}
registerServiceWorker();
export { AppLocale };
