import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-app-mark">
            <img src="/KeaLedger.png" alt="" width={72} height={72} className="hero-app-icon" />
          </div>
          <h1>
            Meet <span className="accent">KeaLedger</span>
          </h1>
          <p className="subtitle">
            Snap receipts, tag spending, and split shared trips with friends — our flagship expense
            tracker built for speed, receipts, and privacy.
            From <strong>Eterno Limited</strong>, Christchurch.
          </p>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="products-inner">
          <div className="section-header">
            <h2>Built for you</h2>
            <p>Software that respects your time, your data, and your intelligence.</p>
          </div>
          <div className="product-grid">
            <ProductCard
              name="KeaLedger"
              description="The smart expense tracker that understands your receipts — and now splits shared trips too. Snap, categorise, settle up, all in seconds."
              iosUrl="https://apps.apple.com/app/kealedger"
              androidUrl="https://play.google.com/store/apps/details?id=com.endless.kealedger"
              iconUrl="/KeaLedger.png"
            />
            <ProductCard
              name="Coming Soon"
              description="Something new is on the horizon. Stay tuned for our next product release."
              isComingSoon={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
