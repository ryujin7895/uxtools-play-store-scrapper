import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Sidebar,
  Tooltip,
  XAxis,
  YAxis
} from "/build/_shared/chunk-GMLRMA33.js";
import {
  Button,
  Label,
  Select,
  TextInput
} from "/build/_shared/chunk-ZKVZXHCC.js";
import "/build/_shared/chunk-LYT6NCUF.js";
import {
  useFetcher,
  useLocation
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

// app/routes/_index.tsx
var import_react = __toESM(require_react(), 1);

// node_modules/date-fns/constants.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;
var constructFromSymbol = Symbol.for("constructDateFrom");

// node_modules/date-fns/constructFrom.js
function constructFrom(date, value) {
  if (typeof date === "function")
    return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date)
    return new date.constructor(value);
  return new Date(value);
}

// node_modules/date-fns/toDate.js
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}

// node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/date-fns/startOfWeek.js
function startOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/startOfISOWeek.js
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

// node_modules/date-fns/getISOWeekYear.js
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}

// node_modules/date-fns/startOfDay.js
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/differenceInCalendarDays.js
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

// node_modules/date-fns/startOfISOWeekYear.js
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/date-fns/isSameDay.js
function isSameDay(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return +startOfDay(dateLeft_) === +startOfDay(dateRight_);
}

// node_modules/date-fns/isDate.js
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/date-fns/isValid.js
function isValid(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}

// node_modules/date-fns/startOfQuarter.js
function startOfQuarter(date, options) {
  const _date = toDate(date, options?.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3;
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/startOfMonth.js
function startOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/startOfYear.js
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/date-fns/locale/en-US/_lib/formatLong.js
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}

// node_modules/date-fns/locale/en-US/_lib/localize.js
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// node_modules/date-fns/locale/en-US/_lib/match.js
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// node_modules/date-fns/locale/en-US.js
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// node_modules/date-fns/getDayOfYear.js
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/date-fns/getISOWeek.js
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/getWeekYear.js
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfWeekYear.js
function startOfWeekYear(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/date-fns/getWeek.js
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/date-fns/_lib/format/lightFormatters.js
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// node_modules/date-fns/_lib/format/formatters.js
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// node_modules/date-fns/_lib/format/longFormatters.js
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// node_modules/date-fns/_lib/protectedTokens.js
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token))
    throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// node_modules/date-fns/format.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions2 = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken)
      return part.value;
    const token = part.value;
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/date-fns/isSameWeek.js
function isSameWeek(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return +startOfWeek(laterDate_, options) === +startOfWeek(earlierDate_, options);
}

// node_modules/date-fns/isSameMonth.js
function isSameMonth(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear() && laterDate_.getMonth() === earlierDate_.getMonth();
}

// node_modules/date-fns/isSameQuarter.js
function isSameQuarter(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return +startOfQuarter(dateLeft_) === +startOfQuarter(dateRight_);
}

// node_modules/date-fns/parseISO.js
function parseISO(argument, options) {
  const invalidDate = () => constructFrom(options?.in, NaN);
  const additionalDigits = options?.additionalDigits ?? 2;
  const dateStrings = splitDateString(argument);
  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(+date))
    return invalidDate();
  const timestamp = +date;
  let time = 0;
  let offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time))
      return invalidDate();
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset))
      return invalidDate();
  } else {
    const tmpDate = new Date(timestamp + time);
    const result = toDate(0, options?.in);
    result.setFullYear(
      tmpDate.getUTCFullYear(),
      tmpDate.getUTCMonth(),
      tmpDate.getUTCDate()
    );
    result.setHours(
      tmpDate.getUTCHours(),
      tmpDate.getUTCMinutes(),
      tmpDate.getUTCSeconds(),
      tmpDate.getUTCMilliseconds()
    );
    return result;
  }
  return toDate(timestamp + time + offset, options?.in);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length
      );
    }
  }
  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)"
  );
  const captures = dateString.match(regex);
  if (!captures)
    return { year: NaN, restDateString: "" };
  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null)
    return /* @__PURE__ */ new Date(NaN);
  const captures = dateString.match(dateRegex);
  if (!captures)
    return /* @__PURE__ */ new Date(NaN);
  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = /* @__PURE__ */ new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures)
    return NaN;
  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z")
    return 0;
  const captures = timezoneString.match(timezoneRegex);
  if (!captures)
    return 0;
  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = /* @__PURE__ */ new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// app/routes/_index.tsx
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
  import.meta.hot.lastModified = "1741070309757.5825";
}
function InsightItem({
  change,
  appReleases
}) {
  const getMetricLabel = (metric) => {
    switch (metric) {
      case "positive":
        return "positive sentiment";
      case "negative":
        return "negative sentiment";
      case "total":
        return "comment volume";
      case "featureRequests":
        return "feature requests";
      case "bugReports":
        return "bug reports";
    }
  };
  const changeText = change.isIncrease ? "increase" : "decrease";
  const changeValue = Math.abs(change.change);
  const formattedChange = change.metric === "positive" || change.metric === "negative" ? `${(changeValue * 100).toFixed(1)}%` : `${(changeValue * 100).toFixed(1)}%`;
  const isNearRelease = appReleases.some((release) => {
    const releaseDate = new Date(release.date);
    const periodDate = new Date(change.period);
    const diffTime = Math.abs(periodDate.getTime() - releaseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    return diffDays <= 14;
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-start space-x-2", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `flex-shrink-0 w-4 h-4 mt-0.5 rounded-full ${change.isIncrease ? change.metric === "negative" || change.metric === "bugReports" ? "bg-red-500" : "bg-green-500" : change.metric === "negative" || change.metric === "bugReports" ? "bg-green-500" : "bg-red-500"}` }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: [
        formattedChange,
        " ",
        changeText
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      " in ",
      getMetricLabel(change.metric),
      " during ",
      change.period,
      ".",
      isNearRelease && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1 text-blue-600 dark:text-blue-400", children: "May be related to recent app update." }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 63,
        columnNumber: 27
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 59,
    columnNumber: 10
  }, this);
}
_c = InsightItem;
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
  const location = useLocation();
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
  const [timeGranularity, setTimeGranularity] = (0, import_react.useState)("weekly");
  const [dateRange, setDateRange] = (0, import_react.useState)({
    start: null,
    end: null
  });
  const [showAllTime, setShowAllTime] = (0, import_react.useState)(true);
  const [visibleMetrics, setVisibleMetrics] = (0, import_react.useState)({
    positive: true,
    negative: true,
    neutral: true,
    total: true,
    featureRequests: true,
    bugReports: true
  });
  const [appReleases, setAppReleases] = (0, import_react.useState)([
    // Example releases - in a real app, these would be fetched from an API
    {
      date: "2023-12-15",
      version: "2.1.0",
      notes: "Major UI redesign"
    },
    {
      date: "2024-01-30",
      version: "2.2.0",
      notes: "New features added"
    },
    {
      date: "2024-03-10",
      version: "2.3.0",
      notes: "Bug fixes and performance improvements"
    }
  ]);
  const exportDropdownRef = (0, import_react.useRef)(null);
  const exportButtonRef = (0, import_react.useRef)(null);
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const hasData = fetcher.data && !("error" in fetcher.data) && fetcher.data.comments;
  const error = fetcher.data?.error || fetcher.data?.message;
  const timeframeOptions = (0, import_react.useMemo)(() => [{
    label: "Daily",
    value: "daily",
    groupingFn: startOfDay,
    formatFn: (date) => format(date, "MMM d, yyyy"),
    isSamePeriodFn: isSameDay
  }, {
    label: "Weekly",
    value: "weekly",
    groupingFn: startOfWeek,
    formatFn: (date) => `Week of ${format(date, "MMM d, yyyy")}`,
    isSamePeriodFn: isSameWeek
  }, {
    label: "Monthly",
    value: "monthly",
    groupingFn: startOfMonth,
    formatFn: (date) => format(date, "MMMM yyyy"),
    isSamePeriodFn: isSameMonth
  }, {
    label: "Quarterly",
    value: "quarterly",
    groupingFn: startOfQuarter,
    formatFn: (date) => `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`,
    isSamePeriodFn: isSameQuarter
  }], []);
  const currentTimeframe = (0, import_react.useMemo)(() => timeframeOptions.find((t) => t.value === timeGranularity) || timeframeOptions[1], [timeGranularity, timeframeOptions]);
  const trendData = (0, import_react.useMemo)(() => {
    if (!hasData || !fetcher.data?.comments)
      return [];
    const comments = fetcher.data.comments;
    const intentions = fetcher.data.intentions;
    const groupedData = /* @__PURE__ */ new Map();
    comments.forEach((comment) => {
      const commentDate = parseISO(comment.date);
      const periodStart = currentTimeframe.groupingFn(commentDate);
      const periodKey = format(periodStart, "yyyy-MM-dd");
      if (!groupedData.has(periodKey)) {
        groupedData.set(periodKey, {
          date: currentTimeframe.formatFn(periodStart),
          positive: 0,
          negative: 0,
          neutral: 0,
          total: 0,
          featureRequests: 0,
          bugReports: 0
        });
      }
      const dataPoint = groupedData.get(periodKey);
      dataPoint.total += 1;
      if (comment.sentiment === "positive")
        dataPoint.positive += 1;
      else if (comment.sentiment === "negative")
        dataPoint.negative += 1;
      else
        dataPoint.neutral += 1;
      if (intentions?.feature_request.some((c) => c.id === comment.id)) {
        dataPoint.featureRequests += 1;
      }
      if (intentions?.bug_report.some((c) => c.id === comment.id)) {
        dataPoint.bugReports += 1;
      }
    });
    return Array.from(groupedData.entries()).map(([key, value]) => ({
      ...value,
      rawDate: key
      // Keep the raw date for sorting
    })).sort((a, b) => a.rawDate.localeCompare(b.rawDate)).map(({
      rawDate,
      ...rest
    }) => rest);
  }, [hasData, fetcher.data, currentTimeframe]);
  const significantChanges = (0, import_react.useMemo)(() => {
    if (trendData.length < 2)
      return [];
    const changes = [];
    const thresholds = {
      positive: 0.2,
      // 20% change
      negative: 0.2,
      total: 0.3,
      // 30% change in volume
      featureRequests: 0.5,
      // 50% change
      bugReports: 0.5
    };
    for (let i = 1; i < trendData.length; i++) {
      const current = trendData[i];
      const previous = trendData[i - 1];
      if (previous.total < 5)
        continue;
      const metrics = ["positive", "negative", "total", "featureRequests", "bugReports"];
      for (const metric of metrics) {
        if (metric === "positive" || metric === "negative") {
          const currentPct = current[metric] / current.total;
          const previousPct = previous[metric] / previous.total;
          if (Math.abs(currentPct - previousPct) >= thresholds[metric]) {
            changes.push({
              period: current.date,
              metric,
              change: currentPct - previousPct,
              isIncrease: currentPct > previousPct
            });
          }
        } else {
          if (previous[metric] === 0)
            continue;
          const relativeChange = (current[metric] - previous[metric]) / previous[metric];
          if (Math.abs(relativeChange) >= thresholds[metric]) {
            changes.push({
              period: current.date,
              metric,
              change: relativeChange,
              isIncrease: relativeChange > 0
            });
          }
        }
      }
    }
    return changes;
  }, [trendData]);
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
  const handleExport = (format2, dataType) => {
    if (!fetcher.data?.comments)
      return;
    setIsExporting(true);
    try {
      const dataToExport = dataType === "filtered" ? getFilteredComments() : fetcher.data.comments;
      const appNameMatch = url.split("id=")[1]?.split("&")[0] || "play-store-comments";
      const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const fileName = `${appNameMatch}-${date}.${format2}`;
      let content = "";
      if (format2 === "json") {
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
      } else if (format2 === "csv") {
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
        type: format2 === "json" ? "application/json" : "text/csv"
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
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sidebar, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 430,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "p-4 sm:ml-64", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-4 mt-14", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Overview" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 436,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 dark:text-gray-400", children: "Analyze app reviews and get insights" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 439,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 435,
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
              lineNumber: 445,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5 text-gray-500 absolute left-3 top-2.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 460,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 459,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 444,
            columnNumber: 15
          }, this),
          hasData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { ref: exportButtonRef, onClick: () => setShowExportDropdown(!showExportDropdown), disabled: isExporting, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg inline-flex items-center", children: isExporting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 469,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 470,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 468,
                columnNumber: 25
              }, this),
              "Exporting..."
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 467,
              columnNumber: 36
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 101.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 475,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 474,
                columnNumber: 25
              }, this),
              "Export"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 473,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 466,
              columnNumber: 19
            }, this),
            showExportDropdown && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: exportDropdownRef, className: "absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-1", role: "menu", "aria-orientation": "vertical", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-medium border-b border-gray-200 dark:border-gray-700", children: "Export Format" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 484,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleExport("csv", "all"), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700", role: "menuitem", children: "CSV - All Data" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 487,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleExport("csv", "filtered"), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700", role: "menuitem", children: "CSV - Filtered Data" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 490,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleExport("json", "all"), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700", role: "menuitem", children: "JSON - All Data" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 493,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleExport("json", "filtered"), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700", role: "menuitem", children: "JSON - Filtered Data" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 496,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 483,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 482,
              columnNumber: 42
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 465,
            columnNumber: 27
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 443,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 434,
        columnNumber: 11
      }, this),
      location.pathname === "/" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-span-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: "playstore-url", className: "mb-2", children: "Play Store URL" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 511,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { id: "playstore-url", type: "url", placeholder: "https://play.google.com/store/apps/details?id=...", required: true, value: url, onChange: (e) => setUrl(e.target.value), color: "gray", helperText: "Enter your app's Play Store URL to analyze comments" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 514,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 510,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: "year", className: "mb-2", children: "Filter by Year" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 517,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { id: "year", value: year, onChange: (e) => setYear(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "All Years" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 521,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2024", children: "2024" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 522,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2023", children: "2023" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 523,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2022", children: "2022" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 524,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2021", children: "2021" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 525,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 520,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 516,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 509,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { type: "submit", disabled: isLoading, color: "blue", className: "h-[42px]", children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 533,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 534,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 532,
              columnNumber: 25
            }, this),
            "Processing..."
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 531,
            columnNumber: 34
          }, this) : "Analyze Comments" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 530,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 529,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 508,
          columnNumber: 15
        }, this),
        error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 p-4 rounded-lg mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5 text-red-400 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 545,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 544,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Error!" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 547,
            columnNumber: 21
          }, this),
          "\xA0",
          error
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 543,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 542,
          columnNumber: 25
        }, this),
        hasData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid md:grid-cols-4 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Total Comments" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 556,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "Since last week" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 557,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 555,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: totalComments }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 562,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 561,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 554,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Positive Sentiment" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 570,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: [
                  positivePercentage,
                  "%"
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 571,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 569,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: positiveCount }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 576,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 575,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 568,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Feature Requests" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 584,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "New" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 585,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 583,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: featureRequestCount }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 590,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 589,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 582,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Bug Reports" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 598,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "Critical" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 599,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 597,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-baseline", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: bugReportCount }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 604,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 603,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 596,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 553,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Top Keywords" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 614,
                columnNumber: 23
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
                lineNumber: 619,
                columnNumber: 25
              }, this)) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 615,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 613,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Sentiment Distribution" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 626,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-2xl font-bold text-green-600", children: positiveCount }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 629,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Positive" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 632,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 628,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-2xl font-bold text-yellow-600", children: neutralCount }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 637,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Neutral" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 640,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 636,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-2xl font-bold text-red-600", children: negativeCount }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 645,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Negative" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 648,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 644,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 627,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 625,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 612,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Trend Analysis" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 659,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm", value: timeGranularity, onChange: (e) => setTimeGranularity(e.target.value), children: timeframeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: option.value, children: option.label }, option.value, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 664,
                  columnNumber: 61
                }, this)) }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 663,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 662,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", className: "px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm", value: dateRange.start || "", onChange: (e) => {
                    setDateRange((prev) => ({
                      ...prev,
                      start: e.target.value
                    }));
                    setShowAllTime(false);
                  }, disabled: showAllTime }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 672,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-500 dark:text-gray-400", children: "to" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 679,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", className: "px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm", value: dateRange.end || "", onChange: (e) => {
                    setDateRange((prev) => ({
                      ...prev,
                      end: e.target.value
                    }));
                    setShowAllTime(false);
                  }, disabled: showAllTime }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 680,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-3 py-2 rounded-lg text-sm ${showAllTime ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`, onClick: () => setShowAllTime(!showAllTime), children: "All Time" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 687,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 671,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 660,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 658,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.positive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`, onClick: () => setVisibleMetrics((prev) => ({
                ...prev,
                positive: !prev.positive
              })), children: "Positive Sentiment" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 696,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.negative ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`, onClick: () => setVisibleMetrics((prev) => ({
                ...prev,
                negative: !prev.negative
              })), children: "Negative Sentiment" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 702,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.neutral ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`, onClick: () => setVisibleMetrics((prev) => ({
                ...prev,
                neutral: !prev.neutral
              })), children: "Neutral Sentiment" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 708,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.total ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`, onClick: () => setVisibleMetrics((prev) => ({
                ...prev,
                total: !prev.total
              })), children: "Total Comments" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 714,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.featureRequests ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`, onClick: () => setVisibleMetrics((prev) => ({
                ...prev,
                featureRequests: !prev.featureRequests
              })), children: "Feature Requests" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 720,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-3 py-1 rounded-full text-xs font-medium ${visibleMetrics.bugReports ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`, onClick: () => setVisibleMetrics((prev) => ({
                ...prev,
                bugReports: !prev.bugReports
              })), children: "Bug Reports" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 726,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 695,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-80 mt-6", children: trendData.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LineChart, { data: trendData, margin: {
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151", opacity: 0.1 }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 743,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, { dataKey: "date", stroke: "#6B7280", tick: {
                fill: "#6B7280"
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 744,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, { stroke: "#6B7280", tick: {
                fill: "#6B7280"
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 747,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { contentStyle: {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#E5E7EB",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }, formatter: (value, name) => {
                const formattedName = {
                  positive: "Positive Sentiment",
                  negative: "Negative Sentiment",
                  neutral: "Neutral Sentiment",
                  total: "Total Comments",
                  featureRequests: "Feature Requests",
                  bugReports: "Bug Reports"
                }[name] || name;
                return [value, formattedName];
              }, labelFormatter: (label) => `Period: ${label}` }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 750,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Legend, { formatter: (value) => {
                const formattedValues = {
                  positive: "Positive Sentiment",
                  negative: "Negative Sentiment",
                  neutral: "Neutral Sentiment",
                  total: "Total Comments",
                  featureRequests: "Feature Requests",
                  bugReports: "Bug Reports"
                };
                return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
                  color: "#6B7280"
                }, children: formattedValues[value] || value }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 775,
                  columnNumber: 30
                }, this);
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 766,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Brush, { dataKey: "date", height: 30, stroke: "#8884d8", fill: "rgba(136, 132, 216, 0.1)" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 779,
                columnNumber: 29
              }, this),
              appReleases.map((release, index) => {
                const releaseDate = parseISO(release.date);
                let closestPoint = null;
                let minDiff = Infinity;
                for (const point of trendData) {
                  const pointDate = new Date(point.date);
                  const diff = Math.abs(pointDate.getTime() - releaseDate.getTime());
                  if (diff < minDiff) {
                    minDiff = diff;
                    closestPoint = point;
                  }
                }
                if (!closestPoint)
                  return null;
                return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReferenceLine, { x: closestPoint.date, stroke: "#10B981", strokeDasharray: "3 3", label: {
                  value: `v${release.version}`,
                  position: "insideTopRight",
                  fill: "#10B981",
                  fontSize: 12
                } }, index, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 797,
                  columnNumber: 30
                }, this);
              }),
              significantChanges.map((change, index) => {
                const point = trendData.find((p) => p.date === change.period);
                if (!point)
                  return null;
                let color;
                if (change.metric === "positive") {
                  color = change.isIncrease ? "#10B981" : "#EF4444";
                } else if (change.metric === "negative") {
                  color = change.isIncrease ? "#EF4444" : "#10B981";
                } else if (change.metric === "total") {
                  color = "#3B82F6";
                } else if (change.metric === "featureRequests") {
                  color = "#8B5CF6";
                } else if (change.metric === "bugReports") {
                  color = "#F97316";
                }
                return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReferenceArea, { x1: point.date, x2: point.date, strokeOpacity: 0.3, fill: color, fillOpacity: 0.2 }, `${change.period}-${change.metric}-${index}`, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 824,
                  columnNumber: 30
                }, this);
              }),
              visibleMetrics.positive && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Line, { type: "monotone", dataKey: "positive", stroke: "#10B981", strokeWidth: 2, dot: {
                r: 4,
                fill: "#10B981"
              }, activeDot: {
                r: 6,
                fill: "#10B981"
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 828,
                columnNumber: 57
              }, this),
              visibleMetrics.negative && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Line, { type: "monotone", dataKey: "negative", stroke: "#EF4444", strokeWidth: 2, dot: {
                r: 4,
                fill: "#EF4444"
              }, activeDot: {
                r: 6,
                fill: "#EF4444"
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 835,
                columnNumber: 57
              }, this),
              visibleMetrics.neutral && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Line, { type: "monotone", dataKey: "neutral", stroke: "#F59E0B", strokeWidth: 2, dot: {
                r: 4,
                fill: "#F59E0B"
              }, activeDot: {
                r: 6,
                fill: "#F59E0B"
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 842,
                columnNumber: 56
              }, this),
              visibleMetrics.total && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Line, { type: "monotone", dataKey: "total", stroke: "#3B82F6", strokeWidth: 2, dot: {
                r: 4,
                fill: "#3B82F6"
              }, activeDot: {
                r: 6,
                fill: "#3B82F6"
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 849,
                columnNumber: 54
              }, this),
              visibleMetrics.featureRequests && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Line, { type: "monotone", dataKey: "featureRequests", stroke: "#8B5CF6", strokeWidth: 2, dot: {
                r: 4,
                fill: "#8B5CF6"
              }, activeDot: {
                r: 6,
                fill: "#8B5CF6"
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 856,
                columnNumber: 64
              }, this),
              visibleMetrics.bugReports && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Line, { type: "monotone", dataKey: "bugReports", stroke: "#F97316", strokeWidth: 2, dot: {
                r: 4,
                fill: "#F97316"
              }, activeDot: {
                r: 6,
                fill: "#F97316"
              } }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 863,
                columnNumber: 59
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 737,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 736,
              columnNumber: 47
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 dark:text-gray-400", children: hasData ? "Not enough data to display trends. Try analyzing more comments." : "Analyze comments to see trend data." }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 872,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 871,
              columnNumber: 50
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 735,
              columnNumber: 21
            }, this),
            trendData.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Key Insights" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 880,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: significantChanges.length > 0 ? significantChanges.slice(0, 3).map((change, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InsightItem, { change, appReleases }, index, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 884,
                columnNumber: 114
              }, this)) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "No significant changes detected in the current time period." }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 884,
                columnNumber: 187
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 883,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 879,
              columnNumber: 46
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 657,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Recent Comments" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 894,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowAllComments(true), className: "text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400", children: "View all" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 895,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 893,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: fetcher.data?.comments?.slice(0, 5).map((comment) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-600 dark:text-blue-200 font-medium", children: comment.userName.charAt(0) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 903,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 902,
                columnNumber: 29
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 901,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-900 dark:text-white", children: comment.userName }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 910,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-yellow-400 mr-1", children: "\u2605" }, void 0, false, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 914,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: comment.score }, void 0, false, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 915,
                      columnNumber: 33
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 913,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 909,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-1", children: comment.content }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 920,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: new Date(comment.date).toLocaleDateString() }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 923,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 908,
                columnNumber: 27
              }, this)
            ] }, comment.id, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 900,
              columnNumber: 75
            }, this)) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 899,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 892,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 551,
          columnNumber: 27
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 506,
        columnNumber: 40
      }, this) : location.pathname === "/history" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 dark:text-gray-400", children: "History feature coming soon..." }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 932,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 931,
        columnNumber: 54
      }, this) : null
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 432,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 431,
      columnNumber: 7
    }, this),
    showAllComments && hasData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 border-b border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "All Comments" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 942,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowAllComments(false), className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 945,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 944,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 943,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 941,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "search", className: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", placeholder: "Search in comments...", value: modalSearchTerm, onChange: (e) => setModalSearchTerm(e.target.value) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 951,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 950,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", value: sentimentFilter, onChange: (e) => setSentimentFilter(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "All Sentiments" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 954,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "positive", children: "Positive" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 955,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "neutral", children: "Neutral" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 956,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "negative", children: "Negative" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 957,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 953,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white", value: ratingFilter, onChange: (e) => setRatingFilter(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "All Ratings" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 960,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "\u2B50\u2B50\u2B50\u2B50\u2B50 (5)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 961,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "\u2B50\u2B50\u2B50\u2B50 (4)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 962,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "\u2B50\u2B50\u2B50 (3)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 963,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "\u2B50\u2B50 (2)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 964,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "\u2B50 (1)" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 965,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 959,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 949,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 940,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 overflow-y-auto flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: getFilteredComments().map((comment) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-600 dark:text-blue-200 font-medium", children: comment.userName.charAt(0) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 974,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 973,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 972,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-900 dark:text-white", children: comment.userName }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 981,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-yellow-400 mr-1", children: "\u2605" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 985,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: comment.score }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 986,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 984,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 980,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-1", children: comment.content }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 991,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: new Date(comment.date).toLocaleDateString() }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 995,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
              "\u{1F44D} ",
              comment.thumbsUp
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 998,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 994,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 979,
          columnNumber: 21
        }, this)
      ] }, comment.id, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 971,
        columnNumber: 55
      }, this)) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 970,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 969,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 939,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 938,
      columnNumber: 38
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 429,
    columnNumber: 10
  }, this);
}
_s(Index, "QQq0JwtCLvUQgw96pdMScTcKEFs=", false, function() {
  return [useLocation, useFetcher];
});
_c2 = Index;
var _c;
var _c2;
$RefreshReg$(_c, "InsightItem");
$RefreshReg$(_c2, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-7EHGZP45.js.map
