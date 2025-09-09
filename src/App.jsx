import { useState } from 'react'
import ReceiptForm from './components/ReceiptForm'
import ReceiptPDF from './components/ReceiptPDF'
import uberLogo from './assets/Uber-Logo.wine.svg'
import './App.css'

function App() {
  const [receiptData, setReceiptData] = useState(null)

  const handleFormSubmit = (data) => {
    setReceiptData(data)
  }

  const handleNewReceipt = () => {
    setReceiptData(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={uberLogo} alt="Uber" className="uber-logo" />
        <h1>Receipt Generator</h1>
        <p>Generate professional Uber-style receipts for development purposes</p>
      </header>

      <main className="app-main">
        {!receiptData ? (
          <ReceiptForm onSubmit={handleFormSubmit} />
        ) : (
          <div className="receipt-preview">
            <div className="receipt-success">
              <h2>✅ Receipt Generated Successfully!</h2>
              <p>Receipt #{receiptData.receiptNumber}</p>
              <div className="receipt-details">
                <h3>Trip Details:</h3>
                <p><strong>Rider:</strong> {receiptData.riderName}</p>
                <p><strong>From:</strong> {receiptData.pickup}</p>
                <p><strong>To:</strong> {receiptData.dropoff}</p>
                <p><strong>Date:</strong> {receiptData.date}</p>
                <p><strong>Total Fare:</strong> ₹{receiptData.totalFare}</p>
              </div>
              <ReceiptPDF receiptData={receiptData} />
              <button 
                onClick={handleNewReceipt}
                className="new-receipt-btn"
              >
                Generate New Receipt
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 Receipt Generator - For Development Purposes Only</p>
        <p>This tool generates Uber-style receipts for software development and testing.</p>
      </footer>
    </div>
  )
}

export default App
