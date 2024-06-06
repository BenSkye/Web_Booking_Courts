import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from '@/App.jsx';
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import '@/styles/main.css';

const theme = {
  token: {
    colorPrimary: '#FFCD1C',
    colorBgLayout: 'linear-gradient(to left, #bcbcbc, #444444)',
    colorTextPlaceholder: 'silver.200',
    colorBgInput: 'white',
    addonBg: 'white',
  },
  components: {
    Button: {
      algorithm: true,
      colorText: 'black',
      variants: {
        primary: {
          backgroundColor: '#FFCD1C',
          color: 'white', // text color when the button has the primary color
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
