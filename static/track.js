const BACKEND_ENDPOINT = "https://api.abotify.com/conversion_events";

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
  let cname = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

// Helper function: Generate a random Cookie ID
function generateCookieId() {
  return "cid_" + Math.random().toString(36).substr(2, 9);
}

// Initialize the script
function initTrackingScript() {
  console.log("Tracking script initialized");
  let abotifyId = getQueryParam("abotify_id") || getCookie("abotify_id");
  let userId = getCookie("abotify_u");

  // If the Cookie doesn't exist, generate a new cookie_id
  if (!userId) {
    userId = generateCookieId();
    setCookie("abotify_u", userId, 365);
  }

  if (abotifyId) {
    const originAbotifyId = getCookie("abotify_id");
    if (originAbotifyId && !originAbotifyId.includes(abotifyId)) {
      abotifyId = originAbotifyId + "," + abotifyId + "";
    }
    setCookie("abotify_id", abotifyId, 365);
  }

  window.abotify = {
    track: function (conversionEvent) {
      conversionEvent.link_id = abotifyId; // Get from URL parameter
      conversionEvent.user_id = userId; // Get from Cookie
      conversionEvent.url = window.location.href;

      // Send conversion data to backend
      return fetch(BACKEND_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conversionEvent),
      }).then((response) => response.json());
    },
  };

  window.abotify.track({
    name: "page_view",
    detail: "Page view event",
  });
}

initTrackingScript();
