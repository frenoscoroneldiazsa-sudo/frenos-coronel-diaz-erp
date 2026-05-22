const state = {
  selected: null,
  products: [],
  user: null,
  cart: [],
};

const bootScreen = document.querySelector("#bootScreen");
const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const userInput = document.querySelector("#userInput");
const passwordInput = document.querySelector("#passwordInput");
const loginMessage = document.querySelector("#loginMessage");
const userLabel = document.querySelector("#userLabel");
const logoutButton = document.querySelector("#logoutButton");
const menuItems = document.querySelectorAll(".menu-item");
const adminOnlyItems = document.querySelectorAll(".admin-only");
const moduleScreens = document.querySelectorAll(".module-screen");
const menuNote = document.querySelector("#menuNote");
const executiveDashboard = document.querySelector("#executiveDashboard");
const refreshDashboardButton = document.querySelector("#refreshDashboardButton");
const kpiProducts = document.querySelector("#kpiProducts");
const kpiUnits = document.querySelector("#kpiUnits");
const kpiNoStock = document.querySelector("#kpiNoStock");
const kpiCritical = document.querySelector("#kpiCritical");
const kpiSales = document.querySelector("#kpiSales");
const kpiSoldUnits = document.querySelector("#kpiSoldUnits");
const dashboardCategories = document.querySelector("#dashboardCategories");
const dashboardCritical = document.querySelector("#dashboardCritical");
const dashboardTopSales = document.querySelector("#dashboardTopSales");
const salesDashboard = document.querySelector("#salesDashboard");
const closeSalesDashboard = document.querySelector("#closeSalesDashboard");
const productDashboard = document.querySelector("#productDashboard");
const closeProductDashboard = document.querySelector("#closeProductDashboard");
const productEditorEmpty = document.querySelector("#productEditorEmpty");
const productEditorForm = document.querySelector("#productEditorForm");
const productEditorMessage = document.querySelector("#productEditorMessage");
const editCodigoItem = document.querySelector("#editCodigoItem");
const editCodigoBarras = document.querySelector("#editCodigoBarras");
const editCodigoArticulo = document.querySelector("#editCodigoArticulo");
const editProducto = document.querySelector("#editProducto");
const editMarca = document.querySelector("#editMarca");
const editProveedor = document.querySelector("#editProveedor");
const editDepartamento = document.querySelector("#editDepartamento");
const editUbicacion = document.querySelector("#editUbicacion");
const editStockMinimo = document.querySelector("#editStockMinimo");
const editDescripcion = document.querySelector("#editDescripcion");
const salesOperations = document.querySelector("#salesOperations");
const salesUnits = document.querySelector("#salesUnits");
const topSalesList = document.querySelector("#topSalesList");
const recentSalesList = document.querySelector("#recentSalesList");
const addSelectedToCart = document.querySelector("#addSelectedToCart");
const cartItems = document.querySelector("#cartItems");
const cartSummary = document.querySelector("#cartSummary");
const cartSaleForm = document.querySelector("#cartSaleForm");
const cartCustomer = document.querySelector("#cartCustomer");
const cartNote = document.querySelector("#cartNote");
const cartMessage = document.querySelector("#cartMessage");
const clearCartButton = document.querySelector("#clearCartButton");
const productsBody = document.querySelector("#productsBody");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const refreshButton = document.querySelector("#refreshButton");
const providerFilter = document.querySelector("#providerFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const clearFiltersButton = document.querySelector("#clearFiltersButton");
const selectedProduct = document.querySelector("#selectedProduct");
const saleForm = document.querySelector("#saleForm");
const quantityInput = document.querySelector("#quantityInput");
const noteInput = document.querySelector("#noteInput");
const saleMessage = document.querySelector("#saleMessage");
const summary = document.querySelector("#summary");
const movements = document.querySelector("#movements");

document.body.classList.add("locked");

function hideBootScreen() {
  document.body.classList.remove("booting");
  window.setTimeout(() => bootScreen?.remove(), 260);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stockClass(stock) {
  return Number(stock) <= 0 ? "stock low" : "stock";
}

async function loadSummary() {
  const response = await fetch("/api/resumen");
  if (!ensureAllowed(response)) return;
  const data = await response.json();
  summary.innerHTML = `
    <span><strong>${data.productos ?? 0}</strong> productos</span>
    <span><strong>${data.con_stock ?? 0}</strong> con stock</span>
    <span><strong>${data.unidades ?? 0}</strong> unidades</span>
    <span><strong>${data.departamentos ?? 0}</strong> departamentos</span>
  `;
}

async function searchProducts() {
  const query = searchInput.value.trim();
  const params = new URLSearchParams({
    q: query,
    proveedor: providerFilter.value,
    categoria: categoryFilter.value,
    limit: "200",
  });
  const response = await fetch(`/api/productos?${params.toString()}`);
  if (!ensureAllowed(response)) return;
  const data = await response.json();
  state.products = data.productos || [];
  renderProducts();
}

async function loadFilters() {
  const response = await fetch("/api/filtros");
  if (!ensureAllowed(response)) return;
  const data = await response.json();
  fillSelect(providerFilter, data.proveedores || [], "Todos");
  fillSelect(categoryFilter, data.categorias || [], "Todas");
}

function fillSelect(select, values, emptyLabel) {
  const current = select.value;
  select.innerHTML = `<option value="">${emptyLabel}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  select.value = values.includes(current) ? current : "";
}

function renderProducts() {
  if (state.products.length === 0) {
    productsBody.innerHTML = `
      <tr>
        <td colspan="5" class="muted">No se encontraron productos.</td>
      </tr>
    `;
    return;
  }

  productsBody.innerHTML = state.products
    .map((product) => {
      const selected = state.selected?.id === product.id ? "selected" : "";
      return `
        <tr class="${selected}" data-id="${product.id}">
          <td>
            <span class="product-code">${escapeHtml(product.codigo_item)}</span>
            <div class="muted">${escapeHtml(product.codigo_barras || product.codigo_articulo)}</div>
          </td>
          <td>${escapeHtml(product.producto)}</td>
          <td>${escapeHtml(product.marca)}</td>
          <td>
            ${escapeHtml(product.descripcion)}
            <div class="muted">${escapeHtml(product.hoja_origen)}</div>
          </td>
          <td class="${stockClass(product.stock)}">${escapeHtml(product.stock)}</td>
        </tr>
      `;
    })
    .join("");
}

function selectProduct(product) {
  state.selected = product;
  saleMessage.textContent = "";
  saleMessage.className = "message";
  selectedProduct.className = "selected-box";
  selectedProduct.innerHTML = `
    <strong>${escapeHtml(product.codigo_item)} - ${escapeHtml(product.producto)}</strong>
    <span>${escapeHtml(product.marca)}</span>
    <p>${escapeHtml(product.descripcion)}</p>
    <div>Stock actual: <strong>${escapeHtml(product.stock)}</strong></div>
  `;
  renderProducts();
  fillProductEditor(product);
  if (state.user?.rol === "administrador") {
    loadMovements(product.id);
  }
}

function fillProductEditor(product) {
  productEditorEmpty.classList.add("is-hidden");
  productEditorForm.classList.remove("is-hidden");
  productEditorMessage.textContent = "";
  productEditorMessage.className = "message";
  editCodigoItem.value = product.codigo_item || "";
  editCodigoBarras.value = product.codigo_barras || "";
  editCodigoArticulo.value = product.codigo_articulo || "";
  editProducto.value = product.producto || "";
  editMarca.value = product.marca || "";
  editProveedor.value = product.proveedor || "";
  editDepartamento.value = product.departamento || "";
  editUbicacion.value = product.ubicacion || "";
  editStockMinimo.value = product.stock_minimo || 0;
  editDescripcion.value = product.descripcion || "";
}

async function registerSale(event) {
  event.preventDefault();
  if (!state.selected) {
    setMessage("Seleccioná un producto antes de vender.", "error");
    return;
  }

  const quantity = Number(quantityInput.value);
  if (!Number.isInteger(quantity) || quantity <= 0) {
    setMessage("La cantidad debe ser mayor a cero.", "error");
    return;
  }

  const response = await fetch("/api/venta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      producto_id: state.selected.id,
      cantidad: quantity,
      nota: noteInput.value.trim(),
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    setMessage(data.error || "No se pudo registrar la venta.", "error");
    return;
  }

  setMessage(`Venta registrada. Stock nuevo: ${data.stock_nuevo}`, "ok");
  noteInput.value = "";
  state.selected.stock = data.stock_nuevo;
  await loadSummary();
  await searchProducts();
  const fresh = state.products.find((product) => product.id === state.selected.id);
  if (fresh) {
    selectProduct(fresh);
  } else {
    loadMovements(state.selected.id);
  }
}

function addToCart(product) {
  if (!product) {
    setCartMessage("Seleccioná un producto del catálogo.", "error");
    return;
  }
  if (Number(product.stock) <= 0) {
    setCartMessage("Ese producto no tiene stock disponible.", "error");
    return;
  }
  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) {
    existing.cantidad += 1;
  } else {
    state.cart.push({ ...product, cantidad: 1 });
  }
  setCartMessage("", "");
  renderCart();
}

function renderCart() {
  const totalItems = state.cart.length;
  const totalUnits = state.cart.reduce((sum, item) => sum + Number(item.cantidad), 0);
  cartSummary.textContent = `${totalItems} productos | ${totalUnits} unidades`;

  if (state.cart.length === 0) {
    cartItems.innerHTML = `<div class="empty-state">Seleccioná productos del catálogo y agregalos al carrito.</div>`;
    return;
  }

  cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <article class="cart-line" data-id="${item.id}">
          <div>
            <strong>${escapeHtml(item.codigo_item)} - ${escapeHtml(item.producto)}</strong>
            <span class="muted">${escapeHtml(item.marca)} | Stock: ${escapeHtml(item.stock)}</span>
          </div>
          <input class="cart-quantity" type="number" min="1" max="${escapeHtml(item.stock)}" value="${escapeHtml(item.cantidad)}" />
          <button class="icon-button remove-cart-item" type="button">X</button>
        </article>
      `,
    )
    .join("");
}

function setCartMessage(text, type) {
  cartMessage.textContent = text;
  cartMessage.className = type ? `message ${type}` : "message";
}

async function confirmCartSale(event) {
  event.preventDefault();
  if (state.cart.length === 0) {
    setCartMessage("El carrito esta vacio.", "error");
    return;
  }

  const response = await fetch("/api/venta-carrito", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cliente: cartCustomer.value.trim(),
      nota: cartNote.value.trim(),
      items: state.cart.map((item) => ({
        producto_id: item.id,
        cantidad: item.cantidad,
      })),
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    setCartMessage(data.error || "No se pudo confirmar la venta.", "error");
    return;
  }

  setCartMessage(`Venta #${data.venta_id} confirmada: ${data.total_unidades} unidades.`, "ok");
  state.cart = [];
  cartCustomer.value = "";
  cartNote.value = "";
  renderCart();
  await loadSummary();
  await searchProducts();
  await loadSalesSummary();
  await loadDashboard();
}

function setMessage(text, type) {
  saleMessage.textContent = text;
  saleMessage.className = `message ${type}`;
}

async function loadMovements(productId = 0) {
  if (state.user?.rol !== "administrador") {
    movements.innerHTML = `<div class="empty-state">Disponible solo para el administrador.</div>`;
    return;
  }

  const response = await fetch(`/api/movimientos?producto_id=${encodeURIComponent(productId)}`);
  if (!ensureAllowed(response)) return;
  const data = await response.json();
  const rows = data.movimientos || [];
  if (rows.length === 0) {
    movements.innerHTML = `<div class="empty-state">Sin movimientos registrados.</div>`;
    return;
  }

  movements.innerHTML = rows
    .map(
      (movement) => `
        <div class="movement">
          <strong>${escapeHtml(movement.tipo)} x ${escapeHtml(movement.cantidad)}</strong>
          <span>${escapeHtml(movement.fecha)}</span>
          <div>${escapeHtml(movement.codigo_item)} - ${escapeHtml(movement.producto)}</div>
          <div>Stock: ${escapeHtml(movement.stock_anterior)} -> ${escapeHtml(movement.stock_nuevo)}</div>
          ${movement.usuario_nombre ? `<div>Usuario: ${escapeHtml(movement.usuario_nombre)}</div>` : ""}
          ${movement.nota ? `<div class="muted">${escapeHtml(movement.nota)}</div>` : ""}
        </div>
      `,
    )
    .join("");
}

function ensureAllowed(response) {
  if (response.status === 401) {
    lockApp();
    return false;
  }
  return true;
}

function lockApp() {
  state.user = null;
  document.body.classList.add("locked");
  userLabel.textContent = "Sin usuario";
  productsBody.innerHTML = "";
  movements.innerHTML = "";
}

function unlockApp(user) {
  state.user = user;
  document.body.classList.remove("locked");
  userLabel.textContent = `${user.nombre} (${user.rol})`;
  updateMenuByRole();
  setActiveMenu("inicio");
}

function updateMenuByRole() {
  adminOnlyItems.forEach((item) => {
    item.classList.toggle("is-hidden", state.user?.rol !== "administrador");
  });
}

function setActiveMenu(view) {
  document.body.dataset.module = view;
  menuItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });
  moduleScreens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.module === view);
  });

  const notes = {
    inicio: "Módulo actual: inicio del sistema.",
    dashboard: "Módulo actual: tablero ejecutivo y control general.",
    venta: "Módulo actual: ventas y descuento de stock.",
    productos: "Módulo actual: catálogo y edición de productos.",
    stock: "Módulo actual: control de stock.",
    movimientos: "Movimientos: historial disponible para administrador.",
    usuarios: "Usuarios: módulo pendiente de habilitación.",
    ajustes: "Ajustes: módulo pendiente de configuración.",
  };
  menuNote.textContent = notes[view] || "Módulo seleccionado.";

  if (view === "dashboard") {
    loadDashboard();
  }
  if (view === "productos") {
    searchInput.focus();
  }
  if (view === "venta") {
    selectedProduct.scrollIntoView({ block: "nearest" });
  }
}

async function loadDashboard() {
  const response = await fetch("/api/dashboard");
  if (!ensureAllowed(response)) return;
  const data = await response.json();
  const kpis = data.kpis || {};
  kpiProducts.textContent = kpis.productos_total ?? 0;
  kpiUnits.textContent = kpis.unidades_disponibles ?? 0;
  kpiNoStock.textContent = kpis.productos_sin_stock ?? 0;
  kpiCritical.textContent = kpis.stock_critico ?? 0;
  kpiSales.textContent = kpis.ventas_total ?? 0;
  kpiSoldUnits.textContent = kpis.unidades_vendidas ?? 0;
  renderMetricRows(dashboardCategories, data.categorias_principales || [], "categoria");
  renderMetricRows(dashboardCritical, data.productos_criticos || [], "critico");
  renderMetricRows(dashboardTopSales, data.productos_mayor_salida || [], "salida");
}

function renderMetricRows(container, rows, type) {
  if (rows.length === 0) {
    container.innerHTML = `<div class="empty-state">Sin datos para mostrar.</div>`;
    return;
  }

  container.innerHTML = rows
    .map((row) => {
      if (type === "categoria") {
        return `
          <article class="metric-row">
            <div>
              <strong>${escapeHtml(row.nombre)}</strong>
              <span>${escapeHtml(row.productos)} productos</span>
            </div>
            <div class="metric-value">${escapeHtml(row.unidades)} un.</div>
          </article>
        `;
      }
      if (type === "critico") {
        return `
          <article class="metric-row">
            <div>
              <strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong>
              <span>${escapeHtml(row.marca)} | ${escapeHtml(row.ubicacion || "sin ubicacion")}</span>
            </div>
            <div class="metric-value">${escapeHtml(row.stock)} un.</div>
          </article>
        `;
      }
      return `
        <article class="metric-row">
          <div>
            <strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong>
            <span>${escapeHtml(row.marca)} | ${escapeHtml(row.descripcion)}</span>
          </div>
          <div class="metric-value">${escapeHtml(row.unidades)} un.</div>
        </article>
      `;
    })
    .join("");
}

async function openSalesDashboard() {
  salesDashboard.classList.add("is-open");
  await loadSalesSummary();
}

async function loadSalesSummary() {
  const response = await fetch("/api/ventas/resumen");
  if (!ensureAllowed(response)) return;
  const data = await response.json();

  salesOperations.textContent = data.operaciones ?? 0;
  salesUnits.textContent = data.unidades ?? 0;
  renderTopSales(data.productos_mayor_salida || []);
  renderRecentSales(data.ultimas_ventas || []);
}

async function saveProduct(event) {
  event.preventDefault();
  if (!state.selected) {
    productEditorMessage.textContent = "Seleccioná un producto primero.";
    productEditorMessage.className = "message error";
    return;
  }

  const response = await fetch("/api/producto/actualizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: state.selected.id,
      codigo_item: editCodigoItem.value,
      codigo_barras: editCodigoBarras.value,
      codigo_articulo: editCodigoArticulo.value,
      producto: editProducto.value,
      marca: editMarca.value,
      proveedor: editProveedor.value,
      departamento: editDepartamento.value,
      ubicacion: editUbicacion.value,
      stock_minimo: editStockMinimo.value,
      descripcion: editDescripcion.value,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    productEditorMessage.textContent = data.error || "No se pudo guardar.";
    productEditorMessage.className = "message error";
    return;
  }

  state.selected = data.producto;
  productEditorMessage.textContent = "Producto guardado.";
  productEditorMessage.className = "message ok";
  await loadFilters();
  await searchProducts();
  const fresh = state.products.find((product) => product.id === state.selected.id);
  if (fresh) selectProduct(fresh);
}

function renderTopSales(rows) {
  if (rows.length === 0) {
    topSalesList.innerHTML = `<div class="empty-state">Todavía no hay ventas registradas.</div>`;
    return;
  }
  topSalesList.innerHTML = rows
    .map(
      (row, index) => `
        <article class="rank-item">
          <span class="rank-number">${index + 1}</span>
          <div class="rank-main">
            <strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong>
            <span class="muted">${escapeHtml(row.marca)} | ${escapeHtml(row.descripcion)}</span>
          </div>
          <span class="rank-count">${escapeHtml(row.unidades)} un.</span>
        </article>
      `,
    )
    .join("");
}

function renderRecentSales(rows) {
  if (rows.length === 0) {
    recentSalesList.innerHTML = `<div class="empty-state">Todavía no hay ventas registradas.</div>`;
    return;
  }
  recentSalesList.innerHTML = rows
    .map(
      (row) => `
        <article class="rank-item">
          <span class="rank-number">S</span>
          <div class="rank-main">
            <strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong>
            <span class="muted">${escapeHtml(row.fecha)} | ${escapeHtml(row.usuario_nombre || "Sin usuario")}</span>
          </div>
          <span class="rank-count">${escapeHtml(row.cantidad)} un.</span>
        </article>
      `,
    )
    .join("");
}

async function checkSession() {
  const response = await fetch("/api/me");
  if (!response.ok) {
    lockApp();
    return;
  }
  const data = await response.json();
  unlockApp(data.user);
  await loadInitialData();
}

async function login(event) {
  event.preventDefault();
  loginMessage.textContent = "";
  loginMessage.className = "message";

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: userInput.value.trim(),
      password: passwordInput.value,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    loginMessage.textContent = data.error || "No se pudo entrar.";
    loginMessage.className = "message error";
    return;
  }
  unlockApp(data.user);
  await loadInitialData();
}

async function logout() {
  await fetch("/api/logout", { method: "POST" });
  lockApp();
}

async function loadInitialData() {
  await loadSummary();
  await loadFilters();
  await searchProducts();
  await loadMovements();
  await loadSalesSummary();
  await loadDashboard();
  renderCart();
}

productsBody.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-id]");
  if (!row) return;
  const product = state.products.find((item) => item.id === Number(row.dataset.id));
  if (product) selectProduct(product);
});

searchButton.addEventListener("click", searchProducts);
refreshButton.addEventListener("click", async () => {
  await loadSummary();
  await loadFilters();
  await searchProducts();
  await loadMovements(state.selected?.id ?? 0);
});
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchProducts();
  }
});
providerFilter.addEventListener("change", searchProducts);
categoryFilter.addEventListener("change", searchProducts);
clearFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  providerFilter.value = "";
  categoryFilter.value = "";
  searchProducts();
});
saleForm.addEventListener("submit", registerSale);
addSelectedToCart.addEventListener("click", () => addToCart(state.selected));
cartSaleForm.addEventListener("submit", confirmCartSale);
clearCartButton.addEventListener("click", () => {
  state.cart = [];
  renderCart();
  setCartMessage("Carrito vacio.", "ok");
});
cartItems.addEventListener("input", (event) => {
  const input = event.target.closest(".cart-quantity");
  if (!input) return;
  const row = event.target.closest(".cart-line");
  const item = state.cart.find((cartItem) => cartItem.id === Number(row.dataset.id));
  if (!item) return;
  const quantity = Math.max(1, Math.min(Number(input.value || 1), Number(item.stock)));
  item.cantidad = quantity;
  input.value = quantity;
  renderCart();
});
cartItems.addEventListener("click", (event) => {
  const button = event.target.closest(".remove-cart-item");
  if (!button) return;
  const row = event.target.closest(".cart-line");
  state.cart = state.cart.filter((item) => item.id !== Number(row.dataset.id));
  renderCart();
});
loginForm.addEventListener("submit", login);
logoutButton.addEventListener("click", logout);
closeSalesDashboard.addEventListener("click", () => salesDashboard.classList.remove("is-open"));
closeProductDashboard.addEventListener("click", () => productDashboard.classList.remove("is-open"));
refreshDashboardButton.addEventListener("click", loadDashboard);
productEditorForm.addEventListener("submit", saveProduct);
menuItems.forEach((item) => {
  item.addEventListener("click", () => setActiveMenu(item.dataset.view));
});

async function startApp() {
  try {
    await checkSession();
  } catch (error) {
    console.error("No se pudo iniciar el sistema.", error);
    lockApp();
  } finally {
    hideBootScreen();
  }
}

startApp();
