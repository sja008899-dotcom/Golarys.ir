import React, { useEffect } from 'react';
import { ActiveTab, Product } from '../types';

interface SEOHeadProps {
  activeTab: ActiveTab;
  selectedProduct?: Product | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ activeTab, selectedProduct }) => {
  useEffect(() => {
    // 1. Dynamic Title & Description configuration for high SEO ranking
    let pageTitle = 'گل آریس (Golarys) | بازار آنلاین خرید گل تازه، گیاهان آپارتمانی و صنایع دستی';
    let metaDescription = 'خرید آنلاین انواع گل تازه شاخه بریده، دسته گل رز هلندی، گیاهان آپارتمانی مقاوم، باکس هدیه لوکس و صنایع دستی سرامیکی لالجین با ارسال فوری و تضمین شادابی ۷ روزه.';
    let canonicalUrl = 'https://golarys.ir/';

    if (selectedProduct) {
      pageTitle = `خرید ${selectedProduct.name} (${selectedProduct.nameEn}) | گل آریس`;
      metaDescription = `${selectedProduct.description} - قیمت: ${selectedProduct.price.toLocaleString('fa-IR')} تومان. ارسال فوری با بسته‌بندی هدیه و ضمانت شادابی.`;
      canonicalUrl = `https://golarys.ir/product/${selectedProduct.slug}`;
    } else {
      switch (activeTab) {
        case 'marketplace':
          pageTitle = 'بازارچه آنلاین گل تازه و گیاهان آپارتمانی | گل آریس (Golarys)';
          metaDescription = 'خرید مستقیم انواع دسته گل رز، ارکیده، گیاهان آپارتمانی تصفیه‌کننده هوا و باکس گل لوکس با ارسال روزانه و کارت تبریک اختصاصی.';
          canonicalUrl = 'https://golarys.ir/marketplace';
          break;
        case 'handicrafts':
          pageTitle = 'خرید گلدان‌های دست‌ساز سرامیکی، سفال لالجین و صنایع دستی | گل آریس';
          metaDescription = 'انواع گلدان سفالی و سرامیکی هنر دست لالجین همدان، آویزهای مکرومه‌بافی پنبه‌ای و گلدان‌های مسی چکشی شیراز با بسته‌بندی ضدضربه.';
          canonicalUrl = 'https://golarys.ir/handicrafts';
          break;
        case 'sellers':
          pageTitle = 'همکاری و ثبت نام گلفروشان و باغبانان خانگی | گل آریس';
          metaDescription = 'فروشگاه گل و گیاه خود را آنلاین کنید. دسترسی به خریداران سراسر کشور بدون کارمزد ماه اول و تسویه حساب روزانه در گل آریس.';
          canonicalUrl = 'https://golarys.ir/sellers';
          break;
        case 'about':
          pageTitle = 'داستان شکل‌گیری گل آریس و دختر گل | درباره ما';
          metaDescription = 'آشنایی با ارزش‌ها، ماموریت و چشم‌انداز گل آریس در حمایت از تولیدکنندگان بومی، بانوان سرپرست خانوار و محیط زیست.';
          canonicalUrl = 'https://golarys.ir/about';
          break;
        case 'blog':
          pageTitle = 'مجله گل و گیاه و راهنمای نگهداری گیاهان | وبلاگ گل آریس';
          metaDescription = 'آموزش‌های تخصصی آبیاری، تعویض خاک، نور مناسب گیاهان آپارتمانی، نمادشناسی گل‌ها و دکوراسیون با گل‌های طبیعی.';
          canonicalUrl = 'https://golarys.ir/blog';
          break;
        case 'contact':
          pageTitle = 'تماس با ما و مشاوره رایگان انتخاب گل | گل آریس';
          metaDescription = 'پشتیبانی ۲۴ ساعته تلفنی و آنلاین، آدرس دفاتر گل آریس در تهران و ثبت سفارش‌های سازمانی و تشریفات.';
          canonicalUrl = 'https://golarys.ir/contact';
          break;
        case 'admin':
          pageTitle = 'پنل مدیریت محتوا و تنظیمات Decap CMS | گل آریس';
          break;
        default:
          break;
      }
    }

    // Apply document title
    document.title = pageTitle;

    // Apply meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', metaDescription);
    }

    // Apply OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDescription);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    // Apply canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalUrl);
    }
  }, [activeTab, selectedProduct]);

  return null;
};
