const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const sideNav = document.getElementById("sideNav");
const toast = document.getElementById("toast");

const savedTheme = localStorage.getItem("rk-theme");
if(savedTheme === "light") body.classList.add("light");

themeBtn.addEventListener("click", ()=>{
  body.classList.toggle("light");
  localStorage.setItem("rk-theme", body.classList.contains("light") ? "light" : "dark");
});

menuBtn.addEventListener("click", ()=> sideNav.classList.toggle("open"));
sideNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>sideNav.classList.remove("open")));

document.querySelectorAll("[data-copy]").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    await navigator.clipboard.writeText(btn.dataset.copy);
    toast.textContent = "Copy කළා";
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),1200);
  });
});