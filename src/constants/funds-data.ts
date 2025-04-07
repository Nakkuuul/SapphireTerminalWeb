// funds-data.js

// Summary data for the funds page
export const fundsSummary = {
    availableMargin: 49561.80,
    cashBalance: 49561.80,
    marginFromPledge: 49561.80
  };
  
  // Balance breakdown data
  export const balanceBreakdown = {
    cashBalance: 40000,
    collateralBalance: 60000,
    collateralLiquidFunds: 60000,
    marginUtilised: 500000
  };
  
  // P&L data
  export const pnlData = {
    realizedPL: 4432,
    unrealizedPL: 4432
  };
  
  // Margin data
  export const marginData = {
    spanMargin: 4432,
    exposureMargin: 4432,
    spanAddOn: 4432,
    commodityAdditionalMargin: 4432,
    cashIntradayMISMargin: 4432,
    coroMargin: 4432
  };
  
  // Premium data
  export const premiumData = {
    optionPremium: 4432,
    currencyPremium: 4432,
    commodityPremium: 4432,
    totalPremium: 4432
  };
  
  // Withdrawable balance
  export const withdrawableBalance = 200000;
  
  // Recent transactions data
  export const recentTransactions = [
    {
      id: '#562677788389',
      amount: 2042.63,
      date: '31 JAN 2025',
      status: 'completed',
      statusText: 'completed'
    },
    {
      id: '#562677788390',
      amount: 2042.63,
      date: '31 JAN 2025',
      status: 'processing',
      statusText: 'processing'
    },
    {
      id: '#562677788391',
      amount: 2042.63,
      date: '31 JAN 2025',
      status: 'failed',
      statusText: 'failed'
    },
    {
      id: '#562677788392',
      amount: 2042.63,
      date: '31 JAN 2025',
      status: 'completed',
      statusText: 'completed'
    },
    {
      id: '#562677788393',
      amount: 2042.63,
      date: '31 JAN 2025',
      status: 'processing',
      statusText: 'processing'
    }
  ];
  
  // Chart data
  export const chartData = {
    totalBalance: 49561.80,
    marginUtilized: 0,
    marginUtilizedPercentage: 0
  };
  
  // Deposit data
  export const depositAmountOptions = [5000, 10000, 20000];
  
  // Payment modes
  export const paymentModes = [
    { id: 'upi', name: 'UPI', icon: 'upi-icon' },
    { id: 'qr', name: 'Scan QR', icon: 'qr-icon' },
    { id: 'netbanking', name: 'Net Banking', icon: 'netbanking-icon' },
    { id: 'transfer', name: 'Bank Transfer', icon: 'transfer-icon' }
  ];
  
  // Banks for deposit
  export const banks = [
    { id: 'bob', name: 'Bank of Baroda', maskedAccount: '******* 8829', icon: 'B', color: 'orange' }
  ];
  
  // Deposit history data
  export const depositHistory = [
    { 
      account: '********8234', 
      bank: 'Bank of Baroda', 
      date: '24 Jan 2025', 
      time: '12:30', 
      amount: 45000, 
      status: 'pending'
    },
    { 
      account: '********8234', 
      bank: 'IDFC First Bank', 
      date: '24 Jan 2025', 
      time: '12:30', 
      amount: 22000, 
      status: 'success'
    },
    { 
      account: '********8234', 
      bank: 'IDFC First Bank', 
      date: '24 Jan 2025', 
      time: '12:30', 
      amount: 22000, 
      status: 'failed'
    }
  ];
  
  // Withdraw history data
  export const withdrawHistory = [
    { 
      account: '********8234', 
      bank: 'Bank of Baroda', 
      date: '25 Jan 2025', 
      time: '14:30', 
      amount: 35000, 
      status: 'success'
    },
    { 
      account: '********8234', 
      bank: 'IDFC First Bank', 
      date: '24 Jan 2025', 
      time: '12:30', 
      amount: 12000, 
      status: 'pending'
    },
    { 
      account: '********8234', 
      bank: 'HDFC Bank', 
      date: '23 Jan 2025', 
      time: '11:15', 
      amount: 18000, 
      status: 'failed'
    }
  ];