"use client";

import {
  Search,
  User,
  ShoppingCart,
  Menu,
  Star,
  ArrowRight,
  X,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import AdminLoginModal from "./AdminLoginModal";
import {
  ShopPage,
  DealsPage,
  HowToBuyPage,
  ContactUsPage,
  HelpCenterPage,
} from "./PageSections";

const CategoryCarousel = ({ category, products, currentIndex, onIndexChange, addToCart, addedToCart }: any) => {
  const displayProducts = products.slice(0, 8);

  useEffect(() => {
    if (products.length <= 4) return;
    const timer = setInterval(() => {
      const nextIndex = currentIndex + 2 >= products.length ? 0 : currentIndex + 2;
      onIndexChange(nextIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, products.length, onIndexChange]);

  const handleCategoryNavigation = (direction: "left" | "right") => {
    const nextIndex = direction === "right" ? currentIndex + 2 >= products.length ? 0 : currentIndex + 2 : currentIndex - 2 < 0 ? Math.max(0, products.length - 2) : currentIndex - 2;
    onIndexChange(nextIndex);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{category.name}</h2>
        <div className="flex gap-2">
          <button onClick={() => handleCategoryNavigation("left")} className="w-8 h-8 bg-gray-100 hover:bg-[#ca0408] hover:text-white text-gray-700 rounded-full flex items-center justify-center transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => handleCategoryNavigation("right")} className="w-8 h-8 bg-gray-100 hover:bg-[#ca0408] hover:text-white text-gray-700 rounded-full flex items-center justify-center transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-4 transition-transform duration-1000" style={{ transform: `translateX(-${(currentIndex / products.length) * 100}%)` }}>
          {displayProducts.map((product: any, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden relative flex flex-col group hover:shadow-lg transition-all"
              style={{ minWidth: window.innerWidth >= 1024 ? "calc(25% - 12px)" : window.innerWidth >= 768 ? "calc(33.333% - 10px)" : "calc(50% - 8px)" }}
            >
              {product.discount && (
                <div className="absolute top-2 left-2 bg-[#ca0408] text-white text-xs font-bold px-2 py-1 rounded-lg z-10">{product.discount} OFF</div>
              )}
              {!product.inStock && (
                <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">OUT OF STOCK</div>
              )}
              <div className="aspect-square overflow-hidden bg-gray-50">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                )}
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base font-bold text-[#ca0408]">{product.price} RWF</span>
                  {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full text-white text-xs font-semibold py-2.5 rounded-lg transition-all mt-auto ${
                    addedToCart === product.id ? "bg-green-600" : product.inStock ? "bg-[#ca0408] hover:bg-[#9D0208]" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {addedToCart === product.id ? "✓ ADDED" : product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EcommerceHomepage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "summary" | "billing" | "payment"
  >("cart");
  const [shippingMethod, setShippingMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [billingData, setBillingData] = useState({
    fullName: "",
    country: "Rwanda",
    address: "Kigali Rwanda",
    neighborhood: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const savedBillingData = localStorage.getItem("billingData");
    if (savedBillingData) {
      setBillingData(JSON.parse(savedBillingData));
    }
  }, []);
  const [activePage, setActivePage] = useState("home");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: "",
    inStock: false,
  });
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroProduct, setHeroProduct] = useState(null);
  const [banners, setBanners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryCarouselIndex, setCategoryCarouselIndex] = useState<{
    [key: string]: number;
  }>({});
  const [latestProductsIndex, setLatestProductsIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllMobileFilters, setShowAllMobileFilters] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [helpMessage, setHelpMessage] = useState("");
  const [sidebarBannerIndices, setSidebarBannerIndices] = useState([
    0, 1, 2, 3, 4, 5,
  ]);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; product?: any }>({ show: false, message: "" });
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  useEffect(() => {
    if (isUserScrolling) return;

    const timer = setInterval(() => {
      setCurrentSectionIndex((prev) => {
        const next = prev + 1;
        if (next % 10 === 0) {
          setTimeout(() => setCurrentSectionIndex(0), 50);
          return 9;
        }
        return next;
      });
    }, 15000);

    return () => clearInterval(timer);
  }, [isUserScrolling]);

  useEffect(() => {
    const sidebarBanners = banners.filter(
      (b) => b.position === "sidebar1" || b.position === "sidebar2",
    );
    if (sidebarBanners.length <= 6) return;

    const timer = setInterval(() => {
      setSidebarBannerIndices((prev) =>
        prev.map((idx, position) => {
          if (sidebarBanners.length > 6 + position) {
            return (idx + 1) % sidebarBanners.length;
          }
          return idx;
        }),
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [banners]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
        const scrollContainer = document.querySelector(
          "[data-scroll-container]",
        );
        if (scrollContainer) {
          scrollContainer.scrollTop = 0;
        }
      }, 3000);
    };

    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, []);

  const shuffleArray = (array: any[]) => {
    return [...array];
  };

  useEffect(() => {
    const cached = localStorage.getItem("shopData");
    if (cached) {
      const data = JSON.parse(cached);
      setProducts(data.products);
      setAllProducts(data.products);
      setCategories(data.categories);
      setBrands(data.brands);
      if (data.products.length > 0) {
        const inStock = data.products.filter((p: any) => p.inStock);
        setHeroProduct(inStock[0] || data.products[0]);
      }
    }

    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, brandsRes, bannersRes] =
          await Promise.all([
            fetch("/api/products"),
            fetch("/api/categories"),
            fetch("/api/brands"),
            fetch("/api/promo-banners"),
          ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        const brandsData = await brandsRes.json();
        const bannersData = await bannersRes.json();

        if (
          Array.isArray(productsData) &&
          Array.isArray(categoriesData) &&
          Array.isArray(brandsData) &&
          Array.isArray(bannersData)
        ) {
          localStorage.setItem(
            "shopData",
            JSON.stringify({
              products: productsData,
              categories: categoriesData,
              brands: brandsData,
              banners: bannersData,
            }),
          );

          setProducts(productsData);
          setAllProducts(productsData);
          setCategories(categoriesData);
          setBrands(brandsData);
          setBanners(bannersData);

          if (productsData.length > 0) {
            const inStock = productsData.filter((p: any) => p.inStock);
            setHeroProduct(inStock[0] || productsData[0]);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    setAddedToCart(product.id);
    setToast({ show: true, message: "Added to cart!", product });
    setTimeout(() => {
      setAddedToCart(null);
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getShippingFee = () => (shippingMethod === "delivery" ? 1000 : 0);

  const sendHelpMessage = () => {
    const message = encodeURIComponent(helpMessage);
    window.open(`https://wa.me/250785941195?text=${message}`, "_blank");
    setHelpMessage("");
    setIsHelpCenterOpen(false);
  };

  const sendWhatsAppOrder = () => {
    localStorage.setItem("billingData", JSON.stringify(billingData));

    
    const items = cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ${item.price * item.quantity} RWF`,
      )
      .join("%0A");

    const message = `*New Order*%0A%0A*Customer Details:*%0AName: ${billingData.fullName}%0APhone: ${billingData.phone}%0AEmail: ${billingData.email}%0AAddress: ${billingData.address}%0ANeighborhood: ${billingData.neighborhood || "N/A"}%0A%0A*Order Items:*%0A${items}%0A%0A*Order Summary:*%0ASubtotal: ${getTotal()} RWF%0AShipping: ${getShippingFee()} RWF%0ATotal: ${getTotal() + getShippingFee()} RWF%0A%0AShipping Method: ${shippingMethod === "delivery" ? "Delivery" : "In-store Pickup"}`;

    window.open(`https://wa.me/250785941195?text=${message}`, "_blank");
    setCheckoutStep("payment");
  };

  const handleNavigateSection = (direction: "up" | "down") => {
    setIsUserScrolling(true);
    setCurrentSectionIndex((prev) =>
      direction === "down" ? prev + 1 : Math.max(0, prev - 1),
    );
    setTimeout(() => setIsUserScrolling(false), 3000);
  };

  const handleFilterChange = (type: string, value: any) => {
    let newFilters = { ...filters };

    if (type === "category") {
      const cats = filters.categories.includes(value)
        ? filters.categories.filter((c) => c !== value)
        : [...filters.categories, value];
      newFilters = { ...filters, categories: cats };
    }

    if (type === "brand") {
      const brds = filters.brands.includes(value)
        ? filters.brands.filter((b) => b !== value)
        : [...filters.brands, value];
      newFilters = { ...filters, brands: brds };
    }

    if (type === "price")
      newFilters = {
        ...filters,
        priceRange: filters.priceRange === value ? "" : value,
      };
    if (type === "stock")
      newFilters = { ...filters, inStock: !filters.inStock };

    setFilters(newFilters);
    applyAllFilters(newFilters, searchQuery);
  };

  const applyAllFilters = (currentFilters = filters, query = searchQuery) => {
    let filtered = [...allProducts];

    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (currentFilters.categories.length) {
      filtered = filtered.filter((p) =>
        currentFilters.categories.includes(p.category),
      );
    }

    if (currentFilters.brands.length) {
      filtered = filtered.filter((p) =>
        currentFilters.brands.includes(p.brand),
      );
    }

    if (currentFilters.priceRange) {
      const max =
        currentFilters.priceRange === "50"
          ? 50000
          : currentFilters.priceRange === "100"
            ? 100000
            : currentFilters.priceRange === "200"
              ? 200000
              : currentFilters.priceRange === "500"
                ? 500000
                : 1000000;
      filtered = filtered.filter((p) => p.price <= max);
    }

    if (currentFilters.inStock) {
      filtered = filtered.filter((p) => p.inStock);
    }

    setProducts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyAllFilters(filters, query);
  };

  const applyFilters = () => {
    applyAllFilters(filters, searchQuery);
  };

  const clearFilters = () => {
    setFilters({ categories: [], brands: [], priceRange: "", inStock: false });
    setSearchQuery("");
    setProducts(allProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-3 py-3 sm:px-6 lg:px-8 shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Gosolar Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">Gosolar</h1>
          </div>

          <div className="flex-1 max-w-xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 sm:h-11 bg-gray-50 border border-gray-200 rounded-lg px-4 pr-10 text-sm text-gray-900 outline-none focus:border-[#ca0408] focus:ring-1 focus:ring-[#ca0408] transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-3">
            <div onClick={() => setIsAdminLoginOpen(true)} className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </div>
            <div onClick={() => setIsCartOpen(true)} className="relative w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cart.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#ca0408] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{cart.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-white px-3 py-2 sm:px-6 lg:px-8 sticky top-[52px] sm:top-[60px] z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:flex items-center gap-8 mx-auto">
            {["Home", "Shop", "Deals", "How to Buy", "Contact Us"].map((item) => (
              <div
                key={item}
                onClick={() => setActivePage(item.toLowerCase().replace(/ /g, "-"))}
                className={`text-sm font-medium cursor-pointer transition-all py-2 ${
                  activePage === item.toLowerCase().replace(/ /g, "-")
                    ? "text-[#ca0408] border-b-2 border-[#ca0408]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex lg:hidden items-center gap-4 mx-auto">
            {["Home", "Shop", "Deals"].map((item) => (
              <div
                key={item}
                onClick={() => setActivePage(item.toLowerCase().replace(/ /g, "-"))}
                className={`text-xs font-medium cursor-pointer py-2 ${
                  activePage === item.toLowerCase().replace(/ /g, "-")
                    ? "text-[#ca0408] border-b-2 border-[#ca0408]"
                    : "text-gray-600"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div onClick={() => setIsHelpCenterOpen(true)} className="hidden lg:block text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer py-2 transition-colors">
            Help Center
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 space-y-1 border-t border-gray-100 pt-2">
            {["How to Buy", "Contact Us", "Help Center"].map((item) => (
              <div
                key={item}
                onClick={() => {
                  if (item === "Help Center") setIsHelpCenterOpen(true);
                  else setActivePage(item.toLowerCase().replace(/ /g, "-"));
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-gray-600 py-2 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Page Content */}
      {activePage !== "home" && (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
          {activePage === "shop" && <ShopPage />}
          {activePage === "deals" && (
            <DealsPage onNavigateHome={() => setActivePage("home")} />
          )}
          {activePage === "how-to-buy" && <HowToBuyPage />}
          {activePage === "contact-us" && <ContactUsPage />}
        </div>
      )}

      {/* Help Center Modal */}
      {isHelpCenterOpen && (
        <div
          onClick={() => setIsHelpCenterOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl w-full max-w-md p-4 sm:p-5 lg:p-6 m-3 sm:m-4"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#233D4C]">
                Help Center
              </h2>
              <X
                onClick={() => setIsHelpCenterOpen(false)}
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 cursor-pointer hover:text-[#ca0408]"
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-lg mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-[#233D4C]">
                    Message us on WhatsApp
                  </h3>
                  <p className="text-xs text-gray-600">
                    We'll respond as soon as possible
                  </p>
                </div>
              </div>
              <label className="block text-xs sm:text-sm font-medium text-[#233D4C] mb-2">
                Your Message
              </label>
              <textarea
                value={helpMessage}
                onChange={(e) => setHelpMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={5}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm resize-none focus:outline-none focus:border-[#ca0408]"
              />
            </div>
            <button
              onClick={sendHelpMessage}
              disabled={!helpMessage.trim()}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm sm:text-base font-bold py-2.5 sm:py-3 rounded-lg cursor-pointer transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Send Message
            </button>
          </div>
        </div>
      )}

      {activePage === "home" && (
        <>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                    Quality Products,
                    <span className="text-[#ca0408] block">Unbeatable Prices</span>
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                    Discover amazing deals on electronics, fashion, home essentials and more. Fast delivery across Kigali.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <button onClick={() => setActivePage("shop")} className="bg-[#ca0408] hover:bg-[#9D0208] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl">
                      Shop Now
                    </button>
                    <button onClick={() => setActivePage("deals")} className="bg-white hover:bg-gray-50 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base border-2 border-gray-200 transition-all">
                      View Deals
                    </button>
                  </div>
                  <div className="mt-8 sm:mt-12 flex items-center gap-6 sm:gap-8 justify-center lg:justify-start">
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900">{products.length}+</div>
                      <div className="text-xs sm:text-sm text-gray-600">Products</div>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900">5.0</div>
                      <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Rating
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900">24/7</div>
                      <div className="text-xs sm:text-sm text-gray-600">Support</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  {banners.filter((b) => b.position === "hero").length > 0 ? (
                    <img
                      src={banners.filter((b) => b.position === "hero")[0].imageUrl}
                      alt={banners.filter((b) => b.position === "hero")[0].title}
                      className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                    />
                  ) : heroProduct ? (
                    <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                        {heroProduct.imageUrl ? (
                          <img src={heroProduct.imageUrl} alt={heroProduct.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{heroProduct.name}</h3>
                      <p className="text-2xl font-bold text-[#ca0408] mb-4">{heroProduct.price} RWF</p>
                      <button onClick={() => addToCart(heroProduct)} className="w-full bg-[#ca0408] hover:bg-[#9D0208] text-white py-3 rounded-lg font-semibold transition-all">
                        Add to Cart
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden px-4 py-3 bg-white sticky top-[96px] sm:top-[104px] z-40 border-b border-gray-100">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(showAllMobileFilters ? categories : categories.slice(0, 5)).map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleFilterChange("category", cat.name)}
                  className={`flex-shrink-0 py-2 px-4 text-xs font-medium cursor-pointer whitespace-nowrap rounded-full transition-all ${
                    filters.categories.includes(cat.name)
                      ? "bg-[#ca0408] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </div>
              ))}

              {(showAllMobileFilters ? brands : brands.slice(0, 5)).map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => handleFilterChange("brand", brand.name)}
                  className={`flex-shrink-0 py-2 px-4 text-xs font-medium cursor-pointer whitespace-nowrap rounded-full transition-all ${
                    filters.brands.includes(brand.name)
                      ? "bg-[#ca0408] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {brand.name}
                </div>
              ))}

              <div
                onClick={() => handleFilterChange("stock", true)}
                className={`flex-shrink-0 py-2 px-4 text-xs font-medium cursor-pointer whitespace-nowrap rounded-full transition-all ${
                  filters.inStock
                    ? "bg-[#ca0408] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                In Stock
              </div>

              {!showAllMobileFilters && (
                <div onClick={() => setShowAllMobileFilters(true)} className="flex-shrink-0 py-2 px-4 bg-gray-100 text-gray-700 text-xs font-medium cursor-pointer whitespace-nowrap rounded-full hover:bg-gray-200 transition-all">
                  More +
                </div>
              )}

              {showAllMobileFilters && (
                <div onClick={() => setShowAllMobileFilters(false)} className="flex-shrink-0 py-2 px-4 bg-gray-100 text-gray-700 text-xs font-medium cursor-pointer whitespace-nowrap rounded-full hover:bg-gray-200 transition-all">
                  Less -
                </div>
              )}
            </div>
            <button onClick={clearFilters} className="mt-2 text-xs text-[#ca0408] font-semibold hover:underline">
              Clear All
            </button>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex gap-6 lg:gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">FILTERS</h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(cat.name)}
                          onChange={() => handleFilterChange("category", cat.name)}
                          className="w-4 h-4 cursor-pointer accent-[#ca0408] rounded"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {["Under 50,000 RWF", "Under 100,000 RWF", "Under 200,000 RWF", "Under 500,000 RWF", "Under 1,000,000 RWF"].map((price, idx) => {
                      const val = ["50", "100", "200", "500", "1000"][idx];
                      return (
                        <label key={val} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="priceRange"
                            checked={filters.priceRange === val}
                            onChange={() => handleFilterChange("price", val)}
                            className="w-4 h-4 cursor-pointer accent-[#ca0408]"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-gray-900">{price}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Brands</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand.name)}
                          onChange={() => handleFilterChange("brand", brand.name)}
                          className="w-4 h-4 cursor-pointer accent-[#ca0408] rounded"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Availability</h4>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={() => handleFilterChange("stock", true)}
                      className="w-4 h-4 cursor-pointer accent-[#ca0408] rounded"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">In Stock</span>
                  </label>
                </div>
              </div>

              {(() => {
                const sidebarBanners = banners.filter((b) => b.position === "sidebar1" || b.position === "sidebar2");
                if (sidebarBanners.length === 0) return null;
                return [4, 5].map((pos) => {
                  const bannerIdx = sidebarBannerIndices[pos] % sidebarBanners.length;
                  const banner = sidebarBanners[bannerIdx];
                  if (!banner) return null;
                  return <img key={pos} src={banner.imageUrl} alt={banner.title} className="w-full h-auto rounded-xl shadow-sm" />;
                });
              })()}
            </div>

            {/* Products Grid */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse border border-gray-100">
                      <div className="aspect-square bg-gray-200" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 w-3/4 rounded" />
                        <div className="h-4 bg-gray-200 w-1/2 rounded" />
                        <div className="h-8 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-8 flex-1 overflow-hidden">
                    {!showMoreCategories && (
                      <CategoryCarousel
                        category={{ id: "latest", name: "Latest Products" }}
                        products={products.slice(0, 8)}
                        currentIndex={latestProductsIndex}
                        onIndexChange={setLatestProductsIndex}
                        addToCart={addToCart}
                        addedToCart={addedToCart}
                      />
                    )}

                    {categories.map((category, idx) => {
                      const categoryProducts = products.filter((p) => p.category === category.name);
                      if (categoryProducts.length === 0) return null;
                      if (!showMoreCategories && idx >= 4) return null;
                      if (showMoreCategories && idx < 4) return null;

                      const currentIndex = categoryCarouselIndex[category.id] || 0;

                      return (
                        <CategoryCarousel
                          key={category.id}
                          category={category}
                          products={categoryProducts}
                          currentIndex={currentIndex}
                          onIndexChange={(idx) => setCategoryCarouselIndex({ ...categoryCarouselIndex, [category.id]: idx })}
                          addToCart={addToCart}
                          addedToCart={addedToCart}
                        />
                      );
                    })}
                  </div>

                  {categories.length > 4 && (
                    <button
                      onClick={() => setShowMoreCategories(!showMoreCategories)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-semibold py-3 rounded-lg transition-colors mt-6"
                    >
                      {showMoreCategories ? "Show Less Categories" : "Show More Categories"}
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Right Sidebar Banners - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0 space-y-6">
              {(() => {
                const sidebarBanners = banners.filter((b) => b.position === "sidebar1" || b.position === "sidebar2");
                if (sidebarBanners.length === 0) return null;
                return [0, 1, 2, 3].map((pos) => {
                  const bannerIdx = sidebarBannerIndices[pos] % sidebarBanners.length;
                  const banner = sidebarBanners[bannerIdx];
                  if (!banner) return null;
                  return <img key={pos} src={banner.imageUrl} alt={banner.title} className="w-full h-auto rounded-xl shadow-sm" />;
                });
              })()}
            </div>
            </div>

            {/* Mobile Sidebar Banners */}
            <div className="lg:hidden mt-6 px-3 sm:px-4 space-y-3">
              {(() => {
                const sidebarBanners = banners.filter(
                  (b) => b.position === "sidebar1" || b.position === "sidebar2",
                );
                if (sidebarBanners.length === 0) return null;

                return sidebarBanners.map((banner, idx) => (
                  <img
                    key={idx}
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-auto object-cover"
                  />
                ));
              })()}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 sm:mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Gosolar Logo" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h3 className="text-lg font-bold">Gosolar</h3>
                  <p className="text-xs text-gray-400">Your Solar Solution</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Quality solar products at unbeatable prices. Fast delivery across Kigali. Your satisfaction is our priority.
              </p>
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">Rated 5.0 Stars</div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <a href="https://maps.app.goo.gl/UpKCmTXuPhvjdSF78" target="_blank" rel="noopener noreferrer" className="text-xs text-[#ca0408] hover:underline">
                  View 50+ Google Reviews
                </a>
              </div>
            </div>

            {/* Branches */}
            <div>
              <h4 className="text-lg font-bold mb-4">Our Branches</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">Nyamirambo</h5>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+250 794 269 385</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>nyamirambo@gosolar.rw</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Gikondo KN119</h5>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+250 794 269 385</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>gikondo@gosolar.rw</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["How to Buy", "Best Sellers", "Deals & Offers", "Track Order", "Help Center"].map((item) => (
                  <a key={item} href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-[#ca0408] transition-all group">
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-[#ca0408] transition-all group">
                  <span className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors">TT</span>
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">TikTok</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-[#ca0408] transition-all group">
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <p className="text-sm text-gray-400">© 2024 Gosolar. All rights reserved.</p>
              <div>
                <p className="text-sm text-gray-400 mb-2">We accept:</p>
                <div className="flex gap-3">
                  <div className="bg-gray-800 rounded px-3 py-1">
                    <span className="text-xs font-bold text-white">MTN MoMo</span>
                  </div>
                  <div className="bg-gray-800 rounded px-3 py-1">
                    <span className="text-xs font-bold text-white">Cash</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Website Made By */}
            <div className="border-t border-gray-800 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <img src="/4ra.png" alt="4KVISION LTD" className="h-16 w-auto object-contain" />
                <div className="text-center md:text-left">
                  <p className="text-sm text-gray-400">Website made by <span className="font-semibold text-white">4KVISION LTD</span></p>
                  <p className="text-xs text-gray-500">KN 84 st Inkurunziza building</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div
          onClick={() => {
            setIsCartOpen(false);
            setCheckoutStep("cart");
          }}
          className="fixed inset-0 bg-black/50 z-50 flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full md:max-w-md bg-white shadow-2xl flex flex-col max-h-screen"
          >
            {/* Cart Header */}
            <div className="bg-[#ca0408] text-white p-4 sm:p-5 lg:p-6 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold">
                {checkoutStep === "cart"
                  ? `Shopping Cart (${cart.length})`
                  : checkoutStep === "summary"
                    ? "Order Summary"
                    : checkoutStep === "billing"
                      ? "Billing Details"
                      : "Payment"}
              </h2>
              <X
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep("cart");
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#FEFACD] cursor-pointer"
              />
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
              {checkoutStep === "cart" && (
                <>
                  <div className="space-y-3 sm:space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-8 sm:py-12">
                        <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                        <p className="text-sm sm:text-base text-gray-500">
                          Your cart is empty
                        </p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded overflow-hidden">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl">
                                📦
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-xs sm:text-sm mb-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                              {item.brand}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 bg-[#ca0408] text-white border-none rounded flex items-center justify-center cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs sm:text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 bg-[#ca0408] text-white border-none rounded flex items-center justify-center cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <span className="font-bold text-xs sm:text-sm text-[#ca0408]">
                              {item.price * item.quantity} RWF
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-transparent border-none cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Subtotal</span>
                        <span className="font-semibold">{getTotal()} RWF</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-600">
                          FREE
                        </span>
                      </div>
                      <div className="border-t pt-2 sm:pt-3 flex justify-between text-base sm:text-lg font-bold">
                        <span>Total</span>
                        <span className="text-[#ca0408]">{getTotal()} RWF</span>
                      </div>
                      <button
                        onClick={() => setCheckoutStep("summary")}
                        className="w-full bg-[#ca0408] text-[#FEFACD] text-sm sm:text-base font-bold py-3 sm:py-4 border-none rounded-lg cursor-pointer mb-2 sm:mb-3"
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="w-full bg-transparent text-[#ca0408] text-xs sm:text-sm font-semibold py-2 sm:py-3 border-2 border-[#ca0408] rounded-lg cursor-pointer"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "summary" && (
                <>
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4">Cart Items</h3>
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm py-2 border-b"
                        >
                          <span>
                            {item.name} (x{item.quantity})
                          </span>
                          <span className="font-semibold">
                            {item.price * item.quantity} RWF
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4">Cart Totals</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span className="font-semibold">{getTotal()} RWF</span>
                      </div>

                      <div className="border-t pt-3">
                        <h4 className="font-semibold mb-3">Shipping</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={shippingMethod === "delivery"}
                              onChange={() => setShippingMethod("delivery")}
                              className="accent-[#ca0408]"
                            />
                            <span className="text-sm">
                              Delivery fees: 1,000 RWF
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={shippingMethod === "pickup"}
                              onChange={() => setShippingMethod("pickup")}
                              className="accent-[#ca0408]"
                            />
                            <span className="text-sm">In store pickup</span>
                          </label>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        Shipping to Kigali Rwanda.{" "}
                        <a href="#" className="text-[#ca0408] underline">
                          Change address
                        </a>
                      </div>

                      <div className="border-t pt-3 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-[#ca0408]">
                          {getTotal() + getShippingFee()} RWF
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep("billing")}
                    className="w-full bg-[#ca0408] text-[#FEFACD] text-base font-bold py-4 border-none rounded-lg cursor-pointer mb-3"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setCheckoutStep("cart")}
                    className="w-full bg-transparent text-[#ca0408] text-sm font-semibold py-3 border-2 border-[#ca0408] rounded-lg cursor-pointer"
                  >
                    Back to Cart
                  </button>
                </>
              )}

              {checkoutStep === "billing" && (
                <>
                  <div className="space-y-4 mb-6">
                    <h3 className="font-bold text-lg">Billing Details</h3>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Names *
                      </label>
                      <input
                        type="text"
                        value={billingData.fullName}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="BIT"
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        value={billingData.country}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            country: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-gray-300 rounded text-sm bg-gray-50"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Kigali Neighborhood *
                      </label>
                      <input
                        type="text"
                        value={billingData.address}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            address: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Neighborhood details (optional)
                      </label>
                      <input
                        type="text"
                        value={billingData.neighborhood}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            neighborhood: e.target.value,
                          })
                        }
                        placeholder="Neighborhood details"
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={billingData.phone}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email address *
                      </label>
                      <input
                        type="email"
                        value={billingData.email}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-base font-bold py-4 border-none rounded-lg cursor-pointer mb-3 transition-colors"
                  >
                    Order via WhatsApp
                  </button>
                  <button
                    onClick={() => setCheckoutStep("summary")}
                    className="w-full bg-transparent text-[#ca0408] text-sm font-semibold py-3 border-2 border-[#ca0408] rounded-lg cursor-pointer"
                  >
                    Back to Summary
                  </button>
                </>
              )}

              {checkoutStep === "payment" && (
                <>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl text-green-600">✓</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#233D4C] mb-2">
                      Order Sent!
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Your order has been sent via WhatsApp
                    </p>

                    <div className="space-y-4 text-left">
                      <h4 className="font-bold text-lg">Payment Methods</h4>

                      <div className="p-4 border-2 border-[#FD802E] rounded-lg bg-orange-50">
                        <h5 className="font-semibold mb-2">MTN MoMo Pay</h5>
                        <p className="text-sm text-gray-600 mb-2">
                          Dial the following code:
                        </p>
                        <code className="block bg-gray-800 text-white p-3 rounded text-sm">
                          *182*8*1*077936*PIN#
                        </code>
                      </div>

                      <div className="p-4 border-2 border-gray-300 rounded-lg">
                        <h5 className="font-semibold mb-2">Cash on Delivery</h5>
                        <p className="text-sm text-gray-600">
                          Pay with cash upon delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep("cart");
                      setCart([]);
                    }}
                    className="w-full bg-[#ca0408] text-[#FEFACD] text-base font-bold py-4 border-none rounded-lg cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-up">
          {toast.product?.imageUrl && (
            <img src={toast.product.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />
          )}
          <div>
            <p className="font-semibold text-sm">{toast.message}</p>
            {toast.product && (
              <p className="text-xs opacity-90">{toast.product.name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceHomepage;
