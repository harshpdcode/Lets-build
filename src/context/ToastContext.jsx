import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Heart, Tag, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = "success", title = "", duration = 3000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type, title }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <aside aria-label="Notifications" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const icons = {
              success: <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />,
              wishlist: <Heart size={18} className="text-rose-400 shrink-0 fill-rose-400" />,
              coupon: <Tag size={18} className="text-amber-400 shrink-0" />,
              info: <Info size={18} className="text-blue-400 shrink-0" />,
            };

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-950/95 text-white border border-slate-800 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  {icons[toast.type] || icons.success}
                  <div>
                    {toast.title && (
                      <h4 className="text-xs font-bold text-white tracking-wide uppercase">{toast.title}</h4>
                    )}
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{toast.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close notification"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default ToastContext;
