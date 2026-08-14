// ============================================================
// categories.js — Logic for categories.html
// Handles: URL param reading, category lookup, product
// filtering, sorting, rendering, and all page states.
// ============================================================

import {
  categories,
  products,
  getCategoryById,
  getProductsByCategory,
  STORE_NAME
} from "./data.js";

// ── DOM references ────────────────────────────────────────────
// Adjust these selector strings if your HTML uses different IDs.
const el = {
  categoryTitle: () => document.getElementById("hero-title-text"),
  categoryDesc: () => document.getElementById("hero-desc"),
  categoryPrice: () => document.getElementById("cat-price-range"),
  breadcrumbCat: () => document.getElementById("breadcrumb-category"),

  productCount: () => document.getElementById("toolbar-count"),
  productsGrid: () => document.getElementById("products-grid"),

  loadingState: () => document.getElementById("products-loading"),
  emptyState: () => document.getElementById("state-empty"),
  categoryError: () => document.getElementById("state-not-found"),

  allCategories: () => document.getElementById("all-categories-grid"),

  sortSelect: () => document.getElementById("sort-select")
};

// ── State ─────────────────────────────────────────────────────
let currentCategoryId = null;
let filteredProducts   = [];

// ── Entry point ───────────────────────────────────────────────
function init() {
  showLoading(true);

  currentCategoryId = getCategoryFromURL();

  if (currentCategoryId === null) {
    // No category param — show all categories overview
    renderAllCategoriesPage();
  } else {
    const category = getCategoryById(currentCategoryId);
    if (!category) {
      showInvalidCategory();
    } else {
      renderCategoryPage(category);
    }
  }

  showLoading(false);
}

// ── URL helpers ───────────────────────────────────────────────

/**
 * Reads and normalises the ?category= URL parameter.
 * Returns null when the parameter is absent.
 */
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  const raw    = params.get("category");
  if (raw === null) return null;
  return raw.trim().toLowerCase();
}

// ── Page state helpers ────────────────────────────────────────

function showLoading(visible) {
  const node = el.loadingState();
  if (!node) return;
  node.style.display = visible ? "block" : "none";
}

function showEmptyState(visible) {
  const node = el.emptyState();
  if (!node) return;
  node.style.display = visible ? "block" : "none";
}

function showError(visible) {
  const node = el.categoryError();
  if (!node) return;
  node.style.display = visible ? "block" : "none";
}

function showGrid(visible) {
  const node = el.productsGrid();
  if (!node) return;
  node.style.display = visible ? "" : "none";
}

function showCategorySection(visible) {
  const node = el.categorySection?.() ?? el.productsGrid?.();
  if (!node) return;
  node.closest?.("section")?.style && (node.closest("section").style.display = visible ? "" : "none");
}

function showAllCategoriesSection(visible) {
  // Toggle the outer wrapper (#state-all-categories), not the inner grid
  const outer = document.getElementById("state-all-categories");
  if (outer) outer.style.display = visible ? "" : "none";
}

// ── All-categories view ───────────────────────────────────────

function renderAllCategoriesPage() {
  document.title = `All Categories | ${STORE_NAME}`;

  updateText("hero-title-text",       "All Categories");
  updateText("hero-desc", "Browse our full range of clothing and accessories.");
  updateText("breadcrumb-category",  "All Categories");

  const priceEl = el.categoryPrice();
  if (priceEl) priceEl.style.display = "none";

  const countEl = el.productCount();
  if (countEl) countEl.style.display = "none";

  const sortEl = el.sortSelect();
  if (sortEl) sortEl.style.display = "none";

  showError(false);
  showEmptyState(false);
  showGrid(false);

  renderCategoryCards();
}

function renderCategoryCards() {
  const container = el.allCategories();
  if (!container) return;

  container.innerHTML = "";
  showAllCategoriesSection(true);

  categories.forEach((cat) => {
    const card = document.createElement("a");
    card.href      = `categories.html?category=${encodeURIComponent(cat.id)}`;
    card.className = "category-card";

    card.innerHTML = `
      <div class="category-card__img-wrap">
        <img
          src="${sanitise(cat.image)}"
          alt="${sanitise(cat.name)}"
          class="category-card__img"
          loading="lazy"
          onerror="this.src='assets/images/placeholder-category.jpg'"
        />
      </div>
      <div class="category-card__body">
        <h3 class="category-card__name">${sanitise(cat.name)}</h3>
        <p class="category-card__desc">${sanitise(cat.description)}</p>
        <span class="category-card__price">${sanitise(cat.priceRange)}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// ── Invalid category view ─────────────────────────────────────

function showInvalidCategory() {
  document.title = `Category Not Found | ${STORE_NAME}`;

  showError(true);
  showEmptyState(false);
  showGrid(false);
  showAllCategoriesSection(false);

  // Populate the error block if it contains placeholder elements
  const errTitle = document.querySelector("#category-error .error-title");
  if (errTitle) errTitle.textContent = "Category Not Found";

  const errMsg = document.querySelector("#category-error .error-message");
  if (errMsg) errMsg.textContent = "The category you're looking for doesn't exist.";

  // Ensure the "Browse All" link targets categories.html
  const errLink = document.querySelector("#category-error a.error-link, #category-error a.btn");
  if (errLink) {
    errLink.href        = "categories.html";
    errLink.textContent = "Browse All Categories";
  }
}

// ── Category page ─────────────────────────────────────────────

function renderCategoryPage(category) {
  document.title = `${category.name} | ${STORE_NAME}`;

  updateText("hero-title-text",       category.name);
  updateText("hero-desc", category.description);
  updateText("breadcrumb-category",  category.name);
  updateText("cat-price-range",       category.priceRange);

  showAllCategoriesSection(false);
  showError(false);

  filteredProducts = getProductsByCategory(category.id);

  if (filteredProducts.length === 0) {
    showEmptyState(true);
    showGrid(false);
    updateProductCount(0);
    return;
  }

  showEmptyState(false);
  showGrid(true);
  updateProductCount(filteredProducts.length);
  renderProductCards(filteredProducts);
  attachSortListener();
}

// ── Product count ─────────────────────────────────────────────

function updateProductCount(count) {
  const node = el.productCount();
  if (!node) return;
  node.textContent = `${count} ${count === 1 ? "Product" : "Products"}`;
  node.style.display = "";
}

// ── Sorting ───────────────────────────────────────────────────

function attachSortListener() {
  const select = el.sortSelect();
  if (!select) return;

  select.style.display = "";
  select.addEventListener("change", () => {
    const sorted = sortProducts(filteredProducts, select.value);
    renderProductCards(sorted);
  });
}

/**
 * Returns a new sorted copy of the products array.
 * Never mutates the original.
 * @param {Array} list
 * @param {string} method  "featured" | "price-low" | "price-high" | "name"
 * @returns {Array}
 */
function sortProducts(list, method) {
  const copy = [...list];

  switch (method) {
    case "price-low":
      return copy.sort((a, b) => a.price - b.price);

    case "price-high":
      return copy.sort((a, b) => b.price - a.price);

    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));

    case "featured":
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

// ── Product card rendering ────────────────────────────────────

function renderProductCards(list) {
  const grid = el.productsGrid();
  if (!grid) return;

  grid.innerHTML = "";

  list.forEach((product) => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const image      = (product.images && product.images[0]) || "assets/images/placeholder-product.jpg";
  const priceFormatted = `₹${product.price.toLocaleString("en-IN")}`;
  const stockBadge = product.availability
    ? `<span class="badge badge--in-stock">In Stock</span>`
    : `<span class="badge badge--out-of-stock">Out of Stock</span>`;

  // Resolve category display name
  const catObj = getCategoryById(product.category);
  const catName = catObj ? catObj.name : capitalise(product.category);

  article.innerHTML = `
    <div class="product-card__img-wrap">
      <img
        src="${sanitise(image)}"
        alt="${sanitise(product.name)}"
        class="product-card__img"
        loading="lazy"
        onerror="this.src='assets/images/placeholder-product.jpg'"
      />
      ${product.featured ? `<span class="badge badge--featured">Featured</span>` : ""}
    </div>
    <div class="product-card__body">
      <p class="product-card__category">${sanitise(catName)}</p>
      <h3 class="product-card__name">${sanitise(product.name)}</h3>
      <div class="product-card__footer">
        <span class="product-card__price">${priceFormatted}</span>
        ${stockBadge}
      </div>
      <a
        href="product.html?id=${encodeURIComponent(product.id)}"
        class="product-card__link btn btn--primary"
        aria-label="View details for ${sanitise(product.name)}"
      >View Details</a>
    </div>
  `;

  return article;
}

// ── Utilities ─────────────────────────────────────────────────

/**
 * Safely set textContent of an element by ID.
 */
function updateText(id, text) {
  const node = document.getElementById(id);
  if (node) node.textContent = text ?? "";
}

/**
 * Minimal HTML-entity escape for inserting dynamic strings into innerHTML.
 * Static product data is trusted, but this guards against accidental breakage.
 */
function sanitise(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function capitalise(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Bootstrap ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);
