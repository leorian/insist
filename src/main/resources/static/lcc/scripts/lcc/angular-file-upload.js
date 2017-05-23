(function (e, t) {
    if (typeof define != "function" || !define.amd) return t(e);
    define("angular-file-upload", ["angular"], function (e) {
        return t(e)
    })
})(typeof angular == "undefined" ? null : angular, function (e) {
    var t = e.module("angularFileUpload", []);
    return t.value("fileUploaderOptions", {
        url: "/",
        alias: "file",
        headers: {},
        queue: [],
        progress: 0,
        autoUpload: !1,
        removeAfterUpload: !1,
        method: "POST",
        filters: [],
        formData: [],
        queueLimit: Number.MAX_VALUE,
        withCredentials: !1
    }).factory("FileUploader", ["fileUploaderOptions", "$rootScope", "$http", "$window", "$compile", function (t, n, r, i, s) {
        function o(n) {
            var r = e.copy(t);
            e.extend(this, r, n, {
                isUploading: !1,
                _nextIndex: 0,
                _failFilterIndex: -1,
                _directives: {
                    select: [],
                    drop: [],
                    over: []
                }
            }),
                this.filters.unshift({
                    name: "queueLimit",
                    fn: this._queueLimitFilter
                }),
                this.filters.unshift({
                    name: "folder",
                    fn: this._folderFilter
                })
        }

        function u(t) {
            var n = e.isElement(t),
                r = n ? t.value : t,
                i = e.isString(r) ? "FakePath" : "Object",
                s = "_createFrom" + i;
            this[s](r)
        }

        function a(t, n, r) {
            var i = e.isElement(n),
                s = i ? e.element(n) : null,
                u = i ? null : n;
            e.extend(this, {
                url: t.url,
                alias: t.alias,
                headers: e.copy(t.headers),
                formData: e.copy(t.formData),
                removeAfterUpload: t.removeAfterUpload,
                withCredentials: t.withCredentials,
                method: t.method
            }, r, {
                uploader: t,
                file: new o.FileLikeObject(n),
                isReady: !1,
                isUploading: !1,
                isUploaded: !1,
                isSuccess: !1,
                isCancel: !1,
                isError: !1,
                progress: 0,
                index: null,
                _file: u,
                _input: s
            }),
            s && this._replaceNode(s)
        }

        function f(t) {
            e.extend(this, t),
                this.uploader._directives[this.prop].push(this),
                this._saveLinks(),
                this.bind()
        }

        function l(e) {
            l.super_.apply(this, arguments),
            this.uploader.isHTML5 || this.element.removeAttr("multiple"),
                this.element.prop("value", null)
        }

        function c(e) {
            c.super_.apply(this, arguments)
        }

        function h(e) {
            h.super_.apply(this, arguments)
        }

        return o.prototype.isHTML5 = !!i.File && !!i.FormData,
            o.prototype.addToQueue = function (t, n, r) {
                var i = this.isArrayLikeObject(t) ? t : [t],
                    s = this._getFilters(r),
                    u = this.queue.length,
                    a = [];
                e.forEach(i, function (e) {
                    var t = new o.FileLikeObject(e);
                    if (this._isValidFile(t, s, n)) {
                        var r = new o.FileItem(this, e, n);
                        a.push(r),
                            this.queue.push(r),
                            this._onAfterAddingFile(r)
                    } else {
                        var i = this.filters[this._failFilterIndex];
                        this._onWhenAddingFileFailed(t, i, n)
                    }
                }, this),
                this.queue.length !== u && (this._onAfterAddingAll(a), this.progress = this._getTotalProgress()),
                    this._render(),
                this.autoUpload && this.uploadAll()
            },
            o.prototype.removeFromQueue = function (e) {
                var t = this.getIndexOfItem(e),
                    n = this.queue[t];
                n.isUploading && n.cancel(),
                    this.queue.splice(t, 1),
                    n._destroy(),
                    this.progress = this._getTotalProgress()
            },
            o.prototype.clearQueue = function () {
                while (this.queue.length) this.queue[0].remove();
                this.progress = 0
            },
            o.prototype.uploadItem = function (e) {
                var t = this.getIndexOfItem(e),
                    n = this.queue[t],
                    r = this.isHTML5 ? "_xhrTransport" : "_iframeTransport";
                n._prepareToUploading();
                if (this.isUploading) return;
                this.isUploading = !0,
                    this[r](n)
            },
            o.prototype.cancelItem = function (e) {
                var t = this.getIndexOfItem(e),
                    n = this.queue[t],
                    r = this.isHTML5 ? "_xhr" : "_form";
                n && n.isUploading && n[r].abort()
            },
            o.prototype.uploadAll = function () {
                var t = this.getNotUploadedItems().filter(function (e) {
                    return !e.isUploading
                });
                if (!t.length) return;
                e.forEach(t, function (e) {
                    e._prepareToUploading()
                }),
                    t[0].upload()
            },
            o.prototype.cancelAll = function () {
                var t = this.getNotUploadedItems();
                e.forEach(t, function (e) {
                    e.cancel()
                })
            },
            o.prototype.isFile = function (e) {
                var t = i.File;
                return t && e instanceof t
            },
            o.prototype.isFileLikeObject = function (e) {
                return e instanceof o.FileLikeObject
            },
            o.prototype.isArrayLikeObject = function (t) {
                return e.isObject(t) && "length" in t
            },
            o.prototype.getIndexOfItem = function (t) {
                return e.isNumber(t) ? t : this.queue.indexOf(t)
            },
            o.prototype.getNotUploadedItems = function () {
                return this.queue.filter(function (e) {
                    return !e.isUploaded
                })
            },
            o.prototype.getReadyItems = function () {
                return this.queue.filter(function (e) {
                    return e.isReady && !e.isUploading
                }).sort(function (e, t) {
                    return e.index - t.index
                })
            },
            o.prototype.destroy = function () {
                e.forEach(this._directives, function (t) {
                    e.forEach(this._directives[t], function (e) {
                        e.destroy()
                    }, this)
                }, this)
            },
            o.prototype.onAfterAddingAll = function (e) {
            },
            o.prototype.onAfterAddingFile = function (e) {
            },
            o.prototype.onWhenAddingFileFailed = function (e, t, n) {
            },
            o.prototype.onBeforeUploadItem = function (e) {
            },
            o.prototype.onProgressItem = function (e, t) {
            },
            o.prototype.onProgressAll = function (e) {
            },
            o.prototype.onSuccessItem = function (e, t, n, r) {
            },
            o.prototype.onErrorItem = function (e, t, n, r) {
            },
            o.prototype.onCancelItem = function (e, t, n, r) {
            },
            o.prototype.onCompleteItem = function (e, t, n, r) {
            },
            o.prototype.onCompleteAll = function () {
            },
            o.prototype._getTotalProgress = function (e) {
                if (this.removeAfterUpload) return e || 0;
                var t = this.getNotUploadedItems().length,
                    n = t ? this.queue.length - t : this.queue.length,
                    r = 100 / this.queue.length,
                    i = (e || 0) * r / 100;
                return Math.round(n * r + i)
            },
            o.prototype._getFilters = function (t) {
                if (e.isUndefined(t)) return this.filters;
                if (e.isArray(t)) return t;
                var n = t.match(/[^\s,]+/g);
                return this.filters.filter(function (e) {
                    return n.indexOf(e.name) !== -1
                }, this)
            },
            o.prototype._render = function () {
                n.$$phase || n.$apply()
            },
            o.prototype._folderFilter = function (e) {
                return !!e.size || !!e.type
            },
            o.prototype._queueLimitFilter = function () {
                return this.queue.length < this.queueLimit
            },
            o.prototype._isValidFile = function (e, t, n) {
                return this._failFilterIndex = -1,
                    t.length ? t.every(function (t) {
                            return this._failFilterIndex++,
                                t.fn.call(this, e, n)
                        }, this) : !0
            },
            o.prototype._isSuccessCode = function (e) {
                return e >= 200 && e < 300 || e === 304
            },
            o.prototype._transformResponse = function (t, n) {
                var i = this._headersGetter(n);
                return e.forEach(r.defaults.transformResponse, function (e) {
                    t = e(t, i)
                }),
                    t
            },
            o.prototype._parseHeaders = function (t) {
                var n = {},
                    r, i, s;
                return t ? (e.forEach(t.split("\n"), function (e) {
                        s = e.indexOf(":"),
                            r = e.slice(0, s).trim().toLowerCase(),
                            i = e.slice(s + 1).trim(),
                        r && (n[r] = n[r] ? n[r] + ", " + i : i)
                    }), n) : n
            },
            o.prototype._headersGetter = function (e) {
                return function (t) {
                    return t ? e[t.toLowerCase()] || null : e
                }
            },
            o.prototype._xhrTransport = function (t) {
                var n = t._xhr = new XMLHttpRequest,
                    r = new FormData,
                    i = this;
                i._onBeforeUploadItem(t),
                    e.forEach(t.formData, function (t) {
                        e.forEach(t, function (e, t) {
                            r.append(t, e)
                        })
                    }),
                    r.append(t.alias, t._file, t.file.name),
                    n.upload.onprogress = function (e) {
                        var n = Math.round(e.lengthComputable ? e.loaded * 100 / e.total : 0);
                        i._onProgressItem(t, n)
                    },
                    n.onload = function () {
                        var e = i._parseHeaders(n.getAllResponseHeaders()),
                            r = i._transformResponse(n.response, e),
                            s = i._isSuccessCode(n.status) ? "Success" : "Error",
                            o = "_on" + s + "Item";
                        i[o](t, r, n.status, e),
                            i._onCompleteItem(t, r, n.status, e)
                    },
                    n.onerror = function () {
                        var e = i._parseHeaders(n.getAllResponseHeaders()),
                            r = i._transformResponse(n.response, e);
                        i._onErrorItem(t, r, n.status, e),
                            i._onCompleteItem(t, r, n.status, e)
                    },
                    n.onabort = function () {
                        var e = i._parseHeaders(n.getAllResponseHeaders()),
                            r = i._transformResponse(n.response, e);
                        i._onCancelItem(t, r, n.status, e),
                            i._onCompleteItem(t, r, n.status, e)
                    },
                    n.open(t.method, t.url, !0),
                    n.withCredentials = t.withCredentials,
                    e.forEach(t.headers, function (e, t) {
                        n.setRequestHeader(t, e)
                    }),
                    n.send(r),
                    this._render()
            },
            o.prototype._iframeTransport = function (t) {
                var n = e.element('<form style="display: none;" />'),
                    r = e.element('<iframe name="iframeTransport' + Date.now() + '">'),
                    i = t._input,
                    s = this;
                t._form && t._form.replaceWith(i),
                    t._form = n,
                    s._onBeforeUploadItem(t),
                    i.prop("name", t.alias),
                    e.forEach(t.formData, function (t) {
                        e.forEach(t, function (t, r) {
                            var i = e.element('<input type="hidden" name="' + r + '" />');
                            i.val(t),
                                n.append(i)
                        })
                    }),
                    n.prop({
                        action: t.url,
                        method: "POST",
                        target: r.prop("name"),
                        enctype: "multipart/form-data",
                        encoding: "multipart/form-data"
                    }),
                    r.bind("load", function () {
                        try {
                            var e = r[0].contentDocument.body.innerHTML
                        } catch (n) {
                        }
                        var i = {
                                response: e,
                                status: 200,
                                dummy: !0
                            },
                            o = {},
                            u = s._transformResponse(i.response, o);
                        s._onSuccessItem(t, u, i.status, o),
                            s._onCompleteItem(t, u, i.status, o)
                    }),
                    n.abort = function () {
                        var e = {
                                status: 0,
                                dummy: !0
                            },
                            o = {},
                            u;
                        r.unbind("load").prop("src", "javascript:false;"),
                            n.replaceWith(i),
                            s._onCancelItem(t, u, e.status, o),
                            s._onCompleteItem(t, u, e.status, o)
                    },
                    i.after(n),
                    n.append(i).append(r),
                    n[0].submit(),
                    this._render()
            },
            o.prototype._onWhenAddingFileFailed = function (e, t, n) {
                this.onWhenAddingFileFailed(e, t, n)
            },
            o.prototype._onAfterAddingFile = function (e) {
                this.onAfterAddingFile(e)
            },
            o.prototype._onAfterAddingAll = function (e) {
                this.onAfterAddingAll(e)
            },
            o.prototype._onBeforeUploadItem = function (e) {
                e._onBeforeUpload(),
                    this.onBeforeUploadItem(e)
            },
            o.prototype._onProgressItem = function (e, t) {
                var n = this._getTotalProgress(t);
                this.progress = n,
                    e._onProgress(t),
                    this.onProgressItem(e, t),
                    this.onProgressAll(n),
                    this._render()
            },
            o.prototype._onSuccessItem = function (e, t, n, r) {
                e._onSuccess(t, n, r),
                    this.onSuccessItem(e, t, n, r)
            },
            o.prototype._onErrorItem = function (e, t, n, r) {
                e._onError(t, n, r),
                    this.onErrorItem(e, t, n, r)
            },
            o.prototype._onCancelItem = function (e, t, n, r) {
                e._onCancel(t, n, r),
                    this.onCancelItem(e, t, n, r)
            },
            o.prototype._onCompleteItem = function (t, n, r, i) {
                t._onComplete(n, r, i),
                    this.onCompleteItem(t, n, r, i);
                var s = this.getReadyItems()[0];
                this.isUploading = !1;
                if (e.isDefined(s)) {
                    s.upload();
                    return
                }
                this.onCompleteAll(),
                    this.progress = this._getTotalProgress(),
                    this._render()
            },
            o.isFile = o.prototype.isFile,
            o.isFileLikeObject = o.prototype.isFileLikeObject,
            o.isArrayLikeObject = o.prototype.isArrayLikeObject,
            o.isHTML5 = o.prototype.isHTML5,
            o.inherit = function (e, t) {
                e.prototype = Object.create(t.prototype),
                    e.prototype.constructor = e,
                    e.super_ = t
            },
            o.FileLikeObject = u,
            o.FileItem = a,
            o.FileDirective = f,
            o.FileSelect = l,
            o.FileDrop = c,
            o.FileOver = h,
            u.prototype._createFromFakePath = function (e) {
                this.lastModifiedDate = null,
                    this.size = null,
                    this.type = "like/" + e.slice(e.lastIndexOf(".") + 1).toLowerCase(),
                    this.name = e.slice(e.lastIndexOf("/") + e.lastIndexOf("\\") + 2)
            },
            u.prototype._createFromObject = function (t) {
                this.lastModifiedDate = e.copy(t.lastModifiedDate),
                    this.size = t.size,
                    this.type = t.type,
                    this.name = t.name
            },
            a.prototype.upload = function () {
                this.uploader.uploadItem(this)
            },
            a.prototype.cancel = function () {
                this.uploader.cancelItem(this)
            },
            a.prototype.remove = function () {
                this.uploader.removeFromQueue(this)
            },
            a.prototype.onBeforeUpload = function () {
            },
            a.prototype.onProgress = function (e) {
            },
            a.prototype.onSuccess = function (e, t, n) {
            },
            a.prototype.onError = function (e, t, n) {
            },
            a.prototype.onCancel = function (e, t, n) {
            },
            a.prototype.onComplete = function (e, t, n) {
            },
            a.prototype._onBeforeUpload = function () {
                this.isReady = !0,
                    this.isUploading = !0,
                    this.isUploaded = !1,
                    this.isSuccess = !1,
                    this.isCancel = !1,
                    this.isError = !1,
                    this.progress = 0,
                    this.onBeforeUpload()
            },
            a.prototype._onProgress = function (e) {
                this.progress = e,
                    this.onProgress(e)
            },
            a.prototype._onSuccess = function (e, t, n) {
                this.isReady = !1,
                    this.isUploading = !1,
                    this.isUploaded = !0,
                    this.isSuccess = !0,
                    this.isCancel = !1,
                    this.isError = !1,
                    this.progress = 100,
                    this.index = null,
                    this.onSuccess(e, t, n)
            },
            a.prototype._onError = function (e, t, n) {
                this.isReady = !1,
                    this.isUploading = !1,
                    this.isUploaded = !0,
                    this.isSuccess = !1,
                    this.isCancel = !1,
                    this.isError = !0,
                    this.progress = 0,
                    this.index = null,
                    this.onError(e, t, n)
            },
            a.prototype._onCancel = function (e, t, n) {
                this.isReady = !1,
                    this.isUploading = !1,
                    this.isUploaded = !1,
                    this.isSuccess = !1,
                    this.isCancel = !0,
                    this.isError = !1,
                    this.progress = 0,
                    this.index = null,
                    this.onCancel(e, t, n)
            },
            a.prototype._onComplete = function (e, t, n) {
                this.onComplete(e, t, n),
                this.removeAfterUpload && this.remove()
            },
            a.prototype._destroy = function () {
                this._input && this._input.remove(),
                this._form && this._form.remove(),
                    delete this._form,
                    delete this._input
            },
            a.prototype._prepareToUploading = function () {
                this.index = this.index || ++this.uploader._nextIndex,
                    this.isReady = !0
            },
            a.prototype._replaceNode = function (e) {
                var t = s(e.clone())(e.scope());
                t.prop("value", null),
                    e.css("display", "none"),
                    e.after(t)
            },
            f.prototype.events = {},
            f.prototype.bind = function () {
                for (var e in this.events) {
                    var t = this.events[e];
                    this.element.bind(e, this[t])
                }
            },
            f.prototype.unbind = function () {
                for (var e in this.events) this.element.unbind(e, this.events[e])
            },
            f.prototype.destroy = function () {
                var e = this.uploader._directives[this.prop].indexOf(this);
                this.uploader._directives[this.prop].splice(e, 1),
                    this.unbind()
            },
            f.prototype._saveLinks = function () {
                for (var e in this.events) {
                    var t = this.events[e];
                    this[t] = this[t].bind(this)
                }
            },
            o.inherit(l, f),
            l.prototype.events = {
                $destroy: "destroy",
                change: "onChange"
            },
            l.prototype.prop = "select",
            l.prototype.getOptions = function () {
            },
            l.prototype.getFilters = function () {
            },
            l.prototype.isEmptyAfterSelection = function () {
                return !!this.element.attr("multiple")
            },
            l.prototype.onChange = function () {
                var e = this.uploader.isHTML5 ? this.element[0].files : this.element[0],
                    t = this.getOptions(),
                    n = this.getFilters();
                this.uploader.isHTML5 || this.destroy(),
                    this.uploader.addToQueue(e, t, n),
                this.isEmptyAfterSelection() && this.element.prop("value", null)
            },
            o.inherit(c, f),
            c.prototype.events = {
                $destroy: "destroy",
                drop: "onDrop",
                dragover: "onDragOver",
                dragleave: "onDragLeave"
            },
            c.prototype.prop = "drop",
            c.prototype.getOptions = function () {
            },
            c.prototype.getFilters = function () {
            },
            c.prototype.onDrop = function (t) {
                var n = this._getTransfer(t);
                if (!n) return;
                var r = this.getOptions(),
                    i = this.getFilters();
                this._preventAndStop(t),
                    e.forEach(this.uploader._directives.over, this._removeOverClass, this),
                    this.uploader.addToQueue(n.files, r, i)
            },
            c.prototype.onDragOver = function (t) {
                var n = this._getTransfer(t);
                if (!this._haveFiles(n.types)) return;
                n.dropEffect = "copy",
                    this._preventAndStop(t),
                    e.forEach(this.uploader._directives.over, this._addOverClass, this)
            },
            c.prototype.onDragLeave = function (t) {
                if (t.currentTarget !== this.element[0]) return;
                this._preventAndStop(t),
                    e.forEach(this.uploader._directives.over, this._removeOverClass, this)
            },
            c.prototype._getTransfer = function (e) {
                return e.dataTransfer ? e.dataTransfer : e.originalEvent.dataTransfer
            },
            c.prototype._preventAndStop = function (e) {
                e.preventDefault(),
                    e.stopPropagation()
            },
            c.prototype._haveFiles = function (e) {
                return e ? e.indexOf ? e.indexOf("Files") !== -1 : e.contains ? e.contains("Files") : !1 : !1
            },
            c.prototype._addOverClass = function (e) {
                e.addOverClass()
            },
            c.prototype._removeOverClass = function (e) {
                e.removeOverClass()
            },
            o.inherit(h, f),
            h.prototype.events = {
                $destroy: "destroy"
            },
            h.prototype.prop = "over",
            h.prototype.overClass = "nv-file-over",
            h.prototype.addOverClass = function () {
                this.element.addClass(this.getOverClass())
            },
            h.prototype.removeOverClass = function () {
                this.element.removeClass(this.getOverClass())
            },
            h.prototype.getOverClass = function () {
                return this.overClass
            },
            o
    }]).directive("nvFileSelect", ["$parse", "FileUploader", function (e, t) {
        return {
            link: function (n, r, i) {
                var s = n.$eval(i.uploader);
                if (!(s instanceof t)) throw new TypeError('"Uploader" must be an instance of FileUploader');
                var o = new t.FileSelect({
                    uploader: s,
                    element: r
                });
                o.getOptions = e(i.options).bind(o, n),
                    o.getFilters = function () {
                        return i.filters
                    }
            }
        }
    }]).directive("nvFileDrop", ["$parse", "FileUploader", function (e, t) {
        return {
            link: function (n, r, i) {
                var s = n.$eval(i.uploader);
                if (!(s instanceof t)) throw new TypeError('"Uploader" must be an instance of FileUploader');
                if (!s.isHTML5) return;
                var o = new t.FileDrop({
                    uploader: s,
                    element: r
                });
                o.getOptions = e(i.options).bind(o, n),
                    o.getFilters = function () {
                        return i.filters
                    }
            }
        }
    }]).directive("nvFileOver", ["FileUploader", function (e) {
        return {
            link: function (t, n, r) {
                var i = t.$eval(r.uploader);
                if (!(i instanceof e)) throw new TypeError('"Uploader" must be an instance of FileUploader');
                var s = new e.FileOver({
                    uploader: i,
                    element: n
                });
                s.getOverClass = function () {
                    return r.overClass || this.overClass
                }
            }
        }
    }]),
        t
});