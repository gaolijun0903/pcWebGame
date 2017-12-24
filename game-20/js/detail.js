~function(e, t) {
    function n(e, t, n) {
        if (e) if (e.length && e.length === +e.length) {
            for (var o = 0; o < e.length; o++) if (t.call(n, e[o], o, e) === !0) return
        } else for (var r in e) if (t.call(n, e[r], r, e) === !0) return
    }
    function o(e) {
        var t = [];
        return n(e,
        function(e, o) {
            i.isArray(e) ? n(e,
            function(e) {
                t.push(o + "=" + encodeURIComponent(e))
            }) : t.push(o + "=" + encodeURIComponent(e))
        }),
        t.join("&")
    }
    function r(e) {
        try {
            return JSON.parse(e)
        } catch(t) {
            try {
                return new Function("return " + e)()
            } catch(t) {}
        }
    }
    function a() {}
    if (!e.IO) {
        var i = {},
        c = Object.prototype.toString;
        n(["Array", "Boolean", "Function", "Object", "String", "Number"],
        function(e) {
            i["is" + e] = function(t) {
                return c.call(t) === "[object " + e + "]"
            }
        }),
        ~
        function(i) {
            function c(e, t) {
                i.isObject(e) && (t = e, e = t.url);
                var n, r, c, t = t || {},
                l = t.async !== !1,
                f = t.method || "GET",
                d = t.type || "text",
                v = t.encode || "UTF-8",
                p = t.timeout || 0,
                g = t.credential,
                m = t.data,
                y = t.scope,
                h = t.success || a,
                E = t.failure || a;
                return f = f.toUpperCase(),
                i.isObject(m) && (m = o(m)),
                "GET" === f && m && (e += ( - 1 === e.indexOf("?") ? "?": "&") + m),
                (n = s()) ? (r = !1, l && p > 0 && (c = setTimeout(function() {
                    r = !0,
                    n.abort()
                },
                p)), n.onreadystatechange = function() {
                    4 === n.readyState && (r ? E(n, "request timeout") : (u(n, d, h, E, y), clearTimeout(c)))
                },
                n.open(f, e, l), g && (n.withCredentials = !0), "POST" == f && n.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=" + v), n.send(m), n) : void 0
            }
            function u(e, n, o, a, i) {
                var c, u = e.status;
                if (u >= 200 && 300 > u) {
                    switch (n) {
                    case "text":
                        c = e.responseText;
                        break;
                    case "json":
                        c = r(e.responseText);
                        break;
                    case "xml":
                        c = e.responseXML
                    }
                    c !== t && o.call(i, c, u, e)
                } else a(e, e.status);
                e = null
            }
            var s = e.XMLHttpRequest ?
            function() {
                return new XMLHttpRequest
            }: function() {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            },
            l = {
                method: ["get", "post"],
                type: ["text", "json", "xml"],
                async: ["sync", "async"]
            };
            i.ajax = c,
            n(l,
            function(e, t) {
                n(e,
                function(e) {
                    i[e] = function(e, t) {
                        return function(n, o, r) {
                            return i.isObject(n) && (o = n),
                            i.isFunction(o) && (o = {
                                success: o
                            }),
                            i.isFunction(r) && (o = {
                                data: o
                            },
                            o.success = r),
                            "async" === e && (t = "async" === t ? !0 : !1),
                            o = o || {},
                            o[e] = t,
                            c(n, o)
                        }
                    } (t, e)
                })
            })
        } (i),
        ~
        function(n) {
            function r() {
                var e = "",
                t = [],
                n = 0,
                o = "0123456789ABCDEF";
                for (n = 0; 32 > n; n++) t[n] = o.substr(Math.floor(16 * Math.random()), 1);
                return t[12] = "4",
                t[16] = o.substr(3 & t[16] | 8, 1),
                e = "jsonp_" + t.join("")
            }
            function i(e, i) {
                function p(e) {
                    e ? v = !0 : E.call(L),
                    x.onload = x.onerror = x.onreadystatechange = null,
                    f && x.parentNode && (f.removeChild(x), x = null, u[w] = t)
                }
                function g() {
                    setTimeout(function() {
                        v || p()
                    },
                    d)
                }
                n.isObject(e) && (i = e, e = i.url);
                var i = i || {},
                e = -1 === e.indexOf("?") ? e + "?": e + "&",
                m = i.data,
                y = i.charset,
                h = i.success || a,
                E = i.failure || a,
                L = i.scope || u,
                b = i.timestamp,
                N = i.jsonpName || "callback",
                w = i.jsonpCallback || r();
                n.isObject(m) && (m = o(m));
                var x = l.createElement("script");
                c ? x.onreadystatechange = function() {
                    var e = this.readyState;
                    v || "loaded" != e && "complete" != e || p(!0)
                }: (x.onload = function() {
                    p(!0)
                },
                x.onerror = function() {
                    p()
                },
                s && g()),
                e += N + "=" + w,
                y && (x.charset = y),
                m && (e += "&" + m),
                b && (e += "&ts=", e += (new Date).getTime()),
                u[w] = function(e) {
                    h.call(L, e)
                },
                x.src = e,
                f.insertBefore(x, f.firstChild)
            }
            var c = !-[1],
            u = e,
            s = u.opera,
            l = u.document,
            f = l.head || l.getElementsByTagName("head")[0],
            d = 3e3,
            v = !1;
            n.jsonp = function(e, t, o) {
                return n.isObject(e) && (t = e),
                n.isFunction(t) && (t = {
                    success: t
                }),
                n.isFunction(o) && (t = {
                    data: t
                },
                t.success = o),
                i(e, t)
            }
        } (i),
        "function" == typeof define && define.amd ? define("IO", [],
        function() {
            return i
        }) : e.IO = i
    }
} (this);
!function() {
    var doc = document,
    query = {
        add: function() {
            var e = "addEventListener" in document;
            return e ?
            function(e, t, n) {
                e.addEventListener(t, n, !1)
            }: function(e, t, n) {
                e.attachEvent("on" + t, n)
            }
        } (),
        remove: function() {
            var e = "addEventListener" in document;
            return e ?
            function(e, t, n) {
                e.removeEventListener(t, n, !1)
            }: function(e, t, n) {
                e.detachEvent("on" + t, n)
            }
        } (),
        getEvent: function(e) {
            return e || window.event
        },
        getTarget: function(e) {
            var t = query.getEvent(e);
            return t.target || t.srcElement
        },
        preventDefault: function(e) {
            var t = query.getEvent(e);
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        },
        stopPropagation: function(e) {
            var t = query.getEvent(e);
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
        },
        addClass: function(e, t) {
            e.classList ? e.classList.add(t) : -1 == e.className.indexOf(t) && (e.className += " " + t)
        },
        removeClass: function(node, classname) {
            if (node.classList) node.classList.remove(classname);
            else {
                var reg = eval("/\\s*" + classname + "/ig");
                node.className = node.className.replace(reg, "")
            }
        },
        getByClass: function(e, t) {
            var t = t ? t: document;
            return t.querySelectorAll ? t.querySelectorAll("." + e) : function(t) {
                for (var t = t.getElementsByTagName("*"), n = [], o = new RegExp("\\b" + e + "\\b", "i"), r = 0; r < t.length; r++) o.test(t[r].className) && n.push(t[r]);
                return n
            } (t)
        },
        getNext: function(e) {
            if (e.nextElementSibling) return e.nextElementSibling;
            for (var t = e.nextSibling; t && 1 !== t.nodeType;) t = t.nextSibling;
            return t
        },
        toArray: function(e) {
            var t = [];
            try {
                t = Array.prototype.slice.call(e, 0)
            } catch(n) {
                for (var o = 0,
                r = e.length; r > o; o++) t[o] = e[o]
            }
            return t
        },
        forEach: function() {
            return function(e, t) {
                if ("function" == typeof Array.prototype.forEach) e.forEach(function(n, o, r) {
                    t.call(e, n, o, r)
                });
                else for (var n = 0,
                o = e.length; o > n; n++) t.call(e, e[n], n, e)
            }
        } ()
    },
    hotRank = function() {
        var e = query.getByClass("rank-item")[0],
        t = query.getByClass("aside-fixed")[0],
        n = function() {
            for (var e = t,
            n = e.offsetTop; e.offsetParent;) e = e.offsetParent,
            n += e.offsetTop;
            return n
        } (),
        o = function(e) {
            "cur" != o.className && query.forEach(query.toArray(e.parentNode.children),
            function(t) {
                t.className = t == e ? "cur": ""
            })
        },
        r = function(e) {
            var t = query.getTarget(e);
            return "li" == t.nodeName.toLowerCase() ? void o(t) : "h4" == t.nodeName.toLowerCase() || "span" == t.nodeName.toLowerCase() || "i" == t.nodeName.toLowerCase() ? void o(t.parentNode) : "a" == t.nodeName.toLowerCase() && "h4" == t.parentNode.nodeName.toLowerCase() ? void o(t.parentNode.parentNode) : void 0
        };
        query.add(e, "mouseover", r),
        query.add(window, "scroll",
        function() {
            var e = doc.body.scrollTop || doc.documentElement.scrollTop;
            e > n ? -1 == t.className.indexOf("cur") && query.addClass(t, "cur") : t.className.indexOf("cur") > -1 && query.removeClass(t, "cur")
        })
    } (),
    screenshots = function() {
        var e = query.getByClass("screenshots")[0],
        t = e.getElementsByTagName("ul")[0],
        n = e.getElementsByTagName("li")[0];
        t.style.width = n.offsetWidth + "px"
    } ()
} ();