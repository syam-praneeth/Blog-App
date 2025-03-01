import React from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import { Outlet } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="container py-4">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ClerkProvider>
  )
}

export default RootLayout
