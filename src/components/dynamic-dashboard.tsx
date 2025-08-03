import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, Filter, Moon, Sun, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

const generateMockData = () => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const salesData = months.map((month, index) => ({
    month,
    date: `2024-${String(index + 1).padStart(2, '0')}-01`,
    sales: Math.floor(Math.random() * 50000) + 20000,
    revenue: Math.floor(Math.random() * 80000) + 30000,
    users: Math.floor(Math.random() * 5000) + 2000,
    orders: Math.floor(Math.random() * 1000) + 500,
    category: categories[Math.floor(Math.random() * categories.length)]
  }));

  const categoryData = categories.map(category => ({
    category,
    value: Math.floor(Math.random() * 25000) + 5000,
    growth: (Math.random() * 20 - 10).toFixed(1)
  }));

  const dailyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    date: `2024-12-${String(i + 1).padStart(2, '0')}`,
    visitors: Math.floor(Math.random() * 2000) + 500,
    conversions: Math.floor(Math.random() * 100) + 20,
    bounce_rate: (Math.random() * 40 + 30).toFixed(1)
  }));

  return { salesData, categoryData, dailyData };
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff00ff'];

export default function DynamicDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chartType, setChartType] = useState('line');
  const [data] = useState(() => generateMockData());

  const filteredData = useMemo(() => {
    let filtered = data.salesData;

    if (dateRange !== 'all') {
      const monthsToShow = parseInt(dateRange);
      filtered = data.salesData.slice(-monthsToShow);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    return filtered;
  }, [data.salesData, dateRange, selectedCategory]);

  const kpis = useMemo(() => {
    const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    const totalUsers = filteredData.reduce((sum, item) => sum + item.users, 0);
    const totalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);

    return {
      sales: { value: totalSales, growth: '+12.5%' },
      revenue: { value: totalRevenue, growth: '+8.2%' },
      users: { value: totalUsers, growth: '+15.3%' },
      orders: { value: totalOrders, growth: '+6.7%' }
    };
  }, [filteredData]);

  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    hover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
  };

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };
    
    const tooltipStyle = { 
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      color: darkMode ? '#ffffff' : '#000000'
    };

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" name="Sales" />
            <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        );
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto p-6">
        <div className={`${theme.cardBg} rounded-lg shadow-lg p-6 mb-6 border ${theme.border}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${theme.text} mb-2 text-left`}>Analytics Dashboard</h1>
              <p className={theme.textSecondary}>Monitor your business performance with real-time insights</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg border ${theme.border} ${theme.hover} ${theme.text} transition-colors cursor-pointer`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: 'Total Sales', value: kpis.sales.value, growth: kpis.sales.growth, icon: DollarSign, color: 'text-green-500' },
            { title: 'Revenue', value: kpis.revenue.value, growth: kpis.revenue.growth, icon: TrendingUp, color: 'text-blue-500' },
            { title: 'Users', value: kpis.users.value, growth: kpis.users.growth, icon: Users, color: 'text-purple-500' },
            { title: 'Orders', value: kpis.orders.value, growth: kpis.orders.growth, icon: ShoppingCart, color: 'text-orange-500' }
          ].map((kpi, index) => (
            <div key={index} className={`${theme.cardBg} rounded-lg shadow-lg p-6 border ${theme.border}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-100 ${darkMode ? 'bg-gray-700' : ''}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <span className="text-green-500 text-sm font-medium">{kpi.growth}</span>
              </div>
              <div>
                <p className={`${theme.textSecondary} text-sm mb-1`}>{kpi.title}</p>
                <p className={`${theme.text} text-2xl font-bold`}>{kpi.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`${theme.cardBg} rounded-lg shadow-lg p-6 mb-6 border ${theme.border}`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className={`w-5 h-5 ${theme.text}`} />
              <span className={`${theme.text} font-medium`}>Filters:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${theme.textSecondary}`} />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
                >
                  <option value="all">All Time</option>
                  <option value="3">Last 3 Months</option>
                  <option value="6">Last 6 Months</option>
                </select>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
              >
                <option value="all">All Categories</option>
                {['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="area">Area Chart</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className={`lg:col-span-2 ${theme.cardBg} rounded-lg shadow-lg p-6 border ${theme.border}`}>
            <h3 className={`${theme.text} text-xl font-semibold mb-4`}>
              Sales & Revenue Trends
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
          <div className={`${theme.cardBg} rounded-lg shadow-lg p-4 border ${theme.border}`}>
            <h3 className={`${theme.text} text-xl font-semibold mb-4 text-center`}>Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={data.categoryData}
                  cx="50%"
                  cy="45%"
                  labelLine={false}
                  label={({ category, percent }) => {
                    const pct = percent ?? 0;
                    return `${category.length > 8 ? category.substring(0, 8) + '...' : category} ${(pct * 100).toFixed(0)}%`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  fontSize={12}
                >
                  {data.categoryData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: darkMode ? '#ffffff' : '#000000'
                  }}
                  formatter={(value) => [value.toLocaleString(), 'Sales']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={`${theme.cardBg} rounded-lg shadow-lg p-6 border ${theme.border}`}>
          <h3 className={`${theme.text} text-xl font-semibold mb-4`}>Daily Website Analytics (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.dailyData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="day" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8884d8" fill="url(#colorVisitors)" />
              <Area type="monotone" dataKey="conversions" stackId="2" stroke="#82ca9d" fill="url(#colorConversions)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
