/*! Dates Library v1.1.3 [Sidi] */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var BixbyDurationUnit = {
    YEARS: "Years",
    MONTHS: "Months",
    DAYS: "Days",
    HOURS: "Hours",
    MINUTES: "Minutes",
    SECONDS: "Seconds",
    MILLIS: "Millis",
};
export function durationFromMilliseconds(milliseconds) {
    var duration = {
        periodDays: 0,
        periodHours: 0,
        periodMinutes: 0,
        periodSeconds: 0,
        periodMilliseconds: 0,
    };
    duration.periodMilliseconds = milliseconds % 1000;
    milliseconds = Math.floor(milliseconds / 1000);
    duration.periodSeconds = milliseconds % 60;
    milliseconds = Math.floor(milliseconds / 60);
    duration.periodMinutes = milliseconds % 60;
    milliseconds = Math.floor(milliseconds / 60);
    duration.periodHours = milliseconds % 24;
    milliseconds = Math.floor(milliseconds / 24);
    duration.periodDays = milliseconds;
    return duration;
}
var ZonedDateTime = (function () {
    function ZonedDateTime(timeZoneIdOrGeoPoint, millisecondsFromEpoch, subtractOffset, convertTimeZoneId) {
        var _a;
        if (ZonedDateTime._vivContext === undefined) {
            throw new Error("ZonedDateTime._vivContext is undefined. Call ZonedDateTime.setVivContext($vivContext) before initialization.");
        }
        if (typeof timeZoneIdOrGeoPoint === "object" &&
            "latitude" in timeZoneIdOrGeoPoint &&
            "longitude" in timeZoneIdOrGeoPoint) {
            throw new Error("ZonedDateTime not implemented using GeoPoint.");
        }
        this._timeZoneId =
            timeZoneIdOrGeoPoint !== null && timeZoneIdOrGeoPoint !== void 0 ? timeZoneIdOrGeoPoint : ZonedDateTime._vivContext.timezone;
        this._millisFromEpoch =
            (_a = millisecondsFromEpoch !== null && millisecondsFromEpoch !== void 0 ? millisecondsFromEpoch : ZonedDateTime._vivContext.testToday) !== null && _a !== void 0 ? _a : Date.now();
        this._date = ZonedDateTime._getDateWithTimeZone(this._timeZoneId, this._millisFromEpoch, subtractOffset,convertTimeZoneId);
    }
    ZonedDateTime.setVivContext = function (vivContext) {
        ZonedDateTime._vivContext = vivContext;
    };
    ZonedDateTime.now = function (timeZoneId) {
        var _a;
        return new ZonedDateTime(timeZoneId ? timeZoneId:ZonedDateTime._vivContext.timezone, (_a = ZonedDateTime._vivContext.testToday) !== null && _a !== void 0 ? _a : Date.now());
    };
    ZonedDateTime.of = function (timeZoneId, year, month, day, hour, minute, second, millisecond) {
        if (year === void 0) { year = 0; }
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        if (hour === void 0) { hour = 0; }
        if (minute === void 0) { minute = 0; }
        if (second === void 0) { second = 0; }
        if (millisecond === void 0) { millisecond = 0; }
        var date = ZonedDateTime._getDateWithTimeZone(timeZoneId, new Date(year, month - 1, day, hour, minute, second, millisecond).getTime(), true);
        return new ZonedDateTime(timeZoneId, date.getTime());
    };
    ZonedDateTime.fromDate = function (date) {
        var _a, _b;
        var currDate = ZonedDateTime._getCurrentDate();
        var newDate = ZonedDateTime._getDateWithTimeZone(ZonedDateTime._vivContext.timezone, new Date((_a = date === null || date === void 0 ? void 0 : date.year) !== null && _a !== void 0 ? _a : currDate.getFullYear(), (date === null || date === void 0 ? void 0 : date.month) ? date.month - 1 : currDate.getMonth() + 1, (_b = date === null || date === void 0 ? void 0 : date.day) !== null && _b !== void 0 ? _b : currDate.getDate(), currDate.getHours(), currDate.getMinutes(), currDate.getSeconds(), currDate.getMilliseconds()).getTime(), true);
        return new ZonedDateTime(ZonedDateTime._vivContext.timezone, newDate.getTime());
    };
    ZonedDateTime.fromDateTime = function (dateTime) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        var currDate = ZonedDateTime._getCurrentDate();
        var millisecondsFromEpoch = (_a = dateTime === null || dateTime === void 0 ? void 0 : dateTime.utcInstant) !== null && _a !== void 0 ? _a : new Date((_c = (_b = dateTime.date) === null || _b === void 0 ? void 0 : _b.year) !== null && _c !== void 0 ? _c : currDate.getFullYear(), ((_d = dateTime.date) === null || _d === void 0 ? void 0 : _d.month)
            ? dateTime.date.month - 1
            : currDate.getMonth() + 1, (_f = (_e = dateTime.date) === null || _e === void 0 ? void 0 : _e.day) !== null && _f !== void 0 ? _f : currDate.getDate(), (_h = (_g = dateTime.time) === null || _g === void 0 ? void 0 : _g.hour) !== null && _h !== void 0 ? _h : currDate.getHours(), (_k = (_j = dateTime.time) === null || _j === void 0 ? void 0 : _j.minute) !== null && _k !== void 0 ? _k : currDate.getMinutes(), (_m = (_l = dateTime.time) === null || _l === void 0 ? void 0 : _l.second) !== null && _m !== void 0 ? _m : currDate.getSeconds(), (_p = (_o = dateTime.time) === null || _o === void 0 ? void 0 : _o.millisecond) !== null && _p !== void 0 ? _p : currDate.getMilliseconds()).getTime();
        var newDate = ZonedDateTime._getDateWithTimeZone((_r = (_q = dateTime.time) === null || _q === void 0 ? void 0 : _q.timezone) !== null && _r !== void 0 ? _r : ZonedDateTime._vivContext.timezone, millisecondsFromEpoch, true);
        return new ZonedDateTime((_t = (_s = dateTime.time) === null || _s === void 0 ? void 0 : _s.timezone) !== null && _t !== void 0 ? _t : ZonedDateTime._vivContext.timezone, newDate.getTime());
    };
    ZonedDateTime._getCurrentDate = function () {
        return ZonedDateTime._vivContext.testToday
            ? new Date(ZonedDateTime._vivContext.testToday)
            : new Date();
    };
    ZonedDateTime._getDateWithTimeZone = function (timeZoneId, millisecondsFromEpoch, subtractOffset, convertTimeZoneId ) {
        var dateWithTimeZone = new Date().toLocaleDateString("en-GB", {
            timeZone: subtractOffset ? ZonedDateTime._vivContext.timezone : timeZoneId,
            timeZoneName: "short",
        });
        var timeZoneOffset = 0;
        if (dateWithTimeZone.includes("GMT")) {
            var _a = dateWithTimeZone.split("GMT"), _ = _a[0], timeZoneOffsetString = _a[1];
            timeZoneOffset = timeZoneOffsetString.includes(":")
                ? parseInt(timeZoneOffsetString.split(":")[0], 10) +
                    parseInt(timeZoneOffsetString.split(":")[1], 10) / 60
                : parseInt(timeZoneOffsetString, 10);
        }
        var date = new Date(millisecondsFromEpoch);

        if (subtractOffset ) {
          if (!convertTimeZoneId){
            timeZoneOffset = - timeZoneOffset;
          }else {
          timeZoneOffset = 0
          }
        }

        date.setMinutes(date.getMinutes() + timeZoneOffset * 60);
        return date;
    };
    ZonedDateTime._parseDateTimeString = function () {
        return function (input, timeZoneId, convertTimeZoneId) {
            var dateStr = input;
            if (input.includes("T") && (input.includes("+") || input.includes("-"))) {
                var _a = dateStr.split("T"), date = _a[0], timeWithOffset = _a[1];
                var _b = timeWithOffset.split(/[+-]/), time = _b[0], _ = _b[1];
                dateStr = "".concat(date, "T").concat(time);
            }
            var milliseconds = Date.parse(input);
            if (isNaN(milliseconds)) {
                throw new Error("Invalid date string. If you need pattern matching use a library like datetime or moment.js");
            }
            var millisInTimeZone = timeZoneId
                ? ZonedDateTime._getDateWithTimeZone(timeZoneId !== null && timeZoneId !== void 0 ? timeZoneId : ZonedDateTime._vivContext.timezone, milliseconds, convertTimeZoneId ? false : true, true).getTime()
                : milliseconds;
            return new ZonedDateTime(timeZoneId !== null && timeZoneId !== void 0 ? timeZoneId : ZonedDateTime._vivContext.timezone, millisInTimeZone, true, true);
        };
    };
    ZonedDateTime._getUtcInstant = function (timeZoneOffset, milliseconds) {
        timeZoneOffset = - timeZoneOffset*1000
        var date = new Date(milliseconds)
        date = new Date(date.valueOf() + timeZoneOffset)
        return date.valueOf()
    }
    ZonedDateTime.prototype.getMillisFromEpoch = function () {
        return ZonedDateTime._getUtcInstant(this.getTimeZoneOffset(), this._date);
    };
    ZonedDateTime.prototype.getTimeZoneId = function () {
        return this._timeZoneId;
    };
    ZonedDateTime.prototype.getDateTime = function () {
        return {
            date: {
                year: this.getYear(),
                month: this.getMonth(),
                day: this.getDay(),
            },
            time: {
                hour: this.getHour(),
                minute: this.getMinute(),
                second: this.getSecond(),
                millisecond: this.getMillisecond(),
                timezone: this.getTimeZoneId(),
            },
            utcInstant: this.getMillisFromEpoch(),
        };
    };
    ZonedDateTime.prototype.getDayOfWeek = function () {
        return this._date.getDay();
    };
    ZonedDateTime.prototype.getYear = function () {
        return this._date.getFullYear();
    };
    ZonedDateTime.prototype.getMonth = function () {
        return this._date.getMonth() + 1;
    };
    ZonedDateTime.prototype.getDay = function () {
        return this._date.getDate();
    };
    ZonedDateTime.prototype.getHour = function () {
        return this._date.getHours();
    };
    ZonedDateTime.prototype.getMinute = function () {
        return this._date.getMinutes();
    };
    ZonedDateTime.prototype.getSecond = function () {
        return this._date.getSeconds();
    };
    ZonedDateTime.prototype.getMillisecond = function () {
        return this._date.getMilliseconds();
    };
    ZonedDateTime.prototype.getTimeZoneOffset = function () {
        var _a;
        var options = {
            timeZone: this._timeZoneId,
            timeZoneName: "short",
        };
        var formatter = new Intl.DateTimeFormat("en-GB", options);
        var timeZoneOffset = (_a = formatter
            .formatToParts(this._date)
            .find(function (part) { return part.type === "timeZoneName"; })) === null || _a === void 0 ? void 0 : _a.value;
        if (timeZoneOffset === undefined || timeZoneOffset === "UTC") {
            return 0;
        }
        var timeZoneOffsetValue = timeZoneOffset.split("GMT")[1];
        var timeZoneOffsetHours = timeZoneOffsetValue.includes(":")
            ? parseInt(timeZoneOffsetValue.split(":")[0], 10) +
                parseInt(timeZoneOffsetValue.split(":")[1], 10) / 60
            : parseInt(timeZoneOffsetValue, 10);
        return timeZoneOffsetHours * 60 * 60;
    };
    ZonedDateTime.prototype.isDST = function () {
        var janOffset = new Date(this._date.getFullYear(), 0, 1).getTimezoneOffset();
        var julOffset = new Date(this._date.getFullYear(), 6, 1).getTimezoneOffset();
        return Math.max(janOffset, julOffset) !== this._date.getTimezoneOffset();
    };
    ZonedDateTime.prototype.withYear = function (year) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setFullYear(year);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.withMonth = function (month) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMonth(month - 1);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.withDay = function (day) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setDate(day);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.withHour = function (hour) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setHours(hour);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.withMinute = function (minute) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMinutes(minute);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.withSecond = function (second) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setSeconds(second);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.withMillisecond = function (millisecond) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMilliseconds(millisecond);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.withZoneSameInstant = function (timeZoneId) {
        return new ZonedDateTime(timeZoneId, this._date.getTime(),true,false);
    };
    ZonedDateTime.prototype.withZoneSameLocal = function (timeZoneId) {
        return new ZonedDateTime(timeZoneId, this._date.getTime());
    };
    ZonedDateTime.prototype.plusYears = function (years) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setFullYear(this._date.getFullYear() + years);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.plusMonths = function (months) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMonth(this._date.getMonth() + months);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.plusDays = function (days) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setDate(this._date.getDate() + days);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.plusHours = function (hours) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setHours(this._date.getHours() + hours);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime(), true, true);
    };
    ZonedDateTime.prototype.plusMinutes = function (minutes) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMinutes(this._date.getMinutes() + minutes);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.plusSeconds = function (seconds) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setSeconds(this._date.getSeconds() + seconds);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime(), true, true);
    };
    ZonedDateTime.prototype.plusMilliseconds = function (milliseconds) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMilliseconds(this._date.getMilliseconds() + milliseconds);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.plusDuration = function (duration) {
        var newDate = new Date(this.getMillisFromEpoch());
        if (duration.periodYears) {
            newDate.setFullYear(this._date.getFullYear() + duration.periodYears);
        }
        if (duration.periodMonths) {
            newDate.setMonth(this._date.getMonth() + duration.periodMonths);
        }
        if (duration.periodDays) {
            newDate.setDate(this._date.getDate() + duration.periodDays);
        }
        if (duration.periodHours) {
            newDate.setHours(this._date.getHours() + duration.periodHours);
        }
        if (duration.periodMinutes) {
            newDate.setMinutes(this._date.getMinutes() + duration.periodMinutes);
        }
        if (duration.periodSeconds) {
            newDate.setMilliseconds(this._date.getSeconds() + duration.periodSeconds);
        }
        if (duration.periodMilliseconds) {
            newDate.setMilliseconds(this._date.getMilliseconds() + duration.periodMilliseconds);
        }
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.minusYears = function (years) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setFullYear(this._date.getFullYear() - years);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.minusMonths = function (months) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMonth(this._date.getMonth() - months);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.minusDays = function (days) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setDate(this._date.getDate() - days);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.minusHours = function (hours) {
        var newDate = this._date;
        newDate.setHours(this._date.getHours() - hours);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime(), true, true);
    };
    ZonedDateTime.prototype.minusMinutes = function (minutes) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMinutes(this._date.getMinutes() - minutes);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.minusSeconds = function (seconds) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setSeconds(this._date.getSeconds() - seconds);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.minusMilliseconds = function (milliseconds) {
        var newDate = new Date(this.getMillisFromEpoch());
        newDate.setMilliseconds(this._date.getMilliseconds() - milliseconds);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.minusDuration = function (duration) {
        var newDate = new Date(this.getMillisFromEpoch());
        if (duration.periodYears) {
            newDate.setFullYear(this._date.getFullYear() - duration.periodYears);
        }
        if (duration.periodMonths) {
            newDate.setMonth(this._date.getMonth() - duration.periodMonths);
        }
        if (duration.periodDays) {
            newDate.setDate(this._date.getDate() - duration.periodDays);
        }
        if (duration.periodHours) {
            newDate.setHours(this._date.getHours() - duration.periodHours);
        }
        if (duration.periodMinutes) {
            newDate.setMinutes(this._date.getMinutes() - duration.periodMinutes);
        }
        if (duration.periodSeconds) {
            newDate.setMilliseconds(this._date.getSeconds() - duration.periodSeconds);
        }
        if (duration.periodMilliseconds) {
            newDate.setMilliseconds(this._date.getMilliseconds() - duration.periodMilliseconds);
        }
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime());
    };
    ZonedDateTime.prototype.atStartOfDay = function () {
        var newDate = this._date;
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime(), true, true);
    };
    ZonedDateTime.prototype.atEndOfDay = function () {
        var newDate = this._date;
        newDate.setHours(23);
        newDate.setMinutes(59);
        newDate.setSeconds(59);
        newDate.setMilliseconds(999);
        return new ZonedDateTime(this.getTimeZoneId(), newDate.getTime(), true, true);
    };
    ZonedDateTime.prototype.compareTo = function (other) {
        var timeDiff = this._date.getTime() - other._date.getTime();
        return timeDiff === 0 ? 0 : timeDiff > 0 ? 1 : -1;
    };
    ZonedDateTime.prototype.isEqualTo = function (other) {
        return this._date.getTime() === other._date.getTime();
    };
    ZonedDateTime.prototype.isBefore = function (other) {
        return this._date.getTime() < other._date.getTime();
    };
    ZonedDateTime.prototype.isBeforeOrEqualTo = function (other) {
        return this._date.getTime() <= other._date.getTime();
    };
    ZonedDateTime.prototype.isAfter = function (other) {
        return this._date.getTime() > other._date.getTime();
    };
    ZonedDateTime.prototype.isAfterOrEqualTo = function (other) {
        return this._date.getTime() >= other._date.getTime();
    };
    ZonedDateTime.prototype.durationUntil = function (other, unit) {
        var duration = {};
        var timeDiff = other._date.getTime() - this._date.getTime();
        var periodYear = 1000 * 60 * 60 * 24 * 365;
        var periodMonth = 1000 * 60 * 60 * 24 * 30;
        var periodDay = 1000 * 60 * 60 * 24;
        var periodHour = 1000 * 60 * 60;
        var periodMinute = 1000 * 60;
        var periodSecond = 1000;
        switch (unit) {
            case BixbyDurationUnit.YEARS:
                duration.periodYears = Math.floor(timeDiff / periodYear);
                return duration;
            case BixbyDurationUnit.MONTHS:
                duration.periodMonths = Math.floor(timeDiff / periodMonth);
                return duration;
            case BixbyDurationUnit.DAYS:
                duration.periodDays = Math.floor(timeDiff / periodDay);
                return duration;
            case BixbyDurationUnit.HOURS:
                duration.periodHours = Math.floor(timeDiff / periodHour);
                return duration;
            case BixbyDurationUnit.MINUTES:
                duration.periodMinutes = Math.floor(timeDiff / periodMinute);
                return duration;
            case BixbyDurationUnit.SECONDS:
                duration.periodSeconds = Math.floor(timeDiff / periodSecond);
                return duration;
            case BixbyDurationUnit.MILLIS:
                duration.periodMilliseconds = timeDiff;
                return duration;
            default:
                var timeRemaining = timeDiff;
                var periodYears = Math.floor(timeRemaining / periodYear);
                timeRemaining -= periodYears * periodYear;
                var periodMonths = Math.floor(timeRemaining / periodMonth);
                timeRemaining -= periodMonths * periodMonth;
                var periodDays = Math.floor(timeRemaining / periodDay);
                timeRemaining -= periodDays * periodDay;
                var periodHours = Math.floor(timeRemaining / periodHour);
                timeRemaining -= periodHours * periodHour;
                var periodMinutes = Math.floor(timeRemaining / periodMinute);
                timeRemaining -= periodMinutes * periodMinute;
                var periodSeconds = Math.floor(timeRemaining / periodSecond);
                timeRemaining -= periodSeconds * periodSecond;
                var periodMilliseconds = timeRemaining;
                duration.periodYears = periodYears;
                duration.periodMonths = periodMonths;
                duration.periodDays = periodDays;
                duration.periodHours = periodHours;
                duration.periodMinutes = periodMinutes;
                duration.periodSeconds = periodSeconds;
                duration.periodMilliseconds = periodMilliseconds;
        }
        return duration;
    };
    ZonedDateTime.prototype.clone = function () {
        return new ZonedDateTime(this.getTimeZoneId(), this.getMillisFromEpoch());
    };
    ZonedDateTime.prototype.toIsoString = function () {
        return this._date.toISOString();
    };
    ZonedDateTime.prototype.toString = function () {
        return this._date.toString();
    };
    ZonedDateTime.prototype.toJSON = function () {
        return {
            date: {
                year: this._date.getFullYear(),
                month: this._date.getMonth() + 1,
                day: this._date.getDate(),
            },
            time: {
                hour: this._date.getHours(),
                minute: this._date.getMinutes(),
                second: this._date.getSeconds(),
                millisecond: this._date.getMilliseconds(),
                timezone: this._timeZoneId,
            },
            utcInstant: this._date.getTime(),
        };
    };
    ZonedDateTime.prototype.format = function (options, locale) {
        if (typeof options === "string") {
            throw new Error("This function supports passing object Intl.DateTimeFormatOptions. Pattern as a string not supported. For string pattern matching use a library like datetime or moment.js.");
        }
        if (options) {
            var formatter = new Intl.DateTimeFormat(locale !== null && locale !== void 0 ? locale : ZonedDateTime._vivContext.locale, __assign({ timeZone: this._timeZoneId }, options));
            return formatter.format(new Date(this._millisFromEpoch));
        }
        else {
            return this._date.toISOString();
        }
    };
    ZonedDateTime.parseDate = ZonedDateTime._parseDateTimeString();
    ZonedDateTime.parseTime = ZonedDateTime._parseDateTimeString();
    ZonedDateTime.parseDateTime = ZonedDateTime._parseDateTimeString();
    return ZonedDateTime;
}());
export default ZonedDateTime;