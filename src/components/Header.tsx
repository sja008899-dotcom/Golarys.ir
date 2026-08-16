import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Store, 
  Sparkles, 
  SlidersHorizontal, 
  ShieldCheck,
  Phone,
  Heart,
  Flower2
} from 'lucide-react';
import { ActiveTab } from '../types';
import { toPersianDigits } from '../lib/formatters';

export const Header: React.FC = () => {
  const { 
    siteContent, 
    activeTab, 
    setActiveTab, 
    cart, 
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    language,
    setLanguage
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: { id: ActiveTab; labelFa: string; labelEn: string }[] = [
    { id: 'home', labelFa: 'خانه', labelEn: 'Home' },
    { id: 'marketplace', labelFa: 'بازارچه گل و گیاه', labelEn: 'Marketplace' },
    { id: 'sellers', labelFa: 'برای فروشندگان', labelEn: 'For Sellers' },
    { id: 'about', labelFa: 'درباره ما', labelEn: 'About Us' },
    { id: 'blog', labelFa: 'مجله گل و گیاه', labelEn: 'Flower Magazine' },
    { id: 'contact', labelFa: 'تماس با ما', labelEn: 'Contact' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#1F3F1B] text-[#FAF0E6] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#D4AF37] text-[#1F3F1B] font-bold px-2 py-0.5 rounded-full text-[11px]">
              <Sparkles className="w-3 h-3" />
              تخفیف بهاره
            </span>
            <span className="hidden sm:inline text-stone-200">
              ارسال فوری ۲ ساعته در تهران با اسنپ | ۵٪ تخفیف اولین خرید با کد: <strong className="text-[#D4AF37]">GOLARYS5</strong>
            </span>
            <span className="sm:hidden text-stone-200">ارسال ۲ ساعته با اسنپ | تخفیف اولین خرید</span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <a 
              href={`tel:${siteContent.site.brand.phone}`}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span className="persian-num">{toPersianDigits(siteContent.site.brand.phone)}</span>
            </a>
            <span className="text-stone-500">|</span>
            <button
              onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')}
              className="hover:text-white text-[11px] font-medium tracking-wide flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{language === 'fa' ? 'English (EN)' : 'فارسی (FA)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2D5A27] to-[#1F3F1B] p-0.5 shadow-md flex items-center justify-center text-white ring-2 ring-[#D4AF37]/30 group hover:scale-105 transition-transform">
              <Flower2 className="w-7 h-7 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-[#2D5A27] font-heading">
                  {siteContent.site.brand.name_fa}
                </span>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#2D5A27]/5 px-1.5 py-0.5 rounded border border-[#D4AF37]/30">
                  {siteContent.site.brand.name_en}
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium tracking-tight">
                {siteContent.site.brand.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-[#2D5A27] bg-[#2D5A27]/8 font-bold'
                      : 'text-stone-600 hover:text-[#2D5A27] hover:bg-stone-100/70'
                  }`}
                >
                  {language === 'fa' ? item.labelFa : item.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2D5A27] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search trigger */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-stone-100 rounded-xl px-3 py-1.5 border border-stone-300 focus-within:ring-2 focus-within:ring-[#2D5A27]/30 w-48 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-stone-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeTab !== 'marketplace') setActiveTab('marketplace');
                    }}
                    placeholder="جستجوی گل، رز، ارکیده..."
                    className="w-full bg-transparent border-0 text-xs px-2 focus:outline-hidden text-stone-800"
                    autoFocus
                  />
                  <button 
                    onClick={() => setShowSearchInput(false)}
                    className="text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2.5 rounded-xl text-stone-600 hover:text-[#2D5A27] hover:bg-stone-100 cursor-pointer transition-colors"
                  title="جستجو در محصولات"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Vendor Join quick CTA */}
            <button
              onClick={() => handleNavClick('sellers')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-[#2D5A27]/30 text-[#2D5A27] hover:bg-[#2D5A27]/5 cursor-pointer transition-colors"
            >
              <Store className="w-4 h-4 text-[#D4AF37]" />
              <span>فروشنده شوید</span>
            </button>

            {/* CMS / Admin panel toggle button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                activeTab === 'admin'
                  ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                  : 'text-stone-600 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
              }`}
              title="پنل مدیریت محتوای سایت (Decap CMS)"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden md:inline">مدیریت محتوا</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white rounded-xl shadow-xs hover:shadow-md cursor-pointer transition-all flex items-center justify-center group"
              aria-label="سبد خرید"
            >
              <ShoppingBag className="w-5 h-5 text-[#FAF0E6] group-hover:scale-110 transition-transform" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#1F3F1B] font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-bounce">
                  {toPersianDigits(totalCartItems)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-stone-700 hover:bg-stone-100 cursor-pointer"
              aria-label="منوی سایت"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-right px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#2D5A27] text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{language === 'fa' ? item.labelFa : item.labelEn}</span>
                {activeTab === item.id && <span className="text-xs text-[#D4AF37]">● فعال</span>}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('sellers')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D5A27]/10 text-[#2D5A27] font-bold text-sm cursor-pointer"
              >
                <Store className="w-4 h-4 text-[#D4AF37]" />
                <span>ثبت نام گلفروشی و پرورش‌دهنده خانگی</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-300 text-stone-700 font-semibold text-sm cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                <span>ورود به پنل مدیریت و ویرایشگر زنده سایت</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
