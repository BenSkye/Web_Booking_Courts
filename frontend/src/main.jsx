import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from '@/App.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '@/styles/main.css';

const theme = {
  token: {
    colorPrimary: 'rgb(30, 136, 229)',
    colorBgLayout: 'linear-gradient(to left, #bcbcbc, #444444)',
    colorTextPlaceholder: 'silver',
    colorBgInput: 'white',
    addonBg: 'white',
  },
  components: {
    Button: {
      algorithm: true,
      colorText: 'black',
      variants: {
        primary: {
          backgroundColor: 'rgb(30, 136, 229)',
          color: 'white',
        },
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
