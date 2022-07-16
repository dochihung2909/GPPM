/*! jQuery UI - v1.12.1 - 2021-08-26
 * http://jqueryui.com
 * Includes: widget.js, position.js, keycode.js, unique-id.js, widgets/autocomplete.js, widgets/menu.js, widgets/mouse.js, widgets/slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

!(function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
  })(function (x) {
    x.ui = x.ui || {};
    x.ui.version = "1.12.1";
    var n,
      i = 0,
      l = Array.prototype.slice;
    (x.cleanData =
      ((n = x.cleanData),
      function (e) {
        for (var t, i, s = 0; null != (i = e[s]); s++)
          try {
            (t = x._data(i, "events")) &&
              t.remove &&
              x(i).triggerHandler("remove");
          } catch (e) {}
        n(e);
      })),
      (x.widget = function (e, i, t) {
        var s,
          n,
          o,
          a = {},
          l = e.split(".")[0],
          h = l + "-" + (e = e.split(".")[1]);
        return (
          t || ((t = i), (i = x.Widget)),
          x.isArray(t) && (t = x.extend.apply(null, [{}].concat(t))),
          (x.expr[":"][h.toLowerCase()] = function (e) {
            return !!x.data(e, h);
          }),
          (x[l] = x[l] || {}),
          (s = x[l][e]),
          (n = x[l][e] = function (e, t) {
            if (!this._createWidget) return new n(e, t);
            arguments.length && this._createWidget(e, t);
          }),
          x.extend(n, s, {
            version: t.version,
            _proto: x.extend({}, t),
            _childConstructors: []
          }),
          ((o = new i()).options = x.widget.extend({}, o.options)),
          x.each(t, function (t, s) {
            function n() {
              return i.prototype[t].apply(this, arguments);
            }
            function o(e) {
              return i.prototype[t].apply(this, e);
            }
            x.isFunction(s)
              ? (a[t] = function () {
                  var e,
                    t = this._super,
                    i = this._superApply;
                  return (
                    (this._super = n),
                    (this._superApply = o),
                    (e = s.apply(this, arguments)),
                    (this._super = t),
                    (this._superApply = i),
                    e
                  );
                })
              : (a[t] = s);
          }),
          (n.prototype = x.widget.extend(
            o,
            { widgetEventPrefix: (s && o.widgetEventPrefix) || e },
            a,
            { constructor: n, namespace: l, widgetName: e, widgetFullName: h }
          )),
          s
            ? (x.each(s._childConstructors, function (e, t) {
                var i = t.prototype;
                x.widget(i.namespace + "." + i.widgetName, n, t._proto);
              }),
              delete s._childConstructors)
            : i._childConstructors.push(n),
          x.widget.bridge(e, n),
          n
        );
      }),
      (x.widget.extend = function (e) {
        for (var t, i, s = l.call(arguments, 1), n = 0, o = s.length; n < o; n++)
          for (t in s[n])
            (i = s[n][t]),
              s[n].hasOwnProperty(t) &&
                void 0 !== i &&
                (x.isPlainObject(i)
                  ? (e[t] = x.isPlainObject(e[t])
                      ? x.widget.extend({}, e[t], i)
                      : x.widget.extend({}, i))
                  : (e[t] = i));
        return e;
      }),
      (x.widget.bridge = function (o, t) {
        var a = t.prototype.widgetFullName || o;
        x.fn[o] = function (i) {
          var e = "string" == typeof i,
            s = l.call(arguments, 1),
            n = this;
          return (
            e
              ? this.length || "instance" !== i
                ? this.each(function () {
                    var e,
                      t = x.data(this, a);
                    return "instance" === i
                      ? ((n = t), !1)
                      : t
                      ? x.isFunction(t[i]) && "_" !== i.charAt(0)
                        ? (e = t[i].apply(t, s)) !== t && void 0 !== e
                          ? ((n = e && e.jquery ? n.pushStack(e.get()) : e), !1)
                          : void 0
                        : x.error(
                            "no such method '" +
                              i +
                              "' for " +
                              o +
                              " widget instance"
                          )
                      : x.error(
                          "cannot call methods on " +
                            o +
                            " prior to initialization; attempted to call method '" +
                            i +
                            "'"
                        );
                  })
                : (n = void 0)
              : (s.length && (i = x.widget.extend.apply(null, [i].concat(s))),
                this.each(function () {
                  var e = x.data(this, a);
                  e
                    ? (e.option(i || {}), e._init && e._init())
                    : x.data(this, a, new t(i, this));
                })),
            n
          );
        };
      }),
      (x.Widget = function () {}),
      (x.Widget._childConstructors = []),
      (x.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function (e, t) {
          (t = x(t || this.defaultElement || this)[0]),
            (this.element = x(t)),
            (this.uuid = i++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = x()),
            (this.hoverable = x()),
            (this.focusable = x()),
            (this.classesElementLookup = {}),
            t !== this &&
              (x.data(t, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (e) {
                  e.target === t && this.destroy();
                }
              }),
              (this.document = x(t.style ? t.ownerDocument : t.document || t)),
              (this.window = x(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = x.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              e
            )),
            this._create(),
            this.options.disabled &&
              this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: function () {
          return {};
        },
        _getCreateEventData: x.noop,
        _create: x.noop,
        _init: x.noop,
        destroy: function () {
          var i = this;
          this._destroy(),
            x.each(this.classesElementLookup, function (e, t) {
              i._removeClass(t, e);
            }),
            this.element.off(this.eventNamespace).removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace);
        },
        _destroy: x.noop,
        widget: function () {
          return this.element;
        },
        option: function (e, t) {
          var i,
            s,
            n,
            o = e;
          if (0 === arguments.length) return x.widget.extend({}, this.options);
          if ("string" == typeof e)
            if (((o = {}), (e = (i = e.split(".")).shift()), i.length)) {
              for (
                s = o[e] = x.widget.extend({}, this.options[e]), n = 0;
                n < i.length - 1;
                n++
              )
                (s[i[n]] = s[i[n]] || {}), (s = s[i[n]]);
              if (((e = i.pop()), 1 === arguments.length))
                return void 0 === s[e] ? null : s[e];
              s[e] = t;
            } else {
              if (1 === arguments.length)
                return void 0 === this.options[e] ? null : this.options[e];
              o[e] = t;
            }
          return this._setOptions(o), this;
        },
        _setOptions: function (e) {
          for (var t in e) this._setOption(t, e[t]);
          return this;
        },
        _setOption: function (e, t) {
          return (
            "classes" === e && this._setOptionClasses(t),
            (this.options[e] = t),
            "disabled" === e && this._setOptionDisabled(t),
            this
          );
        },
        _setOptionClasses: function (e) {
          var t, i, s;
          for (t in e)
            (s = this.classesElementLookup[t]),
              e[t] !== this.options.classes[t] &&
                s &&
                s.length &&
                ((i = x(s.get())),
                this._removeClass(s, t),
                i.addClass(
                  this._classes({ element: i, keys: t, classes: e, add: !0 })
                ));
        },
        _setOptionDisabled: function (e) {
          this._toggleClass(
            this.widget(),
            this.widgetFullName + "-disabled",
            null,
            !!e
          ),
            e &&
              (this._removeClass(this.hoverable, null, "ui-state-hover"),
              this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _classes: function (n) {
          var o = [],
            a = this;
          function e(e, t) {
            for (var i, s = 0; s < e.length; s++)
              (i = a.classesElementLookup[e[s]] || x()),
                (i = n.add
                  ? x(x.unique(i.get().concat(n.element.get())))
                  : x(i.not(n.element).get())),
                (a.classesElementLookup[e[s]] = i),
                o.push(e[s]),
                t && n.classes[e[s]] && o.push(n.classes[e[s]]);
          }
          return (
            (n = x.extend(
              { element: this.element, classes: this.options.classes || {} },
              n
            )),
            this._on(n.element, { remove: "_untrackClassesElement" }),
            n.keys && e(n.keys.match(/\S+/g) || [], !0),
            n.extra && e(n.extra.match(/\S+/g) || []),
            o.join(" ")
          );
        },
        _untrackClassesElement: function (i) {
          var s = this;
          x.each(s.classesElementLookup, function (e, t) {
            -1 !== x.inArray(i.target, t) &&
              (s.classesElementLookup[e] = x(t.not(i.target).get()));
          });
        },
        _removeClass: function (e, t, i) {
          return this._toggleClass(e, t, i, !1);
        },
        _addClass: function (e, t, i) {
          return this._toggleClass(e, t, i, !0);
        },
        _toggleClass: function (e, t, i, s) {
          var n = "string" == typeof e || null === e,
            i = {
              extra: n ? t : i,
              keys: n ? e : t,
              element: n ? this.element : e,
              add: (s = "boolean" == typeof s ? s : i)
            };
          return i.element.toggleClass(this._classes(i), s), this;
        },
        _on: function (n, o, e) {
          var a,
            l = this;
          "boolean" != typeof n && ((e = o), (o = n), (n = !1)),
            e
              ? ((o = a = x(o)), (this.bindings = this.bindings.add(o)))
              : ((e = o), (o = this.element), (a = this.widget())),
            x.each(e, function (e, t) {
              function i() {
                if (
                  n ||
                  (!0 !== l.options.disabled &&
                    !x(this).hasClass("ui-state-disabled"))
                )
                  return ("string" == typeof t ? l[t] : t).apply(l, arguments);
              }
              "string" != typeof t &&
                (i.guid = t.guid = t.guid || i.guid || x.guid++);
              var s = e.match(/^([\w:-]*)\s*(.*)$/),
                e = s[1] + l.eventNamespace,
                s = s[2];
              s ? a.on(e, s, i) : o.on(e, i);
            });
        },
        _off: function (e, t) {
          (t =
            (t || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            e.off(t).off(t),
            (this.bindings = x(this.bindings.not(e).get())),
            (this.focusable = x(this.focusable.not(e).get())),
            (this.hoverable = x(this.hoverable.not(e).get()));
        },
        _delay: function (e, t) {
          var i = this;
          return setTimeout(function () {
            return ("string" == typeof e ? i[e] : e).apply(i, arguments);
          }, t || 0);
        },
        _hoverable: function (e) {
          (this.hoverable = this.hoverable.add(e)),
            this._on(e, {
              mouseenter: function (e) {
                this._addClass(x(e.currentTarget), null, "ui-state-hover");
              },
              mouseleave: function (e) {
                this._removeClass(x(e.currentTarget), null, "ui-state-hover");
              }
            });
        },
        _focusable: function (e) {
          (this.focusable = this.focusable.add(e)),
            this._on(e, {
              focusin: function (e) {
                this._addClass(x(e.currentTarget), null, "ui-state-focus");
              },
              focusout: function (e) {
                this._removeClass(x(e.currentTarget), null, "ui-state-focus");
              }
            });
        },
        _trigger: function (e, t, i) {
          var s,
            n,
            o = this.options[e];
          if (
            ((i = i || {}),
            ((t = x.Event(t)).type = (e === this.widgetEventPrefix
              ? e
              : this.widgetEventPrefix + e
            ).toLowerCase()),
            (t.target = this.element[0]),
            (n = t.originalEvent))
          )
            for (s in n) s in t || (t[s] = n[s]);
          return (
            this.element.trigger(t, i),
            !(
              (x.isFunction(o) &&
                !1 === o.apply(this.element[0], [t].concat(i))) ||
              t.isDefaultPrevented()
            )
          );
        }
      }),
      x.each({ show: "fadeIn", hide: "fadeOut" }, function (o, a) {
        x.Widget.prototype["_" + o] = function (t, e, i) {
          var s = (e = "string" == typeof e ? { effect: e } : e)
              ? (!0 !== e && "number" != typeof e && e.effect) || a
              : o,
            n = !x.isEmptyObject(
              (e = "number" == typeof (e = e || {}) ? { duration: e } : e)
            );
          (e.complete = i),
            e.delay && t.delay(e.delay),
            n && x.effects && x.effects.effect[s]
              ? t[o](e)
              : s !== o && t[s]
              ? t[s](e.duration, e.easing, i)
              : t.queue(function (e) {
                  x(this)[o](), i && i.call(t[0]), e();
                });
        };
      });
    var s, C, k, o, a, h, u, r, M;
    x.widget;
    function E(e, t, i) {
      return [
        parseFloat(e[0]) * (r.test(e[0]) ? t / 100 : 1),
        parseFloat(e[1]) * (r.test(e[1]) ? i / 100 : 1)
      ];
    }
    function D(e, t) {
      return parseInt(x.css(e, t), 10) || 0;
    }
    (C = Math.max),
      (k = Math.abs),
      (o = /left|center|right/),
      (a = /top|center|bottom/),
      (h = /[\+\-]\d+(\.[\d]+)?%?/),
      (u = /^\w+/),
      (r = /%$/),
      (M = x.fn.position),
      (x.position = {
        scrollbarWidth: function () {
          if (void 0 !== s) return s;
          var e,
            t = x(
              "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
            ),
            i = t.children()[0];
          return (
            x("body").append(t),
            (e = i.offsetWidth),
            t.css("overflow", "scroll"),
            e === (i = i.offsetWidth) && (i = t[0].clientWidth),
            t.remove(),
            (s = e - i)
          );
        },
        getScrollInfo: function (e) {
          var t = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
            i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
            t =
              "scroll" === t ||
              ("auto" === t && e.width < e.element[0].scrollWidth);
          return {
            width:
              "scroll" === i ||
              ("auto" === i && e.height < e.element[0].scrollHeight)
                ? x.position.scrollbarWidth()
                : 0,
            height: t ? x.position.scrollbarWidth() : 0
          };
        },
        getWithinInfo: function (e) {
          var t = x(e || window),
            i = x.isWindow(t[0]),
            s = !!t[0] && 9 === t[0].nodeType;
          return {
            element: t,
            isWindow: i,
            isDocument: s,
            offset: !i && !s ? x(e).offset() : { left: 0, top: 0 },
            scrollLeft: t.scrollLeft(),
            scrollTop: t.scrollTop(),
            width: t.outerWidth(),
            height: t.outerHeight()
          };
        }
      }),
      (x.fn.position = function (c) {
        if (!c || !c.of) return M.apply(this, arguments);
        c = x.extend({}, c);
        var d,
          m,
          f,
          p,
          v,
          e,
          g = x(c.of),
          _ = x.position.getWithinInfo(c.within),
          y = x.position.getScrollInfo(_),
          w = (c.collision || "flip").split(" "),
          b = {},
          t =
            9 === (e = (t = g)[0]).nodeType
              ? {
                  width: t.width(),
                  height: t.height(),
                  offset: { top: 0, left: 0 }
                }
              : x.isWindow(e)
              ? {
                  width: t.width(),
                  height: t.height(),
                  offset: { top: t.scrollTop(), left: t.scrollLeft() }
                }
              : e.preventDefault
              ? { width: 0, height: 0, offset: { top: e.pageY, left: e.pageX } }
              : {
                  width: t.outerWidth(),
                  height: t.outerHeight(),
                  offset: t.offset()
                };
        return (
          g[0].preventDefault && (c.at = "left top"),
          (m = t.width),
          (f = t.height),
          (v = x.extend({}, (p = t.offset))),
          x.each(["my", "at"], function () {
            var e,
              t,
              i = (c[this] || "").split(" ");
            ((i =
              1 === i.length
                ? o.test(i[0])
                  ? i.concat(["center"])
                  : a.test(i[0])
                  ? ["center"].concat(i)
                  : ["center", "center"]
                : i)[0] = o.test(i[0]) ? i[0] : "center"),
              (i[1] = a.test(i[1]) ? i[1] : "center"),
              (e = h.exec(i[0])),
              (t = h.exec(i[1])),
              (b[this] = [e ? e[0] : 0, t ? t[0] : 0]),
              (c[this] = [u.exec(i[0])[0], u.exec(i[1])[0]]);
          }),
          1 === w.length && (w[1] = w[0]),
          "right" === c.at[0]
            ? (v.left += m)
            : "center" === c.at[0] && (v.left += m / 2),
          "bottom" === c.at[1]
            ? (v.top += f)
            : "center" === c.at[1] && (v.top += f / 2),
          (d = E(b.at, m, f)),
          (v.left += d[0]),
          (v.top += d[1]),
          this.each(function () {
            var i,
              e,
              a = x(this),
              l = a.outerWidth(),
              h = a.outerHeight(),
              t = D(this, "marginLeft"),
              s = D(this, "marginTop"),
              n = l + t + D(this, "marginRight") + y.width,
              o = h + s + D(this, "marginBottom") + y.height,
              u = x.extend({}, v),
              r = E(b.my, a.outerWidth(), a.outerHeight());
            "right" === c.my[0]
              ? (u.left -= l)
              : "center" === c.my[0] && (u.left -= l / 2),
              "bottom" === c.my[1]
                ? (u.top -= h)
                : "center" === c.my[1] && (u.top -= h / 2),
              (u.left += r[0]),
              (u.top += r[1]),
              (i = { marginLeft: t, marginTop: s }),
              x.each(["left", "top"], function (e, t) {
                x.ui.position[w[e]] &&
                  x.ui.position[w[e]][t](u, {
                    targetWidth: m,
                    targetHeight: f,
                    elemWidth: l,
                    elemHeight: h,
                    collisionPosition: i,
                    collisionWidth: n,
                    collisionHeight: o,
                    offset: [d[0] + r[0], d[1] + r[1]],
                    my: c.my,
                    at: c.at,
                    within: _,
                    elem: a
                  });
              }),
              c.using &&
                (e = function (e) {
                  var t = p.left - u.left,
                    i = t + m - l,
                    s = p.top - u.top,
                    n = s + f - h,
                    o = {
                      target: {
                        element: g,
                        left: p.left,
                        top: p.top,
                        width: m,
                        height: f
                      },
                      element: {
                        element: a,
                        left: u.left,
                        top: u.top,
                        width: l,
                        height: h
                      },
                      horizontal: i < 0 ? "left" : 0 < t ? "right" : "center",
                      vertical: n < 0 ? "top" : 0 < s ? "bottom" : "middle"
                    };
                  m < l && k(t + i) < m && (o.horizontal = "center"),
                    f < h && k(s + n) < f && (o.vertical = "middle"),
                    C(k(t), k(i)) > C(k(s), k(n))
                      ? (o.important = "horizontal")
                      : (o.important = "vertical"),
                    c.using.call(this, e, o);
                }),
              a.offset(x.extend(u, { using: e }));
          })
        );
      }),
      (x.ui.position = {
        fit: {
          left: function (e, t) {
            var i = t.within,
              s = i.isWindow ? i.scrollLeft : i.offset.left,
              n = i.width,
              o = e.left - t.collisionPosition.marginLeft,
              a = s - o,
              l = o + t.collisionWidth - n - s;
            t.collisionWidth > n
              ? 0 < a && l <= 0
                ? ((i = e.left + a + t.collisionWidth - n - s), (e.left += a - i))
                : (e.left =
                    !(0 < l && a <= 0) && l < a ? s + n - t.collisionWidth : s)
              : 0 < a
              ? (e.left += a)
              : 0 < l
              ? (e.left -= l)
              : (e.left = C(e.left - o, e.left));
          },
          top: function (e, t) {
            var i = t.within,
              s = i.isWindow ? i.scrollTop : i.offset.top,
              n = t.within.height,
              o = e.top - t.collisionPosition.marginTop,
              a = s - o,
              l = o + t.collisionHeight - n - s;
            t.collisionHeight > n
              ? 0 < a && l <= 0
                ? ((i = e.top + a + t.collisionHeight - n - s), (e.top += a - i))
                : (e.top =
                    !(0 < l && a <= 0) && l < a ? s + n - t.collisionHeight : s)
              : 0 < a
              ? (e.top += a)
              : 0 < l
              ? (e.top -= l)
              : (e.top = C(e.top - o, e.top));
          }
        },
        flip: {
          left: function (e, t) {
            var i = t.within,
              s = i.offset.left + i.scrollLeft,
              n = i.width,
              o = i.isWindow ? i.scrollLeft : i.offset.left,
              a = e.left - t.collisionPosition.marginLeft,
              l = a - o,
              h = a + t.collisionWidth - n - o,
              u =
                "left" === t.my[0]
                  ? -t.elemWidth
                  : "right" === t.my[0]
                  ? t.elemWidth
                  : 0,
              i =
                "left" === t.at[0]
                  ? t.targetWidth
                  : "right" === t.at[0]
                  ? -t.targetWidth
                  : 0,
              a = -2 * t.offset[0];
            l < 0
              ? ((s = e.left + u + i + a + t.collisionWidth - n - s) < 0 ||
                  s < k(l)) &&
                (e.left += u + i + a)
              : 0 < h &&
                (0 <
                  (o = e.left - t.collisionPosition.marginLeft + u + i + a - o) ||
                  k(o) < h) &&
                (e.left += u + i + a);
          },
          top: function (e, t) {
            var i = t.within,
              s = i.offset.top + i.scrollTop,
              n = i.height,
              o = i.isWindow ? i.scrollTop : i.offset.top,
              a = e.top - t.collisionPosition.marginTop,
              l = a - o,
              h = a + t.collisionHeight - n - o,
              u =
                "top" === t.my[1]
                  ? -t.elemHeight
                  : "bottom" === t.my[1]
                  ? t.elemHeight
                  : 0,
              i =
                "top" === t.at[1]
                  ? t.targetHeight
                  : "bottom" === t.at[1]
                  ? -t.targetHeight
                  : 0,
              a = -2 * t.offset[1];
            l < 0
              ? ((s = e.top + u + i + a + t.collisionHeight - n - s) < 0 ||
                  s < k(l)) &&
                (e.top += u + i + a)
              : 0 < h &&
                (0 <
                  (o = e.top - t.collisionPosition.marginTop + u + i + a - o) ||
                  k(o) < h) &&
                (e.top += u + i + a);
          }
        },
        flipfit: {
          left: function () {
            x.ui.position.flip.left.apply(this, arguments),
              x.ui.position.fit.left.apply(this, arguments);
          },
          top: function () {
            x.ui.position.flip.top.apply(this, arguments),
              x.ui.position.fit.top.apply(this, arguments);
          }
        }
      });
    var e;
    x.ui.position,
      (x.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      }),
      x.fn.extend({
        uniqueId:
          ((e = 0),
          function () {
            return this.each(function () {
              this.id || (this.id = "ui-id-" + ++e);
            });
          }),
        removeUniqueId: function () {
          return this.each(function () {
            /^ui-id-\d+$/.test(this.id) && x(this).removeAttr("id");
          });
        }
      }),
      (x.ui.safeActiveElement = function (t) {
        var i;
        try {
          i = t.activeElement;
        } catch (e) {
          i = t.body;
        }
        return (i = !(i = i || t.body).nodeName ? t.body : i);
      }),
      x.widget("ui.menu", {
        version: "1.12.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
          icons: { submenu: "ui-icon-caret-1-e" },
          items: "> *",
          menus: "ul",
          position: { my: "left top", at: "right top" },
          role: "menu",
          blur: null,
          focus: null,
          select: null
        },
        _create: function () {
          (this.activeMenu = this.element),
            (this.mouseHandled = !1),
            this.element
              .uniqueId()
              .attr({ role: this.options.role, tabIndex: 0 }),
            this._addClass("ui-menu", "ui-widget ui-widget-content"),
            this._on({
              "mousedown .ui-menu-item": function (e) {
                e.preventDefault();
              },
              "click .ui-menu-item": function (e) {
                var t = x(e.target),
                  i = x(x.ui.safeActiveElement(this.document[0]));
                !this.mouseHandled &&
                  t.not(".ui-state-disabled").length &&
                  (this.select(e),
                  e.isPropagationStopped() || (this.mouseHandled = !0),
                  t.has(".ui-menu").length
                    ? this.expand(e)
                    : !this.element.is(":focus") &&
                      i.closest(".ui-menu").length &&
                      (this.element.trigger("focus", [!0]),
                      this.active &&
                        1 === this.active.parents(".ui-menu").length &&
                        clearTimeout(this.timer)));
              },
              "mouseenter .ui-menu-item": function (e) {
                var t, i;
                this.previousFilter ||
                  ((t = x(e.target).closest(".ui-menu-item")),
                  (i = x(e.currentTarget)),
                  t[0] === i[0] &&
                    (this._removeClass(
                      i.siblings().children(".ui-state-active"),
                      null,
                      "ui-state-active"
                    ),
                    this.focus(e, i)));
              },
              mouseleave: "collapseAll",
              "mouseleave .ui-menu": "collapseAll",
              focus: function (e, t) {
                var i =
                  this.active || this.element.find(this.options.items).eq(0);
                t || this.focus(e, i);
              },
              blur: function (e) {
                this._delay(function () {
                  x.contains(
                    this.element[0],
                    x.ui.safeActiveElement(this.document[0])
                  ) || this.collapseAll(e);
                });
              },
              keydown: "_keydown"
            }),
            this.refresh(),
            this._on(this.document, {
              click: function (e) {
                this._closeOnDocumentClick(e) && this.collapseAll(e),
                  (this.mouseHandled = !1);
              }
            });
        },
        _destroy: function () {
          var e = this.element
            .find(".ui-menu-item")
            .removeAttr("role aria-disabled")
            .children(".ui-menu-item-wrapper")
            .removeUniqueId()
            .removeAttr("tabIndex role aria-haspopup");
          this.element
            .removeAttr("aria-activedescendant")
            .find(".ui-menu")
            .addBack()
            .removeAttr(
              "role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex"
            )
            .removeUniqueId()
            .show(),
            e.children().each(function () {
              var e = x(this);
              e.data("ui-menu-submenu-caret") && e.remove();
            });
        },
        _keydown: function (e) {
          var t,
            i,
            s,
            n = !0;
          switch (e.keyCode) {
            case x.ui.keyCode.PAGE_UP:
              this.previousPage(e);
              break;
            case x.ui.keyCode.PAGE_DOWN:
              this.nextPage(e);
              break;
            case x.ui.keyCode.HOME:
              this._move("first", "first", e);
              break;
            case x.ui.keyCode.END:
              this._move("last", "last", e);
              break;
            case x.ui.keyCode.UP:
              this.previous(e);
              break;
            case x.ui.keyCode.DOWN:
              this.next(e);
              break;
            case x.ui.keyCode.LEFT:
              this.collapse(e);
              break;
            case x.ui.keyCode.RIGHT:
              this.active &&
                !this.active.is(".ui-state-disabled") &&
                this.expand(e);
              break;
            case x.ui.keyCode.ENTER:
            case x.ui.keyCode.SPACE:
              this._activate(e);
              break;
            case x.ui.keyCode.ESCAPE:
              this.collapse(e);
              break;
            default:
              (t = this.previousFilter || ""),
                (s = n = !1),
                (i =
                  96 <= e.keyCode && e.keyCode <= 105
                    ? (e.keyCode - 96).toString()
                    : String.fromCharCode(e.keyCode)),
                clearTimeout(this.filterTimer),
                i === t ? (s = !0) : (i = t + i),
                (t = this._filterMenuItems(i)),
                (t =
                  s && -1 !== t.index(this.active.next())
                    ? this.active.nextAll(".ui-menu-item")
                    : t).length ||
                  ((i = String.fromCharCode(e.keyCode)),
                  (t = this._filterMenuItems(i))),
                t.length
                  ? (this.focus(e, t),
                    (this.previousFilter = i),
                    (this.filterTimer = this._delay(function () {
                      delete this.previousFilter;
                    }, 1e3)))
                  : delete this.previousFilter;
          }
          n && e.preventDefault();
        },
        _activate: function (e) {
          this.active &&
            !this.active.is(".ui-state-disabled") &&
            (this.active.children("[aria-haspopup='true']").length
              ? this.expand(e)
              : this.select(e));
        },
        refresh: function () {
          var e,
            t,
            s = this,
            n = this.options.icons.submenu,
            i = this.element.find(this.options.menus);
          this._toggleClass(
            "ui-menu-icons",
            null,
            !!this.element.find(".ui-icon").length
          ),
            (t = i
              .filter(":not(.ui-menu)")
              .hide()
              .attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
              })
              .each(function () {
                var e = x(this),
                  t = e.prev(),
                  i = x("<span>").data("ui-menu-submenu-caret", !0);
                s._addClass(i, "ui-menu-icon", "ui-icon " + n),
                  t.attr("aria-haspopup", "true").prepend(i),
                  e.attr("aria-labelledby", t.attr("id"));
              })),
            this._addClass(t, "ui-menu", "ui-widget ui-widget-content ui-front"),
            (e = i.add(this.element).find(this.options.items))
              .not(".ui-menu-item")
              .each(function () {
                var e = x(this);
                s._isDivider(e) &&
                  s._addClass(e, "ui-menu-divider", "ui-widget-content");
              }),
            (i = (t = e.not(".ui-menu-item, .ui-menu-divider"))
              .children()
              .not(".ui-menu")
              .uniqueId()
              .attr({ tabIndex: -1, role: this._itemRole() })),
            this._addClass(t, "ui-menu-item")._addClass(
              i,
              "ui-menu-item-wrapper"
            ),
            e.filter(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active &&
              !x.contains(this.element[0], this.active[0]) &&
              this.blur();
        },
        _itemRole: function () {
          return { menu: "menuitem", listbox: "option" }[this.options.role];
        },
        _setOption: function (e, t) {
          var i;
          "icons" === e &&
            ((i = this.element.find(".ui-menu-icon")),
            this._removeClass(i, null, this.options.icons.submenu)._addClass(
              i,
              null,
              t.submenu
            )),
            this._super(e, t);
        },
        _setOptionDisabled: function (e) {
          this._super(e),
            this.element.attr("aria-disabled", String(e)),
            this._toggleClass(null, "ui-state-disabled", !!e);
        },
        focus: function (e, t) {
          var i;
          this.blur(e, e && "focus" === e.type),
            this._scrollIntoView(t),
            (this.active = t.first()),
            (i = this.active.children(".ui-menu-item-wrapper")),
            this._addClass(i, null, "ui-state-active"),
            this.options.role &&
              this.element.attr("aria-activedescendant", i.attr("id")),
            (i = this.active
              .parent()
              .closest(".ui-menu-item")
              .children(".ui-menu-item-wrapper")),
            this._addClass(i, null, "ui-state-active"),
            e && "keydown" === e.type
              ? this._close()
              : (this.timer = this._delay(function () {
                  this._close();
                }, this.delay)),
            (i = t.children(".ui-menu")).length &&
              e &&
              /^mouse/.test(e.type) &&
              this._startOpening(i),
            (this.activeMenu = t.parent()),
            this._trigger("focus", e, { item: t });
        },
        _scrollIntoView: function (e) {
          var t, i, s;
          this._hasScroll() &&
            ((i = parseFloat(x.css(this.activeMenu[0], "borderTopWidth")) || 0),
            (s = parseFloat(x.css(this.activeMenu[0], "paddingTop")) || 0),
            (t = e.offset().top - this.activeMenu.offset().top - i - s),
            (i = this.activeMenu.scrollTop()),
            (s = this.activeMenu.height()),
            (e = e.outerHeight()),
            t < 0
              ? this.activeMenu.scrollTop(i + t)
              : s < t + e && this.activeMenu.scrollTop(i + t - s + e));
        },
        blur: function (e, t) {
          t || clearTimeout(this.timer),
            this.active &&
              (this._removeClass(
                this.active.children(".ui-menu-item-wrapper"),
                null,
                "ui-state-active"
              ),
              this._trigger("blur", e, { item: this.active }),
              (this.active = null));
        },
        _startOpening: function (e) {
          clearTimeout(this.timer),
            "true" === e.attr("aria-hidden") &&
              (this.timer = this._delay(function () {
                this._close(), this._open(e);
              }, this.delay));
        },
        _open: function (e) {
          var t = x.extend({ of: this.active }, this.options.position);
          clearTimeout(this.timer),
            this.element
              .find(".ui-menu")
              .not(e.parents(".ui-menu"))
              .hide()
              .attr("aria-hidden", "true"),
            e
              .show()
              .removeAttr("aria-hidden")
              .attr("aria-expanded", "true")
              .position(t);
        },
        collapseAll: function (t, i) {
          clearTimeout(this.timer),
            (this.timer = this._delay(function () {
              var e = i
                ? this.element
                : x(t && t.target).closest(this.element.find(".ui-menu"));
              e.length || (e = this.element),
                this._close(e),
                this.blur(t),
                this._removeClass(
                  e.find(".ui-state-active"),
                  null,
                  "ui-state-active"
                ),
                (this.activeMenu = e);
            }, this.delay));
        },
        _close: function (e) {
          (e = e || (this.active ? this.active.parent() : this.element))
            .find(".ui-menu")
            .hide()
            .attr("aria-hidden", "true")
            .attr("aria-expanded", "false");
        },
        _closeOnDocumentClick: function (e) {
          return !x(e.target).closest(".ui-menu").length;
        },
        _isDivider: function (e) {
          return !/[^\-\u2014\u2013\s]/.test(e.text());
        },
        collapse: function (e) {
          var t =
            this.active &&
            this.active.parent().closest(".ui-menu-item", this.element);
          t && t.length && (this._close(), this.focus(e, t));
        },
        expand: function (e) {
          var t =
            this.active &&
            this.active.children(".ui-menu ").find(this.options.items).first();
          t &&
            t.length &&
            (this._open(t.parent()),
            this._delay(function () {
              this.focus(e, t);
            }));
        },
        next: function (e) {
          this._move("next", "first", e);
        },
        previous: function (e) {
          this._move("prev", "last", e);
        },
        isFirstItem: function () {
          return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function () {
          return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function (e, t, i) {
          var s;
          ((s = this.active
            ? "first" === e || "last" === e
              ? this.active["first" === e ? "prevAll" : "nextAll"](
                  ".ui-menu-item"
                ).eq(-1)
              : this.active[e + "All"](".ui-menu-item").eq(0)
            : s) &&
            s.length &&
            this.active) ||
            (s = this.activeMenu.find(this.options.items)[t]()),
            this.focus(i, s);
        },
        nextPage: function (e) {
          var t, i, s;
          this.active
            ? this.isLastItem() ||
              (this._hasScroll()
                ? ((i = this.active.offset().top),
                  (s = this.element.height()),
                  this.active.nextAll(".ui-menu-item").each(function () {
                    return (t = x(this)).offset().top - i - s < 0;
                  }),
                  this.focus(e, t))
                : this.focus(
                    e,
                    this.activeMenu
                      .find(this.options.items)
                      [this.active ? "last" : "first"]()
                  ))
            : this.next(e);
        },
        previousPage: function (e) {
          var t, i, s;
          this.active
            ? this.isFirstItem() ||
              (this._hasScroll()
                ? ((i = this.active.offset().top),
                  (s = this.element.height()),
                  this.active.prevAll(".ui-menu-item").each(function () {
                    return 0 < (t = x(this)).offset().top - i + s;
                  }),
                  this.focus(e, t))
                : this.focus(e, this.activeMenu.find(this.options.items).first()))
            : this.next(e);
        },
        _hasScroll: function () {
          return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function (e) {
          this.active = this.active || x(e.target).closest(".ui-menu-item");
          var t = { item: this.active };
          this.active.has(".ui-menu").length || this.collapseAll(e, !0),
            this._trigger("select", e, t);
        },
        _filterMenuItems: function (e) {
          var e = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
            t = new RegExp("^" + e, "i");
          return this.activeMenu
            .find(this.options.items)
            .filter(".ui-menu-item")
            .filter(function () {
              return t.test(
                x.trim(x(this).children(".ui-menu-item-wrapper").text())
              );
            });
        }
      });
    x.widget("ui.autocomplete", {
      version: "1.12.1",
      defaultElement: "<input>",
      options: {
        appendTo: null,
        autoFocus: !1,
        delay: 300,
        minLength: 1,
        position: { my: "left top", at: "left bottom", collision: "none" },
        source: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        response: null,
        search: null,
        select: null
      },
      requestIndex: 0,
      pending: 0,
      _create: function () {
        var i,
          s,
          n,
          e = this.element[0].nodeName.toLowerCase(),
          t = "textarea" === e,
          e = "input" === e;
        (this.isMultiLine = t || (!e && this._isContentEditable(this.element))),
          (this.valueMethod = this.element[t || e ? "val" : "text"]),
          (this.isNewMenu = !0),
          this._addClass("ui-autocomplete-input"),
          this.element.attr("autocomplete", "off"),
          this._on(this.element, {
            keydown: function (e) {
              if (this.element.prop("readOnly")) s = n = i = !0;
              else {
                s = n = i = !1;
                var t = x.ui.keyCode;
                switch (e.keyCode) {
                  case t.PAGE_UP:
                    (i = !0), this._move("previousPage", e);
                    break;
                  case t.PAGE_DOWN:
                    (i = !0), this._move("nextPage", e);
                    break;
                  case t.UP:
                    (i = !0), this._keyEvent("previous", e);
                    break;
                  case t.DOWN:
                    (i = !0), this._keyEvent("next", e);
                    break;
                  case t.ENTER:
                    this.menu.active &&
                      ((i = !0), e.preventDefault(), this.menu.select(e));
                    break;
                  case t.TAB:
                    this.menu.active && this.menu.select(e);
                    break;
                  case t.ESCAPE:
                    this.menu.element.is(":visible") &&
                      (this.isMultiLine || this._value(this.term),
                      this.close(e),
                      e.preventDefault());
                    break;
                  default:
                    (s = !0), this._searchTimeout(e);
                }
              }
            },
            keypress: function (e) {
              if (i)
                return (
                  (i = !1),
                  void (
                    (this.isMultiLine && !this.menu.element.is(":visible")) ||
                    e.preventDefault()
                  )
                );
              if (!s) {
                var t = x.ui.keyCode;
                switch (e.keyCode) {
                  case t.PAGE_UP:
                    this._move("previousPage", e);
                    break;
                  case t.PAGE_DOWN:
                    this._move("nextPage", e);
                    break;
                  case t.UP:
                    this._keyEvent("previous", e);
                    break;
                  case t.DOWN:
                    this._keyEvent("next", e);
                }
              }
            },
            input: function (e) {
              if (n) return (n = !1), void e.preventDefault();
              this._searchTimeout(e);
            },
            focus: function () {
              (this.selectedItem = null), (this.previous = this._value());
            },
            blur: function (e) {
              this.cancelBlur
                ? delete this.cancelBlur
                : (clearTimeout(this.searching), this.close(e), this._change(e));
            }
          }),
          this._initSource(),
          (this.menu = x("<ul>")
            .appendTo(this._appendTo())
            .menu({ role: null })
            .hide()
            .menu("instance")),
          this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
          this._on(this.menu.element, {
            mousedown: function (e) {
              e.preventDefault(),
                (this.cancelBlur = !0),
                this._delay(function () {
                  delete this.cancelBlur,
                    this.element[0] !==
                      x.ui.safeActiveElement(this.document[0]) &&
                      this.element.trigger("focus");
                });
            },
            menufocus: function (e, t) {
              var i;
              if (
                this.isNewMenu &&
                ((this.isNewMenu = !1),
                e.originalEvent && /^mouse/.test(e.originalEvent.type))
              )
                return (
                  this.menu.blur(),
                  void this.document.one("mousemove", function () {
                    x(e.target).trigger(e.originalEvent);
                  })
                );
              (i = t.item.data("ui-autocomplete-item")),
                !1 !== this._trigger("focus", e, { item: i }) &&
                  e.originalEvent &&
                  /^key/.test(e.originalEvent.type) &&
                  this._value(i.value),
                (i = t.item.attr("aria-label") || i.value) &&
                  x.trim(i).length &&
                  (this.liveRegion.children().hide(),
                  x("<div>").text(i).appendTo(this.liveRegion));
            },
            menuselect: function (e, t) {
              var i = t.item.data("ui-autocomplete-item"),
                s = this.previous;
              this.element[0] !== x.ui.safeActiveElement(this.document[0]) &&
                (this.element.trigger("focus"),
                (this.previous = s),
                this._delay(function () {
                  (this.previous = s), (this.selectedItem = i);
                })),
                !1 !== this._trigger("select", e, { item: i }) &&
                  this._value(i.value),
                (this.term = this._value()),
                this.close(e),
                (this.selectedItem = i);
            }
          }),
          (this.liveRegion = x("<div>", {
            role: "status",
            "aria-live": "assertive",
            "aria-relevant": "additions"
          }).appendTo(this.document[0].body)),
          this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
          this._on(this.window, {
            beforeunload: function () {
              this.element.removeAttr("autocomplete");
            }
          });
      },
      _destroy: function () {
        clearTimeout(this.searching),
          this.element.removeAttr("autocomplete"),
          this.menu.element.remove(),
          this.liveRegion.remove();
      },
      _setOption: function (e, t) {
        this._super(e, t),
          "source" === e && this._initSource(),
          "appendTo" === e && this.menu.element.appendTo(this._appendTo()),
          "disabled" === e && t && this.xhr && this.xhr.abort();
      },
      _isEventTargetInWidget: function (e) {
        var t = this.menu.element[0];
        return (
          e.target === this.element[0] ||
          e.target === t ||
          x.contains(t, e.target)
        );
      },
      _closeOnClickOutside: function (e) {
        this._isEventTargetInWidget(e) || this.close();
      },
      _appendTo: function () {
        var e = this.options.appendTo;
        return (e = !(e =
          !(e =
            e && (e.jquery || e.nodeType ? x(e) : this.document.find(e).eq(0))) ||
          !e[0]
            ? this.element.closest(".ui-front, dialog")
            : e).length
          ? this.document[0].body
          : e);
      },
      _initSource: function () {
        var i,
          s,
          n = this;
        x.isArray(this.options.source)
          ? ((i = this.options.source),
            (this.source = function (e, t) {
              t(x.ui.autocomplete.filter(i, e.term));
            }))
          : "string" == typeof this.options.source
          ? ((s = this.options.source),
            (this.source = function (e, t) {
              n.xhr && n.xhr.abort(),
                (n.xhr = x.ajax({
                  url: s,
                  data: e,
                  dataType: "json",
                  success: function (e) {
                    t(e);
                  },
                  error: function () {
                    t([]);
                  }
                }));
            }))
          : (this.source = this.options.source);
      },
      _searchTimeout: function (s) {
        clearTimeout(this.searching),
          (this.searching = this._delay(function () {
            var e = this.term === this._value(),
              t = this.menu.element.is(":visible"),
              i = s.altKey || s.ctrlKey || s.metaKey || s.shiftKey;
            (e && (t || i)) || ((this.selectedItem = null), this.search(null, s));
          }, this.options.delay));
      },
      search: function (e, t) {
        return (
          (e = null != e ? e : this._value()),
          (this.term = this._value()),
          e.length < this.options.minLength
            ? this.close(t)
            : !1 !== this._trigger("search", t)
            ? this._search(e)
            : void 0
        );
      },
      _search: function (e) {
        this.pending++,
          this._addClass("ui-autocomplete-loading"),
          (this.cancelSearch = !1),
          this.source({ term: e }, this._response());
      },
      _response: function () {
        var t = ++this.requestIndex;
        return x.proxy(function (e) {
          t === this.requestIndex && this.__response(e),
            this.pending--,
            this.pending || this._removeClass("ui-autocomplete-loading");
        }, this);
      },
      __response: function (e) {
        (e = e && this._normalize(e)),
          this._trigger("response", null, { content: e }),
          !this.options.disabled && e && e.length && !this.cancelSearch
            ? (this._suggest(e), this._trigger("open"))
            : this._close();
      },
      close: function (e) {
        (this.cancelSearch = !0), this._close(e);
      },
      _close: function (e) {
        this._off(this.document, "mousedown"),
          this.menu.element.is(":visible") &&
            (this.menu.element.hide(),
            this.menu.blur(),
            (this.isNewMenu = !0),
            this._trigger("close", e));
      },
      _change: function (e) {
        this.previous !== this._value() &&
          this._trigger("change", e, { item: this.selectedItem });
      },
      _normalize: function (e) {
        return e.length && e[0].label && e[0].value
          ? e
          : x.map(e, function (e) {
              return "string" == typeof e
                ? { label: e, value: e }
                : x.extend({}, e, {
                    label: e.label || e.value,
                    value: e.value || e.label
                  });
            });
      },
      _suggest: function (e) {
        var t = this.menu.element.empty();
        this._renderMenu(t, e),
          (this.isNewMenu = !0),
          this.menu.refresh(),
          t.show(),
          this._resizeMenu(),
          t.position(x.extend({ of: this.element }, this.options.position)),
          this.options.autoFocus && this.menu.next(),
          this._on(this.document, { mousedown: "_closeOnClickOutside" });
      },
      _resizeMenu: function () {
        var e = this.menu.element;
        e.outerWidth(
          Math.max(e.width("").outerWidth() + 1, this.element.outerWidth())
        );
      },
      _renderMenu: function (i, e) {
        var s = this;
        x.each(e, function (e, t) {
          s._renderItemData(i, t);
        });
      },
      _renderItemData: function (e, t) {
        return this._renderItem(e, t).data("ui-autocomplete-item", t);
      },
      _renderItem: function (e, t) {
        return x("<li>").append(x("<div>").text(t.label)).appendTo(e);
      },
      _move: function (e, t) {
        if (this.menu.element.is(":visible"))
          return (this.menu.isFirstItem() && /^previous/.test(e)) ||
            (this.menu.isLastItem() && /^next/.test(e))
            ? (this.isMultiLine || this._value(this.term), void this.menu.blur())
            : void this.menu[e](t);
        this.search(null, t);
      },
      widget: function () {
        return this.menu.element;
      },
      _value: function () {
        return this.valueMethod.apply(this.element, arguments);
      },
      _keyEvent: function (e, t) {
        (this.isMultiLine && !this.menu.element.is(":visible")) ||
          (this._move(e, t), t.preventDefault());
      },
      _isContentEditable: function (e) {
        if (!e.length) return !1;
        var t = e.prop("contentEditable");
        return "inherit" === t
          ? this._isContentEditable(e.parent())
          : "true" === t;
      }
    }),
      x.extend(x.ui.autocomplete, {
        escapeRegex: function (e) {
          return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function (e, t) {
          var i = new RegExp(x.ui.autocomplete.escapeRegex(t), "i");
          return x.grep(e, function (e) {
            return i.test(e.label || e.value || e);
          });
        }
      }),
      x.widget("ui.autocomplete", x.ui.autocomplete, {
        options: {
          messages: {
            noResults: "No search results.",
            results: function (e) {
              return (
                e +
                (1 < e ? " results are" : " result is") +
                " available, use up and down arrow keys to navigate."
              );
            }
          }
        },
        __response: function (e) {
          var t;
          this._superApply(arguments),
            this.options.disabled ||
              this.cancelSearch ||
              ((t =
                e && e.length
                  ? this.options.messages.results(e.length)
                  : this.options.messages.noResults),
              this.liveRegion.children().hide(),
              x("<div>").text(t).appendTo(this.liveRegion));
        }
      });
    x.ui.autocomplete,
      (x.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
    var c = !1;
    x(document).on("mouseup", function () {
      c = !1;
    });
    x.widget("ui.mouse", {
      version: "1.12.1",
      options: {
        cancel: "input, textarea, button, select, option",
        distance: 1,
        delay: 0
      },
      _mouseInit: function () {
        var t = this;
        this.element
          .on("mousedown." + this.widgetName, function (e) {
            return t._mouseDown(e);
          })
          .on("click." + this.widgetName, function (e) {
            if (!0 === x.data(e.target, t.widgetName + ".preventClickEvent"))
              return (
                x.removeData(e.target, t.widgetName + ".preventClickEvent"),
                e.stopImmediatePropagation(),
                !1
              );
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.off("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .off("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (e) {
        if (!c) {
          (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(e),
            (this._mouseDownEvent = e);
          var t = this,
            i = 1 === e.which,
            s =
              !("string" != typeof this.options.cancel || !e.target.nodeName) &&
              x(e.target).closest(this.options.cancel).length;
          return i && !s && this._mouseCapture(e)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  t.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(e) &&
              this._mouseDelayMet(e) &&
              ((this._mouseStarted = !1 !== this._mouseStart(e)),
              !this._mouseStarted)
                ? (e.preventDefault(), !0)
                : (!0 ===
                    x.data(e.target, this.widgetName + ".preventClickEvent") &&
                    x.removeData(
                      e.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (e) {
                    return t._mouseMove(e);
                  }),
                  (this._mouseUpDelegate = function (e) {
                    return t._mouseUp(e);
                  }),
                  this.document
                    .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                    .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                  e.preventDefault(),
                  (c = !0)))
            : !0;
        }
      },
      _mouseMove: function (e) {
        if (this._mouseMoved) {
          if (
            x.ui.ie &&
            (!document.documentMode || document.documentMode < 9) &&
            !e.button
          )
            return this._mouseUp(e);
          if (!e.which)
            if (
              e.originalEvent.altKey ||
              e.originalEvent.ctrlKey ||
              e.originalEvent.metaKey ||
              e.originalEvent.shiftKey
            )
              this.ignoreMissingWhich = !0;
            else if (!this.ignoreMissingWhich) return this._mouseUp(e);
        }
        return (
          (e.which || e.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(e), e.preventDefault())
            : (this._mouseDistanceMet(e) &&
                this._mouseDelayMet(e) &&
                ((this._mouseStarted =
                  !1 !== this._mouseStart(this._mouseDownEvent, e)),
                this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function (e) {
        this.document
          .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
          .off("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            e.target === this._mouseDownEvent.target &&
              x.data(e.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(e)),
          this._mouseDelayTimer &&
            (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
          (this.ignoreMissingWhich = !1),
          (c = !1),
          e.preventDefault();
      },
      _mouseDistanceMet: function (e) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - e.pageX),
            Math.abs(this._mouseDownEvent.pageY - e.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      }
    }),
      x.widget("ui.slider", x.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
          animate: !1,
          classes: {
            "ui-slider": "ui-corner-all",
            "ui-slider-handle": "ui-corner-all",
            "ui-slider-range": "ui-corner-all ui-widget-header"
          },
          distance: 0,
          max: 100,
          min: 0,
          orientation: "horizontal",
          range: !1,
          step: 1,
          value: 0,
          values: null,
          change: null,
          slide: null,
          start: null,
          stop: null
        },
        numPages: 5,
        _create: function () {
          (this._keySliding = !1),
            (this._mouseSliding = !1),
            (this._animateOff = !0),
            (this._handleIndex = null),
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this._addClass(
              "ui-slider ui-slider-" + this.orientation,
              "ui-widget ui-widget-content"
            ),
            this._refresh(),
            (this._animateOff = !1);
        },
        _refresh: function () {
          this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue();
        },
        _createHandles: function () {
          var e,
            t = this.options,
            i = this.element.find(".ui-slider-handle"),
            s = [],
            n = (t.values && t.values.length) || 1;
          for (
            i.length > n && (i.slice(n).remove(), (i = i.slice(0, n))),
              e = i.length;
            e < n;
            e++
          )
            s.push("<span tabindex='0'></span>");
          (this.handles = i.add(x(s.join("")).appendTo(this.element))),
            this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
            (this.handle = this.handles.eq(0)),
            this.handles.each(function (e) {
              x(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
            });
        },
        _createRange: function () {
          var e = this.options;
          e.range
            ? (!0 === e.range &&
                (e.values
                  ? e.values.length && 2 !== e.values.length
                    ? (e.values = [e.values[0], e.values[0]])
                    : x.isArray(e.values) && (e.values = e.values.slice(0))
                  : (e.values = [this._valueMin(), this._valueMin()])),
              this.range && this.range.length
                ? (this._removeClass(
                    this.range,
                    "ui-slider-range-min ui-slider-range-max"
                  ),
                  this.range.css({ left: "", bottom: "" }))
                : ((this.range = x("<div>").appendTo(this.element)),
                  this._addClass(this.range, "ui-slider-range")),
              ("min" !== e.range && "max" !== e.range) ||
                this._addClass(this.range, "ui-slider-range-" + e.range))
            : (this.range && this.range.remove(), (this.range = null));
        },
        _setupEvents: function () {
          this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles);
        },
        _destroy: function () {
          this.handles.remove(),
            this.range && this.range.remove(),
            this._mouseDestroy();
        },
        _mouseCapture: function (e) {
          var i,
            s,
            n,
            o,
            t,
            a,
            l = this,
            h = this.options;
          return (
            !h.disabled &&
            ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight()
            }),
            (this.elementOffset = this.element.offset()),
            (a = { x: e.pageX, y: e.pageY }),
            (i = this._normValueFromMouse(a)),
            (s = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function (e) {
              var t = Math.abs(i - l.values(e));
              (t < s ||
                (s === t &&
                  (e === l._lastChangedValue || l.values(e) === h.min))) &&
                ((s = t), (n = x(this)), (o = e));
            }),
            !1 !== this._start(e, o) &&
              ((this._mouseSliding = !0),
              (this._handleIndex = o),
              this._addClass(n, null, "ui-state-active"),
              n.trigger("focus"),
              (t = n.offset()),
              (a = !x(e.target).parents().addBack().is(".ui-slider-handle")),
              (this._clickOffset = a
                ? { left: 0, top: 0 }
                : {
                    left: e.pageX - t.left - n.width() / 2,
                    top:
                      e.pageY -
                      t.top -
                      n.height() / 2 -
                      (parseInt(n.css("borderTopWidth"), 10) || 0) -
                      (parseInt(n.css("borderBottomWidth"), 10) || 0) +
                      (parseInt(n.css("marginTop"), 10) || 0)
                  }),
              this.handles.hasClass("ui-state-hover") || this._slide(e, o, i),
              (this._animateOff = !0)))
          );
        },
        _mouseStart: function () {
          return !0;
        },
        _mouseDrag: function (e) {
          var t = { x: e.pageX, y: e.pageY },
            t = this._normValueFromMouse(t);
          return this._slide(e, this._handleIndex, t), !1;
        },
        _mouseStop: function (e) {
          return (
            this._removeClass(this.handles, null, "ui-state-active"),
            (this._mouseSliding = !1),
            this._stop(e, this._handleIndex),
            this._change(e, this._handleIndex),
            (this._handleIndex = null),
            (this._clickOffset = null),
            (this._animateOff = !1)
          );
        },
        _detectOrientation: function () {
          this.orientation =
            "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function (e) {
          var t,
            e =
              "horizontal" === this.orientation
                ? ((t = this.elementSize.width),
                  e.x -
                    this.elementOffset.left -
                    (this._clickOffset ? this._clickOffset.left : 0))
                : ((t = this.elementSize.height),
                  e.y -
                    this.elementOffset.top -
                    (this._clickOffset ? this._clickOffset.top : 0)),
            e = e / t;
          return (
            (e = 1 < e ? 1 : e) < 0 && (e = 0),
            "vertical" === this.orientation && (e = 1 - e),
            (t = this._valueMax() - this._valueMin()),
            (t = this._valueMin() + e * t),
            this._trimAlignValue(t)
          );
        },
        _uiHash: function (e, t, i) {
          var s = {
            handle: this.handles[e],
            handleIndex: e,
            value: void 0 !== t ? t : this.value()
          };
          return (
            this._hasMultipleValues() &&
              ((s.value = void 0 !== t ? t : this.values(e)),
              (s.values = i || this.values())),
            s
          );
        },
        _hasMultipleValues: function () {
          return this.options.values && this.options.values.length;
        },
        _start: function (e, t) {
          return this._trigger("start", e, this._uiHash(t));
        },
        _slide: function (e, t, i) {
          var s,
            n = this.value(),
            o = this.values();
          this._hasMultipleValues() &&
            ((s = this.values(t ? 0 : 1)),
            (n = this.values(t)),
            2 === this.options.values.length &&
              !0 === this.options.range &&
              (i = 0 === t ? Math.min(s, i) : Math.max(s, i)),
            (o[t] = i)),
            i !== n &&
              !1 !== this._trigger("slide", e, this._uiHash(t, i, o)) &&
              (this._hasMultipleValues() ? this.values(t, i) : this.value(i));
        },
        _stop: function (e, t) {
          this._trigger("stop", e, this._uiHash(t));
        },
        _change: function (e, t) {
          this._keySliding ||
            this._mouseSliding ||
            ((this._lastChangedValue = t),
            this._trigger("change", e, this._uiHash(t)));
        },
        value: function (e) {
          return arguments.length
            ? ((this.options.value = this._trimAlignValue(e)),
              this._refreshValue(),
              void this._change(null, 0))
            : this._value();
        },
        values: function (e, t) {
          var i, s, n;
          if (1 < arguments.length)
            return (
              (this.options.values[e] = this._trimAlignValue(t)),
              this._refreshValue(),
              void this._change(null, e)
            );
          if (!arguments.length) return this._values();
          if (!x.isArray(e))
            return this._hasMultipleValues() ? this._values(e) : this.value();
          for (i = this.options.values, s = e, n = 0; n < i.length; n += 1)
            (i[n] = this._trimAlignValue(s[n])), this._change(null, n);
          this._refreshValue();
        },
        _setOption: function (e, t) {
          var i,
            s = 0;
          switch (
            ("range" === e &&
              !0 === this.options.range &&
              ("min" === t
                ? ((this.options.value = this._values(0)),
                  (this.options.values = null))
                : "max" === t &&
                  ((this.options.value = this._values(
                    this.options.values.length - 1
                  )),
                  (this.options.values = null))),
            x.isArray(this.options.values) && (s = this.options.values.length),
            this._super(e, t),
            e)
          ) {
            case "orientation":
              this._detectOrientation(),
                this._removeClass(
                  "ui-slider-horizontal ui-slider-vertical"
                )._addClass("ui-slider-" + this.orientation),
                this._refreshValue(),
                this.options.range && this._refreshRange(t),
                this.handles.css("horizontal" === t ? "bottom" : "left", "");
              break;
            case "value":
              (this._animateOff = !0),
                this._refreshValue(),
                this._change(null, 0),
                (this._animateOff = !1);
              break;
            case "values":
              for (
                this._animateOff = !0, this._refreshValue(), i = s - 1;
                0 <= i;
                i--
              )
                this._change(null, i);
              this._animateOff = !1;
              break;
            case "step":
            case "min":
            case "max":
              (this._animateOff = !0),
                this._calculateNewMax(),
                this._refreshValue(),
                (this._animateOff = !1);
              break;
            case "range":
              (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
          }
        },
        _setOptionDisabled: function (e) {
          this._super(e), this._toggleClass(null, "ui-state-disabled", !!e);
        },
        _value: function () {
          var e = this.options.value;
          return (e = this._trimAlignValue(e));
        },
        _values: function (e) {
          var t, i, s;
          if (arguments.length)
            return (t = this.options.values[e]), this._trimAlignValue(t);
          if (this._hasMultipleValues()) {
            for (i = this.options.values.slice(), s = 0; s < i.length; s += 1)
              i[s] = this._trimAlignValue(i[s]);
            return i;
          }
          return [];
        },
        _trimAlignValue: function (e) {
          if (e <= this._valueMin()) return this._valueMin();
          if (e >= this._valueMax()) return this._valueMax();
          var t = 0 < this.options.step ? this.options.step : 1,
            i = (e - this._valueMin()) % t,
            e = e - i;
          return (
            2 * Math.abs(i) >= t && (e += 0 < i ? t : -t),
            parseFloat(e.toFixed(5))
          );
        },
        _calculateNewMax: function () {
          var e = this.options.max,
            t = this._valueMin(),
            i = this.options.step;
          (e = Math.round((e - t) / i) * i + t) > this.options.max && (e -= i),
            (this.max = parseFloat(e.toFixed(this._precision())));
        },
        _precision: function () {
          var e = this._precisionOf(this.options.step);
          return (e =
            null !== this.options.min
              ? Math.max(e, this._precisionOf(this.options.min))
              : e);
        },
        _precisionOf: function (e) {
          var t = e.toString(),
            e = t.indexOf(".");
          return -1 === e ? 0 : t.length - e - 1;
        },
        _valueMin: function () {
          return this.options.min;
        },
        _valueMax: function () {
          return this.max;
        },
        _refreshRange: function (e) {
          "vertical" === e && this.range.css({ width: "", left: "" }),
            "horizontal" === e && this.range.css({ height: "", bottom: "" });
        },
        _refreshValue: function () {
          var t,
            i,
            e,
            s,
            n,
            o = this.options.range,
            a = this.options,
            l = this,
            h = !this._animateOff && a.animate,
            u = {};
          this._hasMultipleValues()
            ? this.handles.each(function (e) {
                (i =
                  ((l.values(e) - l._valueMin()) /
                    (l._valueMax() - l._valueMin())) *
                  100),
                  (u["horizontal" === l.orientation ? "left" : "bottom"] =
                    i + "%"),
                  x(this).stop(1, 1)[h ? "animate" : "css"](u, a.animate),
                  !0 === l.options.range &&
                    ("horizontal" === l.orientation
                      ? (0 === e &&
                          l.range
                            .stop(1, 1)
                            [h ? "animate" : "css"]({ left: i + "%" }, a.animate),
                        1 === e &&
                          l.range[h ? "animate" : "css"](
                            { width: i - t + "%" },
                            { queue: !1, duration: a.animate }
                          ))
                      : (0 === e &&
                          l.range
                            .stop(1, 1)
                            [h ? "animate" : "css"](
                              { bottom: i + "%" },
                              a.animate
                            ),
                        1 === e &&
                          l.range[h ? "animate" : "css"](
                            { height: i - t + "%" },
                            { queue: !1, duration: a.animate }
                          ))),
                  (t = i);
              })
            : ((e = this.value()),
              (s = this._valueMin()),
              (n = this._valueMax()),
              (i = n !== s ? ((e - s) / (n - s)) * 100 : 0),
              (u["horizontal" === this.orientation ? "left" : "bottom"] =
                i + "%"),
              this.handle.stop(1, 1)[h ? "animate" : "css"](u, a.animate),
              "min" === o &&
                "horizontal" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [h ? "animate" : "css"]({ width: i + "%" }, a.animate),
              "max" === o &&
                "horizontal" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [h ? "animate" : "css"]({ width: 100 - i + "%" }, a.animate),
              "min" === o &&
                "vertical" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [h ? "animate" : "css"]({ height: i + "%" }, a.animate),
              "max" === o &&
                "vertical" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [h ? "animate" : "css"]({ height: 100 - i + "%" }, a.animate));
        },
        _handleEvents: {
          keydown: function (e) {
            var t,
              i,
              s,
              n = x(e.target).data("ui-slider-handle-index");
            switch (e.keyCode) {
              case x.ui.keyCode.HOME:
              case x.ui.keyCode.END:
              case x.ui.keyCode.PAGE_UP:
              case x.ui.keyCode.PAGE_DOWN:
              case x.ui.keyCode.UP:
              case x.ui.keyCode.RIGHT:
              case x.ui.keyCode.DOWN:
              case x.ui.keyCode.LEFT:
                if (
                  (e.preventDefault(),
                  !this._keySliding &&
                    ((this._keySliding = !0),
                    this._addClass(x(e.target), null, "ui-state-active"),
                    !1 === this._start(e, n)))
                )
                  return;
            }
            switch (
              ((s = this.options.step),
              (t = i = this._hasMultipleValues() ? this.values(n) : this.value()),
              e.keyCode)
            ) {
              case x.ui.keyCode.HOME:
                i = this._valueMin();
                break;
              case x.ui.keyCode.END:
                i = this._valueMax();
                break;
              case x.ui.keyCode.PAGE_UP:
                i = this._trimAlignValue(
                  t + (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case x.ui.keyCode.PAGE_DOWN:
                i = this._trimAlignValue(
                  t - (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case x.ui.keyCode.UP:
              case x.ui.keyCode.RIGHT:
                if (t === this._valueMax()) return;
                i = this._trimAlignValue(t + s);
                break;
              case x.ui.keyCode.DOWN:
              case x.ui.keyCode.LEFT:
                if (t === this._valueMin()) return;
                i = this._trimAlignValue(t - s);
            }
            this._slide(e, n, i);
          },
          keyup: function (e) {
            var t = x(e.target).data("ui-slider-handle-index");
            this._keySliding &&
              ((this._keySliding = !1),
              this._stop(e, t),
              this._change(e, t),
              this._removeClass(x(e.target), null, "ui-state-active"));
          }
        }
      });
  });
  