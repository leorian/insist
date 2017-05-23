(function (e) {
    typeof e.fn.each2 == "undefined" && e.extend(e.fn, {
        each2: function (t) {
            var n = e([0]),
                r = -1,
                i = this.length;
            while (++r < i && (n.context = n[0] = this[r]) && t.call(n[0], r, n) !== !1);
            return this
        }
    })
})(jQuery);