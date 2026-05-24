import { useState } from 'react';

type Lang = 'en' | 'zh-cn' | 'zh-tw' | 'ja' | 'ko';
type Section = 'privacy' | 'terms';

interface PrivacyProps {
  defaultSection?: Section;
}

export default function Privacy({ defaultSection = 'privacy' }: PrivacyProps) {
  const lang: Lang = 'en';
  const [section, setSection] = useState<Section>(defaultSection);

  const sectionLabels: Record<Lang, { privacy: string; terms: string }> = {
    en: { privacy: 'Privacy Policy', terms: 'Terms of Service' },
    'zh-cn': { privacy: '隐私政策', terms: '服务条款' },
    'zh-tw': { privacy: '隱私政策', terms: '服務條款' },
    ja: { privacy: 'プライバシーポリシー', terms: '利用規約' },
    ko: { privacy: '개인정보 처리방침', terms: '서비스 이용약관' },
  };

  return (
    <div className="privacy-page">
      <div className="privacy-hero">
        <img src="/KeaLedger.png" alt="KeaLedger" />
        <h1>KeaLedger</h1>
      </div>

      <div className="section-tabs">
        <button
          className={`section-tab ${section === 'privacy' ? 'active' : ''}`}
          onClick={() => setSection('privacy')}
        >
          {sectionLabels[lang].privacy}
        </button>
        <button
          className={`section-tab ${section === 'terms' ? 'active' : ''}`}
          onClick={() => setSection('terms')}
        >
          {sectionLabels[lang].terms}
        </button>
      </div>

      <div className="policy-card">
        {section === 'privacy' ? <PrivacyContent lang={lang} /> : <TermsContent lang={lang} />}
      </div>
    </div>
  );
}

/* ================================================================
   PRIVACY POLICY — all languages
   ================================================================ */
function PrivacyContent({ lang }: { lang: Lang }) {
  switch (lang) {
    case 'zh-cn': return <PrivacyZhCn />;
    case 'zh-tw': return <PrivacyZhTw />;
    case 'ja': return <PrivacyJa />;
    case 'ko': return <PrivacyKo />;
    default: return <PrivacyEn />;
  }
}

function PrivacyEn() {
  return (
    <>
      <h2>Privacy Policy</h2>
      <p><strong>Effective Date:</strong> 9 May 2026</p>
      <p><strong>Developer:</strong> Eterno Limited (New Zealand)</p>

      <h3>Overview</h3>
      <p>KeaLedger is an iOS expense tracker app developed by Eterno Limited. We are committed to protecting your privacy. This policy explains how we handle your data.</p>

      <h3>Data Collection</h3>
      <p>KeaLedger stores your expense records, account books, categories, labels, participators, invoice photos, and app settings locally on your device using Apple's on-device storage. KeaLedger does <strong>not</strong> upload your transaction history, invoice photos, receipt text, or merchant names to Eterno Limited's servers.</p>

      <h3>Analytics</h3>
      <p>KeaLedger does <strong>not</strong> use any analytics frameworks, tracking tools, or telemetry. We do not monitor your usage patterns or behaviour within the app.</p>

      <h3>Third-Party Data Sharing</h3>
      <p>KeaLedger does <strong>not</strong> sell your data and does <strong>not</strong> share your financial records with third parties for advertising, analytics, or tracking. Limited data is exchanged only for optional sign-in and App Store purchases as described below.</p>

      <h3>Device Region for Categorisation</h3>
      <p>The current App Store build uses your device locale/region to choose local merchant rules. It does not contact ipapi.co or any other geolocation provider.</p>

      <h3>Merchant Classification</h3>
      <p>Receipt categorisation runs on-device using OCR and local merchant rules. The current App Store build does not send merchant names, receipt text, line items, amounts, dates, photos, or category lists to Eterno Limited, Cloudflare, Anthropic, Microsoft Bing, or any other remote classifier.</p>

      <h3>Optional Pro Purchase</h3>
      <p>KeaLedger Pro is an optional one-time purchase handled by Apple StoreKit. Apple processes the payment. KeaLedger receives StoreKit transaction status and product information only to unlock or restore Pro access. We do not receive your credit card number, bank details, or full App Store billing profile.</p>

      <h3>Authentication</h3>
      <p>KeaLedger offers optional sign-in via:</p>
      <ul>
        <li><strong>Sign in with Apple</strong> — Your Apple user ID, email address, and display name are received from Apple and stored locally on your device for account identification. No data is sent to Eterno's servers.</li>
        <li><strong>Google Sign-In</strong> — Your Google user ID, email address, display name, and profile photo URL are received from Google and stored locally on your device. Your profile photo is downloaded from Google's servers. No data is sent to Eterno's servers.</li>
      </ul>
      <p>Authentication is optional and is used only to enable account-related features.</p>

      <h3>Data Storage</h3>
      <p>Expense data is stored locally on your device. You can remove local records from the Account Books data-management area, delete your signed-in account from inside the app, or delete the app from the device. Authentication credentials are stored in the iOS Keychain and are cleared when you delete the account or reinstall the app.</p>

      <h3>Children's Privacy</h3>
      <p>KeaLedger does not knowingly collect any personal information from children.</p>

      <h3>Changes to This Policy</h3>
      <p>We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated effective date.</p>

      <div className="policy-contact">
        <h3>Contact Us</h3>
        <p>If you have questions about this privacy policy, please contact us at:<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

function PrivacyZhCn() {
  return (
    <>
      <h2>隐私政策</h2>
      <p><strong>生效日期：</strong>2026年5月9日</p>
      <p><strong>开发者：</strong>Eterno Limited（新西兰）</p>

      <h3>概述</h3>
      <p>KeaLedger 是由 Eterno Limited 开发的 iOS 记账应用。我们致力于保护您的隐私。本政策说明了我们如何处理您的数据。</p>

      <h3>数据收集</h3>
      <p>KeaLedger <strong>不会</strong>在 Eterno Limited 运营的外部服务器上收集或存储您的财务数据。您的支出记录、账本、分类、标签、参与者、小票照片、设置和商家映射均使用 Apple 的设备本地存储保存在您的设备上。</p>

      <h3>数据分析</h3>
      <p>KeaLedger <strong>不使用</strong>任何分析框架、追踪工具或遥测技术。我们不会监控您在应用内的使用模式或行为。</p>

      <h3>第三方数据共享</h3>
      <p>KeaLedger <strong>不会</strong>出售您的数据，也不会为广告、分析或追踪目的与第三方共享您的财务记录。有限数据仅会在可选登录和 App Store 购买流程中交换，详情如下。</p>

      <h3>用于分类的设备地区</h3>
      <p>当前 App Store 版本会使用您的设备语言/地区来选择本地商家规则。它不会联系 ipapi.co 或任何其他地理定位服务。</p>

      <h3>商家分类</h3>
      <p>小票分类在设备本地通过 OCR 和本地商家规则完成。当前 App Store 版本不会把商家名称、小票文字、明细、金额、日期、照片或分类列表发送给 Eterno Limited、Cloudflare、Anthropic、Microsoft Bing 或任何其他远程分类服务。</p>

      <h3>身份验证</h3>
      <p>KeaLedger 提供可选的登录方式：</p>
      <ul>
        <li><strong>通过 Apple 登录</strong> — 您的 Apple 用户ID、电子邮件地址和显示名称将从 Apple 获取并存储在您的设备本地。不会向 Eterno 的服务器发送任何数据。</li>
        <li><strong>Google 登录</strong> — 您的 Google 用户ID、电子邮件地址、显示名称和头像链接将从 Google 获取并存储在您的设备本地。头像图片从 Google 服务器下载。不会向 Eterno 的服务器发送任何数据。</li>
      </ul>
      <p>身份验证是可选的，仅用于启用账户相关功能。</p>

      <h3>数据存储</h3>
      <p>支出数据存储在您的设备本地，删除应用时将被移除。身份验证凭据存储在 iOS 钥匙串中，重新安装应用时会被清除。</p>

      <h3>儿童隐私</h3>
      <p>KeaLedger 不会故意收集任何儿童的个人信息。</p>

      <h3>政策变更</h3>
      <p>我们可能会不时更新本隐私政策。任何更改将在本页面上反映，并更新生效日期。</p>

      <div className="policy-contact">
        <h3>联系我们</h3>
        <p>如果您对本隐私政策有任何疑问，请通过以下方式联系我们：<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

function PrivacyZhTw() {
  return (
    <>
      <h2>隱私政策</h2>
      <p><strong>生效日期：</strong>2026年5月9日</p>
      <p><strong>開發者：</strong>Eterno Limited（紐西蘭）</p>

      <h3>概述</h3>
      <p>KeaLedger 是由 Eterno Limited 開發的 iOS 記帳應用程式。我們致力於保護您的隱私。本政策說明了我們如何處理您的資料。</p>

      <h3>資料收集</h3>
      <p>KeaLedger <strong>不會</strong>在 Eterno Limited 營運的外部伺服器上收集或儲存您的財務資料。您的支出記錄、帳本、分類、標籤、參與者、收據照片、設定和商家對應均使用 Apple 的裝置本機儲存保存在您的裝置上。</p>

      <h3>資料分析</h3>
      <p>KeaLedger <strong>不使用</strong>任何分析框架、追蹤工具或遙測技術。我們不會監控您在應用程式內的使用模式或行為。</p>

      <h3>第三方資料分享</h3>
      <p>KeaLedger <strong>不會</strong>出售您的資料，也不會為廣告、分析或追蹤目的與第三方分享您的財務記錄。有限資料僅會在可選登入和 App Store 購買流程中交換，詳情如下。</p>

      <h3>用於分類的裝置地區</h3>
      <p>目前 App Store 版本會使用您的裝置語言/地區來選擇本機商家規則。它不會聯絡 ipapi.co 或任何其他地理定位服務。</p>

      <h3>商家分類</h3>
      <p>收據分類在裝置本機透過 OCR 和本機商家規則完成。目前 App Store 版本不會把商家名稱、收據文字、明細、金額、日期、照片或分類清單傳送給 Eterno Limited、Cloudflare、Anthropic、Microsoft Bing 或任何其他遠端分類服務。</p>

      <h3>身份驗證</h3>
      <p>KeaLedger 提供可選的登入方式：</p>
      <ul>
        <li><strong>透過 Apple 登入</strong> — 您的 Apple 用戶ID、電子郵件地址和顯示名稱將從 Apple 取得並儲存在您的裝置本機。不會向 Eterno 的伺服器傳送任何資料。</li>
        <li><strong>Google 登入</strong> — 您的 Google 用戶ID、電子郵件地址、顯示名稱和頭像連結將從 Google 取得並儲存在您的裝置本機。頭像圖片從 Google 伺服器下載。不會向 Eterno 的伺服器傳送任何資料。</li>
      </ul>
      <p>身份驗證是可選的，僅用於啟用帳戶相關功能。</p>

      <h3>資料儲存</h3>
      <p>支出資料儲存在您的裝置本機，刪除應用程式時將被移除。身份驗證憑據儲存在 iOS 鑰匙圈中，重新安裝應用程式時會被清除。</p>

      <h3>兒童隱私</h3>
      <p>KeaLedger 不會故意收集任何兒童的個人資訊。</p>

      <h3>政策變更</h3>
      <p>我們可能會不時更新本隱私政策。任何變更將在本頁面上反映，並更新生效日期。</p>

      <div className="policy-contact">
        <h3>聯絡我們</h3>
        <p>如果您對本隱私政策有任何疑問，請透過以下方式聯絡我們：<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

function PrivacyJa() {
  return (
    <>
      <h2>プライバシーポリシー</h2>
      <p><strong>発効日：</strong>2026年5月9日</p>
      <p><strong>開発者：</strong>Eterno Limited（ニュージーランド）</p>

      <h3>概要</h3>
      <p>KeaLedger は Eterno Limited が開発した iOS 家計簿アプリです。私たちはお客様のプライバシーの保護に努めています。本ポリシーでは、お客様のデータの取り扱いについて説明します。</p>

      <h3>データ収集</h3>
      <p>KeaLedger は Eterno Limited が運営する外部サーバーにお客様の金融データを<strong>収集・保存することはありません</strong>。支出記録、家計簿、カテゴリ、ラベル、参加者、レシート写真、設定、店舗マッピングは、Apple のデバイス内ストレージを使用してお客様のデバイスにローカル保存されます。</p>

      <h3>アナリティクス</h3>
      <p>KeaLedger は分析フレームワーク、トラッキングツール、テレメトリを<strong>一切使用しません</strong>。アプリ内でのご利用パターンや行動を監視することはありません。</p>

      <h3>第三者とのデータ共有</h3>
      <p>KeaLedger はお客様のデータを販売せず、広告、分析、トラッキング目的で<strong>財務記録を第三者と共有しません</strong>。限定的なデータ交換は、オプションのサインインと App Store 購入に限られます。詳細は以下をご覧ください。</p>

      <h3>分類に使うデバイス地域</h3>
      <p>現在の App Store ビルドは、ローカルの店舗ルールを選ぶためにデバイスの言語/地域を使用します。ipapi.co やその他の位置情報プロバイダーには接続しません。</p>

      <h3>店舗分類</h3>
      <p>レシート分類は、OCR とローカル店舗ルールを使ってデバイス上で実行されます。現在の App Store ビルドは、店舗名、レシート本文、明細、金額、日付、写真、カテゴリリストを Eterno Limited、Cloudflare、Anthropic、Microsoft Bing、その他のリモート分類サービスへ送信しません。</p>

      <h3>認証</h3>
      <p>KeaLedger では、以下のオプションのサインイン方法をご利用いただけます：</p>
      <ul>
        <li><strong>Apple でサインイン</strong> — お客様の Apple ユーザーID、メールアドレス、表示名が Apple から取得され、デバイスにローカル保存されます。Eterno のサーバーにデータが送信されることはありません。</li>
        <li><strong>Google サインイン</strong> — お客様の Google ユーザーID、メールアドレス、表示名、プロフィール画像URLが Google から取得され、デバイスにローカル保存されます。プロフィール画像は Google のサーバーからダウンロードされます。Eterno のサーバーにデータが送信されることはありません。</li>
      </ul>
      <p>認証はオプションであり、アカウント関連機能を有効にするためにのみ使用されます。</p>

      <h3>データ保存</h3>
      <p>支出データはお客様のデバイスにローカル保存され、アプリを削除すると消去されます。認証情報は iOS キーチェーンに保存され、アプリを再インストールするとクリアされます。</p>

      <h3>お子様のプライバシー</h3>
      <p>KeaLedger はお子様の個人情報を意図的に収集することはありません。</p>

      <h3>ポリシーの変更</h3>
      <p>本プライバシーポリシーは随時更新される場合があります。変更がある場合は、発効日を更新の上、本ページに反映されます。</p>

      <div className="policy-contact">
        <h3>お問い合わせ</h3>
        <p>本プライバシーポリシーについてご質問がございましたら、以下までご連絡ください：<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

function PrivacyKo() {
  return (
    <>
      <h2>개인정보 처리방침</h2>
      <p><strong>시행일:</strong> 2026년 5월 9일</p>
      <p><strong>개발자:</strong> Eterno Limited (뉴질랜드)</p>

      <h3>개요</h3>
      <p>KeaLedger는 Eterno Limited가 개발한 iOS 가계부 앱입니다. 당사는 귀하의 개인정보 보호에 최선을 다하고 있습니다. 본 정책은 귀하의 데이터를 어떻게 처리하는지 설명합니다.</p>

      <h3>데이터 수집</h3>
      <p>KeaLedger는 Eterno Limited가 운영하는 외부 서버에 귀하의 금융 데이터를 <strong>수집하거나 저장하지 않습니다</strong>. 지출 기록, 장부, 카테고리, 라벨, 참여자, 영수증 사진, 설정 및 가맹점 매핑은 Apple의 기기 내 저장소를 사용하여 귀하의 기기에 로컬로 저장됩니다.</p>

      <h3>분석</h3>
      <p>KeaLedger는 분석 프레임워크, 추적 도구 또는 원격 측정을 <strong>일절 사용하지 않습니다</strong>. 앱 내에서의 사용 패턴이나 행동을 모니터링하지 않습니다.</p>

      <h3>제3자 데이터 공유</h3>
      <p>KeaLedger는 귀하의 데이터를 판매하지 않으며 광고, 분석 또는 추적 목적으로 <strong>재무 기록을 제3자와 공유하지 않습니다</strong>. 제한적인 데이터 교환은 선택적 로그인과 App Store 구매에만 사용됩니다. 자세한 내용은 아래를 참조하세요.</p>

      <h3>분류에 사용하는 기기 지역</h3>
      <p>현재 App Store 빌드는 로컬 가맹점 규칙을 선택하기 위해 기기의 언어/지역을 사용합니다. ipapi.co 또는 기타 위치 정보 제공자에 접속하지 않습니다.</p>

      <h3>가맹점 분류</h3>
      <p>영수증 분류는 OCR과 로컬 가맹점 규칙을 사용하여 기기에서 실행됩니다. 현재 App Store 빌드는 가맹점 이름, 영수증 텍스트, 품목, 금액, 날짜, 사진 또는 카테고리 목록을 Eterno Limited, Cloudflare, Anthropic, Microsoft Bing 또는 기타 원격 분류 서비스로 전송하지 않습니다.</p>

      <h3>인증</h3>
      <p>KeaLedger는 다음과 같은 선택적 로그인 방법을 제공합니다:</p>
      <ul>
        <li><strong>Apple로 로그인</strong> — 귀하의 Apple 사용자 ID, 이메일 주소, 표시 이름이 Apple에서 가져와 기기에 로컬로 저장됩니다. Eterno 서버로 데이터가 전송되지 않습니다.</li>
        <li><strong>Google 로그인</strong> — 귀하의 Google 사용자 ID, 이메일 주소, 표시 이름, 프로필 사진 URL이 Google에서 가져와 기기에 로컬로 저장됩니다. 프로필 사진은 Google 서버에서 다운로드됩니다. Eterno 서버로 데이터가 전송되지 않습니다.</li>
      </ul>
      <p>인증은 선택 사항이며 계정 관련 기능을 활성화하기 위해서만 사용됩니다.</p>

      <h3>데이터 저장</h3>
      <p>지출 데이터는 귀하의 기기에 로컬로 저장되며, 앱을 삭제하면 제거됩니다. 인증 자격 증명은 iOS 키체인에 저장되며, 앱을 재설치하면 삭제됩니다.</p>

      <h3>아동 개인정보</h3>
      <p>KeaLedger는 아동의 개인정보를 의도적으로 수집하지 않습니다.</p>

      <h3>정책 변경</h3>
      <p>본 개인정보 처리방침은 수시로 업데이트될 수 있습니다. 변경 사항은 시행일을 업데이트하여 이 페이지에 반영됩니다.</p>

      <h3>개인정보 처리자</h3>
      <p>Eterno Limited (뉴질랜드 오클랜드 소재)가 본 앱의 개인정보 처리자입니다.</p>

      <h3>정보주체의 권리</h3>
      <p>귀하는 본 앱에서 수집된 개인정보에 대해 열람, 정정, 삭제를 요청할 권리가 있습니다. 앱을 삭제하면 모든 로컬 데이터가 영구적으로 제거됩니다.</p>

      <div className="policy-contact">
        <h3>문의하기</h3>
        <p>본 개인정보 처리방침에 관한 질문이 있으시면 아래로 연락해 주세요:<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

/* ================================================================
   TERMS OF SERVICE — all languages
   ================================================================ */
function TermsContent({ lang }: { lang: Lang }) {
  switch (lang) {
    case 'zh-cn': return <TermsZhCn />;
    case 'zh-tw': return <TermsZhTw />;
    case 'ja': return <TermsJa />;
    case 'ko': return <TermsKo />;
    default: return <TermsEn />;
  }
}

function TermsEn() {
  return (
    <>
      <h2>Terms of Service</h2>
      <p><strong>Effective Date:</strong> 9 May 2026</p>
      <p><strong>Developer:</strong> Eterno Limited (New Zealand)</p>

      <h3>1. Acceptance of Terms</h3>
      <p>By downloading, installing, or using KeaLedger, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.</p>

      <h3>2. Description of Service</h3>
      <p>KeaLedger is an iOS expense tracking application that allows users to record, categorise, and analyse personal financial transactions across account books. The app includes receipt OCR, merchant category suggestions, custom categories and labels, Split account books, and settlement helpers.</p>

      <h3>3. User Accounts</h3>
      <p>KeaLedger offers optional sign-in via Apple or Google. Creating an account is not required to use the core features of the app. Sign-in is used for local account identification, account deletion, purchase restoration, and Pro access state.</p>

      <h3>4. Optional Pro Purchase</h3>
      <p>KeaLedger offers an optional one-time Pro purchase through Apple's App Store. This purchase unlocks lifetime Pro access for your Apple ID and does not auto-renew. You can restore your purchase on your devices using Apple's restore purchases flow. Payment, refunds, and billing are handled by Apple under Apple's App Store terms.</p>

      <h3>5. User Data &amp; Content</h3>
      <p>All financial data, account books, categories, labels, participators, and settings you create within KeaLedger are stored locally on your device. You are responsible for maintaining your own backups. Eterno Limited is not responsible for any data loss resulting from device failure, app deletion, local data clearing, or other circumstances.</p>

      <h3>6. Split Account Books</h3>
      <p>Split account books and settlement helpers are convenience tools for tracking shared expenses. You are responsible for checking the records, participators, generated settlement entries, waived entries, and any real-world payments before relying on the results.</p>

      <h3>7. Acceptable Use</h3>
      <p>You agree to use KeaLedger only for lawful purposes and in accordance with these terms. You may not attempt to reverse-engineer, decompile, or extract the source code of the application.</p>

      <h3>8. Intellectual Property</h3>
      <p>KeaLedger, including its design, code, logos, and content, is the intellectual property of Eterno Limited. All rights are reserved. You are granted a limited, non-exclusive, non-transferable licence to use the app for personal purposes.</p>

      <h3>9. Disclaimers</h3>
      <p>KeaLedger is provided "as is" without warranties of any kind, either express or implied. Eterno Limited does not warrant that the app will be error-free or uninterrupted. OCR, categorisation, currency display, Split calculations, and settlement suggestions are provided for convenience and may not be 100% accurate.</p>

      <h3>10. Limitation of Liability</h3>
      <p>To the maximum extent permitted by law, Eterno Limited shall not be liable for any indirect, incidental, special, or consequential damages arising from or related to your use of KeaLedger, including any financial decisions made based on information provided by the app.</p>

      <h3>11. Governing Law</h3>
      <p>These terms are governed by and construed in accordance with the laws of New Zealand. Any disputes shall be subject to the exclusive jurisdiction of the courts of New Zealand.</p>

      <h3>12. Changes to These Terms</h3>
      <p>We may update these Terms of Service from time to time. Continued use of the app after changes constitutes acceptance of the updated terms.</p>

      <div className="policy-contact">
        <h3>Contact Us</h3>
        <p>If you have questions about these terms, please contact us at:<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

function TermsZhCn() {
  return (
    <>
      <h2>服务条款</h2>
      <p><strong>生效日期：</strong>2026年5月9日</p>
      <p><strong>开发者：</strong>Eterno Limited（新西兰）</p>

      <h3>1. 条款接受</h3>
      <p>通过下载、安装或使用 KeaLedger，您同意受这些服务条款的约束。如果您不同意这些条款，请勿使用本应用。</p>

      <h3>2. 服务说明</h3>
      <p>KeaLedger 是一款 iOS 记账应用，允许用户在多个账本中记录、分类和分析个人财务交易。应用包括票据 OCR、商家分类建议、自定义分类和标签、Split 账本以及结算辅助功能。</p>

      <h3>3. 用户账户</h3>
      <p>KeaLedger 提供通过 Apple 或 Google 的可选登录。使用应用的核心功能不需要创建账户。登录用于本地账户识别、账户删除、恢复购买以及 Pro 权限状态。</p>

      <h3>4. 可选 Pro 购买</h3>
      <p>KeaLedger 通过 Apple App Store 提供可选的一次性 Pro 购买。该购买会为您的 Apple ID 解锁终身 Pro 权限，且不会自动续费。付款、退款和账单由 Apple 根据 App Store 条款处理。</p>

      <h3>5. 用户数据与内容</h3>
      <p>您在 KeaLedger 中创建的所有财务数据、账本、分类、标签、参与者和设置均存储在您的设备本地。您有责任维护自己的备份。Eterno Limited 不对因设备故障、应用删除、本地数据清除或其他情况导致的任何数据丢失负责。</p>

      <h3>6. Split 账本</h3>
      <p>Split 账本和结算辅助功能仅用于方便记录共同支出。您有责任在依赖结果前检查记录、参与者、生成的结算记录、豁免记录以及实际付款。</p>

      <h3>7. 合理使用</h3>
      <p>您同意仅将 KeaLedger 用于合法目的，并遵守这些条款。您不得尝试对应用程序进行逆向工程、反编译或提取源代码。</p>

      <h3>8. 知识产权</h3>
      <p>KeaLedger 及其设计、代码、标志和内容是 Eterno Limited 的知识产权。保留所有权利。您被授予有限的、非排他性的、不可转让的许可，以供个人使用该应用。</p>

      <h3>9. 免责声明</h3>
      <p>KeaLedger 按"现状"提供，不提供任何明示或暗示的保证。Eterno Limited 不保证该应用不会出错或不间断运行。OCR、分类、货币显示、Split 计算和结算建议仅为方便而提供，可能不是100%准确。</p>

      <h3>10. 责任限制</h3>
      <p>在法律允许的最大范围内，Eterno Limited 不对因使用 KeaLedger 而产生的或与之相关的任何间接、附带、特殊或后果性损害承担责任，包括基于应用提供的信息做出的任何财务决定。</p>

      <h3>11. 适用法律</h3>
      <p>这些条款受新西兰法律管辖并据其解释。任何争议应受新西兰法院的专属管辖。</p>

      <h3>12. 条款变更</h3>
      <p>我们可能会不时更新这些服务条款。在变更后继续使用本应用即表示接受更新后的条款。</p>

      <div className="policy-contact">
        <h3>联系我们</h3>
        <p>如果您对这些条款有任何疑问，请通过以下方式联系我们：<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

function TermsZhTw() {
  return (
    <>
      <h2>服務條款</h2>
      <p><strong>生效日期：</strong>2026年5月9日</p>
      <p><strong>開發者：</strong>Eterno Limited（紐西蘭）</p>

      <h3>1. 條款接受</h3>
      <p>透過下載、安裝或使用 KeaLedger，您同意受這些服務條款的約束。如果您不同意這些條款，請勿使用本應用程式。</p>

      <h3>2. 服務說明</h3>
      <p>KeaLedger 是一款 iOS 記帳應用程式，允許使用者在多個帳本中記錄、分類和分析個人財務交易。應用程式包括收據 OCR、商家分類建議、自訂分類和標籤、Split 帳本以及結算輔助功能。</p>

      <h3>3. 使用者帳戶</h3>
      <p>KeaLedger 提供透過 Apple 或 Google 的可選登入。使用應用程式的核心功能不需要建立帳戶。登入用於本機帳戶識別、帳戶刪除、恢復購買以及 Pro 權限狀態。</p>

      <h3>4. 可選 Pro 購買</h3>
      <p>KeaLedger 透過 Apple App Store 提供可選的一次性 Pro 購買。該購買會為您的 Apple ID 解鎖終身 Pro 權限，且不會自動續訂。付款、退款和帳單由 Apple 依 App Store 條款處理。</p>

      <h3>5. 使用者資料與內容</h3>
      <p>您在 KeaLedger 中建立的所有財務資料、帳本、分類、標籤、參與者和設定均儲存在您的裝置本機。您有責任維護自己的備份。Eterno Limited 不對因裝置故障、應用程式刪除、本機資料清除或其他情況導致的任何資料遺失負責。</p>

      <h3>6. Split 帳本</h3>
      <p>Split 帳本和結算輔助功能僅用於方便記錄共同支出。您有責任在依賴結果前檢查記錄、參與者、產生的結算記錄、豁免記錄以及實際付款。</p>

      <h3>7. 合理使用</h3>
      <p>您同意僅將 KeaLedger 用於合法目的，並遵守這些條款。您不得嘗試對應用程式進行逆向工程、反編譯或提取原始碼。</p>

      <h3>8. 智慧財產權</h3>
      <p>KeaLedger 及其設計、程式碼、標誌和內容是 Eterno Limited 的智慧財產權。保留所有權利。您被授予有限的、非排他性的、不可轉讓的授權，以供個人使用該應用程式。</p>

      <h3>9. 免責聲明</h3>
      <p>KeaLedger 按「現狀」提供，不提供任何明示或暗示的保證。Eterno Limited 不保證該應用程式不會出錯或不間斷運行。OCR、分類、貨幣顯示、Split 計算和結算建議僅為方便而提供，可能不是100%準確。</p>

      <h3>10. 責任限制</h3>
      <p>在法律允許的最大範圍內，Eterno Limited 不對因使用 KeaLedger 而產生的或與之相關的任何間接、附帶、特殊或後果性損害承擔責任，包括基於應用程式提供的資訊做出的任何財務決定。</p>

      <h3>11. 適用法律</h3>
      <p>這些條款受紐西蘭法律管轄並據其解釋。任何爭議應受紐西蘭法院的專屬管轄。</p>

      <h3>12. 條款變更</h3>
      <p>我們可能會不時更新這些服務條款。在變更後繼續使用本應用程式即表示接受更新後的條款。</p>

      <div className="policy-contact">
        <h3>聯絡我們</h3>
        <p>如果您對這些條款有任何疑問，請透過以下方式聯絡我們：<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

function TermsJa() {
  return (
    <>
      <h2>利用規約</h2>
      <p><strong>発効日：</strong>2026年5月9日</p>
      <p><strong>開発者：</strong>Eterno Limited（ニュージーランド）</p>

      <h3>1. 規約の同意</h3>
      <p>KeaLedger をダウンロード、インストール、または使用することにより、お客様はこの利用規約に拘束されることに同意したものとみなされます。これらの条件に同意されない場合は、アプリを使用しないでください。</p>

      <h3>2. サービスの説明</h3>
      <p>KeaLedger は、複数の帳簿にわたって個人の金融取引を記録、分類、分析できる iOS 家計簿アプリケーションです。レシート OCR、店舗カテゴリ提案、カスタムカテゴリとラベル、Split 帳簿、精算補助機能を含みます。</p>

      <h3>3. ユーザーアカウント</h3>
      <p>KeaLedger は Apple または Google によるオプションのサインインを提供しています。アプリのコア機能を使用するためにアカウントの作成は必要ありません。サインインは、ローカルのアカウント識別、アカウント削除、購入の復元、Pro アクセス状態に使用されます。</p>

      <h3>4. オプションの Pro 購入</h3>
      <p>KeaLedger は Apple App Store を通じてオプションの一回限りの Pro 購入を提供します。この購入により、お客様の Apple ID に対してライフタイムの Pro アクセスが解除され、自動更新はありません。支払い、返金、請求は Apple の App Store 規約に基づき Apple が処理します。</p>

      <h3>5. ユーザーデータとコンテンツ</h3>
      <p>KeaLedger 内で作成したすべての財務データ、帳簿、カテゴリ、ラベル、参加者、設定は、お客様のデバイスにローカル保存されます。バックアップの維持はお客様の責任となります。Eterno Limited は、デバイスの故障、アプリの削除、ローカルデータの消去、その他の状況に起因するデータの損失について責任を負いません。</p>

      <h3>6. Split 帳簿</h3>
      <p>Split 帳簿と精算補助機能は、共有支出を記録するための補助ツールです。結果に依拠する前に、記録、参加者、生成された精算記録、免除記録、実際の支払いを確認する責任はお客様にあります。</p>

      <h3>7. 適正使用</h3>
      <p>お客様は、KeaLedger を合法的な目的のみに使用し、これらの規約に従って使用することに同意するものとします。アプリケーションのリバースエンジニアリング、逆コンパイル、またはソースコードの抽出を試みてはなりません。</p>

      <h3>8. 知的財産権</h3>
      <p>KeaLedger のデザイン、コード、ロゴ、コンテンツを含め、Eterno Limited の知的財産です。すべての権利は留保されています。お客様には、個人的な目的でアプリを使用するための限定的で非独占的かつ譲渡不能なライセンスが付与されます。</p>

      <h3>9. 免責事項</h3>
      <p>KeaLedger は、明示的または暗示的を問わず、いかなる種類の保証もなく「現状のまま」提供されます。Eterno Limited は、アプリにエラーがないこと、または中断なく動作することを保証しません。OCR、分類、通貨表示、Split 計算、精算提案は利便性のために提供されており、100%正確ではない場合があります。</p>

      <h3>10. 責任の制限</h3>
      <p>法律で認められる最大限の範囲において、Eterno Limited は、アプリが提供する情報に基づいて行われた財務上の決定を含め、KeaLedger の使用に起因するまたは関連する間接的、付随的、特別、または結果的損害について責任を負いません。</p>

      <h3>11. 準拠法</h3>
      <p>この規約はニュージーランドの法律に準拠し、それに従って解釈されます。紛争はニュージーランドの裁判所の専属管轄に服するものとします。</p>

      <h3>12. 規約の変更</h3>
      <p>当社はこの利用規約を随時更新する場合があります。変更後もアプリを継続使用することは、更新された規約を承認したものとみなされます。</p>

      <div className="policy-contact">
        <h3>お問い合わせ</h3>
        <p>この規約についてご質問がございましたら、以下までご連絡ください：<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}

function TermsKo() {
  return (
    <>
      <h2>서비스 이용약관</h2>
      <p><strong>시행일:</strong> 2026년 5월 9일</p>
      <p><strong>개발자:</strong> Eterno Limited (뉴질랜드)</p>

      <h3>1. 약관 동의</h3>
      <p>KeaLedger를 다운로드, 설치 또는 사용함으로써 귀하는 본 서비스 이용약관에 구속되는 것에 동의합니다. 본 약관에 동의하지 않으시면 앱을 사용하지 마십시오.</p>

      <h3>2. 서비스 설명</h3>
      <p>KeaLedger는 여러 장부에서 개인 금융 거래를 기록, 분류 및 분석할 수 있는 iOS 가계부 앱입니다. 영수증 OCR, 가맹점 카테고리 제안, 사용자 지정 카테고리와 라벨, Split 장부, 정산 보조 기능을 포함합니다.</p>

      <h3>3. 사용자 계정</h3>
      <p>KeaLedger는 Apple 또는 Google을 통한 선택적 로그인을 제공합니다. 앱의 핵심 기능을 사용하기 위해 계정을 만들 필요가 없습니다. 로그인은 로컬 계정 식별, 계정 삭제, 구매 복원, Pro 접근 상태에 사용됩니다.</p>

      <h3>4. 선택적 Pro 구매</h3>
      <p>KeaLedger는 Apple App Store를 통해 선택적인 일회성 Pro 구매를 제공합니다. 이 구매는 귀하의 Apple ID에 평생 Pro 접근 권한을 잠금 해제하며 자동 갱신되지 않습니다. 결제, 환불 및 청구는 Apple의 App Store 약관에 따라 Apple이 처리합니다.</p>

      <h3>5. 사용자 데이터 및 콘텐츠</h3>
      <p>KeaLedger에서 생성한 모든 재무 데이터, 장부, 카테고리, 라벨, 참여자 및 설정은 귀하의 기기에 로컬로 저장됩니다. 백업 유지는 귀하의 책임입니다. Eterno Limited는 기기 고장, 앱 삭제, 로컬 데이터 삭제 또는 기타 상황으로 인한 데이터 손실에 대해 책임지지 않습니다.</p>

      <h3>6. Split 장부</h3>
      <p>Split 장부와 정산 보조 기능은 공동 지출을 기록하기 위한 편의 도구입니다. 결과에 의존하기 전에 기록, 참여자, 생성된 정산 기록, 면제 기록 및 실제 결제를 확인할 책임은 사용자에게 있습니다.</p>

      <h3>7. 적정 사용</h3>
      <p>귀하는 KeaLedger를 합법적인 목적으로만 사용하고 본 약관을 준수하는 데 동의합니다. 앱의 리버스 엔지니어링, 디컴파일 또는 소스 코드 추출을 시도해서는 안 됩니다.</p>

      <h3>8. 지적 재산권</h3>
      <p>KeaLedger의 디자인, 코드, 로고 및 콘텐츠를 포함하여 Eterno Limited의 지적 재산입니다. 모든 권리가 보유됩니다. 귀하에게는 개인 목적으로 앱을 사용할 수 있는 제한적이고 비독점적이며 양도 불가능한 라이선스가 부여됩니다.</p>

      <h3>9. 면책 조항</h3>
      <p>KeaLedger는 명시적 또는 묵시적 보증 없이 "있는 그대로" 제공됩니다. Eterno Limited는 앱에 오류가 없거나 중단 없이 작동한다고 보증하지 않습니다. OCR, 분류, 통화 표시, Split 계산 및 정산 제안은 편의를 위해 제공되며 100% 정확하지 않을 수 있습니다.</p>

      <h3>10. 책임 제한</h3>
      <p>법률이 허용하는 최대 범위 내에서, Eterno Limited는 앱이 제공하는 정보에 기반한 재무적 결정을 포함하여 KeaLedger 사용으로 인해 발생하는 간접적, 부수적, 특별 또는 결과적 손해에 대해 책임지지 않습니다.</p>

      <h3>11. 준거법</h3>
      <p>본 약관은 뉴질랜드 법률에 의해 규율되고 해석됩니다. 분쟁은 뉴질랜드 법원의 전속 관할에 따릅니다.</p>

      <h3>12. 약관 변경</h3>
      <p>당사는 본 서비스 이용약관을 수시로 업데이트할 수 있습니다. 변경 후에도 앱을 계속 사용하면 업데이트된 약관에 동의하는 것으로 간주됩니다.</p>

      <div className="policy-contact">
        <h3>문의하기</h3>
        <p>본 약관에 관한 질문이 있으시면 아래로 연락해 주세요:<br />
        <a href="mailto:support@eterno.nz">support@eterno.nz</a></p>
      </div>
    </>
  );
}
