var fs = require('fs');
var constants = require('constants');
var require$$0 = require('stream');
var util = require('util');
var assert = require('assert');
var path = require('path');
var chalk = require('kleur');
var child_process = require('child_process');
var spawn = require('cross-spawn');
var os = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var constants__default = /*#__PURE__*/_interopDefaultLegacy(constants);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var spawn__default = /*#__PURE__*/_interopDefaultLegacy(spawn);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var fromCallback = function (fn) {
  return Object.defineProperty(function (...args) {
    if (typeof args[args.length - 1] === 'function') fn.apply(this, args);else {
      return new Promise((resolve, reject) => {
        fn.call(this, ...args, (err, res) => err != null ? reject(err) : resolve(res));
      });
    }
  }, 'name', {
    value: fn.name
  });
};

var fromPromise = function (fn) {
  return Object.defineProperty(function (...args) {
    const cb = args[args.length - 1];
    if (typeof cb !== 'function') return fn.apply(this, args);else fn.apply(this, args.slice(0, -1)).then(r => cb(null, r), cb);
  }, 'name', {
    value: fn.name
  });
};

var universalify = {
  fromCallback: fromCallback,
  fromPromise: fromPromise
};

var origCwd = process.cwd;
var cwd = null;
var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;

process.cwd = function () {
  if (!cwd) cwd = origCwd.call(process);
  return cwd;
};

try {
  process.cwd();
} catch (er) {} // This check is needed until node.js 12 is required


if (typeof process.chdir === 'function') {
  var chdir = process.chdir;

  process.chdir = function (d) {
    cwd = null;
    chdir.call(process, d);
  };

  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
}

var polyfills = patch;

function patch(fs) {
  // (re-)implement some things that are known busted or missing.
  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants__default["default"].hasOwnProperty('O_SYMLINK') && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs);
  } // lutimes implementation, or no-op


  if (!fs.lutimes) {
    patchLutimes(fs);
  } // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.


  fs.chown = chownFix(fs.chown);
  fs.fchown = chownFix(fs.fchown);
  fs.lchown = chownFix(fs.lchown);
  fs.chmod = chmodFix(fs.chmod);
  fs.fchmod = chmodFix(fs.fchmod);
  fs.lchmod = chmodFix(fs.lchmod);
  fs.chownSync = chownFixSync(fs.chownSync);
  fs.fchownSync = chownFixSync(fs.fchownSync);
  fs.lchownSync = chownFixSync(fs.lchownSync);
  fs.chmodSync = chmodFixSync(fs.chmodSync);
  fs.fchmodSync = chmodFixSync(fs.fchmodSync);
  fs.lchmodSync = chmodFixSync(fs.lchmodSync);
  fs.stat = statFix(fs.stat);
  fs.fstat = statFix(fs.fstat);
  fs.lstat = statFix(fs.lstat);
  fs.statSync = statFixSync(fs.statSync);
  fs.fstatSync = statFixSync(fs.fstatSync);
  fs.lstatSync = statFixSync(fs.lstatSync); // if lchmod/lchown do not exist, then make them no-ops

  if (!fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb);
    };

    fs.lchmodSync = function () {};
  }

  if (!fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb);
    };

    fs.lchownSync = function () {};
  } // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.
  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.


  if (platform === "win32") {
    fs.rename = function (fs$rename) {
      return function (from, to, cb) {
        var start = Date.now();
        var backoff = 0;
        fs$rename(from, to, function CB(er) {
          if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 60000) {
            setTimeout(function () {
              fs.stat(to, function (stater, st) {
                if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);else cb(er);
              });
            }, backoff);
            if (backoff < 100) backoff += 10;
            return;
          }

          if (cb) cb(er);
        });
      };
    }(fs.rename);
  } // if read() returns EAGAIN, then just try it again.


  fs.read = function (fs$read) {
    function read(fd, buffer, offset, length, position, callback_) {
      var callback;

      if (callback_ && typeof callback_ === 'function') {
        var eagCounter = 0;

        callback = function (er, _, __) {
          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter++;
            return fs$read.call(fs, fd, buffer, offset, length, position, callback);
          }

          callback_.apply(this, arguments);
        };
      }

      return fs$read.call(fs, fd, buffer, offset, length, position, callback);
    } // This ensures `util.promisify` works as it does for native `fs.read`.


    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
    return read;
  }(fs.read);

  fs.readSync = function (fs$readSync) {
    return function (fd, buffer, offset, length, position) {
      var eagCounter = 0;

      while (true) {
        try {
          return fs$readSync.call(fs, fd, buffer, offset, length, position);
        } catch (er) {
          if (er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter++;
            continue;
          }

          throw er;
        }
      }
    };
  }(fs.readSync);

  function patchLchmod(fs) {
    fs.lchmod = function (path, mode, callback) {
      fs.open(path, constants__default["default"].O_WRONLY | constants__default["default"].O_SYMLINK, mode, function (err, fd) {
        if (err) {
          if (callback) callback(err);
          return;
        } // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.


        fs.fchmod(fd, mode, function (err) {
          fs.close(fd, function (err2) {
            if (callback) callback(err || err2);
          });
        });
      });
    };

    fs.lchmodSync = function (path, mode) {
      var fd = fs.openSync(path, constants__default["default"].O_WRONLY | constants__default["default"].O_SYMLINK, mode); // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.

      var threw = true;
      var ret;

      try {
        ret = fs.fchmodSync(fd, mode);
        threw = false;
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd);
          } catch (er) {}
        } else {
          fs.closeSync(fd);
        }
      }

      return ret;
    };
  }

  function patchLutimes(fs) {
    if (constants__default["default"].hasOwnProperty("O_SYMLINK")) {
      fs.lutimes = function (path, at, mt, cb) {
        fs.open(path, constants__default["default"].O_SYMLINK, function (er, fd) {
          if (er) {
            if (cb) cb(er);
            return;
          }

          fs.futimes(fd, at, mt, function (er) {
            fs.close(fd, function (er2) {
              if (cb) cb(er || er2);
            });
          });
        });
      };

      fs.lutimesSync = function (path, at, mt) {
        var fd = fs.openSync(path, constants__default["default"].O_SYMLINK);
        var ret;
        var threw = true;

        try {
          ret = fs.futimesSync(fd, at, mt);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd);
            } catch (er) {}
          } else {
            fs.closeSync(fd);
          }
        }

        return ret;
      };
    } else {
      fs.lutimes = function (_a, _b, _c, cb) {
        if (cb) process.nextTick(cb);
      };

      fs.lutimesSync = function () {};
    }
  }

  function chmodFix(orig) {
    if (!orig) return orig;
    return function (target, mode, cb) {
      return orig.call(fs, target, mode, function (er) {
        if (chownErOk(er)) er = null;
        if (cb) cb.apply(this, arguments);
      });
    };
  }

  function chmodFixSync(orig) {
    if (!orig) return orig;
    return function (target, mode) {
      try {
        return orig.call(fs, target, mode);
      } catch (er) {
        if (!chownErOk(er)) throw er;
      }
    };
  }

  function chownFix(orig) {
    if (!orig) return orig;
    return function (target, uid, gid, cb) {
      return orig.call(fs, target, uid, gid, function (er) {
        if (chownErOk(er)) er = null;
        if (cb) cb.apply(this, arguments);
      });
    };
  }

  function chownFixSync(orig) {
    if (!orig) return orig;
    return function (target, uid, gid) {
      try {
        return orig.call(fs, target, uid, gid);
      } catch (er) {
        if (!chownErOk(er)) throw er;
      }
    };
  }

  function statFix(orig) {
    if (!orig) return orig; // Older versions of Node erroneously returned signed integers for
    // uid + gid.

    return function (target, options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = null;
      }

      function callback(er, stats) {
        if (stats) {
          if (stats.uid < 0) stats.uid += 0x100000000;
          if (stats.gid < 0) stats.gid += 0x100000000;
        }

        if (cb) cb.apply(this, arguments);
      }

      return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
    };
  }

  function statFixSync(orig) {
    if (!orig) return orig; // Older versions of Node erroneously returned signed integers for
    // uid + gid.

    return function (target, options) {
      var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
      if (stats.uid < 0) stats.uid += 0x100000000;
      if (stats.gid < 0) stats.gid += 0x100000000;
      return stats;
    };
  } // ENOSYS means that the fs doesn't support the op. Just ignore
  // that, because it doesn't matter.
  //
  // if there's no getuid, or if getuid() is something other
  // than 0, and the error is EINVAL or EPERM, then just ignore
  // it.
  //
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  //
  // When running as root, or if other types of errors are
  // encountered, then it's strict.


  function chownErOk(er) {
    if (!er) return true;
    if (er.code === "ENOSYS") return true;
    var nonroot = !process.getuid || process.getuid() !== 0;

    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM") return true;
    }

    return false;
  }
}

var Stream = require$$0__default["default"].Stream;
var legacyStreams = legacy;

function legacy(fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  };

  function ReadStream(path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);
    Stream.call(this);
    var self = this;
    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;
    this.flags = 'r';
    this.mode = 438;
    /*=0666*/

    this.bufferSize = 64 * 1024;
    options = options || {}; // Mixin options into this

    var keys = Object.keys(options);

    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }

      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function () {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);

      self._read();
    });
  }

  function WriteStream(path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);
    Stream.call(this);
    this.path = path;
    this.fd = null;
    this.writable = true;
    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438;
    /*=0666*/

    this.bytesWritten = 0;
    options = options || {}; // Mixin options into this

    var keys = Object.keys(options);

    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }

      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;

      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);

      this.flush();
    }
  }
}

var clone_1 = clone;

var getPrototypeOf = Object.getPrototypeOf || function (obj) {
  return obj.__proto__;
};

function clone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Object) var copy = {
    __proto__: getPrototypeOf(obj)
  };else var copy = Object.create(null);
  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
  });
  return copy;
}

var gracefulFs = createCommonjsModule(function (module) {
  /* istanbul ignore next - node 0.x polyfill */
  var gracefulQueue;
  var previousSymbol;
  /* istanbul ignore else - node 0.x polyfill */

  if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
    gracefulQueue = Symbol.for('graceful-fs.queue'); // This is used in testing by future versions

    previousSymbol = Symbol.for('graceful-fs.previous');
  } else {
    gracefulQueue = '___graceful-fs.queue';
    previousSymbol = '___graceful-fs.previous';
  }

  function noop() {}

  function publishQueue(context, queue) {
    Object.defineProperty(context, gracefulQueue, {
      get: function () {
        return queue;
      }
    });
  }

  var debug = noop;
  if (util__default["default"].debuglog) debug = util__default["default"].debuglog('gfs4');else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) debug = function () {
    var m = util__default["default"].format.apply(util__default["default"], arguments);
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
    console.error(m);
  }; // Once time initialization

  if (!fs__default["default"][gracefulQueue]) {
    // This queue can be shared by multiple loaded instances
    var queue = commonjsGlobal[gracefulQueue] || [];
    publishQueue(fs__default["default"], queue); // Patch fs.close/closeSync to shared queue version, because we need
    // to retry() whenever a close happens *anywhere* in the program.
    // This is essential when multiple graceful-fs instances are
    // in play at the same time.

    fs__default["default"].close = function (fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs__default["default"], fd, function (err) {
          // This function uses the graceful-fs shared queue
          if (!err) {
            resetQueue();
          }

          if (typeof cb === 'function') cb.apply(this, arguments);
        });
      }

      Object.defineProperty(close, previousSymbol, {
        value: fs$close
      });
      return close;
    }(fs__default["default"].close);

    fs__default["default"].closeSync = function (fs$closeSync) {
      function closeSync(fd) {
        // This function uses the graceful-fs shared queue
        fs$closeSync.apply(fs__default["default"], arguments);
        resetQueue();
      }

      Object.defineProperty(closeSync, previousSymbol, {
        value: fs$closeSync
      });
      return closeSync;
    }(fs__default["default"].closeSync);

    if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
      process.on('exit', function () {
        debug(fs__default["default"][gracefulQueue]);
        assert__default["default"].equal(fs__default["default"][gracefulQueue].length, 0);
      });
    }
  }

  if (!commonjsGlobal[gracefulQueue]) {
    publishQueue(commonjsGlobal, fs__default["default"][gracefulQueue]);
  }

  module.exports = patch(clone_1(fs__default["default"]));

  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs__default["default"].__patched) {
    module.exports = patch(fs__default["default"]);
    fs__default["default"].__patched = true;
  }

  function patch(fs) {
    // Everything that references the open() function needs to be in here
    polyfills(fs);
    fs.gracefulify = patch;
    fs.createReadStream = createReadStream;
    fs.createWriteStream = createWriteStream;
    var fs$readFile = fs.readFile;
    fs.readFile = readFile;

    function readFile(path, options, cb) {
      if (typeof options === 'function') cb = options, options = null;
      return go$readFile(path, options, cb);

      function go$readFile(path, options, cb, startTime) {
        return fs$readFile(path, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }

    var fs$writeFile = fs.writeFile;
    fs.writeFile = writeFile;

    function writeFile(path, data, options, cb) {
      if (typeof options === 'function') cb = options, options = null;
      return go$writeFile(path, data, options, cb);

      function go$writeFile(path, data, options, cb, startTime) {
        return fs$writeFile(path, data, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }

    var fs$appendFile = fs.appendFile;
    if (fs$appendFile) fs.appendFile = appendFile;

    function appendFile(path, data, options, cb) {
      if (typeof options === 'function') cb = options, options = null;
      return go$appendFile(path, data, options, cb);

      function go$appendFile(path, data, options, cb, startTime) {
        return fs$appendFile(path, data, options, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }

    var fs$copyFile = fs.copyFile;
    if (fs$copyFile) fs.copyFile = copyFile;

    function copyFile(src, dest, flags, cb) {
      if (typeof flags === 'function') {
        cb = flags;
        flags = 0;
      }

      return go$copyFile(src, dest, flags, cb);

      function go$copyFile(src, dest, flags, cb, startTime) {
        return fs$copyFile(src, dest, flags, function (err) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }

    var fs$readdir = fs.readdir;
    fs.readdir = readdir;

    function readdir(path, options, cb) {
      if (typeof options === 'function') cb = options, options = null;
      return go$readdir(path, options, cb);

      function go$readdir(path, options, cb, startTime) {
        return fs$readdir(path, options, function (err, files) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$readdir, [path, options, cb], err, startTime || Date.now(), Date.now()]);else {
            if (files && files.sort) files.sort();
            if (typeof cb === 'function') cb.call(this, err, files);
          }
        });
      }
    }

    if (process.version.substr(0, 4) === 'v0.8') {
      var legStreams = legacyStreams(fs);
      ReadStream = legStreams.ReadStream;
      WriteStream = legStreams.WriteStream;
    }

    var fs$ReadStream = fs.ReadStream;

    if (fs$ReadStream) {
      ReadStream.prototype = Object.create(fs$ReadStream.prototype);
      ReadStream.prototype.open = ReadStream$open;
    }

    var fs$WriteStream = fs.WriteStream;

    if (fs$WriteStream) {
      WriteStream.prototype = Object.create(fs$WriteStream.prototype);
      WriteStream.prototype.open = WriteStream$open;
    }

    Object.defineProperty(fs, 'ReadStream', {
      get: function () {
        return ReadStream;
      },
      set: function (val) {
        ReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(fs, 'WriteStream', {
      get: function () {
        return WriteStream;
      },
      set: function (val) {
        WriteStream = val;
      },
      enumerable: true,
      configurable: true
    }); // legacy names

    var FileReadStream = ReadStream;
    Object.defineProperty(fs, 'FileReadStream', {
      get: function () {
        return FileReadStream;
      },
      set: function (val) {
        FileReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileWriteStream = WriteStream;
    Object.defineProperty(fs, 'FileWriteStream', {
      get: function () {
        return FileWriteStream;
      },
      set: function (val) {
        FileWriteStream = val;
      },
      enumerable: true,
      configurable: true
    });

    function ReadStream(path, options) {
      if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }

    function ReadStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function (err, fd) {
        if (err) {
          if (that.autoClose) that.destroy();
          that.emit('error', err);
        } else {
          that.fd = fd;
          that.emit('open', fd);
          that.read();
        }
      });
    }

    function WriteStream(path, options) {
      if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
    }

    function WriteStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function (err, fd) {
        if (err) {
          that.destroy();
          that.emit('error', err);
        } else {
          that.fd = fd;
          that.emit('open', fd);
        }
      });
    }

    function createReadStream(path, options) {
      return new fs.ReadStream(path, options);
    }

    function createWriteStream(path, options) {
      return new fs.WriteStream(path, options);
    }

    var fs$open = fs.open;
    fs.open = open;

    function open(path, flags, mode, cb) {
      if (typeof mode === 'function') cb = mode, mode = null;
      return go$open(path, flags, mode, cb);

      function go$open(path, flags, mode, cb, startTime) {
        return fs$open(path, flags, mode, function (err, fd) {
          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()]);else {
            if (typeof cb === 'function') cb.apply(this, arguments);
          }
        });
      }
    }

    return fs;
  }

  function enqueue(elem) {
    debug('ENQUEUE', elem[0].name, elem[1]);
    fs__default["default"][gracefulQueue].push(elem);
    retry();
  } // keep track of the timeout between retry() calls


  var retryTimer; // reset the startTime and lastTime to now
  // this resets the start of the 60 second overall timeout as well as the
  // delay between attempts so that we'll retry these jobs sooner

  function resetQueue() {
    var now = Date.now();

    for (var i = 0; i < fs__default["default"][gracefulQueue].length; ++i) {
      // entries that are only a length of 2 are from an older version, don't
      // bother modifying those since they'll be retried anyway.
      if (fs__default["default"][gracefulQueue][i].length > 2) {
        fs__default["default"][gracefulQueue][i][3] = now; // startTime

        fs__default["default"][gracefulQueue][i][4] = now; // lastTime
      }
    } // call retry to make sure we're actively processing the queue


    retry();
  }

  function retry() {
    // clear the timer and remove it to help prevent unintended concurrency
    clearTimeout(retryTimer);
    retryTimer = undefined;
    if (fs__default["default"][gracefulQueue].length === 0) return;
    var elem = fs__default["default"][gracefulQueue].shift();
    var fn = elem[0];
    var args = elem[1]; // these items may be unset if they were added by an older graceful-fs

    var err = elem[2];
    var startTime = elem[3];
    var lastTime = elem[4]; // if we don't have a startTime we have no way of knowing if we've waited
    // long enough, so go ahead and retry this item now

    if (startTime === undefined) {
      debug('RETRY', fn.name, args);
      fn.apply(null, args);
    } else if (Date.now() - startTime >= 60000) {
      // it's been more than 60 seconds total, bail now
      debug('TIMEOUT', fn.name, args);
      var cb = args.pop();
      if (typeof cb === 'function') cb.call(null, err);
    } else {
      // the amount of time between the last attempt and right now
      var sinceAttempt = Date.now() - lastTime; // the amount of time between when we first tried, and when we last tried
      // rounded up to at least 1

      var sinceStart = Math.max(lastTime - startTime, 1); // backoff. wait longer than the total time we've been retrying, but only
      // up to a maximum of 100ms

      var desiredDelay = Math.min(sinceStart * 1.2, 100); // it's been long enough since the last retry, do it again

      if (sinceAttempt >= desiredDelay) {
        debug('RETRY', fn.name, args);
        fn.apply(null, args.concat([startTime]));
      } else {
        // if we can't do this job yet, push it to the end of the queue
        // and let the next iteration check again
        fs__default["default"][gracefulQueue].push(elem);
      }
    } // schedule our next run if one isn't already scheduled


    if (retryTimer === undefined) {
      retryTimer = setTimeout(retry, 0);
    }
  }
});

var fs_1 = createCommonjsModule(function (module, exports) {
  // Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors

  const u = universalify.fromCallback;
  const api = ['access', 'appendFile', 'chmod', 'chown', 'close', 'copyFile', 'fchmod', 'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod', 'lchown', 'link', 'lstat', 'mkdir', 'mkdtemp', 'open', 'opendir', 'readdir', 'readFile', 'readlink', 'realpath', 'rename', 'rm', 'rmdir', 'stat', 'symlink', 'truncate', 'unlink', 'utimes', 'writeFile'].filter(key => {
    // Some commands are not available on some systems. Ex:
    // fs.opendir was added in Node.js v12.12.0
    // fs.rm was added in Node.js v14.14.0
    // fs.lchown is not available on at least some Linux
    return typeof gracefulFs[key] === 'function';
  }); // Export all keys:

  Object.keys(gracefulFs).forEach(key => {
    if (key === 'promises') {
      // fs.promises is a getter property that triggers ExperimentalWarning
      // Don't re-export it here, the getter is defined in "lib/index.js"
      return;
    }

    exports[key] = gracefulFs[key];
  }); // Universalify async methods:

  api.forEach(method => {
    exports[method] = u(gracefulFs[method]);
  }); // We differ from mz/fs in that we still ship the old, broken, fs.exists()
  // since we are a drop-in replacement for the native module

  exports.exists = function (filename, callback) {
    if (typeof callback === 'function') {
      return gracefulFs.exists(filename, callback);
    }

    return new Promise(resolve => {
      return gracefulFs.exists(filename, resolve);
    });
  }; // fs.read(), fs.write(), & fs.writev() need special treatment due to multiple callback args


  exports.read = function (fd, buffer, offset, length, position, callback) {
    if (typeof callback === 'function') {
      return gracefulFs.read(fd, buffer, offset, length, position, callback);
    }

    return new Promise((resolve, reject) => {
      gracefulFs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
        if (err) return reject(err);
        resolve({
          bytesRead,
          buffer
        });
      });
    });
  }; // Function signature can be
  // fs.write(fd, buffer[, offset[, length[, position]]], callback)
  // OR
  // fs.write(fd, string[, position[, encoding]], callback)
  // We need to handle both cases, so we use ...args


  exports.write = function (fd, buffer, ...args) {
    if (typeof args[args.length - 1] === 'function') {
      return gracefulFs.write(fd, buffer, ...args);
    }

    return new Promise((resolve, reject) => {
      gracefulFs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
        if (err) return reject(err);
        resolve({
          bytesWritten,
          buffer
        });
      });
    });
  }; // fs.writev only available in Node v12.9.0+


  if (typeof gracefulFs.writev === 'function') {
    // Function signature is
    // s.writev(fd, buffers[, position], callback)
    // We need to handle the optional arg, so we use ...args
    exports.writev = function (fd, buffers, ...args) {
      if (typeof args[args.length - 1] === 'function') {
        return gracefulFs.writev(fd, buffers, ...args);
      }

      return new Promise((resolve, reject) => {
        gracefulFs.writev(fd, buffers, ...args, (err, bytesWritten, buffers) => {
          if (err) return reject(err);
          resolve({
            bytesWritten,
            buffers
          });
        });
      });
    };
  } // fs.realpath.native only available in Node v9.2+


  if (typeof gracefulFs.realpath.native === 'function') {
    exports.realpath.native = u(gracefulFs.realpath.native);
  }
});

var atLeastNode = r => {
  const n = process.versions.node.split('.').map(x => parseInt(x, 10));
  r = r.split('.').map(x => parseInt(x, 10));
  return n[0] > r[0] || n[0] === r[0] && (n[1] > r[1] || n[1] === r[1] && n[2] >= r[2]);
};

const useNativeRecursiveOption = atLeastNode('10.12.0'); // https://github.com/nodejs/node/issues/8987
// https://github.com/libuv/libuv/pull/1088

const checkPath = pth => {
  if (process.platform === 'win32') {
    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path__default["default"].parse(pth).root, ''));

    if (pathHasInvalidWinCharacters) {
      const error = new Error(`Path contains invalid characters: ${pth}`);
      error.code = 'EINVAL';
      throw error;
    }
  }
};

const processOptions = options => {
  const defaults = {
    mode: 0o777
  };
  if (typeof options === 'number') options = {
    mode: options
  };
  return _extends({}, defaults, options);
};

const permissionError = pth => {
  // This replicates the exception of `fs.mkdir` with native the
  // `recusive` option when run on an invalid drive under Windows.
  const error = new Error(`operation not permitted, mkdir '${pth}'`);
  error.code = 'EPERM';
  error.errno = -4048;
  error.path = pth;
  error.syscall = 'mkdir';
  return error;
};

var makeDir_1 = async (input, options) => {
  checkPath(input);
  options = processOptions(options);

  if (useNativeRecursiveOption) {
    const pth = path__default["default"].resolve(input);
    return fs_1.mkdir(pth, {
      mode: options.mode,
      recursive: true
    });
  }

  const make = async pth => {
    try {
      await fs_1.mkdir(pth, options.mode);
    } catch (error) {
      if (error.code === 'EPERM') {
        throw error;
      }

      if (error.code === 'ENOENT') {
        if (path__default["default"].dirname(pth) === pth) {
          throw permissionError(pth);
        }

        if (error.message.includes('null bytes')) {
          throw error;
        }

        await make(path__default["default"].dirname(pth));
        return make(pth);
      }

      try {
        const stats = await fs_1.stat(pth);

        if (!stats.isDirectory()) {
          // This error is never exposed to the user
          // it is caught below, and the original error is thrown
          throw new Error('The path is not a directory');
        }
      } catch (_unused) {
        throw error;
      }
    }
  };

  return make(path__default["default"].resolve(input));
};

var makeDirSync$1 = (input, options) => {
  checkPath(input);
  options = processOptions(options);

  if (useNativeRecursiveOption) {
    const pth = path__default["default"].resolve(input);
    return fs_1.mkdirSync(pth, {
      mode: options.mode,
      recursive: true
    });
  }

  const make = pth => {
    try {
      fs_1.mkdirSync(pth, options.mode);
    } catch (error) {
      if (error.code === 'EPERM') {
        throw error;
      }

      if (error.code === 'ENOENT') {
        if (path__default["default"].dirname(pth) === pth) {
          throw permissionError(pth);
        }

        if (error.message.includes('null bytes')) {
          throw error;
        }

        make(path__default["default"].dirname(pth));
        return make(pth);
      }

      try {
        if (!fs_1.statSync(pth).isDirectory()) {
          // This error is never exposed to the user
          // it is caught below, and the original error is thrown
          throw new Error('The path is not a directory');
        }
      } catch (_unused2) {
        throw error;
      }
    }
  };

  return make(path__default["default"].resolve(input));
};

var makeDir$1 = {
  makeDir: makeDir_1,
  makeDirSync: makeDirSync$1
};

const u$a = universalify.fromPromise;
const {
  makeDir: _makeDir,
  makeDirSync
} = makeDir$1;
const makeDir = u$a(_makeDir);
var mkdirs$2 = {
  mkdirs: makeDir,
  mkdirsSync: makeDirSync,
  // alias
  mkdirp: makeDir,
  mkdirpSync: makeDirSync,
  ensureDir: makeDir,
  ensureDirSync: makeDirSync
};

function utimesMillis$1(path, atime, mtime, callback) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  gracefulFs.open(path, 'r+', (err, fd) => {
    if (err) return callback(err);
    gracefulFs.futimes(fd, atime, mtime, futimesErr => {
      gracefulFs.close(fd, closeErr => {
        if (callback) callback(futimesErr || closeErr);
      });
    });
  });
}

function utimesMillisSync$1(path, atime, mtime) {
  const fd = gracefulFs.openSync(path, 'r+');
  gracefulFs.futimesSync(fd, atime, mtime);
  return gracefulFs.closeSync(fd);
}

var utimes = {
  utimesMillis: utimesMillis$1,
  utimesMillisSync: utimesMillisSync$1
};

const nodeSupportsBigInt = atLeastNode('10.5.0');

const stat = file => nodeSupportsBigInt ? fs_1.stat(file, {
  bigint: true
}) : fs_1.stat(file);

const statSync = file => nodeSupportsBigInt ? fs_1.statSync(file, {
  bigint: true
}) : fs_1.statSync(file);

function getStats$2(src, dest) {
  return Promise.all([stat(src), stat(dest).catch(err => {
    if (err.code === 'ENOENT') return null;
    throw err;
  })]).then(([srcStat, destStat]) => ({
    srcStat,
    destStat
  }));
}

function getStatsSync(src, dest) {
  let destStat;
  const srcStat = statSync(src);

  try {
    destStat = statSync(dest);
  } catch (err) {
    if (err.code === 'ENOENT') return {
      srcStat,
      destStat: null
    };
    throw err;
  }

  return {
    srcStat,
    destStat
  };
}

function checkPaths(src, dest, funcName, cb) {
  util__default["default"].callbackify(getStats$2)(src, dest, (err, stats) => {
    if (err) return cb(err);
    const {
      srcStat,
      destStat
    } = stats;

    if (destStat && areIdentical(srcStat, destStat)) {
      return cb(new Error('Source and destination must not be the same.'));
    }

    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      return cb(new Error(errMsg(src, dest, funcName)));
    }

    return cb(null, {
      srcStat,
      destStat
    });
  });
}

function checkPathsSync(src, dest, funcName) {
  const {
    srcStat,
    destStat
  } = getStatsSync(src, dest);

  if (destStat && areIdentical(srcStat, destStat)) {
    throw new Error('Source and destination must not be the same.');
  }

  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName));
  }

  return {
    srcStat,
    destStat
  };
} // recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.


function checkParentPaths(src, srcStat, dest, funcName, cb) {
  const srcParent = path__default["default"].resolve(path__default["default"].dirname(src));
  const destParent = path__default["default"].resolve(path__default["default"].dirname(dest));
  if (destParent === srcParent || destParent === path__default["default"].parse(destParent).root) return cb();

  const callback = (err, destStat) => {
    if (err) {
      if (err.code === 'ENOENT') return cb();
      return cb(err);
    }

    if (areIdentical(srcStat, destStat)) {
      return cb(new Error(errMsg(src, dest, funcName)));
    }

    return checkParentPaths(src, srcStat, destParent, funcName, cb);
  };

  if (nodeSupportsBigInt) fs_1.stat(destParent, {
    bigint: true
  }, callback);else fs_1.stat(destParent, callback);
}

function checkParentPathsSync(src, srcStat, dest, funcName) {
  const srcParent = path__default["default"].resolve(path__default["default"].dirname(src));
  const destParent = path__default["default"].resolve(path__default["default"].dirname(dest));
  if (destParent === srcParent || destParent === path__default["default"].parse(destParent).root) return;
  let destStat;

  try {
    destStat = statSync(destParent);
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }

  if (areIdentical(srcStat, destStat)) {
    throw new Error(errMsg(src, dest, funcName));
  }

  return checkParentPathsSync(src, srcStat, destParent, funcName);
}

function areIdentical(srcStat, destStat) {
  if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    if (nodeSupportsBigInt || destStat.ino < Number.MAX_SAFE_INTEGER) {
      // definitive answer
      return true;
    } // Use additional heuristics if we can't use 'bigint'.
    // Different 'ino' could be represented the same if they are >= Number.MAX_SAFE_INTEGER
    // See issue 657


    if (destStat.size === srcStat.size && destStat.mode === srcStat.mode && destStat.nlink === srcStat.nlink && destStat.atimeMs === srcStat.atimeMs && destStat.mtimeMs === srcStat.mtimeMs && destStat.ctimeMs === srcStat.ctimeMs && destStat.birthtimeMs === srcStat.birthtimeMs) {
      // heuristic answer
      return true;
    }
  }

  return false;
} // return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.


function isSrcSubdir(src, dest) {
  const srcArr = path__default["default"].resolve(src).split(path__default["default"].sep).filter(i => i);
  const destArr = path__default["default"].resolve(dest).split(path__default["default"].sep).filter(i => i);
  return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
}

function errMsg(src, dest, funcName) {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
}

var stat_1 = {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir
};

const mkdirsSync$1 = mkdirs$2.mkdirsSync;
const utimesMillisSync = utimes.utimesMillisSync;

function copySync$2(src, dest, opts) {
  if (typeof opts === 'function') {
    opts = {
      filter: opts
    };
  }

  opts = opts || {};
  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now

  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber
  // Warn about using preserveTimestamps on 32-bit node

  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`);
  }

  const {
    srcStat,
    destStat
  } = stat_1.checkPathsSync(src, dest, 'copy');
  stat_1.checkParentPathsSync(src, srcStat, dest, 'copy');
  return handleFilterAndCopy(destStat, src, dest, opts);
}

function handleFilterAndCopy(destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return;
  const destParent = path__default["default"].dirname(dest);
  if (!gracefulFs.existsSync(destParent)) mkdirsSync$1(destParent);
  return startCopy$1(destStat, src, dest, opts);
}

function startCopy$1(destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return;
  return getStats$1(destStat, src, dest, opts);
}

function getStats$1(destStat, src, dest, opts) {
  const statSync = opts.dereference ? gracefulFs.statSync : gracefulFs.lstatSync;
  const srcStat = statSync(src);
  if (srcStat.isDirectory()) return onDir$1(srcStat, destStat, src, dest, opts);else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile$1(srcStat, destStat, src, dest, opts);else if (srcStat.isSymbolicLink()) return onLink$1(destStat, src, dest, opts);
}

function onFile$1(srcStat, destStat, src, dest, opts) {
  if (!destStat) return copyFile$1(srcStat, src, dest, opts);
  return mayCopyFile$1(srcStat, src, dest, opts);
}

function mayCopyFile$1(srcStat, src, dest, opts) {
  if (opts.overwrite) {
    gracefulFs.unlinkSync(dest);
    return copyFile$1(srcStat, src, dest, opts);
  } else if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`);
  }
}

function copyFile$1(srcStat, src, dest, opts) {
  gracefulFs.copyFileSync(src, dest);
  if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
  return setDestMode$1(dest, srcStat.mode);
}

function handleTimestamps(srcMode, src, dest) {
  // Make sure the file is writable before setting the timestamp
  // otherwise open fails with EPERM when invoked with 'r+'
  // (through utimes call)
  if (fileIsNotWritable$1(srcMode)) makeFileWritable$1(dest, srcMode);
  return setDestTimestamps$1(src, dest);
}

function fileIsNotWritable$1(srcMode) {
  return (srcMode & 0o200) === 0;
}

function makeFileWritable$1(dest, srcMode) {
  return setDestMode$1(dest, srcMode | 0o200);
}

function setDestMode$1(dest, srcMode) {
  return gracefulFs.chmodSync(dest, srcMode);
}

function setDestTimestamps$1(src, dest) {
  // The initial srcStat.atime cannot be trusted
  // because it is modified by the read(2) system call
  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
  const updatedSrcStat = gracefulFs.statSync(src);
  return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
}

function onDir$1(srcStat, destStat, src, dest, opts) {
  if (!destStat) return mkDirAndCopy$1(srcStat.mode, src, dest, opts);

  if (destStat && !destStat.isDirectory()) {
    throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
  }

  return copyDir$1(src, dest, opts);
}

function mkDirAndCopy$1(srcMode, src, dest, opts) {
  gracefulFs.mkdirSync(dest);
  copyDir$1(src, dest, opts);
  return setDestMode$1(dest, srcMode);
}

function copyDir$1(src, dest, opts) {
  gracefulFs.readdirSync(src).forEach(item => copyDirItem$1(item, src, dest, opts));
}

function copyDirItem$1(item, src, dest, opts) {
  const srcItem = path__default["default"].join(src, item);
  const destItem = path__default["default"].join(dest, item);
  const {
    destStat
  } = stat_1.checkPathsSync(srcItem, destItem, 'copy');
  return startCopy$1(destStat, srcItem, destItem, opts);
}

function onLink$1(destStat, src, dest, opts) {
  let resolvedSrc = gracefulFs.readlinkSync(src);

  if (opts.dereference) {
    resolvedSrc = path__default["default"].resolve(process.cwd(), resolvedSrc);
  }

  if (!destStat) {
    return gracefulFs.symlinkSync(resolvedSrc, dest);
  } else {
    let resolvedDest;

    try {
      resolvedDest = gracefulFs.readlinkSync(dest);
    } catch (err) {
      // dest exists and is a regular file or directory,
      // Windows may throw UNKNOWN error. If dest already exists,
      // fs throws error anyway, so no need to guard against it here.
      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return gracefulFs.symlinkSync(resolvedSrc, dest);
      throw err;
    }

    if (opts.dereference) {
      resolvedDest = path__default["default"].resolve(process.cwd(), resolvedDest);
    }

    if (stat_1.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
    } // prevent copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.


    if (gracefulFs.statSync(dest).isDirectory() && stat_1.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
    }

    return copyLink$1(resolvedSrc, dest);
  }
}

function copyLink$1(resolvedSrc, dest) {
  gracefulFs.unlinkSync(dest);
  return gracefulFs.symlinkSync(resolvedSrc, dest);
}

var copySync_1 = copySync$2;

var copySync$1 = {
  copySync: copySync_1
};

const u$9 = universalify.fromPromise;

function pathExists$6(path) {
  return fs_1.access(path).then(() => true).catch(() => false);
}

var pathExists_1 = {
  pathExists: u$9(pathExists$6),
  pathExistsSync: fs_1.existsSync
};

const mkdirs$1 = mkdirs$2.mkdirs;
const pathExists$5 = pathExists_1.pathExists;
const utimesMillis = utimes.utimesMillis;

function copy$2(src, dest, opts, cb) {
  if (typeof opts === 'function' && !cb) {
    cb = opts;
    opts = {};
  } else if (typeof opts === 'function') {
    opts = {
      filter: opts
    };
  }

  cb = cb || function () {};

  opts = opts || {};
  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now

  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber
  // Warn about using preserveTimestamps on 32-bit node

  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`);
  }

  stat_1.checkPaths(src, dest, 'copy', (err, stats) => {
    if (err) return cb(err);
    const {
      srcStat,
      destStat
    } = stats;
    stat_1.checkParentPaths(src, srcStat, dest, 'copy', err => {
      if (err) return cb(err);
      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
      return checkParentDir(destStat, src, dest, opts, cb);
    });
  });
}

function checkParentDir(destStat, src, dest, opts, cb) {
  const destParent = path__default["default"].dirname(dest);
  pathExists$5(destParent, (err, dirExists) => {
    if (err) return cb(err);
    if (dirExists) return startCopy(destStat, src, dest, opts, cb);
    mkdirs$1(destParent, err => {
      if (err) return cb(err);
      return startCopy(destStat, src, dest, opts, cb);
    });
  });
}

function handleFilter(onInclude, destStat, src, dest, opts, cb) {
  Promise.resolve(opts.filter(src, dest)).then(include => {
    if (include) return onInclude(destStat, src, dest, opts, cb);
    return cb();
  }, error => cb(error));
}

function startCopy(destStat, src, dest, opts, cb) {
  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb);
  return getStats(destStat, src, dest, opts, cb);
}

function getStats(destStat, src, dest, opts, cb) {
  const stat = opts.dereference ? gracefulFs.stat : gracefulFs.lstat;
  stat(src, (err, srcStat) => {
    if (err) return cb(err);
    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb);else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb);else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb);
  });
}

function onFile(srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return copyFile(srcStat, src, dest, opts, cb);
  return mayCopyFile(srcStat, src, dest, opts, cb);
}

function mayCopyFile(srcStat, src, dest, opts, cb) {
  if (opts.overwrite) {
    gracefulFs.unlink(dest, err => {
      if (err) return cb(err);
      return copyFile(srcStat, src, dest, opts, cb);
    });
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`));
  } else return cb();
}

function copyFile(srcStat, src, dest, opts, cb) {
  gracefulFs.copyFile(src, dest, err => {
    if (err) return cb(err);
    if (opts.preserveTimestamps) return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
    return setDestMode(dest, srcStat.mode, cb);
  });
}

function handleTimestampsAndMode(srcMode, src, dest, cb) {
  // Make sure the file is writable before setting the timestamp
  // otherwise open fails with EPERM when invoked with 'r+'
  // (through utimes call)
  if (fileIsNotWritable(srcMode)) {
    return makeFileWritable(dest, srcMode, err => {
      if (err) return cb(err);
      return setDestTimestampsAndMode(srcMode, src, dest, cb);
    });
  }

  return setDestTimestampsAndMode(srcMode, src, dest, cb);
}

function fileIsNotWritable(srcMode) {
  return (srcMode & 0o200) === 0;
}

function makeFileWritable(dest, srcMode, cb) {
  return setDestMode(dest, srcMode | 0o200, cb);
}

function setDestTimestampsAndMode(srcMode, src, dest, cb) {
  setDestTimestamps(src, dest, err => {
    if (err) return cb(err);
    return setDestMode(dest, srcMode, cb);
  });
}

function setDestMode(dest, srcMode, cb) {
  return gracefulFs.chmod(dest, srcMode, cb);
}

function setDestTimestamps(src, dest, cb) {
  // The initial srcStat.atime cannot be trusted
  // because it is modified by the read(2) system call
  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
  gracefulFs.stat(src, (err, updatedSrcStat) => {
    if (err) return cb(err);
    return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
  });
}

function onDir(srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts, cb);

  if (destStat && !destStat.isDirectory()) {
    return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
  }

  return copyDir(src, dest, opts, cb);
}

function mkDirAndCopy(srcMode, src, dest, opts, cb) {
  gracefulFs.mkdir(dest, err => {
    if (err) return cb(err);
    copyDir(src, dest, opts, err => {
      if (err) return cb(err);
      return setDestMode(dest, srcMode, cb);
    });
  });
}

function copyDir(src, dest, opts, cb) {
  gracefulFs.readdir(src, (err, items) => {
    if (err) return cb(err);
    return copyDirItems(items, src, dest, opts, cb);
  });
}

function copyDirItems(items, src, dest, opts, cb) {
  const item = items.pop();
  if (!item) return cb();
  return copyDirItem(items, item, src, dest, opts, cb);
}

function copyDirItem(items, item, src, dest, opts, cb) {
  const srcItem = path__default["default"].join(src, item);
  const destItem = path__default["default"].join(dest, item);
  stat_1.checkPaths(srcItem, destItem, 'copy', (err, stats) => {
    if (err) return cb(err);
    const {
      destStat
    } = stats;
    startCopy(destStat, srcItem, destItem, opts, err => {
      if (err) return cb(err);
      return copyDirItems(items, src, dest, opts, cb);
    });
  });
}

function onLink(destStat, src, dest, opts, cb) {
  gracefulFs.readlink(src, (err, resolvedSrc) => {
    if (err) return cb(err);

    if (opts.dereference) {
      resolvedSrc = path__default["default"].resolve(process.cwd(), resolvedSrc);
    }

    if (!destStat) {
      return gracefulFs.symlink(resolvedSrc, dest, cb);
    } else {
      gracefulFs.readlink(dest, (err, resolvedDest) => {
        if (err) {
          // dest exists and is a regular file or directory,
          // Windows may throw UNKNOWN error. If dest already exists,
          // fs throws error anyway, so no need to guard against it here.
          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return gracefulFs.symlink(resolvedSrc, dest, cb);
          return cb(err);
        }

        if (opts.dereference) {
          resolvedDest = path__default["default"].resolve(process.cwd(), resolvedDest);
        }

        if (stat_1.isSrcSubdir(resolvedSrc, resolvedDest)) {
          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
        } // do not copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.


        if (destStat.isDirectory() && stat_1.isSrcSubdir(resolvedDest, resolvedSrc)) {
          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
        }

        return copyLink(resolvedSrc, dest, cb);
      });
    }
  });
}

function copyLink(resolvedSrc, dest, cb) {
  gracefulFs.unlink(dest, err => {
    if (err) return cb(err);
    return gracefulFs.symlink(resolvedSrc, dest, cb);
  });
}

var copy_1 = copy$2;

const u$8 = universalify.fromCallback;
var copy$1 = {
  copy: u$8(copy_1)
};

const isWindows = process.platform === 'win32';

function defaults(options) {
  const methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'];
  methods.forEach(m => {
    options[m] = options[m] || gracefulFs[m];
    m = m + 'Sync';
    options[m] = options[m] || gracefulFs[m];
  });
  options.maxBusyTries = options.maxBusyTries || 3;
}

function rimraf(p, options, cb) {
  let busyTries = 0;

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  assert__default["default"](p, 'rimraf: missing path');
  assert__default["default"].strictEqual(typeof p, 'string', 'rimraf: path should be a string');
  assert__default["default"].strictEqual(typeof cb, 'function', 'rimraf: callback function required');
  assert__default["default"](options, 'rimraf: invalid options argument provided');
  assert__default["default"].strictEqual(typeof options, 'object', 'rimraf: options should be object');
  defaults(options);
  rimraf_(p, options, function CB(er) {
    if (er) {
      if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') && busyTries < options.maxBusyTries) {
        busyTries++;
        const time = busyTries * 100; // try again, with the same exact callback as this one.

        return setTimeout(() => rimraf_(p, options, CB), time);
      } // already gone


      if (er.code === 'ENOENT') er = null;
    }

    cb(er);
  });
} // Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.


function rimraf_(p, options, cb) {
  assert__default["default"](p);
  assert__default["default"](options);
  assert__default["default"](typeof cb === 'function'); // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.

  options.lstat(p, (er, st) => {
    if (er && er.code === 'ENOENT') {
      return cb(null);
    } // Windows can EPERM on stat.  Life is suffering.


    if (er && er.code === 'EPERM' && isWindows) {
      return fixWinEPERM(p, options, er, cb);
    }

    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb);
    }

    options.unlink(p, er => {
      if (er) {
        if (er.code === 'ENOENT') {
          return cb(null);
        }

        if (er.code === 'EPERM') {
          return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
        }

        if (er.code === 'EISDIR') {
          return rmdir(p, options, er, cb);
        }
      }

      return cb(er);
    });
  });
}

function fixWinEPERM(p, options, er, cb) {
  assert__default["default"](p);
  assert__default["default"](options);
  assert__default["default"](typeof cb === 'function');
  options.chmod(p, 0o666, er2 => {
    if (er2) {
      cb(er2.code === 'ENOENT' ? null : er);
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === 'ENOENT' ? null : er);
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb);
        } else {
          options.unlink(p, cb);
        }
      });
    }
  });
}

function fixWinEPERMSync(p, options, er) {
  let stats;
  assert__default["default"](p);
  assert__default["default"](options);

  try {
    options.chmodSync(p, 0o666);
  } catch (er2) {
    if (er2.code === 'ENOENT') {
      return;
    } else {
      throw er;
    }
  }

  try {
    stats = options.statSync(p);
  } catch (er3) {
    if (er3.code === 'ENOENT') {
      return;
    } else {
      throw er;
    }
  }

  if (stats.isDirectory()) {
    rmdirSync(p, options, er);
  } else {
    options.unlinkSync(p);
  }
}

function rmdir(p, options, originalEr, cb) {
  assert__default["default"](p);
  assert__default["default"](options);
  assert__default["default"](typeof cb === 'function'); // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.

  options.rmdir(p, er => {
    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
      rmkids(p, options, cb);
    } else if (er && er.code === 'ENOTDIR') {
      cb(originalEr);
    } else {
      cb(er);
    }
  });
}

function rmkids(p, options, cb) {
  assert__default["default"](p);
  assert__default["default"](options);
  assert__default["default"](typeof cb === 'function');
  options.readdir(p, (er, files) => {
    if (er) return cb(er);
    let n = files.length;
    let errState;
    if (n === 0) return options.rmdir(p, cb);
    files.forEach(f => {
      rimraf(path__default["default"].join(p, f), options, er => {
        if (errState) {
          return;
        }

        if (er) return cb(errState = er);

        if (--n === 0) {
          options.rmdir(p, cb);
        }
      });
    });
  });
} // this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.


function rimrafSync(p, options) {
  let st;
  options = options || {};
  defaults(options);
  assert__default["default"](p, 'rimraf: missing path');
  assert__default["default"].strictEqual(typeof p, 'string', 'rimraf: path should be a string');
  assert__default["default"](options, 'rimraf: missing options');
  assert__default["default"].strictEqual(typeof options, 'object', 'rimraf: options should be object');

  try {
    st = options.lstatSync(p);
  } catch (er) {
    if (er.code === 'ENOENT') {
      return;
    } // Windows can EPERM on stat.  Life is suffering.


    if (er.code === 'EPERM' && isWindows) {
      fixWinEPERMSync(p, options, er);
    }
  }

  try {
    // sunos lets the root user unlink directories, which is... weird.
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null);
    } else {
      options.unlinkSync(p);
    }
  } catch (er) {
    if (er.code === 'ENOENT') {
      return;
    } else if (er.code === 'EPERM') {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
    } else if (er.code !== 'EISDIR') {
      throw er;
    }

    rmdirSync(p, options, er);
  }
}

function rmdirSync(p, options, originalEr) {
  assert__default["default"](p);
  assert__default["default"](options);

  try {
    options.rmdirSync(p);
  } catch (er) {
    if (er.code === 'ENOTDIR') {
      throw originalEr;
    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
      rmkidsSync(p, options);
    } else if (er.code !== 'ENOENT') {
      throw er;
    }
  }
}

function rmkidsSync(p, options) {
  assert__default["default"](p);
  assert__default["default"](options);
  options.readdirSync(p).forEach(f => rimrafSync(path__default["default"].join(p, f), options));

  if (isWindows) {
    // We only end up here once we got ENOTEMPTY at least once, and
    // at this point, we are guaranteed to have removed all the kids.
    // So, we know that it won't be ENOENT or ENOTDIR or anything else.
    // try really hard to delete stuff on windows, because it has a
    // PROFOUNDLY annoying habit of not closing handles promptly when
    // files are deleted, resulting in spurious ENOTEMPTY errors.
    const startTime = Date.now();

    do {
      try {
        const ret = options.rmdirSync(p, options);
        return ret;
      } catch (_unused) {}
    } while (Date.now() - startTime < 500); // give up after 500ms

  } else {
    const ret = options.rmdirSync(p, options);
    return ret;
  }
}

var rimraf_1 = rimraf;
rimraf.sync = rimrafSync;

const u$7 = universalify.fromCallback;
var remove$1 = {
  remove: u$7(rimraf_1),
  removeSync: rimraf_1.sync
};

const u$6 = universalify.fromCallback;
const emptyDir = u$6(function emptyDir(dir, callback) {
  callback = callback || function () {};

  gracefulFs.readdir(dir, (err, items) => {
    if (err) return mkdirs$2.mkdirs(dir, callback);
    items = items.map(item => path__default["default"].join(dir, item));
    deleteItem();

    function deleteItem() {
      const item = items.pop();
      if (!item) return callback();
      remove$1.remove(item, err => {
        if (err) return callback(err);
        deleteItem();
      });
    }
  });
});

function emptyDirSync(dir) {
  let items;

  try {
    items = gracefulFs.readdirSync(dir);
  } catch (_unused) {
    return mkdirs$2.mkdirsSync(dir);
  }

  items.forEach(item => {
    item = path__default["default"].join(dir, item);
    remove$1.removeSync(item);
  });
}

var empty = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
};

const u$5 = universalify.fromCallback;

function createFile(file, callback) {
  function makeFile() {
    gracefulFs.writeFile(file, '', err => {
      if (err) return callback(err);
      callback();
    });
  }

  gracefulFs.stat(file, (err, stats) => {
    // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback();
    const dir = path__default["default"].dirname(file);
    gracefulFs.stat(dir, (err, stats) => {
      if (err) {
        // if the directory doesn't exist, make it
        if (err.code === 'ENOENT') {
          return mkdirs$2.mkdirs(dir, err => {
            if (err) return callback(err);
            makeFile();
          });
        }

        return callback(err);
      }

      if (stats.isDirectory()) makeFile();else {
        // parent is not a directory
        // This is just to cause an internal ENOTDIR error to be thrown
        gracefulFs.readdir(dir, err => {
          if (err) return callback(err);
        });
      }
    });
  });
}

function createFileSync(file) {
  let stats;

  try {
    stats = gracefulFs.statSync(file);
  } catch (_unused) {}

  if (stats && stats.isFile()) return;
  const dir = path__default["default"].dirname(file);

  try {
    if (!gracefulFs.statSync(dir).isDirectory()) {
      // parent is not a directory
      // This is just to cause an internal ENOTDIR error to be thrown
      gracefulFs.readdirSync(dir);
    }
  } catch (err) {
    // If the stat call above failed because the directory doesn't exist, create it
    if (err && err.code === 'ENOENT') mkdirs$2.mkdirsSync(dir);else throw err;
  }

  gracefulFs.writeFileSync(file, '');
}

var file = {
  createFile: u$5(createFile),
  createFileSync
};

const u$4 = universalify.fromCallback;
const pathExists$4 = pathExists_1.pathExists;

function createLink(srcpath, dstpath, callback) {
  function makeLink(srcpath, dstpath) {
    gracefulFs.link(srcpath, dstpath, err => {
      if (err) return callback(err);
      callback(null);
    });
  }

  pathExists$4(dstpath, (err, destinationExists) => {
    if (err) return callback(err);
    if (destinationExists) return callback(null);
    gracefulFs.lstat(srcpath, err => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink');
        return callback(err);
      }

      const dir = path__default["default"].dirname(dstpath);
      pathExists$4(dir, (err, dirExists) => {
        if (err) return callback(err);
        if (dirExists) return makeLink(srcpath, dstpath);
        mkdirs$2.mkdirs(dir, err => {
          if (err) return callback(err);
          makeLink(srcpath, dstpath);
        });
      });
    });
  });
}

function createLinkSync(srcpath, dstpath) {
  const destinationExists = gracefulFs.existsSync(dstpath);
  if (destinationExists) return undefined;

  try {
    gracefulFs.lstatSync(srcpath);
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink');
    throw err;
  }

  const dir = path__default["default"].dirname(dstpath);
  const dirExists = gracefulFs.existsSync(dir);
  if (dirExists) return gracefulFs.linkSync(srcpath, dstpath);
  mkdirs$2.mkdirsSync(dir);
  return gracefulFs.linkSync(srcpath, dstpath);
}

var link = {
  createLink: u$4(createLink),
  createLinkSync
};

const pathExists$3 = pathExists_1.pathExists;
/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

function symlinkPaths$1(srcpath, dstpath, callback) {
  if (path__default["default"].isAbsolute(srcpath)) {
    return gracefulFs.lstat(srcpath, err => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink');
        return callback(err);
      }

      return callback(null, {
        toCwd: srcpath,
        toDst: srcpath
      });
    });
  } else {
    const dstdir = path__default["default"].dirname(dstpath);
    const relativeToDst = path__default["default"].join(dstdir, srcpath);
    return pathExists$3(relativeToDst, (err, exists) => {
      if (err) return callback(err);

      if (exists) {
        return callback(null, {
          toCwd: relativeToDst,
          toDst: srcpath
        });
      } else {
        return gracefulFs.lstat(srcpath, err => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink');
            return callback(err);
          }

          return callback(null, {
            toCwd: srcpath,
            toDst: path__default["default"].relative(dstdir, srcpath)
          });
        });
      }
    });
  }
}

function symlinkPathsSync$1(srcpath, dstpath) {
  let exists;

  if (path__default["default"].isAbsolute(srcpath)) {
    exists = gracefulFs.existsSync(srcpath);
    if (!exists) throw new Error('absolute srcpath does not exist');
    return {
      toCwd: srcpath,
      toDst: srcpath
    };
  } else {
    const dstdir = path__default["default"].dirname(dstpath);
    const relativeToDst = path__default["default"].join(dstdir, srcpath);
    exists = gracefulFs.existsSync(relativeToDst);

    if (exists) {
      return {
        toCwd: relativeToDst,
        toDst: srcpath
      };
    } else {
      exists = gracefulFs.existsSync(srcpath);
      if (!exists) throw new Error('relative srcpath does not exist');
      return {
        toCwd: srcpath,
        toDst: path__default["default"].relative(dstdir, srcpath)
      };
    }
  }
}

var symlinkPaths_1 = {
  symlinkPaths: symlinkPaths$1,
  symlinkPathsSync: symlinkPathsSync$1
};

function symlinkType$1(srcpath, type, callback) {
  callback = typeof type === 'function' ? type : callback;
  type = typeof type === 'function' ? false : type;
  if (type) return callback(null, type);
  gracefulFs.lstat(srcpath, (err, stats) => {
    if (err) return callback(null, 'file');
    type = stats && stats.isDirectory() ? 'dir' : 'file';
    callback(null, type);
  });
}

function symlinkTypeSync$1(srcpath, type) {
  let stats;
  if (type) return type;

  try {
    stats = gracefulFs.lstatSync(srcpath);
  } catch (_unused) {
    return 'file';
  }

  return stats && stats.isDirectory() ? 'dir' : 'file';
}

var symlinkType_1 = {
  symlinkType: symlinkType$1,
  symlinkTypeSync: symlinkTypeSync$1
};

const u$3 = universalify.fromCallback;
const mkdirs = mkdirs$2.mkdirs;
const mkdirsSync = mkdirs$2.mkdirsSync;
const symlinkPaths = symlinkPaths_1.symlinkPaths;
const symlinkPathsSync = symlinkPaths_1.symlinkPathsSync;
const symlinkType = symlinkType_1.symlinkType;
const symlinkTypeSync = symlinkType_1.symlinkTypeSync;
const pathExists$2 = pathExists_1.pathExists;

function createSymlink(srcpath, dstpath, type, callback) {
  callback = typeof type === 'function' ? type : callback;
  type = typeof type === 'function' ? false : type;
  pathExists$2(dstpath, (err, destinationExists) => {
    if (err) return callback(err);
    if (destinationExists) return callback(null);
    symlinkPaths(srcpath, dstpath, (err, relative) => {
      if (err) return callback(err);
      srcpath = relative.toDst;
      symlinkType(relative.toCwd, type, (err, type) => {
        if (err) return callback(err);
        const dir = path__default["default"].dirname(dstpath);
        pathExists$2(dir, (err, dirExists) => {
          if (err) return callback(err);
          if (dirExists) return gracefulFs.symlink(srcpath, dstpath, type, callback);
          mkdirs(dir, err => {
            if (err) return callback(err);
            gracefulFs.symlink(srcpath, dstpath, type, callback);
          });
        });
      });
    });
  });
}

function createSymlinkSync(srcpath, dstpath, type) {
  const destinationExists = gracefulFs.existsSync(dstpath);
  if (destinationExists) return undefined;
  const relative = symlinkPathsSync(srcpath, dstpath);
  srcpath = relative.toDst;
  type = symlinkTypeSync(relative.toCwd, type);
  const dir = path__default["default"].dirname(dstpath);
  const exists = gracefulFs.existsSync(dir);
  if (exists) return gracefulFs.symlinkSync(srcpath, dstpath, type);
  mkdirsSync(dir);
  return gracefulFs.symlinkSync(srcpath, dstpath, type);
}

var symlink = {
  createSymlink: u$3(createSymlink),
  createSymlinkSync
};

var ensure = {
  // file
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  // link
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  // symlink
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
};

function stringify$3(obj, {
  EOL = '\n',
  finalEOL = true,
  replacer = null,
  spaces
} = {}) {
  const EOF = finalEOL ? EOL : '';
  const str = JSON.stringify(obj, replacer, spaces);
  return str.replace(/\n/g, EOL) + EOF;
}

function stripBom$1(content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8');
  return content.replace(/^\uFEFF/, '');
}

var utils = {
  stringify: stringify$3,
  stripBom: stripBom$1
};

let _fs;

try {
  _fs = gracefulFs;
} catch (_) {
  _fs = fs__default["default"];
}

const {
  stringify: stringify$2,
  stripBom
} = utils;

async function _readFile(file, options = {}) {
  if (typeof options === 'string') {
    options = {
      encoding: options
    };
  }

  const fs = options.fs || _fs;
  const shouldThrow = 'throws' in options ? options.throws : true;
  let data = await universalify.fromCallback(fs.readFile)(file, options);
  data = stripBom(data);
  let obj;

  try {
    obj = JSON.parse(data, options ? options.reviver : null);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }

  return obj;
}

const readFile = universalify.fromPromise(_readFile);

function readFileSync(file, options = {}) {
  if (typeof options === 'string') {
    options = {
      encoding: options
    };
  }

  const fs = options.fs || _fs;
  const shouldThrow = 'throws' in options ? options.throws : true;

  try {
    let content = fs.readFileSync(file, options);
    content = stripBom(content);
    return JSON.parse(content, options.reviver);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }
}

async function _writeFile(file, obj, options = {}) {
  const fs = options.fs || _fs;
  const str = stringify$2(obj, options);
  await universalify.fromCallback(fs.writeFile)(file, str, options);
}

const writeFile = universalify.fromPromise(_writeFile);

function writeFileSync(file, obj, options = {}) {
  const fs = options.fs || _fs;
  const str = stringify$2(obj, options); // not sure if fs.writeFileSync returns anything, but just in case

  return fs.writeFileSync(file, str, options);
}

const jsonfile$1 = {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync
};
var jsonfile_1 = jsonfile$1;

var jsonfile = {
  // jsonfile exports
  readJson: jsonfile_1.readFile,
  readJsonSync: jsonfile_1.readFileSync,
  writeJson: jsonfile_1.writeFile,
  writeJsonSync: jsonfile_1.writeFileSync
};

const u$2 = universalify.fromCallback;
const pathExists$1 = pathExists_1.pathExists;

function outputFile$1(file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding;
    encoding = 'utf8';
  }

  const dir = path__default["default"].dirname(file);
  pathExists$1(dir, (err, itDoes) => {
    if (err) return callback(err);
    if (itDoes) return gracefulFs.writeFile(file, data, encoding, callback);
    mkdirs$2.mkdirs(dir, err => {
      if (err) return callback(err);
      gracefulFs.writeFile(file, data, encoding, callback);
    });
  });
}

function outputFileSync$1(file, ...args) {
  const dir = path__default["default"].dirname(file);

  if (gracefulFs.existsSync(dir)) {
    return gracefulFs.writeFileSync(file, ...args);
  }

  mkdirs$2.mkdirsSync(dir);
  gracefulFs.writeFileSync(file, ...args);
}

var output = {
  outputFile: u$2(outputFile$1),
  outputFileSync: outputFileSync$1
};

const {
  stringify: stringify$1
} = utils;
const {
  outputFile
} = output;

async function outputJson(file, data, options = {}) {
  const str = stringify$1(data, options);
  await outputFile(file, str, options);
}

var outputJson_1 = outputJson;

const {
  stringify
} = utils;
const {
  outputFileSync
} = output;

function outputJsonSync(file, data, options) {
  const str = stringify(data, options);
  outputFileSync(file, str, options);
}

var outputJsonSync_1 = outputJsonSync;

const u$1 = universalify.fromPromise;
jsonfile.outputJson = u$1(outputJson_1);
jsonfile.outputJsonSync = outputJsonSync_1; // aliases

jsonfile.outputJSON = jsonfile.outputJson;
jsonfile.outputJSONSync = jsonfile.outputJsonSync;
jsonfile.writeJSON = jsonfile.writeJson;
jsonfile.writeJSONSync = jsonfile.writeJsonSync;
jsonfile.readJSON = jsonfile.readJson;
jsonfile.readJSONSync = jsonfile.readJsonSync;
var json = jsonfile;

const copySync = copySync$1.copySync;
const removeSync = remove$1.removeSync;
const mkdirpSync = mkdirs$2.mkdirpSync;

function moveSync$1(src, dest, opts) {
  opts = opts || {};
  const overwrite = opts.overwrite || opts.clobber || false;
  const {
    srcStat
  } = stat_1.checkPathsSync(src, dest, 'move');
  stat_1.checkParentPathsSync(src, srcStat, dest, 'move');
  mkdirpSync(path__default["default"].dirname(dest));
  return doRename$1(src, dest, overwrite);
}

function doRename$1(src, dest, overwrite) {
  if (overwrite) {
    removeSync(dest);
    return rename$1(src, dest, overwrite);
  }

  if (gracefulFs.existsSync(dest)) throw new Error('dest already exists.');
  return rename$1(src, dest, overwrite);
}

function rename$1(src, dest, overwrite) {
  try {
    gracefulFs.renameSync(src, dest);
  } catch (err) {
    if (err.code !== 'EXDEV') throw err;
    return moveAcrossDevice$1(src, dest, overwrite);
  }
}

function moveAcrossDevice$1(src, dest, overwrite) {
  const opts = {
    overwrite,
    errorOnExist: true
  };
  copySync(src, dest, opts);
  return removeSync(src);
}

var moveSync_1 = moveSync$1;

var moveSync = {
  moveSync: moveSync_1
};

const copy = copy$1.copy;
const remove = remove$1.remove;
const mkdirp = mkdirs$2.mkdirp;
const pathExists = pathExists_1.pathExists;

function move$1(src, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  const overwrite = opts.overwrite || opts.clobber || false;
  stat_1.checkPaths(src, dest, 'move', (err, stats) => {
    if (err) return cb(err);
    const {
      srcStat
    } = stats;
    stat_1.checkParentPaths(src, srcStat, dest, 'move', err => {
      if (err) return cb(err);
      mkdirp(path__default["default"].dirname(dest), err => {
        if (err) return cb(err);
        return doRename(src, dest, overwrite, cb);
      });
    });
  });
}

function doRename(src, dest, overwrite, cb) {
  if (overwrite) {
    return remove(dest, err => {
      if (err) return cb(err);
      return rename(src, dest, overwrite, cb);
    });
  }

  pathExists(dest, (err, destExists) => {
    if (err) return cb(err);
    if (destExists) return cb(new Error('dest already exists.'));
    return rename(src, dest, overwrite, cb);
  });
}

function rename(src, dest, overwrite, cb) {
  gracefulFs.rename(src, dest, err => {
    if (!err) return cb();
    if (err.code !== 'EXDEV') return cb(err);
    return moveAcrossDevice(src, dest, overwrite, cb);
  });
}

function moveAcrossDevice(src, dest, overwrite, cb) {
  const opts = {
    overwrite,
    errorOnExist: true
  };
  copy(src, dest, opts, err => {
    if (err) return cb(err);
    return remove(src, cb);
  });
}

var move_1 = move$1;

const u = universalify.fromCallback;
var move = {
  move: u(move_1)
};

var lib = createCommonjsModule(function (module) {

  module.exports = _extends({}, fs_1, copySync$1, copy$1, empty, ensure, json, mkdirs$2, moveSync, move, output, pathExists_1, remove$1); // Export fs.promises as a getter property so that we don't trigger
  // ExperimentalWarning before fs.promises is actually accessed.

  if (Object.getOwnPropertyDescriptor(fs__default["default"], 'promises')) {
    Object.defineProperty(module.exports, 'promises', {
      get() {
        return fs__default["default"].promises;
      }

    });
  }
});

// @remove-file-on-eject

process.on('unhandledRejection', err => {
  throw err;
});

function isInGitRepository() {
  try {
    child_process.execSync('git rev-parse --is-inside-work-tree', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    child_process.execSync('hg --cwd . root', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    return false;
  }
}

function tryGitInit() {
  try {
    child_process.execSync('git --version', {
      stdio: 'ignore'
    });

    if (isInGitRepository() || isInMercurialRepository()) {
      return false;
    }

    child_process.execSync('git init', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    console.warn('Git repo not initialized', e);
    return false;
  }
}

function tryGitCommit(appPath) {
  try {
    child_process.execSync('git add -A', {
      stdio: 'ignore'
    });
    child_process.execSync('git commit -m "Initialize project using Create JXA App"', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    // We couldn't commit in already initialized git repo,
    // maybe the commit author config is not set.
    // In the future, we might supply our own committer
    // like Ember CLI does, but for now, let's just
    // remove the Git files to avoid a half-done state.
    console.warn('Git commit not created', e);
    console.warn('Removing .git directory...');

    try {
      // unlinkSync() doesn't work on directories.
      lib.removeSync(path__default["default"].join(appPath, '.git'));
    } catch (removeErr) {// Ignore.
    }

    return false;
  }
}

module.exports = function (appPath, appName, verbose, originalDirectory, templateName) {
  const appPackage = require(path__default["default"].join(appPath, 'package.json'));

  const useYarn = lib.existsSync(path__default["default"].join(appPath, 'yarn.lock'));

  if (!templateName) {
    console.log('');
    console.error(`A template was not provided. This is likely because you're using an outdated version of ${chalk__default["default"].cyan('create-jxa-app')}.`);
    console.error(`Please note that global installs of ${chalk__default["default"].cyan('create-jxa-app')} are no longer supported.`);
    console.error(`You can fix this by running ${chalk__default["default"].cyan('npm uninstall -g create-jxa-app')} or ${chalk__default["default"].cyan('yarn global remove create-jxa-app')} before using ${chalk__default["default"].cyan('create-jxa-app')} again.`);
    return;
  }

  const templatePath = path__default["default"].dirname(require.resolve(`${templateName}/package.json`, {
    paths: [appPath]
  }));
  const templateJsonPath = path__default["default"].join(templatePath, 'template.json');
  let templateJson = {};

  if (lib.existsSync(templateJsonPath)) {
    templateJson = require(templateJsonPath);
  }

  const templatePackage = templateJson.package || {}; // TODO: Deprecate support for root-level `dependencies` and `scripts` in v5.
  // These should now be set under the `package` key.

  if (templateJson.dependencies || templateJson.scripts) {
    console.log();
    console.log(chalk__default["default"].yellow('Root-level `dependencies` and `scripts` keys in `template.json` are deprecated.\n' + 'This template should be updated to use the new `package` key.'));
    console.log('For more information, visit https://https://github.com/aheissenberger/macos-jxa-bundler/create-jxa-app/#templates');
  }

  if (templateJson.dependencies) {
    templatePackage.dependencies = templateJson.dependencies;
  }

  if (templateJson.scripts) {
    templatePackage.scripts = templateJson.scripts;
  } // Keys to ignore in templatePackage


  const templatePackageBlacklist = ['name', 'version', 'description', 'keywords', 'bugs', 'license', 'author', 'contributors', 'files', 'browser', 'bin', 'man', 'directories', 'repository', 'peerDependencies', 'bundledDependencies', 'optionalDependencies', 'engineStrict', 'os', 'cpu', 'preferGlobal', 'private', 'publishConfig']; // Keys from templatePackage that will be merged with appPackage

  const templatePackageToMerge = ['dependencies', 'scripts']; // Keys from templatePackage that will be added to appPackage,
  // replacing any existing entries.

  const templatePackageToReplace = Object.keys(templatePackage).filter(key => {
    return !templatePackageBlacklist.includes(key) && !templatePackageToMerge.includes(key);
  }); // Copy over some of the devDependencies

  appPackage.dependencies = appPackage.dependencies || {}; // Setup the script rules

  const templateScripts = templatePackage.scripts || {};
  appPackage.scripts = Object.assign({
    dev: 'jxabundler watch',
    build: 'jxabundler',
    test: 'jest'
  }, templateScripts); // Update scripts for Yarn users

  if (useYarn) {
    appPackage.scripts = Object.entries(appPackage.scripts).reduce((acc, [key, value]) => _extends({}, acc, {
      [key]: value.replace(/(npm run |npm )/, 'yarn ')
    }), {});
  } // Setup the eslint config


  appPackage.eslintConfig = {
    extends: 'react-app'
  }; // Add templatePackage keys/values to appPackage, replacing existing entries

  templatePackageToReplace.forEach(key => {
    appPackage[key] = templatePackage[key];
  });
  lib.writeFileSync(path__default["default"].join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2) + os__default["default"].EOL);
  const readmeExists = lib.existsSync(path__default["default"].join(appPath, 'README.md'));

  if (readmeExists) {
    lib.renameSync(path__default["default"].join(appPath, 'README.md'), path__default["default"].join(appPath, 'README.old.md'));
  } // Copy the files for the user


  const templateDir = path__default["default"].join(templatePath, 'template');

  if (lib.existsSync(templateDir)) {
    lib.copySync(templateDir, appPath);
  } else {
    console.error(`Could not locate supplied template: ${chalk__default["default"].green(templateDir)}`);
    return;
  } // modifies README.md commands based on user used package manager.


  if (useYarn) {
    try {
      const readme = lib.readFileSync(path__default["default"].join(appPath, 'README.md'), 'utf8');
      lib.writeFileSync(path__default["default"].join(appPath, 'README.md'), readme.replace(/(npm run |npm )/g, 'yarn '), 'utf8');
    } catch (err) {// Silencing the error. As it fall backs to using default npm commands.
    }
  }

  const gitignoreExists = lib.existsSync(path__default["default"].join(appPath, '.gitignore'));

  if (gitignoreExists) {
    // Append if there's already a `.gitignore` file there
    const data = lib.readFileSync(path__default["default"].join(appPath, 'gitignore'));
    lib.appendFileSync(path__default["default"].join(appPath, '.gitignore'), data);
    lib.unlinkSync(path__default["default"].join(appPath, 'gitignore'));
  } else {
    // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
    // See: https://github.com/npm/npm/issues/1862
    lib.moveSync(path__default["default"].join(appPath, 'gitignore'), path__default["default"].join(appPath, '.gitignore'), []);
  } // Initialize git repo


  let initializedGit = false;

  if (tryGitInit()) {
    initializedGit = true;
    console.log();
    console.log('Initialized a git repository.');
  }

  let command;
  let remove;
  let args;

  if (useYarn) {
    command = 'yarnpkg';
    remove = 'remove';
    args = ['add'];
  } else {
    command = 'npm';
    remove = 'uninstall';
    args = ['install', '--save', verbose && '--verbose'].filter(e => e);
  } // Install additional template dependencies, if present.


  const dependenciesToInstall = Object.entries(_extends({}, templatePackage.dependencies, templatePackage.devDependencies));

  if (dependenciesToInstall.length) {
    args = args.concat(dependenciesToInstall.map(([dependency, version]) => {
      return `${dependency}@${version}`;
    }));
  } // Install react and react-dom for backward compatibility with old CRA cli
  // which doesn't install react and react-dom along with react-scripts
  //   if (!isReactInstalled(appPackage)) {
  //     args = args.concat(['react', 'react-dom']);
  //   }
  // Install template dependencies, and react and react-dom if missing.


  if ((!isReactInstalled(appPackage) || templateName) && args.length > 1) {
    console.log();
    console.log(`Installing template dependencies using ${command}...`);
    const proc = spawn__default["default"].sync(command, args, {
      stdio: 'inherit'
    });

    if (proc.status !== 0) {
      console.error(`\`${command} ${args.join(' ')}\` failed`);
      return;
    }
  }

  if (args.find(arg => arg.includes('typescript'))) {
    console.log(); //verifyTypeScriptSetup();
  } // Remove template


  console.log(`Removing template package using ${command}...`);
  console.log();
  const proc = spawn__default["default"].sync(command, [remove, templateName], {
    stdio: 'inherit'
  });

  if (proc.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`);
    return;
  } // Create git commit if git repo was initialized


  if (initializedGit && tryGitCommit(appPath)) {
    console.log();
    console.log('Created git commit.');
  } // Display the most elegant way to cd.
  // This needs to handle an undefined originalDirectory for
  // backward compatibility with old global-cli's.


  let cdpath;

  if (originalDirectory && path__default["default"].join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  } // Change displayed command to yarn instead of yarnpkg


  const displayedCommand = useYarn ? 'yarn' : 'npm';
  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk__default["default"].cyan(`  ${displayedCommand} start`));
  console.log('    Starts the development mode.');
  console.log();
  console.log(chalk__default["default"].cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`));
  console.log('    Bundles the app into an MacOS App or Command Line Command.');
  console.log();
  console.log(chalk__default["default"].cyan(`  ${displayedCommand} test`));
  console.log('    Starts the test runner.');
  console.log();
  console.log(chalk__default["default"].cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`));
  console.log('    Removes this tool and copies build dependencies, configuration files');
  console.log('    and scripts into the app directory. If you do this, you can’t go back!');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk__default["default"].cyan('  cd'), cdpath);
  console.log(`  ${chalk__default["default"].cyan(`${displayedCommand} start`)}`);

  if (readmeExists) {
    console.log();
    console.log(chalk__default["default"].yellow('You had a `README.md` file, we renamed it to `README.old.md`'));
  }

  console.log();
  console.log('Happy hacking!');
};

function isReactInstalled(appPackage) {
  const dependencies = appPackage.dependencies || {};
  return typeof dependencies.react !== 'undefined' && typeof dependencies['react-dom'] !== 'undefined';
}
//# sourceMappingURL=init.js.map
