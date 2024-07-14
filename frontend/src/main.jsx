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
    colorPrimary: '#4B4032', // Màu xanh lá cây
    colorBgLayout: 'linear-gradient(to left, #bcbcbc, #444444)', // Gradient màu xám
    colorTextPlaceholder: 'silver', // Màu văn bản placeholder xám
    colorBgInput: 'white', // Màu nền input trắng
    addonBg: 'white', // Màu nền các phần bổ sung trắng
  },
  components: {
    Button: {
      algorithm: true,
      colorText: 'black',
      variants: {
        primary: {
          backgroundColor: '#4B4032', // Màu button chính xanh lá cây
          color: 'white', // Màu văn bản button chính trắng
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
