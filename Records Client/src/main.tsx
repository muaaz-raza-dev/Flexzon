import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './app/ReduxStore.ts'
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
<App />
  </Provider>
)
serviceWorkerRegistration.unregister()

