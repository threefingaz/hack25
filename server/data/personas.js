// Mock persona data for CashFlow Bridge demo

const generateTransaction = (date, amount, description, category, type = 'income') => ({
  id: Math.random().toString(36).substr(2, 9),
  date: date.toISOString().split('T')[0],
  amount: Math.round(amount * 100) / 100, // Round to 2 decimal places
  description,
  category,
  type
});

const addVariance = (baseAmount, variancePercentage = 0.1) => {
  const variance = baseAmount * variancePercentage;
  const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
  return baseAmount + (variance * randomFactor);
};

const generateTransactions = (personaType, startDate = new Date('2024-10-01')) => {
  const transactions = [];
  const endDate = new Date('2024-12-31');
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    const dayOfMonth = currentDate.getDate();
    
    switch (personaType) {
      case 'anna': // Food Truck Owner - Weekly patterns
        // Income on business days (Mon-Fri)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          const dailyIncome = addVariance(120, 0.2); // €120 ± 20%
          transactions.push(generateTransaction(
            currentDate,
            dailyIncome,
            'Food truck daily sales',
            'income',
            'income'
          ));
        }
        
        // Weekend income (lower)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          const weekendIncome = addVariance(80, 0.3); // €80 ± 30%
          transactions.push(generateTransaction(
            currentDate,
            weekendIncome,
            'Weekend food truck sales',
            'income',
            'income'
          ));
        }
        
        // Monthly expenses
        if (dayOfMonth === 1) {
          transactions.push(generateTransaction(
            currentDate,
            -800,
            'Food truck rent',
            'rent',
            'expense'
          ));
        }
        
        // Weekly supplies
        if (dayOfWeek === 1) {
          const supplies = addVariance(-300, 0.15);
          transactions.push(generateTransaction(
            currentDate,
            supplies,
            'Food ingredients and supplies',
            'supplies',
            'expense'
          ));
        }
        
        // Random other expenses
        if (Math.random() < 0.2) {
          const expense = addVariance(-50, 0.5);
          transactions.push(generateTransaction(
            currentDate,
            expense,
            'Utilities/maintenance',
            'utilities',
            'expense'
          ));
        }
        break;
        
      case 'mehmet': // Online Retailer - Monthly spikes
        // Daily base income
        const dailyBase = addVariance(90, 0.3);
        transactions.push(generateTransaction(
          currentDate,
          dailyBase,
          'Online store daily sales',
          'income',
          'income'
        ));
        
        // Monthly spike (first week)
        if (dayOfMonth <= 7) {
          const spike = addVariance(200, 0.4);
          transactions.push(generateTransaction(
            currentDate,
            spike,
            'Monthly promotion sales',
            'income',
            'income'
          ));
        }
        
        // Monthly expenses
        if (dayOfMonth === 1) {
          transactions.push(generateTransaction(
            currentDate,
            -600,
            'Warehouse rent',
            'rent',
            'expense'
          ));
          transactions.push(generateTransaction(
            currentDate,
            -400,
            'Inventory purchase',
            'supplies',
            'expense'
          ));
        }
        
        // Weekly shipping costs
        if (dayOfWeek === 1) {
          const shipping = addVariance(-150, 0.2);
          transactions.push(generateTransaction(
            currentDate,
            shipping,
            'Shipping and packaging',
            'supplies',
            'expense'
          ));
        }
        
        // Random expenses
        if (Math.random() < 0.15) {
          const expense = addVariance(-40, 0.6);
          transactions.push(generateTransaction(
            currentDate,
            expense,
            'Marketing/utilities',
            'other',
            'expense'
          ));
        }
        break;
        
      case 'maria': // Event Planner - Seasonal patterns
        // Weekly income (lower than others)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          const income = addVariance(60, 0.4); // €60 ± 40%
          transactions.push(generateTransaction(
            currentDate,
            income,
            'Event planning consultation',
            'income',
            'income'
          ));
        }
        
        // Seasonal boost (December - wedding season)
        if (currentDate.getMonth() === 11) { // December
          const seasonalBoost = addVariance(100, 0.3);
          transactions.push(generateTransaction(
            currentDate,
            seasonalBoost,
            'Holiday event planning',
            'income',
            'income'
          ));
        }
        
        // Monthly expenses
        if (dayOfMonth === 1) {
          transactions.push(generateTransaction(
            currentDate,
            -500,
            'Office rent',
            'rent',
            'expense'
          ));
        }
        
        // Irregular supplier payments
        if (Math.random() < 0.1) {
          const supplier = addVariance(-200, 0.3);
          transactions.push(generateTransaction(
            currentDate,
            supplier,
            'Event supplier payment',
            'supplies',
            'expense'
          ));
        }
        
        // Random small expenses
        if (Math.random() < 0.25) {
          const expense = addVariance(-30, 0.5);
          transactions.push(generateTransaction(
            currentDate,
            expense,
            'Office supplies/utilities',
            'utilities',
            'expense'
          ));
        }
        break;
        
      case 'thomas': // Caterer - Too early stage (rejection)
        // Very low and irregular income
        if (Math.random() < 0.3) { // Only 30% of days have income
          const income = addVariance(40, 0.6); // €40 ± 60% (very volatile)
          transactions.push(generateTransaction(
            currentDate,
            income,
            'Catering gig',
            'income',
            'income'
          ));
        }
        
        // High expenses relative to income
        if (dayOfMonth === 1) {
          transactions.push(generateTransaction(
            currentDate,
            -600,
            'Kitchen rental',
            'rent',
            'expense'
          ));
        }
        
        // Frequent supply purchases
        if (Math.random() < 0.4) {
          const supplies = addVariance(-80, 0.3);
          transactions.push(generateTransaction(
            currentDate,
            supplies,
            'Food ingredients',
            'supplies',
            'expense'
          ));
        }
        break;
        
      case 'stefan': // Market vendor - Negative cash flow (rejection)
        // Declining income pattern
        const monthsSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 30));
        const declineMultiplier = Math.max(0.3, 1 - (monthsSinceStart * 0.15));
        
        if (dayOfWeek === 6) { // Saturday market
          const income = addVariance(100 * declineMultiplier, 0.3);
          transactions.push(generateTransaction(
            currentDate,
            income,
            'Market stall sales',
            'income',
            'income'
          ));
        }
        
        if (dayOfWeek === 3) { // Wednesday market
          const income = addVariance(60 * declineMultiplier, 0.4);
          transactions.push(generateTransaction(
            currentDate,
            income,
            'Midweek market sales',
            'income',
            'income'
          ));
        }
        
        // Fixed expenses remain high
        if (dayOfMonth === 1) {
          transactions.push(generateTransaction(
            currentDate,
            -400,
            'Market stall rental',
            'rent',
            'expense'
          ));
          transactions.push(generateTransaction(
            currentDate,
            -300,
            'Storage unit',
            'rent',
            'expense'
          ));
        }
        
        // Weekly supply costs
        if (dayOfWeek === 1) {
          const supplies = addVariance(-250, 0.2);
          transactions.push(generateTransaction(
            currentDate,
            supplies,
            'Produce wholesale purchase',
            'supplies',
            'expense'
          ));
        }
        break;
    }
  }
  
  return transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Define personas
const personas = {
  anna: {
    id: 'anna',
    name: 'Anna Schmidt',
    business: 'Food Truck Owner',
    description: 'Runs a popular food truck with steady weekly patterns',
    averageMonthlyIncome: 2100,
    pattern: 'Weekly income patterns with weekend variations',
    transactions: generateTransactions('anna')
  },
  
  mehmet: {
    id: 'mehmet',
    name: 'Mehmet Özkan',
    business: 'Online Retailer',
    description: 'E-commerce business with monthly promotional spikes',
    averageMonthlyIncome: 3500,
    pattern: 'Monthly spikes with consistent daily base income',
    transactions: generateTransactions('mehmet')
  },
  
  maria: {
    id: 'maria',
    name: 'Maria Rodriguez',
    business: 'Event Planner',
    description: 'Freelance event planner with seasonal variations',
    averageMonthlyIncome: 1800,
    pattern: 'Seasonal patterns with holiday boosts',
    transactions: generateTransactions('maria')
  },
  
  thomas: {
    id: 'thomas',
    name: 'Thomas Mueller',
    business: 'Caterer',
    description: 'Early-stage catering business with irregular income',
    averageMonthlyIncome: 600,
    pattern: 'Very irregular income, high volatility',
    transactions: generateTransactions('thomas'),
    rejectionReason: 'Too early stage - income below €1,000/month minimum',
    referralSuggestion: 'Consider Silvr after reaching €5K+ monthly revenue'
  },
  
  stefan: {
    id: 'stefan',
    name: 'Stefan Weber',
    business: 'Market Vendor',
    description: 'Declining produce stand business',
    averageMonthlyIncome: 800,
    pattern: 'Declining revenue trend, negative cash flow',
    transactions: generateTransactions('stefan'),
    rejectionReason: 'Negative cash flow trend - business is declining',
    referralSuggestion: 'Focus on business turnaround before seeking credit'
  }
};

// Helper function to calculate cash flow metrics
const calculateCashFlowMetrics = (transactions) => {
  const monthlyData = {};
  
  transactions.forEach(transaction => {
    const month = transaction.date.substring(0, 7); // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expenses: 0 };
    }
    
    if (transaction.type === 'income') {
      monthlyData[month].income += transaction.amount;
    } else {
      monthlyData[month].expenses += Math.abs(transaction.amount);
    }
  });
  
  const months = Object.keys(monthlyData).sort();
  const netCashFlows = months.map(month => 
    monthlyData[month].income - monthlyData[month].expenses
  );
  
  const averageIncome = months.reduce((sum, month) => 
    sum + monthlyData[month].income, 0) / months.length;
  const averageExpenses = months.reduce((sum, month) => 
    sum + monthlyData[month].expenses, 0) / months.length;
  const averageNetCashFlow = averageIncome - averageExpenses;
  
  // Calculate volatility (standard deviation of net cash flows)
  const mean = netCashFlows.reduce((sum, flow) => sum + flow, 0) / netCashFlows.length;
  const variance = netCashFlows.reduce((sum, flow) => 
    sum + Math.pow(flow - mean, 2), 0) / netCashFlows.length;
  const volatility = Math.sqrt(variance);
  const volatilityPercentage = (volatility / Math.abs(mean)) * 100;
  
  return {
    monthlyData,
    averageIncome: Math.round(averageIncome),
    averageExpenses: Math.round(averageExpenses),
    averageNetCashFlow: Math.round(averageNetCashFlow),
    volatility: Math.round(volatilityPercentage),
    positiveCashFlowMonths: netCashFlows.filter(flow => flow > 0).length
  };
};

module.exports = {
  personas,
  generateTransactions,
  calculateCashFlowMetrics,
  addVariance
};