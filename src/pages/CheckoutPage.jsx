import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Check, CreditCard, Banknote, Smartphone, ChevronLeft, Package } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, handleImageError } from "../utils/helpers";
import Container from "../components/common/Container";

export default function CheckoutPage() {
  const { template, templateId } = useOutletContext();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const isDark = templateId === "bold";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const mutedColor = isDark ? "text-zinc-400" : "text-gray-500";
  const bgColor = isDark ? "bg-[#0d0d0d]" : "bg-white";
  const cardBg = isDark ? "bg-zinc-800/50 border-zinc-800" : "bg-gray-50 border-gray-200";
  const inputStyle = isDark
    ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-900";

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className={`${bgColor} min-h-[70vh] flex items-center justify-center`}>
        <div className="text-center px-4 max-w-md mx-auto animate-scale-in">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isDark ? "bg-orange-500/20" : "bg-emerald-100"}`}>
            <Check size={40} className={isDark ? "text-orange-400" : "text-emerald-600"} />
          </div>
          <h1 className={`text-3xl font-bold ${headingColor} mb-2`}>Order Placed!</h1>
          <p className={`${mutedColor} mb-2`}>
            Thank you for your order. Your confirmation number is:
          </p>
          <p className={`text-lg font-mono font-bold ${isDark ? "text-orange-400" : "text-gray-900"}`}>
            #LB-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <p className={`text-xs ${mutedColor} mt-4 italic`}>
            This is a demo storefront — no real transaction was processed.
          </p>
          <Link
            to={`/template/${templateId}/shop`}
            className={`inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-xl font-semibold text-sm transition-colors ${
              isDark ? "bg-orange-500 text-white hover:bg-orange-400" : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`${bgColor} min-h-[60vh] flex items-center justify-center`}>
        <div className="text-center px-4">
          <Package size={64} className={`mx-auto mb-4 ${isDark ? "text-zinc-700" : "text-gray-200"}`} />
          <h1 className={`text-2xl font-bold ${headingColor} mb-2`}>Nothing to checkout</h1>
          <p className={`${mutedColor} mb-6`}>Add some items to your cart first.</p>
          <Link
            to={`/template/${templateId}/shop`}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
              isDark ? "bg-orange-500 text-white hover:bg-orange-400" : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={bgColor}>
      <Container className="py-8 md:py-12">
        <Link to={`/template/${templateId}/cart`} className={`inline-flex items-center gap-1 text-sm ${mutedColor} hover:opacity-70 mb-6`}>
          <ChevronLeft size={16} /> Back to Cart
        </Link>

        <h1 className={`text-2xl md:text-3xl font-bold ${headingColor} mb-8`} style={{ fontFamily: template.theme.fontDisplay }}>
          Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <div className={`p-6 rounded-xl border ${cardBg}`}>
              <h2 className={`text-lg font-bold ${headingColor} mb-4`}>Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="firstName">First Name</label>
                  <input id="firstName" type="text" required placeholder="John" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="lastName">Last Name</label>
                  <input id="lastName" type="text" required placeholder="Doe" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="email">Email</label>
                  <input id="email" type="email" required placeholder="john@example.com" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" placeholder="+1 (555) 123-4567" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className={`p-6 rounded-xl border ${cardBg}`}>
              <h2 className={`text-lg font-bold ${headingColor} mb-4`}>Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="address">Street Address</label>
                  <input id="address" type="text" required placeholder="123 Main Street" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="city">City</label>
                    <input id="city" type="text" required placeholder="New York" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="state">State</label>
                    <input id="state" type="text" placeholder="NY" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="zip">ZIP Code</label>
                    <input id="zip" type="text" required placeholder="10001" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className={`p-6 rounded-xl border ${cardBg}`}>
              <h2 className={`text-lg font-bold ${headingColor} mb-4`}>Payment Method</h2>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                {[
                  { id: "card", label: "Credit Card", icon: CreditCard },
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "cod", label: "Cash on Delivery", icon: Banknote },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors text-left ${
                      paymentMethod === id
                        ? isDark ? "border-orange-500 bg-orange-500/10 text-white" : "border-gray-900 bg-gray-900/5 text-gray-900"
                        : isDark ? "border-zinc-700 text-zinc-400 hover:border-zinc-500" : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="cardNumber">Card Number</label>
                    <input id="cardNumber" type="text" placeholder="4242 4242 4242 4242" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="expiry">Expiry</label>
                      <input id="expiry" type="text" placeholder="MM/YY" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${headingColor} mb-1.5`} htmlFor="cvv">CVV</label>
                      <input id="cvv" type="text" placeholder="123" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${inputStyle}`} />
                    </div>
                  </div>
                </div>
              )}

              <p className={`text-xs ${mutedColor} mt-4 italic`}>
                This is a demo — no real payment will be processed.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className={`p-6 rounded-xl border h-fit sticky top-24 ${cardBg}`}>
            <h2 className={`text-lg font-bold ${headingColor} mb-4`}>Order Summary</h2>

            <div className="space-y-3 mb-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className={`w-14 h-14 rounded-lg border flex items-center justify-center p-1 overflow-hidden shrink-0 ${
                    isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-100"
                  }`}>
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className={`w-full h-full ${item.category === "fashion" ? "object-cover object-top" : "object-contain"}`}
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${headingColor} truncate`}>{item.name}</p>
                    <p className={`text-xs ${mutedColor}`}>Qty: {item.quantity}</p>
                  </div>
                  <span className={`text-sm font-medium ${headingColor}`}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className={`space-y-2 text-sm pt-4 border-t ${isDark ? "border-zinc-700" : "border-gray-200"}`}>
              <div className="flex justify-between">
                <span className={mutedColor}>Subtotal</span>
                <span className={headingColor}>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className={mutedColor}>Shipping</span>
                <span className={shipping === 0 ? "text-green-600" : headingColor}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className={`flex justify-between text-lg font-bold pt-3 border-t ${isDark ? "border-zinc-700" : "border-gray-200"}`}>
                <span className={headingColor}>Total</span>
                <span className={isDark ? "text-orange-400" : headingColor}>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-sm transition-colors ${
                isDark ? "bg-orange-500 text-white hover:bg-orange-400" : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Place Order — {formatPrice(total)}
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
