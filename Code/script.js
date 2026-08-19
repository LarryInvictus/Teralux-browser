// Basic Teralux "browser" behavior using DuckDuckGo

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const luckyBtn = document.getElementById("luckyBtn");
const settingsBtn = document.getElementById("settingsBtn");

// Normal search: open DuckDuckGo results in same tab
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if (!q) return;
  const url = "https://duckduckgo.com/?q=" + encodeURIComponent(q);
  window.location.href = url;
});

// "I'm Feeling Lucky": use DuckDuckGo's bang to try direct result
luckyBtn.addEventListener("click", () => {
  const q = searchInput.value.trim();
  if (!q) return;
  // DuckDuckGo doesn't have a perfect "lucky" clone, but we can use !ducky
  const url =
    "https://duckduckgo.com/?q=" + encodeURIComponent("!ducky " + q);
  window.location.href = url;
});

// Simple settings popup (placeholder)
settingsBtn.addEventListener("click", () => {
  alert(
    "Teralux Settings\n\nThis is a placeholder.\nYou can wire this to real settings later."
  );
});
