import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  ChevronDown,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  UserRound,
  UserPlus,
  LogIn,
  LockKeyhole,
  LogOut,
  UserCircle,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products, categories } from "../data/products";
import logo from "../assets/headerlogo33.png";

const API_BASE_URL = "http://localhost:8000";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/_density_electronics?stkn=MW41ZjI2cncwaTQxYg==",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[18px] h-[18px]"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/densityelectro?s=11",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[18px] h-[18px]"
      >
        <path d="M18.9 2.5c-1 .5-2 .8-3.1 1.1A4.7 4.7 0 0 0 12.3 6v.4A10.8 10.8 0 0 1 3.8 3.9s-2.3 5.1 1.4 7.5a9.4 9.4 0 0 1-1.5.2c.4 1.8 2 3.2 4 3.6A9.7 9.7 0 0 1 2 18.7c2.7 1.8 6 2.2 9.2 1.2a13.5 13.5 0 0 0 9.4-9.1c.9-2.1.9-3.4.9-3.4s-.8.4-1.6.7Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919890400165",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[18px] h-[18px]"
      >
        <path d="M20.52 3.48A11.7 11.7 0 0 0 12.2 1a11.8 11.8 0 0 0-10.2 18l-1 3.7 3.8-1A11.8 11.8 0 0 0 12.22 23c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.48-8.72ZM12.2 21.1a9.7 9.7 0 0 1-5.1-1.4l-.36-.22-2.26.6.6-2.2-.23-.36A9.7 9.7 0 0 1 2.5 11.8a9.8 9.8 0 0 1 19.6 0 9.8 9.8 0 0 1-9.9 9.3Zm5.4-7.2c-.3-.15-1.7-.83-2-.93-.3-.1-.52-.15-.74.15-.22.3-.82.92-.99 1.1-.18.18-.36.2-.68.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.52-.08-.15-.74-1.8-.99-2.46-.26-.65-.52-.57-.72-.58l-.62-.01c-.21 0-.55.08-.84.38-.29.3-1.1 1.08-1.1 2.63s1.12 3.04 1.28 3.25c.15.2 2.2 3.36 5.34 4.7.75.32 1.33.52 1.79.66.75.24 1.43.2 1.97.12.6-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.43-.07-.13-.27-.22-.57-.38Z" />
      </svg>
    ),
  },
];

export default function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchContainerRef = useRef(null);
  const mobileSearchContainerRef = useRef(null);

  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  const mobileAccountMenuRef = useRef(null);
  const desktopAccountMenuRef = useRef(null);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  // ============================================================
  // CUSTOMER NAME
  // ============================================================

  const getCustomerName = (user) => {
    if (!user) return "Customer";

    if (
      user.name &&
      typeof user.name === "string" &&
      user.name.trim()
    ) {
      return user.name.trim();
    }

    if (
      user.first_name &&
      typeof user.first_name === "string" &&
      user.first_name.trim()
    ) {
      return user.first_name.trim();
    }

    if (
      user.username &&
      typeof user.username === "string" &&
      user.username.trim()
    ) {
      return user.username.trim();
    }

    if (
      user.email &&
      typeof user.email === "string" &&
      user.email.includes("@")
    ) {
      return user.email.split("@")[0];
    }

    return "Customer";
  };

  // ============================================================
  // CHECK CURRENT CUSTOMER
  // ============================================================

  const checkCurrentUser = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/current-user/`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        setCurrentUser(null);
        return;
      }

      const data = await response.json();

      console.log("CURRENT USER RESPONSE:", data);

      if (
        data.success &&
        data.authenticated &&
        data.user
      ) {
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("CURRENT USER ERROR:", error);
      setCurrentUser(null);
    }
  };

  // ============================================================
  // LOAD CURRENT CUSTOMER
  // ============================================================

  useEffect(() => {
    checkCurrentUser();
  }, [location.pathname]);

  // ============================================================
  // LOGIN / REGISTER EVENT
  // ============================================================

  useEffect(() => {
    const handleCustomerAuthChanged = () => {
      console.log("CUSTOMER AUTH CHANGED");

      setTimeout(() => {
        checkCurrentUser();
      }, 100);
    };

    window.addEventListener(
      "customer-auth-changed",
      handleCustomerAuthChanged
    );

    return () => {
      window.removeEventListener(
        "customer-auth-changed",
        handleCustomerAuthChanged
      );
    };
  }, []);

  // ============================================================
  // SEARCH SUGGESTIONS
  // ============================================================

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();

      const matches = products
        .filter((p) => {
          const nameMatch = p.name
            ?.toLowerCase()
            .includes(query);

          const categoryMatch = p.category
            ?.toLowerCase()
            .includes(query);

          const partMatch = p.specifications?.partNumber
            ?.toLowerCase()
            .includes(query);

          const descMatch = p.shortDescription
            ?.toLowerCase()
            .includes(query);

          const idMatch = p.id
            ?.toLowerCase()
            .includes(query);

          return (
            nameMatch ||
            categoryMatch ||
            partMatch ||
            descMatch ||
            idMatch
          );
        })
        .slice(0, 8);

      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // ============================================================
  // CLOSE SEARCH
  // ============================================================

  useEffect(() => {
    const handleClickOutsideSearch = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target) &&
        (!mobileSearchContainerRef.current ||
          !mobileSearchContainerRef.current.contains(
            e.target
          ))
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutsideSearch
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideSearch
      );
    };
  }, []);

  // ============================================================
  // CLOSE ACCOUNT MENU
  // ============================================================

  useEffect(() => {
    const handleAccountOutsideClick = (event) => {
      const clickedInsideMobile =
        mobileAccountMenuRef.current?.contains(
          event.target
        );

      const clickedInsideDesktop =
        desktopAccountMenuRef.current?.contains(
          event.target
        );

      if (!clickedInsideMobile && !clickedInsideDesktop) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleAccountOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleAccountOutsideClick
      );
    };
  }, []);

  // ============================================================
  // ROUTE CHANGE
  // ============================================================

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  }, [location.pathname]);

  // ============================================================
  // BODY SCROLL
  // ============================================================

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // ============================================================
  // MOBILE MENU OUTSIDE CLICK
  // ============================================================

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handleMenuOutsideClick = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(
          event.target
        )
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleMenuOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleMenuOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isMobileMenuOpen]);

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);

      navigate(
        `/shop?search=${encodeURIComponent(
          searchQuery.trim()
        )}`
      );
    }
  };

  // ============================================================
  // SELECT PRODUCT
  // ============================================================

  const handleSelectProduct = (slug) => {
    setShowSuggestions(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);

    navigate(`/product/${slug}`);
  };

  // ============================================================
  // SCROLL TO SECTION
  // ============================================================

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
        });
    } else {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 200);
    }
  };

  // ============================================================
  // LOGO
  // ============================================================

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    navigate("/");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  // ============================================================
  // CUSTOMER LOGOUT
  // ============================================================

  const handleCustomerLogout = async () => {
    try {
      await fetch(
        `${API_BASE_URL}/api/orders/logout/`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      setCurrentUser(null);
      setIsAccountMenuOpen(false);
      setIsMobileMenuOpen(false);

      window.dispatchEvent(
        new Event("customer-auth-changed")
      );

      navigate("/");
    }
  };

  // ============================================================
  // MOBILE NAVIGATION
  // ============================================================

  const mobileNavigation = createPortal(
    <>
      <button
        type="button"
        aria-label="Close menu"
        aria-hidden={!isMobileMenuOpen}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[9998] transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() =>
          setIsMobileMenuOpen(false)
        }
      />

      <aside
        ref={mobileMenuRef}
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-slate-900 text-white z-[9999] flex flex-col shadow-2xl overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out transform-gpu lg:hidden ${
          isMobileMenuOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none"
        }`}
      >
        {/* MOBILE HEADER */}

        <div className="flex min-h-16 items-center justify-between px-6 border-b border-slate-700">
          <span className="text-white font-black text-lg tracking-widest uppercase">
            Menu
          </span>

          <button
            type="button"
            onClick={() =>
              setIsMobileMenuOpen(false)
            }
            className="min-h-12 min-w-12 inline-flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 active:bg-slate-800 transition-colors rounded-md"
            aria-label="Close Menu"
          >
            <X
              size={28}
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* MOBILE ACCOUNT */}

        <div className="p-4 border-b border-slate-700">
          {currentUser ? (
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center">
                  <UserCircle
                    size={25}
                    className="text-white"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-white font-black text-sm truncate">
                    {getCustomerName(currentUser)}
                  </p>

                  <p className="text-slate-400 text-xs truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCustomerLogout}
                className="w-full min-h-11 flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg font-black text-xs uppercase tracking-widest transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="min-h-11 flex items-center gap-3 px-4 rounded-lg bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-colors"
              >
                <LogIn size={18} />
                Customer Login
              </Link>

              <Link
                to="/register"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="min-h-11 flex items-center gap-3 px-4 rounded-lg border border-slate-600 text-slate-200 font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors"
              >
                <UserPlus size={18} />
                Register
              </Link>

              <Link
                to="/admin-dashboard"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="min-h-11 flex items-center gap-3 px-4 rounded-lg border border-slate-700 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-800 hover:text-orange-400 transition-colors"
              >
                <LockKeyhole size={18} />
                Admin Login
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE NAVIGATION */}

        <nav
          className="flex-1 px-4 py-4"
          aria-label="Primary mobile navigation"
        >
          {[
            {
              name: "Home",
              path: "/",
            },
            {
              name: "Categories",
              path: "/categories",
            },
            {
              name: "Products / Shop",
              path: "/shop",
              highlight: true,
            },
            {
              name: "Bulk Enquiries",
              path: "/bulk",
              highlight: true,
            },
            {
              name: "Sell on Density",
              path: "/sell",
            },
            {
              name: "About Us",
              path: "/about",
            },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
              className={`min-h-12 flex items-center justify-between px-3 border-b border-slate-800 font-bold text-[15px] transition-colors hover:bg-slate-800 active:bg-slate-800 ${
                link.highlight
                  ? "text-orange-400"
                  : "text-slate-200"
              }`}
            >
              {link.name}

              <ChevronRight
                size={18}
                className="text-slate-500"
              />
            </Link>
          ))}

          <button
            type="button"
            onClick={(e) =>
              handleScrollToSection(
                e,
                "footer"
              )
            }
            className="min-h-12 w-full flex items-center justify-between px-3 border-b border-slate-800 font-bold text-[15px] text-slate-200 text-left transition-colors hover:bg-slate-800 active:bg-slate-800"
          >
            Contact

            <ChevronRight
              size={18}
              className="text-slate-500"
            />
          </button>
        </nav>

        {/* MOBILE BOTTOM */}

        <div className="border-t border-slate-700 p-4 space-y-2">
          <a
            href="tel:+919890400165"
            onClick={() =>
              setIsMobileMenuOpen(false)
            }
            className="min-h-12 flex items-center justify-between px-3 text-sm font-bold text-slate-200 rounded-md hover:bg-slate-800 active:bg-slate-800"
          >
            <span>Call Support</span>

            <span className="text-xs text-slate-400">
              +91 9890400165
            </span>
          </a>

          <a
            href="https://wa.me/919890400165"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              setIsMobileMenuOpen(false)
            }
            className="min-h-12 flex items-center justify-between px-3 text-sm font-bold text-slate-200 rounded-md hover:bg-slate-800 active:bg-slate-800"
          >
            <span>WhatsApp</span>

            <span className="text-xs text-slate-400">
              +91 98904 00165
            </span>
          </a>

          <Link
            to="/cart"
            onClick={() =>
              setIsMobileMenuOpen(false)
            }
            className="min-h-12 flex items-center justify-between px-3 text-sm font-bold text-slate-200 rounded-md hover:bg-slate-800 active:bg-slate-800"
          >
            <span>Cart</span>

            <span className="min-w-7 h-7 px-2 inline-flex items-center justify-center rounded-full bg-orange-500 text-slate-950 text-xs font-black">
              {cartItemCount}
            </span>
          </Link>
        </div>
      </aside>
    </>,
    document.body
  );

  return (
    <header className="w-full font-sans sticky top-0 z-50 shadow-2xl bg-[#050b14] print:hidden">

      {/* ======================================================
          TOP MAIN HEADER
      ====================================================== */}

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">

        {/* LOGO + MOBILE ICONS */}

        <div className="flex items-center justify-between w-full lg:w-auto">
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center flex-shrink-0 z-40"
          >
            <img
              src={logo}
              alt="Density Logo"
              fetchPriority="high"
              className="h-14 lg:h-14 w-auto object-contain"
            />
          </a>

          {/* MOBILE ICONS */}

          <div className="flex items-center gap-5 text-gray-200 z-40 lg:hidden">

            {/* CART */}

            <Link
              to="/cart"
              className="flex items-center hover:text-[#ffb700] transition-colors relative group"
            >
              <ShoppingCart
                size={22}
                className="group-hover:scale-110 transition-transform"
              />

              {cartItemCount > 0 && (
                <span className="absolute -top-2.5 -right-3 bg-[#ffb700] text-[#050b14] text-[10px] font-black rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* MOBILE ACCOUNT */}

            <div
              ref={mobileAccountMenuRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() =>
                  setIsAccountMenuOpen(
                    !isAccountMenuOpen
                  )
                }
                className="relative flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors group"
                aria-label="Account Menu"
                title="Account"
              >
                {currentUser ? (
                  <UserRound
                    size={22}
                    strokeWidth={2}
                    className="group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <LockKeyhole
                    size={21}
                    strokeWidth={2}
                    className="group-hover:scale-110 transition-transform"
                  />
                )}
              </button>

              {isAccountMenuOpen && (
                <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[100]">

                  {currentUser ? (
                    <>
                      <div className="px-4 py-4 bg-slate-900 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                            <UserCircle size={22} />
                          </div>

                          <div className="min-w-0">
                            <p className="font-black text-sm truncate">
                              {getCustomerName(
                                currentUser
                              )}
                            </p>

                            <p className="text-[11px] text-slate-400 truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={
                          handleCustomerLogout
                        }
                        className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 font-black text-xs uppercase tracking-widest transition-colors"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 bg-slate-900 text-white">
                        <p className="font-black text-sm">
                          My Account
                        </p>

                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">
                          Density Electronics
                        </p>
                      </div>

                      <Link
                        to="/login"
                        onClick={() =>
                          setIsAccountMenuOpen(false)
                        }
                        className="px-4 py-3 flex items-center gap-3 text-slate-800 hover:bg-orange-50 hover:text-orange-600 font-black text-xs uppercase tracking-widest border-b border-gray-100 transition-colors"
                      >
                        <LogIn size={18} />
                        Customer Login
                      </Link>

                      <Link
                        to="/register"
                        onClick={() =>
                          setIsAccountMenuOpen(false)
                        }
                        className="px-4 py-3 flex items-center gap-3 text-slate-800 hover:bg-orange-50 hover:text-orange-600 font-black text-xs uppercase tracking-widest border-b border-gray-100 transition-colors"
                      >
                        <UserPlus size={18} />
                        Register
                      </Link>

                      <Link
                        to="/admin-dashboard"
                        onClick={() =>
                          setIsAccountMenuOpen(false)
                        }
                        className="px-4 py-3 flex items-center gap-3 text-slate-700 hover:bg-slate-100 font-black text-xs uppercase tracking-widest transition-colors"
                      >
                        <LockKeyhole size={18} />
                        Admin Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* MENU */}

            <button
              type="button"
              ref={mobileMenuButtonRef}
              className="hover:text-[#ffb700] active:scale-90 transition-all"
              onClick={() =>
                setIsMobileMenuOpen(true)
              }
              aria-label="Open Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={32} />
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}

        <div
          ref={searchContainerRef}
          className="w-full lg:flex-1 lg:max-w-3xl relative order-last lg:order-none pb-2 lg:pb-0"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full bg-white rounded-md overflow-hidden shadow-inner h-12 border-2 border-transparent focus-within:border-blue-600 transition-colors"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              onFocus={() =>
                searchQuery.trim() &&
                setShowSuggestions(true)
              }
              placeholder="Search"
              className="w-full text-[14px] text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent px-4 font-medium h-full"
            />

            <button
              type="submit"
              className="bg-[#2563eb] hover:bg-blue-700 text-white px-6 h-full transition-colors cursor-pointer flex items-center justify-center shrink-0"
            >
              <Search
                size={20}
                strokeWidth={2.5}
              />
            </button>
          </form>

          {/* SEARCH SUGGESTIONS */}

          {showSuggestions &&
            suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      handleSelectProduct(
                        product.slug
                      )
                    }
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-0 text-black transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-10 h-10 object-contain rounded bg-gray-50 p-1"
                      />

                      <div>
                        <span className="text-[13px] font-bold block truncate max-w-[250px]">
                          {product.name}
                        </span>

                        <span className="text-[10px] text-gray-500 font-mono uppercase">
                          P/N:{" "}
                          {product.specifications
                            ?.partNumber ||
                            product.id}
                        </span>
                      </div>
                    </div>

                    <span className="font-black text-[#2563eb] text-sm shrink-0">
                      ₹{product.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* ====================================================
            DESKTOP RIGHT ACTIONS
        ==================================================== */}

        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0 text-gray-200 z-40">

          {/* SOCIAL */}

          <div className="flex items-center gap-3 text-gray-400">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#1e293b] border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition-colors"
                title={social.label}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-gray-700"></div>

          {/* CART */}

          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-[#ffb700] transition-colors relative group"
          >
            <ShoppingCart
              size={24}
              className="group-hover:scale-110 transition-transform"
            />

            <span className="font-semibold text-[14px]">
              Cart
            </span>

            {cartItemCount > 0 && (
              <span className="absolute -top-2.5 -left-3 bg-[#ffb700] text-[#050b14] text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* DESKTOP ACCOUNT */}

          <div
            ref={desktopAccountMenuRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setIsAccountMenuOpen(
                  !isAccountMenuOpen
                )
              }
              className="relative flex items-center justify-center gap-2 text-gray-300 hover:text-orange-400 transition-colors group"
              aria-label="Account Menu"
              title="Account"
            >
              {currentUser ? (
                <UserRound
                  size={21}
                  strokeWidth={2}
                  className="group-hover:scale-110 transition-transform"
                />
              ) : (
                <LockKeyhole
                  size={21}
                  strokeWidth={2}
                  className="group-hover:scale-110 transition-transform"
                />
              )}

              {/* IMPORTANT:
                  LOGGED IN = CUSTOMER NAME
                  LOGGED OUT = MY ACCOUNT
              */}

              <span className="font-semibold text-[13px] max-w-[150px] truncate">
                {currentUser
                  ? getCustomerName(currentUser)
                  : "My Account"}
              </span>

              <ChevronDown
                size={14}
                className={`transition-transform ${
                  isAccountMenuOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* DESKTOP DROPDOWN */}

            {isAccountMenuOpen && (
              <div className="absolute top-full right-0 mt-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[100]">

                {currentUser ? (
                  <>
                    {/* LOGGED IN CUSTOMER */}

                    <div className="px-5 py-5 bg-slate-900 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                          <UserCircle size={27} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-black text-base truncate">
                            {getCustomerName(
                              currentUser
                            )}
                          </p>

                          <p className="text-[11px] text-slate-400 truncate mt-1">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MY ACCOUNT */}

                    <div className="px-5 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <UserRound
                          size={18}
                          className="text-blue-600"
                        />

                        <div>
                          <p className="text-xs font-black text-slate-800">
                            My Account
                          </p>

                          <p className="text-[10px] text-gray-400 mt-1">
                            Welcome,{" "}
                            {getCustomerName(
                              currentUser
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* LOGIN STATUS */}

                    <div className="px-5 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-green-600">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>

                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Logged In
                        </span>
                      </div>
                    </div>

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={
                        handleCustomerLogout
                      }
                      className="w-full px-5 py-4 flex items-center gap-3 text-red-600 hover:bg-red-50 font-black text-xs uppercase tracking-widest transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* NOT LOGGED IN */}

                    <div className="px-5 py-4 bg-slate-900 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                          <UserRound size={22} />
                        </div>

                        <div>
                          <p className="font-black text-sm">
                            My Account
                          </p>

                          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                            Density Electronics
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CUSTOMER LOGIN */}

                    <Link
                      to="/login"
                      onClick={() =>
                        setIsAccountMenuOpen(false)
                      }
                      className="px-5 py-4 flex items-center gap-3 text-slate-800 hover:bg-orange-50 hover:text-orange-600 border-b border-gray-100 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center">
                        <LogIn
                          size={18}
                          className="text-orange-600"
                        />
                      </div>

                      <div>
                        <p className="font-black text-xs uppercase tracking-widest">
                          Customer Login
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                          Login to purchase products
                        </p>
                      </div>
                    </Link>

                    {/* REGISTER */}

                    <Link
                      to="/register"
                      onClick={() =>
                        setIsAccountMenuOpen(false)
                      }
                      className="px-5 py-4 flex items-center gap-3 text-slate-800 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                        <UserPlus
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="font-black text-xs uppercase tracking-widest">
                          Register
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                          Create your customer account
                        </p>
                      </div>
                    </Link>

                    {/* ADMIN LOGIN */}

                    <Link
                      to="/admin-dashboard"
                      onClick={() =>
                        setIsAccountMenuOpen(false)
                      }
                      className="px-5 py-4 flex items-center gap-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                        <LockKeyhole
                          size={18}
                          className="text-slate-700"
                        />
                      </div>

                      <div>
                        <p className="font-black text-xs uppercase tracking-widest">
                          Admin Login
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                          Administrator access
                        </p>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================
          DESKTOP SECONDARY NAVIGATION
      ====================================================== */}

      <div className="hidden lg:block bg-[#020617] border-t border-gray-800/50">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-8 h-12 flex items-center gap-8 relative">

          {/* CATEGORIES */}

          <div
            className="relative h-full flex items-center"
            onMouseEnter={() =>
              setIsCategoryOpen(true)
            }
            onMouseLeave={() =>
              setIsCategoryOpen(false)
            }
          >
            <button className="flex items-center gap-2 text-white font-bold text-[13px] hover:text-orange-500 transition-colors cursor-pointer h-full border-b-2 border-transparent hover:border-orange-500">
              <Menu size={18} />

              All Categories

              <ChevronDown
                size={14}
                className="ml-1 transition-transform"
                style={{
                  transform: isCategoryOpen
                    ? "rotate(180deg)"
                    : "rotate(0)",
                }}
              />
            </button>

            {isCategoryOpen && categories && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-xl z-50 rounded-b-lg overflow-hidden animate-in fade-in duration-200">
                {categories
                  .slice(0, 8)
                  .map((cat) => (
                    <Link
                      key={cat}
                      to={`/shop?category=${encodeURIComponent(
                        cat
                      )}`}
                      onClick={() =>
                        setIsCategoryOpen(false)
                      }
                      className="block px-5 py-3 text-[13px] font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}

                <Link
                  to="/categories"
                  onClick={() =>
                    setIsCategoryOpen(false)
                  }
                  className="block px-5 py-3 text-xs font-black text-center text-blue-600 bg-blue-50 hover:bg-blue-100 uppercase tracking-widest transition-colors"
                >
                  View All Categories →
                </Link>
              </div>
            )}
          </div>

          {/* MAIN NAVIGATION */}

          <nav className="flex items-center h-full gap-8 text-[13px] font-bold text-gray-300">
            <Link
              to="/"
              className="text-white border-b-2 border-orange-500 h-full flex items-center transition-colors"
            >
              Home
            </Link>

            <Link
              to="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>

            <Link
              to="/shop"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>

            <button
              onClick={(e) =>
                handleScrollToSection(
                  e,
                  "brands"
                )
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Brands
            </button>

            <Link
              to="/shop"
              className="hover:text-white transition-colors"
            >
              New Arrivals
            </Link>

            <Link
              to="/bulk"
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              Bulk Enquiries
            </Link>

            <Link
              to="/sell"
              className="hover:text-white transition-colors"
            >
              Sell on Density
            </Link>

            <Link
              to="/about"
              className="hover:text-white transition-colors"
            >
              About Us
            </Link>

            <button
              onClick={(e) =>
                handleScrollToSection(
                  e,
                  "footer"
                )
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>

      {mobileNavigation}
    </header>
  );
}