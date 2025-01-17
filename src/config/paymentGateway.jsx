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
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Visa_Logo_2014.svg', // Real CDN path for Visa
      attribution: {
        text: 'Visa icons created by Roundicons - Flaticon',
        url: 'https://www.flaticon.com/free-icons/visa'
      }
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/MasterCard_Logo_2019.png', // Real CDN path for Mastercard
      attribution: {
        text: 'Master icons created by iconfield - Flaticon',
        url: 'https://www.flaticon.com/free-icons/master'
      }
    },
    {
      id: 'paypal',
      name: 'PayPal',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal_logo_2014.svg', // Real CDN path for PayPal
      attribution: {
        text: 'Paypal icons created by Roundicons - Flaticon',
        url: 'https://www.flaticon.com/free-icons/paypal'
      }
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Apple_Pay_logo.svg', // Real CDN path for Apple Pay
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