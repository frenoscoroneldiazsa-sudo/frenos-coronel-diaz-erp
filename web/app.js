const state = {
  selected: null,
  products: [],
  salesProducts: [],
  user: null,
  cart: [],
  catalogDirty: true,
  salesDirty: true,
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
let moduleScreens = document.querySelectorAll(".erp-module");
const menuNote = document.querySelector("#menuNote");

// Dashboard
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

// Ventas (resumen/ranking)
const salesDashboard = document.querySelector("#salesDashboard");
const closeSalesDashboard = document.querySelector("#closeSalesDashboard");
const salesOperations = document.querySelector("#salesOperations");
const salesUnits = document.querySelector("#salesUnits");
const topSalesList = document.querySelector("#topSalesList");
const recentSalesList = document.querySelector("#recentSalesList");

// Editor de producto (catálogo)
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

// Carrito / panel de venta
const addSelectedToCart = document.querySelector("#addSelectedToCart");
const cartItems = document.querySelector("#cartItems");
const cartSummary = document.querySelector("#cartSummary");
const cartSaleForm = document.querySelector("#cartSaleForm");
const cartCustomer = document.querySelector("#cartCustomer");
const cartNote = document.querySelector("#cartNote");
const cartMessage = document.querySelector("#cartMessage");
const clearCartButton = document.querySelector("#clearCartButton");

// Catálogo
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

// Ventas POS
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

// Topbar
const summary = document.querySelector("#summary");

// Movimientos
const movements = document.querySelector("#movements");

// Inventario
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

// Stock
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

// ─── Configuración de módulos ────────────────────────────────────────────────
const ERP_MODULES = {
  dashboard: {
    label: "Tablero",
    note: "Módulo actual: tablero ejecutivo y control general.",
    onEnter: () => loadDashboard(),
  },
  catalogo: {
    label: "Catálogo",
    note: "Módulo actual: catálogo y consulta de productos.",
    onEnter: () => {
      if (searchInput) searchInput.focus();
      if (state.products.length === 0 || state.catalogDirty) searchProducts();
    },
  },
  venta: {
    label: "Ventas",
    note: "Módulo actual: punto de venta, carrito y descuento de stock.",
    onEnter: () => {
      salesSearchInput?.focus();
      if (salesSearchInput?.value.trim() && state.salesDirty) {
        searchSalesProducts();
      } else {
        renderSalesProducts();
      }
      loadSalesSummary();
    },
  },
  inventario: {
    label: "Inventario",
    note: "Módulo actual: inventario y stock crítico.",
    onEnter: () => loadInventory(),
  },
  "actualizar-stock": {
    label: "Actualizar stock",
    note: "Módulo actual: actualización manual e importación Excel.",
  },
  movimientos: {
    label: "Movimientos",
    note: "Módulo actual: historial de ventas, ajustes y operaciones.",
    onEnter: () => loadMovements(state.selected?.id ?? 0),
  },
  usuarios: {
    label: "Usuarios",
    note: "Módulo actual: usuarios y permisos.",
  },
  ajustes: {
    label: "Ajustes",
    note: "Módulo actual: configuración general.",
  },
};

// ─── Navegación ──────────────────────────────────────────────────────────────

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

function getSectionName(element) {
  return element?.dataset.section || element?.dataset.module || element?.dataset.view || "";
}

function setActiveMenu(view) {
  const moduleConfig = ERP_MODULES[view] || {};
  document.body.dataset.module = view;
  closeMobileMenu();

  menuItems.forEach((item) => {
    const itemSection = getSectionName(item);
    item.classList.toggle("active", itemSection === view);
  });

  // Con la nueva estructura HTML los módulos ya tienen
  // data-section correcto — no necesitamos buildModuleShells()
  // pero lo mantenemos como fallback por compatibilidad.
  if (!moduleScreens.length) _buildModuleShells();

  moduleScreens.forEach((screen) => {
    const screenSection = getSectionName(screen);
    const isVisible = screenSection === view;
    screen.classList.toggle("is-active", isVisible);
    screen.classList.toggle("active", isVisible);
    screen.hidden = !isVisible;
    screen.style.display = isVisible ? "" : "none";
    screen.setAttribute("aria-hidden", String(!isVisible));
  });

  const legacyNotes = {
    dashboard: "Módulo actual: tablero ejecutivo y control general.",
    venta: "Módulo actual: ventas y descuento de stock.",
    catalogo: "Módulo actual: catálogo y edición de productos.",
    inventario: "Módulo actual: inventario y stock crítico.",
    "actualizar-stock": "Módulo actual: actualización manual e importación Excel.",
    movimientos: "Movimientos: historial disponible para administrador.",
    usuarios: "Usuarios: módulo pendiente de habilitación.",
    ajustes: "Ajustes: módulo pendiente de configuración.",
  };
  menuNote.textContent = moduleConfig.note || legacyNotes[view] || "Módulo seleccionado.";

  moduleConfig.onEnter?.();
}

// Fallback legacy — solo se activa si el HTML antiguo estuviera presente
function _buildModuleShells() {
  const workspaceScroll = document.querySelector(".workspace-scroll");
  if (!workspaceScroll) return;
  // Registrar los nuevos módulos pre-construidos en el HTML
  moduleScreens = document.querySelectorAll(".erp-module, .module-screen");
}

// ─── Utilidades ──────────────────────────────────────────────────────────────

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
    "a","al","articulo","articulos","busca","buscame","buscar","busco",
    "codigo","con","de","del","el","en","la","las","lo","los","mostrame",
    "necesito","para","por","producto","productos","quiero","sin","tengo","un","una",
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

function stockClass(stock) {
  const n = Number(stock);
  if (n <= 0) return "stock stock-empty";
  if (n < 3) return "stock stock-low";
  return "stock stock-ok";
}

function activeModule() {
  return document.body.dataset.module || "dashboard";
}

function markProductDataDirty() {
  state.catalogDirty = true;
  state.salesDirty = true;
}

// ─── Feedback de búsqueda ─────────────────────────────────────────────────────

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

// ─── Datos: resumen topbar ────────────────────────────────────────────────────

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

async function refreshActiveModuleData(productId = state.selected?.id) {
  await loadSummary();
  const current = activeModule();
  if (current === "catalogo") await searchProducts();
  if (current === "venta" && salesSearchInput?.value.trim()) await searchSalesProducts();
  if (current === "inventario") await loadInventory();
  if (current === "dashboard") await loadDashboard();
  if (current === "movimientos" || productId) await loadMovements(productId || 0);
}

// ─── CATÁLOGO: búsqueda y render ──────────────────────────────────────────────

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
    state.catalogDirty = false;
    renderProducts(query);
    setSearchCounter(state.products.length, data.total ?? state.products.length);
    setSearchStatus(
      state.products.length === 0 ? "Sin resultados. Probá con otro código, marca o descripción." : "Resultados actualizados.",
      state.products.length === 0 ? "empty" : "ok",
    );
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

function renderProducts(query = searchInput.value.trim()) {
  if (state.products.length === 0) {
    productsBody.innerHTML = `<tr><td colspan="11" class="muted">Sin resultados para la búsqueda actual.</td></tr>`;
    return;
  }
  productsBody.innerHTML = state.products
    .map((product) => {
      const sel = state.selected?.id === product.id ? "selected" : "";
      return `
        <tr class="${sel}" data-id="${product.id}">
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
        </tr>`;
    })
    .join("");
}

// ─── VENTAS: búsqueda y render ────────────────────────────────────────────────

async function searchSalesProducts() {
  const query = salesSearchInput?.value.trim() || "";
  const params = new URLSearchParams({ q: query, limit: "120" });
  setSalesSearchStatus("Buscando...", "loading");
  try {
    const response = await fetch(`/api/productos/buscar?${params.toString()}`);
    if (!ensureAllowed(response)) return [];
    const data = await response.json();
    state.salesProducts = data.productos || [];
    state.salesDirty = false;
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

function salesProductRow(product, query) {
  const sel = state.selected?.id === product.id ? "selected" : "";
  return `
    <tr class="${sel}" data-id="${product.id}">
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
        <button type="button" data-action="sell">Agregar</button>
        <button type="button" data-action="stock">Stock</button>
      </td>
    </tr>`;
}

function renderSalesProducts(query = salesSearchInput?.value.trim() || "") {
  if (!salesProductsBody) return;
  if (state.salesProducts.length === 0) {
    salesProductsBody.innerHTML = `<tr><td colspan="11" class="muted">Sin resultados para la venta actual.</td></tr>`;
    return;
  }
  salesProductsBody.innerHTML = state.salesProducts
    .map((product) => salesProductRow(product, query))
    .join("");
}

// ─── Filtros ──────────────────────────────────────────────────────────────────

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

// ─── Asistente de búsqueda ────────────────────────────────────────────────────

function assistantExplanation(product, terms) {
  const fields = [
    ["producto", "producto"], ["marca", "marca"], ["proveedor", "proveedor"],
    ["departamento", "departamento"], ["descripcion", "descripción"], ["aplicacion", "aplicación"],
  ];
  const matched = [];
  fields.forEach(([field, label]) => {
    if (terms.some((term) => normalizeSearchText(product[field]).includes(term))) matched.push(label);
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
        </article>`,
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
  searchInput.value = terms.join(" ");
  setActiveMenu("catalogo");
  const products = await searchProducts();
  const wantsNoStock = normalizeSearchText(text).includes("sin stock");
  const suggestions = wantsNoStock ? products.filter((p) => Number(p.stock || 0) <= 0) : products;
  renderAssistantResults(suggestions, terms);
}

// ─── PASO 2: selectores desacoplados por módulo ───────────────────────────────
//
// selectCatalogProduct  → al seleccionar desde Catálogo
//   actualiza: editor de producto, panel stock (shared), re-renderiza tabla catálogo
//   NO toca: tabla ventas, no navega a ventas
//
// selectSalesProduct    → al seleccionar desde Ventas
//   actualiza: panel de venta (selectedProduct), carrito, re-renderiza tabla ventas
//   NO toca: tabla catálogo, no llena el editor de producto
//
// selectStockProduct    → al seleccionar desde cualquier módulo para ir a stock
//   actualiza: stockSelectedProduct con inputs de stock
//   NO carga movimientos automáticamente
//
// selectProduct         → wrapper temporal para compatibilidad con refreshActiveModuleData
//   llama al selector correcto según el módulo activo

function _updateStockPanel(product) {
  if (!stockSelectedProduct) return;
  stockSelectedProduct.className = "selected-box";
  stockSelectedProduct.innerHTML = `
    <strong>${escapeHtml(product.codigo_item)} - ${escapeHtml(product.producto)}</strong>
    <span>${escapeHtml(product.marca)} | ${escapeHtml(product.proveedor)}</span>
  `;
  stockUnitInput.value = Number(product.stock_unidad || 0);
  stockDepositInput.value = Number(product.stock_deposito || 0);
}

function _updateSalePanel(product) {
  if (!selectedProduct) return;
  if (saleMessage) { saleMessage.textContent = ""; saleMessage.className = "message"; }
  selectedProduct.className = "selected-box";
  selectedProduct.innerHTML = `
    <strong>${escapeHtml(product.codigo_item)} - ${escapeHtml(product.producto)}</strong>
    <span>${escapeHtml(product.marca)}</span>
    <p>${escapeHtml(product.descripcion)}</p>
    <div>Mostrador: <strong>${escapeHtml(product.stock_unidad)}</strong> | Depósito: <strong>${escapeHtml(product.stock_deposito)}</strong> | Total: <strong>${escapeHtml(product.stock)}</strong></div>
  `;
}

// Selección desde Catálogo
function selectCatalogProduct(product) {
  state.selected = product;
  fillProductEditor(product);
  _updateStockPanel(product);
  renderProducts(); // re-marca la fila seleccionada en catálogo
  // NO toca salesProducts ni navega a ventas
}

// Selección desde Ventas POS
function selectSalesProduct(product) {
  state.selected = product;
  _updateSalePanel(product);
  _updateStockPanel(product);
  renderSalesProducts(); // re-marca la fila seleccionada en ventas
  // NO toca products (catálogo), NO llena editor de producto
}

// Selección para ir a stock (desde cualquier módulo)
function selectStockProduct(product) {
  state.selected = product;
  _updateStockPanel(product);
  // NO carga movimientos automáticamente
}

// Wrapper de compatibilidad — refreshActiveModuleData lo usa
// después de ventas/stock para actualizar la vista activa
function selectProduct(product) {
  state.selected = product;
  const mod = activeModule();
  if (mod === "venta") {
    _updateSalePanel(product);
    _updateStockPanel(product);
    renderSalesProducts();
  } else if (mod === "actualizar-stock") {
    _updateStockPanel(product);
  } else {
    // catalogo u otro
    fillProductEditor(product);
    _updateStockPanel(product);
    renderProducts();
    if (state.user?.rol === "administrador") {
      loadMovements(product.id);
    }
  }
}

function fillProductEditor(product) {
  if (!productEditorEmpty || !productEditorForm) return;
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

// ─── Venta unitaria (saleForm) ────────────────────────────────────────────────

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
  markProductDataDirty();
  await refreshActiveModuleData(state.selected.id);
  const fresh = [...state.salesProducts].find((p) => p.id === state.selected.id);
  if (fresh) {
    selectSalesProduct(fresh);
  }
}

// ─── Carrito ──────────────────────────────────────────────────────────────────

function addToCart(product) {
  if (!product) { setCartMessage("Seleccioná un producto.", "error"); return; }
  if (Number(product.stock) <= 0) { setCartMessage("Ese producto no tiene stock disponible.", "error"); return; }
  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) { existing.cantidad += 1; } else { state.cart.push({ ...product, cantidad: 1 }); }
  setCartMessage("", "");
  renderCart();
}

function renderCart() {
  const totalItems = state.cart.length;
  const totalUnits = state.cart.reduce((sum, item) => sum + Number(item.cantidad), 0);
  cartSummary.textContent = `🛒 Carrito (${totalItems}) | ${totalUnits} unidades`;
  if (state.cart.length === 0) {
    cartItems.innerHTML = `<div class="empty-state">Seleccioná productos y agregalos al carrito.</div>`;
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
        </article>`,
    )
    .join("");
}

function setCartMessage(text, type) {
  cartMessage.textContent = text;
  cartMessage.className = type ? `message ${type}` : "message";
}

async function confirmCartSale(event) {
  event.preventDefault();
  if (state.cart.length === 0) { setCartMessage("El carrito está vacío.", "error"); return; }
  const response = await fetch("/api/venta-carrito", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cliente: cartCustomer.value.trim(),
      nota: cartNote.value.trim(),
      items: state.cart.map((item) => ({ producto_id: item.id, cantidad: item.cantidad })),
    }),
  });
  const data = await response.json();
  if (!response.ok) { setCartMessage(data.error || "No se pudo confirmar la venta.", "error"); return; }
  setCartMessage(`Venta #${data.venta_id} confirmada: ${data.total_unidades} unidades.`, "ok");
  state.cart = [];
  cartCustomer.value = "";
  cartNote.value = "";
  renderCart();
  markProductDataDirty();
  await refreshActiveModuleData();
  await loadSalesSummary();
}

function setMessage(text, type) {
  saleMessage.textContent = text;
  saleMessage.className = `message ${type}`;
}

// ─── Movimientos ──────────────────────────────────────────────────────────────

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
  const tipoLabel = (t) => {
    const map = {
      "venta": "Venta", "ajuste_stock": "Ajuste de stock",
      "ajuste manual": "Ajuste manual", "compra": "Compra",
      "devolución": "Devolución", "importacion": "Importación Excel",
      "corrección de inventario": "Corrección", "transferencia depósito/mostrador": "Transferencia",
    };
    return map[t] || t.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  };
  const fmtFecha = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("es-AR", { day:"2-digit", month:"2-digit", year:"numeric" })
        + " " + d.toLocaleTimeString("es-AR", { hour:"2-digit", minute:"2-digit" });
    } catch { return iso; }
  };
  const tipoClass = (t) => {
    if (t === "venta") return "mov-badge mov-venta";
    if (t.includes("ajuste") || t.includes("correc")) return "mov-badge mov-ajuste";
    if (t === "compra" || t === "importacion") return "mov-badge mov-compra";
    return "mov-badge mov-otro";
  };
  movements.innerHTML = rows
    .map((m) => `
        <article class="movement-card">
          <div class="mov-header">
            <span class="${tipoClass(m.tipo)}">${escapeHtml(tipoLabel(m.tipo))}</span>
            <span class="mov-fecha">${escapeHtml(fmtFecha(m.fecha))}</span>
          </div>
          <div class="mov-producto">
            <strong>${escapeHtml(m.codigo_item)}</strong>
            <span>${escapeHtml(m.producto)}</span>
          </div>
          <div class="mov-detalle">
            <span class="mov-cantidad ${Number(m.cantidad) < 0 ? "neg" : "pos"}">
              ${Number(m.cantidad) > 0 ? "+" : ""}${escapeHtml(m.cantidad)} un.
            </span>
            <span class="mov-stock">${escapeHtml(m.stock_anterior)} → ${escapeHtml(m.stock_nuevo)}</span>
            ${m.usuario_nombre ? `<span class="mov-user">${escapeHtml(m.usuario_nombre)}</span>` : ""}
          </div>
          ${m.motivo ? `<div class="mov-motivo">${escapeHtml(m.motivo)}</div>` : ""}
          ${m.nota ? `<div class="mov-nota">${escapeHtml(m.nota)}</div>` : ""}
        </article>`)
    .join("");
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

function ensureAllowed(response) {
  if (response.status === 401) { lockApp(); return false; }
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

async function checkSession() {
  const response = await fetch("/api/me");
  if (!response.ok) { lockApp(); return; }
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
    body: JSON.stringify({ usuario: userInput.value.trim(), password: passwordInput.value }),
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

// ─── Dashboard ────────────────────────────────────────────────────────────────

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
  if (rows.length === 0) { container.innerHTML = `<div class="empty-state">Sin datos para mostrar.</div>`; return; }
  container.innerHTML = rows
    .map((row) => {
      if (type === "categoria") return `<article class="metric-row"><div><strong>${escapeHtml(row.nombre)}</strong><span>${escapeHtml(row.productos)} productos</span></div><div class="metric-value">${escapeHtml(row.unidades)} un.</div></article>`;
      if (type === "critico") return `<article class="metric-row"><div><strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong><span>${escapeHtml(row.marca)} | ${escapeHtml(row.ubicacion || "sin ubicacion")}</span></div><div class="metric-value">${escapeHtml(row.stock)} un.</div></article>`;
      return `<article class="metric-row"><div><strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong><span>${escapeHtml(row.marca)} | ${escapeHtml(row.descripcion)}</span></div><div class="metric-value">${escapeHtml(row.unidades)} un.</div></article>`;
    })
    .join("");
}

// ─── Ventas: resumen/ranking ──────────────────────────────────────────────────

async function openSalesDashboard() {
  salesDashboard?.classList.add("is-open");
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

function renderTopSales(rows) {
  if (rows.length === 0) { topSalesList.innerHTML = `<div class="empty-state">Todavía no hay ventas registradas.</div>`; return; }
  topSalesList.innerHTML = rows
    .map((row, i) => `<article class="rank-item"><span class="rank-number">${i + 1}</span><div class="rank-main"><strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong><span class="muted">${escapeHtml(row.marca)} | ${escapeHtml(row.descripcion)}</span></div><span class="rank-count">${escapeHtml(row.unidades)} un.</span></article>`)
    .join("");
}

function renderRecentSales(rows) {
  if (rows.length === 0) { recentSalesList.innerHTML = `<div class="empty-state">Todavía no hay ventas registradas.</div>`; return; }
  recentSalesList.innerHTML = rows
    .map((row) => `<article class="rank-item"><span class="rank-number">S</span><div class="rank-main"><strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong><span class="muted">${escapeHtml(row.fecha)} | ${escapeHtml(row.usuario_nombre || "Sin usuario")}</span></div><span class="rank-count">${escapeHtml(row.cantidad)} un.</span></article>`)
    .join("");
}

// ─── Editor de producto ───────────────────────────────────────────────────────

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
  markProductDataDirty();
  await loadFilters();
  await refreshActiveModuleData(state.selected.id);
  const fresh = state.products.find((p) => p.id === state.selected.id);
  if (fresh) selectCatalogProduct(fresh);
}

// ─── Inventario ───────────────────────────────────────────────────────────────

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
  if (rows.length === 0) { inventoryDepartments.innerHTML = `<div class="empty-state">Sin datos para mostrar.</div>`; return; }
  inventoryDepartments.innerHTML = rows.map((row) => `<article class="metric-row"><div><strong>${escapeHtml(row.departamento)}</strong><span>${escapeHtml(row.productos)} productos</span></div><div class="metric-value">${escapeHtml(row.stock_total)} un.</div></article>`).join("");
}

function renderInventoryCritical(rows) {
  if (rows.length === 0) { inventoryCritical.innerHTML = `<div class="empty-state">Sin productos críticos.</div>`; return; }
  inventoryCritical.innerHTML = rows.map((row) => `<article class="metric-row"><div><strong>${escapeHtml(row.codigo_item)} - ${escapeHtml(row.producto)}</strong><span>${escapeHtml(row.marca)} | ${escapeHtml(row.proveedor)}</span></div><div class="metric-value">${escapeHtml(row.stock_total)} un.</div></article>`).join("");
}

// ─── Stock ────────────────────────────────────────────────────────────────────

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
  markProductDataDirty();
  await refreshActiveModuleData(state.selected.id);
}

// ─── Excel ────────────────────────────────────────────────────────────────────

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
      bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
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
  if (rows.length === 0) { excelPreview.innerHTML = `<div class="empty-state">No hay filas para previsualizar.</div>`; return; }
  excelPreview.innerHTML = `
    <table>
      <thead><tr><th>Código</th><th>Producto</th><th>Marca</th><th>Mostrador</th><th>Depósito</th></tr></thead>
      <tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.codigo_item || row.codigo_barras || row.codigo_articulo)}</td><td>${escapeHtml(row.producto)}</td><td>${escapeHtml(row.marca)}</td><td>${escapeHtml(row.stock_unidad)}</td><td>${escapeHtml(row.stock_deposito)}</td></tr>`).join("")}</tbody>
    </table>
    ${errors.length ? `<div class="message error">${escapeHtml(errors.length)} advertencias encontradas.</div>` : ""}`;
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
  markProductDataDirty();
  await loadFilters();
  await refreshActiveModuleData();
}

// ─── Carga inicial ────────────────────────────────────────────────────────────

async function loadInitialData() {
  await withPageLoader(async () => {
    await loadSummary();
    await loadFilters();
    await loadDashboard();
    renderCart();
  });
}

// ─── Event listeners ──────────────────────────────────────────────────────────

// Catálogo: click en fila
productsBody.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-id]");
  if (!row) return;
  const product = state.products.find((item) => item.id === Number(row.dataset.id));
  if (!product) return;

  const action = event.target.closest("button")?.dataset.action;
  if (action === "sell") {
    // Agregar a venta desde catálogo: solo agrega al carrito y navega
    selectCatalogProduct(product);
    addToCart(product);
    setActiveMenu("venta");
  } else if (action === "stock") {
    selectStockProduct(product);
    setActiveMenu("actualizar-stock");
  } else {
    // "Ver" o click en fila: selecciona en catálogo
    selectCatalogProduct(product);
  }
});

// Ventas: click en fila
salesProductsBody?.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-id]");
  if (!row) return;
  const product = state.salesProducts.find((item) => item.id === Number(row.dataset.id));
  if (!product) return;

  const action = event.target.closest("button")?.dataset.action;
  if (action === "sell") {
    selectSalesProduct(product);
    addToCart(product);
  } else if (action === "stock") {
    selectStockProduct(product);
    setActiveMenu("actualizar-stock");
  } else {
    selectSalesProduct(product);
  }
});

// Catálogo: controles de búsqueda
searchButton.addEventListener("click", searchProducts);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { event.preventDefault(); searchProducts(); }
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
refreshButton.addEventListener("click", async () => {
  await loadSummary();
  await loadFilters();
  await searchProducts();
  if (state.user?.rol === "administrador") await loadMovements(state.selected?.id ?? 0);
});

// Catálogo: asistente
assistantButton?.addEventListener("click", runAssistantSearch);
assistantInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { event.preventDefault(); runAssistantSearch(); }
});
assistantResults?.addEventListener("click", (event) => {
  const card = event.target.closest(".assistant-result[data-id]");
  if (!card) return;
  const product = state.products.find((item) => item.id === Number(card.dataset.id));
  if (!product) return;
  selectCatalogProduct(product);
  const action = event.target.closest("button")?.dataset.assistantAction;
  if (action === "sell") { addToCart(product); setActiveMenu("venta"); }
});

// Ventas: controles de búsqueda
salesSearchButton?.addEventListener("click", searchSalesProducts);
salesSearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { event.preventDefault(); searchSalesProducts(); }
});
salesClearButton?.addEventListener("click", () => {
  salesSearchInput.value = "";
  state.salesProducts = [];
  renderSalesProducts();
  setSalesSearchCounter(0);
  setSalesSearchStatus("Listo para vender.");
});

// Ventas: carrito
saleForm.addEventListener("submit", registerSale);
addSelectedToCart.addEventListener("click", () => addToCart(state.selected));
cartSaleForm.addEventListener("submit", confirmCartSale);
clearCartButton.addEventListener("click", () => {
  state.cart = [];
  renderCart();
  setCartMessage("Carrito vacío.", "ok");
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

// Inventario
inventoryProviderFilter.addEventListener("change", loadInventory);
inventoryCategoryFilter.addEventListener("change", loadInventory);
inventoryStatusFilter.addEventListener("change", loadInventory);
refreshInventoryButton.addEventListener("click", loadInventory);

// Stock
stockAdjustForm.addEventListener("submit", saveStockAdjust);
previewExcelButton.addEventListener("click", () => withPageLoader(previewExcel));
importExcelButton.addEventListener("click", () => withPageLoader(importExcel));
excelFileInput.addEventListener("change", () => {
  importExcelButton.disabled = true;
  excelPreview.innerHTML = "";
  excelMessage.textContent = "";
  excelMessage.className = "message";
});

// Dashboard
refreshDashboardButton.addEventListener("click", () => withPageLoader(loadDashboard));
closeSalesDashboard?.addEventListener("click", () => salesDashboard?.classList.remove("is-open"));
closeProductDashboard?.addEventListener("click", () => productDashboard?.classList.remove("is-open"));

// Editor de producto
productEditorForm.addEventListener("submit", saveProduct);

// Auth
loginForm.addEventListener("submit", login);
logoutButton.addEventListener("click", logout);

// Navegación
menuItems.forEach((item) => {
  item.addEventListener("click", () => setActiveMenu(item.dataset.section || item.dataset.view));
});
menuToggle?.addEventListener("click", () => {
  if (document.body.classList.contains("menu-open")) { closeMobileMenu(); } else { openMobileMenu(); }
});
menuOverlay?.addEventListener("click", closeMobileMenu);
sidebarCollapse?.addEventListener("click", () => {
  const collapsed = !document.body.classList.contains("sidebar-collapsed");
  applySidebarCollapsed(collapsed);
  window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? "1" : "0");
});

// ─── Inicio ───────────────────────────────────────────────────────────────────

async function startApp() {
  try {
    // Registrar todos los módulos pre-construidos en el HTML
    moduleScreens = document.querySelectorAll(".erp-module, .module-screen");
    await checkSession();
  } catch (error) {
    console.error("No se pudo iniciar el sistema.", error);
    lockApp();
  } finally {
    hideBootScreen();
  }
}

startApp();
