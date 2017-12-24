!
function() {
    var doc = document,
    query = {
        add: function() {
            var e = "addEventListener" in document;
            return e ?
            function(e, n, t) {
                e.addEventListener(n, t, !1)
            }: function(e, n, t) {
                e.attachEvent("on" + n, t)
            }
        } (),
        remove: function(e, n, t) {
            var a = "addEventListener" in document;
            return a ?
            function(e, n, t) {
                e.removeEventListener(n, t, !1)
            }: function(e, n, t) {
                e.detachEvent("on" + n, t)
            }
        } (),
        getEvent: function(e) {
            return e ? e: window.event
        },
        getTarget: function(e) {
            var n = query.getEvent(e);
            return n.target || n.srcElement
        },
        preventDefault: function(e) {
            var n = query.getEvent(e);
            n.preventDefault ? n.preventDefault() : n.returnValue = !1
        },
        stopPropagation: function(e) {
            var n = query.getEvent(e);
            n.stopPropagation ? n.stopPropagation() : n.cancelBubble = !0
        },
        addClass: function(e, n) {
            e.classList ? e.classList.add(n) : e.className.indexOf(n) == -1 && (e.className += " " + n)
        },
        removeClass: function(node, classname) {
            if (node.classList) node.classList.remove(classname);
            else {
                var reg = eval("/\\s*" + classname + "/ig");
                node.className = node.className.replace(reg, "")
            }
        },
        getByClass: function(e, n) {
            var n = n ? n: document;
            return n.querySelectorAll ? n.querySelectorAll("." + e) : function(n) {
                for (var n = n.getElementsByTagName("*"), t = [], a = new RegExp("\\b" + e + "\\b", "i"), r = 0; r < n.length; r++) a.test(n[r].className) && t.push(n[r]);
                return t
            } (n)
        },
        toArray: function(e) {
            var n = [];
            try {
                n = Array.prototype.slice.call(e, 0)
            } catch(r) {
                for (var t = 0,
                a = e.length; t < a; t++) n[t] = e[t]
            }
            return n
        },
        forEach: function() {
            return function(e, n) {
                if ("function" == typeof Array.prototype.forEach) e.forEach(function(t, a, r) {
                    n.call(e, t, a, r)
                });
                else for (var t = 0,
                a = e.length; t < a; t++) n.call(e, e[t], t, e)
            }
        } ()
    },
    loadBtn = function() {
        var e = function(e) {
            var n = query.getTarget(e);
            if ("download-ios disable" == n.className || "download-Android disable" == n.className) return query.preventDefault(e),
            void alert("暂未开放下载，敬请留意官网公告")
        };
        query.add(doc.body, "click", e)
    } (),
    IsPC = function() {
        for (var e = navigator.userAgent,
        n = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], t = 0, a = n.length; t < a; t++) if (e.indexOf(n[t]) > 0) {
            window.location.href = wapUrl;
            break
        }
    } (),
    scrollNav = function() {
        var e = query.getByClass("nav-wrap")[0],
        n = 0;
        e && (n = e.offsetTop, query.add(window, "scroll",
        function(t) {
            var a = doc.body.scrollTop || doc.documentElement.scrollTop;
            a > n ? e.className.indexOf("fixed-nav") == -1 && query.addClass(e, "fixed-nav") : e.className.indexOf("fixed-nav") > -1 && query.removeClass(e, "fixed-nav")
        }))
    } ()
} ();