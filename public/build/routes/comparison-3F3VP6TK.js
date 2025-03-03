import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Sidebar,
  Tooltip,
  XAxis,
  YAxis
} from "/build/_shared/chunk-7F7SCLCC.js";
import "/build/_shared/chunk-QBKGA7TD.js";
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

// app/components/comparison/ComparisonDashboard.tsx
var import_react3 = __toESM(require_react(), 1);

// app/components/comparison/AppComparisonForm.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/comparison/AppComparisonForm.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/comparison/AppComparisonForm.tsx"
  );
  import.meta.hot.lastModified = "1741011380887.5176";
}
function AppComparisonForm({
  onSubmit
}) {
  _s();
  const [appInputs, setAppInputs] = (0, import_react.useState)(["", ""]);
  const handleInputChange = (index, value) => {
    const newInputs = [...appInputs];
    newInputs[index] = value;
    setAppInputs(newInputs);
  };
  const handleAddInput = () => {
    if (appInputs.length < 5) {
      setAppInputs([...appInputs, ""]);
    }
  };
  const handleRemoveInput = (index) => {
    if (appInputs.length > 2) {
      const newInputs = [...appInputs];
      newInputs.splice(index, 1);
      setAppInputs(newInputs);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validAppIds = appInputs.filter((id) => id.trim() !== "");
    if (validAppIds.length >= 2) {
      onSubmit(validAppIds);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: appInputs.map((input, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: `app-${index}`, className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: index === 0 ? "Your App ID" : `Competitor App ID ${index}` }, void 0, false, {
          fileName: "app/components/comparison/AppComparisonForm.tsx",
          lineNumber: 56,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: `app-${index}`, type: "text", value: input, onChange: (e) => handleInputChange(index, e.target.value), placeholder: "e.g., com.example.app", className: "mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 \n                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white \n                         placeholder-gray-400 dark:placeholder-gray-400\n                         focus:outline-none focus:ring-2 focus:ring-blue-500" }, void 0, false, {
          fileName: "app/components/comparison/AppComparisonForm.tsx",
          lineNumber: 59,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 55,
        columnNumber: 13
      }, this),
      index >= 2 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => handleRemoveInput(index), className: "mt-6 p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300", "aria-label": "Remove app", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }, void 0, false, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 66,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 65,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 64,
        columnNumber: 28
      }, this)
    ] }, index, true, {
      fileName: "app/components/comparison/AppComparisonForm.tsx",
      lineNumber: 54,
      columnNumber: 42
    }, this)) }, void 0, false, {
      fileName: "app/components/comparison/AppComparisonForm.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: handleAddInput, disabled: appInputs.length >= 5, className: `inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-md text-sm shadow-sm 
                    ${appInputs.length >= 5 ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"}`, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "mr-2 h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }, void 0, false, {
          fileName: "app/components/comparison/AppComparisonForm.tsx",
          lineNumber: 77,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/comparison/AppComparisonForm.tsx",
          lineNumber: 76,
          columnNumber: 11
        }, this),
        "Add Another App"
      ] }, void 0, true, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "inline-flex items-center px-4 py-2 border border-transparent \n                   text-sm font-medium rounded-md shadow-sm text-white \n                   bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: "Compare Apps" }, void 0, false, {
        fileName: "app/components/comparison/AppComparisonForm.tsx",
        lineNumber: 82,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/comparison/AppComparisonForm.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/comparison/AppComparisonForm.tsx",
    lineNumber: 52,
    columnNumber: 10
  }, this);
}
_s(AppComparisonForm, "V/S1R7tMTs7qgYnYmSa+HUoevI0=");
_c = AppComparisonForm;
var _c;
$RefreshReg$(_c, "AppComparisonForm");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/comparison/MetricsComparison.tsx
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/comparison/MetricsComparison.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/comparison/MetricsComparison.tsx"
  );
  import.meta.hot.lastModified = "1741011376918.678";
}
function MetricsComparison({
  apps,
  onRemoveApp
}) {
  _s2();
  const primaryApp = apps[0];
  const percentageDiffs = (0, import_react2.useMemo)(() => {
    return apps.map((app) => {
      if (app.id === primaryApp.id)
        return null;
      return {
        averageRating: (app.averageRating - primaryApp.averageRating) / primaryApp.averageRating * 100,
        totalReviews: (app.totalReviews - primaryApp.totalReviews) / primaryApp.totalReviews * 100,
        sentimentPositive: (app.sentimentDistribution.positive - primaryApp.sentimentDistribution.positive) / primaryApp.sentimentDistribution.positive * 100,
        sentimentNeutral: (app.sentimentDistribution.neutral - primaryApp.sentimentDistribution.neutral) / primaryApp.sentimentDistribution.neutral * 100,
        sentimentNegative: (app.sentimentDistribution.negative - primaryApp.sentimentDistribution.negative) / primaryApp.sentimentDistribution.negative * 100,
        commentVolume: (app.commentVolume.total - primaryApp.commentVolume.total) / primaryApp.commentVolume.total * 100
      };
    });
  }, [apps, primaryApp]);
  const formatDiff = (diff) => {
    if (diff === null || diff === void 0)
      return "";
    return `${diff > 0 ? "+" : ""}${diff.toFixed(1)}%`;
  };
  const getDiffColorClass = (diff, isNegativeGood = false) => {
    if (diff === null || diff === void 0)
      return "";
    const isPositive = diff > 0;
    const isGood = isNegativeGood ? !isPositive : isPositive;
    return isGood ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
  };
  const chartData = (0, import_react2.useMemo)(() => {
    return {
      ratings: apps.map((app) => ({
        name: app.name,
        rating: app.averageRating,
        color: app.id === primaryApp.id ? "#3B82F6" : "#10B981",
        diff: app.id === primaryApp.id ? 0 : (app.averageRating - primaryApp.averageRating) / primaryApp.averageRating * 100
      })),
      reviews: apps.map((app) => ({
        name: app.name,
        reviews: app.totalReviews,
        color: app.id === primaryApp.id ? "#3B82F6" : "#10B981",
        diff: app.id === primaryApp.id ? 0 : (app.totalReviews - primaryApp.totalReviews) / primaryApp.totalReviews * 100
      }))
    };
  }, [apps, primaryApp]);
  const commentTrendData = (0, import_react2.useMemo)(() => {
    return primaryApp.commentVolume.months.map((month, i) => {
      const dataPoint = {
        name: month
      };
      apps.forEach((app) => {
        dataPoint[app.id] = app.commentVolume.perMonth[i] || 0;
      });
      return dataPoint;
    });
  }, [apps, primaryApp]);
  const appColors = (0, import_react2.useMemo)(() => {
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];
    return apps.reduce((acc, app, index) => {
      acc[app.id] = colors[index % colors.length];
      return acc;
    }, {});
  }, [apps]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-6 border-b border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-800 dark:text-white", children: "Metrics Comparison" }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-600 dark:text-gray-400 text-sm", children: "Compare key metrics between apps" }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 102,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6", children: apps.map((app, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: `p-4 rounded-lg ${index === 0 ? "bg-blue-50 dark:bg-blue-900/30" : "bg-gray-50 dark:bg-gray-700/30"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("img", { src: app.icon, alt: `${app.name} icon`, className: "w-16 h-16 rounded-lg shadow-sm" }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 112,
          columnNumber: 17
        }, this),
        index > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: () => onRemoveApp(app.id), className: "absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 shadow", "aria-label": "Remove app", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 115,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 114,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 113,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 111,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "mt-3 font-medium text-center text-gray-800 dark:text-white truncate max-w-full", children: app.name }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 119,
        columnNumber: 15
      }, this),
      index === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "mt-1 inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full", children: "Your App" }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 122,
        columnNumber: 31
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 110,
      columnNumber: 13
    }, this) }, app.id, false, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 109,
      columnNumber: 35
    }, this)) }, void 0, false, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 108,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-6 border-t border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-lg font-medium mb-4 text-gray-800 dark:text-white", children: "Average Rating" }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "h-64", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BarChart, { data: chartData.ratings, margin: {
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CartesianGrid, { strokeDasharray: "3 3" }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(XAxis, { dataKey: "name" }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(YAxis, { domain: [0, 5] }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Tooltip, { formatter: (value, name) => {
          if (name === "rating") {
            return [`${value} \u2605`, "Rating"];
          }
          return [value, name];
        }, labelFormatter: (name) => `App: ${name}` }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Legend, {}, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 149,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Bar, { dataKey: "rating", name: "Rating", radius: [4, 4, 0, 0], children: chartData.ratings.map((entry, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Cell, { fill: entry.color }, `cell-${index}`, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 151,
          columnNumber: 58
        }, this)) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 150,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 134,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 133,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "App" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 162,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Rating" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 165,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Difference" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 168,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 161,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 160,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: chartData.ratings.map((app, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: [
            app.name,
            " ",
            index === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "ml-2 text-xs text-blue-600", children: "(Your App)" }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 176,
              columnNumber: 48
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 175,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
            app.rating.toFixed(1),
            " \u2605"
          ] }, void 0, true, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 178,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: index === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-400", children: "-" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 182,
            columnNumber: 36
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: getDiffColorClass(app.diff), children: formatDiff(app.diff) }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 182,
            columnNumber: 79
          }, this) }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 181,
            columnNumber: 19
          }, this)
        ] }, `rating-${app.name}`, true, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 174,
          columnNumber: 54
        }, this)) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 159,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 130,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-6 border-t border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-lg font-medium mb-4 text-gray-800 dark:text-white", children: "Total Reviews" }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 194,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "h-64", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BarChart, { data: chartData.reviews, margin: {
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CartesianGrid, { strokeDasharray: "3 3" }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 203,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(XAxis, { dataKey: "name" }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 204,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(YAxis, {}, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 205,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Tooltip, { formatter: (value) => [value.toLocaleString(), "Reviews"], labelFormatter: (name) => `App: ${name}` }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 206,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Legend, {}, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 207,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Bar, { dataKey: "reviews", name: "Reviews", radius: [4, 4, 0, 0], children: chartData.reviews.map((entry, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Cell, { fill: entry.color }, `cell-${index}`, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 209,
          columnNumber: 58
        }, this)) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 208,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 197,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 196,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 195,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "App" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Total Reviews" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 223,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Difference" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 226,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 219,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 218,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: chartData.reviews.map((app, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: [
            app.name,
            " ",
            index === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "ml-2 text-xs text-blue-600", children: "(Your App)" }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 234,
              columnNumber: 48
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 233,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: app.reviews.toLocaleString() }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 236,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: index === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-400", children: "-" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 240,
            columnNumber: 36
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: getDiffColorClass(app.diff), children: formatDiff(app.diff) }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 240,
            columnNumber: 79
          }, this) }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 239,
            columnNumber: 19
          }, this)
        ] }, `reviews-${app.name}`, true, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 232,
          columnNumber: 54
        }, this)) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 231,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 217,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 216,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 193,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-6 border-t border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-lg font-medium mb-4 text-gray-800 dark:text-white", children: "Sentiment Distribution" }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 252,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: apps.map((app, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-between items-center mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h4", { className: "font-medium text-gray-800 dark:text-white", children: app.name }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 256,
            columnNumber: 17
          }, this),
          index === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full", children: "Your App" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 259,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 255,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-700 dark:text-gray-300", children: "Positive" }, void 0, false, {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 268,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-700 dark:text-gray-300", children: [
                  app.sentimentDistribution.positive,
                  "%"
                ] }, void 0, true, {
                  fileName: "app/components/comparison/MetricsComparison.tsx",
                  lineNumber: 270,
                  columnNumber: 23
                }, this),
                index > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: `ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentPositive)}`, children: [
                  "(",
                  formatDiff(percentageDiffs[index]?.sentimentPositive),
                  ")"
                ] }, void 0, true, {
                  fileName: "app/components/comparison/MetricsComparison.tsx",
                  lineNumber: 271,
                  columnNumber: 37
                }, this)
              ] }, void 0, true, {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 269,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 267,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-green-500 h-2 rounded-full", style: {
              width: `${app.sentimentDistribution.positive}%`
            } }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 277,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 276,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 266,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-700 dark:text-gray-300", children: "Neutral" }, void 0, false, {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 284,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-700 dark:text-gray-300", children: [
                  app.sentimentDistribution.neutral,
                  "%"
                ] }, void 0, true, {
                  fileName: "app/components/comparison/MetricsComparison.tsx",
                  lineNumber: 286,
                  columnNumber: 23
                }, this),
                index > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: `ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentNeutral)}`, children: [
                  "(",
                  formatDiff(percentageDiffs[index]?.sentimentNeutral),
                  ")"
                ] }, void 0, true, {
                  fileName: "app/components/comparison/MetricsComparison.tsx",
                  lineNumber: 287,
                  columnNumber: 37
                }, this)
              ] }, void 0, true, {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 285,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 283,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-yellow-400 h-2 rounded-full", style: {
              width: `${app.sentimentDistribution.neutral}%`
            } }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 293,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 292,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 282,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-700 dark:text-gray-300", children: "Negative" }, void 0, false, {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 300,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-700 dark:text-gray-300", children: [
                  app.sentimentDistribution.negative,
                  "%"
                ] }, void 0, true, {
                  fileName: "app/components/comparison/MetricsComparison.tsx",
                  lineNumber: 302,
                  columnNumber: 23
                }, this),
                index > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: `ml-1 text-xs ${getDiffColorClass(percentageDiffs[index]?.sentimentNegative, true)}`, children: [
                  "(",
                  formatDiff(percentageDiffs[index]?.sentimentNegative),
                  ")"
                ] }, void 0, true, {
                  fileName: "app/components/comparison/MetricsComparison.tsx",
                  lineNumber: 303,
                  columnNumber: 37
                }, this)
              ] }, void 0, true, {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 301,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 299,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-red-500 h-2 rounded-full", style: {
              width: `${app.sentimentDistribution.negative}%`
            } }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 309,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 308,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 298,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 265,
          columnNumber: 15
        }, this)
      ] }, `sentiment-${app.id}`, true, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 254,
        columnNumber: 37
      }, this)) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 253,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 251,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-6 border-t border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-lg font-medium mb-4 text-gray-800 dark:text-white", children: "Comment Volume Trends" }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 321,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "h-80", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LineChart, { data: commentTrendData, margin: {
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CartesianGrid, { strokeDasharray: "3 3" }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 330,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(XAxis, { dataKey: "name" }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 331,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(YAxis, {}, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 332,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Tooltip, {}, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 333,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Legend, {}, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 334,
          columnNumber: 15
        }, this),
        apps.map((app, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Line, { type: "monotone", dataKey: app.id, name: app.name, stroke: appColors[app.id], strokeWidth: 2, dot: {
          r: 4
        }, activeDot: {
          r: 6
        } }, app.id, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 335,
          columnNumber: 41
        }, this))
      ] }, void 0, true, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 324,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 323,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 322,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "App" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 349,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Total Comments" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 352,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Avg. Comments/Month" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 355,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("th", { className: "px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Difference (Total)" }, void 0, false, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 358,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 348,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 347,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: apps.map((app, index) => {
          const avgPerMonth = Math.round(app.commentVolume.perMonth.reduce((a, b) => a + b, 0) / app.commentVolume.perMonth.length);
          return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: [
              app.name,
              " ",
              index === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "ml-2 text-xs text-blue-600", children: "(Your App)" }, void 0, false, {
                fileName: "app/components/comparison/MetricsComparison.tsx",
                lineNumber: 368,
                columnNumber: 50
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 367,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: app.commentVolume.total.toLocaleString() }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 370,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: avgPerMonth.toLocaleString() }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 373,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: index === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-gray-400", children: "-" }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 377,
              columnNumber: 38
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: getDiffColorClass(percentageDiffs[index]?.commentVolume), children: formatDiff(percentageDiffs[index]?.commentVolume) }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 377,
              columnNumber: 81
            }, this) }, void 0, false, {
              fileName: "app/components/comparison/MetricsComparison.tsx",
              lineNumber: 376,
              columnNumber: 21
            }, this)
          ] }, `volume-${app.id}`, true, {
            fileName: "app/components/comparison/MetricsComparison.tsx",
            lineNumber: 366,
            columnNumber: 22
          }, this);
        }) }, void 0, false, {
          fileName: "app/components/comparison/MetricsComparison.tsx",
          lineNumber: 363,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 346,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/comparison/MetricsComparison.tsx",
        lineNumber: 345,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/comparison/MetricsComparison.tsx",
      lineNumber: 320,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/comparison/MetricsComparison.tsx",
    lineNumber: 97,
    columnNumber: 10
  }, this);
}
_s2(MetricsComparison, "cpd19qlEpymsOJY0V3A+uKOH6aM=");
_c2 = MetricsComparison;
var _c2;
$RefreshReg$(_c2, "MetricsComparison");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/common/LoadingSpinner.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/common/LoadingSpinner.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/common/LoadingSpinner.tsx"
  );
  import.meta.hot.lastModified = "1741011179284.3198";
}
function LoadingSpinner({
  size = "md"
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: `${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin` }, void 0, false, {
    fileName: "app/components/common/LoadingSpinner.tsx",
    lineNumber: 30,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/common/LoadingSpinner.tsx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
}
_c3 = LoadingSpinner;
var _c3;
$RefreshReg$(_c3, "LoadingSpinner");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/utils/comparisonApi.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/comparisonApi.ts"
  );
  import.meta.hot.lastModified = "1741011178424.4656";
}
async function fetchAppData(appId) {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  const hash = generateSimpleHash(appId);
  return {
    id: appId,
    name: getAppName(appId),
    icon: `https://picsum.photos/seed/${hash}/200`,
    averageRating: 3 + hash % 20 / 10,
    // Between 3.0 and 5.0
    totalReviews: 1e3 + hash % 9e3,
    sentimentDistribution: {
      positive: 40 + hash % 40,
      neutral: 10 + hash % 20,
      negative: 5 + hash % 25
    },
    commentVolume: {
      total: 500 + hash % 4500,
      perMonth: Array.from({ length: 12 }, () => 20 + hash % 100),
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    keywords: generateMockKeywords(hash)
  };
}
function generateSimpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
function generateMockKeywords(seed) {
  const keywords = [
    "user interface",
    "performance",
    "battery life",
    "crash",
    "bug",
    "feature",
    "update",
    "design",
    "usability",
    "customer service",
    "login",
    "notification",
    "payment",
    "speed",
    "stability",
    "responsive",
    "intuitive",
    "reliable",
    "glitch",
    "improvement"
  ];
  return keywords.slice(seed % 5, seed % 5 + 10).map((term, index) => ({
    term,
    count: 5 + (seed + index) % 95,
    sentiment: -0.9 + (seed + index) % 19 / 10
    // Between -0.9 and +0.9
  }));
}
function getAppName(appId) {
  const parts = appId.split(".");
  if (parts.length > 2) {
    const productPart = parts[2];
    return productPart.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).replace(/([a-z])([A-Z])/g, "$1 $2").trim();
  }
  return appId;
}

// app/components/comparison/ComparisonDashboard.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/comparison/ComparisonDashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/comparison/ComparisonDashboard.tsx"
  );
  import.meta.hot.lastModified = "1741011424660.8948";
}
function ComparisonDashboard() {
  _s3();
  const [apps, setApps] = (0, import_react3.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)(null);
  const handleAddApps = async (appIds) => {
    setIsLoading(true);
    setError(null);
    try {
      const appDataPromises = appIds.map((id) => fetchAppData(id));
      const results = await Promise.all(appDataPromises);
      setApps(results);
    } catch (err) {
      setError("Failed to fetch app data. Please check the app IDs and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveApp = (appId) => {
    setApps((prevApps) => prevApps.filter((app) => app.id !== appId));
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "space-y-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-white", children: "Compare Apps" }, void 0, false, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(AppComparisonForm, { onSubmit: handleAddApps }, void 0, false, {
        fileName: "app/components/comparison/ComparisonDashboard.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-red-700 dark:text-red-400", children: error }, void 0, false, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 58,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 57,
      columnNumber: 17
    }, this),
    isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(LoadingSpinner, { size: "lg" }, void 0, false, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 62,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 61,
      columnNumber: 20
    }, this) : apps.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "space-y-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(MetricsComparison, { apps, onRemoveApp: handleRemoveApp }, void 0, false, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 63,
      columnNumber: 36
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-blue-700 dark:text-blue-400", children: "Add app IDs to start comparing. You can find app IDs in their Play Store URLs (e.g., com.example.app)." }, void 0, false, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 66,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/comparison/ComparisonDashboard.tsx",
      lineNumber: 65,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/comparison/ComparisonDashboard.tsx",
    lineNumber: 49,
    columnNumber: 10
  }, this);
}
_s3(ComparisonDashboard, "1omLtnDAqQ+uV1lGBRSGhWivFTE=");
_c4 = ComparisonDashboard;
var _c4;
$RefreshReg$(_c4, "ComparisonDashboard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/comparison.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
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
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/comparison.tsx"
  );
  import.meta.hot.lastModified = "1741012125241.9756";
}
var meta = () => {
  return [{
    title: "App Comparison - Play Store Comment Analyzer"
  }, {
    name: "description",
    content: "Compare your app with competitors"
  }];
};
function Comparison() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex min-h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Sidebar, {}, void 0, false, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("main", { className: "ml-64 flex-1 min-h-screen bg-gray-100 dark:bg-gray-900", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container mx-auto px-6 py-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex justify-between items-center mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "App Comparison" }, void 0, false, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 38,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-gray-600 dark:text-gray-400", children: "Compare your app with competitors" }, void 0, false, {
          fileName: "app/routes/comparison.tsx",
          lineNumber: 41,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 37,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 36,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ComparisonDashboard, {}, void 0, false, {
        fileName: "app/routes/comparison.tsx",
        lineNumber: 46,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/comparison.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/comparison.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
_c5 = Comparison;
var _c5;
$RefreshReg$(_c5, "Comparison");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Comparison as default,
  meta
};
//# sourceMappingURL=/build/routes/comparison-3F3VP6TK.js.map
