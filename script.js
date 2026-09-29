const body = document.body;
const pages = [...document.querySelectorAll(".page")];
const navItems = [...document.querySelectorAll(".nav-item")];
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");
const toast = document.getElementById("toast");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const supportContent = {
  offline: {
    title: "Output node OFFLINE",
    text: "ESP32 node එක Wi-Fi එකට connected ද බලන්න. ESP8266 සහ ESP32 same local network එකේද check කරන්න. ESP8266 firmware එකේ node IP / host value current ESP32 address එකට match වෙන්න ඕන."
  },
  reverse: {
    title: "Relay logic reversed",
    text: "Output 3 current setup එක HIGH = ON සහ LOW = OFF. Relay module එක active-LOW type එකක් නම් logic reverse කරන්න වෙන්න පුළුවන්. Module datasheet/indicator test එකෙන් verify කරන්න."
  },
  ota: {
    title: "OTA no response",
    text: "Arduino IDE network port එක ESP device එකේ current IP එකට match වෙනවද බලන්න. Laptop සහ ESP same Wi-Fi එකේ තියාගන්න. අවශ්‍ය නම් USB adapter එකෙන් wired firmware upload එකක් කරන්න."
  },
  wifi: {
    title: "ESP Wi-Fi issue",
    text: "SSID සහ password exact ද බලන්න. ESP devices සඳහා 2.4 GHz Wi-Fi enable කරන්න. Router DHCP address එක Serial Monitor එකෙන් confirm කරන්න."
  },
  github: {
    title: "GitHub build error",
    text: "Actions log එකේ first real compile/test error එක බලන්න. Workflow path .github/workflows/build-ipa.yml නිවැරදිද check කරන්න. Old test fatalError lines තිබේ නම් valid assertions වලට replace කරන්න."
  },
  safety: {
    title: "Electrical Safety",
    text: "Development සහ testing low-voltage side එකෙන් කරන්න. Mains AC wiring සඳහා qualified adult/electrician support භාවිත කරන්න. Relay ratings, isolation සහ enclosure safety අනිවාර්යයි."
  }
};

function openPage(id){
  pages.forEach(p => p.classList.toggle("active", p.id === id));
  navItems.forEach(n => n.classList.toggle("active", n.dataset.page === id));
  sidebar.classList.remove("open");
  history.replaceState(null, "", "#" + id);
}

navItems.forEach(item => {
  item.addEventListener("click", () => openPage(item.dataset.page));
});

const initial = location.hash.replace("#","") || "overview";
if(document.getElementById(initial)) openPage(initial);

if(menuBtn){
  menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
}

const savedTheme = localStorage.getItem("rk-theme");
if(savedTheme === "light") body.classList.add("light");

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("rk-theme", body.classList.contains("light") ? "light" : "dark");
});

document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(btn.dataset.copy);
      toast.textContent = "Copied";
    }catch{
      toast.textContent = btn.dataset.copy;
    }
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1200);
  });
});

document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = supportContent[btn.dataset.modal];
    modalTitle.textContent = item.title;
    modalText.textContent = item.text;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  });
});

document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
  });
});

document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
    modal.classList.remove("open");
    sidebar.classList.remove("open");
  }
});


const mobileNavItems = [...document.querySelectorAll(".mobile-nav-item")];

function syncMobileNav(id){
  mobileNavItems.forEach(item => {
    item.classList.toggle("active", item.dataset.page === id);
  });
}

mobileNavItems.forEach(item => {
  item.addEventListener("click", () => {
    openPage(item.dataset.page);
    syncMobileNav(item.dataset.page);
  });
});

const originalOpenPage = openPage;
openPage = function(id){
  originalOpenPage(id);
  syncMobileNav(id);
};
syncMobileNav(location.hash.replace("#","") || "overview");
