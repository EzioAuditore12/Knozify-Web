import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Tailwind Imports
import './index.css'

//Theme Mode
import { useThemeInit } from './hooks/themeMode'

// Progressh Bar
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter(
  { 
    defaultPreload:'intent',
    routeTree ,
    defaultPendingMs: 200,      // optional: adjust when loaders show pending
    defaultPendingMinMs: 100,
  })

  // router events
  router.subscribe('onBeforeLoad', ({ pathChanged }) => {
    if (pathChanged) NProgress.start()
  })
  router.subscribe('onLoad', () => {
    NProgress.done()
  })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

//Theme wrapper
function App(){
  useThemeInit()

  return <RouterProvider router={router} />
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App/>
    </StrictMode>,
  )
}