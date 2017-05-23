(function (e, t, n) {
    "use strict";

    function r(e) {
        var t = {};
        e = e.split(",");
        var n;
        for (n = 0; n < e.length; n++) t[e[n]] = !0;
        return t
    }
    function i(e, n) {
        function r(e, r, o, u) {
            r = t.lowercase(r);
            if (E[r]) for (; g.last() && S[g.last()];) i("", g.last());
            w[r] && g.last() == r && i("", r),
            (u = b[r] || !! u) || g.push(r);
            var a = {};
            o.replace(c, function (e, t, n, r, i) {
                a[t] = s(n || r || i || "")
            }),
            n.start && n.start(r, a, u)
        }
        function i(e, r) {
            var i = 0,
                s;
            if (r = t.lowercase(r)) for (i = g.length - 1; 0 <= i && g[i] != r; i--);
            if (0 <= i) {
                for (s = g.length - 1; s >= i; s--) n.end && n.end(g[s]);
                g.length = i
            }
        }
        var o, u, g = [],
            y = e;
        for (g.last = function () {
            return g[g.length - 1]
        }; e;) {
            u = !0;
            if (g.last() && x[g.last()]) e = e.replace(RegExp("(.*)<\\s*\\/\\s*" + g.last() + "[^>]*>", "i"), function (e, t) {
                return t = t.replace(d, "$1").replace(m, "$1"),
                n.chars && n.chars(s(t)),
                    ""
            }),
                i("", g.last());
            else {
                if (0 === e.indexOf("<!--")) o = e.indexOf("--", 4),
                0 <= o && e.lastIndexOf("-->", o) === o && (n.comment && n.comment(e.substring(4, o)), e = e.substring(o + 3), u = !1);
                else if (v.test(e)) {
                    if (o = e.match(v)) e = e.replace(o[0], ""),
                        u = !1
                } else if (p.test(e)) {
                    if (o = e.match(l)) e = e.substring(o[0].length),
                        o[0].replace(l, i),
                        u = !1
                } else h.test(e) && (o = e.match(f)) && (e = e.substring(o[0].length), o[0].replace(f, r), u = !1);
                u && (o = e.indexOf("<"), u = 0 > o ? e : e.substring(0, o), e = 0 > o ? "" : e.substring(o), n.chars && n.chars(s(u)))
            }
            if (e == y) throw a("badparse", e);
            y = e
        }
        i()
    }
    function s(e) {
        return k.innerHTML = e.replace(/</g, "&lt;"),
        k.innerText || k.textContent || ""
    }
    function o(e) {
        return e.replace(/&/g, "&amp;").replace(y, function (e) {
            return "&#" + e.charCodeAt(0) + ";"
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function u(e) {
        var n = !1,
            r = t.bind(e, e.push);
        return {
            start: function (e, i, s) {
                e = t.lowercase(e),
                !n && x[e] && (n = e),
                n || !0 !== T[e] || (r("<"), r(e), t.forEach(i, function (e, n) {
                    var i = t.lowercase(n);
                    !0 !== C[i] || !0 === N[i] && !e.match(g) || (r(" "), r(n), r('="'), r(o(e)), r('"'))
                }), r(s ? "/>" : ">"))
            },
            end: function (e) {
                e = t.lowercase(e),
                n || !0 !== T[e] || (r("</"), r(e), r(">")),
                e == n && (n = !1)
            },
            chars: function (e) {
                n || r(o(e))
            }
        }
    }
    var a = t.$$minErr("$sanitize"),
        f = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
        l = /^<\s*\/\s*([\w:-]+)[^>]*>/,
        c = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
        h = /^</,
        p = /^<\s*\//,
        d = /\x3c!--(.*?)--\x3e/g,
        v = /<!DOCTYPE([^>]*?)>/i,
        m = /<!\[CDATA\[(.*?)]]\x3e/g,
        g = /^((ftp|https?):\/\/|mailto:|tel:|#)/i,
        y = /([^\#-~| |!])/g,
        b = r("area,br,col,hr,img,wbr");
    e = r("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        n = r("rp,rt");
    var w = t.extend({}, n, e),
        E = t.extend({}, e, r("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
        S = t.extend({}, n, r("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
        x = r("script,style"),
        T = t.extend({}, b, E, S, w),
        N = r("background,cite,href,longdesc,src,usemap"),
        C = t.extend({}, N, r("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,span,start,summary,target,title,type,valign,value,vspace,width")),
        k = document.createElement("pre");
    t.module("ngSanitize", []).value("$sanitize", function (e) {
        var t = [];
        return i(e, u(t)),
            t.join("")
    }),
        t.module("ngSanitize").filter("linky", function () {
            var e = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
                n = /^mailto:/;
            return function (r, i) {
                if (!r) return r;
                var s, o = r,
                    a = [],
                    f = u(a),
                    l, c, h = {};
                t.isDefined(i) && (h.target = i);
                for (; s = o.match(e);) l = s[0],
                s[2] == s[3] && (l = "mailto:" + l),
                    c = s.index,
                    f.chars(o.substr(0, c)),
                    h.href = l,
                    f.start("a", h),
                    f.chars(s[0].replace(n, "")),
                    f.end("a"),
                    o = o.substring(c + s[0].length);
                return f.chars(o),
                    a.join("")
            }
        })
})(window, window.angular);