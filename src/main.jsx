import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux";
import { store } from "./Shop/Features/Cart/store"
import { StyledEngineProvider } from '@mui/system';



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <StyledEngineProvider injectFirst>
  <Provider store={store}>
    <App />
  </Provider>
  </StyledEngineProvider>
  </React.StrictMode>
)