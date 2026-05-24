import { useState } from 'react';
import Modal from './Modal';

interface ProductCardProps {
  iconUrl?: string;
  name: string;
  description: string;
  isComingSoon?: boolean;
  iosUrl?: string;
  androidUrl?: string;
}

export default function ProductCard({ name, description, isComingSoon, iosUrl, androidUrl, iconUrl }: ProductCardProps) {
  const [activeModal, setActiveModal] = useState<'ios' | 'android' | null>(null);

  return (
    <>
      <div className="product-card">
        <div className="card-top-section">
          <div className="app-icon-container">
            {iconUrl ? (
              <img src={iconUrl} alt={`${name} icon`} className="app-icon" />
            ) : (
              <div className="app-icon placeholder-icon">
                <span>?</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="product-title">{name}</h3>
            <p className="product-desc">{description}</p>
          </div>
        </div>
        <div className="card-bottom-section">
          {!isComingSoon && (
            <div className="download-buttons">
              {iosUrl && (
                <button className="btn btn-ios" onClick={() => setActiveModal('ios')}>
                  <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </button>
              )}
              {androidUrl && (
                <button className="btn btn-android" onClick={() => setActiveModal('android')}>
                  <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M3.18 23.04L14.28 12 3.18.96c-.36.33-.58.8-.58 1.34v19.4c0 .54.22 1.01.58 1.34zm12.56-12.56l2.73-2.73-12.1-6.97c-.43-.25-.93-.32-1.4-.22L14.74 10.48zm-1.42 1.42L5.09 21.29c.43.08.9.03 1.33-.2l12.16-7.01-2.84-2.8zm5.37-3.06l-3.48 2.01 3.13 3.08c.56-.32.94-.91.94-1.63 0-.7-.36-1.27-.59-1.46z"/>
                  </svg>
                  Google Play
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {iosUrl && (
        <Modal
          isOpen={activeModal === 'ios'}
          onClose={() => setActiveModal(null)}
          productName={name}
          downloadUrl={iosUrl}
          platform="ios"
        />
      )}
      {androidUrl && (
        <Modal
          isOpen={activeModal === 'android'}
          onClose={() => setActiveModal(null)}
          productName={name}
          downloadUrl={androidUrl}
          platform="android"
        />
      )}
    </>
  );
}
