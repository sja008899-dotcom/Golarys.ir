import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  SlidersHorizontal, 
  Save, 
  RotateCcw, 
  Download, 
  FileCode, 
  Plus, 
  Check, 
  Sparkles, 
  Eye, 
  Copy, 
  Layers, 
  FileText,
  Package,
  Store,
  Flower2
} from 'lucide-react';
import { SiteContent, Product, BlogPost } from '../types';
import { sampleVendors } from '../data/initialContent';

export const AdminPanel: React.FC = () => {
  const { 
    siteContent, 
    updateSiteContent, 
    resetSiteContent, 
    addProduct, 
    addBlogPost, 
    showToast,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'content_editor' | 'add_product' | 'add_blog' | 'decap_cms' | 'zip_builder'>('content_editor');
  
  // Local editable draft for siteContent
  const [draftContent, setDraftContent] = useState<SiteContent>(siteContent);
  const [jsonString, setJsonString] = useState<string>(JSON.stringify(siteContent, null, 2));
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [copied, setCopied] = useState(false);

  // New product form
  const [newProd, setNewProd] = useState({
    name: '',
    nameEn: '',
    categorySlug: 'roses',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: '',
    freshnessGuaranteeDays: 7,
    isBestseller: false,
    size: 'متوسط' as any
  });

  // New blog form
  const [newPost, setNewPost] = useState({
    title: '',
    titleEn: '',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    excerpt: '',
    content: '',
    author: 'کارشناس باغبانی گل آریس',
    tags: 'نگهداری گل, ترفند'
  });

  const handleSaveContent = () => {
    if (isJsonMode) {
      try {
        const parsed = JSON.parse(jsonString);
        updateSiteContent(parsed);
        setDraftContent(parsed);
      } catch (err) {
        showToast('فرمت JSON معتبر نیست. لطفاً کد را بررسی کنید.', 'error');
        return;
      }
    } else {
      updateSiteContent(draftContent);
      setJsonString(JSON.stringify(draftContent, null, 2));
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price || !newProd.description) {
      showToast('لطفاً مشخصات کامل گل را وارد نمایید.', 'error');
      return;
    }

    const created: Product = {
      id: 'p-' + Date.now(),
      name: newProd.name,
      nameEn: newProd.nameEn || newProd.name,
      slug: newProd.name.toLowerCase().replace(/\s+/g, '-'),
      categorySlug: newProd.categorySlug,
      price: Number(newProd.price),
      image: newProd.image,
      description: newProd.description,
      freshnessGuaranteeDays: Number(newProd.freshnessGuaranteeDays),
      vendor: sampleVendors[0],
      inStock: true,
      isBestseller: newProd.isBestseller,
      tags: [newProd.categorySlug, 'گل تازه', 'ارسال روز'],
      size: newProd.size
    };

    addProduct(created);
    setNewProd({
      name: '',
      nameEn: '',
      categorySlug: 'roses',
      price: 950000,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      description: '',
      freshnessGuaranteeDays: 7,
      isBestseller: false,
      size: 'متوسط'
    });
    setActiveTab('marketplace');
  };

  const handleAddBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.excerpt || !newPost.content) {
      showToast('لطفاً عنوان و محتوای مقاله را تکمیل کنید.', 'error');
      return;
    }

    const created: BlogPost = {
      id: 'b-' + Date.now(),
      slug: newPost.title.toLowerCase().replace(/\s+/g, '-'),
      title: newPost.title,
      titleEn: newPost.titleEn || newPost.title,
      date: '۱۴۰۳/۰۵/۲۶',
      readTime: '۴ دقیقه مطالعه',
      image: newPost.image,
      excerpt: newPost.excerpt,
      content: newPost.content,
      author: newPost.author,
      tags: newPost.tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    addBlogPost(created);
    setActiveTab('blog');
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "site-content.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('فایل site-content.json دانلود شد.', 'success');
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(siteContent, null, 2));
    setCopied(true);
    showToast('کد JSON در کلیپ‌بورد کپی شد.', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#1F3F1B] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading">
                پنل مدیریت محتوا و تنظیمات Decap CMS
              </h1>
              <span className="text-[10px] font-bold bg-[#D4AF37] text-[#1F3F1B] px-2 py-0.5 rounded">
                Live Studio
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              ویرایش زنده متون سایت، افزودن گل‌های جدید، مدیریت مقالات بلاگ و ساخت خروجی ZIP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>مشاهده زنده سایت</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveSubTab('content_editor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'content_editor'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>ویرایشگر محتوای سایت (site-content.json)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('add_product')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'add_product'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>افزودن گل یا محصول جدید</span>
        </button>

        <button
          onClick={() => setActiveSubTab('add_blog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'add_blog'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>انتشار مقاله جدید در بلاگ</span>
        </button>

        <button
          onClick={() => setActiveSubTab('decap_cms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'decap_cms'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Layers className="w-4 h-4 text-[#D4AF37]" />
          <span>پیکربندی Decap CMS (config.yml)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('zip_builder')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'zip_builder'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Package className="w-4 h-4 text-[#D4AF37]" />
          <span>اسکریپت build-zip.sh و سرور</span>
        </button>
      </div>

      {/* 1. Main Site Content Editor Tab */}
      {activeSubTab === 'content_editor' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1F3F1B] font-heading">
                ویرایش متون، پیام‌ها و ارزش‌های سایت
              </h3>
              <p className="text-xs text-stone-500">
                هرگونه تغییر در این بخش بلافاصله در صفحه اصلی و کل سایت منعکس می‌شود
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsJsonMode(!isJsonMode)}
                className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold hover:bg-stone-50 cursor-pointer flex items-center gap-1"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{isJsonMode ? 'حالت فرم تصویری' : 'حالت کد Raw JSON'}</span>
              </button>

              <button
                onClick={handleSaveContent}
                className="px-4 py-2 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#D4AF37]" />
                <span>ذخیره تغییرات</span>
              </button>

              <button
                onClick={resetSiteContent}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl cursor-pointer"
                title="بازگردانی به مقادیر پیش‌فرض"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isJsonMode ? (
            <div className="space-y-3">
              <textarea
                value={jsonString}
                onChange={(e) => setJsonString(e.target.value)}
                rows={18}
                className="w-full bg-stone-900 text-emerald-400 font-mono text-xs p-4 rounded-2xl border border-stone-700 focus:outline-hidden"
                dir="ltr"
              />
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Hero Section fields */}
              <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <h4 className="font-bold text-sm text-[#2D5A27]">بخش اصلی هیرو (Hero Section)</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">عنوان اصلی هیرو:</label>
                    <input
                      type="text"
                      value={draftContent.site.hero.headline}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: {
                          ...draftContent.site,
                          hero: { ...draftContent.site.hero, headline: e.target.value }
                        }
                      })}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">متن دکمه خرید:</label>
                    <input
                      type="text"
                      value={draftContent.site.hero.cta_primary}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: {
                          ...draftContent.site,
                          hero: { ...draftContent.site.hero, cta_primary: e.target.value }
                        }
                      })}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">زیرعنوان توضیحات هیرو:</label>
                  <textarea
                    value={draftContent.site.hero.subheadline}
                    onChange={(e) => setDraftContent({
                      ...draftContent,
                      site: {
                        ...draftContent.site,
                        hero: { ...draftContent.site.hero, subheadline: e.target.value }
                      }
                    })}
                    rows={2}
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs"
                  />
                </div>
              </div>

              {/* Brand & Contacts fields */}
              <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <h4 className="font-bold text-sm text-[#2D5A27]">اطلاعات برند و تماس (Brand & Contact)</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">نام فارسی برند:</label>
                    <input
                      type="text"
                      value={draftContent.site.brand.name_fa}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: {
                          ...draftContent.site,
                          brand: { ...draftContent.site.brand, name_fa: e.target.value }
                        }
                      })}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">شماره تلفن پشتیبانی:</label>
                    <input
                      type="text"
                      value={draftContent.site.brand.phone}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: {
                          ...draftContent.site,
                          brand: { ...draftContent.site.brand, phone: e.target.value }
                        }
                      })}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">ایمیل رسمی:</label>
                    <input
                      type="text"
                      value={draftContent.site.brand.email}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: {
                          ...draftContent.site,
                          brand: { ...draftContent.site.brand, email: e.target.value }
                        }
                      })}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Story of Brand */}
              <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <h4 className="font-bold text-sm text-[#2D5A27]">داستان دختر گل و درباره ما</h4>
                <textarea
                  value={draftContent.site.about.story}
                  onChange={(e) => setDraftContent({
                    ...draftContent,
                    site: {
                      ...draftContent.site,
                      about: { ...draftContent.site.about, story: e.target.value }
                    }
                  })}
                  rows={3}
                  className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs"
                />
              </div>

            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadJson}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>دانلود site-content.json</span>
              </button>

              <button
                onClick={handleCopyJson}
                className="px-3.5 py-2 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'کپی شد' : 'کپی محتوای JSON'}</span>
              </button>
            </div>

            <button
              onClick={handleSaveContent}
              className="px-6 py-2.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
            >
              ذخیره و اعمال در کل سایت
            </button>
          </div>

        </div>
      )}

      {/* 2. Add Product Sub-Tab */}
      {activeSubTab === 'add_product' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md max-w-3xl mx-auto space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              افزودن گل، باکس هدیه یا گیاه جدید به بازارچه
            </h3>
            <p className="text-xs text-stone-500">
              محصول بلافاصله در فیلترها و کاتالوگ فروشگاه قرار می‌گیرد
            </p>
          </div>

          <form onSubmit={handleAddProductSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  نام فارسی گل *:
                </label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="مثال: باکس رز سرخ مینیاتوری"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  نام انگلیسی (اختیاری):
                </label>
                <input
                  type="text"
                  value={newProd.nameEn}
                  onChange={(e) => setNewProd({ ...newProd, nameEn: e.target.value })}
                  placeholder="Royal Red Rose Box"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  دسته‌بندی *:
                </label>
                <select
                  value={newProd.categorySlug}
                  onChange={(e) => setNewProd({ ...newProd, categorySlug: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
                >
                  <option value="roses">رزها و باکس گل</option>
                  <option value="orchids">ارکیده‌های خاص</option>
                  <option value="sunflowers">آفتابگردان و گل‌های آفتابی</option>
                  <option value="houseplants">گیاهان آپارتمانی</option>
                  <option value="gift-baskets">سبد و باکس هدیه لوکس</option>
                  <option value="seasonal">گل‌های فصلی</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  قیمت (تومان) *:
                </label>
                <input
                  type="number"
                  required
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ضمانت شادابی (روز):
                </label>
                <input
                  type="number"
                  value={newProd.freshnessGuaranteeDays}
                  onChange={(e) => setNewProd({ ...newProd, freshnessGuaranteeDays: Number(e.target.value) })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                آدرس تصویر (URL):
              </label>
              <input
                type="url"
                required
                value={newProd.image}
                onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                توضیحات محصول و ترکیبات گل‌ها *:
              </label>
              <textarea
                required
                value={newProd.description}
                onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                rows={3}
                placeholder="توضیح دهید چند شاخه گل و چه نوع اسفنج و تزییناتی استفاده شده است..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:bg-white"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={newProd.isBestseller}
                onChange={(e) => setNewProd({ ...newProd, isBestseller: e.target.checked })}
                className="rounded text-[#2D5A27]"
              />
              <span>نمایش نشان ویژه «پرفروش‌ترین»</span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              افزودن گل به کاتالوگ فروشگاه
            </button>
          </form>
        </div>
      )}

      {/* 3. Add Blog Article Sub-Tab */}
      {activeSubTab === 'add_blog' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md max-w-3xl mx-auto space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              انتشار مقاله آموزشی در مجله گل آریس
            </h3>
            <p className="text-xs text-stone-500">
              مقاله بلافاصله در مجله و برای خریداران قابل مشاهده خواهد بود
            </p>
          </div>

          <form onSubmit={handleAddBlogSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                عنوان مقاله *:
              </label>
              <input
                type="text"
                required
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="مثال: ۵ راز برای جلوگیری از ریختن گلبرگ‌های پیونی"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  نویسنده مقاله:
                </label>
                <input
                  type="text"
                  value={newPost.author}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  برچسب‌ها (با کاما جدا کنید):
                </label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="نگهداری گل, رز, آموزش"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                خلاصه کوتاه مقاله *:
              </label>
              <textarea
                required
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                rows={2}
                placeholder="خلاصه ۲ خطی از موضوع مقاله..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                متن کامل مقاله (Markdown) *:
              </label>
              <textarea
                required
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={8}
                placeholder="متن کامل با تیترها، نکات و راهکارهای باغبانی..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:bg-white font-mono text-[11px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              انتشار مقاله در مجله
            </button>
          </form>
        </div>
      )}

      {/* 4. Decap CMS config.yml Sub-Tab */}
      {activeSubTab === 'decap_cms' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              پیکربندی Decap CMS (/admin/config.yml)
            </h3>
            <p className="text-xs text-stone-500">
              این فایل ساختار کالکشن‌ها، صفحات و دسته‌بندی‌ها را برای پنل Netlify CMS / Decap CMS تعریف می‌کند
            </p>
          </div>

          <pre className="bg-stone-900 text-amber-300 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-stone-800" dir="ltr">
{`backend:
  name: git-gateway
  branch: main

media_folder: "images/uploads"
public_folder: "/images/uploads"

site_url: "https://golarys.ir"

collections:
  - name: "pages"
    label: "صفحات"
    files:
      - file: "index.html"
        label: "خانه"
        name: "home"
        fields:
          - {label: "عنوان هرو", name: "hero_headline", widget: "string"}
          - {label: "زیرعنوان هرو", name: "hero_subheadline", widget: "text"}
          - {label: "متن دکمه اصلی", name: "hero_cta_primary", widget: "string"}
          - {label: "مسیر تصویر هرو", name: "hero_image", widget: "image"}
      - file: "about.html"
        label: "درباره ما"
        name: "about"
        fields:
          - {label: "داستان برند", name: "story", widget: "markdown"}
          - {label: "ماموریت", name: "mission", widget: "text"}
          - {label: "چشم انداز", name: "vision", widget: "text"}
  - name: "blog"
    label: "بلاگ"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "عنوان", name: "title", widget: "string"}
      - {label: "تاریخ", name: "date", widget: "datetime"}
      - {label: "تصویر", name: "image", widget: "image"}
      - {label: "محتوا", name: "body", widget: "markdown"}
  - name: "site_content"
    label: "محتوای سایت (JSON)"
    files:
      - file: "content/site-content.json"
        label: "محتوای مرکزی"
        name: "site_content"
        fields:
          - {label: "محتوا (JSON)", name: "json", widget: "object"}`}
          </pre>
        </div>
      )}

      {/* 5. build-zip.sh and Node Server Sub-Tab */}
      {activeSubTab === 'zip_builder' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              اسکریپت ساخت نسخه زیپ (build-zip.sh) و کد سرور ارسال ایمیل تماس
            </h3>
            <p className="text-xs text-stone-500">
              این پکیج آماده استقرار روی سرورهای ابری لینوکس با Nginx و Node.js است
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#2D5A27]">📄 اسکریپت build-zip.sh:</h4>
            <pre className="bg-stone-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto" dir="ltr">
{`#!/usr/bin/env bash
set -e
PROJECT_NAME="golarys"
OUT="\${PROJECT_NAME}-bundle-$(date +%F).zip"
echo "Building \${OUT} ..."
zip -r "\${OUT}" . -x "node_modules/*" -x ".git/*" -x "server/node_modules/*" -x "*.DS_Store"
echo "Done. Created \${OUT}"`}
            </pre>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#2D5A27]">🚀 راهنمای استقرار سریع (Deployment Guide):</h4>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-2">
              <p>۱. آپلود و اکسترکت فایل زیپ در مسیر <code>/var/www/golarys</code></p>
              <p>۲. تنظیم Nginx برای سرو فرانت‌اند و Reverse Proxy روی مسیر <code>/api</code> به پورت ۳۰۰۰ سرور Node.js</p>
              <p>۳. اجرای سرور فرم تماس با PM2: <code>pm2 start server/server.js --name golarys-api</code></p>
              <p>۴. فعال‌سازی SSL رایگان با دستور <code>certbot --nginx -d golarys.ir</code></p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
