/* lakshith-enterprise/js/form.js */
/* Lead inquiry validation & WhatsApp redirect handler */

/**
 * Encodes calculated spec summary and opens direct WhatsApp chat.
 */
function sendToWhatsApp() {
  const productEl = document.getElementById('summary-product');
  const specEl = document.getElementById('summary-spec');
  const totalEl = document.getElementById('summary-total');

  const product = productEl ? productEl.innerText : 'Thermal Roll';
  const spec = specEl ? specEl.innerText : 'Standard';
  const total = totalEl ? totalEl.innerText : '0';
  const volume = typeof currentVolume !== 'undefined' ? currentVolume : 2500;

  const text = encodeURIComponent(`Hello Lakshith Enterprise, I would like to order:\nProduct: ${product}\nSpec: ${spec}\nVolume: ${volume} units\nEstimated Total: ${total}`);
  window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
}

/**
 * Handles B2B Lead Inquiry Form submission.
 * @param {Event} e - Form submit event
 */
function handleInquirySubmit(e) {
  e.preventDefault();
  const successEl = document.getElementById('form-success');
  const formEl = document.getElementById('b2b-form');
  if (successEl) successEl.classList.remove('hidden');
  setTimeout(() => {
    if (formEl) formEl.reset();
  }, 1500);
}

/**
 * Handles Sample Request Form submission inside modal.
 * @param {Event} e - Form submit event
 */
function handleSampleSubmit(e) {
  e.preventDefault();
  const sampleSuccess = document.getElementById('sample-success');
  if (sampleSuccess) sampleSuccess.classList.remove('hidden');
  setTimeout(() => {
    if (typeof closeQuoteModal === 'function') {
      closeQuoteModal();
    }
    if (sampleSuccess) sampleSuccess.classList.add('hidden');
  }, 2000);
}
