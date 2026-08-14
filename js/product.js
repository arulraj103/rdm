// ============================================================
// product.js — Logic for product.html
// Handles: product lookup, gallery, size/color selection,
// WhatsApp enquiry, related products, and all error states.
// ============================================================

import {
  getCategoryById,
  getProductById,
  getRelatedProducts,
  STORE_NAME,
  WHATSAPP_NUMBER,
  STORE_PHONE
} from "./data.js";

// ── State ─────────────────────────────────────────────────────
let selectedSize  = null;
let selectedColor = null;
let currentProduct = null;

// ── Entry point ───────────────────────────────────────────────
function init() {
  showLoading(true);

  const productId = getProductIdFromURL();

  if (!productId) {
    showProductError("No product ID was provided.");
    showLoading(false);
    return;
  }

  const product = getProductById(productId);

  if (!product) {
    showProductError(`We couldn't find a product with ID "${productId}".`);
    showLoading(false);
    return;
  }

  currentProduct = product;
  renderProduct(product);
  showLoading(false);
}

// ── URL helper ────────────────────────────────────────────────

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const raw    = params.get("id");
  return raw ? raw.trim() : null;
}

// ── Loading / error states ────────────────────────────────────

function showLoading(visible) {
  const node = document.getElementById("loading-state");
  if (!node) return;
  node.style.display = visible ? "block" : "none";
}

function showProductContent(visible) {
  const node = document.getElementById("product-content");
  if (!node) return;
  node.style.display = visible ? "" : "none";
}

function showProductError(detail = "") {
  showProductContent(false);

  const errEl = document.getElementById("product-error");
  if (!errEl) return;

  errEl.style.display = "";

  const title = errEl.querySelector(".error-title");
  if (title) title.textContent = "Product Not Found";

  const msg = errEl.querySelector(".error-message");
  if (msg) msg.textContent = detail || "We couldn't find the product you're looking for.";

  const link = errEl.querySelector("a.error-link, a.btn");
  if (link) {
    link.href        = "categories.html";
    link.textContent = "Browse Categories";
  }
}

// ── Main product renderer ─────────────────────────────────────

function renderProduct(product) {
  // Page title
  document.title = `${product.name} | ${STORE_NAME}`;

  // Back-to-category link
  renderBackLink(product);

  // Breadcrumb
  updateText("breadcrumb-category", getCategoryName(product.category));
  updateText("breadcrumb-product",  product.name);

  // Core fields
  updateText("product-name",        product.name);
  updateText("product-price",       `₹${product.price.toLocaleString("en-IN")}`);
  updateText("product-category",    getCategoryName(product.category));
  updateText("product-description", product.description  || "");
  updateText("product-material",    product.material     || "—");
  updateText("product-fit",         product.fit          || "—");
  updateText("product-gender",      product.gender       || "—");
  updateText("product-occasion",    product.occasion     || "—");

  // Availability
  renderAvailability(product.availability);

  // Image gallery
  renderGallery(product.images);

  // Size selection
  renderSizes(product.sizes);

  // Color selection
  renderColors(product.colors);

  // Action buttons
  renderActions(product);

  // Related products
  renderRelatedProducts(product);

  // Show content
  showProductContent(true);
}

// ── Back link ─────────────────────────────────────────────────

function renderBackLink(product) {
  const link = document.getElementById("back-to-category");
  if (!link) return;

  const catName = getCategoryName(product.category);
  link.href        = `categories.html?category=${encodeURIComponent(product.category)}`;
  link.textContent = `← Back to ${catName}`;
}

// ── Availability ──────────────────────────────────────────────

function renderAvailability(available) {
  const node = document.getElementById("product-availability");
  if (!node) return;

  if (available) {
    node.textContent  = "In Stock";
    node.className    = "availability availability--in-stock";
    node.setAttribute("aria-label", "This product is in stock");
  } else {
    node.textContent  = "Out of Stock";
    node.className    = "availability availability--out-of-stock";
    node.setAttribute("aria-label", "This product is currently out of stock");
  }
}

// ── Image gallery ─────────────────────────────────────────────

function renderGallery(images) {
  const PLACEHOLDER = "assets/images/placeholder-product.jpg";

  const mainImg  = document.getElementById("gallery-main");
  const thumbWrap = document.getElementById("gallery-thumbnails");

  const safeImages = (Array.isArray(images) && images.length > 0)
    ? images
    : [PLACEHOLDER];

  // Set main image
  if (mainImg) {
    mainImg.src   = safeImages[0];
    mainImg.alt   = currentProduct?.name ?? "Product image";
    mainImg.onerror = () => { mainImg.src = PLACEHOLDER; };
  }

  if (!thumbWrap) return;

  thumbWrap.innerHTML = "";

  safeImages.forEach((src, index) => {
    const thumb = document.createElement("button");
    thumb.type      = "button";
    thumb.className = `gallery-thumb${index === 0 ? " gallery-thumb--active" : ""}`;
    thumb.setAttribute("aria-label", `View image ${index + 1}`);

    const img    = document.createElement("img");
    img.src      = src;
    img.alt      = `Thumbnail ${index + 1}`;
    img.loading  = "lazy";
    img.onerror  = () => { img.src = PLACEHOLDER; };

    thumb.appendChild(img);
    thumbWrap.appendChild(thumb);

    thumb.addEventListener("click", () => {
      if (mainImg) {
        mainImg.src = src;
        mainImg.alt = `Product image ${index + 1}`;
      }

      // Highlight active thumbnail
      thumbWrap.querySelectorAll(".gallery-thumb").forEach((t) =>
        t.classList.remove("gallery-thumb--active")
      );
      thumb.classList.add("gallery-thumb--active");
    });
  });
}

// ── Size selection ────────────────────────────────────────────

function renderSizes(sizes) {
  const section = document.getElementById("size-section");
  const group   = document.getElementById("size-options");

  const hasSizes = Array.isArray(sizes) && sizes.length > 0;

  if (!hasSizes) {
    if (section) section.style.display = "none";
    return;
  }

  if (section) section.style.display = "";
  if (!group)  return;

  group.innerHTML = "";

  sizes.forEach((size) => {
    const btn = document.createElement("button");
    btn.type      = "button";
    btn.className = "size-btn";
    btn.textContent = size;
    btn.setAttribute("aria-label", `Select size ${size}`);
    btn.setAttribute("aria-pressed", "false");

    btn.addEventListener("click", () => {
      selectedSize = size;

      group.querySelectorAll(".size-btn").forEach((b) => {
        b.classList.remove("size-btn--active");
        b.setAttribute("aria-pressed", "false");
      });

      btn.classList.add("size-btn--active");
      btn.setAttribute("aria-pressed", "true");

      updateSelectedLabel("selected-size", size);
      updateWhatsAppLink();
    });

    group.appendChild(btn);
  });
}

// ── Color selection ───────────────────────────────────────────

function renderColors(colors) {
  const section = document.getElementById("color-section");
  const group   = document.getElementById("color-options");

  const hasColors = Array.isArray(colors) && colors.length > 0;

  if (!hasColors) {
    if (section) section.style.display = "none";
    return;
  }

  if (section) section.style.display = "";
  if (!group)  return;

  group.innerHTML = "";

  colors.forEach((color) => {
    const btn = document.createElement("button");
    btn.type      = "button";
    btn.className = "color-btn";
    btn.textContent = color;
    btn.setAttribute("aria-label", `Select color ${color}`);
    btn.setAttribute("aria-pressed", "false");

    btn.addEventListener("click", () => {
      selectedColor = color;

      group.querySelectorAll(".color-btn").forEach((b) => {
        b.classList.remove("color-btn--active");
        b.setAttribute("aria-pressed", "false");
      });

      btn.classList.add("color-btn--active");
      btn.setAttribute("aria-pressed", "true");

      updateSelectedLabel("selected-color", color);
      updateWhatsAppLink();
    });

    group.appendChild(btn);
  });
}

// ── Action buttons ────────────────────────────────────────────

function renderActions(product) {
  renderWhatsAppButton(product);
  renderCallButton();
}

function renderWhatsAppButton(product) {
  const btn = document.getElementById("whatsapp-enquiry");
  if (!btn) return;

  if (!product.availability) {
    btn.setAttribute("disabled", "true");
    btn.setAttribute("aria-disabled", "true");
    btn.classList.add("btn--disabled");
    return;
  }

  btn.removeAttribute("disabled");
  btn.removeAttribute("aria-disabled");
  btn.classList.remove("btn--disabled");

  // Build link immediately (size/color not yet chosen)
  updateWhatsAppLink();

  // Keep the link updated whenever user taps the button
  // (link is updated reactively by size/color handlers too)
}

function updateWhatsAppLink() {
  const btn = document.getElementById("whatsapp-enquiry");
  if (!btn || !currentProduct) return;

  const link = createWhatsAppLink(currentProduct, selectedSize, selectedColor);
  btn.href = link;
  btn.setAttribute("target", "_blank");
  btn.setAttribute("rel", "noopener noreferrer");
}

function renderCallButton() {
  const btn = document.getElementById("call-store");
  if (!btn) return;
  btn.href = `tel:${STORE_PHONE}`;
}

// ── WhatsApp link builder ─────────────────────────────────────

/**
 * Builds a wa.me URL with a pre-filled enquiry message.
 * @param {object} product
 * @param {string|null} size
 * @param {string|null} color
 * @returns {string}
 */
function createWhatsAppLink(product, size, color) {
  const priceStr = `₹${product.price.toLocaleString("en-IN")}`;
  const sizeStr  = size  || "Not specified";
  const colorStr = color || "Not specified";

  const message = [
    `Hi, I'm interested in *${product.name}* priced at ${priceStr}.`,
    `Size: ${sizeStr}`,
    `Color: ${colorStr}`,
    `Is this product available?`
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ── Related products ──────────────────────────────────────────

function renderRelatedProducts(product) {
  const section  = document.getElementById("related-section");
  const grid     = document.getElementById("related-products");

  const related = getRelatedProducts(product.category, product.id, 4);

  if (related.length === 0) {
    if (section) section.style.display = "none";
    return;
  }

  if (section) section.style.display = "";
  if (!grid)   return;

  grid.innerHTML = "";

  related.forEach((rel) => {
    const card = createRelatedCard(rel);
    grid.appendChild(card);
  });
}

function createRelatedCard(product) {
  const PLACEHOLDER = "assets/images/placeholder-product.jpg";
  const image       = (product.images && product.images[0]) || PLACEHOLDER;

  const article     = document.createElement("article");
  article.className = "product-card product-card--related";

  article.innerHTML = `
    <a href="product.html?id=${encodeURIComponent(product.id)}" class="product-card__link-wrap" aria-label="View ${sanitise(product.name)}">
      <div class="product-card__img-wrap">
        <img
          src="${sanitise(image)}"
          alt="${sanitise(product.name)}"
          class="product-card__img"
          loading="lazy"
          onerror="this.src='${PLACEHOLDER}'"
        />
      </div>
      <div class="product-card__body">
        <h4 class="product-card__name">${sanitise(product.name)}</h4>
        <span class="product-card__price">₹${product.price.toLocaleString("en-IN")}</span>
      </div>
    </a>
  `;

  return article;
}

// ── Utilities ─────────────────────────────────────────────────

function getCategoryName(categoryId) {
  const cat = getCategoryById(categoryId);
  return cat ? cat.name : capitalise(categoryId || "");
}

function updateText(id, text) {
  const node = document.getElementById(id);
  if (node) node.textContent = text ?? "";
}

function updateSelectedLabel(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value ?? "";
}

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
