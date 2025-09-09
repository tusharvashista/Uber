import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Link, Image } from '@react-pdf/renderer';

// Styles matching the authentic Uber receipt
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 25,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: 1,
    borderBottomColor: '#e0e0e0',
  },
  uberLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  date: {
    fontSize: 11,
    color: '#666666',
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    marginTop: 15,
  },
  subGreeting: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 18,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 18,
    paddingBottom: 12,
    borderBottom: 1,
    borderBottomColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  breakdownSection: {
    marginBottom: 15,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingVertical: 1,
  },
  breakdownLabel: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
    paddingRight: 10,
  },
  breakdownAmount: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'normal',
    textAlign: 'right',
    minWidth: 70,
    paddingRight: 10,
  },
  subtotalSection: {
    marginBottom: 15,
    paddingTop: 8,
    borderTop: 1,
    borderTopColor: '#e0e0e0',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  subtotalLabel: {
    fontSize: 10,
    color: '#333333',
  },
  subtotalAmount: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'bold',
  },
  creditAmount: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  paymentsSection: {
    marginTop: 20,
    marginBottom: 18,
  },
  paymentsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cashIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  cashText: {
    fontSize: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  paymentTime: {
    fontSize: 9,
    color: '#666666',
    marginTop: 2,
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  convenienceText: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 1.3,
  },
  linkText: {
    fontSize: 9,
    color: '#1a73e8',
    textDecoration: 'underline',
    marginBottom: 12,
  },
  gstText: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  tripSection: {
    marginBottom: 15,
    paddingTop: 15,
    borderTop: 1,
    borderTopColor: '#e0e0e0',
  },
  rideWithText: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  licenseText: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 12,
  },
  tripDetails: {
    marginBottom: 12,
  },
  tripDistanceTime: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 15,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  routeIconContainer: {
    width: 16,
    height: 40,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
  },
  routeSquare: {
    width: 8,
    height: 8,
    backgroundColor: '#000000',
    marginBottom: 4,
  },
  routeLine: {
    width: 1,
    height: 12,
    backgroundColor: '#000000',
    marginBottom: 4,
  },
  routeLocations: {
    flex: 1,
  },
  routeTime: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    minWidth: 60,
    marginRight: 12,
  },
  routeLocation: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
    lineHeight: 1.3,
  },
  footerText: {
    fontSize: 9,
    color: '#666666',
    marginTop: 15,
    lineHeight: 1.3,
  },
});

// Function to calculate realistic Uber India rental fare breakdown with multiple packages
const calculateUberFareBreakdown = (totalFare, tripStats) => {
  const distance = parseFloat(tripStats.distance);
  const duration = parseInt(tripStats.duration);
  
  // Uber India rental packages (realistic options)
  const packages = [
    { hours: 1, km: 10, name: "1hr/10km" },
    { hours: 2, km: 20, name: "2hr/20km" },
    { hours: 4, km: 40, name: "4hr/40km" },
    { hours: 6, km: 60, name: "6hr/60km" },
    { hours: 8, km: 80, name: "8hr/80km" },
    { hours: 12, km: 120, name: "12hr/120km" }
  ];
  
  // Smart package selection based on trip characteristics and total fare
  let selectedPackage;
  const tripHours = duration / 60;
  
  // Find the best matching package based on actual usage and fare
  if (totalFare <= 800) {
    // Small fares: 1-2hr packages
    selectedPackage = tripHours <= 1.5 ? packages[0] : packages[1];
  } else if (totalFare <= 1500) {
    // Medium fares: 2-4hr packages  
    selectedPackage = tripHours <= 3 ? packages[1] : packages[2];
  } else if (totalFare <= 2500) {
    // Large fares: 4-6hr packages
    selectedPackage = tripHours <= 5 ? packages[2] : packages[3];
  } else if (totalFare <= 4000) {
    // Very large fares: 6-8hr packages
    selectedPackage = tripHours <= 7 ? packages[3] : packages[4];
  } else {
    // Premium fares: 8-12hr packages
    selectedPackage = tripHours <= 10 ? packages[4] : packages[5];
  }
  
  const packageDuration = selectedPackage.hours * 60; // in minutes
  const packageDistance = selectedPackage.km; // in km
  
  // Uber India rental rates (realistic)
  const extraDistanceRate = 11.0; // Rs 11 per km
  const extraTimeRate = 2.5; // Rs 2.5 per minute
  
  // Check if limits exceeded
  const exceededDistance = distance > packageDistance ? distance - packageDistance : 0;
  const exceededTime = duration > packageDuration ? duration - packageDuration : 0;
  
  let breakdown = {};
  breakdown.packageName = selectedPackage.name;
  
  // Calculate additional charges first (if any)
  let additionalCharges = 0;
  
  if (exceededDistance > 0) {
    breakdown.distanceCharges = Math.round(exceededDistance * extraDistanceRate);
    breakdown.showDistance = true;
    breakdown.extraDistance = exceededDistance.toFixed(1);
    additionalCharges += breakdown.distanceCharges;
  } else {
    breakdown.showDistance = false;
    breakdown.distanceCharges = 0;
  }
  
  if (exceededTime > 0) {
    breakdown.timeCharges = Math.round(exceededTime * extraTimeRate);
    breakdown.showTime = true;
    breakdown.extraTime = Math.round(exceededTime);
    additionalCharges += breakdown.timeCharges;
  } else {
    breakdown.showTime = false;
    breakdown.timeCharges = 0;
  }
  
  // Calculate base fare (total - additional charges)
  const baseFare = totalFare - additionalCharges;
  
  // Apply your specified ratios
  let packageFareRatio, uberFeeRatio;
  
  if (additionalCharges > 0) {
    // When additional charges exist: Package 50-55%, Uber 30-40%
    if (baseFare <= 1500) {
      packageFareRatio = 0.55; // 55%
      uberFeeRatio = 0.40; // 40%
    } else if (baseFare <= 3000) {
      packageFareRatio = 0.53; // 53%
      uberFeeRatio = 0.37; // 37%
    } else {
      packageFareRatio = 0.50; // 50%
      uberFeeRatio = 0.35; // 35%
    }
  } else {
    // No additional charges: Package 55-65%, Uber 35-45%
    if (baseFare <= 1000) {
      packageFareRatio = 0.65; // 65%
      uberFeeRatio = 0.35; // 35%
    } else if (baseFare <= 2500) {
      packageFareRatio = 0.60; // 60%
      uberFeeRatio = 0.40; // 40%
    } else {
      packageFareRatio = 0.55; // 55%
      uberFeeRatio = 0.45; // 45%
    }
  }
  
  // Calculate package fare and Uber fees
  breakdown.packageFare = Math.round(baseFare * packageFareRatio);
  breakdown.uberFees = Math.round(baseFare * uberFeeRatio);
  
  // Ensure total matches by adjusting package fare
  const calculatedBaseFare = breakdown.packageFare + breakdown.uberFees;
  const baseFareAdjustment = baseFare - calculatedBaseFare;
  breakdown.packageFare += baseFareAdjustment;
  
  // Safety check: ensure minimum values
  if (breakdown.packageFare < 200) {
    const deficit = 200 - breakdown.packageFare;
    breakdown.packageFare = 200;
    breakdown.uberFees = Math.max(100, breakdown.uberFees - deficit);
  }
  
  // Calculate subtotal before credits
  const subtotalBeforeCredits = breakdown.packageFare + breakdown.uberFees + additionalCharges;
  
  // Apply Uber One Credits (realistic: 1.5-3% of total, min Rs 5, max Rs 60)
  let creditPercentage;
  if (totalFare <= 1000) creditPercentage = 0.015; // 1.5%
  else if (totalFare <= 2500) creditPercentage = 0.02; // 2%
  else if (totalFare <= 5000) creditPercentage = 0.025; // 2.5%
  else creditPercentage = 0.03; // 3%
  
  const uberOneCredits = Math.min(60, Math.max(5, Math.round(totalFare * creditPercentage)));
  
  const subtotalAfterCredits = subtotalBeforeCredits - uberOneCredits;
  
  // Calculate GST (18% in India)
  const gstAmount = Math.round(subtotalAfterCredits * 0.18);
  
  // Final adjustment to match exact total
  const calculatedTotal = subtotalAfterCredits + gstAmount;
  const finalAdjustment = totalFare - calculatedTotal;
  breakdown.packageFare += finalAdjustment;
  
  return {
    ...breakdown,
    subtotalBeforeCredits: breakdown.packageFare + breakdown.uberFees + additionalCharges,
    uberOneCredits,
    subtotalAfterCredits: breakdown.packageFare + breakdown.uberFees + additionalCharges - uberOneCredits,
    gstAmount,
    total: totalFare
  };
};

// Helper function to format currency - using rupee icon SVG
const formatCurrency = (amount) => {
  // For now, using Rs text since SVG inline in text is complex in PDF
  // We can use the rupee-icon.svg for dedicated currency displays
  return `Rs ${amount.toFixed(2)}`;
};

// Helper function to format time for display
const formatDisplayTime = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour24 = parseInt(hours);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minutes} ${ampm}`;
};

// Calculate trip distance and duration (mock realistic values)
const calculateTripStats = (pickupTime, dropoffTime) => {
  if (!pickupTime || !dropoffTime) return { distance: '25.6', duration: '45' };
  
  const pickup = new Date(`2000-01-01T${pickupTime}`);
  const dropoff = new Date(`2000-01-01T${dropoffTime}`);
  let duration = Math.abs(dropoff - pickup) / (1000 * 60); // in minutes
  
  // If dropoff is next day, add 24 hours
  if (dropoff < pickup) {
    duration += 24 * 60;
  }
  
  // Calculate realistic distance based on time (avg speed 25-35 km/h in city)
  const distance = Math.round((duration * 0.5) * 10) / 10; // 30 km/h average
  
  return {
    distance: distance.toString(),
    duration: Math.round(duration).toString()
  };
};

// Main PDF Document Component
const UberReceiptPDF = ({ receiptData }) => {
  // Add defensive checks
  if (!receiptData) {
    return <Document><Page><Text>No receipt data</Text></Page></Document>;
  }

  const tripStats = calculateTripStats(receiptData.pickupTime, receiptData.dropoffTime);
  const fareBreakdown = calculateUberFareBreakdown(receiptData.totalFare || 0, tripStats);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.uberLogo}>Uber</Text>
          <Text style={styles.date}>{formatDate(receiptData.date)}</Text>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Here's your receipt for your ride, {receiptData.riderName || 'Customer'}</Text>
        <Text style={styles.subGreeting}>We hope you enjoyed your ride this {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}.</Text>

        {/* Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>
            Rs {(receiptData.totalFare || 0).toFixed(2)}
          </Text>
        </View>

        {/* Fare Breakdown */}
        <View style={styles.breakdownSection}>
          {fareBreakdown.showDistance && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Additional distance charges for {fareBreakdown.extraDistance} km (Rs 11.00/km)</Text>
              <Text style={styles.breakdownAmount}>{formatCurrency(fareBreakdown.distanceCharges)}</Text>
            </View>
          )}
          {fareBreakdown.showTime && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Additional time charges for {fareBreakdown.extraTime} min (Rs 2.50/min)</Text>
              <Text style={styles.breakdownAmount}>{formatCurrency(fareBreakdown.timeCharges)}</Text>
            </View>
          )}
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Package fare ({fareBreakdown.packageName})</Text>
            <Text style={styles.breakdownAmount}>{formatCurrency(fareBreakdown.packageFare)}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Uber Fees</Text>
            <Text style={styles.breakdownAmount}>{formatCurrency(fareBreakdown.uberFees)}</Text>
          </View>
        </View>

        {/* Subtotal */}
        <View style={styles.subtotalSection}>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalAmount}>{formatCurrency(fareBreakdown.subtotalBeforeCredits)}</Text>
          </View>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Uber One Credits</Text>
            <Text style={styles.creditAmount}>-{formatCurrency(fareBreakdown.uberOneCredits)}</Text>
          </View>
        </View>

        {/* Double horizontal lines with gap */}
        <View style={{ borderBottom: 1, borderBottomColor: '#e0e0e0', marginBottom: 20 }}></View>
        <View style={{ borderBottom: 1, borderBottomColor: '#e0e0e0', marginBottom: 12 }}></View>

        {/* Payments */}
        <View style={styles.paymentsSection}>
          <Text style={styles.paymentsTitle}>Payments</Text>
          <View style={styles.paymentRow}>
            <View style={styles.paymentMethod}>
              <Image 
                style={styles.cashIcon}
                src="src/assets/Cash-icon.png"
              />
              <View>
                <Text style={styles.cashText}>Cash</Text>
                <Text style={styles.paymentTime}>{receiptData.date || new Date().toISOString().split('T')[0]} {formatDisplayTime(receiptData.dropoffTime)}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000000' }}>
              Rs {(receiptData.totalFare || 0).toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={styles.convenienceText}>
          Uber's convenience fee also forms part of the fare shown at the time of your request.
        </Text>

        <Text style={styles.convenienceText}>
          <Link
            src="https://auth.uber.com/v2/?breeze_init_req_id=7872bf10-34a6-4863-9df6-bd74d6a5ead4&breeze_local_zone=dca18&next_url=https%3A%2F%2Friders.uber.com%2Ftrips%2F67de6f6c-dacc-4a8a-ad79-a979d5291682&sm_flow_id=PPP3gXFg&state=Bhwcuz4pCRBkxVhu0fS-XiAu7MXByUgnXBtjS2jk9BA%3D"
            style={styles.linkText}
          >
            Visit this page
          </Link>
          {' '}for more information, including invoices (where available)
        </Text>

        <Text style={styles.gstText}>
          The total of {formatCurrency(receiptData.totalFare || 0)}  has a GST of {formatCurrency(fareBreakdown.gstAmount || 0)} included.
        </Text>

        {/* Trip Details */}
        <View style={styles.tripSection}>
          <Text style={styles.rideWithText}>You rode with {receiptData.driverName || 'Driver'}</Text>
          <Text style={styles.licenseText}>License Plate: {receiptData.licensePlate || 'HR55AV3151'}</Text>
          
          <View style={styles.tripDetails}>
            <Text style={styles.tripDistanceTime}>
              Go Rentals    {tripStats.distance} kilometres | {Math.floor(tripStats.duration / 60)} h {tripStats.duration % 60} min
            </Text>
            
            <View style={styles.routeContainer}>
              <View style={styles.routeIconContainer}>
                <View style={styles.routeSquare}></View>
                <View style={styles.routeLine}></View>
                <View style={styles.routeSquare}></View>
              </View>
              <View style={styles.routeLocations}>
                <View style={styles.routeRow}>
                  <Text style={styles.routeTime}>{formatDisplayTime(receiptData.pickupTime)}</Text>
                  <Text style={styles.routeLocation}>{receiptData.pickup || 'Joy Apartment Block-A, Plot 2, Pocket 2, Sector 2 Dwarka, Dwarka, New Delhi, Delhi, 10075, India'}</Text>
                </View>
                
                <View style={styles.routeRow}>
                  <Text style={styles.routeTime}>{formatDisplayTime(receiptData.dropoffTime)}</Text>
                  <Text style={styles.routeLocation}>{receiptData.dropoff || 'Camily Society, A/116/A1, New Palam Vihar, Block B, New Palam Vihar Phase 1, Sector 110, Gurugram, Haryana 122017, India'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.footerText}>
          Fares are inclusive of GST. Please download the tax invoice from the trip detail page for a full tax breakdown.
        </Text>
      </Page>
    </Document>
  );
};

// Component with download link
const ReceiptPDF = ({ receiptData }) => {
  if (!receiptData) {
    return (
      <div style={{ marginTop: '20px', color: '#666' }}>
        Please fill out the form to generate a receipt.
      </div>
    );
  }

  // Add validation for required fields
  const hasRequiredData = receiptData.riderName && receiptData.totalFare;
  
  if (!hasRequiredData) {
    return (
      <div style={{ marginTop: '20px', color: '#ff6b6b' }}>
        Missing required information. Please ensure rider name and total fare are provided.
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <PDFDownloadLink
        document={<UberReceiptPDF receiptData={receiptData} />}
        fileName={`uber-receipt-${receiptData.receiptNumber || 'download'}.pdf`}
        style={{
          backgroundColor: '#000000',
          color: 'white',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          display: 'inline-block',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        {({ blob, url, loading, error }) => {
          console.log('PDF Generation Status:', { blob: !!blob, url: !!url, loading, error }); // Debug log
          
          if (loading) return 'Generating PDF...';
          if (error) {
            console.error('PDF Generation Error:', error);
            return `Error: ${error.message || 'Could not generate PDF'}`;
          }
          return 'Download Receipt';
        }}
      </PDFDownloadLink>
      
      {/* Debug info - remove in production */}
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Receipt ready for: {receiptData.riderName} | Total: Rs {receiptData.totalFare}
      </div>
    </div>
  );
};

export default ReceiptPDF;
