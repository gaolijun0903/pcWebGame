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
        t = query.getByClass("aside-fixed")[0];
        if(!e || !t) return
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
        var e = query.getByClass("screenshots")[0];
        if(!e) return
        var t = e.getElementsByTagName("ul")[0],
        n = e.getElementsByTagName("li")[0];
        t.style.width = n.offsetWidth + "px";
    } (),
    scrollNav = function() {
        var e = query.getByClass("nav-wrap")[0], n = 0;
        if(!e) return
    	e && (n = e.offsetTop, query.add(window, "scroll",
        function(t) {
            var a = doc.body.scrollTop || doc.documentElement.scrollTop;
            a > n ? e.className.indexOf("fixed-nav") == -1 && query.addClass(e, "fixed-nav") : e.className.indexOf("fixed-nav") > -1 && query.removeClass(e, "fixed-nav")
        }))
    } ()
} ();