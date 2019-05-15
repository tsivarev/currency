import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { RouterProvider } from 'react-router5'
import createRouter from './create-router'
import configureStore  from './store/reducers';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

const router = createRouter()
const store = configureStore(router)

router.start(() => {
    ReactDOM.render((
        <Provider store={store}>
            <RouterProvider router={router}>
                <App router={router}/>
            </RouterProvider>
        </Provider>
    ), document.getElementById('root'))
})

registerServiceWorker();