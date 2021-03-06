import { applyMiddleware, createStore} from 'redux'
import { rootReducer } from './redux'
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancers = [];
const middleware = {};

if (process.env.NODE_ENV === 'development') {
  const __REDUX_DEVTOOLS_EXTENSION__ = window['devToolsExtension']

  if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancers.push(__REDUX_DEVTOOLS_EXTENSION__())
  }
}

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware()
));

export default store
