/**
 * System Information Checker Dashboard
 * Get the Current Page Element for System Information Checker
 * Originally created on 2007-10-18
 * Recreated and Revision on 2025-02-14
 * Last Updated on 2025-12-13
 * Created by: Dona Gibbons
 */
var getCurrentPage = document.getElementsByTagName("title")[0].innerHTML;

/**
 * Gets the system information including browser and OS details.
 * @returns {Object} An object containing browser and OS information.
 */
function getSystemInfo() {
  var ua = navigator.userAgent,
    browserInfo = {},
    osInfo = {};

  console.log("User Agent: " + ua);

  // Define a list of browser patterns to check
  var browserPatterns = [
    { name: "cldb", pattern: /(cldb)\/?\s*((\d+\.\d+\.\d+\.\d+))/i },
    { name: "cmac", pattern: /(cmac)\/?\s*((\d+\.\d+\.\d+\.\d+))/i },
    { name: "guardianbrowser", pattern: /(guardianbrowser)\/?\s*((\d+\.\d+\.\d+\.\d+)|(\d+\.\d+)|(\d+\.\d+\.\d+))/i },
    { name: "Edge", pattern: /(Edg|Edge)\/?\s*((\d+\.\d+\.\d+\.\d+))/i },
    { name: "Chrome", pattern: /(chrome|crios)\/?\s*((\d+\.\d+\.\d+\.\d+))/i },
    { name: "Safari", pattern: /version\/((\d+\.\d+\.\d+\.\d+)).*safari/i },
    { name: "Firefox", pattern: /(firefox)\/?\s*((\d+\.\d+\.\d+\.\d+))/i }
  ];

  // Check for browser match
  for (var i = 0; i < browserPatterns.length; i++) {
    var match = ua.match(browserPatterns[i].pattern);
    if (match) {
      browserInfo.name = browserPatterns[i].name;
      browserInfo.version = match[2] || "undefined";
      break;
    }
  }

  // If no browser match is found
  if (!browserInfo.name) {
    browserInfo.name = "undefined";
    browserInfo.version = "undefined";
  }

  // Get OS information
  var osMatch = ua.match(/(Windows NT|Mac OS X|iPhone OS)\s*((\d+\.\d+)|(\d+\_\d+)|(\d+\_\d+\_\d+))/i) || [];
  if (osMatch.length) {
    osInfo.name = osMatch[1];
    osInfo.version = osMatch[2].replace(/_/g, ".") || "undefined";
  } else {
    osInfo.name = "undefined";
    osInfo.version = "undefined";
  }

  return {
    browser: browserInfo,
    os: osInfo
  };
}

/**
 * Compares dotted version strings numerically instead of lexicographically.
 * @param {string} currentVersion - The detected version string.
 * @param {string} minimumVersion - The minimum supported version string.
 * @returns {boolean} True when currentVersion is greater than or equal to minimumVersion.
 */
function isVersionAtLeast(currentVersion, minimumVersion) {
  var currentParts = String(currentVersion || "0").split(".");
  var minimumParts = String(minimumVersion || "0").split(".");
  var maxLength = Math.max(currentParts.length, minimumParts.length);
  var i;

  for (i = 0; i < maxLength; i++) {
    var currentPart = parseInt(currentParts[i] || "0", 10);
    var minimumPart = parseInt(minimumParts[i] || "0", 10);
    if (isNaN(currentPart)) { currentPart = 0; }
    if (isNaN(minimumPart)) { minimumPart = 0; }

    if (currentPart > minimumPart) {
      return true;
    }

    if (currentPart < minimumPart) {
      return false;
    }
  }

  return true;
}

// Combined icons object
var icons = {
  safari: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/safari/safari.svg",
  chrome: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/chrome/chrome.svg",
  firefox: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/firefox/firefox.svg",
  ie: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/archive/internet-explorer_9-11/internet-explorer_9-11.svg",
  edge: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/edge/edge.svg",
  opera: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/opera/opera.svg",
  cldb: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/chrome/chrome.svg",
  cmac: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/chrome/chrome.svg",
  guardianbrowser: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/chrome/chrome.svg",
  undefined: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/webkit/webkit.svg",
  "windowsnt10.0": "images/operating_systems/Windows_10.png",
  "windowsnt6.3": "images/operating_systems/Windows_8.png",
  "windowsnt6.1": "images/operating_systems/Windows_7.png",
  // Mac OS X 10.5 - 10.9
  "macosx10.5": "images/operating_systems/OS_X_Leopard.png",
  "macosx10.6": "images/operating_systems/OS_X_Snow_Leopard.png",
  "macosx10.7": "images/operating_systems/OS_X_Lion.png",
  "macosx10.8": "images/operating_systems/OS_X_Mountain_Lion.png",
  "macosx10.9": "images/operating_systems/OS_X_Mavericks.png",
  // OS X 10.10 - 10.11
  "macosx10.10": "images/operating_systems/OS_X_Yosemite.png",
  "macosx10.10.5": "images/operating_systems/OS_X_Yosemite.png",
  "macosx10.11": "images/operating_systems/OS_X_EL_Capitan.png",
  "macosx10.11.6": "images/operating_systems/OS_X_EL_Capitan.png",
  // macOS 10.12 - 10.14
  "macosx10.12": "images/operating_systems/OS_X_Sierra.png",
  "macosx10.12.6": "images/operating_systems/OS_X_Sierra.png",
  "macosx10.13": "images/operating_systems/OS_X_High_Sierra.png",
  "macosx10.13.6": "images/operating_systems/OS_X_High_Sierra.png",
  "macosx10.14": "images/operating_systems/OS_X_Mojave.png",
  "macosx10.14.0": "images/operating_systems/OS_X_Mojave.png",
  // macOS 10.15
  "macosx10.15": "images/operating_systems/macOS_Catalina.png",
  "macosx10.15.7": "images/operating_systems/macOS_Catalina.png",
  // macOS 11 - 15
  "macosx11": "images/operating_systems/macOS_Big_Sur.png",
  "macosx11.7.10": "images/operating_systems/macOS_Big_Sur.png",
  "macosx12": "images/operating_systems/macOS_Monterey.png",
  "macosx12.7.6": "images/operating_systems/macOS_Monterey.png",
  "macosx13": "images/operating_systems/macOS_Ventura.png",
  "macosx13.7.4": "images/operating_systems/macOS_Ventura.png",
  "macosx14": "images/operating_systems/macOS_Sonoma.png",
  "macosx14.7.4": "images/operating_systems/macOS_Sonoma.png",
  "macosx15": "images/operating_systems/macOS_Sequoia.png",
  "macosx15.3.0": "images/operating_systems/macOS_Sequoia.png",
  // macOS 16 - 26
  "macosx16": "images/operating_systems/macOS_16.png",
  "macosx17": "images/operating_systems/macOS_17.png",
  "macosx18": "images/operating_systems/macOS_18.png",
  "macosx19": "images/operating_systems/macOS_19.png",
  "macosx20": "images/operating_systems/macOS_20.png",
  "macosx21": "images/operating_systems/macOS_21.png",
  "macosx22": "images/operating_systems/macOS_22.png",
  "macosx23": "images/operating_systems/macOS_23.png",
  "macosx24": "images/operating_systems/macOS_24.png",
  "macosx25": "images/operating_systems/macOS_25.png",
  "macosx26": "images/operating_systems/macOS_26.png"
};

/**
 * Displays the browser information on the dashboard.
 * @param {Object} systemInfo - The system information object containing browser and OS details.
 */
function showBrowserInfo(systemInfo) {
  var getCurrentPage = "Dashboard";

  var browser, version, browserHTML, getImageSrc;

  /* Get the browser and then convert it to lowercase */
  browser = systemInfo.browser.name.toLowerCase();
  console.log("Browser data from getSystemInfo(): " + browser);
  version = systemInfo.browser.version;
  console.log("Version data from getSystemInfo(): " + version);
  /* Use the returned value for the browser to pull the icons key value */
  getImageSrc = icons[browser];

  if (getCurrentPage.indexOf("Dashboard") > -1) {
    /* Build the browser notification */
    var browserConditions = {
      cldb: { version: "2.1.3.00", alertClass: "sys-alert-success" },
      cmac: { version: "2.1.3.00", alertClass: "sys-alert-success" },
      guardianbrowser: { version: "1.91.0", alertClass: "sys-alert-success" },
      chrome: { version: "128", alertClass: "sys-alert-success" },
      firefox: { version: "135", alertClass: "sys-alert-success" },
      safari: { version: "18.0", alertClass: "sys-alert-success" },
      edge: { version: "128", alertClass: "sys-alert-warning" },
      ie: { version: "0", alertClass: "sys-alert-error" },
      default: { version: "0", alertClass: "sys-alert-error" }
    };

    var condition = browserConditions[browser] || browserConditions.default;
    var browserAlertClass = condition.alertClass;

    if (!isVersionAtLeast(version, condition.version)) {
      browserAlertClass = "sys-alert-error";
    }

    browserHTML =
      '<div class="browser-data">' +
      '<div class="' + browserAlertClass + '">' +
      '<img class="image-icon" src="' +
      getImageSrc +
      '"/> ' +
      systemInfo.browser.name + " " + systemInfo.browser.version +
      "</div>" +
      "</div>";

    /* Add the browser notification to the current view */
    $(".browser-info").append(browserHTML);
  }

  $(".browser-data").show();
}

/**
 * Sanitizes input to prevent XSS attacks.
 * @param {string} input - The input string to sanitize.
 * @returns {string} The sanitized string.
 */
function sanitize(input) {
  var element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
}

/**
 * Displays the operating system information on the dashboard.
 * @param {Object} systemInfo - The system information object containing browser and OS details.
 */
function showOpSysInfo(systemInfo) {
  var getCurrentPage = "Dashboard";

  var opsys, version, browserHTML, getImageSrc, opsysimagesrc, versionimagesrc;

  if (systemInfo.os.name.split(" ")[1] == "NT") {
    opsys = systemInfo.os.name.split(" ")[0] + " " + systemInfo.os.name.split(" ")[1];
    opsysimagesrc = systemInfo.os.name.split(" ")[0] + systemInfo.os.name.split(" ")[1];
    version = systemInfo.os.version;
    versionimagesrc = systemInfo.os.version;
  } else if (systemInfo.os.name.split(" ")[2] == "X") {
    opsys =
      systemInfo.os.name.split(" ")[0] +
      " " +
      systemInfo.os.name.split(" ")[1] +
      " " +
      systemInfo.os.name.split(" ")[2];
    opsysimagesrc =
      systemInfo.os.name.split(" ")[0] +
      systemInfo.os.name.split(" ")[1] +
      systemInfo.os.name.split(" ")[2];
    version = systemInfo.os.version;
    versionimagesrc = systemInfo.os.version;
  } else {
    opsys = "undefined";
    version = "undefined";
  }

  console.log("Operating System data from getSystemInfo(): " + opsys);
  console.log("Version data from getSystemInfo(): " + version);
  opsys = opsys.toLowerCase();
  opsysimagesrc = opsysimagesrc.toLowerCase();
  opsysimagesrc = opsysimagesrc + versionimagesrc;

  console.log(
    "Operating System image data from opsysimagesrc: " + opsysimagesrc
  );

  getImageSrc = icons[opsysimagesrc];
  console.log("Operating System Icon from getImageSrc(): " + getImageSrc);

  if (getCurrentPage.indexOf("Dashboard") > -1) {
    /* Build the operating systems notification */
    var osConditions = {
      "windows nt 11.0": { alertClass: "sys-alert-success" },
      "windows nt 10.0": { alertClass: "sys-alert-error" },
      "windows nt 6.3": { alertClass: "sys-alert-error" },
      "windows nt 6.2": { alertClass: "sys-alert-error" },
      "windows nt 6.1": { alertClass: "sys-alert-warning" },
      "mac os x 15.3.0": { alertClass: "sys-alert-success" },
      "mac os x 14.7.4": { alertClass: "sys-alert-success" },
      "mac os x 13.7.4": { alertClass: "sys-alert-success" },
      "mac os x 12.7.6": { alertClass: "sys-alert-error" },
      "mac os x 11.7.10": { alertClass: "sys-alert-error" },
      "mac os x 10.15.7": { alertClass: "sys-alert-error" },
      "mac os x 10.14.6": { alertClass: "sys-alert-error" },
      "mac os x 10.13.6": { alertClass: "sys-alert-error" },
      "mac os x 10.12.6": { alertClass: "sys-alert-error" },
      "mac os x 10.11.6": { alertClass: "sys-alert-error" },
      "mac os x 10.10.5": { alertClass: "sys-alert-error" },
      default: { alertClass: "sys-alert-error" }
    };

    var condition = osConditions[opsys + " " + version] || osConditions.default;
    browserHTML =
      '<div class="opsys-data">' +
      '<div class="' + condition.alertClass + '">' +
      '<img class="image-icon" src="' +
      sanitize(getImageSrc) +
      '"/> ' +
      sanitize(systemInfo.os.name) + " " + sanitize(systemInfo.os.version) +
      "</div>" +
      "</div>";

    /* Actually add the browser notification to the current view */
    $(".opsys-info").append(browserHTML);
  }

  $(".opsys-data").show();
}

/**
 * Initializes the system information checker on document ready.
 */
$(document).ready(function () {
  var systemInfo = getSystemInfo();
  showBrowserInfo(systemInfo);
  showOpSysInfo(systemInfo);
});
