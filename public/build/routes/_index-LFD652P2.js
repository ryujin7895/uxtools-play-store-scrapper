import {
  useFetcher
} from "/build/_shared/chunk-ULAN4GLF.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-QOPQF3MU.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1740986767558.7812";
}
var meta = () => {
  return [{
    title: "Play Store Comment Analyzer"
  }, {
    name: "description",
    content: "Analyze Play Store comments with ease"
  }];
};
function Index() {
  _s();
  const [url, setUrl] = (0, import_react.useState)("");
  const [year, setYear] = (0, import_react.useState)("all");
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [modalSearchTerm, setModalSearchTerm] = (0, import_react.useState)("");
  const [showAllComments, setShowAllComments] = (0, import_react.useState)(false);
  const [sentimentFilter, setSentimentFilter] = (0, import_react.useState)("all");
  const [ratingFilter, setRatingFilter] = (0, import_react.useState)("all");
  const [showExportDropdown, setShowExportDropdown] = (0, import_react.useState)(false);
  const [isExporting, setIsExporting] = (0, import_react.useState)(false);
  const [exportNotification, setExportNotification] = (0, import_react.useState)({
    show: false,
    message: ""
  });
  const exportDropdownRef = (0, import_react.useRef)(null);
  const exportButtonRef = (0, import_react.useRef)(null);
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const hasData = fetcher.data && !("error" in fetcher.data) && fetcher.data.comments;
  const error = fetcher.data?.error || fetcher.data?.message;
  (0, import_react.useEffect)(() => {
    if (exportNotification.show) {
      const timer = setTimeout(() => {
        setExportNotification({
          show: false,
          message: ""
        });
      }, 3e3);
      return () => clearTimeout(timer);
    }
  }, [exportNotification.show]);
  (0, import_react.useEffect)(() => {
    const handleClickOutside = (event) => {
      if (showExportDropdown && exportDropdownRef.current && exportButtonRef.current && !exportDropdownRef.current.contains(event.target) && !exportButtonRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showExportDropdown) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showExportDropdown]);
  const getFilteredComments = () => {
    if (!fetcher.data?.comments)
      return [];
    return fetcher.data.comments.filter((comment) => {
      const matchesSentiment = sentimentFilter === "all" || comment.sentiment === sentimentFilter;
      const matchesRating = ratingFilter === "all" || comment.score === parseInt(ratingFilter);
      const matchesSearch = !modalSearchTerm || comment.content.toLowerCase().includes(modalSearchTerm.toLowerCase()) || comment.userName.toLowerCase().includes(modalSearchTerm.toLowerCase());
      return matchesSentiment && matchesRating && matchesSearch;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form with URL:", url, "year:", year, "searchTerm:", searchTerm);
      const urlObj = new URL(url);
      if (!urlObj.hostname.includes("play.google.com")) {
        throw new Error("Please enter a valid Play Store URL");
      }
      const formData = new FormData();
      formData.append("url", url);
      formData.append("year", year);
      formData.append("searchTerm", searchTerm);
      console.log("Submitting to API...");
      fetcher.submit(formData, {
        method: "POST",
        action: "/api/comments"
      });
    } catch (error2) {
      console.error("Form submission error:", error2);
      if (error2 instanceof Error) {
        fetcher.data = {
          error: error2.message
        };
      }
    }
  };
  const handleExport = (format, dataType) => {
    if (!fetcher.data?.comments)
      return;
    setIsExporting(true);
    try {
      const dataToExport = dataType === "filtered" ? getFilteredComments() : fetcher.data.comments;
      const appNameMatch = url.split("id=")[1]?.split("&")[0] || "play-store-comments";
      const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const fileName = `${appNameMatch}-${date}.${format}`;
      let content = "";
      if (format === "json") {
        const exportData = {
          comments: dataToExport,
          sentiment: fetcher.data.sentiment,
          keywords: fetcher.data.keywords,
          intentions: fetcher.data.intentions ? {
            feature_request: dataType === "filtered" && fetcher.data.intentions ? fetcher.data.intentions.feature_request.filter((comment) => dataToExport.some((c) => c.id === comment.id)) : fetcher.data.intentions?.feature_request || [],
            bug_report: dataType === "filtered" && fetcher.data.intentions ? fetcher.data.intentions.bug_report.filter((comment) => dataToExport.some((c) => c.id === comment.id)) : fetcher.data.intentions?.bug_report || [],
            praise: dataType === "filtered" && fetcher.data.intentions ? fetcher.data.intentions.praise.filter((comment) => dataToExport.some((c) => c.id === comment.id)) : fetcher.data.intentions?.praise || [],
            complaint: dataType === "filtered" && fetcher.data.intentions ? fetcher.data.intentions.complaint.filter((comment) => dataToExport.some((c) => c.id === comment.id)) : fetcher.data.intentions?.complaint || []
          } : {}
        };
        content = JSON.stringify(exportData, null, 2);
      } else if (format === "csv") {
        const headers = ["ID", "User Name", "Content", "Score", "Thumbs Up", "Date", "Year", "Sentiment", "Category"];
        const commentCategories = /* @__PURE__ */ new Map();
        if (fetcher.data.intentions) {
          Object.entries(fetcher.data.intentions).forEach(([category, comments]) => {
            comments.forEach((comment) => {
              commentCategories.set(comment.id, category);
            });
          });
        }
        content = headers.join(",") + "\n";
        dataToExport.forEach((comment) => {
          const category = commentCategories.get(comment.id) || "uncategorized";
          const row = [comment.id, `"${comment.userName.replace(/"/g, '""')}"`, `"${comment.content.replace(/"/g, '""')}"`, comment.score, comment.thumbsUp, comment.date, comment.year, comment.sentiment, category];
          content += row.join(",") + "\n";
        });
      }
      const blob = new Blob([content], {
        type: format === "json" ? "application/json" : "text/csv"
      });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      setShowExportDropdown(false);
      setExportNotification({
        show: true,
        message: `Export complete! ${fileName} has been downloaded.`
      });
    } catch (error2) {
      console.error("Export error:", error2);
      setExportNotification({
        show: true,
        message: `Export failed: ${error2 instanceof Error ? error2.message : "Unknown error"}`
      });
    } finally {
      setIsExporting(false);
    }
  };
  console.log("Fetcher state:", fetcher.state);
  console.log("Fetcher data:", fetcher.data);
  const totalComments = fetcher.data?.comments?.length ?? 0;
  const positiveCount = fetcher.data?.sentiment?.positive ?? 0;
  const neutralCount = fetcher.data?.sentiment?.neutral ?? 0;
  const negativeCount = fetcher.data?.sentiment?.negative ?? 0;
  const featureRequestCount = fetcher.data?.intentions?.feature_request?.length ?? 0;
  const bugReportCount = fetcher.data?.intentions?.bug_report?.length ?? 0;
  const positivePercentage = totalComments > 0 ? (positiveCount / totalComments * 100).toFixed(1) : "0.0";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex min-h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", { className: "fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-30", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2 mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-8 h-8 text-blue-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 226,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 225,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xl font-bold text-gray-800 dark:text-white", children: "Comment Analyzer" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 228,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 224,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "#", className: "flex items-center space-x-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 233,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 232,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Dashboard" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 235,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 231,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "#", className: "flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 239,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 238,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "History" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 241,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 237,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "#", className: "flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 245,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 246,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 244,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Settings" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 248,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 243,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 230,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 223,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 222,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 221,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "flex-1 ml-64", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-8", children: [
      exportNotification.show && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed top-4 right-4 z-50 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center p-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-6 w-6 text-green-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 263,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 262,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 261,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: exportNotification.message }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 267,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 266,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-auto pl-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setExportNotification({
          show: false,
          message: ""
        }), className: "inline-flex text-gray-400 hover:text-gray-500 focus:outline-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 277,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 276,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 272,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 271,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 260,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 259,
        columnNumber: 39
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Overview" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 287,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 dark:text-gray-400", children: "Analyze app reviews and get insights" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 288,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 286,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "search", className: "w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", placeholder: "Search in comments...", value: searchTerm, onChange: (e) => {
              setSearchTerm(e.target.value);
              if (fetcher.data && url) {
                const formData = new FormData();
                formData.append("url", url);
                formData.append("year", year);
                formData.append("searchTerm", e.target.value);
                fetcher.submit(formData, {
                  method: "POST",
                  action: "/api/comments"
                });
              }
            } }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 292,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5 text-gray-500 absolute left-3 top-2.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 307,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 306,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 291,
            columnNumber: 15
          }, this),
          hasData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { ref: exportButtonRef, onClick: () => setShowExportDropdown(!showExportDropdown), disabled: isExporting, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg inline-flex items-center", children: isExporting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 316,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 317,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 315,
                columnNumber: 25
              }, this),
              "Exporting..."
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 314,
              columnNumber: 36
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 101.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 322,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 321,
                columnNumber: 25
              }, this),
              "Export"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 320,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 313,
              columnNumber: 19
            }, this),
            showExportDropdown && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: exportDropdownRef, className: "absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-1", role: "menu", "aria-orientation": "vertical", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-medium border-b border-gray-200 dark:border-gray-700", children: "Export Format" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 331,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleExport("csv", "all"), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700", role: "menuitem", children: "CSV - All Data" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 334,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleExport("csv", "filtered"), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700", role: "menuitem", children: "CSV - Filtered Data" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 337,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleExport("json", "all"), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700", role: "menuitem", children: "JSON - All Data" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 340,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleExport("json", "filtered"), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700", role: "menuitem", children: "JSON - Filtered Data" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 343,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 330,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 329,
              columnNumber: 42
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 312,
            columnNumber: 27
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 290,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 285,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-span-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Play Store URL" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 356,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "url", className: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", placeholder: "https://play.google.com/store/apps/details?id=...", required: true, value: url, onChange: (e) => setUrl(e.target.value) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 359,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 355,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Filter by Year" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 362,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", value: year, onChange: (e) => setYear(e.target.value), children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "All Years" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 366,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2024", children: "2024" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 367,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2023", children: "2023" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 368,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2022", children: "2022" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 369,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2021", children: "2021" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 370,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 365,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 361,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 354,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isLoading, className: "px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg inline-flex items-center", children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 378,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 379,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 377,
            columnNumber: 21
          }, this),
          "Processing..."
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 376,
          columnNumber: 30
        }, this) : "Analyze Comments" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 375,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 374,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 353,
        columnNumber: 11
      }, this),
      error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 p-4 rounded-lg mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5 text-red-400 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 390,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 389,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Error!" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 392,
          columnNumber: 17
        }, this),
        "\xA0",
        error
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 388,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 387,
        columnNumber: 21
      }, this),
      hasData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid md:grid-cols-4 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Total Comments" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 401,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "Since last week" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 402,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 400,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: totalComments }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 407,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 406,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 399,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Positive Sentiment" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 415,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: [
                positivePercentage,
                "%"
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 416,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 414,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: positiveCount }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 421,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 420,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 413,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Feature Requests" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 429,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "New" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 430,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 428,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: featureRequestCount }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 435,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 434,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 427,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Bug Reports" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 443,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "Critical" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 444,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 442,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: bugReportCount }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 449,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 448,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 441,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 398,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Top Keywords" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 459,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: fetcher.data?.keywords?.map(({
              word,
              count
            }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-200", children: [
              word,
              " (",
              count,
              ")"
            ] }, word, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 464,
              columnNumber: 23
            }, this)) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 460,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 458,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Sentiment Distribution" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 471,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-2xl font-bold text-green-600", children: positiveCount }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 474,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Positive" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 477,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 473,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-2xl font-bold text-yellow-600", children: neutralCount }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 482,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Neutral" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 485,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 481,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-2xl font-bold text-red-600", children: negativeCount }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 490,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Negative" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 493,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 489,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 472,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 470,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 457,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Recent Comments" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 504,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowAllComments(true), className: "text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400", children: "View all" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 505,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 503,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: fetcher.data?.comments?.slice(0, 5).map((comment) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-600 dark:text-blue-200 font-medium", children: comment.userName.charAt(0) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 513,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 512,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 511,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-900 dark:text-white", children: comment.userName }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 520,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-yellow-400 mr-1", children: "\u2605" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 524,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: comment.score }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 525,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 523,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 519,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-1", children: comment.content }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 530,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: new Date(comment.date).toLocaleDateString() }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 533,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 518,
              columnNumber: 23
            }, this)
          ] }, comment.id, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 510,
            columnNumber: 71
          }, this)) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 509,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 502,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 396,
        columnNumber: 23
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 257,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 256,
      columnNumber: 7
    }, this),
    showAllComments && hasData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 border-b border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "All Comments" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 549,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowAllComments(false), className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 552,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 551,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 550,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 548,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "search", className: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", placeholder: "Search in comments...", value: modalSearchTerm, onChange: (e) => setModalSearchTerm(e.target.value) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 558,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 557,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", value: sentimentFilter, onChange: (e) => setSentimentFilter(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "All Sentiments" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 561,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "positive", children: "Positive" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 562,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "neutral", children: "Neutral" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 563,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "negative", children: "Negative" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 564,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 560,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", value: ratingFilter, onChange: (e) => setRatingFilter(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "All Ratings" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 567,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "\u2B50\u2B50\u2B50\u2B50\u2B50 (5)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 568,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "\u2B50\u2B50\u2B50\u2B50 (4)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 569,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "\u2B50\u2B50\u2B50 (3)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 570,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "\u2B50\u2B50 (2)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 571,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "\u2B50 (1)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 572,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 566,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 556,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 547,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 overflow-y-auto flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: getFilteredComments().map((comment) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-600 dark:text-blue-200 font-medium", children: comment.userName.charAt(0) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 581,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 580,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 579,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-900 dark:text-white", children: comment.userName }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 588,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-yellow-400 mr-1", children: "\u2605" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 592,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: comment.score }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 593,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 591,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 587,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-1", children: comment.content }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 598,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: new Date(comment.date).toLocaleDateString() }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 602,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
              "\u{1F44D} ",
              comment.thumbsUp
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 605,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 601,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 586,
          columnNumber: 21
        }, this)
      ] }, comment.id, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 578,
        columnNumber: 55
      }, this)) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 577,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 576,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 546,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 545,
      columnNumber: 38
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 219,
    columnNumber: 10
  }, this);
}
_s(Index, "UX5B2K2peMUgXnWy9UBrhVUbyqM=", false, function() {
  return [useFetcher];
});
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-LFD652P2.js.map
