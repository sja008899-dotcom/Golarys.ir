import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Building, 
  Phone, 
  User as UserIcon,
  HelpCircle,
  FileText
} from 'lucide-react';
import { PaymentMethod } from '../types';
import { toPersianDigits } from '../lib/formatters';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    cart, 
    user, 
    createOrder, 
    setActiveGatewayOrder, 
    setIsGatewayOpen, 
    showToast,
    clearCart,
    triggerCelebration,
    setIsTrackingModalOpen
  } = useApp();

  // Form State
  const [recipientName, setRecipientName] = useState(user?.fullName || '');
  const [recipientPhone, setRecipientPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || 'تهران');
  const [address, setAddress] = useState(user?.address || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  
  // Delivery Schedule
  const [deliveryDate, setDeliveryDate] = useState('امروز (ارسال فوری ۲ الی ۳ ساعته)');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('بعدازظهر (۱۴:۰۰ الی ۱۸:۰۰)');
  const [notes, setNotes] = useState('');
  
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('shaparak');
  const [cardToCardRef, setCardToCardRef] = useState('');

  if (!isCheckoutModalOpen) return null;

  // Price Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 1200000 ? 0 : 65000;
  const finalAmount = subtotal + shippingCost;

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim()) {
      showToast('لطفاً نام تحویل‌گیرنده را وارد فرمایید.', 'error');
      return;
    }
    if (!recipientPhone.trim() || recipientPhone.length < 10) {
      showToast('لطفاً شماره تماس معتبر تحویل‌گیرنده را وارد فرمایید.', 'error');
      return;
    }
    if (!address.trim()) {
      showToast('لطفاً آدرس دقیق پستی را وارد فرمایید.', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('سبد خرید شما خالی است.', 'error');
      return;
    }

    // Create Order in context
    const newOrder = createOrder({
      items: [...cart],
      totalAmount: subtotal,
      shippingCost,
      finalAmount,
      paymentMethod,
      deliveryDate,
      deliveryTimeSlot,
      recipientName,
      recipientPhone,
      recipientAddress: address,
      recipientCity: city,
      notes: notes || undefined
    });

    setIsCheckoutModalOpen(false);

    if (paymentMethod === 'shaparak') {
      // Open Real Shaparak Gateway
      setActiveGatewayOrder(newOrder);
      setIsGatewayOpen(true);
    } else {
      // Offline payment
      clearCart();
      triggerCelebration();
      showToast(`سفارش شما با کد پیگیری ${newOrder.trackingCode} با موفقیت ثبت شد!`, 'success');
      setIsTrackingModalOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-l from-[#1F3F1B] to-[#2D5A27] text-white p-5 sm:p-6 relative">
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Truck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                تکمیل سفارش و ارسال گل و صنایع دستی
              </h3>
              <p className="text-xs text-stone-200">
                مشخصات تحویل‌گیرنده و زمانبندی ارسال را تعیین فرمایید
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitCheckout} className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Step 1: Recipient Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <UserIcon className="w-4 h-4 text-[#2D5A27]" />
              <span>۱. مشخصات تحویل‌گیرنده گل و هدیه</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  نام و نام خانوادگی گیرنده:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: سمانه مرادی"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  شماره موبایل جهت هماهنگی تحویل:
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="09123456789"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  استان / شهر:
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                >
                  <option value="تهران">تهران (ارسال فوری ۳ ساعته)</option>
                  <option value="کرج">کرج</option>
                  <option value="اصفهان">اصفهان</option>
                  <option value="شیراز">شیراز</option>
                  <option value="مشهد">مشهد</option>
                  <option value="تبریز">تبریز</option>
                  <option value="همدان">همدان (لالجین)</option>
                  <option value="سایر استان‌ها">سایر استان‌ها</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  آدرس دقیق تحویل:
                </label>
                <input
                  type="text"
                  required
                  placeholder="خیابان، کوچه، پلاک، زنگ، واحد..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Date & Time Slot */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-black text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <Calendar className="w-4 h-4 text-[#2D5A27]" />
              <span>۲. زمانبندی و بازه ارسال</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  روز تحویل:
                </label>
                <select
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                >
                  <option value="امروز (ارسال فوری ۲ الی ۳ ساعته)">امروز (ارسال فوری ۲ الی ۳ ساعته)</option>
                  <option value="فردا صبح">فردا</option>
                  <option value="پس‌فردا">پس‌فردا</option>
                  <option value="آخر هفته (پنجشنبه/جمعه)">آخر هفته</option>
                  <option value="روز مناسبتی خاص">تاریخ سفارشی (هماهنگی با پشتیبانی)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  بازه زمانی تحویل:
                </label>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                >
                  <option value="صبح (۰۹:۰۰ الی ۱۳:۰۰)">صبح (۰۹:۰۰ الی ۱۳:۰۰)</option>
                  <option value="بعدازظهر (۱۴:۰۰ الی ۱۸:۰۰)">بعدازظهر (۱۴:۰۰ الی ۱۸:۰۰)</option>
                  <option value="شب (۱۹:۰۰ الی ۲۲:۰۰)">شب (۱۹:۰۰ الی ۲۲:۰۰)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                توضیحات و هماهنگی ویژه تحویل (اختیاری):
              </label>
              <textarea
                rows={2}
                placeholder="مثلاً: سورپرایز تولد است و با گیرنده تماس گرفته نشود..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-black text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <CreditCard className="w-4 h-4 text-[#2D5A27]" />
              <span>۳. روش پرداخت</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Shaparak Gateway */}
              <label
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  paymentMethod === 'shaparak'
                    ? 'border-[#2D5A27] bg-[#2D5A27]/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-stone-900">درگاه آنلاین شتاب</span>
                  <input
                    type="radio"
                    name="payment"
                    value="shaparak"
                    checked={paymentMethod === 'shaparak'}
                    onChange={() => setPaymentMethod('shaparak')}
                    className="accent-[#2D5A27]"
                  />
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">
                  شاپرک با کلیه کارت‌های بانکی عضو شتاب (تایید آنی)
                </p>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded self-start">
                  پیشنهاد گل آریس
                </span>
              </label>

              {/* Card to Card */}
              <label
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  paymentMethod === 'card_to_card'
                    ? 'border-[#2D5A27] bg-[#2D5A27]/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-stone-900">کارت به کارت</span>
                  <input
                    type="radio"
                    name="payment"
                    value="card_to_card"
                    checked={paymentMethod === 'card_to_card'}
                    onChange={() => setPaymentMethod('card_to_card')}
                    className="accent-[#2D5A27]"
                  />
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">
                  واریز مستقیم به شماره کارت بانکی گل آریس
                </p>
              </label>

              {/* COD */}
              <label
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  paymentMethod === 'cod'
                    ? 'border-[#2D5A27] bg-[#2D5A27]/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-stone-900">پرداخت در محل</span>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#2D5A27]"
                  />
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">
                  با کارتخوان اختصاصی پیک (فقط شهر تهران)
                </p>
              </label>
            </div>

            {paymentMethod === 'card_to_card' && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2 text-amber-950">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <CreditCard className="w-4 h-4" />
                  <span>شماره کارت جهت واریز وجه:</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-amber-300 font-mono text-center text-sm font-black text-stone-900 tracking-wider">
                  ۶۰۳۷ - ۹۹۱۸ - ۴۴۵۵ - ۸۸۹۹
                </div>
                <div className="flex justify-between text-[11px] text-amber-800">
                  <span>به نام: گل آریس (بازار آنلاین گل و گیاه)</span>
                  <span>بانک ملی ایران</span>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Summary & Total Calculation */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>مجموع اقلام سبد خرید ({toPersianDigits(cart.length)} مورد):</span>
              <span className="font-bold text-stone-900">{subtotal.toLocaleString('fa-IR')} تومان</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>هزینه بسته‌بندی لوکس هدیه و کارت پیام:</span>
              <span className="font-bold text-emerald-600">رایگان (هدیه گل آریس)</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>هزینه ارسال اختصاصی:</span>
              <span className="font-bold text-stone-900">
                {shippingCost === 0 ? (
                  <span className="text-emerald-600">رایگان (سفارش بالای ۱.۲ میلیون)</span>
                ) : (
                  `${shippingCost.toLocaleString('fa-IR')} تومان`
                )}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-stone-900 font-black">
              <span className="text-sm">مبلغ نهایی قابل پرداخت:</span>
              <div className="text-base text-[#2D5A27] font-mono">
                {finalAmount.toLocaleString('fa-IR')} تومان
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-black text-sm sm:text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {paymentMethod === 'shaparak' ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                  <span>اتصال به درگاه امن بانکی شاپرک</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                  <span>ثبت نهایی سفارش</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
