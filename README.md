# Uber Receipt Generator

A professional web application that generates Uber-style receipts in PDF format. This tool is designed for development, testing, and business purposes, allowing users to create realistic-looking receipts with proper fare breakdowns and tax calculations.

## 🚀 Features

- **Professional Uber-style Design**: Mimics the authentic Uber receipt layout and styling
- **PDF Generation**: Downloads receipts as high-quality PDF files
- **Intelligent Fare Breakdown**: Automatically calculates:
  - Base fare (65% of total)
  - Time-based charges (15% of total)
  - Distance charges (10% of total)
  - Service fees (5% of total)
  - GST calculation (18% on subtotal)
- **Indian Currency Support**: All calculations in INR (₹)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **User-Friendly Interface**: Clean, intuitive form for easy data entry

## 🛠️ Technology Stack

- **Frontend**: React 19 + Vite
- **PDF Generation**: @react-pdf/renderer
- **Styling**: CSS3 with modern design patterns
- **Build Tool**: Vite for fast development and optimized builds

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Uber
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📖 How to Use

1. **Enter Trip Details**:
   - Rider's full name
   - Pickup location
   - Drop-off location
   - Pickup and drop-off times
   - Trip date
   - Total fare amount

2. **Generate Receipt**:
   - Click "Generate Receipt" to create the PDF
   - The system automatically calculates fare breakdown and taxes

3. **Download PDF**:
   - Click "Download Receipt" to save the PDF file
   - File naming format: `uber-receipt-[RECEIPT_NUMBER].pdf`

## 💰 Fare Calculation Logic

The application uses a realistic fare breakdown algorithm:

- **Base Fare**: 65% of total fare
- **Time Fare**: 15% of total fare
- **Distance Fare**: 10% of total fare
- **Service Fee**: 5% of total fare
- **GST**: 18% calculated on the subtotal
- **Final Adjustment**: Base fare is adjusted to match the exact total entered

## 🎨 Customization

### Modifying Fare Breakdown
Edit the `calculateFareBreakdown` function in `/src/components/ReceiptPDF.jsx`:

```javascript
const calculateFareBreakdown = (totalFare) => {
  const baseFare = Math.round(totalFare * 0.65); // Adjust percentage
  // ... modify other percentages as needed
};
```

### Styling Changes
- Main app styles: `/src/App.css`
- PDF styles: `/src/components/ReceiptPDF.jsx` (styles object)
- Form styles: Inline styles in `/src/components/ReceiptForm.jsx`

## 📁 Project Structure

```
src/
├── components/
│   ├── ReceiptForm.jsx      # User input form
│   └── ReceiptPDF.jsx       # PDF generation component
├── assets/
│   ├── uber-logo.png        # Uber logo for branding
│   └── react.svg
├── App.jsx                  # Main application component
├── App.css                  # Global styles
├── main.jsx                 # Application entry point
└── index.css                # Base CSS reset
```

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure custom domain if needed

### Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Traditional Web Hosting
1. Run `npm run build`
2. Upload contents of `dist` folder to your web server

## ⚖️ Legal Disclaimer

**Important**: This application is designed for:
- Software development and testing purposes
- Educational demonstrations
- Internal business receipt generation

**Not for**: Creating fraudulent documents or impersonating Uber services. The Uber logo and design elements are used solely for development reference and should be replaced with your own branding for commercial use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support, email your-email@domain.com or create an issue in the GitHub repository.

## 🔮 Future Enhancements

- [ ] Multiple receipt templates (different ride types)
- [ ] Bulk receipt generation
- [ ] Export formats (Excel, CSV)
- [ ] Multi-language support
- [ ] Integration with payment gateways
- [ ] Admin dashboard for businesses
- [ ] Custom branding options

---

Built with ❤️ for the developer communityte

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
