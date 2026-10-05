
const translations = {
  vi: {
    "nav.home":"Trang chủ","nav.products":"Sản phẩm","nav.collection":"Bộ sưu tập","nav.journal":"Bài viết","nav.about":"Về Ina","nav.contact":"Liên hệ",
    "hero.title":"Những điều nhỏ bé,<br>làm ngày thường<br>trở nên <span class='script'>đẹp hơn.</span>","hero.cta":"Khám phá sản phẩm →",
    "cat.all":"Tất cả","cat.new":"Sản phẩm mới","cat.hot":"Bán chạy","cat.gift":"Quà tặng","cat.home":"Trang trí nhà","cat.personal":"Đồ dùng cá nhân",
    "products.title":"Sản phẩm mới","common.viewAll":"Xem tất cả →","journal.title":"Bài viết gần đây","about.title":"Về Ina",
    "cart.title":"Giỏ hàng","cart.empty":"Giỏ hàng đang trống.<br>Hãy chọn một điều nhỏ bé cho hôm nay nhé.","cart.total":"Tạm tính","cart.checkout":"Tiến hành đặt hàng",
    "product.add":"🛒 Thêm vào giỏ"
  },
  en: {
    "nav.home":"Home","nav.products":"Products","nav.collection":"Collections","nav.journal":"Journal","nav.about":"About Ina","nav.contact":"Contact",
    "hero.title":"Little things,<br>making ordinary days<br>feel <span class='script'>more beautiful.</span>","hero.cta":"Explore products →",
    "cat.all":"All","cat.new":"New arrivals","cat.hot":"Best sellers","cat.gift":"Gifts","cat.home":"Home decor","cat.personal":"Personal",
    "products.title":"New arrivals","common.viewAll":"View all →","journal.title":"Latest journal","about.title":"About Ina",
    "cart.title":"Your cart","cart.empty":"Your cart is empty.<br>Choose a little something for today.","cart.total":"Subtotal","cart.checkout":"Place an order",
    "product.add":"🛒 Add to cart"
  },
  zh: {
    "nav.home":"首页","nav.products":"产品","nav.collection":"系列","nav.journal":"文章","nav.about":"关于 Ina","nav.contact":"联系我们",
    "hero.title":"小小的美好，<br>让平凡的日子<br>变得更加<span class='script'>美好。</span>","hero.cta":"探索产品 →",
    "cat.all":"全部","cat.new":"新品","cat.hot":"热卖","cat.gift":"礼物","cat.home":"家居","cat.personal":"个人用品",
    "products.title":"新品","common.viewAll":"查看全部 →","journal.title":"最新文章","about.title":"关于 Ina",
    "cart.title":"购物车","cart.empty":"购物车还是空的。<br>为今天挑选一件小小的美好吧。","cart.total":"小计","cart.checkout":"提交订单",
    "product.add":"🛒 加入购物车"
  }
};
let currentLang = localStorage.getItem("inaLang") || "vi";

function t(key){ return (translations[currentLang] && translations[currentLang][key]) || translations.vi[key] || key; }

function setLang(lang){
  currentLang = translations[lang] ? lang : "vi";
  localStorage.setItem("inaLang", currentLang);
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : currentLang;
  document.querySelectorAll("[data-i18n]").forEach(el=>el.innerHTML=t(el.dataset.i18n));
  document.querySelectorAll(".lang-switch button").forEach(b=>b.classList.toggle("active", b.textContent.trim().toLowerCase()===(currentLang==="zh"?"中文":currentLang)));
  renderProducts();
  updateCart();
}

const products=[
 {id:1,name:{vi:'Nến thơm Soothing Lavender',en:'Soothing Lavender Candle',zh:'薰衣草香薰蜡烛'},price:220000,cat:['new','hot','gift'],icon:'🕯️'},
 {id:2,name:{vi:'Túi vải canvas Ina',en:'Ina Canvas Tote Bag',zh:'Ina 帆布袋'},price:180000,cat:['new','personal','hot'],icon:'👜'},
 {id:3,name:{vi:'Cốc sứ họa tiết lá',en:'Leaf Pattern Ceramic Cup',zh:'叶纹陶瓷杯'},price:150000,cat:['new','home','gift'],icon:'☕'},
 {id:4,name:{vi:'Sổ tay Good Notes',en:'Good Notes Journal',zh:'Good Notes 笔记本'},price:90000,cat:['new','personal'],icon:'📓'},
 {id:5,name:{vi:'Tinh dầu thơm phòng',en:'Home Fragrance Oil',zh:'室内香薰精油'},price:250000,cat:['home','hot'],icon:'🌿'}
];

let cart=[];

const money=n=>n.toLocaleString(currentLang==="vi"?"vi-VN":currentLang==="zh"?"zh-CN":"en-US",{maximumFractionDigits:0})+(currentLang==="vi"?"đ":currentLang==="zh"?" ¥":" ₫");
function pname(p){return p.name[currentLang]||p.name.vi}
function renderProducts(list=products){
 const g=document.getElementById('productGrid');
 g.innerHTML=list.map(p=>`<article class="card"><div class="pic">${p.icon}</div><div class="cardbody"><h3>${pname(p)}</h3><div class="price">${money(p.price)}</div><button class="btn mini" onclick="add(${p.id})">${t("product.add")}</button></div></article>`).join('');
}
function filterProducts(cat){
 renderProducts(cat==='all'?products:products.filter(p=>p.cat.includes(cat)));
 document.getElementById('products').scrollIntoView({behavior:'smooth'});
}
function add(id){cart.push(products.find(p=>p.id===id));updateCart();openCart()}
function updateCart(){
 document.getElementById('badge').textContent=cart.length;
 const el=document.getElementById('cart'), foot=document.getElementById('cartFooter');
 if(!cart.length){el.innerHTML=`<div class="empty">${t("cart.empty")}</div>`;foot.innerHTML='';return}
 el.innerHTML=cart.map((p,i)=>`<div class="cartrow"><div class="thumb">${p.icon}</div><div style="flex:1"><strong>${pname(p)}</strong><div class="price">${money(p.price)}</div></div><button class="close" onclick="removeItem(${i})">×</button></div>`).join('');
 const total=cart.reduce((s,p)=>s+p.price,0);
 foot.innerHTML=`<div class="total"><strong>${t("cart.total")}</strong><strong>${money(total)}</strong></div><button class="btn" style="width:100%" onclick="checkout()">${t("cart.checkout")}</button>`;
}
function removeItem(i){cart.splice(i,1);updateCart()}
function openCart(){document.getElementById('drawer').classList.add('show');updateCart()}
function closeCart(){document.getElementById('drawer').classList.remove('show')}
function openInfo(title,text){document.getElementById('modalContent').innerHTML=`<div class="eyebrow">INA</div><h2>${title}</h2><p class="muted" style="font-size:16px;line-height:1.8">${text}</p>`;document.getElementById('modal').classList.add('show')}
function closeModal(){document.getElementById('modal').classList.remove('show')}
function openSearch(){openInfo(currentLang==="vi"?"Tìm kiếm":currentLang==="en"?"Search":"搜索",currentLang==="vi"?"Bản demo đã có giao diện tìm kiếm.":currentLang==="en"?"The demo includes a search interface.":"此演示包含搜索界面。")}
function checkout(){openInfo(currentLang==="vi"?"Đặt hàng":currentLang==="en"?"Place an order":"提交订单",currentLang==="vi"?"Đây là bản demo. Có thể kết nối hệ thống đặt hàng và thanh toán.":currentLang==="en"?"This is a demo. Order and payment can be connected next.":"这是一个演示版本，下一步可以连接订单和支付系统。")}
document.addEventListener("DOMContentLoaded",()=>{setLang(currentLang);updateCart()});
