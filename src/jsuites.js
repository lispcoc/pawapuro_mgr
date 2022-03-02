(function(l, b) { "object" === typeof exports && "undefined" !== typeof module ? module.exports = b() : "function" === typeof define && define.amd ? define(b) : l.jSuites = b() })(this, function() {
    var l = function(b) {
        var e = {
            init: function() { var a = document.querySelector(".japp");
                e.el = a ? a : document.body;
                a = document.querySelectorAll("[data-autoload]"); for (var f = 0; f < a.length; f++) { var c = a[f].getAttribute("data-autoload"); if ("function" == typeof window[c]) window[c](a[f]) } },
            guid: function() {
                for (var a = "", f = 0; 32 > f; f++) a += Math.floor(15 * Math.random()).toString(15);
                return a
            },
            getWindowWidth: function() { var a = window,
                    f = document,
                    c = f.documentElement;
                f = f.getElementsByTagName("body")[0]; return a.innerWidth || c.clientWidth || f.clientWidth },
            getWindowHeight: function() { var a = window,
                    f = document,
                    c = f.documentElement;
                f = f.getElementsByTagName("body")[0]; return a.innerHeight || c.clientHeight || f.clientHeight },
            getPosition: function(a) {
                if (a.changedTouches && a.changedTouches[0]) { var f = a.changedTouches[0].pageX;
                    a = a.changedTouches[0].pageY } else f = window.Event ? a.pageX : a.clientX + (document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft : document.body.scrollLeft), a = window.Event ? a.pageY : a.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                return [f, a]
            },
            click: function(a) { if (a.click) a.click();
                else { var f = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
                    a.dispatchEvent(f) } },
            getElement: function(a, f) {
                function c(g) { g.className && g.classList.contains(f) && (d = g);
                    g.parentNode && c(g.parentNode) } var d = !1;
                c(a); return d },
            getLinkElement: function(a) {
                function f(d) {
                    "A" !=
                    d.tagName && "DIV" != d.tagName || !d.getAttribute("data-href") || (c = d);
                    d.parentNode && f(d.parentNode)
                }
                var c = !1;
                f(a);
                return c
            },
            getFormElements: function(a) { var f = {};
                a = a ? a.querySelectorAll("input, select, textarea") : document.querySelectorAll("input, select, textarea"); for (var c = 0; c < a.length; c++) { var d = a[c],
                        g = d.name;
                    d = d.value;
                    g && (f[g] = d) } return f },
            exists: function(a, f) { var c = new XMLHttpRequest;
                c.open("HEAD", a, !1);
                c.send();
                c.status && f(c.status) },
            getFiles: function(a) {
                a || console.error("No element defined in the arguments of your method");
                a = a.querySelectorAll(".jfile");
                if (0 < a.length) {
                    for (var f = [], c = 0; c < a.length; c++) {
                        var d = {},
                            g = a[c].getAttribute("src");
                        a[c].classList.contains("jremove") ? d.remove = 1 : ("data" == g.substr(0, 4) ? (d.content = g.substr(g.indexOf(",") + 1), d.extension = a[c].getAttribute("data-extension")) : (d.file = g, d.extension = a[c].getAttribute("data-extension"), d.extension || (d.extension = g.substr(g.lastIndexOf(".") + 1)), l.files[d.file] && (d.content = l.files[d.file])), a[c].getAttribute("data-name") && (d.name = a[c].getAttribute("data-name")),
                            a[c].getAttribute("data-file") && (d.file = a[c].getAttribute("data-file")), a[c].getAttribute("data-size") && (d.size = a[c].getAttribute("data-size")), a[c].getAttribute("data-date") && (d.date = a[c].getAttribute("data-date")), a[c].getAttribute("data-cover") && (d.cover = a[c].getAttribute("data-cover")));
                        f[c] = d
                    }
                    return f
                }
            },
            ajax: function(a) {
                a.data || (a.data = {});
                a.type && (a.method = a.type);
                if (a.data) {
                    var f = [],
                        c = Object.keys(a.data);
                    if (c.length)
                        for (var d = 0; d < c.length; d++)
                            if ("object" == typeof a.data[c[d]])
                                for (var g = a.data[c[d]],
                                        k = 0; k < g.length; k++)
                                    if ("string" == typeof g[k]) f.push(c[d] + "[" + k + "]=" + encodeURIComponent(g[k]));
                                    else
                                        for (var q = Object.keys(g[k]), p = 0; p < q.length; p++) f.push(c[d] + "[" + k + "][" + q[p] + "]=" + encodeURIComponent(g[k][q[p]]));
                    else f.push(c[d] + "=" + encodeURIComponent(a.data[c[d]]));
                    "GET" == a.method && 0 < f.length && (0 > a.url.indexOf("?") && (a.url += "?"), a.url += f.join("&"))
                }
                var h = new XMLHttpRequest;
                h.open(a.method, a.url, !0);
                h.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                "POST" == a.method ? (h.setRequestHeader("Accept",
                    "application/json"), h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")) : "json" == a.dataType && h.setRequestHeader("Content-Type", "text/json");
                1 != a.cache && (h.setRequestHeader("pragma", "no-cache"), h.setRequestHeader("cache-control", "no-cache"));
                1 == a.withCredentials && (h.withCredentials = !0);
                "function" == typeof a.beforeSend && a.beforeSend(h);
                h.onload = function() {
                    if (200 === h.status)
                        if ("json" == a.dataType) try { var m = JSON.parse(h.responseText);
                            a.success && "function" == typeof a.success && a.success(m) } catch (x) {
                            a.error &&
                                "function" == typeof a.error && a.error(m)
                        } else m = h.responseText, a.success && "function" == typeof a.success && a.success(m);
                        else a.error && "function" == typeof a.error && a.error(h.responseText);
                    if (e.ajax.requests && e.ajax.requests.length) { var w = e.ajax.requests.indexOf(h);
                        e.ajax.requests.splice(w, 1);
                        e.ajax.requests.length || a.complete && "function" == typeof a.complete && a.complete(m) }
                };
                f ? h.send(f.join("&")) : h.send();
                e.ajax.requests.push(h);
                return h
            }
        };
        e.ajax.requests = [];
        e.slideLeft = function(a, f, c) {
            1 == f ? (a.classList.add("slide-left-in"),
                setTimeout(function() { a.classList.remove("slide-left-in"); "function" == typeof c && c() }, 400)) : (a.classList.add("slide-left-out"), setTimeout(function() { a.classList.remove("slide-left-out"); "function" == typeof c && c() }, 400))
        };
        e.slideRight = function(a, f, c) {
            1 == f ? (a.classList.add("slide-right-in"), setTimeout(function() { a.classList.remove("slide-right-in"); "function" == typeof c && c() }, 400)) : (a.classList.add("slide-right-out"), setTimeout(function() { a.classList.remove("slide-right-out"); "function" == typeof c && c() },
                400))
        };
        e.slideTop = function(a, f, c) { 1 == f ? (a.classList.add("slide-top-in"), setTimeout(function() { a.classList.remove("slide-top-in"); "function" == typeof c && c() }, 400)) : (a.classList.add("slide-top-out"), setTimeout(function() { a.classList.remove("slide-top-out"); "function" == typeof c && c() }, 400)) };
        e.slideBottom = function(a, f, c) {
            1 == f ? (a.classList.add("slide-bottom-in"), setTimeout(function() { a.classList.remove("slide-bottom-in"); "function" == typeof c && c() }, 400)) : (a.classList.add("slide-bottom-out"), setTimeout(function() {
                a.classList.remove("slide-bottom-out");
                "function" == typeof c && c()
            }, 100))
        };
        e.fadeIn = function(a, f) { a.classList.add("fade-in");
            setTimeout(function() { a.classList.remove("fade-in"); "function" == typeof f && f() }, 2E3) };
        e.fadeOut = function(a, f) { a.classList.add("fade-out");
            setTimeout(function() { a.classList.remove("fade-out"); "function" == typeof f && f() }, 1E3) };
        e.keyDownControls = function(a) {
            if (27 == a.which) { var f = document.querySelectorAll(".jslider"); if (0 < f.length)
                    for (var c = 0; c < f.length; c++) f[c].slider.close();
                document.querySelector(".jdialog") && l.dialog.close() } else if (13 ==
                a.which && document.querySelector(".jdialog")) { if ("function" == typeof l.dialog.options.onconfirm) l.dialog.options.onconfirm();
                l.dialog.close() }
            l.mask && l.mask.apply(a)
        };
        b = function(a) { if (a = l.getLinkElement(a.target)) a = a.getAttribute("data-href"), "#back" == a ? window.history.back() : "#panel" == a ? l.panel() : l.pages(a) };
        document.addEventListener("swipeleft", function(a) {
            var f = l.getElement(a.target, "option");
            f && f.querySelector(".option-actions") ? f.scrollTo({ left: 100, behavior: "smooth" }) : (f = l.getElement(a.target, "jcalendar")) &&
                l.calendar.current ? l.calendar.current.prev() : l.panel && (f = l.panel.get()) && "none" != f.style.display && l.panel.close()
        });
        document.addEventListener("swiperight", function(a) { var f = l.getElement(a.target, "option");
            f && f.querySelector(".option-actions") ? f.scrollTo({ left: 0, behavior: "smooth" }) : (f = l.getElement(a.target, "jcalendar")) && l.calendar.current ? l.calendar.current.next() : l.panel && (f = l.panel.get()) && "none" == f.style.display && l.panel() });
        document.addEventListener("keydown", e.keyDownControls);
        !0 === "ontouchend" in
            document.documentElement ? document.addEventListener("touchend", b) : document.addEventListener("mouseup", b);
        document.addEventListener("mouseover", function(a) { l.tooltip && l.tooltip(a) });
        document.addEventListener("mouseout", function(a) { l.tooltip && l.tooltip.hide() });
        document.addEventListener("DOMContentLoaded", function() { e.init() });
        window.onpopstate = function(a) { a.state && a.state.route && l.pages.get(a.state.route) && l.pages(a.state.route, { ignoreHistory: !0 }) };
        return e
    }();
    l.files = [];
    l.calendar = function(b, e) {
        var a = { options: {} };
        l.calendar.current || (l.calendar.current = null);
        var f = { data: null, type: null, validRange: null, startingDay: null, format: "DD/MM/YYYY", readonly: !0, today: !1, time: !1, resetButton: !0, placeholder: "", months: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), weekdays_short: "SMTWTFS".split(""), value: null, onclose: null, onchange: null, fullscreen: !1, mode: null, position: null, opened: !1 };
        for (c in f) e && e.hasOwnProperty(c) ?
            a.options[c] = e[c] : a.options[c] = f[c];
        !a.options.value && "INPUT" == b.tagName && b.value && (a.options.value = b.value);
        a.options.format = a.options.format.toUpperCase();
        if (a.options.value) { f = a.options.value.split(" "); var c = f[1];
            f = f[0].split("-"); var d = parseInt(f[0]),
                g = parseInt(f[1]),
                k = parseInt(f[2]); if (c) { c = c.split(":"); var q = parseInt(c[0]),
                    p = parseInt(c[1]) } else p = q = 0 } else f = new Date, d = f.getFullYear(), g = f.getMonth() + 1, k = f.getDate(), q = f.getHours(), p = f.getMinutes();
        a.date = [d, g, k, q, p, 0];
        var h = function(v) {
            v = "" +
                v;
            1 == v.length && (v = "0" + v);
            return v
        };
        f = document.createElement("div");
        f.className = "jcalendar-reset";
        f.innerHTML = "Reset";
        c = document.createElement("div");
        c.className = "jcalendar-confirm";
        c.innerHTML = "Done";
        d = document.createElement("div");
        d.className = "jcalendar-controls";
        a.options.resetButton && d.appendChild(f);
        d.appendChild(c);
        var m = document.createElement("div");
        m.className = "jcalendar-container";
        var w = document.createElement("div");
        w.className = "jcalendar-content";
        w.appendChild(d);
        m.appendChild(w);
        f = document.createElement("div");
        f.className = "jcalendar-table";
        w.appendChild(f);
        var x = "INPUT" == b.tagName ? document.createElement("div") : b;
        x.className = "jcalendar";
        x.appendChild(m);
        d = document.createElement("td");
        d.setAttribute("colspan", "2");
        d.className = "jcalendar-prev";
        var F = document.createElement("span");
        F.className = "jcalendar-year";
        var D = document.createElement("span");
        D.className = "jcalendar-month";
        g = document.createElement("td");
        g.className = "jcalendar-header";
        g.setAttribute("colspan", "3");
        g.appendChild(D);
        g.appendChild(F);
        k = document.createElement("td");
        k.setAttribute("colspan", "2");
        k.className = "jcalendar-next";
        c = document.createElement("tr");
        c.appendChild(d);
        c.appendChild(g);
        c.appendChild(k);
        d = document.createElement("thead");
        d.appendChild(c);
        var K = document.createElement("tbody");
        c = document.createElement("tfoot");
        var H = document.createElement("table");
        H.setAttribute("cellpadding", "0");
        H.setAttribute("cellspacing", "0");
        H.appendChild(d);
        H.appendChild(K);
        H.appendChild(c);
        f.appendChild(H);
        var t = document.createElement("select");
        t.className = "jcalendar-select";
        t.onchange = function() { a.date[3] = this.value };
        for (p = 0; 24 > p; p++) f = document.createElement("option"), f.value = p, f.innerHTML = h(p), t.appendChild(f);
        var A = document.createElement("select");
        A.className = "jcalendar-select";
        A.onchange = function() { a.date[4] = this.value };
        for (p = 0; 60 > p; p++) f = document.createElement("option"), f.value = p, f.innerHTML = h(p), A.appendChild(f);
        f = document.createElement("div");
        f.className = "jcalendar-controls";
        var B = document.createElement("div");
        B.className = "jcalendar-time";
        B.style.maxWidth = "140px";
        B.appendChild(t);
        B.appendChild(A);
        var J = document.createElement("input");
        J.setAttribute("type", "button");
        J.className = "jcalendar-update";
        J.value = "Update";
        c = document.createElement("div");
        c.style.flexGrow = "10";
        c.appendChild(J);
        f.appendChild(B);
        f.appendChild(c);
        w.appendChild(f);
        f = document.createElement("div");
        f.className = "jcalendar-backdrop";
        x.appendChild(f);
        var M = function() {
            var v = x.querySelector(".jcalendar-selected");
            v && v.classList.contains("jcalendar-disabled") ? (J.setAttribute("disabled", "disabled"),
                t.setAttribute("disabled", "disabled"), A.setAttribute("disabled", "disabled")) : (J.removeAttribute("disabled"), t.removeAttribute("disabled"), A.removeAttribute("disabled"))
        };
        a.open = function(v) {
            if (!x.classList.contains("jcalendar-focus"))
                if (l.calendar.current && l.calendar.current.close(), l.calendar.current = a, x.classList.add("jcalendar-focus"), a.getDays(), a.options.time && (t.value = a.date[3], A.value = a.date[4]), 800 > l.getWindowWidth() || a.options.fullscreen) x.classList.add("jcalendar-fullsize"), l.slideBottom(w,
                    1);
                else { v = b.getBoundingClientRect(); var z = w.getBoundingClientRect();
                    a.options.position ? (m.style.position = "fixed", m.style.top = window.innerHeight < v.bottom + z.height ? v.top - (z.height + 2) + "px" : v.top + v.height + 2 + "px", m.style.left = v.left + "px") : window.innerHeight < v.bottom + z.height ? m.style.bottom = 1 * v.height + z.height + 2 + "px" : m.style.top = "2px" }
        };
        a.close = function(v, z) {
            if (l.calendar.current) {
                l.calendar.current = null;
                if (!1 !== z) {
                    var I = x.querySelector(".jcalendar-selected");
                    I = "string" == typeof z ? z : I && I.classList.contains("jcalendar-disabled") ?
                        a.options.value : a.getValue();
                    a.setValue(I)
                }
                if (!v && "function" == typeof a.options.onclose) a.options.onclose(b);
                x.classList.remove("jcalendar-focus")
            }
            return a.options.value
        };
        a.prev = function() { "years" == a.options.mode ? (a.date[0] -= 12, a.getYears()) : (2 > a.date[1] ? (--a.date[0], a.date[1] = 12) : --a.date[1], a.getDays()) };
        a.next = function() { "years" == a.options.mode ? (a.date[0] = parseInt(a.date[0]) + 12, a.getYears()) : (11 < a.date[1] ? (a.date[0] = parseInt(a.date[0]) + 1, a.date[1] = 1) : a.date[1] = parseInt(a.date[1]) + 1, a.getDays()) };
        a.setValue = function(v) { v || (v = "" + v); var z = v,
                I = a.options.value;
            a.setLabel(z, a.options.format); var y = z.split(" ");
            y[1] || (y[1] = "00:00:00"); var n = y[1].split(":");
            y = y[0].split("-");
            v = parseInt(y[0]); var r = parseInt(y[1]);
            y = parseInt(y[2]); var u = parseInt(n[0]);
            n = parseInt(n[1]);
            a.date = [v, r, y, u, n, 0];
            v = a.setLabel(z, a.options.format); if (I != z && ("INPUT" == b.tagName && (b.value = v), a.options.value = z, "function" == typeof a.options.onchange)) a.options.onchange(b, z, I);
            a.getDays() };
        a.getValue = function() {
            return a.date ? a.options.time ?
                h(a.date[0]) + "-" + h(a.date[1]) + "-" + h(a.date[2]) + " " + h(a.date[3]) + ":" + h(a.date[4]) + ":" + h(0) : h(a.date[0]) + "-" + h(a.date[1]) + "-" + h(a.date[2]) + " " + h(0) + ":" + h(0) + ":" + h(0) : ""
        };
        a.update = function(v) { if (!v.classList.contains("jcalendar-disabled")) { a.date[2] = v.innerText;
                a.options.time ? (a.date[3] = t.value, a.date[4] = A.value) : a.close(); var z = x.querySelector(".jcalendar-selected");
                z && z.classList.remove("jcalendar-selected");
                v.classList.add("jcalendar-selected") }
            M() };
        a.reset = function() { a.close(!1, "") };
        a.getDays = function() {
            a.options.mode =
                "days";
            var v = new Date,
                z = a.date && a.date[0] ? a.date[0] : parseInt(v.getFullYear()),
                I = a.date && a.date[1] ? a.date[1] : parseInt(v.getMonth()) + 1,
                y = a.date && a.date[2] ? a.date[2] : parseInt(v.getDay()),
                n = a.date && a.date[3] ? a.date[3] : parseInt(v.getHours()),
                r = a.date && a.date[4] ? a.date[4] : parseInt(v.getMinutes());
            a.date = [z, I, y, n, r, 0];
            F.innerHTML = z;
            D.innerHTML = a.options.months[I - 1];
            n = v.getMonth() == I - 1 && v.getFullYear() == z ? !0 : !1;
            r = v.getDate();
            v = new Date(z, I, 0, 0, 0);
            var u = v.getDate();
            v = new Date(z, I - 1, 0, 0, 0);
            v = v.getDay() + 1;
            var C =
                a.options.startingDay || 0;
            v -= C;
            K.innerHTML = "";
            var E = document.createElement("tr");
            E.setAttribute("align", "center");
            K.appendChild(E);
            for (var P = 0; 7 > P; P++) { var G = document.createElement("td");
                G.classList.add("jcalendar-weekday");
                G.innerHTML = a.options.weekdays_short[C];
                E.appendChild(G);
                C++;
                6 < C && (C = 0) }
            for (var O = C = 0, L = 0; 5 > L; L++) {
                E = document.createElement("tr");
                E.setAttribute("align", "center");
                var Q = !0;
                for (P = 0; 7 > P; P++) {
                    G = document.createElement("td");
                    G.classList.add("jcalendar-set-day");
                    if (C >= v && C < v + u) {
                        O++;
                        G.innerHTML =
                            O;
                        O == y && G.classList.add("jcalendar-selected");
                        n && r == O && (G.style.fontWeight = "bold");
                        Q = l.calendar.now(new Date(z, I - 1, O), !0);
                        if (a.options.validRange) { var N = !a.options.validRange[1] || Q <= a.options.validRange[1] ? !0 : !1;
                            (!a.options.validRange[0] || Q >= a.options.validRange[0]) && N || G.classList.add("jcalendar-disabled") }
                        Q = !1
                    }
                    E.appendChild(G);
                    C++
                }
                0 == Q && K.appendChild(E)
            }
            B.style.display = a.options.time ? "" : "none";
            M()
        };
        a.getMonths = function() {
            a.options.mode = "months";
            var v = a.options.months;
            F.innerHTML = a.date[0];
            D.innerHTML =
                "";
            var z = '<td colspan="7"><table width="100%"><tr align="center">';
            for (p = 0; 12 > p; p++) { 0 < p && !(p % 4) && (z += '</tr><tr align="center">'); var I = parseInt(p) + 1;
                z += '<td class="jcalendar-set-month" data-value="' + I + '">' + v[p] + "</td>" }
            K.innerHTML = z + "</tr></table></td>"
        };
        a.getYears = function() {
            a.options.mode = "years";
            var v = [];
            for (p = 0; 25 > p; p++) v[p] = parseInt(a.date[0]) + (p - 12);
            var z = '<td colspan="7"><table width="100%"><tr align="center">';
            for (p = 0; 25 > p; p++) 0 < p && !(p % 5) && (z += '</tr><tr align="center">'), z += '<td class="jcalendar-set-year">' +
                v[p] + "</td>";
            K.innerHTML = z + "</tr></table></td>"
        };
        a.setLabel = function(v, z) { return l.calendar.getDateString(v, z) };
        a.fromFormatted = function(v, z) { return l.calendar.extractDateFromString(v, z) };
        f = function(v) {
            var z = v.target.className;
            "jcalendar-prev" == z ? (a.prev(), v.stopPropagation(), v.preventDefault()) : "jcalendar-next" == z ? (a.next(), v.stopPropagation(), v.preventDefault()) : "jcalendar-month" == z ? (a.getMonths(), v.stopPropagation(), v.preventDefault()) : "jcalendar-year" == z ? (a.getYears(), v.stopPropagation(), v.preventDefault()) :
                "jcalendar-set-year" == z ? (a.date[0] = v.target.innerText, a.getDays(), v.stopPropagation(), v.preventDefault()) : "jcalendar-set-month" == z ? (a.date[1] = parseInt(v.target.getAttribute("data-value")), a.getDays(), v.stopPropagation(), v.preventDefault()) : "jcalendar-confirm" == z || "jcalendar-update" == z ? (a.close(), v.stopPropagation(), v.preventDefault()) : "jcalendar-close" == z ? (a.close(), v.stopPropagation(), v.preventDefault()) : "jcalendar-backdrop" == z ? (a.close(!1, !1), v.stopPropagation(), v.preventDefault()) : "jcalendar-reset" ==
                z ? (a.reset(), v.stopPropagation(), v.preventDefault()) : v.target.classList.contains("jcalendar-set-day") && v.target.innerText && (a.update(v.target), v.stopPropagation(), v.preventDefault())
        };
        b.addEventListener("keyup", function(v) { if (v.target.value && 3 < v.target.value.length) { var z = l.calendar.extractDateFromString(v.target.value, a.options.format);
                z && "true" == v.target.getAttribute("data-completed") && a.setValue(z) } });
        x.addEventListener("swipeleft", function(v) {
            l.slideLeft(H, 0, function() {
                a.next();
                l.slideRight(H,
                    1)
            });
            v.preventDefault();
            v.stopPropagation()
        });
        x.addEventListener("swiperight", function(v) { l.slideRight(H, 0, function() { a.prev();
                l.slideLeft(H, 1) });
            v.preventDefault();
            v.stopPropagation() });
        !0 === "ontouchend" in document.documentElement ? (x.addEventListener("touchend", f), b.addEventListener("touchend", function(v) { a.open() })) : (x.addEventListener("mouseup", f), b.addEventListener("mouseup", function(v) { a.open() }));
        "INPUT" == b.tagName && (b.parentNode.insertBefore(x, b.nextSibling), b.setAttribute("autocomplete", "off"),
            b.setAttribute("data-mask", a.options.format.toLowerCase()), a.options.readonly && b.setAttribute("readonly", "readonly"), a.options.placeholder && b.setAttribute("placeholder", a.options.placeholder), b.classList.add("jcalendar-input"), b.value = a.setLabel(a.getValue(), a.options.format));
        b.calendar = a;
        1 == a.options.opened && a.open();
        return a
    };
    l.calendar.prettify = function(b, e) {
        e || (e = {
            justNow: "Just now",
            xMinutesAgo: "{0}m ago",
            xHoursAgo: "{0}h ago",
            xDaysAgo: "{0}d ago",
            xWeeksAgo: "{0}w ago",
            xMonthsAgo: "{0} mon ago",
            xYearsAgo: "{0}y ago"
        });
        var a = parseInt((new Date - new Date(b)) / 1E3 / 60);
        String.prototype.format = function(f) { return this.replace("{0}", f) };
        return 0 == a ? e.justNow : 90 > a ? e.xMinutesAgo.format(a) : 1440 > a ? e.xHoursAgo.format(Math.round(a / 60)) : 20160 > a ? e.xDaysAgo.format(Math.round(a / 1440)) : 43200 > a ? e.xWeeksAgo.format(Math.round(a / 10080)) : 1036800 > a ? e.xMonthsAgo.format(Math.round(a / 43200)) : e.xYearsAgo.format(Math.round(a / 525600))
    };
    l.calendar.prettifyAll = function() {
        for (var b = document.querySelectorAll(".prettydate"),
                e = 0; e < b.length; e++) b[e].getAttribute("data-date") ? b[e].innerHTML = l.calendar.prettify(b[e].getAttribute("data-date")) : (b[e].setAttribute("data-date", b[e].innerHTML), b[e].innerHTML = l.calendar.prettify(b[e].innerHTML))
    };
    l.calendar.now = function(b, e) { b || (b = new Date); var a = b.getFullYear(),
            f = b.getMonth() + 1,
            c = b.getDate(),
            d = b.getHours(),
            g = b.getMinutes(),
            k = b.getSeconds(),
            q = function(p) { p = "" + p;
                1 == p.length && (p = "0" + p); return p }; return 1 == e ? q(a) + "-" + q(f) + "-" + q(c) : q(a) + "-" + q(f) + "-" + q(c) + " " + q(d) + ":" + q(g) + ":" + q(k) };
    l.calendar.extractDateFromString = function(b, e) {
        var a = "" + b,
            f = e.replace(/[0-9]/g, ""),
            c = 1,
            d = f.search("YYYY");
        d = a.substr(d, 4);
        parseInt(d) != d && (c = 0);
        var g = f.search("MM");
        g = a.substr(g, 2);
        if (parseInt(g) != g || 12 < k) c = 0;
        var k = f.search("DD");
        k = a.substr(k, 2);
        if (parseInt(k) != k || 31 < k) c = 0;
        var q = f.search("HH");
        if (0 <= q) { if (q = a.substr(q, 2), !parseInt(q) || 23 < q) q = "00" } else q = "00";
        var p = f.search("MI");
        if (0 <= p) { if (p = a.substr(p, 2), !parseInt(p) || 59 < p) p = "00" } else p = "00";
        var h = f.search("SS");
        if (0 <= h) {
            if (h = a.substr(h, 2), !parseInt(h) ||
                59 < h) h = "00"
        } else h = "00";
        return 1 == c && b.length == f.length ? d + "-" + g + "-" + k + " " + q + ":" + p + ":" + h : ""
    };
    l.calendar.getDateString = function(b, e) {
        e || (e = "DD/MM/YYYY");
        if (b) {
            var a = ("" + b).split(" ");
            if (a[1]) { var f = a[1].split(":"); var c = f[1] ? f[1] : "00"; var d = f[2] ? f[2] : "00";
                f = f[0] ? f[0] : "00" } else d = c = f = "00";
            a = a[0].split("-");
            if (a[0] && a[1] && a[2] && 0 < a[0] && 0 < a[1] && 13 > a[1] && 0 < a[2] && 32 > a[2]) {
                var g = new Date(a[0], a[1] - 1, a[2]);
                a[1] = (2 > a[1].length ? "0" : "") + a[1];
                a[2] = (2 > a[2].length ? "0" : "") + a[2];
                f = (2 > f.length ? "0" : "") + f;
                c = (2 > c.length ?
                    "0" : "") + c;
                d = (2 > d.length ? "0" : "") + d;
                b = e.replace("WD", "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")[g.getDay()]);
                b = b.replace("DD", a[2]);
                b = b.replace("MM", a[1]);
                b = b.replace("YYYY", a[0]);
                b = b.replace("YY", a[0].substring(2, 4));
                b = b.replace("MON", "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[parseInt(a[1]) - 1].toUpperCase());
                f && (b = b.replace("HH24", f));
                b = 12 < f ? b.replace("HH12", f - 12) : b.replace("HH12", f);
                b = b.replace("HH", f);
                b = b.replace("MI", c);
                b = b.replace("MM", c);
                b = b.replace("SS",
                    d)
            } else b = ""
        }
        return b
    };
    l.calendar.isOpen = function(b) { l.calendar.current && (b.target.className && -1 != b.target.className.indexOf("jcalendar") || l.calendar.current.close(!1, !1)) };
    !0 === "ontouchstart" in document.documentElement ? document.addEventListener("touchstart", l.calendar.isOpen) : document.addEventListener("mousedown", l.calendar.isOpen);
    l.color = function(b, e) {
        var a = { options: {}, values: [] };
        l.color.current || (l.color.current = null);
        var f = { placeholder: "", value: null, onclose: null, onchange: null, closeOnChange: !0 },
            c;
        for (c in f) e && e.hasOwnProperty(c) ? a.options[c] = e[c] : a.options[c] = f[c];
        var d = {
            red: { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c" },
            pink: { 50: "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 800: "#ad1457", 900: "#880e4f" },
            purple: {
                50: "#f3e5f5",
                100: "#e1bee7",
                200: "#ce93d8",
                300: "#ba68c8",
                400: "#ab47bc",
                500: "#9c27b0",
                600: "#8e24aa",
                700: "#7b1fa2",
                800: "#6a1b9a",
                900: "#4a148c"
            },
            indigo: { 50: "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 800: "#283593", 900: "#1a237e" },
            blue: { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1" },
            cyan: { 50: "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 800: "#00838f", 900: "#006064" },
            teal: {
                50: "#e0f2f1",
                100: "#b2dfdb",
                200: "#80cbc4",
                300: "#4db6ac",
                400: "#26a69a",
                500: "#009688",
                600: "#00897b",
                700: "#00796b",
                800: "#00695c",
                900: "#004d40"
            },
            green: { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20" },
            lightgreen: { 50: "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 800: "#558b2f", 900: "#33691e" },
            lime: {
                50: "#f9fbe7",
                100: "#f0f4c3",
                200: "#e6ee9c",
                300: "#dce775",
                400: "#d4e157",
                500: "#cddc39",
                600: "#c0ca33",
                700: "#afb42b",
                800: "#9e9d24",
                900: "#827717"
            },
            yellow: { 50: "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 800: "#f9a825", 900: "#f57f17" },
            amber: { 50: "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 800: "#ff8f00", 900: "#ff6f00" },
            orange: { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100" },
            deeporange: {
                50: "#fbe9e7",
                100: "#ffccbc",
                200: "#ffab91",
                300: "#ff8a65",
                400: "#ff7043",
                500: "#ff5722",
                600: "#f4511e",
                700: "#e64a19",
                800: "#d84315",
                900: "#bf360c"
            },
            brown: { 50: "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 800: "#4e342e", 900: "#3e2723" },
            grey: { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" },
            bluegrey: {
                50: "#eceff1",
                100: "#cfd8dc",
                200: "#b0bec5",
                300: "#90a4ae",
                400: "#78909c",
                500: "#607d8b",
                600: "#546e7a",
                700: "#455a64",
                800: "#37474f",
                900: "#263238"
            }
        };
        f = [];
        var g = Object.keys(d),
            k = Object.keys(d[g[0]]);
        for (c = 0; c < g.length; c++)
            for (var q = 0; q < k.length; q++) f[q] || (f[q] = []), f[q][c] = d[g[c]][k[q]];
        a.options.value && (b.value = a.options.value);
        var p = document.createElement("div");
        p.className = "jcolor";
        var h = document.createElement("div");
        h.className = "jcolor-backdrop";
        p.appendChild(h);
        var m = document.createElement("div");
        m.className = "jcolor-content";
        c = document.createElement("div");
        c.className = "jcolor-close";
        c.innerHTML = "Done";
        c.onclick = function() { a.close() };
        m.appendChild(c);
        d = document.createElement("table");
        d.setAttribute("cellpadding", "7");
        d.setAttribute("cellspacing", "0");
        for (c = 0; c < f.length; c++) { g = document.createElement("tr"); for (q = 0; q < f[c].length; q++) k = document.createElement("td"), k.style.backgroundColor = f[c][q], k.setAttribute("data-value", f[c][q]), k.innerHTML = "", g.appendChild(k), a.options.value == f[c][q] && k.classList.add("jcolor-selected"), a.values[f[c][q]] = k;
            d.appendChild(g) }
        a.open = function() {
            l.color.current &&
                l.color.current != a && l.color.current.close();
            if (!l.color.current) { l.color.current = a;
                p.classList.add("jcolor-focus"); var w = m.getBoundingClientRect(); if (800 > l.getWindowWidth()) m.style.top = "", m.classList.add("jcolor-fullscreen"), l.slideBottom(m, 1), h.style.display = "block";
                else { m.classList.contains("jcolor-fullscreen") && (m.classList.remove("jcolor-fullscreen"), h.style.display = ""); var x = b.getBoundingClientRect();
                    m.style.top = window.innerHeight < x.bottom + w.height ? -1 * (w.height + x.height + 2) + "px" : "2px" }
                p.focus() }
        };
        a.close = function(w) { if (l.color.current) { l.color.current = null; if (!w && "function" == typeof a.options.onclose) a.options.onclose(b);
                p.classList.remove("jcolor-focus") }
            h.style.display = ""; return a.options.value };
        a.setValue = function(w) { w && (b.value = w, a.options.value = w); var x = p.querySelector(".jcolor-selected");
            x && x.classList.remove("jcolor-selected");
            a.values[w].classList.add("jcolor-selected"); if ("function" == typeof a.options.onchange) a.options.onchange(b, w);
            1 == a.options.closeOnChange && a.close() };
        a.getValue =
            function() { return a.options.value };
        b.addEventListener("focus", function(w) { a.open() });
        b.addEventListener("mousedown", function(w) { l.color.current || setTimeout(function() { a.open();
                w.preventDefault() }, 200) });
        p.addEventListener("mouseup", function(w) { "TD" == w.target.tagName && (l.color.current.setValue(w.target.getAttribute("data-value")), l.color.current && l.color.current.close()) });
        document.addEventListener("mousedown", function(w) { l.color.current && (l.getElement(w.target, "jcolor") || l.color.current.close()) });
        p.setAttribute("tabindex", "900");
        a.options.placeholder && b.setAttribute("placeholder", a.options.placeholder);
        m.appendChild(d);
        p.appendChild(m);
        "INPUT" == b.tagName ? b.parentNode.insertBefore(p, b.nextSibling) : b.appendChild(p);
        return b.color = a
    };
    l.contextmenu = function(b, e) {
        var a = { options: {} },
            f = { items: null, onclick: null },
            c;
        for (c in f) e && e.hasOwnProperty(c) ? a.options[c] = e[c] : a.options[c] = f[c];
        b.classList.add("jcontextmenu");
        b.setAttribute("tabindex", "900");
        a.open = function(d, g) {
            g && (a.options.items = g, a.create(g));
            if (d.target) var k = d.clientX,
                q = d.clientY;
            else k = d.x, q = d.y;
            b.classList.add("jcontextmenu-focus");
            b.focus();
            var p = b.getBoundingClientRect();
            b.style.top = window.innerHeight < q + p.height ? q - p.height + "px" : q + "px";
            b.style.left = window.innerWidth < k + p.width ? 0 < k - p.width ? k - p.width + "px" : "10px" : k + "px"
        };
        a.close = function() { b.classList.contains("jcontextmenu-focus") && b.classList.remove("jcontextmenu-focus") };
        a.create = function(d) {
            b.innerHTML = "";
            for (var g = 0; g < d.length; g++) {
                if (d[g].type && "line" == d[g].type) var k = document.createElement("hr");
                else { k = document.createElement("div"); var q = document.createElement("a");
                    q.innerHTML = d[g].title;
                    d[g].disabled ? k.className = "jcontextmenu-disabled" : d[g].onclick && (k.method = d[g].onclick, k.addEventListener("mouseup", function() { this.method(this) }));
                    k.appendChild(q);
                    d[g].shortcut && (q = document.createElement("span"), q.innerHTML = d[g].shortcut, k.appendChild(q)) }
                b.appendChild(k)
            }
        };
        "function" == typeof a.options.onclick && b.addEventListener("click", function(d) { a.options.onclick(a) });
        b.addEventListener("blur", function(d) {
            setTimeout(function() { a.close() },
                120)
        });
        window.addEventListener("mousewheel", function() { a.close() });
        a.options.items && a.create(a.options.items);
        return b.contextmenu = a
    };
    l.contextmenu.getElement = function(b) {
        function e(f) { f.parentNode && f.getAttribute("aria-contextmenu-id") ? a = f.getAttribute("aria-contextmenu-id") : f.parentNode && e(f.parentNode) } var a = 0;
        e(b); return a };
    document.addEventListener("contextmenu", function(b) {
        var e = l.contextmenu.getElement(b.target);
        e && ((e = document.querySelector("#" + e)) ? (e.contextmenu.open(b), b.preventDefault()) :
            console.error("JSUITES: Contextmenu id not found"))
    });
    l.dialog = function() {
        var b = { options: {} },
            e = document.createElement("div");
        e.setAttribute("tabindex", "901");
        e.className = "jdialog";
        e.id = "dialog";
        var a = document.createElement("div");
        a.className = "jdialog-header";
        var f = document.createElement("div");
        f.className = "jdialog-title";
        a.appendChild(f);
        var c = document.createElement("div");
        c.className = "jdialog-message";
        a.appendChild(c);
        var d = document.createElement("div");
        d.className = "jdialog-footer";
        var g = document.createElement("div");
        g.className = "jdialog-container";
        g.appendChild(a);
        g.appendChild(d);
        a = document.createElement("div");
        var k = document.createElement("input");
        k.value = b.options.confirmLabel;
        k.type = "button";
        k.onclick = function() { if ("function" == typeof b.options.onconfirm) b.options.onconfirm();
            b.close() };
        a.appendChild(k);
        d.appendChild(a);
        a = document.createElement("div");
        var q = document.createElement("input");
        q.value = b.options.cancelLabel;
        q.type = "button";
        q.onclick = function() {
            if ("function" == typeof b.options.oncancel) b.options.oncancel();
            b.close()
        };
        a.appendChild(q);
        d.appendChild(a);
        e.appendChild(g);
        b.open = function(p) {
            b.options = p;
            b.options.title && (f.innerHTML = b.options.title);
            b.options.message && (c.innerHTML = b.options.message);
            b.options.confirmLabel || (b.options.confirmLabel = "OK");
            k.value = b.options.confirmLabel;
            b.options.cancelLabel || (b.options.cancelLabel = "Cancel");
            q.value = b.options.cancelLabel;
            q.parentNode.style.display = "confirm" == b.options.type ? "" : "none";
            e.style.opacity = 100;
            l.el ? l.el.appendChild(e) : document.body.appendChild(e);
            e.focus();
            setTimeout(function() { g.style.opacity = 100 }, 0)
        };
        b.close = function() { e.style.opacity = 0;
            g.style.opacity = 0;
            setTimeout(function() { e.remove() }, 100) };
        return b
    }();
    l.confirm = function(b, e) { 800 > l.getWindowWidth() ? l.dialog.open({ type: "confirm", message: b, title: "Confirmation", onconfirm: e }) : confirm(b) && e() };
    l.alert = function(b) { 800 > l.getWindowWidth() ? l.dialog.open({ title: "Alert", message: b }) : alert(b) };
    l.dropdown = function(b, e) {
        var a = { options: {} };
        if ("SELECT" == b.tagName) {
            var f = l.dropdown.extractFromDom(b, e);
            b = f.el;
            e =
                f.options
        }
        f = { url: null, data: [], multiple: !1, autocomplete: !1, type: null, width: null, opened: !1, value: null, placeholder: "", position: !1, onchange: null, onload: null, onopen: null, onclose: null, onblur: null };
        for (var c in f) e && e.hasOwnProperty(c) ? a.options[c] = e[c] : a.options[c] = f[c];
        l.dropdown.current || (l.dropdown.current = null);
        a.items = [];
        a.groups = [];
        a.selected = [];
        b.classList.add("jdropdown");
        "searchbar" == a.options.type ? b.classList.add("jdropdown-searchbar") : "list" == a.options.type ? b.classList.add("jdropdown-list") :
            "picker" == a.options.type ? b.classList.add("jdropdown-picker") : 800 > l.getWindowWidth() ? (b.classList.add("jdropdown-picker"), a.options.type = "picker") : (a.options.width && (b.style.width = a.options.width, b.style.minWidth = a.options.width), b.classList.add("jdropdown-default"), a.options.type = "default");
        c = document.createElement("div");
        c.className = "jdropdown-container-header";
        var d = document.createElement("input");
        d.className = "jdropdown-header";
        "function" == typeof a.options.onblur && (d.onblur = function() { a.options.onblur(b) });
        var g = document.createElement("div");
        g.className = "jdropdown-container";
        var k = document.createElement("div");
        k.className = "jdropdown-content";
        f = document.createElement("div");
        f.className = "jdropdown-close";
        f.innerHTML = "Done";
        var q = document.createElement("div");
        q.className = "jdropdown-backdrop";
        if (1 == a.options.autocomplete) {
            b.setAttribute("data-autocomplete", !0);
            var p = null;
            d.addEventListener("keyup", function(h) {
                p && clearTimeout(p);
                p = setTimeout(function() { a.find(d.value);
                    p = null }, 500);
                b.classList.contains("jdropdown-focus") ||
                    65 < h.which && a.open()
            })
        } else d.setAttribute("readonly", "readonly");
        !a.options.placeholder && b.getAttribute("placeholder") && (a.options.placeholder = b.getAttribute("placeholder"));
        a.options.placeholder && d.setAttribute("placeholder", a.options.placeholder);
        c.appendChild(d);
        "searchbar" == a.options.type ? c.appendChild(f) : g.appendChild(f);
        g.appendChild(k);
        b.appendChild(c);
        b.appendChild(g);
        b.appendChild(q);
        a.init = function() {
            if (a.options.url) l.ajax({
                url: a.options.url,
                method: "GET",
                dataType: "json",
                success: function(h) {
                    if (h &&
                        (a.setData(h), null != a.options.value && a.setValue(a.options.value), "function" == typeof a.options.onload)) a.options.onload(b, a, h)
                }
            });
            else if (a.setData(), null != a.options.value && a.setValue(a.options.value), "function" == typeof a.options.onload) a.options.onload(b, a, data);
            1 == a.options.opened && a.open()
        };
        a.getUrl = function() { return a.options.url };
        a.setUrl = function(h) { a.options.url = h;
            l.ajax({ url: a.options.url, method: "GET", dataType: "json", success: function(m) { a.setData(m) } }) };
        a.createItem = function(h) {
            var m = {};
            m.element =
                document.createElement("div");
            m.element.className = "jdropdown-item";
            m.value = h.id;
            m.text = h.name;
            m.textLowerCase = "" + h.name.toLowerCase();
            if (h.image) { var w = document.createElement("img");
                w.className = "jdropdown-image";
                w.src = h.image;
                h.title || w.classList.add("jdropdown-image-small");
                m.element.appendChild(w) }
            w = document.createElement("div");
            w.className = "jdropdown-description";
            w.innerHTML = h.name;
            if (h.title) { var x = document.createElement("div");
                x.className = "jdropdown-title";
                x.innerHTML = h.title;
                w.appendChild(x) }
            m.element.appendChild(w);
            return m
        };
        a.setData = function(h) {
            h && (a.options.data = h);
            h = a.options.data;
            g.removeChild(k);
            k.innerHTML = "";
            a.reset();
            a.items = [];
            var m = [],
                w = [];
            if (h.length) {
                for (var x = 0; x < h.length; x++) "object" != typeof h[x] && (a.options.data[x] = h[x] = { id: h[x], name: h[x] }), h[x].group ? (w[h[x].group] || (w[h[x].group] = []), w[h[x].group].push(x)) : m.push(x);
                var F = Object.keys(w);
                if (0 < F.length)
                    for (x = 0; x < F.length; x++) {
                        var D = document.createElement("div");
                        D.className = "jdropdown-group";
                        var K = document.createElement("div");
                        K.className = "jdropdown-group-name";
                        K.innerHTML = F[x];
                        var H = document.createElement("i");
                        H.className = "jdropdown-group-arrow jdropdown-group-arrow-down";
                        K.appendChild(H);
                        var t = document.createElement("div");
                        t.className = "jdropdown-group-items";
                        for (var A = 0; A < w[F[x]].length; A++) { var B = a.createItem(h[w[F[x]][A]]);
                            t.appendChild(B.element);
                            a.items.push(B) }
                        D.appendChild(K);
                        D.appendChild(H);
                        D.appendChild(t);
                        k.appendChild(D)
                    }
                if (m.length)
                    for (x = 0; x < m.length; x++) B = a.createItem(h[m[x]]), a.items.push(B), k.appendChild(B.element);
                for (x = 0; x < a.items.length; x++) a.items[x].element.setAttribute("data-index",
                    x)
            }
            g.appendChild(k)
        };
        a.getText = function(h) { for (var m = [], w = 0; w < a.selected.length; w++) a.items[a.selected[w]] && m.push(a.items[a.selected[w]].text); return h ? m : m.join("; ") };
        a.getValue = function(h) { for (var m = [], w = 0; w < a.selected.length; w++) a.items[a.selected[w]] && m.push(a.items[a.selected[w]].value); return h ? m : m.join(";") };
        a.setValue = function(h) {
            for (var m = 0; m < a.selected.length; m++) a.items[a.selected[m]].element.classList.remove("jdropdown-selected");
            a.selected = [];
            if (null != h)
                if (Array.isArray(h))
                    for (m = 0; m <
                        a.items.length; m++)
                        for (var w = 0; w < h.length; w++) a.items[m].value == h[w] && (a.selected.push(m), a.items[m].element.classList.add("jdropdown-selected"));
                else
                    for (m = 0; m < a.items.length; m++) a.items[m].value == h && (a.selected.push(m), a.items[m].element.classList.add("jdropdown-selected"));
            a.updateLabel()
        };
        a.selectIndex = function(h) {
            if (a.items && a.items[h]) {
                h = h = parseInt(h);
                var m = a.getValue(),
                    w = a.getText();
                null != a.currentIndex && a.items[a.currentIndex].element.classList.remove("jdropdown-cursor");
                a.items[h].element.classList.add("jdropdown-cursor");
                a.currentIndex = h;
                if (a.options.multiple) { if (a.items[h].element.classList.contains("jdropdown-selected")) { a.items[h].element.classList.remove("jdropdown-selected"); var x = a.selected.indexOf(h);
                        a.selected.splice(x, 1) } else a.items[h].element.classList.add("jdropdown-selected"), a.selected.push(h);
                    a.options.autocomplete || a.updateLabel() } else a.items[h].element.classList.contains("jdropdown-selected") ? a.resetSelected() : (a.resetSelected(), a.items[h].element.classList.add("jdropdown-selected"), a.selected.push(h),
                    a.close());
                x = a.getValue();
                var F = a.getText();
                if ("function" == typeof a.options.onchange) a.options.onchange(b, h, m, x, w, F)
            }
        };
        a.selectItem = function(h) { l.dropdown.current && (h = h.getAttribute("data-index"), null != h && a.selectIndex(h)) };
        a.find = function(h) { h = h ? h.toLowerCase() : null; for (var m = 0; m < a.items.length; m++) null == h || -1 != a.items[m].textLowerCase.indexOf(h) ? a.items[m].element.style.display = "" : -1 == a.selected.indexOf(m) ? a.items[m].element.style.display = "none" : a.items[m].element.style.display = "" };
        a.updateLabel =
            function() { d.value = a.getText() };
        a.open = function() {
            l.dropdown.current != b && (l.dropdown.current && l.dropdown.current.dropdown.close(), l.dropdown.current = b);
            if (!b.classList.contains("jdropdown-focus") && (b.classList.add("jdropdown-focus"), 800 > l.getWindowWidth() && (null == a.options.type || "picker" == a.options.type) && l.slideBottom(g, 1), 1 == a.options.autocomplete && (a.find(), d.value = "", d.focus()), a.updateCursor(a.selected && a.selected[0] ? a.selected[0] : 0), !a.options.type || "default" == a.options.type)) {
                var h = b.getBoundingClientRect(),
                    m = g.getBoundingClientRect();
                a.options.position ? (g.style.position = "fixed", window.innerHeight < h.bottom + m.height ? (g.style.top = "", g.style.bottom = window.innerHeight - h.top + 1 + "px") : (g.style.top = h.bottom + "px", g.style.bottom = ""), g.style.left = h.left + "px") : window.innerHeight < h.bottom + m.height ? (g.style.top = "", g.style.bottom = h.height + 1 + "px") : (g.style.top = "", g.style.bottom = "");
                g.style.minWidth = h.width + "px"
            }
            if ("function" == typeof a.options.onopen) a.options.onopen(b)
        };
        a.close = function(h) {
            if (l.dropdown.current) {
                l.dropdown.current =
                    null;
                a.resetCursor();
                a.updateLabel();
                if (!h && "function" == typeof a.options.onclose) a.options.onclose(b);
                d.blur && d.blur();
                b.classList.remove("jdropdown-focus")
            }
            return a.getValue()
        };
        a.updateCursor = function(h) { a.items && a.items[h] && a.items[h].element && (a.resetCursor(), a.items[h].element.classList.add("jdropdown-cursor"), a.currentIndex = parseInt(h), h = a.items[a.currentIndex].element, k.scrollTop = h.offsetTop - h.scrollTop + h.clientTop - 95) };
        a.resetCursor = function() {
            null != a.currentIndex && (a.items && a.items[a.currentIndex] &&
                a.items[a.currentIndex].element.classList.remove("jdropdown-cursor"), a.currentIndex = null)
        };
        a.resetSelected = function() { if (a.selected) { for (var h = 0; h < a.selected.length; h++) a.items[a.selected[h]] && a.items[a.selected[h]].element.classList.remove("jdropdown-selected");
                a.selected = [] } };
        a.reset = function() { a.resetCursor();
            a.resetSelected();
            a.updateLabel() };
        a.firstVisible = function() { for (var h = null, m = 0; m < a.items.length; m++)
                if ("none" != a.items[m].element.style.display) { h = m; break }
            if (null == h) return !1;
            a.updateCursor(h) };
        a.first = function() { for (var h = null, m = a.currentIndex - 1; 0 <= m; m--) "none" != a.items[m].element.style.display && (h = m); if (null == h) return !1;
            a.updateCursor(h) };
        a.last = function() { for (var h = null, m = a.currentIndex + 1; m < a.items.length; m++) "none" != a.items[m].element.style.display && (h = m); if (null == h) return !1;
            a.updateCursor(h) };
        a.next = function() { for (var h = null, m = a.currentIndex + 1; m < a.items.length; m++)
                if ("none" != a.items[m].element.style.display) { h = m; break }
            if (null == h) return !1;
            a.updateCursor(h) };
        a.prev = function() {
            for (var h =
                    null, m = a.currentIndex - 1; 0 <= m; m--)
                if ("none" != a.items[m].element.style.display) { h = m; break }
            if (null == h) return !1;
            a.updateCursor(h)
        };
        l.dropdown.hasEvents || (!0 === "ontouchsend" in document.documentElement ? document.addEventListener("touchsend", l.dropdown.mouseup) : document.addEventListener("mouseup", l.dropdown.mouseup), document.addEventListener("keydown", l.dropdown.onkeydown), l.dropdown.hasEvents = !0);
        a.init();
        return b.dropdown = a
    };
    l.dropdown.hasEvents = !1;
    l.dropdown.mouseup = function(b) {
        var e = l.getElement(b.target,
            "jdropdown");
        if (e) {
            var a = e.dropdown;
            if (b.target.classList.contains("jdropdown-header")) e.classList.contains("jdropdown-focus") && e.classList.contains("jdropdown-default") ? a.close() : a.open();
            else if (b.target.classList.contains("jdropdown-group-name")) { if (e = b.target.nextSibling.children, "none" != b.target.nextSibling.style.display)
                    for (var f = 0; f < e.length; f++) "none" != e[f].style.display && a.selectItem(e[f]) } else b.target.classList.contains("jdropdown-group-arrow") ? b.target.classList.contains("jdropdown-group-arrow-down") ?
                (b.target.classList.remove("jdropdown-group-arrow-down"), b.target.classList.add("jdropdown-group-arrow-up"), b.target.parentNode.nextSibling.style.display = "none") : (b.target.classList.remove("jdropdown-group-arrow-up"), b.target.classList.add("jdropdown-group-arrow-down"), b.target.parentNode.nextSibling.style.display = "") : b.target.classList.contains("jdropdown-item") ? a.selectItem(b.target) : b.target.classList.contains("jdropdown-image") ? a.selectIndex(b.target.parentNode.getAttribute("data-index")) : b.target.classList.contains("jdropdown-description") ?
                a.selectIndex(b.target.parentNode.getAttribute("data-index")) : b.target.classList.contains("jdropdown-title") ? a.selectIndex(b.target.parentNode.parentNode.getAttribute("data-index")) : (b.target.classList.contains("jdropdown-close") || b.target.classList.contains("jdropdown-backdrop")) && a.close();
            b.stopPropagation();
            b.preventDefault()
        } else l.dropdown.current && l.dropdown.current.dropdown.close()
    };
    l.dropdown.onkeydown = function(b) {
        if (l.dropdown.current) {
            var e = l.dropdown.current.dropdown,
                a = e.currentIndex;
            b.shiftKey || 13 != b.which && 27 != b.which && 35 != b.which && 36 != b.which && 38 != b.which && 40 != b.which || (13 == b.which ? e.selectIndex(a) : 38 == b.which ? null == a ? e.firstVisible() : 0 < a && e.prev() : 40 == b.which ? null == a ? e.firstVisible() : a + 1 < e.options.data.length && e.next() : 36 == b.which ? e.first() : 35 == b.which ? e.last() : 27 == b.which && e.close(), b.stopPropagation(), b.preventDefault())
        }
    };
    l.dropdown.extractFromDom = function(b, e) {
        e || (e = {});
        !b.getAttribute("multiple") || e && void 0 != e.multiple || (e.multiple = !0);
        !b.getAttribute("placeholder") ||
            e && void 0 != e.placeholder || (e.placeholder = b.getAttribute("placeholder"));
        !b.getAttribute("data-autocomplete") || e && void 0 != e.autocomplete || (e.autocomplete = !0);
        e && void 0 != e.width || (e.width = b.offsetWidth);
        !b.value || e && void 0 != e.value || (e.value = b.value);
        if (!e || void 0 == e.data) {
            e.data = [];
            for (var a = 0; a < b.children.length; a++)
                if ("OPTGROUP" == b.children[a].tagName)
                    for (var f = 0; f < b.children[a].children.length; f++) e.data.push({ id: b.children[a].children[f].value, name: b.children[a].children[f].innerHTML, group: b.children[a].getAttribute("label") });
                else e.data.push({ id: b.children[a].value, name: b.children[a].innerHTML })
        }
        e && void 0 != e.onchange || (e.onchange = function(c, d, g, k) { 1 == e.multiple ? obj.items[d].classList.contains("jdropdown-selected") ? b.options[d].setAttribute("selected", "selected") : b.options[d].removeAttribute("selected") : b.value = k });
        a = document.createElement("div");
        b.parentNode.insertBefore(a, b);
        b.style.display = "none";
        return { el: a, options: e }
    };
    l.editor = function(b, e) {
        var a = { options: {} },
            f = {
                value: null,
                snippet: null,
                toolbar: null,
                maxHeight: null,
                remoteParser: null,
                youtubeKey: null,
                userSearch: null,
                parseURL: !1,
                dropZone: !0,
                dropAsAttachment: !1,
                acceptImages: !0,
                acceptFiles: !1,
                maxFileSize: 5E6,
                border: !0,
                padding: !0,
                focus: !1,
                onclick: null,
                onfocus: null,
                onblur: null,
                onload: null,
                onenter: null,
                onkeyup: null,
                onkeydown: null
            };
        for (I in f) e && e.hasOwnProperty(I) ? a.options[I] = e[I] : a.options[I] = f[I];
        var c = null,
            d = null;
        b.innerHTML = "";
        b.classList.add("jeditor-container");
        1 == a.options.padding && b.classList.add("jeditor-padding");
        0 == a.options.border && (b.style.border = "0px");
        var g = document.createElement("div");
        g.className = "snippet";
        g.setAttribute("contenteditable", !1);
        var k = document.createElement("div");
        k.className = "jeditor-toolbar";
        var q = document.createElement("div");
        q.setAttribute("contenteditable", !0);
        q.setAttribute("spellcheck", !1);
        q.className = "jeditor";
        a.options.maxHeight && (q.style.overflowY = "auto", q.style.maxHeight = a.options.maxHeight);
        (f = a.options.value ? a.options.value : b.innerHTML ? b.innerHTML : "") || (f = "<br>");
        var p = function(n) {
                var r = document.createElement("div");
                r.innerHTML = n;
                n = r.querySelectorAll("img");
                if (n.length)
                    for (r = 0; r < n.length; r++) a.addImage(n[r].src)
            },
            h = function(n) { if (window.getSelection) { var r = window.getSelection(); if (r.rangeCount) { var u = r.getRangeAt(0);
                        u.deleteContents();
                        u.insertNode(n);
                        u.setStartAfter(n);
                        u.setEndAfter(n);
                        r.removeAllRanges();
                        r.addRange(u) } } },
            m = function(n) {
                g.innerHTML = "";
                if (n.image) {
                    var r = document.createElement("div");
                    r.className = "snippet-image";
                    r.setAttribute("data-k", "image");
                    g.appendChild(r);
                    var u = document.createElement("img");
                    u.src = n.image;
                    r.appendChild(u)
                }
                r = document.createElement("div");
                r.className = "snippet-title";
                r.setAttribute("data-k", "title");
                r.innerHTML = n.title;
                g.appendChild(r);
                r = document.createElement("div");
                r.className = "snippet-description";
                r.setAttribute("data-k", "description");
                r.innerHTML = n.description;
                g.appendChild(r);
                r = document.createElement("div");
                r.className = "snippet-host";
                r.setAttribute("data-k", "host");
                r.innerHTML = n.host;
                g.appendChild(r);
                r = document.createElement("div");
                r.className = "snippet-url";
                r.setAttribute("data-k",
                    "url");
                r.innerHTML = n.url;
                g.appendChild(r);
                q.appendChild(g)
            },
            w = function() {
                clearTimeout(c);
                c = setTimeout(function() {
                    var n = q.querySelector(".snippet"),
                        r = b.querySelector(".jeditor-thumbs-container");
                    !n && !r && (r = q.innerHTML.replace(/\n/g, " "), n = document.createElement("div"), n.innerHTML = r, (r = n.querySelector(".jeditor-thumbs-container")) && r.remove(), r = l.editor.detectUrl(n.innerText)) && ("jpg" == r[0].substr(-3) || "png" == r[0].substr(-3) || "gif" == r[0].substr(-3) ? l.editor.getDomain(r[0]) == window.location.hostname ?
                        a.importImage(r[0], "") : a.importImage(a.options.remoteParser + r[0], "") : (n = l.editor.youtubeParser(r[0])) ? a.getYoutube(n) : a.getWebsite(r[0]))
                }, 1E3)
            };
        a.parseContent = function() { w() };
        a.getYoutube = function(n) {
            a.options.youtubeKey ? l.ajax({
                url: "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=" + a.options.youtubeKey + "&id=" + n,
                method: "GET",
                dataType: "json",
                success: function(r) {
                    if (r.items && r.items[0]) {
                        var u = {
                            title: "",
                            description: "",
                            image: "",
                            host: "www.youtube.com",
                            url: "https://www.youtube.com?watch=" +
                                n
                        };
                        r.items[0].snippet.title && (u.title = r.items[0].snippet.title);
                        r.items[0].snippet.description && (u.description = r.items[0].snippet.description, 150 < u.description.length && (u.description = u.description.substr(0, 150) + "..."));
                        r.items[0].snippet.thumbnails.medium.url && (u.image = r.items[0].snippet.thumbnails.medium.url);
                        m(u)
                    }
                }
            }) : console.error("The youtubeKey is not defined")
        };
        a.getWebsite = function(n) {
            a.options.remoteParser ? l.ajax({
                url: a.options.remoteParser + encodeURI(n.trim()),
                method: "GET",
                dataType: "json",
                success: function(r) { var u = { title: "", description: "", image: "", host: n, url: n };
                    r.title && (u.title = r.title);
                    r.description && (u.description = r.description);
                    r.image ? u.image = r.image : r["og:image"] && (u.image = r["og:image"]);
                    r.host && (u.host = r.host);
                    r.url && (u.url = r.url);
                    m(u) }
            }) : console.log("The remoteParser is not defined")
        };
        a.setData = function(n) { q.innerHTML = n;
            l.editor.setCursor(q, !0) };
        a.getData = function(n) {
            if (n) {
                n = { content: "" };
                var r = q.querySelectorAll(".post-tag");
                if (r.length) {
                    n.users = [];
                    for (var u = 0; u < r.length; u++) {
                        var C =
                            r[u].getAttribute("data-user");
                        C && n.users.push(C)
                    }
                    n.users = n.users.join(",")
                }
                if (g.innerHTML) { n.snippet = {}; for (u = 0; u < g.children.length; u++)
                        if (r = g.children[u].getAttribute("data-k")) "image" == r ? n.snippet.image = g.children[u].children[0].getAttribute("src") : n.snippet[r] = g.children[u].innerHTML;
                    g.innerHTML = "";
                    g.remove() }
                u = q.innerHTML;
                u = u.replace(/<br>/g, "\n");
                u = u.replace(/<\/div>/g, "</div>\n");
                u = u.replace(/<(?:.|\n)*?>/gm, "");
                n.content = u.trim();
                n = JSON.stringify(n)
            } else n = q.innerHTML;
            return n
        };
        a.reset = function() {
            q.innerHTML =
                ""
        };
        a.addPdf = function(n) {
            if ("data" != n.result.substr(0, 4)) console.error("Invalid source");
            else {
                var r = document.createElement("canvas");
                r.width = 60;
                r.height = 60;
                var u = new Image;
                r.getContext("2d").drawImage(u, 0, 0, r.width, r.height);
                r.toBlob(function(C) {
                    var E = document.createElement("img");
                    E.src = window.URL.createObjectURL(C);
                    E.setAttribute("data-extension", "pdf");
                    n.name && E.setAttribute("data-name", n.name);
                    n.size && E.setAttribute("data-size", n.size);
                    n.date && E.setAttribute("data-date", n.date);
                    E.className = "jfile pdf";
                    h(E);
                    l.files[E.src] = n.result.substr(n.result.indexOf(",") + 1)
                })
            }
        };
        a.addImage = function(n, r, u, C) {
            if ("data" == n.substr(0, 4) || a.options.remoteParser) {
                if ("data" == n.substr(0, 4)) { var E = n.split(";");
                    E = E[0].split("/");
                    E = E[1] } else E = n.substr(n.lastIndexOf(".") + 1), n = a.options.remoteParser + n;
                var P = new Image;
                P.onload = function() {
                    var G = document.createElement("canvas");
                    G.width = P.width;
                    G.height = P.height;
                    G.getContext("2d").drawImage(P, 0, 0, G.width, G.height);
                    G.toBlob(function(O) {
                        var L = document.createElement("img");
                        L.src =
                            window.URL.createObjectURL(O);
                        L.setAttribute("tabindex", "900");
                        L.setAttribute("data-extension", E);
                        r && L.setAttribute("data-name", r);
                        u && L.setAttribute("data-size", u);
                        C && L.setAttribute("data-date", C);
                        L.className = "jfile";
                        O = G.toDataURL();
                        h(L);
                        l.files[L.src] = O.substr(O.indexOf(",") + 1)
                    })
                };
                P.src = n
            } else console.error("remoteParser not defined in your initialization")
        };
        a.addFile = function(n) {
            for (var r = [], u = 0; u < n.length; u++)
                if (n[u].size > a.options.maxFileSize) alert("The file is too big");
                else {
                    var C = n[u].type.split("/");
                    (C = "image" == C[0] ? 1 : "pdf" == C[1] ? 2 : 0) ? (r[u] = new FileReader, r[u].index = u, r[u].type = C, r[u].name = n[u].name, r[u].date = n[u].lastModified, r[u].size = n[u].size, r[u].addEventListener("load", function(E) { 2 == E.target.type ? 1 == a.options.acceptFiles && a.addPdf(E.target) : a.addImage(E.target.result, E.target.name, E.total, E.target.lastModified) }, !1), r[u].readAsDataURL(n[u])) : alert("The extension is not allowed")
                }
        };
        a.destroy = function() {
            q.removeEventListener("mouseup", x);
            q.removeEventListener("mousedown", F);
            q.removeEventListener("mousemove",
                D);
            q.removeEventListener("keyup", K);
            q.removeEventListener("keydown", H);
            q.removeEventListener("dragstart", A);
            q.removeEventListener("dragenter", B);
            q.removeEventListener("dragover", J);
            q.removeEventListener("drop", M);
            q.removeEventListener("paste", t);
            "function" == typeof a.options.onblur && q.removeEventListener("blur", v);
            "function" == typeof a.options.onfocus && q.removeEventListener("focus", z);
            b.editor = null;
            b.classList.remove("jeditor-container");
            k.remove();
            g.remove();
            q.remove()
        };
        var x = function(n) { d = !1 },
            F = function(n) {
                var r =
                    function(C) { var E = C.getBoundingClientRect();
                        40 > E.width - (n.clientX - E.left) && 40 > n.clientY - E.top && (C.innerHTML = "", C.remove()) };
                if ("IMG" == n.target.tagName)
                    if (n.target.style.cursor) { if (r = n.target.getBoundingClientRect(), d = { e: n.target, x: n.clientX, y: n.clientY, w: r.width, h: r.height, d: n.target.style.cursor }, n.target.style.width || (n.target.style.width = r.width + "px"), n.target.style.height || (n.target.style.height = r.height + "px"), r = window.getSelection(), r.rangeCount)
                            for (var u = 0; u < r.rangeCount; u++) r.removeRange(r.getRangeAt(u)) } else d = !0;
                else n.target.classList.contains("snippet") ? r(n.target) : n.target.parentNode.classList.contains("snippet") && r(n.target.parentNode), d = !0
            },
            D = function(n) {
                if ("IMG" == n.target.tagName && n.target.getAttribute("tabindex")) {
                    var r = n.target.getBoundingClientRect();
                    n.target.style.cursor = 5 > n.clientY - r.top ? 5 > r.width - (n.clientX - r.left) ? "ne-resize" : 5 > n.clientX - r.left ? "nw-resize" : "n-resize" : 5 > r.height - (n.clientY - r.top) ? 5 > r.width - (n.clientX - r.left) ? "se-resize" : 5 > n.clientX - r.left ? "sw-resize" : "s-resize" : 5 > r.width - (n.clientX -
                        r.left) ? "e-resize" : 5 > n.clientX - r.left ? "w-resize" : ""
                }
                if (1 == n.which && d && d.d) { if ("e-resize" == d.d || "ne-resize" == d.d || "se-resize" == d.d)
                        if (d.e.style.width = d.w + (n.clientX - d.x) + "px", n.shiftKey) { var u = d.h / d.w * (n.clientX - d.x);
                            d.e.style.height = d.h + u + "px" } else u = null;
                    u || "s-resize" != d.d && "se-resize" != d.d && "sw-resize" != d.d || n.shiftKey || (d.e.style.height = d.h + (n.clientY - d.y)) }
            },
            K = function(n) { q.innerHTML || (q.innerHTML = "<div><br></div>"); if ("function" == typeof a.options.onkeyup) a.options.onkeyup(n, b) },
            H = function(n) {
                1 ==
                    a.options.parseURL && w();
                if ("function" == typeof a.options.onenter && 13 == n.which) { var r = a.getData();
                    a.options.onenter(a, b, r, n) }
                if ("function" == typeof a.options.onkeydown) a.options.onkeydown(n, b)
            },
            t = function(n) {
                if (n.clipboardData || n.originalEvent.clipboardData) var r = (n.originalEvent || n).clipboardData.getData("text/html"),
                    u = (n.originalEvent || n).clipboardData.getData("text/plain"),
                    C = (n.originalEvent || n).clipboardData.files;
                else window.clipboardData && (r = window.clipboardData.getData("Html"), u = window.clipboardData.getData("Text"),
                    C = window.clipboardData.files);
                if (C.length) a.addFile(C);
                else { u = u.split("\r\n"); var E = ""; if ("DIV" == n.target.nodeName && n.target.classList.contains("jeditor"))
                        for (C = 0; C < u.length; C++) E = document.createElement("div"), E.innerHTML = u[C] ? u[C] : "<br/>", n.target.appendChild(E);
                    else { for (C = 0; C < u.length; C++) u[C] && (E += "<div>" + u[C] + "</div>\r\n");
                        document.execCommand("insertHtml", !1, E) }
                    1 == a.options.acceptImages && p(r) }
                n.preventDefault()
            },
            A = function(n) { d && d.e && n.preventDefault() },
            B = function(n) {
                d || 0 == a.options.dropZone ||
                    b.classList.add("jeditor-dragging")
            },
            J = function(n) { d || 0 == a.options.dropZone || (c && clearTimeout(c), c = setTimeout(function() { b.classList.remove("jeditor-dragging") }, 100)) },
            M = function(n) {
                if (!d && 0 != a.options.dropZone) {
                    var r = null;
                    document.caretRangeFromPoint ? r = document.caretRangeFromPoint(n.clientX, n.clientY) : n.rangeParent && (r = document.createRange(), r.setStart(n.rangeParent, n.rangeOffset));
                    var u = window.getSelection();
                    u.removeAllRanges();
                    u.addRange(r);
                    u.anchorNode.parentNode.focus();
                    r = (n.originalEvent || n).dataTransfer.getData("text/html");
                    u = (n.originalEvent || n).dataTransfer.getData("text/plain");
                    var C = (n.originalEvent || n).dataTransfer.files;
                    C.length ? a.addFile(C) : u && p(r);
                    b.classList.remove("jeditor-dragging");
                    n.preventDefault()
                }
            },
            v = function() { a.options.onblur(a, b, a.getData()) },
            z = function() { a.options.onfocus(a, b, a.getData()) };
        q.addEventListener("mouseup", x);
        q.addEventListener("mousedown", F);
        q.addEventListener("mousemove", D);
        q.addEventListener("keyup", K);
        q.addEventListener("keydown", H);
        q.addEventListener("dragstart", A);
        q.addEventListener("dragenter",
            B);
        q.addEventListener("dragover", J);
        q.addEventListener("drop", M);
        q.addEventListener("paste", t);
        "function" == typeof a.options.onblur && q.addEventListener("blur", v);
        "function" == typeof a.options.onfocus && q.addEventListener("focus", z);
        if ("function" == typeof a.options.onload) a.options.onload(b, q);
        q.innerHTML = f;
        b.appendChild(q);
        a.options.snippet && m(a.options.snippet);
        null == a.options.toolbar && (a.options.toolbar = l.editor.getDefaultToolbar());
        if (a.options.toolbar) {
            for (f = 0; f < a.options.toolbar.length; f++)
                if (a.options.toolbar[f].icon) {
                    var I =
                        document.createElement("div");
                    I.style.userSelect = "none";
                    var y = document.createElement("i");
                    y.className = "material-icons";
                    y.innerHTML = a.options.toolbar[f].icon;
                    y.onclick = function(n) { return function() { a.options.toolbar[n].onclick(b, a, this) } }(f);
                    I.appendChild(y);
                    k.appendChild(I)
                } else "divisor" == a.options.toolbar[f].type ? (I = document.createElement("div"), I.className = "jeditor-toolbar-divisor", k.appendChild(I)) : "button" == a.options.toolbar[f].type && (I = document.createElement("div"), I.classList.add("jeditor-toolbar-button"),
                    I.innerHTML = a.options.toolbar[f].value, k.appendChild(I));
            b.appendChild(k)
        }
        a.options.focus && l.editor.setCursor(q, "initial" == a.options.focus ? !0 : !1);
        return b.editor = a
    };
    l.editor.setCursor = function(b, e) { b.focus();
        document.execCommand("selectAll"); var a = window.getSelection(),
            f = a.getRangeAt(0); if (1 == e) var c = f.startContainer,
            d = 0;
        else c = f.endContainer, d = c.length;
        f.setStart(c, d);
        f.setEnd(c, d);
        a.removeAllRanges();
        a.addRange(f) };
    l.editor.getDomain = function(b) {
        return b.replace("http://", "").replace("https://",
            "").replace("www.", "").split(/[/?#]/)[0].split(/:/g)[0]
    };
    l.editor.detectUrl = function(b) {
        (b = b.match(/(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig)) && "www" == b[0].substr(0, 3) && (b[0] = "http://" + b[0]); return b };
    l.editor.youtubeParser = function(b) { return (b = b.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&\?]*).*/)) && 11 == b[7].length ? b[7] : !1 };
    l.editor.getDefaultToolbar = function() {
        return [{ icon: "undo", onclick: function() { document.execCommand("undo") } },
            { icon: "redo", onclick: function() { document.execCommand("redo") } }, { type: "divisor" }, { icon: "format_bold", onclick: function(b, e, a) { document.execCommand("bold");
                    document.queryCommandState("bold") ? a.classList.add("selected") : a.classList.remove("selected") } }, { icon: "format_italic", onclick: function(b, e, a) { document.execCommand("italic");
                    document.queryCommandState("italic") ? a.classList.add("selected") : a.classList.remove("selected") } }, {
                icon: "format_underline",
                onclick: function(b, e, a) {
                    document.execCommand("underline");
                    document.queryCommandState("underline") ? a.classList.add("selected") : a.classList.remove("selected")
                }
            }, { type: "divisor" }, { icon: "format_list_bulleted", onclick: function(b, e, a) { document.execCommand("insertUnorderedList");
                    document.queryCommandState("insertUnorderedList") ? a.classList.add("selected") : a.classList.remove("selected") } }, { icon: "format_list_numbered", onclick: function(b, e, a) { document.execCommand("insertOrderedList");
                    document.queryCommandState("insertOrderedList") ? a.classList.add("selected") : a.classList.remove("selected") } },
            { icon: "format_indent_increase", onclick: function(b, e, a) { document.execCommand("indent", !0, null);
                    document.queryCommandState("indent") ? a.classList.add("selected") : a.classList.remove("selected") } }, { icon: "format_indent_decrease", onclick: function(b, e, a) { document.execCommand("outdent");
                    document.queryCommandState("outdent") ? a.classList.add("selected") : a.classList.remove("selected") } }
        ]
    };
    l.image = function(b, e) {
        var a = { options: {} },
            f = {
                minWidth: !1,
                onchange: null,
                singleFile: !0,
                remoteParser: null,
                text: {
                    extensionNotAllowed: "The extension is not allowed",
                    imageTooSmall: "The resolution is too low, try a image with a better resolution. width > 800px"
                }
            },
            c;
        for (c in f) e && e.hasOwnProperty(c) ? a.options[c] = e[c] : a.options[c] = f[c];
        b.classList.add("jupload");
        a.addImage = function(g) {
            g.date || (g.date = "");
            var k = document.createElement("img");
            k.setAttribute("data-date", g.lastmodified ? g.lastmodified : g.date);
            k.setAttribute("data-name", g.name);
            k.setAttribute("data-size", g.size);
            k.setAttribute("data-small", g.small ? g.small : "");
            k.setAttribute("data-cover", g.cover ? 1 : 0);
            k.setAttribute("data-extension",
                g.extension);
            k.setAttribute("src", g.file);
            k.className = "jfile";
            k.style.width = "100%";
            return k
        };
        a.addImages = function(g) { 1 == a.options.singleFile && (b.innerHTML = ""); for (var k = 0; k < g.length; k++) b.appendChild(a.addImage(g[k])) };
        a.addFromFile = function(g) {
            if ("image" == g.type.split("/")[0]) {
                1 == a.options.singleFile && (b.innerHTML = "");
                var k = new FileReader;
                k.addEventListener("load", function(q) {
                    var p = new Image;
                    p.onload = function() {
                        var h = document.createElement("canvas");
                        h.width = p.width;
                        h.height = p.height;
                        h.getContext("2d").drawImage(p,
                            0, 0, h.width, h.height);
                        h = { file: h.toDataURL(), extension: g.name.substr(g.name.lastIndexOf(".") + 1), name: g.name, size: g.size, lastmodified: g.lastModified };
                        h = a.addImage(h);
                        b.appendChild(h);
                        if ("function" == typeof a.options.onchange) a.options.onchange(h)
                    };
                    p.src = q.srcElement.result
                });
                k.readAsDataURL(g)
            } else alert(text.extentionNotAllowed)
        };
        a.addFromUrl = function(g) {
            if ("data" == g.substr(0, 4) || a.options.remoteParser) {
                if ("data" == g.substr(0, 4)) { var k = g.split(";");
                    k = k[0].split("/");
                    k = k[1] } else k = g.substr(g.lastIndexOf(".") +
                    1), g = a.options.remoteParser + g;
                var q = new Image;
                q.onload = function() { var p = document.createElement("canvas");
                    p.width = q.width;
                    p.height = q.height;
                    p.getContext("2d").drawImage(q, 0, 0, p.width, p.height);
                    p.toBlob(function(h) { h = { file: window.URL.createObjectURL(h), extension: k }; var m = a.addImage(h);
                        b.appendChild(m); var w = p.toDataURL();
                        l.files[h.file] = w.substr(w.indexOf(",") + 1); if ("function" == typeof a.options.onchange) a.options.onchange(m) }) };
                q.src = g
            } else console.error("remoteParser not defined in your initialization")
        };
        var d = document.createElement("input");
        d.type = "file";
        d.setAttribute("accept", "image/*");
        d.onchange = function() { for (var g = 0; g < this.files.length; g++) a.addFromFile(this.files[g]) };
        b.addEventListener("dblclick", function(g) { l.click(d) });
        b.addEventListener("dragenter", function(g) { b.style.border = "1px dashed #000" });
        b.addEventListener("dragleave", function(g) { b.style.border = "1px solid #eee" });
        b.addEventListener("dragstop", function(g) { b.style.border = "1px solid #eee" });
        b.addEventListener("dragover", function(g) { g.preventDefault() });
        b.addEventListener("drop", function(g) { g.preventDefault();
            g.stopPropagation(); var k = (g.originalEvent || g).dataTransfer.getData("text/html"); if ((g.originalEvent || g).dataTransfer.files.length)
                for (k = 0; k < g.dataTransfer.files.length; k++) a.addFromFile(g.dataTransfer.files[k]);
            else if (k && (1 == a.options.singleFile && (b.innerHTML = ""), g = document.createElement("div"), g.innerHTML = k, g = g.querySelectorAll("img"), g.length))
                for (k = 0; k < g.length; k++) a.addFromUrl(g[k].src);
            b.style.border = "1px solid #eee"; return !1 });
        return b.image =
            a
    };
    l.loading = function() { var b = {},
            e = document.createElement("div");
        e.className = "jloading";
        b.show = function() { document.body.appendChild(e) };
        b.hide = function() { document.body.removeChild(e) }; return b }();
    l.login = function(b, e) {
        var a = { options: {} },
            f = {
                url: window.location.href,
                prepareRequest: null,
                accessToken: null,
                deviceToken: null,
                facebookUrl: null,
                facebookAuthentication: null,
                maxHeight: null,
                onload: null,
                onsuccess: null,
                onerror: null,
                message: null,
                logo: null,
                newProfile: !1,
                newProfileUrl: !1,
                newProfileLogin: !1,
                fullscreen: !1,
                newPasswordValidation: null
            };
        for (D in f) e && e.hasOwnProperty(D) ? a.options[D] = e[D] : a.options[D] = f[D];
        !a.options.message && (f = document.querySelector(".message")) && (a.options.message = f);
        var c = null,
            d = document.createElement("form");
        b.appendChild(d);
        var g = document.createElement("div");
        g.className = "jlogin-logo";
        d.appendChild(g);
        a.options.logo && (f = document.createElement("img"), f.src = a.options.logo, g.appendChild(f));
        f = document.createElement("label");
        f.innerHTML = "Please enter here the code received";
        var k = document.createElement("input");
        k.type = "number";
        k.id = "code";
        k.setAttribute("maxlength", 6);
        var q = document.createElement("div");
        q.appendChild(f);
        q.appendChild(k);
        var p = document.createElement("input");
        p.type = "hidden";
        p.name = "h";
        var h = document.createElement("div");
        h.appendChild(p);
        var m = document.createElement("input");
        m.type = "hidden";
        m.name = "recovery";
        m.value = "1";
        var w = document.createElement("div");
        w.appendChild(m);
        f = document.createElement("label");
        f.innerHTML = "Login";
        var x = document.createElement("input");
        x.type = "text";
        x.name = "login";
        x.setAttribute("autocomplete", "off");
        x.onkeyup = function() { this.value = this.value.toLowerCase().replace(/[^a-zA-Z0-9_+]+/gi, "") };
        var F = document.createElement("div");
        F.appendChild(f);
        F.appendChild(x);
        f = document.createElement("label");
        f.innerHTML = "Name";
        var D = document.createElement("input");
        D.type = "text";
        D.name = "name";
        var K = document.createElement("div");
        K.appendChild(f);
        K.appendChild(D);
        f = document.createElement("label");
        f.innerHTML = "E-mail";
        var H = document.createElement("input");
        H.type = "text";
        H.name = "username";
        H.setAttribute("autocomplete", "new-username");
        var t = document.createElement("div");
        t.appendChild(f);
        t.appendChild(H);
        f = document.createElement("label");
        f.innerHTML = "New password";
        var A = document.createElement("input");
        A.type = "password";
        A.name = "password";
        A.setAttribute("autocomplete", "new-password");
        var B = document.createElement("div");
        B.appendChild(f);
        B.appendChild(A);
        B.onkeydown = function(G) { 13 == G.keyCode && a.execute() };
        f = document.createElement("label");
        f.innerHTML = "Repeat the new password";
        var J = document.createElement("input");
        J.type = "password";
        J.name = "password";
        var M = document.createElement("div");
        M.appendChild(f);
        M.appendChild(J);
        f = document.createElement("label");
        f.innerHTML = "Remember me on this device";
        D = document.createElement("input");
        D.type = "checkbox";
        D.name = "remember";
        D.value = "1";
        f.appendChild(D);
        var v = document.createElement("div");
        v.className = "rememberButton";
        v.appendChild(f);
        var z = document.createElement("input");
        z.type = "button";
        z.value = "Log In";
        z.onclick = function() { a.execute() };
        var I = document.createElement("div");
        I.appendChild(z);
        f = document.createElement("div");
        f.innerHTML = "Cancel";
        f.className = "cancelButton";
        f.onclick = function() { a.requestAccess() };
        var y = document.createElement("div");
        y.appendChild(f);
        f = document.createElement("label");
        f.innerHTML = "Please type here the code below";
        var n = document.createElement("input");
        n.type = "text";
        n.name = "captcha";
        var r = document.createElement("img"),
            u = document.createElement("div");
        u.className = "jlogin-captcha";
        u.appendChild(f);
        u.appendChild(n);
        u.appendChild(r);
        f = document.createElement("div");
        f.innerHTML = "Login with Facebook";
        f.className = "facebookButton";
        var C = document.createElement("div");
        C.appendChild(f);
        C.onclick = function() { a.requestLoginViaFacebook() };
        f = document.createElement("span");
        f.innerHTML = "Request a new password";
        var E = document.createElement("div");
        E.className = "requestButton";
        E.appendChild(f);
        E.onclick = function() { a.requestNewPassword() };
        f = document.createElement("span");
        f.innerHTML = "Create a new profile";
        var P = document.createElement("div");
        P.className = "newProfileButton";
        P.appendChild(f);
        P.onclick = function() { a.newProfile() };
        b.className = "jlogin";
        1 == a.options.fullscreen && b.classList.add("jlogin-fullscreen");
        a.showMessage = function(G) { "function" == typeof a.options.showMessage ? a.options.showMessage(G) : l.alert(G) };
        a.newProfile = function() {
            d.innerHTML = "";
            d.appendChild(g);
            a.options.newProfileLogin && d.appendChild(F);
            d.appendChild(K);
            d.appendChild(t);
            d.appendChild(I);
            1 == a.options.facebookAuthentication && d.appendChild(C);
            d.appendChild(y);
            x.value = "";
            H.value = "";
            A.value = "";
            z.value = "Create new profile";
            c = "newProfile"
        };
        a.requestNewPassword = function() { if (0 <= Array.prototype.indexOf.call(d.children, u)) var G = !0;
            d.innerHTML = "";
            d.appendChild(g);
            d.appendChild(w);
            d.appendChild(t);
            G && d.appendChild(u);
            d.appendChild(I);
            d.appendChild(y);
            z.value = "Request a new password";
            m.value = 1;
            c = "requestNewPassword" };
        a.codeConfirmation = function() { d.innerHTML = "";
            d.appendChild(g);
            d.appendChild(h);
            d.appendChild(q);
            d.appendChild(I);
            d.appendChild(y);
            z.value = "Confirm code";
            m.value = 2;
            c = "codeConfirmation" };
        a.changeMyPassword = function(G) {
            d.innerHTML =
                "";
            d.appendChild(g);
            d.appendChild(h);
            d.appendChild(B);
            d.appendChild(M);
            d.appendChild(I);
            d.appendChild(y);
            z.value = "Change my password";
            p.value = G;
            c = "changeMyPassword"
        };
        a.requestAccess = function() {
            d.innerHTML = "";
            d.appendChild(g);
            d.appendChild(t);
            d.appendChild(B);
            d.appendChild(I);
            1 == a.options.facebookAuthentication && d.appendChild(C);
            d.appendChild(E);
            d.appendChild(v);
            d.appendChild(E);
            1 == a.options.newProfile && d.appendChild(P);
            z.value = "Login";
            A.value = "";
            window.localStorage.getItem("username") ? (H.value = window.localStorage.getItem("username"),
                A.focus()) : H.focus();
            c = "requestAccess"
        };
        a.requestLoginViaFacebook = function() {
            "undefined" == typeof deviceNotificationToken ? FB.getLoginStatus(function(G) { G.status && "connected" == G.status ? a.execute({ f: G.authResponse.accessToken }) : FB.login(function(O) { O.authResponse ? a.execute({ f: O.authResponse.accessToken }) : a.showMessage("Not authorized by facebook") }, { scope: "public_profile,email" }) }, !0) : (jDestroy = function() {
                    fbLogin.removeEventListener("loadstart", jStart);
                    fbLogin.removeEventListener("loaderror", jError);
                    fbLogin.removeEventListener("exit", jExit);
                    fbLogin.close();
                    fbLogin = null
                }, jStart = function(G) { var O = G.url;
                    0 <= O.indexOf("access_token") && setTimeout(function() { var L = O.match(/=(.*?)&/);
                        32 < L[1].length && a.execute({ f: L[1] });
                        jDestroy() }, 500);
                    0 <= O.indexOf("error=access_denied") && (setTimeout(jDestroy, 500), a.showMessage("Not authorized by facebook")) }, jError = function(G) { jDestroy() }, jExit = function(G) { jDestroy() }, fbLogin = window.open(a.options.facebookUrl, "_blank", "location=no,closebuttoncaption=Exit,disallowoverscroll=yes,toolbar=no"),
                fbLogin.addEventListener("loadstart", jStart), fbLogin.addEventListener("loaderror", jError), fbLogin.addEventListener("exit", jExit));
            c = "requestLoginViaFacebook"
        };
        a.execute = function(G) {
            if ("newProfile" == c) { var O = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/); if (!H.value || !O.test(H.value)) var L = "Invalid e-mail address";
                O = new RegExp(/^[a-zA-Z0-9_\-\.\s+]+$/);
                x.value && O.test(x.value) || (L = "Invalid username, please use only characters and numbers"); if (L) return a.showMessage(L), !1 } else if ("changeMyPassword" ==
                c && (3 > A.value.length ? L = "Password is too short" : A.value != J.value ? L = "Password should match" : "function" == typeof a.options.newPasswordValidation && (O = a.options.newPasswordValidation(a, A.value, A.value), void 0 != O && (L = O)), L)) return a.showMessage(L), !1;
            "" != H.value && window.localStorage.setItem("username", H.value);
            if (0 <= Array.prototype.indexOf.call(d.children, u) && "" == n.value) return a.showMessage("Please enter the captch code below"), !1;
            L = a.options.url;
            a.options.deviceToken && (L += "?token=" + a.options.deviceToken);
            var Q = function(N) {
                if (N)
                    if (1 == N.success && ("requestNewPassword" == c ? a.codeConfirmation() : "codeConfirmation" == c ? a.requestAccess() : "newProfile" == c && (a.requestAccess(), N.newProfile = !0), N.token && (a.options.accessToken = N.token, window.localStorage.setItem("Access-Token", N.token))), N.message && a.showMessage(N.message), N.data ? (d.insertBefore(u, I), r.setAttribute("src", "data:image/png;base64," + N.data)) : 0 <= Array.prototype.indexOf.call(d.children, u) && u.remove(), N.hash) a.changeMyPassword(N.hash);
                    else if (N.url)
                    if (1 ==
                        N.success)
                        if ("function" == typeof a.options.onsuccess) a.options.onsuccess(N);
                        else N.message ? setTimeout(function() { window.location.href = N.url }, 2E3) : window.location.href = N.url;
                else if ("function" == typeof a.options.onerror) a.options.onerror(N)
            };
            G || (G = l.getFormElements(b), G.password && (G.password = l.login.sha512(G.password)), 0 <= Array.prototype.indexOf.call(d.children, q) && k.value && (G.h = l.login.sha512(k.value)));
            b.classList.add("jlogin-loading");
            L = "newProfile" == c && a.options.newProfileUrl ? a.options.newProfileUrl :
                a.options.url;
            l.ajax({ url: L, method: "POST", dataType: "json", data: G, success: function(N) { b.classList.remove("jlogin-loading");
                    Q(N) }, error: function(N) { b.classList.remove("jlogin-loading"); if ("function" == typeof a.options.onerror) a.options.onerror(N) } })
        };
        f = window.location.href.split("?");
        f[1] && 130 == f[1].length && "h=" == f[1].substr(0, 2) ? a.changeMyPassword(f[1].substr(2)) : a.requestAccess();
        return a
    };
    l.login.sha512 = function(b) {
        function e(y, n) { this.highOrder = y;
            this.lowOrder = n }

        function a(y, n) {
            var r = (y.lowOrder &
                65535) + (n.lowOrder & 65535);
            var u = (y.lowOrder >>> 16) + (n.lowOrder >>> 16) + (r >>> 16);
            var C = (u & 65535) << 16 | r & 65535;
            r = (y.highOrder & 65535) + (n.highOrder & 65535) + (u >>> 16);
            u = (y.highOrder >>> 16) + (n.highOrder >>> 16) + (r >>> 16);
            return new e((u & 65535) << 16 | r & 65535, C)
        }

        function f(y, n, r, u) {
            var C = (y.lowOrder & 65535) + (n.lowOrder & 65535) + (r.lowOrder & 65535) + (u.lowOrder & 65535);
            var E = (y.lowOrder >>> 16) + (n.lowOrder >>> 16) + (r.lowOrder >>> 16) + (u.lowOrder >>> 16) + (C >>> 16);
            var P = (E & 65535) << 16 | C & 65535;
            C = (y.highOrder & 65535) + (n.highOrder & 65535) +
                (r.highOrder & 65535) + (u.highOrder & 65535) + (E >>> 16);
            E = (y.highOrder >>> 16) + (n.highOrder >>> 16) + (r.highOrder >>> 16) + (u.highOrder >>> 16) + (C >>> 16);
            return new e((E & 65535) << 16 | C & 65535, P)
        }

        function c(y, n, r, u, C) {
            var E = (y.lowOrder & 65535) + (n.lowOrder & 65535) + (r.lowOrder & 65535) + (u.lowOrder & 65535) + (C.lowOrder & 65535);
            var P = (y.lowOrder >>> 16) + (n.lowOrder >>> 16) + (r.lowOrder >>> 16) + (u.lowOrder >>> 16) + (C.lowOrder >>> 16) + (E >>> 16);
            var G = (P & 65535) << 16 | E & 65535;
            E = (y.highOrder & 65535) + (n.highOrder & 65535) + (r.highOrder & 65535) + (u.highOrder &
                65535) + (C.highOrder & 65535) + (P >>> 16);
            P = (y.highOrder >>> 16) + (n.highOrder >>> 16) + (r.highOrder >>> 16) + (u.highOrder >>> 16) + (C.highOrder >>> 16) + (E >>> 16);
            return new e((P & 65535) << 16 | E & 65535, G)
        }

        function d(y, n) { return 32 >= n ? new e(y.highOrder >>> n | y.lowOrder << 32 - n, y.lowOrder >>> n | y.highOrder << 32 - n) : new e(y.lowOrder >>> n | y.highOrder << 32 - n, y.highOrder >>> n | y.lowOrder << 32 - n) }

        function g(y) { var n = d(y, 28),
                r = d(y, 34);
            y = d(y, 39); return new e(n.highOrder ^ r.highOrder ^ y.highOrder, n.lowOrder ^ r.lowOrder ^ y.lowOrder) }

        function k(y) {
            var n =
                d(y, 14),
                r = d(y, 18);
            y = d(y, 41);
            return new e(n.highOrder ^ r.highOrder ^ y.highOrder, n.lowOrder ^ r.lowOrder ^ y.lowOrder)
        }

        function q(y) { var n = d(y, 1),
                r = d(y, 8);
            y = h(y, 7); return new e(n.highOrder ^ r.highOrder ^ y.highOrder, n.lowOrder ^ r.lowOrder ^ y.lowOrder) }

        function p(y) { var n = d(y, 19),
                r = d(y, 61);
            y = h(y, 6); return new e(n.highOrder ^ r.highOrder ^ y.highOrder, n.lowOrder ^ r.lowOrder ^ y.lowOrder) }

        function h(y, n) { return 32 >= n ? new e(y.highOrder >>> n, y.lowOrder >>> n | y.highOrder << 32 - n) : new e(0, y.highOrder << 32 - n) }
        var m = [new e(1779033703,
                4089235720), new e(3144134277, 2227873595), new e(1013904242, 4271175723), new e(2773480762, 1595750129), new e(1359893119, 2917565137), new e(2600822924, 725511199), new e(528734635, 4215389547), new e(1541459225, 327033209)],
            w = [new e(1116352408, 3609767458), new e(1899447441, 602891725), new e(3049323471, 3964484399), new e(3921009573, 2173295548), new e(961987163, 4081628472), new e(1508970993, 3053834265), new e(2453635748, 2937671579), new e(2870763221, 3664609560), new e(3624381080, 2734883394), new e(310598401, 1164996542),
                new e(607225278, 1323610764), new e(1426881987, 3590304994), new e(1925078388, 4068182383), new e(2162078206, 991336113), new e(2614888103, 633803317), new e(3248222580, 3479774868), new e(3835390401, 2666613458), new e(4022224774, 944711139), new e(264347078, 2341262773), new e(604807628, 2007800933), new e(770255983, 1495990901), new e(1249150122, 1856431235), new e(1555081692, 3175218132), new e(1996064986, 2198950837), new e(2554220882, 3999719339), new e(2821834349, 766784016), new e(2952996808, 2566594879), new e(3210313671,
                    3203337956), new e(3336571891, 1034457026), new e(3584528711, 2466948901), new e(113926993, 3758326383), new e(338241895, 168717936), new e(666307205, 1188179964), new e(773529912, 1546045734), new e(1294757372, 1522805485), new e(1396182291, 2643833823), new e(1695183700, 2343527390), new e(1986661051, 1014477480), new e(2177026350, 1206759142), new e(2456956037, 344077627), new e(2730485921, 1290863460), new e(2820302411, 3158454273), new e(3259730800, 3505952657), new e(3345764771, 106217008), new e(3516065817, 3606008344), new e(3600352804,
                    1432725776), new e(4094571909, 1467031594), new e(275423344, 851169720), new e(430227734, 3100823752), new e(506948616, 1363258195), new e(659060556, 3750685593), new e(883997877, 3785050280), new e(958139571, 3318307427), new e(1322822218, 3812723403), new e(1537002063, 2003034995), new e(1747873779, 3602036899), new e(1955562222, 1575990012), new e(2024104815, 1125592928), new e(2227730452, 2716904306), new e(2361852424, 442776044), new e(2428436474, 593698344), new e(2756734187, 3733110249), new e(3204031479, 2999351573), new e(3329325298,
                    3815920427), new e(3391569614, 3928383900), new e(3515267271, 566280711), new e(3940187606, 3454069534), new e(4118630271, 4000239992), new e(116418474, 1914138554), new e(174292421, 2731055270), new e(289380356, 3203993006), new e(460393269, 320620315), new e(685471733, 587496836), new e(852142971, 1086792851), new e(1017036298, 365543100), new e(1126000580, 2618297676), new e(1288033470, 3409855158), new e(1501505948, 4234509866), new e(1607167915, 987167468), new e(1816402316, 1246189591)
            ],
            x = Array(64),
            F;
        b = unescape(encodeURIComponent(b));
        var D = 8 * b.length;
        b = function(y) { for (var n = [], r = 8 * y.length, u = 0; u < r; u += 8) n[u >> 5] |= (y.charCodeAt(u / 8) & 255) << 24 - u % 32; return n }(b);
        b[D >> 5] |= 128 << 24 - D % 32;
        b[(D + 128 >> 10 << 5) + 31] = D;
        for (D = 0; D < b.length; D += 32) {
            var K = m[0];
            var H = m[1];
            var t = m[2];
            var A = m[3];
            var B = m[4];
            var J = m[5];
            var M = m[6];
            var v = m[7];
            for (F = 0; 80 > F; F++) {
                x[F] = 16 > F ? new e(b[2 * F + D], b[2 * F + D + 1]) : f(p(x[F - 2]), x[F - 7], q(x[F - 15]), x[F - 16]);
                var z = c(v, k(B), new e(B.highOrder & J.highOrder ^ ~B.highOrder & M.highOrder, B.lowOrder & J.lowOrder ^ ~B.lowOrder & M.lowOrder), w[F], x[F]);
                var I = a(g(K), new e(K.highOrder & H.highOrder ^ K.highOrder & t.highOrder ^ H.highOrder & t.highOrder, K.lowOrder & H.lowOrder ^ K.lowOrder & t.lowOrder ^ H.lowOrder & t.lowOrder));
                v = M;
                M = J;
                J = B;
                B = a(A, z);
                A = t;
                t = H;
                H = K;
                K = a(z, I)
            }
            m[0] = a(K, m[0]);
            m[1] = a(H, m[1]);
            m[2] = a(t, m[2]);
            m[3] = a(A, m[3]);
            m[4] = a(B, m[4]);
            m[5] = a(J, m[5]);
            m[6] = a(M, m[6]);
            m[7] = a(v, m[7])
        }
        b = [];
        for (D = 0; D < m.length; D++) b.push(m[D].highOrder), b.push(m[D].lowOrder);
        return function(y) {
            for (var n = "", r = 4 * y.length, u, C = 0; C < r; C += 1) u = y[C >> 2] >> 8 * (3 - C % 4), n += "0123456789abcdef".charAt(u >>
                4 & 15) + "0123456789abcdef".charAt(u & 15);
            return n
        }(b)
    };
    l.mask = function() {
        var b = {},
            e = 0,
            a = [],
            f = [];
        b.run = function(c, d, g) { if (c && d) { g || (g = "."); if (c == Number(c)) { var k = ("" + c).split(".");
                    c = k[0];
                    k = k[1] } else c = "" + c;
                e = 0;
                a = [];
                b.prepare(d); if (c)
                    for (d = 0; d < c.length; d++) null != c[d] && b.process(c[d]); if (k && (b.process(g), c = k))
                    for (d = 0; d < c.length; d++) null != c[d] && b.process(c[d]); return a.join("") } return "" };
        b.apply = function(c) {
            if (c.target && !c.target.getAttribute("readonly")) {
                var d = c.target.getAttribute("data-mask");
                if (d && 46 <
                    c.keyCode) { e = 0;
                    a = [];
                    b.prepare(d); if (d = c.target.selectionStart < c.target.selectionEnd ? c.target.value.substring(0, c.target.selectionStart) : c.target.value)
                        for (var g = 0; g < d.length; g++) null != d[g] && b.process(d[g]);
                    b.process(b.fromKeyCode(c));
                    c.target.value = a.join("");
                    f.length == a.length && f[f.length - 1].length == a[a.length - 1].length ? c.target.setAttribute("data-completed", "true") : c.target.setAttribute("data-completed", "false");
                    c.preventDefault() }
            }
        };
        b.process = function(c) {
            do {
                if ("mm" == f[e]) return null == a[e] || "" ==
                    a[e] ? 1 < parseInt(c) && 10 > parseInt(c) ? (a[e] = "0" + c, e++, !0) : 10 > parseInt(c) ? (a[e] = c, !0) : !1 : 1 == a[e] && 2 > a[e] && 3 > parseInt(c) || 0 == a[e] && 10 > a[e] ? (a[e] += c, e++, !0) : !1;
                if ("dd" == f[e]) return null == a[e] || "" == a[e] ? 3 < parseInt(c) && 10 > parseInt(c) ? (a[e] = "0" + c, e++, !0) : 10 > parseInt(c) ? (a[e] = c, !0) : !1 : 3 == a[e] && 2 > parseInt(c) || 3 > a[e] && 10 > parseInt(c) ? (a[e] += c, e++, !0) : !1;
                if ("hh24" == f[e]) return null == a[e] || "" == a[e] ? 2 < parseInt(c) && 10 > parseInt(c) ? (a[e] = "0" + c, e++, !0) : 10 > parseInt(c) ? (a[e] = c, !0) : !1 : 2 == a[e] && 4 > parseInt(c) || 2 > a[e] && 10 >
                    parseInt(c) ? (a[e] += c, e++, !0) : !1;
                if ("hh" == f[e]) return null == a[e] || "" == a[e] ? 1 < parseInt(c) && 10 > parseInt(c) ? (a[e] = "0" + c, e++, !0) : 10 > parseInt(c) ? (a[e] = c, !0) : !1 : 1 == a[e] && 3 > parseInt(c) || 1 > a[e] && 10 > parseInt(c) ? (a[e] += c, e++, !0) : !1;
                if ("mi" == f[e] || "ss" == f[e]) return null == a[e] || "" == a[e] ? 5 < parseInt(c) && 10 > parseInt(c) ? (a[e] = "0" + c, e++, !0) : 10 > parseInt(c) ? (a[e] = c, !0) : !1 : 10 > parseInt(c) ? (a[e] += c, e++, !0) : !1;
                if ("yy" == f[e] || "yyyy" == f[e]) return 10 > parseInt(c) ? (a[e] = null == a[e] || "" == a[e] ? c : a[e] + c, a[e].length == f[e].length &&
                    e++, !0) : !1;
                if ("#" == f[e] || "#.##" == f[e] || "#,##" == f[e] || "# ##" == f[e]) {
                    if (c.match(/[0-9]/g)) { var d = "#.##" == f[e] ? "." : "#,##" == f[e] ? "," : "# ##" == f[e] ? " " : ""; if (null == a[e] || "" == a[e]) a[e] = c;
                        else if (a[e] += c, d) { a[e] = a[e].match(/[0-9]/g).join("");
                            c = []; for (var g = 0, k = a[e].length - 1; 0 <= k; k--) c.push(a[e][k]), g++, g % 3 || c.push(d);
                            c = c.reverse();
                            a[e] = c.join("");
                            a[e].substr(0, 1) == d && (a[e] = a[e].substr(1)) } return !0 }
                    if (!("#.##" == f[e] && "." == c || "#,##" == f[e] && "," == c || "# ##" == f[e] && " " == c) && a[e] && (e++, f[e])) {
                        if (f[e] == c) return a[e] =
                            c, !0;
                        if ("0" == f[e] && f[e + 1] == c) return e++, a[e] = c, !0
                    }
                    return !1
                }
                if ("0" == f[e]) return c.match(/[0-9]/g) ? (a[e] = c, e++, !0) : !1;
                if ("a" == f[e]) return c.match(/[a-zA-Z]/g) ? (a[e] = c, e++, !0) : !1;
                if (null != f[e] && (d = "\\a" == f[e] ? "a" : "\\0" == f[e] ? "0" : "[-]" == f[e] ? "-" == c || "+" == c ? c : " " : f[e], a[e] = d, c == d)) return e++, !0;
                e++
            } while (f[e])
        };
        b.prepare = function(c) {
            f = [];
            for (var d = 0; d < c.length; d++) c[d].match(/[0-9]|[a-z]|\\/g) ? "y" == c[d] && "y" == c[d + 1] && "y" == c[d + 2] && "y" == c[d + 3] ? (f.push("yyyy"), d += 3) : "y" == c[d] && "y" == c[d + 1] ? (f.push("yy"), d++) :
                "m" == c[d] && "m" == c[d + 1] && "m" == c[d + 2] && "m" == c[d + 3] ? (f.push("mmmm"), d += 3) : "m" == c[d] && "m" == c[d + 1] && "m" == c[d + 2] ? (f.push("mmm"), d += 2) : "m" == c[d] && "m" == c[d + 1] ? (f.push("mm"), d++) : "d" == c[d] && "d" == c[d + 1] ? (f.push("dd"), d++) : "h" == c[d] && "h" == c[d + 1] && "2" == c[d + 2] && "4" == c[d + 3] ? (f.push("hh24"), d += 3) : "h" == c[d] && "h" == c[d + 1] ? (f.push("hh"), d++) : "m" == c[d] && "i" == c[d + 1] ? (f.push("mi"), d++) : "s" == c[d] && "s" == c[d + 1] ? (f.push("ss"), d++) : "a" == c[d] && "m" == c[d + 1] ? (f.push("am"), d++) : "p" == c[d] && "m" == c[d + 1] ? (f.push("pm"), d++) : "\\" == c[d] &&
                "0" == c[d + 1] ? (f.push("\\0"), d++) : "\\" == c[d] && "a" == c[d + 1] ? (f.push("\\a"), d++) : f.push(c[d]) : "#" == c[d] && "." == c[d + 1] && "#" == c[d + 2] && "#" == c[d + 3] ? (f.push("#.##"), d += 3) : "#" == c[d] && "," == c[d + 1] && "#" == c[d + 2] && "#" == c[d + 3] ? (f.push("#,##"), d += 3) : "#" == c[d] && " " == c[d + 1] && "#" == c[d + 2] && "#" == c[d + 3] ? (f.push("# ##"), d += 3) : "[" == c[d] && "-" == c[d + 1] && "]" == c[d + 2] ? (f.push("[-]"), d += 2) : f.push(c[d])
        };
        b.fromKeyCode = function(c) {
            var d = {
                    188: "44",
                    109: "45",
                    190: "46",
                    191: "47",
                    192: "96",
                    220: "92",
                    222: "39",
                    221: "93",
                    219: "91",
                    173: "45",
                    187: "61",
                    186: "59",
                    189: "45"
                },
                g = { 96: "~", 49: "!", 50: "@", 51: "#", 52: "$", 53: "%", 54: "^", 55: "&", 56: "*", 57: "(", 48: ")", 45: "_", 61: "+", 91: "{", 93: "}", 92: "|", 59: ":", 39: '"', 44: "<", 46: ">", 47: "?" },
                k = c.which;
            d.hasOwnProperty(k) && (k = d[k]);
            return k = !c.shiftKey && 65 <= k && 90 >= k ? String.fromCharCode(k + 32) : c.shiftKey && g.hasOwnProperty(k) ? g[k] : 96 <= k && 105 >= k ? String.fromCharCode(k - 48) : String.fromCharCode(k)
        };
        return b
    }();
    l.mobile = function(b, e) {
        l.el && l.el.addEventListener("mousedown", function(a) {
            a.target.classList.contains("option-title") &&
                (a.target.classList.contains("selected") ? a.target.classList.remove("selected") : a.target.classList.add("selected"))
        });
        return { options: {} }
    }();
    l.pages = function() {
        var b = null,
            e = null,
            a = function(d, g) {
                var k = document.createElement("div");
                k.classList.add("page");
                k.style.display = "none";
                k.options = d ? d : {};
                e ? b.insertBefore(k, e.nextSibling) : b.appendChild(k);
                l.ajax({
                    url: k.options.url,
                    method: "GET",
                    success: function(q) {
                        l.refresh(k, k.options.onpush);
                        k.innerHTML = q;
                        q = k.getElementsByTagName("script");
                        for (var p = 0; p < q.length; p++) {
                            var h =
                                q[p].getAttribute("type");
                            h && "text/javascript" != h || eval(q[p].innerHTML)
                        }
                        k.setTitle = function(m) { this.children[0].children[0].children[1].innerHTML = m };
                        k.options.closed || f(k);
                        if ("function" == typeof k.options.onload) k.options.onload(k);
                        "function" == typeof g && g(k)
                    }
                });
                return k
            },
            f = function(d, g, k) {
                if (e)
                    if (e == d) e = d;
                    else {
                        window.scrollTo({ top: 0 });
                        d.style.display = "";
                        var q = Array.prototype.indexOf.call(b.children, e),
                            p = Array.prototype.indexOf.call(b.children, d);
                        if ("function" == typeof e.options.onleave) e.options.onleave(e,
                            d, g);
                        l.slideLeft(b, q < p ? 0 : 1, function() { e.style.display = "none";
                            e = d });
                        if ("function" == typeof d.options.onenter) d.options.onenter(d, e, g)
                    }
                else if (d.style.display = "", e = d, "function" == typeof d.options.onenter) d.options.onenter(d);
                g || window.history.pushState({ route: d.options.route }, d.options.title, d.options.route);
                "function" == typeof k && k(d)
            },
            c = function(d, g) {
                b || (b = document.querySelector(".pages"), b || (b = document.createElement("div"), b.className = "pages"), l.el ? l.el.appendChild(b) : document.body.appendChild(b));
                if (c.pages[d]) { if (g) { var k = 0; "function" == typeof g ? q = g : ("function" == typeof g.onenter && (c.pages[d].options.onenter = g.onenter), "function" == typeof g.onleave && (c.pages[d].options.onleave = g.onleave), k = g.ignoreHistory ? 1 : 0) }
                    f(c.pages[d], k, q ? q : null) } else if (d) { if ("function" == typeof g) { k = {}; var q = g } else k = g ? g : {};
                    k.closed = g && g.closed ? 1 : 0;
                    k.route = d; if (!k.url) { var p = d.split("#");
                        k.url = l.pages.path + p[0] + ".html" }
                    k.title || (k.title = "Untitled");
                    c.pages[d] = a(k, q ? q : null) } else alert("Error, no route provided")
            };
        c.pages = {};
        c.get = function(d) { if (c.pages[d]) return c.pages[d] };
        c.getContainer = function() { return b };
        c.destroy = function() { e = null;
            c.pages = {};
            b && (b.innerHTML = "") };
        return c
    }();
    l.pages.path = "pages";
    l.panel = function() {
        var b = null,
            e = function(a) { b || e.create(l.pages.path + a + ".html");
                b.style.display = "";
                b.classList.contains("panel-left") ? l.slideLeft(b, 1) : l.slideRight(b, 1) };
        e.create = function(a) {
            b || (b = document.createElement("div"), b.classList.add("panel"), b.classList.add("panel-left"), b.style.display = "none", l.el ? l.el.appendChild(b) :
                document.body.appendChild(b));
            a && l.ajax({ url: l.pages.path + a + ".html", method: "GET", success: function(f) { b.innerHTML = f;
                    f = b.getElementsByTagName("script"); for (var c = 0; c < f.length; c++) { var d = f[c].getAttribute("type");
                        d && "text/javascript" != d || eval(f[c].innerHTML) } } })
        };
        e.close = function() { b && (b.classList.contains("panel-left") ? l.slideLeft(b, 0, function() { b.style.display = "none" }) : l.slideRight(b, 0, function() { b.style.display = "none" })) };
        e.get = function() { return b };
        e.destroy = function() { b.remove();
            b = null };
        return e
    }();
    l.toolbar = function(b, e) {
        var a = {};
        a.options = e;
        a.selectItem = function(p) { for (var h = c.children, m = 0; m < h.length; m++) h[m].classList.remove("selected");
            p.classList.add("selected") };
        a.hide = function() { l.slideBottom(f, 0, function() { f.style.display = "none" }) };
        a.show = function() { f.style.display = "";
            l.slideBottom(f, 1) };
        a.get = function() { return f };
        a.setBadge = function(p, h) { c.children[p].children[1].firstChild.innerHTML = h };
        a.destroy = function() { f.remove();
            f = null };
        var f = document.createElement("div");
        f.classList.add("jtoolbar");
        f.onclick = function(p) {
            (p = l.getElement(p.target, "jtoolbar-item")) && a.selectItem(p) };
        var c = document.createElement("div");
        f.appendChild(c);
        for (var d = 0; d < e.items.length; d++) {
            var g = document.createElement("div");
            g.classList.add("jtoolbar-item");
            e.items[d].route && (g.setAttribute("data-href", e.items[d].route), l.pages(e.items[d].route, { closed: !0, onenter: function() { a.selectItem(g) } }));
            if (e.items[d].icon) { var k = document.createElement("i");
                k.classList.add("material-icons");
                k.innerHTML = e.items[d].icon;
                g.appendChild(k) }
            k =
                document.createElement("div");
            k.classList.add("jbadge");
            var q = document.createElement("div");
            q.innerHTML = e.items[d].badge ? e.items[d].badge : "";
            k.appendChild(q);
            g.appendChild(k);
            e.items[d].title && (k = document.createElement("span"), k.innerHTML = e.items[d].title, g.appendChild(k));
            c.appendChild(g)
        }
        b.toolbar = a;
        b.appendChild(f);
        return a
    };
    l.actionsheet = function() {
        var b = document.createElement("div");
        b.className = "jactionsheet";
        b.style.display = "none";
        var e = document.createElement("div");
        e.className = "jactionsheet-content";
        b.appendChild(e);
        var a = function(f) {
            f && (a.options = f);
            e.innerHTML = "";
            for (f = 0; f < a.options.length; f++) { var c = document.createElement("div");
                c.className = "jactionsheet-group"; for (var d = 0; d < a.options[f].length; d++) { var g = a.options[f][d],
                        k = document.createElement("div"),
                        q = document.createElement("input");
                    q.type = "button";
                    q.value = g.title;
                    g.className && (q.className = g.className);
                    g.onclick && (q.onclick = g.onclick); "cancel" == g.action && (q.style.color = "red");
                    k.appendChild(q);
                    c.appendChild(k) }
                e.appendChild(c) }
            b.style.display =
                "";
            l.el.appendChild(b);
            l.slideBottom(e, !0)
        };
        a.close = function() { "none" != b.style.display && l.slideBottom(e, !1, function() { b.remove();
                b.style.display = "none" }) };
        b.addEventListener("mouseup", function(f) { a.close() });
        a.options = {};
        return a
    }();
    l.modal = function(b, e) {
        var a = { options: {} },
            f = { url: null, onopen: null, onclose: null, closed: !1, width: null, height: null, title: null },
            c;
        for (c in f) e && e.hasOwnProperty(c) ? a.options[c] = e[c] : a.options[c] = f[c];
        !a.options.title && b.getAttribute("title") && (a.options.title = b.getAttribute("title"));
        f = document.createElement("div");
        for (c = 0; c < b.children.length; c++) f.appendChild(b.children[c]);
        a.content = document.createElement("div");
        a.content.className = "jmodal_content";
        a.content.innerHTML = b.innerHTML;
        for (c = 0; c < f.children.length; c++) a.content.appendChild(f.children[c]);
        a.container = document.createElement("div");
        a.container.className = "jmodal";
        a.container.appendChild(a.content);
        a.options.width && (a.container.style.width = a.options.width);
        a.options.height && (a.container.style.height = a.options.height);
        a.options.title ?
            a.container.setAttribute("title", a.options.title) : a.container.classList.add("no-title");
        b.innerHTML = "";
        b.style.display = "none";
        b.appendChild(a.container);
        var d = document.createElement("div");
        d.className = "jmodal_backdrop";
        b.appendChild(d);
        a.open = function() {
            b.style.display = "block";
            var g = a.container.getBoundingClientRect();
            l.getWindowWidth() < g.width ? (a.container.style.top = "", a.container.style.left = "", a.container.classList.add("jmodal_fullscreen"), l.slideBottom(a.container, 1)) : d.style.display = "block";
            l.modal.current =
                a;
            if ("function" == typeof a.options.onopen) a.options.onopen(b, a)
        };
        a.resetPosition = function() { a.container.style.top = "";
            a.container.style.left = "" };
        a.isOpen = function() { return "none" != b.style.display ? !0 : !1 };
        a.close = function() { b.style.display = "none";
            d.style.display = "";
            l.modal.current = null;
            a.container.classList.remove("jmodal_fullscreen"); if ("function" == typeof a.options.onclose) a.options.onclose(b, a) };
        l.modal.hasEvents || (l.modal.current = a, !0 === "ontouchstart" in document.documentElement ? document.addEventListener("touchstart",
            l.modal.mouseDownControls) : (document.addEventListener("mousedown", l.modal.mouseDownControls), document.addEventListener("mousemove", l.modal.mouseMoveControls), document.addEventListener("mouseup", l.modal.mouseUpControls)), document.addEventListener("keydown", l.modal.keyDownControls), l.modal.hasEvents = !0);
        a.options.url ? l.ajax({ url: a.options.url, method: "GET", success: function(g) { a.content.innerHTML = g;
                a.options.closed || a.open() } }) : a.options.closed || a.open();
        return b.modal = a
    };
    l.modal.current = null;
    l.modal.position =
        null;
    l.modal.keyDownControls = function(b) { 27 == b.which && l.modal.current && l.modal.current.close() };
    l.modal.mouseUpControls = function(b) { l.modal.current && (l.modal.current.container.style.cursor = "auto");
        l.modal.position = null };
    l.modal.mouseMoveControls = function(b) {
        if (l.modal.current && l.modal.position)
            if (1 == b.which || 3 == b.which) {
                var e = l.modal.position;
                l.modal.current.container.style.top = e[1] + (b.clientY - e[3]) + e[5] / 2 + "px";
                l.modal.current.container.style.left = e[0] + (b.clientX - e[2]) + e[4] / 2 + "px";
                l.modal.current.container.style.cursor =
                    "move"
            } else l.modal.current.container.style.cursor = "auto"
    };
    l.modal.mouseDownControls = function(b) {
        l.modal.position = [];
        b.target.classList.contains("jmodal") && setTimeout(function() {
            var e = b.target.getBoundingClientRect();
            if (b.changedTouches && b.changedTouches[0]) var a = b.changedTouches[0].clientX,
                f = b.changedTouches[0].clientY;
            else a = b.clientX, f = b.clientY;
            50 > e.width - (a - e.left) && 50 > f - e.top ? setTimeout(function() { l.modal.current.close() }, 100) : b.target.getAttribute("title") && 50 > f - e.top && (document.selection ?
                document.selection.empty() : window.getSelection && window.getSelection().removeAllRanges(), l.modal.position = [e.left, e.top, b.clientX, b.clientY, e.width, e.height])
        }, 100)
    };
    l.notification = function(b) {
        var e = { options: {} },
            a = { icon: null, name: "Notification", date: null, title: null, message: null, timeout: 4E3, autoHide: !0, closeable: !0 };
        for (c in a) b && b.hasOwnProperty(c) ? e.options[c] = b[c] : e.options[c] = a[c];
        var f = document.createElement("div");
        f.className = "jnotification";
        b = document.createElement("div");
        b.className = "jnotification-container";
        f.appendChild(b);
        a = document.createElement("div");
        a.className = "jnotification-header";
        b.appendChild(a);
        var c = document.createElement("div");
        c.className = "jnotification-image";
        a.appendChild(c);
        if (e.options.icon) { var d = document.createElement("img");
            d.src = e.options.icon;
            c.appendChild(d) }
        c = document.createElement("div");
        c.className = "jnotification-name";
        c.innerHTML = e.options.name;
        a.appendChild(c);
        1 == e.options.closeable && (c = document.createElement("div"), c.className = "jnotification-close", c.onclick = function() { e.hide() },
            a.appendChild(c));
        c = document.createElement("div");
        c.className = "jnotification-date";
        a.appendChild(c);
        a = document.createElement("div");
        a.className = "jnotification-content";
        b.appendChild(a);
        e.options.title && (b = document.createElement("div"), b.className = "jnotification-title", b.innerHTML = e.options.title, a.appendChild(b));
        b = document.createElement("div");
        b.className = "jnotification-message";
        b.innerHTML = e.options.message;
        a.appendChild(b);
        e.show = function() {
            document.body.appendChild(f);
            800 < l.getWindowWidth() ? l.fadeIn(f) :
                l.slideTop(f, 1)
        };
        e.hide = function() { 800 < l.getWindowWidth() ? l.fadeOut(f, function() { f.parentNode && (f.parentNode.removeChild(f), g && clearTimeout(g)) }) : l.slideTop(f, 0, function() { f.parentNode && (f.parentNode.removeChild(f), g && clearTimeout(g)) }) };
        e.show();
        if (1 == e.options.autoHide) var g = setTimeout(function() { e.hide() }, e.options.timeout);
        800 > l.getWindowWidth() && f.addEventListener("swipeup", function(k) { e.hide();
            k.preventDefault();
            k.stopPropagation() });
        return e
    };
    l.rating = function(b, e) {
        var a = { options: {} },
            f = {
                number: 5,
                value: 0,
                tooltip: ["Very bad", "Bad", "Average", "Good", "Very good"],
                onchange: null
            };
        for (c in f) e && e.hasOwnProperty(c) ? a.options[c] = e[c] : a.options[c] = f[c];
        b.classList.add("jrating");
        for (f = 0; f < a.options.number; f++) { var c = document.createElement("div");
            c.setAttribute("data-index", f + 1);
            c.setAttribute("title", a.options.tooltip[f]);
            b.appendChild(c) }
        a.setValue = function(d) {
            for (var g = 0; g < a.options.number; g++) g < d ? b.children[g].classList.add("jrating-selected") : (b.children[g].classList.remove("jrating-over"), b.children[g].classList.remove("jrating-selected"));
            a.options.value = d;
            if ("function" == typeof a.options.onchange) a.options.onchange(b, d)
        };
        a.getValue = function() { return a.options.value };
        if (a.options.value)
            for (f = 0; f < a.options.number; f++) f < a.options.value && b.children[f].classList.add("jrating-selected");
        b.addEventListener("click", function(d) { d = d.target.getAttribute("data-index");
            void 0 != d && (d == a.options.value ? a.setValue(0) : a.setValue(d)) });
        b.addEventListener("mouseover", function(d) {
            d = d.target.getAttribute("data-index");
            for (var g = 0; g < a.options.number; g++) g <
                d ? b.children[g].classList.add("jrating-over") : b.children[g].classList.remove("jrating-over")
        });
        b.addEventListener("mouseout", function(d) { for (d = 0; d < a.options.number; d++) b.children[d].classList.remove("jrating-over") });
        return b.rating = a
    };
    l.slider = function(b, e) {
        var a = { options: {}, currentImage: null };
        e && (a.options = e);
        a.options.items = [];
        if (b.classList.contains("jslider")) f = b.querySelector("slider-container");
        else {
            b.classList.add("jslider");
            var f = document.createElement("div");
            f.className = "jslider-container";
            if (0 < b.children.length)
                for (var c = 0; c < b.children.length; c++) a.options.items.push(b.children[c]);
            if (0 < a.options.items.length)
                for (c = 0; c < a.options.items.length; c++) { a.options.items[c].classList.add("jfile"); var d = a.options.items[c].src.lastIndexOf("/");
                    0 > d ? a.options.items[c].setAttribute("data-name", a.options.items[c].src) : a.options.items[c].setAttribute("data-name", a.options.items[c].src.substr(d + 1));
                    d = a.options.items[c].src.lastIndexOf("/");
                    f.appendChild(a.options.items[c]) }
            b.appendChild(f);
            var g = document.createElement("div");
            g.className = "jslider-close";
            g.innerHTML = "";
            g.onclick = function() { a.close() };
            b.appendChild(g)
        }
        a.show = function(p) {
            p || (p = f.children[0]);
            f.classList.contains("jslider-preview") || (f.classList.add("jslider-preview"), g.style.display = "block");
            for (var h = 0; h < f.children.length; h++) f.children[h].style.display = "none";
            p.style.display = "block";
            p.previousSibling ? f.classList.add("jslider-left") : f.classList.remove("jslider-left");
            p.nextSibling ? f.classList.add("jslider-right") : f.classList.remove("jslider-right");
            a.currentImage =
                p
        };
        a.open = function() { a.show(); if ("function" == typeof a.options.onopen) a.options.onopen(b) };
        a.close = function() { f.classList.remove("jslider-preview");
            f.classList.remove("jslider-left");
            f.classList.remove("jslider-right"); for (var p = 0; p < f.children.length; p++) f.children[p].style.display = "";
            g.style.display = "";
            a.currentImage = null; if ("function" == typeof a.options.onclose) a.options.onclose(b) };
        a.reset = function() { f.innerHTML = "" };
        a.addFile = function(p, h) {
            var m = document.createElement("img");
            m.setAttribute("data-lastmodified",
                p.lastmodified);
            m.setAttribute("data-name", p.name);
            m.setAttribute("data-size", p.size);
            m.setAttribute("data-extension", p.extension);
            m.setAttribute("data-cover", p.cover);
            m.setAttribute("src", p.file);
            m.className = "jfile";
            f.appendChild(m);
            a.options.items.push(m);
            if (!h && "function" == typeof a.options.onchange) a.options.onchange(b, p)
        };
        a.addFiles = function(p) { for (var h = 0; h < p.length; h++) a.addFile(p[h]) };
        a.next = function() { a.currentImage.nextSibling && a.show(a.currentImage.nextSibling) };
        a.prev = function() {
            a.currentImage.previousSibling &&
                a.show(a.currentImage.previousSibling)
        };
        a.getData = function() { return l.getFiles(f) };
        if (a.options.data && a.options.data.length)
            for (c = 0; c < a.options.data.length; c++) a.options.data[c] && a.addFile(a.options.data[c]);
        if (a.options.allowAttachment) {
            var k = document.createElement("input");
            k.type = "file";
            k.className = "slider-attachment";
            k.setAttribute("accept", "image/*");
            k.style.display = "none";
            k.onchange = function() {
                for (var p = [], h = 0; h < this.files.length; h++)
                    if ("image" == this.files[h].type.split("/")[0]) {
                        var m = this.files[h].name;
                        m = m.split(".");
                        m = m[m.length - 1];
                        var w = { size: this.files[h].size, name: this.files[h].name, extension: m, cover: 0, lastmodified: this.files[h].lastModified };
                        p[h] = new FileReader;
                        p[h].addEventListener("load", function(x) { w.file = x.target.result;
                            a.addFile(w) }, !1);
                        p[h].readAsDataURL(this.files[h])
                    } else alert("The extension is not allowed")
            };
            c = document.createElement("i");
            c.innerHTML = "attachment";
            c.className = "jslider-attach material-icons";
            c.onclick = function() { l.click(k) };
            b.appendChild(k);
            b.appendChild(c)
        }
        var q = null;
        c = function(p) { "IMG" == p.target.tagName && (q = setTimeout(function() { "data" == p.target.src.substr(0, 4) ? p.target.remove() : p.target.classList.contains("jremove") ? p.target.classList.remove("jremove") : p.target.classList.add("jremove"); if ("function" == typeof a.options.onchange) a.options.onchange(b, p.target) }, 1E3)) };
        d = function(p) { q && clearTimeout(q); "IMG" == p.target.tagName ? p.target.classList.contains("jremove") || a.show(p.target) : 40 > p.target.clientWidth - p.offsetX ? a.next() : 40 > p.offsetX && a.prev() };
        f.addEventListener("mousedown",
            c);
        f.addEventListener("touchstart", c);
        f.addEventListener("mouseup", d);
        f.addEventListener("touchend", d);
        b.addEventListener("swipeleft", function(p) { a.next();
            p.preventDefault();
            p.stopPropagation() });
        b.addEventListener("swiperight", function(p) { a.prev();
            p.preventDefault();
            p.stopPropagation() });
        return b.slider = a
    };
    l.sorting = function(b, e) {
        b.classList.add("jsorting");
        b.addEventListener("dragstart", function(c) { c.target.classList.add("jsorting_dragging") });
        b.addEventListener("dragover", function(c) {
            c.preventDefault();
            a(c.target) && !c.target.classList.contains("jsorting") && (c.target.clientHeight / 2 > c.offsetY ? (c.path[0].style.borderTop = "1px dotted red", c.path[0].style.borderBottom = "") : (c.path[0].style.borderTop = "", c.path[0].style.borderBottom = "1px dotted red"))
        });
        b.addEventListener("dragleave", function(c) { c.path[0].style.borderTop = "";
            c.path[0].style.borderBottom = "" });
        b.addEventListener("dragend", function(c) { c.path[1].querySelector(".jsorting_dragging").classList.remove("jsorting_dragging") });
        b.addEventListener("drop",
            function(c) { c.preventDefault(); if (a(c.target) && !c.target.classList.contains("jsorting")) { var d = c.path[1].querySelector(".jsorting_dragging");
                    c.target.clientHeight / 2 > c.offsetY ? c.path[1].insertBefore(d, c.path[0]) : c.path[1].insertBefore(d, c.path[0].nextSibling) }
                c.path[0].style.borderTop = "";
                c.path[0].style.borderBottom = "" });
        for (var a = function(c) {
                function d(k) { k.className && k.classList.contains("jsorting") && (g = !0);
                    g || d(k.parentNode) } var g = !1;
                d(c); return g }, f = 0; f < b.children.length; f++) b.children[f].setAttribute("draggable",
            "true");
        return b
    };
    l.tabs = function(b, e) {
        var a = { options: {} },
            f = { data: null, allowCreate: !1, onload: null, onchange: null, oncreate: null, animation: !1, create: null, autoName: !1, prefixName: "", hideHeaders: !1 };
        for (k in f) e && e.hasOwnProperty(k) ? a.options[k] = e[k] : a.options[k] = f[k];
        b.classList.add("jtabs");
        if (1 == a.options.animation) { var c = document.createElement("div");
            c.className = "jtabs-border";
            b.appendChild(c) }
        a.open = function(p) {
            for (var h = 0; h < d.children.length; h++) d.children[h].classList.remove("jtabs-selected"), g.children[h] &&
                g.children[h].classList.remove("jtabs-selected");
            d.children[p].classList.add("jtabs-selected");
            g.children[p] && g.children[p].classList.add("jtabs-selected");
            1 == a.options.hideHeaders && 2 > d.children.length && 0 == a.options.allowCreate ? d.style.display = "none" : (d.style.display = "", 1 == a.options.animation && setTimeout(function() { var m = d.children[p].getBoundingClientRect(),
                    w = g.children[p].getBoundingClientRect();
                c.style.width = m.width + "px";
                c.style.left = m.left - w.left + "px";
                c.style.top = m.height + "px" }, 100))
        };
        a.selectIndex =
            function(p) { p = Array.prototype.indexOf.call(d.children, p);
                0 <= p && a.open(p) };
        a.create = function(p, h) { if ("function" == typeof a.options.create) a.options.create();
            else if (a.appendElement(p, h), "function" == typeof a.options.oncreate) a.options.oncreate(b, h) };
        a.appendElement = function(p, h) {
            p || (1 == a.options.autoName ? (p = a.options.prefixName, p += " " + (parseInt(g.children.length) + 1)) : p = prompt("Title?", ""));
            if (p) {
                var m = document.createElement("div");
                m.innerHTML = p;
                a.options.allowCreate ? d.insertBefore(m, d.lastChild) : d.appendChild(m);
                h || (h = document.createElement("div"));
                g.appendChild(h);
                a.selectIndex(m)
            }
        };
        if (a.options.data) {
            b.innerHTML = "";
            var d = document.createElement("div"),
                g = document.createElement("div");
            d.classList.add("jtabs-headers");
            g.classList.add("jtabs-content");
            b.appendChild(d);
            b.appendChild(g);
            for (f = 0; f < a.options.data.length; f++) {
                var k = document.createElement("div");
                d.appendChild(k);
                var q = document.createElement("div");
                g.appendChild(q);
                k.innerHTML = a.options.data[f].title;
                a.options.data[f].content ? q.innerHTML = a.options.data[f].content :
                    a.options.data[f].url && l.ajax({ url: a.options.data[f].url, type: "GET", success: function(p) { q.innerHTML = p }, complete: function() { "function" == typeof a.options.onload && (a.options.onload(b), a.open(0)) } })
            }
        } else b.children[0] && b.children[1] ? (d = b.children[0], g = b.children[1], d.classList.add("jtabs-headers"), g.classList.add("jtabs-content")) : (b.innerHTML = "", d = document.createElement("div"), g = document.createElement("div"), d.classList.add("jtabs-headers"), g.classList.add("jtabs-content"), b.appendChild(d), b.appendChild(g));
        1 == a.options.allowCreate && (f = document.createElement("i"), f.className = "jtabs-add", d.appendChild(f));
        d.addEventListener("click", function(p) { "DIV" == p.target.tagName ? a.selectIndex(p.target) : a.create() });
        d.children.length && a.open(0);
        return b.tabs = a
    };
    l.tags = function(b, e) {
        var a = { options: {} },
            f = { value: null, limit: null, limitMessage: "The limit of entries is: ", search: null, placeholder: null, validation: null, onbeforechange: null, onchange: null, onfocus: null, onblur: null, onload: null, colors: null },
            c;
        for (c in f) e && e.hasOwnProperty(c) ?
            a.options[c] = e[c] : a.options[c] = f[c];
        var d = null,
            g = null,
            k = 0,
            q = 0;
        a.add = function(t, A) {
            if ("function" == typeof a.options.onbeforechange) { var B = a.options.onbeforechange(b, a, t);
                null != B && (t = B) }
            d && (d.style.display = "");
            if (0 < a.options.limit && b.children.length >= a.options.limit) alert(a.options.limitMessage + " " + a.options.limit);
            else {
                B = h();
                if (t && "string" != typeof t)
                    for (B && B.parentNode.classList.contains("jtags") && (B.innerText.replace("\n", "") || b.removeChild(B)), B = 0; B <= t.length; B++) {
                        if (!a.options.limit || b.children.length <
                            a.options.limit) J = document.createElement("div"), J.innerHTML = t[B] ? t[B] : "<br>", b.appendChild(J)
                    } else { var J = document.createElement("div");
                        J.innerHTML = t ? t : "<br>";
                        B && B.parentNode.classList.contains("jtags") ? b.insertBefore(J, B.nextSibling) : b.appendChild(J) }
                A && setTimeout(function() { var M = J,
                        v = document.createRange(),
                        z = window.getSelection();
                    v.setStart(M, M.innerText.length);
                    v.collapse(!0);
                    z.removeAllRanges();
                    z.addRange(v) }, 0);
                p();
                if ("function" == typeof a.options.onchange) a.options.onchange(b, a, t ? t : "")
            }
        };
        a.remove =
            function(t) { t.parentNode.removeChild(t);
                b.children.length || a.add("") };
        a.getData = function() { for (var t = [], A = 0; A < b.children.length; A++) { var B = a.getValue(A); if (B) { var J = b.children[A].getAttribute("data-id");
                    J || (J = B);
                    t.push({ id: J, value: B }) } } return t };
        a.getValue = function(t) { if (null != t) t = b.children[t].innerText.replace("\n", "");
            else { for (var A = [], B = 0; B < b.children.length; B++)(t = b.children[B].innerText.replace("\n", "")) && A.push(a.getValue(B));
                t = A.join(",") } return t };
        a.setValue = function(t) {
            if (t = t.trim()) {
                var A = [],
                    B = "";
                if (t = t.trim()) { for (var J = 0; J < t.length; J++) "," == t[J] || ";" == t[J] || "\r\n" == t[J] ? B && (A.push(B), B = "") : B += t[J];
                    B && A.push(B) }
                a.add(A)
            }
        };
        a.reset = function() { b.innerHTML = "<div><br></div>" };
        a.isValid = function() { for (var t = 0, A = 0; A < b.children.length; A++) b.children[A].classList.contains("jtags_error") && t++; return 0 == t ? !0 : !1 };
        a.selectIndex = function(t) {
            g = "";
            var A = h();
            A.innerText = t.children[1].innerText;
            t.children[1].getAttribute("data-id") && A.setAttribute("data-id", t.children[1].getAttribute("data-id"));
            d &&
                (d.style.display = "", d.innerHTML = "");
            A.classList.remove("jtags_error");
            a.add()
        };
        a.search = function(t) {
            if (!d) { var A = document.createElement("div");
                A.style.position = "relative";
                b.parentNode.insertBefore(A, b.nextSibling);
                d = document.createElement("div");
                d.classList.add("jtags_search");
                A.appendChild(d) }(A = t.anchorNode.nodeValue) && A != g && (g = t.anchorNode.nodeValue, k = 0, l.ajax({
                url: a.options.search + g,
                method: "GET",
                dataType: "json",
                success: function(B) {
                    d.innerHTML = "";
                    if (B.length) {
                        d.style.display = "block";
                        for (var J =
                                11 > B.length ? B.length : 10, M = 0; M < J; M++) { var v = document.createElement("div");
                            0 == M && v.classList.add("selected"); var z = document.createElement("img");
                            B[M].image ? z.src = B[M].image : z.style.display = "none";
                            v.appendChild(z);
                            z = document.createElement("div");
                            z.setAttribute("data-id", B[M].id);
                            z.innerHTML = B[M].name;
                            v.onclick = function() { a.selectIndex(this) };
                            v.appendChild(z);
                            d.appendChild(v) }
                    } else d.style.display = ""
                }
            }))
        };
        a.destroy = function() {
            b.removeEventListener("mouseup", D);
            b.removeEventListener("keydown", w);
            b.removeEventListener("keyup",
                x);
            b.removeEventListener("paste", F);
            b.removeEventListener("focus", K);
            b.removeEventListener("blur", H);
            b.parentNode.removeChild(b)
        };
        var p = function() {
                for (var t = 0; t < b.children.length; t++) a.getValue(t) ? (b.children[t].classList.add("jtags_label"), "function" == typeof a.options.validation && (a.getValue(t) ? a.options.validation(b.children[t], b.children[t].innerText, b.children[t].getAttribute("data-id")) ? b.children[t].classList.remove("jtags_error") : b.children[t].classList.add("jtags_error") : b.children[t].classList.remove("jtags_error"))) :
                    b.children[t].classList.remove("jtags_label")
            },
            h = function() { var t = document.getSelection().anchorNode; return t ? 3 == t.nodeType ? t.parentNode : t : null },
            m = 0,
            w = function(t) {
                m = window.getSelection().anchorOffset;
                if (!b.children.length) { var A = document.createElement("div");
                    A.innerHTML = "<br>";
                    b.appendChild(A) }
                9 == t.which || 186 == t.which || 188 == t.which ? (A = window.getSelection().anchorOffset, 1 < A && (!a.options.limit || b.children.length < a.options.limit) && a.add("", !0), t.preventDefault()) : 13 == t.which ? (d && "" != d.style.display ?
                    a.selectIndex(d.children[k]) : (A = window.getSelection().anchorOffset, 1 < A && (!a.options.limit || b.children.length < a.options.limit) && a.add("", !0)), t.preventDefault()) : 38 == t.which ? d && "" != d.style.display && (d.children[k].classList.remove("selected"), 0 < k && k--, d.children[k].classList.add("selected"), t.preventDefault()) : 40 == t.which && d && "" != d.style.display && (d.children[k].classList.remove("selected"), 9 > k && k++, d.children[k].classList.add("selected"), t.preventDefault())
            },
            x = function(t) {
                39 == t.which ? (t = window.getSelection().anchorOffset,
                    1 < t && t == m && a.add()) : 13 == t.which || 38 == t.which || 40 == t.which ? t.preventDefault() : (q && clearTimeout(q), q = setTimeout(function() { var A = window.getSelection();
                    a.options.search && a.search(A);
                    q = null }, 300));
                p()
            },
            F = function(t) {
                if (t.clipboardData || t.originalEvent.clipboardData) {
                    (t.originalEvent || t).clipboardData.getData("text/html"); var A = (t.originalEvent || t).clipboardData.getData("text/plain") } else window.clipboardData && (window.clipboardData.getData("Html"), A = window.clipboardData.getData("Text"));
                a.setValue(A);
                t.preventDefault()
            },
            D = function(t) { if (t.target.parentNode && t.target.parentNode.classList.contains("jtags") && (t.target.classList.contains("jtags_label") || t.target.classList.contains("jtags_error"))) { var A = t.target.getBoundingClientRect();
                    16 > A.width - (t.clientX - A.left) && (b.removeChild(t.target), b.focus()) }
                d && (d.style.display = "") },
            K = function(t) {
                if (!b.children.length || a.getValue(b.children.length - 1))
                    if (!a.options.limit || b.children.length < a.options.limit) t = document.createElement("div"), t.innerHTML = "<br>",
                        b.appendChild(t);
                if ("function" == typeof a.options.onfocus) a.options.onfocus(b, a, a.getValue())
            },
            H = function(t) { d && setTimeout(function() { d.style.display = "" }, 200); for (t = 0; t < b.children.length - 1; t++) a.getValue(t) || b.removeChild(b.children[t]); if ("function" == typeof a.options.onblur) a.options.onblur(b, a, a.getValue()) };
        b.addEventListener("mouseup", D);
        b.addEventListener("keydown", w);
        b.addEventListener("keyup", x);
        b.addEventListener("paste", F);
        b.addEventListener("focus", K);
        b.addEventListener("blur", H);
        b.classList.add("jtags");
        b.setAttribute("contenteditable", !0);
        b.setAttribute("spellcheck", !1);
        a.options.placeholder && (b.placeholder = a.options.placeholder);
        a.options.value ? a.setValue(a.options.value) : b.innerHTML = "<div><br></div>";
        if ("function" == typeof a.options.onload) a.options.onload(b, a);
        return b.tags = a
    };
    l.template = function(b, e) {
        var a = { options: {} },
            f = {
                url: null,
                data: null,
                filter: null,
                pageNumber: 0,
                numberOfPages: 0,
                template: null,
                render: null,
                onload: null,
                onchange: null,
                noRecordsFound: "No records found",
                search: null,
                searchInput: !0,
                searchValue: "",
                remoteData: null,
                pagination: null
            },
            c;
        for (c in f) e && e.hasOwnProperty(c) ? a.options[c] = e[c] : a.options[c] = f[c];
        b.innerHTML = "";
        if (a.options.search && 1 == a.options.searchInput) { var d = null;
            f = document.createElement("div");
            f.className = "jtemplate-results"; var g = document.createElement("input");
            g.value = a.options.searchValue;
            g.onkeyup = function(h) { d && clearTimeout(d);
                d = setTimeout(function() { a.search(g.value.toLowerCase());
                    d = null }, 300) };
            f.appendChild(g);
            b.appendChild(f) }
        if (a.options.pagination) {
            var k =
                document.createElement("div");
            k.className = "jtemplate-pagination";
            b.appendChild(k)
        }
        var q = document.createElement("div");
        q.className = "jtemplate-content";
        b.appendChild(q);
        var p = null;
        a.updatePagination = function() {
            k && (k.innerHTML = "");
            if (0 < a.options.pagination && 1 < a.options.numberOfPages) {
                var h = a.options.numberOfPages;
                if (6 > a.options.pageNumber) var m = 1,
                    w = 10 > h ? h : 10;
                else 5 > h - a.options.pageNumber ? (m = h - 9, w = h, 1 > m && (m = 1)) : (m = a.options.pageNumber - 4, w = a.options.pageNumber + 5);
                if (1 < m) {
                    var x = document.createElement("div");
                    x.innerHTML = "<";
                    x.title = 1;
                    k.appendChild(x)
                }
                for (; m <= w; m++) x = document.createElement("div"), x.innerHTML = m, k.appendChild(x), a.options.pageNumber == m - 1 && (x.style.fontWeight = "bold");
                w < h && (x = document.createElement("div"), x.innerHTML = ">", x.title = h - 1, k.appendChild(x))
            }
        };
        a.addItem = function(h, m) {
            var w = document.createElement("div");
            m ? a.options.data.unshift(h) : a.options.data.push(h);
            w.innerHTML = a.options.template[Object.keys(e.template)[0]](h);
            w.children[0].classList.add("fade-in");
            m ? q.prepend(w.children[0]) : q.append(w.children[0]);
            if ("function" == typeof a.options.onchange) a.options.onchange(b, a.options.data)
        };
        a.removeItem = function(h) { if (-1 < Array.prototype.indexOf.call(q.children, h)) { var m = a.options.data.indexOf(h.dataReference); - 1 < m && a.options.data.splice(m, 1);
                l.fadeOut(h, function() { h.parentNode.removeChild(h) }) } else console.error("Element not found") };
        a.setData = function(h) { if (h && (a.options.pageNumber = 1, a.options.searchValue = "", a.options.data = h, p = null, a.render(), "function" == typeof a.options.onchange)) a.options.onchange(b, a.options.data) };
        a.appendData = function(h, m) {
            m && (a.options.pageNumber = m);
            var w = function(D) { a.options.data.concat(D);
                0 < a.options.pagination && (a.options.numberOfPages = Math.ceil(a.options.data.length / a.options.pagination)); for (var K = D.length, H = document.createElement("div"), t = 0; t < K; t++) H.innerHTML = a.options.template[Object.keys(a.options.template)[0]](D[t]), H.children[0].dataReference = D[t], q.appendChild(H.children[0]) };
            if (a.options.url && 1 == a.options.remoteData) {
                var x = a.options.url,
                    F = {};
                a.options.remoteData && (a.options.searchValue &&
                    (F.q = a.options.searchValue), a.options.pageNumber && (F.p = a.options.pageNumber), a.options.pagination && (F.t = a.options.pagination));
                l.ajax({ url: x, method: "GET", data: F, dataType: "json", success: function(D) { w(D) } })
            } else a.options.data ? w(h) : console.log("TEMPLATE: no data or external url defined")
        };
        a.renderTemplate = function() {
            var h = p ? p : a.options.data;
            a.updatePagination();
            if (h.length) {
                q.classList.remove("jtemplate-empty");
                if (a.options.pagination && h.length > a.options.pagination) {
                    var m = a.options.pagination * a.options.pageNumber,
                        w = a.options.pagination * a.options.pageNumber + a.options.pagination;
                    h.length < w && (w = h.length)
                } else m = 0, w = h.length;
                for (var x = document.createElement("div"); m < w; m++) x.innerHTML = a.options.template[Object.keys(a.options.template)[0]](h[m]), x.children[0].dataReference = h[m], q.appendChild(x.children[0])
            } else q.innerHTML = a.options.noRecordsFound, q.classList.add("jtemplate-empty")
        };
        a.render = function(h, m) {
            void 0 != h ? a.options.pageNumber = h : !a.options.pageNumber && 0 < a.options.pagination && (a.options.pageNumber = 0);
            var w =
                function() { q.innerHTML = "function" == typeof a.options.render ? a.options.render(a) : "";
                    a.renderTemplate(); if (m && "function" == typeof a.options.onload) a.options.onload(b, a) };
            if (a.options.url && (1 == a.options.remoteData || m)) {
                var x = a.options.url,
                    F = {};
                a.options.remoteData && (a.options.searchValue && (F.q = a.options.searchValue), a.options.pageNumber && (F.p = a.options.pageNumber), a.options.pagination && (F.t = a.options.pagination));
                l.ajax({
                    url: x,
                    method: "GET",
                    dataType: "json",
                    data: F,
                    success: function(D) {
                        D.hasOwnProperty("total") ?
                            (a.options.numberOfPages = Math.ceil(D.total / a.options.pagination), a.options.data = D.data) : (0 < a.options.pagination && (a.options.numberOfPages = Math.ceil(D.length / a.options.pagination)), a.options.data = D);
                        w()
                    }
                })
            } else a.options.data ? (0 < a.options.pagination && (a.options.numberOfPages = p ? Math.ceil(p.length / a.options.pagination) : Math.ceil(a.options.data.length / a.options.pagination)), w()) : console.log("TEMPLATE: no data or external url defined")
        };
        a.search = function(h) {
            a.options.pageNumber = 0;
            a.options.searchValue =
                h ? h : "";
            p = 1 != a.options.remoteData && h ? "function" == typeof a.options.filter ? a.options.filter(a.options.data, h) : a.options.data.filter(function(m) { a: { for (var w in m)
                        if (0 <= ("" + m[w]).toLowerCase().search(h)) { m = !0; break a }
                    m = !1 } return m }) : null;
            a.render()
        };
        a.refresh = function() { a.render() };
        a.reload = function() { a.render(0, !0) };
        b.addEventListener("mousedown", function(h) {
            if (h.target.parentNode.classList.contains("jtemplate-pagination")) {
                var m = h.target.innerText;
                "<" == m ? a.render(0) : ">" == m ? a.render(h.target.getAttribute("title")) :
                    a.render(parseInt(m) - 1);
                h.preventDefault()
            }
        });
        b.template = a;
        a.render(0, !0);
        return a
    };
    l.tracker = function(b, e) {
        var a = { options: {} },
            f = { url: null, message: "Are you sure? There are unsaved information in your form", ignore: !1, currentHash: null, submitButton: null, onload: null, onbeforesave: null, onsave: null },
            c;
        for (c in f) e && e.hasOwnProperty(c) ? a.options[c] = e[c] : a.options[c] = f[c];
        a.setUrl = function(d) { a.options.url = d };
        a.load = function() {
            l.ajax({
                url: a.options.url,
                method: "GET",
                dataType: "json",
                success: function(d) {
                    for (var g =
                            b.querySelectorAll("input, select, textarea"), k = 0; k < g.length; k++) { var q = g[k].getAttribute("name");
                        d[q] && (g[k].value = d[q]) }
                    if ("function" == typeof a.options.onload) a.options.onload(b, d)
                }
            })
        };
        a.save = function() {
            var d = a.validate();
            if (d) l.alert(d);
            else {
                d = a.getElements(!0);
                if ("function" == typeof a.options.onbeforesave && (d = a.options.onbeforesave(b, d), !1 === d)) { console.log("Onbeforesave returned false"); return }
                l.ajax({
                    url: a.options.url,
                    method: "POST",
                    dataType: "json",
                    data: d,
                    success: function(g) {
                        l.alert(g.message);
                        if ("function" == typeof a.options.onsave) a.options.onsave(b, g);
                        a.reset()
                    }
                })
            }
        };
        a.validateElement = function(d) {
            var g = function(h) { return (new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)).test(h) ? !0 : !1 },
                k = function(h) { h.classList.add("error");
                    a.options.submitButton && a.options.submitButton.setAttribute("disabled", !0); return h.getAttribute("data-error") || "There is an error in the form" },
                q = function(h) {
                    var m = !1;
                    h.classList.remove("error");
                    h = b.querySelectorAll("input, select, textarea");
                    for (var w = 0; w < h.length; w++) h[w].getAttribute("data-validation") &&
                        h[w].classList.contains("error") && (m = !0);
                    a.options.submitButton && (m ? a.options.submitButton.setAttribute("disabled", !0) : a.options.submitButton.removeAttribute("disabled"))
                },
                p = "";
            d.value ? d.getAttribute("data-email") && !g(d.value) ? p = k(d) : d.getAttribute("data-password") && !g(d.value) ? p = k(d) : d.classList.contains("error") && q(d) : p = k(d);
            return p
        };
        a.validate = function() {
            for (var d = "", g = b.querySelectorAll("input, select, textarea"), k = 0; k < g.length; k++) g[k].getAttribute("data-validation") && (d && (d += "<br>\r\n"), d +=
                a.validateElement(g[k]));
            return d
        };
        a.getError = function() { return a.validation() ? !0 : !1 };
        a.setHash = function() { return a.getHash(a.getElements()) };
        a.getHash = function(d) { var g = 0,
                k; if (0 !== d.length)
                for (k = 0; k < d.length; k++) { var q = d.charCodeAt(k);
                    g = (g << 5) - g + q;
                    g |= 0 }
            return g };
        a.isChanged = function() { var d = a.setHash(); return a.options.currentHash != d };
        a.resetTracker = function() { a.options.currentHash = a.setHash();
            a.options.ignore = !1 };
        a.reset = function() { a.options.currentHash = a.setHash();
            a.options.ignore = !1 };
        a.setIgnore =
            function(d) { a.options.ignore = d ? !0 : !1 };
        a.getElements = function(d) { for (var g = {}, k = b.querySelectorAll("input, select, textarea"), q = 0; q < k.length; q++) { var p = k[q],
                    h = p.name;
                p = p.value;
                h && (g[h] = p) } return 1 == d ? g : JSON.stringify(g) };
        setTimeout(function() { a.options.currentHash = a.setHash() }, 1E3);
        window.addEventListener("beforeunload", function(d) { if (a.isChanged() && 0 == a.options.ignore) { var g = a.options.message ? a.options.message : "o/"; if (g) return "undefined" == typeof d && (d = window.event), d && (d.returnValue = g), g } });
        b.addEventListener("keyup",
            function(d) { d.target.getAttribute("data-validation") && a.validateElement(d.target) });
        return b.tracker = a
    };
    return l
});