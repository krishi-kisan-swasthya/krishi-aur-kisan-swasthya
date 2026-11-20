import React from 'react';
import { ShoppingBasket, CalendarX, Trash2, Check } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout
}) {
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBasket size={22} />
            <span>आपकी चयनित सेवाएं ({items.length})</span>
          </div>
          <button className="cart-drawer-close" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <CalendarX className="empty-icon" size={54} />
              <p>अभी कोई परामर्श कार्ट में नहीं है।</p>
              <a href="#services" className="btn btn-outline btn-sm" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }} onClick={onClose}>
                सेवाएं देखें
              </a>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item, index) => (
                <div key={index} className="cart-item">
                  <div>
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-price">₹{item.price} • {item.duration}</div>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => onRemoveItem(index)}
                    title="हटाएं"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>कुल योग (Total):</span>
              <strong>₹{totalAmount}</strong>
            </div>
            <button className="btn btn-primary btn-block" onClick={onCheckout}>
              <Check size={18} />
              <span>चेकआउट और स्लॉट बुक करें</span>
            </button>
          </div>
        )}
      </aside>
      {isOpen && <div className="cart-backdrop" onClick={onClose}></div>}
    </>
  );
}
