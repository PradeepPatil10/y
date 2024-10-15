import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import QuoteRequestPage from './pages/QuoteRequestPage'
import QuoteSummaryPage from './pages/QuoteSummaryPage'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/quote-request/:id" element={<QuoteRequestPage />} />
              <Route path="/quote-summary/:id" element={<QuoteSummaryPage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App