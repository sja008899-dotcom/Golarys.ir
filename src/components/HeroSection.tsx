import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Heart, 
  Store, 
  Star,
  Clock
} from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';

export const HeroSection: React.FC = () => {
  const { siteContent, setActiveTab, setSelectedCategory } = useApp();
  const { hero } = siteContent.site;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9F5] to-[#FCFCFA] py-10 md:py-16 border-b border-stone-200/60">
      {/* Decorative ambient background elements */}
      <div className="absolute top-10 -right-20 w-80 h-80 bg-[#2D5A27]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column (Text & CTAs in RTL) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-[#2D5A27]/10 text-[#2D5A27] px-4 py-1.5 rounded-full text-xs font-bold border border-[#2D5A27]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>بازار آنلاین گلفروشان محلی و پرورش‌دهندگان خانگی ایران</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#1F3F1B] leading-tight font-heading">
              {hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              {hero.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('marketplace');
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#2D5A27]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>{hero.cta_primary}</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-[#2D5A27] font-bold text-sm sm:text-base border border-stone-300 hover:border-[#2D5A27]/40 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{hero.cta_secondary}</span>
              </button>

              <button
                onClick={() => setActiveTab('sellers')}
                className="px-4 py-3 rounded-2xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#1F3F1B] font-bold text-xs sm:text-sm border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Store className="w-4 h-4 text-[#D4AF37]" />
                <span>فروشنده هستید؟ عضو شوید</span>
              </button>
            </div>

            {/* Fast Category Quick-Tags */}
            <div className="pt-4 border-t border-stone-200/80">
              <span className="text-xs text-stone-500 font-semibold block mb-2.5">
                محبوب‌ترین دسته‌ها برای سفارش امروز:
              </span>
              <div className="flex flex-wrap gap-2">
                {siteContent.site.categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setActiveTab('marketplace');
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#2D5A27] hover:text-white text-stone-700 border border-stone-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-white/80 p-3 rounded-2xl border border-stone-200/80 text-center">
                <span className="block text-xl font-black text-[#2D5A27] font-heading">
                  +{toPersianDigits(500)}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">گلفروش محلی و خانگی</span>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-stone-200/80 text-center">
                <span className="block text-xl font-black text-[#2D5A27] font-heading">
                  {toPersianDigits(2)} ساعته
                </span>
                <span className="text-[11px] text-stone-500 font-medium">تحویل اکسپرس اسنپ</span>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-stone-200/80 text-center">
                <span className="block text-xl font-black text-[#2D5A27] font-heading">
                  {toPersianDigits(7)} روز
                </span>
                <span className="text-[11px] text-stone-500 font-medium">ضمانت شادابی کامل</span>
              </div>
            </div>

          </div>

          {/* Left Column (Hero Image & Floating Highlights) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-stone-900/10 aspect-4/3 lg:aspect-4/4 group">
                <img
                  src={hero.image}
                  alt={hero.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <div className="flex items-center gap-1 text-[#D4AF37] mb-1">
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <span className="text-xs text-white mr-1 font-bold">۵.۰ (بیش از ۱۲۰۰ نظر)</span>
                  </div>
                  <p className="text-sm font-bold">دسته‌گل‌های دست‌چین با کارت پستال دست‌نویس</p>
                </div>
              </div>

              {/* Floating Top-Left Card: 2-Hour Delivery */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-800">تحویل اکسپرس ۲ ساعته</span>
                  <span className="text-[11px] text-stone-500">ارسال با ناوگان اسنپ‌باکس</span>
                </div>
              </div>

              {/* Floating Bottom-Right Card: Direct Home Grower */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-800">تضمین ۱۰۰٪ تازگی گل</span>
                  <span className="text-[11px] text-[#2D5A27] font-semibold">مستقیم از پرورش‌دهنده</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
