import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  IndianRupee,
  Users,
  BarChart3,
  RefreshCw,
  LogOut,
  Search,
  Eye,
  X,
  Package,
  Mail,
  Phone,
  CreditCard,
  CalendarDays,
  Menu,
  ChevronDown,
  ShieldCheck,
  ExternalLink,
  UserPlus,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
  Save,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [data, setData] = useState(null);
  const [customersData, setCustomersData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(false);

  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [customerError, setCustomerError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [customerSearch, setCustomerSearch] = useState("");

  const [mobileMenu, setMobileMenu] = useState(false);

  // =====================================================
  // ACTIVE SECTION
  // =====================================================

  const [activeSection, setActiveSection] =
    useState("dashboard");

  // =====================================================
  // CUSTOMER MODAL
  // =====================================================

  const [customerModal, setCustomerModal] =
    useState(null);

  const [customerFormLoading, setCustomerFormLoading] =
    useState(false);

  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/orders/admin-dashboard/`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        setLoggedIn(false);
        setData(null);
        setError("");
        return;
      }

      if (!response.ok || !result.success) {
        setLoggedIn(false);
        setError(
          result.message ||
            "Unable to load dashboard."
        );
        return;
      }

      setData(result);
      setLoggedIn(true);
      setUsername(
        result.username || username
      );
    } catch (err) {
      console.error(
        "Dashboard Error:",
        err
      );

      setLoggedIn(false);
      setError(
        "Unable to connect to Django server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD CUSTOMERS
  // =====================================================

  const loadCustomers = async () => {
    try {
      setCustomersLoading(true);
      setCustomerError("");

      const response = await fetch(
        `${API_BASE_URL}/api/orders/admin-customers/`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        setLoggedIn(false);
        setCustomersData([]);
        return;
      }

      if (!response.ok || !result.success) {
        setCustomerError(
          result.message ||
            "Unable to load customers."
        );
        return;
      }

      setCustomersData(
        result.customers || []
      );
    } catch (err) {
      console.error(
        "Customers Error:",
        err
      );

      setCustomerError(
        "Unable to connect to Django server."
      );
    } finally {
      setCustomersLoading(false);
    }
  };

  // =====================================================
  // INITIAL CHECK
  // =====================================================

  useEffect(() => {
    loadDashboard();
  }, []);

  // =====================================================
  // LOAD CUSTOMERS AFTER LOGIN
  // =====================================================

  useEffect(() => {
    if (loggedIn) {
      loadCustomers();
    }
  }, [loggedIn]);

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoginError("");
    setLoginLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/admin-login/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: loginUsername,
            password: loginPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setLoginError(
          result.message ||
            "Invalid username or password."
        );
        return;
      }

      setUsername(
        result.username || loginUsername
      );

      setLoginPassword("");

      await loadDashboard();
    } catch (err) {
      console.error(
        "Login Error:",
        err
      );

      setLoginError(
        "Unable to connect to Django server."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await fetch(
        `${API_BASE_URL}/api/orders/admin-logout/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );
    } catch (err) {
      console.error(
        "Logout Error:",
        err
      );
    }

    setLoggedIn(false);
    setData(null);
    setCustomersData([]);
    setUsername("");
    setLoginUsername("");
    setLoginPassword("");
    setSelectedOrder(null);
    setCustomerModal(null);
    setMobileMenu(false);
  };

  // =====================================================
  // FILTER ORDERS
  // =====================================================

  const filteredOrders = useMemo(() => {
    const orders = data?.orders || [];

    return orders.filter((order) => {
      const search =
        searchTerm
          .toLowerCase()
          .trim();

      const matchesSearch =
        !search ||
        String(
          order.order_reference || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          order.customer_name || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          order.customer_email || ""
        )
          .toLowerCase()
          .includes(search) ||
        String(
          order.customer_mobile || ""
        )
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        String(
          order.status || ""
        ).toLowerCase() ===
          statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    data,
    searchTerm,
    statusFilter,
  ]);

  // =====================================================
  // FILTER CUSTOMERS
  // =====================================================

  const filteredCustomers = useMemo(() => {
    const search =
      customerSearch
        .toLowerCase()
        .trim();

    if (!search) {
      return customersData;
    }

    return customersData.filter(
      (customer) => {
        return (
          String(
            customer.name || ""
          )
            .toLowerCase()
            .includes(search) ||
          String(
            customer.email || ""
          )
            .toLowerCase()
            .includes(search) ||
          String(
            customer.mobile || ""
          )
            .toLowerCase()
            .includes(search)
        );
      }
    );
  }, [
    customersData,
    customerSearch,
  ]);

  // =====================================================
  // PRODUCT SALES ANALYSIS
  // =====================================================

  const productAnalysis = useMemo(() => {
    const orders = data?.orders || [];

    const productMap = {};

    orders.forEach((order) => {
      const items = Array.isArray(
        order.items
      )
        ? order.items
        : [];

      items.forEach((item) => {
        const productName =
          String(
            item.product_name ||
              "Unknown Product"
          ).trim();

        const quantity = Number(
          item.quantity || 0
        );

        const price = Number(
          item.price || 0
        );

        if (!productMap[productName]) {
          productMap[productName] = {
            product_name:
              productName,
            quantity: 0,
            revenue: 0,
          };
        }

        productMap[
          productName
        ].quantity += quantity;

        productMap[
          productName
        ].revenue +=
          quantity * price;
      });
    });

    const products = Object.values(
      productMap
    ).sort(
      (a, b) =>
        b.quantity - a.quantity
    );

    const totalItemsSold =
      products.reduce(
        (total, product) =>
          total +
          Number(
            product.quantity || 0
          ),
        0
      );

    const totalProductRevenue =
      products.reduce(
        (total, product) =>
          total +
          Number(
            product.revenue || 0
          ),
        0
      );

    return {
      products,
      totalItemsSold,
      totalProducts:
        products.length,
      totalProductRevenue,
      topProduct:
        products.length > 0
          ? products[0]
          : null,
    };
  }, [data]);

  // =====================================================
  // PRODUCT PERCENTAGE
  // =====================================================

  const getProductPercentage = (
    quantity
  ) => {
    if (
      !productAnalysis.totalItemsSold ||
      !quantity
    ) {
      return 0;
    }

    return Math.round(
      (Number(quantity) /
        productAnalysis.totalItemsSold) *
        100
    );
  };

  // =====================================================
  // TOTAL ITEMS IN ORDER
  // =====================================================

  const getTotalItems = (order) => {
    if (
      !order?.items ||
      !Array.isArray(order.items)
    ) {
      return 0;
    }

    return order.items.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );
  };

  // =====================================================
  // TOTAL DISTINCT PRODUCTS IN ORDER
  // =====================================================

  const getDistinctProducts = (
    order
  ) => {
    if (
      !order?.items ||
      !Array.isArray(order.items)
    ) {
      return 0;
    }

    return order.items.length;
  };

  // =====================================================
  // ORDER ITEMS SUBTOTAL
  // =====================================================

  const getOrderItemsSubtotal = (
    order
  ) => {
    if (
      !order?.items ||
      !Array.isArray(order.items)
    ) {
      return 0;
    }

    return order.items.reduce(
      (total, item) => {
        const quantity = Number(
          item.quantity || 0
        );

        const price = Number(
          item.price || 0
        );

        const itemTotal =
          item.item_total !==
          undefined
            ? Number(
                item.item_total
              )
            : quantity * price;

        return total + itemTotal;
      },
      0
    );
  };

  // =====================================================
  // OPEN ADD CUSTOMER
  // =====================================================

  const openAddCustomer = () => {
    setCustomerError("");

    setCustomerForm({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });

    setCustomerModal({
      type: "add",
      customer: null,
    });
  };

  // =====================================================
  // OPEN EDIT CUSTOMER
  // =====================================================

  const openEditCustomer = (
    customer
  ) => {
    setCustomerError("");

    setCustomerForm({
      name:
        customer.name || "",
      email:
        customer.email || "",
      mobile:
        customer.mobile || "",
      password: "",
    });

    setCustomerModal({
      type: "edit",
      customer,
    });
  };

  // =====================================================
  // CLOSE CUSTOMER MODAL
  // =====================================================

  const closeCustomerModal = () => {
    if (customerFormLoading) {
      return;
    }

    setCustomerModal(null);

    setCustomerForm({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });
  };

  // =====================================================
  // CUSTOMER FORM CHANGE
  // =====================================================

  const handleCustomerFormChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setCustomerForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  // =====================================================
  // CREATE / UPDATE CUSTOMER
  // =====================================================

  const handleCustomerSubmit =
    async (event) => {
      event.preventDefault();

      setCustomerError("");
      setCustomerFormLoading(
        true
      );

      try {
        const isEdit =
          customerModal?.type ===
          "edit";

        const url = isEdit
          ? `${API_BASE_URL}/api/orders/admin-customers/${customerModal.customer.id}/`
          : `${API_BASE_URL}/api/orders/admin-customers/`;

        const body = {
          name:
            customerForm.name.trim(),
          email:
            customerForm.email.trim(),
          mobile:
            customerForm.mobile.trim(),
        };

        if (
          customerForm.password.trim()
        ) {
          body.password =
            customerForm.password;
        }

        if (
          !isEdit &&
          !customerForm.password.trim()
        ) {
          setCustomerError(
            "Password is required when creating a customer."
          );

          setCustomerFormLoading(
            false
          );

          return;
        }

        const response =
          await fetch(url, {
            method: isEdit
              ? "PUT"
              : "POST",
            credentials: "include",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body: JSON.stringify(
              body
            ),
          });

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          setCustomerError(
            result.message ||
              `Unable to ${
                isEdit
                  ? "update"
                  : "create"
              } customer.`
          );

          return;
        }

        setCustomerModal(null);

        setCustomerForm({
          name: "",
          email: "",
          mobile: "",
          password: "",
        });

        await loadCustomers();
      } catch (err) {
        console.error(
          "Customer Save Error:",
          err
        );

        setCustomerError(
          "Unable to connect to Django server."
        );
      } finally {
        setCustomerFormLoading(
          false
        );
      }
    };

  // =====================================================
  // DELETE CUSTOMER
  // =====================================================

  const handleDeleteCustomer =
    async (customer) => {
      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${customer.name}"?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setCustomerError("");

        const response =
          await fetch(
            `${API_BASE_URL}/api/orders/admin-customers/${customer.id}/`,
            {
              method: "DELETE",
              credentials: "include",
              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          setCustomerError(
            result.message ||
              "Unable to delete customer."
          );

          return;
        }

        await loadCustomers();
      } catch (err) {
        console.error(
          "Customer Delete Error:",
          err
        );

        setCustomerError(
          "Unable to connect to Django server."
        );
      }
    };

  // =====================================================
  // LOADING
  // =====================================================

  if (
    loading &&
    !loggedIn &&
    !loginError
  ) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-slate-700 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-300">
            Loading Admin Panel...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // LOGIN PAGE
  // =====================================================

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20" />

          <div className="absolute w-72 h-72 bg-orange-500/10 rounded-full blur-3xl bottom-0 right-0" />

        </div>

        <div className="relative w-full max-w-md">

          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

            <div className="text-center mb-8">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-950 flex items-center justify-center shadow-lg mb-5">

                <ShieldCheck
                  size={32}
                  className="text-orange-400"
                />

              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Density Electronics
              </h1>

              <p className="text-slate-500 mt-2">
                Secure Admin Dashboard
              </p>

            </div>

            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {loginError}
              </div>
            )}

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  value={
                    loginUsername
                  }
                  onChange={(e) =>
                    setLoginUsername(
                      e.target.value
                    )
                  }
                  placeholder="Enter username"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                />

              </div>

              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={
                    loginPassword
                  }
                  onChange={(e) =>
                    setLoginPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                />

              </div>

              <button
                type="submit"
                disabled={
                  loginLoading
                }
                className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-blue-700 text-white font-bold transition shadow-lg disabled:bg-slate-400"
              >
                {loginLoading
                  ? "Logging in..."
                  : "Login to Dashboard"}
              </button>

            </form>

            <div className="mt-7 text-center text-xs text-slate-400">
              Density Electronics • Admin Access
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // DASHBOARD VALUES
  // =====================================================

  const totalOrders =
    data?.summary?.total_orders ??
    0;

  const paidOrders =
    data?.summary?.paid_orders ??
    0;

  const totalSales = Number(
    data?.summary?.total_sales ??
      0
  );

  const customersCount =
    customersData.length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <header className="sticky top-0 z-40 bg-slate-950 text-white shadow-xl">

        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">

              <LayoutDashboard
                size={23}
                className="text-slate-950"
              />

            </div>

            <div>

              <h1 className="font-black text-lg sm:text-xl">
                Density Electronics
              </h1>

              <p className="text-xs text-slate-400">
                Admin Control Panel
              </p>

            </div>

          </div>

          <div className="hidden sm:flex items-center gap-4">

            <div className="text-right">

              <p className="text-sm font-bold">
                {username}
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>

            </div>

            <button
              onClick={
                handleLogout
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-red-600 hover:border-red-600 transition font-bold text-sm"
            >

              <LogOut size={17} />

              Logout

            </button>

          </div>

          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="sm:hidden p-2 rounded-lg hover:bg-slate-800"
          >
            <Menu size={24} />
          </button>

        </div>

        {mobileMenu && (
          <div className="sm:hidden border-t border-slate-800 px-4 py-4">

            <div className="mb-3">

              <p className="font-bold">
                {username}
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>

            </div>

            <button
              onClick={
                handleLogout
              }
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 font-bold"
            >

              <LogOut size={17} />

              Logout

            </button>

          </div>
        )}

      </header>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <div className="bg-white border-b border-slate-200 sticky top-[76px] z-30">

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 overflow-x-auto py-3">

            {/* DASHBOARD */}

            <button
              onClick={() =>
                setActiveSection(
                  "dashboard"
                )
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition ${
                activeSection ===
                "dashboard"
                  ? "bg-slate-950 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >

              <LayoutDashboard
                size={17}
              />

              Dashboard

            </button>

            {/* ORDERS */}

            <button
              onClick={() =>
                setActiveSection(
                  "orders"
                )
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition ${
                activeSection ===
                "orders"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >

              <ShoppingBag
                size={17}
              />

              Orders

            </button>

            {/* CUSTOMERS */}

            <button
              onClick={() => {
                setActiveSection(
                  "customers"
                );

                loadCustomers();
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition ${
                activeSection ===
                "customers"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >

              <Users size={17} />

              Customers

              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeSection ===
                  "customers"
                    ? "bg-white/20"
                    : "bg-slate-100"
                }`}
              >
                {customersCount}
              </span>

            </button>

            {/* PRODUCT ANALYSIS */}

            <button
              onClick={() =>
                setActiveSection(
                  "product-analysis"
                )
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition ${
                activeSection ===
                "product-analysis"
                  ? "bg-orange-500 text-slate-950 shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >

              <BarChart3 size={17} />

              Product Analysis

              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeSection ===
                  "product-analysis"
                    ? "bg-black/10"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {
                  productAnalysis.totalProducts
                }
              </span>

            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* =================================================
            DASHBOARD SECTION
        ================================================= */}

        {activeSection ===
          "dashboard" && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

              <div>

                <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                  Overview
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                  Dashboard
                </h2>

                <p className="text-slate-500 mt-1">
                  Monitor your Density Electronics orders and sales.
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {
                    loadDashboard();
                    loadCustomers();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition font-bold text-sm"
                >

                  <RefreshCw
                    size={17}
                  />

                  Refresh

                </button>

                <a
                  href="http://localhost:5173/"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition font-bold text-sm"
                >

                  <ExternalLink
                    size={17}
                  />

                  Store

                </a>

              </div>

            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium">
                {error}
              </div>
            )}

            {/* SUMMARY */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

              <StatCard
                title="Total Orders"
                value={totalOrders}
                icon={
                  <ShoppingBag
                    size={24}
                  />
                }
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />

              <StatCard
                title="Paid Orders"
                value={paidOrders}
                icon={
                  <CreditCard
                    size={24}
                  />
                }
                iconBg="bg-emerald-100"
                iconColor="text-emerald-600"
              />

              <StatCard
                title="Total Sales"
                value={`₹${totalSales.toFixed(
                  2
                )}`}
                icon={
                  <IndianRupee
                    size={24}
                  />
                }
                iconBg="bg-orange-100"
                iconColor="text-orange-600"
              />

              <StatCard
                title="Customers"
                value={
                  customersCount
                }
                icon={
                  <Users
                    size={24}
                  />
                }
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
              />

            </div>

            {/* QUICK INFO */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

              <div className="lg:col-span-2 bg-gradient-to-br from-slate-950 to-blue-950 rounded-2xl p-6 text-white shadow-xl">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-blue-300 text-sm font-bold">
                      Total Revenue
                    </p>

                    <h3 className="text-3xl sm:text-4xl font-black mt-2">
                      ₹
                      {totalSales.toFixed(
                        2
                      )}
                    </h3>

                    <p className="text-slate-400 text-sm mt-3">
                      Revenue generated from recorded orders.
                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center">

                    <IndianRupee
                      size={28}
                      className="text-slate-950"
                    />

                  </div>

                </div>

                <div className="mt-7 h-2 bg-white/10 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{
                      width:
                        totalOrders >
                        0
                          ? `${Math.min(
                              (paidOrders /
                                totalOrders) *
                                100,
                              100
                            )}%`
                          : "0%",
                    }}
                  />

                </div>

                <div className="flex justify-between mt-2 text-xs text-slate-400">

                  <span>
                    Payment completion
                  </span>

                  <span>
                    {totalOrders >
                    0
                      ? Math.round(
                          (paidOrders /
                            totalOrders) *
                            100
                        )
                      : 0}
                    %
                  </span>

                </div>

              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <p className="text-sm font-bold text-slate-500">
                      Order Status
                    </p>

                    <h3 className="text-xl font-black mt-1">
                      Payment Overview
                    </h3>

                  </div>

                  <Package className="text-blue-600" />

                </div>

                <div className="space-y-4">

                  <ProgressRow
                    label="Paid"
                    value={
                      paidOrders
                    }
                    total={
                      totalOrders
                    }
                  />

                  <ProgressRow
                    label="Other"
                    value={Math.max(
                      totalOrders -
                        paidOrders,
                      0
                    )}
                    total={
                      totalOrders
                    }
                  />

                </div>

              </div>

            </div>
          </>
        )}

        {/* =================================================
            ORDERS SECTION
        ================================================= */}

        {activeSection ===
          "orders" && (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            <div className="p-5 sm:p-6 border-b border-slate-200">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2">

                    <ShoppingBag
                      size={20}
                      className="text-blue-600"
                    />

                    <h2 className="text-xl font-black">
                      Recent Orders
                    </h2>

                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    View and manage customer orders.
                  </p>

                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                  <div className="relative">

                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={
                        searchTerm
                      }
                      onChange={(e) =>
                        setSearchTerm(
                          e.target
                            .value
                        )
                      }
                      placeholder="Search orders..."
                      className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm"
                    />

                  </div>

                  <div className="relative">

                    <select
                      value={
                        statusFilter
                      }
                      onChange={(e) =>
                        setStatusFilter(
                          e.target
                            .value
                        )
                      }
                      className="appearance-none w-full sm:w-32 px-4 pr-9 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 text-sm font-semibold bg-white"
                    >

                      <option value="All">
                        All Status
                      </option>

                      <option value="Paid">
                        Paid
                      </option>

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Failed">
                        Failed
                      </option>

                    </select>

                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
                    />

                  </div>

                </div>

              </div>

            </div>

            {filteredOrders.length ===
            0 ? (
              <div className="py-16 text-center">

                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">

                  <ShoppingBag
                    size={28}
                    className="text-slate-400"
                  />

                </div>

                <h3 className="font-black text-lg">
                  No orders found
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Try changing your search or filter.
                </p>

              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[1100px]">

                  <thead>

                    <tr className="bg-slate-50 text-left">

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Order
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Items
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Contact
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Date
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredOrders.map(
                      (
                        order,
                        index
                      ) => (
                        <tr
                          key={`${order.order_reference}-${index}`}
                          className="border-t border-slate-100 hover:bg-blue-50/40 transition"
                        >

                          {/* ORDER */}

                          <td className="px-5 py-4">

                            <p className="font-black text-slate-900">
                              {order.order_reference ||
                                "-"}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              {
                                getDistinctProducts(
                                  order
                                )
                              }{" "}
                              product(s)
                            </p>

                          </td>

                          {/* CUSTOMER */}

                          <td className="px-5 py-4">

                            <p className="font-bold text-slate-800">
                              {order.customer_name ||
                                "-"}
                            </p>

                          </td>

                          {/* ITEMS */}

                          <td className="px-5 py-4">

                            <div className="space-y-1">

                              <p className="font-black text-slate-900">

                                {getTotalItems(
                                  order
                                )}{" "}
                                pcs

                              </p>

                              <p className="text-xs text-slate-400">

                                {
                                  getDistinctProducts(
                                    order
                                  )
                                }{" "}
                                product(s)

                              </p>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td className="px-5 py-4">

                            <p className="text-sm text-slate-600">
                              {order.customer_email ||
                                "-"}
                            </p>

                            {order.customer_mobile && (
                              <p className="text-xs text-slate-400 mt-1">
                                {
                                  order.customer_mobile
                                }
                              </p>
                            )}

                          </td>

                          {/* AMOUNT */}

                          <td className="px-5 py-4">

                            <p className="font-black text-slate-900">

                              ₹
                              {Number(
                                order.total_amount ||
                                  0
                              ).toFixed(
                                2
                              )}

                            </p>

                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-4">

                            <StatusBadge
                              status={
                                order.status
                              }
                            />

                          </td>

                          {/* DATE */}

                          <td className="px-5 py-4">

                            <p className="text-sm text-slate-600">
                              {formatDate(
                                order.created_at
                              )}
                            </p>

                          </td>

                          {/* ACTION */}

                          <td className="px-5 py-4">

                            <button
                              onClick={() =>
                                setSelectedOrder(
                                  order
                                )
                              }
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition"
                            >

                              <Eye
                                size={15}
                              />

                              View

                            </button>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

            <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-500">

              Showing{" "}

              <strong className="text-slate-800">
                {
                  filteredOrders.length
                }
              </strong>{" "}

              of{" "}

              <strong className="text-slate-800">
                {data?.orders
                  ?.length || 0}
              </strong>{" "}

              orders

            </div>

          </section>
        )}

        {/* =================================================
            CUSTOMERS SECTION
        ================================================= */}

        {activeSection ===
          "customers" && (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {/* CUSTOMER HEADER */}

            <div className="p-5 sm:p-6 border-b border-slate-200">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2">

                    <Users
                      size={21}
                      className="text-purple-600"
                    />

                    <h2 className="text-xl font-black">
                      Customer Management
                    </h2>

                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    View, create, update and delete registered customers.
                  </p>

                </div>

                <button
                  onClick={
                    openAddCustomer
                  }
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition shadow-sm"
                >

                  <UserPlus
                    size={17}
                  />

                  Add Customer

                </button>

              </div>

              {/* SEARCH */}

              <div className="mt-5 flex flex-col sm:flex-row gap-3">

                <div className="relative flex-1">

                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={
                      customerSearch
                    }
                    onChange={(e) =>
                      setCustomerSearch(
                        e.target
                          .value
                      )
                    }
                    placeholder="Search by name, email or mobile..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 text-sm"
                  />

                </div>

                <button
                  onClick={
                    loadCustomers
                  }
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-sm"
                >

                  <RefreshCw
                    size={17}
                    className={
                      customersLoading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  Refresh

                </button>

              </div>

            </div>

            {/* ERROR */}

            {customerError && (
              <div className="mx-5 mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium text-sm">
                {customerError}
              </div>
            )}

            {/* LOADING */}

            {customersLoading ? (
              <div className="py-16 text-center">

                <div className="w-11 h-11 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />

                <p className="text-slate-500 font-medium">
                  Loading customers...
                </p>

              </div>
            ) : filteredCustomers.length ===
              0 ? (
              <div className="py-16 text-center">

                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">

                  <Users
                    size={28}
                    className="text-purple-400"
                  />

                </div>

                <h3 className="font-black text-lg">
                  No customers found
                </h3>

                <p className="text-sm text-slate-500 mt-1">

                  {customerSearch
                    ? "Try another search."
                    : "No registered customers available."}

                </p>

              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[950px]">

                  <thead>

                    <tr className="bg-slate-50 text-left">

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Contact
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Login Status
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Registered
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Last Login
                      </th>

                      <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredCustomers.map(
                      (
                        customer
                      ) => (
                        <tr
                          key={
                            customer.id
                          }
                          className="border-t border-slate-100 hover:bg-purple-50/30 transition"
                        >

                          {/* CUSTOMER */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">

                                {String(
                                  customer.name ||
                                    "C"
                                )
                                  .charAt(
                                    0
                                  )
                                  .toUpperCase()}

                              </div>

                              <div>

                                <p className="font-black text-slate-900">
                                  {customer.name ||
                                    "-"}
                                </p>

                                <p className="text-xs text-slate-400 mt-1">

                                  ID: #
                                  {
                                    customer.id
                                  }

                                </p>

                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td className="px-5 py-4">

                            <div className="space-y-1">

                              <div className="flex items-center gap-2 text-sm text-slate-600">

                                <Mail
                                  size={14}
                                  className="text-slate-400"
                                />

                                <span>
                                  {customer.email ||
                                    "-"}
                                </span>

                              </div>

                              <div className="flex items-center gap-2 text-xs text-slate-500">

                                <Phone
                                  size={14}
                                  className="text-slate-400"
                                />

                                <span>
                                  {customer.mobile ||
                                    "-"}
                                </span>

                              </div>

                            </div>

                          </td>

                          {/* LOGIN STATUS */}

                          <td className="px-5 py-4">

                            {customer.is_logged_in ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black">

                                <UserCheck
                                  size={14}
                                />

                                Online

                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-black">

                                <UserX
                                  size={14}
                                />

                                Offline

                              </span>
                            )}

                          </td>

                          {/* REGISTERED */}

                          <td className="px-5 py-4">

                            <p className="text-sm text-slate-600">
                              {formatDate(
                                customer.registered_at
                              )}
                            </p>

                          </td>

                          {/* LAST LOGIN */}

                          <td className="px-5 py-4">

                            <p className="text-sm text-slate-600">
                              {formatDate(
                                customer.last_login
                              )}
                            </p>

                          </td>

                          {/* ACTIONS */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-2">

                              <button
                                onClick={() =>
                                  openEditCustomer(
                                    customer
                                  )
                                }
                                className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
                                title="Edit Customer"
                              >

                                <Pencil
                                  size={16}
                                />

                              </button>

                              <button
                                onClick={() =>
                                  handleDeleteCustomer(
                                    customer
                                  )
                                }
                                className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition"
                                title="Delete Customer"
                              >

                                <Trash2
                                  size={16}
                                />

                              </button>

                            </div>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

            {/* FOOTER */}

            <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-500">

              Showing{" "}

              <strong className="text-slate-800">
                {
                  filteredCustomers.length
                }
              </strong>{" "}

              of{" "}

              <strong className="text-slate-800">
                {
                  customersData.length
                }
              </strong>{" "}

              customers

            </div>

          </section>
        )}

        {/* =================================================
            PRODUCT ANALYSIS SECTION
        ================================================= */}

        {activeSection ===
          "product-analysis" && (
          <section>

            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

              <div>

                <div className="flex items-center gap-2">

                  <BarChart3
                    size={23}
                    className="text-orange-500"
                  />

                  <p className="text-sm font-black text-orange-600 uppercase tracking-wider">
                    Sales Analytics
                  </p>

                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  Product Analysis
                </h2>

                <p className="text-slate-500 mt-1">
                  Check which products are selling the most.
                </p>

              </div>

              <button
                onClick={
                  loadDashboard
                }
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition font-bold text-sm"
              >

                <RefreshCw
                  size={17}
                />

                Refresh Analysis

              </button>

            </div>

            {/* SUMMARY */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

              <StatCard
                title="Total Items Sold"
                value={
                  productAnalysis.totalItemsSold
                }
                icon={
                  <Package
                    size={24}
                  />
                }
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />

              <StatCard
                title="Different Products"
                value={
                  productAnalysis.totalProducts
                }
                icon={
                  <BarChart3
                    size={24}
                  />
                }
                iconBg="bg-orange-100"
                iconColor="text-orange-600"
              />

              <StatCard
                title="Top Selling Quantity"
                value={
                  productAnalysis
                    .topProduct
                    ?.quantity || 0
                }
                icon={
                  <ShoppingBag
                    size={24}
                  />
                }
                iconBg="bg-emerald-100"
                iconColor="text-emerald-600"
              />

              <StatCard
                title="Product Revenue"
                value={`₹${Number(
                  productAnalysis.totalProductRevenue
                ).toFixed(
                  2
                )}`}
                icon={
                  <IndianRupee
                    size={24}
                  />
                }
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
              />

            </div>

            {/* TOP PRODUCT */}

            {productAnalysis.topProduct && (
              <div className="mb-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <div>

                    <p className="text-orange-400 text-sm font-black uppercase tracking-wider">
                      Most Sold Product
                    </p>

                    <h3 className="text-2xl sm:text-3xl font-black mt-2 break-words">
                      {
                        productAnalysis
                          .topProduct
                          .product_name
                      }
                    </h3>

                    <p className="text-slate-400 mt-2">
                      {
                        productAnalysis
                          .topProduct
                          .quantity
                      }{" "}
                      units sold
                    </p>

                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0">

                    <Package
                      size={31}
                      className="text-slate-950"
                    />

                  </div>

                </div>

              </div>
            )}

            {/* GRAPH + LIST */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* GRAPH */}

              <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="p-5 sm:p-6 border-b border-slate-200">

                  <div className="flex items-center gap-2">

                    <BarChart3
                      size={20}
                      className="text-orange-500"
                    />

                    <h3 className="text-xl font-black">
                      Product Sales Graph
                    </h3>

                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    Quantity sold for each product.
                  </p>

                </div>

                {productAnalysis
                  .products
                  .length === 0 ? (
                  <div className="py-16 text-center">

                    <Package
                      size={40}
                      className="mx-auto text-slate-300 mb-3"
                    />

                    <p className="font-bold text-slate-600">
                      No product sales data available.
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Product sales will appear here after orders contain item details.
                    </p>

                  </div>
                ) : (
                  <div className="p-5 sm:p-6 space-y-5">

                    {productAnalysis
                      .products
                      .slice(0, 10)
                      .map(
                        (
                          product,
                          index
                        ) => {
                          const percentage =
                            getProductPercentage(
                              product.quantity
                            );

                          return (
                            <div
                              key={
                                product.product_name
                              }
                            >

                              <div className="flex items-center justify-between gap-3 mb-2">

                                <div className="flex items-center gap-3 min-w-0">

                                  <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center text-xs font-black shrink-0">
                                    {index +
                                      1}
                                  </div>

                                  <p className="font-bold text-slate-800 truncate">
                                    {
                                      product.product_name
                                    }
                                  </p>

                                </div>

                                <div className="text-right shrink-0">

                                  <p className="font-black text-slate-900">
                                    {
                                      product.quantity
                                    }
                                  </p>

                                  <p className="text-xs text-slate-400">
                                    {percentage}
                                    %
                                  </p>

                                </div>

                              </div>

                              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">

                                <div
                                  className="h-full bg-orange-500 rounded-full transition-all duration-700"
                                  style={{
                                    width: `${Math.max(
                                      percentage,
                                      3
                                    )}%`,
                                  }}
                                />

                              </div>

                            </div>
                          );
                        }
                      )}

                    {productAnalysis
                      .products
                      .length >
                      10 && (
                      <p className="text-xs text-slate-400 text-center pt-2">
                        Showing top 10 products in graph. Complete list is available on the right.
                      </p>
                    )}

                  </div>
                )}

              </div>

              {/* NUMBERING LIST */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="p-5 sm:p-6 border-b border-slate-200">

                  <h3 className="text-xl font-black">
                    Product Sales
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Complete quantity breakdown.
                  </p>

                </div>

                {productAnalysis
                  .products
                  .length === 0 ? (
                  <div className="py-16 text-center px-5">

                    <Package
                      size={36}
                      className="mx-auto text-slate-300 mb-3"
                    />

                    <p className="text-slate-500">
                      No products sold yet.
                    </p>

                  </div>
                ) : (
                  <div className="max-h-[520px] overflow-y-auto">

                    {productAnalysis
                      .products
                      .map(
                        (
                          product,
                          index
                        ) => (
                          <div
                            key={
                              product.product_name
                            }
                            className="px-5 py-4 border-b border-slate-100 last:border-b-0 hover:bg-orange-50/40 transition"
                          >

                            <div className="flex items-center gap-3">

                              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm shrink-0">
                                {index +
                                  1}
                              </div>

                              <div className="min-w-0 flex-1">

                                <p className="font-black text-slate-800 break-words">
                                  {
                                    product.product_name
                                  }
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                  Revenue: ₹
                                  {Number(
                                    product.revenue
                                  ).toFixed(
                                    2
                                  )}
                                </p>

                              </div>

                              <div className="text-right shrink-0">

                                <p className="text-lg font-black text-slate-900">
                                  {
                                    product.quantity
                                  }
                                </p>

                                <p className="text-xs text-slate-400">
                                  sold
                                </p>

                              </div>

                            </div>

                          </div>
                        )
                      )}

                  </div>
                )}

              </div>

            </div>

          </section>
        )}

      </main>

      {/* =================================================
          ORDER MODAL
      ================================================= */}

      {selectedOrder && (
        <div
          onClick={() =>
            setSelectedOrder(null)
          }
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
          >

            {/* HEADER */}

            <div className="sticky top-0 bg-white border-b border-slate-200 px-5 sm:px-7 py-5 flex items-center justify-between z-10">

              <div>

                <p className="text-xs uppercase tracking-wider font-black text-blue-600">
                  Order Details
                </p>

                <h2 className="text-xl sm:text-2xl font-black mt-1">
                  {
                    selectedOrder.order_reference
                  }
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedOrder(
                    null
                  )
                }
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition"
              >

                <X size={20} />

              </button>

            </div>

            <div className="p-5 sm:p-7">

              {/* ORDER DETAIL CARDS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">

                <DetailCard
                  icon={
                    <Users
                      size={18}
                    />
                  }
                  label="Customer"
                  value={
                    selectedOrder.customer_name ||
                    "-"
                  }
                />

                <DetailCard
                  icon={
                    <Mail
                      size={18}
                    />
                  }
                  label="Email"
                  value={
                    selectedOrder.customer_email ||
                    "-"
                  }
                />

                <DetailCard
                  icon={
                    <Phone
                      size={18}
                    />
                  }
                  label="Mobile"
                  value={
                    selectedOrder.customer_mobile ||
                    "-"
                  }
                />

                <DetailCard
                  icon={
                    <IndianRupee
                      size={18}
                    />
                  }
                  label="Total Amount"
                  value={`₹${Number(
                    selectedOrder.total_amount ||
                      0
                  ).toFixed(
                    2
                  )}`}
                />

                <DetailCard
                  icon={
                    <CreditCard
                      size={18}
                    />
                  }
                  label="Payment Status"
                  value={
                    selectedOrder.status ||
                    "-"
                  }
                />

                <DetailCard
                  icon={
                    <CalendarDays
                      size={18}
                    />
                  }
                  label="Created At"
                  value={formatDate(
                    selectedOrder.created_at
                  )}
                />

              </div>

              {/* ORDER CALCULATION */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

                  <div className="flex items-center gap-2 text-blue-600 mb-2">

                    <Package
                      size={18}
                    />

                    <span className="text-xs font-black uppercase tracking-wide">
                      Products
                    </span>

                  </div>

                  <p className="text-2xl font-black text-slate-900">
                    {
                      getDistinctProducts(
                        selectedOrder
                      )
                    }
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Different products
                  </p>

                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

                  <div className="flex items-center gap-2 text-orange-600 mb-2">

                    <ShoppingBag
                      size={18}
                    />

                    <span className="text-xs font-black uppercase tracking-wide">
                      Total Quantity
                    </span>

                  </div>

                  <p className="text-2xl font-black text-slate-900">
                    {
                      getTotalItems(
                        selectedOrder
                      )
                    }
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Total pieces/items
                  </p>

                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">

                  <div className="flex items-center gap-2 text-emerald-600 mb-2">

                    <IndianRupee
                      size={18}
                    />

                    <span className="text-xs font-black uppercase tracking-wide">
                      Order Total
                    </span>

                  </div>

                  <p className="text-2xl font-black text-slate-900">
                    ₹
                    {Number(
                      selectedOrder.total_amount ||
                        0
                    ).toFixed(
                      2
                    )}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Recorded order amount
                  </p>

                </div>

              </div>

              {/* PAYMENT */}

              <div className="bg-slate-50 rounded-2xl p-5 mb-7">

                <h3 className="font-black text-lg mb-4">
                  Payment Information
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  <InfoLine
                    label="Razorpay Order ID"
                    value={
                      selectedOrder.razorpay_order_id ||
                      "-"
                    }
                  />

                  <InfoLine
                    label="Razorpay Payment ID"
                    value={
                      selectedOrder.razorpay_payment_id ||
                      "-"
                    }
                  />

                </div>

              </div>

              {/* ORDERED ITEMS */}

              <div>

                <div className="flex items-center justify-between gap-3 mb-4">

                  <div className="flex items-center gap-2">

                    <Package
                      size={20}
                      className="text-blue-600"
                    />

                    <h3 className="font-black text-lg">
                      Ordered Items
                    </h3>

                  </div>

                  <div className="text-sm font-bold text-slate-500">

                    {
                      getTotalItems(
                        selectedOrder
                      )
                    }{" "}
                    pcs

                  </div>

                </div>

                {selectedOrder.items &&
                selectedOrder.items
                  .length > 0 ? (
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl">

                    <table className="w-full min-w-[650px]">

                      <thead>

                        <tr className="bg-slate-50">

                          <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-500">
                            #
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-500">
                            Product
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-500">
                            Qty
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-500">
                            Price
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-500">
                            Total
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {selectedOrder.items.map(
                          (
                            item,
                            index
                          ) => {

                            const quantity =
                              Number(
                                item.quantity ||
                                  0
                              );

                            const price =
                              Number(
                                item.price ||
                                  0
                              );

                            const itemTotal =
                              item.item_total !==
                              undefined
                                ? Number(
                                    item.item_total
                                  )
                                : quantity *
                                  price;

                            return (
                              <tr
                                key={
                                  index
                                }
                                className="border-t border-slate-100"
                              >

                                <td className="px-4 py-4">

                                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-black text-slate-600">
                                    {index +
                                      1}
                                  </div>

                                </td>

                                <td className="px-4 py-4">

                                  <p className="font-bold text-slate-800">
                                    {
                                      item.product_name ||
                                      "-"
                                    }
                                  </p>

                                  {item.product_id && (
                                    <p className="text-xs text-slate-400 mt-1">
                                      ID:{" "}
                                      {
                                        item.product_id
                                      }
                                    </p>
                                  )}

                                </td>

                                <td className="px-4 py-4">

                                  <span className="inline-flex items-center justify-center min-w-10 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 font-black text-sm">
                                    {
                                      quantity
                                    }
                                  </span>

                                </td>

                                <td className="px-4 py-4">

                                  ₹
                                  {price.toFixed(
                                    2
                                  )}

                                </td>

                                <td className="px-4 py-4 font-black">

                                  ₹
                                  {itemTotal.toFixed(
                                    2
                                  )}

                                </td>

                              </tr>
                            );
                          }
                        )}

                      </tbody>

                    </table>

                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-50 text-slate-500 text-sm">
                    No item details available for this order.
                  </div>
                )}

                {/* ORDER TOTAL CALCULATION */}

                {selectedOrder.items &&
                  selectedOrder.items
                    .length > 0 && (
                    <div className="mt-4 flex justify-end">

                      <div className="w-full sm:w-80 bg-slate-50 rounded-2xl p-5">

                        <div className="flex justify-between text-sm text-slate-500 mb-2">

                          <span>
                            Items Subtotal
                          </span>

                          <span className="font-bold text-slate-800">

                            ₹
                            {getOrderItemsSubtotal(
                              selectedOrder
                            ).toFixed(
                              2
                            )}

                          </span>

                        </div>

                        <div className="border-t border-slate-200 pt-3 flex justify-between">

                          <span className="font-black text-slate-900">
                            Order Total
                          </span>

                          <span className="font-black text-lg text-blue-600">

                            ₹
                            {Number(
                              selectedOrder.total_amount ||
                                0
                            ).toFixed(
                              2
                            )}

                          </span>

                        </div>

                      </div>

                    </div>
                  )}

              </div>

            </div>

            {/* FOOTER */}

            <div className="border-t border-slate-200 px-5 sm:px-7 py-4 flex justify-end">

              <button
                onClick={() =>
                  setSelectedOrder(
                    null
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white font-bold transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          CUSTOMER ADD / EDIT MODAL
      ================================================= */}

      {customerModal && (
        <div
          onClick={
            closeCustomerModal
          }
          className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
          >

            {/* HEADER */}

            <div className="px-5 sm:px-7 py-5 border-b border-slate-200 flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider font-black text-purple-600">
                  Customer Management
                </p>

                <h2 className="text-xl sm:text-2xl font-black mt-1">

                  {customerModal.type ===
                  "add"
                    ? "Add Customer"
                    : "Edit Customer"}

                </h2>

              </div>

              <button
                type="button"
                onClick={
                  closeCustomerModal
                }
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition"
              >

                <X size={20} />

              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleCustomerSubmit
              }
              className="p-5 sm:p-7 space-y-5"
            >

              {customerError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                  {customerError}
                </div>
              )}

              {/* NAME */}

              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    customerForm.name
                  }
                  onChange={
                    handleCustomerFormChange
                  }
                  placeholder="Enter customer name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    customerForm.email
                  }
                  onChange={
                    handleCustomerFormChange
                  }
                  placeholder="customer@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                />

              </div>

              {/* MOBILE */}

              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobile"
                  value={
                    customerForm.mobile
                  }
                  onChange={
                    handleCustomerFormChange
                  }
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-bold text-slate-700 mb-2">

                  Password{" "}

                  {customerModal.type ===
                    "edit" && (
                    <span className="text-slate-400 font-normal">
                      (leave blank to keep current)
                    </span>
                  )}

                </label>

                <input
                  type="password"
                  name="password"
                  value={
                    customerForm.password
                  }
                  onChange={
                    handleCustomerFormChange
                  }
                  placeholder={
                    customerModal.type ===
                    "add"
                      ? "Create password"
                      : "New password"
                  }
                  required={
                    customerModal.type ===
                    "add"
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <button
                  type="button"
                  onClick={
                    closeCustomerModal
                  }
                  disabled={
                    customerFormLoading
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    customerFormLoading
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition disabled:bg-slate-400"
                >

                  {customerFormLoading ? (
                    <>
                      <RefreshCw
                        size={17}
                        className="animate-spin"
                      />

                      Saving...

                    </>
                  ) : (
                    <>
                      <Save
                        size={17}
                      />

                      {customerModal.type ===
                      "add"
                        ? "Create Customer"
                        : "Save Changes"}

                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(value) {
  if (!value) {
    return "-";
  }

  try {
    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return String(value);
    }

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  } catch {
    return String(value);
  }
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-bold text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {value}
          </h3>

        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

// =====================================================
// PROGRESS ROW
// =====================================================

function ProgressRow({
  label,
  value,
  total,
}) {
  const percentage =
    total > 0
      ? Math.round(
          (value / total) *
            100
        )
      : 0;

  return (
    <div>

      <div className="flex justify-between text-sm mb-2">

        <span className="font-bold text-slate-700">
          {label}
        </span>

        <span className="font-bold text-slate-500">
          {value}
        </span>

      </div>

      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-600 rounded-full transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({
  status,
}) {
  const normalized =
    String(status || "")
      .toLowerCase();

  let classes =
    "bg-slate-100 text-slate-700 border-slate-200";

  if (
    normalized === "paid"
  ) {
    classes =
      "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (
    normalized === "pending"
  ) {
    classes =
      "bg-amber-50 text-amber-700 border-amber-200";
  } else if (
    normalized === "failed"
  ) {
    classes =
      "bg-red-50 text-red-700 border-red-200";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-black ${classes}`}
    >
      {status ||
        "Unknown"}
    </span>
  );
}

// =====================================================
// DETAIL CARD
// =====================================================

function DetailCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">

      <div className="flex items-center gap-2 text-blue-600 mb-2">

        {icon}

        <span className="text-xs font-black uppercase tracking-wide text-slate-500">
          {label}
        </span>

      </div>

      <p className="font-bold text-slate-900 break-words">
        {value}
      </p>

    </div>
  );
}

// =====================================================
// INFO LINE
// =====================================================

function InfoLine({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-xs font-bold text-slate-500 mb-1">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-900 break-all">
        {value}
      </p>

    </div>
  );
}

export default AdminDashboard;

