import { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";

import {
  BarChart3,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  FileText,
  Settings,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  TrendingUp
  
} from "lucide-react";

import "./App.css";

// ---------------- DATA ----------------

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Orders", icon: ShoppingCart },
  { name: "Customers", icon: Users },
  { name: "Products", icon: Package },
  { name: "Reports", icon: FileText }
];

const salesData = [
  { month: "Jan", sales: 4800 },
  { month: "Feb", sales: 8500 },
  { month: "Mar", sales: 7200 },
  { month: "Apr", sales: 11800 },
  { month: "May", sales: 11000 },
  { month: "Jun", sales: 16500 }
];

const categoryData = [
  { name: "Electronics", value: 35.4 },
  { name: "Clothing", value: 24.7 },
  { name: "Home & Living", value: 18.7 },
  { name: "Books", value: 12.6 },
  { name: "Others", value: 9.2 }
];

const statusData = [
  { name: "Delivered", value: 62.1 },
  { name: "Processing", value: 18.5 },
  { name: "Cancelled", value: 11.2 },
  { name: "Returned", value: 8.2 }
];

const regionData = [
  { region: "North", sales: 10500 },
  { region: "South", sales: 8000 },
  { region: "East", sales: 6900 },
  { region: "West", sales: 7000 }
];

const productData = [
  { product: "Laptop", sales: 320 },
  { product: "Smartphone", sales: 280 },
  { product: "T-Shirt", sales: 180 },
  { product: "Desk Lamp", sales: 120 },
  { product: "Headphones", sales: 100 }
];

const orders = [
  {
    id: "1001",
    customer: "Rohit Sharma",
    product: "Laptop",
    category: "Electronics",
    amount: "₹85000",
    date: "Jun 30, 2024"
  },
  {
    id: "1002",
    customer: "Tilak Verma",
    product: "T-Shirt",
    category: "Clothing",
    amount: "₹499",
    date: "Jun 29, 2024"
  },
  {
    id: "1003",
    customer: "Bhuvaneswar Kumar",
    product: "Desk Lamp",
    category: "Home & Living",
    amount: "₹1,200",
    date: "Jun 29, 2024"
  },
  {
    id: "1004",
    customer: "Axar Patel",
    product: "Novel",
    category: "Books",
    amount: "₹299",
    date: "Jun 28, 2024"
  },
  {
    id: "1005",
    customer: "Harshal Mehta",
    product: "Headphones",
    category: "Electronics",
    amount: "₹2,499",
    date: "Jun 28, 2024"
  }
];

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#facc15",
  "#f87171",
  "#8b5cf6"
];

//----------------- CAlENDER ----------------
function CalendarNav() {
  const [currentDate, setCurrentDate] = useState(
    new Date(2024, 5, 1) // June 2024
  );

  const monthNames = [currentDate.getMonth()];

  function previousMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const formatDate = (date) => {
    return currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  return (
    <div className="calendar-nav">

      <button
        className="calendar-arrow"
        onClick={previousMonth}
        aria-label="Previous month"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="calendar-display">
        <CalendarDays size={16} />

        <span>
          {formatDate(startDate)} - {formatDate(endDate)}
        </span>
      </div>

      <button
        className="calendar-arrow"
        onClick={nextMonth}
        aria-label="Next month"
      >
        <ChevronRight size={16} />
      </button>

    </div>
  );
}

// ---------------- REUSABLE COMPONENTS ----------------

function StatCard({ title, value, change, type }) {
  return (
    <div className={`stat-card ${type}`}>
      <p>{title}</p>
      <h2>{value}</h2>

      <span className="growth">
        <TrendingUp size={14} />
        {change}
      </span>
    </div>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// ---------------- APP ----------------

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <BarChart3 size={21} />
          <span>Analytics Dashboard</span>
        </div>

        <nav className="menu">
          {menuItems.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`menu-item ${
                activePage === name ? "active" : ""
              }`}
              onClick={() => setActivePage(name)}
            >
              <Icon size={17} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <button className="settings">
          <Settings size={17} />
          Settings
        </button>

      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="header">

          <div className="mobile-brand">
            <BarChart3 size={20} />
            Analytics Dashboard
          </div>

          <CalendarNav />

        </header>

        {/* PAGE CONTENT */}
        {activePage === "Dashboard" && <Dashboard />}

        {activePage === "Orders" && (
          <SimplePage
            title="Orders"
            subtitle="Manage and track customer orders"
          >
            <OrdersTable />
          </SimplePage>
        )}

        {activePage === "Customers" && (
          <SimplePage
            title="Customers"
            subtitle="Manage your customers"
          >
            <Customers />
          </SimplePage>
        )}

        {activePage === "Products" && (
          <SimplePage
            title="Products"
            subtitle="Manage your products"
          >
            <Products />
          </SimplePage>
        )}

        {activePage === "Reports" && (
          <Analytics />
        )}

      </main>
    </div>
  );
}

// ---------------- DASHBOARD ----------------

function Dashboard() {
  return (
    <section>

      <div className="page-title">
        <h1>Dashboard</h1>
        <p>Overview of sales, orders and customers</p>
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">

        <StatCard
          title="Total Sales"
          value="₹24,560"
          change="12% from last month"
          type="blue"
        />

        <StatCard
          title="Total Orders"
          value="892"
          change="8% from last month"
          type="green"
        />

        <StatCard
          title="Total Customers"
          value="620"
          change="15% from last month"
          type="yellow"
        />

        <StatCard
          title="Products"
          value="124"
          change="5% from last month"
          type="red"
        />

      </div>

      {/* CHARTS */}
      <div className="chart-grid">

        <Card title="Monthly Sales">

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salesData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>
          </ResponsiveContainer>

        </Card>

        <Card title="Sales by Category">

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </Card>

      </div>

      {/* ORDERS */}
      <Card title="Recent Orders">
        <OrdersTable />
      </Card>

    </section>
  );
}

// ---------------- ANALYTICS ----------------

function Analytics() {
  return (
    <section>

      <div className="page-title">
        <h1>Analytics</h1>
        <p>Detailed insights and filters</p>
      </div>

      <div className="analytics-grid">

        <Card title="Sales Trend">

          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={salesData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </Card>

        <Card title="Orders by Status">

          <ResponsiveContainer width="100%" height={230}>
            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                label
              >
                {statusData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </Card>

        <Card title="Sales by Region">

          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={regionData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="region" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#8b5cf6"
              />

            </BarChart>

          </ResponsiveContainer>

        </Card>

        <Card title="Top 5 Products">

          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={productData}
              layout="vertical"
            >

              <XAxis type="number" />

              <YAxis
                dataKey="product"
                type="category"
                width={90}
              />

              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#3b82f6"
              />

            </BarChart>
          </ResponsiveContainer>

        </Card>

      </div>

      {/* FILTERS */}
      <Card title="Filters">

        <div className="filters">

          <select>
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
          </select>

          <select>
            <option>All Regions</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Delivered</option>
            <option>Processing</option>
            <option>Cancelled</option>
          </select>

          <input type="date" />

          <button className="apply-btn">
            Apply
          </button>

        </div>

      </Card>

    </section>
  );
}

// ---------------- TABLE ----------------

function OrdersTable() {
  return (
    <div className="table-wrapper">

      <table>

        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.category}</td>
              <td>{order.amount}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

// ---------------- OTHER PAGES ----------------

function Customers() {
  return (
    <div className="empty-content">
      <Users size={40} />
      <h2>620 Customers</h2>
      <p>Customer management section</p>
    </div>
  );
}

function Products() {
  return (
    <div className="empty-content">
      <Package size={40} />
      <h2>124 Products</h2>
      <p>Product management section</p>
    </div>
  );
}

function SimplePage({ title, subtitle, children }) {
  return (
    <section>
      <div className="page-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {children}
    </section>
  );
}