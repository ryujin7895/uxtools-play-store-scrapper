import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "/build/_shared/chunk-HGR44WP5.js";
import {
  Link,
  useFetcher,
  useLocation
} from "/build/_shared/chunk-QBKGA7TD.js";
import {
  createHotContext
} from "/build/_shared/chunk-QOPQF3MU.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/ComparisonDashboard.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/ComparisonDashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/ComparisonDashboard.tsx"
  );
  import.meta.hot.lastModified = "1741008822428.8252";
}
function ComparisonDashboard() {
  _s();
  const [mainApp, setMainApp] = (0, import_react.useState)({
    url: "",
    name: ""
  });
  const [competitors, setCompetitors] = (0, import_react.useState)([{
    url: "",
    name: ""
  }, {
    url: "",
    name: ""
  }, {
    url: "",
    name: ""
  }]);
  const [isComparing, setIsComparing] = (0, import_react.useState)(false);
  const [comparisonData, setComparisonData] = (0, import_react.useState)(null);
  const [exportFormat, setExportFormat] = (0, import_react.useState)("json");
  const [showExportDropdown, setShowExportDropdown] = (0, import_react.useState)(false);
  const fetcher = useFetcher();
  (0, import_react.useEffect)(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setComparisonData(fetcher.data);
      setIsComparing(false);
    }
  }, [fetcher.state, fetcher.data]);
  const validatePlayStoreUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes("play.google.com");
    } catch {
      return false;
    }
  };
  const handleCompare = async () => {
    if (!validatePlayStoreUrl(mainApp.url)) {
      setMainApp((prev) => ({
        ...prev,
        error: "Please enter a valid Play Store URL"
      }));
      return;
    }
    const validCompetitors = competitors.filter((comp) => comp.url && validatePlayStoreUrl(comp.url));
    if (validCompetitors.length === 0) {
      setCompetitors((prev) => prev.map((comp) => comp.url ? {
        ...comp,
        error: "Please enter a valid Play Store URL"
      } : comp));
      return;
    }
    setIsComparing(true);
    try {
      const formData = new FormData();
      formData.append("mainAppUrl", mainApp.url);
      formData.append("competitorUrls", JSON.stringify(validCompetitors.map((c) => c.url)));
      fetcher.submit(formData, {
        method: "POST",
        action: "/api/compare"
      });
    } catch (error) {
      console.error("Comparison error:", error);
    }
  };
  const getAppNameFromUrl = (url) => {
    try {
      const appId = url.split("id=")[1]?.split("&")[0];
      return appId || "Unknown App";
    } catch {
      return "Unknown App";
    }
  };
  const handleUrlChange = (url, index) => {
    if (index === -1) {
      setMainApp({
        url,
        name: getAppNameFromUrl(url),
        error: void 0
      });
    } else {
      setCompetitors((prev) => prev.map((comp, i) => i === index ? {
        url,
        name: getAppNameFromUrl(url),
        error: void 0
      } : comp));
    }
  };
  const handleExport = () => {
    if (!comparisonData)
      return;
    const data = {
      metrics: comparisonData.metrics,
      sharedKeywords: comparisonData.sharedKeywords,
      featureRequests: comparisonData.featureRequests,
      bugReports: comparisonData.bugReports,
      featureGaps: comparisonData.featureGaps
    };
    if (exportFormat === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "comparison-data.json";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const csvRows = [["Metric", mainApp.name, ...competitors.filter((c) => c.url).map((c) => c.name)], ...Object.entries(data.metrics).map(([metric, values]) => [metric, values.mainApp, ...Object.values(values.competitors)])];
      const csvContent = csvRows.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvContent], {
        type: "text/csv"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "comparison-data.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Your App" }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 156,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "url", className: `flex-1 px-4 py-2 rounded-lg border ${mainApp.error ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`, placeholder: "https://play.google.com/store/apps/details?id=...", value: mainApp.url, onChange: (e) => handleUrlChange(e.target.value, -1) }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 160,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 159,
          columnNumber: 13
        }, this),
        mainApp.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-red-600 dark:text-red-400", children: mainApp.error }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 162,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 155,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Competitor Apps (up to 3)" }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 166,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: competitors.map((competitor, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "url", className: `flex-1 px-4 py-2 rounded-lg border ${competitor.error ? "border-red-300 dark:border-red-600" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`, placeholder: `Competitor ${index + 1} Play Store URL`, value: competitor.url, onChange: (e) => handleUrlChange(e.target.value, index) }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 171,
          columnNumber: 19
        }, this) }, index, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 170,
          columnNumber: 55
        }, this)) }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 169,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 165,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleCompare, disabled: isComparing || !mainApp.url, className: "px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg inline-flex items-center", children: isComparing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 180,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 181,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 179,
          columnNumber: 19
        }, this),
        "Comparing..."
      ] }, void 0, true, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 178,
        columnNumber: 30
      }, this) : "Compare Apps" }, void 0, false, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 177,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 176,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ComparisonDashboard.tsx",
      lineNumber: 154,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/ComparisonDashboard.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this),
    comparisonData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: mainApp.icon || `https://www.google.com/s2/favicons?domain=${mainApp.url}&sz=64`, alt: mainApp.name, className: "w-16 h-16 rounded-lg" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 195,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-medium text-gray-900 dark:text-white", children: mainApp.name }, void 0, false, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 197,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Main App" }, void 0, false, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 198,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 196,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 194,
          columnNumber: 13
        }, this),
        competitors.filter((c) => c.url).map((competitor, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: competitor.icon || `https://www.google.com/s2/favicons?domain=${competitor.url}&sz=64`, alt: competitor.name, className: "w-16 h-16 rounded-lg" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 202,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-medium text-gray-900 dark:text-white", children: competitor.name }, void 0, false, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 204,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
              "Competitor ",
              index + 1
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 205,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 203,
            columnNumber: 17
          }, this)
        ] }, competitor.url, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 201,
          columnNumber: 72
        }, this))
      ] }, void 0, true, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 193,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Key Metrics Comparison" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 213,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowExportDropdown(!showExportDropdown), className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Export" }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 216,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 218,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 217,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 215,
              columnNumber: 17
            }, this),
            showExportDropdown && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => {
                setExportFormat("json");
                handleExport();
                setShowExportDropdown(false);
              }, className: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded", children: "Export as JSON" }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 223,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => {
                setExportFormat("csv");
                handleExport();
                setShowExportDropdown(false);
              }, className: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded", children: "Export as CSV" }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 230,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 222,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 221,
              columnNumber: 40
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 214,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 212,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-80", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BarChart, { data: Object.entries(comparisonData.metrics).map(([metric, data]) => ({
          name: metric,
          mainApp: data.mainApp,
          ...data.competitors,
          ...Object.entries(data.competitors).reduce((acc, [url, value]) => ({
            ...acc,
            [`${url}_diff`]: ((value - data.mainApp) / data.mainApp * 100).toFixed(1) + "%"
          }), {})
        })), margin: {
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, { strokeDasharray: "3 3" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 257,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, { dataKey: "name" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 258,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {}, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 259,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { content: ({
            active,
            payload,
            label
          }) => {
            if (active && payload && payload.length) {
              return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 p-3 rounded shadow", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-medium", children: label }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 267,
                  columnNumber: 29
                }, this),
                payload.map((entry, index) => {
                  const dataKey = entry.dataKey;
                  if (!dataKey || !dataKey.includes("_diff")) {
                    const diffKey = `${dataKey}_diff`;
                    const diff = payload.find((p) => p.dataKey === diffKey);
                    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
                        color: entry.color
                      }, children: [
                        entry.name,
                        ": ",
                        entry.value
                      ] }, void 0, true, {
                        fileName: "app/components/ComparisonDashboard.tsx",
                        lineNumber: 274,
                        columnNumber: 37
                      }, this),
                      diff && dataKey !== "mainApp" && label && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-xs", children: [
                        "(",
                        diff.value,
                        ")",
                        comparisonData?.metrics[label]?.significance?.[dataKey] && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1 text-yellow-500", children: "*" }, void 0, false, {
                          fileName: "app/components/ComparisonDashboard.tsx",
                          lineNumber: 279,
                          columnNumber: 101
                        }, this)
                      ] }, void 0, true, {
                        fileName: "app/components/ComparisonDashboard.tsx",
                        lineNumber: 277,
                        columnNumber: 80
                      }, this)
                    ] }, index, true, {
                      fileName: "app/components/ComparisonDashboard.tsx",
                      lineNumber: 273,
                      columnNumber: 32
                    }, this);
                  }
                  return null;
                })
              ] }, void 0, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 266,
                columnNumber: 26
              }, this);
            }
            return null;
          } }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 260,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Legend, {}, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 289,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, { dataKey: "mainApp", fill: "#3B82F6", name: mainApp.name, children: Object.entries(comparisonData.metrics).map((entry, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cell, { fill: "#3B82F6" }, `cell-${index}`, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 291,
            columnNumber: 83
          }, this)) }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 290,
            columnNumber: 19
          }, this),
          competitors.filter((c) => c.url).map((competitor, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, { dataKey: competitor.url, fill: ["#10B981", "#8B5CF6", "#F97316"][index], name: competitor.name }, competitor.url, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 293,
            columnNumber: 78
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 243,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 242,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 241,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 211,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Keyword Analysis" }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 301,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Common Keywords" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 305,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: comparisonData.sharedKeywords.map((keyword, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 border border-gray-200 dark:border-gray-700 rounded-lg", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: keyword.word }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 309,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `px-2 py-1 rounded text-xs ${keyword.sentiment.mainApp === "positive" ? "bg-green-100 text-green-800" : keyword.sentiment.mainApp === "negative" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`, children: keyword.sentiment.mainApp }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 310,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 308,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: mainApp.name }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 316,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: keyword.mainApp }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 317,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 315,
                columnNumber: 23
              }, this),
              Object.entries(keyword.competitors).map(([url, count]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: competitors.find((c) => c.url === url)?.name }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 320,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: count }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 321,
                  columnNumber: 27
                }, this)
              ] }, url, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 319,
                columnNumber: 82
              }, this))
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 314,
              columnNumber: 21
            }, this)
          ] }, index, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 307,
            columnNumber: 72
          }, this)) }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 306,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 304,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Unique Keywords" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 330,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 border border-gray-200 dark:border-gray-700 rounded-lg", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "font-medium mb-2", children: mainApp.name }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 333,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: comparisonData.uniqueKeywords.mainApp.map((keyword, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: keyword.word }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 336,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: keyword.count }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 337,
                  columnNumber: 25
                }, this)
              ] }, index, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 335,
                columnNumber: 84
              }, this)) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 334,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 332,
              columnNumber: 17
            }, this),
            Object.entries(comparisonData.uniqueKeywords.competitors).map(([url, keywords]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 border border-gray-200 dark:border-gray-700 rounded-lg", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "font-medium mb-2", children: competitors.find((c) => c.url === url)?.name }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 342,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: keywords.map((keyword, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: keyword.word }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 345,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: keyword.count }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 346,
                  columnNumber: 27
                }, this)
              ] }, index, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 344,
                columnNumber: 57
              }, this)) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 343,
                columnNumber: 21
              }, this)
            ] }, url, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 341,
              columnNumber: 101
            }, this))
          ] }, void 0, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 331,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 329,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 300,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Feature Requests" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 358,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300 mb-2", children: mainApp.name }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 361,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: comparisonData.featureRequests.mainApp.map((feature, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: feature.feature }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 364,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm", children: [
                  feature.count,
                  " requests"
                ] }, void 0, true, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 365,
                  columnNumber: 25
                }, this)
              ] }, index, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 363,
                columnNumber: 85
              }, this)) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 362,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 360,
              columnNumber: 17
            }, this),
            Object.entries(comparisonData.featureRequests.competitors).map(([url, features]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300 mb-2", children: competitors.find((c) => c.url === url)?.name }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 372,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: feature.feature }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 377,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm", children: [
                  feature.count,
                  " requests"
                ] }, void 0, true, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 378,
                  columnNumber: 27
                }, this)
              ] }, index, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 376,
                columnNumber: 57
              }, this)) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 375,
                columnNumber: 21
              }, this)
            ] }, url, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 371,
              columnNumber: 102
            }, this))
          ] }, void 0, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 359,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 357,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Bug Reports" }, void 0, false, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 389,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300 mb-2", children: mainApp.name }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 392,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: comparisonData.bugReports.mainApp.map((bug, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: bug.bug }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 395,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm", children: [
                  bug.count,
                  " reports"
                ] }, void 0, true, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 396,
                  columnNumber: 25
                }, this)
              ] }, index, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 394,
                columnNumber: 76
              }, this)) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 393,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 391,
              columnNumber: 17
            }, this),
            Object.entries(comparisonData.bugReports.competitors).map(([url, bugs]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300 mb-2", children: competitors.find((c) => c.url === url)?.name }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 403,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: bugs.map((bug, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: bug.bug }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 408,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm", children: [
                  bug.count,
                  " reports"
                ] }, void 0, true, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 409,
                  columnNumber: 27
                }, this)
              ] }, index, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 407,
                columnNumber: 49
              }, this)) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 406,
                columnNumber: 21
              }, this)
            ] }, url, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 402,
              columnNumber: 93
            }, this))
          ] }, void 0, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 390,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 388,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 355,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Feature Gaps Analysis" }, void 0, false, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 421,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300 mb-3", children: [
              "Features Missing in ",
              mainApp.name
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 424,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: comparisonData.featureGaps?.mainApp.map((gap, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: gap.feature }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 430,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
                  "Present in ",
                  gap.presentIn.length,
                  " competitor",
                  gap.presentIn.length > 1 ? "s" : ""
                ] }, void 0, true, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 431,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 429,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: gap.presentIn.map((appUrl) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm", children: competitors.find((c) => c.url === appUrl)?.name }, appUrl, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 436,
                columnNumber: 54
              }, this)) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 435,
                columnNumber: 23
              }, this)
            ] }, index, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 428,
              columnNumber: 76
            }, this)) }, void 0, false, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 427,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 423,
            columnNumber: 15
          }, this),
          Object.entries(comparisonData.featureGaps?.competitors || {}).map(([url, gaps]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium text-gray-700 dark:text-gray-300 mb-3", children: [
              "Features Missing in ",
              competitors.find((c) => c.url === url)?.name
            ] }, void 0, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 445,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: gaps.map((gap, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: gap.feature }, void 0, false, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 451,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
                  "Present in ",
                  gap.presentIn.length,
                  " app",
                  gap.presentIn.length > 1 ? "s" : ""
                ] }, void 0, true, {
                  fileName: "app/components/ComparisonDashboard.tsx",
                  lineNumber: 452,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 450,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: gap.presentIn.map((appUrl) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm", children: appUrl === mainApp.url ? mainApp.name : competitors.find((c) => c.url === appUrl)?.name }, appUrl, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 457,
                columnNumber: 56
              }, this)) }, void 0, false, {
                fileName: "app/components/ComparisonDashboard.tsx",
                lineNumber: 456,
                columnNumber: 25
              }, this)
            ] }, index, true, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 449,
              columnNumber: 47
            }, this)) }, void 0, false, {
              fileName: "app/components/ComparisonDashboard.tsx",
              lineNumber: 448,
              columnNumber: 19
            }, this)
          ] }, url, true, {
            fileName: "app/components/ComparisonDashboard.tsx",
            lineNumber: 444,
            columnNumber: 99
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/ComparisonDashboard.tsx",
          lineNumber: 422,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ComparisonDashboard.tsx",
        lineNumber: 420,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ComparisonDashboard.tsx",
      lineNumber: 191,
      columnNumber: 26
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ComparisonDashboard.tsx",
    lineNumber: 151,
    columnNumber: 10
  }, this);
}
_s(ComparisonDashboard, "RoRir7ZX+FnxnuV1EW9usG6MDIo=", false, function() {
  return [useFetcher];
});
_c = ComparisonDashboard;
var _c;
$RefreshReg$(_c, "ComparisonDashboard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/comparison.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/comparison.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/comparison.tsx"
  );
  import.meta.hot.lastModified = "1741007598147.0745";
}
var meta = () => {
  return [{
    title: "App Comparison - UX Tools Play Store Scraper"
  }, {
    name: "description",
    content: "Compare your app with competitors"
  }];
};
function Comparison() {
  _s2();
  const location = useLocation();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex min-h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("aside", { className: "fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-30", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center space-x-2 mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "w-8 h-8 text-blue-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" }, void 0, false, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 42,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 41,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-xl font-bold text-gray-800 dark:text-white", children: "Comment Analyzer" }, void 0, false, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 44,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 40,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("nav", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { to: "/", className: `flex w-full items-center space-x-2 p-2 rounded-lg ${location.pathname === "/" ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 49,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 48,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: "Dashboard" }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 51,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 47,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { to: "/comparison", className: `flex w-full items-center space-x-2 p-2 rounded-lg ${location.pathname === "/comparison" ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 55,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 54,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: "Comparison" }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 57,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 53,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { to: "/history", className: `flex w-full items-center space-x-2 p-2 rounded-lg ${location.pathname === "/history" ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 61,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 60,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: "History" }, void 0, false, {
            fileName: "app/routes/comparison.tsx",
            lineNumber: 63,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 59,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 46,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 39,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("main", { className: "ml-64 flex-1 min-h-screen bg-gray-100 dark:bg-gray-900", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto px-6 py-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-between items-center mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "App Comparison" }, void 0, false, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 75,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-600 dark:text-gray-400", children: "Compare your app with competitors" }, void 0, false, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 78,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 74,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 73,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ComparisonDashboard, {}, void 0, false, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 83,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 72,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/comparison.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
}
_s2(Comparison, "pkHmaVRPskBaU4tMJuJJpV42k1I=", false, function() {
  return [useLocation];
});
_c2 = Comparison;
var _c2;
$RefreshReg$(_c2, "Comparison");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Comparison as default,
  meta
};
//# sourceMappingURL=/build/routes/comparison-KYXOOKSN.js.map
