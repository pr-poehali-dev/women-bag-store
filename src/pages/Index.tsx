import { useState } from "react";
import Icon from "@/components/ui/icon";

// ==================== DATA ====================
const BRANDS = ["Все бренды", "Hermès", "Chanel", "Louis Vuitton", "Dior", "Gucci", "Bottega Veneta", "Prada", "Celine"];
const MATERIALS = ["Все", "Кожа телёнка", "Крокодил", "Питон", "Замша", "Текстиль"];
const SEASONS = ["Все", "SS 2025", "FW 2024", "SS 2024", "Архив"];
const PRICE_RANGES = ["Все цены", "до 300 000 ₽", "300–800 тыс", "800 тыс – 1.5 млн", "от 1.5 млн ₽"];

const PRODUCTS = [
  {
    id: 1,
    brand: "Hermès",
    name: "Birkin 30",
    material: "Кожа телёнка",
    season: "SS 2025",
    price: 1850000,
    priceLabel: "1 850 000 ₽",
    image: "https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/3364b81e-6735-4756-9975-cb3b2d94f999.jpg",
    tag: "Хит",
    color: "Noir",
  },
  {
    id: 2,
    brand: "Chanel",
    name: "Classic Flap Medium",
    material: "Кожа телёнка",
    season: "FW 2024",
    price: 680000,
    priceLabel: "680 000 ₽",
    image: "https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/5d9a62e2-558d-4697-b4fd-b2891ec0185e.jpg",
    tag: "Новинка",
    color: "Beige",
  },
  {
    id: 3,
    brand: "Louis Vuitton",
    name: "Capucines BB",
    material: "Крокодил",
    season: "SS 2025",
    price: 2400000,
    priceLabel: "2 400 000 ₽",
    image: "https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/43f53bcd-5b1f-493f-af81-64049aa5230d.jpg",
    tag: "Эксклюзив",
    color: "Cognac",
  },
  {
    id: 4,
    brand: "Dior",
    name: "Lady Dior Large",
    material: "Замша",
    season: "FW 2024",
    price: 420000,
    priceLabel: "420 000 ₽",
    image: "https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/3364b81e-6735-4756-9975-cb3b2d94f999.jpg",
    tag: null,
    color: "Midnight",
  },
  {
    id: 5,
    brand: "Bottega Veneta",
    name: "Jodie Medium",
    material: "Кожа телёнка",
    season: "SS 2024",
    price: 310000,
    priceLabel: "310 000 ₽",
    image: "https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/5d9a62e2-558d-4697-b4fd-b2891ec0185e.jpg",
    tag: null,
    color: "Caramel",
  },
  {
    id: 6,
    brand: "Gucci",
    name: "Dionysus GG Small",
    material: "Текстиль",
    season: "SS 2025",
    price: 195000,
    priceLabel: "195 000 ₽",
    image: "https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/43f53bcd-5b1f-493f-af81-64049aa5230d.jpg",
    tag: "Скидка",
    color: "Ebony",
  },
];

const FAQ_ITEMS = [
  {
    q: "Как гарантируется подлинность сумок?",
    a: "Каждая сумка сопровождается сертификатом подлинности, оригинальной упаковкой и чеком от бутика. Мы работаем только с официальными поставщиками и проводим многоступенчатую проверку.",
  },
  {
    q: "Как осуществляется доставка?",
    a: "Доставка по Москве — курьером в течение 2–4 часов. По России — страхованной посылкой через СДЭК или DHL. Международная доставка доступна в 40+ стран.",
  },
  {
    q: "Возможен ли возврат или обмен?",
    a: "Да, в течение 14 дней при сохранении товарного вида и оригинальной упаковки. Для изделий из экзотических материалов — 7 дней.",
  },
  {
    q: "Есть ли возможность заказа конкретной модели?",
    a: "Да, мы принимаем индивидуальные заказы на поиск редких и эксклюзивных моделей. Срок исполнения — от 2 до 8 недель в зависимости от доступности.",
  },
  {
    q: "Принимаете ли вы оплату в рассрочку?",
    a: "Да, доступна рассрочка на 3, 6 и 12 месяцев без переплаты через наших партнёров — Тинькофф и Сбербанк.",
  },
];

const COLLECTIONS = [
  {
    title: "Осень / Зима 2024",
    subtitle: "Dark Romanticism",
    desc: "Богатые текстуры, глубокие оттенки и непреходящая элегантность",
    image: "https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/5d9a62e2-558d-4697-b4fd-b2891ec0185e.jpg",
  },
  {
    title: "Весна / Лето 2025",
    subtitle: "New Minimalism",
    desc: "Чистые линии, мягкие нюды и сдержанная роскошь нового сезона",
    image: "https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/43f53bcd-5b1f-493f-af81-64049aa5230d.jpg",
  },
];

// ==================== NAVBAR ====================
function Navbar({ activeSection, onNav, cartCount }: { activeSection: string; onNav: (s: string) => void; cartCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "collections", label: "Коллекции" },
    { id: "about", label: "О бренде" },
    { id: "delivery", label: "Доставка" },
    { id: "faq", label: "FAQ" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => onNav("home")}
          className="font-cormorant text-xl font-light tracking-[0.3em] text-foreground hover:text-gold transition-colors"
        >
          MAISON NOIR
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNav(link.id)}
              className={`nav-link font-ibm text-xs tracking-widest uppercase transition-colors ${
                activeSection === link.id ? "text-gold active" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNav("cart")}
            className="relative flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <Icon name="ShoppingBag" size={20} />
            {cartCount > 0 && (
              <span className="cart-badge absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNav(link.id); setMenuOpen(false); }}
              className={`text-left font-ibm text-xs tracking-widest uppercase ${
                activeSection === link.id ? "text-gold" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ==================== HERO ====================
function HeroSection({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/3364b81e-6735-4756-9975-cb3b2d94f999.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute left-[10%] top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden xl:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
        <div className="max-w-2xl">
          <p className="section-label fade-up-1 mb-6">Новая коллекция · 2025</p>
          <h1 className="hero-display text-6xl md:text-8xl xl:text-9xl text-foreground fade-up-2 mb-6">
            Искусство<br />
            <em className="text-gold not-italic">носить</em><br />
            роскошь
          </h1>
          <p className="fade-up-3 font-ibm text-sm font-light text-muted-foreground leading-relaxed max-w-md mb-10">
            Эксклюзивные сумки мировых домов моды с гарантией подлинности.
            Hermès, Chanel, Louis Vuitton и другие иконы люксовой индустрии.
          </p>
          <div className="fade-up-4 flex flex-wrap gap-4">
            <button
              onClick={() => onNav("catalog")}
              className="bg-gold text-background font-ibm text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold/90 transition-colors"
            >
              Смотреть каталог
            </button>
            <button
              onClick={() => onNav("collections")}
              className="border border-gold/40 text-foreground font-ibm text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-gold hover:text-gold transition-colors"
            >
              Коллекции
            </button>
          </div>

          <div className="mt-16 flex gap-12 fade-up-4">
            {[["500+", "Моделей"], ["15+", "Брендов"], ["100%", "Оригинал"]].map(([num, label]) => (
              <div key={label}>
                <p className="font-cormorant text-3xl font-light text-gold">{num}</p>
                <p className="font-ibm text-xs tracking-widest uppercase text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="section-label text-[0.55rem]">Прокрутить</p>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

// ==================== CATALOG ====================
function CatalogSection({ onAddToCart }: { onAddToCart: (id: number) => void }) {
  const [selectedBrand, setSelectedBrand] = useState("Все бренды");
  const [selectedMaterial, setSelectedMaterial] = useState("Все");
  const [selectedSeason, setSelectedSeason] = useState("Все");
  const [selectedPrice, setSelectedPrice] = useState("Все цены");
  const [filterOpen, setFilterOpen] = useState(true);

  const filtered = PRODUCTS.filter((p) => {
    const brandOk = selectedBrand === "Все бренды" || p.brand === selectedBrand;
    const matOk = selectedMaterial === "Все" || p.material === selectedMaterial;
    const seasonOk = selectedSeason === "Все" || p.season === selectedSeason;
    let priceOk = true;
    if (selectedPrice === "до 300 000 ₽") priceOk = p.price < 300000;
    else if (selectedPrice === "300–800 тыс") priceOk = p.price >= 300000 && p.price <= 800000;
    else if (selectedPrice === "800 тыс – 1.5 млн") priceOk = p.price > 800000 && p.price <= 1500000;
    else if (selectedPrice === "от 1.5 млн ₽") priceOk = p.price > 1500000;
    return brandOk && matOk && seasonOk && priceOk;
  });

  return (
    <section id="catalog" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">Наш магазин</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Каталог</h2>
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 font-ibm text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors"
          >
            <Icon name="SlidersHorizontal" size={14} />
            Фильтры
          </button>
        </div>

        <div className="gold-line mb-8" />

        {filterOpen && (
          <div className="mb-10 space-y-5 animate-fade-in">
            <div>
              <p className="section-label mb-3">Бренд</p>
              <div className="flex flex-wrap gap-2">
                {BRANDS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`filter-badge font-ibm text-xs tracking-wider px-4 py-2 ${selectedBrand === b ? "active" : "text-muted-foreground"}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="section-label mb-3">Материал</p>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMaterial(m)}
                      className={`filter-badge font-ibm text-xs tracking-wider px-3 py-1.5 ${selectedMaterial === m ? "active" : "text-muted-foreground"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="section-label mb-3">Сезон</p>
                <div className="flex flex-wrap gap-2">
                  {SEASONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSeason(s)}
                      className={`filter-badge font-ibm text-xs tracking-wider px-3 py-1.5 ${selectedSeason === s ? "active" : "text-muted-foreground"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="section-label mb-3">Цена</p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((pr) => (
                    <button
                      key={pr}
                      onClick={() => setSelectedPrice(pr)}
                      className={`filter-badge font-ibm text-xs tracking-wider px-3 py-1.5 ${selectedPrice === pr ? "active" : "text-muted-foreground"}`}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="font-ibm text-xs text-muted-foreground mb-8">
          Найдено: <span className="text-gold">{filtered.length}</span> из {PRODUCTS.length}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-cormorant text-3xl text-muted-foreground">Ничего не найдено</p>
            <p className="font-ibm text-xs text-muted-foreground mt-2">Попробуйте изменить фильтры</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <div key={product.id} className="product-card group cursor-pointer">
                <div className="relative overflow-hidden aspect-square bg-card mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="card-overlay absolute inset-0 bg-background/60 flex items-center justify-center gap-4">
                    <button
                      onClick={() => onAddToCart(product.id)}
                      className="bg-gold text-background font-ibm text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold/90 transition-colors"
                    >
                      В корзину
                    </button>
                  </div>
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-gold text-background font-ibm text-[10px] tracking-widest uppercase px-3 py-1">
                      {product.tag}
                    </div>
                  )}
                </div>
                <div>
                  <p className="section-label text-[0.6rem] mb-1">{product.brand}</p>
                  <h3 className="font-cormorant text-xl font-light text-foreground mb-1">{product.name}</h3>
                  <p className="font-ibm text-xs text-muted-foreground mb-3">{product.material} · {product.color} · {product.season}</p>
                  <div className="flex items-center justify-between">
                    <p className="price-gold text-lg">{product.priceLabel}</p>
                    <button onClick={() => onAddToCart(product.id)} className="text-muted-foreground hover:text-gold transition-colors">
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== COLLECTIONS ====================
function CollectionsSection() {
  return (
    <section id="collections" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-3">Сезонные линии</p>
        <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-12">Коллекции</h2>
        <div className="gold-line mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {COLLECTIONS.map((col, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="section-label mb-1">{col.subtitle}</p>
                  <h3 className="font-cormorant text-3xl text-foreground">{col.title}</h3>
                </div>
              </div>
              <p className="font-ibm text-sm text-muted-foreground leading-relaxed">{col.desc}</p>
              <button className="mt-4 font-ibm text-xs tracking-widest uppercase text-gold border-b border-gold/40 pb-0.5 hover:border-gold transition-colors">
                Смотреть коллекцию →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== ABOUT ====================
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://cdn.poehali.dev/projects/3347d16d-1aba-45a1-ac05-365e0c27ca27/files/43f53bcd-5b1f-493f-af81-64049aa5230d.jpg"
              alt="О нас"
              className="w-full aspect-square object-cover"
            />
            <div className="absolute -bottom-6 -right-6 border border-gold/20 w-full h-full pointer-events-none" />
          </div>
          <div>
            <p className="section-label mb-3">Наша история</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-8">О MAISON NOIR</h2>
            <div className="gold-line mb-8" />
            <div className="space-y-5 font-ibm text-sm text-muted-foreground leading-relaxed">
              <p>MAISON NOIR — это не просто магазин. Это пространство, где встречаются история великих домов моды и современный взгляд на люкс. Мы существуем с 2018 года и за это время создали доверие тысяч клиентов по всей России.</p>
              <p>Каждая сумка в нашей коллекции — это тщательно отобранный предмет искусства. Мы напрямую сотрудничаем с официальными бутиками и авторизованными дистрибьюторами Hermès, Chanel, Louis Vuitton и других знаковых марок.</p>
              <p>Наши эксперты проходят обучение у ведущих специалистов индустрии и гарантируют подлинность каждого изделия.</p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[["2018", "Год основания"], ["5000+", "Клиентов"], ["12", "Наград"]].map(([num, label]) => (
                <div key={label} className="text-center border border-border p-4">
                  <p className="font-cormorant text-3xl text-gold">{num}</p>
                  <p className="font-ibm text-[10px] tracking-widest uppercase text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== DELIVERY ====================
function DeliverySection() {
  const items = [
    { icon: "Truck", title: "Курьерская доставка", desc: "По Москве — 2–4 часа. По России — 1–3 дня через СДЭК. Страховка включена.", detail: "Бесплатно от 200 000 ₽" },
    { icon: "Globe", title: "Международная", desc: "Доставляем в 40+ стран. DHL или FedEx Priority. Таможенные документы оформляем за вас.", detail: "От 5 000 ₽" },
    { icon: "Shield", title: "Страховка и упаковка", desc: "Каждый заказ страхуется на полную стоимость и упаковывается в фирменный бокс.", detail: "Входит в стоимость" },
    { icon: "RotateCcw", title: "Возврат и обмен", desc: "14 дней на возврат при сохранении товарного вида. Деньги — в течение 3 рабочих дней.", detail: "Без вопросов" },
  ];

  return (
    <section id="delivery" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-3">Логистика и сервис</p>
        <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-12">Доставка</h2>
        <div className="gold-line mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="group">
              <div className="mb-5 w-12 h-12 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all">
                <Icon name={item.icon as "Truck"} size={20} className="text-gold" />
              </div>
              <h3 className="font-cormorant text-xl font-light text-foreground mb-3">{item.title}</h3>
              <p className="font-ibm text-xs text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
              <p className="font-ibm text-xs text-gold tracking-wider">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-border p-8 bg-background">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <p className="section-label mb-3">Самовывоз</p>
              <h3 className="font-cormorant text-3xl font-light text-foreground mb-4">Наш шоурум</h3>
              <p className="font-ibm text-sm text-muted-foreground leading-relaxed">
                Москва, ул. Петровка, 10<br />
                Пн–Сб: 11:00 — 21:00<br />
                Вс: 12:00 — 19:00
              </p>
              <button className="mt-6 font-ibm text-xs tracking-widest uppercase text-gold border-b border-gold/40 pb-0.5 hover:border-gold transition-colors">
                Посмотреть на карте →
              </button>
            </div>
            <div className="flex-1 bg-muted h-48 flex items-center justify-center">
              <p className="font-cormorant text-xl text-muted-foreground">Карта шоурума</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== FAQ ====================
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <p className="section-label mb-3">Ответы на вопросы</p>
        <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-12">Часто спрашивают</h2>
        <div className="gold-line mb-12" />
        <div className="space-y-0">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="faq-item">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-start justify-between py-6 text-left gap-6">
                <span className="font-cormorant text-xl text-foreground">{item.q}</span>
                <Icon name={openIndex === i ? "Minus" : "Plus"} size={16} className="text-gold flex-shrink-0 mt-1" />
              </button>
              {openIndex === i && (
                <div className="pb-6 animate-fade-in">
                  <p className="font-ibm text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== CONTACTS ====================
function ContactsSection() {
  return (
    <section id="contacts" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-3">Связаться с нами</p>
        <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-12">Контакты</h2>
        <div className="gold-line mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (495) 999-00-11", sub: "Ежедневно 10:00 — 22:00" },
              { icon: "Mail", label: "Email", value: "info@maisonnoir.ru", sub: "Ответим в течение 2 часов" },
              { icon: "MapPin", label: "Адрес", value: "Москва, ул. Петровка, 10", sub: "Пн–Сб 11:00–21:00, Вс 12:00–19:00" },
              { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (925) 999-00-11", sub: "Онлайн-консультация" },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon as "Phone"} size={16} className="text-gold" />
                </div>
                <div>
                  <p className="section-label text-[0.6rem] mb-1">{c.label}</p>
                  <p className="font-cormorant text-xl text-foreground">{c.value}</p>
                  <p className="font-ibm text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-border p-8 bg-background">
            <h3 className="font-cormorant text-2xl font-light text-foreground mb-6">Задать вопрос</h3>
            <div className="space-y-4">
              <div>
                <label className="section-label text-[0.6rem] block mb-2">Ваше имя</label>
                <input type="text" className="w-full bg-card border border-border text-foreground font-ibm text-sm px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50" placeholder="Анна Смирнова" />
              </div>
              <div>
                <label className="section-label text-[0.6rem] block mb-2">Телефон или email</label>
                <input type="text" className="w-full bg-card border border-border text-foreground font-ibm text-sm px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50" placeholder="+7 (___) ___-__-__" />
              </div>
              <div>
                <label className="section-label text-[0.6rem] block mb-2">Сообщение</label>
                <textarea rows={4} className="w-full bg-card border border-border text-foreground font-ibm text-sm px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50 resize-none" placeholder="Интересует Birkin 30 в чёрном цвете..." />
              </div>
              <button className="w-full bg-gold text-background font-ibm text-xs tracking-[0.2em] uppercase py-4 hover:bg-gold/90 transition-colors">
                Отправить запрос
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== CART ====================
function CartDrawer({ isOpen, onClose, cartItems, onRemove }: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: number[];
  onRemove: (id: number) => void;
}) {
  const items = PRODUCTS.filter((p) => cartItems.includes(p.id));
  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-cormorant text-2xl font-light text-foreground">
            Корзина <span className="text-gold">({items.length})</span>
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="ShoppingBag" size={40} className="text-muted-foreground mx-auto mb-4" />
              <p className="font-cormorant text-xl text-muted-foreground">Корзина пуста</p>
              <p className="font-ibm text-xs text-muted-foreground mt-2">Добавьте понравившиеся изделия</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <p className="section-label text-[0.6rem] mb-0.5">{item.brand}</p>
                  <p className="font-cormorant text-lg text-foreground">{item.name}</p>
                  <p className="font-ibm text-xs text-muted-foreground">{item.material}</p>
                  <p className="price-gold text-base mt-1">{item.priceLabel}</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-gold transition-colors self-start">
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border">
            <div className="flex justify-between items-center mb-6">
              <span className="font-ibm text-sm text-muted-foreground">Итого:</span>
              <span className="price-gold text-xl">{total.toLocaleString("ru-RU")} ₽</span>
            </div>
            <button className="w-full bg-gold text-background font-ibm text-xs tracking-[0.2em] uppercase py-4 hover:bg-gold/90 transition-colors">
              Оформить заказ
            </button>
            <button onClick={onClose} className="w-full mt-3 border border-border text-muted-foreground font-ibm text-xs tracking-widest uppercase py-3 hover:border-gold hover:text-gold transition-colors">
              Продолжить покупки
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ==================== FOOTER ====================
function Footer({ onNav }: { onNav: (s: string) => void }) {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-cormorant text-3xl font-light tracking-[0.3em] text-foreground mb-4">MAISON NOIR</h3>
            <p className="font-ibm text-xs text-muted-foreground leading-relaxed max-w-xs">
              Коллекция элитных брендовых сумок с гарантией подлинности. Hermès, Chanel, Louis Vuitton, Dior.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: "Instagram", label: "Instagram" },
                { icon: "Send", label: "Telegram" },
                { icon: "Phone", label: "Phone" },
              ].map((s) => (
                <button key={s.label} className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-muted-foreground">
                  <Icon name={s.icon as "Phone"} size={14} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="section-label mb-5">Навигация</p>
            <div className="space-y-3">
              {[["catalog", "Каталог"], ["collections", "Коллекции"], ["about", "О бренде"], ["delivery", "Доставка"], ["faq", "FAQ"], ["contacts", "Контакты"]].map(([id, label]) => (
                <button key={id} onClick={() => onNav(id)} className="block font-ibm text-xs text-muted-foreground hover:text-gold transition-colors">{label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="section-label mb-5">Контакты</p>
            <div className="space-y-3 font-ibm text-xs text-muted-foreground">
              <p>+7 (495) 999-00-11</p>
              <p>info@maisonnoir.ru</p>
              <p>Москва, ул. Петровка, 10</p>
              <p className="pt-2">Пн–Сб: 11:00 — 21:00</p>
              <p>Вс: 12:00 — 19:00</p>
            </div>
          </div>
        </div>

        <div className="gold-line mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-ibm text-xs text-muted-foreground">© 2025 MAISON NOIR. Все права защищены.</p>
          <div className="flex gap-6">
            <button className="font-ibm text-xs text-muted-foreground hover:text-gold transition-colors">Политика конфиденциальности</button>
            <button className="font-ibm text-xs text-muted-foreground hover:text-gold transition-colors">Оферта</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN ====================
export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleNav = (section: string) => {
    if (section === "cart") {
      setCartOpen(true);
      return;
    }
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (id: number) => {
    if (!cartItems.includes(id)) {
      setCartItems((prev) => [...prev, id]);
    }
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div className="grain">
      <Navbar activeSection={activeSection} onNav={handleNav} cartCount={cartItems.length} />
      <HeroSection onNav={handleNav} />
      <CatalogSection onAddToCart={addToCart} />
      <CollectionsSection />
      <AboutSection />
      <DeliverySection />
      <FaqSection />
      <ContactsSection />
      <Footer onNav={handleNav} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cartItems={cartItems} onRemove={removeFromCart} />
    </div>
  );
}
