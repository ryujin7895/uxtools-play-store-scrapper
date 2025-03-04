import {
  Bars3Icon_default,
  DarkThemeToggle,
  Flowbite
} from "/build/_shared/chunk-ZKVZXHCC.js";
import "/build/_shared/chunk-LYT6NCUF.js";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "/build/_shared/chunk-BGJAF3OO.js";
import {
  createHotContext
} from "/build/_shared/chunk-PTAIRCKJ.js";
import "/build/_shared/chunk-OPGM6WIO.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WWEL7QKW.js";
import {
  require_react
} from "/build/_shared/chunk-2AFRYLX2.js";
import "/build/_shared/chunk-N4FG5RPV.js";
import {
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = void 0;

// node_modules/@vercel/analytics/dist/react/index.mjs
var import_react = __toESM(require_react(), 1);
"use client";
var name = "@vercel/analytics";
var version = "1.5.0";
var initQueue = () => {
  if (window.va)
    return;
  window.va = function a(...params) {
    (window.vaq = window.vaq || []).push(params);
  };
};
function isBrowser() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = "development";
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}
function getMode() {
  const mode = isBrowser() ? window.vam : detectEnvironment();
  return mode || "production";
}
function isDevelopment() {
  return getMode() === "development";
}
function getScriptSrc(props) {
  if (props.scriptSrc) {
    return props.scriptSrc;
  }
  if (isDevelopment()) {
    return "https://va.vercel-scripts.com/v1/script.debug.js";
  }
  if (props.basePath) {
    return `${props.basePath}/insights/script.js`;
  }
  return "/_vercel/insights/script.js";
}
function inject(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser())
    return;
  setMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = getScriptSrc(props);
  if (document.head.querySelector(`script[src*="${src}"]`))
    return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
  script.dataset.sdkv = version;
  if (props.disableAutoTrack) {
    script.dataset.disableAutoTrack = "1";
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  } else if (props.basePath) {
    script.dataset.endpoint = `${props.basePath}/insights`;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  script.onerror = () => {
    const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
    console.log(
      `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
    );
  };
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = "false";
  }
  document.head.appendChild(script);
}
function pageview({
  route,
  path
}) {
  var _a;
  (_a = window.va) == null ? void 0 : _a.call(window, "pageview", { route, path });
}
function getBasePath() {
  if (typeof process === "undefined" || typeof process.env === "undefined") {
    return void 0;
  }
  return process.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH;
}
function Analytics(props) {
  (0, import_react.useEffect)(() => {
    var _a;
    if (props.beforeSend) {
      (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
  }, [props.beforeSend]);
  (0, import_react.useEffect)(() => {
    inject({
      framework: props.framework || "react",
      basePath: props.basePath ?? getBasePath(),
      ...props.route !== void 0 && { disableAutoTrack: true },
      ...props
    });
  }, []);
  (0, import_react.useEffect)(() => {
    if (props.route && props.path) {
      pageview({ route: props.route, path: props.path });
    }
  }, [props.route, props.path]);
  return null;
}

// app/components/common/Navbar.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/common/Navbar.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/common/Navbar.tsx"
  );
  import.meta.hot.lastModified = "1741070256738.0022";
}
function Navbar() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-3 py-3 lg:px-5 lg:pl-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-start", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { "data-drawer-target": "logo-sidebar", "data-drawer-toggle": "logo-sidebar", "aria-controls": "logo-sidebar", type: "button", className: "inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "sr-only", children: "Open sidebar" }, void 0, false, {
          fileName: "app/components/common/Navbar.tsx",
          lineNumber: 29,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bars3Icon_default, { className: "w-6 h-6" }, void 0, false, {
          fileName: "app/components/common/Navbar.tsx",
          lineNumber: 30,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/common/Navbar.tsx",
        lineNumber: 28,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex ms-2 md:me-24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white", children: "UX Tools" }, void 0, false, {
        fileName: "app/components/common/Navbar.tsx",
        lineNumber: 33,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/common/Navbar.tsx",
        lineNumber: 32,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/common/Navbar.tsx",
      lineNumber: 27,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DarkThemeToggle, { className: "rounded-full p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" }, void 0, false, {
      fileName: "app/components/common/Navbar.tsx",
      lineNumber: 39,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/common/Navbar.tsx",
      lineNumber: 38,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/common/Navbar.tsx",
    lineNumber: 26,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/common/Navbar.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/common/Navbar.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c = Navbar;
var _c;
$RefreshReg$(_c, "Navbar");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/lib/theme.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/lib/theme.ts"
  );
  import.meta.hot.lastModified = "1741068284752.9707";
}
var theme = {
  sidebar: {
    root: {
      base: "h-full",
      inner: "h-full overflow-y-auto overflow-x-hidden bg-white/50 dark:bg-gray-900/50 py-4 px-3"
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
      active: "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
      icon: {
        base: "h-5 w-5 flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white",
        active: "text-blue-600 dark:text-blue-400"
      }
    }
  },
  button: {
    base: "group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none transition-all duration-200",
    pill: {
      off: "rounded-lg",
      on: "rounded-full"
    }
  },
  navbar: {
    root: {
      base: "fixed z-30 w-full border-b border-gray-200 bg-white/50 dark:border-gray-700 dark:bg-gray-900/50 backdrop-blur-xl"
    }
  },
  avatar: {
    root: {
      base: "flex justify-center items-center space-x-4 rounded-full",
      bordered: "p-1 ring-2",
      img: {
        off: "rounded-full",
        on: "rounded-full"
      },
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-20 h-20",
        xl: "w-36 h-36"
      }
    }
  }
};

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-YXLR4I5T.css";

// app/root.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/root.tsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: tailwind_default
}, ...cssBundleHref ? [{
  rel: "stylesheet",
  href: cssBundleHref
}] : [], {
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
}
_c2 = Layout;
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { className: "h-full bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Flowbite, { theme: {
      theme
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Navbar, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 75,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 77,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 78,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Analytics, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 72,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 64,
    columnNumber: 10
  }, this);
}
_c22 = App;
var _c2;
var _c22;
$RefreshReg$(_c2, "Layout");
$RefreshReg$(_c22, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Layout,
  App as default,
  links
};
//# sourceMappingURL=/build/root-BFUMWCPS.js.map
