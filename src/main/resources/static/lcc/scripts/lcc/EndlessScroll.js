var EndlessScroll;
EndlessScroll = function () {
    function t(t, n) {
        var r = this;
        this.options = $.extend({}, e, n),
            this.pagesStack = [0],
            this.scrollDirection = "next",
            this.firing = !0,
            this.fired = !1,
            this.fireSequence = 0,
            this.pageSequence = 0,
            this.nextSequence = 1,
            this.prevSequence = -1,
            this.lastScrollTop = 0,
            this.insertLocation = this.options.insertAfter,
            this.didScroll = !1,
            this.isScrollable = !0,
            this.target = t,
            this.targetId = "",
            this.content = "",
            this.lastContent = "dummy",
            this.innerWrap = $(".endless_scroll_inner_wrap", this.target),
            this.handleDeprecatedOptions(),
            this.setInsertPositionsWhenNecessary(),
            $(t).scroll(function () {
                return r.detectTarget(t),
                    r.detectScrollDirection()
            })
    }

    var e;
    return t.name = "EndlessScroll",
        e = {
            pagesToKeep: null,
            inflowPixels: 50,
            fireOnce: !0,
            fireDelay: 150,
            loader: "Loading...",
            content: "",
            insertBefore: null,
            insertAfter: null,
            intervalFrequency: 250,
            ceaseFireOnEmpty: !0,
            resetCounter: function () {
                return !1
            },
            callback: function () {
                return !0
            },
            ceaseFire: function () {
                return !1
            }
        },
        t.prototype.run = function () {
            var e = this;
            return setInterval(function () {
                if (!e.shouldTryFiring()) return;
                if (e.ceaseFireWhenNecessary()) return;
                if (!e.shouldBeFiring()) return;
                return e.resetFireSequenceWhenNecessary(),
                    e.acknowledgeFiring(),
                    e.insertLoader(),
                e.hasContent() && (e.showContent(), e.fireCallback(), e.cleanUpPagesWhenNecessary(), e.delayFiringWhenNecessary()),
                    e.removeLoader(),
                    e.lastContent = e.content
            }, this.options.intervalFrequency)
        },
        t.prototype.handleDeprecatedOptions = function () {
            this.options.data && (this.options.content = this.options.data);
            if (this.options.bottomPixels) return this.options.inflowPixels = this.options.bottomPixels
        },
        t.prototype.setInsertPositionsWhenNecessary = function () {
            var t;
            t = "" + this.target.selector + " div.endless_scroll_inner_wrap",
            e.insertBefore === null && (this.options.insertBefore = "" + t + " div:first");
            if (e.insertAfter === null) return this.options.insertAfter = "" + t + " div:last"
        },
        t.prototype.detectTarget = function (e) {
            return this.target = e,
                this.targetId = $(this.target).attr("id")
        },
        t.prototype.detectScrollDirection = function () {
            var e;
            return this.didScroll = !0,
                e = $(this.target).scrollTop(),
                e > this.lastScrollTop ? this.scrollDirection = "next" : this.scrollDirection = "prev",
                this.lastScrollTop = e
        },
        t.prototype.shouldTryFiring = function () {
            var e;
            return e = this.didScroll && this.firing === !0,
            e && (this.didScroll = !1),
                e
        },
        t.prototype.ceaseFireWhenNecessary = function () {
            return this.options.ceaseFireOnEmpty === !0 && this.lastContent === "" || this.options.ceaseFire.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection]) ? (this.firing = !1, !0) : !1
        },
        t.prototype.wrapContainer = function (e) {
            if (this.innerWrap.length === 0) return this.innerWrap = $(e).wrapInner('<div class="endless_scroll_content" data-page="0" />').wrapInner('<div class="endless_scroll_inner_wrap" />').find(".endless_scroll_inner_wrap")
        },
        t.prototype.scrollableAreaMargin = function (e, t) {
            var n;
            switch (this.scrollDirection) {
                case "next":
                    n = e.height() - $(t).height() <= $(t).scrollTop() + this.options.inflowPixels,
                        n;
                    break;
                case "prev":
                    n = $(t).scrollTop() <= this.options.inflowPixels,
                        n
            }
            return n
        },
        t.prototype.calculateScrollableCanvas = function () {
            return this.target[0] === document || this.target[0] === window ? (this.wrapContainer("body"), this.isScrollable = this.scrollableAreaMargin($(document), $(window))) : (this.wrapContainer(this.target), this.isScrollable = this.innerWrap.length > 0 && this.scrollableAreaMargin(this.innerWrap, this.target))
        },
        t.prototype.shouldBeFiring = function () {
            return this.calculateScrollableCanvas(),
            this.isScrollable && (this.options.fireOnce === !1 || this.options.fireOnce === !0 && this.fired !== !0)
        },
        t.prototype.resetFireSequenceWhenNecessary = function () {
            if (this.options.resetCounter.apply(this.target) === !0) return this.fireSequence = 0
        },
        t.prototype.acknowledgeFiring = function () {
            this.fired = !0,
                this.fireSequence++;
            switch (this.scrollDirection) {
                case "next":
                    return this.pageSequence = this.nextSequence++;
                case "prev":
                    return this.pageSequence = this.prevSequence--
            }
        },
        t.prototype.insertContent = function (e) {
            switch (this.scrollDirection) {
                case "next":
                    return $(this.options.insertAfter).after(e);
                case "prev":
                    return $(this.options.insertBefore).before(e)
            }
        },
        t.prototype.insertLoader = function () {
            return this.insertContent('<div class="endless_scroll_loader_' + this.targetId + '      endless_scroll_loader">' + this.options.loader + "</div>")
        },
        t.prototype.removeLoader = function () {
            return $(".endless_scroll_loader_" + this.targetId).fadeOut(function () {
                return $(this).remove()
            })
        },
        t.prototype.hasContent = function () {
            return typeof this.options.content == "function" ? this.content = this.options.content.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection]) : this.content = this.options.content,
            this.content !== !1
        },
        t.prototype.showContent = function () {
            return $("#endless_scroll_content_current").removeAttr("id"),
                this.insertContent('<div id="endless_scroll_content_current"      class="endless_scroll_content" data-page="' + this.pageSequence + '">' + this.content + "</div>")
        },
        t.prototype.fireCallback = function () {
            return this.options.callback.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection])
        },
        t.prototype.cleanUpPagesWhenNecessary = function () {
            var e;
            if (this.options.pagesToKeep >= 1) {
                switch (this.scrollDirection) {
                    case "next":
                        this.pagesStack.push(this.pageSequence);
                        break;
                    case "prev":
                        this.pagesStack.unshift(this.pageSequence)
                }
                if (this.pagesStack.length > this.options.pagesToKeep) switch (this.scrollDirection) {
                    case "next":
                        e = this.prevSequence = this.pagesStack.shift();
                        break;
                    case "prev":
                        e = this.nextSequence = this.pagesStack.pop()
                }
                return this.removePage(e),
                    this.calculateScrollableCanvas()
            }
            return
        },
        t.prototype.removePage = function (e) {
            return $(".endless_scroll_content[data-page='" + e + "']", this.target).remove()
        },
        t.prototype.delayFiringWhenNecessary = function () {
            var e = this;
            return this.options.fireDelay > 0 ? ($("body").after('<div id="endless_scroll_marker"></div>'), $("#endless_scroll_marker").fadeTo(this.options.fireDelay, 1, function () {
                    return $("#endless_scroll_marker").remove(),
                        e.fired = !1
                })) : this.fired = !1
        },
        t
}(),


    function (e) {
        return e.fn.endlessScroll = function (e) {
            return (new EndlessScroll(this, e)).run()
        }
    }(jQuery);