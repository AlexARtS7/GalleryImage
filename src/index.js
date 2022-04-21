import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import GalleryPage from './pages/GalleryPage';
import Bg from './components/Bg';
import './styles/style.scss';

import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Bg/>
    <GalleryPage/>
  </Provider>
);
