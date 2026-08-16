import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SiteContent, ActiveTab, BlogPost } from '../types';
import { initialSiteContent, sampleProducts, sampleBlogPosts } from '../data/initialContent';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  siteContent: SiteContent;
  updateSiteContent: (newContent: SiteContent) => void;
  resetSiteContent: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, giftMessage?: string, recipient?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  updateCartGiftCard: (productId: string, message: string, recipient: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedBlogArticle: BlogPost | null;
  setSelectedBlogArticle: (post: BlogPost | null) => void;
  isGiftBuilderOpen: boolean;
  setIsGiftBuilderOpen: (open: boolean) => void;
  language: 'fa' | 'en';
  setLanguage: (lang: 'fa' | 'en') => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_CONTENT_KEY = 'golarys_site_content_v1';
const LOCAL_STORAGE_CART_KEY = 'golarys_cart_v1';
const LOCAL_STORAGE_PRODUCTS_KEY = 'golarys_products_v1';
const LOCAL_STORAGE_BLOG_KEY = 'golarys_blog_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore error
    }
    return initialSiteContent;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return sampleProducts;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BLOG_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return sampleBlogPosts;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedBlogArticle, setSelectedBlogArticle] = useState<BlogPost | null>(null);
  const [isGiftBuilderOpen, setIsGiftBuilderOpen] = useState(false);
  const [language, setLanguage] = useState<'fa' | 'en'>('fa');
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(siteContent));
    } catch {
      // ignore
    }
  }, [siteContent]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(blogPosts));
    } catch {
      // ignore
    }
  }, [blogPosts]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D5A27', '#D4AF37', '#E53E3E', '#F6E05E', '#38A169']
      });
    } catch {
      // fallback
    }
  };

  const updateSiteContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
    showToast('محتوای سایت با موفقیت بروزرسانی و ذخیره شد!', 'success');
  };

  const resetSiteContent = () => {
    setSiteContent(initialSiteContent);
    setProducts(sampleProducts);
    setBlogPosts(sampleBlogPosts);
    showToast('محتوای سایت به حالت اولیه بازگردانی شد.', 'info');
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`محصول «${newProduct.name}» با موفقیت اضافه شد.`, 'success');
  };

  const addBlogPost = (newPost: BlogPost) => {
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast(`مقاله «${newPost.title}» در بلاگ منتشر شد.`, 'success');
  };

  const addToCart = (product: Product, quantity = 1, giftMessage?: string, recipient?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (giftMessage) updated[existingIndex].giftCardMessage = giftMessage;
        if (recipient) updated[existingIndex].giftCardRecipient = recipient;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          giftCardMessage: giftMessage,
          giftCardRecipient: recipient,
          giftCardTheme: 'classic_gold'
        }
      ];
    });
    showToast(`«${product.name}» به سبد خرید اضافه شد.`, 'success');
    triggerCelebration();
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('آیتم از سبد خرید حذف شد.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateCartGiftCard = (productId: string, message: string, recipient: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, giftCardMessage: message, giftCardRecipient: recipient }
          : item
      )
    );
    showToast('پیام کارت هدیه اختصاصی برای این گل ثبت شد.', 'success');
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        siteContent,
        updateSiteContent,
        resetSiteContent,
        products,
        addProduct,
        blogPosts,
        addBlogPost,
        activeTab,
        setActiveTab,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartGiftCard,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        selectedBlogArticle,
        setSelectedBlogArticle,
        isGiftBuilderOpen,
        setIsGiftBuilderOpen,
        language,
        setLanguage,
        toasts,
        showToast,
        triggerCelebration
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
