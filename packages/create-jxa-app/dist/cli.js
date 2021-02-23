#!/usr/bin/env node
var sade = require('sade');
var require$$5 = require('child_process');
var validateProjectName = require('validate-npm-package-name');
var kleur = require('kleur');
var path = require('path');
var fs = require('fs-extra');
var os = require('os');
var spawn = require('cross-spawn');
var semver$1 = require('semver');
var dns = require('dns');
var require$$1 = require('fs');
var require$$3 = require('util');
var require$$4 = require('assert');
var require$$6 = require('events');
var require$$7 = require('stream');
var hyperquest = require('hyperquest');
var prompts = require('prompts');
var tmp = require('tmp');
var tarPack = require('tar-pack');
var url = require('url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sade__default = /*#__PURE__*/_interopDefaultLegacy(sade);
var require$$5__default = /*#__PURE__*/_interopDefaultLegacy(require$$5);
var validateProjectName__default = /*#__PURE__*/_interopDefaultLegacy(validateProjectName);
var kleur__default = /*#__PURE__*/_interopDefaultLegacy(kleur);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var spawn__default = /*#__PURE__*/_interopDefaultLegacy(spawn);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver$1);
var dns__default = /*#__PURE__*/_interopDefaultLegacy(dns);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
var require$$7__default = /*#__PURE__*/_interopDefaultLegacy(require$$7);
var hyperquest__default = /*#__PURE__*/_interopDefaultLegacy(hyperquest);
var prompts__default = /*#__PURE__*/_interopDefaultLegacy(prompts);
var tmp__default = /*#__PURE__*/_interopDefaultLegacy(tmp);
var url__default = /*#__PURE__*/_interopDefaultLegacy(url);

var name = "create-jxa-app";
var version = "0.0.11";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

(function (e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var o = t[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }

  return n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: r
    });
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
      return e[t];
    }.bind(null, o));
    return r;
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 78);
})([function (e, t) {
  e.exports = path__default['default'];
}, function (e, t, n) {

  n(16), n(101), n(22), n(103), n(114), n(17), n(27), n(74), n(116), n(2);

  var r = n(0),
      o = n(5),
      i = n(18),
      s = n(49),
      a = n(76),
      c = n(45),
      u = n(121),
      l = function (e) {
    var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).unify,
        n = void 0 !== t && t;
    return new Promise(function (t) {
      s.exec(e, {
        stdio: [0, "pipe", "ignore"]
      }, function (e, r, o) {
        var i = "";
        i = n ? r.toString() + o.toString() : r.toString(), t((e ? "" : i).trim());
      });
    });
  },
      f = function (e) {
    var t = Object.values(Array.prototype.slice.call(arguments).slice(1));
    (process.env.ENVINFO_DEBUG || "").toLowerCase() === e && console.log(e, JSON.stringify(t));
  },
      p = function (e) {
    return new Promise(function (t) {
      o.readFile(e, "utf8", function (e, n) {
        return t(n || null);
      });
    });
  },
      h = function (e) {
    return p(e).then(function (e) {
      return e ? JSON.parse(e) : null;
    });
  },
      d = /\d+\.[\d+|.]+/g,
      m = function (e) {
    f("trace", "findDarwinApplication", e);
    var t = `mdfind "kMDItemCFBundleIdentifier=='${e}'"`;
    return f("trace", t), l(t).then(function (e) {
      return e.replace(/(\s)/g, "\\ ");
    });
  },
      g = function (e, t) {
    var n = (t || ["CFBundleShortVersionString"]).map(function (e) {
      return "-c Print:" + e;
    });
    return ["/usr/libexec/PlistBuddy"].concat(n).concat([e]).join(" ");
  },
      v = function (e, t) {
    for (var n = [], r = null; null !== (r = e.exec(t));) n.push(r);

    return n;
  };

  e.exports = {
    run: l,
    log: f,
    fileExists: function (e) {
      return new Promise(function (t) {
        o.stat(e, function (n) {
          return t(n ? null : e);
        });
      });
    },
    readFile: p,
    requireJson: h,
    versionRegex: d,
    findDarwinApplication: m,
    generatePlistBuddyCommand: g,
    matchAll: v,
    parseSDKManagerOutput: function (e) {
      var t = e.split("Available")[0];
      return {
        apiLevels: v(u.androidAPILevels, t).map(function (e) {
          return e[1];
        }),
        buildTools: v(u.androidBuildTools, t).map(function (e) {
          return e[1];
        }),
        systemImages: v(u.androidSystemImages, t).map(function (e) {
          return e[1].split("|").map(function (e) {
            return e.trim();
          });
        }).map(function (e) {
          return e[0].split(";")[0] + " | " + e[2].split(" System Image")[0];
        })
      };
    },
    isLinux: "linux" === process.platform,
    isMacOS: "darwin" === process.platform,
    NA: "N/A",
    NotFound: "Not Found",
    isWindows: process.platform.startsWith("win"),
    isObject: function (e) {
      return "object" == typeof e && !Array.isArray(e);
    },
    noop: function (e) {
      return e;
    },
    pipe: function (e) {
      return function (t) {
        return e.reduce(function (e, t) {
          return t(e);
        }, t);
      };
    },
    browserBundleIdentifiers: {
      "Brave Browser": "com.brave.Browser",
      Chrome: "com.google.Chrome",
      "Chrome Canary": "com.google.Chrome.canary",
      Firefox: "org.mozilla.firefox",
      "Firefox Developer Edition": "org.mozilla.firefoxdeveloperedition",
      "Firefox Nightly": "org.mozilla.nightly",
      "Microsoft Edge": "com.microsoft.edgemac",
      Safari: "com.apple.Safari",
      "Safari Technology Preview": "com.apple.SafariTechnologyPreview"
    },
    ideBundleIdentifiers: {
      Atom: "com.github.atom",
      IntelliJ: "com.jetbrains.intellij",
      PhpStorm: "com.jetbrains.PhpStorm",
      "Sublime Text": "com.sublimetext.3",
      WebStorm: "com.jetbrains.WebStorm"
    },
    runSync: function (e) {
      return (s.execSync(e, {
        stdio: [0, "pipe", "ignore"]
      }).toString() || "").trim();
    },
    which: function (e) {
      return new Promise(function (t) {
        return a(e, function (e, n) {
          return t(n);
        });
      });
    },
    getDarwinApplicationVersion: function (e) {
      var t;
      return f("trace", "getDarwinApplicationVersion", e), t = "darwin" !== process.platform ? "N/A" : m(e).then(function (e) {
        return l(g(r.join(e, "Contents", "Info.plist"), ["CFBundleShortVersionString"]));
      }), Promise.resolve(t);
    },
    uniq: function (e) {
      return Array.from(new Set(e));
    },
    toReadableBytes: function (e) {
      var t = Math.floor(Math.log(e) / Math.log(1024));
      return e ? (e / Math.pow(1024, t)).toFixed(2) + " " + ["B", "KB", "MB", "GB", "TB", "PB"][t] : "0 Bytes";
    },
    omit: function (e, t) {
      return Object.keys(e).filter(function (e) {
        return t.indexOf(e) < 0;
      }).reduce(function (t, n) {
        return Object.assign(t, {
          [n]: e[n]
        });
      }, {});
    },
    pick: function (e, t) {
      return Object.keys(e).filter(function (e) {
        return t.indexOf(e) >= 0;
      }).reduce(function (t, n) {
        return Object.assign(t, {
          [n]: e[n]
        });
      }, {});
    },
    getPackageJsonByName: function (e) {
      return h(r.join(process.cwd(), "node_modules", e, "package.json"));
    },
    getPackageJsonByPath: function (e) {
      return h(r.join(process.cwd(), e));
    },
    getPackageJsonByFullPath: function (e) {
      return f("trace", "getPackageJsonByFullPath", e), h(e);
    },
    getAllPackageJsonPaths: function (e) {
      return f("trace", "getAllPackageJsonPaths", e), new Promise(function (t) {
        var n = function (e, n) {
          return t(n.map(r.normalize) || []);
        };

        return c(e ? r.join("node_modules", e, "package.json") : r.join("node_modules", "**", "package.json"), n);
      });
    },
    sortObject: function (e) {
      return Object.keys(e).sort().reduce(function (t, n) {
        return t[n] = e[n], t;
      }, {});
    },
    findVersion: function (e, t, n) {
      f("trace", "findVersion", e, t, n);
      var r = n || 0,
          o = t || d,
          i = e.match(o);
      return i ? i[r] : e;
    },
    condensePath: function (e) {
      return (e || "").replace(i.homedir(), "~");
    },
    determineFound: function (e, t, n) {
      return f("trace", "determineFound", e, t, n), "N/A" === t ? Promise.resolve([e, "N/A"]) : t && 0 !== Object.keys(t).length ? n ? Promise.resolve([e, t, n]) : Promise.resolve([e, t]) : Promise.resolve([e, "Not Found"]);
    }
  };
}, function (e, t, n) {

  var r,
      o,
      i,
      s,
      a = n(36),
      c = n(4),
      u = n(12),
      l = n(56),
      f = n(8),
      p = n(6),
      h = n(20),
      d = n(37),
      m = n(38),
      g = n(81),
      v = n(60).set,
      y = n(83)(),
      b = n(62),
      w = n(84),
      x = n(85),
      S = n(86),
      P = c.TypeError,
      O = c.process,
      E = O && O.versions,
      _ = E && E.v8 || "",
      I = c.Promise,
      j = "process" == l(O),
      A = function () {},
      k = o = b.f,
      N = !!function () {
    try {
      var e = I.resolve(1),
          t = (e.constructor = {})[n(3)("species")] = function (e) {
        e(A, A);
      };

      return (j || "function" == typeof PromiseRejectionEvent) && e.then(A) instanceof t && 0 !== _.indexOf("6.6") && -1 === x.indexOf("Chrome/66");
    } catch (e) {}
  }(),
      F = function (e) {
    var t;
    return !(!p(e) || "function" != typeof (t = e.then)) && t;
  },
      C = function (e, t) {
    if (!e._n) {
      e._n = !0;
      var n = e._c;
      y(function () {
        for (var r = e._v, o = 1 == e._s, i = 0, s = function (t) {
          var n,
              i,
              s,
              a = o ? t.ok : t.fail,
              c = t.resolve,
              u = t.reject,
              l = t.domain;

          try {
            a ? (o || (2 == e._h && V(e), e._h = 1), !0 === a ? n = r : (l && l.enter(), n = a(r), l && (l.exit(), s = !0)), n === t.promise ? u(P("Promise-chain cycle")) : (i = F(n)) ? i.call(n, c, u) : c(n)) : u(r);
          } catch (e) {
            l && !s && l.exit(), u(e);
          }
        }; n.length > i;) s(n[i++]);

        e._c = [], e._n = !1, t && !e._h && M(e);
      });
    }
  },
      M = function (e) {
    v.call(c, function () {
      var t,
          n,
          r,
          o = e._v,
          i = T(e);
      if (i && (t = w(function () {
        j ? O.emit("unhandledRejection", o, e) : (n = c.onunhandledrejection) ? n({
          promise: e,
          reason: o
        }) : (r = c.console) && r.error && r.error("Unhandled promise rejection", o);
      }), e._h = j || T(e) ? 2 : 1), e._a = void 0, i && t.e) throw t.v;
    });
  },
      T = function (e) {
    return 1 !== e._h && 0 === (e._a || e._c).length;
  },
      V = function (e) {
    v.call(c, function () {
      var t;
      j ? O.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({
        promise: e,
        reason: e._v
      });
    });
  },
      D = function (e) {
    var t = this;
    t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), C(t, !0));
  },
      B = function (e) {
    var t,
        n = this;

    if (!n._d) {
      n._d = !0, n = n._w || n;

      try {
        if (n === e) throw P("Promise can't be resolved itself");
        (t = F(e)) ? y(function () {
          var r = {
            _w: n,
            _d: !1
          };

          try {
            t.call(e, u(B, r, 1), u(D, r, 1));
          } catch (e) {
            D.call(r, e);
          }
        }) : (n._v = e, n._s = 1, C(n, !1));
      } catch (e) {
        D.call({
          _w: n,
          _d: !1
        }, e);
      }
    }
  };

  N || (I = function (e) {
    d(this, I, "Promise", "_h"), h(e), r.call(this);

    try {
      e(u(B, this, 1), u(D, this, 1));
    } catch (e) {
      D.call(this, e);
    }
  }, (r = function (e) {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = n(40)(I.prototype, {
    then: function (e, t) {
      var n = k(g(this, I));
      return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = j ? O.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && C(this, !1), n.promise;
    },
    catch: function (e) {
      return this.then(void 0, e);
    }
  }), i = function () {
    var e = new r();
    this.promise = e, this.resolve = u(B, e, 1), this.reject = u(D, e, 1);
  }, b.f = k = function (e) {
    return e === I || e === s ? new i(e) : o(e);
  }), f(f.G + f.W + f.F * !N, {
    Promise: I
  }), n(26)(I, "Promise"), n(63)("Promise"), s = n(19).Promise, f(f.S + f.F * !N, "Promise", {
    reject: function (e) {
      var t = k(this);
      return (0, t.reject)(e), t.promise;
    }
  }), f(f.S + f.F * (a || !N), "Promise", {
    resolve: function (e) {
      return S(a && this === s ? I : this, e);
    }
  }), f(f.S + f.F * !(N && n(41)(function (e) {
    I.all(e).catch(A);
  })), "Promise", {
    all: function (e) {
      var t = this,
          n = k(t),
          r = n.resolve,
          o = n.reject,
          i = w(function () {
        var n = [],
            i = 0,
            s = 1;
        m(e, !1, function (e) {
          var a = i++,
              c = !1;
          n.push(void 0), s++, t.resolve(e).then(function (e) {
            c || (c = !0, n[a] = e, --s || r(n));
          }, o);
        }), --s || r(n);
      });
      return i.e && o(i.v), n.promise;
    },
    race: function (e) {
      var t = this,
          n = k(t),
          r = n.reject,
          o = w(function () {
        m(e, !1, function (e) {
          t.resolve(e).then(n.resolve, r);
        });
      });
      return o.e && r(o.v), n.promise;
    }
  });
}, function (e, t, n) {
  var r = n(55)("wks"),
      o = n(24),
      i = n(4).Symbol,
      s = "function" == typeof i;
  (e.exports = function (e) {
    return r[e] || (r[e] = s && i[e] || (s ? i : o)("Symbol." + e));
  }).store = r;
}, function (e, t) {
  var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  "number" == typeof __g && (__g = n);
}, function (e, t) {
  e.exports = require$$1__default['default'];
}, function (e, t) {
  e.exports = function (e) {
    return "object" == typeof e ? null !== e : "function" == typeof e;
  };
}, function (e, t, n) {
  var r = n(6);

  e.exports = function (e) {
    if (!r(e)) throw TypeError(e + " is not an object!");
    return e;
  };
}, function (e, t, n) {
  var r = n(4),
      o = n(19),
      i = n(13),
      s = n(14),
      a = n(12),
      c = function (e, t, n) {
    var u,
        l,
        f,
        p,
        h = e & c.F,
        d = e & c.G,
        m = e & c.S,
        g = e & c.P,
        v = e & c.B,
        y = d ? r : m ? r[t] || (r[t] = {}) : (r[t] || {}).prototype,
        b = d ? o : o[t] || (o[t] = {}),
        w = b.prototype || (b.prototype = {});

    for (u in d && (n = t), n) f = ((l = !h && y && void 0 !== y[u]) ? y : n)[u], p = v && l ? a(f, r) : g && "function" == typeof f ? a(Function.call, f) : f, y && s(y, u, f, e & c.U), b[u] != f && i(b, u, p), g && w[u] != f && (w[u] = f);
  };

  r.core = o, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
}, function (e, t, n) {
  e.exports = !n(10)(function () {
    return 7 != Object.defineProperty({}, "a", {
      get: function () {
        return 7;
      }
    }).a;
  });
}, function (e, t) {
  e.exports = function (e) {
    try {
      return !!e();
    } catch (e) {
      return !0;
    }
  };
}, function (e, t, n) {
  var r = n(7),
      o = n(50),
      i = n(51),
      s = Object.defineProperty;
  t.f = n(9) ? Object.defineProperty : function (e, t, n) {
    if (r(e), t = i(t, !0), r(n), o) try {
      return s(e, t, n);
    } catch (e) {}
    if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
    return "value" in n && (e[t] = n.value), e;
  };
}, function (e, t, n) {
  var r = n(20);

  e.exports = function (e, t, n) {
    if (r(e), void 0 === t) return e;

    switch (n) {
      case 1:
        return function (n) {
          return e.call(t, n);
        };

      case 2:
        return function (n, r) {
          return e.call(t, n, r);
        };

      case 3:
        return function (n, r, o) {
          return e.call(t, n, r, o);
        };
    }

    return function () {
      return e.apply(t, arguments);
    };
  };
}, function (e, t, n) {
  var r = n(11),
      o = n(23);
  e.exports = n(9) ? function (e, t, n) {
    return r.f(e, t, o(1, n));
  } : function (e, t, n) {
    return e[t] = n, e;
  };
}, function (e, t, n) {
  var r = n(4),
      o = n(13),
      i = n(15),
      s = n(24)("src"),
      a = Function.toString,
      c = ("" + a).split("toString");
  n(19).inspectSource = function (e) {
    return a.call(e);
  }, (e.exports = function (e, t, n, a) {
    var u = "function" == typeof n;
    u && (i(n, "name") || o(n, "name", t)), e[t] !== n && (u && (i(n, s) || o(n, s, e[t] ? "" + e[t] : c.join(String(t)))), e === r ? e[t] = n : a ? e[t] ? e[t] = n : o(e, t, n) : (delete e[t], o(e, t, n)));
  })(Function.prototype, "toString", function () {
    return "function" == typeof this && this[s] || a.call(this);
  });
}, function (e, t) {
  var n = {}.hasOwnProperty;

  e.exports = function (e, t) {
    return n.call(e, t);
  };
}, function (e, t, n) {
  n(28)("match", 1, function (e, t, n) {
    return [function (n) {

      var r = e(this),
          o = null == n ? void 0 : n[t];
      return void 0 !== o ? o.call(n, r) : new RegExp(n)[t](String(r));
    }, n];
  });
}, function (e, t, n) {
  n(28)("split", 2, function (e, t, r) {

    var o = n(92),
        i = r,
        s = [].push;

    if ("c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length) {
      var a = void 0 === /()??/.exec("")[1];

      r = function (e, t) {
        var n = String(this);
        if (void 0 === e && 0 === t) return [];
        if (!o(e)) return i.call(n, e, t);
        var r,
            c,
            u,
            l,
            f,
            p = [],
            h = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
            d = 0,
            m = void 0 === t ? 4294967295 : t >>> 0,
            g = new RegExp(e.source, h + "g");

        for (a || (r = new RegExp("^" + g.source + "$(?!\\s)", h)); (c = g.exec(n)) && !((u = c.index + c[0].length) > d && (p.push(n.slice(d, c.index)), !a && c.length > 1 && c[0].replace(r, function () {
          for (f = 1; f < arguments.length - 2; f++) void 0 === arguments[f] && (c[f] = void 0);
        }), c.length > 1 && c.index < n.length && s.apply(p, c.slice(1)), l = c[0].length, d = u, p.length >= m));) g.lastIndex === c.index && g.lastIndex++;

        return d === n.length ? !l && g.test("") || p.push("") : p.push(n.slice(d)), p.length > m ? p.slice(0, m) : p;
      };
    } else "0".split(void 0, 0).length && (r = function (e, t) {
      return void 0 === e && 0 === t ? [] : i.call(this, e, t);
    });

    return [function (n, o) {
      var i = e(this),
          s = null == n ? void 0 : n[t];
      return void 0 !== s ? s.call(n, i, o) : r.call(String(i), n, o);
    }, r];
  });
}, function (e, t) {
  e.exports = os__default['default'];
}, function (e, t) {
  var n = e.exports = {
    version: "2.5.7"
  };
  "number" == typeof __e && (__e = n);
}, function (e, t) {
  e.exports = function (e) {
    if ("function" != typeof e) throw TypeError(e + " is not a function!");
    return e;
  };
}, function (e, t) {
  var n = {}.toString;

  e.exports = function (e) {
    return n.call(e).slice(8, -1);
  };
}, function (e, t, n) {
  var r = n(8);
  r(r.S + r.F, "Object", {
    assign: n(88)
  });
}, function (e, t) {
  e.exports = function (e, t) {
    return {
      enumerable: !(1 & e),
      configurable: !(2 & e),
      writable: !(4 & e),
      value: t
    };
  };
}, function (e, t) {
  var n = 0,
      r = Math.random();

  e.exports = function (e) {
    return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36));
  };
}, function (e, t, n) {
  var r = n(53),
      o = n(34);

  e.exports = function (e) {
    return r(o(e));
  };
}, function (e, t, n) {
  var r = n(11).f,
      o = n(15),
      i = n(3)("toStringTag");

  e.exports = function (e, t, n) {
    e && !o(e = n ? e : e.prototype, i) && r(e, i, {
      configurable: !0,
      value: t
    });
  };
}, function (e, t, n) {
  n(28)("replace", 2, function (e, t, n) {
    return [function (r, o) {

      var i = e(this),
          s = null == r ? void 0 : r[t];
      return void 0 !== s ? s.call(r, i, o) : n.call(String(i), r, o);
    }, n];
  });
}, function (e, t, n) {

  var r = n(13),
      o = n(14),
      i = n(10),
      s = n(34),
      a = n(3);

  e.exports = function (e, t, n) {
    var c = a(e),
        u = n(s, c, ""[e]),
        l = u[0],
        f = u[1];
    i(function () {
      var t = {};
      return t[c] = function () {
        return 7;
      }, 7 != ""[e](t);
    }) && (o(String.prototype, e, l), r(RegExp.prototype, c, 2 == t ? function (e, t) {
      return f.call(e, this, t);
    } : function (e) {
      return f.call(e, this);
    }));
  };
}, function (e, t, n) {
  var r = n(34);

  e.exports = function (e) {
    return Object(r(e));
  };
}, function (e, t) {
  e.exports = require$$3__default['default'];
}, function (e, t, n) {
  var r = n(70);

  function o(e) {
    var t = function () {
      return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
    };

    return t.called = !1, t;
  }

  function i(e) {
    var t = function () {
      if (t.called) throw new Error(t.onceError);
      return t.called = !0, t.value = e.apply(this, arguments);
    },
        n = e.name || "Function wrapped with `once`";

    return t.onceError = n + " shouldn't be called more than once", t.called = !1, t;
  }

  e.exports = r(o), e.exports.strict = r(i), o.proto = o(function () {
    Object.defineProperty(Function.prototype, "once", {
      value: function () {
        return o(this);
      },
      configurable: !0
    }), Object.defineProperty(Function.prototype, "onceStrict", {
      value: function () {
        return i(this);
      },
      configurable: !0
    });
  });
}, function (e, t, n) {

  var r = n(8),
      o = n(52)(!0);
  r(r.P, "Array", {
    includes: function (e) {
      return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
    }
  }), n(80)("includes");
}, function (e, t, n) {
  var r = n(6),
      o = n(4).document,
      i = r(o) && r(o.createElement);

  e.exports = function (e) {
    return i ? o.createElement(e) : {};
  };
}, function (e, t) {
  e.exports = function (e) {
    if (null == e) throw TypeError("Can't call method on  " + e);
    return e;
  };
}, function (e, t, n) {
  var r = n(54),
      o = Math.min;

  e.exports = function (e) {
    return e > 0 ? o(r(e), 9007199254740991) : 0;
  };
}, function (e, t) {
  e.exports = !1;
}, function (e, t) {
  e.exports = function (e, t, n, r) {
    if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
    return e;
  };
}, function (e, t, n) {
  var r = n(12),
      o = n(57),
      i = n(58),
      s = n(7),
      a = n(35),
      c = n(59),
      u = {},
      l = {};
  (t = e.exports = function (e, t, n, f, p) {
    var h,
        d,
        m,
        g,
        v = p ? function () {
      return e;
    } : c(e),
        y = r(n, f, t ? 2 : 1),
        b = 0;
    if ("function" != typeof v) throw TypeError(e + " is not iterable!");

    if (i(v)) {
      for (h = a(e.length); h > b; b++) if ((g = t ? y(s(d = e[b])[0], d[1]) : y(e[b])) === u || g === l) return g;
    } else for (m = v.call(e); !(d = m.next()).done;) if ((g = o(m, y, d.value, t)) === u || g === l) return g;
  }).BREAK = u, t.RETURN = l;
}, function (e, t) {
  e.exports = {};
}, function (e, t, n) {
  var r = n(14);

  e.exports = function (e, t, n) {
    for (var o in t) r(e, o, t[o], n);

    return e;
  };
}, function (e, t, n) {
  var r = n(3)("iterator"),
      o = !1;

  try {
    var i = [7][r]();
    i.return = function () {
      o = !0;
    }, Array.from(i, function () {
      throw 2;
    });
  } catch (e) {}

  e.exports = function (e, t) {
    if (!t && !o) return !1;
    var n = !1;

    try {
      var i = [7],
          s = i[r]();
      s.next = function () {
        return {
          done: n = !0
        };
      }, i[r] = function () {
        return s;
      }, e(i);
    } catch (e) {}

    return n;
  };
}, function (e, t, n) {
  var r = n(87),
      o = n(66);

  e.exports = Object.keys || function (e) {
    return r(e, o);
  };
}, function (e, t, n) {
  var r = n(55)("keys"),
      o = n(24);

  e.exports = function (e) {
    return r[e] || (r[e] = o(e));
  };
}, function (e, t) {
  t.f = {}.propertyIsEnumerable;
}, function (e, t, n) {
  e.exports = b;
  var r = n(5),
      o = n(67),
      i = n(46),
      s = (n(97)),
      a = n(68).EventEmitter,
      c = n(0),
      u = n(47),
      l = n(48),
      f = n(99),
      p = n(69),
      h = (p.setopts),
      d = p.ownProp,
      m = n(100),
      g = (n(30), p.childrenIgnored),
      v = p.isIgnored,
      y = n(31);

  function b(e, t, n) {
    if ("function" == typeof t && (n = t, t = {}), t || (t = {}), t.sync) {
      if (n) throw new TypeError("callback provided to sync glob");
      return f(e, t);
    }

    return new x(e, t, n);
  }

  b.sync = f;
  var w = b.GlobSync = f.GlobSync;

  function x(e, t, n) {
    if ("function" == typeof t && (n = t, t = null), t && t.sync) {
      if (n) throw new TypeError("callback provided to sync glob");
      return new w(e, t);
    }

    if (!(this instanceof x)) return new x(e, t, n);
    h(this, e, t), this._didRealPath = !1;
    var r = this.minimatch.set.length;
    this.matches = new Array(r), "function" == typeof n && (n = y(n), this.on("error", n), this.on("end", function (e) {
      n(null, e);
    }));
    var o = this;
    if (this._processing = 0, this._emitQueue = [], this._processQueue = [], this.paused = !1, this.noprocess) return this;
    if (0 === r) return a();

    for (var i = !0, s = 0; s < r; s++) this._process(this.minimatch.set[s], s, !1, a);

    function a() {
      --o._processing, o._processing <= 0 && (i ? process.nextTick(function () {
        o._finish();
      }) : o._finish());
    }

    i = !1;
  }

  b.glob = b, b.hasMagic = function (e, t) {
    var n = function (e, t) {
      if (null === t || "object" != typeof t) return e;

      for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];

      return e;
    }({}, t);

    n.noprocess = !0;
    var r = new x(e, n).minimatch.set;
    if (!e) return !1;
    if (r.length > 1) return !0;

    for (var o = 0; o < r[0].length; o++) if ("string" != typeof r[0][o]) return !0;

    return !1;
  }, b.Glob = x, s(x, a), x.prototype._finish = function () {
    if (u(this instanceof x), !this.aborted) {
      if (this.realpath && !this._didRealpath) return this._realpath();
      p.finish(this), this.emit("end", this.found);
    }
  }, x.prototype._realpath = function () {
    if (!this._didRealpath) {
      this._didRealpath = !0;
      var e = this.matches.length;
      if (0 === e) return this._finish();

      for (var t = this, n = 0; n < this.matches.length; n++) this._realpathSet(n, r);
    }

    function r() {
      0 == --e && t._finish();
    }
  }, x.prototype._realpathSet = function (e, t) {
    var n = this.matches[e];
    if (!n) return t();
    var r = Object.keys(n),
        i = this,
        s = r.length;
    if (0 === s) return t();
    var a = this.matches[e] = Object.create(null);
    r.forEach(function (n, r) {
      n = i._makeAbs(n), o.realpath(n, i.realpathCache, function (r, o) {
        r ? "stat" === r.syscall ? a[n] = !0 : i.emit("error", r) : a[o] = !0, 0 == --s && (i.matches[e] = a, t());
      });
    });
  }, x.prototype._mark = function (e) {
    return p.mark(this, e);
  }, x.prototype._makeAbs = function (e) {
    return p.makeAbs(this, e);
  }, x.prototype.abort = function () {
    this.aborted = !0, this.emit("abort");
  }, x.prototype.pause = function () {
    this.paused || (this.paused = !0, this.emit("pause"));
  }, x.prototype.resume = function () {
    if (this.paused) {
      if (this.emit("resume"), this.paused = !1, this._emitQueue.length) {
        var e = this._emitQueue.slice(0);

        this._emitQueue.length = 0;

        for (var t = 0; t < e.length; t++) {
          var n = e[t];

          this._emitMatch(n[0], n[1]);
        }
      }

      if (this._processQueue.length) {
        var r = this._processQueue.slice(0);

        this._processQueue.length = 0;

        for (t = 0; t < r.length; t++) {
          var o = r[t];
          this._processing--, this._process(o[0], o[1], o[2], o[3]);
        }
      }
    }
  }, x.prototype._process = function (e, t, n, r) {
    if (u(this instanceof x), u("function" == typeof r), !this.aborted) if (this._processing++, this.paused) this._processQueue.push([e, t, n, r]);else {
      for (var o, s = 0; "string" == typeof e[s];) s++;

      switch (s) {
        case e.length:
          return void this._processSimple(e.join("/"), t, r);

        case 0:
          o = null;
          break;

        default:
          o = e.slice(0, s).join("/");
      }

      var a,
          c = e.slice(s);
      null === o ? a = "." : l(o) || l(e.join("/")) ? (o && l(o) || (o = "/" + o), a = o) : a = o;

      var f = this._makeAbs(a);

      if (g(this, a)) return r();
      c[0] === i.GLOBSTAR ? this._processGlobStar(o, a, f, c, t, n, r) : this._processReaddir(o, a, f, c, t, n, r);
    }
  }, x.prototype._processReaddir = function (e, t, n, r, o, i, s) {
    var a = this;

    this._readdir(n, i, function (c, u) {
      return a._processReaddir2(e, t, n, r, o, i, u, s);
    });
  }, x.prototype._processReaddir2 = function (e, t, n, r, o, i, s, a) {
    if (!s) return a();

    for (var u = r[0], l = !!this.minimatch.negate, f = u._glob, p = this.dot || "." === f.charAt(0), h = [], d = 0; d < s.length; d++) {
      if ("." !== (g = s[d]).charAt(0) || p) (l && !e ? !g.match(u) : g.match(u)) && h.push(g);
    }

    var m = h.length;
    if (0 === m) return a();

    if (1 === r.length && !this.mark && !this.stat) {
      this.matches[o] || (this.matches[o] = Object.create(null));

      for (d = 0; d < m; d++) {
        var g = h[d];
        e && (g = "/" !== e ? e + "/" + g : e + g), "/" !== g.charAt(0) || this.nomount || (g = c.join(this.root, g)), this._emitMatch(o, g);
      }

      return a();
    }

    r.shift();

    for (d = 0; d < m; d++) {
      g = h[d];
      e && (g = "/" !== e ? e + "/" + g : e + g), this._process([g].concat(r), o, i, a);
    }

    a();
  }, x.prototype._emitMatch = function (e, t) {
    if (!this.aborted && !v(this, t)) if (this.paused) this._emitQueue.push([e, t]);else {
      var n = l(t) ? t : this._makeAbs(t);

      if (this.mark && (t = this._mark(t)), this.absolute && (t = n), !this.matches[e][t]) {
        if (this.nodir) {
          var r = this.cache[n];
          if ("DIR" === r || Array.isArray(r)) return;
        }

        this.matches[e][t] = !0;
        var o = this.statCache[n];
        o && this.emit("stat", t, o), this.emit("match", t);
      }
    }
  }, x.prototype._readdirInGlobStar = function (e, t) {
    if (!this.aborted) {
      if (this.follow) return this._readdir(e, !1, t);
      var n = this,
          o = m("lstat\0" + e, function (r, o) {
        if (r && "ENOENT" === r.code) return t();
        var i = o && o.isSymbolicLink();
        n.symlinks[e] = i, i || !o || o.isDirectory() ? n._readdir(e, !1, t) : (n.cache[e] = "FILE", t());
      });
      o && r.lstat(e, o);
    }
  }, x.prototype._readdir = function (e, t, n) {
    if (!this.aborted && (n = m("readdir\0" + e + "\0" + t, n))) {
      if (t && !d(this.symlinks, e)) return this._readdirInGlobStar(e, n);

      if (d(this.cache, e)) {
        var o = this.cache[e];
        if (!o || "FILE" === o) return n();
        if (Array.isArray(o)) return n(null, o);
      }

      r.readdir(e, function (e, t, n) {
        return function (r, o) {
          r ? e._readdirError(t, r, n) : e._readdirEntries(t, o, n);
        };
      }(this, e, n));
    }
  }, x.prototype._readdirEntries = function (e, t, n) {
    if (!this.aborted) {
      if (!this.mark && !this.stat) for (var r = 0; r < t.length; r++) {
        var o = t[r];
        o = "/" === e ? e + o : e + "/" + o, this.cache[o] = !0;
      }
      return this.cache[e] = t, n(null, t);
    }
  }, x.prototype._readdirError = function (e, t, n) {
    if (!this.aborted) {
      switch (t.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var r = this._makeAbs(e);

          if (this.cache[r] = "FILE", r === this.cwdAbs) {
            var o = new Error(t.code + " invalid cwd " + this.cwd);
            o.path = this.cwd, o.code = t.code, this.emit("error", o), this.abort();
          }

          break;

        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(e)] = !1;
          break;

        default:
          this.cache[this._makeAbs(e)] = !1, this.strict && (this.emit("error", t), this.abort()), this.silent || console.error("glob error", t);
      }

      return n();
    }
  }, x.prototype._processGlobStar = function (e, t, n, r, o, i, s) {
    var a = this;

    this._readdir(n, i, function (c, u) {
      a._processGlobStar2(e, t, n, r, o, i, u, s);
    });
  }, x.prototype._processGlobStar2 = function (e, t, n, r, o, i, s, a) {
    if (!s) return a();
    var c = r.slice(1),
        u = e ? [e] : [],
        l = u.concat(c);

    this._process(l, o, !1, a);

    var f = this.symlinks[n],
        p = s.length;
    if (f && i) return a();

    for (var h = 0; h < p; h++) {
      if ("." !== s[h].charAt(0) || this.dot) {
        var d = u.concat(s[h], c);

        this._process(d, o, !0, a);

        var m = u.concat(s[h], r);

        this._process(m, o, !0, a);
      }
    }

    a();
  }, x.prototype._processSimple = function (e, t, n) {
    var r = this;

    this._stat(e, function (o, i) {
      r._processSimple2(e, t, o, i, n);
    });
  }, x.prototype._processSimple2 = function (e, t, n, r, o) {
    if (this.matches[t] || (this.matches[t] = Object.create(null)), !r) return o();

    if (e && l(e) && !this.nomount) {
      var i = /[\/\\]$/.test(e);
      "/" === e.charAt(0) ? e = c.join(this.root, e) : (e = c.resolve(this.root, e), i && (e += "/"));
    }

    "win32" === process.platform && (e = e.replace(/\\/g, "/")), this._emitMatch(t, e), o();
  }, x.prototype._stat = function (e, t) {
    var n = this._makeAbs(e),
        o = "/" === e.slice(-1);

    if (e.length > this.maxLength) return t();

    if (!this.stat && d(this.cache, n)) {
      var i = this.cache[n];
      if (Array.isArray(i) && (i = "DIR"), !o || "DIR" === i) return t(null, i);
      if (o && "FILE" === i) return t();
    }

    var s = this.statCache[n];

    if (void 0 !== s) {
      if (!1 === s) return t(null, s);
      var a = s.isDirectory() ? "DIR" : "FILE";
      return o && "FILE" === a ? t() : t(null, a, s);
    }

    var c = this,
        u = m("stat\0" + n, function (o, i) {
      if (i && i.isSymbolicLink()) return r.stat(n, function (r, o) {
        r ? c._stat2(e, n, null, i, t) : c._stat2(e, n, r, o, t);
      });

      c._stat2(e, n, o, i, t);
    });
    u && r.lstat(n, u);
  }, x.prototype._stat2 = function (e, t, n, r, o) {
    if (n && ("ENOENT" === n.code || "ENOTDIR" === n.code)) return this.statCache[t] = !1, o();
    var i = "/" === e.slice(-1);
    if (this.statCache[t] = r, "/" === t.slice(-1) && r && !r.isDirectory()) return o(null, !1, r);
    var s = !0;
    return r && (s = r.isDirectory() ? "DIR" : "FILE"), this.cache[t] = this.cache[t] || s, i && "FILE" === s ? o() : o(null, s, r);
  };
}, function (e, t, n) {
  e.exports = d, d.Minimatch = m;
  var r = {
    sep: "/"
  };

  try {
    r = n(0);
  } catch (e) {}

  var o = d.GLOBSTAR = m.GLOBSTAR = {},
      i = n(94),
      s = {
    "!": {
      open: "(?:(?!(?:",
      close: "))[^/]*?)"
    },
    "?": {
      open: "(?:",
      close: ")?"
    },
    "+": {
      open: "(?:",
      close: ")+"
    },
    "*": {
      open: "(?:",
      close: ")*"
    },
    "@": {
      open: "(?:",
      close: ")"
    }
  },
      a = "[^/]",
      c = a + "*?",
      u = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
      l = "(?:(?!(?:\\/|^)\\.).)*?",
      f = "().*{}+?[]^$\\!".split("").reduce(function (e, t) {
    return e[t] = !0, e;
  }, {});
  var p = /\/+/;

  function h(e, t) {
    e = e || {}, t = t || {};
    var n = {};
    return Object.keys(t).forEach(function (e) {
      n[e] = t[e];
    }), Object.keys(e).forEach(function (t) {
      n[t] = e[t];
    }), n;
  }

  function d(e, t, n) {
    if ("string" != typeof t) throw new TypeError("glob pattern string required");
    return n || (n = {}), !(!n.nocomment && "#" === t.charAt(0)) && ("" === t.trim() ? "" === e : new m(t, n).match(e));
  }

  function m(e, t) {
    if (!(this instanceof m)) return new m(e, t);
    if ("string" != typeof e) throw new TypeError("glob pattern string required");
    t || (t = {}), e = e.trim(), "/" !== r.sep && (e = e.split(r.sep).join("/")), this.options = t, this.set = [], this.pattern = e, this.regexp = null, this.negate = !1, this.comment = !1, this.empty = !1, this.make();
  }

  function g(e, t) {
    if (t || (t = this instanceof m ? this.options : {}), void 0 === (e = void 0 === e ? this.pattern : e)) throw new TypeError("undefined pattern");
    return t.nobrace || !e.match(/\{.*\}/) ? [e] : i(e);
  }

  d.filter = function (e, t) {
    return t = t || {}, function (n, r, o) {
      return d(n, e, t);
    };
  }, d.defaults = function (e) {
    if (!e || !Object.keys(e).length) return d;

    var t = d,
        n = function (n, r, o) {
      return t.minimatch(n, r, h(e, o));
    };

    return n.Minimatch = function (n, r) {
      return new t.Minimatch(n, h(e, r));
    }, n;
  }, m.defaults = function (e) {
    return e && Object.keys(e).length ? d.defaults(e).Minimatch : m;
  }, m.prototype.debug = function () {}, m.prototype.make = function () {
    if (this._made) return;
    var e = this.pattern,
        t = this.options;
    if (!t.nocomment && "#" === e.charAt(0)) return void (this.comment = !0);
    if (!e) return void (this.empty = !0);
    this.parseNegate();
    var n = this.globSet = this.braceExpand();
    t.debug && (this.debug = console.error);
    this.debug(this.pattern, n), n = this.globParts = n.map(function (e) {
      return e.split(p);
    }), this.debug(this.pattern, n), n = n.map(function (e, t, n) {
      return e.map(this.parse, this);
    }, this), this.debug(this.pattern, n), n = n.filter(function (e) {
      return -1 === e.indexOf(!1);
    }), this.debug(this.pattern, n), this.set = n;
  }, m.prototype.parseNegate = function () {
    var e = this.pattern,
        t = !1,
        n = this.options,
        r = 0;
    if (n.nonegate) return;

    for (var o = 0, i = e.length; o < i && "!" === e.charAt(o); o++) t = !t, r++;

    r && (this.pattern = e.substr(r));
    this.negate = t;
  }, d.braceExpand = function (e, t) {
    return g(e, t);
  }, m.prototype.braceExpand = g, m.prototype.parse = function (e, t) {
    if (e.length > 65536) throw new TypeError("pattern is too long");
    var n = this.options;
    if (!n.noglobstar && "**" === e) return o;
    if ("" === e) return "";
    var r,
        i = "",
        u = !!n.nocase,
        l = !1,
        p = [],
        h = [],
        d = !1,
        m = -1,
        g = -1,
        y = "." === e.charAt(0) ? "" : n.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)",
        b = this;

    function w() {
      if (r) {
        switch (r) {
          case "*":
            i += c, u = !0;
            break;

          case "?":
            i += a, u = !0;
            break;

          default:
            i += "\\" + r;
        }

        b.debug("clearStateChar %j %j", r, i), r = !1;
      }
    }

    for (var x, S = 0, P = e.length; S < P && (x = e.charAt(S)); S++) if (this.debug("%s\t%s %s %j", e, S, i, x), l && f[x]) i += "\\" + x, l = !1;else switch (x) {
      case "/":
        return !1;

      case "\\":
        w(), l = !0;
        continue;

      case "?":
      case "*":
      case "+":
      case "@":
      case "!":
        if (this.debug("%s\t%s %s %j <-- stateChar", e, S, i, x), d) {
          this.debug("  in class"), "!" === x && S === g + 1 && (x = "^"), i += x;
          continue;
        }

        b.debug("call clearStateChar %j", r), w(), r = x, n.noext && w();
        continue;

      case "(":
        if (d) {
          i += "(";
          continue;
        }

        if (!r) {
          i += "\\(";
          continue;
        }

        p.push({
          type: r,
          start: S - 1,
          reStart: i.length,
          open: s[r].open,
          close: s[r].close
        }), i += "!" === r ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", r, i), r = !1;
        continue;

      case ")":
        if (d || !p.length) {
          i += "\\)";
          continue;
        }

        w(), u = !0;
        var O = p.pop();
        i += O.close, "!" === O.type && h.push(O), O.reEnd = i.length;
        continue;

      case "|":
        if (d || !p.length || l) {
          i += "\\|", l = !1;
          continue;
        }

        w(), i += "|";
        continue;

      case "[":
        if (w(), d) {
          i += "\\" + x;
          continue;
        }

        d = !0, g = S, m = i.length, i += x;
        continue;

      case "]":
        if (S === g + 1 || !d) {
          i += "\\" + x, l = !1;
          continue;
        }

        if (d) {
          var E = e.substring(g + 1, S);

          try {
            RegExp("[" + E + "]");
          } catch (e) {
            var _ = this.parse(E, v);

            i = i.substr(0, m) + "\\[" + _[0] + "\\]", u = u || _[1], d = !1;
            continue;
          }
        }

        u = !0, d = !1, i += x;
        continue;

      default:
        w(), l ? l = !1 : !f[x] || "^" === x && d || (i += "\\"), i += x;
    }

    d && (E = e.substr(g + 1), _ = this.parse(E, v), i = i.substr(0, m) + "\\[" + _[0], u = u || _[1]);

    for (O = p.pop(); O; O = p.pop()) {
      var I = i.slice(O.reStart + O.open.length);
      this.debug("setting tail", i, O), I = I.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (e, t, n) {
        return n || (n = "\\"), t + t + n + "|";
      }), this.debug("tail=%j\n   %s", I, I, O, i);
      var j = "*" === O.type ? c : "?" === O.type ? a : "\\" + O.type;
      u = !0, i = i.slice(0, O.reStart) + j + "\\(" + I;
    }

    w(), l && (i += "\\\\");
    var A = !1;

    switch (i.charAt(0)) {
      case ".":
      case "[":
      case "(":
        A = !0;
    }

    for (var k = h.length - 1; k > -1; k--) {
      var N = h[k],
          F = i.slice(0, N.reStart),
          C = i.slice(N.reStart, N.reEnd - 8),
          M = i.slice(N.reEnd - 8, N.reEnd),
          T = i.slice(N.reEnd);
      M += T;
      var V = F.split("(").length - 1,
          D = T;

      for (S = 0; S < V; S++) D = D.replace(/\)[+*?]?/, "");

      var B = "";
      "" === (T = D) && t !== v && (B = "$");
      var $ = F + C + T + B + M;
      i = $;
    }

    "" !== i && u && (i = "(?=.)" + i);
    A && (i = y + i);
    if (t === v) return [i, u];
    if (!u) return e.replace(/\\(.)/g, "$1");
    var L = n.nocase ? "i" : "";

    try {
      var R = new RegExp("^" + i + "$", L);
    } catch (e) {
      return new RegExp("$.");
    }

    return R._glob = e, R._src = i, R;
  };
  var v = {};
  d.makeRe = function (e, t) {
    return new m(e, t || {}).makeRe();
  }, m.prototype.makeRe = function () {
    if (this.regexp || !1 === this.regexp) return this.regexp;
    var e = this.set;
    if (!e.length) return this.regexp = !1, this.regexp;
    var t = this.options,
        n = t.noglobstar ? c : t.dot ? u : l,
        r = t.nocase ? "i" : "",
        i = e.map(function (e) {
      return e.map(function (e) {
        return e === o ? n : "string" == typeof e ? e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : e._src;
      }).join("\\/");
    }).join("|");
    i = "^(?:" + i + ")$", this.negate && (i = "^(?!" + i + ").*$");

    try {
      this.regexp = new RegExp(i, r);
    } catch (e) {
      this.regexp = !1;
    }

    return this.regexp;
  }, d.match = function (e, t, n) {
    var r = new m(t, n = n || {});
    return e = e.filter(function (e) {
      return r.match(e);
    }), r.options.nonull && !e.length && e.push(t), e;
  }, m.prototype.match = function (e, t) {
    if (this.debug("match", e, this.pattern), this.comment) return !1;
    if (this.empty) return "" === e;
    if ("/" === e && t) return !0;
    var n = this.options;
    "/" !== r.sep && (e = e.split(r.sep).join("/"));
    e = e.split(p), this.debug(this.pattern, "split", e);
    var o,
        i,
        s = this.set;

    for (this.debug(this.pattern, "set", s), i = e.length - 1; i >= 0 && !(o = e[i]); i--);

    for (i = 0; i < s.length; i++) {
      var a = s[i],
          c = e;
      n.matchBase && 1 === a.length && (c = [o]);
      var u = this.matchOne(c, a, t);
      if (u) return !!n.flipNegate || !this.negate;
    }

    return !n.flipNegate && this.negate;
  }, m.prototype.matchOne = function (e, t, n) {
    var r = this.options;
    this.debug("matchOne", {
      this: this,
      file: e,
      pattern: t
    }), this.debug("matchOne", e.length, t.length);

    for (var i = 0, s = 0, a = e.length, c = t.length; i < a && s < c; i++, s++) {
      this.debug("matchOne loop");
      var u,
          l = t[s],
          f = e[i];
      if (this.debug(t, l, f), !1 === l) return !1;

      if (l === o) {
        this.debug("GLOBSTAR", [t, l, f]);
        var p = i,
            h = s + 1;

        if (h === c) {
          for (this.debug("** at the end"); i < a; i++) if ("." === e[i] || ".." === e[i] || !r.dot && "." === e[i].charAt(0)) return !1;

          return !0;
        }

        for (; p < a;) {
          var d = e[p];
          if (this.debug("\nglobstar while", e, p, t, h, d), this.matchOne(e.slice(p), t.slice(h), n)) return this.debug("globstar found match!", p, a, d), !0;

          if ("." === d || ".." === d || !r.dot && "." === d.charAt(0)) {
            this.debug("dot detected!", e, p, t, h);
            break;
          }

          this.debug("globstar swallow a segment, and continue"), p++;
        }

        return !(!n || (this.debug("\n>>> no match, partial?", e, p, t, h), p !== a));
      }

      if ("string" == typeof l ? (u = r.nocase ? f.toLowerCase() === l.toLowerCase() : f === l, this.debug("string match", l, f, u)) : (u = f.match(l), this.debug("pattern match", l, f, u)), !u) return !1;
    }

    if (i === a && s === c) return !0;
    if (i === a) return n;
    if (s === c) return i === a - 1 && "" === e[i];
    throw new Error("wtf?");
  };
}, function (e, t) {
  e.exports = require$$4__default['default'];
}, function (e, t, n) {

  function r(e) {
    return "/" === e.charAt(0);
  }

  function o(e) {
    var t = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/.exec(e),
        n = t[1] || "",
        r = Boolean(n && ":" !== n.charAt(1));
    return Boolean(t[2] || r);
  }

  e.exports = "win32" === process.platform ? o : r, e.exports.posix = r, e.exports.win32 = o;
}, function (e, t) {
  e.exports = require$$5__default['default'];
}, function (e, t, n) {
  e.exports = !n(9) && !n(10)(function () {
    return 7 != Object.defineProperty(n(33)("div"), "a", {
      get: function () {
        return 7;
      }
    }).a;
  });
}, function (e, t, n) {
  var r = n(6);

  e.exports = function (e, t) {
    if (!r(e)) return e;
    var n, o;
    if (t && "function" == typeof (n = e.toString) && !r(o = n.call(e))) return o;
    if ("function" == typeof (n = e.valueOf) && !r(o = n.call(e))) return o;
    if (!t && "function" == typeof (n = e.toString) && !r(o = n.call(e))) return o;
    throw TypeError("Can't convert object to primitive value");
  };
}, function (e, t, n) {
  var r = n(25),
      o = n(35),
      i = n(79);

  e.exports = function (e) {
    return function (t, n, s) {
      var a,
          c = r(t),
          u = o(c.length),
          l = i(s, u);

      if (e && n != n) {
        for (; u > l;) if ((a = c[l++]) != a) return !0;
      } else for (; u > l; l++) if ((e || l in c) && c[l] === n) return e || l || 0;

      return !e && -1;
    };
  };
}, function (e, t, n) {
  var r = n(21);
  e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
    return "String" == r(e) ? e.split("") : Object(e);
  };
}, function (e, t) {
  var n = Math.ceil,
      r = Math.floor;

  e.exports = function (e) {
    return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
  };
}, function (e, t, n) {
  var r = n(19),
      o = n(4),
      i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
  (e.exports = function (e, t) {
    return i[e] || (i[e] = void 0 !== t ? t : {});
  })("versions", []).push({
    version: r.version,
    mode: n(36) ? "pure" : "global",
    copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
  });
}, function (e, t, n) {
  var r = n(21),
      o = n(3)("toStringTag"),
      i = "Arguments" == r(function () {
    return arguments;
  }());

  e.exports = function (e) {
    var t, n, s;
    return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
      try {
        return e[t];
      } catch (e) {}
    }(t = Object(e), o)) ? n : i ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s;
  };
}, function (e, t, n) {
  var r = n(7);

  e.exports = function (e, t, n, o) {
    try {
      return o ? t(r(n)[0], n[1]) : t(n);
    } catch (t) {
      var i = e.return;
      throw void 0 !== i && r(i.call(e)), t;
    }
  };
}, function (e, t, n) {
  var r = n(39),
      o = n(3)("iterator"),
      i = Array.prototype;

  e.exports = function (e) {
    return void 0 !== e && (r.Array === e || i[o] === e);
  };
}, function (e, t, n) {
  var r = n(56),
      o = n(3)("iterator"),
      i = n(39);

  e.exports = n(19).getIteratorMethod = function (e) {
    if (null != e) return e[o] || e["@@iterator"] || i[r(e)];
  };
}, function (e, t, n) {
  var r,
      o,
      i,
      s = n(12),
      a = n(82),
      c = n(61),
      u = n(33),
      l = n(4),
      f = l.process,
      p = l.setImmediate,
      h = l.clearImmediate,
      d = l.MessageChannel,
      m = l.Dispatch,
      g = 0,
      v = {},
      y = function () {
    var e = +this;

    if (v.hasOwnProperty(e)) {
      var t = v[e];
      delete v[e], t();
    }
  },
      b = function (e) {
    y.call(e.data);
  };

  p && h || (p = function (e) {
    for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);

    return v[++g] = function () {
      a("function" == typeof e ? e : Function(e), t);
    }, r(g), g;
  }, h = function (e) {
    delete v[e];
  }, "process" == n(21)(f) ? r = function (e) {
    f.nextTick(s(y, e, 1));
  } : m && m.now ? r = function (e) {
    m.now(s(y, e, 1));
  } : d ? (i = (o = new d()).port2, o.port1.onmessage = b, r = s(i.postMessage, i, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function (e) {
    l.postMessage(e + "", "*");
  }, l.addEventListener("message", b, !1)) : r = "onreadystatechange" in u("script") ? function (e) {
    c.appendChild(u("script")).onreadystatechange = function () {
      c.removeChild(this), y.call(e);
    };
  } : function (e) {
    setTimeout(s(y, e, 1), 0);
  }), e.exports = {
    set: p,
    clear: h
  };
}, function (e, t, n) {
  var r = n(4).document;
  e.exports = r && r.documentElement;
}, function (e, t, n) {

  var r = n(20);

  function o(e) {
    var t, n;
    this.promise = new e(function (e, r) {
      if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
      t = e, n = r;
    }), this.resolve = r(t), this.reject = r(n);
  }

  e.exports.f = function (e) {
    return new o(e);
  };
}, function (e, t, n) {

  var r = n(4),
      o = n(11),
      i = n(9),
      s = n(3)("species");

  e.exports = function (e) {
    var t = r[e];
    i && t && !t[s] && o.f(t, s, {
      configurable: !0,
      get: function () {
        return this;
      }
    });
  };
}, function (e, t, n) {
  var r = n(8),
      o = n(65)(!0);
  r(r.S, "Object", {
    entries: function (e) {
      return o(e);
    }
  });
}, function (e, t, n) {
  var r = n(42),
      o = n(25),
      i = n(44).f;

  e.exports = function (e) {
    return function (t) {
      for (var n, s = o(t), a = r(s), c = a.length, u = 0, l = []; c > u;) i.call(s, n = a[u++]) && l.push(e ? [n, s[n]] : s[n]);

      return l;
    };
  };
}, function (e, t) {
  e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function (e, t, n) {
  e.exports = l, l.realpath = l, l.sync = f, l.realpathSync = f, l.monkeypatch = function () {
    r.realpath = l, r.realpathSync = f;
  }, l.unmonkeypatch = function () {
    r.realpath = o, r.realpathSync = i;
  };
  var r = n(5),
      o = r.realpath,
      i = r.realpathSync,
      s = process.version,
      a = /^v[0-5]\./.test(s),
      c = n(93);

  function u(e) {
    return e && "realpath" === e.syscall && ("ELOOP" === e.code || "ENOMEM" === e.code || "ENAMETOOLONG" === e.code);
  }

  function l(e, t, n) {
    if (a) return o(e, t, n);
    "function" == typeof t && (n = t, t = null), o(e, t, function (r, o) {
      u(r) ? c.realpath(e, t, n) : n(r, o);
    });
  }

  function f(e, t) {
    if (a) return i(e, t);

    try {
      return i(e, t);
    } catch (n) {
      if (u(n)) return c.realpathSync(e, t);
      throw n;
    }
  }
}, function (e, t) {
  e.exports = require$$6__default['default'];
}, function (e, t, n) {
  function r(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }

  t.alphasort = u, t.alphasorti = c, t.setopts = function (e, t, n) {
    n || (n = {});

    if (n.matchBase && -1 === t.indexOf("/")) {
      if (n.noglobstar) throw new Error("base matching requires globstar");
      t = "**/" + t;
    }

    e.silent = !!n.silent, e.pattern = t, e.strict = !1 !== n.strict, e.realpath = !!n.realpath, e.realpathCache = n.realpathCache || Object.create(null), e.follow = !!n.follow, e.dot = !!n.dot, e.mark = !!n.mark, e.nodir = !!n.nodir, e.nodir && (e.mark = !0);
    e.sync = !!n.sync, e.nounique = !!n.nounique, e.nonull = !!n.nonull, e.nosort = !!n.nosort, e.nocase = !!n.nocase, e.stat = !!n.stat, e.noprocess = !!n.noprocess, e.absolute = !!n.absolute, e.maxLength = n.maxLength || 1 / 0, e.cache = n.cache || Object.create(null), e.statCache = n.statCache || Object.create(null), e.symlinks = n.symlinks || Object.create(null), function (e, t) {
      e.ignore = t.ignore || [], Array.isArray(e.ignore) || (e.ignore = [e.ignore]);
      e.ignore.length && (e.ignore = e.ignore.map(l));
    }(e, n), e.changedCwd = !1;
    var i = process.cwd();
    r(n, "cwd") ? (e.cwd = o.resolve(n.cwd), e.changedCwd = e.cwd !== i) : e.cwd = i;
    e.root = n.root || o.resolve(e.cwd, "/"), e.root = o.resolve(e.root), "win32" === process.platform && (e.root = e.root.replace(/\\/g, "/"));
    e.cwdAbs = s(e.cwd) ? e.cwd : f(e, e.cwd), "win32" === process.platform && (e.cwdAbs = e.cwdAbs.replace(/\\/g, "/"));
    e.nomount = !!n.nomount, n.nonegate = !0, n.nocomment = !0, e.minimatch = new a(t, n), e.options = e.minimatch.options;
  }, t.ownProp = r, t.makeAbs = f, t.finish = function (e) {
    for (var t = e.nounique, n = t ? [] : Object.create(null), r = 0, o = e.matches.length; r < o; r++) {
      var i = e.matches[r];

      if (i && 0 !== Object.keys(i).length) {
        var s = Object.keys(i);
        t ? n.push.apply(n, s) : s.forEach(function (e) {
          n[e] = !0;
        });
      } else if (e.nonull) {
        var a = e.minimatch.globSet[r];
        t ? n.push(a) : n[a] = !0;
      }
    }

    t || (n = Object.keys(n));
    e.nosort || (n = n.sort(e.nocase ? c : u));

    if (e.mark) {
      for (var r = 0; r < n.length; r++) n[r] = e._mark(n[r]);

      e.nodir && (n = n.filter(function (t) {
        var n = !/\/$/.test(t),
            r = e.cache[t] || e.cache[f(e, t)];
        return n && r && (n = "DIR" !== r && !Array.isArray(r)), n;
      }));
    }

    e.ignore.length && (n = n.filter(function (t) {
      return !p(e, t);
    }));
    e.found = n;
  }, t.mark = function (e, t) {
    var n = f(e, t),
        r = e.cache[n],
        o = t;

    if (r) {
      var i = "DIR" === r || Array.isArray(r),
          s = "/" === t.slice(-1);

      if (i && !s ? o += "/" : !i && s && (o = o.slice(0, -1)), o !== t) {
        var a = f(e, o);
        e.statCache[a] = e.statCache[n], e.cache[a] = e.cache[n];
      }
    }

    return o;
  }, t.isIgnored = p, t.childrenIgnored = function (e, t) {
    return !!e.ignore.length && e.ignore.some(function (e) {
      return !(!e.gmatcher || !e.gmatcher.match(t));
    });
  };
  var o = n(0),
      i = n(46),
      s = n(48),
      a = i.Minimatch;

  function c(e, t) {
    return e.toLowerCase().localeCompare(t.toLowerCase());
  }

  function u(e, t) {
    return e.localeCompare(t);
  }

  function l(e) {
    var t = null;

    if ("/**" === e.slice(-3)) {
      var n = e.replace(/(\/\*\*)+$/, "");
      t = new a(n, {
        dot: !0
      });
    }

    return {
      matcher: new a(e, {
        dot: !0
      }),
      gmatcher: t
    };
  }

  function f(e, t) {
    var n = t;
    return n = "/" === t.charAt(0) ? o.join(e.root, t) : s(t) || "" === t ? t : e.changedCwd ? o.resolve(e.cwd, t) : o.resolve(t), "win32" === process.platform && (n = n.replace(/\\/g, "/")), n;
  }

  function p(e, t) {
    return !!e.ignore.length && e.ignore.some(function (e) {
      return e.matcher.match(t) || !(!e.gmatcher || !e.gmatcher.match(t));
    });
  }
}, function (e, t) {
  e.exports = function e(t, n) {
    if (t && n) return e(t)(n);
    if ("function" != typeof t) throw new TypeError("need wrapper function");
    Object.keys(t).forEach(function (e) {
      r[e] = t[e];
    });
    return r;

    function r() {
      for (var e = new Array(arguments.length), n = 0; n < e.length; n++) e[n] = arguments[n];

      var r = t.apply(this, e),
          o = e[e.length - 1];
      return "function" == typeof r && r !== o && Object.keys(o).forEach(function (e) {
        r[e] = o[e];
      }), r;
    }
  };
}, function (e, t, n) {
  var r = n(7),
      o = n(105),
      i = n(66),
      s = n(43)("IE_PROTO"),
      a = function () {},
      c = function () {
    var e,
        t = n(33)("iframe"),
        r = i.length;

    for (t.style.display = "none", n(61).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; r--;) delete c.prototype[i[r]];

    return c();
  };

  e.exports = Object.create || function (e, t) {
    var n;
    return null !== e ? (a.prototype = r(e), n = new a(), a.prototype = null, n[s] = e) : n = c(), void 0 === t ? n : o(n, t);
  };
}, function (e, t, n) {
  var r = n(24)("meta"),
      o = n(6),
      i = n(15),
      s = n(11).f,
      a = 0,
      c = Object.isExtensible || function () {
    return !0;
  },
      u = !n(10)(function () {
    return c(Object.preventExtensions({}));
  }),
      l = function (e) {
    s(e, r, {
      value: {
        i: "O" + ++a,
        w: {}
      }
    });
  },
      f = e.exports = {
    KEY: r,
    NEED: !1,
    fastKey: function (e, t) {
      if (!o(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;

      if (!i(e, r)) {
        if (!c(e)) return "F";
        if (!t) return "E";
        l(e);
      }

      return e[r].i;
    },
    getWeak: function (e, t) {
      if (!i(e, r)) {
        if (!c(e)) return !0;
        if (!t) return !1;
        l(e);
      }

      return e[r].w;
    },
    onFreeze: function (e) {
      return u && f.NEED && c(e) && !i(e, r) && l(e), e;
    }
  };
}, function (e, t, n) {
  var r = n(6);

  e.exports = function (e, t) {
    if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
    return e;
  };
}, function (e, t, n) {
  var r = n(8),
      o = n(65)(!1);
  r(r.S, "Object", {
    values: function (e) {
      return o(e);
    }
  });
}, function (e, t, n) {

  var r = n(7);

  e.exports = function () {
    var e = r(this),
        t = "";
    return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;
  };
}, function (e, t, n) {
  e.exports = u, u.sync = function (e, t) {
    for (var n = c(e, t = t || {}), r = n.env, i = n.ext, u = n.extExe, l = [], f = 0, p = r.length; f < p; f++) {
      var h = r[f];
      '"' === h.charAt(0) && '"' === h.slice(-1) && (h = h.slice(1, -1));
      var d = o.join(h, e);
      !h && /^\.[\\\/]/.test(e) && (d = e.slice(0, 2) + d);

      for (var m = 0, g = i.length; m < g; m++) {
        var v = d + i[m];

        try {
          if (s.sync(v, {
            pathExt: u
          })) {
            if (!t.all) return v;
            l.push(v);
          }
        } catch (e) {}
      }
    }

    if (t.all && l.length) return l;
    if (t.nothrow) return null;
    throw a(e);
  };
  var r = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE,
      o = n(0),
      i = r ? ";" : ":",
      s = n(118);

  function a(e) {
    var t = new Error("not found: " + e);
    return t.code = "ENOENT", t;
  }

  function c(e, t) {
    var n = t.colon || i,
        o = t.path || process.env.PATH || "",
        s = [""];
    o = o.split(n);
    var a = "";
    return r && (o.unshift(process.cwd()), s = (a = t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM").split(n), -1 !== e.indexOf(".") && "" !== s[0] && s.unshift("")), (e.match(/\//) || r && e.match(/\\/)) && (o = [""]), {
      env: o,
      ext: s,
      extExe: a
    };
  }

  function u(e, t, n) {
    "function" == typeof t && (n = t, t = {});
    var r = c(e, t),
        i = r.env,
        u = r.ext,
        l = r.extExe,
        f = [];
    !function r(c, p) {
      if (c === p) return t.all && f.length ? n(null, f) : n(a(e));
      var h = i[c];
      '"' === h.charAt(0) && '"' === h.slice(-1) && (h = h.slice(1, -1));
      var d = o.join(h, e);
      !h && /^\.[\\\/]/.test(e) && (d = e.slice(0, 2) + d), function e(o, i) {
        if (o === i) return r(c + 1, p);
        var a = u[o];
        s(d + a, {
          pathExt: l
        }, function (r, s) {
          if (!r && s) {
            if (!t.all) return n(null, d + a);
            f.push(d + a);
          }

          return e(o + 1, i);
        });
      }(0, u.length);
    }(0, i.length);
  }
}, function (e, t, n) {

  e.exports = e => {
    const t = (e = e || {}).env || process.env;
    return "win32" !== (e.platform || process.platform) ? "PATH" : Object.keys(t).find(e => "PATH" === e.toUpperCase()) || "Path";
  };
}, function (e, t, n) {

  n(32), n(2), n(27), n(64), n(22);
  var r = n(90),
      o = n(161),
      i = n(170),
      s = n(1);

  function a(e, t) {
    (t = t || {}).clipboard && console.log("\n*** Clipboard option removed - use clipboardy or clipboard-cli directly ***\n");
    var n = Object.keys(e).length > 0 ? e : i.defaults,
        s = Object.entries(n).reduce(function (e, n) {
      var o = n[0],
          i = n[1],
          s = r[`get${o}`];
      return s ? (i && e.push(s(i, t)), e) : e = e.concat((i || []).map(function (e) {
        var t = r[`get${e.replace(/\s/g, "")}Info`];
        return t ? t() : Promise.resolve(["Unknown"]);
      }));
    }, []);
    return Promise.all(s).then(function (e) {
      var n = e.reduce(function (e, t) {
        return t && t[0] && Object.assign(e, {
          [t[0]]: t
        }), e;
      }, {});
      return function (e, t) {
        var n = t.json ? o.json : t.markdown ? o.markdown : o.yaml;

        if (t.console) {
          var r = !1;
          process.stdout.isTTY && (r = !0), console.log(n(e, Object.assign({}, t, {
            console: r
          })));
        }

        return n(e, Object.assign({}, t, {
          console: !1
        }));
      }(Object.entries(i.defaults).reduce(function (e, t) {
        var r = t[0],
            o = t[1];
        return n[r] ? Object.assign(e, {
          [r]: n[r][1]
        }) : Object.assign(e, {
          [r]: (o || []).reduce(function (e, t) {
            return n[t] ? (n[t].shift(), 1 === n[t].length ? Object.assign(e, {
              [t]: n[t][0]
            }) : Object.assign(e, {
              [t]: {
                version: n[t][0],
                path: n[t][1]
              }
            })) : e;
          }, {})
        });
      }, {}), t);
    });
  }

  e.exports = {
    cli: function (e) {
      if (e.all) return a(Object.assign({}, i.defaults, {
        npmPackages: !0,
        npmGlobalPackages: !0
      }), e);
      if (e.raw) return a(JSON.parse(e.raw), e);

      if (e.helper) {
        var t = r[`get${e.helper}`] || r[`get${e.helper}Info`] || r[e.helper];
        return t ? t().then(console.log) : console.error("Not Found");
      }

      var n = function (e, t) {
        return e.toLowerCase().includes(t.toLowerCase());
      },
          o = Object.keys(e).filter(function (e) {
        return Object.keys(i.defaults).some(function (t) {
          return n(t, e);
        });
      }),
          c = Object.entries(i.defaults).reduce(function (t, r) {
        return o.some(function (e) {
          return n(e, r[0]);
        }) ? Object.assign(t, {
          [r[0]]: r[1] || e[r[0]]
        }) : t;
      }, {});

      return e.preset ? i[e.preset] ? a(Object.assign({}, s.omit(i[e.preset], ["options"]), c), Object.assign({}, i[e.preset].options, s.pick(e, ["duplicates", "fullTree", "json", "markdown", "console"]))) : console.error(`\nNo "${e.preset}" preset found.`) : a(c, e);
    },
    helpers: r,
    main: a,
    run: function (e, t) {
      return "string" == typeof e.preset ? a(i[e.preset], t) : a(e, t);
    }
  };
}, function (e, t, n) {
  var r = n(54),
      o = Math.max,
      i = Math.min;

  e.exports = function (e, t) {
    return (e = r(e)) < 0 ? o(e + t, 0) : i(e, t);
  };
}, function (e, t, n) {
  var r = n(3)("unscopables"),
      o = Array.prototype;
  null == o[r] && n(13)(o, r, {}), e.exports = function (e) {
    o[r][e] = !0;
  };
}, function (e, t, n) {
  var r = n(7),
      o = n(20),
      i = n(3)("species");

  e.exports = function (e, t) {
    var n,
        s = r(e).constructor;
    return void 0 === s || null == (n = r(s)[i]) ? t : o(n);
  };
}, function (e, t) {
  e.exports = function (e, t, n) {
    var r = void 0 === n;

    switch (t.length) {
      case 0:
        return r ? e() : e.call(n);

      case 1:
        return r ? e(t[0]) : e.call(n, t[0]);

      case 2:
        return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);

      case 3:
        return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);

      case 4:
        return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
    }

    return e.apply(n, t);
  };
}, function (e, t, n) {
  var r = n(4),
      o = n(60).set,
      i = r.MutationObserver || r.WebKitMutationObserver,
      s = r.process,
      a = r.Promise,
      c = "process" == n(21)(s);

  e.exports = function () {
    var e,
        t,
        n,
        u = function () {
      var r, o;

      for (c && (r = s.domain) && r.exit(); e;) {
        o = e.fn, e = e.next;

        try {
          o();
        } catch (r) {
          throw e ? n() : t = void 0, r;
        }
      }

      t = void 0, r && r.enter();
    };

    if (c) n = function () {
      s.nextTick(u);
    };else if (!i || r.navigator && r.navigator.standalone) {
      if (a && a.resolve) {
        var l = a.resolve(void 0);

        n = function () {
          l.then(u);
        };
      } else n = function () {
        o.call(r, u);
      };
    } else {
      var f = !0,
          p = document.createTextNode("");
      new i(u).observe(p, {
        characterData: !0
      }), n = function () {
        p.data = f = !f;
      };
    }
    return function (r) {
      var o = {
        fn: r,
        next: void 0
      };
      t && (t.next = o), e || (e = o, n()), t = o;
    };
  };
}, function (e, t) {
  e.exports = function (e) {
    try {
      return {
        e: !1,
        v: e()
      };
    } catch (e) {
      return {
        e: !0,
        v: e
      };
    }
  };
}, function (e, t, n) {
  var r = n(4).navigator;
  e.exports = r && r.userAgent || "";
}, function (e, t, n) {
  var r = n(7),
      o = n(6),
      i = n(62);

  e.exports = function (e, t) {
    if (r(e), o(t) && t.constructor === e) return t;
    var n = i.f(e);
    return (0, n.resolve)(t), n.promise;
  };
}, function (e, t, n) {
  var r = n(15),
      o = n(25),
      i = n(52)(!1),
      s = n(43)("IE_PROTO");

  e.exports = function (e, t) {
    var n,
        a = o(e),
        c = 0,
        u = [];

    for (n in a) n != s && r(a, n) && u.push(n);

    for (; t.length > c;) r(a, n = t[c++]) && (~i(u, n) || u.push(n));

    return u;
  };
}, function (e, t, n) {

  var r = n(42),
      o = n(89),
      i = n(44),
      s = n(29),
      a = n(53),
      c = Object.assign;
  e.exports = !c || n(10)(function () {
    var e = {},
        t = {},
        n = Symbol(),
        r = "abcdefghijklmnopqrst";
    return e[n] = 7, r.split("").forEach(function (e) {
      t[e] = e;
    }), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r;
  }) ? function (e, t) {
    for (var n = s(e), c = arguments.length, u = 1, l = o.f, f = i.f; c > u;) for (var p, h = a(arguments[u++]), d = l ? r(h).concat(l(h)) : r(h), m = d.length, g = 0; m > g;) f.call(h, p = d[g++]) && (n[p] = h[p]);

    return n;
  } : c;
}, function (e, t) {
  t.f = Object.getOwnPropertySymbols;
}, function (e, t, n) {

  function r(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  n(22);
  var o = n(91),
      i = n(1),
      s = n(122),
      a = n(123),
      c = n(124),
      u = n(125),
      l = n(126),
      f = n(127),
      p = n(128),
      h = n(129),
      d = n(130),
      m = n(131),
      g = n(159),
      v = n(160);
  e.exports = Object.assign({}, i, o, function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {},
          o = Object.keys(n);
      "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
        return Object.getOwnPropertyDescriptor(n, e).enumerable;
      }))), o.forEach(function (t) {
        r(e, t, n[t]);
      });
    }

    return e;
  }({}, s, a, c, u, l, f, p, h, d, m, g, v));
}, function (e, t, n) {

  n(16), n(22), n(2), n(32), n(17);

  var r = n(45),
      o = n(0),
      i = n(1),
      s = function (e) {
    var t = e.split("node_modules" + o.sep),
        n = t[t.length - 1];
    return "@" === n.charAt(0) ? [n.split(o.sep)[0], n.split(o.sep)[1]].join("/") : n.split(o.sep)[0];
  };

  e.exports = {
    getnpmPackages: function (e, t) {
      i.log("trace", "getnpmPackages"), t || (t = {});
      var n = null,
          r = null;
      return "string" == typeof e && (e.includes("*") || e.includes("?") || e.includes("+") || e.includes("!") ? n = e : e = e.split(",")), Promise.all(["npmPackages", i.getPackageJsonByPath("package.json").then(function (e) {
        return Object.assign({}, (e || {}).devDependencies || {}, (e || {}).dependencies || {});
      }).then(function (e) {
        return r = e, t.fullTree || t.duplicates || n ? i.getAllPackageJsonPaths(n) : Promise.resolve(Object.keys(e || []).map(function (e) {
          return o.join("node_modules", e, "package.json");
        }));
      }).then(function (o) {
        return !n && "boolean" != typeof e || t.fullTree ? Array.isArray(e) ? Promise.resolve((o || []).filter(function (t) {
          return e.includes(s(t));
        })) : Promise.resolve(o) : Promise.resolve((o || []).filter(function (e) {
          return Object.keys(r || []).includes(s(e));
        }));
      }).then(function (e) {
        return Promise.all([e, Promise.all(e.map(function (e) {
          return i.getPackageJsonByPath(e);
        }))]);
      }).then(function (e) {
        var n = e[0],
            o = e[1].reduce(function (e, r, o) {
          return r && r.name ? (e[r.name] || (e[r.name] = {}), t.duplicates && (e[r.name].duplicates = i.uniq((e[r.name].duplicates || []).concat(r.version))), 1 === (n[o].match(/node_modules/g) || []).length && (e[r.name].installed = r.version), e) : e;
        }, {});
        return Object.keys(o).forEach(function (e) {
          o[e].duplicates && o[e].installed && (o[e].duplicates = o[e].duplicates.filter(function (t) {
            return t !== o[e].installed;
          })), r[e] && (o[e].wanted = r[e]);
        }), o;
      }).then(function (n) {
        return t.showNotFound && Array.isArray(e) && e.forEach(function (e) {
          n[e] || (n[e] = "Not Found");
        }), n;
      }).then(function (e) {
        return i.sortObject(e);
      })]);
    },
    getnpmGlobalPackages: function (e, t) {
      i.log("trace", "getnpmGlobalPackages", e);
      var n = null;
      return "string" == typeof e ? e.includes("*") || e.includes("?") || e.includes("+") || e.includes("!") ? n = e : e = e.split(",") : Array.isArray(e) || (e = !0), Promise.all(["npmGlobalPackages", i.run("npm get prefix --global").then(function (e) {
        return new Promise(function (t, s) {
          return r(o.join(e, i.isWindows ? "" : "lib", "node_modules", n || "{*,@*/*}", "package.json"), function (e, n) {
            e || t(n), s(e);
          });
        });
      }).then(function (t) {
        return Promise.all(t.filter(function (t) {
          return "boolean" == typeof e || null !== n || e.includes(s(t));
        }).map(function (e) {
          return i.getPackageJsonByFullPath(e);
        }));
      }).then(function (e) {
        return e.reduce(function (e, t) {
          return t ? Object.assign(e, {
            [t.name]: t.version
          }) : e;
        }, {});
      }).then(function (n) {
        return t.showNotFound && Array.isArray(e) && e.forEach(function (e) {
          n[e] || (n[e] = "Not Found");
        }), n;
      })]);
    }
  };
}, function (e, t, n) {
  var r = n(6),
      o = n(21),
      i = n(3)("match");

  e.exports = function (e) {
    var t;
    return r(e) && (void 0 !== (t = e[i]) ? !!t : "RegExp" == o(e));
  };
}, function (e, t, n) {
  var r = n(0),
      o = "win32" === process.platform,
      i = n(5),
      s = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

  function a(e) {
    return "function" == typeof e ? e : function () {
      var e;

      if (s) {
        var t = new Error();

        e = function (e) {
          e && (t.message = e.message, n(e = t));
        };
      } else e = n;

      return e;

      function n(e) {
        if (e) {
          if (process.throwDeprecation) throw e;

          if (!process.noDeprecation) {
            var t = "fs: missing callback " + (e.stack || e.message);
            process.traceDeprecation ? console.trace(t) : console.error(t);
          }
        }
      }
    }();
  }
  if (o) var c = /(.*?)(?:[\/\\]+|$)/g;else c = /(.*?)(?:[\/]+|$)/g;
  if (o) var u = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;else u = /^[\/]*/;
  t.realpathSync = function (e, t) {
    if (e = r.resolve(e), t && Object.prototype.hasOwnProperty.call(t, e)) return t[e];
    var n,
        s,
        a,
        l,
        f = e,
        p = {},
        h = {};

    function d() {
      var t = u.exec(e);
      n = t[0].length, s = t[0], a = t[0], l = "", o && !h[a] && (i.lstatSync(a), h[a] = !0);
    }

    for (d(); n < e.length;) {
      c.lastIndex = n;
      var m = c.exec(e);

      if (l = s, s += m[0], a = l + m[1], n = c.lastIndex, !(h[a] || t && t[a] === a)) {
        var g;
        if (t && Object.prototype.hasOwnProperty.call(t, a)) g = t[a];else {
          var v = i.lstatSync(a);

          if (!v.isSymbolicLink()) {
            h[a] = !0, t && (t[a] = a);
            continue;
          }

          var y = null;

          if (!o) {
            var b = v.dev.toString(32) + ":" + v.ino.toString(32);
            p.hasOwnProperty(b) && (y = p[b]);
          }

          null === y && (i.statSync(a), y = i.readlinkSync(a)), g = r.resolve(l, y), t && (t[a] = g), o || (p[b] = y);
        }
        e = r.resolve(g, e.slice(n)), d();
      }
    }

    return t && (t[f] = e), e;
  }, t.realpath = function (e, t, n) {
    if ("function" != typeof n && (n = a(t), t = null), e = r.resolve(e), t && Object.prototype.hasOwnProperty.call(t, e)) return process.nextTick(n.bind(null, null, t[e]));
    var s,
        l,
        f,
        p,
        h = e,
        d = {},
        m = {};

    function g() {
      var t = u.exec(e);
      s = t[0].length, l = t[0], f = t[0], p = "", o && !m[f] ? i.lstat(f, function (e) {
        if (e) return n(e);
        m[f] = !0, v();
      }) : process.nextTick(v);
    }

    function v() {
      if (s >= e.length) return t && (t[h] = e), n(null, e);
      c.lastIndex = s;
      var r = c.exec(e);
      return p = l, l += r[0], f = p + r[1], s = c.lastIndex, m[f] || t && t[f] === f ? process.nextTick(v) : t && Object.prototype.hasOwnProperty.call(t, f) ? w(t[f]) : i.lstat(f, y);
    }

    function y(e, r) {
      if (e) return n(e);
      if (!r.isSymbolicLink()) return m[f] = !0, t && (t[f] = f), process.nextTick(v);

      if (!o) {
        var s = r.dev.toString(32) + ":" + r.ino.toString(32);
        if (d.hasOwnProperty(s)) return b(null, d[s], f);
      }

      i.stat(f, function (e) {
        if (e) return n(e);
        i.readlink(f, function (e, t) {
          o || (d[s] = t), b(e, t);
        });
      });
    }

    function b(e, o, i) {
      if (e) return n(e);
      var s = r.resolve(p, o);
      t && (t[i] = s), w(s);
    }

    function w(t) {
      e = r.resolve(t, e.slice(s)), g();
    }

    g();
  };
}, function (e, t, n) {
  var r = n(95),
      o = n(96);

  e.exports = function (e) {
    if (!e) return [];
    "{}" === e.substr(0, 2) && (e = "\\{\\}" + e.substr(2));
    return function e(t, n) {
      var i = [];
      var s = o("{", "}", t);
      if (!s || /\$$/.test(s.pre)) return [t];
      var c = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body);
      var u = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body);
      var f = c || u;
      var g = s.body.indexOf(",") >= 0;
      if (!f && !g) return s.post.match(/,.*\}/) ? (t = s.pre + "{" + s.body + a + s.post, e(t)) : [t];
      var v;
      if (f) v = s.body.split(/\.\./);else if (1 === (v = function e(t) {
        if (!t) return [""];
        var n = [];
        var r = o("{", "}", t);
        if (!r) return t.split(",");
        var i = r.pre;
        var s = r.body;
        var a = r.post;
        var c = i.split(",");
        c[c.length - 1] += "{" + s + "}";
        var u = e(a);
        a.length && (c[c.length - 1] += u.shift(), c.push.apply(c, u));
        n.push.apply(n, c);
        return n;
      }(s.body)).length && 1 === (v = e(v[0], !1).map(p)).length) {
        var y = s.post.length ? e(s.post, !1) : [""];
        return y.map(function (e) {
          return s.pre + v[0] + e;
        });
      }
      var b = s.pre;
      var y = s.post.length ? e(s.post, !1) : [""];
      var w;

      if (f) {
        var x = l(v[0]),
            S = l(v[1]),
            P = Math.max(v[0].length, v[1].length),
            O = 3 == v.length ? Math.abs(l(v[2])) : 1,
            E = d,
            _ = S < x;

        _ && (O *= -1, E = m);
        var I = v.some(h);
        w = [];

        for (var j = x; E(j, S); j += O) {
          var A;
          if (u) "\\" === (A = String.fromCharCode(j)) && (A = "");else if (A = String(j), I) {
            var k = P - A.length;

            if (k > 0) {
              var N = new Array(k + 1).join("0");
              A = j < 0 ? "-" + N + A.slice(1) : N + A;
            }
          }
          w.push(A);
        }
      } else w = r(v, function (t) {
        return e(t, !1);
      });

      for (var F = 0; F < w.length; F++) for (var C = 0; C < y.length; C++) {
        var M = b + w[F] + y[C];
        (!n || f || M) && i.push(M);
      }

      return i;
    }(function (e) {
      return e.split("\\\\").join(i).split("\\{").join(s).split("\\}").join(a).split("\\,").join(c).split("\\.").join(u);
    }(e), !0).map(f);
  };

  var i = "\0SLASH" + Math.random() + "\0",
      s = "\0OPEN" + Math.random() + "\0",
      a = "\0CLOSE" + Math.random() + "\0",
      c = "\0COMMA" + Math.random() + "\0",
      u = "\0PERIOD" + Math.random() + "\0";

  function l(e) {
    return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
  }

  function f(e) {
    return e.split(i).join("\\").split(s).join("{").split(a).join("}").split(c).join(",").split(u).join(".");
  }

  function p(e) {
    return "{" + e + "}";
  }

  function h(e) {
    return /^-?0\d/.test(e);
  }

  function d(e, t) {
    return e <= t;
  }

  function m(e, t) {
    return e >= t;
  }
}, function (e, t) {
  e.exports = function (e, t) {
    for (var r = [], o = 0; o < e.length; o++) {
      var i = t(e[o], o);
      n(i) ? r.push.apply(r, i) : r.push(i);
    }

    return r;
  };

  var n = Array.isArray || function (e) {
    return "[object Array]" === Object.prototype.toString.call(e);
  };
}, function (e, t, n) {

  function r(e, t, n) {
    e instanceof RegExp && (e = o(e, n)), t instanceof RegExp && (t = o(t, n));
    var r = i(e, t, n);
    return r && {
      start: r[0],
      end: r[1],
      pre: n.slice(0, r[0]),
      body: n.slice(r[0] + e.length, r[1]),
      post: n.slice(r[1] + t.length)
    };
  }

  function o(e, t) {
    var n = t.match(e);
    return n ? n[0] : null;
  }

  function i(e, t, n) {
    var r,
        o,
        i,
        s,
        a,
        c = n.indexOf(e),
        u = n.indexOf(t, c + 1),
        l = c;

    if (c >= 0 && u > 0) {
      for (r = [], i = n.length; l >= 0 && !a;) l == c ? (r.push(l), c = n.indexOf(e, l + 1)) : 1 == r.length ? a = [r.pop(), u] : ((o = r.pop()) < i && (i = o, s = u), u = n.indexOf(t, l + 1)), l = c < u && c >= 0 ? c : u;

      r.length && (a = [i, s]);
    }

    return a;
  }

  e.exports = r, r.range = i;
}, function (e, t, n) {
  try {
    var r = n(30);
    if ("function" != typeof r.inherits) throw "";
    e.exports = r.inherits;
  } catch (t) {
    e.exports = n(98);
  }
}, function (e, t) {
  "function" == typeof Object.create ? e.exports = function (e, t) {
    t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : e.exports = function (e, t) {
    if (t) {
      e.super_ = t;

      var n = function () {};

      n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
    }
  };
}, function (e, t, n) {
  e.exports = d, d.GlobSync = m;
  var r = n(5),
      o = n(67),
      i = n(46),
      s = (n(45).Glob, n(30), n(0)),
      a = n(47),
      c = n(48),
      u = n(69),
      l = (u.setopts),
      f = u.ownProp,
      p = u.childrenIgnored,
      h = u.isIgnored;

  function d(e, t) {
    if ("function" == typeof t || 3 === arguments.length) throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
    return new m(e, t).found;
  }

  function m(e, t) {
    if (!e) throw new Error("must provide pattern");
    if ("function" == typeof t || 3 === arguments.length) throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
    if (!(this instanceof m)) return new m(e, t);
    if (l(this, e, t), this.noprocess) return this;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);

    for (var r = 0; r < n; r++) this._process(this.minimatch.set[r], r, !1);

    this._finish();
  }

  m.prototype._finish = function () {
    if (a(this instanceof m), this.realpath) {
      var e = this;
      this.matches.forEach(function (t, n) {
        var r = e.matches[n] = Object.create(null);

        for (var i in t) try {
          i = e._makeAbs(i), r[o.realpathSync(i, e.realpathCache)] = !0;
        } catch (t) {
          if ("stat" !== t.syscall) throw t;
          r[e._makeAbs(i)] = !0;
        }
      });
    }

    u.finish(this);
  }, m.prototype._process = function (e, t, n) {
    a(this instanceof m);

    for (var r, o = 0; "string" == typeof e[o];) o++;

    switch (o) {
      case e.length:
        return void this._processSimple(e.join("/"), t);

      case 0:
        r = null;
        break;

      default:
        r = e.slice(0, o).join("/");
    }

    var s,
        u = e.slice(o);
    null === r ? s = "." : c(r) || c(e.join("/")) ? (r && c(r) || (r = "/" + r), s = r) : s = r;

    var l = this._makeAbs(s);

    p(this, s) || (u[0] === i.GLOBSTAR ? this._processGlobStar(r, s, l, u, t, n) : this._processReaddir(r, s, l, u, t, n));
  }, m.prototype._processReaddir = function (e, t, n, r, o, i) {
    var a = this._readdir(n, i);

    if (a) {
      for (var c = r[0], u = !!this.minimatch.negate, l = c._glob, f = this.dot || "." === l.charAt(0), p = [], h = 0; h < a.length; h++) {
        if ("." !== (g = a[h]).charAt(0) || f) (u && !e ? !g.match(c) : g.match(c)) && p.push(g);
      }

      var d = p.length;
      if (0 !== d) if (1 !== r.length || this.mark || this.stat) {
        r.shift();

        for (h = 0; h < d; h++) {
          var m;
          g = p[h];
          m = e ? [e, g] : [g], this._process(m.concat(r), o, i);
        }
      } else {
        this.matches[o] || (this.matches[o] = Object.create(null));

        for (var h = 0; h < d; h++) {
          var g = p[h];
          e && (g = "/" !== e.slice(-1) ? e + "/" + g : e + g), "/" !== g.charAt(0) || this.nomount || (g = s.join(this.root, g)), this._emitMatch(o, g);
        }
      }
    }
  }, m.prototype._emitMatch = function (e, t) {
    if (!h(this, t)) {
      var n = this._makeAbs(t);

      if (this.mark && (t = this._mark(t)), this.absolute && (t = n), !this.matches[e][t]) {
        if (this.nodir) {
          var r = this.cache[n];
          if ("DIR" === r || Array.isArray(r)) return;
        }

        this.matches[e][t] = !0, this.stat && this._stat(t);
      }
    }
  }, m.prototype._readdirInGlobStar = function (e) {
    if (this.follow) return this._readdir(e, !1);
    var t, n;

    try {
      n = r.lstatSync(e);
    } catch (e) {
      if ("ENOENT" === e.code) return null;
    }

    var o = n && n.isSymbolicLink();
    return this.symlinks[e] = o, o || !n || n.isDirectory() ? t = this._readdir(e, !1) : this.cache[e] = "FILE", t;
  }, m.prototype._readdir = function (e, t) {
    if (t && !f(this.symlinks, e)) return this._readdirInGlobStar(e);

    if (f(this.cache, e)) {
      var n = this.cache[e];
      if (!n || "FILE" === n) return null;
      if (Array.isArray(n)) return n;
    }

    try {
      return this._readdirEntries(e, r.readdirSync(e));
    } catch (t) {
      return this._readdirError(e, t), null;
    }
  }, m.prototype._readdirEntries = function (e, t) {
    if (!this.mark && !this.stat) for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r = "/" === e ? e + r : e + "/" + r, this.cache[r] = !0;
    }
    return this.cache[e] = t, t;
  }, m.prototype._readdirError = function (e, t) {
    switch (t.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var n = this._makeAbs(e);

        if (this.cache[n] = "FILE", n === this.cwdAbs) {
          var r = new Error(t.code + " invalid cwd " + this.cwd);
          throw r.path = this.cwd, r.code = t.code, r;
        }

        break;

      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(e)] = !1;
        break;

      default:
        if (this.cache[this._makeAbs(e)] = !1, this.strict) throw t;
        this.silent || console.error("glob error", t);
    }
  }, m.prototype._processGlobStar = function (e, t, n, r, o, i) {
    var s = this._readdir(n, i);

    if (s) {
      var a = r.slice(1),
          c = e ? [e] : [],
          u = c.concat(a);

      this._process(u, o, !1);

      var l = s.length;
      if (!this.symlinks[n] || !i) for (var f = 0; f < l; f++) {
        if ("." !== s[f].charAt(0) || this.dot) {
          var p = c.concat(s[f], a);

          this._process(p, o, !0);

          var h = c.concat(s[f], r);

          this._process(h, o, !0);
        }
      }
    }
  }, m.prototype._processSimple = function (e, t) {
    var n = this._stat(e);

    if (this.matches[t] || (this.matches[t] = Object.create(null)), n) {
      if (e && c(e) && !this.nomount) {
        var r = /[\/\\]$/.test(e);
        "/" === e.charAt(0) ? e = s.join(this.root, e) : (e = s.resolve(this.root, e), r && (e += "/"));
      }

      "win32" === process.platform && (e = e.replace(/\\/g, "/")), this._emitMatch(t, e);
    }
  }, m.prototype._stat = function (e) {
    var t = this._makeAbs(e),
        n = "/" === e.slice(-1);

    if (e.length > this.maxLength) return !1;

    if (!this.stat && f(this.cache, t)) {
      var o = this.cache[t];
      if (Array.isArray(o) && (o = "DIR"), !n || "DIR" === o) return o;
      if (n && "FILE" === o) return !1;
    }

    var i = this.statCache[t];

    if (!i) {
      var s;

      try {
        s = r.lstatSync(t);
      } catch (e) {
        if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return this.statCache[t] = !1, !1;
      }

      if (s && s.isSymbolicLink()) try {
        i = r.statSync(t);
      } catch (e) {
        i = s;
      } else i = s;
    }

    this.statCache[t] = i;
    o = !0;
    return i && (o = i.isDirectory() ? "DIR" : "FILE"), this.cache[t] = this.cache[t] || o, (!n || "FILE" !== o) && o;
  }, m.prototype._mark = function (e) {
    return u.mark(this, e);
  }, m.prototype._makeAbs = function (e) {
    return u.makeAbs(this, e);
  };
}, function (e, t, n) {
  var r = n(70),
      o = Object.create(null),
      i = n(31);
  e.exports = r(function (e, t) {
    return o[e] ? (o[e].push(t), null) : (o[e] = [t], function (e) {
      return i(function t() {
        var n = o[e],
            r = n.length,
            i = function (e) {
          for (var t = e.length, n = [], r = 0; r < t; r++) n[r] = e[r];

          return n;
        }(arguments);

        try {
          for (var s = 0; s < r; s++) n[s].apply(null, i);
        } finally {
          n.length > r ? (n.splice(0, r), process.nextTick(function () {
            t.apply(null, i);
          })) : delete o[e];
        }
      });
    }(e));
  });
}, function (e, t, n) {

  var r = n(8),
      o = n(20),
      i = n(29),
      s = n(10),
      a = [].sort,
      c = [1, 2, 3];
  r(r.P + r.F * (s(function () {
    c.sort(void 0);
  }) || !s(function () {
    c.sort(null);
  }) || !n(102)(a)), "Array", {
    sort: function (e) {
      return void 0 === e ? a.call(i(this)) : a.call(i(this), o(e));
    }
  });
}, function (e, t, n) {

  var r = n(10);

  e.exports = function (e, t) {
    return !!e && r(function () {
      t ? e.call(null, function () {}, 1) : e.call(null);
    });
  };
}, function (e, t, n) {

  var r = n(104),
      o = n(73);
  e.exports = n(110)("Set", function (e) {
    return function () {
      return e(this, arguments.length > 0 ? arguments[0] : void 0);
    };
  }, {
    add: function (e) {
      return r.def(o(this, "Set"), e = 0 === e ? 0 : e, e);
    }
  }, r);
}, function (e, t, n) {

  var r = n(11).f,
      o = n(71),
      i = n(40),
      s = n(12),
      a = n(37),
      c = n(38),
      u = n(106),
      l = n(109),
      f = n(63),
      p = n(9),
      h = n(72).fastKey,
      d = n(73),
      m = p ? "_s" : "size",
      g = function (e, t) {
    var n,
        r = h(t);
    if ("F" !== r) return e._i[r];

    for (n = e._f; n; n = n.n) if (n.k == t) return n;
  };

  e.exports = {
    getConstructor: function (e, t, n, u) {
      var l = e(function (e, r) {
        a(e, l, t, "_i"), e._t = t, e._i = o(null), e._f = void 0, e._l = void 0, e[m] = 0, null != r && c(r, n, e[u], e);
      });
      return i(l.prototype, {
        clear: function () {
          for (var e = d(this, t), n = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];

          e._f = e._l = void 0, e[m] = 0;
        },
        delete: function (e) {
          var n = d(this, t),
              r = g(n, e);

          if (r) {
            var o = r.n,
                i = r.p;
            delete n._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), n._f == r && (n._f = o), n._l == r && (n._l = i), n[m]--;
          }

          return !!r;
        },
        forEach: function (e) {
          d(this, t);

          for (var n, r = s(e, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) for (r(n.v, n.k, this); n && n.r;) n = n.p;
        },
        has: function (e) {
          return !!g(d(this, t), e);
        }
      }), p && r(l.prototype, "size", {
        get: function () {
          return d(this, t)[m];
        }
      }), l;
    },
    def: function (e, t, n) {
      var r,
          o,
          i = g(e, t);
      return i ? i.v = n : (e._l = i = {
        i: o = h(t, !0),
        k: t,
        v: n,
        p: r = e._l,
        n: void 0,
        r: !1
      }, e._f || (e._f = i), r && (r.n = i), e[m]++, "F" !== o && (e._i[o] = i)), e;
    },
    getEntry: g,
    setStrong: function (e, t, n) {
      u(e, t, function (e, n) {
        this._t = d(e, t), this._k = n, this._l = void 0;
      }, function () {
        for (var e = this._k, t = this._l; t && t.r;) t = t.p;

        return this._t && (this._l = t = t ? t.n : this._t._f) ? l(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, l(1));
      }, n ? "entries" : "values", !n, !0), f(t);
    }
  };
}, function (e, t, n) {
  var r = n(11),
      o = n(7),
      i = n(42);
  e.exports = n(9) ? Object.defineProperties : function (e, t) {
    o(e);

    for (var n, s = i(t), a = s.length, c = 0; a > c;) r.f(e, n = s[c++], t[n]);

    return e;
  };
}, function (e, t, n) {

  var r = n(36),
      o = n(8),
      i = n(14),
      s = n(13),
      a = n(39),
      c = n(107),
      u = n(26),
      l = n(108),
      f = n(3)("iterator"),
      p = !([].keys && "next" in [].keys()),
      h = function () {
    return this;
  };

  e.exports = function (e, t, n, d, m, g, v) {
    c(n, t, d);

    var y,
        b,
        w,
        x = function (e) {
      if (!p && e in E) return E[e];

      switch (e) {
        case "keys":
        case "values":
          return function () {
            return new n(this, e);
          };
      }

      return function () {
        return new n(this, e);
      };
    },
        S = t + " Iterator",
        P = "values" == m,
        O = !1,
        E = e.prototype,
        _ = E[f] || E["@@iterator"] || m && E[m],
        I = _ || x(m),
        j = m ? P ? x("entries") : I : void 0,
        A = "Array" == t && E.entries || _;

    if (A && (w = l(A.call(new e()))) !== Object.prototype && w.next && (u(w, S, !0), r || "function" == typeof w[f] || s(w, f, h)), P && _ && "values" !== _.name && (O = !0, I = function () {
      return _.call(this);
    }), r && !v || !p && !O && E[f] || s(E, f, I), a[t] = I, a[S] = h, m) if (y = {
      values: P ? I : x("values"),
      keys: g ? I : x("keys"),
      entries: j
    }, v) for (b in y) b in E || i(E, b, y[b]);else o(o.P + o.F * (p || O), t, y);
    return y;
  };
}, function (e, t, n) {

  var r = n(71),
      o = n(23),
      i = n(26),
      s = {};
  n(13)(s, n(3)("iterator"), function () {
    return this;
  }), e.exports = function (e, t, n) {
    e.prototype = r(s, {
      next: o(1, n)
    }), i(e, t + " Iterator");
  };
}, function (e, t, n) {
  var r = n(15),
      o = n(29),
      i = n(43)("IE_PROTO"),
      s = Object.prototype;

  e.exports = Object.getPrototypeOf || function (e) {
    return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null;
  };
}, function (e, t) {
  e.exports = function (e, t) {
    return {
      value: t,
      done: !!e
    };
  };
}, function (e, t, n) {

  var r = n(4),
      o = n(8),
      i = n(14),
      s = n(40),
      a = n(72),
      c = n(38),
      u = n(37),
      l = n(6),
      f = n(10),
      p = n(41),
      h = n(26),
      d = n(111);

  e.exports = function (e, t, n, m, g, v) {
    var y = r[e],
        b = y,
        w = g ? "set" : "add",
        x = b && b.prototype,
        S = {},
        P = function (e) {
      var t = x[e];
      i(x, e, "delete" == e ? function (e) {
        return !(v && !l(e)) && t.call(this, 0 === e ? 0 : e);
      } : "has" == e ? function (e) {
        return !(v && !l(e)) && t.call(this, 0 === e ? 0 : e);
      } : "get" == e ? function (e) {
        return v && !l(e) ? void 0 : t.call(this, 0 === e ? 0 : e);
      } : "add" == e ? function (e) {
        return t.call(this, 0 === e ? 0 : e), this;
      } : function (e, n) {
        return t.call(this, 0 === e ? 0 : e, n), this;
      });
    };

    if ("function" == typeof b && (v || x.forEach && !f(function () {
      new b().entries().next();
    }))) {
      var O = new b(),
          E = O[w](v ? {} : -0, 1) != O,
          _ = f(function () {
        O.has(1);
      }),
          I = p(function (e) {
        new b(e);
      }),
          j = !v && f(function () {
        for (var e = new b(), t = 5; t--;) e[w](t, t);

        return !e.has(-0);
      });

      I || ((b = t(function (t, n) {
        u(t, b, e);
        var r = d(new y(), t, b);
        return null != n && c(n, g, r[w], r), r;
      })).prototype = x, x.constructor = b), (_ || j) && (P("delete"), P("has"), g && P("get")), (j || E) && P(w), v && x.clear && delete x.clear;
    } else b = m.getConstructor(t, e, g, w), s(b.prototype, n), a.NEED = !0;

    return h(b, e), S[e] = b, o(o.G + o.W + o.F * (b != y), S), v || m.setStrong(b, e, g), b;
  };
}, function (e, t, n) {
  var r = n(6),
      o = n(112).set;

  e.exports = function (e, t, n) {
    var i,
        s = t.constructor;
    return s !== n && "function" == typeof s && (i = s.prototype) !== n.prototype && r(i) && o && o(e, i), e;
  };
}, function (e, t, n) {
  var r = n(6),
      o = n(7),
      i = function (e, t) {
    if (o(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
  };

  e.exports = {
    set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
      try {
        (r = n(12)(Function.call, n(113).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array);
      } catch (e) {
        t = !0;
      }

      return function (e, n) {
        return i(e, n), t ? e.__proto__ = n : r(e, n), e;
      };
    }({}, !1) : void 0),
    check: i
  };
}, function (e, t, n) {
  var r = n(44),
      o = n(23),
      i = n(25),
      s = n(51),
      a = n(15),
      c = n(50),
      u = Object.getOwnPropertyDescriptor;
  t.f = n(9) ? u : function (e, t) {
    if (e = i(e), t = s(t, !0), c) try {
      return u(e, t);
    } catch (e) {}
    if (a(e, t)) return o(!r.f.call(e, t), e[t]);
  };
}, function (e, t, n) {

  var r = n(12),
      o = n(8),
      i = n(29),
      s = n(57),
      a = n(58),
      c = n(35),
      u = n(115),
      l = n(59);
  o(o.S + o.F * !n(41)(function (e) {
    Array.from(e);
  }), "Array", {
    from: function (e) {
      var t,
          n,
          o,
          f,
          p = i(e),
          h = "function" == typeof this ? this : Array,
          d = arguments.length,
          m = d > 1 ? arguments[1] : void 0,
          g = void 0 !== m,
          v = 0,
          y = l(p);
      if (g && (m = r(m, d > 2 ? arguments[2] : void 0, 2)), null == y || h == Array && a(y)) for (n = new h(t = c(p.length)); t > v; v++) u(n, v, g ? m(p[v], v) : p[v]);else for (f = y.call(p), n = new h(); !(o = f.next()).done; v++) u(n, v, g ? s(f, m, [o.value, v], !0) : o.value);
      return n.length = v, n;
    }
  });
}, function (e, t, n) {

  var r = n(11),
      o = n(23);

  e.exports = function (e, t, n) {
    t in e ? r.f(e, t, o(0, n)) : e[t] = n;
  };
}, function (e, t, n) {

  n(117);

  var r = n(7),
      o = n(75),
      i = n(9),
      s = /./.toString,
      a = function (e) {
    n(14)(RegExp.prototype, "toString", e, !0);
  };

  n(10)(function () {
    return "/a/b" != s.call({
      source: "a",
      flags: "b"
    });
  }) ? a(function () {
    var e = r(this);
    return "/".concat(e.source, "/", "flags" in e ? e.flags : !i && e instanceof RegExp ? o.call(e) : void 0);
  }) : "toString" != s.name && a(function () {
    return s.call(this);
  });
}, function (e, t, n) {
  n(9) && "g" != /./g.flags && n(11).f(RegExp.prototype, "flags", {
    configurable: !0,
    get: n(75)
  });
}, function (e, t, n) {
  var r;
  n(5);

  function o(e, t, n) {
    if ("function" == typeof t && (n = t, t = {}), !n) {
      if ("function" != typeof Promise) throw new TypeError("callback not provided");
      return new Promise(function (n, r) {
        o(e, t || {}, function (e, t) {
          e ? r(e) : n(t);
        });
      });
    }

    r(e, t || {}, function (e, r) {
      e && ("EACCES" === e.code || t && t.ignoreErrors) && (e = null, r = !1), n(e, r);
    });
  }

  r = "win32" === process.platform || commonjsGlobal.TESTING_WINDOWS ? n(119) : n(120), e.exports = o, o.sync = function (e, t) {
    try {
      return r.sync(e, t || {});
    } catch (e) {
      if (t && t.ignoreErrors || "EACCES" === e.code) return !1;
      throw e;
    }
  };
}, function (e, t, n) {
  e.exports = i, i.sync = function (e, t) {
    return o(r.statSync(e), e, t);
  };
  var r = n(5);

  function o(e, t, n) {
    return !(!e.isSymbolicLink() && !e.isFile()) && function (e, t) {
      var n = void 0 !== t.pathExt ? t.pathExt : process.env.PATHEXT;
      if (!n) return !0;
      if (-1 !== (n = n.split(";")).indexOf("")) return !0;

      for (var r = 0; r < n.length; r++) {
        var o = n[r].toLowerCase();
        if (o && e.substr(-o.length).toLowerCase() === o) return !0;
      }

      return !1;
    }(t, n);
  }

  function i(e, t, n) {
    r.stat(e, function (r, i) {
      n(r, !r && o(i, e, t));
    });
  }
}, function (e, t, n) {
  e.exports = o, o.sync = function (e, t) {
    return i(r.statSync(e), t);
  };
  var r = n(5);

  function o(e, t, n) {
    r.stat(e, function (e, r) {
      n(e, !e && i(r, t));
    });
  }

  function i(e, t) {
    return e.isFile() && function (e, t) {
      var n = e.mode,
          r = e.uid,
          o = e.gid,
          i = void 0 !== t.uid ? t.uid : process.getuid && process.getuid(),
          s = void 0 !== t.gid ? t.gid : process.getgid && process.getgid(),
          a = parseInt("100", 8),
          c = parseInt("010", 8),
          u = parseInt("001", 8),
          l = a | c;
      return n & u || n & c && o === s || n & a && r === i || n & l && 0 === i;
    }(e, t);
  }
}, function (e, t, n) {

  e.exports = {
    androidSystemImages: /system-images;([\S \t]+)/g,
    androidAPILevels: /platforms;android-(\d+)[\S\s]/g,
    androidBuildTools: /build-tools;([\d|.]+)[\S\s]/g
  };
}, function (e, t, n) {

  n(2);
  var r = n(1);
  e.exports = {
    getNodeInfo: function () {
      return r.log("trace", "getNodeInfo"), Promise.all([r.isWindows ? r.run("node -v").then(r.findVersion) : r.which("node").then(function (e) {
        return e ? r.run(e + " -v") : Promise.resolve("");
      }).then(r.findVersion), r.which("node").then(r.condensePath)]).then(function (e) {
        return r.determineFound("Node", e[0], e[1]);
      });
    },
    getnpmInfo: function () {
      return r.log("trace", "getnpmInfo"), Promise.all([r.run("npm -v"), r.which("npm").then(r.condensePath)]).then(function (e) {
        return r.determineFound("npm", e[0], e[1]);
      });
    },
    getWatchmanInfo: function () {
      return r.log("trace", "getWatchmanInfo"), Promise.all([r.which("watchman").then(function (e) {
        return e ? r.run(e + " -v") : void 0;
      }), r.which("watchman")]).then(function (e) {
        return r.determineFound("Watchman", e[0], e[1]);
      });
    },
    getYarnInfo: function () {
      return r.log("trace", "getYarnInfo"), Promise.all([r.run("yarn -v"), r.which("yarn").then(r.condensePath)]).then(function (e) {
        return r.determineFound("Yarn", e[0], e[1]);
      });
    }
  };
}, function (e, t, n) {

  n(17), n(2), n(27);
  var r = n(5),
      o = n(18),
      i = n(1),
      s = n(0);
  e.exports = {
    getBraveBrowserInfo: function () {
      return i.log("trace", "getBraveBrowser"), (i.isLinux ? i.run("brave --version").then(function (e) {
        return e.replace(/^.* ([^ ]*)/g, "$1");
      }) : i.isMacOS ? i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Brave Browser"]).then(i.findVersion) : Promise.resolve("N/A")).then(function (e) {
        return i.determineFound("Brave Browser", e, "N/A");
      });
    },
    getChromeInfo: function () {
      var e;
      if (i.log("trace", "getChromeInfo"), i.isLinux) e = i.run("google-chrome --version").then(function (e) {
        return e.replace(" dev", "").replace(/^.* ([^ ]*)/g, "$1");
      });else if (i.isMacOS) e = i.getDarwinApplicationVersion(i.browserBundleIdentifiers.Chrome).then(i.findVersion);else if (i.isWindows) {
        var t;

        try {
          t = i.findVersion(r.readdirSync(s.join(process.env["ProgramFiles(x86)"], "Google/Chrome/Application")).join("\n"));
        } catch (e) {
          t = i.NotFound;
        }

        e = Promise.resolve(t);
      } else e = Promise.resolve("N/A");
      return e.then(function (e) {
        return i.determineFound("Chrome", e, "N/A");
      });
    },
    getChromeCanaryInfo: function () {
      return i.log("trace", "getChromeCanaryInfo"), i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Chrome Canary"]).then(function (e) {
        return i.determineFound("Chrome Canary", e, "N/A");
      });
    },
    getEdgeInfo: function () {
      var e;

      if (i.log("trace", "getEdgeInfo"), i.isWindows && "10" === o.release().split(".")[0]) {
        var t = {
          Spartan: "Microsoft.MicrosoftEdge",
          Chromium: "Microsoft.MicrosoftEdge.Stable",
          ChromiumDev: "Microsoft.MicrosoftEdge.Dev"
        };
        e = Promise.all(Object.keys(t).map(function (e) {
          return function (e, t) {
            return i.run(`powershell get-appxpackage ${e}`).then(function (e) {
              if ("" !== i.findVersion(e)) return `${t} (${i.findVersion(e)})`;
            });
          }(t[e], e);
        }).filter(function (e) {
          return void 0 !== e;
        }));
      } else {
        if (!i.isMacOS) return Promise.resolve("N/A");
        e = i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Microsoft Edge"]);
      }

      return e.then(function (e) {
        return i.determineFound("Edge", Array.isArray(e) ? e.filter(function (e) {
          return void 0 !== e;
        }) : e, i.NA);
      });
    },
    getFirefoxInfo: function () {
      return i.log("trace", "getFirefoxInfo"), (i.isLinux ? i.run("firefox --version").then(function (e) {
        return e.replace(/^.* ([^ ]*)/g, "$1");
      }) : i.isMacOS ? i.getDarwinApplicationVersion(i.browserBundleIdentifiers.Firefox) : Promise.resolve("N/A")).then(function (e) {
        return i.determineFound("Firefox", e, "N/A");
      });
    },
    getFirefoxDeveloperEditionInfo: function () {
      return i.log("trace", "getFirefoxDeveloperEditionInfo"), i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Firefox Developer Edition"]).then(function (e) {
        return i.determineFound("Firefox Developer Edition", e, "N/A");
      });
    },
    getFirefoxNightlyInfo: function () {
      return i.log("trace", "getFirefoxNightlyInfo"), (i.isLinux ? i.run("firefox-trunk --version").then(function (e) {
        return e.replace(/^.* ([^ ]*)/g, "$1");
      }) : i.isMacOS ? i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Firefox Nightly"]) : Promise.resolve("N/A")).then(function (e) {
        return i.determineFound("Firefox Nightly", e, "N/A");
      });
    },
    getInternetExplorerInfo: function () {
      var e;

      if (i.log("trace", "getInternetExplorerInfo"), i.isWindows) {
        var t = [process.env.SYSTEMDRIVE || "C:", "Program Files", "Internet Explorer", "iexplore.exe"].join("\\\\");
        e = i.run(`wmic datafile where "name='${t}'" get Version`).then(i.findVersion);
      } else e = Promise.resolve("N/A");

      return e.then(function (e) {
        return i.determineFound("Internet Explorer", e, "N/A");
      });
    },
    getSafariTechnologyPreviewInfo: function () {
      return i.log("trace", "getSafariTechnologyPreviewInfo"), i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Safari Technology Preview"]).then(function (e) {
        return i.determineFound("Safari Technology Preview", e, "N/A");
      });
    },
    getSafariInfo: function () {
      return i.log("trace", "getSafariInfo"), i.getDarwinApplicationVersion(i.browserBundleIdentifiers.Safari).then(function (e) {
        return i.determineFound("Safari", e, "N/A");
      });
    }
  };
}, function (e, t, n) {

  n(32), n(2);
  var r = n(1);
  e.exports = {
    getMongoDBInfo: function () {
      return r.log("trace", "getMongoDBInfo"), Promise.all([r.run("mongo --version").then(r.findVersion), r.which("mongo")]).then(function (e) {
        return r.determineFound("MongoDB", e[0], e[1]);
      });
    },
    getMySQLInfo: function () {
      return r.log("trace", "getMySQLInfo"), Promise.all([r.run("mysql --version").then(function (e) {
        return `${r.findVersion(e, null, 1)}${e.includes("MariaDB") ? " (MariaDB)" : ""}`;
      }), r.which("mysql")]).then(function (e) {
        return r.determineFound("MySQL", e[0], e[1]);
      });
    },
    getPostgreSQLInfo: function () {
      return r.log("trace", "getPostgreSQLInfo"), Promise.all([r.run("postgres --version").then(r.findVersion), r.which("postgres")]).then(function (e) {
        return r.determineFound("PostgreSQL", e[0], e[1]);
      });
    },
    getSQLiteInfo: function () {
      return r.log("trace", "getSQLiteInfo"), Promise.all([r.run("sqlite3 --version").then(r.findVersion), r.which("sqlite3")]).then(function (e) {
        return r.determineFound("SQLite", e[0], e[1]);
      });
    }
  };
}, function (e, t, n) {

  n(27), n(17), n(2);
  var r = n(0),
      o = n(1);
  e.exports = {
    getAndroidStudioInfo: function () {
      var e = Promise.resolve("N/A");
      return o.isMacOS ? e = o.run(o.generatePlistBuddyCommand(r.join("/", "Applications", "Android\\ Studio.app", "Contents", "Info.plist"), ["CFBundleShortVersionString", "CFBundleVersion"])).then(function (e) {
        return e || o.run(o.generatePlistBuddyCommand(r.join("~", "Applications", "JetBrains\\ Toolbox", "Android\\ Studio.app", "Contents", "Info.plist"), ["CFBundleShortVersionString", "CFBundleVersion"]));
      }).then(function (e) {
        return e.split("\n").join(" ");
      }) : o.isLinux ? e = Promise.all([o.run('cat /opt/android-studio/bin/studio.sh | grep "$Home/.AndroidStudio" | head -1').then(o.findVersion), o.run("cat /opt/android-studio/build.txt")]).then(function (e) {
        return `${e[0]} ${e[1]}`.trim() || o.NotFound;
      }) : o.isWindows && (e = Promise.all([o.run('wmic datafile where name="C:\\\\Program Files\\\\Android\\\\Android Studio\\\\bin\\\\studio.exe" get Version').then(function (e) {
        return e.replace(/(\r\n|\n|\r)/gm, "");
      }), o.run('type "C:\\\\Program Files\\\\Android\\\\Android Studio\\\\build.txt"').then(function (e) {
        return e.replace(/(\r\n|\n|\r)/gm, "");
      })]).then(function (e) {
        return `${e[0]} ${e[1]}`.trim() || o.NotFound;
      })), e.then(function (e) {
        return o.determineFound("Android Studio", e);
      });
    },
    getAtomInfo: function () {
      return o.log("trace", "getAtomInfo"), Promise.all([o.getDarwinApplicationVersion(o.ideBundleIdentifiers.Atom), "N/A"]).then(function (e) {
        return o.determineFound("Atom", e[0], e[1]);
      });
    },
    getEmacsInfo: function () {
      return o.log("trace", "getEmacsInfo"), o.isMacOS || o.isLinux ? Promise.all([o.run("emacs --version").then(o.findVersion), o.run("which emacs")]).then(function (e) {
        return o.determineFound("Emacs", e[0], e[1]);
      }) : Promise.resolve(["Emacs", "N/A"]);
    },
    getIntelliJInfo: function () {
      return o.log("trace", "getIntelliJInfo"), o.getDarwinApplicationVersion(o.ideBundleIdentifiers.IntelliJ).then(function (e) {
        return o.determineFound("IntelliJ", e);
      });
    },
    getNanoInfo: function () {
      return o.log("trace", "getNanoInfo"), o.isMacOS || o.isLinux ? Promise.all([o.run("nano --version").then(o.findVersion), o.run("which nano")]).then(function (e) {
        return o.determineFound("Nano", e[0], e[1]);
      }) : Promise.resolve(["Nano", "N/A"]);
    },
    getNvimInfo: function () {
      return o.log("trace", "getNvimInfo"), o.isMacOS || o.isLinux ? Promise.all([o.run("nvim --version").then(o.findVersion), o.run("which nvim")]).then(function (e) {
        return o.determineFound("Nvim", e[0], e[1]);
      }) : Promise.resolve(["Vim", "N/A"]);
    },
    getPhpStormInfo: function () {
      return o.log("trace", "getPhpStormInfo"), o.getDarwinApplicationVersion(o.ideBundleIdentifiers.PhpStorm).then(function (e) {
        return o.determineFound("PhpStorm", e);
      });
    },
    getSublimeTextInfo: function () {
      return o.log("trace", "getSublimeTextInfo"), Promise.all([o.run("subl --version").then(function (e) {
        return o.findVersion(e, /\d+/);
      }), o.which("subl")]).then(function (e) {
        return "" === e[0] && o.isMacOS ? (o.log("trace", "getSublimeTextInfo using plist"), Promise.all([o.getDarwinApplicationVersion(o.ideBundleIdentifiers["Sublime Text"]), "N/A"])) : e;
      }).then(function (e) {
        return o.determineFound("Sublime Text", e[0], e[1]);
      });
    },
    getVimInfo: function () {
      return o.log("trace", "getVimInfo"), o.isMacOS || o.isLinux ? Promise.all([o.run("vim --version").then(o.findVersion), o.run("which vim")]).then(function (e) {
        return o.determineFound("Vim", e[0], e[1]);
      }) : Promise.resolve(["Vim", "N/A"]);
    },
    getVSCodeInfo: function () {
      return o.log("trace", "getVSCodeInfo"), Promise.all([o.run("code --version").then(o.findVersion), o.which("code")]).then(function (e) {
        return o.determineFound("VSCode", e[0], e[1]);
      });
    },
    getVisualStudioInfo: function () {
      return o.log("trace", "getVisualStudioInfo"), o.isWindows ? o.run(`"${process.env["ProgramFiles(x86)"]}/Microsoft Visual Studio/Installer/vswhere.exe" -format json -prerelease`).then(function (e) {
        var t = JSON.parse(e).map(function (e) {
          return {
            Version: e.installationVersion,
            DisplayName: e.displayName
          };
        });
        return o.determineFound("Visual Studio", t.map(function (e) {
          return `${e.Version} (${e.DisplayName})`;
        }));
      }).catch(function () {
        return Promise.resolve(["Visual Studio", o.NotFound]);
      }) : Promise.resolve(["Visual Studio", o.NA]);
    },
    getWebStormInfo: function () {
      return o.log("trace", "getWebStormInfo"), o.getDarwinApplicationVersion(o.ideBundleIdentifiers.WebStorm).then(function (e) {
        return o.determineFound("WebStorm", e);
      });
    },
    getXcodeInfo: function () {
      return o.log("trace", "getXcodeInfo"), o.isMacOS ? Promise.all([o.which("xcodebuild").then(function (e) {
        return o.run(e + " -version");
      }).then(function (e) {
        return `${o.findVersion(e)}/${e.split("Build version ")[1]}`;
      }), o.which("xcodebuild")]).then(function (e) {
        return o.determineFound("Xcode", e[0], e[1]);
      }) : Promise.resolve(["Xcode", "N/A"]);
    }
  };
}, function (e, t, n) {

  n(2);
  var r = n(1);
  e.exports = {
    getBashInfo: function () {
      return r.log("trace", "getBashInfo"), Promise.all([r.run("bash --version").then(r.findVersion), r.which("bash")]).then(function (e) {
        return r.determineFound("Bash", e[0], e[1]);
      });
    },
    getElixirInfo: function () {
      return r.log("trace", "getElixirInfo"), Promise.all([r.run("elixir --version").then(function (e) {
        return r.findVersion(e, /[Elixir]+\s([\d+.[\d+|.]+)/, 1);
      }), r.which("elixir")]).then(function (e) {
        return Promise.resolve(r.determineFound("Elixir", e[0], e[1]));
      });
    },
    getErlangInfo: function () {
      return r.log("trace", "getErlangInfo"), Promise.all([r.run("erl -eval \"{ok, Version} = file:read_file(filename:join([code:root_dir(), 'releases', erlang:system_info(otp_release), 'OTP_VERSION'])), io:fwrite(Version), halt().\" -noshell").then(r.findVersion), r.which("erl")]).then(function (e) {
        return Promise.resolve(r.determineFound("Erlang", e[0], e[1]));
      });
    },
    getGoInfo: function () {
      return r.log("trace", "getGoInfo"), Promise.all([r.run("go version").then(r.findVersion), r.which("go")]).then(function (e) {
        return r.determineFound("Go", e[0], e[1]);
      });
    },
    getJavaInfo: function () {
      return r.log("trace", "getJavaInfo"), Promise.all([r.run("javac -version", {
        unify: !0
      }).then(function (e) {
        return r.findVersion(e, /\d+\.[\w+|.|_|-]+/);
      }), r.run("which javac")]).then(function (e) {
        return r.determineFound("Java", e[0], e[1]);
      });
    },
    getPerlInfo: function () {
      return r.log("trace", "getPerlInfo"), Promise.all([r.run("perl -v").then(r.findVersion), r.which("perl")]).then(function (e) {
        return r.determineFound("Perl", e[0], e[1]);
      });
    },
    getPHPInfo: function () {
      return r.log("trace", "getPHPInfo"), Promise.all([r.run("php -v").then(r.findVersion), r.which("php")]).then(function (e) {
        return r.determineFound("PHP", e[0], e[1]);
      });
    },
    getProtocInfo: function () {
      return r.log("trace", "getProtocInfo"), Promise.all([r.run("protoc --version").then(r.findVersion), r.run("which protoc")]).then(function (e) {
        return r.determineFound("Protoc", e[0], e[1]);
      });
    },
    getPythonInfo: function () {
      return r.log("trace", "getPythonInfo"), Promise.all([r.run("python -V 2>&1").then(r.findVersion), r.run("which python")]).then(function (e) {
        return r.determineFound("Python", e[0], e[1]);
      });
    },
    getPython3Info: function () {
      return r.log("trace", "getPython3Info"), Promise.all([r.run("python3 -V 2>&1").then(r.findVersion), r.run("which python3")]).then(function (e) {
        return r.determineFound("Python3", e[0], e[1]);
      });
    },
    getRInfo: function () {
      return r.log("trace", "getRInfo"), Promise.all([r.run("R --version", {
        unify: !0
      }).then(r.findVersion), r.which("R")]).then(function (e) {
        return r.determineFound("R", e[0], e[1]);
      });
    },
    getRubyInfo: function () {
      return r.log("trace", "getRubyInfo"), Promise.all([r.run("ruby -v").then(r.findVersion), r.which("ruby")]).then(function (e) {
        return r.determineFound("Ruby", e[0], e[1]);
      });
    },
    getRustInfo: function () {
      return r.log("trace", "getRustInfo"), Promise.all([r.run("rustc --version").then(r.findVersion), r.run("which rustc")]).then(function (e) {
        return r.determineFound("Rust", e[0], e[1]);
      });
    },
    getScalaInfo: function () {
      return r.log("trace", "getScalaInfo"), r.isMacOS || r.isLinux ? Promise.all([r.run("scalac -version").then(r.findVersion), r.run("which scalac")]).then(function (e) {
        return r.determineFound("Scala", e[0], e[1]);
      }) : Promise.resolve(["Scala", "N/A"]);
    }
  };
}, function (e, t, n) {

  n(2);
  var r = n(1);
  e.exports = {
    getAptInfo: function () {
      return r.log("trace", "getAptInfo"), r.isLinux ? Promise.all([r.run("apt --version").then(r.findVersion), r.which("apt")]).then(function (e) {
        return r.determineFound("Apt", e[0], e[1]);
      }) : Promise.all(["Apt", "N/A"]);
    },
    getCargoInfo: function () {
      return r.log("trace", "getCargoInfo"), Promise.all([r.run("cargo --version").then(r.findVersion), r.which("cargo").then(r.condensePath)]).then(function (e) {
        return r.determineFound("Cargo", e[0], e[1]);
      });
    },
    getCocoaPodsInfo: function () {
      return r.log("trace", "getCocoaPodsInfo"), r.isMacOS ? Promise.all([r.run("pod --version").then(r.findVersion), r.which("pod")]).then(function (e) {
        return r.determineFound("CocoaPods", e[0], e[1]);
      }) : Promise.all(["CocoaPods", "N/A"]);
    },
    getComposerInfo: function () {
      return r.log("trace", "getComposerInfo"), Promise.all([r.run("composer --version").then(r.findVersion), r.which("composer").then(r.condensePath)]).then(function (e) {
        return r.determineFound("Composer", e[0], e[1]);
      });
    },
    getGradleInfo: function () {
      return r.log("trace", "getGradleInfo"), Promise.all([r.run("gradle --version").then(r.findVersion), r.which("gradle").then(r.condensePath)]).then(function (e) {
        return r.determineFound("Gradle", e[0], e[1]);
      });
    },
    getHomebrewInfo: function () {
      return r.log("trace", "getHomebrewInfo"), r.isMacOS ? Promise.all([r.run("brew --version").then(r.findVersion), r.which("brew")]).then(function (e) {
        return r.determineFound("Homebrew", e[0], e[1]);
      }) : Promise.all(["Homebrew", "N/A"]);
    },
    getMavenInfo: function () {
      return r.log("trace", "getMavenInfo"), Promise.all([r.run("mvn --version").then(r.findVersion), r.which("mvn").then(r.condensePath)]).then(function (e) {
        return r.determineFound("Maven", e[0], e[1]);
      });
    },
    getpip2Info: function () {
      return r.log("trace", "getpip2Info"), Promise.all([r.run("pip2 --version").then(r.findVersion), r.which("pip2").then(r.condensePath)]).then(function (e) {
        return r.determineFound("pip2", e[0], e[1]);
      });
    },
    getpip3Info: function () {
      return r.log("trace", "getpip3Info"), Promise.all([r.run("pip3 --version").then(r.findVersion), r.which("pip3").then(r.condensePath)]).then(function (e) {
        return r.determineFound("pip3", e[0], e[1]);
      });
    },
    getRubyGemsInfo: function () {
      return r.log("trace", "getRubyGemsInfo"), Promise.all([r.run("gem --version").then(r.findVersion), r.which("gem")]).then(function (e) {
        return r.determineFound("RubyGems", e[0], e[1]);
      });
    },
    getYumInfo: function () {
      return r.log("trace", "getYumInfo"), r.isLinux ? Promise.all([r.run("yum --version").then(r.findVersion), r.which("yum")]).then(function (e) {
        return r.determineFound("Yum", e[0], e[1]);
      }) : Promise.all(["Yum", "N/A"]);
    }
  };
}, function (e, t, n) {

  n(2);
  var r = n(1),
      o = n(0);
  e.exports = {
    getYarnWorkspacesInfo: function () {
      return r.log("trace", "getYarnWorkspacesInfo"), Promise.all([r.run("yarn -v"), r.getPackageJsonByPath("package.json").then(function (e) {
        return e && "workspaces" in e;
      })]).then(function (e) {
        var t = "Yarn Workspaces";
        return e[0] && e[1] ? Promise.resolve([t, e[0]]) : Promise.resolve([t, "Not Found"]);
      });
    },
    getLernaInfo: function () {
      return r.log("trace", "getLernaInfo"), Promise.all([r.getPackageJsonByName("lerna").then(function (e) {
        return e && e.version;
      }), r.fileExists(o.join(process.cwd(), "lerna.json"))]).then(function (e) {
        return e[0] && e[1] ? Promise.resolve(["Lerna", e[0]]) : Promise.resolve(["Lerna", "Not Found"]);
      });
    }
  };
}, function (e, t, n) {

  n(16), n(2), n(17);
  var r = n(5),
      o = n(0),
      i = n(1);
  e.exports = {
    getAndroidSDKInfo: function () {
      return i.run("sdkmanager --list").then(function (e) {
        return !e && process.env.ANDROID_HOME ? i.run(`${process.env.ANDROID_HOME}/tools/bin/sdkmanager --list`) : e;
      }).then(function (e) {
        return !e && process.env.ANDROID_HOME ? i.run(`${process.env.ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --list`) : e;
      }).then(function (e) {
        return !e && i.isMacOS ? i.run("~/Library/Android/sdk/tools/bin/sdkmanager --list") : e;
      }).then(function (e) {
        var t = i.parseSDKManagerOutput(e),
            n = function (e) {
          var t,
              n = o.join(e, "source.properties");

          try {
            t = r.readFileSync(n, "utf8");
          } catch (e) {
            if ("ENOENT" === e.code) return;
            throw e;
          }

          for (var i = t.split("\n"), s = 0; s < i.length; s += 1) {
            var a = i[s].split("=");
            if (2 === a.length && "Pkg.Revision" === a[0].trim()) return a[1].trim();
          }
        },
            s = process.env.ANDROID_NDK ? n(process.env.ANDROID_NDK) : process.env.ANDROID_NDK_HOME ? n(process.env.ANDROID_NDK_HOME) : process.env.ANDROID_HOME ? n(o.join(process.env.ANDROID_HOME, "ndk-bundle")) : void 0;

        return t.buildTools.length || t.apiLevels.length || t.systemImages.length || s ? Promise.resolve(["Android SDK", {
          "API Levels": t.apiLevels || i.NotFound,
          "Build Tools": t.buildTools || i.NotFound,
          "System Images": t.systemImages || i.NotFound,
          "Android NDK": s || i.NotFound
        }]) : Promise.resolve(["Android SDK", i.NotFound]);
      });
    },
    getiOSSDKInfo: function () {
      return i.isMacOS ? i.run("xcodebuild -showsdks").then(function (e) {
        return e.match(/[\w]+\s[\d|.]+/g);
      }).then(i.uniq).then(function (e) {
        return e.length ? ["iOS SDK", {
          Platforms: e
        }] : ["iOS SDK", i.NotFound];
      }) : Promise.resolve(["iOS SDK", "N/A"]);
    },
    getWindowsSDKInfo: function () {
      if (i.log("trace", "getWindowsSDKInfo"), i.isWindows) {
        var e = i.NotFound;
        return i.run("reg query HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AppModelUnlock").then(function (t) {
          e = t.split(/[\r\n]/g).slice(1).filter(function (e) {
            return "" !== e;
          }).reduce(function (e, t) {
            var n = t.match(/[^\s]+/g);
            return "0x0" !== n[2] && "0x1" !== n[2] || (n[2] = "0x1" === n[2] ? "Enabled" : "Disabled"), e[n[0]] = n[2], e;
          }, {}), 0 === Object.keys(e).length && (e = i.NotFound);

          try {
            var n = r.readdirSync(`${process.env["ProgramFiles(x86)"]}/Windows Kits/10/Platforms/UAP`);
            e.Versions = n;
          } catch (e) {}

          return Promise.resolve(["Windows SDK", e]);
        });
      }

      return Promise.resolve(["Windows SDK", i.NA]);
    }
  };
}, function (e, t, n) {

  n(2);
  var r = n(1);
  e.exports = {
    getApacheInfo: function () {
      return r.log("trace", "getApacheInfo"), r.isMacOS || r.isLinux ? Promise.all([r.run("apachectl -v").then(r.findVersion), r.run("which apachectl")]).then(function (e) {
        return r.determineFound("Apache", e[0], e[1]);
      }) : Promise.resolve(["Apache", "N/A"]);
    },
    getNginxInfo: function () {
      return r.log("trace", "getNginxInfo"), r.isMacOS || r.isLinux ? Promise.all([r.run("nginx -v 2>&1").then(r.findVersion), r.run("which nginx")]).then(function (e) {
        return r.determineFound("Nginx", e[0], e[1]);
      }) : Promise.resolve(["Nginx", "N/A"]);
    }
  };
}, function (e, t, n) {

  n(16), n(2);
  var r = n(132),
      o = n(1),
      i = n(18);
  e.exports = {
    getContainerInfo: function () {
      return o.log("trace", "getContainerInfo"), o.isLinux ? Promise.all([o.fileExists("/.dockerenv"), o.readFile("/proc/self/cgroup")]).then(function (e) {
        return o.log("trace", "getContainerInfoThen", e), Promise.resolve(["Container", e[0] || e[1] ? "Yes" : "N/A"]);
      }).catch(function (e) {
        return o.log("trace", "getContainerInfoCatch", e);
      }) : Promise.resolve(["Container", "N/A"]);
    },
    getCPUInfo: function () {
      var e;
      o.log("trace", "getCPUInfo");

      try {
        var t = i.cpus();
        e = "(" + t.length + ") " + i.arch() + " " + t[0].model;
      } catch (t) {
        e = "Unknown";
      }

      return Promise.all(["CPU", e]);
    },
    getMemoryInfo: function () {
      return o.log("trace", "getMemoryInfo"), Promise.all(["Memory", `${o.toReadableBytes(i.freemem())} / ${o.toReadableBytes(i.totalmem())}`]);
    },
    getOSInfo: function () {
      return o.log("trace", "getOSInfo"), (o.isMacOS ? o.run("sw_vers -productVersion ") : o.isLinux ? o.run("cat /etc/os-release").then(function (e) {
        var t = (e || "").match(/NAME="(.+)"/),
            n = (e || "").match(/VERSION="(.+)"/) || ["", ""],
            r = null !== n ? n[1] : "";
        return `${t[1]} ${r}`.trim() || "";
      }) : o.isWindows ? Promise.resolve(i.release()) : Promise.resolve()).then(function (e) {
        var t = r(i.platform(), i.release());
        return e && (t += ` ${e}`), ["OS", t];
      });
    },
    getShellInfo: function () {
      if (o.log("trace", "getShellInfo", process.env), o.isMacOS || o.isLinux) {
        var e = process.env.SHELL || o.runSync("getent passwd $LOGNAME | cut -d: -f7 | head -1"),
            t = `${e} --version 2>&1`;
        return e.match("/bin/ash") && (t = `${e} --help 2>&1`), Promise.all([o.run(t).then(o.findVersion), o.which(e)]).then(function (e) {
          return o.determineFound("Shell", e[0] || "Unknown", e[1]);
        });
      }

      return Promise.resolve(["Shell", "N/A"]);
    },
    getGLibcInfo: function () {
      return o.log("trace", "getGLibc"), o.isLinux ? Promise.all([o.run("ldd --version").then(o.findVersion)]).then(function (e) {
        return o.determineFound("GLibc", e[0] || "Unknown");
      }) : Promise.resolve(["GLibc", "N/A"]);
    }
  };
}, function (e, t, n) {

  const r = n(18),
        o = n(133),
        i = n(134);

  e.exports = (e, t) => {
    if (!e && t) throw new Error("You can't specify a `release` without specifying `platform`");
    let n;
    if ("darwin" === (e = e || r.platform())) return t || "darwin" !== r.platform() || (t = r.release()), (t ? Number(t.split(".")[0]) > 15 ? "macOS" : "OS X" : "macOS") + ((n = t ? o(t).name : "") ? " " + n : "");
    return "linux" === e ? (t || "linux" !== r.platform() || (t = r.release()), "Linux" + ((n = t ? t.replace(/^(\d+\.\d+).*/, "$1") : "") ? " " + n : "")) : "win32" === e ? (t || "win32" !== r.platform() || (t = r.release()), "Windows" + ((n = t ? i(t) : "") ? " " + n : "")) : e;
  };
}, function (e, t, n) {

  const r = n(18),
        o = new Map([[18, "Mojave"], [17, "High Sierra"], [16, "Sierra"], [15, "El Capitan"], [14, "Yosemite"], [13, "Mavericks"], [12, "Mountain Lion"], [11, "Lion"], [10, "Snow Leopard"], [9, "Leopard"], [8, "Tiger"], [7, "Panther"], [6, "Jaguar"], [5, "Puma"]]),
        i = e => (e = Number((e || r.release()).split(".")[0]), {
    name: o.get(e),
    version: "10." + (e - 4)
  });

  e.exports = i, e.exports.default = i;
}, function (e, t, n) {

  const r = n(18),
        o = n(135),
        i = new Map([["10.0", "10"], ["6.3", "8.1"], ["6.2", "8"], ["6.1", "7"], ["6.0", "Vista"], ["5.2", "Server 2003"], ["5.1", "XP"], ["5.0", "2000"], ["4.9", "ME"], ["4.1", "98"], ["4.0", "95"]]);

  e.exports = e => {
    const t = /\d+\.\d/.exec(e || r.release());
    if (e && !t) throw new Error("`release` argument doesn't match `n.n`");
    const n = (t || [])[0];

    if ((!e || e === r.release()) && ["6.1", "6.2", "6.3", "10.0"].includes(n)) {
      const e = ((o.sync("wmic", ["os", "get", "Caption"]).stdout || "").match(/2008|2012|2016/) || [])[0];
      if (e) return `Server ${e}`;
    }

    return i.get(n);
  };
}, function (e, t, n) {

  const r = n(0),
        o = n(49),
        i = n(136),
        s = n(146),
        a = n(147),
        c = n(148),
        u = n(149),
        l = n(154),
        f = n(155),
        p = n(157),
        h = n(158),
        d = 1e7;

  function m(e, t, n) {
    let o;
    return (n = Object.assign({
      extendEnv: !0,
      env: {}
    }, n)).extendEnv && (n.env = Object.assign({}, process.env, n.env)), !0 === n.__winShell ? (delete n.__winShell, o = {
      command: e,
      args: t,
      options: n,
      file: e,
      original: {
        cmd: e,
        args: t
      }
    }) : o = i._parse(e, t, n), (n = Object.assign({
      maxBuffer: d,
      buffer: !0,
      stripEof: !0,
      preferLocal: !0,
      localDir: o.options.cwd || process.cwd(),
      encoding: "utf8",
      reject: !0,
      cleanup: !0
    }, o.options)).stdio = h(n), n.preferLocal && (n.env = a.env(Object.assign({}, n, {
      cwd: n.localDir
    }))), n.detached && (n.cleanup = !1), "win32" === process.platform && "cmd.exe" === r.basename(o.command) && o.args.unshift("/q"), {
      cmd: o.command,
      args: o.args,
      opts: n,
      parsed: o
    };
  }

  function g(e, t) {
    return t && e.stripEof && (t = s(t)), t;
  }

  function v(e, t, n) {
    let r = "/bin/sh",
        o = ["-c", t];
    return n = Object.assign({}, n), "win32" === process.platform && (n.__winShell = !0, r = process.env.comspec || "cmd.exe", o = ["/s", "/c", `"${t}"`], n.windowsVerbatimArguments = !0), n.shell && (r = n.shell, delete n.shell), e(r, o, n);
  }

  function y(e, t, {
    encoding: n,
    buffer: r,
    maxBuffer: o
  }) {
    if (!e[t]) return null;
    return (r ? n ? u(e[t], {
      encoding: n,
      maxBuffer: o
    }) : u.buffer(e[t], {
      maxBuffer: o
    }) : new Promise((n, r) => {
      e[t].once("end", n).once("error", r);
    })).catch(e => {
      throw e.stream = t, e.message = `${t} ${e.message}`, e;
    });
  }

  function b(e, t) {
    const {
      stdout: n,
      stderr: r
    } = e;
    let o = e.error;
    const {
      code: i,
      signal: s
    } = e,
          {
      parsed: a,
      joinedCmd: c
    } = t,
          u = t.timedOut || !1;

    if (!o) {
      let e = "";
      Array.isArray(a.opts.stdio) ? ("inherit" !== a.opts.stdio[2] && (e += e.length > 0 ? r : `\n${r}`), "inherit" !== a.opts.stdio[1] && (e += `\n${n}`)) : "inherit" !== a.opts.stdio && (e = `\n${r}${n}`), (o = new Error(`Command failed: ${c}${e}`)).code = i < 0 ? p(i) : i;
    }

    return o.stdout = n, o.stderr = r, o.failed = !0, o.signal = s || null, o.cmd = c, o.timedOut = u, o;
  }

  function w(e, t) {
    let n = e;
    return Array.isArray(t) && t.length > 0 && (n += " " + t.join(" ")), n;
  }

  e.exports = (e, t, n) => {
    const r = m(e, t, n),
          {
      encoding: s,
      buffer: a,
      maxBuffer: u
    } = r.opts,
          p = w(e, t);
    let h, d;

    try {
      h = o.spawn(r.cmd, r.args, r.opts);
    } catch (e) {
      return Promise.reject(e);
    }

    r.opts.cleanup && (d = f(() => {
      h.kill();
    }));
    let v = null,
        x = !1;

    const S = () => {
      v && (clearTimeout(v), v = null), d && d();
    };

    r.opts.timeout > 0 && (v = setTimeout(() => {
      v = null, x = !0, h.kill(r.opts.killSignal);
    }, r.opts.timeout));
    const P = new Promise(e => {
      h.on("exit", (t, n) => {
        S(), e({
          code: t,
          signal: n
        });
      }), h.on("error", t => {
        S(), e({
          error: t
        });
      }), h.stdin && h.stdin.on("error", t => {
        S(), e({
          error: t
        });
      });
    });

    function O() {
      h.stdout && h.stdout.destroy(), h.stderr && h.stderr.destroy();
    }

    const E = () => l(Promise.all([P, y(h, "stdout", {
      encoding: s,
      buffer: a,
      maxBuffer: u
    }), y(h, "stderr", {
      encoding: s,
      buffer: a,
      maxBuffer: u
    })]).then(e => {
      const t = e[0];

      if (t.stdout = e[1], t.stderr = e[2], t.error || 0 !== t.code || null !== t.signal) {
        const e = b(t, {
          joinedCmd: p,
          parsed: r,
          timedOut: x
        });
        if (e.killed = e.killed || h.killed, !r.opts.reject) return e;
        throw e;
      }

      return {
        stdout: g(r.opts, t.stdout),
        stderr: g(r.opts, t.stderr),
        code: 0,
        failed: !1,
        killed: !1,
        signal: null,
        cmd: p,
        timedOut: !1
      };
    }), O);

    return i._enoent.hookChildProcess(h, r.parsed), function (e, t) {
      null != t && (c(t) ? t.pipe(e.stdin) : e.stdin.end(t));
    }(h, r.opts.input), h.then = (e, t) => E().then(e, t), h.catch = e => E().catch(e), h;
  }, e.exports.stdout = (...t) => e.exports(...t).then(e => e.stdout), e.exports.stderr = (...t) => e.exports(...t).then(e => e.stderr), e.exports.shell = (t, n) => v(e.exports, t, n), e.exports.sync = (e, t, n) => {
    const r = m(e, t, n),
          i = w(e, t);
    if (c(r.opts.input)) throw new TypeError("The `input` option cannot be a stream in sync mode");
    const s = o.spawnSync(r.cmd, r.args, r.opts);

    if (s.code = s.status, s.error || 0 !== s.status || null !== s.signal) {
      const e = b(s, {
        joinedCmd: i,
        parsed: r
      });
      if (!r.opts.reject) return e;
      throw e;
    }

    return {
      stdout: g(r.opts, s.stdout),
      stderr: g(r.opts, s.stderr),
      code: 0,
      failed: !1,
      signal: null,
      cmd: i,
      timedOut: !1
    };
  }, e.exports.shellSync = (t, n) => v(e.exports.sync, t, n);
}, function (e, t, n) {

  const r = n(49),
        o = n(137),
        i = n(145);

  function s(e, t, n) {
    const s = o(e, t, n),
          a = r.spawn(s.command, s.args, s.options);
    return i.hookChildProcess(a, s), a;
  }

  e.exports = s, e.exports.spawn = s, e.exports.sync = function (e, t, n) {
    const s = o(e, t, n),
          a = r.spawnSync(s.command, s.args, s.options);
    return a.error = a.error || i.verifyENOENTSync(a.status, s), a;
  }, e.exports._parse = o, e.exports._enoent = i;
}, function (e, t, n) {

  const r = n(0),
        o = n(138),
        i = n(139),
        s = n(140),
        a = n(141),
        c = n(144),
        u = "win32" === process.platform,
        l = /\.(?:com|exe)$/i,
        f = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i,
        p = o(() => c.satisfies(process.version, "^4.8.0 || ^5.7.0 || >= 6.0.0", !0)) || !1;

  function h(e) {
    if (!u) return e;

    const t = function (e) {
      e.file = i(e);
      const t = e.file && a(e.file);
      return t ? (e.args.unshift(e.file), e.command = t, i(e)) : e.file;
    }(e),
          n = !l.test(t);

    if (e.options.forceShell || n) {
      const n = f.test(t);
      e.command = r.normalize(e.command), e.command = s.command(e.command), e.args = e.args.map(e => s.argument(e, n));
      const o = [e.command].concat(e.args).join(" ");
      e.args = ["/d", "/s", "/c", `"${o}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
    }

    return e;
  }

  e.exports = function (e, t, n) {
    t && !Array.isArray(t) && (n = t, t = null);
    const r = {
      command: e,
      args: t = t ? t.slice(0) : [],
      options: n = Object.assign({}, n),
      file: void 0,
      original: {
        command: e,
        args: t
      }
    };
    return n.shell ? function (e) {
      if (p) return e;
      const t = [e.command].concat(e.args).join(" ");
      return u ? (e.command = "string" == typeof e.options.shell ? e.options.shell : process.env.comspec || "cmd.exe", e.args = ["/d", "/s", "/c", `"${t}"`], e.options.windowsVerbatimArguments = !0) : ("string" == typeof e.options.shell ? e.command = e.options.shell : "android" === process.platform ? e.command = "/system/bin/sh" : e.command = "/bin/sh", e.args = ["-c", t]), e;
    }(r) : h(r);
  };
}, function (e, t, n) {

  e.exports = function (e) {
    try {
      return e();
    } catch (e) {}
  };
}, function (e, t, n) {

  const r = n(0),
        o = n(76),
        i = n(77)();

  function s(e, t) {
    const n = process.cwd(),
          s = null != e.options.cwd;
    if (s) try {
      process.chdir(e.options.cwd);
    } catch (e) {}
    let a;

    try {
      a = o.sync(e.command, {
        path: (e.options.env || process.env)[i],
        pathExt: t ? r.delimiter : void 0
      });
    } catch (e) {} finally {
      process.chdir(n);
    }

    return a && (a = r.resolve(s ? e.options.cwd : "", a)), a;
  }

  e.exports = function (e) {
    return s(e) || s(e, !0);
  };
}, function (e, t, n) {

  const r = /([()\][%!^"`<>&|;, *?])/g;
  e.exports.command = function (e) {
    return e = e.replace(r, "^$1");
  }, e.exports.argument = function (e, t) {
    return e = (e = `"${e = (e = (e = `${e}`).replace(/(\\*)"/g, '$1$1\\"')).replace(/(\\*)$/, "$1$1")}"`).replace(r, "^$1"), t && (e = e.replace(r, "^$1")), e;
  };
}, function (e, t, n) {

  const r = n(5),
        o = n(142);

  e.exports = function (e) {
    let t, n;
    Buffer.alloc ? t = Buffer.alloc(150) : (t = new Buffer(150)).fill(0);

    try {
      n = r.openSync(e, "r"), r.readSync(n, t, 0, 150, 0), r.closeSync(n);
    } catch (e) {}

    return o(t.toString());
  };
}, function (e, t, n) {

  var r = n(143);

  e.exports = function (e) {
    var t = e.match(r);
    if (!t) return null;
    var n = t[0].replace(/#! ?/, "").split(" "),
        o = n[0].split("/").pop(),
        i = n[1];
    return "env" === o ? i : o + (i ? " " + i : "");
  };
}, function (e, t, n) {

  e.exports = /^#!.*/;
}, function (e, t) {
  var n;
  t = e.exports = Y, n = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function () {
    var e = Array.prototype.slice.call(arguments, 0);
    e.unshift("SEMVER"), console.log.apply(console, e);
  } : function () {}, t.SEMVER_SPEC_VERSION = "2.0.0";
  var r = 256,
      o = Number.MAX_SAFE_INTEGER || 9007199254740991,
      i = t.re = [],
      s = t.src = [],
      a = 0,
      c = a++;
  s[c] = "0|[1-9]\\d*";
  var u = a++;
  s[u] = "[0-9]+";
  var l = a++;
  s[l] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
  var f = a++;
  s[f] = "(" + s[c] + ")\\.(" + s[c] + ")\\.(" + s[c] + ")";
  var p = a++;
  s[p] = "(" + s[u] + ")\\.(" + s[u] + ")\\.(" + s[u] + ")";
  var h = a++;
  s[h] = "(?:" + s[c] + "|" + s[l] + ")";
  var d = a++;
  s[d] = "(?:" + s[u] + "|" + s[l] + ")";
  var m = a++;
  s[m] = "(?:-(" + s[h] + "(?:\\." + s[h] + ")*))";
  var g = a++;
  s[g] = "(?:-?(" + s[d] + "(?:\\." + s[d] + ")*))";
  var v = a++;
  s[v] = "[0-9A-Za-z-]+";
  var y = a++;
  s[y] = "(?:\\+(" + s[v] + "(?:\\." + s[v] + ")*))";
  var b = a++,
      w = "v?" + s[f] + s[m] + "?" + s[y] + "?";
  s[b] = "^" + w + "$";
  var x = "[v=\\s]*" + s[p] + s[g] + "?" + s[y] + "?",
      S = a++;
  s[S] = "^" + x + "$";
  var P = a++;
  s[P] = "((?:<|>)?=?)";
  var O = a++;
  s[O] = s[u] + "|x|X|\\*";
  var E = a++;
  s[E] = s[c] + "|x|X|\\*";

  var _ = a++;

  s[_] = "[v=\\s]*(" + s[E] + ")(?:\\.(" + s[E] + ")(?:\\.(" + s[E] + ")(?:" + s[m] + ")?" + s[y] + "?)?)?";
  var I = a++;
  s[I] = "[v=\\s]*(" + s[O] + ")(?:\\.(" + s[O] + ")(?:\\.(" + s[O] + ")(?:" + s[g] + ")?" + s[y] + "?)?)?";
  var j = a++;
  s[j] = "^" + s[P] + "\\s*" + s[_] + "$";
  var A = a++;
  s[A] = "^" + s[P] + "\\s*" + s[I] + "$";
  var k = a++;
  s[k] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
  var N = a++;
  s[N] = "(?:~>?)";
  var F = a++;
  s[F] = "(\\s*)" + s[N] + "\\s+", i[F] = new RegExp(s[F], "g");
  var C = a++;
  s[C] = "^" + s[N] + s[_] + "$";
  var M = a++;
  s[M] = "^" + s[N] + s[I] + "$";
  var T = a++;
  s[T] = "(?:\\^)";
  var V = a++;
  s[V] = "(\\s*)" + s[T] + "\\s+", i[V] = new RegExp(s[V], "g");
  var D = a++;
  s[D] = "^" + s[T] + s[_] + "$";
  var B = a++;
  s[B] = "^" + s[T] + s[I] + "$";
  var $ = a++;
  s[$] = "^" + s[P] + "\\s*(" + x + ")$|^$";
  var L = a++;
  s[L] = "^" + s[P] + "\\s*(" + w + ")$|^$";
  var R = a++;
  s[R] = "(\\s*)" + s[P] + "\\s*(" + x + "|" + s[_] + ")", i[R] = new RegExp(s[R], "g");
  var G = a++;
  s[G] = "^\\s*(" + s[_] + ")\\s+-\\s+(" + s[_] + ")\\s*$";
  var W = a++;
  s[W] = "^\\s*(" + s[I] + ")\\s+-\\s+(" + s[I] + ")\\s*$";
  var U = a++;
  s[U] = "(<|>)?=?\\s*\\*";

  for (var q = 0; q < 35; q++) n(q, s[q]), i[q] || (i[q] = new RegExp(s[q]));

  function K(e, t) {
    if (t && "object" == typeof t || (t = {
      loose: !!t,
      includePrerelease: !1
    }), e instanceof Y) return e;
    if ("string" != typeof e) return null;
    if (e.length > r) return null;
    if (!(t.loose ? i[S] : i[b]).test(e)) return null;

    try {
      return new Y(e, t);
    } catch (e) {
      return null;
    }
  }

  function Y(e, t) {
    if (t && "object" == typeof t || (t = {
      loose: !!t,
      includePrerelease: !1
    }), e instanceof Y) {
      if (e.loose === t.loose) return e;
      e = e.version;
    } else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);

    if (e.length > r) throw new TypeError("version is longer than " + r + " characters");
    if (!(this instanceof Y)) return new Y(e, t);
    n("SemVer", e, t), this.options = t, this.loose = !!t.loose;
    var s = e.trim().match(t.loose ? i[S] : i[b]);
    if (!s) throw new TypeError("Invalid Version: " + e);
    if (this.raw = e, this.major = +s[1], this.minor = +s[2], this.patch = +s[3], this.major > o || this.major < 0) throw new TypeError("Invalid major version");
    if (this.minor > o || this.minor < 0) throw new TypeError("Invalid minor version");
    if (this.patch > o || this.patch < 0) throw new TypeError("Invalid patch version");
    s[4] ? this.prerelease = s[4].split(".").map(function (e) {
      if (/^[0-9]+$/.test(e)) {
        var t = +e;
        if (t >= 0 && t < o) return t;
      }

      return e;
    }) : this.prerelease = [], this.build = s[5] ? s[5].split(".") : [], this.format();
  }

  t.parse = K, t.valid = function (e, t) {
    var n = K(e, t);
    return n ? n.version : null;
  }, t.clean = function (e, t) {
    var n = K(e.trim().replace(/^[=v]+/, ""), t);
    return n ? n.version : null;
  }, t.SemVer = Y, Y.prototype.format = function () {
    return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), this.version;
  }, Y.prototype.toString = function () {
    return this.version;
  }, Y.prototype.compare = function (e) {
    return n("SemVer.compare", this.version, this.options, e), e instanceof Y || (e = new Y(e, this.options)), this.compareMain(e) || this.comparePre(e);
  }, Y.prototype.compareMain = function (e) {
    return e instanceof Y || (e = new Y(e, this.options)), J(this.major, e.major) || J(this.minor, e.minor) || J(this.patch, e.patch);
  }, Y.prototype.comparePre = function (e) {
    if (e instanceof Y || (e = new Y(e, this.options)), this.prerelease.length && !e.prerelease.length) return -1;
    if (!this.prerelease.length && e.prerelease.length) return 1;
    if (!this.prerelease.length && !e.prerelease.length) return 0;
    var t = 0;

    do {
      var r = this.prerelease[t],
          o = e.prerelease[t];
      if (n("prerelease compare", t, r, o), void 0 === r && void 0 === o) return 0;
      if (void 0 === o) return 1;
      if (void 0 === r) return -1;
      if (r !== o) return J(r, o);
    } while (++t);
  }, Y.prototype.inc = function (e, t) {
    switch (e) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t);
        break;

      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
        break;

      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
        break;

      case "prerelease":
        0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
        break;

      case "major":
        0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;

      case "minor":
        0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this.prerelease = [];
        break;

      case "patch":
        0 === this.prerelease.length && this.patch++, this.prerelease = [];
        break;

      case "pre":
        if (0 === this.prerelease.length) this.prerelease = [0];else {
          for (var n = this.prerelease.length; --n >= 0;) "number" == typeof this.prerelease[n] && (this.prerelease[n]++, n = -2);

          -1 === n && this.prerelease.push(0);
        }
        t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0]) : this.prerelease = [t, 0]);
        break;

      default:
        throw new Error("invalid increment argument: " + e);
    }

    return this.format(), this.raw = this.version, this;
  }, t.inc = function (e, t, n, r) {
    "string" == typeof n && (r = n, n = void 0);

    try {
      return new Y(e, n).inc(t, r).version;
    } catch (e) {
      return null;
    }
  }, t.diff = function (e, t) {
    if (Z(e, t)) return null;
    var n = K(e),
        r = K(t);

    if (n.prerelease.length || r.prerelease.length) {
      for (var o in n) if (("major" === o || "minor" === o || "patch" === o) && n[o] !== r[o]) return "pre" + o;

      return "prerelease";
    }

    for (var o in n) if (("major" === o || "minor" === o || "patch" === o) && n[o] !== r[o]) return o;
  }, t.compareIdentifiers = J;
  var H = /^[0-9]+$/;

  function J(e, t) {
    var n = H.test(e),
        r = H.test(t);
    return n && r && (e = +e, t = +t), n && !r ? -1 : r && !n ? 1 : e < t ? -1 : e > t ? 1 : 0;
  }

  function z(e, t, n) {
    return new Y(e, n).compare(new Y(t, n));
  }

  function Q(e, t, n) {
    return z(e, t, n) > 0;
  }

  function X(e, t, n) {
    return z(e, t, n) < 0;
  }

  function Z(e, t, n) {
    return 0 === z(e, t, n);
  }

  function ee(e, t, n) {
    return 0 !== z(e, t, n);
  }

  function te(e, t, n) {
    return z(e, t, n) >= 0;
  }

  function ne(e, t, n) {
    return z(e, t, n) <= 0;
  }

  function re(e, t, n, r) {
    var o;

    switch (t) {
      case "===":
        "object" == typeof e && (e = e.version), "object" == typeof n && (n = n.version), o = e === n;
        break;

      case "!==":
        "object" == typeof e && (e = e.version), "object" == typeof n && (n = n.version), o = e !== n;
        break;

      case "":
      case "=":
      case "==":
        o = Z(e, n, r);
        break;

      case "!=":
        o = ee(e, n, r);
        break;

      case ">":
        o = Q(e, n, r);
        break;

      case ">=":
        o = te(e, n, r);
        break;

      case "<":
        o = X(e, n, r);
        break;

      case "<=":
        o = ne(e, n, r);
        break;

      default:
        throw new TypeError("Invalid operator: " + t);
    }

    return o;
  }

  function oe(e, t) {
    if (t && "object" == typeof t || (t = {
      loose: !!t,
      includePrerelease: !1
    }), e instanceof oe) {
      if (e.loose === !!t.loose) return e;
      e = e.value;
    }

    if (!(this instanceof oe)) return new oe(e, t);
    n("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === ie ? this.value = "" : this.value = this.operator + this.semver.version, n("comp", this);
  }

  t.rcompareIdentifiers = function (e, t) {
    return J(t, e);
  }, t.major = function (e, t) {
    return new Y(e, t).major;
  }, t.minor = function (e, t) {
    return new Y(e, t).minor;
  }, t.patch = function (e, t) {
    return new Y(e, t).patch;
  }, t.compare = z, t.compareLoose = function (e, t) {
    return z(e, t, !0);
  }, t.rcompare = function (e, t, n) {
    return z(t, e, n);
  }, t.sort = function (e, n) {
    return e.sort(function (e, r) {
      return t.compare(e, r, n);
    });
  }, t.rsort = function (e, n) {
    return e.sort(function (e, r) {
      return t.rcompare(e, r, n);
    });
  }, t.gt = Q, t.lt = X, t.eq = Z, t.neq = ee, t.gte = te, t.lte = ne, t.cmp = re, t.Comparator = oe;
  var ie = {};

  function se(e, t) {
    if (t && "object" == typeof t || (t = {
      loose: !!t,
      includePrerelease: !1
    }), e instanceof se) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new se(e.raw, t);
    if (e instanceof oe) return new se(e.value, t);
    if (!(this instanceof se)) return new se(e, t);
    if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this.raw = e, this.set = e.split(/\s*\|\|\s*/).map(function (e) {
      return this.parseRange(e.trim());
    }, this).filter(function (e) {
      return e.length;
    }), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
    this.format();
  }

  function ae(e) {
    return !e || "x" === e.toLowerCase() || "*" === e;
  }

  function ce(e, t, n, r, o, i, s, a, c, u, l, f, p) {
    return ((t = ae(n) ? "" : ae(r) ? ">=" + n + ".0.0" : ae(o) ? ">=" + n + "." + r + ".0" : ">=" + t) + " " + (a = ae(c) ? "" : ae(u) ? "<" + (+c + 1) + ".0.0" : ae(l) ? "<" + c + "." + (+u + 1) + ".0" : f ? "<=" + c + "." + u + "." + l + "-" + f : "<=" + a)).trim();
  }

  function ue(e, t, r) {
    for (var o = 0; o < e.length; o++) if (!e[o].test(t)) return !1;

    if (r || (r = {}), t.prerelease.length && !r.includePrerelease) {
      for (o = 0; o < e.length; o++) if (n(e[o].semver), e[o].semver !== ie && e[o].semver.prerelease.length > 0) {
        var i = e[o].semver;
        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
      }

      return !1;
    }

    return !0;
  }

  function le(e, t, n) {
    try {
      t = new se(t, n);
    } catch (e) {
      return !1;
    }

    return t.test(e);
  }

  function fe(e, t, n, r) {
    var o, i, s, a, c;

    switch (e = new Y(e, r), t = new se(t, r), n) {
      case ">":
        o = Q, i = ne, s = X, a = ">", c = ">=";
        break;

      case "<":
        o = X, i = te, s = Q, a = "<", c = "<=";
        break;

      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }

    if (le(e, t, r)) return !1;

    for (var u = 0; u < t.set.length; ++u) {
      var l = t.set[u],
          f = null,
          p = null;
      if (l.forEach(function (e) {
        e.semver === ie && (e = new oe(">=0.0.0")), f = f || e, p = p || e, o(e.semver, f.semver, r) ? f = e : s(e.semver, p.semver, r) && (p = e);
      }), f.operator === a || f.operator === c) return !1;
      if ((!p.operator || p.operator === a) && i(e, p.semver)) return !1;
      if (p.operator === c && s(e, p.semver)) return !1;
    }

    return !0;
  }

  oe.prototype.parse = function (e) {
    var t = this.options.loose ? i[$] : i[L],
        n = e.match(t);
    if (!n) throw new TypeError("Invalid comparator: " + e);
    this.operator = n[1], "=" === this.operator && (this.operator = ""), n[2] ? this.semver = new Y(n[2], this.options.loose) : this.semver = ie;
  }, oe.prototype.toString = function () {
    return this.value;
  }, oe.prototype.test = function (e) {
    return n("Comparator.test", e, this.options.loose), this.semver === ie || ("string" == typeof e && (e = new Y(e, this.options)), re(e, this.operator, this.semver, this.options));
  }, oe.prototype.intersects = function (e, t) {
    if (!(e instanceof oe)) throw new TypeError("a Comparator is required");
    var n;
    if (t && "object" == typeof t || (t = {
      loose: !!t,
      includePrerelease: !1
    }), "" === this.operator) return n = new se(e.value, t), le(this.value, n, t);
    if ("" === e.operator) return n = new se(this.value, t), le(e.semver, n, t);
    var r = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e.operator),
        o = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e.operator),
        i = this.semver.version === e.semver.version,
        s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e.operator),
        a = re(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this.operator) && ("<=" === e.operator || "<" === e.operator),
        c = re(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this.operator) && (">=" === e.operator || ">" === e.operator);
    return r || o || i && s || a || c;
  }, t.Range = se, se.prototype.format = function () {
    return this.range = this.set.map(function (e) {
      return e.join(" ").trim();
    }).join("||").trim(), this.range;
  }, se.prototype.toString = function () {
    return this.range;
  }, se.prototype.parseRange = function (e) {
    var t = this.options.loose;
    e = e.trim();
    var r = t ? i[W] : i[G];
    e = e.replace(r, ce), n("hyphen replace", e), e = e.replace(i[R], "$1$2$3"), n("comparator trim", e, i[R]), e = (e = (e = e.replace(i[F], "$1~")).replace(i[V], "$1^")).split(/\s+/).join(" ");
    var o = t ? i[$] : i[L],
        s = e.split(" ").map(function (e) {
      return function (e, t) {
        return n("comp", e, t), e = function (e, t) {
          return e.trim().split(/\s+/).map(function (e) {
            return function (e, t) {
              n("caret", e, t), t && "object" == typeof t || (t = {
                loose: !!t,
                includePrerelease: !1
              });
              var r = t.loose ? i[B] : i[D];
              return e.replace(r, function (t, r, o, i, s) {
                var a;
                return n("caret", e, t, r, o, i, s), ae(r) ? a = "" : ae(o) ? a = ">=" + r + ".0.0 <" + (+r + 1) + ".0.0" : ae(i) ? a = "0" === r ? ">=" + r + "." + o + ".0 <" + r + "." + (+o + 1) + ".0" : ">=" + r + "." + o + ".0 <" + (+r + 1) + ".0.0" : s ? (n("replaceCaret pr", s), "-" !== s.charAt(0) && (s = "-" + s), a = "0" === r ? "0" === o ? ">=" + r + "." + o + "." + i + s + " <" + r + "." + o + "." + (+i + 1) : ">=" + r + "." + o + "." + i + s + " <" + r + "." + (+o + 1) + ".0" : ">=" + r + "." + o + "." + i + s + " <" + (+r + 1) + ".0.0") : (n("no pr"), a = "0" === r ? "0" === o ? ">=" + r + "." + o + "." + i + " <" + r + "." + o + "." + (+i + 1) : ">=" + r + "." + o + "." + i + " <" + r + "." + (+o + 1) + ".0" : ">=" + r + "." + o + "." + i + " <" + (+r + 1) + ".0.0"), n("caret return", a), a;
              });
            }(e, t);
          }).join(" ");
        }(e, t), n("caret", e), e = function (e, t) {
          return e.trim().split(/\s+/).map(function (e) {
            return function (e, t) {
              t && "object" == typeof t || (t = {
                loose: !!t,
                includePrerelease: !1
              });
              var r = t.loose ? i[M] : i[C];
              return e.replace(r, function (t, r, o, i, s) {
                var a;
                return n("tilde", e, t, r, o, i, s), ae(r) ? a = "" : ae(o) ? a = ">=" + r + ".0.0 <" + (+r + 1) + ".0.0" : ae(i) ? a = ">=" + r + "." + o + ".0 <" + r + "." + (+o + 1) + ".0" : s ? (n("replaceTilde pr", s), "-" !== s.charAt(0) && (s = "-" + s), a = ">=" + r + "." + o + "." + i + s + " <" + r + "." + (+o + 1) + ".0") : a = ">=" + r + "." + o + "." + i + " <" + r + "." + (+o + 1) + ".0", n("tilde return", a), a;
              });
            }(e, t);
          }).join(" ");
        }(e, t), n("tildes", e), e = function (e, t) {
          return n("replaceXRanges", e, t), e.split(/\s+/).map(function (e) {
            return function (e, t) {
              e = e.trim(), t && "object" == typeof t || (t = {
                loose: !!t,
                includePrerelease: !1
              });
              var r = t.loose ? i[A] : i[j];
              return e.replace(r, function (t, r, o, i, s, a) {
                n("xRange", e, t, r, o, i, s, a);
                var c = ae(o),
                    u = c || ae(i),
                    l = u || ae(s),
                    f = l;
                return "=" === r && f && (r = ""), c ? t = ">" === r || "<" === r ? "<0.0.0" : "*" : r && f ? (u && (i = 0), l && (s = 0), ">" === r ? (r = ">=", u ? (o = +o + 1, i = 0, s = 0) : l && (i = +i + 1, s = 0)) : "<=" === r && (r = "<", u ? o = +o + 1 : i = +i + 1), t = r + o + "." + i + "." + s) : u ? t = ">=" + o + ".0.0 <" + (+o + 1) + ".0.0" : l && (t = ">=" + o + "." + i + ".0 <" + o + "." + (+i + 1) + ".0"), n("xRange return", t), t;
              });
            }(e, t);
          }).join(" ");
        }(e, t), n("xrange", e), e = function (e, t) {
          return n("replaceStars", e, t), e.trim().replace(i[U], "");
        }(e, t), n("stars", e), e;
      }(e, this.options);
    }, this).join(" ").split(/\s+/);
    return this.options.loose && (s = s.filter(function (e) {
      return !!e.match(o);
    })), s = s.map(function (e) {
      return new oe(e, this.options);
    }, this);
  }, se.prototype.intersects = function (e, t) {
    if (!(e instanceof se)) throw new TypeError("a Range is required");
    return this.set.some(function (n) {
      return n.every(function (n) {
        return e.set.some(function (e) {
          return e.every(function (e) {
            return n.intersects(e, t);
          });
        });
      });
    });
  }, t.toComparators = function (e, t) {
    return new se(e, t).set.map(function (e) {
      return e.map(function (e) {
        return e.value;
      }).join(" ").trim().split(" ");
    });
  }, se.prototype.test = function (e) {
    if (!e) return !1;
    "string" == typeof e && (e = new Y(e, this.options));

    for (var t = 0; t < this.set.length; t++) if (ue(this.set[t], e, this.options)) return !0;

    return !1;
  }, t.satisfies = le, t.maxSatisfying = function (e, t, n) {
    var r = null,
        o = null;

    try {
      var i = new se(t, n);
    } catch (e) {
      return null;
    }

    return e.forEach(function (e) {
      i.test(e) && (r && -1 !== o.compare(e) || (o = new Y(r = e, n)));
    }), r;
  }, t.minSatisfying = function (e, t, n) {
    var r = null,
        o = null;

    try {
      var i = new se(t, n);
    } catch (e) {
      return null;
    }

    return e.forEach(function (e) {
      i.test(e) && (r && 1 !== o.compare(e) || (o = new Y(r = e, n)));
    }), r;
  }, t.validRange = function (e, t) {
    try {
      return new se(e, t).range || "*";
    } catch (e) {
      return null;
    }
  }, t.ltr = function (e, t, n) {
    return fe(e, t, "<", n);
  }, t.gtr = function (e, t, n) {
    return fe(e, t, ">", n);
  }, t.outside = fe, t.prerelease = function (e, t) {
    var n = K(e, t);
    return n && n.prerelease.length ? n.prerelease : null;
  }, t.intersects = function (e, t, n) {
    return e = new se(e, n), t = new se(t, n), e.intersects(t);
  }, t.coerce = function (e) {
    if (e instanceof Y) return e;
    if ("string" != typeof e) return null;
    var t = e.match(i[k]);
    return null == t ? null : K((t[1] || "0") + "." + (t[2] || "0") + "." + (t[3] || "0"));
  };
}, function (e, t, n) {

  const r = "win32" === process.platform;

  function o(e, t) {
    return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${t} ${e.command}`,
      path: e.command,
      spawnargs: e.args
    });
  }

  function i(e, t) {
    return r && 1 === e && !t.file ? o(t.original, "spawn") : null;
  }

  e.exports = {
    hookChildProcess: function (e, t) {
      if (!r) return;
      const n = e.emit;

      e.emit = function (r, o) {
        if ("exit" === r) {
          const r = i(o, t);
          if (r) return n.call(e, "error", r);
        }

        return n.apply(e, arguments);
      };
    },
    verifyENOENT: i,
    verifyENOENTSync: function (e, t) {
      return r && 1 === e && !t.file ? o(t.original, "spawnSync") : null;
    },
    notFoundError: o
  };
}, function (e, t, n) {

  e.exports = function (e) {
    var t = "string" == typeof e ? "\n" : "\n".charCodeAt(),
        n = "string" == typeof e ? "\r" : "\r".charCodeAt();
    return e[e.length - 1] === t && (e = e.slice(0, e.length - 1)), e[e.length - 1] === n && (e = e.slice(0, e.length - 1)), e;
  };
}, function (e, t, n) {

  const r = n(0),
        o = n(77);
  e.exports = e => {
    let t;
    e = Object.assign({
      cwd: process.cwd(),
      path: process.env[o()]
    }, e);
    let n = r.resolve(e.cwd);
    const i = [];

    for (; t !== n;) i.push(r.join(n, "node_modules/.bin")), t = n, n = r.resolve(n, "..");

    return i.push(r.dirname(process.execPath)), i.concat(e.path).join(r.delimiter);
  }, e.exports.env = t => {
    t = Object.assign({
      env: process.env
    }, t);
    const n = Object.assign({}, t.env),
          r = o({
      env: n
    });
    return t.path = n[r], n[r] = e.exports(t), n;
  };
}, function (e, t, n) {

  var r = e.exports = function (e) {
    return null !== e && "object" == typeof e && "function" == typeof e.pipe;
  };

  r.writable = function (e) {
    return r(e) && !1 !== e.writable && "function" == typeof e._write && "object" == typeof e._writableState;
  }, r.readable = function (e) {
    return r(e) && !1 !== e.readable && "function" == typeof e._read && "object" == typeof e._readableState;
  }, r.duplex = function (e) {
    return r.writable(e) && r.readable(e);
  }, r.transform = function (e) {
    return r.duplex(e) && "function" == typeof e._transform && "object" == typeof e._transformState;
  };
}, function (e, t, n) {

  const r = n(150),
        o = n(152);

  class i extends Error {
    constructor() {
      super("maxBuffer exceeded"), this.name = "MaxBufferError";
    }

  }

  function s(e, t) {
    if (!e) return Promise.reject(new Error("Expected a stream"));
    t = Object.assign({
      maxBuffer: 1 / 0
    }, t);
    const {
      maxBuffer: n
    } = t;
    let s;
    return new Promise((a, c) => {
      const u = e => {
        e && (e.bufferedData = s.getBufferedValue()), c(e);
      };

      (s = r(e, o(t), e => {
        e ? u(e) : a();
      })).on("data", () => {
        s.getBufferedLength() > n && u(new i());
      });
    }).then(() => s.getBufferedValue());
  }

  e.exports = s, e.exports.buffer = (e, t) => s(e, Object.assign({}, t, {
    encoding: "buffer"
  })), e.exports.array = (e, t) => s(e, Object.assign({}, t, {
    array: !0
  })), e.exports.MaxBufferError = i;
}, function (e, t, n) {
  var r = n(31),
      o = n(151),
      i = n(5),
      s = function () {},
      a = /^v?\.0/.test(process.version),
      c = function (e) {
    return "function" == typeof e;
  },
      u = function (e, t, n, u) {
    u = r(u);
    var l = !1;
    e.on("close", function () {
      l = !0;
    }), o(e, {
      readable: t,
      writable: n
    }, function (e) {
      if (e) return u(e);
      l = !0, u();
    });
    var f = !1;
    return function (t) {
      if (!l && !f) return f = !0, function (e) {
        return !!a && !!i && (e instanceof (i.ReadStream || s) || e instanceof (i.WriteStream || s)) && c(e.close);
      }(e) ? e.close(s) : function (e) {
        return e.setHeader && c(e.abort);
      }(e) ? e.abort() : c(e.destroy) ? e.destroy() : void u(t || new Error("stream was destroyed"));
    };
  },
      l = function (e) {
    e();
  },
      f = function (e, t) {
    return e.pipe(t);
  };

  e.exports = function () {
    var e,
        t = Array.prototype.slice.call(arguments),
        n = c(t[t.length - 1] || s) && t.pop() || s;
    if (Array.isArray(t[0]) && (t = t[0]), t.length < 2) throw new Error("pump requires two streams per minimum");
    var r = t.map(function (o, i) {
      var s = i < t.length - 1;
      return u(o, s, i > 0, function (t) {
        e || (e = t), t && r.forEach(l), s || (r.forEach(l), n(e));
      });
    });
    return t.reduce(f);
  };
}, function (e, t, n) {
  var r = n(31),
      o = function () {},
      i = function (e, t, n) {
    if ("function" == typeof t) return i(e, null, t);
    t || (t = {}), n = r(n || o);

    var s = e._writableState,
        a = e._readableState,
        c = t.readable || !1 !== t.readable && e.readable,
        u = t.writable || !1 !== t.writable && e.writable,
        l = function () {
      e.writable || f();
    },
        f = function () {
      u = !1, c || n.call(e);
    },
        p = function () {
      c = !1, u || n.call(e);
    },
        h = function (t) {
      n.call(e, t ? new Error("exited with error code: " + t) : null);
    },
        d = function (t) {
      n.call(e, t);
    },
        m = function () {
      return (!c || a && a.ended) && (!u || s && s.ended) ? void 0 : n.call(e, new Error("premature close"));
    },
        g = function () {
      e.req.on("finish", f);
    };

    return !function (e) {
      return e.setHeader && "function" == typeof e.abort;
    }(e) ? u && !s && (e.on("end", l), e.on("close", l)) : (e.on("complete", f), e.on("abort", m), e.req ? g() : e.on("request", g)), function (e) {
      return e.stdio && Array.isArray(e.stdio) && 3 === e.stdio.length;
    }(e) && e.on("exit", h), e.on("end", p), e.on("finish", f), !1 !== t.error && e.on("error", d), e.on("close", m), function () {
      e.removeListener("complete", f), e.removeListener("abort", m), e.removeListener("request", g), e.req && e.req.removeListener("finish", f), e.removeListener("end", l), e.removeListener("close", l), e.removeListener("finish", f), e.removeListener("exit", h), e.removeListener("end", p), e.removeListener("error", d), e.removeListener("close", m);
    };
  };

  e.exports = i;
}, function (e, t, n) {

  const {
    PassThrough: r
  } = n(153);

  e.exports = e => {
    e = Object.assign({}, e);
    const {
      array: t
    } = e;
    let {
      encoding: n
    } = e;
    const o = "buffer" === n;
    let i = !1;
    t ? i = !(n || o) : n = n || "utf8", o && (n = null);
    let s = 0;
    const a = [],
          c = new r({
      objectMode: i
    });
    return n && c.setEncoding(n), c.on("data", e => {
      a.push(e), i ? s = a.length : s += e.length;
    }), c.getBufferedValue = () => t ? a : o ? Buffer.concat(a, s) : a.join(""), c.getBufferedLength = () => s, c;
  };
}, function (e, t) {
  e.exports = require$$7__default['default'];
}, function (e, t, n) {

  e.exports = (e, t) => (t = t || (() => {}), e.then(e => new Promise(e => {
    e(t());
  }).then(() => e), e => new Promise(e => {
    e(t());
  }).then(() => {
    throw e;
  })));
}, function (e, t, n) {
  var r,
      o = n(47),
      i = n(156),
      s = n(68);

  function a() {
    l && (l = !1, i.forEach(function (e) {
      try {
        process.removeListener(e, u[e]);
      } catch (e) {}
    }), process.emit = d, process.reallyExit = p, r.count -= 1);
  }

  function c(e, t, n) {
    r.emitted[e] || (r.emitted[e] = !0, r.emit(e, t, n));
  }

  "function" != typeof s && (s = s.EventEmitter), process.__signal_exit_emitter__ ? r = process.__signal_exit_emitter__ : ((r = process.__signal_exit_emitter__ = new s()).count = 0, r.emitted = {}), r.infinite || (r.setMaxListeners(1 / 0), r.infinite = !0), e.exports = function (e, t) {
    o.equal(typeof e, "function", "a callback must be provided for exit handler"), !1 === l && f();
    var n = "exit";
    t && t.alwaysLast && (n = "afterexit");
    return r.on(n, e), function () {
      r.removeListener(n, e), 0 === r.listeners("exit").length && 0 === r.listeners("afterexit").length && a();
    };
  }, e.exports.unload = a;
  var u = {};
  i.forEach(function (e) {
    u[e] = function () {
      process.listeners(e).length === r.count && (a(), c("exit", null, e), c("afterexit", null, e), process.kill(process.pid, e));
    };
  }), e.exports.signals = function () {
    return i;
  }, e.exports.load = f;
  var l = !1;

  function f() {
    l || (l = !0, r.count += 1, i = i.filter(function (e) {
      try {
        return process.on(e, u[e]), !0;
      } catch (e) {
        return !1;
      }
    }), process.emit = m, process.reallyExit = h);
  }

  var p = process.reallyExit;

  function h(e) {
    process.exitCode = e || 0, c("exit", process.exitCode, null), c("afterexit", process.exitCode, null), p.call(process, process.exitCode);
  }

  var d = process.emit;

  function m(e, t) {
    if ("exit" === e) {
      void 0 !== t && (process.exitCode = t);
      var n = d.apply(this, arguments);
      return c("exit", process.exitCode, null), c("afterexit", process.exitCode, null), n;
    }

    return d.apply(this, arguments);
  }
}, function (e, t) {
  e.exports = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"], "win32" !== process.platform && e.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT"), "linux" === process.platform && e.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
}, function (e, t, n) {

  const r = n(30);
  let o;
  if ("function" == typeof r.getSystemErrorName) e.exports = r.getSystemErrorName;else {
    try {
      if ("function" != typeof (o = process.binding("uv")).errname) throw new TypeError("uv.errname is not a function");
    } catch (e) {
      console.error("execa/lib/errname: unable to establish process.binding('uv')", e), o = null;
    }

    e.exports = e => i(o, e);
  }

  function i(e, t) {
    if (e) return e.errname(t);
    if (!(t < 0)) throw new Error("err >= 0");
    return `Unknown system error ${t}`;
  }

  e.exports.__test__ = i;
}, function (e, t, n) {

  const r = ["stdin", "stdout", "stderr"];

  e.exports = e => {
    if (!e) return null;
    if (e.stdio && (e => r.some(t => Boolean(e[t])))(e)) throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${r.map(e => `\`${e}\``).join(", ")}`);
    if ("string" == typeof e.stdio) return e.stdio;
    const t = e.stdio || [];
    if (!Array.isArray(t)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
    const n = [],
          o = Math.max(t.length, r.length);

    for (let i = 0; i < o; i++) {
      let o = null;
      void 0 !== t[i] ? o = t[i] : void 0 !== e[r[i]] && (o = e[r[i]]), n[i] = o;
    }

    return n;
  };
}, function (e, t, n) {

  n(16), n(2);
  var r = n(1);
  e.exports = {
    getBazelInfo: function () {
      return r.log("trace", "getBazelInfo"), Promise.all([r.run("bazel --version").then(r.findVersion), r.run("which bazel")]).then(function (e) {
        return r.determineFound("Bazel", e[0], e[1]);
      });
    },
    getCMakeInfo: function () {
      return r.log("trace", "getCMakeInfo"), Promise.all([r.run("cmake --version").then(r.findVersion), r.run("which cmake")]).then(function (e) {
        return r.determineFound("CMake", e[0], e[1]);
      });
    },
    getGCCInfo: function () {
      return r.log("trace", "getGCCInfo"), r.isMacOS || r.isLinux ? Promise.all([r.run("gcc -v 2>&1").then(r.findVersion), r.run("which gcc")]).then(function (e) {
        return r.determineFound("GCC", e[0], e[1]);
      }) : Promise.resolve(["GCC", "N/A"]);
    },
    getClangInfo: function () {
      return r.log("trace", "getClangInfo"), Promise.all([r.run("clang --version").then(function (e) {
        return r.isMacOS ? (e.match(/clang-(.*)\)/) || [])[1] : (e.match(/([0-9].*) /) || [])[1];
      }), r.which("clang")]).then(function (e) {
        return r.determineFound("Clang", e[0], e[1]);
      });
    },
    getGitInfo: function () {
      return r.log("trace", "getGitInfo"), Promise.all([r.run("git --version").then(r.findVersion), r.run("which git")]).then(function (e) {
        return r.determineFound("Git", e[0], e[1]);
      });
    },
    getMakeInfo: function () {
      return r.log("trace", "getMakeInfo"), r.isMacOS || r.isLinux ? Promise.all([r.run("make --version").then(r.findVersion), r.run("which make")]).then(function (e) {
        return r.determineFound("Make", e[0], e[1]);
      }) : Promise.resolve(["Make", "N/A"]);
    },
    getMercurialInfo: function () {
      return r.log("trace", "getMercurialInfo"), r.isMacOS || r.isLinux ? Promise.all([r.run("hg --version").then(r.findVersion), r.run("which hg")]).then(function (e) {
        return r.determineFound("Mercurial", e[0], e[1]);
      }) : Promise.resolve(["Mercurial", "N/A"]);
    },
    getSubversionInfo: function () {
      return r.log("trace", "getSubversionInfo"), r.isMacOS || r.isLinux ? Promise.all([r.run("svn --version").then(r.findVersion), r.run("which svn")]).then(function (e) {
        return r.determineFound("Subversion", e[0], e[1]);
      }) : Promise.resolve(["Subversion", "N/A"]);
    },
    getFFmpegInfo: function () {
      return r.log("trace", "getFFmpegInfo"), Promise.all([r.run("ffmpeg -version").then(r.findVersion), r.which("ffmpeg")]).then(function (e) {
        return r.determineFound("FFmpeg", e[0], e[1]);
      });
    }
  };
}, function (e, t, n) {

  n(2);
  var r = n(1);
  e.exports = {
    getDockerInfo: function () {
      return r.log("trace", "getDockerInfo"), Promise.all([r.run("docker --version").then(r.findVersion), r.which("docker")]).then(function (e) {
        return r.determineFound("Docker", e[0], e[1]);
      });
    },
    getParallelsInfo: function () {
      return r.log("trace", "getParallelsInfo"), Promise.all([r.run("prlctl --version").then(r.findVersion), r.which("prlctl")]).then(function (e) {
        return r.determineFound("Parallels", e[0], e[1]);
      });
    },
    getVirtualBoxInfo: function () {
      return r.log("trace", "getVirtualBoxInfo"), Promise.all([r.run("vboxmanage --version").then(r.findVersion), r.which("vboxmanage")]).then(function (e) {
        return r.determineFound("VirtualBox", e[0], e[1]);
      });
    },
    getVMwareFusionInfo: function () {
      return r.log("trace", "getVMwareFusionInfo"), r.getDarwinApplicationVersion("com.vmware.fusion").then(function (e) {
        return r.determineFound("VMWare Fusion", e, "N/A");
      });
    }
  };
}, function (e, t, n) {

  n(162), n(64), n(16), n(17), n(22), n(74);
  var r = n(163),
      o = n(1);

  function i(e, t) {
    return o.log("trace", "clean", e), Object.keys(e).reduce(function (n, r) {
      return !t.showNotFound && "Not Found" === e[r] || "N/A" === e[r] || void 0 === e[r] || 0 === Object.keys(e[r]).length ? n : o.isObject(e[r]) ? Object.values(e[r]).every(function (e) {
        return "N/A" === e || !t.showNotFound && "Not Found" === e;
      }) ? n : Object.assign(n, {
        [r]: i(e[r], t)
      }) : Object.assign(n, {
        [r]: e[r]
      });
    }, {});
  }

  function s(e, t) {
    o.log("trace", "formatHeaders"), t || (t = {
      type: "underline"
    });
    var n = {
      underline: ["[4m", "[0m"]
    };
    return e.slice().split("\n").map(function (e) {
      if (":" === e.slice("-1")) {
        var r = e.match(/^[\s]*/g)[0];
        return `${r}${n[t.type][0]}${e.slice(r.length)}${n[t.type][1]}`;
      }

      return e;
    }).join("\n");
  }

  function a(e) {
    return o.log("trace", "formatPackages"), e.npmPackages ? Object.assign(e, {
      npmPackages: Object.entries(e.npmPackages || {}).reduce(function (e, t) {
        var n = t[0],
            r = t[1];
        if ("Not Found" === r) return Object.assign(e, {
          [n]: r
        });
        var o = r.wanted ? `${r.wanted} =>` : "",
            i = Array.isArray(r.installed) ? r.installed.join(", ") : r.installed,
            s = r.duplicates ? `(${r.duplicates.join(", ")})` : "";
        return Object.assign(e, {
          [n]: `${o} ${i} ${s}`
        });
      }, {})
    }) : e;
  }

  function c(e, t, n) {
    return n || (n = {
      emptyMessage: "None"
    }), Array.isArray(t) && (t = t.length > 0 ? t.join(", ") : n.emptyMessage), {
      [e]: t
    };
  }

  function u(e) {
    return o.log("trace", "serializeArrays"), function e(t, n) {
      return Object.entries(t).reduce(function (t, r) {
        var i = r[0],
            s = r[1];
        return o.isObject(s) ? Object.assign(t, {
          [i]: e(s, n)
        }) : Object.assign(t, n(i, s));
      }, {});
    }(e, c);
  }

  function l(e) {
    return o.log("trace", "serializeVersionsAndPaths"), Object.entries(e).reduce(function (e, t) {
      return Object.assign(e, {
        [t[0]]: Object.entries(t[1]).reduce(function (e, t) {
          var n = t[0],
              r = t[1];
          return r.version ? Object.assign(e, {
            [n]: [r.version, r.path].filter(Boolean).join(" - ")
          }) : Object.assign(e, {
            [n]: [r][0]
          });
        }, {})
      }, {});
    }, {});
  }

  function f(e) {
    return r(e, {
      indent: "  ",
      prefix: "\n",
      postfix: "\n"
    });
  }

  function p(e) {
    return e.slice().split("\n").map(function (e) {
      if ("" !== e) {
        var t = ":" === e.slice("-1"),
            n = e.search(/\S|$/);
        return t ? `${"#".repeat(n / 2 + 1)} ` + e.slice(n) : " - " + e.slice(n);
      }

      return "";
    }).join("\n");
  }

  function h(e, t) {
    return t || (t = {
      indent: "  "
    }), JSON.stringify(e, null, t.indent);
  }

  e.exports = {
    json: function (e, t) {
      return o.log("trace", "formatToJson"), t || (t = {}), e = o.pipe([function () {
        return i(e, t);
      }, t.title ? function (e) {
        return {
          [t.title]: e
        };
      } : o.noop, h])(e), e = t.console ? `\n${e}\n` : e;
    },
    markdown: function (e, t) {
      return o.log("trace", "formatToMarkdown"), o.pipe([function () {
        return i(e, t);
      }, a, u, l, f, p, t.title ? function (e) {
        return `\n# ${t.title}${e}`;
      } : o.noop])(e, t);
    },
    yaml: function (e, t) {
      return o.log("trace", "formatToYaml", t), o.pipe([function () {
        return i(e, t);
      }, a, u, l, t.title ? function (e) {
        return {
          [t.title]: e
        };
      } : o.noop, f, t.console ? s : o.noop])(e, t);
    }
  };
}, function (e, t, n) {
  n(28)("search", 1, function (e, t, n) {
    return [function (n) {

      var r = e(this),
          o = null == n ? void 0 : n[t];
      return void 0 !== o ? o.call(n, r) : new RegExp(n)[t](String(r));
    }, n];
  });
}, function (e, t, n) {

  var r = n(164),
      o = n(165),
      i = n(169),
      s = ["object", "array"];

  e.exports = function (e, t) {
    var n = o(t),
        a = n.colors,
        c = n.prefix,
        u = n.postfix,
        l = n.dateToString,
        f = n.errorToString,
        p = n.indent,
        h = new Map();

    function d(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
      if (0 === Object.keys(e).length) return " {}";
      var o = "\n",
          a = i(t, p);
      return Object.keys(e).forEach(function (c) {
        var u = e[c],
            l = r(u),
            f = i(n, "  "),
            p = -1 !== s.indexOf(l) ? "" : " ",
            h = v(u) ? " [Circular]" : g(l, u, t + 1, n);
        o += `${f}${a}${c}:${p}${h}\n`;
      }), o.substring(0, o.length - 1);
    }

    function m(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
      if (0 === e.length) return " []";
      var o = "\n",
          s = i(t, p);
      return e.forEach(function (e) {
        var a = r(e),
            c = i(n, "  "),
            u = v(e) ? "[Circular]" : g(a, e, t, n + 1).toString().trimLeft();
        o += `${c}${s}- ${u}\n`;
      }), o.substring(0, o.length - 1);
    }

    function g(e, t, n, r) {
      switch (e) {
        case "array":
          return m(t, n, r);

        case "object":
          return d(t, n, r);

        case "string":
          return a.string(t);

        case "symbol":
          return a.symbol(t.toString());

        case "number":
          return a.number(t);

        case "boolean":
          return a.boolean(t);

        case "null":
          return a.null("null");

        case "undefined":
          return a.undefined("undefined");

        case "date":
          return a.date(l(t));

        case "error":
          return a.error(f(t));

        default:
          return t && t.toString ? t.toString() : Object.prototype.toString.call(t);
      }
    }

    function v(e) {
      return -1 !== ["object", "array"].indexOf(r(e)) && (!!h.has(e) || (h.set(e), !1));
    }

    var y = "";
    return h.set(e), "object" === r(e) && Object.keys(e).length > 0 ? y = d(e) : "array" === r(e) && e.length > 0 && (y = m(e)), 0 === y.length ? "" : `${c}${y.slice(1)}${u}`;
  };
}, function (e, t, n) {

  e.exports = function (e) {
    return Array.isArray(e) ? "array" : e instanceof Date ? "date" : e instanceof Error ? "error" : null === e ? "null" : "object" == typeof e && "[object Object]" === Object.prototype.toString.call(e) ? "object" : typeof e;
  };
}, function (e, t, n) {

  var r = n(166),
      o = n(167),
      i = n(168),
      s = " ",
      a = "\n",
      c = "";

  function u(e, t) {
    return void 0 === e ? t : e;
  }

  e.exports = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return {
      indent: u(e.indent, s),
      prefix: u(e.prefix, a),
      postfix: u(e.postfix, c),
      errorToString: e.errorToString || r,
      dateToString: e.dateToString || o,
      colors: Object.assign({}, i, e.colors)
    };
  };
}, function (e, t, n) {

  e.exports = function (e) {
    return Error.prototype.toString.call(e);
  };
}, function (e, t, n) {

  e.exports = function (e) {
    return `new Date(${Date.prototype.toISOString.call(e)})`;
  };
}, function (e, t, n) {

  function r(e) {
    return e;
  }

  e.exports = {
    date: r,
    error: r,
    symbol: r,
    string: r,
    number: r,
    boolean: r,
    null: r,
    undefined: r
  };
}, function (e, t, n) {

  e.exports = function () {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "  ", n = "", r = 0; r < e; r += 1) n += t;

    return n;
  };
}, function (e, t, n) {

  e.exports = {
    defaults: {
      System: ["OS", "CPU", "Memory", "Container", "Shell"],
      Binaries: ["Node", "Yarn", "npm", "Watchman"],
      Managers: ["Apt", "Cargo", "CocoaPods", "Composer", "Gradle", "Homebrew", "Maven", "pip2", "pip3", "RubyGems", "Yum"],
      Utilities: ["Bazel", "CMake", "Make", "GCC", "Git", "Clang", "Mercurial", "Subversion", "FFmpeg"],
      Servers: ["Apache", "Nginx"],
      Virtualization: ["Docker", "Parallels", "VirtualBox", "VMware Fusion"],
      SDKs: ["iOS SDK", "Android SDK", "Windows SDK"],
      IDEs: ["Android Studio", "Atom", "Emacs", "IntelliJ", "NVim", "Nano", "PhpStorm", "Sublime Text", "VSCode", "Visual Studio", "Vim", "WebStorm", "Xcode"],
      Languages: ["Bash", "Go", "Elixir", "Erlang", "Java", "Perl", "PHP", "Protoc", "Python", "Python3", "R", "Ruby", "Rust", "Scala"],
      Databases: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
      Browsers: ["Brave Browser", "Chrome", "Chrome Canary", "Edge", "Firefox", "Firefox Developer Edition", "Firefox Nightly", "Internet Explorer", "Safari", "Safari Technology Preview"],
      Monorepos: ["Yarn Workspaces", "Lerna"],
      npmPackages: null,
      npmGlobalPackages: null
    },
    jest: {
      System: ["OS", "CPU"],
      Binaries: ["Node", "Yarn", "npm"],
      npmPackages: ["jest"]
    },
    "react-native": {
      System: ["OS", "CPU"],
      Binaries: ["Node", "Yarn", "npm", "Watchman"],
      SDKs: ["iOS SDK", "Android SDK", "Windows SDK"],
      IDEs: ["Android Studio", "Xcode", "Visual Studio"],
      npmPackages: ["react", "react-native"],
      npmGlobalPackages: ["react-native-cli"]
    },
    nyc: {
      System: ["OS", "CPU", "Memory"],
      Binaries: ["Node", "Yarn", "npm"],
      npmPackages: "/**/{*babel*,@babel/*/,*istanbul*,nyc,source-map-support,typescript,ts-node}"
    },
    webpack: {
      System: ["OS", "CPU"],
      Binaries: ["Node", "Yarn", "npm"],
      npmPackages: "*webpack*",
      npmGlobalPackages: ["webpack", "webpack-cli"]
    },
    "styled-components": {
      System: ["OS", "CPU"],
      Binaries: ["Node", "Yarn", "npm"],
      Browsers: ["Chrome", "Firefox", "Safari"],
      npmPackages: "*styled-components*"
    },
    "create-react-app": {
      System: ["OS", "CPU"],
      Binaries: ["Node", "npm", "Yarn"],
      Browsers: ["Chrome", "Edge", "Internet Explorer", "Firefox", "Safari"],
      npmPackages: ["react", "react-dom", "react-scripts"],
      npmGlobalPackages: ["create-react-app"],
      options: {
        duplicates: !0,
        showNotFound: !0
      }
    },
    apollo: {
      System: ["OS"],
      Binaries: ["Node", "npm", "Yarn"],
      Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
      npmPackages: "{*apollo*,@apollo/*}",
      npmGlobalPackages: "{*apollo*,@apollo/*}"
    },
    "react-native-web": {
      System: ["OS", "CPU"],
      Binaries: ["Node", "npm", "Yarn"],
      Browsers: ["Chrome", "Edge", "Internet Explorer", "Firefox", "Safari"],
      npmPackages: ["react", "react-native-web"],
      options: {
        showNotFound: !0
      }
    },
    babel: {
      System: ["OS"],
      Binaries: ["Node", "npm", "Yarn"],
      Monorepos: ["Yarn Workspaces", "Lerna"],
      npmPackages: "{*babel*,@babel/*,eslint,webpack,create-react-app,react-native,lerna,jest}"
    },
    playwright: {
      System: ["OS", "Memory", "Container"],
      Binaries: ["Node", "Yarn", "npm"],
      Languages: ["Bash"],
      npmPackages: "playwright*"
    }
  };
}]);

function init() {
  let prog = sade__default['default'](name + ' [project_directory]', true);
  prog.version(version).describe('Create a JXA App project setup').option('--template <path-to-template>', 'specify a template for the created project').option('--verbose', 'print additional logs').option('--use-pnp', 'use yarn plug-and-play manager').option('--use-npm', 'use npm to install packages');
  prog.action((project_directory, opts) => {
    if (typeof project_directory === 'undefined') {
      console.error('Please specify the project directory:');
      console.log(`  ${kleur__default['default'].blue(name)} ${kleur__default['default'].green('[project_directory]')}`);
      console.log();
      console.log('For example:');
      console.log(`  ${kleur__default['default'].blue(name)} ${kleur__default['default'].green('my-jxa-app')}`);
      console.log();
      console.log(`Run ${kleur__default['default'].blue(`${name} --help`)} to see all options.`);
      process.exit(1);
    }

    const root = path__default['default'].resolve(project_directory);
    const appName = path__default['default'].basename(root);
    let usePnp = opts['use-pnp'];
    validateProjectName__default['default'](appName);
    fs__default['default'].ensureDirSync(project_directory);

    if (!isSafeToCreateProjectIn(root, project_directory)) {
      process.exit(1);
    }

    console.log();
    console.log(`Creating a new JXA app in ${kleur__default['default'].green(root)}.`);
    console.log();
    const packageJson = {
      name: appName,
      version: '0.1.0',
      private: true
    };
    fs__default['default'].writeFileSync(path__default['default'].join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + os__default['default'].EOL);
    const useYarn = opts['use-npm'] ? false : shouldUseYarn();
    const originalDirectory = process.cwd();
    process.chdir(root);

    if (!useYarn && !checkThatNpmCanReadCwd()) {
      process.exit(1);
    } else if (usePnp) {
      const yarnInfo = checkYarnVersion();

      if (yarnInfo.yarnVersion) {
        if (!yarnInfo.hasMinYarnPnp) {
          console.log(kleur__default['default'].yellow(`You are using Yarn ${yarnInfo.yarnVersion} together with the --use-pnp flag, but Plug'n'Play is only supported starting from the 1.12 release.\n\n` + `Please update to Yarn 1.12 or higher for a better, fully supported experience.\n`)); // 1.11 had an issue with webpack-dev-middleware, so better not use PnP with it (never reached stable, but still)

          usePnp = false;
        }

        if (!yarnInfo.hasMaxYarnPnp) {
          console.log(kleur__default['default'].yellow('The --use-pnp flag is no longer necessary with yarn 2 and will be deprecated and removed in a future release.\n')); // 2 supports PnP by default and breaks when trying to use the flag

          usePnp = false;
        }
      }
    }

    if (useYarn) {
      let yarnUsesDefaultRegistry = true;

      try {
        yarnUsesDefaultRegistry = require$$5.execSync('yarnpkg config get registry').toString().trim() === 'https://registry.yarnpkg.com';
      } catch (e) {// ignore
      }
    }

    run(root, appName, version, opts['verbose'], originalDirectory, opts['template'], useYarn, usePnp); //install(root, useYarn, opts['use-pnp'], ["jxabundler"], true, true)
  });
  prog.parse(process.argv);
}

function shouldUseYarn() {
  try {
    require$$5.execSync('yarnpkg --version', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    return false;
  }
}

function install(root, useYarn, usePnp, dependencies, verbose, isOnline) {
  return new Promise((resolve, reject) => {
    let command;
    let args;

    if (useYarn) {
      command = 'yarnpkg';
      args = ['add', '--exact'];

      if (!isOnline) {
        args.push('--offline');
      }

      if (usePnp) {
        args.push('--enable-pnp');
      }

      [].push.apply(args, dependencies); // Explicitly set cwd() to work around issues like
      // https://github.com/facebook/create-react-app/issues/3326.
      // Unfortunately we can only do this for Yarn because npm support for
      // equivalent --prefix flag doesn't help with this issue.
      // This is why for npm, we run checkThatNpmCanReadCwd() early instead.

      args.push('--cwd');
      args.push(root);

      if (!isOnline) {
        console.log(kleur__default['default'].yellow('You appear to be offline.'));
        console.log(kleur__default['default'].yellow('Falling back to the local Yarn cache.'));
        console.log();
      }
    } else {
      command = 'npm';
      args = ['install', '--save', '--save-exact', '--loglevel', 'error'].concat(dependencies);

      if (usePnp) {
        console.log(kleur__default['default'].yellow("NPM doesn't support PnP."));
        console.log(kleur__default['default'].yellow('Falling back to the regular installs.'));
        console.log();
      }
    }

    if (verbose) {
      args.push('--verbose');
    }

    const child = spawn__default['default'](command, args, {
      stdio: 'inherit'
    });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }

      resolve();
    });
  });
}

function run(root, appName, version, verbose, originalDirectory, template, useYarn, usePnp) {
  Promise.all([getInstallPackage(version, originalDirectory), getTemplateInstallPackage(template, originalDirectory)]).then(([packageToInstall, templateToInstall]) => {
    const allDependencies = ['jxabundler', packageToInstall];
    console.log('Installing packages. This might take a couple of minutes.');
    Promise.all([getPackageInfo(packageToInstall), getPackageInfo(templateToInstall)]).then(([packageInfo, templateInfo]) => checkIfOnline(useYarn).then(isOnline => ({
      isOnline,
      packageInfo,
      templateInfo
    }))).then(({
      isOnline,
      packageInfo,
      templateInfo
    }) => {
      let packageVersion = semver__default['default'].coerce(packageInfo.version);
      const templatesVersionMinimum = '0.0.0'; // Assume compatibility if we can't test the version.

      if (!semver__default['default'].valid(packageVersion)) {
        packageVersion = templatesVersionMinimum;
      } // Only support templates when used alongside new cjxa-scripts versions.


      const supportsTemplates = semver__default['default'].gte(packageVersion, templatesVersionMinimum);

      if (supportsTemplates) {
        allDependencies.push(templateToInstall);
      } else if (template) {
        console.log('');
        console.log(`The ${kleur__default['default'].cyan(packageInfo.name)} version you're using ${packageInfo.name === 'cjxa-scripts' ? 'is not' : 'may not be'} compatible with the ${kleur__default['default'].cyan('--template')} option.`);
        console.log('');
      }

      console.log(`Installing ${kleur__default['default'].cyan('jxabundler')} and ${kleur__default['default'].cyan(packageInfo.name)}${supportsTemplates ? ` with ${kleur__default['default'].cyan(templateInfo.name)}` : ''}...`);
      console.log();
      return install(root, useYarn, usePnp, allDependencies, verbose, isOnline).then(() => ({
        packageInfo,
        supportsTemplates,
        templateInfo
      }));
    }).then(async ({
      packageInfo,
      supportsTemplates,
      templateInfo
    }) => {
      const packageName = packageInfo.name;
      const templateName = supportsTemplates ? templateInfo.name : undefined;
      checkNodeVersion(packageName);
      setCaretRangeForRuntimeDeps(packageName);
      const pnpPath = path__default['default'].resolve(process.cwd(), '.pnp.js');
      const nodeArgs = fs__default['default'].existsSync(pnpPath) ? ['--require', pnpPath] : [];
      await executeNodeScript({
        cwd: process.cwd(),
        args: nodeArgs
      }, [root, appName, verbose, originalDirectory, templateName], `
          var init = require('${packageName}/scripts/init.js');
          init.apply(null, JSON.parse(process.argv[1]));
        `); // if (version === 'cjxa-scripts@0.9.x') {
      //   console.log(
      //     kleur.yellow(
      //       `\nNote: the project was bootstrapped with an old unsupported version of tools.\n` +
      //         `Please update to Node >=10 and npm >=6 to get supported tools in new projects.\n`
      //     )
      //   );
      // }
    }).catch(reason => {
      console.log();
      console.log('Aborting installation.');

      if (reason.command) {
        console.log(`  ${kleur__default['default'].cyan(reason.command)} has failed.`);
      } else {
        console.log(kleur__default['default'].red('Unexpected error. Please report it as a bug:'));
        console.log(reason);
      }

      console.log(); // On 'exit' we will delete these files from target directory.

      const knownGeneratedFiles = ['package.json', 'yarn.lock', 'node_modules'];
      const currentFiles = fs__default['default'].readdirSync(path__default['default'].join(root));
      currentFiles.forEach(file => {
        knownGeneratedFiles.forEach(fileToMatch => {
          // This removes all knownGeneratedFiles.
          if (file === fileToMatch) {
            console.log(`Deleting generated file... ${kleur__default['default'].cyan(file)}`);
            fs__default['default'].removeSync(path__default['default'].join(root, file));
          }
        });
      });
      const remainingFiles = fs__default['default'].readdirSync(path__default['default'].join(root));

      if (!remainingFiles.length) {
        // Delete target folder if empty
        console.log(`Deleting ${kleur__default['default'].cyan(`${appName}/`)} from ${kleur__default['default'].cyan(path__default['default'].resolve(root, '..'))}`);
        process.chdir(path__default['default'].resolve(root, '..'));
        fs__default['default'].removeSync(path__default['default'].join(root));
      }

      console.log('Done.');
      process.exit(1);
    });
  });
}

function getInstallPackage(version, originalDirectory) {
  let packageToInstall = 'cjxa-scripts';
  const validSemver = semver__default['default'].valid(version);

  if (validSemver) {
    packageToInstall += `@${validSemver}`;
  } else if (version) {
    if (version[0] === '@' && !version.includes('/')) {
      packageToInstall += version;
    } else if (version.match(/^file:/)) {
      packageToInstall = `file:${path__default['default'].resolve(originalDirectory, version.match(/^file:(.*)?$/)[1])}`;
    } else {
      // for tar.gz or alternative paths
      packageToInstall = version;
    }
  }

  const scriptsToWarn = [// {
    //   name: 'cjxa-scripts-ts',
    //   message: kleur.yellow(
    //     `The cjxa-scripts-ts package is deprecated. TypeScript is now supported natively in Create React App. You can use the ${kleur.green(
    //       '--template typescript'
    //     )} option instead when generating your app to include TypeScript support. Would you like to continue using cjxa-scripts-ts?`
    //   ),
    // },
  ];

  for (const script of scriptsToWarn) {
    if (packageToInstall.startsWith(script.name)) {
      return prompts__default['default']({
        type: 'confirm',
        name: 'useScript',
        message: script.message,
        initial: false
      }).then(answer => {
        if (!answer.useScript) {
          process.exit(0);
        }

        return packageToInstall;
      });
    }
  }

  return Promise.resolve(packageToInstall);
}

function getTemplateInstallPackage(template, originalDirectory) {
  let templateToInstall = 'cjxa-template';

  if (template) {
    if (template.match(/^file:/)) {
      templateToInstall = `file:${path__default['default'].resolve(originalDirectory, template.match(/^file:(.*)?$/)[1])}`;
    } else if (template.includes('://') || template.match(/^.+\.(tgz|tar\.gz)$/)) {
      // for tar.gz or alternative paths
      templateToInstall = template;
    } else {
      // Add prefix 'cjxa-template-' to non-prefixed templates, leaving any
      // @scope/ and @version intact.
      const packageMatch = template.match(/^(@[^/]+\/)?([^@]+)?(@.+)?$/);
      const scope = packageMatch[1] || '';
      const templateName = packageMatch[2] || '';
      const version = packageMatch[3] || '';

      if (templateName === templateToInstall || templateName.startsWith(`${templateToInstall}-`)) {
        // Covers:
        // - cjxa-template
        // - @SCOPE/cjxa-template
        // - cjxa-template-NAME
        // - @SCOPE/cjxa-template-NAME
        templateToInstall = `${scope}${templateName}${version}`;
      } else if (version && !scope && !templateName) {
        // Covers using @SCOPE only
        templateToInstall = `${version}/${templateToInstall}`;
      } else {
        // Covers templates without the `cjxa-template` prefix:
        // - NAME
        // - @SCOPE/NAME
        templateToInstall = `${scope}${templateToInstall}-${templateName}${version}`;
      }
    }
  }

  return Promise.resolve(templateToInstall);
}

function getTemporaryDirectory() {
  return new Promise((resolve, reject) => {
    // Unsafe cleanup lets us recursively delete the directory if it contains
    // contents; by default it only allows removal if it's empty
    tmp__default['default'].dir({
      unsafeCleanup: true
    }, (err, tmpdir, callback) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          tmpdir: tmpdir,
          cleanup: () => {
            try {
              callback();
            } catch (ignored) {// Callback might throw and fail, since it's a temp directory the
              // OS will clean it up eventually...
            }
          }
        });
      }
    });
  });
}

function extractStream(stream, dest) {
  return new Promise((resolve, reject) => {
    stream.pipe(tarPack.unpack(dest, err => {
      if (err) {
        reject(err);
      } else {
        resolve(dest);
      }
    }));
  });
} // Extract package name from tarball url or path.


function getPackageInfo(installPackage) {
  if (installPackage.match(/^.+\.(tgz|tar\.gz)$/)) {
    return getTemporaryDirectory().then(obj => {
      let stream;

      if (/^http/.test(installPackage)) {
        stream = hyperquest__default['default'](installPackage);
      } else {
        stream = fs__default['default'].createReadStream(installPackage);
      }

      return extractStream(stream, obj.tmpdir).then(() => obj);
    }).then(obj => {
      const {
        name,
        version
      } = require(path__default['default'].join(obj.tmpdir, 'package.json'));

      obj.cleanup();
      return {
        name,
        version
      };
    }).catch(err => {
      // The package name could be with or without semver version, e.g. cjxa-scripts-0.2.0-alpha.1.tgz
      // However, this function returns package name only without semver version.
      console.log(`Could not extract the package name from the archive: ${err.message}`);
      const assumedProjectName = installPackage.match(/^.+\/(.+?)(?:-\d+.+)?\.(tgz|tar\.gz)$/)[1];
      console.log(`Based on the filename, assuming it is "${kleur__default['default'].cyan(assumedProjectName)}"`);
      return Promise.resolve({
        name: assumedProjectName
      });
    });
  } else if (installPackage.startsWith('git+')) {
    // Pull package name out of git urls e.g:
    // git+https://github.com/mycompany/cjxa-scripts.git
    // git+ssh://github.com/mycompany/cjxa-scripts.git#v1.2.3
    return Promise.resolve({
      name: installPackage.match(/([^/]+)\.git(#.*)?$/)[1]
    });
  } else if (installPackage.match(/.+@/)) {
    // Do not match @scope/ when stripping off @version or @tag
    return Promise.resolve({
      name: installPackage.charAt(0) + installPackage.substr(1).split('@')[0],
      version: installPackage.split('@')[1]
    });
  } else if (installPackage.match(/^file:/)) {
    const installPackagePath = installPackage.match(/^file:(.*)?$/)[1];

    const {
      name,
      version
    } = require(path__default['default'].join(installPackagePath, 'package.json'));

    return Promise.resolve({
      name,
      version
    });
  }

  return Promise.resolve({
    name: installPackage
  });
}

function checkYarnVersion() {
  const minYarnPnp = '1.12.0';
  const maxYarnPnp = '2.0.0';
  let hasMinYarnPnp = false;
  let hasMaxYarnPnp = false;
  let yarnVersion = null;

  try {
    yarnVersion = require$$5.execSync('yarnpkg --version').toString().trim();

    if (semver__default['default'].valid(yarnVersion)) {
      hasMinYarnPnp = semver__default['default'].gte(yarnVersion, minYarnPnp);
      hasMaxYarnPnp = semver__default['default'].lt(yarnVersion, maxYarnPnp);
    } else {
      // Handle non-semver compliant yarn version strings, which yarn currently
      // uses for nightly builds. The regex truncates anything after the first
      // dash. See #5362.
      const trimmedYarnVersionMatch = /^(.+?)[-+].+$/.exec(yarnVersion);

      if (trimmedYarnVersionMatch) {
        const trimmedYarnVersion = trimmedYarnVersionMatch.pop();
        hasMinYarnPnp = semver__default['default'].gte(trimmedYarnVersion, minYarnPnp);
        hasMaxYarnPnp = semver__default['default'].lt(trimmedYarnVersion, maxYarnPnp);
      }
    }
  } catch (err) {// ignore
  }

  return {
    hasMinYarnPnp: hasMinYarnPnp,
    hasMaxYarnPnp: hasMaxYarnPnp,
    yarnVersion: yarnVersion
  };
}

function checkNodeVersion(packageName) {
  const packageJsonPath = path__default['default'].resolve(process.cwd(), 'node_modules', packageName, 'package.json');

  if (!fs__default['default'].existsSync(packageJsonPath)) {
    return;
  }

  const packageJson = require(packageJsonPath);

  if (!packageJson.engines || !packageJson.engines.node) {
    return;
  }

  if (!semver__default['default'].satisfies(process.version, packageJson.engines.node)) {
    console.error(kleur__default['default'].red('You are running Node %s.\n' + 'Create JXA App requires Node %s or higher. \n' + 'Please update your version of Node.'), process.version, packageJson.engines.node);
    process.exit(1);
  }
}

function makeCaretRange(dependencies, name) {
  const version = dependencies[name];

  if (typeof version === 'undefined') {
    console.error(kleur__default['default'].red(`Missing ${name} dependency in package.json`));
    process.exit(1);
  }

  let patchedVersion = `^${version}`;

  if (!semver__default['default'].validRange(patchedVersion)) {
    console.error(`Unable to patch ${name} dependency version because version ${kleur__default['default'].red(version)} will become invalid ${kleur__default['default'].red(patchedVersion)}`);
    patchedVersion = version;
  }

  dependencies[name] = patchedVersion;
}

function setCaretRangeForRuntimeDeps(packageName) {
  const packagePath = path__default['default'].join(process.cwd(), 'package.json');

  const packageJson = require(packagePath);

  if (typeof packageJson.dependencies === 'undefined') {
    console.error(kleur__default['default'].red('Missing dependencies in package.json'));
    process.exit(1);
  }

  const packageVersion = packageJson.dependencies[packageName];

  if (typeof packageVersion === 'undefined') {
    console.error(kleur__default['default'].red(`Unable to find ${packageName} in package.json`));
    process.exit(1);
  }

  makeCaretRange(packageJson.dependencies, 'jxabundler'); //makeCaretRange(packageJson.dependencies, 'react-dom');

  fs__default['default'].writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os__default['default'].EOL);
} // If project only contains files generated by GH, it’s safe.
// Also, if project contains remnant error logs from a previous
// installation, lets remove them now.
// We also special case IJ-based products .idea because it integrates with CRA:
// https://github.com/facebook/create-react-app/pull/368#issuecomment-243446094


function isSafeToCreateProjectIn(root, name) {
  const validFiles = ['.DS_Store', '.git', '.gitattributes', '.gitignore', '.gitlab-ci.yml', '.hg', '.hgcheck', '.hgignore', '.idea', '.npmignore', '.travis.yml', 'docs', 'LICENSE', 'README.md', 'mkdocs.yml', 'Thumbs.db']; // These files should be allowed to remain on a failed install, but then
  // silently removed during the next create.

  const errorLogFilePatterns = ['npm-debug.log', 'yarn-error.log', 'yarn-debug.log'];

  const isErrorLog = file => {
    return errorLogFilePatterns.some(pattern => file.startsWith(pattern));
  };

  const conflicts = fs__default['default'].readdirSync(root).filter(file => !validFiles.includes(file)) // IntelliJ IDEA creates module files before CRA is launched
  .filter(file => !/\.iml$/.test(file)) // Don't treat log files from previous installation as conflicts
  .filter(file => !isErrorLog(file));

  if (conflicts.length > 0) {
    console.log(`The directory ${kleur__default['default'].green(name)} contains files that could conflict:`);
    console.log();

    for (const file of conflicts) {
      try {
        const stats = fs__default['default'].lstatSync(path__default['default'].join(root, file));

        if (stats.isDirectory()) {
          console.log(`  ${kleur__default['default'].blue(`${file}/`)}`);
        } else {
          console.log(`  ${file}`);
        }
      } catch (e) {
        console.log(`  ${file}`);
      }
    }

    console.log();
    console.log('Either try using a new directory name, or remove the files listed above.');
    return false;
  } // Remove any log files from a previous installation.


  fs__default['default'].readdirSync(root).forEach(file => {
    if (isErrorLog(file)) {
      fs__default['default'].removeSync(path__default['default'].join(root, file));
    }
  });
  return true;
}

function getProxy() {
  if (process.env.https_proxy) {
    return process.env.https_proxy;
  } else {
    try {
      // Trying to read https-proxy from .npmrc
      let httpsProxy = require$$5.execSync('npm config get https-proxy').toString().trim();
      return httpsProxy !== 'null' ? httpsProxy : undefined;
    } catch (e) {
      return;
    }
  }
} // See https://github.com/facebook/create-react-app/pull/3355


function checkThatNpmCanReadCwd() {
  const cwd = process.cwd();
  let childOutput = null;

  try {
    // Note: intentionally using spawn over exec since
    // the problem doesn't reproduce otherwise.
    // `npm config list` is the only reliable way I could find
    // to reproduce the wrong path. Just printing process.cwd()
    // in a Node process was not enough.
    childOutput = spawn__default['default'].sync('npm', ['config', 'list']).output.join('');
  } catch (err) {
    // Something went wrong spawning node.
    // Not great, but it means we can't do this check.
    // We might fail later on, but let's continue.
    return true;
  }

  if (typeof childOutput !== 'string') {
    return true;
  }

  const lines = childOutput.split('\n'); // `npm config list` output includes the following line:
  // "; cwd = C:\path\to\current\dir" (unquoted)
  // I couldn't find an easier way to get it.

  const prefix = '; cwd = ';
  const line = lines.find(line => line.startsWith(prefix));

  if (typeof line !== 'string') {
    // Fail gracefully. They could remove it.
    return true;
  }

  const npmCWD = line.substring(prefix.length);

  if (npmCWD === cwd) {
    return true;
  }

  console.error(kleur__default['default'].red(`Could not start an npm process in the right directory.\n\n` + `The current directory is: ${kleur__default['default'].bold(cwd)}\n` + `However, a newly started npm process runs in: ${kleur__default['default'].bold(npmCWD)}\n\n` + `This is probably caused by a misconfigured system terminal shell.`));

  if (process.platform === 'win32') {
    console.error(kleur__default['default'].red(`On Windows, this can usually be fixed by running:\n\n`) + `  ${kleur__default['default'].cyan('reg')} delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n` + `  ${kleur__default['default'].cyan('reg')} delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n` + kleur__default['default'].red(`Try to run the above two lines in the terminal.\n`) + kleur__default['default'].red(`To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`));
  }

  return false;
}

function checkIfOnline(useYarn) {
  if (!useYarn) {
    // Don't ping the Yarn registry.
    // We'll just assume the best case.
    return Promise.resolve(true);
  }

  return new Promise(resolve => {
    dns__default['default'].lookup('registry.yarnpkg.com', err => {
      let proxy;

      if (err != null && (proxy = getProxy())) {
        // If a proxy is defined, we likely can't resolve external hostnames.
        // Try to resolve the proxy name as an indication of a connection.
        dns__default['default'].lookup(url__default['default'].parse(proxy).hostname, proxyErr => {
          resolve(proxyErr == null);
        });
      } else {
        resolve(err == null);
      }
    });
  });
}

function executeNodeScript({
  cwd,
  args
}, data, source) {
  return new Promise((resolve, reject) => {
    const child = spawn__default['default'](process.execPath, [...args, '-e', source, '--', JSON.stringify(data)], {
      cwd,
      stdio: 'inherit'
    });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `node ${args.join(' ')}`
        });
        return;
      }

      resolve();
    });
  });
}

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 10) {
  console.error('You are running Node ' + currentNodeVersion + '.\n' + 'Create React App requires Node 10 or higher. \n' + 'Please update your version of Node.');
  process.exit(1);
}

if (process.platform !== 'darwin') {
  console.error(`Only MacOS is suuported!`);
  process.exit(1);
}

init();
//# sourceMappingURL=cli.js.map
