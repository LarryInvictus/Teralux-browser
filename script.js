const addressForm = document.getElementById("addressForm");
const addressInput = document.getElementById("addressInput");
const browserFrame = document.getElementById("browserFrame");

const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const homeBtn = document.getElementById("homeBtn");
const settingsBtn = document.getElementById("settingsBtn");

// Simple history stack
let historyStack = [];
let historyIndex = -1;

// Set your Teralux "home" page (could be a local HTML or any URL)
const HOME_URL = "about:blank";

function loadUrl(raw) {
  let url = raw.trim();
  if (!url) return;

  // If it looks like a URL without protocol, add https://
  if (!/^https?:\/\//i.test(url) && /^[\w.-]+\.[a-z]{2,}$/i.test(url)) {
    url = "https://" + url;
  }

  // If it's not a URL, treat as search using a neutral engine or your own later
  if (!/^https?:\/\//i.test(url)) {
    // For now, just use a generic search engine URL pattern
    url = "https://duckduckgo.com/?q=" + encodeURIComponent(raw);
  }

  browserFrame.src = url;

  // Update history
  if (historyIndex === -1 || historyStack[historyIndex] !== url) {
    historyStack = historyStack.slice(0, historyIndex + 1);
    historyStack.push(url);
    historyIndex = historyStack.length - 1;
  }
}

addressForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loadUrl(addressInput.value);
});

backBtn.addEventListener("click", () => {
  if (historyIndex > 0) {
    historyIndex--;
    const url = historyStack[historyIndex];
    browserFrame.src = url;
    addressInput.value = url;
  }
});

forwardBtn.addEventListener("click", () => {
  if (historyIndex < historyStack.length - 1) {
    historyIndex++;
    const url = historyStack[historyIndex];
    browserFrame.src = url;
    addressInput.value = url;
  }
});

homeBtn.addEventListener("click", () => {
  browserFrame.src = HOME_URL;
  addressInput.value = "";
  historyStack = [HOME_URL];
  historyIndex = 0;
});

settingsBtn.addEventListener("click", () => {
  alert(
    "Teralux Settings\n\nYou can extend this to real settings (default home, theme, search engine, etc.)."
  );
});

// Initialize home
browserFrame.src = HOME_URL;
