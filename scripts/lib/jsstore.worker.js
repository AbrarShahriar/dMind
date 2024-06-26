/*! For license information please see jsstore.worker.min.js.LICENSE.txt */
var JsStoreWorker;
(() => {
  "use strict";
  var e = {
      d: (t, n) => {
        for (var r in n)
          e.o(n, r) &&
            !e.o(t, r) &&
            Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
      },
      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
      r: (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      },
    },
    t = {};
  e.r(t), e.d(t, { QueryManager: () => ut });
  var n,
    r,
    o,
    u,
    i,
    a,
    c,
    s,
    l = function (e) {
      return Promise.resolve(e);
    },
    f = function (e) {
      return new Promise(e);
    },
    h = "not_array",
    p = "no_value_supplied",
    y = "column_not_exist",
    d = "no_index_found",
    v = "invalid_operator",
    m = "null_value",
    b = "wrong_data_type",
    g = "table_not_exist",
    _ = "not_object",
    w = "Db_blocked",
    x = "indexeddb_not_supported",
    k = "null_value_in_where",
    T = "invalid_join_query",
    S = "import_scripts_failed",
    E = "method_not_exist",
    O = "invalid_middleware";
  (function (e) {
    (e.Registered = "registerd"),
      (e.Failed = "failed"),
      (e.NotStarted = "not_started");
  })(n || (n = {})),
    (function (e) {
      (e.String = "string"),
        (e.Object = "object"),
        (e.Array = "array"),
        (e.Number = "number"),
        (e.Boolean = "boolean"),
        (e.Null = "null"),
        (e.DateTime = "date_time");
    })(r || (r = {})),
    (function (e) {
      (e.InitDb = "init_db"),
        (e.MapGet = "map_get"),
        (e.MapSet = "map_set"),
        (e.MapHas = "map_has"),
        (e.MapDelete = "map_delete"),
        (e.Select = "select"),
        (e.Insert = "insert"),
        (e.Update = "update"),
        (e.Remove = "remove"),
        (e.OpenDb = "open_db"),
        (e.Clear = "clear"),
        (e.DropDb = "drop_db"),
        (e.Count = "count"),
        (e.ChangeLogStatus = "change_log_status"),
        (e.Terminate = "terminate"),
        (e.Transaction = "transaction"),
        (e.CloseDb = "close_db"),
        (e.Union = "union"),
        (e.Intersect = "intersect"),
        (e.ImportScripts = "import_scripts"),
        (e.Middleware = "middleware");
    })(o || (o = {})),
    (function (e) {
      (e.RequestQueueEmpty = "requestQueueEmpty"),
        (e.RequestQueueFilled = "requestQueueFilled"),
        (e.Upgrade = "upgrade"),
        (e.Create = "create"),
        (e.Open = "open");
    })(u || (u = {})),
    (function (e) {
      (e.Where = "where"),
        (e.Like = "like"),
        (e.Regex = "regex"),
        (e.In = "in"),
        (e.Equal = "="),
        (e.Between = "-"),
        (e.GreaterThan = ">"),
        (e.LessThan = "<"),
        (e.GreaterThanEqualTo = ">="),
        (e.LessThanEqualTo = "<="),
        (e.NotEqualTo = "!="),
        (e.Aggregate = "aggregate"),
        (e.Max = "max"),
        (e.Min = "min"),
        (e.Avg = "avg"),
        (e.Count = "count"),
        (e.Sum = "sum"),
        (e.List = "list"),
        (e.Or = "or"),
        (e.Skip = "skip"),
        (e.Limit = "limit"),
        (e.And = "and"),
        (e.IgnoreCase = "ignoreCase"),
        (e.Then = "then");
    })(i || (i = {})),
    (function (e) {
      (e.ReadOnly = "readonly"), (e.ReadWrite = "readwrite");
    })(a || (a = {})),
    (function (e) {
      (e.First = "f"), (e.Last = "l"), (e.Any = "a");
    })(c || (c = {})),
    (function (e) {
      (e.Connected = "connected"),
        (e.Closed = "closed"),
        (e.NotStarted = "not_started"),
        (e.UnableToStart = "unable_to_start"),
        (e.ClosedByJsStore = "closed_by_jsstore");
    })(s || (s = {}));
  var C,
    j = (function () {
      function e(e) {
        (this.columns = []),
          (this.autoIncColumnValue = {}),
          (this.columns = this.setColumn(e.columns)),
          (this.name = e.name),
          (this.alter = e.alter || {});
      }
      return (
        (e.prototype.setColumn = function (e) {
          var t = [],
            n = function (n) {
              var o = e[n];
              (o.name = n),
                o.autoIncrement && (r.autoIncColumnValue[n] = 0),
                o.primaryKey && (r.primaryKey = n),
                (o.enableSearch = null == o.enableSearch || o.enableSearch);
              var u = r.columns.indexOf(function (e) {
                return e.name === n;
              });
              if (u < 0) t.push(o);
              else {
                var i = r.columns[u];
                Object.assign(i, o);
              }
            },
            r = this;
          for (var o in e) n(o);
          return t;
        }),
        e
      );
    })(),
    A = (function () {
      function e() {}
      return (
        (e.autoIncrementKey = function (e, t) {
          return "JsStore_".concat(e, "_").concat(t, "_Value");
        }),
        (e.getStore = function (t) {
          return (
            t.tx || t.createTransaction([e.tableName]),
            t.objectStore(e.tableName)
          );
        }),
        (e.set = function (t, n, r) {
          var o = e.getStore(r);
          return f(function (e, r) {
            var u = o.put({ key: t, value: n });
            (u.onsuccess = function () {
              e();
            }),
              (u.onerror = r);
          });
        }),
        (e.get = function (t, n) {
          var r = e.getStore(n);
          return f(function (e, o) {
            var u = r.get(n.keyRange(t));
            (u.onsuccess = function () {
              var t = u.result;
              e(t && t.value);
            }),
              (u.onerror = o);
          });
        }),
        (e.remove = function (t, n) {
          var r = e.getStore(n);
          return f(function (e, o) {
            var u = r.delete(n.keyRange(t));
            (u.onsuccess = function () {
              e();
            }),
              (u.onerror = o);
          });
        }),
        (e.has = function (t, n) {
          var r = e.getStore(n);
          return f(function (e, o) {
            var u = r.count(n.keyRange(t));
            (u.onsuccess = function () {
              var t = u.result;
              e(t > 0);
            }),
              (u.onerror = o);
          });
        }),
        (e.tableName = "JsStore_Meta"),
        (e.dbSchema = "JsStore_DbSchema"),
        e
      );
    })(),
    q = function (e) {
      (this.name = e.name),
        (this.version = e.version || 1),
        e.tables.push({
          name: A.tableName,
          columns: { key: { primaryKey: !0 }, value: { enableSearch: !1 } },
        }),
        (this.tables = e.tables.map(function (e) {
          return new j(e);
        }));
    },
    I = function (e, t) {
      for (var n in e) t(n, e[n]);
    },
    R = (function () {
      function e(e, t) {
        (this.type = e), (this.info_ = t), (this.message = this.getMsg_());
      }
      return (
        (e.prototype.log = function (e) {
          this.status && console.log(e);
        }),
        (e.prototype.throw = function () {
          throw this.get();
        }),
        (e.prototype.logError = function () {
          console.error(this.get());
        }),
        (e.prototype.get = function () {
          return { message: this.message, type: this.type };
        }),
        (e.prototype.getMsg_ = function () {
          var e,
            t,
            n = this.info_,
            r =
              (((e = {})[h] = function () {
                t = "Supplied value is not an array";
              }),
              (e.undefined_column = function () {
                t = "Column is undefined in Where";
              }),
              (e.undefined_value = function () {
                t = "Value is undefined in Where";
              }),
              (e.undefined_column_name = function () {
                t = "Column name is undefined '" + n.TableName + "'";
              }),
              (e.undefined_database_name = function () {
                t = "Database name is not supplied";
              }),
              (e.undefined_column_value = function () {
                t = "Column value is undefined";
              }),
              (e[p] = function () {
                t = "No value is supplied";
              }),
              (e[v] = function () {
                t = "Invalid Op Value '" + n.Op + "'";
              }),
              (e[y] = function () {
                var e = n.column;
                t = n.isOrder
                  ? "Column '".concat(e, "' in order query does not exist")
                  : "Column '".concat(e, "' does not exist");
              }),
              (e[d] = function () {
                t =
                  "No index found for column '" +
                  n.column +
                  "'. Query can not be executed without index.";
              }),
              (e[m] = function () {
                t =
                  "Null value is not allowed for column '" + n.ColumnName + "'";
              }),
              (e[b] = function () {
                t =
                  "Supplied value for column '" +
                  n.column +
                  "' have wrong data type";
              }),
              (e[g] = function () {
                t = "Table '" + n.tableName + "' does not exist";
              }),
              (e.db_not_exist = function () {
                t = "Database with name ".concat(n.dbName, " does not exist");
              }),
              (e[_] = function () {
                t = "supplied value is not object";
              }),
              (e[v] = function () {
                t = "Invalid Config '" + n.Config + " '";
              }),
              (e[w] = function () {
                t = "database is blocked, cant be deleted right now";
              }),
              (e[k] = function () {
                t = "Null/undefined is not allowed in where. Column '".concat(
                  n.column,
                  "' has null"
                );
              }),
              (e[E] = function () {
                t = "method '".concat(n, "' does not exist.");
              }),
              (e[x] = function () {
                t = "Browser does not support indexeddb";
              }),
              (e.getInfo = function () {
                t = n;
              }),
              (e[T] = function () {
                r.getInfo();
              }),
              (e[S] = function () {
                r.getInfo();
              }),
              (e[O] = function () {
                t = "No function ".concat(n, " is found.");
              }),
              e),
            o = this.type,
            u = r[o];
          return (
            u ? u() : (o || (this.type = "unknown"), (t = this.message)), t
          );
        }),
        e
      );
    })(),
    Q = (function () {
      function e() {
        this.logger = new R(null);
      }
      return (
        (e.prototype.emptyTx = function () {
          this.tx &&
            ((this.tx.oncomplete = null),
            (this.tx.onabort = null),
            (this.tx.onerror = null),
            (this.tx = null));
        }),
        (e.prototype.createTransactionIfNotExist = function (e, t) {
          this.tx || this.createTransaction(e, t);
        }),
        (e.prototype.createTransaction = function (e, t) {
          var n = this;
          return (
            void 0 === t && (t = a.ReadWrite),
            (this.tx = this.con.transaction(e, t)),
            f(function (e, t) {
              (n.tx.oncomplete = e), (n.tx.onabort = e), (n.tx.onerror = t);
            })
          );
        }),
        (e.prototype.keyRange = function (e, t) {
          var n;
          switch (t) {
            case i.Between:
              n = IDBKeyRange.bound(e.low, e.high, !1, !1);
              break;
            case i.GreaterThan:
              n = IDBKeyRange.lowerBound(e, !0);
              break;
            case i.GreaterThanEqualTo:
              n = IDBKeyRange.lowerBound(e);
              break;
            case i.LessThan:
              n = IDBKeyRange.upperBound(e, !0);
              break;
            case i.LessThanEqualTo:
              n = IDBKeyRange.upperBound(e);
              break;
            default:
              n = IDBKeyRange.only(e);
          }
          return n;
        }),
        (e.prototype.objectStore = function (e) {
          return this.tx.objectStore(e);
        }),
        (e.prototype.abortTransaction = function () {
          this.tx && this.tx.abort();
        }),
        (e.prototype.close = function () {
          var e = this;
          return (
            this.con && this.con.close(),
            f(function (t) {
              (e.con = null), setTimeout(t, 100);
            })
          );
        }),
        (e.prototype.initDb = function (e) {
          var t,
            n = this,
            r = !1,
            o = e.version;
          return f(function (u, i) {
            var a = indexedDB.open(e.name, o);
            (a.onsuccess = function () {
              (n.con = a.result),
                (n.con.onversionchange = function (e) {
                  e.target.close();
                }),
                u({ isCreated: r, oldVersion: t, newVersion: o });
            }),
              (a.onerror = function (e) {
                console.error("error", e), i(e);
              }),
              (a.onupgradeneeded = function (n) {
                t = n.oldVersion;
                var u = n.target,
                  i = u.result;
                r = !0;
                var a = u.transaction,
                  c = i.objectStoreNames,
                  s = function (e, t) {
                    var n = t.name;
                    if (t.enableSearch && !e.indexNames.contains(n)) {
                      var r = t.primaryKey
                        ? { unique: !0 }
                        : { unique: t.unique };
                      r.multiEntry = t.multiEntry;
                      var o = null == t.keyPath ? n : t.keyPath;
                      e.createIndex(n, o, r);
                    }
                  },
                  l = function (e, t, n) {
                    var r = t.columns.findIndex(function (e) {
                      return e.name === n;
                    });
                    r >= 0 && (t.columns.splice(r, 1), e.deleteIndex(n));
                  };
                e.tables.forEach(function (e) {
                  if (!c.contains(e.name))
                    return (function (e) {
                      var t = e.primaryKey
                          ? { keyPath: e.primaryKey }
                          : { autoIncrement: !0 },
                        n = i.createObjectStore(e.name, t);
                      e.columns.forEach(function (e) {
                        s(n, e);
                      });
                    })(e);
                  for (var n = a.objectStore(e.name), r = t + 1; r <= o; r++) {
                    var u = e.alter[r];
                    u &&
                      (u.add &&
                        e.setColumn(u.add).forEach(function (t) {
                          s(n, t), e.columns.push(t);
                        }),
                      I(u.drop || {}, function (t) {
                        l(n, e, t);
                      }),
                      I(u.modify || {}, function (t, r) {
                        var o = r.multiEntry || r.keyPath || r.unique,
                          u = e.columns.find(function (e) {
                            return e.name === t;
                          }),
                          i = Object.assign(u, r);
                        (i.name = t),
                          o && (l(n, e, t), s(n, i), e.columns.push(i));
                      }));
                  }
                });
                for (
                  var f = function (t, n) {
                      var r = c.item(t);
                      e.tables.findIndex(function (e) {
                        return e.name === r;
                      }) < 0 && i.deleteObjectStore(r);
                    },
                    h = 0,
                    p = c.length;
                  h < p;
                  h++
                )
                  f(h);
              });
          });
        }),
        e
      );
    })(),
    L = function (e) {
      return Promise.all(e);
    },
    N = function (e) {
      return Promise.reject(e);
    },
    D = function (e) {
      if (e instanceof R) return e.logError(), e.get();
      var t = void 0;
      return (
        e.name
          ? ((t = new R(e.name)).message = e.message)
          : ((t = new R(e.target.error.name)).message = e.target.error.message),
        t.get()
      );
    },
    W = (function () {
      function e() {
        (this.rowAffected = 0), (this.isTxQuery = !1), (this.results = []);
      }
      return (
        Object.defineProperty(e.prototype, "db", {
          get: function () {
            return this.util.db;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.table = function (e) {
          var t = e || this.tableName;
          return this.db.tables.find(function (e) {
            return e.name === t;
          });
        }),
        (e.prototype.primaryKey = function (e) {
          var t = this.query;
          return !t.from && t.store && t.meta
            ? t.meta.primaryKey
            : this.table(e).primaryKey;
        }),
        (e.prototype.getColumnInfo = function (e, t) {
          return this.table(t).columns.find(function (t) {
            return t.name === e;
          });
        }),
        (e.prototype.onException = function (e, t) {
          return (
            console.error(e),
            this.util.abortTransaction(),
            N(
              (function (e, t) {
                return (
                  void 0 === t && (t = "invalid_query"), (e.name = t), D(e)
                );
              })(e, t)
            )
          );
        }),
        e
      );
    })(),
    V = function (e) {
      if (null == e) return r.Null;
      var t = typeof e;
      if ("object" === t) {
        if (Array.isArray(e)) return r.Array;
        if (e instanceof Date) return r.DateTime;
      }
      return t;
    },
    B = function (e) {
      return null == e || ("number" == typeof e && isNaN(e));
    },
    P = (function () {
      function e(e, t) {
        (this.table = e), (this.autoIncrementValue = t);
      }
      return (
        (e.prototype.checkAndModifyValues = function (e) {
          var t,
            n = this;
          this.query = e;
          var r = e.values,
            o = [];
          return (
            r.every(function (r, u) {
              return (
                (t = n.checkAndModifyValue(r)),
                e.ignore && t && (o.push(u), (t = null)),
                !t
              );
            }),
            o.forEach(function (e) {
              r.splice(e, 1);
            }),
            { err: t, values: r }
          );
        }),
        (e.prototype.checkAndModifyValue = function (e) {
          var t,
            n = this;
          return (
            this.table.columns.every(function (r) {
              return !(t = n.checkAndModifyColumnValue_(r, e));
            }),
            t
          );
        }),
        (e.prototype.checkNotNullAndDataType_ = function (e, t) {
          return e.notNull && B(t[e.name])
            ? this.getError(m, { ColumnName: e.name })
            : e.dataType && !B(t[e.name]) && V(t[e.name]) !== e.dataType
            ? this.getError(b, { column: e.name })
            : void 0;
        }),
        (e.prototype.checkAndModifyColumnValue_ = function (e, t) {
          var n = t[e.name];
          if (
            (e.autoIncrement
              ? B(n)
                ? (t[e.name] = ++this.autoIncrementValue[e.name])
                : V(n) === r.Number &&
                  n > this.autoIncrementValue[e.name] &&
                  (this.autoIncrementValue[e.name] = n)
              : void 0 !== e.default && B(n) && (t[e.name] = e.default),
            this.query.validation)
          )
            return this.checkNotNullAndDataType_(e, t);
        }),
        (e.prototype.getError = function (e, t) {
          return new R(e, t);
        }),
        e
      );
    })(),
    M = (function () {
      function e(e) {
        this.table = e;
      }
      return (
        (e.prototype.check = function (e, t) {
          var n,
            o = this;
          return (
            typeof e === r.Object
              ? this.table
                ? this.table.columns.every(function (t) {
                    return (
                      t.name in e && (n = o.checkByColumn_(t, e[t.name])), !n
                    );
                  })
                : (n = new R(g, { tableName: t }))
              : (n = new R(_)),
            n
          );
        }),
        (e.prototype.checkByColumn_ = function (e, t) {
          if (!0 === e.notNull && B(t)) return new R(m, { ColumnName: e.name });
          var n = V(t),
            r = null != t;
          if (e.dataType && r && n !== e.dataType && "object" !== n)
            return new R(b, { column: e.name });
          if (r && "object" === n) {
            var o = ["+", "-", "*", "/", "{push}"];
            for (var u in t)
              if (o.indexOf(u) < 0 && e.dataType && n !== e.dataType)
                return new R(b, { column: e.name });
          }
        }),
        e
      );
    })(),
    K = (function () {
      function e(e) {
        this.db = e;
      }
      return (
        (e.prototype.validate = function (e, t) {
          switch (e) {
            case o.Select:
            case o.Remove:
            case o.Count:
              return this.checkSelect(t);
            case o.Insert:
              return this.checkInsertQuery(t);
            case o.Update:
              return this.checkUpdate(t);
          }
        }),
        (e.prototype.getTable_ = function (e) {
          return this.db.tables.find(function (t) {
            return t.name === e;
          });
        }),
        (e.prototype.isInsertQryValid = function (e) {
          var t,
            n = this.getTable_(e.into);
          if (n)
            switch (V(e.values)) {
              case r.Array:
                break;
              case r.Null:
                t = new R(p);
                break;
              default:
                t = new R(h);
            }
          else t = new R(g, { tableName: e.into });
          return { table: n, log: t };
        }),
        (e.prototype.checkUpdate = function (e) {
          var t = new M(this.getTable_(e.in)).check(e.set, e.in);
          if (t) return t;
          if (null != e.where) {
            if ((t = this.checkForNullInWhere_(e))) return t;
            this.addGreatAndLessToNotOp_(e);
          }
        }),
        (e.prototype.checkSelect = function (e) {
          if (!e.store && !this.getTable_(e.from))
            return new R(g, { tableName: e.from });
          if (e.where) {
            var t = this.checkForNullInWhere_(e);
            if (t) return t;
            this.addGreatAndLessToNotOp_(e);
          }
        }),
        (e.prototype.checkForNullInWhere_ = function (e) {
          for (var t in e.where)
            if (null == e.where[t]) return new R(k, { column: t });
        }),
        (e.prototype.addGreatAndLessToNotOp_ = function (e) {
          var t = e.where,
            n = function (e, t) {
              return (
                t.findIndex(function (t) {
                  return null != e[t][i.NotEqualTo];
                }) >= 0
              );
            },
            o = function (e, t) {
              var n;
              return (
                t.forEach(function (t) {
                  null != (n = e[t])[i.NotEqualTo] &&
                    ((e[t][i.GreaterThan] = n[i.NotEqualTo]),
                    void 0 === e[i.Or]
                      ? ((e[i.Or] = {}), (e[i.Or][t] = {}))
                      : void 0 === e[i.Or][t] && (e[i.Or][t] = {}),
                    (e[i.Or][t][i.LessThan] = n[i.NotEqualTo]),
                    delete e[t][i.NotEqualTo]);
                }),
                e
              );
            };
          if (V(t) === r.Object) {
            var u = Object.keys(t);
            if (n(t, u))
              if (1 === u.length) e.where = o(t, u);
              else {
                var a = [];
                u.forEach(function (e) {
                  var n;
                  a.push(o((((n = {})[e] = t[e]), n), [e]));
                }),
                  (e.where = a);
              }
          } else {
            var c = [];
            t.forEach(function (e) {
              var t = Object.keys(e);
              n(e, t) && (e = o(e, t)), c.push(e);
            }),
              (e.where = c);
          }
        }),
        (e.prototype.checkInsertQuery = function (e) {
          var t = this.isInsertQryValid(e),
            n = t.table,
            r = t.log;
          if (r) return r;
          if (!e.skipDataCheck) {
            var o = new P(n, n.autoIncColumnValue).checkAndModifyValues(e),
              u = o.values,
              i = o.err;
            return (e.values = u), i;
          }
        }),
        e
      );
    })(),
    G =
      ((C = function (e, t) {
        return (
          (C =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          C(e, t)
        );
      }),
      function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Class extends value " + String(t) + " is not a constructor or null"
          );
        function n() {
          this.constructor = e;
        }
        C(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }),
    J = (function (e) {
      function t(t, n) {
        var r = e.call(this) || this;
        return (
          (r.valuesAffected_ = []),
          null == t.validation && (t.validation = !0),
          (r.query = t),
          (r.util = n),
          (r.tableName = t.into),
          r
        );
      }
      return (
        G(t, e),
        (t.prototype.execute = function (e) {
          var t = this,
            n = this.db,
            r = new K(n).validate(o.Insert, this.query);
          return r
            ? N(r)
            : e()
                .then(function (e) {
                  return t.insertData_(n).then(function (e) {
                    return t.query.return ? t.valuesAffected_ : t.rowAffected;
                  });
                })
                .catch(function (e) {
                  return t.util.abortTransaction(), N(e);
                });
        }),
        (t.prototype.insertData_ = function (e) {
          var t,
            n,
            r,
            o = this,
            u = this.query;
          return (
            (t = u.return
              ? function (e) {
                  o.valuesAffected_.push(e);
                }
              : function (e) {
                  ++o.rowAffected;
                }),
            (r = u.upsert ? "put" : "add"),
            (n =
              u.ignore && !o.isTxQuery
                ? function (e) {
                    return o.util.con
                      .transaction(u.into, a.ReadWrite)
                      .objectStore(u.into)
                      [r](e);
                  }
                : (o.isTxQuery ||
                    o.util.createTransaction([u.into, A.tableName]),
                  (o.objectStore = o.util.objectStore(o.tableName)),
                  function (e) {
                    return o.objectStore[r](e);
                  })),
            L(
              u.values.map(function (e) {
                return f(function (r, o) {
                  var i = n(e);
                  (i.onerror = function (e) {
                    u.ignore ? r() : o(e);
                  }),
                    (i.onsuccess = function () {
                      t(e), r();
                    });
                });
              })
            ).then(function () {
              return A.set(A.dbSchema, e, o.util);
            })
          );
        }),
        t
      );
    })(W),
    F = void 0 === self.alert && "undefined" == typeof ServiceWorkerGlobalScope,
    U = (function () {
      try {
        if (
          (indexedDB ||
            (indexedDB =
              self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB),
          !indexedDB)
        )
          return !1;
        (IDBTransaction =
          IDBTransaction || self.webkitIDBTransaction || self.msIDBTransaction),
          (self.IDBKeyRange =
            self.IDBKeyRange || self.webkitIDBKeyRange || self.msIDBKeyRange);
      } catch (e) {
        return !1;
      }
      return !0;
    })(),
    H = function (e) {
      return Array.isArray(e);
    },
    z = function (e) {
      return Object.keys(e);
    },
    $ = function (e) {
      return z(e).length;
    },
    X = function (e) {
      for (var t in e) return t;
    },
    Y = (function () {
      function e() {}
      return (
        (e.prototype.setCaseAndValue = function (e, t) {
          (this.caseQuery_ = e), this.setValue(t);
        }),
        (e.prototype.setCaseAndColumn = function (e, t) {
          return (this.caseQuery_ = e), this.setColumn(t), this;
        }),
        (e.prototype.setColumn = function (e) {
          return (
            (this.columnName_ = e),
            (this.caseColumnQuery_ = this.caseQuery_[this.columnName_]),
            (this.length_ = this.caseColumnQuery_.length),
            this
          );
        }),
        (e.prototype.setValue = function (e) {
          return (this.value = e), this;
        }),
        (e.prototype.evaluate = function () {
          for (var e = 0; e < this.length_; e++)
            if (!0 === this.checkCase_(this.caseColumnQuery_[e]))
              return this.caseColumnQuery_[e].then;
          var t = this.caseColumnQuery_[this.length_ - 1].then;
          return null == t ? this.value[this.columnName_] : t;
        }),
        (e.prototype.checkCase_ = function (e) {
          var t;
          for (t in e) {
            switch (t) {
              case i.GreaterThan:
                if (this.value[this.columnName_] > e[t]) return !0;
                break;
              case i.Equal:
                if (this.value[this.columnName_] === e[t]) return !0;
                break;
              case i.LessThan:
                if (this.value[this.columnName_] < e[t]) return !0;
                break;
              case i.GreaterThanEqualTo:
                if (this.value[this.columnName_] >= e[t]) return !0;
                break;
              case i.LessThanEqualTo:
                if (this.value[this.columnName_] <= e[t]) return !0;
                break;
              case i.NotEqualTo:
                if (this.value[this.columnName_] !== e[t]) return !0;
                break;
              case i.Between:
                if (
                  this.value[this.columnName_] > e[t].low &&
                  this.value[this.columnName_] < e[t].high
                )
                  return !0;
            }
            return !1;
          }
        }),
        e
      );
    })(),
    Z = function (e, t, n, r) {
      if (!1 === this.limitAtEnd && !1 === this.skipAtEnd) {
        if (this.skipRecord) return this.limitRecord ? r : n;
        if (this.limitRecord) return t;
      }
      return e;
    },
    ee = function (e) {
      var t = this,
        n = !1;
      return function (r) {
        var o = r.target.result;
        o
          ? n && t.results.length !== t.limitRecord
            ? (t.shouldAddValue(o) && t.pushResult(o.value), o.continue())
            : ((n = !0), o.advance(t.skipRecord))
          : e();
      };
    },
    te = function (e) {
      var t = this,
        n = !1;
      return function (r) {
        var o = r.target.result;
        o
          ? n
            ? (t.shouldAddValue(o) && t.pushResult(o.value), o.continue())
            : ((n = !0), o.advance(t.skipRecord))
          : e();
      };
    },
    ne = function (e) {
      var t = this;
      return function (n) {
        var r = n.target.result;
        r && t.results.length !== t.limitRecord
          ? (t.shouldAddValue(r) && t.pushResult(r.value), r.continue())
          : e();
      };
    },
    re = function (e) {
      var t = this;
      return function (n) {
        var r = n.target.result;
        r ? (t.shouldAddValue(r) && t.pushResult(r.value), r.continue()) : e();
      };
    },
    oe = function (e) {
      var t,
        n = this,
        r = !1;
      return function (o) {
        (t = o.target.result)
          ? r && n.results.length !== n.limitRecord
            ? (n.pushResult(t.value), t.continue())
            : ((r = !0), t.advance(n.skipRecord))
          : e();
      };
    },
    ue = function (e) {
      var t,
        n = this,
        r = !1;
      return function (o) {
        (t = o.target.result)
          ? r
            ? (n.pushResult(t.value), t.continue())
            : ((r = !0), t.advance(n.skipRecord))
          : e();
      };
    },
    ie = function (e) {
      var t,
        n = this;
      return function (r) {
        (t = r.target.result) ? (n.pushResult(t.value), t.continue()) : e();
      };
    },
    ae = function (e) {
      var t,
        n = this;
      return function (r) {
        (t = r.target.result) && n.results.length !== n.limitRecord
          ? (n.pushResult(t.value), t.continue())
          : e();
      };
    },
    ce = function (e) {
      return e.replace(/\s/g, "");
    },
    se = function (e) {
      var t;
      if (!this.query.store)
        if (null == this.query.join) t = this.getColumnInfo(e);
        else {
          var n = ce(e).split("."),
            r = n[1];
          t = this.getColumnInfo(r, n[0]);
        }
      if (null == t) {
        var o = this.results[0][e];
        if (o) return { dataType: V(o), name: e };
        throw new R(y, { column: e, isOrder: !0 });
      }
      return t;
    },
    le = function (e, t) {
      return t.localeCompare(e);
    },
    fe = function (e, t) {
      return e.localeCompare(t);
    },
    he = function (e, t) {
      return new String(t).localeCompare(e);
    },
    pe = function (e, t) {
      return new String(e).localeCompare(t);
    },
    ye = function (e, t) {
      return t - e;
    },
    de = function (e, t) {
      return e - t;
    },
    ve = function (e, t) {
      return t.getTime() - e.getTime();
    },
    me = function (e, t) {
      return e.getTime() - t.getTime();
    },
    be = function (e, t) {
      switch (e.dataType) {
        case r.String:
          return "asc" === t.type ? fe : le;
        case r.Number:
          return "asc" === t.type ? de : ye;
        case r.DateTime:
          return "asc" === t.type ? me : ve;
        default:
          return "asc" === t.type ? pe : he;
      }
    },
    ge = function (e) {
      var t;
      e.type = _e(e.type);
      var n = e.by,
        o = this.thenEvaluator;
      if (null != n && typeof n === r.Object) {
        var u = n,
          i = function (e, t) {
            return function (n, i) {
              for (var a in u) {
                o.setCaseAndValue(u, n);
                var c = o.setColumn(a).evaluate();
                o.setCaseAndValue(u, i);
                var s = o.setColumn(a).evaluate();
                return typeof n[c] === r.String ? e(n[c], i[s]) : t(n[c], i[s]);
              }
            };
          },
          a = "asc" === e.type ? i(fe, de) : i(le, ye);
        this.results.sort(a);
      } else {
        var c = se.call(this, n);
        if (null != c) {
          var s = be(c, e);
          (n = c.name),
            null == e.case
              ? this.results.sort(function (e, t) {
                  return s(e[n], t[n]);
                })
              : (o.setCaseAndColumn((((t = {})[n] = e.case), t), n),
                this.results.sort(function (e, t) {
                  return s(o.setValue(e).evaluate(), o.setValue(t).evaluate());
                }));
        }
      }
    },
    _e = function (e) {
      return null == e ? "asc" : e.toLowerCase();
    },
    we = function (e) {
      var t,
        n,
        r = e.split("%");
      switch (
        (r[1]
          ? ((t = r[1]), (n = r.length > 2 ? c.Any : c.Last))
          : ((t = r[0]), (n = c.First)),
        n)
      ) {
        case c.First:
          return new RegExp("^".concat(t), "i");
        case c.Last:
          return new RegExp("".concat(t, "$"), "i");
        default:
          return new RegExp("".concat(t), "i");
      }
    },
    xe = function (e) {
      return "object" === V(e) && !(e instanceof RegExp);
    },
    ke = function (e) {
      if (xe(e)) {
        var t = {};
        for (var n in e) t[n] = null != e[n] && xe(e[n]) ? ke(e[n]) : e[n];
        return t;
      }
      return e;
    },
    Te = function (e, t, n) {
      var o = V(e);
      if (o !== V(t)) return !1;
      switch ((o === r.DateTime && ((e = e.getTime()), (t = t.getTime())), n)) {
        case i.GreaterThan:
          return e > t;
        case i.LessThan:
          return e < t;
        case i.LessThanEqualTo:
          return e <= t;
        case i.GreaterThanEqualTo:
          return e >= t;
        case i.NotEqualTo:
          return e !== t;
        default:
          var u;
          return "array" === o
            ? e.length === t.length &&
                (e.every(function (e, n) {
                  return (u = e === t[n]);
                }),
                u)
            : e === t;
      }
    },
    Se = (function () {
      function e(e, t) {
        (this.where = ke(e)), (this.checkFlag = t);
      }
      return (
        (e.prototype.remove = function (e) {
          var t = e.pop();
          delete e.reduce(function (e, t) {
            return e && e[t];
          }, this.where)[t];
        }),
        (e.prototype.check = function (e) {
          var t = this,
            n = !0;
          if (!this.checkFlag) return n;
          var r = this.where,
            o = function (o) {
              if (!n) return { value: n };
              var u = r[o],
                a = e[o],
                c = H(a),
                s = H(u),
                l = function (e) {
                  c && !s
                    ? a.every(function (t) {
                        return !(n = e(t));
                      })
                    : (n = e(a));
                };
              if ("object" === V(u)) {
                var f = function (e) {
                  if (!n) return { value: n };
                  switch (e) {
                    case i.In:
                      l(function (e) {
                        return t.checkIn(u[i.In], e);
                      });
                      break;
                    case i.Like:
                      l(function (e) {
                        return t.checkLike_(o, e);
                      });
                      break;
                    case i.Regex:
                      l(function (e) {
                        return t.checkRegex(o, e);
                      });
                      break;
                    case i.Between:
                    case i.GreaterThan:
                    case i.LessThan:
                    case i.GreaterThanEqualTo:
                    case i.LessThanEqualTo:
                    case i.NotEqualTo:
                      l(function (n) {
                        return t.checkComparisionOp_(o, n, e);
                      });
                      break;
                    default:
                      n = !1;
                  }
                };
                for (var h in u) {
                  var p = f(h);
                  if ("object" == typeof p) return p;
                }
              } else
                l(function (e) {
                  return Te(u, e);
                });
            };
          for (var u in r) {
            var a = o(u);
            if ("object" == typeof a) return a.value;
          }
          return n;
        }),
        (e.prototype.checkIn = function (e, t) {
          return (
            null !=
            e.find(function (e) {
              return Te(e, t);
            })
          );
        }),
        (e.prototype.checkLike_ = function (e, t) {
          return we(this.where[e][i.Like]).test(t);
        }),
        (e.prototype.checkRegex = function (e, t) {
          return this.where[e][i.Regex].test(t);
        }),
        (e.prototype.checkComparisionOp_ = function (e, t, n) {
          var r = this.where[e][n];
          return n != i.Between
            ? Te(t, r, n)
            : Te(t, r.low, ">=") && Te(t, r.high, "<=");
        }),
        e
      );
    })(),
    Ee = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    Oe = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.limitAtEnd = !1), (t.skipAtEnd = !1), t;
      }
      return (
        Ee(t, e),
        (t.prototype.goToWhereLogic = function () {
          var e = this,
            t = this.query,
            n = t.where,
            r = (function () {
              for (var t in n)
                if (e.objectStore.indexNames.contains(t)) return t;
            })();
          if (null == r && ((r = X(n)), !t.store))
            return N(new R(d, { column: r }));
          var o = n[r];
          if ("object" !== V(o))
            return (
              (u = $(n) > 1),
              (this.whereChecker = new Se(n, u)),
              this.whereChecker.remove([r]),
              this.executeWhereLogic(r, o, null, "next")
            );
          var u = $(o) > 1 || $(n) > 1;
          this.whereChecker = new Se(n, u);
          var a = X(o);
          switch ((this.whereChecker.remove([r, a]), a)) {
            case i.Like:
              var c = we(o[i.Like]);
              return this.executeRegexLogic(r, c);
            case i.Regex:
              return this.executeRegexLogic(r, o[i.Regex]);
            case i.In:
              return this.executeInLogic(r, o[i.In]);
            case i.Between:
            case i.GreaterThan:
            case i.LessThan:
            case i.GreaterThanEqualTo:
            case i.LessThanEqualTo:
              return this.executeWhereLogic(r, o, a, "next");
            case i.Aggregate:
              break;
            default:
              return this.executeWhereLogic(r, o, null, "next");
          }
        }),
        t
      );
    })(W),
    Ce = function (e, t) {
      var n = this;
      return function (r) {
        var o = r.target.result;
        n.results.length !== n.limitRecord && o
          ? (n.shouldAddValue(o) && t(o.value), o.continue())
          : e();
      };
    },
    je = function (e, t) {
      var n = this;
      return function (r) {
        var o = r.target.result;
        o ? (n.shouldAddValue(o) && t(o.value), o.continue()) : e();
      };
    },
    Ae = function () {
      return (
        (Ae =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }),
        Ae.apply(this, arguments)
      );
    },
    qe = (function () {
      function e(e) {
        (this.joinQueryStack_ = []),
          (this.currentQueryStackIndex_ = 0),
          (this.tablesFetched = []),
          (this.results = []),
          (this.select = e);
      }
      return (
        Object.defineProperty(e.prototype, "query", {
          get: function () {
            return this.select.query;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.getTable = function (e) {
          return this.select.table(e);
        }),
        (e.prototype.executeSelect = function (e) {
          return new Ne(e, this.select.util).execute();
        }),
        (e.prototype.execute = function () {
          var e = this,
            t = this.query;
          this.joinQueryStack_ = V(t.join) === r.Object ? [t.join] : t.join;
          var n = t.from,
            o = [];
          n && o.push(n);
          for (var u = this.joinQueryStack_, i = 0, a = u.length; i < a; i++) {
            var c = u[i],
              s = this.getJoinTableInfo_(c.on);
            c.with === s.table1.table &&
              (s = { table1: s.table2, table2: s.table1 });
            var l = this.checkJoinQuery_(s, c);
            if (l) return N(l);
            (u[i].joinTableInfo = s), c.with && o.push(c.with);
          }
          !this.select.isTxQuery &&
            o.length > 0 &&
            this.select.util.createTransaction(o);
          var f = t.where;
          if (f && !t.store) {
            var h = this.getTable(n),
              p = function (e) {
                var t;
                if (Array.isArray(e))
                  (t = []),
                    (e = e.filter(function (e) {
                      var n = p(e);
                      return (
                        Object.keys(n.whereQryAfterJoin).length > 0 &&
                          t.push(n.whereQryAfterJoin),
                        !n.isWhereEmpty
                      );
                    }));
                else {
                  t = {};
                  var n = function (n) {
                    if ("or" === n) {
                      var r = {},
                        o = e[n],
                        u = function (e) {
                          h.columns.find(function (t) {
                            return t.name === e;
                          }) || (r[e] = o[e]);
                        };
                      for (var i in o) u(i);
                      if ($(r) > 0) for (var i in ((t.or = r), r)) delete o[i];
                    } else
                      h.columns.find(function (e) {
                        return e.name === n;
                      }) || (t[n] = f[n]);
                  };
                  for (var r in e) n(r);
                  for (var r in t) delete e[r];
                }
                return {
                  isWhereEmpty: 0 === $(e),
                  whereQryAfterJoin: t,
                  whereQueryModified: e,
                };
              },
              y = p(f),
              d = y.whereQryAfterJoin;
            (t.where = y.whereQueryModified), y.isWhereEmpty && delete t.where;
            var v = this.joinQueryStack_[0];
            Object.assign(v.whereJoin, d);
          }
          return this.executeSelect({
            from: n,
            where: t.where,
            case: t.case,
            flatten: t.flatten,
            store: t.store,
            meta: t.meta,
          }).then(function (t) {
            return (
              (e.results = t.map(function (t) {
                var n;
                return ((n = {})[e.currentQueryStackIndex_] = t), n;
              })),
              e.tablesFetched.push(u[0].joinTableInfo.table1.table),
              e.startExecutingJoinLogic_()
            );
          });
        }),
        (e.prototype.onJoinQueryFinished_ = function () {
          if (0 !== this.results.length) {
            var e = this.select;
            try {
              var t = [],
                n = z(this.results[0]).length;
              this.results.forEach(function (e) {
                for (var r = e[0], o = 1; o < n; o++) r = Ae(Ae({}, r), e[o]);
                t.push(r);
              }),
                (e.results = t),
                e.setLimitAndSkipEvaluationAtEnd_(),
                (e.query.flatten = null),
                e.processOrderBy();
            } catch (e) {
              return N(new R(T, e.message));
            }
          }
        }),
        (e.prototype.startExecutingJoinLogic_ = function () {
          var e = this,
            t = this.joinQueryStack_[this.currentQueryStackIndex_];
          if (!t) return this.onJoinQueryFinished_();
          try {
            var n = t.joinTableInfo;
            return this.executeSelect({
              from: t.with,
              where: t.where,
              case: t.case,
              flatten: t.flatten,
              store: t.store,
              meta: t.meta,
            }).then(function (r) {
              return (
                e.jointables(t, n, r),
                e.tablesFetched.push(n.table2.table),
                ++e.currentQueryStackIndex_,
                e.startExecutingJoinLogic_()
              );
            });
          } catch (e) {
            return N(new R(T, e.message));
          }
        }),
        (e.prototype.jointables = function (e, t, n) {
          var r,
            o,
            u,
            i,
            a = e.type,
            c = [],
            s = t.table1.column,
            l = t.table2.column,
            f = this.tablesFetched.indexOf(t.table1.table),
            h = this.currentQueryStackIndex_ + 1,
            p = e.as,
            y = p
              ? function (e) {
                  for (var t in p) {
                    var n = p[t];
                    void 0 === e[n] && ((e[n] = e[t]), delete e[t]);
                  }
                  return e;
                }
              : function (e) {
                  return e;
                },
            d = 0,
            v = Object.assign({}, e.whereJoin),
            m = new Se(v, $(v) > 0);
          "left" === a
            ? ((i = {}),
              e.store
                ? z(e.store).forEach(function (e) {
                    i[e] = null;
                  })
                : this.getTable(t.table2.table).columns.forEach(function (e) {
                    i[e.name] = null;
                  }),
              (o =
                1 === h
                  ? function (e, t) {
                      return t[f][s] === e[l];
                    }
                  : function (e, t) {
                      var n = t[f];
                      return null != n && n[s] === e[l];
                    }),
              (u = function () {
                0 === r.length && (r = [i]);
              }))
            : ((o = function (e, t) {
                return t[f][s] === e[l];
              }),
              (u = function () {})),
            this.results.forEach(function (e) {
              (r = []),
                n.forEach(function (t) {
                  o(t, e) && r.push(Ae({}, t));
                }),
                u(),
                r.forEach(function (t) {
                  (t = y(t)),
                    m.check(t) && ((c[d] = Ae({}, e)), (c[d++][h] = t));
                });
            }),
            (this.results = c);
        }),
        (e.prototype.getJoinTableInfo_ = function (e) {
          var t = (e = ce(e)).split("="),
            n = t[0].split("."),
            r = t[1].split(".");
          return {
            table1: { table: n[0], column: n[1] },
            table2: { table: r[0], column: r[1] },
          };
        }),
        (e.prototype.checkJoinQuery_ = function (e, t) {
          if (t.store) return null;
          var n,
            r = e.table1,
            o = e.table2,
            u = this.getTable(r.table),
            i = this.getTable(o.table);
          t.with !== o.table &&
            (n = new R(T, "on value should contains value of with")),
            null ==
            u.columns.find(function (e) {
              return e.name === r.column;
            })
              ? (n = new R(
                  T,
                  "column "
                    .concat(r.column, " does not exist in table ")
                    .concat(r.table)
                ))
              : null ==
                  i.columns.find(function (e) {
                    return e.name === o.column;
                  }) &&
                (n = new R(
                  T,
                  "column "
                    .concat(o.column, " does not exist in table ")
                    .concat(o.table)
                )),
            null == t.as && (t.as = {}),
            u.columns.every(function (e) {
              var u = i.columns.find(function (t) {
                return t.name === e.name && t.name !== r.column;
              });
              return (
                null == u ||
                null != t.as[u.name] ||
                ((n = new R(
                  T,
                  "column "
                    .concat(e.name, " exist in both table ")
                    .concat(r.table, " & ")
                    .concat(o.table)
                )),
                !1)
              );
            });
          var a = t.where;
          if (a) {
            var c,
              s = function (e, t) {
                var n = function (n) {
                  switch (n) {
                    case "or":
                    case "in":
                      break;
                    default:
                      i.columns.find(function (e) {
                        return e.name === n;
                      }) || ((t[n] = e[n]), delete e[n]);
                  }
                };
                for (var r in e) n(r);
              };
            Array.isArray(a)
              ? ((c = []),
                (a = a.filter(function (e) {
                  var t = {};
                  return s(e, t), 0 !== $(t) && c.push(t), 0 !== $(e);
                })))
              : s(a, (c = {})),
              0 === $(a) && (t.where = null),
              (t.whereJoin = c);
          } else t.whereJoin = {};
          return n;
        }),
        e
      );
    })(),
    Ie = (function () {
      function e(e) {
        this.data = e;
      }
      return (
        Object.defineProperty(e.prototype, "indexNames", {
          get: function () {
            var e = z(this.data[0]);
            return {
              contains: function (t) {
                return e.indexOf(t) >= 0;
              },
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.index = function (e) {
          var t = this;
          return {
            openCursor: function (n) {
              var r = {},
                o = 0,
                u = {
                  continue: function () {
                    ++o, a();
                  },
                },
                i = function (e) {
                  r.onsuccess({ target: { result: e } });
                },
                a = function () {
                  var r = t.data[o];
                  if (r) {
                    var a = r[e];
                    a && (null == n || n.includes(a))
                      ? ((u.key = a), (u.value = r), i(u))
                      : u.continue();
                  } else i(null);
                };
              return l().then(a), r;
            },
          };
        }),
        e
      );
    })(),
    Re = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    Qe = function () {
      return (
        (Qe =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }),
        Qe.apply(this, arguments)
      );
    },
    Le = function (e, t, n) {
      if (n || 2 === arguments.length)
        for (var r, o = 0, u = t.length; o < u; o++)
          (!r && o in t) ||
            (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
      return e.concat(r || Array.prototype.slice.call(t));
    },
    Ne = (function (e) {
      function t(t, n) {
        var r = e.call(this) || this;
        (r.sorted = !1),
          (r.isSubQuery = !1),
          (r.thenEvaluator = new Y()),
          (r.returnResult_ = function () {
            if (r.results.length > 0) {
              var e = r.query;
              if (e.flatten) {
                var t = [],
                  n = new Map();
                e.flatten.forEach(function (e) {
                  r.results.forEach(function (r, o) {
                    r[e].forEach(function (n) {
                      var o;
                      t.push(Qe(Qe({}, r), (((o = {})[e] = n), o)));
                    }),
                      n.set(o, !0);
                  });
                });
                var o = 0;
                n.forEach(function (e, t) {
                  r.results.splice(t - o, 1), ++o;
                }),
                  (r.results = r.results.concat(t));
              }
              r.processGroupDistinctAggr(),
                r.processOrderBy(),
                r.skipAtEnd && r.results.splice(0, e.skip),
                r.limitAtEnd && (r.results = r.results.slice(0, e.limit));
            }
            return r.results;
          }),
          (r.query = t),
          (r.util = n),
          (r.tableName = t.from),
          r.setPushResult(),
          H(t.where)
            ? ((r.isArrayQry = !0), r.setLimitAndSkipEvaluationAtEnd_())
            : ((r.skipRecord = t.skip), (r.limitRecord = t.limit));
        var o = t.order;
        return (
          o
            ? ((H(o) || o.case || "object" == typeof o.by) &&
                (o.idbSorting = !1),
              r.setLimitAndSkipEvaluationAtEnd_())
            : t.groupBy && r.setLimitAndSkipEvaluationAtEnd_(),
          r
        );
      }
      return (
        Re(t, e),
        (t.prototype.execute = function (e) {
          var t = this;
          e ||
            (e = function () {
              return l(null);
            });
          var n = this.query;
          try {
            var r = new K(this.db).validate(o.Select, n);
            return r
              ? N(r)
              : e().then(function (e) {
                  return (
                    t.initTransaction_(),
                    (null == n.join
                      ? null != n.where
                        ? H(n.where)
                          ? t.processWhereArrayQry()
                          : t.processWhere_()
                        : t.executeWhereUndefinedLogic()
                      : t.executeJoinQuery()
                    ).then(t.returnResult_.bind(t))
                  );
                });
          } catch (e) {
            return this.onException(e);
          }
        }),
        (t.prototype.processWhereArrayQry = function () {
          var e = this;
          this.isArrayQry = !0;
          var n,
            r = this.query.where,
            o = this.primaryKey(),
            u = !0,
            a = [],
            c = function () {
              var t;
              return (
                n === i.And
                  ? !0 === u
                    ? (a = e.results)
                    : a.length > 0 &&
                      ((t = []),
                      e.results.forEach(function (e) {
                        var n;
                        (n = e[o]),
                          a.findIndex(function (e) {
                            return e[o] === n;
                          }) >= 0 && t.push(e);
                      }),
                      (a = t),
                      (t = null))
                  : (a.length > 0 &&
                      ((e.results = Le(Le([], a, !0), e.results, !0)),
                      e.removeDuplicates()),
                    (a = e.results)),
                (u = !1),
                r.length > 0 ? ((e.results = []), f()) : ((e.results = a), l())
              );
            },
            s = function (n) {
              return new t({ from: e.query.from, where: n }, e.util)
                .execute()
                .then(function (t) {
                  return (e.results = t), c();
                });
            },
            f = function () {
              var t = r.shift(),
                o = t[i.Or];
              if (o) {
                if (H(o)) return (n = i.Or), s(o);
                1 === $(t) ? ((n = i.Or), (t = o)) : (n = i.And);
              } else if (((n = i.And), H(t))) return s(t);
              return (e.query.where = t), e.processWhere_().then(c);
            };
          return f();
        }),
        (t.prototype.initTransaction_ = function () {
          var e = this.query.store;
          e
            ? (this.objectStore = new Ie(e))
            : (this.isTxQuery ||
                this.util.createTransactionIfNotExist(
                  [this.tableName],
                  a.ReadOnly
                ),
              (this.objectStore = this.util.objectStore(this.tableName)));
        }),
        (t.prototype.processWhere_ = function () {
          var e = this;
          return (
            (this.shouldAddValue = function (t) {
              var n = t.value,
                r = e,
                o = new Proxy(n, {
                  get: function (e, t, o) {
                    var u = n[t];
                    if (!u) {
                      var i = r.getColumnInfo(t);
                      if (i && i.keyPath)
                        return i.keyPath.map(function (e) {
                          return n[e];
                        });
                    }
                    return u;
                  },
                });
              return e.whereChecker.check(o);
            }),
            this.query.where.or && this.processOrLogic_(),
            this.goToWhereLogic().then(function () {
              return e.onWhereEvaluated();
            })
          );
        }),
        (t.prototype.onWhereEvaluated = function () {
          if (this.isOr) return this.orQuerySuccess_();
        }),
        (t.prototype.orQueryFinish_ = function () {
          (this.isOr = !1),
            (this.results = this.orInfo.results),
            (this.orInfo = null),
            this.removeDuplicates();
        }),
        (t.prototype.orQuerySuccess_ = function () {
          var e = this.query;
          this.results.length > 0 &&
            (this.orInfo.results = Le(
              Le([], this.orInfo.results, !0),
              this.results,
              !0
            )),
            (this.results = []);
          var t = X(this.orInfo.orQuery);
          if (null != t) {
            var n = {};
            return (
              (n[t] = this.orInfo.orQuery[t]),
              delete this.orInfo.orQuery[t],
              (e.where = n),
              this.goToWhereLogic().then(this.onWhereEvaluated.bind(this))
            );
          }
          return this.orQueryFinish_();
        }),
        (t.prototype.processOrLogic_ = function () {
          this.isOr = !0;
          var e = this.query.where;
          (this.orInfo = { orQuery: e.or, results: [] }),
            this.setLimitAndSkipEvaluationAtEnd_(),
            delete e.or;
        }),
        t
      );
    })(Oe);
  function De(e) {
    var t = 1 === $(e);
    if (t) {
      var n = X(e);
      t = 1 === $(e[n]);
    }
    return t;
  }
  (Ne.prototype.executeInLogic = function (e, t) {
    var n = this,
      r = this.skipRecord,
      o = function (e) {
        0 === r ? n.pushResult(e) : --r;
      },
      u = Z.call(this, re, ne, je, Ce);
    return L(
      t.map(function (t) {
        return f(function (r, i) {
          var a = n.objectStore.index(e).openCursor(n.util.keyRange(t));
          (a.onsuccess = u.call(n, r, o)), (a.onerror = i);
        });
      })
    );
  }),
    (Ne.prototype.executeWhereUndefinedLogic = function () {
      var e,
        t = this,
        n = this.query,
        r = n.store;
      if (r)
        return (this.results = r), this.setLimitAndSkipEvaluationAtEnd_(), l();
      var o = n.order,
        u = this.objectStore;
      if (o && !1 !== o.idbSorting && o.by) {
        if (!u.indexNames.contains(o.by))
          return N(new R(y, { column: o.by, isOrder: !0 }));
        var i = o.type && "desc" === o.type.toLowerCase() ? "prev" : "next";
        (this.sorted = !0), (e = u.index(o.by).openCursor(null, i));
      } else e = u.openCursor();
      var a = Z.call(this, ie, ae, ue, oe);
      return f(function (n, r) {
        (e.onerror = r), (e.onsuccess = a.call(t, n));
      });
    }),
    (Ne.prototype.executeWhereLogic = function (e, t, n, r) {
      var o = this;
      t = n ? t[n] : t;
      var u = this.objectStore.index(e).openCursor(this.util.keyRange(t, n), r),
        i = Z.call(this, re, ne, te, ee);
      return f(function (e, t) {
        (u.onerror = t), (u.onsuccess = i.call(o, e));
      });
    }),
    (Ne.prototype.executeRegexLogic = function (e, t) {
      var n = this,
        r = this.skipRecord,
        o = function (e) {
          0 === r ? n.pushResult(e) : --r;
        };
      this.shouldAddValue = function (e) {
        return t.test(e.key) && n.whereChecker.check(e.value);
      };
      var u = this.objectStore.index(e).openCursor(),
        i = Z.call(this, re, ne, je, Ce);
      return f(function (e, t) {
        (u.onerror = t), (u.onsuccess = i.call(n, e, o));
      });
    }),
    (Ne.prototype.setLimitAndSkipEvaluationAtEnd_ = function () {
      this.query.limit && (this.limitAtEnd = !0),
        this.query.skip && (this.skipAtEnd = !0);
    }),
    (Ne.prototype.setPushResult = function () {
      var e = this,
        t = this.query.case;
      this.pushResult = t
        ? function (n) {
            var r;
            for (r in (e.thenEvaluator.setCaseAndValue(t, n), t))
              n[r] = e.thenEvaluator.setColumn(r).evaluate();
            e.results.push(n);
          }
        : function (t) {
            e.results.push(t);
          };
    }),
    (Ne.prototype.removeDuplicates = function () {
      for (
        var e = this.results,
          t = this.primaryKey(),
          n = new Map(),
          r = 0,
          o = e.length;
        r < o;
        r++
      )
        n.set(e[r][t], e[r]);
      this.results = Array.from(n.values());
    }),
    (Ne.prototype.executeJoinQuery = function () {
      return new qe(this).execute();
    }),
    (Ne.prototype.processGroupDistinctAggr = function () {
      var e = this.query;
      if (e.distinct) {
        var t = [],
          n = this.results[0];
        for (var r in n) t.push(r);
        var o = this.primaryKey(),
          u = t.indexOf(o);
        t.splice(u, 1), (e.groupBy = t.length > 0 ? t : null);
      }
      e.groupBy
        ? e.aggregate
          ? this.executeAggregateGroupBy()
          : this.processGroupBy()
        : e.aggregate && this.processAggregateQry();
    }),
    (Ne.prototype.processOrderBy = function () {
      var e = this.query.order;
      if (e && this.results.length > 0 && !this.sorted) {
        var t = V(e);
        if (t === r.Object) ge.call(this, e);
        else if (t === r.Array) {
          ge.call(this, e[0]);
          for (
            var n = function (t, n) {
                var r = e[t - 1].by,
                  u = e[t],
                  i = u.by,
                  a = se.call(o, i);
                if (null != a) {
                  (i = a.name), (u.type = _e(u.type));
                  var c = be(a, u);
                  o.results.sort(function (e, t) {
                    return e[r] === t[r] ? c(e[i], t[i]) : 0;
                  });
                }
              },
              o = this,
              u = 1,
              i = e.length;
            u < i;
            u++
          )
            n(u);
        }
      }
    }),
    (Ne.prototype.processAggregateQry = function () {
      var e,
        t = this.results,
        n = t.length,
        o = {},
        u = function () {
          var n = 0;
          for (var r in t) n += t[r][e] ? 1 : 0;
          return n;
        },
        i = function () {
          var n = 0;
          for (var r in t) n = n > t[r][e] ? n : t[r][e];
          return n;
        },
        a = function () {
          var n = 1 / 0,
            r = 1 / 0;
          for (var o in t) n = n < (r = t[o][e] ? t[o][e] : 1 / 0) ? n : r;
          return n;
        },
        c = function () {
          var n = 0;
          for (var r in t) n += t[r][e];
          return n;
        },
        s = function () {
          return c() / n;
        },
        l = this.query.aggregate;
      for (var f in l) {
        var h = l[f],
          p = V(h),
          y = void 0;
        switch (f) {
          case "count":
            y = u;
            break;
          case "max":
            y = i;
            break;
          case "min":
            y = a;
            break;
          case "sum":
            y = c;
            break;
          case "avg":
            y = s;
        }
        switch (p) {
          case r.String:
            (e = h), (o["".concat(f, "(").concat(e, ")")] = y());
            break;
          case r.Array:
            for (var d in h)
              (e = h[d]), (o["".concat(f, "(").concat(e, ")")] = y());
        }
      }
      for (var f in o) t[0][f] = o[f];
      this.results = [t[0]];
    }),
    (Ne.prototype.executeAggregateGroupBy = function () {
      var e,
        t,
        n,
        o,
        u = this.query.groupBy,
        a = this.results,
        c = new Map(),
        s = this.query.aggregate,
        l = function () {
          var u = function () {
              return (
                (n = (n = c.get(t)) ? n["count(" + o + ")"] : 0),
                (n += a[e][o] ? 1 : 0)
              );
            },
            l = function () {
              return (
                (n = (n = c.get(t)) ? n["list(" + o + ")"] : []).push(a[e][o]),
                n
              );
            },
            f = function () {
              return (
                (n = (n = c.get(t)) ? n["max(" + o + ")"] : 0),
                (a[e][o] = a[e][o] ? a[e][o] : 0),
                n > a[e][o] ? n : a[e][o]
              );
            },
            h = function () {
              return (
                (n = (n = c.get(t)) ? n["min(" + o + ")"] : 1 / 0),
                (a[e][o] = a[e][o] ? a[e][o] : 1 / 0),
                n < a[e][o] ? n : a[e][o]
              );
            },
            p = function () {
              return (
                (n = (n = c.get(t)) ? n["sum(" + o + ")"] : 0),
                (n += a[e][o] ? a[e][o] : 0)
              );
            },
            y = function () {
              var r = (n = c.get(t)) ? n["sum(" + o + ")"] : 0;
              (r += a[e][o] ? a[e][o] : 0),
                (a[e]["sum(" + o + ")"] = r),
                (n = n ? n["count(" + o + ")"] : 0),
                (n += a[e][o] ? 1 : 0),
                (a[e]["count(" + o + ")"] = n);
            };
          for (var d in s) {
            var v = s[d],
              m = V(v),
              b = void 0;
            switch (d) {
              case i.Count:
                b = u;
                break;
              case i.Max:
                b = f;
                break;
              case i.Min:
                b = h;
                break;
              case i.Sum:
                b = p;
                break;
              case i.Avg:
                b = y;
                break;
              case i.List:
                b = l;
            }
            switch (m) {
              case r.String:
                (o = v), (a[e]["".concat(d, "(").concat(o, ")")] = b());
                break;
              case r.Array:
                for (var g in v)
                  (o = v[g]), (a[e]["".concat(d, "(").concat(o, ")")] = b());
            }
          }
        };
      if (V(u) === r.String) for (e in a) (t = a[e][u]), l(), c.set(t, a[e]);
      else
        for (e in a) {
          for (var f in ((t = ""), u)) t += a[e][u[f]];
          l(), c.set(t, a[e]);
        }
      a = Array.from(c.values());
      var h = s.avg;
      if (h)
        if (V(h) === r.String)
          for (e in a) {
            var p = a[e]["sum(" + h + ")"],
              y = a[e]["count(" + h + ")"];
            (a[e]["avg(" + h + ")"] = p / y),
              s.count !== h && delete a[e]["count(" + h + ")"],
              s.sum !== h && delete a[e]["sum(" + h + ")"];
          }
        else {
          var d = V(s.count) === r.String,
            v = V(s.sum) === r.String;
          for (e in a)
            for (var f in h) {
              var m = h[f],
                b = a[e]["sum(" + m + ")"],
                g = a[e]["count(" + m + ")"];
              (a[e]["avg(" + m + ")"] = b / g),
                d &&
                  (s.count !== m || -1 === s.count.indexOf(m)) &&
                  delete a[e]["count(" + m + ")"],
                v &&
                  (s.sum !== m || -1 === s.sum.indexOf(m)) &&
                  delete a[e]["sum(" + m + ")"];
            }
        }
      this.results = a;
    }),
    (Ne.prototype.processGroupBy = function () {
      var e = this.query.groupBy,
        t = this.results,
        n = new Map(),
        o = V(e);
      if (o !== r.Object)
        if (o === r.String) for (var u in t) n.set(t[u][e], t[u]);
        else {
          var i = void 0;
          for (var u in t) {
            for (var a in ((i = ""), e)) i += t[u][e[a]];
            n.set(i, t[u]);
          }
        }
      else if (1 === Object.keys(e).length) {
        var c = X(e);
        for (var u in (this.thenEvaluator.setCaseAndColumn(e, c), t))
          n.set(this.thenEvaluator.setValue(t[u]).evaluate(), t[u]);
      } else
        for (var u in ((i = void 0), t)) {
          for (var a in ((i = ""),
          this.thenEvaluator.setCaseAndValue(e, t[u]),
          e))
            i += this.thenEvaluator.setColumn(a).evaluate();
          n.set(i, t[u]);
        }
      this.results = Array.from(n.values());
    });
  var We = function (e) {
      var t = this;
      return function (n) {
        var r = n.target.result;
        r ? (t.shouldAddValue(r) && ++t.resultCount, r.continue()) : e();
      };
    },
    Ve = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    Be = (function (e) {
      function t(t, n) {
        var r = e.call(this) || this;
        return (
          (r.resultCount = 0),
          (r.query = t),
          (r.util = n),
          (r.tableName = t.from),
          r
        );
      }
      return (
        Ve(t, e),
        (t.prototype.execute = function (e) {
          var t = this,
            n = new K(this.db),
            r = this.query,
            u = n.validate(o.Count, r);
          return u
            ? N(u)
            : e().then(function (e) {
                var n;
                try {
                  var o = function () {
                    var e = new Ne(r, t.util);
                    return (
                      (e.isTxQuery = t.isTxQuery),
                      e.execute().then(function (e) {
                        t.resultCount = e.length;
                      })
                    );
                  };
                  t.initTransaction_(),
                    null == r.join
                      ? null != r.where
                        ? r.where.or || H(r.where)
                          ? (n = o())
                          : ((t.shouldAddValue = function (e) {
                              return t.whereChecker.check(e.value);
                            }),
                            (n = t.goToWhereLogic()))
                        : (n = t.executeWhereUndefinedLogic())
                      : (n = o());
                } catch (e) {
                  t.onException(e);
                }
                return n.then(function (e) {
                  return t.resultCount;
                });
              });
        }),
        (t.prototype.initTransaction_ = function () {
          var e = this.query.from;
          this.isTxQuery || this.util.createTransaction([e], a.ReadOnly),
            (this.objectStore = this.util.objectStore(e));
        }),
        t
      );
    })(Oe);
  (Be.prototype.executeWhereUndefinedLogic = function () {
    var e,
      t,
      n = this,
      r = this.objectStore,
      o = r.count
        ? ((e = r.count()),
          function (t) {
            return function () {
              (n.resultCount = e.result), t();
            };
          })
        : ((e = r.openCursor()),
          function (e) {
            return function (r) {
              (t = r.target.result) ? (++n.resultCount, t.continue()) : e();
            };
          });
    return f(function (t, n) {
      (e.onerror = n), (e.onsuccess = o(t));
    });
  }),
    (Be.prototype.executeWhereLogic = function (e, t, n) {
      var r,
        o = this;
      t = n ? t[n] : t;
      var u = De(this.query.where),
        i = this.objectStore;
      return f(function (a, c) {
        u && i.count
          ? ((r = i.index(e).count(o.util.keyRange(t, n))).onsuccess =
              function () {
                (o.resultCount = r.result), a();
              })
          : ((r = i.index(e).openCursor(o.util.keyRange(t, n))).onsuccess =
              We.call(o, a)),
          (r.onerror = c);
      });
    }),
    (Be.prototype.executeRegexLogic = function (e, t) {
      var n = this,
        r = this.objectStore.index(e).openCursor();
      return (
        (this.shouldAddValue = function (e) {
          return t.test(e.key) && n.whereChecker.check(e.value);
        }),
        f(function (e, t) {
          (r.onerror = t), (r.onsuccess = We.call(n, e));
        })
      );
    }),
    (Be.prototype.executeInLogic = function (e, t) {
      var n = this,
        r = this.objectStore,
        o = r.index(e),
        u = De(this.query.where);
      return L(
        t.map(function (e) {
          return (
            (t = e),
            (i = n.util.keyRange(t)),
            u && r.count
              ? f(function (e, t) {
                  var r = o.count(i);
                  (r.onsuccess = function (t) {
                    (n.resultCount += t.target.result), e();
                  }),
                    (r.onerror = t);
                })
              : f(function (e, t) {
                  var r = o.openCursor(i);
                  (r.onsuccess = We.call(n, e)), (r.onerror = t);
                })
          );
          var t, i;
        })
      );
    });
  var Pe = function (e) {
      return (H(e) ? e : e.split(".")).reduce(function (e, t) {
        return e && e[t];
      }, self);
    },
    Me = function (e, t) {
      var n = e.set,
        o = e.mapSet;
      if (o) {
        var u = o(n, t);
        null != u && (n = u);
      }
      for (var i in n) {
        var a = n[i];
        if (V(a) !== r.Object) t[i] = a;
        else
          for (var c in a) {
            var s = a[c];
            switch (c) {
              case "+":
                t[i] += s;
                break;
              case "-":
                t[i] -= s;
                break;
              case "*":
                t[i] *= s;
                break;
              case "/":
                t[i] /= s;
                break;
              case "{push}":
                t[i].push(s);
                break;
              default:
                t[i] = a;
            }
            break;
          }
      }
      return t;
    },
    Ke = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    Ge = (function (e) {
      function t(t, n) {
        var o = e.call(this) || this;
        (o.query = t), (o.util = n), (o.tableName = t.in);
        var u = t.mapSet;
        if (u) {
          var i = V(u) === r.String ? Pe(u) : u;
          if (!i) throw new R(E, u);
          t.mapSet = i;
        }
        return o;
      }
      return (
        Ke(t, e),
        (t.prototype.execute = function (e) {
          var t = this,
            n = this.query;
          try {
            var r = new K(this.db).validate(o.Update, n);
            return r
              ? N(r)
              : e().then(function (e) {
                  return (
                    t.initTransaction(),
                    (null != n.where
                      ? n.where.or || H(n.where)
                        ? t.executeComplexLogic_()
                        : t.goToWhereLogic()
                      : t.executeWhereUndefinedLogic()
                    ).then(function () {
                      return t.rowAffected;
                    })
                  );
                });
          } catch (e) {
            return this.onException(e);
          }
        }),
        (t.prototype.executeComplexLogic_ = function () {
          var e = this,
            t = this.query,
            n = new Ne(
              { from: t.in, where: t.where, ignoreCase: t.ignoreCase },
              this.util
            );
          return (
            (n.isTxQuery = this.isTxQuery),
            n.execute().then(function (n) {
              var r,
                o,
                u = e.primaryKey(t.in),
                a = [];
              n.forEach(function (e) {
                a.push(e[u]);
              }),
                (n = null);
              var c = (((r = {})[u] = (((o = {})[i.In] = a), o)), r);
              return (
                (e.query.where = c), e.initTransaction(), e.goToWhereLogic()
              );
            })
          );
        }),
        (t.prototype.initTransaction = function () {
          var e = this.query.in;
          this.isTxQuery || this.util.createTransaction([e]),
            (this.objectStore = this.util.objectStore(e));
        }),
        t
      );
    })(Oe);
  (Ge.prototype.executeWhereUndefinedLogic = function () {
    var e = this,
      t = this.objectStore.openCursor();
    return f(function (n, r) {
      (t.onsuccess = function (t) {
        var o = t.target.result;
        if (o)
          try {
            var u = o.update(Me(e.query, o.value));
            (u.onsuccess = function () {
              ++e.rowAffected, o.continue();
            }),
              (u.onerror = r);
          } catch (e) {
            r(e);
          }
        else n();
      }),
        (t.onerror = r);
    });
  }),
    (Ge.prototype.executeWhereLogic = function (e, t, n) {
      var r = this,
        o = this.query;
      t = n ? t[n] : t;
      var u = this.objectStore.index(e).openCursor(this.util.keyRange(t, n));
      return f(function (e, t) {
        (u.onsuccess = function (n) {
          var u = n.target.result;
          if (u)
            if (r.whereChecker.check(u.value))
              try {
                var i = u.update(Me(o, u.value));
                (i.onsuccess = function () {
                  ++r.rowAffected, u.continue();
                }),
                  (i.onerror = t);
              } catch (e) {
                t(e);
              }
            else u.continue();
          else e();
        }),
          (u.onerror = t);
      });
    }),
    (Ge.prototype.executeRegexLogic = function (e, t) {
      var n,
        r = this,
        o = this.objectStore.index(e).openCursor();
      return (
        (this.shouldAddValue = function (e) {
          return t.test(e.key) && r.whereChecker.check(e.value);
        }),
        f(function (e, t) {
          (o.onsuccess = function (o) {
            if ((n = o.target.result))
              if (r.shouldAddValue(n))
                try {
                  var u = n.update(Me(r.query, n.value));
                  (u.onsuccess = function () {
                    ++r.rowAffected, n.continue();
                  }),
                    (u.onerror = t);
                } catch (e) {
                  t(e);
                }
              else n.continue();
            else e();
          }),
            (o.onerror = t);
        })
      );
    }),
    (Ge.prototype.executeInLogic = function (e, t) {
      var n = this,
        r = this.objectStore.index(e),
        o = this.query;
      return L(
        t.map(function (e) {
          return (
            (t = e),
            f(function (e, u) {
              var i = r.openCursor(n.util.keyRange(t));
              (i.onsuccess = function (t) {
                var r = t.target.result;
                if (r) {
                  var i = r.value;
                  if (n.whereChecker.check(i))
                    try {
                      var a = r.update(Me(o, i));
                      (a.onsuccess = function () {
                        ++n.rowAffected, r.continue();
                      }),
                        (a.onerror = u);
                    } catch (e) {
                      u(e);
                    }
                  else r.continue();
                } else e();
              }),
                (i.onerror = u);
            })
          );
          var t;
        })
      );
    });
  var Je = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    Fe = function () {
      return (
        (Fe =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }),
        Fe.apply(this, arguments)
      );
    },
    Ue = (function (e) {
      function t(t, n) {
        var r = e.call(this) || this;
        return (r.query = t), (r.util = n), r;
      }
      return (
        Je(t, e),
        (t.prototype.execute = function () {
          var e,
            t,
            n = this,
            r = this.query,
            o = 0,
            u = {},
            i = {},
            a = !0,
            c = r.queries,
            s = c.length;
          if (
            (c.every(function (e, t) {
              return !(t + 1 < s && e.from !== c[t + 1].from && ((a = !1), 1));
            }),
            a)
          ) {
            var l = this.primaryKey(c[0].from);
            e = function (e) {
              return e[l];
            };
          } else
            e = function (e) {
              var t = "";
              for (var n in e) t += e[n];
              return t;
            };
          var f = function () {
            if (o < s)
              return (t = new Ne(c[o], n.util)).execute().then(function (t) {
                return (
                  (u = {}),
                  t.forEach(function (t) {
                    var n = e(t);
                    0 === o ? (i[n] = t) : null != i[n] && (u[n] = t);
                  }),
                  o > 0 && (i = Fe({}, u)),
                  ++o,
                  f()
                );
              });
            var a,
              l = [],
              h = void 0,
              p = r.skip,
              y = r.limit,
              d = !1,
              v = function () {
                l.push(u[a]);
              },
              m = function () {
                l.length < y ? v() : (d = !0);
              },
              b = function (e) {
                0 === p ? e() : --p;
              };
            if (
              ((h =
                r.skip && r.limit
                  ? function () {
                      b(function () {
                        m();
                      });
                    }
                  : r.limit
                  ? m
                  : r.skip
                  ? function () {
                      b(function () {
                        v();
                      });
                    }
                  : function () {
                      v();
                    }),
              y)
            ) {
              for (a in u) if ((h(a), d)) break;
            } else for (a in u) h(a);
            return (
              (t.results = l),
              Object.assign(t.query, { order: r.order, join: {} }),
              t.processOrderBy(),
              t.processGroupDistinctAggr(),
              t.results
            );
          };
          return f();
        }),
        t
      );
    })(W),
    He = (function () {
      function e() {}
      return (
        (e.prototype.execute = function (e) {
          return f(function (t, n) {
            var r = indexedDB.deleteDatabase(e);
            (r.onblocked = function () {
              var e = new R(w);
              return n(D(e));
            }),
              (r.onerror = function (e) {
                return n(D(e));
              }),
              (r.onsuccess = function () {
                t();
              });
          });
        }),
        e
      );
    })(),
    ze = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    $e = (function (e) {
      function t(t, n) {
        var r = e.call(this) || this;
        return (r.query = t), (r.util = n), r;
      }
      return (
        ze(t, e),
        (t.prototype.execute = function () {
          var e,
            t = this,
            n = this.query,
            r = 0,
            o = new Map(),
            u = !0,
            i = n.length;
          if (
            (n.every(function (e, t) {
              return !(t + 1 < i && e.from !== n[t + 1].from && ((u = !1), 1));
            }),
            u)
          ) {
            var a = this.primaryKey(n[0].from);
            e = function (e) {
              return e[a];
            };
          } else
            e = function (e) {
              var t = "";
              for (var n in e) t += e[n];
              return t;
            };
          var c = function () {
            return r < n.length
              ? new Ne(n[r++], t.util).execute().then(function (t) {
                  return (
                    t.forEach(function (t) {
                      o.set(e(t), t);
                    }),
                    c()
                  );
                })
              : Array.from(o.values());
          };
          return c();
        }),
        t
      );
    })(W),
    Xe = function (e) {
      var t = this;
      return function (n) {
        var r = n.target.result;
        r
          ? (t.shouldAddValue(r.value) && (r.delete(), ++t.rowAffected),
            r.continue())
          : e();
      };
    },
    Ye = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    Ze = (function (e) {
      function t(t, n) {
        var r = e.call(this) || this;
        return (r.query = t), (r.util = n), (r.tableName = t.from), r;
      }
      return (
        Ye(t, e),
        (t.prototype.execute = function (e) {
          var t,
            n = this,
            r = new K(this.db),
            u = this.query,
            i = r.validate(o.Remove, u);
          return i
            ? N(i)
            : e().then(function (e) {
                try {
                  n.initTransaction_(),
                    (t =
                      null != u.where
                        ? H(u.where)
                          ? n.processWhereArrayQry()
                          : n.processWhere_()
                        : n.executeWhereUndefinedLogic());
                } catch (e) {
                  return n.onException(e);
                }
                return t.then(function () {
                  return n.rowAffected;
                });
              });
        }),
        (t.prototype.processWhereArrayQry = function () {
          var e = this,
            t = new Ne(this.query, this.util);
          return (
            (t.isTxQuery = this.isTxQuery),
            t.execute().then(function (t) {
              var n,
                r,
                o = [],
                u = e.primaryKey(e.query.from);
              t.forEach(function (e) {
                o.push(e[u]);
              }),
                (t = null);
              var a = (((n = {})[u] = (((r = {})[i.In] = o), r)), n);
              return (e.query[i.Where] = a), e.processWhere_();
            })
          );
        }),
        (t.prototype.processWhere_ = function () {
          var e = this;
          return (
            (this.shouldAddValue = function (t) {
              return e.whereChecker.check(t);
            }),
            this.query.where.or && this.processOrLogic(),
            this.goToWhereLogic().then(function () {
              return e.onWhereEvaluated();
            })
          );
        }),
        (t.prototype.initTransaction_ = function () {
          this.isTxQuery || this.util.createTransaction([this.query.from]),
            (this.objectStore = this.util.objectStore(this.query.from));
        }),
        (t.prototype.onWhereEvaluated = function () {
          if (this.isOr) return this.orQuerySuccess_();
        }),
        (t.prototype.orQuerySuccess_ = function () {
          var e = this,
            t = this._orInfo.OrQuery,
            n = X(t);
          if (null != n) {
            var r = {};
            return (
              (r[n] = t[n]),
              delete t[n],
              (this.query.where = r),
              this.goToWhereLogic().then(function () {
                return e.onWhereEvaluated();
              })
            );
          }
          this.isOr = !0;
        }),
        (t.prototype.processOrLogic = function () {
          this.isOr = !0;
          var e = this.query.where;
          (this._orInfo = { OrQuery: e.or }), delete e.or;
        }),
        t
      );
    })(Oe);
  (Ze.prototype.executeInLogic = function (e, t) {
    var n = this,
      r = this.objectStore.index(e);
    return L(
      t.map(function (e) {
        return (
          (t = e),
          f(function (e, o) {
            var u = r.openCursor(n.util.keyRange(t));
            (u.onsuccess = Xe.call(n, e)), (u.onerror = o);
          })
        );
        var t;
      })
    );
  }),
    (Ze.prototype.executeWhereUndefinedLogic = function () {
      var e,
        t = this,
        n = this.objectStore.openCursor();
      return f(function (r, o) {
        (n.onsuccess = function (n) {
          (e = n.target.result)
            ? (e.delete(), ++t.rowAffected, e.continue())
            : r();
        }),
          (n.onerror = o);
      });
    }),
    (Ze.prototype.executeWhereLogic = function (e, t, n) {
      var r = this;
      t = n ? t[n] : t;
      var o = this.objectStore.index(e).openCursor(this.util.keyRange(t, n));
      return f(function (e, t) {
        (o.onsuccess = Xe.call(r, e)), (o.onerror = t);
      });
    }),
    (Ze.prototype.executeRegexLogic = function (e, t) {
      var n,
        r = this,
        o = this.objectStore.index(e).openCursor();
      return (
        (this.shouldAddValue = function (e) {
          return t.test(e.key) && r.whereChecker.check(e.value);
        }),
        f(function (e, t) {
          (o.onsuccess = function (t) {
            (n = t.target.result)
              ? (r.shouldAddValue(n) && (n.delete(), ++r.rowAffected),
                n.continue())
              : e();
          }),
            (o.onerror = t);
        })
      );
    });
  var et = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    tt = (function (e) {
      function t(t, n) {
        var r = e.call(this) || this;
        return (r.query = t), (r.util = n), (r.tableName = t), r;
      }
      return (
        et(t, e),
        (t.prototype.execute = function (e) {
          var t = this,
            n = this.query;
          return (
            this.isTxQuery || this.util.createTransaction([n, A.tableName]),
            e().then(function (e) {
              var r = t.util.objectStore(n).clear();
              try {
                return f(function (e, o) {
                  (r.onsuccess = function (r) {
                    var u = t.table(n);
                    for (var i in u.autoIncColumnValue)
                      u.autoIncColumnValue[i] = 0;
                    A.set(A.dbSchema, t.util.db, t.util).then(e).catch(o);
                  }),
                    (r.onerror = o);
                });
              } catch (e) {
                return t.onException(e);
              }
            })
          );
        }),
        t
      );
    })(W),
    nt = (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if ("function" != typeof n && null !== n)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })(),
    rt = (function (e) {
      function t(t, n) {
        var r = e.call(this) || this;
        return (
          (r.results = {}),
          (r.reqQueue = []),
          (r.isQueryExecuting = !1),
          (r.isTxStarted_ = !1),
          (r.query = t),
          (r.util = n),
          r
        );
      }
      return (
        nt(t, e),
        (t.prototype.execute = function (e) {
          var t = this;
          this.beforeExecute = e;
          var n = this.validate();
          return n
            ? N(n)
            : (this.startExecution_(),
              f(function (e, n) {
                (t.onSuccess = e), (t.onError = n);
              }).then(function (e) {
                return (
                  (t.beforeExecute = null), t.log("transaction finished"), e
                );
              }));
        }),
        (t.prototype.validate = function () {
          var e = this.query,
            t = this.notExistingTable_(e.tables);
          if (t) return new R(g, { tableName: t });
          var n = e.method;
          return Pe(n) ? void 0 : new R(E, n);
        }),
        (t.prototype.startExecution_ = function () {
          var e = this,
            t = this.query,
            n = function (t) {
              return function (n) {
                return e.pushReq_({ name: t, query: n });
              };
            },
            r = t.method,
            u = Pe(r);
          return (
            this.log("transaction query started"),
            u.call(this, {
              data: t.data,
              insert: n(o.Insert),
              select: n(o.Select),
              update: n(o.Update),
              remove: n(o.Remove),
              count: n(o.Count),
              setResult: function (t, n) {
                e.results[t] = n;
              },
              getResult: function (t) {
                return e.results[t];
              },
              abort: function (t) {
                e.abortTx_(t);
              },
              start: function () {
                e.startTx_();
              },
            })
          );
        }),
        (t.prototype.log = function (e) {
          this.util.logger.log(e);
        }),
        (t.prototype.startTx_ = function () {
          var e = this;
          try {
            this.isTxStarted_ = !0;
            var t = this.query.tables;
            return (
              (t = t.concat(A.tableName)),
              this.util
                .createTransaction(t)
                .then(function (t) {
                  e.onSuccess(e.results);
                })
                .catch(function (t) {
                  e.onError(t);
                }),
              this.processExecutionOfQry_()
            );
          } catch (e) {
            this.onError(this.onException(e));
          }
        }),
        (t.prototype.onReqFinished_ = function (e) {
          var t = this.reqQueue.shift();
          this.log("finished request : ".concat(t.name, " ")),
            t &&
              (e.error
                ? (this.abortTx_(
                    "automatic abort of transaction due to error occured"
                  ),
                  this.log("transaction aborted due to error occured"),
                  this.onError(e.error))
                : ((this.isQueryExecuting = !1),
                  t.onSuccess && t.onSuccess(e),
                  this.processExecutionOfQry_()));
        }),
        (t.prototype.abortTx_ = function (e) {
          (this.reqQueue = []),
            this.util.abortTransaction(),
            this.log("transaction aborted. Msg : ".concat(e));
        }),
        (t.prototype.executeRequest_ = function (e) {
          var t,
            n = this;
          (this.isQueryExecuting = !0),
            this.log("executing request : ".concat(e.name, " "));
          var r = this.onReqFinished_.bind(this),
            u = e.query,
            i = function (e) {
              t = new e(u, n.util);
            };
          switch (e.name) {
            case o.Select:
              i(Ne);
              break;
            case o.Insert:
              i(J);
              break;
            case o.Update:
              i(Ge);
              break;
            case o.Remove:
              i(Ze);
              break;
            case o.Count:
              i(Be);
          }
          (t.isTxQuery = !0),
            t
              .execute(this.beforeExecute)
              .then(r)
              .catch(function (e) {
                r({ error: e });
              });
        }),
        (t.prototype.pushReq_ = function (e) {
          var t = f(function (t, n) {
            (e.onSuccess = function (e) {
              t(e);
            }),
              (e.onError = function (e) {
                n(e);
              });
          });
          return (
            this.reqQueue.push(e),
            !0 === this.isTxStarted_ && this.processExecutionOfQry_(),
            this.log("request pushed : ".concat(e.name)),
            t
          );
        }),
        (t.prototype.processExecutionOfQry_ = function () {
          !1 === this.isQueryExecuting &&
            this.reqQueue.length > 0 &&
            this.executeRequest_(this.reqQueue[0]);
        }),
        (t.prototype.notExistingTable_ = function (e) {
          var t = this,
            n = null;
          return (
            e.every(function (e) {
              return null != t.table(e) || ((n = e), !1);
            }),
            n
          );
        }),
        t
      );
    })(W),
    ot = function (e) {
      if (null == e) throw new Error("userDbSchema db is null");
      var t = { name: e.name, version: e.version, tables: [] };
      return (
        e.tables.forEach(function (e) {
          var n = { name: e.name, columns: {} };
          e.columns.forEach(function (e) {
            n.columns[e.name] = e;
          }),
            t.tables.push(n);
        }),
        t
      );
    },
    ut = (function () {
      function e(e) {
        (this.middlewares = []),
          (this.util = new Q()),
          (this.onQryFinished = F
            ? function (e) {
                self.postMessage(e);
              }
            : e);
      }
      return (
        Object.defineProperty(e.prototype, "db", {
          get: function () {
            return this.util.db;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "logger", {
          get: function () {
            return this.util.logger;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.executeMiddleware_ = function (e) {
          var t = this,
            n = $(this.middlewares) - 1;
          if (n < 0) return l();
          var r = {},
            o = this.db;
          return (
            Object.defineProperty(r, "database", {
              get: function () {
                return ot(o);
              },
            }),
            f(function (o) {
              var u = 0,
                i = function () {
                  if (u <= n) {
                    var a = Pe(t.middlewares[u++])(e, r);
                    (a && a.then) || (a = Promise.resolve(a)),
                      a.then(function (e) {
                        i();
                      });
                  } else o();
                };
              i();
            })
          );
        }),
        (e.prototype.executeQuery = function (e, t) {
          var n,
            r = e.query,
            u = this,
            i = u.util,
            a = function (e, t) {
              n = new e(r, i).execute(t);
            };
          switch (e.name) {
            case o.OpenDb:
              t(), (n = u.openDb(r));
              break;
            case o.InitDb:
              t(), (n = u.initDb(r));
              break;
            case o.CloseDb:
              t(), (n = u.closeDb());
              break;
            case o.Insert:
              a(J, t);
              break;
            case o.Select:
              a(Ne, t);
              break;
            case o.Count:
              a(Be, t);
              break;
            case o.Update:
              a(Ge, t);
              break;
            case o.Intersect:
              t(), a(Ue);
              break;
            case o.DropDb:
              t(), (n = u.dropDb());
              break;
            case o.Terminate:
              t(), (n = u.terminate());
              break;
            case o.Union:
              t(), a($e);
              break;
            case o.Remove:
              a(Ze, t);
              break;
            case o.Clear:
              a(tt, t);
              break;
            case o.Transaction:
              a(rt, t);
              break;
            case o.MapGet:
              t(), (n = A.get(r, i));
              break;
            case o.MapSet:
              t(), (n = A.set(r.key, r.value, i));
              break;
            case o.MapHas:
              t(), (n = A.has(r, i));
              break;
            case o.MapDelete:
              t(), (n = A.remove(r, i));
              break;
            case o.ImportScripts:
              t(), (n = u.importScripts_(e));
              break;
            case o.ChangeLogStatus:
              t(), (u.logger.status = r), (n = Promise.resolve());
              break;
            case o.Middleware:
              return t(), Pe(r) ? (u.middlewares.push(r), l()) : N(new R(O, r));
            default:
              n = l();
          }
          return (
            u.logger.log("Executing query ".concat(e.name, " in web worker")), n
          );
        }),
        (e.prototype.callMiddleware_ = function (e, t) {
          return f(function (n) {
            var r = 0,
              o = $(e) - 1,
              u = function () {
                if (r <= o) {
                  var i = e[r++](t);
                  i instanceof Promise || (i = l(i)),
                    i.then(function (e) {
                      (t = e), u();
                    });
                } else n(t);
              };
            u();
          });
        }),
        (e.prototype.run = function (e) {
          var t = this,
            n = [],
            r = [];
          (e.onResult = function (e) {
            n.push(function (t) {
              return e(t);
            });
          }),
            (e.beforeExecute = function (e) {
              r.push(function (t) {
                return e(t);
              });
            }),
            this.executeMiddleware_(e)
              .then(function (o) {
                return t
                  .executeQuery(e, function () {
                    return t.callMiddleware_(r);
                  })
                  .then(function (e) {
                    return t.callMiddleware_(n, e).then(function (e) {
                      t.returnResult_({ result: e });
                    });
                  });
              })
              .catch(function (e) {
                n = [];
                var r = { error: D(e) };
                t.returnResult_(r);
              });
        }),
        (e.prototype.importScripts_ = function (e) {
          return f(function (t, n) {
            try {
              importScripts.apply(void 0, e.query), t();
            } catch (e) {
              n(new R(S, e.message));
            }
          });
        }),
        (e.prototype.returnResult_ = function (e) {
          this.logger.log("Query finished inside web worker"),
            this.util && this.util.emptyTx(),
            this.onQryFinished(e);
        }),
        (e.prototype.dropDb = function () {
          var e = this.db.name;
          return this.terminate().then(function () {
            return new He().execute(e);
          });
        }),
        (e.prototype.closeDb = function () {
          return this.util.close();
        }),
        (e.prototype.terminate = function () {
          var e = this;
          return this.closeDb().then(function () {
            e.util.db = null;
          });
        }),
        (e.prototype.openDb = function (e) {
          var t = this;
          return this.closeDb().then(function (n) {
            return (
              t.db && e.name === t.db.name
                ? t.initDb()
                : t.initDb({ name: e.name, tables: [], version: e.version })
            ).then(function () {
              return t.db;
            });
          });
        }),
        (e.prototype.initDb = function (e) {
          var t = this;
          if (!U) return N(new R(x));
          var n = e ? new q(e) : this.db;
          if (null == n) throw new Error("dbMeta is null");
          return (
            (this.util = new Q()),
            this.util.initDb(n).then(function (e) {
              return A.get(A.dbSchema, t.util).then(function (r) {
                return e.isCreated
                  ? (r &&
                      r.tables.forEach(function (e) {
                        var t = n.tables.find(function (t) {
                          return t.name === e.name;
                        });
                        if (t)
                          for (var r in e.autoIncColumnValue) {
                            var o = e.autoIncColumnValue[r];
                            o && (t.autoIncColumnValue[r] = o);
                          }
                      }),
                    (t.util.db = n),
                    (e.database = ot(t.db)),
                    A.set(A.dbSchema, n, t.util).then(function () {
                      return e;
                    }))
                  : A.get(A.dbSchema, t.util).then(function (n) {
                      return (t.util.db = n), (e.database = ot(t.db)), e;
                    });
              });
            })
          );
        }),
        e
      );
    })();
  if (F) {
    var it = new ut();
    self.onmessage = function (e) {
      it.run(e.data);
    };
  }
  JsStoreWorker = t;
})();
//# sourceMappingURL=jsstore.worker.min.js.map
