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
  Flower2,
  Lock,
  LogOut,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  ShieldCheck,
  Search,
  MessageSquare,
  Camera,
  Send,
  Image as ImageIcon
} from 'lucide-react';
import { SiteContent, Product, BlogPost, OrderStatus } from '../types';
import { sampleVendors } from '../data/initialContent';
import { GolarysLogo } from './GolarysLogo';
import { toPersianDigits } from '../lib/formatters';

export const AdminPanel: React.FC = () => {
  const { 
    siteContent, 
    updateSiteContent, 
    resetSiteContent, 
    addProduct, 
    addBlogPost, 
    showToast,
    setActiveTab,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    orders,
    updateOrderStatus,
    updateOrder,
    sendNotification
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'orders_manager' | 'content_editor' | 'add_product' | 'add_blog' | 'decap_cms' | 'zip_builder'>('orders_manager');
  
  // Local editable draft for siteContent
  const [draftContent, setDraftContent] = useState<SiteContent>(siteContent);
  const [jsonString, setJsonString] = useState<string>(JSON.stringify(siteContent, null, 2));
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');

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

  const handleAdminPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(passwordInput);
  };

  // If not authenticated, render password lock screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
          
          <div className="bg-gradient-to-l from-[#1F3F1B] to-[#2D5A27] text-white p-8 text-center space-y-3">
            <GolarysLogo size="md" iconOnly={false} variant="light" />
            <div className="pt-2">
              <div className="w-12 h-12 bg-white/10 text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto border border-white/20 mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black font-heading text-white">
                ورود به پنل مدیریت گل آریس
              </h2>
              <p className="text-xs text-stone-200">
                جهت دسترسی به سفارش‌های شاپرک و مدیریت سیستم رمز ورود را وارد کنید
              </p>
            </div>
          </div>

          <form onSubmit={handleAdminPasswordSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                رمز عبور مدیریت:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="رمز ورود مدیر..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>تایید و ورود به مدیریت</span>
            </button>

            <div className="pt-3 text-center border-t border-stone-100">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
              >
                بازگشت به فروشگاه
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

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

  const handleStatusChange = (orderId: string, newStatus: OrderStatus, recipientPhone: string, code: string) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`وضعیت سفارش ${code} به روز شد.`, 'success');

    let statusFa = 'در حال آماده‌سازی و چینش گل';
    if (newStatus === 'gift_wrapping') statusFa = 'بسته‌بندی هدیه و درج کارت دست‌نویس';
    if (newStatus === 'delivering') statusFa = 'تحویل به سفیر و در مسیر ارسال';
    if (newStatus === 'delivered') statusFa = 'تحویل داده شده به گیرنده';

    sendNotification(
      'sms',
      'تغییر وضعیت سفارش گل آریس',
      `وضعیت سفارش ${code} به روز شد: ${statusFa}. جهت پیگیری لحظه‌ای به golarys.ir مراجعه فرمایید.`,
      recipientPhone
    );
  };

  const filteredOrders = orders.filter((o) =>
    o.trackingCode.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.recipientName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.recipientPhone.includes(orderSearch)
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#1F3F1B] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <GolarysLogo size="md" iconOnly={true} variant="light" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading">
                پنل مدیریت جامع گل آریس
              </h1>
              <span className="text-[10px] font-bold bg-[#D4AF37] text-[#1F3F1B] px-2 py-0.5 rounded">
                مدیر سامانه
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              مدیریت سفارش‌های شاپرک، تغییر وضعیت ارسال، بروزرسانی متون سایت و محصولات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>مشاهده فروشگاه</span>
          </button>
          <button
            onClick={adminLogout}
            className="px-4 py-2 bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج از پنل</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveSubTab('orders_manager')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'orders_manager'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Package className="w-4 h-4 text-[#D4AF37]" />
          <span>سفارش‌های دریافتی و شاپرک ({toPersianDigits(orders.length)})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('content_editor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'content_editor'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>ویرایشگر متون سایت</span>
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
          <span>انتشار مقاله بلاگ</span>
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
          <span>پیکربندی Decap CMS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('zip_builder')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'zip_builder'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Download className="w-4 h-4 text-[#D4AF37]" />
          <span>خروجی ZIP و استقرار سرور</span>
        </button>
      </div>

      {/* 0. Orders Management Sub-Tab */}
      {activeSubTab === 'orders_manager' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                مدیریت سفارش‌ها و تراکنش‌های بانکی شاپرک
              </h3>
              <p className="text-xs text-stone-500">
                مشاهده فاکتورها، تغییر وضعیت چرخه گل‌آرایی و ارسال پیامک خودکار به خریداران
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="جستجو با کد پیگیری، نام یا شماره..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-3 pr-9 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-stone-50 rounded-2xl border border-stone-200">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500">هنوز سفارشی ثبت نشده است.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 hover:border-stone-300 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#2D5A27] font-mono">
                        {order.trackingCode}
                      </span>
                      <span className="text-xs bg-white px-2.5 py-0.5 rounded-full border border-stone-200 font-bold text-stone-700">
                        {order.recipientCity}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span>ثبت: {order.createdAt}</span>
                      {order.rrn && (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                          RRN: {order.rrn}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Items and Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-stone-800 block mb-1">اقلام خریداری شده:</span>
                      <ul className="space-y-1 text-stone-600">
                        {order.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>• {it.product.name} ({toPersianDigits(it.quantity)} عدد)</span>
                            <span className="font-mono">{(it.product.price * it.quantity).toLocaleString('fa-IR')} ت</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 pt-1 border-t border-stone-200 font-bold text-stone-900 flex justify-between">
                        <span>مبلغ نهایی:</span>
                        <span className="text-[#2D5A27] font-mono">{order.finalAmount.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-stone-800 block mb-1">مشخصات گیرنده و تحویل:</span>
                      <p className="text-stone-700">{order.recipientName} ({order.recipientPhone})</p>
                      <p className="text-stone-500 mt-1">{order.recipientAddress}</p>
                      <p className="text-stone-600 mt-1 font-medium">زمان: {order.deliveryDate} - {order.deliveryTimeSlot}</p>
                    </div>

                    <div>
                      <span className="font-bold text-stone-800 block mb-1">وضعیت جاری سفارش:</span>
                      <div className="space-y-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus, order.recipientPhone, order.trackingCode)}
                          className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#2D5A27]"
                        >
                          <option value="paid">تایید پرداخت (شاپرک)</option>
                          <option value="preparing">در حال گل‌آرایی و آماده‌سازی</option>
                          <option value="gift_wrapping">بسته‌بندی هدیه و کارت پیام</option>
                          <option value="delivering">تحویل به پیک (در مسیر ارسال)</option>
                          <option value="delivered">تحویل نهایی شده</option>
                        </select>

                        {order.notes && (
                          <div className="p-2 bg-amber-50 rounded-lg text-amber-900 border border-amber-200">
                            <strong>توضیحات خریدار:</strong> {order.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Florist Pre-dispatch Photo Management Box */}
                  <div className="mt-3 pt-3 border-t border-stone-200 bg-white p-4 rounded-xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#2D5A27]" />
                        <span className="font-bold text-xs text-stone-800">
                          سرویس عکاسی محصول قبل از تحویل به پیک:
                        </span>
                        {order.sendPreDispatchPhoto ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            درخواست شده توسط مشتری ({order.preDispatchPhotoChannel === 'whatsapp' ? 'واتس‌اپ' : order.preDispatchPhotoChannel === 'telegram' ? 'تلگرام' : 'پیامک'})
                          </span>
                        ) : (
                          <span className="text-[10px] bg-stone-100 text-stone-600 font-medium px-2 py-0.5 rounded">
                            اختیاری
                          </span>
                        )}
                      </div>

                      {order.preDispatchPhotoApproved ? (
                        <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          تایید شده توسط مشتری (آماده ارسال به پیک)
                        </span>
                      ) : order.preDispatchPhotoFeedback ? (
                        <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-amber-200">
                          <MessageSquare className="w-3.5 h-3.5" />
                          نظر مشتری: «{order.preDispatchPhotoFeedback}»
                        </span>
                      ) : (
                        <span className="text-xs text-stone-500 font-medium">
                          وضعیت: در انتظار ارسال عکس یا تایید خریدار
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3 flex items-center gap-2">
                        <img
                          src={order.preDispatchPhotoUrl || order.items[0]?.product?.image}
                          alt="پیش‌نمایش گل"
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                        />
                        <div className="text-[11px] text-stone-500">
                          عکس آماده‌شده جهت بازبینی خریدار
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <input
                          type="text"
                          dir="ltr"
                          placeholder="آدرس اینترنتی (URL) عکس واقعی گل‌آرایی..."
                          value={order.preDispatchPhotoUrl || ''}
                          onChange={(e) => updateOrder(order.id, { preDispatchPhotoUrl: e.target.value })}
                          className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                        />
                      </div>

                      <div className="sm:col-span-3 flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const photoUrl = order.preDispatchPhotoUrl || order.items[0]?.product?.image;
                            updateOrder(order.id, { preDispatchPhotoUrl: photoUrl });
                            showToast(`عکس گل‌آرایی برای شماره ${order.preDispatchPhotoNumber || order.recipientPhone} ارسال شد.`, 'success');
                            sendNotification(
                              'sms',
                              'عکس گل‌آرایی سفارش شما آماده شد',
                              `خریدار گرامی، عکس دسته گل/محصول سفارش ${order.trackingCode} جهت تایید نهایی آماده شد. جهت مشاهده و تایید وارد سامانه رهگیری شوید: ${photoUrl}`,
                              order.preDispatchPhotoNumber || order.recipientPhone
                            );
                          }}
                          className="w-full py-2 px-3 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>ارسال عکس به مشتری</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 1. Content Editor Sub-Tab */}
      {activeSubTab === 'content_editor' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                ویرایشگر محتوای متنی سایت
              </h3>
              <p className="text-xs text-stone-500">
                تغییر تیتر اصلی صفحه نخست، متن‌های هدر، توضیحات درباره ما و شماره‌های پشتیبانی
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsJsonMode(!isJsonMode)}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{isJsonMode ? 'حالت فرم بصری' : 'حالت کد JSON مستقیم'}</span>
              </button>
            </div>
          </div>

          {isJsonMode ? (
            <div className="space-y-4">
              <textarea
                dir="ltr"
                rows={18}
                value={jsonString}
                onChange={(e) => setJsonString(e.target.value)}
                className="w-full p-4 bg-stone-900 text-emerald-400 font-mono text-xs rounded-2xl border border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Brand Settings */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="font-bold text-sm text-[#2D5A27]">تنظیمات برند و اطلاعات تماس:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">نام فارسی:</label>
                    <input
                      type="text"
                      value={draftContent.site.brand.name_fa}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: { ...draftContent.site, brand: { ...draftContent.site.brand, name_fa: e.target.value } }
                      })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">شماره تماس:</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={draftContent.site.brand.phone}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: { ...draftContent.site, brand: { ...draftContent.site.brand, phone: e.target.value } }
                      })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">ایمیل رسمی:</label>
                    <input
                      type="email"
                      dir="ltr"
                      value={draftContent.site.brand.email}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: { ...draftContent.site, brand: { ...draftContent.site.brand, email: e.target.value } }
                      })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="font-bold text-sm text-[#2D5A27]">متن بنر اصلی صفحه اول (Hero Banner):</h4>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">تیتر جذاب اول:</label>
                  <input
                    type="text"
                    value={draftContent.site.hero.headline}
                    onChange={(e) => setDraftContent({
                      ...draftContent,
                      site: { ...draftContent.site, hero: { ...draftContent.site.hero, headline: e.target.value } }
                    })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">زیرعنوان توضیحی:</label>
                  <textarea
                    rows={2}
                    value={draftContent.site.hero.subheadline}
                    onChange={(e) => setDraftContent({
                      ...draftContent,
                      site: { ...draftContent.site, hero: { ...draftContent.site.hero, subheadline: e.target.value } }
                    })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={resetSiteContent}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>بازگردانی به تنظیمات پیش‌فرض</span>
            </button>

            <button
              onClick={handleSaveContent}
              className="px-6 py-2.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>ذخیره نهایی تغییرات</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Add Product Sub-Tab */}
      {activeSubTab === 'add_product' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              افزودن گل، گیاه یا محصول صنایع دستی جدید
            </h3>
            <p className="text-xs text-stone-500">
              این محصول بلافاصله در بازارچه آنلاین قرار گرفته و قابل سفارش خواهد بود
            </p>
          </div>

          <form onSubmit={handleAddProductSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">نام محصول (فارسی):</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: دسته گل رز هلندی رمانتیک"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">دسته‌بندی:</label>
                <select
                  value={newProd.categorySlug}
                  onChange={(e) => setNewProd({ ...newProd, categorySlug: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm"
                >
                  <option value="roses">گل‌های رز هلندی</option>
                  <option value="houseplants">گیاهان آپارتمانی</option>
                  <option value="orchids">ارکیده و لوکس</option>
                  <option value="gift-baskets">سبد و باکس هدیه</option>
                  <option value="dried-flowers">گل خشک و جاودان</option>
                  <option value="pots">گلدان سرامیکی لالجین</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">قیمت (تومان):</label>
                <input
                  type="number"
                  required
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ضمانت شادابی (روز):</label>
                <input
                  type="number"
                  value={newProd.freshnessGuaranteeDays}
                  onChange={(e) => setNewProd({ ...newProd, freshnessGuaranteeDays: Number(e.target.value) })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">سایز و قواره:</label>
                <select
                  value={newProd.size}
                  onChange={(e) => setNewProd({ ...newProd, size: e.target.value as any })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm"
                >
                  <option value="کوچک">کوچک</option>
                  <option value="متوسط">متوسط</option>
                  <option value="بزرگ">بزرگ</option>
                  <option value="لوکس">لوکس و تشریفاتی</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">آدرس اینترنتی تصویر (URL):</label>
              <input
                type="text"
                dir="ltr"
                required
                value={newProd.image}
                onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">توضیحات و نمادشناسی گل:</label>
              <textarea
                rows={3}
                required
                placeholder="توضیح کوتاه درباره مناسبت‌ها، شیوه تزیین و نگهداری..."
                value={newProd.description}
                onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>انتشار آنی محصول در بازارچه</span>
            </button>
          </form>
        </div>
      )}

      {/* 3. Add Blog Sub-Tab */}
      {activeSubTab === 'add_blog' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              انتشار مقاله آموزشی جدید در وبلاگ
            </h3>
            <p className="text-xs text-stone-500">
              آموزش‌های نگهداری گل، دکوراسیون و خواص گیاهان
            </p>
          </div>

          <form onSubmit={handleAddBlogSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">عنوان مقاله:</label>
              <input
                type="text"
                required
                placeholder="مثال: ۱۰ راز ماندگاری گل‌های شاخه بریده تا دو هفته"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">نویسنده:</label>
                <input
                  type="text"
                  value={newPost.author}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">برچسب‌ها (با کاما جدا کنید):</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">چکیده مقاله:</label>
              <textarea
                rows={2}
                required
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">متن کامل مقاله:</label>
              <textarea
                rows={6}
                required
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>انتشار مقاله در بلاگ</span>
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
