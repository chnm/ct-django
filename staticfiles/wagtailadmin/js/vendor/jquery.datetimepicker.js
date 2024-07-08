/*! For license information please see jquery.datetimepicker.js.LICENSE.txt */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.DateFormatter = t());
})("undefined" != typeof self ? self : this, function () {
  var e, t;
  return (
    (t = {
      DAY: 864e5,
      HOUR: 3600,
      defaults: {
        dateSettings: {
          days: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          months: [
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
            "December",
          ],
          monthsShort: [
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
            "Dec",
          ],
          meridiem: ["AM", "PM"],
          ordinal: function (e) {
            var t = e % 10,
              a = { 1: "st", 2: "nd", 3: "rd" };
            return 1 !== Math.floor((e % 100) / 10) && a[t] ? a[t] : "th";
          },
        },
        separators: /[ \-+\/.:@]/g,
        validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
        intParts: /[djwNzmnyYhHgGis]/g,
        tzParts:
          /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        tzClip: /[^-+\dA-Z]/g,
      },
      getInt: function (e, t) {
        return parseInt(e, t || 10);
      },
      compare: function (e, t) {
        return (
          "string" == typeof e &&
          "string" == typeof t &&
          e.toLowerCase() === t.toLowerCase()
        );
      },
      lpad: function (e, a, n) {
        var r = e.toString();
        return (n = n || "0"), r.length < a ? t.lpad(n + r, a) : r;
      },
      merge: function (e) {
        var a, n;
        for (e = e || {}, a = 1; a < arguments.length; a++)
          if ((n = arguments[a]))
            for (var r in n)
              n.hasOwnProperty(r) &&
                ("object" == typeof n[r] ? t.merge(e[r], n[r]) : (e[r] = n[r]));
        return e;
      },
      getIndex: function (e, t) {
        for (var a = 0; a < t.length; a++)
          if (t[a].toLowerCase() === e.toLowerCase()) return a;
        return -1;
      },
    }),
    ((e = function (e) {
      var a = this,
        n = t.merge(t.defaults, e);
      (a.dateSettings = n.dateSettings),
        (a.separators = n.separators),
        (a.validParts = n.validParts),
        (a.intParts = n.intParts),
        (a.tzParts = n.tzParts),
        (a.tzClip = n.tzClip);
    }).prototype = {
      constructor: e,
      getMonth: function (e) {
        var a;
        return (
          0 === (a = t.getIndex(e, this.dateSettings.monthsShort) + 1) &&
            (a = t.getIndex(e, this.dateSettings.months) + 1),
          a
        );
      },
      parseDate: function (e, a) {
        var n,
          r,
          o,
          i,
          s,
          d,
          u,
          l,
          f,
          c,
          m = this,
          h = !1,
          g = !1,
          p = m.dateSettings,
          D = {
            date: null,
            year: null,
            month: null,
            day: null,
            hour: 0,
            min: 0,
            sec: 0,
          };
        if (!e) return null;
        if (e instanceof Date) return e;
        if ("U" === a) return (o = t.getInt(e)) ? new Date(1e3 * o) : e;
        switch (typeof e) {
          case "number":
            return new Date(e);
          case "string":
            break;
          default:
            return null;
        }
        if (!(n = a.match(m.validParts)) || 0 === n.length)
          throw new Error("Invalid date format definition.");
        for (o = n.length - 1; o >= 0; o--) "S" === n[o] && n.splice(o, 1);
        for (
          r = e.replace(m.separators, "\0").split("\0"), o = 0;
          o < r.length;
          o++
        )
          switch (((i = r[o]), (s = t.getInt(i)), n[o])) {
            case "y":
            case "Y":
              if (!s) return null;
              (f = i.length),
                (D.year = 2 === f ? t.getInt((70 > s ? "20" : "19") + i) : s),
                (h = !0);
              break;
            case "m":
            case "n":
            case "M":
            case "F":
              if (isNaN(s)) {
                if (!((d = m.getMonth(i)) > 0)) return null;
                D.month = d;
              } else {
                if (!(s >= 1 && 12 >= s)) return null;
                D.month = s;
              }
              h = !0;
              break;
            case "d":
            case "j":
              if (!(s >= 1 && 31 >= s)) return null;
              (D.day = s), (h = !0);
              break;
            case "g":
            case "h":
              if (
                ((c =
                  r[
                    (u =
                      n.indexOf("a") > -1
                        ? n.indexOf("a")
                        : n.indexOf("A") > -1
                        ? n.indexOf("A")
                        : -1)
                  ]),
                -1 !== u)
              )
                (l = t.compare(c, p.meridiem[0])
                  ? 0
                  : t.compare(c, p.meridiem[1])
                  ? 12
                  : -1),
                  s >= 1 && 12 >= s && -1 !== l
                    ? (D.hour = s % 12 == 0 ? l : s + l)
                    : s >= 0 && 23 >= s && (D.hour = s);
              else {
                if (!(s >= 0 && 23 >= s)) return null;
                D.hour = s;
              }
              g = !0;
              break;
            case "G":
            case "H":
              if (!(s >= 0 && 23 >= s)) return null;
              (D.hour = s), (g = !0);
              break;
            case "i":
              if (!(s >= 0 && 59 >= s)) return null;
              (D.min = s), (g = !0);
              break;
            case "s":
              if (!(s >= 0 && 59 >= s)) return null;
              (D.sec = s), (g = !0);
          }
        if (!0 === h) {
          var y = D.year || 0,
            v = D.month ? D.month - 1 : 0,
            b = D.day || 1;
          D.date = new Date(y, v, b, D.hour, D.min, D.sec, 0);
        } else {
          if (!0 !== g) return null;
          D.date = new Date(0, 0, 0, D.hour, D.min, D.sec, 0);
        }
        return D.date;
      },
      guessDate: function (e, a) {
        if ("string" != typeof e) return e;
        var n,
          r,
          o,
          i,
          s,
          d,
          u = e.replace(this.separators, "\0").split("\0"),
          l = a.match(this.validParts),
          f = new Date(),
          c = 0;
        if (!/^[djmn]/g.test(l[0])) return e;
        for (o = 0; o < u.length; o++) {
          if (((c = 2), (s = u[o]), (d = t.getInt(s.substr(0, 2))), isNaN(d)))
            return null;
          switch (o) {
            case 0:
              "m" === l[0] || "n" === l[0] ? f.setMonth(d - 1) : f.setDate(d);
              break;
            case 1:
              "m" === l[0] || "n" === l[0] ? f.setDate(d) : f.setMonth(d - 1);
              break;
            case 2:
              if (
                ((r = f.getFullYear()),
                (c = 4 > (n = s.length) ? n : 4),
                !(r = t.getInt(
                  4 > n ? r.toString().substr(0, 4 - n) + s : s.substr(0, 4),
                )))
              )
                return null;
              f.setFullYear(r);
              break;
            case 3:
              f.setHours(d);
              break;
            case 4:
              f.setMinutes(d);
              break;
            case 5:
              f.setSeconds(d);
          }
          (i = s.substr(c)).length > 0 && u.splice(o + 1, 0, i);
        }
        return f;
      },
      parseFormat: function (e, a) {
        var n,
          r = this,
          o = r.dateSettings,
          i = /\\?(.?)/gi,
          s = function (e, t) {
            return n[e] ? n[e]() : t;
          };
        return (
          (n = {
            d: function () {
              return t.lpad(n.j(), 2);
            },
            D: function () {
              return o.daysShort[n.w()];
            },
            j: function () {
              return a.getDate();
            },
            l: function () {
              return o.days[n.w()];
            },
            N: function () {
              return n.w() || 7;
            },
            w: function () {
              return a.getDay();
            },
            z: function () {
              var e = new Date(n.Y(), n.n() - 1, n.j()),
                a = new Date(n.Y(), 0, 1);
              return Math.round((e - a) / t.DAY);
            },
            W: function () {
              var e = new Date(n.Y(), n.n() - 1, n.j() - n.N() + 3),
                a = new Date(e.getFullYear(), 0, 4);
              return t.lpad(1 + Math.round((e - a) / t.DAY / 7), 2);
            },
            F: function () {
              return o.months[a.getMonth()];
            },
            m: function () {
              return t.lpad(n.n(), 2);
            },
            M: function () {
              return o.monthsShort[a.getMonth()];
            },
            n: function () {
              return a.getMonth() + 1;
            },
            t: function () {
              return new Date(n.Y(), n.n(), 0).getDate();
            },
            L: function () {
              var e = n.Y();
              return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0 ? 1 : 0;
            },
            o: function () {
              var e = n.n(),
                t = n.W();
              return (
                n.Y() + (12 === e && 9 > t ? 1 : 1 === e && t > 9 ? -1 : 0)
              );
            },
            Y: function () {
              return a.getFullYear();
            },
            y: function () {
              return n.Y().toString().slice(-2);
            },
            a: function () {
              return n.A().toLowerCase();
            },
            A: function () {
              var e = n.G() < 12 ? 0 : 1;
              return o.meridiem[e];
            },
            B: function () {
              var e = a.getUTCHours() * t.HOUR,
                n = 60 * a.getUTCMinutes(),
                r = a.getUTCSeconds();
              return t.lpad(Math.floor((e + n + r + t.HOUR) / 86.4) % 1e3, 3);
            },
            g: function () {
              return n.G() % 12 || 12;
            },
            G: function () {
              return a.getHours();
            },
            h: function () {
              return t.lpad(n.g(), 2);
            },
            H: function () {
              return t.lpad(n.G(), 2);
            },
            i: function () {
              return t.lpad(a.getMinutes(), 2);
            },
            s: function () {
              return t.lpad(a.getSeconds(), 2);
            },
            u: function () {
              return t.lpad(1e3 * a.getMilliseconds(), 6);
            },
            e: function () {
              return (
                /\((.*)\)/.exec(String(a))[1] || "Coordinated Universal Time"
              );
            },
            I: function () {
              return new Date(n.Y(), 0) - Date.UTC(n.Y(), 0) !=
                new Date(n.Y(), 6) - Date.UTC(n.Y(), 6)
                ? 1
                : 0;
            },
            O: function () {
              var e = a.getTimezoneOffset(),
                n = Math.abs(e);
              return (
                (e > 0 ? "-" : "+") +
                t.lpad(100 * Math.floor(n / 60) + (n % 60), 4)
              );
            },
            P: function () {
              var e = n.O();
              return e.substr(0, 3) + ":" + e.substr(3, 2);
            },
            T: function () {
              return (
                (String(a).match(r.tzParts) || [""])
                  .pop()
                  .replace(r.tzClip, "") || "UTC"
              );
            },
            Z: function () {
              return 60 * -a.getTimezoneOffset();
            },
            c: function () {
              return "Y-m-d\\TH:i:sP".replace(i, s);
            },
            r: function () {
              return "D, d M Y H:i:s O".replace(i, s);
            },
            U: function () {
              return a.getTime() / 1e3 || 0;
            },
          }),
          s(e, e)
        );
      },
      formatDate: function (e, a) {
        var n,
          r,
          o,
          i,
          s,
          d = this,
          u = "";
        if ("string" == typeof e && !(e = d.parseDate(e, a))) return null;
        if (e instanceof Date) {
          for (o = a.length, n = 0; o > n; n++)
            "S" !== (s = a.charAt(n)) &&
              "\\" !== s &&
              (n > 0 && "\\" === a.charAt(n - 1)
                ? (u += s)
                : ((i = d.parseFormat(s, e)),
                  n !== o - 1 &&
                    d.intParts.test(s) &&
                    "S" === a.charAt(n + 1) &&
                    ((r = t.getInt(i) || 0), (i += d.dateSettings.ordinal(r))),
                  (u += i)));
          return u;
        }
        return "";
      },
    }),
    e
  );
});
var datetimepickerFactory = function (e) {
  "use strict";
  var t = {
      i18n: {
        ar: {
          months: [
            "كانون الثاني",
            "شباط",
            "آذار",
            "نيسان",
            "مايو",
            "حزيران",
            "تموز",
            "آب",
            "أيلول",
            "تشرين الأول",
            "تشرين الثاني",
            "كانون الأول",
          ],
          dayOfWeekShort: ["ن", "ث", "ع", "خ", "ج", "س", "ح"],
          dayOfWeek: [
            "الأحد",
            "الاثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت",
            "الأحد",
          ],
        },
        ro: {
          months: [
            "Ianuarie",
            "Februarie",
            "Martie",
            "Aprilie",
            "Mai",
            "Iunie",
            "Iulie",
            "August",
            "Septembrie",
            "Octombrie",
            "Noiembrie",
            "Decembrie",
          ],
          dayOfWeekShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
          dayOfWeek: [
            "Duminică",
            "Luni",
            "Marţi",
            "Miercuri",
            "Joi",
            "Vineri",
            "Sâmbătă",
          ],
        },
        id: {
          months: [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ],
          dayOfWeekShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
          dayOfWeek: [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
          ],
        },
        is: {
          months: [
            "Janúar",
            "Febrúar",
            "Mars",
            "Apríl",
            "Maí",
            "Júní",
            "Júlí",
            "Ágúst",
            "September",
            "Október",
            "Nóvember",
            "Desember",
          ],
          dayOfWeekShort: ["Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"],
          dayOfWeek: [
            "Sunnudagur",
            "Mánudagur",
            "Þriðjudagur",
            "Miðvikudagur",
            "Fimmtudagur",
            "Föstudagur",
            "Laugardagur",
          ],
        },
        bg: {
          months: [
            "Януари",
            "Февруари",
            "Март",
            "Април",
            "Май",
            "Юни",
            "Юли",
            "Август",
            "Септември",
            "Октомври",
            "Ноември",
            "Декември",
          ],
          dayOfWeekShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          dayOfWeek: [
            "Неделя",
            "Понеделник",
            "Вторник",
            "Сряда",
            "Четвъртък",
            "Петък",
            "Събота",
          ],
        },
        fa: {
          months: [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
          ],
          dayOfWeekShort: [
            "یکشنبه",
            "دوشنبه",
            "سه شنبه",
            "چهارشنبه",
            "پنجشنبه",
            "جمعه",
            "شنبه",
          ],
          dayOfWeek: [
            "یک‌شنبه",
            "دوشنبه",
            "سه‌شنبه",
            "چهارشنبه",
            "پنج‌شنبه",
            "جمعه",
            "شنبه",
            "یک‌شنبه",
          ],
        },
        ru: {
          months: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
          ],
          dayOfWeekShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          dayOfWeek: [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
          ],
        },
        uk: {
          months: [
            "Січень",
            "Лютий",
            "Березень",
            "Квітень",
            "Травень",
            "Червень",
            "Липень",
            "Серпень",
            "Вересень",
            "Жовтень",
            "Листопад",
            "Грудень",
          ],
          dayOfWeekShort: ["Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"],
          dayOfWeek: [
            "Неділя",
            "Понеділок",
            "Вівторок",
            "Середа",
            "Четвер",
            "П'ятниця",
            "Субота",
          ],
        },
        en: {
          months: [
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
            "December",
          ],
          dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        el: {
          months: [
            "Ιανουάριος",
            "Φεβρουάριος",
            "Μάρτιος",
            "Απρίλιος",
            "Μάιος",
            "Ιούνιος",
            "Ιούλιος",
            "Αύγουστος",
            "Σεπτέμβριος",
            "Οκτώβριος",
            "Νοέμβριος",
            "Δεκέμβριος",
          ],
          dayOfWeekShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
          dayOfWeek: [
            "Κυριακή",
            "Δευτέρα",
            "Τρίτη",
            "Τετάρτη",
            "Πέμπτη",
            "Παρασκευή",
            "Σάββατο",
          ],
        },
        de: {
          months: [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember",
          ],
          dayOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
          dayOfWeek: [
            "Sonntag",
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag",
          ],
        },
        nl: {
          months: [
            "januari",
            "februari",
            "maart",
            "april",
            "mei",
            "juni",
            "juli",
            "augustus",
            "september",
            "oktober",
            "november",
            "december",
          ],
          dayOfWeekShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
          dayOfWeek: [
            "zondag",
            "maandag",
            "dinsdag",
            "woensdag",
            "donderdag",
            "vrijdag",
            "zaterdag",
          ],
        },
        tr: {
          months: [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık",
          ],
          dayOfWeekShort: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"],
          dayOfWeek: [
            "Pazar",
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
          ],
        },
        fr: {
          months: [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ],
          dayOfWeekShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
          dayOfWeek: [
            "dimanche",
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi",
          ],
        },
        es: {
          months: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          dayOfWeekShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
          dayOfWeek: [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
          ],
        },
        th: {
          months: [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
          ],
          dayOfWeekShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
          dayOfWeek: [
            "อาทิตย์",
            "จันทร์",
            "อังคาร",
            "พุธ",
            "พฤหัส",
            "ศุกร์",
            "เสาร์",
            "อาทิตย์",
          ],
        },
        pl: {
          months: [
            "styczeń",
            "luty",
            "marzec",
            "kwiecień",
            "maj",
            "czerwiec",
            "lipiec",
            "sierpień",
            "wrzesień",
            "październik",
            "listopad",
            "grudzień",
          ],
          dayOfWeekShort: ["nd", "pn", "wt", "śr", "cz", "pt", "sb"],
          dayOfWeek: [
            "niedziela",
            "poniedziałek",
            "wtorek",
            "środa",
            "czwartek",
            "piątek",
            "sobota",
          ],
        },
        pt: {
          months: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ],
          dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
          dayOfWeek: [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
          ],
        },
        ch: {
          months: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
        },
        se: {
          months: [
            "Januari",
            "Februari",
            "Mars",
            "April",
            "Maj",
            "Juni",
            "Juli",
            "Augusti",
            "September",
            "Oktober",
            "November",
            "December",
          ],
          dayOfWeekShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
        },
        km: {
          months: [
            "មករា​",
            "កុម្ភៈ",
            "មិនា​",
            "មេសា​",
            "ឧសភា​",
            "មិថុនា​",
            "កក្កដា​",
            "សីហា​",
            "កញ្ញា​",
            "តុលា​",
            "វិច្ឆិកា",
            "ធ្នូ​",
          ],
          dayOfWeekShort: [
            "អាទិ​",
            "ច័ន្ទ​",
            "អង្គារ​",
            "ពុធ​",
            "ព្រហ​​",
            "សុក្រ​",
            "សៅរ៍",
          ],
          dayOfWeek: [
            "អាទិត្យ​",
            "ច័ន្ទ​",
            "អង្គារ​",
            "ពុធ​",
            "ព្រហស្បតិ៍​",
            "សុក្រ​",
            "សៅរ៍",
          ],
        },
        kr: {
          months: [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
          ],
          dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
          dayOfWeek: [
            "일요일",
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
          ],
        },
        it: {
          months: [
            "Gennaio",
            "Febbraio",
            "Marzo",
            "Aprile",
            "Maggio",
            "Giugno",
            "Luglio",
            "Agosto",
            "Settembre",
            "Ottobre",
            "Novembre",
            "Dicembre",
          ],
          dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
          dayOfWeek: [
            "Domenica",
            "Lunedì",
            "Martedì",
            "Mercoledì",
            "Giovedì",
            "Venerdì",
            "Sabato",
          ],
        },
        da: {
          months: [
            "Januar",
            "Februar",
            "Marts",
            "April",
            "Maj",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "December",
          ],
          dayOfWeekShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
          dayOfWeek: [
            "søndag",
            "mandag",
            "tirsdag",
            "onsdag",
            "torsdag",
            "fredag",
            "lørdag",
          ],
        },
        no: {
          months: [
            "Januar",
            "Februar",
            "Mars",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Desember",
          ],
          dayOfWeekShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
          dayOfWeek: [
            "Søndag",
            "Mandag",
            "Tirsdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lørdag",
          ],
        },
        ja: {
          months: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          dayOfWeekShort: ["日", "月", "火", "水", "木", "金", "土"],
          dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
        },
        vi: {
          months: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          dayOfWeekShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
          dayOfWeek: [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
          ],
        },
        sl: {
          months: [
            "Januar",
            "Februar",
            "Marec",
            "April",
            "Maj",
            "Junij",
            "Julij",
            "Avgust",
            "September",
            "Oktober",
            "November",
            "December",
          ],
          dayOfWeekShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
          dayOfWeek: [
            "Nedelja",
            "Ponedeljek",
            "Torek",
            "Sreda",
            "Četrtek",
            "Petek",
            "Sobota",
          ],
        },
        cs: {
          months: [
            "Leden",
            "Únor",
            "Březen",
            "Duben",
            "Květen",
            "Červen",
            "Červenec",
            "Srpen",
            "Září",
            "Říjen",
            "Listopad",
            "Prosinec",
          ],
          dayOfWeekShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
        },
        hu: {
          months: [
            "Január",
            "Február",
            "Március",
            "Április",
            "Május",
            "Június",
            "Július",
            "Augusztus",
            "Szeptember",
            "Október",
            "November",
            "December",
          ],
          dayOfWeekShort: ["Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"],
          dayOfWeek: [
            "vasárnap",
            "hétfő",
            "kedd",
            "szerda",
            "csütörtök",
            "péntek",
            "szombat",
          ],
        },
        az: {
          months: [
            "Yanvar",
            "Fevral",
            "Mart",
            "Aprel",
            "May",
            "Iyun",
            "Iyul",
            "Avqust",
            "Sentyabr",
            "Oktyabr",
            "Noyabr",
            "Dekabr",
          ],
          dayOfWeekShort: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
          dayOfWeek: [
            "Bazar",
            "Bazar ertəsi",
            "Çərşənbə axşamı",
            "Çərşənbə",
            "Cümə axşamı",
            "Cümə",
            "Şənbə",
          ],
        },
        bs: {
          months: [
            "Januar",
            "Februar",
            "Mart",
            "April",
            "Maj",
            "Jun",
            "Jul",
            "Avgust",
            "Septembar",
            "Oktobar",
            "Novembar",
            "Decembar",
          ],
          dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
          dayOfWeek: [
            "Nedjelja",
            "Ponedjeljak",
            "Utorak",
            "Srijeda",
            "Četvrtak",
            "Petak",
            "Subota",
          ],
        },
        ca: {
          months: [
            "Gener",
            "Febrer",
            "Març",
            "Abril",
            "Maig",
            "Juny",
            "Juliol",
            "Agost",
            "Setembre",
            "Octubre",
            "Novembre",
            "Desembre",
          ],
          dayOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
          dayOfWeek: [
            "Diumenge",
            "Dilluns",
            "Dimarts",
            "Dimecres",
            "Dijous",
            "Divendres",
            "Dissabte",
          ],
        },
        "en-GB": {
          months: [
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
            "December",
          ],
          dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        et: {
          months: [
            "Jaanuar",
            "Veebruar",
            "Märts",
            "Aprill",
            "Mai",
            "Juuni",
            "Juuli",
            "August",
            "September",
            "Oktoober",
            "November",
            "Detsember",
          ],
          dayOfWeekShort: ["P", "E", "T", "K", "N", "R", "L"],
          dayOfWeek: [
            "Pühapäev",
            "Esmaspäev",
            "Teisipäev",
            "Kolmapäev",
            "Neljapäev",
            "Reede",
            "Laupäev",
          ],
        },
        eu: {
          months: [
            "Urtarrila",
            "Otsaila",
            "Martxoa",
            "Apirila",
            "Maiatza",
            "Ekaina",
            "Uztaila",
            "Abuztua",
            "Iraila",
            "Urria",
            "Azaroa",
            "Abendua",
          ],
          dayOfWeekShort: ["Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."],
          dayOfWeek: [
            "Igandea",
            "Astelehena",
            "Asteartea",
            "Asteazkena",
            "Osteguna",
            "Ostirala",
            "Larunbata",
          ],
        },
        fi: {
          months: [
            "Tammikuu",
            "Helmikuu",
            "Maaliskuu",
            "Huhtikuu",
            "Toukokuu",
            "Kesäkuu",
            "Heinäkuu",
            "Elokuu",
            "Syyskuu",
            "Lokakuu",
            "Marraskuu",
            "Joulukuu",
          ],
          dayOfWeekShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
          dayOfWeek: [
            "sunnuntai",
            "maanantai",
            "tiistai",
            "keskiviikko",
            "torstai",
            "perjantai",
            "lauantai",
          ],
        },
        gl: {
          months: [
            "Xan",
            "Feb",
            "Maz",
            "Abr",
            "Mai",
            "Xun",
            "Xul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dec",
          ],
          dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"],
          dayOfWeek: [
            "Domingo",
            "Luns",
            "Martes",
            "Mércores",
            "Xoves",
            "Venres",
            "Sábado",
          ],
        },
        hr: {
          months: [
            "Siječanj",
            "Veljača",
            "Ožujak",
            "Travanj",
            "Svibanj",
            "Lipanj",
            "Srpanj",
            "Kolovoz",
            "Rujan",
            "Listopad",
            "Studeni",
            "Prosinac",
          ],
          dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
          dayOfWeek: [
            "Nedjelja",
            "Ponedjeljak",
            "Utorak",
            "Srijeda",
            "Četvrtak",
            "Petak",
            "Subota",
          ],
        },
        ko: {
          months: [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
          ],
          dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
          dayOfWeek: [
            "일요일",
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
          ],
        },
        lt: {
          months: [
            "Sausio",
            "Vasario",
            "Kovo",
            "Balandžio",
            "Gegužės",
            "Birželio",
            "Liepos",
            "Rugpjūčio",
            "Rugsėjo",
            "Spalio",
            "Lapkričio",
            "Gruodžio",
          ],
          dayOfWeekShort: ["Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"],
          dayOfWeek: [
            "Sekmadienis",
            "Pirmadienis",
            "Antradienis",
            "Trečiadienis",
            "Ketvirtadienis",
            "Penktadienis",
            "Šeštadienis",
          ],
        },
        lv: {
          months: [
            "Janvāris",
            "Februāris",
            "Marts",
            "Aprīlis ",
            "Maijs",
            "Jūnijs",
            "Jūlijs",
            "Augusts",
            "Septembris",
            "Oktobris",
            "Novembris",
            "Decembris",
          ],
          dayOfWeekShort: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"],
          dayOfWeek: [
            "Svētdiena",
            "Pirmdiena",
            "Otrdiena",
            "Trešdiena",
            "Ceturtdiena",
            "Piektdiena",
            "Sestdiena",
          ],
        },
        mk: {
          months: [
            "јануари",
            "февруари",
            "март",
            "април",
            "мај",
            "јуни",
            "јули",
            "август",
            "септември",
            "октомври",
            "ноември",
            "декември",
          ],
          dayOfWeekShort: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
          dayOfWeek: [
            "Недела",
            "Понеделник",
            "Вторник",
            "Среда",
            "Четврток",
            "Петок",
            "Сабота",
          ],
        },
        mn: {
          months: [
            "1-р сар",
            "2-р сар",
            "3-р сар",
            "4-р сар",
            "5-р сар",
            "6-р сар",
            "7-р сар",
            "8-р сар",
            "9-р сар",
            "10-р сар",
            "11-р сар",
            "12-р сар",
          ],
          dayOfWeekShort: ["Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"],
          dayOfWeek: [
            "Даваа",
            "Мягмар",
            "Лхагва",
            "Пүрэв",
            "Баасан",
            "Бямба",
            "Ням",
          ],
        },
        "pt-BR": {
          months: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ],
          dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          dayOfWeek: [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
          ],
        },
        sk: {
          months: [
            "Január",
            "Február",
            "Marec",
            "Apríl",
            "Máj",
            "Jún",
            "Júl",
            "August",
            "September",
            "Október",
            "November",
            "December",
          ],
          dayOfWeekShort: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
          dayOfWeek: [
            "Nedeľa",
            "Pondelok",
            "Utorok",
            "Streda",
            "Štvrtok",
            "Piatok",
            "Sobota",
          ],
        },
        sq: {
          months: [
            "Janar",
            "Shkurt",
            "Mars",
            "Prill",
            "Maj",
            "Qershor",
            "Korrik",
            "Gusht",
            "Shtator",
            "Tetor",
            "Nëntor",
            "Dhjetor",
          ],
          dayOfWeekShort: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"],
          dayOfWeek: [
            "E Diel",
            "E Hënë",
            "E Martē",
            "E Mërkurë",
            "E Enjte",
            "E Premte",
            "E Shtunë",
          ],
        },
        "sr-YU": {
          months: [
            "Januar",
            "Februar",
            "Mart",
            "April",
            "Maj",
            "Jun",
            "Jul",
            "Avgust",
            "Septembar",
            "Oktobar",
            "Novembar",
            "Decembar",
          ],
          dayOfWeekShort: ["Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"],
          dayOfWeek: [
            "Nedelja",
            "Ponedeljak",
            "Utorak",
            "Sreda",
            "Četvrtak",
            "Petak",
            "Subota",
          ],
        },
        sr: {
          months: [
            "јануар",
            "фебруар",
            "март",
            "април",
            "мај",
            "јун",
            "јул",
            "август",
            "септембар",
            "октобар",
            "новембар",
            "децембар",
          ],
          dayOfWeekShort: ["нед", "пон", "уто", "сре", "чет", "пет", "суб"],
          dayOfWeek: [
            "Недеља",
            "Понедељак",
            "Уторак",
            "Среда",
            "Четвртак",
            "Петак",
            "Субота",
          ],
        },
        sv: {
          months: [
            "Januari",
            "Februari",
            "Mars",
            "April",
            "Maj",
            "Juni",
            "Juli",
            "Augusti",
            "September",
            "Oktober",
            "November",
            "December",
          ],
          dayOfWeekShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
          dayOfWeek: [
            "Söndag",
            "Måndag",
            "Tisdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lördag",
          ],
        },
        "zh-TW": {
          months: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
          dayOfWeek: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
        },
        zh: {
          months: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
          dayOfWeek: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
        },
        ug: {
          months: [
            "1-ئاي",
            "2-ئاي",
            "3-ئاي",
            "4-ئاي",
            "5-ئاي",
            "6-ئاي",
            "7-ئاي",
            "8-ئاي",
            "9-ئاي",
            "10-ئاي",
            "11-ئاي",
            "12-ئاي",
          ],
          dayOfWeek: [
            "يەكشەنبە",
            "دۈشەنبە",
            "سەيشەنبە",
            "چارشەنبە",
            "پەيشەنبە",
            "جۈمە",
            "شەنبە",
          ],
        },
        he: {
          months: [
            "ינואר",
            "פברואר",
            "מרץ",
            "אפריל",
            "מאי",
            "יוני",
            "יולי",
            "אוגוסט",
            "ספטמבר",
            "אוקטובר",
            "נובמבר",
            "דצמבר",
          ],
          dayOfWeekShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
          dayOfWeek: [
            "ראשון",
            "שני",
            "שלישי",
            "רביעי",
            "חמישי",
            "שישי",
            "שבת",
            "ראשון",
          ],
        },
        hy: {
          months: [
            "Հունվար",
            "Փետրվար",
            "Մարտ",
            "Ապրիլ",
            "Մայիս",
            "Հունիս",
            "Հուլիս",
            "Օգոստոս",
            "Սեպտեմբեր",
            "Հոկտեմբեր",
            "Նոյեմբեր",
            "Դեկտեմբեր",
          ],
          dayOfWeekShort: ["Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"],
          dayOfWeek: [
            "Կիրակի",
            "Երկուշաբթի",
            "Երեքշաբթի",
            "Չորեքշաբթի",
            "Հինգշաբթի",
            "Ուրբաթ",
            "Շաբաթ",
          ],
        },
        kg: {
          months: [
            "Үчтүн айы",
            "Бирдин айы",
            "Жалган Куран",
            "Чын Куран",
            "Бугу",
            "Кулжа",
            "Теке",
            "Баш Оона",
            "Аяк Оона",
            "Тогуздун айы",
            "Жетинин айы",
            "Бештин айы",
          ],
          dayOfWeekShort: ["Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"],
          dayOfWeek: [
            "Жекшемб",
            "Дүйшөмб",
            "Шейшемб",
            "Шаршемб",
            "Бейшемби",
            "Жума",
            "Ишенб",
          ],
        },
        rm: {
          months: [
            "Schaner",
            "Favrer",
            "Mars",
            "Avrigl",
            "Matg",
            "Zercladur",
            "Fanadur",
            "Avust",
            "Settember",
            "October",
            "November",
            "December",
          ],
          dayOfWeekShort: ["Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"],
          dayOfWeek: [
            "Dumengia",
            "Glindesdi",
            "Mardi",
            "Mesemna",
            "Gievgia",
            "Venderdi",
            "Sonda",
          ],
        },
        ka: {
          months: [
            "იანვარი",
            "თებერვალი",
            "მარტი",
            "აპრილი",
            "მაისი",
            "ივნისი",
            "ივლისი",
            "აგვისტო",
            "სექტემბერი",
            "ოქტომბერი",
            "ნოემბერი",
            "დეკემბერი",
          ],
          dayOfWeekShort: ["კვ", "ორშ", "სამშ", "ოთხ", "ხუთ", "პარ", "შაბ"],
          dayOfWeek: [
            "კვირა",
            "ორშაბათი",
            "სამშაბათი",
            "ოთხშაბათი",
            "ხუთშაბათი",
            "პარასკევი",
            "შაბათი",
          ],
        },
      },
      ownerDocument: document,
      contentWindow: window,
      value: "",
      rtl: !1,
      format: "Y/m/d H:i",
      formatTime: "H:i",
      formatDate: "Y/m/d",
      startDate: !1,
      step: 60,
      monthChangeSpinner: !0,
      closeOnDateSelect: !1,
      closeOnTimeSelect: !0,
      closeOnWithoutClick: !0,
      closeOnInputClick: !0,
      openOnFocus: !0,
      timepicker: !0,
      datepicker: !0,
      weeks: !1,
      defaultTime: !1,
      defaultDate: !1,
      minDate: !1,
      maxDate: !1,
      minTime: !1,
      maxTime: !1,
      minDateTime: !1,
      maxDateTime: !1,
      allowTimes: [],
      opened: !1,
      initTime: !0,
      inline: !1,
      theme: "",
      touchMovedThreshold: 5,
      onSelectDate: function () {},
      onSelectTime: function () {},
      onChangeMonth: function () {},
      onGetWeekOfYear: function () {},
      onChangeYear: function () {},
      onChangeDateTime: function () {},
      onShow: function () {},
      onClose: function () {},
      onGenerate: function () {},
      withoutCopyright: !0,
      inverseButton: !1,
      hours12: !1,
      next: "xdsoft_next",
      prev: "xdsoft_prev",
      dayOfWeekStart: 0,
      parentID: "body",
      timeHeightInTimePicker: 25,
      timepickerScrollbar: !0,
      todayButton: !0,
      prevButton: !0,
      nextButton: !0,
      defaultSelect: !0,
      scrollMonth: !0,
      scrollTime: !0,
      scrollInput: !0,
      lazyInit: !1,
      mask: !1,
      validateOnBlur: !0,
      allowBlank: !0,
      yearStart: 1950,
      yearEnd: 2050,
      monthStart: 0,
      monthEnd: 11,
      style: "",
      id: "",
      fixed: !1,
      roundTime: "round",
      className: "",
      weekends: [],
      highlightedDates: [],
      highlightedPeriods: [],
      allowDates: [],
      allowDateRe: null,
      disabledDates: [],
      disabledWeekDays: [],
      yearOffset: 0,
      beforeShowDay: null,
      enterLikeTab: !0,
      showApplyButton: !1,
      insideParent: !1,
    },
    a = null,
    n = null,
    r = "en",
    o = { meridiem: ["AM", "PM"] },
    i = function () {
      var i = t.i18n[r],
        s = {
          days: i.dayOfWeek,
          daysShort: i.dayOfWeekShort,
          months: i.months,
          monthsShort: e.map(i.months, function (e) {
            return e.substring(0, 3);
          }),
        };
      "function" == typeof DateFormatter &&
        (a = n = new DateFormatter({ dateSettings: e.extend({}, o, s) }));
    },
    s = {
      moment: {
        default_options: {
          format: "YYYY/MM/DD HH:mm",
          formatDate: "YYYY/MM/DD",
          formatTime: "HH:mm",
        },
        formatter: {
          parseDate: function (e, t) {
            if (u(t)) return n.parseDate(e, t);
            var a = moment(e, t);
            return !!a.isValid() && a.toDate();
          },
          formatDate: function (e, t) {
            return u(t) ? n.formatDate(e, t) : moment(e).format(t);
          },
          formatMask: function (e) {
            return e
              .replace(/Y{4}/g, "9999")
              .replace(/Y{2}/g, "99")
              .replace(/M{2}/g, "19")
              .replace(/D{2}/g, "39")
              .replace(/H{2}/g, "29")
              .replace(/m{2}/g, "59")
              .replace(/s{2}/g, "59");
          },
        },
      },
    };
  e.datetimepicker = {
    setLocale: function (e) {
      var a = t.i18n[e] ? e : "en";
      r !== a && ((r = a), i());
    },
    setDateFormatter: function (n) {
      if ("string" == typeof n && s.hasOwnProperty(n)) {
        var r = s[n];
        e.extend(t, r.default_options), (a = r.formatter);
      } else a = n;
    },
  };
  var d = {
      RFC_2822: "D, d M Y H:i:s O",
      ATOM: "Y-m-dTH:i:sP",
      ISO_8601: "Y-m-dTH:i:sO",
      RFC_822: "D, d M y H:i:s O",
      RFC_850: "l, d-M-y H:i:s T",
      RFC_1036: "D, d M y H:i:s O",
      RFC_1123: "D, d M Y H:i:s O",
      RSS: "D, d M Y H:i:s O",
      W3C: "Y-m-dTH:i:sP",
    },
    u = function (e) {
      return -1 !== Object.values(d).indexOf(e);
    };
  function l(e, t, a) {
    (this.date = e), (this.desc = t), (this.style = a);
  }
  e.extend(e.datetimepicker, d),
    i(),
    window.getComputedStyle ||
      (window.getComputedStyle = function (e) {
        return (
          (this.el = e),
          (this.getPropertyValue = function (t) {
            var a = /(-([a-z]))/g;
            return (
              "float" === t && (t = "styleFloat"),
              a.test(t) &&
                (t = t.replace(a, function (e, t, a) {
                  return a.toUpperCase();
                })),
              e.currentStyle[t] || null
            );
          }),
          this
        );
      }),
    Array.prototype.indexOf ||
      (Array.prototype.indexOf = function (e, t) {
        var a, n;
        for (a = t || 0, n = this.length; a < n; a += 1)
          if (this[a] === e) return a;
        return -1;
      }),
    (Date.prototype.countDaysInMonth = function () {
      return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
    }),
    (e.fn.xdsoftScroller = function (t, a) {
      return this.each(function () {
        var n,
          r,
          o,
          i,
          s,
          d = e(this),
          u = function (e) {
            var t,
              a = { x: 0, y: 0 };
            return (
              "touchstart" === e.type ||
              "touchmove" === e.type ||
              "touchend" === e.type ||
              "touchcancel" === e.type
                ? ((t =
                    e.originalEvent.touches[0] ||
                    e.originalEvent.changedTouches[0]),
                  (a.x = t.clientX),
                  (a.y = t.clientY))
                : ("mousedown" !== e.type &&
                    "mouseup" !== e.type &&
                    "mousemove" !== e.type &&
                    "mouseover" !== e.type &&
                    "mouseout" !== e.type &&
                    "mouseenter" !== e.type &&
                    "mouseleave" !== e.type) ||
                  ((a.x = e.clientX), (a.y = e.clientY)),
              a
            );
          },
          l = 100,
          f = !1,
          c = 0,
          m = 0,
          h = 0,
          g = !1,
          p = 0,
          D = function () {};
        "hide" !== a
          ? (e(this).hasClass("xdsoft_scroller_box") ||
              ((n = d.children().eq(0)),
              (r = d[0].clientHeight),
              (o = n[0].offsetHeight),
              (i = e('<div class="xdsoft_scrollbar"></div>')),
              (s = e('<div class="xdsoft_scroller"></div>')),
              i.append(s),
              d.addClass("xdsoft_scroller_box").append(i),
              (D = function (e) {
                var t = u(e).y - c + p;
                t < 0 && (t = 0),
                  t + s[0].offsetHeight > h && (t = h - s[0].offsetHeight),
                  d.trigger("scroll_element.xdsoft_scroller", [l ? t / l : 0]);
              }),
              s
                .on(
                  "touchstart.xdsoft_scroller mousedown.xdsoft_scroller",
                  function (n) {
                    r || d.trigger("resize_scroll.xdsoft_scroller", [a]),
                      (c = u(n).y),
                      (p = parseInt(s.css("margin-top"), 10)),
                      (h = i[0].offsetHeight),
                      "mousedown" === n.type || "touchstart" === n.type
                        ? (t.ownerDocument &&
                            e(t.ownerDocument.body).addClass("xdsoft_noselect"),
                          e([t.ownerDocument.body, t.contentWindow]).on(
                            "touchend mouseup.xdsoft_scroller",
                            function a() {
                              e([t.ownerDocument.body, t.contentWindow])
                                .off("touchend mouseup.xdsoft_scroller", a)
                                .off("mousemove.xdsoft_scroller", D)
                                .removeClass("xdsoft_noselect");
                            },
                          ),
                          e(t.ownerDocument.body).on(
                            "mousemove.xdsoft_scroller",
                            D,
                          ))
                        : ((g = !0), n.stopPropagation(), n.preventDefault());
                  },
                )
                .on("touchmove", function (e) {
                  g && (e.preventDefault(), D(e));
                })
                .on("touchend touchcancel", function () {
                  (g = !1), (p = 0);
                }),
              d
                .on("scroll_element.xdsoft_scroller", function (e, t) {
                  r || d.trigger("resize_scroll.xdsoft_scroller", [t, !0]),
                    (t = t > 1 ? 1 : t < 0 || isNaN(t) ? 0 : t),
                    s.css("margin-top", l * t),
                    setTimeout(function () {
                      n.css(
                        "marginTop",
                        -parseInt((n[0].offsetHeight - r) * t, 10),
                      );
                    }, 10);
                })
                .on("resize_scroll.xdsoft_scroller", function (e, t, a) {
                  var u, f;
                  (r = d[0].clientHeight),
                    (o = n[0].offsetHeight),
                    (f = (u = r / o) * i[0].offsetHeight),
                    u > 1
                      ? s.hide()
                      : (s.show(),
                        s.css("height", parseInt(f > 10 ? f : 10, 10)),
                        (l = i[0].offsetHeight - s[0].offsetHeight),
                        !0 !== a &&
                          d.trigger("scroll_element.xdsoft_scroller", [
                            t ||
                              Math.abs(parseInt(n.css("marginTop"), 10)) /
                                (o - r),
                          ]));
                }),
              d.on("mousewheel", function (e) {
                var t = Math.abs(parseInt(n.css("marginTop"), 10));
                return (
                  (t -= 20 * e.deltaY) < 0 && (t = 0),
                  d.trigger("scroll_element.xdsoft_scroller", [t / (o - r)]),
                  e.stopPropagation(),
                  !1
                );
              }),
              d.on("touchstart", function (e) {
                (f = u(e)), (m = Math.abs(parseInt(n.css("marginTop"), 10)));
              }),
              d.on("touchmove", function (e) {
                if (f) {
                  e.preventDefault();
                  var t = u(e);
                  d.trigger("scroll_element.xdsoft_scroller", [
                    (m - (t.y - f.y)) / (o - r),
                  ]);
                }
              }),
              d.on("touchend touchcancel", function () {
                (f = !1), (m = 0);
              })),
            d.trigger("resize_scroll.xdsoft_scroller", [a]))
          : d.find(".xdsoft_scrollbar").hide();
      });
    }),
    (e.fn.datetimepicker = function (n, o) {
      var i,
        s,
        d = this,
        u = 17,
        f = 13,
        c = 27,
        m = 37,
        h = 38,
        g = 39,
        p = 40,
        D = 9,
        y = 116,
        v = 65,
        b = 67,
        k = 86,
        x = 90,
        T = 89,
        S = !1,
        M =
          e.isPlainObject(n) || !n
            ? e.extend(!0, {}, t, n)
            : e.extend(!0, {}, t),
        w = 0;
      return (
        (i = function (t) {
          var o,
            i,
            s,
            d,
            w,
            O,
            W = e('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
            _ = e(
              '<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>',
            ),
            F = e('<div class="xdsoft_datepicker active"></div>'),
            C = e(
              '<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>',
            ),
            P = e('<div class="xdsoft_calendar"></div>'),
            Y = e(
              '<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>',
            ),
            A = Y.find(".xdsoft_time_box").eq(0),
            H = e('<div class="xdsoft_time_variant"></div>'),
            j = e(
              '<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>',
            ),
            J = e(
              '<div class="xdsoft_select xdsoft_monthselect"><div></div></div>',
            ),
            z = e(
              '<div class="xdsoft_select xdsoft_yearselect"><div></div></div>',
            ),
            I = !1,
            N = 0;
          M.id && W.attr("id", M.id),
            M.style && W.attr("style", M.style),
            M.weeks && W.addClass("xdsoft_showweeks"),
            M.rtl && W.addClass("xdsoft_rtl"),
            W.addClass("xdsoft_" + M.theme),
            W.addClass(M.className),
            C.find(".xdsoft_month span").after(J),
            C.find(".xdsoft_year span").after(z),
            C.find(".xdsoft_month,.xdsoft_year").on(
              "touchstart mousedown.xdsoft",
              function (t) {
                var a,
                  n,
                  r = e(this).find(".xdsoft_select").eq(0),
                  o = 0,
                  i = 0,
                  s = r.is(":visible");
                for (
                  C.find(".xdsoft_select").hide(),
                    w.currentTime &&
                      (o =
                        w.currentTime[
                          e(this).hasClass("xdsoft_month")
                            ? "getMonth"
                            : "getFullYear"
                        ]()),
                    r[s ? "hide" : "show"](),
                    a = r.find("div.xdsoft_option"),
                    n = 0;
                  n < a.length && a.eq(n).data("value") !== o;
                  n += 1
                )
                  i += a[0].offsetHeight;
                return (
                  r.xdsoftScroller(
                    M,
                    i / (r.children()[0].offsetHeight - r[0].clientHeight),
                  ),
                  t.stopPropagation(),
                  !1
                );
              },
            );
          var L = function (e) {
            var t = e.originalEvent,
              a = t.touches ? t.touches[0] : t;
            this.touchStartPosition = this.touchStartPosition || a;
            var n = Math.abs(this.touchStartPosition.clientX - a.clientX),
              r = Math.abs(this.touchStartPosition.clientY - a.clientY);
            Math.sqrt(n * n + r * r) > M.touchMovedThreshold &&
              (this.touchMoved = !0);
          };
          function E() {
            var e,
              a = !1;
            return (
              M.startDate
                ? (a = w.strToDate(M.startDate))
                : (a = M.value || (t && t.val && t.val() ? t.val() : ""))
                ? ((a = w.strToDateTime(a)),
                  M.yearOffset &&
                    (a = new Date(
                      a.getFullYear() - M.yearOffset,
                      a.getMonth(),
                      a.getDate(),
                      a.getHours(),
                      a.getMinutes(),
                      a.getSeconds(),
                      a.getMilliseconds(),
                    )))
                : M.defaultDate &&
                  ((a = w.strToDateTime(M.defaultDate)),
                  M.defaultTime &&
                    ((e = w.strtotime(M.defaultTime)),
                    a.setHours(e.getHours()),
                    a.setMinutes(e.getMinutes()))),
              a && w.isValidDate(a) ? W.data("changed", !0) : (a = ""),
              a || 0
            );
          }
          function R(n) {
            var r = function (e, t) {
                var a = e
                  .replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, "\\$1")
                  .replace(/_/g, "{digit+}")
                  .replace(/([0-9]{1})/g, "{digit$1}")
                  .replace(/\{digit([0-9]{1})\}/g, "[0-$1_]{1}")
                  .replace(/\{digit[\+]\}/g, "[0-9_]{1}");
                return new RegExp(a).test(t);
              },
              o = function (e, t) {
                if (
                  !(e =
                    "string" == typeof e || e instanceof String
                      ? n.ownerDocument.getElementById(e)
                      : e)
                )
                  return !1;
                if (e.createTextRange) {
                  var a = e.createTextRange();
                  return (
                    a.collapse(!0),
                    a.moveEnd("character", t),
                    a.moveStart("character", t),
                    a.select(),
                    !0
                  );
                }
                return !!e.setSelectionRange && (e.setSelectionRange(t, t), !0);
              };
            n.mask && t.off("keydown.xdsoft"),
              !0 === n.mask &&
                (a.formatMask
                  ? (n.mask = a.formatMask(n.format))
                  : (n.mask = n.format
                      .replace(/Y/g, "9999")
                      .replace(/F/g, "9999")
                      .replace(/m/g, "19")
                      .replace(/d/g, "39")
                      .replace(/H/g, "29")
                      .replace(/i/g, "59")
                      .replace(/s/g, "59"))),
              "string" === e.type(n.mask) &&
                (r(n.mask, t.val()) ||
                  (t.val(n.mask.replace(/[0-9]/g, "_")), o(t[0], 0)),
                t.on("paste.xdsoft", function (a) {
                  var i = (
                      a.clipboardData ||
                      a.originalEvent.clipboardData ||
                      window.clipboardData
                    ).getData("text"),
                    s = this.value,
                    d = this.selectionStart,
                    u = s.substr(0, d),
                    l = s.substr(d + i.length);
                  return (
                    (s = u + i + l),
                    (d += i.length),
                    r(n.mask, s)
                      ? ((this.value = s), o(this, d))
                      : "" === e.trim(s)
                      ? (this.value = n.mask.replace(/[0-9]/g, "_"))
                      : t.trigger("error_input.xdsoft"),
                    a.preventDefault(),
                    !1
                  );
                }),
                t.on("keydown.xdsoft", function (a) {
                  var i,
                    s = this.value,
                    d = a.which,
                    l = this.selectionStart,
                    M = this.selectionEnd,
                    w = l !== M;
                  if (
                    (d >= 48 && d <= 57) ||
                    (d >= 96 && d <= 105) ||
                    8 === d ||
                    46 === d
                  ) {
                    for (
                      i =
                        8 === d || 46 === d
                          ? "_"
                          : String.fromCharCode(
                              96 <= d && d <= 105 ? d - 48 : d,
                            ),
                        8 === d && l && !w && (l -= 1);
                      ;

                    ) {
                      var O = n.mask.substr(l, 1),
                        W = l < n.mask.length,
                        _ = l > 0;
                      if (!(/[^0-9_]/.test(O) && W && _)) break;
                      l += 8 !== d || w ? 1 : -1;
                    }
                    if ((a.metaKey && ((l = 0), (w = !0)), w)) {
                      var F = M - l,
                        C = n.mask.replace(/[0-9]/g, "_"),
                        P = C.substr(l, F).substr(1),
                        Y = s.substr(0, l),
                        A = i + P,
                        H = s.substr(l + F);
                      s = Y + A + H;
                    } else {
                      var j = s.substr(0, l),
                        J = i,
                        z = s.substr(l + 1);
                      s = j + J + z;
                    }
                    if ("" === e.trim(s)) s = C;
                    else if (l === n.mask.length) return a.preventDefault(), !1;
                    for (
                      l += 8 === d ? 0 : 1;
                      /[^0-9_]/.test(n.mask.substr(l, 1)) &&
                      l < n.mask.length &&
                      l > 0;

                    )
                      l += 8 === d ? 0 : 1;
                    r(n.mask, s)
                      ? ((this.value = s), o(this, l))
                      : "" === e.trim(s)
                      ? (this.value = n.mask.replace(/[0-9]/g, "_"))
                      : t.trigger("error_input.xdsoft");
                  } else if (
                    (-1 !== [v, b, k, x, T].indexOf(d) && S) ||
                    -1 !== [c, h, p, m, g, y, u, D, f].indexOf(d)
                  )
                    return !0;
                  return a.preventDefault(), !1;
                }));
          }
          C.find(".xdsoft_select")
            .xdsoftScroller(M)
            .on("touchstart mousedown.xdsoft", function (e) {
              var t = e.originalEvent;
              (this.touchMoved = !1),
                (this.touchStartPosition = t.touches ? t.touches[0] : t),
                e.stopPropagation(),
                e.preventDefault();
            })
            .on("touchmove", ".xdsoft_option", L)
            .on("touchend mousedown.xdsoft", ".xdsoft_option", function () {
              if (!this.touchMoved) {
                (void 0 !== w.currentTime && null !== w.currentTime) ||
                  (w.currentTime = w.now());
                var t = w.currentTime.getFullYear();
                w &&
                  w.currentTime &&
                  w.currentTime[
                    e(this).parent().parent().hasClass("xdsoft_monthselect")
                      ? "setMonth"
                      : "setFullYear"
                  ](e(this).data("value")),
                  e(this).parent().parent().hide(),
                  W.trigger("xchange.xdsoft"),
                  M.onChangeMonth &&
                    e.isFunction(M.onChangeMonth) &&
                    M.onChangeMonth.call(W, w.currentTime, W.data("input")),
                  t !== w.currentTime.getFullYear() &&
                    e.isFunction(M.onChangeYear) &&
                    M.onChangeYear.call(W, w.currentTime, W.data("input"));
              }
            }),
            (W.getValue = function () {
              return w.getCurrentTime();
            }),
            (W.setOptions = function (n) {
              var r = {};
              (M = e.extend(!0, {}, M, n)),
                n.allowTimes &&
                  e.isArray(n.allowTimes) &&
                  n.allowTimes.length &&
                  (M.allowTimes = e.extend(!0, [], n.allowTimes)),
                n.weekends &&
                  e.isArray(n.weekends) &&
                  n.weekends.length &&
                  (M.weekends = e.extend(!0, [], n.weekends)),
                n.allowDates &&
                  e.isArray(n.allowDates) &&
                  n.allowDates.length &&
                  (M.allowDates = e.extend(!0, [], n.allowDates)),
                n.allowDateRe &&
                  "[object String]" ===
                    Object.prototype.toString.call(n.allowDateRe) &&
                  (M.allowDateRe = new RegExp(n.allowDateRe)),
                n.highlightedDates &&
                  e.isArray(n.highlightedDates) &&
                  n.highlightedDates.length &&
                  (e.each(n.highlightedDates, function (t, n) {
                    var o,
                      i = e.map(n.split(","), e.trim),
                      s = new l(a.parseDate(i[0], M.formatDate), i[1], i[2]),
                      d = a.formatDate(s.date, M.formatDate);
                    void 0 !== r[d]
                      ? (o = r[d].desc) &&
                        o.length &&
                        s.desc &&
                        s.desc.length &&
                        (r[d].desc = o + "\n" + s.desc)
                      : (r[d] = s);
                  }),
                  (M.highlightedDates = e.extend(!0, [], r))),
                n.highlightedPeriods &&
                  e.isArray(n.highlightedPeriods) &&
                  n.highlightedPeriods.length &&
                  ((r = e.extend(!0, [], M.highlightedDates)),
                  e.each(n.highlightedPeriods, function (t, n) {
                    var o, i, s, d, u, f, c;
                    if (e.isArray(n))
                      (o = n[0]), (i = n[1]), (s = n[2]), (c = n[3]);
                    else {
                      var m = e.map(n.split(","), e.trim);
                      (o = a.parseDate(m[0], M.formatDate)),
                        (i = a.parseDate(m[1], M.formatDate)),
                        (s = m[2]),
                        (c = m[3]);
                    }
                    for (; o <= i; )
                      (d = new l(o, s, c)),
                        (u = a.formatDate(o, M.formatDate)),
                        o.setDate(o.getDate() + 1),
                        void 0 !== r[u]
                          ? (f = r[u].desc) &&
                            f.length &&
                            d.desc &&
                            d.desc.length &&
                            (r[u].desc = f + "\n" + d.desc)
                          : (r[u] = d);
                  }),
                  (M.highlightedDates = e.extend(!0, [], r))),
                n.disabledDates &&
                  e.isArray(n.disabledDates) &&
                  n.disabledDates.length &&
                  (M.disabledDates = e.extend(!0, [], n.disabledDates)),
                n.disabledWeekDays &&
                  e.isArray(n.disabledWeekDays) &&
                  n.disabledWeekDays.length &&
                  (M.disabledWeekDays = e.extend(!0, [], n.disabledWeekDays)),
                (!M.open && !M.opened) || M.inline || t.trigger("open.xdsoft"),
                M.inline &&
                  ((I = !0), W.addClass("xdsoft_inline"), t.after(W).hide()),
                M.inverseButton &&
                  ((M.next = "xdsoft_prev"), (M.prev = "xdsoft_next")),
                M.datepicker ? F.addClass("active") : F.removeClass("active"),
                M.timepicker ? Y.addClass("active") : Y.removeClass("active"),
                M.value &&
                  (w.setCurrentTime(M.value), t && t.val && t.val(w.str)),
                isNaN(M.dayOfWeekStart)
                  ? (M.dayOfWeekStart = 0)
                  : (M.dayOfWeekStart = parseInt(M.dayOfWeekStart, 10) % 7),
                M.timepickerScrollbar || A.xdsoftScroller(M, "hide"),
                M.minDate &&
                  /^[\+\-](.*)$/.test(M.minDate) &&
                  (M.minDate = a.formatDate(
                    w.strToDateTime(M.minDate),
                    M.formatDate,
                  )),
                M.maxDate &&
                  /^[\+\-](.*)$/.test(M.maxDate) &&
                  (M.maxDate = a.formatDate(
                    w.strToDateTime(M.maxDate),
                    M.formatDate,
                  )),
                M.minDateTime &&
                  /^\+(.*)$/.test(M.minDateTime) &&
                  (M.minDateTime = w
                    .strToDateTime(M.minDateTime)
                    .dateFormat(M.formatDate)),
                M.maxDateTime &&
                  /^\+(.*)$/.test(M.maxDateTime) &&
                  (M.maxDateTime = w
                    .strToDateTime(M.maxDateTime)
                    .dateFormat(M.formatDate)),
                j.toggle(M.showApplyButton),
                C.find(".xdsoft_today_button").css(
                  "visibility",
                  M.todayButton ? "visible" : "hidden",
                ),
                C.find("." + M.prev).css(
                  "visibility",
                  M.prevButton ? "visible" : "hidden",
                ),
                C.find("." + M.next).css(
                  "visibility",
                  M.nextButton ? "visible" : "hidden",
                ),
                R(M),
                M.validateOnBlur &&
                  t.off("blur.xdsoft").on("blur.xdsoft", function () {
                    if (
                      M.allowBlank &&
                      (!e.trim(e(this).val()).length ||
                        ("string" == typeof M.mask &&
                          e.trim(e(this).val()) ===
                            M.mask.replace(/[0-9]/g, "_")))
                    )
                      e(this).val(null), W.data("xdsoft_datetime").empty();
                    else {
                      var t = a.parseDate(e(this).val(), M.format);
                      if (t) e(this).val(a.formatDate(t, M.format));
                      else {
                        var n = +[e(this).val()[0], e(this).val()[1]].join(""),
                          r = +[e(this).val()[2], e(this).val()[3]].join("");
                        !M.datepicker &&
                        M.timepicker &&
                        n >= 0 &&
                        n < 24 &&
                        r >= 0 &&
                        r < 60
                          ? e(this).val(
                              [n, r]
                                .map(function (e) {
                                  return e > 9 ? e : "0" + e;
                                })
                                .join(":"),
                            )
                          : e(this).val(a.formatDate(w.now(), M.format));
                      }
                      W.data("xdsoft_datetime").setCurrentTime(e(this).val());
                    }
                    W.trigger("changedatetime.xdsoft"),
                      W.trigger("close.xdsoft");
                  }),
                (M.dayOfWeekStartPrev =
                  0 === M.dayOfWeekStart ? 6 : M.dayOfWeekStart - 1),
                W.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft");
            }),
            W.data("options", M).on(
              "touchstart mousedown.xdsoft",
              function (e) {
                return (
                  e.stopPropagation(),
                  e.preventDefault(),
                  z.hide(),
                  J.hide(),
                  !1
                );
              },
            ),
            A.append(H),
            A.xdsoftScroller(M),
            W.on("afterOpen.xdsoft", function () {
              A.xdsoftScroller(M);
            }),
            W.append(F).append(Y),
            !0 !== M.withoutCopyright && W.append(_),
            F.append(C).append(P).append(j),
            M.insideParent ? e(t).parent().append(W) : e(M.parentID).append(W),
            (w = new (function () {
              var t = this;
              (t.now = function (e) {
                var a,
                  n,
                  r = new Date();
                return (
                  !e &&
                    M.defaultDate &&
                    ((a = t.strToDateTime(M.defaultDate)),
                    r.setFullYear(a.getFullYear()),
                    r.setMonth(a.getMonth()),
                    r.setDate(a.getDate())),
                  r.setFullYear(r.getFullYear()),
                  !e &&
                    M.defaultTime &&
                    ((n = t.strtotime(M.defaultTime)),
                    r.setHours(n.getHours()),
                    r.setMinutes(n.getMinutes()),
                    r.setSeconds(n.getSeconds()),
                    r.setMilliseconds(n.getMilliseconds())),
                  r
                );
              }),
                (t.isValidDate = function (e) {
                  return (
                    "[object Date]" === Object.prototype.toString.call(e) &&
                    !isNaN(e.getTime())
                  );
                }),
                (t.setCurrentTime = function (e, a) {
                  "string" == typeof e
                    ? (t.currentTime = t.strToDateTime(e))
                    : t.isValidDate(e)
                    ? (t.currentTime = e)
                    : e || a || !M.allowBlank || M.inline
                    ? (t.currentTime = t.now())
                    : (t.currentTime = null),
                    W.trigger("xchange.xdsoft");
                }),
                (t.empty = function () {
                  t.currentTime = null;
                }),
                (t.getCurrentTime = function () {
                  return t.currentTime;
                }),
                (t.nextMonth = function () {
                  (void 0 !== t.currentTime && null !== t.currentTime) ||
                    (t.currentTime = t.now());
                  var a,
                    n = t.currentTime.getMonth() + 1;
                  return (
                    12 === n &&
                      (t.currentTime.setFullYear(
                        t.currentTime.getFullYear() + 1,
                      ),
                      (n = 0)),
                    (a = t.currentTime.getFullYear()),
                    t.currentTime.setDate(
                      Math.min(
                        new Date(
                          t.currentTime.getFullYear(),
                          n + 1,
                          0,
                        ).getDate(),
                        t.currentTime.getDate(),
                      ),
                    ),
                    t.currentTime.setMonth(n),
                    M.onChangeMonth &&
                      e.isFunction(M.onChangeMonth) &&
                      M.onChangeMonth.call(W, w.currentTime, W.data("input")),
                    a !== t.currentTime.getFullYear() &&
                      e.isFunction(M.onChangeYear) &&
                      M.onChangeYear.call(W, w.currentTime, W.data("input")),
                    W.trigger("xchange.xdsoft"),
                    n
                  );
                }),
                (t.prevMonth = function () {
                  (void 0 !== t.currentTime && null !== t.currentTime) ||
                    (t.currentTime = t.now());
                  var a = t.currentTime.getMonth() - 1;
                  return (
                    -1 === a &&
                      (t.currentTime.setFullYear(
                        t.currentTime.getFullYear() - 1,
                      ),
                      (a = 11)),
                    t.currentTime.setDate(
                      Math.min(
                        new Date(
                          t.currentTime.getFullYear(),
                          a + 1,
                          0,
                        ).getDate(),
                        t.currentTime.getDate(),
                      ),
                    ),
                    t.currentTime.setMonth(a),
                    M.onChangeMonth &&
                      e.isFunction(M.onChangeMonth) &&
                      M.onChangeMonth.call(W, w.currentTime, W.data("input")),
                    W.trigger("xchange.xdsoft"),
                    a
                  );
                }),
                (t.getWeekOfYear = function (t) {
                  if (M.onGetWeekOfYear && e.isFunction(M.onGetWeekOfYear)) {
                    var a = M.onGetWeekOfYear.call(W, t);
                    if (void 0 !== a) return a;
                  }
                  var n = new Date(t.getFullYear(), 0, 1);
                  return (
                    4 !== n.getDay() &&
                      n.setMonth(0, 1 + ((4 - n.getDay() + 7) % 7)),
                    Math.ceil(((t - n) / 864e5 + n.getDay() + 1) / 7)
                  );
                }),
                (t.strToDateTime = function (e) {
                  var n,
                    r,
                    o = [];
                  return e && e instanceof Date && t.isValidDate(e)
                    ? e
                    : ((o = /^([+-]{1})(.*)$/.exec(e)) &&
                        (o[2] = a.parseDate(o[2], M.formatDate)),
                      o && o[2]
                        ? ((n =
                            o[2].getTime() - 6e4 * o[2].getTimezoneOffset()),
                          (r = new Date(
                            t.now(!0).getTime() + parseInt(o[1] + "1", 10) * n,
                          )))
                        : (r = e ? a.parseDate(e, M.format) : t.now()),
                      t.isValidDate(r) || (r = t.now()),
                      r);
                }),
                (t.strToDate = function (e) {
                  if (e && e instanceof Date && t.isValidDate(e)) return e;
                  var n = e ? a.parseDate(e, M.formatDate) : t.now(!0);
                  return t.isValidDate(n) || (n = t.now(!0)), n;
                }),
                (t.strtotime = function (e) {
                  if (e && e instanceof Date && t.isValidDate(e)) return e;
                  var n = e ? a.parseDate(e, M.formatTime) : t.now(!0);
                  return t.isValidDate(n) || (n = t.now(!0)), n;
                }),
                (t.str = function () {
                  var e = M.format;
                  return (
                    M.yearOffset &&
                      (e = (e = e.replace(
                        "Y",
                        t.currentTime.getFullYear() + M.yearOffset,
                      )).replace(
                        "y",
                        String(
                          t.currentTime.getFullYear() + M.yearOffset,
                        ).substring(2, 4),
                      )),
                    a.formatDate(t.currentTime, e)
                  );
                }),
                (t.currentTime = this.now());
            })()),
            j.on("touchend click", function (e) {
              e.preventDefault(),
                W.data("changed", !0),
                w.setCurrentTime(E()),
                t.val(w.str()),
                W.trigger("close.xdsoft");
            }),
            C.find(".xdsoft_today_button")
              .on("touchend mousedown.xdsoft", function () {
                W.data("changed", !0),
                  w.setCurrentTime(0, !0),
                  W.trigger("afterOpen.xdsoft");
              })
              .on("dblclick.xdsoft", function () {
                var e,
                  a,
                  n = w.getCurrentTime();
                (n = new Date(n.getFullYear(), n.getMonth(), n.getDate())),
                  (e = w.strToDate(M.minDate)),
                  n <
                    (e = new Date(
                      e.getFullYear(),
                      e.getMonth(),
                      e.getDate(),
                    )) ||
                    ((a = w.strToDate(M.maxDate)),
                    n >
                      (a = new Date(
                        a.getFullYear(),
                        a.getMonth(),
                        a.getDate(),
                      )) ||
                      (t.val(w.str()),
                      t.trigger("change"),
                      W.trigger("close.xdsoft")));
              }),
            C.find(".xdsoft_prev,.xdsoft_next").on(
              "touchend mousedown.xdsoft",
              function () {
                var t = e(this),
                  a = 0,
                  n = !1;
                !(function e(r) {
                  t.hasClass(M.next)
                    ? w.nextMonth()
                    : t.hasClass(M.prev) && w.prevMonth(),
                    M.monthChangeSpinner &&
                      (n || (a = setTimeout(e, r || 100)));
                })(500),
                  e([M.ownerDocument.body, M.contentWindow]).on(
                    "touchend mouseup.xdsoft",
                    function t() {
                      clearTimeout(a),
                        (n = !0),
                        e([M.ownerDocument.body, M.contentWindow]).off(
                          "touchend mouseup.xdsoft",
                          t,
                        );
                    },
                  );
              },
            ),
            Y.find(".xdsoft_prev,.xdsoft_next").on(
              "touchend mousedown.xdsoft",
              function () {
                var t = e(this),
                  a = 0,
                  n = !1,
                  r = 110;
                !(function e(o) {
                  var i = A[0].clientHeight,
                    s = H[0].offsetHeight,
                    d = Math.abs(parseInt(H.css("marginTop"), 10));
                  t.hasClass(M.next) && s - i - M.timeHeightInTimePicker >= d
                    ? H.css(
                        "marginTop",
                        "-" + (d + M.timeHeightInTimePicker) + "px",
                      )
                    : t.hasClass(M.prev) &&
                      d - M.timeHeightInTimePicker >= 0 &&
                      H.css(
                        "marginTop",
                        "-" + (d - M.timeHeightInTimePicker) + "px",
                      ),
                    A.trigger("scroll_element.xdsoft_scroller", [
                      Math.abs(parseInt(H[0].style.marginTop, 10) / (s - i)),
                    ]),
                    (r = r > 10 ? 10 : r - 10),
                    n || (a = setTimeout(e, o || r));
                })(500),
                  e([M.ownerDocument.body, M.contentWindow]).on(
                    "touchend mouseup.xdsoft",
                    function t() {
                      clearTimeout(a),
                        (n = !0),
                        e([M.ownerDocument.body, M.contentWindow]).off(
                          "touchend mouseup.xdsoft",
                          t,
                        );
                    },
                  );
              },
            ),
            (o = 0),
            W.on("xchange.xdsoft", function (i) {
              clearTimeout(o),
                (o = setTimeout(function () {
                  (void 0 !== w.currentTime && null !== w.currentTime) ||
                    (w.currentTime = w.now());
                  for (
                    var o,
                      i,
                      s,
                      d,
                      u,
                      l,
                      f,
                      c,
                      m,
                      h,
                      g = "",
                      p = new Date(
                        w.currentTime.getFullYear(),
                        w.currentTime.getMonth(),
                        1,
                        12,
                        0,
                        0,
                      ),
                      D = 0,
                      y = w.now(),
                      v = !1,
                      b = !1,
                      k = !1,
                      x = !1,
                      T = [],
                      S = !0,
                      O = "";
                    p.getDay() !== M.dayOfWeekStart;

                  )
                    p.setDate(p.getDate() - 1);
                  for (
                    g += "<table><thead><tr>",
                      M.weeks && (g += "<th></th>"),
                      o = 0;
                    o < 7;
                    o += 1
                  )
                    g +=
                      "<th>" +
                      M.i18n[r].dayOfWeekShort[(o + M.dayOfWeekStart) % 7] +
                      "</th>";
                  for (
                    g += "</tr></thead>",
                      g += "<tbody>",
                      !1 !== M.maxDate &&
                        ((v = w.strToDate(M.maxDate)),
                        (v = new Date(
                          v.getFullYear(),
                          v.getMonth(),
                          v.getDate(),
                          23,
                          59,
                          59,
                          999,
                        ))),
                      !1 !== M.minDate &&
                        ((b = w.strToDate(M.minDate)),
                        (b = new Date(
                          b.getFullYear(),
                          b.getMonth(),
                          b.getDate(),
                        ))),
                      !1 !== M.minDateTime &&
                        ((k = w.strToDate(M.minDateTime)),
                        (k = new Date(
                          k.getFullYear(),
                          k.getMonth(),
                          k.getDate(),
                          k.getHours(),
                          k.getMinutes(),
                          k.getSeconds(),
                        ))),
                      !1 !== M.maxDateTime &&
                        ((x = w.strToDate(M.maxDateTime)),
                        (x = new Date(
                          x.getFullYear(),
                          x.getMonth(),
                          x.getDate(),
                          x.getHours(),
                          x.getMinutes(),
                          x.getSeconds(),
                        ))),
                      !1 !== x &&
                        (h =
                          31 * (12 * x.getFullYear() + x.getMonth()) +
                          x.getDate());
                    D < w.currentTime.countDaysInMonth() ||
                    p.getDay() !== M.dayOfWeekStart ||
                    w.currentTime.getMonth() === p.getMonth();

                  ) {
                    (T = []),
                      (D += 1),
                      (s = p.getDay()),
                      (d = p.getDate()),
                      (u = p.getFullYear()),
                      (A = p.getMonth()),
                      (l = w.getWeekOfYear(p)),
                      (m = ""),
                      T.push("xdsoft_date"),
                      (f =
                        M.beforeShowDay && e.isFunction(M.beforeShowDay.call)
                          ? M.beforeShowDay.call(W, p)
                          : null),
                      M.allowDateRe &&
                        "[object RegExp]" ===
                          Object.prototype.toString.call(M.allowDateRe) &&
                        (M.allowDateRe.test(a.formatDate(p, M.formatDate)) ||
                          T.push("xdsoft_disabled")),
                      M.allowDates &&
                        M.allowDates.length > 0 &&
                        -1 ===
                          M.allowDates.indexOf(a.formatDate(p, M.formatDate)) &&
                        T.push("xdsoft_disabled");
                    var _ =
                      31 * (12 * p.getFullYear() + p.getMonth()) + p.getDate();
                    ((!1 !== v && p > v) ||
                      (!1 !== k && p < k) ||
                      (!1 !== b && p < b) ||
                      (!1 !== x && _ > h) ||
                      (f && !1 === f[0])) &&
                      T.push("xdsoft_disabled"),
                      -1 !==
                        M.disabledDates.indexOf(
                          a.formatDate(p, M.formatDate),
                        ) && T.push("xdsoft_disabled"),
                      -1 !== M.disabledWeekDays.indexOf(s) &&
                        T.push("xdsoft_disabled"),
                      t.is("[disabled]") && T.push("xdsoft_disabled"),
                      f && "" !== f[1] && T.push(f[1]),
                      w.currentTime.getMonth() !== A &&
                        T.push("xdsoft_other_month"),
                      (M.defaultSelect || W.data("changed")) &&
                        a.formatDate(w.currentTime, M.formatDate) ===
                          a.formatDate(p, M.formatDate) &&
                        T.push("xdsoft_current"),
                      a.formatDate(y, M.formatDate) ===
                        a.formatDate(p, M.formatDate) && T.push("xdsoft_today"),
                      (0 !== p.getDay() &&
                        6 !== p.getDay() &&
                        -1 ===
                          M.weekends.indexOf(a.formatDate(p, M.formatDate))) ||
                        T.push("xdsoft_weekend"),
                      void 0 !==
                        M.highlightedDates[a.formatDate(p, M.formatDate)] &&
                        ((i =
                          M.highlightedDates[a.formatDate(p, M.formatDate)]),
                        T.push(
                          void 0 === i.style
                            ? "xdsoft_highlighted_default"
                            : i.style,
                        ),
                        (m = void 0 === i.desc ? "" : i.desc)),
                      M.beforeShowDay &&
                        e.isFunction(M.beforeShowDay) &&
                        T.push(M.beforeShowDay(p)),
                      S &&
                        ((g += "<tr>"),
                        (S = !1),
                        M.weeks && (g += "<th>" + l + "</th>")),
                      (g +=
                        '<td data-date="' +
                        d +
                        '" data-month="' +
                        A +
                        '" data-year="' +
                        u +
                        '" class="xdsoft_date xdsoft_day_of_week' +
                        p.getDay() +
                        " " +
                        T.join(" ") +
                        '" title="' +
                        m +
                        '"><div>' +
                        d +
                        "</div></td>"),
                      p.getDay() === M.dayOfWeekStartPrev &&
                        ((g += "</tr>"), (S = !0)),
                      p.setDate(d + 1);
                  }
                  (g += "</tbody></table>"),
                    P.html(g),
                    C.find(".xdsoft_label span")
                      .eq(0)
                      .text(M.i18n[r].months[w.currentTime.getMonth()]),
                    C.find(".xdsoft_label span")
                      .eq(1)
                      .text(w.currentTime.getFullYear() + M.yearOffset),
                    (O = ""),
                    (A = "");
                  var F = 0;
                  if (!1 !== M.minTime) {
                    var Y = w.strtotime(M.minTime);
                    F = 60 * Y.getHours() + Y.getMinutes();
                  }
                  var A,
                    j = 1440;
                  (!1 !== M.maxTime &&
                    ((Y = w.strtotime(M.maxTime)),
                    (j = 60 * Y.getHours() + Y.getMinutes())),
                  !1 !== M.minDateTime &&
                    ((Y = w.strToDateTime(M.minDateTime)),
                    a.formatDate(w.currentTime, M.formatDate) ===
                      a.formatDate(Y, M.formatDate) &&
                      (A = 60 * Y.getHours() + Y.getMinutes()) > F &&
                      (F = A)),
                  !1 !== M.maxDateTime) &&
                    ((Y = w.strToDateTime(M.maxDateTime)),
                    a.formatDate(w.currentTime, M.formatDate) ===
                      a.formatDate(Y, M.formatDate) &&
                      (A = 60 * Y.getHours() + Y.getMinutes()) < j &&
                      (j = A));
                  if (
                    ((c = function (n, r) {
                      var o,
                        i = w.now(),
                        s =
                          M.allowTimes &&
                          e.isArray(M.allowTimes) &&
                          M.allowTimes.length;
                      i.setHours(n),
                        (n = parseInt(i.getHours(), 10)),
                        i.setMinutes(r),
                        (r = parseInt(i.getMinutes(), 10)),
                        (T = []);
                      var d = 60 * n + r;
                      (t.is("[disabled]") || d >= j || d < F) &&
                        T.push("xdsoft_disabled"),
                        (o = new Date(w.currentTime)).setHours(
                          parseInt(w.currentTime.getHours(), 10),
                        ),
                        s ||
                          o.setMinutes(
                            Math[M.roundTime](
                              w.currentTime.getMinutes() / M.step,
                            ) * M.step,
                          ),
                        (M.initTime || M.defaultSelect || W.data("changed")) &&
                          o.getHours() === parseInt(n, 10) &&
                          ((!s && M.step > 59) ||
                            o.getMinutes() === parseInt(r, 10)) &&
                          (M.defaultSelect || W.data("changed")
                            ? T.push("xdsoft_current")
                            : M.initTime && T.push("xdsoft_init_time")),
                        parseInt(y.getHours(), 10) === parseInt(n, 10) &&
                          parseInt(y.getMinutes(), 10) === parseInt(r, 10) &&
                          T.push("xdsoft_today"),
                        (O +=
                          '<div class="xdsoft_time ' +
                          T.join(" ") +
                          '" data-hour="' +
                          n +
                          '" data-minute="' +
                          r +
                          '">' +
                          a.formatDate(i, M.formatTime) +
                          "</div>");
                    }),
                    M.allowTimes &&
                      e.isArray(M.allowTimes) &&
                      M.allowTimes.length)
                  )
                    for (D = 0; D < M.allowTimes.length; D += 1)
                      c(
                        w.strtotime(M.allowTimes[D]).getHours(),
                        (A = w.strtotime(M.allowTimes[D]).getMinutes()),
                      );
                  else
                    for (D = 0, o = 0; D < (M.hours12 ? 12 : 24); D += 1)
                      for (o = 0; o < 60; o += M.step) {
                        var I = 60 * D + o;
                        I < F ||
                          I >= j ||
                          c(
                            (D < 10 ? "0" : "") + D,
                            (A = (o < 10 ? "0" : "") + o),
                          );
                      }
                  for (
                    H.html(O), n = "", D = parseInt(M.yearStart, 10);
                    D <= parseInt(M.yearEnd, 10);
                    D += 1
                  )
                    n +=
                      '<div class="xdsoft_option ' +
                      (w.currentTime.getFullYear() === D
                        ? "xdsoft_current"
                        : "") +
                      '" data-value="' +
                      D +
                      '">' +
                      (D + M.yearOffset) +
                      "</div>";
                  for (
                    z.children().eq(0).html(n),
                      D = parseInt(M.monthStart, 10),
                      n = "";
                    D <= parseInt(M.monthEnd, 10);
                    D += 1
                  )
                    n +=
                      '<div class="xdsoft_option ' +
                      (w.currentTime.getMonth() === D ? "xdsoft_current" : "") +
                      '" data-value="' +
                      D +
                      '">' +
                      M.i18n[r].months[D] +
                      "</div>";
                  J.children().eq(0).html(n), e(W).trigger("generate.xdsoft");
                }, 10)),
                i.stopPropagation();
            }).on("afterOpen.xdsoft", function () {
              var e, t, a, n;
              M.timepicker &&
                (H.find(".xdsoft_current").length
                  ? (e = ".xdsoft_current")
                  : H.find(".xdsoft_init_time").length &&
                    (e = ".xdsoft_init_time"),
                e
                  ? ((t = A[0].clientHeight),
                    (a = H[0].offsetHeight) - t <
                      (n = H.find(e).index() * M.timeHeightInTimePicker + 1) &&
                      (n = a - t),
                    A.trigger("scroll_element.xdsoft_scroller", [
                      parseInt(n, 10) / (a - t),
                    ]))
                  : A.trigger("scroll_element.xdsoft_scroller", [0]));
            }),
            (i = 0),
            P.on("touchend click.xdsoft", "td", function (a) {
              a.stopPropagation(), (i += 1);
              var n = e(this),
                r = w.currentTime;
              if (
                (null == r && ((w.currentTime = w.now()), (r = w.currentTime)),
                n.hasClass("xdsoft_disabled"))
              )
                return !1;
              r.setDate(1),
                r.setFullYear(n.data("year")),
                r.setMonth(n.data("month")),
                r.setDate(n.data("date")),
                W.trigger("select.xdsoft", [r]),
                t.val(w.str()),
                M.onSelectDate &&
                  e.isFunction(M.onSelectDate) &&
                  M.onSelectDate.call(W, w.currentTime, W.data("input"), a),
                W.data("changed", !0),
                W.trigger("xchange.xdsoft"),
                W.trigger("changedatetime.xdsoft"),
                (i > 1 ||
                  !0 === M.closeOnDateSelect ||
                  (!1 === M.closeOnDateSelect && !M.timepicker)) &&
                  !M.inline &&
                  W.trigger("close.xdsoft"),
                setTimeout(function () {
                  i = 0;
                }, 200);
            }),
            H.on("touchstart", "div", function (e) {
              this.touchMoved = !1;
            })
              .on("touchmove", "div", L)
              .on("touchend click.xdsoft", "div", function (t) {
                if (!this.touchMoved) {
                  t.stopPropagation();
                  var a = e(this),
                    n = w.currentTime;
                  if (
                    (null == n &&
                      ((w.currentTime = w.now()), (n = w.currentTime)),
                    a.hasClass("xdsoft_disabled"))
                  )
                    return !1;
                  n.setHours(a.data("hour")),
                    n.setMinutes(a.data("minute")),
                    W.trigger("select.xdsoft", [n]),
                    W.data("input").val(w.str()),
                    M.onSelectTime &&
                      e.isFunction(M.onSelectTime) &&
                      M.onSelectTime.call(W, w.currentTime, W.data("input"), t),
                    W.data("changed", !0),
                    W.trigger("xchange.xdsoft"),
                    W.trigger("changedatetime.xdsoft"),
                    !0 !== M.inline &&
                      !0 === M.closeOnTimeSelect &&
                      W.trigger("close.xdsoft");
                }
              }),
            F.on("mousewheel.xdsoft", function (e) {
              return (
                !M.scrollMonth ||
                (e.deltaY < 0 ? w.nextMonth() : w.prevMonth(), !1)
              );
            }),
            t.on("mousewheel.xdsoft", function (e) {
              return (
                !M.scrollInput ||
                (!M.datepicker && M.timepicker
                  ? ((s = H.find(".xdsoft_current").length
                      ? H.find(".xdsoft_current").eq(0).index()
                      : 0) +
                      e.deltaY >=
                      0 &&
                      s + e.deltaY < H.children().length &&
                      (s += e.deltaY),
                    H.children().eq(s).length &&
                      H.children().eq(s).trigger("mousedown"),
                    !1)
                  : M.datepicker && !M.timepicker
                  ? (F.trigger(e, [e.deltaY, e.deltaX, e.deltaY]),
                    t.val && t.val(w.str()),
                    W.trigger("changedatetime.xdsoft"),
                    !1)
                  : void 0)
              );
            }),
            W.on("changedatetime.xdsoft", function (t) {
              if (M.onChangeDateTime && e.isFunction(M.onChangeDateTime)) {
                var a = W.data("input");
                M.onChangeDateTime.call(W, w.currentTime, a, t),
                  delete M.value,
                  a.trigger("change");
              }
            })
              .on("generate.xdsoft", function () {
                M.onGenerate &&
                  e.isFunction(M.onGenerate) &&
                  M.onGenerate.call(W, w.currentTime, W.data("input")),
                  I && (W.trigger("afterOpen.xdsoft"), (I = !1));
              })
              .on("click.xdsoft", function (e) {
                e.stopPropagation();
              }),
            (s = 0),
            (O = function (e, t) {
              do {
                if (!(e = e.parentNode) || !1 === t(e)) break;
              } while ("HTML" !== e.nodeName);
            }),
            (d = function () {
              var t, a, n, r, o, i, s, d, u, l, f, c, m;
              if (
                ((t = (d = W.data("input")).offset()),
                (a = d[0]),
                (l = "top"),
                (n = t.top + a.offsetHeight - 1),
                (r = t.left),
                (o = "absolute"),
                (u = e(M.contentWindow).width()),
                (c = e(M.contentWindow).height()),
                (m = e(M.contentWindow).scrollTop()),
                M.ownerDocument.documentElement.clientWidth - t.left <
                  F.parent().outerWidth(!0))
              ) {
                var h = F.parent().outerWidth(!0) - a.offsetWidth;
                r -= h;
              }
              "rtl" === d.parent().css("direction") &&
                (r -= W.outerWidth() - d.outerWidth()),
                M.fixed
                  ? ((n -= m),
                    (r -= e(M.contentWindow).scrollLeft()),
                    (o = "fixed"))
                  : ((s = !1),
                    O(a, function (e) {
                      return (
                        null !== e &&
                        ("fixed" ===
                        M.contentWindow
                          .getComputedStyle(e)
                          .getPropertyValue("position")
                          ? ((s = !0), !1)
                          : void 0)
                      );
                    }),
                    s && !M.insideParent
                      ? ((o = "fixed"),
                        n + W.outerHeight() > c + m
                          ? ((l = "bottom"), (n = c + m - t.top))
                          : (n -= m))
                      : n + W[0].offsetHeight > c + m &&
                        (n = t.top - W[0].offsetHeight + 1),
                    n < 0 && (n = 0),
                    r + a.offsetWidth > u && (r = u - a.offsetWidth)),
                (i = W[0]),
                O(i, function (e) {
                  if (
                    "relative" ===
                      M.contentWindow
                        .getComputedStyle(e)
                        .getPropertyValue("position") &&
                    u >= e.offsetWidth
                  )
                    return (r -= (u - e.offsetWidth) / 2), !1;
                }),
                (f = {
                  position: o,
                  left: M.insideParent ? a.offsetLeft : r,
                  top: "",
                  bottom: "",
                }),
                M.insideParent
                  ? (f[l] = a.offsetTop + a.offsetHeight)
                  : (f[l] = n),
                W.css(f);
            }),
            W.on("open.xdsoft", function (t) {
              var a = !0;
              M.onShow &&
                e.isFunction(M.onShow) &&
                (a = M.onShow.call(W, w.currentTime, W.data("input"), t)),
                !1 !== a &&
                  (W.show(),
                  d(),
                  e(M.contentWindow)
                    .off("resize.xdsoft", d)
                    .on("resize.xdsoft", d),
                  M.closeOnWithoutClick &&
                    e([M.ownerDocument.body, M.contentWindow]).on(
                      "touchstart mousedown.xdsoft",
                      function t() {
                        W.trigger("close.xdsoft"),
                          e([M.ownerDocument.body, M.contentWindow]).off(
                            "touchstart mousedown.xdsoft",
                            t,
                          );
                      },
                    ));
            })
              .on("close.xdsoft", function (t) {
                var a = !0;
                C.find(".xdsoft_month,.xdsoft_year")
                  .find(".xdsoft_select")
                  .hide(),
                  M.onClose &&
                    e.isFunction(M.onClose) &&
                    (a = M.onClose.call(W, w.currentTime, W.data("input"), t)),
                  !1 === a || M.opened || M.inline || W.hide(),
                  t.stopPropagation();
              })
              .on("toggle.xdsoft", function () {
                W.is(":visible")
                  ? W.trigger("close.xdsoft")
                  : W.trigger("open.xdsoft");
              })
              .data("input", t),
            (N = 0),
            W.data("xdsoft_datetime", w),
            W.setOptions(M),
            w.setCurrentTime(E()),
            t
              .data("xdsoft_datetimepicker", W)
              .on(
                "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                function () {
                  t.is(":disabled") ||
                    (t.data("xdsoft_datetimepicker").is(":visible") &&
                      M.closeOnInputClick) ||
                    (M.openOnFocus &&
                      (clearTimeout(N),
                      (N = setTimeout(function () {
                        t.is(":disabled") ||
                          ((I = !0),
                          w.setCurrentTime(E(), !0),
                          M.mask && R(M),
                          W.trigger("open.xdsoft"));
                      }, 100))));
                },
              )
              .on("keydown.xdsoft", function (t) {
                var a,
                  n = t.which;
                return -1 !== [f].indexOf(n) && M.enterLikeTab
                  ? ((a = e(
                      "input:visible,textarea:visible,button:visible,a:visible",
                    )),
                    W.trigger("close.xdsoft"),
                    a.eq(a.index(this) + 1).focus(),
                    !1)
                  : -1 !== [D].indexOf(n)
                  ? (W.trigger("close.xdsoft"), !0)
                  : void 0;
              })
              .on("blur.xdsoft", function () {
                W.trigger("close.xdsoft");
              });
        }),
        (s = function (t) {
          var a = t.data("xdsoft_datetimepicker");
          a &&
            (a.data("xdsoft_datetime", null),
            a.remove(),
            t.data("xdsoft_datetimepicker", null).off(".xdsoft"),
            e(M.contentWindow).off("resize.xdsoft"),
            e([M.contentWindow, M.ownerDocument.body]).off(
              "mousedown.xdsoft touchstart",
            ),
            t.unmousewheel && t.unmousewheel());
        }),
        e(M.ownerDocument)
          .off("keydown.xdsoftctrl keyup.xdsoftctrl")
          .off("keydown.xdsoftcmd keyup.xdsoftcmd")
          .on("keydown.xdsoftctrl", function (e) {
            e.keyCode === u && (S = !0);
          })
          .on("keyup.xdsoftctrl", function (e) {
            e.keyCode === u && (S = !1);
          })
          .on("keydown.xdsoftcmd", function (e) {
            e.keyCode;
          })
          .on("keyup.xdsoftcmd", function (e) {
            e.keyCode;
          }),
        this.each(function () {
          var t,
            r = e(this).data("xdsoft_datetimepicker");
          if (r) {
            if ("string" === e.type(n))
              switch (n) {
                case "show":
                  e(this).select().focus(), r.trigger("open.xdsoft");
                  break;
                case "hide":
                  r.trigger("close.xdsoft");
                  break;
                case "toggle":
                  r.trigger("toggle.xdsoft");
                  break;
                case "destroy":
                  s(e(this));
                  break;
                case "reset":
                  (this.value = this.defaultValue),
                    (this.value &&
                      r
                        .data("xdsoft_datetime")
                        .isValidDate(a.parseDate(this.value, M.format))) ||
                      r.data("changed", !1),
                    r.data("xdsoft_datetime").setCurrentTime(this.value);
                  break;
                case "validate":
                  r.data("input").trigger("blur.xdsoft");
                  break;
                default:
                  r[n] && e.isFunction(r[n]) && (d = r[n](o));
              }
            else r.setOptions(n);
            return 0;
          }
          "string" !== e.type(n) &&
            (!M.lazyInit || M.open || M.inline
              ? i(e(this))
              : (t = e(this)).on(
                  "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                  function e() {
                    t.is(":disabled") ||
                      t.data("xdsoft_datetimepicker") ||
                      (clearTimeout(w),
                      (w = setTimeout(function () {
                        t.data("xdsoft_datetimepicker") || i(t),
                          t
                            .off(
                              "open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",
                              e,
                            )
                            .trigger("open.xdsoft");
                      }, 100)));
                  },
                ));
        }),
        d
      );
    }),
    (e.fn.datetimepicker.defaults = t);
};
!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery", "jquery-mousewheel"], e)
    : "object" == typeof exports
    ? (module.exports = e(require("jquery")))
    : e(jQuery);
})(datetimepickerFactory),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof exports
      ? (module.exports = e)
      : e(jQuery);
  })(function (e) {
    var t,
      a,
      n = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      r =
        "onwheel" in document || document.documentMode >= 9
          ? ["wheel"]
          : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      o = Array.prototype.slice;
    if (e.event.fixHooks)
      for (var i = n.length; i; ) e.event.fixHooks[n[--i]] = e.event.mouseHooks;
    var s = (e.event.special.mousewheel = {
      version: "3.1.12",
      setup: function () {
        if (this.addEventListener)
          for (var t = r.length; t; ) this.addEventListener(r[--t], d, !1);
        else this.onmousewheel = d;
        e.data(this, "mousewheel-line-height", s.getLineHeight(this)),
          e.data(this, "mousewheel-page-height", s.getPageHeight(this));
      },
      teardown: function () {
        if (this.removeEventListener)
          for (var t = r.length; t; ) this.removeEventListener(r[--t], d, !1);
        else this.onmousewheel = null;
        e.removeData(this, "mousewheel-line-height"),
          e.removeData(this, "mousewheel-page-height");
      },
      getLineHeight: function (t) {
        var a = e(t),
          n = a["offsetParent" in e.fn ? "offsetParent" : "parent"]();
        return (
          n.length || (n = e("body")),
          parseInt(n.css("fontSize"), 10) ||
            parseInt(a.css("fontSize"), 10) ||
            16
        );
      },
      getPageHeight: function (t) {
        return e(t).height();
      },
      settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    function d(n) {
      var r,
        i = n || window.event,
        d = o.call(arguments, 1),
        f = 0,
        c = 0,
        m = 0,
        h = 0,
        g = 0;
      if (
        (((n = e.event.fix(i)).type = "mousewheel"),
        "detail" in i && (m = -1 * i.detail),
        "wheelDelta" in i && (m = i.wheelDelta),
        "wheelDeltaY" in i && (m = i.wheelDeltaY),
        "wheelDeltaX" in i && (c = -1 * i.wheelDeltaX),
        "axis" in i && i.axis === i.HORIZONTAL_AXIS && ((c = -1 * m), (m = 0)),
        (f = 0 === m ? c : m),
        "deltaY" in i && (f = m = -1 * i.deltaY),
        "deltaX" in i && ((c = i.deltaX), 0 === m && (f = -1 * c)),
        0 !== m || 0 !== c)
      ) {
        if (1 === i.deltaMode) {
          var p = e.data(this, "mousewheel-line-height");
          (f *= p), (m *= p), (c *= p);
        } else if (2 === i.deltaMode) {
          var D = e.data(this, "mousewheel-page-height");
          (f *= D), (m *= D), (c *= D);
        }
        if (
          ((r = Math.max(Math.abs(m), Math.abs(c))),
          (!a || r < a) && ((a = r), l(i, r) && (a /= 40)),
          l(i, r) && ((f /= 40), (c /= 40), (m /= 40)),
          (f = Math[f >= 1 ? "floor" : "ceil"](f / a)),
          (c = Math[c >= 1 ? "floor" : "ceil"](c / a)),
          (m = Math[m >= 1 ? "floor" : "ceil"](m / a)),
          s.settings.normalizeOffset && this.getBoundingClientRect)
        ) {
          var y = this.getBoundingClientRect();
          (h = n.clientX - y.left), (g = n.clientY - y.top);
        }
        return (
          (n.deltaX = c),
          (n.deltaY = m),
          (n.deltaFactor = a),
          (n.offsetX = h),
          (n.offsetY = g),
          (n.deltaMode = 0),
          d.unshift(n, f, c, m),
          t && clearTimeout(t),
          (t = setTimeout(u, 200)),
          (e.event.dispatch || e.event.handle).apply(this, d)
        );
      }
    }
    function u() {
      a = null;
    }
    function l(e, t) {
      return (
        s.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
      );
    }
    e.fn.extend({
      mousewheel: function (e) {
        return e ? this.bind("mousewheel", e) : this.trigger("mousewheel");
      },
      unmousewheel: function (e) {
        return this.unbind("mousewheel", e);
      },
    });
  });
