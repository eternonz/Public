import { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  downloadUrl: string;
  platform: 'ios' | 'android';
}

export default function Modal({ isOpen, onClose, productName, downloadUrl, platform }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const storeName = platform === 'ios' ? 'App Store' : 'Google Play';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
        {/* Title removed per spec — the QR-code content + the
            footer line below already identify the store and product;
            an emoji + name title was redundant. `productName` is now
            unused here but kept in the props for caller compatibility. */}
        <div className="qr-container">
          <QRCodeSVG value={downloadUrl} size={200} level="H" includeMargin={true} />
        </div>
        <p style={{ marginTop: '1.5rem', color: 'var(--secondary)' }}>
          Scan to download {productName} on the {storeName}
        </p>
      </div>
    </div>
  );
}
