const state = {
  selected: null,
  products: [],
  salesProducts: [],
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
const menuToggle = document.querySelector("#menuToggle");
const menuOverlay = document.querySelector("#menuOverlay");
const sidebarCollapse = document.querySelector("#sidebarCollapse");
const pageLoader = document.querySelector("#pageLoader");
const sideMenu = document.querySelector("#sideMenu");
const menuItems = document.querySelectorAll(".menu-item");
const adminOnlyItems = document.querySelectorAll(".admin-only");
const moduleScreens = document.querySelectorAll(".section, .module-screen");
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
const editAplicacion = document.querySelector("#editAplicacion");
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
const searchLabel = document.querySelector("label[for='searchInput']");
const searchButton = document.querySelector("#searchButton");
const refreshButton = document.querySelector("#refreshButton");
const providerFilter = document.querySelector("#providerFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const clearFiltersButton = document.querySelector("#clearFiltersButton");
const searchStatus = document.querySelector("#searchStatus");
const searchCounter = document.querySelector("#searchCounter");
const assistantInput = document.querySelector("#assistantInput");
const assistantButton = document.querySelector("#assistantButton");
const assistantResponse = document.querySelector("#assistantResponse");
const assistantResults = document.querySelector("#assistantResults");
const salesProductsBody = document.querySelector("#salesProductsBody");
const salesSearchInput = document.querySelector("#salesSearchInput");
const salesSearchButton = document.querySelector("#salesSearchButton");
const salesClearButton = document.querySelector("#salesClearButton");
const salesSearchStatus = document.querySelector("#salesSearchStatus");
const salesSearchCounter = document.querySelector("#salesSearchCounter");
const selectedProduct = document.querySelector("#selectedProduct");
const saleForm = document.querySelector("#saleForm");
const quantityInput = document.querySelector("#quantityInput");
const noteInput = document.querySelector("#noteInput");
const saleMessage = document.querySelector("#saleMessage");
const summary = document.querySelector("#summary");
const movements = document.querySelector("#movements");
const inventoryProviderFilter = document.querySelector("#inventoryProviderFilter");
const inventoryCategoryFilter = document.querySelector("#inventoryCategoryFilter");
const inventoryStatusFilter = document.querySelector("#inventoryStatusFilter");
const refreshInventoryButton = document.querySelector("#refreshInventoryButton");
const inventoryProducts = document.querySelector("#inventoryProducts");
const inventoryUnit = document.querySelector("#inventoryUnit");
const inventoryDeposit = document.querySelector("#inventoryDeposit");
const inventoryTotal = document.querySelector("#inventoryTotal");
const inventoryLow = document.querySelector("#inventoryLow");
const inventoryEmpty = document.querySelector("#inventoryEmpty");
const inventoryDepartments = document.querySelector("#inventoryDepartments");
const inventoryCritical = document.querySelector("#inventoryCritical");
const stockAdjustForm = document.querySelector("#stockAdjustForm");
const stockSelectedProduct = document.querySelector("#stockSelectedProduct");
const stockUnitInput = document.querySelector("#stockUnitInput");
const stockDepositInput = document.querySelector("#stockDepositInput");
const stockReasonInput = document.querySelector("#stockReasonInput");
const stockAdjustMessage = document.querySelector("#stockAdjustMessage");
const excelFileInput = document.querySelector("#excelFileInput");
const previewExcelButton = document.querySelector("#previewExcelButton");
const importExcelButton = document.querySelector("#importExcelButton");
const excelMessage = document.querySelector("#excelMessage");
const excelPreview = document.querySelector("#excelPreview");

document.body.classList.add("locked");
const bootFallback = window.setTimeout(hideBootScreen, 3500);
let loaderCount = 0;
const SIDEBAR_COLLAPSED_KEY = "erp.sidebarCollapsed";

function showPageLoader() {
  loaderCount += 1;
  pageLoader?.classList.add("is-visible");
  pageLoader?.setAttribute("aria-hidden", "false");
}

function hidePageLoader() {
  loaderCount = Math.max(0, loaderCount - 1);
  if (loaderCount === 0) {
    pageLoader?.classList.remove("is-visible");
    pageLoader?.setAttribute("aria-hidden", "true");
  }
}

async function withPageLoader(task) {
  showPageLoader();
  try {
    return await task();
  } finally {
    hidePageLoader();
  }
}

function closeMobileMenu() {
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuOverlay) {
    menuOverlay.hidden = true;
    menuOverlay.setAttribute("aria-hidden", "true");
  }
}

function openMobileMenu() {
  document.body.classList.add("menu-open");
  menuToggle?.setAttribute("aria-expanded", "true");
  if (menuOverlay) {
    menuOverlay.hidden = false;
    menuOverlay.setAttribute("aria-hidden", "false");
  }
}

function applySidebarCollapsed(collapsed) {
  document.body.classList.toggle("sidebar-collapsed", collapsed);
  sidebarCollapse?.setAttribute("aria-label", collapsed ? "Expandir menú lateral" : "Colapsar menú lateral");
  sidebarCollapse?.setAttribute("title", collapsed ? "Expandir menú" : "Colapsar menú");
}

function initSidebarCollapse() {
  const saved = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
  applySidebarCollapsed(saved === "1");
}

function hideBootScreen() {
  window.clearTimeout(bootFallback);
  document.body.classList.remove("booting");
  window.setTimeout(() => {
    if (bootScreen && bootScreen.parentNode) {
      bootScreen.parentNode.removeChild(bootScreen);
    }
  }, 260);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function importantSearchTerms(value) {
  const stopWords = new Set([
    "a",
    "al",
    "articulo",
    "articulos",
    "busca",
    "buscame",
    "buscar",
    "busco",
    "codigo",
    "con",
    "de",
    "del",
    "el",
    "en",
    "la",
    "las",
    "lo",
    "los",
    "mostrame",
    "necesito",
    "para",
    "por",
    "producto",
    "productos",
    "quiero",
    "sin",
    "tengo",
    "un",
    "una",
  ]);
  return normalizeSearchText(value)
    .split(" ")
    .filter((term) => term.length > 1 && !stopWords.has(term));
}

function highlightText(value, query) {
  const terms = importantSearchTerms(query);
  let safe = escapeHtml(value);
  terms.forEach((term) => {
    safe = safe.replace(new RegExp(`(${escapeRegex(term)})`, "gi"), "<mark>$1</mark>");
  });
  return safe;
}

function setSearchStatus(text, type = "") {
  if (!searchStatus) return;
  searchStatus.textContent = text;
  searchStatus.className = type ? `is-${type}` : "";
}

function setSearchCounter(count, total = count) {
  if (!searchCounter) return;
  const suffix = total > count ? ` de ${total}` : "";
  searchCounter.textContent = `${count}${suffix} resultado${count === 1 ? "" : "s"}`;
}

function setSalesSearchStatus(text, type = "") {
  if (!salesSearchStatus) return;
  salesSearchStatus.textContent = text;
  salesSearchStatus.className = type ? `is-${type}` : "";
}

function setSalesSearchCounter(count, total = count) {
  if (!salesSearchCounter) return;
  const suffix = total > count ? ` de ${total}` : "";
  salesSearchCounter.textContent = `${count}${suffix} resultado${count === 1 ? "" : "s"}`;
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
  setSearchStatus("Buscando...", "loading");
  try {
    const response = await fetch(`/api/productos/buscar?${params.toString()}`);
    if (!ensureAllowed(response)) return;
    const data = await response.json();
    state.products = data.productos || [];
    renderProducts(query);
    setSearchCounter(state.products.length, data.total ?? state.products.length);
    if (state.products.length === 0) {
      setSearchStatus("Sin resultados. Probá con otro código, marca o descripción.", "empty");
    } else {
      setSearchStatus("Resultados actualizados.", "ok");
    }
    return state.products;
  } catch (error) {
    console.error("Error al buscar productos", error);
    state.products = [];
    renderProducts(query);
    setSearchCounter(0);
    setSearchStatus("No se pudo completar la búsqueda.", "error");
    return [];
  }
}

async function searchSalesProducts() {
  const query = salesSearchInput?.value.trim() || "";
  const params = new URLSearchParams({
    q: query,
    limit: "120",
  });
  setSalesSearchStatus("Buscando...", "loading");
  try {
    const response = await fetch(`/api/productos/buscar?${params.toString()}`);
    if (!ensureAllowed(response)) return [];
    const data = await response.json();
    state.salesProducts = data.productos || [];
    renderSalesProducts(query);
    setSalesSearchCounter(state.salesProducts.length, data.total ?? state.salesProducts.length);
    setSalesSearchStatus(
      state.salesProducts.length === 0 ? "Sin resultados para vender." : "Resultados de venta actualizados.",
      state.salesProducts.length === 0 ? "empty" : "ok",
    );
    return state.salesProducts;
  } catch (error) {
    console.error("Error al buscar productos para venta", error);
    state.salesProducts = [];
    renderSalesProducts(query);
    setSalesSearchCounter(0);
    setSalesSearchStatus("No se pudo completar la búsqueda de venta.", "error");
    return [];
  }
}

async function loadFilters() {
  const response = await fetch("/api/filtros");
  if (!ensureAllowed(response)) return;
  const data = await response.json();
  fillSelect(providerFilter, data.proveedores || [], "Todos");
  fillSelect(categoryFilter, data.categorias || [], "Todas");
  fillSelect(inventoryProviderFilter, data.proveedores || [], "Todos");
  fillSelect(inventoryCategoryFilter, data.categorias || [], "Todos");
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

function renderProducts(query = searchInput.value.trim()) {
  if (state.products.length === 0) {
    productsBody.innerHTML = `
      <tr>
        <td colspan="11" class="muted">Sin resultados para la búsqueda actual.</td>
      </tr>
    `;
    return;
  }

  productsBody.innerHTML = state.products
    .map((product) => {
      const selected = state.selected?.id === product.id ? "selected" : "";
      return `
        <tr class="${selected}" data-id="${product.id}">
          <td><span class="product-code">${highlightText(product.codigo_item, query)}</span></td>
          <td>${highlightText(product.codigo_barras, query)}</td>
          <td>${highlightText(product.codigo_articulo, query)}</td>
          <td>${highlightText(product.producto, query)}</td>
          <td>${highlightText(product.marca, query)}</td>
          <td>${highlightText(product.proveedor, query)}</td>
          <td>${highlightText(product.departamento, query)}</td>
          <td class="${stockClass(product.stock_unidad)}">${escapeHtml(product.stock_unidad)}</td>
          <td class="${stockClass(product.stock_deposito)}">${escapeHtml(product.stock_deposito)}</td>
          <td class="${stockClass(product.stock)}">${escapeHtml(product.stock)}</td>
          <td class="row-actions">
            <button type="button" data-action="detail">Ver</button>
            <button type="button" data-action="sell">Agregar a venta</button>
            <button type="button" data-action="stock">Stock</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function productRow(product, query, actions = "catalog") {
  const selected = state.selected?.id === product.id ? "selected" : "";
  const sellLabel = actions === "sales" ? "Agregar" : "Agregar a venta";
  return `
    <tr class="${selected}" data-id="${product.id}">
      <td><span class="product-code">${highlightText(product.codigo_item, query)}</span></td>
      <td>${highlightText(product.codigo_barras, query)}</td>
      <td>${highlightText(product.codigo_articulo, query)}</td>
      <td>${highlightText(product.producto, query)}</td>
      <td>${highlightText(product.marca, query)}</td>
      <td>${highlightText(product.proveedor, query)}</td>
      <td>${highlightText(product.departamento, query)}</td>
      <td class="${stockClass(product.stock_unidad)}">${escapeHtml(product.stock_unidad)}</td>
      <td class="${stockClass(product.stock_deposito)}">${escapeHtml(product.stock_deposito)}</td>
      <td class="${stockClass(product.stock)}">${escapeHtml(product.stock)}</td>
      <td class="row-actions">
        <button type="button" data-action="detail">Ver</button>
        <button type="button" data-action="sell">${sellLabel}</button>
        <button type="button" data-action="stock">Stock</button>
      </td>
    </tr>
  `;
}

function renderSalesProducts(query = salesSearchInput?.value.trim() || "") {
  if (!salesProductsBody) return;
  if (state.salesProducts.length === 0) {
    salesProductsBody.innerHTML = `
      <tr>
        <td colspan="11" class="muted">Sin resultados para la venta actual.</td>
      </tr>
    `;
    return;
  }
  salesProductsBody.innerHTML = state.salesProducts
    .map((product) => productRow(product, query, "sales"))
    .join("");
}

function assistantExplanation(product, terms) {
  const fields = [
    ["producto", "producto"],
    ["marca", "marca"],
    ["proveedor", "proveedor"],
    ["departamento", "departamento"],
    ["descripcion", "descripción"],
    ["aplicacion", "aplicación"],
  ];
  const matched = [];
  fields.forEach(([field, label]) => {
    const value = normalizeSearchText(product[field]);
    if (terms.some((term) => value.includes(term))) {
      matched.push(label);
    }
  });
  return matched.length > 0 ? `Coincide por ${matched.slice(0, 3).join(", ")}.` : "Coincidencia encontrada en el catálogo.";
}

function renderAssistantResults(products, terms) {
  if (!assistantResults || !assistantResponse) return;
  if (products.length === 0) {
    assistantResponse.textContent = "No encontré productos con esa consulta. Probá con marca, modelo, código o tipo de repuesto.";
    assistantResults.innerHTML = "";
    return;
  }

  assistantResponse.textContent = `Encontré ${products.length} sugerencia${products.length === 1 ? "" : "s"} usando las palabras: ${terms.join(", ")}.`;
  assistantResults.innerHTML = products
    .slice(0, 6)
    .map(
      (product) => `
        <article class="assistant-result" data-id="${product.id}">
          <div>
            <strong>${escapeHtml(product.producto || "Producto sin nombre")}</strong>
            <span>${escapeHtml(product.marca || "Sin marca")} · ${escapeHtml(product.proveedor || "Sin proveedor")}</span>
            <p>${escapeHtml(assistantExplanation(product, terms))} Stock disponible: <strong>${escapeHtml(product.stock)}</strong></p>
          </div>
          <div class="assistant-actions">
            <button type="button" data-assistant-action="view">Ver producto</button>
            <button type="button" data-assistant-action="sell">Agregar a venta</button>
          </div>
        </article>
      `,
    )
    .join("");
}

async function runAssistantSearch() {
  const text = assistantInput?.value.trim() || "";
  const terms = importantSearchTerms(text);
  if (!text || terms.length === 0) {
    assistantResponse.textContent = "Escribí qué producto, código, marca o aplicación necesitás buscar.";
    assistantResults.innerHTML = "";
    return;
  }

  const query = terms.join(" ");
  searchInput.value = query;
  setActiveMenu("catalogo");
  const products = await searchProducts();
  const wantsNoStock = normalizeSearchText(text).includes("sin stock");
  const suggestions = wantsNoStock ? products.filter((product) => Number(product.stock || 0) <= 0) : products;
  renderAssistantResults(suggestions, terms);
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
    <div>Mostrador: <strong>${escapeHtml(product.stock_unidad)}</strong> | Depósito: <strong>${escapeHtml(product.stock_deposito)}</strong> | Total: <strong>${escapeHtml(product.stock)}</strong></div>
  `;
  stockSelectedProduct.className = "selected-box";
  stockSelectedProduct.innerHTML = `
    <strong>${escapeHtml(product.codigo_item)} - ${escapeHtml(product.producto)}</strong>
    <span>${escapeHtml(product.marca)} | ${escapeHtml(product.proveedor)}</span>
  `;
  stockUnitInput.value = Number(product.stock_unidad || 0);
  stockDepositInput.value = Number(product.stock_deposito || 0);
  renderProducts();
  renderSalesProducts();
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
  editAplicacion.value = product.aplicacion || "";
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
  state.selected.stock_unidad = data.stock_unidad;
  state.selected.stock_deposito = data.stock_deposito;
  await loadSummary();
  await searchProducts();
  await searchSalesProducts();
  await loadInventory();
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
  cartSummary.textContent = `🛒 Carrito (${totalItems}) | ${totalUnits} unidades`;

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
            <span class="muted">${escapeHtml(item.marca)} | Mostrador: ${escapeHtml(item.stock_unidad)} | Depósito: ${escapeHtml(item.stock_deposito)} | Total: ${escapeHtml(item.stock)}</span>
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
  await searchSalesProducts();
  await loadSalesSummary();
  await loadDashboard();
  await loadInventory();
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
          ${movement.motivo ? `<div>Motivo: ${escapeHtml(movement.motivo)}</div>` : ""}
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
  closeMobileMenu();
  userLabel.textContent = "Sin usuario";
  productsBody.innerHTML = "";
  movements.innerHTML = "";
}

function unlockApp(user) {
  state.user = user;
  document.body.classList.remove("locked");
  userLabel.textContent = `${user.nombre} (${user.rol})`;
  initSidebarCollapse();
  updateMenuByRole();
  setActiveMenu("dashboard");
}

function updateMenuByRole() {
  adminOnlyItems.forEach((item) => {
    item.classList.toggle("is-hidden", state.user?.rol !== "administrador");
  });
}

function setActiveMenu(view) {
  document.body.dataset.module = view;
  closeMobileMenu();
  menuItems.forEach((item) => {
    const itemSection = item.dataset.section || item.dataset.view;
    item.classList.toggle("active", itemSection === view);
  });
  moduleScreens.forEach((screen) => {
    const screenSection = screen.dataset.section || screen.dataset.module;
    const isVisible = screenSection === view;
    screen.classList.add("section");
    screen.dataset.section = screenSection || "";
    screen.classList.toggle("is-active", isVisible);
    screen.classList.toggle("active", isVisible);
    screen.hidden = !isVisible;
    screen.style.display = isVisible ? "" : "none";
    screen.setAttribute("aria-hidden", String(!isVisible));
  });

  const notes = {
    dashboard: "Módulo actual: tablero ejecutivo y control general.",
    venta: "Módulo actual: ventas y descuento de stock.",
    catalogo: "Módulo actual: catálogo y edición de productos.",
    inventario: "Módulo actual: inventario y stock crítico.",
    "actualizar-stock": "Módulo actual: actualización manual e importación Excel.",
    movimientos: "Movimientos: historial disponible para administrador.",
    usuarios: "Usuarios: módulo pendiente de habilitación.",
    ajustes: "Ajustes: módulo pendiente de configuración.",
  };
  menuNote.textContent = notes[view] || "Módulo seleccionado.";

  if (view === "dashboard") {
    loadDashboard();
  }
  if (view === "catalogo") {
    if (searchLabel) {
      searchLabel.textContent = "Buscar en Catálogo";
    }
    if (searchInput) {
      searchInput.placeholder = "Código, código de barras, marca, descripción, aplicación...";
    }
    searchInput.focus();
  }
  if (view === "venta") {
    salesSearchInput?.focus();
  }
  if (view === "inventario") {
    loadInventory();
  }
  if (view === "venta") {
    selectedProduct.scrollIntoView({ block: "nearest" });
  }
}

async function loadInventory() {
  const params = new URLSearchParams({
    proveedor: inventoryProviderFilter.value,
    departamento: inventoryCategoryFilter.value,
    estado: inventoryStatusFilter.value,
  });
  const response = await fetch(`/api/inventario/resumen?${params.toString()}`);
  if (!ensureAllowed(response)) return;
  const data = await response.json();
  const resumen = data.resumen || {};
  inventoryProducts.textContent = resumen.productos ?? 0;
  inventoryUnit.textContent = resumen.stock_unidad ?? 0;
  inventoryDeposit.textContent = resumen.stock_deposito ?? 0;
  inventoryTotal.textContent = resumen.stock_total ?? 0;
  inventoryLow.textContent = resumen.stock_bajo ?? 0;
  inventoryEmpty.textContent = resumen.sin_stock ?? 0;
  renderInventoryDepartments(data.por_departamento || []);
  renderInventoryCritical(data.criticos || []);
}

function renderInventoryDepartments(rows) {
  if (rows.length === 0) {
    inventoryDepartments.innerHTML = `<div class="empty-state">Sin datos para mostrar.</div>`;
    return;
  }
  inventoryDepartments.innerHTML = rows
    .map(
      (row) => `
        <article class="metric-row">
          <div>
            <strong>${escapeHtml(row.departamento)}</strong>
            <span>${escapeHtml(row.productos)} productos</span>
          </div>
          <div class="metric-value">${escapeHtml(row.stock_total)} un.</div>
        </article>
      `,
    )
    .join("");
}

function renderInventoryCritical(rows) {
  if (rows.length === 0) {
    inventoryCritical.innerHTML = `<div class="empty-state">Sin productos críticos.</div>`;
    return;
  }
  inventoryCritical.innerHTML = rows
    .map(
      (row) => `
        <article class="metric-row">
          <div>
            <strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong>
            <span>${escapeHtml(row.marca)} | ${escapeHtml(row.proveedor)}</span>
          </div>
          <div class="metric-value">${escapeHtml(row.stock_total)} un.</div>
        </article>
      `,
    )
    .join("");
}

async function saveStockAdjust(event) {
  event.preventDefault();
  if (!state.selected) {
    stockAdjustMessage.textContent = "Seleccioná un producto desde el catálogo.";
    stockAdjustMessage.className = "message error";
    return;
  }
  const response = await fetch("/api/stock/ajustar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      producto_id: state.selected.id,
      stock_unidad: stockUnitInput.value,
      stock_deposito: stockDepositInput.value,
      motivo: stockReasonInput.value,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    stockAdjustMessage.textContent = data.error || "No se pudo actualizar el stock.";
    stockAdjustMessage.className = "message error";
    return;
  }
  stockAdjustMessage.textContent = `Stock actualizado. Total: ${data.stock_nuevo}`;
  stockAdjustMessage.className = "message ok";
  await loadSummary();
  await searchProducts();
  await searchSalesProducts();
  await loadInventory();
  await loadMovements(state.selected.id);
}

function readExcelFile() {
  const file = excelFileInput.files?.[0];
  if (!file) {
    excelMessage.textContent = "Seleccioná un archivo .xlsx.";
    excelMessage.className = "message error";
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result);
      let binary = "";
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      resolve({ filename: file.name, content: btoa(binary) });
    };
    reader.onerror = () => resolve(null);
    reader.readAsArrayBuffer(file);
  });
}

async function previewExcel() {
  const file = await readExcelFile();
  if (!file) return;
  excelMessage.textContent = "Leyendo archivo...";
  excelMessage.className = "message";
  const response = await fetch("/api/stock/importar-excel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...file, preview: true }),
  });
  const data = await response.json();
  if (!response.ok) {
    excelMessage.textContent = data.error || "No se pudo leer el Excel.";
    excelMessage.className = "message error";
    return;
  }
  importExcelButton.disabled = false;
  excelMessage.textContent = `Vista previa lista: ${data.total_filas} filas detectadas.`;
  excelMessage.className = "message ok";
  renderExcelPreview(data.preview || [], data.errores || []);
}

function renderExcelPreview(rows, errors) {
  if (rows.length === 0) {
    excelPreview.innerHTML = `<div class="empty-state">No hay filas para previsualizar.</div>`;
    return;
  }
  excelPreview.innerHTML = `
    <table>
      <thead>
        <tr><th>Código</th><th>Producto</th><th>Marca</th><th>Mostrador</th><th>Depósito</th></tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
              <tr>
                <td>${escapeHtml(row.codigo_item || row.codigo_barras || row.codigo_articulo)}</td>
                <td>${escapeHtml(row.producto)}</td>
                <td>${escapeHtml(row.marca)}</td>
                <td>${escapeHtml(row.stock_unidad)}</td>
                <td>${escapeHtml(row.stock_deposito)}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
    ${errors.length ? `<div class="message error">${escapeHtml(errors.length)} advertencias encontradas.</div>` : ""}
  `;
}

async function importExcel() {
  const file = await readExcelFile();
  if (!file) return;
  importExcelButton.disabled = true;
  excelMessage.textContent = "Importando archivo...";
  excelMessage.className = "message";
  const response = await fetch("/api/stock/importar-excel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...file, preview: false }),
  });
  const data = await response.json();
  if (!response.ok) {
    excelMessage.textContent = data.error || "No se pudo importar.";
    excelMessage.className = "message error";
    importExcelButton.disabled = false;
    return;
  }
  excelMessage.textContent = `Importación completa: ${data.nuevos} nuevos, ${data.actualizados} actualizados, ${data.ignorados} ignorados.`;
  excelMessage.className = "message ok";
  await loadFilters();
  await searchProducts();
  await searchSalesProducts();
  await loadInventory();
  await loadMovements();
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
      aplicacion: editAplicacion.value,
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
  await searchSalesProducts();
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
  await withPageLoader(async () => {
    await loadSummary();
    await loadFilters();
    await searchProducts();
    await searchSalesProducts();
    await loadMovements();
    await loadSalesSummary();
    await loadDashboard();
    await loadInventory();
    renderCart();
  });
}

productsBody.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-id]");
  if (!row) return;
  const product = state.products.find((item) => item.id === Number(row.dataset.id));
  if (!product) return;
  selectProduct(product);
  const action = event.target.closest("button")?.dataset.action;
  if (action === "sell") {
    addToCart(product);
    setActiveMenu("venta");
  } else if (action === "stock") {
    setActiveMenu("actualizar-stock");
  }
});

salesProductsBody?.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-id]");
  if (!row) return;
  const product = state.salesProducts.find((item) => item.id === Number(row.dataset.id));
  if (!product) return;
  selectProduct(product);
  const action = event.target.closest("button")?.dataset.action;
  if (action === "sell") {
    addToCart(product);
  } else if (action === "stock") {
    setActiveMenu("actualizar-stock");
  }
});

searchButton.addEventListener("click", searchProducts);
salesSearchButton?.addEventListener("click", searchSalesProducts);
salesSearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchSalesProducts();
  }
});
salesClearButton?.addEventListener("click", () => {
  salesSearchInput.value = "";
  state.salesProducts = [];
  renderSalesProducts();
  setSalesSearchCounter(0);
  setSalesSearchStatus("Listo para vender.");
});
refreshButton.addEventListener("click", async () => {
  await loadSummary();
  await loadFilters();
  await searchProducts();
  await searchSalesProducts();
  await loadMovements(state.selected?.id ?? 0);
});
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchProducts();
  }
});
providerFilter.addEventListener("change", searchProducts);
categoryFilter.addEventListener("change", searchProducts);
clearFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  providerFilter.value = "";
  categoryFilter.value = "";
  if (assistantInput) assistantInput.value = "";
  if (assistantResponse) assistantResponse.textContent = "El asistente usa el catálogo actual y no inventa productos.";
  if (assistantResults) assistantResults.innerHTML = "";
  searchProducts();
});
assistantButton?.addEventListener("click", runAssistantSearch);
assistantInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    runAssistantSearch();
  }
});
assistantResults?.addEventListener("click", (event) => {
  const card = event.target.closest(".assistant-result[data-id]");
  if (!card) return;
  const product = state.products.find((item) => item.id === Number(card.dataset.id));
  if (!product) return;
  selectProduct(product);
  const action = event.target.closest("button")?.dataset.assistantAction;
  if (action === "sell") {
    addToCart(product);
    setActiveMenu("venta");
  }
});
inventoryProviderFilter.addEventListener("change", loadInventory);
inventoryCategoryFilter.addEventListener("change", loadInventory);
inventoryStatusFilter.addEventListener("change", loadInventory);
refreshInventoryButton.addEventListener("click", loadInventory);
stockAdjustForm.addEventListener("submit", saveStockAdjust);
previewExcelButton.addEventListener("click", () => withPageLoader(previewExcel));
importExcelButton.addEventListener("click", () => withPageLoader(importExcel));
excelFileInput.addEventListener("change", () => {
  importExcelButton.disabled = true;
  excelPreview.innerHTML = "";
  excelMessage.textContent = "";
  excelMessage.className = "message";
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
closeSalesDashboard?.addEventListener("click", () => salesDashboard.classList.remove("is-open"));
closeProductDashboard?.addEventListener("click", () => productDashboard.classList.remove("is-open"));
refreshDashboardButton.addEventListener("click", () => withPageLoader(loadDashboard));
productEditorForm.addEventListener("submit", saveProduct);
menuItems.forEach((item) => {
  item.addEventListener("click", () => setActiveMenu(item.dataset.section || item.dataset.view));
});
menuToggle?.addEventListener("click", () => {
  if (document.body.classList.contains("menu-open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});
menuOverlay?.addEventListener("click", closeMobileMenu);
sidebarCollapse?.addEventListener("click", () => {
  const collapsed = !document.body.classList.contains("sidebar-collapsed");
  applySidebarCollapsed(collapsed);
  window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? "1" : "0");
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
