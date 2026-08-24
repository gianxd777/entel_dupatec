const TIENDAS = ["ANCASH","PLAZA","REAL","LUZ CHILCA"];
const COLORES_TIENDA = { ANCASH:"#0057b8", PLAZA:"#e8730c", REAL:"#1b8a3c", "LUZ CHILCA":"#6a3fb5" };
const CLAVE_ADMIN = "dupatec2026"; // cámbiala por la que quieras
let adminAutenticado = false;

// ---------- CATALOGO INICIAL ----------
let contadorId = 1;
function crear(nombre, rom, ram, camara) {
  return {
    id: "p" + (contadorId++),
    nombre, rom, ram, camara,
    stock: { ANCASH:0, PLAZA:0, REAL:0, "LUZ CHILCA":0 }
  };
}

const CATALOGO_INICIAL = [
  crear("SAMSUNG A06","64/128 GB","4 GB","50 MP"),
  crear("SAMSUNG A07","128 GB","4 GB","50 MP"),
  crear("SAMSUNG A16","128 GB","4 GB","50 MP"),
  crear("SAMSUNG A17","128/256 GB","4 GB","50 MP"),
  crear("SAMSUNG A26 5G","128 GB","6 GB","50 MP"),
  crear("SAMSUNG A36","128 GB","6 GB","50 MP"),
  crear("SAMSUNG A56","256 GB","8 GB","50 MP"),
  crear("SAMSUNG A37","256 GB","6 GB","50 MP"),
  crear("SAMSUNG A57","256 GB","8 GB","50 MP"),
  crear("HONOR X6B","256 GB","4 GB","50 MP"),
  crear("HONOR X5C","128 GB","4 GB","50 MP"),
  crear("HONOR X5C PLUS","256 GB","6 GB","50 MP"),
  crear("HONOR X6C","128 GB","6 GB","50 MP"),
  crear("HONOR X5D","128 GB","4 GB","50 MP"),
  crear("HONOR X6E","256 GB","8 GB","50 MP"),
  crear("HONOR 600","256 GB","8 GB","200 MP"),
  crear("HONOR 600 E","256/512 GB","8 GB","108 MP"),
  crear("HONOR 600 PRO","512 GB","12 GB","200 MP"),
  crear("HONOR MAGIC 8 LITE","256/512 GB","8+8 GB","108 MP"),
  crear("HONOR MAGIC 7 LITE","256 GB","8 GB","108 MP"),
  crear("HONOR X8D","256 GB","8 GB","108 MP"),
  crear("HONOR X7D","256 GB","8 GB","108 MP"),
  crear("HONOR X9D","256/512 GB","8+8 GB","108 MP"),
  crear("ZTE BLADE V50","256 GB","4 GB","50 MP"),
  crear("ZTE NUBIA NEO 3 GT","256 GB","8 GB","50 MP"),
  crear("HONOR MAGIC 8 PRO","512 GB","12 GB","200 MP"),
  crear("REDMI A3X","64/128 GB","4 GB","10 MP"),
  crear("REDMI A5","64/128 GB","4 GB","32 MP"),
  crear("REDMI NOTE 14","128/256 GB","6 GB","108 MP"),
  crear("REDMI NOTE 14 PRO","256 GB","8 GB","200 MP"),
  crear("REDMI 15C","256 GB","4 GB","50 MP"),
  crear("REDMI 14C","256 GB","4 GB","50 MP"),
  crear("REDMI NOTE 15","128/256 GB","8 GB","200 MP"),
  crear("REDMI NOTE 15 PRO","256/512 GB","8 GB","200 MP"),
  crear("REDMI NOTE 15 PRO 5G","256/512 GB","8/12 GB","200 MP"),
  crear("REDMI NOTE 15 PRO PLUS 5G","256/512 GB","8/12 GB","200 MP"),
  crear("XIAOMI 15 ULTRA","512 GB","16 GB","200 MP"),
  crear("XIAOMI 11 LITE","128 GB","8 GB","64 MP"),
  crear("XIAOMI 12 LITE","128 GB","8 GB","108 MP"),
  crear("XIAOMI 13T PRO","512 GB","12 GB","108 MP"),
  crear("POCO X7 PRO","512 GB","12 GB","50 MP"),
  crear("MOTOROLA EDGE 50 FUSION","256 GB","8 GB","50 MP"),
  crear("REDMI A7 PRO","128 GB","8 GB","50 MP"),
  crear("MOTOROLA G04 S","64/128 GB","4 GB","50 MP"),
  crear("MOTOROLA G15","256/512 GB","6 GB","50 MP"),
  crear("MOTOROLA G56","256 GB","8 GB","50 MP"),
  crear("MOTOROLA G75","256 GB","8 GB","50 MP"),
  crear("MOTOROLA G77","256 GB","8 GB","108 MP"),
  crear("MOTOROLA G85","512 GB","8 GB","50 MP"),
  crear("MOTOROLA G86","256 GB","8 GB","50 MP"),
  crear("MOTOROLA G06","128/256 GB","4 GB","50 MP"),
  crear("MOTOROLA EDGE 60 FUSION","256 GB","8 GB","50 MP"),
  crear("IPHONE 13","128 GB","4 GB","12 MP"),
  crear("IPHONE 14","128 GB","6 GB","12 MP"),
  crear("IPHONE 15","128 GB","6 GB","48 MP"),
  crear("IPHONE 16","128/256 GB","8 GB","50 MP"),
  crear("IPHONE 16 PRO","128 GB","8 GB","50 MP"),
  crear("IPHONE 16 PRO MAX","256 GB","8 GB","50 MP"),
  crear("IPHONE 17","256 GB","8 GB","50 MP"),
  crear("IPHONE 17 PRO","256 GB","12 GB","50 MP"),
  crear("IPHONE 17 PRO MAX","256/512 GB","12 GB","50 MP"),
  crear("SAMSUNG S23 ULTRA","512 GB","12 GB","200 MP"),
  crear("SAMSUNG S24 ULTRA","256/512 GB","12 GB","200 MP"),
  crear("SAMSUNG S24 FE","128/256 GB","8 GB","50 MP"),
  crear("SAMSUNG S25 ULTRA","256/512 GB","12 GB","200 MP"),
  crear("SAMSUNG S25 FE","256/512 GB","8 GB","50 MP"),
  crear("SAMSUNG S26 ULTRA","256/512 GB","12 GB","200 MP"),
];

// ---------- DATOS ----------
function cargarProductos() {
  const data = localStorage.getItem("productos");
  if (data) return JSON.parse(data);
  guardarProductos(CATALOGO_INICIAL);
  return CATALOGO_INICIAL;
}
function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// ---------- ADMIN ----------
function verificarAdmin() {
  if (adminAutenticado) return true;
  const clave = prompt("Ingresa la clave de administrador:");
  if (clave === null) return false;
  if (clave !== CLAVE_ADMIN) {
    alert("Clave incorrecta. No tienes autorización.");
    return false;
  }
  adminAutenticado = true;
  return true;
}

// ---------- NAVEGACION ----------
const btnStock = document.getElementById("btnStock");
const btnAgregar = document.getElementById("btnAgregar");
const vistaStock = document.getElementById("vistaStock");
const vistaAgregar = document.getElementById("vistaAgregar");

btnStock.onclick = () => {
  vistaStock.classList.remove("oculto");
  vistaAgregar.classList.add("oculto");
  btnStock.classList.add("active");
  btnAgregar.classList.remove("active");
};

btnAgregar.onclick = () => {
  if (!verificarAdmin()) return;
  vistaAgregar.classList.remove("oculto");
  vistaStock.classList.add("oculto");
  btnAgregar.classList.add("active");
  btnStock.classList.remove("active");
};

document.getElementById("btnIrAStock").onclick = () => {
  vistaAgregar.classList.add("oculto");
  vistaStock.classList.remove("oculto");
  btnStock.classList.add("active");
  btnAgregar.classList.remove("active");
  document.getElementById("btnIrAStock").classList.add("oculto");
};

// ---------- ELEMENTOS BUSQUEDA ----------
const buscarInput = document.getElementById("buscarInput");
const clearBtn = document.getElementById("clearBtn");
const pantallaInicial = document.getElementById("pantallaInicial");
const pantallaBuscando = document.getElementById("pantallaBuscando");
const resultados = document.getElementById("resultados");

let timeoutBusqueda = null;

buscarInput.addEventListener("input", () => {
  const texto = buscarInput.value.trim();
  clearBtn.classList.toggle("oculto", texto === "");

  if (texto === "") {
    resultados.innerHTML = "";
    pantallaBuscando.classList.add("oculto");
    pantallaInicial.classList.remove("oculto");
    return;
  }

  pantallaInicial.classList.add("oculto");
  pantallaBuscando.classList.remove("oculto");
  resultados.innerHTML = "";

  clearTimeout(timeoutBusqueda);
  timeoutBusqueda = setTimeout(() => renderResultados(texto), 500);
});

clearBtn.onclick = () => {
  buscarInput.value = "";
  buscarInput.dispatchEvent(new Event("input"));
};

function renderResultados(texto) {
  pantallaBuscando.classList.add("oculto");

  const productos = cargarProductos();
  const encontrados = productos.filter(p => p.nombre.toLowerCase().includes(texto.toLowerCase()));

  resultados.innerHTML = "";

  if (encontrados.length === 0) {
    resultados.innerHTML = `<p style="text-align:center; color:#777;">No se encontraron resultados.</p>`;
    return;
  }

  const header = document.createElement("div");
  header.className = "resultado-header";
  header.textContent = `¡Hemos encontrado ${encontrados.length} resultado${encontrados.length > 1 ? "s" : ""}!`;
  resultados.appendChild(header);

  encontrados.forEach(p => renderCardProducto(p));
}

function renderCardProducto(p) {
  const primeraTiendaConStock = TIENDAS.find(t => p.stock[t] > 0) || TIENDAS[0];

  const card = document.createElement("div");
  card.className = "card";
  card.id = `card-${p.id}`;

  card.innerHTML = `
    <div class="card-img">📱</div>
    <div class="card-info">
      <h3>${p.nombre}</h3>
      <p>💾 ROM: ${p.rom}</p>
      <p>🧠 RAM: ${p.ram}</p>
      <p>📸 Cámara: ${p.camara}</p>
    </div>
    <div class="card-disponibilidad" id="disp-${p.id}">
      <p>📍 Disponible en:</p>
      <p><b>${primeraTiendaConStock}</b></p>
      <p>📦 Stock disponible:</p>
      <p class="stock-num" id="stockNum-${p.id}">${p.stock[primeraTiendaConStock]} unidad(es)</p>
      <button class="btn-editar-stock" onclick="mostrarEdicionStock('${p.id}')">✏️ Editar stock</button>
    </div>
    <div style="width:100%;">
      <div class="cantidad-row">
        <span>Cantidad a vender:</span>
        <button onclick="cambiarCantidad('${p.id}', -1)">−</button>
        <span id="cant-${p.id}">1</span>
        <button onclick="cambiarCantidad('${p.id}', 1)">+</button>
      </div>
      <button class="btn-vender" id="btnVender-${p.id}" onclick="vender('${p.id}', '${primeraTiendaConStock}')">
        🛒 VENDER
      </button>
      <div id="msg-${p.id}"></div>
    </div>
  `;
  resultados.appendChild(card);
}

function cambiarCantidad(id, delta) {
  const span = document.getElementById(`cant-${id}`);
  let valor = parseInt(span.textContent) + delta;
  if (valor < 1) valor = 1;
  span.textContent = valor;
}

function vender(id, tienda) {
  const productos = cargarProductos();
  const producto = productos.find(p => p.id === id);
  const cantidad = parseInt(document.getElementById(`cant-${id}`).textContent);
  const msg = document.getElementById(`msg-${id}`);
  const btn = document.getElementById(`btnVender-${id}`);

  if (producto.stock[tienda] < cantidad) {
    msg.innerHTML = `<div class="msg-error">No hay suficiente stock en ${tienda}.</div>`;
    return;
  }

  producto.stock[tienda] -= cantidad;
  guardarProductos(productos);

  document.getElementById(`stockNum-${id}`).textContent = `${producto.stock[tienda]} unidad(es)`;

  msg.innerHTML = `<div class="msg-venta">✅ ¡Venta realizada con éxito! Se eliminó ${cantidad} unidad(es) del stock.</div>`;

  btn.textContent = "✅ VENDIDO";
  btn.classList.add("vendido");
  btn.disabled = true;

  renderTiendasResumen();
}

// ---------- EDITAR STOCK (ADMIN) ----------
function mostrarEdicionStock(id) {
  if (!verificarAdmin()) return;

  const productos = cargarProductos();
  const p = productos.find(x => x.id === id);
  const cont = document.getElementById(`disp-${id}`);

  cont.innerHTML = `
    <p><b>✏️ Editar stock por tienda:</b></p>
    ${TIENDAS.map(t => `
      <label>${t}</label>
      <input type="number" min="0" id="edit-${t.replace(/\s/g,'')}-${id}" value="${p.stock[t]}">
    `).join("")}
    <button class="btn-vender" style="background:#1b8a3c;" onclick="guardarStock('${id}')">💾 Guardar</button>
  `;
}

function guardarStock(id) {
  const productos = cargarProductos();
  const p = productos.find(x => x.id === id);

  TIENDAS.forEach(t => {
    const input = document.getElementById(`edit-${t.replace(/\s/g,'')}-${id}`);
    p.stock[t] = parseInt(input.value) || 0;
  });

  guardarProductos(productos);
  renderTiendasResumen();
  renderResultados(buscarInput.value.trim());
}

// ---------- RESUMEN TIENDAS ----------
function renderTiendasResumen() {
  const productos = cargarProductos();
  const resumen = document.getElementById("tiendasResumen");
  resumen.innerHTML = "";
  TIENDAS.forEach(t => {
    const total = productos.reduce((acc, p) => acc + (p.stock[t] || 0), 0);
    const div = document.createElement("div");
    div.className = "tienda-card";
    div.style.background = COLORES_TIENDA[t];
    div.innerHTML = `📍 ${t}<small>${total} unidad(es)</small>`;
    resumen.appendChild(div);
  });
}

// ---------- AGREGAR PRODUCTO ----------
document.getElementById("btnGuardar").onclick = () => {
  const nombre = document.getElementById("fNombre").value.trim();
  const rom = document.getElementById("fRom").value.trim();
  const ram = document.getElementById("fRam").value.trim();
  const camara = document.getElementById("fCamara").value.trim();
  const msg = document.getElementById("mensajeAgregar");

  if (!nombre || !rom || !ram || !camara) {
    msg.innerHTML = `<div class="msg-error">Completa todos los campos.</div>`;
    return;
  }

  const nuevo = {
    id: "p" + Date.now(),
    nombre, rom, ram, camara,
    stock: {
      ANCASH: parseInt(document.getElementById("fAncash").value) || 0,
      PLAZA: parseInt(document.getElementById("fPlaza").value) || 0,
      REAL: parseInt(document.getElementById("fReal").value) || 0,
      "LUZ CHILCA": parseInt(document.getElementById("fLuzChilca").value) || 0,
    }
  };

  const productos = cargarProductos();
  productos.push(nuevo);
  guardarProductos(productos);

  msg.innerHTML = `<div class="msg-venta">✅ Producto agregado correctamente.</div>`;

  document.getElementById("fNombre").value = "";
  document.getElementById("fRom").value = "";
  document.getElementById("fRam").value = "";
  document.getElementById("fCamara").value = "";
  document.getElementById("fAncash").value = 0;
  document.getElementById("fPlaza").value = 0;
  document.getElementById("fReal").value = 0;
  document.getElementById("fLuzChilca").value = 0;

  document.getElementById("btnIrAStock").classList.remove("oculto");

  renderTiendasResumen();
};

// ---------- INICIO ----------
renderTiendasResumen();
