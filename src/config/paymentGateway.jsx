// src/config/paymentGateways.js

const developmentGateways = [
    {
      id: 'visa',
      name: 'Visa',
      imagePath: '/uploads/placeholderImage/visacard.png',
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      imagePath: '/uploads/placeholderImage/mastercard.png',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      imagePath: '/uploads/placeholderImage/paypal.png',
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      imagePath: '/uploads/placeholderImage/apple-pay.png',
    }
  ];
  
  const productionGateways = [
    {
      id: 'visa',
      name: 'Visa',
      imagePath: 'https://cdn.yoursite.com/images/visa.png', // Replace with your actual CDN path
      attribution: {
        text: 'Visa icons created by Roundicons - Flaticon',
        url: 'https://www.flaticon.com/free-icons/visa'
      }
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      imagePath: 'https://cdn.yoursite.com/images/mastercard.png', // Replace with your actual CDN path
      attribution: {
        text: 'Master icons created by iconfield - Flaticon',
        url: 'https://www.flaticon.com/free-icons/master'
      }
    },
    {
      id: 'paypal',
      name: 'PayPal',
      imagePath: 'https://cdn.yoursite.com/images/paypal.png', // Replace with your actual CDN path
      attribution: {
        text: 'Paypal icons created by Roundicons - Flaticon',
        url: 'https://www.flaticon.com/free-icons/paypal'
      }
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      imagePath: 'https://cdn.yoursite.com/images/applepay.png', // Replace with your actual CDN path
      attribution: {
        text: 'Payment method icons created by Freepik - Flaticon',
        url: 'https://www.flaticon.com/free-icons/payment-method'
      }
    }
  ];
  
  export const getPaymentGateways = () => {
    return process.env.NODE_ENV === 'development' 
      ? developmentGateways 
      : productionGateways;
  };
  
  export const getAttributions = () => {
    return process.env.NODE_ENV === 'production' 
      ? productionGateways.map(gateway => gateway.attribution)
      : [];
  };