/* lakshith-enterprise/js/calculator.js */
/* Bulk order & roll spec calculation logic */

let currentProduct = 'thermal';
let currentVolume = 2500;

/**
 * Sets the active product category (Thermal POS vs Dining Table Roll)
 * and updates specification options dynamically.
 * @param {string} type - 'thermal' or 'dining'
 */
function setProductType(type) {
  currentProduct = type;
  const btnThermal = document.getElementById('btn-thermal');
  const btnDining = document.getElementById('btn-dining');
  const summaryProduct = document.getElementById('summary-product');
  const specSelect = document.getElementById('spec-width');

  if (type === 'thermal') {
    if (btnThermal) btnThermal.className = "p-space-md rounded-lg border-2 border-secondary bg-secondary-fixed/20 text-on-surface font-label-lg text-left transition-all";
    if (btnDining) btnDining.className = "p-space-md rounded-lg border-2 border-outline-variant bg-surface text-on-surface font-label-lg text-left transition-all";
    if (summaryProduct) summaryProduct.innerText = "Thermal POS Roll";
    if (specSelect) {
      specSelect.innerHTML = `
        <option value="80x80">80mm x 80mm Standard POS (Box of 50)</option>
        <option value="57x40">57mm x 40mm Mobile POS (Box of 100)</option>
        <option value="80x60">80mm x 60mm Medium Roll (Box of 50)</option>
        <option value="custom">Custom Industrial Slitting (Bulk)</option>
      `;
    }
  } else {
    if (btnDining) btnDining.className = "p-space-md rounded-lg border-2 border-secondary bg-secondary-fixed/20 text-on-surface font-label-lg text-left transition-all";
    if (btnThermal) btnThermal.className = "p-space-md rounded-lg border-2 border-outline-variant bg-surface text-on-surface font-label-lg text-left transition-all";
    if (summaryProduct) summaryProduct.innerText = "Dining Table Paper Roll";
    if (specSelect) {
      specSelect.innerHTML = `
        <option value="90cm">90cm Width Virgin Pulp (Roll of 100m)</option>
        <option value="100cm">100cm Width Premium White (Roll of 100m)</option>
        <option value="120cm">120cm Width Banquet Grade (Roll of 100m)</option>
        <option value="custom">Custom Width Catering Roll</option>
      `;
    }
  }
  calculatePrice();
}

/**
 * Updates the current volume count from range slider input.
 * @param {string|number} val - Quantity requested
 */
function updateVolume(val) {
  currentVolume = parseInt(val, 10);
  const volumeDisplay = document.getElementById('volume-display');
  if (volumeDisplay) {
    volumeDisplay.innerText = currentVolume.toLocaleString() + ' Units';
  }
  calculatePrice();
}

/**
 * Computes pricing tier discounts and updates summary breakdown.
 */
function calculatePrice() {
  const specSelect = document.getElementById('spec-width');
  if (!specSelect) return;
  
  const spec = specSelect.value;
  let baseRate = currentProduct === 'thermal' ? 45 : 120;
  
  // Volume discount tier calculation
  let discount = 1;
  if (currentVolume > 2000) discount = 0.95;
  if (currentVolume > 5000) discount = 0.90;
  if (currentVolume > 8000) discount = 0.85;

  let finalRate = Math.round(baseRate * discount * 100) / 100;
  let totalAmount = Math.round(finalRate * currentVolume);

  let tierName = "Standard Wholesale";
  if (currentVolume > 8000) tierName = "Enterprise Bulk Tier (15% OFF)";
  else if (currentVolume > 5000) tierName = "Tier 2 Volume (10% OFF)";
  else if (currentVolume > 2000) tierName = "Tier 1 Volume (5% OFF)";

  const summarySpec = document.getElementById('summary-spec');
  const summaryRate = document.getElementById('summary-rate');
  const summaryTier = document.getElementById('summary-tier');
  const summaryTotal = document.getElementById('summary-total');

  if (summarySpec) summarySpec.innerText = spec;
  if (summaryRate) summaryRate.innerText = '₹' + finalRate.toFixed(2) + ' / unit';
  if (summaryTier) summaryTier.innerText = tierName;
  if (summaryTotal) summaryTotal.innerText = '₹' + totalAmount.toLocaleString('en-IN');
}
