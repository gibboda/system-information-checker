/* Get the Current Page Element for System Information Checker */
var getCurrentPage = document.getElementsByTagName("title")[0].innerHTML;
/*  Getting the information on which web browser using the userAgent function. */
function getSystemInfo() {
  var ua = navigator.userAgent,
    tem,
    M = [],
    browserInfo = {},
    osInfo = {};

  console.log("User Agent: " + ua);

  // Check for specialized browsers first
  M = ua.match(/(cldb|cmac|guardianbrowser)\/?\s*((\d+\.\d+\.\d+\.\d+)|(\d+\.\d+)|(\d+\.\d+.\d+))/i) || [];
  if (M.length) {
    browserInfo.name = M[1];
    browserInfo.version = M[2] || "undefined";
  }

  // Check for Edge/Edg
  M = ua.match(/(Edg|Edge)\/?\s*((\d+\.\d+\.\d+\.\d+)|(\d+\.\d+)|(\d+\.\d+.\d+))/i) || [];
  if (M.length) {
    browserInfo.name = M[1];
    browserInfo.version = M[2] || "undefined";
  }

  // Check for Chrome
  M = ua.match(/(chrome|crios)\/?\s*((\d+\.\d+\.\d+\.\d+)|(\d+\.\d+)|(\d+\.\d+.\d+))/i) || [];
  if (M.length) {
    browserInfo.name = "Chrome";
    browserInfo.version = M[2] || "undefined";
  }

  // Check for Safari
  M = ua.match(/version\/((\d+\.\d+\.\d+\.\d+)|(\d+\.\d+)|(\d+\.\d+.\d+)).*safari/i) || [];
  if (M.length) {
    browserInfo.name = "Safari";
    browserInfo.version = M[1] || "undefined";
  }

  // Check for Firefox
  M = ua.match(/(firefox)\/?\s*((\d+\.\d+\.\d+\.\d+)|(\d+\.\d+)|(\d+\.\d+.\d+))/i) || [];
  if (M.length) {
    browserInfo.name = "Firefox";
    browserInfo.version = M[2] || "undefined";
  }

  // If no browser match is found
  if (!browserInfo.name) {
    browserInfo.name = "undefined";
    browserInfo.version = "undefined";
  }

  // Get OS information
  M = ua.match(/(Windows NT|Mac OS X|iPhone OS)\s*((\d+\.\d+)|(\d+\_\d+)|(\d+\_\d+\_\d+))/i) || [];
  if (M.length) {
    osInfo.name = M[1];
    osInfo.version = M[2].replace(/_/g, ".") || "undefined";
  } else {
    osInfo.name = "undefined";
    osInfo.version = "undefined";
  }

  return {
    browser: browserInfo,
    os: osInfo
  };
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
  "windowsnt10.0": "images/Operating_Systems/Windows_10.png",
  "windowsnt6.3": "images/Operating_Systems/Windows_8.png",
  "windowsnt6.1": "images/Operating_Systems/Windows_7.png",
  "macosx10.14.0": "images/Operating_Systems/OS_X_Majove.png",
  "macosx10.13.6": "images/Operating_Systems/OS_X_High_Sierra.png",
  "macosx10.12.6": "images/Operating_Systems/OS_X_Sierra.png",
  "macosx10.11.6": "images/Operating_Systems/OS_X_EL_Capitan.png",
  "macosx10.10.5": "images/Operating_Systems/OS_X_Yosemite.png",
  "macosx10.14": "images/Operating_Systems/OS_X_Majove.png",
  "macosx10.13": "images/Operating_Systems/OS_X_High_Sierra.png",
  "macosx10.12": "images/Operating_Systems/OS_X_Sierra.png",
  "macosx10.11": "images/Operating_Systems/OS_X_EL_Capitan.png",
  "macosx10.10": "images/Operating_Systems/OS_X_Yosemite.png"
};

/************************************************************************/
/*  Showing the web browser information
/************************************************************************/
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
    if (version >= condition.version) {
      browserHTML =
        '<div class="browser-data">' +
        '<div class="' + condition.alertClass + '">' +
        '<img class="image-icon" src="' +
        getImageSrc +
        '"/> ' +
        systemInfo.browser.name + " " + systemInfo.browser.version +
        "</div>" +
        "</div>";
    }

    /* Add the browser notification to the current view */
    $(".browser-info").append(browserHTML);
  }

  var versionConditions = {
    cldb: "2.1.3.00",
    cmac: "2.1.3.00",
    guardianbrowser: "1.91.0",
    chrome: "133",
    firefox: "135",
    safari: "18.0",
    edge: "133",
    ie: "0",
    default: "0"
  };

  if (version >= (versionConditions[browser] || versionConditions.default)) {
    $(".browser-data").show();
  } else {
    $(".browser-data").show();
  }
}

/************************************************************************/
/* Showing the operating system information
/************************************************************************/
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
      "mac os x 15": { alertClass: "sys-alert-success" },
      "mac os x 14": { alertClass: "sys-alert-success" },
      "mac os x 13": { alertClass: "sys-alert-success" },
      "mac os x 12": { alertClass: "sys-alert-error" },
      "mac os x 11": { alertClass: "sys-alert-error" },
      "mac os x 10.15.0": { alertClass: "sys-alert-error" },
      "mac os x 10.14.0": { alertClass: "sys-alert-error" },
      "mac os x 10.14": { alertClass: "sys-alert-error" },
      "mac os x 10.13.6": { alertClass: "sys-alert-error" },
      "mac os x 10.13": { alertClass: "sys-alert-error" },
      "mac os x 10.12.6": { alertClass: "sys-alert-error" },
      "mac os x 10.12": { alertClass: "sys-alert-error" },
      "mac os x 10.11.6": { alertClass: "sys-alert-error" },
      "mac os x 10.11": { alertClass: "sys-alert-error" },
      "mac os x 10.10.5": { alertClass: "sys-alert-error" },
      "mac os x 10.10": { alertClass: "sys-alert-error" },
      default: { alertClass: "sys-alert-error" }
    };

    var condition = osConditions[opsys + " " + version] || osConditions.default;
    browserHTML =
      '<div class="opsys-data">' +
      '<div class="' + condition.alertClass + '">' +
      '<img class="image-icon" src="' +
      getImageSrc +
      '"/> ' +
      systemInfo.os.name + " " + systemInfo.os.version +
      "</div>" +
      "</div>";

    /* Actually add the browser notification to the current view */
    $(".opsys-info").append(browserHTML);
  }

  var versionConditions = {
    "windows nt": "10.0",
    "mac os x": "13.0.0",
    default: "0"
  };

  if (version >= (versionConditions[opsys] || versionConditions.default)) {
    $(".opsys-data").show();
  } else {
    $(".opsys-data").show();
  }
}

/************************************************************************/
/* Loading on the main page
/************************************************************************/
$(document).ready(function () {
  var systemInfo = getSystemInfo();
  showBrowserInfo(systemInfo);
  showOpSysInfo(systemInfo);
});
