import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from "../useAuth.jsx"; // Import AuthProvider


createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <App />
</AuthProvider>,
)
