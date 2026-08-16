import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flower2, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Send, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';
import { GolarysLogo } from './GolarysLogo';

export const Footer: React.FC = () => {
  const { siteContent, setActiveTab, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('لطفاً یک آدرس ایمیل معتبر وارد کنید.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('ایمیل شما در خبرنامه تخفیف‌ها و نکات باغبانی ثبت شد.', 'success');
  };

  return (
    <footer className="bg-[#172E14] text-stone-300 border-t border-[#2D5A27]/40 relative overflow-hidden">
      {/* Decorative botanical top glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2D5A27]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Trust badges bar */}
      <div className="border-b border-[#2D5A27]/60 py-8 bg-[#1F3F1B]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A27] flex items-center justify-center shrink-0 text-[#D4AF37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">ضمانت شادابی ۷ روزه</h4>
                <p className="text-xs text-stone-400">تضمین طراوت و تعویض بی‌قید و شرط</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A27] flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">ارسال اکسپرس و استاندارد</h4>
                <p className="text-xs text-stone-400">تحویل ۲ ساعته اسنپ و ارسال تیپاکس</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A27] flex items-center justify-center shrink-0 text-[#D4AF37]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">حمایت از هنرمندان و گلفروشان</h4>
                <p className="text-xs text-stone-400">خرید مستقیم از سفالگران و تولیدکنندگان بومی</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A27] flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">طراحی کارت هدیه رایگان</h4>
                <p className="text-xs text-stone-400">نگارش پیام اختصاصی با مهر و موم</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <GolarysLogo size="md" variant="light" />
            </div>

            <p className="text-sm text-stone-300 leading-relaxed max-w-md">
              {siteContent.site.about.story.slice(0, 180)}...
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteContent.site.brand.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2D5A27]/80 hover:bg-[#D4AF37] hover:text-[#172E14] text-white flex items-center justify-center transition-colors"
                title="اینستاگرام گل آریس"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteContent.site.brand.social.telegram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2D5A27]/80 hover:bg-[#D4AF37] hover:text-[#172E14] text-white flex items-center justify-center transition-colors"
                title="کانال تلگرام گل آریس"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links Col */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base border-b border-[#2D5A27] pb-2 font-heading">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => { setActiveTab('marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  بازارچه و محصولات گل
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('handicrafts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer font-bold text-amber-200">
                  صنایع دستی و گلدان‌های هنری 🏺
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('sellers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  ثبت نام فروشندگان و هنرمندان
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  داستان دختر گل و درباره ما
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  مجله آموزشی نگهداری گل و گیاه
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  پنل مدیریت محتوای سایت
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Col */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base border-b border-[#2D5A27] pb-2 font-heading">دسته‌بندی‌ها</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              {siteContent.site.categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <button 
                    onClick={() => {
                      setActiveTab('marketplace');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Col */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-b border-[#2D5A27] pb-2 font-heading">تماس و خبرنامه</h4>
            <div className="space-y-2 text-xs text-stone-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="persian-num">{toPersianDigits(siteContent.site.brand.phone)}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{siteContent.site.brand.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-stone-400 text-[11px] leading-relaxed">
                  {siteContent.site.brand.address || 'تهران، خیابان ولیعصر، برج نیلوفر'}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="flex items-center bg-[#2D5A27]/50 rounded-xl p-1 border border-[#2D5A27] focus-within:border-[#D4AF37]">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="ایمیل شما جهت تخفیف‌ها..."
                  className="w-full bg-transparent px-2.5 py-1.5 text-xs text-white placeholder-stone-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#BF9B2D] text-[#172E14] font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  {subscribed ? <CheckCircle2 className="w-4 h-4" /> : 'عضویت'}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-[#2D5A27]/50 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {toPersianDigits('1403')} تمامی حقوق برای بازار آنلاین گل و گیاه <strong>{siteContent.site.brand.name_fa} ({siteContent.site.brand.name_en})</strong> محفوظ است.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>طراحی با عشق به طبیعت و گل‌های ایران 🌸</span>
            <span>نسخه ZIP-Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
