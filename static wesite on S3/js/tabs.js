/* lakshith-enterprise/js/tabs.js */
/* Industry/application tab-switching behavior */

/**
 * Switches the active industry section panel in the sector showcases.
 * @param {string} tabId - Unique identifier of the sector tab ('retail', 'restaurants', 'hotels', 'logistics')
 */
function switchTab(tabId) {
  const tabs = ['retail', 'restaurants', 'hotels', 'logistics'];
  tabs.forEach(t => {
    const btn = document.getElementById('tab-' + t);
    const panel = document.getElementById('panel-' + t);
    if (t === tabId) {
      if (btn) btn.className = "industry-tab px-space-lg py-space-sm rounded-lg text-label-lg font-label-lg bg-primary text-on-primary transition-all";
      if (panel) panel.classList.remove('hidden');
    } else {
      if (btn) btn.className = "industry-tab px-space-lg py-space-sm rounded-lg text-label-lg font-label-lg text-on-surface-variant hover:text-on-surface transition-all";
      if (panel) panel.classList.add('hidden');
    }
  });
}
