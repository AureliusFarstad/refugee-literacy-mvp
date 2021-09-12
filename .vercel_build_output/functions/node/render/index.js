var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        return fulfil(data);
      }
      const encoding = h["content-encoding"] || "utf-8";
      fulfil(new TextDecoder(encoding).decode(data));
    });
  });
}

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const { name, message, stack, frame, loc } = error3;
    serialized = try_serialize({ name, message, stack, frame, loc });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error3 };
    }
    return { status, error: error3 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          const request2 = new Request(url, opts);
          response = await options2.hooks.serverFetch.call(null, request2);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = { ...opts.headers };
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error3 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error3 } = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({ ...request, params });
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let { status = 200, body, headers = {} } = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json" || type === "application/json; charset=utf-8")) {
        headers = { ...headers, "content-type": "application/json; charset=utf-8" };
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return { status, body: normalized_body, headers };
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of this.#map)
      yield key;
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const [type, ...directives] = headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: null,
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// .svelte-kit/output/server/app.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
var css$k = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\texport let props_3 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}>\\n\\t\\t\\t\\t\\t{#if components[3]}\\n\\t\\t\\t\\t\\t\\t<svelte:component this={components[3]} {...(props_3 || {})}/>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</svelte:component>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AA2DC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  let { props_3 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  if ($$props.props_3 === void 0 && $$bindings.props_3 && props_3 !== void 0)
    $$bindings.props_3(props_3);
  $$result.css.add(css$k);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {
        default: () => `${components[3] ? `${validate_component(components[3] || missing_component, "svelte:component").$$render($$result, Object.assign(props_3 || {}), {}, {})}` : ``}`
      })}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link href="/global.css" rel="stylesheet" type="text/css" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "/." } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-82ebcf25.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-82ebcf25.js", "/./_app/chunks/vendor-9b6486e5.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      if (error22.frame) {
        console.error(error22.frame);
      }
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{ "file": ".DS_Store", "size": 6148, "type": null }, { "file": "alphabet/a_lowercase.svg", "size": 873, "type": "image/svg+xml" }, { "file": "alphabet/c_lowercase.svg", "size": 659, "type": "image/svg+xml" }, { "file": "alphabet/d_lowercase.svg", "size": 846, "type": "image/svg+xml" }, { "file": "alphabet/e_lowercase.svg", "size": 680, "type": "image/svg+xml" }, { "file": "alphabet/h_lowercase.svg", "size": 825, "type": "image/svg+xml" }, { "file": "alphabet/i_lowercase.svg", "size": 676, "type": "image/svg+xml" }, { "file": "alphabet/k_lowercase.svg", "size": 698, "type": "image/svg+xml" }, { "file": "alphabet/m_lowercase.svg", "size": 751, "type": "image/svg+xml" }, { "file": "alphabet/n_lowercase.svg", "size": 711, "type": "image/svg+xml" }, { "file": "alphabet/p_lowercase.svg", "size": 727, "type": "image/svg+xml" }, { "file": "alphabet/r_lowercase.svg", "size": 676, "type": "image/svg+xml" }, { "file": "alphabet/s_lowercase.svg", "size": 700, "type": "image/svg+xml" }, { "file": "alphabet/t_lowercase.svg", "size": 686, "type": "image/svg+xml" }, { "file": "favicon.png", "size": 1571, "type": "image/png" }, { "file": "global.css", "size": 168, "type": "text/css" }, { "file": "images/icons/ear-with-sparks-below.svg", "size": 6420, "type": "image/svg+xml" }, { "file": "images/icons/ear-with-sparks-right.svg", "size": 2941, "type": "image/svg+xml" }, { "file": "images/icons/loud-speaker-optimized.svg", "size": 2221, "type": "image/svg+xml" }, { "file": "images/icons/loud-speaker.svg", "size": 1512, "type": "image/svg+xml" }, { "file": "images/icons/man-picking-from-cards.svg", "size": 1588, "type": "image/svg+xml" }, { "file": "images/icons/name-tag.svg", "size": 4901, "type": "image/svg+xml" }, { "file": "images/icons/person-whispering-in-hand.svg", "size": 2905, "type": "image/svg+xml" }, { "file": "images/icons/person_countour_sparks_mouth.svg", "size": 1807, "type": "image/svg+xml" }, { "file": "images/icons/waving_smiley.svg", "size": 1963, "type": "image/svg+xml" }, { "file": "images/icons/world_inside_speech_bubble.svg", "size": 1319, "type": "image/svg+xml" }, { "file": "learn/audio/.DS_Store", "size": 6148, "type": null }, { "file": "learn/audio/letter/i_name.mp4", "size": 39658, "type": "video/mp4" }, { "file": "learn/audio/letter/i_sound.mp4", "size": 39365, "type": "video/mp4" }],
  layout: ".svelte-kit/build/components/layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/letter\/translation\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return translation$3;
      })
    },
    {
      type: "page",
      pattern: /^\/letter\/([^/]+?)\/?$/,
      params: (m) => ({ letter: d(m[1]) }),
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/letter/[letter].svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/group\/translation\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return translation$1;
      })
    },
    {
      type: "page",
      pattern: /^\/group\/1\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/group/__layout.svelte", "src/routes/group/1.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/quiz\/group-1\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/quiz/group-1.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  serverFetch: hooks.serverFetch || fetch
});
var module_lookup = {
  ".svelte-kit/build/components/layout.svelte": () => Promise.resolve().then(function() {
    return layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/letter/[letter].svelte": () => Promise.resolve().then(function() {
    return _letter_;
  }),
  "src/routes/group/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  "src/routes/group/1.svelte": () => Promise.resolve().then(function() {
    return _1$1;
  }),
  "src/routes/quiz/group-1.svelte": () => Promise.resolve().then(function() {
    return group1;
  })
};
var metadata_lookup = { ".svelte-kit/build/components/layout.svelte": { "entry": "/./_app/layout.svelte-2bec0877.js", "css": [], "js": ["/./_app/layout.svelte-2bec0877.js", "/./_app/chunks/vendor-9b6486e5.js"], "styles": null }, ".svelte-kit/build/components/error.svelte": { "entry": "/./_app/error.svelte-af927b64.js", "css": [], "js": ["/./_app/error.svelte-af927b64.js", "/./_app/chunks/vendor-9b6486e5.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-620a28aa.js", "css": ["/./_app/assets/pages/index.svelte-b5598d9d.css", "/./_app/assets/white_button-b5b14d99.css"], "js": ["/./_app/pages/index.svelte-620a28aa.js", "/./_app/chunks/vendor-9b6486e5.js", "/./_app/chunks/white_button-1e3cd500.js", "/./_app/chunks/i18n-fd1e3d49.js"], "styles": null }, "src/routes/letter/[letter].svelte": { "entry": "/./_app/pages/letter/[letter].svelte-8fe9cb61.js", "css": ["/./_app/assets/pages/letter/[letter].svelte-d9cb1cca.css", "/./_app/assets/svg_letter-b4b33762.css", "/./_app/assets/yellow_button-4ae5d9cb.css"], "js": ["/./_app/pages/letter/[letter].svelte-8fe9cb61.js", "/./_app/chunks/vendor-9b6486e5.js", "/./_app/chunks/svg_letter-e94e2d8e.js", "/./_app/chunks/i18n-fd1e3d49.js", "/./_app/chunks/yellow_button-c2c91025.js"], "styles": null }, "src/routes/group/__layout.svelte": { "entry": "/./_app/pages/group/__layout.svelte-b083bde7.js", "css": ["/./_app/assets/pages/group/__layout.svelte-e0f7339b.css"], "js": ["/./_app/pages/group/__layout.svelte-b083bde7.js", "/./_app/chunks/vendor-9b6486e5.js"], "styles": null }, "src/routes/group/1.svelte": { "entry": "/./_app/pages/group/1.svelte-854d8f7b.js", "css": ["/./_app/assets/pages/group/1.svelte-1d2ab8e5.css", "/./_app/assets/white_button-b5b14d99.css", "/./_app/assets/svg_letter-b4b33762.css"], "js": ["/./_app/pages/group/1.svelte-854d8f7b.js", "/./_app/chunks/vendor-9b6486e5.js", "/./_app/chunks/i18n-fd1e3d49.js", "/./_app/chunks/white_button-1e3cd500.js", "/./_app/chunks/svg_letter-e94e2d8e.js"], "styles": null }, "src/routes/quiz/group-1.svelte": { "entry": "/./_app/pages/quiz/group-1.svelte-a2e0a08e.js", "css": ["/./_app/assets/pages/quiz/group-1.svelte-3a9c8582.css", "/./_app/assets/yellow_button-4ae5d9cb.css"], "js": ["/./_app/pages/quiz/group-1.svelte-a2e0a08e.js", "/./_app/chunks/vendor-9b6486e5.js", "/./_app/chunks/i18n-fd1e3d49.js", "/./_app/chunks/yellow_button-c2c91025.js"], "styles": null } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var translation$2 = {
  en: {
    "name": "Listen to the name",
    "sound": "Listen to the sound"
  },
  fa: {
    "name": "Listen to the name",
    "sound": "Listen to the sound"
  }
};
var translation$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": translation$2
});
var translation = {
  en: {
    "learn_the_letters": "Learn the letters.",
    "practice_their_sounds": "Practice listening to the letter sounds."
  }
};
var translation$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": translation
});
var Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
var layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Layout
});
function load$2({ error: error22, status }) {
  return { props: { error: error22, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error22 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<pre>${escape2(error22.message)}</pre>



${error22.frame ? `<pre>${escape2(error22.frame)}</pre>` : ``}
${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load: load$2
});
var css$j = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');.btn.svelte-1vvjo29{display:flex;align-items:center;position:relative;top:0px;box-sizing:border-box;width:100%;height:100%;box-shadow:0px 8px 0px 0px rgb(146, 146, 160);background:linear-gradient(180deg, rgb(236, 236, 252) 0%, rgb(222, 222, 230) 100%);;;border:4px solid #ffffff;border-radius:6px;font-family:'Patrick Hand', cursive;text-indent:0;display:inline-block;color:#000004;font-size:40px;text-align:center;transition:all 0.6s ease-out}.active.svelte-1vvjo29{position:relative;top:6px;box-shadow:0px 2px 0px 0px #60a83d;border:4px solid #fffd72;transition:all 0.6s ease-out}",
  map: `{"version":3,"file":"white_button.svelte","sources":["white_button.svelte"],"sourcesContent":["<script>\\n    export let active = false;\\n\\n<\/script>\\n\\n<div class=\\"btn\\" class:active=\\"{active}\\"><slot></slot></div>\\n\\n<style>\\n@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');\\n\\n.btn {\\n    display: flex;\\n    align-items: center;\\n\\n    position: relative;\\n    top: 0px;\\n\\n    box-sizing: border-box;\\n\\n    width: 100%;\\n    height: 100%;\\n\\n    box-shadow: 0px 8px 0px 0px rgb(146, 146, 160); /* #D7EAC3; */\\n\\n    background: linear-gradient(180deg, rgb(236, 236, 252) 0%, rgb(222, 222, 230) 100%);\\n\\n    /* background: linear-gradient(180deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%); */\\n; /* #7CB441; */\\n    border:4px solid #ffffff;\\n    border-radius: 6px;\\n\\n    font-family: 'Patrick Hand', cursive;\\n\\n    text-indent:0;\\n    /* border:1px solid #3B7A57; */\\n    display:inline-block;\\n    color:#000004;\\n    \\n    font-size:40px;\\n    text-align:center;\\n\\n    transition: all 0.6s ease-out;\\n}\\n\\n.active {\\n    position: relative;\\n    top: 6px;\\n    box-shadow: 0px 2px 0px 0px #60a83d;\\n    border:4px solid #fffd72;\\n    transition: all 0.6s ease-out;\\n    /* transition: all 2s ease-in-out 0s 1 forward both; */\\n    /*  border 0.5s ease-in-out 1s 1 forward both; */\\n    }\\n</style>"],"names":[],"mappings":"AAQA,QAAQ,IAAI,oEAAoE,CAAC,CAAC,AAElF,IAAI,eAAC,CAAC,AACF,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CAEnB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CAER,UAAU,CAAE,UAAU,CAEtB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CAEZ,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAE9C,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAGvF,CAAC,CACG,OAAO,GAAG,CAAC,KAAK,CAAC,OAAO,CACxB,aAAa,CAAE,GAAG,CAElB,WAAW,CAAE,cAAc,CAAC,CAAC,OAAO,CAEpC,YAAY,CAAC,CAEb,QAAQ,YAAY,CACpB,MAAM,OAAO,CAEb,UAAU,IAAI,CACd,WAAW,MAAM,CAEjB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AACjC,CAAC,AAED,OAAO,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,OAAO,CACnC,OAAO,GAAG,CAAC,KAAK,CAAC,OAAO,CACxB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AAG7B,CAAC"}`
};
var White_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$j);
  return `<div class="${["btn svelte-1vvjo29", active ? "active" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>`;
});
var subscriber_queue2 = [];
function readable(value, start) {
  return {
    subscribe: writable2(value, start).subscribe
  };
}
function writable2(value, start = noop2) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue2.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop2;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop2;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
var translations = {
  en: {
    "button.name": "Listen to the name",
    "button.sound": "Listen to the sound",
    "button.example": "Listen to a word",
    "group.learn_the_letters": "Learn the letters.",
    "group.practice_their_sounds": "Practice listening to the letter sounds.",
    "home.learn_the_alphabet": "Learn the alphabet."
  },
  fa: {
    "button.name": "Listen to the name",
    "button.sound": "Listen to the sound",
    "button.example": "Listen to a word",
    "group.learn_the_letters": "Learn the letters.",
    "group.practice_their_sounds": "Practice listening to the letter sounds.",
    "home.learn_the_alphabet": "\u0633\u0644\u0627\u0645"
  },
  ar: {
    "button.name": "Listen to the name",
    "button.sound": "Listen to the sound",
    "button.example": "Listen to a word",
    "group.learn_the_letters": "Learn the letters.",
    "group.practice_their_sounds": "Practice listening to the letter sounds.",
    "home.learn_the_alphabet": "\u0627\u0633\u0645"
  }
};
var locale = writable2("fa");
function translate(locale2, key, vars) {
  if (!key)
    throw new Error("no key provided to $t()");
  if (!locale2)
    throw new Error(`no translation for key "${key}"`);
  let text = translations[locale2][key];
  if (!text)
    throw new Error(`no translation found for ${locale2}.${key}`);
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });
  return text;
}
var t = derived(locale, ($locale) => (key, vars = {}) => translate($locale, key, vars));
function en(key, vars = {}) {
  return translate("en", key, vars);
}
var css$i = {
  code: ".grid.svelte-cghkt0{width:280px;display:grid;grid-template-columns:auto;background-color:#EDFDEE;grid-template-rows:60px 60px;border-color:#238031;border-radius:10px;border-style:solid;border-width:4px;padding:8px}.selected.svelte-cghkt0{background-color:#238031;color:#EDFDEE !important;border-style:solid;border-radius:6px;border-color:#238031}.text.svelte-cghkt0{font-family:Tahoma, Helvetica;color:#238031;font-size:36px;text-align:right;line-height:60px;padding-right:8px}.farsi.svelte-cghkt0{direction:rtl}.arabic.svelte-cghkt0{direction:rtl}",
  map: `{"version":3,"file":"big.svelte","sources":["big.svelte"],"sourcesContent":["<script>\\n    import {t, locale, locales} from \\"$lib/stores/i18n\\"\\n\\n    function setFa() {\\n        locale.set('fa')\\n    }\\n    function setAr() {\\n        locale.set('ar')\\n    }\\n\\n<\/script>\\n\\n<div class=\\"grid\\">\\n    <!-- <div class=\\"english\\" on:click=\\"{$locale='en'}\\">English</div> -->\\n    <div class=\\"farsi text\\" class:selected=\\"{$locale==='fa'}\\" on:click={setFa}>\u0641\u0627\u0631\u0633\u06CC</div> \\n    <div class=\\"arabic text\\" class:selected=\\"{$locale==='ar'}\\" on:click={setAr}>\u0639\u064E\u0631\u064E\u0628\u0650\u064A\u0651</div>\\n    <!-- \u0633\u0648\u0631\u064A\u0647 -->\\n</div>\\n\\n<style>\\n    .grid {\\n        width: 280px;\\n        display: grid;\\n        grid-template-columns: auto;\\n        background-color: #EDFDEE;\\n        grid-template-rows: 60px 60px;\\n        border-color: #238031;\\n        border-radius: 10px;\\n        border-style: solid;\\n        border-width: 4px;\\n        padding: 8px;\\n    }\\n    .selected {\\n        background-color: #238031;\\n        color: #EDFDEE !important;\\n        border-style: solid;\\n        border-radius: 6px;\\n        border-color: #238031;\\n        /* border-width: 4px; */\\n    }\\n    .text {\\n        font-family: Tahoma, Helvetica;\\n        color: #238031; /* seashell; */\\n        font-size: 36px;\\n        text-align: right;\\n        line-height: 60px;\\n        padding-right: 8px;\\n    }\\n    .farsi {\\n        direction: rtl;\\n    }\\n    .arabic {\\n        direction: rtl;\\n    }\\n</style>"],"names":[],"mappings":"AAoBI,KAAK,cAAC,CAAC,AACH,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAC3B,gBAAgB,CAAE,OAAO,CACzB,kBAAkB,CAAE,IAAI,CAAC,IAAI,CAC7B,YAAY,CAAE,OAAO,CACrB,aAAa,CAAE,IAAI,CACnB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,GAAG,CACjB,OAAO,CAAE,GAAG,AAChB,CAAC,AACD,SAAS,cAAC,CAAC,AACP,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,YAAY,CAAE,KAAK,CACnB,aAAa,CAAE,GAAG,CAClB,YAAY,CAAE,OAAO,AAEzB,CAAC,AACD,KAAK,cAAC,CAAC,AACH,WAAW,CAAE,MAAM,CAAC,CAAC,SAAS,CAC9B,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,GAAG,AACtB,CAAC,AACD,MAAM,cAAC,CAAC,AACJ,SAAS,CAAE,GAAG,AAClB,CAAC,AACD,OAAO,cAAC,CAAC,AACL,SAAS,CAAE,GAAG,AAClB,CAAC"}`
};
var Big = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $locale, $$unsubscribe_locale;
  $$unsubscribe_locale = subscribe(locale, (value) => $locale = value);
  $$result.css.add(css$i);
  $$unsubscribe_locale();
  return `<div class="${"grid svelte-cghkt0"}">
    <div class="${["farsi text svelte-cghkt0", $locale === "fa" ? "selected" : ""].join(" ").trim()}">\u0641\u0627\u0631\u0633\u06CC</div> 
    <div class="${["arabic text svelte-cghkt0", $locale === "ar" ? "selected" : ""].join(" ").trim()}">\u0639\u064E\u0631\u064E\u0628\u0650\u064A\u0651</div>
    
</div>`;
});
var css$h = {
  code: ".btn.svelte-76of49{display:flex;align-items:center;position:relative;top:0px;box-sizing:border-box;width:40px;height:40px;box-shadow:0px 4px 0px 0px #238031;background-color:#EDFDEE;border-style:solid;border-width:1.7px;border-color:#032436;border-radius:20px;transition:all 0.6s ease-out}.illustration.svelte-76of49{width:80%;height:auto;transform:translate(4px, 3px)\n}.active.svelte-76of49{position:relative;top:6px;box-shadow:0px 2px 0px 0px #60a83d;border:4px solid #fffd72;transition:all 0.6s ease-out}",
  map: `{"version":3,"file":"person_speaking.svelte","sources":["person_speaking.svelte"],"sourcesContent":["<script>\\n    let active;\\n<\/script>\\n\\n<div class=\\"btn\\" class:active=\\"{active}\\">            \\n    <img class=\\"illustration\\" src=\\"/images/icons/person_countour_sparks_mouth.svg\\" alt=\\"listen\\">\\n</div>\\n\\n<style>\\n.btn {\\n    display: flex;\\n    align-items: center;\\n\\n    position: relative;\\n    top: 0px;\\n\\n    box-sizing: border-box;\\n\\n    width: 40px;\\n    height: 40px;\\n\\n    box-shadow: 0px 4px 0px 0px #238031; /* #D7EAC3; */\\n\\n    background-color: #EDFDEE;\\n\\n    border-style: solid;\\n    border-width: 1.7px;\\n    border-color: #032436;\\n    border-radius: 20px;\\n\\n    /* font-family: 'Patrick Hand', cursive; */\\n\\n    /* border:1px solid #3B7A57; */\\n\\n    transition: all 0.6s ease-out;\\n}\\n.illustration {\\n    width: 80%;\\n    height: auto;\\n    transform: translate(4px, 3px)\\n}\\n\\n.active {\\n    position: relative;\\n    top: 6px;\\n    box-shadow: 0px 2px 0px 0px #60a83d;\\n    border:4px solid #fffd72;\\n    transition: all 0.6s ease-out;\\n    /* transition: all 2s ease-in-out 0s 1 forward both; */\\n    /*  border 0.5s ease-in-out 1s 1 forward both; */\\n}\\n</style>"],"names":[],"mappings":"AASA,IAAI,cAAC,CAAC,AACF,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CAEnB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CAER,UAAU,CAAE,UAAU,CAEtB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CAEZ,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,OAAO,CAEnC,gBAAgB,CAAE,OAAO,CAEzB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,OAAO,CACrB,aAAa,CAAE,IAAI,CAMnB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AACjC,CAAC,AACD,aAAa,cAAC,CAAC,AACX,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,GAAG,CAAC;AAClC,CAAC,AAED,OAAO,cAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,OAAO,CACnC,OAAO,GAAG,CAAC,KAAK,CAAC,OAAO,CACxB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AAGjC,CAAC"}`
};
var Person_speaking = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$h);
  return `<div class="${["btn svelte-76of49", ""].join(" ").trim()}"><img class="${"illustration svelte-76of49"}" src="${"/images/icons/person_countour_sparks_mouth.svg"}" alt="${"listen"}">
</div>`;
});
var css$g = {
  code: ".left-to-right.svelte-1gpnxu8{padding:2px 0px}.text.svelte-1gpnxu8{display:inline-block;color:#000004;font-size:32px;font-family:'Patrick Hand', cursive;text-align:center;line-height:50px}.spacer.svelte-1gpnxu8{display:inline-block;width:5px}.sound-button.svelte-1gpnxu8{display:inline-block}",
  map: `{"version":3,"file":"english_text.svelte","sources":["english_text.svelte"],"sourcesContent":["<script>\\n    import PersonSpeaking from \\"$lib/buttons/person_speaking.svelte\\";\\n    \\n    import { en } from \\"./stores/i18n\\";\\n\\n    export let sound = true;\\n    export let key = \\"\\";\\n    console.log(key)\\n    console.log(en(key))\\n<\/script>\\n\\n{#if sound}\\n<div class=\\"left-to-right\\">\\n    <div class=\\"text\\">{en(key)}</div>\\n    <div class=\\"spacer\\"></div>\\n    <div class=\\"sound-button\\"><PersonSpeaking></PersonSpeaking></div>\\n</div>\\n{/if}\\n<style>\\n\\n.left-to-right {\\n    padding: 2px 0px;\\n}\\n.text {\\n    display: inline-block;\\n    color: #000004;\\n    font-size: 32px;\\n    font-family: 'Patrick Hand', cursive;\\n    text-align: center;\\n    line-height: 50px;\\n}\\n.spacer {\\n    display: inline-block;\\n    width: 5px;\\n}\\n.sound-button {\\n    display: inline-block;\\n}\\n\\n</style>"],"names":[],"mappings":"AAoBA,cAAc,eAAC,CAAC,AACZ,OAAO,CAAE,GAAG,CAAC,GAAG,AACpB,CAAC,AACD,KAAK,eAAC,CAAC,AACH,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,cAAc,CAAC,CAAC,OAAO,CACpC,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,OAAO,eAAC,CAAC,AACL,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,GAAG,AACd,CAAC,AACD,aAAa,eAAC,CAAC,AACX,OAAO,CAAE,YAAY,AACzB,CAAC"}`
};
var English_text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sound = true } = $$props;
  let { key = "" } = $$props;
  console.log(key);
  console.log(en(key));
  if ($$props.sound === void 0 && $$bindings.sound && sound !== void 0)
    $$bindings.sound(sound);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  $$result.css.add(css$g);
  return `${sound ? `<div class="${"left-to-right svelte-1gpnxu8"}"><div class="${"text svelte-1gpnxu8"}">${escape2(en(key))}</div>
    <div class="${"spacer svelte-1gpnxu8"}"></div>
    <div class="${"sound-button svelte-1gpnxu8"}">${validate_component(Person_speaking, "PersonSpeaking").$$render($$result, {}, {}, {})}</div></div>` : ``}`;
});
var css$f = {
  code: ".right-to-left.svelte-18yaidc{margin:2px 0px;display:flex}.text.svelte-18yaidc{color:#000004;font-size:32px;font-family:'Patrick Hand', cursive;text-align:center;line-height:40px;margin-left:auto}.spacer.svelte-18yaidc{width:15px}",
  map: `{"version":3,"file":"learner_text.svelte","sources":["learner_text.svelte"],"sourcesContent":["<script>\\n    import PersonSpeaking from \\"$lib/buttons/person_speaking.svelte\\";\\n    \\n    import { t } from \\"./stores/i18n\\";\\n\\n    export let sound = true;\\n    export let key = \\"\\";\\n<\/script>\\n\\n{#if sound}\\n<div class=\\"right-to-left\\">\\n    <div class=\\"text\\">{$t(key)}</div>\\n    <div class=\\"spacer\\"></div>\\n    <PersonSpeaking></PersonSpeaking>\\n</div>\\n{/if}\\n<style>\\n.right-to-left {\\n    margin: 2px 0px;\\n    display:flex;\\n}\\n\\n.text {\\n    color: #000004;\\n    font-size: 32px;\\n    font-family: 'Patrick Hand', cursive;\\n    text-align: center;\\n    line-height: 40px;\\n\\n    margin-left: auto;\\n}\\n.spacer {\\n    width: 15px;\\n}\\n.sound-button {\\n    width: 40px;\\n    margin-left: auto;\\n}\\n\\n</style>"],"names":[],"mappings":"AAiBA,cAAc,eAAC,CAAC,AACZ,MAAM,CAAE,GAAG,CAAC,GAAG,CACf,QAAQ,IAAI,AAChB,CAAC,AAED,KAAK,eAAC,CAAC,AACH,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,cAAc,CAAC,CAAC,OAAO,CACpC,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,IAAI,CAEjB,WAAW,CAAE,IAAI,AACrB,CAAC,AACD,OAAO,eAAC,CAAC,AACL,KAAK,CAAE,IAAI,AACf,CAAC"}`
};
var Learner_text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { sound = true } = $$props;
  let { key = "" } = $$props;
  if ($$props.sound === void 0 && $$bindings.sound && sound !== void 0)
    $$bindings.sound(sound);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  $$result.css.add(css$f);
  $$unsubscribe_t();
  return `${sound ? `<div class="${"right-to-left svelte-18yaidc"}"><div class="${"text svelte-18yaidc"}">${escape2($t(key))}</div>
    <div class="${"spacer svelte-18yaidc"}"></div>
    ${validate_component(Person_speaking, "PersonSpeaking").$$render($$result, {}, {}, {})}</div>` : ``}`;
});
var css$e = {
  code: ".outer-grid.svelte-wwry3q{display:grid;place-items:center;padding:0px 15px;grid-template-columns:1fr 1fr 1fr;grid-template-rows:70px auto auto 70px 70px 70px auto;grid-gap:22px}.speech-bubble-world-div.svelte-wwry3q{grid-row:1 / 2;grid-column:2 / 3;height:100%;width:100%;text-align:center}.speech-bubble-world-svg.svelte-wwry3q{display:block;height:80px;width:auto;transform:translate(50%, 10px)}.pick-language-select.svelte-wwry3q{grid-row:2 / 3;grid-column:1 / 4}.learn-alphabet.svelte-wwry3q{width:auto;grid-row:3 / 4;grid-column:1 / 4}.group-1.svelte-wwry3q{width:90%;grid-row:4 / 5;grid-column:1 / 4}.group-2.svelte-wwry3q{width:90%;grid-row:5 / 6;grid-column:1 / 4}.group-3.svelte-wwry3q{width:90%;grid-row:6 / 7;grid-column:1 / 4}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\nimport White from '$lib/buttons/styles/white_button.svelte'\\nimport BigLanguageToggle from '$lib/language-toggle/big.svelte'\\nimport EnglishText from '$lib/english_text.svelte';\\nimport LearnerText from '$lib/learner_text.svelte';\\n<\/script>\\n\\n<body>\\n    <div class=\\"outer-grid\\">\\n        <div class=\\"speech-bubble-world-div\\"> \\n            <img class=\\"speech-bubble-world-svg\\" src=\\"/images/icons/world_inside_speech_bubble.svg\\" alt=\\"pick language\\">\\n        </div>\\n        <div class=\\"pick-language-select\\">\\n            <BigLanguageToggle />\\n        </div>\\n        <div class=\\"learn-alphabet\\">\\n            <div>\\n            <EnglishText key={\\"home.learn_the_alphabet\\"}></EnglishText>\\n            </div>\\n            <div>\\n            <LearnerText key={\\"home.learn_the_alphabet\\"}></LearnerText>\\n            </div>\\n        </div>\\n        <div class=\\"learn-alphabet-learner\\">\\n        </div>\\n        <a class=\\"group-1\\" href=\\"group/1\\">\\n            <White>s a t p i n</White>\\n        </a>\\n        <a class=\\"group-2\\" href=\\"group/2\\">\\n            <White>c k e h r m d</White>\\n        </a>\\n        <a class=\\"group-3\\" href=\\"group/3\\">\\n            <White>g o u l f b</White>\\n        </a>\\n\\n    </div>\\n</body>\\n\\n<style>\\n.outer-grid { \\n    display: grid;\\n    place-items: center;\\n    padding: 0px 15px;\\n    grid-template-columns: 1fr 1fr 1fr; \\n    grid-template-rows: 70px auto auto 70px 70px 70px auto;\\n    grid-gap: 22px;\\n}\\n\\n.speech-bubble-world-div {\\n    grid-row: 1 / 2;\\n    grid-column: 2 / 3;\\n    height: 100%;\\n    width: 100%;\\n    text-align: center;\\n}\\n.speech-bubble-world-svg {\\n    display: block;\\n    height: 80px;\\n    width: auto;\\n    transform: translate(50%, 10px);\\n}\\n\\n.pick-language-select {\\n    grid-row: 2 / 3;\\n    grid-column: 1 / 4;\\n}\\n\\n.learn-alphabet {\\n    width: auto;\\n    grid-row: 3 / 4;\\n    grid-column: 1 / 4;\\n}\\n\\n.group-1 {\\n    width: 90%;\\n    grid-row: 4 / 5;\\n    grid-column: 1 / 4;\\n}\\n.group-2 {\\n    width: 90%;\\n    grid-row: 5 / 6;\\n    grid-column: 1 / 4;\\n}\\n.group-3 {\\n    width: 90%;\\n    grid-row: 6 / 7;\\n    grid-column: 1 / 4;\\n}\\n</style>"],"names":[],"mappings":"AAuCA,WAAW,cAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,kBAAkB,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CACtD,QAAQ,CAAE,IAAI,AAClB,CAAC,AAED,wBAAwB,cAAC,CAAC,AACtB,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,wBAAwB,cAAC,CAAC,AACtB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,IAAI,CAAC,AACnC,CAAC,AAED,qBAAqB,cAAC,CAAC,AACnB,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AAED,eAAe,cAAC,CAAC,AACb,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AAED,QAAQ,cAAC,CAAC,AACN,KAAK,CAAE,GAAG,CACV,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AACD,QAAQ,cAAC,CAAC,AACN,KAAK,CAAE,GAAG,CACV,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AACD,QAAQ,cAAC,CAAC,AACN,KAAK,CAAE,GAAG,CACV,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC"}`
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$e);
  return `<body><div class="${"outer-grid svelte-wwry3q"}"><div class="${"speech-bubble-world-div svelte-wwry3q"}"><img class="${"speech-bubble-world-svg svelte-wwry3q"}" src="${"/images/icons/world_inside_speech_bubble.svg"}" alt="${"pick language"}"></div>
        <div class="${"pick-language-select svelte-wwry3q"}">${validate_component(Big, "BigLanguageToggle").$$render($$result, {}, {}, {})}</div>
        <div class="${"learn-alphabet svelte-wwry3q"}"><div>${validate_component(English_text, "EnglishText").$$render($$result, { key: "home.learn_the_alphabet" }, {}, {})}</div>
            <div>${validate_component(Learner_text, "LearnerText").$$render($$result, { key: "home.learn_the_alphabet" }, {}, {})}</div></div>
        <div class="${"learn-alphabet-learner"}"></div>
        <a class="${"group-1 svelte-wwry3q"}" href="${"group/1"}">${validate_component(White_button, "White").$$render($$result, {}, {}, { default: () => `s a t p i n` })}</a>
        <a class="${"group-2 svelte-wwry3q"}" href="${"group/2"}">${validate_component(White_button, "White").$$render($$result, {}, {}, { default: () => `c k e h r m d` })}</a>
        <a class="${"group-3 svelte-wwry3q"}" href="${"group/3"}">${validate_component(White_button, "White").$$render($$result, {}, {}, { default: () => `g o u l f b` })}</a></div>
</body>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css$d = {
  code: ".letter-svg.svelte-9ejz8g{height:100%}",
  map: '{"version":3,"file":"svg_letter.svelte","sources":["svg_letter.svelte"],"sourcesContent":["<script>\\n    export let letter;\\n<\/script>\\n\\n<object type=\\"image/svg+xml\\" data=\\"/alphabet/{letter}_lowercase.svg\\" class=\\"letter-svg\\" title=\\"letter\\">\\n    {letter}\\n</object>\\n\\n<style>\\n    .letter-svg {\\n        height: 100%;\\n    }\\n</style>"],"names":[],"mappings":"AASI,WAAW,cAAC,CAAC,AACT,MAAM,CAAE,IAAI,AAChB,CAAC"}'
};
var Svg_letter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { letter } = $$props;
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$d);
  return `<object type="${"image/svg+xml"}" data="${"/alphabet/" + escape2(letter) + "_lowercase.svg"}" class="${"letter-svg svelte-9ejz8g"}" title="${"letter"}">${escape2(letter)}
</object>`;
});
var css$c = {
  code: ".card.svelte-f5x567{height:66vw;position:relative;display:flex;align-items:center;align-items:center;border-radius:5px;background-color:#faf5f5;box-shadow:1px 1px 9px 0px #295d90;text-align:center}.outerlines.svelte-f5x567{position:absolute;top:20%;width:100%;height:60%;padding-right:0px;padding-bottom:0px;border-style:dashed solid;border-width:3px 0px;border-color:#9173ff #000 #9173ff;border-radius:0px;background-color:transparent;cursor:auto}.innerlines.svelte-f5x567{position:absolute;top:33%;bottom:33%;width:100%;height:34%;padding-right:0px;padding-bottom:0px;border-top:2.5px solid #9173ff;border-bottom:2.5px solid #9173ff}",
  map: '{"version":3,"file":"card.svelte","sources":["card.svelte"],"sourcesContent":["<script>\\n    import SvgLetter from \\"./svg_letter.svelte\\";\\n    export let letter;\\n<\/script>\\n\\n<div class=\\"card\\">\\n    <div class=\\"outerlines\\">\\n        <SvgLetter {letter}></SvgLetter>\\n        <div class=\\"innerlines\\"></div>\\n    </div>\\n</div>\\n\\n<style>\\n.svg {\\n    display: block;\\n\\n    z-index: 2;\\n    height: 100%;\\n    width: auto;\\n    margin: 0 auto;\\n}\\n\\n.card {\\n    height: 66vw;\\n    position: relative;\\n\\n    display: flex;\\n    align-items: center;\\n    \\n    align-items: center;\\n    border-radius: 5px;\\n    background-color: #faf5f5;\\n    box-shadow: 1px 1px 9px 0px #295d90;\\n    text-align: center;\\n}\\n\\n.outerlines {\\n    position: absolute;\\n    top: 20%;\\n    width: 100%;\\n    height: 60%;\\n    padding-right: 0px;\\n    padding-bottom: 0px;\\n    border-style: dashed solid;\\n    border-width: 3px 0px;\\n    border-color: #9173ff #000 #9173ff;\\n    border-radius: 0px;\\n    background-color: transparent;\\n    cursor: auto;\\n}\\n\\n.innerlines {\\n    position: absolute;\\n    top: 33%;\\n    bottom: 33%;\\n    width: 100%;\\n    height: 34%;\\n    padding-right: 0px;\\n    padding-bottom: 0px;\\n    border-top: 2.5px solid #9173ff;\\n    border-bottom: 2.5px solid #9173ff;\\n}\\n\\n</style>"],"names":[],"mappings":"AAsBA,KAAK,cAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAElB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CAEnB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,GAAG,CAClB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,OAAO,CACnC,UAAU,CAAE,MAAM,AACtB,CAAC,AAED,WAAW,cAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,GAAG,CAClB,cAAc,CAAE,GAAG,CACnB,YAAY,CAAE,MAAM,CAAC,KAAK,CAC1B,YAAY,CAAE,GAAG,CAAC,GAAG,CACrB,YAAY,CAAE,OAAO,CAAC,IAAI,CAAC,OAAO,CAClC,aAAa,CAAE,GAAG,CAClB,gBAAgB,CAAE,WAAW,CAC7B,MAAM,CAAE,IAAI,AAChB,CAAC,AAED,WAAW,cAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,GAAG,CAClB,cAAc,CAAE,GAAG,CACnB,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,OAAO,CAC/B,aAAa,CAAE,KAAK,CAAC,KAAK,CAAC,OAAO,AACtC,CAAC"}'
};
var Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { letter } = $$props;
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$c);
  return `<div class="${"card svelte-f5x567"}"><div class="${"outerlines svelte-f5x567"}">${validate_component(Svg_letter, "SvgLetter").$$render($$result, { letter }, {}, {})}
        <div class="${"innerlines svelte-f5x567"}"></div></div>
</div>`;
});
var css$b = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');.btn.svelte-17zk73a{display:flex;align-items:center;position:relative;top:0px;box-sizing:border-box;width:100%;height:100%;min-height:70px;box-shadow:0px 8px 0px 1px #c2b56f;background-color:#fff09d;border:4px solid #fff09d;border-radius:6px;font-family:'Patrick Hand', cursive;text-indent:0;display:inline-block;color:#000004;font-size:30px;text-align:center;transition:all 0.6s ease-out}.active.svelte-17zk73a{position:relative;top:6px;box-shadow:0px 2px 0px 0px #aca162;background-color:#f5e797;border:4px solid #ebdd91;transition:top 0.4s ease-out;transition:all 0.6s ease-out}",
  map: `{"version":3,"file":"yellow_button.svelte","sources":["yellow_button.svelte"],"sourcesContent":["<script>\\n    export let active = false;\\n\\n<\/script>\\n\\n<div class=\\"btn\\" class:active=\\"{active}\\"><slot></slot></div>\\n\\n<style>\\n@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');\\n\\n.btn {\\n    display: flex;\\n    align-items: center;\\n\\n    position: relative;\\n    top: 0px;\\n\\n    box-sizing: border-box;\\n\\n    width: 100%;\\n    height: 100%;\\n    min-height: 70px;\\n\\n    box-shadow: 0px 8px 0px 1px #c2b56f; /*  #D7EAC3; */\\n\\n    background-color:  #fff09d; /* #7CB441; */\\n    border:4px solid #fff09d;\\n    border-radius: 6px;\\n\\n    font-family: 'Patrick Hand', cursive;\\n\\n    text-indent:0;\\n    /* border:1px solid #3B7A57; */\\n    display:inline-block;\\n    color:#000004;\\n    \\n    font-size:  30px;\\n    text-align: center;\\n\\n    transition: all 0.6s ease-out;\\n}\\n\\n.active {\\n    position: relative;\\n    top: 6px;\\n    box-shadow: 0px 2px 0px 0px #aca162;\\n    background-color:  #f5e797; /* #7CB441; */\\n\\n    border:4px solid #ebdd91;\\n    transition: top 0.4s ease-out;\\n    transition: all 0.6s ease-out;\\n    /* transition: all 2s ease-in-out 0s 1 forward both; */\\n    /*  border 0.5s ease-in-out 1s 1 forward both; */\\n    }\\n</style>"],"names":[],"mappings":"AAQA,QAAQ,IAAI,oEAAoE,CAAC,CAAC,AAElF,IAAI,eAAC,CAAC,AACF,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CAEnB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CAER,UAAU,CAAE,UAAU,CAEtB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAEhB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,OAAO,CAEnC,gBAAgB,CAAG,OAAO,CAC1B,OAAO,GAAG,CAAC,KAAK,CAAC,OAAO,CACxB,aAAa,CAAE,GAAG,CAElB,WAAW,CAAE,cAAc,CAAC,CAAC,OAAO,CAEpC,YAAY,CAAC,CAEb,QAAQ,YAAY,CACpB,MAAM,OAAO,CAEb,SAAS,CAAG,IAAI,CAChB,UAAU,CAAE,MAAM,CAElB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AACjC,CAAC,AAED,OAAO,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,OAAO,CACnC,gBAAgB,CAAG,OAAO,CAE1B,OAAO,GAAG,CAAC,KAAK,CAAC,OAAO,CACxB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,CAC7B,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AAG7B,CAAC"}`
};
var Yellow_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$b);
  return `<div class="${["btn svelte-17zk73a", active ? "active" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>`;
});
var css$a = {
  code: ".grid.svelte-18n4c6t>div.svelte-18n4c6t{text-align:center}.illustration.svelte-18n4c6t.svelte-18n4c6t{display:block;position:absolute;top:50%;height:80%;width:auto;transform:translate(-50%, -50%)}.grid.svelte-18n4c6t.svelte-18n4c6t{height:100%;display:grid;place-items:center;grid-template-columns:2fr 1fr}",
  map: `{"version":3,"file":"sound.svelte","sources":["sound.svelte"],"sourcesContent":["<script>\\n    export let letter;\\n    import { t, locale, locales } from \\"$lib/stores/i18n\\";\\n    import Yellow from '../styles/yellow_button.svelte';\\n    let audio;\\n    let active;\\n\\n    function pressSound() {\\n        if (active === true) {return}\\n        active = true\\n        let source = \\"audio/letter/\\" + letter.toString() + \\"_sound.mp4\\"\\n        console.log(source)\\n        audio.src = source\\n        audio.play()\\n        return\\n    }\\n    function audioEnded() {\\n        active = false\\n    }\\n<\/script>\\n\\n<Yellow {active}>\\n    <div class=\\"grid\\" on:click={pressSound}>\\n        <div class=\\"text\\">{$t(\\"button.sound\\")}</div>\\n        <div class=\\"picture\\"><img class=\\"illustration\\" src=\\"/images/ear.svg\\" alt=\\"ear\\"></div>\\n    </div>\\n</Yellow>\\n\\n<audio\\n  style=\\"display:none;\\"\\n  bind:this=\\"{audio}\\"\\n  on:ended=\\"{audioEnded}\\"\\n  volume=\\"0.8\\"\\n  controls\\n><track kind=\\"captions\\" /></audio>\\n\\n<style>\\n.grid > div {\\n    text-align: center;\\n}\\n.illustration {\\n    display: block;\\n    position: absolute;\\n    top: 50%;\\n    height: 80%;\\n    width: auto;\\n    transform: translate(-50%, -50%);\\n}\\n.grid {\\n    height: 100%;\\n    display: grid;\\n    place-items: center;\\n    grid-template-columns: 2fr 1fr; \\n}\\n</style>"],"names":[],"mappings":"AAqCA,oBAAK,CAAG,GAAG,eAAC,CAAC,AACT,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,aAAa,8BAAC,CAAC,AACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,AACpC,CAAC,AACD,KAAK,8BAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,qBAAqB,CAAE,GAAG,CAAC,GAAG,AAClC,CAAC"}`
};
var Sound = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { letter } = $$props;
  let audio;
  let active;
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$a);
  $$unsubscribe_t();
  return `${validate_component(Yellow_button, "Yellow").$$render($$result, { active }, {}, {
    default: () => `<div class="${"grid svelte-18n4c6t"}"><div class="${"text svelte-18n4c6t"}">${escape2($t("button.sound"))}</div>
        <div class="${"picture svelte-18n4c6t"}"><img class="${"illustration svelte-18n4c6t"}" src="${"/images/ear.svg"}" alt="${"ear"}"></div></div>`
  })}

<audio style="${"display:none;"}" volume="${"0.8"}" controls${add_attribute("this", audio, 1)}><track kind="${"captions"}"></audio>`;
});
var css$9 = {
  code: ".grid.svelte-18jp632>div.svelte-18jp632{text-align:center}.illustration.svelte-18jp632.svelte-18jp632{display:block;position:absolute;top:50%;height:100%;width:auto;transform:translate(-50%, -50%)}.grid.svelte-18jp632.svelte-18jp632{height:100%;display:grid;place-items:center;grid-template-columns:2fr 1fr}",
  map: `{"version":3,"file":"name.svelte","sources":["name.svelte"],"sourcesContent":["<script>\\n    export let letter;\\n    import { t, locale, locales } from \\"$lib/stores/i18n\\";\\n    import Yellow from '../styles/yellow_button.svelte';\\n    let audio;\\n    let active;\\n\\n    function pressSound() {\\n        if (active === true) {return}\\n        active = true\\n        let source = \\"audio/letter/\\" + letter.toString() + \\"_name.mp4\\"\\n        console.log(source)\\n        audio.src = source\\n        audio.play()\\n        return\\n    }\\n    function audioEnded() {\\n        active = false\\n    }\\n<\/script>\\n\\n<Yellow {active}>\\n    <div class=\\"grid\\" on:click={pressSound}>\\n        <div class=\\"text\\">{$t(\\"button.name\\")}</div>\\n        <div class=\\"picture\\"><img class=\\"illustration\\" src=\\"/images/nametag.svg\\" alt=\\"ear\\"></div>\\n    </div>\\n</Yellow>\\n\\n<audio\\n  style=\\"display:none;\\"\\n  bind:this=\\"{audio}\\"\\n  on:ended=\\"{audioEnded}\\"\\n  volume=\\"0.8\\"\\n  controls\\n><track kind=\\"captions\\" /></audio>\\n\\n<style>\\n.grid > div {\\n    text-align: center;\\n}\\n.illustration {\\n    display: block;\\n    position: absolute;\\n    top: 50%;\\n    height: 100%;\\n    width: auto;\\n    transform: translate(-50%, -50%);\\n}\\n.grid {\\n    height: 100%;\\n    display: grid;\\n    place-items: center;\\n    grid-template-columns: 2fr 1fr; \\n}\\n</style>"],"names":[],"mappings":"AAqCA,oBAAK,CAAG,GAAG,eAAC,CAAC,AACT,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,aAAa,8BAAC,CAAC,AACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,AACpC,CAAC,AACD,KAAK,8BAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,qBAAqB,CAAE,GAAG,CAAC,GAAG,AAClC,CAAC"}`
};
var Name = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { letter } = $$props;
  let audio;
  let active;
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$9);
  $$unsubscribe_t();
  return `${validate_component(Yellow_button, "Yellow").$$render($$result, { active }, {}, {
    default: () => `<div class="${"grid svelte-18jp632"}"><div class="${"text svelte-18jp632"}">${escape2($t("button.name"))}</div>
        <div class="${"picture svelte-18jp632"}"><img class="${"illustration svelte-18jp632"}" src="${"/images/nametag.svg"}" alt="${"ear"}"></div></div>`
  })}

<audio style="${"display:none;"}" volume="${"0.8"}" controls${add_attribute("this", audio, 1)}><track kind="${"captions"}"></audio>`;
});
var css$8 = {
  code: ".grid.svelte-j1y149{display:grid;place-items:center;grid-template-columns:2fr 1fr}",
  map: `{"version":3,"file":"example.svelte","sources":["example.svelte"],"sourcesContent":["<script>\\n    export let letter;\\n    import { t, locale, locales } from \\"$lib/stores/i18n\\";\\n    import Yellow from '../styles/yellow_button.svelte';\\n    let audio;\\n    let active;\\n\\n    function pressSound() {\\n        if (active === true) {return}\\n        active = true\\n        let source = \\"audio/letter/\\" + letter.toString() + \\"_example.mp4\\"\\n        console.log(source)\\n        audio.src = source\\n        audio.play()\\n        return\\n    }\\n    function audioEnded() {\\n        active = false\\n    }\\n<\/script>\\n\\n<Yellow {active}>\\n    <div class=\\"grid\\" on:click={pressSound}>\\n        <div class=\\"text\\">{$t(\\"button.example\\")}</div>\\n        <span class=\\"symbol\\"></span>\\n    </div>\\n</Yellow>\\n\\n<audio\\n  style=\\"display:none;\\"\\n  bind:this=\\"{audio}\\"\\n  on:ended=\\"{audioEnded}\\"\\n  volume=\\"0.8\\"\\n  controls\\n><track kind=\\"captions\\" /></audio>\\n\\n<style>\\n.grid {\\n    display: grid;\\n    place-items: center;\\n    grid-template-columns: 2fr 1fr; \\n}\\n</style>"],"names":[],"mappings":"AAqCA,KAAK,cAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,qBAAqB,CAAE,GAAG,CAAC,GAAG,AAClC,CAAC"}`
};
var Example = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { letter } = $$props;
  let audio;
  let active;
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$8);
  $$unsubscribe_t();
  return `${validate_component(Yellow_button, "Yellow").$$render($$result, { active }, {}, {
    default: () => `<div class="${"grid svelte-j1y149"}"><div class="${"text"}">${escape2($t("button.example"))}</div>
        <span class="${"symbol"}"></span></div>`
  })}

<audio style="${"display:none;"}" volume="${"0.8"}" controls${add_attribute("this", audio, 1)}><track kind="${"captions"}"></audio>`;
});
var css$7 = {
  code: ".outer-grid.svelte-1cl1c1i{display:grid;padding:0px 12px;grid-template-columns:1fr 1fr 1fr;grid-template-rows:3fr 1fr 1fr 1fr;grid-gap:24px;padding-bottom:20px;width:100vw;height:100vh}.letter-card.svelte-1cl1c1i{grid-row:2 / 3;grid-column:1 / 4}.name-button.svelte-1cl1c1i{grid-row:3 / 4;grid-column:1 / 4}.sound-button.svelte-1cl1c1i{grid-row:4 / 5;grid-column:1 / 4}.example-button.svelte-1cl1c1i{grid-row:5 / 6;grid-column:1 / 4}",
  map: '{"version":3,"file":"[letter].svelte","sources":["[letter].svelte"],"sourcesContent":["<script context=\\"module\\">\\n    export async function load({ page }) {\\n        let letter = page.params.letter\\n        return { props: {letter} }\\n    }\\n<\/script>\\n\\n<script>\\n    import Card from \\"$lib/card.svelte\\"\\n    import Sound from \\"$lib/buttons/letter/sound.svelte\\"\\n    import Name from \\"$lib/buttons/letter/name.svelte\\"\\n    import Example from \\"$lib/buttons/letter/example.svelte\\"\\n\\n    export let letter\\n<\/script>\\n\\n<div class=\\"outer-grid\\"> \\n    <div class=\\"letter-card\\"><Card {letter} /></div>\\n    <div class=\\"name-button\\"><Sound {letter} /></div>\\n    <div class=\\"sound-button\\"><Name {letter} /></div>\\n    <div class=\\"example-button\\"><Example {letter} /></div>\\n</div>\\n    \\n    <style>\\n    .outer-grid { \\n        display: grid;\\n        padding: 0px 12px;\\n        grid-template-columns: 1fr 1fr 1fr; \\n        grid-template-rows: 3fr 1fr 1fr 1fr;\\n        grid-gap: 24px;\\n\\n        padding-bottom: 20px;\\n\\n        width: 100vw;\\n        height: 100vh;\\n    }\\n    .letter-card {\\n        grid-row: 2 / 3;\\n        grid-column: 1 / 4;\\n    }\\n    .name-button {\\n        grid-row: 3 / 4;\\n        grid-column: 1 / 4;\\n    }\\n    .sound-button {\\n        grid-row: 4 / 5;\\n        grid-column: 1 / 4;\\n    }\\n    .example-button {\\n        grid-row: 5 / 6;\\n        grid-column: 1 / 4;\\n    }\\n    </style>"],"names":[],"mappings":"AAwBI,WAAW,eAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CACnC,QAAQ,CAAE,IAAI,CAEd,cAAc,CAAE,IAAI,CAEpB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACjB,CAAC,AACD,YAAY,eAAC,CAAC,AACV,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AACD,YAAY,eAAC,CAAC,AACV,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AACD,aAAa,eAAC,CAAC,AACX,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AACD,eAAe,eAAC,CAAC,AACb,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC"}'
};
async function load$1({ page }) {
  let letter = page.params.letter;
  return { props: { letter } };
}
var U5Bletteru5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { letter } = $$props;
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$7);
  return `<div class="${"outer-grid svelte-1cl1c1i"}"><div class="${"letter-card svelte-1cl1c1i"}">${validate_component(Card, "Card").$$render($$result, { letter }, {}, {})}</div>
    <div class="${"name-button svelte-1cl1c1i"}">${validate_component(Sound, "Sound").$$render($$result, { letter }, {}, {})}</div>
    <div class="${"sound-button svelte-1cl1c1i"}">${validate_component(Name, "Name").$$render($$result, { letter }, {}, {})}</div>
    <div class="${"example-button svelte-1cl1c1i"}">${validate_component(Example, "Example").$$render($$result, { letter }, {}, {})}</div>
</div>`;
});
var _letter_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bletteru5D,
  load: load$1
});
var css$6 = {
  code: ".header-bar.svelte-1e25q7m{position:fixed;top:0px;left:0px;right:0px;height:70px;background-color:White}",
  map: '{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<div class=\\"header-bar\\">\\n\\n</div>\\n\\n<slot></slot>\\n\\n<style>\\n.header-bar {\\n    position: fixed;\\n    top: 0px;\\n    left: 0px;\\n    right: 0px;\\n    height: 70px;\\n\\n    background-color: White;\\n}\\n</style>\\n"],"names":[],"mappings":"AAOA,WAAW,eAAC,CAAC,AACT,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CAEZ,gBAAgB,CAAE,KAAK,AAC3B,CAAC"}'
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<div class="${"header-bar svelte-1e25q7m"}"></div>

${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
var css$5 = {
  code: ".grid.svelte-mr9efu>div.svelte-mr9efu{height:100%;width:100%;text-align:center}.illustration.svelte-mr9efu.svelte-mr9efu{display:block;position:absolute;height:100%;width:auto;transform:translate(16%, 9%)}.grid.svelte-mr9efu.svelte-mr9efu{height:100%;display:grid;place-items:center;grid-template-columns:1fr 1fr 1fr}",
  map: `{"version":3,"file":"listen_and_pick.svelte","sources":["listen_and_pick.svelte"],"sourcesContent":["<script>\\n\\timport White from './styles/white_button.svelte';\\n\\n    export let letter;\\n<\/script>\\n<White>\\n    <div class=\\"grid\\">\\n        <div class=\\"illustration-1\\">\\n            <img class=\\"illustration\\" src=\\"/images/whisper.svg\\" alt=\\"whisper\\">\\n        </div>\\n        <div class=\\"illustration-2\\">\\n            <img class=\\"illustration\\" src=\\"/images/listen.svg\\" alt=\\"listen\\">\\n        </div>\\n        <div class=\\"illustration-3\\">\\n            <img class=\\"illustration\\" src=\\"/images/pick.svg\\" alt=\\"pick\\">\\n        </div>\\n    </div>\\n</White>\\n\\n<style>\\n.grid > div {\\n    height: 100%;\\n    width: 100%;\\n    text-align: center;\\n}\\n.illustration {\\n    display: block;\\n    position: absolute;\\n    height: 100%;\\n    width: auto;\\n    transform: translate(16%, 9%);\\n}\\n/* .illustration {\\n    display: block;\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    height: 100%;\\n    width: auto;\\n    transform: translate(-50%, -50%);\\n} */\\n.grid {\\n    height: 100%;\\n    display: grid;\\n    place-items: center;\\n    grid-template-columns: 1fr 1fr 1fr; \\n}\\n</style>"],"names":[],"mappings":"AAoBA,mBAAK,CAAG,GAAG,cAAC,CAAC,AACT,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,AACtB,CAAC,AACD,aAAa,4BAAC,CAAC,AACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,UAAU,GAAG,CAAC,CAAC,EAAE,CAAC,AACjC,CAAC,AAUD,KAAK,4BAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,AACtC,CAAC"}`
};
var Listen_and_pick = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { letter } = $$props;
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$5);
  return `${validate_component(White_button, "White").$$render($$result, {}, {}, {
    default: () => `<div class="${"grid svelte-mr9efu"}"><div class="${"illustration-1 svelte-mr9efu"}"><img class="${"illustration svelte-mr9efu"}" src="${"/images/whisper.svg"}" alt="${"whisper"}"></div>
        <div class="${"illustration-2 svelte-mr9efu"}"><img class="${"illustration svelte-mr9efu"}" src="${"/images/listen.svg"}" alt="${"listen"}"></div>
        <div class="${"illustration-3 svelte-mr9efu"}"><img class="${"illustration svelte-mr9efu"}" src="${"/images/pick.svg"}" alt="${"pick"}"></div></div>`
  })}`;
});
var css$4 = {
  code: ".outer-grid.svelte-1xexo3m{display:grid;padding:0px 15px;grid-template-columns:1fr 1fr 1fr;grid-template-rows:70px auto auto auto auto auto;grid-gap:24px}p.svelte-1xexo3m{font-family:'Patrick Hand', cursive;font-size:32px;margin:0px;margin-bottom:-14px}.text-1.svelte-1xexo3m{grid-row:2 / 3;grid-column:1 / 4}.s.svelte-1xexo3m{grid-row:3 / 4;grid-column:1 / 2;aspect-ratio:1}.a.svelte-1xexo3m{grid-row:3 / 4;grid-column:2 / 3}.t.svelte-1xexo3m{grid-row:3 / 4;grid-column:3 / 4}.p.svelte-1xexo3m{grid-row:4 / 5;grid-column:1 / 2;aspect-ratio:1}.i.svelte-1xexo3m{grid-row:4 / 5;grid-column:2 / 3}.n.svelte-1xexo3m{grid-row:4 / 5;grid-column:3 / 4}.text-2.svelte-1xexo3m{grid-row:5 / 6;grid-column:1 / 4}.quiz-test.svelte-1xexo3m{grid-row:6 / 7;grid-column:1 / 4;aspect-ratio:3.3}",
  map: `{"version":3,"file":"1.svelte","sources":["1.svelte"],"sourcesContent":["<script>\\n    import { t, locale, locales } from \\"$lib/stores/i18n\\";\\n\\n    import White from '$lib/buttons/styles/white_button.svelte'\\n    import SvgLetter from \\"$lib/svg_letter.svelte\\";\\n    import ListenAndPick from '$lib/buttons/listen_and_pick.svelte'\\n\\nimport { group_outros } from \\"svelte/internal\\";\\n<\/script>\\n\\n<div class=\\"outer-grid\\">\\n    <p class=\\"text-1\\">{$t(\\"group.learn_the_letters\\")}</p>\\n\\n    <a class=\\"s\\" href=\\"/letter/s\\"><White><SvgLetter letter=\\"s\\"></SvgLetter>\\n    </White></a>\\n    <a class=\\"a\\" href=\\"/letter/a\\"><White>a</White></a>\\n    <a class=\\"t\\" href=\\"/letter/t\\"><White>t</White></a>\\n\\n    <a class=\\"p\\" href=\\"/letter/p\\"><White>p</White></a>\\n    <a class=\\"i\\" href=\\"/letter/i\\"><White>i</White></a>\\n    <a class=\\"n\\" href=\\"/letter/n\\"><White>n</White></a>\\n\\n    <p class=\\"text-2\\">{$t(\\"group.practice_their_sounds\\")}</p>\\n    <a class=\\"quiz-test\\" href=\\"/quiz/group-1\\"><ListenAndPick></ListenAndPick></a>\\n</div>\\n\\n<style>\\n    .outer-grid { \\n        display: grid;\\n        padding: 0px 15px;\\n        grid-template-columns: 1fr 1fr 1fr; \\n        grid-template-rows: 70px auto auto auto auto auto;\\n        grid-gap: 24px;\\n    }\\n\\n    p {\\n        font-family: 'Patrick Hand', cursive;\\n        font-size: 32px;\\n        margin: 0px;\\n        margin-bottom: -14px;\\n    }\\n    \\n    .text-1 {\\n        grid-row: 2 / 3;\\n        grid-column: 1 / 4;      \\n    }\\n\\n    .s {\\n        grid-row: 3 / 4;\\n        grid-column: 1 / 2;\\n        aspect-ratio: 1;\\n    }\\n    .a {\\n        grid-row: 3 / 4;\\n        grid-column: 2 / 3;\\n    }\\n    .t {\\n        grid-row: 3 / 4;\\n        grid-column: 3 / 4;\\n    }\\n\\n    .p {\\n        grid-row: 4 / 5;\\n        grid-column: 1 / 2;\\n        aspect-ratio: 1;\\n    }\\n    .i {\\n        grid-row: 4 / 5;\\n        grid-column: 2 / 3;\\n    }\\n    .n {\\n        grid-row: 4 / 5;\\n        grid-column: 3 / 4;\\n    }\\n\\n    .text-2 {\\n        grid-row: 5 / 6;\\n        grid-column: 1 / 4;      \\n    }\\n\\n    .quiz-test {\\n        grid-row: 6 / 7;\\n        grid-column: 1 / 4;   \\n        aspect-ratio: 3.3;\\n    }\\n    </style>"],"names":[],"mappings":"AA2BI,WAAW,eAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,kBAAkB,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CACjD,QAAQ,CAAE,IAAI,AAClB,CAAC,AAED,CAAC,eAAC,CAAC,AACC,WAAW,CAAE,cAAc,CAAC,CAAC,OAAO,CACpC,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,KAAK,AACxB,CAAC,AAED,OAAO,eAAC,CAAC,AACL,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AAED,EAAE,eAAC,CAAC,AACA,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,YAAY,CAAE,CAAC,AACnB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AAED,EAAE,eAAC,CAAC,AACA,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,YAAY,CAAE,CAAC,AACnB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AACD,EAAE,eAAC,CAAC,AACA,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AAED,OAAO,eAAC,CAAC,AACL,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,AACtB,CAAC,AAED,UAAU,eAAC,CAAC,AACR,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,YAAY,CAAE,GAAG,AACrB,CAAC"}`
};
var _1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  $$result.css.add(css$4);
  $$unsubscribe_t();
  return `<div class="${"outer-grid svelte-1xexo3m"}"><p class="${"text-1 svelte-1xexo3m"}">${escape2($t("group.learn_the_letters"))}</p>

    <a class="${"s svelte-1xexo3m"}" href="${"/letter/s"}">${validate_component(White_button, "White").$$render($$result, {}, {}, {
    default: () => `${validate_component(Svg_letter, "SvgLetter").$$render($$result, { letter: "s" }, {}, {})}`
  })}</a>
    <a class="${"a svelte-1xexo3m"}" href="${"/letter/a"}">${validate_component(White_button, "White").$$render($$result, {}, {}, { default: () => `a` })}</a>
    <a class="${"t svelte-1xexo3m"}" href="${"/letter/t"}">${validate_component(White_button, "White").$$render($$result, {}, {}, { default: () => `t` })}</a>

    <a class="${"p svelte-1xexo3m"}" href="${"/letter/p"}">${validate_component(White_button, "White").$$render($$result, {}, {}, { default: () => `p` })}</a>
    <a class="${"i svelte-1xexo3m"}" href="${"/letter/i"}">${validate_component(White_button, "White").$$render($$result, {}, {}, { default: () => `i` })}</a>
    <a class="${"n svelte-1xexo3m"}" href="${"/letter/n"}">${validate_component(White_button, "White").$$render($$result, {}, {}, { default: () => `n` })}</a>

    <p class="${"text-2 svelte-1xexo3m"}">${escape2($t("group.practice_their_sounds"))}</p>
    <a class="${"quiz-test svelte-1xexo3m"}" href="${"/quiz/group-1"}">${validate_component(Listen_and_pick, "ListenAndPick").$$render($$result, {}, {}, {})}</a>
</div>`;
});
var _1$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _1
});
var css$3 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');.btn.svelte-1w1f637{display:flex;align-items:center;position:relative;top:0px;box-sizing:border-box;width:100%;height:100%;box-shadow:0px 8px 0px 0px #032436;background:linear-gradient(180deg, rgb(42, 190, 86) 0%, rgb(50, 223, 102));border:4px solid #ffffff;border-radius:6px;font-family:'Patrick Hand', cursive;text-indent:0;display:inline-block;color:#000004;font-size:40px;text-align:center;transition:all 0.6s ease-out}.active.svelte-1w1f637{position:relative;top:6px;box-shadow:0px 2px 0px 0px #60a83d;border:4px solid #fffd72;transition:all 0.6s ease-out}",
  map: `{"version":3,"file":"green_button.svelte","sources":["green_button.svelte"],"sourcesContent":["<script>\\n    export let active = false;\\n\\n<\/script>\\n\\n<div class=\\"btn\\" class:active=\\"{active}\\"><slot></slot></div>\\n\\n<style>\\n@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');\\n\\n.btn {\\n    display: flex;\\n    align-items: center;\\n\\n    position: relative;\\n    top: 0px;\\n\\n    box-sizing: border-box;\\n\\n    width: 100%;\\n    height: 100%;\\n\\n    box-shadow: 0px 8px 0px 0px #032436; /* #D7EAC3; */\\n\\n    background: linear-gradient(180deg, rgb(42, 190, 86) 0%, rgb(50, 223, 102));\\n\\n    border:4px solid #ffffff;\\n    border-radius: 6px;\\n\\n    font-family: 'Patrick Hand', cursive;\\n\\n    text-indent:0;\\n    /* border:1px solid #3B7A57; */\\n    display:inline-block;\\n    color:#000004;\\n    \\n    font-size:40px;\\n    text-align:center;\\n\\n    transition: all 0.6s ease-out;\\n}\\n\\n.active {\\n    position: relative;\\n    top: 6px;\\n    box-shadow: 0px 2px 0px 0px #60a83d;\\n    border:4px solid #fffd72;\\n    transition: all 0.6s ease-out;\\n    /* transition: all 2s ease-in-out 0s 1 forward both; */\\n    /*  border 0.5s ease-in-out 1s 1 forward both; */\\n    }\\n</style>"],"names":[],"mappings":"AAQA,QAAQ,IAAI,oEAAoE,CAAC,CAAC,AAElF,IAAI,eAAC,CAAC,AACF,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CAEnB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CAER,UAAU,CAAE,UAAU,CAEtB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CAEZ,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,OAAO,CAEnC,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,IAAI,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAE3E,OAAO,GAAG,CAAC,KAAK,CAAC,OAAO,CACxB,aAAa,CAAE,GAAG,CAElB,WAAW,CAAE,cAAc,CAAC,CAAC,OAAO,CAEpC,YAAY,CAAC,CAEb,QAAQ,YAAY,CACpB,MAAM,OAAO,CAEb,UAAU,IAAI,CACd,WAAW,MAAM,CAEjB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AACjC,CAAC,AAED,OAAO,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,OAAO,CACnC,OAAO,GAAG,CAAC,KAAK,CAAC,OAAO,CACxB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,QAAQ,AAG7B,CAAC"}`
};
var Green_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$3);
  return `<div class="${["btn svelte-1w1f637", active ? "active" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>`;
});
var css$2 = {
  code: ".center.svelte-1xnkaah{width:100%;height:100%;display:flex;align-items:center;justify-content:center}.illustration.svelte-1xnkaah{display:block;position:absolute;height:90%;width:auto;transform:translate(8%, 5%)}",
  map: `{"version":3,"file":"sound_speaker.svelte","sources":["sound_speaker.svelte"],"sourcesContent":["<script>\\n// import { audio_paused } from 'src/stores/audio';\\n    import Green from './styles/green_button.svelte';\\n\\n    export let letter;\\n\\n    let audio;\\n    let active;\\n    let svg;\\n\\n    function pressSound() {\\n        console.log(\\"yessir\\")\\n        if (active === true) {return}\\n        active = true\\n        svg.setAttribute(\\"fill\\", \\"red\\")\\n        let source = \\"audio/letter/\\" + letter.toString() + \\"_sound.mp4\\"\\n        console.log(source)\\n        audio.src = source\\n        audio.play()\\n        return\\n    }\\n\\n    function audioEnded() {\\n        console.log(\\"audio finished\\")\\n        active = false\\n    }\\n\\n<\/script>\\n<Green {active}>\\n    <div class=\\"center\\" class:selected=\\"{active}\\" on:click={pressSound}>\\n        <object on:click={pressSound} bind:this={svg} class=\\"illustration\\" class:selected=\\"{active}\\" data=\\"/images/speaker2.svg\\" type=\\"image/svg+xml\\" title=\\"speaker\\"></object> \\n        <!-- <img bind:this={svg} class:selected=\\"{active}\\" class=\\"illustration\\" src=\\"/images/speaker2.svg\\" alt=\\"ear\\"> -->\\n    </div>\\n</Green>\\n\\n<audio\\n  style=\\"display:none;\\"\\n  bind:this=\\"{audio}\\"\\n  on:ended=\\"{audioEnded}\\"\\n  volume=\\"0.8\\"\\n  controls\\n><track kind=\\"captions\\" /></audio>\\n<style>\\n.center {\\n    width: 100%;\\n    height: 100%;\\n    display: flex; \\n    align-items: center; \\n    justify-content: center;\\n}\\n.illustration{\\n    display: block;\\n    position: absolute;\\n    height: 90%;\\n    width: auto;\\n    transform: translate(8%, 5%);\\n}\\n.selected g path{\\n  fill:Yellow;\\n  stroke: Yellow;\\n}\\n\\n</style>"],"names":[],"mappings":"AA2CA,OAAO,eAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AAC3B,CAAC,AACD,4BAAa,CAAC,AACV,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,UAAU,EAAE,CAAC,CAAC,EAAE,CAAC,AAChC,CAAC"}`
};
var Sound_speaker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { letter } = $$props;
  let audio;
  let active;
  let svg;
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$2);
  return `${validate_component(Green_button, "Green").$$render($$result, { active }, {}, {
    default: () => `<div class="${["center svelte-1xnkaah", ""].join(" ").trim()}"><object class="${["illustration svelte-1xnkaah", ""].join(" ").trim()}" data="${"/images/speaker2.svg"}" type="${"image/svg+xml"}" title="${"speaker"}"${add_attribute("this", svg, 1)}></object> 
        </div>`
  })}

<audio style="${"display:none;"}" volume="${"0.8"}" controls${add_attribute("this", audio, 1)}><track kind="${"captions"}"></audio>`;
});
var css$1 = {
  code: ".center.svelte-1x152ma{display:flex;align-items:center;justify-content:center}",
  map: `{"version":3,"file":"sound_letter.svelte","sources":["sound_letter.svelte"],"sourcesContent":["<script>\\n    import Yellow from './styles/yellow_button.svelte';\\n\\n    export let pressed;\\n    export let letter;\\n\\n    let active;\\n    $: if (letter === pressed) {\\n        active = true\\n    } \\n    $: if (letter !== pressed) {\\n        active = false\\n    }\\n\\n    let audio;\\n    let audio_source = \\"audio/letter/\\" + letter.toString() + \\"_sound.mp4\\"\\n\\n    function pressSound() {\\n        console.log(audio_source)\\n        audio.src = audio_source\\n        audio.play()\\n    }\\n\\n    function audioEnded() {\\n        console.log(\\"audio finished\\")\\n    }\\n<\/script>\\n<Yellow {active}>\\n    <div class=\\"center\\" on:click={pressSound}>\\n        {letter}\\n    </div>\\n</Yellow>\\n\\n<audio\\n  style=\\"display:none;\\"\\n  bind:this=\\"{audio}\\"\\n  on:ended=\\"{audioEnded}\\"\\n  volume=\\"0.8\\"\\n  controls\\n><track kind=\\"captions\\" /></audio>\\n<style>\\n.center {\\n    display: flex; \\n    align-items: center; \\n    justify-content: center;\\n}\\n</style>"],"names":[],"mappings":"AAyCA,OAAO,eAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AAC3B,CAAC"}`
};
var Sound_letter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pressed } = $$props;
  let { letter } = $$props;
  let active;
  let audio;
  "audio/letter/" + letter.toString() + "_sound.mp4";
  if ($$props.pressed === void 0 && $$bindings.pressed && pressed !== void 0)
    $$bindings.pressed(pressed);
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  $$result.css.add(css$1);
  {
    if (letter === pressed) {
      active = true;
    }
  }
  {
    if (letter !== pressed) {
      active = false;
    }
  }
  return `${validate_component(Yellow_button, "Yellow").$$render($$result, { active }, {}, {
    default: () => `<div class="${"center svelte-1x152ma"}">${escape2(letter)}</div>`
  })}

<audio style="${"display:none;"}" volume="${"0.8"}" controls${add_attribute("this", audio, 1)}><track kind="${"captions"}"></audio>`;
});
var css = {
  code: ".outer-grid.svelte-143rl0t{position:relative;top:80px;display:grid;padding:0px 12px;grid-template-columns:1fr 1fr 1fr;grid-template-rows:3fr 1fr 1fr 1fr;grid-gap:24px;padding-bottom:20px;width:100vw;height:100vh}.speaker.svelte-143rl0t{grid-row:1 / 2;grid-column:1 / 4;aspect-ratio:1}",
  map: '{"version":3,"file":"group-1.svelte","sources":["group-1.svelte"],"sourcesContent":["<script context=\\"module\\">\\n    export async function load({ page }) {\\n        let group_num = page.params.groupnum\\n        return { props: {group_num} }\\n    }\\n<\/script>\\n\\n<script>\\n    import { t, locale, locales } from \\"$lib/stores/i18n\\";\\n    import SoundSpeaker from \\"$lib/buttons/sound_speaker.svelte\\"\\n    import SoundLetter from \\"$lib/buttons/sound_letter.svelte\\"\\n\\n    // export let group_num\\n\\n    const LETTERS = [\\n\\t\\t\\"s\\", \\"a\\", \\"t\\", \\"p\\", \\"i\\", \\"n\\"\\n\\t];\\n\\n    function shuffle(original) {\\n        console.log(original)\\n        var array = original;\\n        for (var i = array.length - 1; i > 0; i--) {\\n            var j = Math.floor(Math.random() * (i + 1));\\n            var temp = array[i];\\n            array[i] = array[j];\\n            array[j] = temp;\\n        }\\n        return array;\\n    }\\n\\n    let letter_queue = shuffle(LETTERS)\\n\\n    function pickThreeLetters () {\\n        if(!letter_queue) {return}\\n        let correct = letter_queue.shift()\\n        let falses = []\\n        falses.push(letter_queue.shift())\\n        falses.push(letter_queue.shift())\\n        console.log(correct)\\n        return [correct, falses]\\n    }\\n\\n    let [correct_letter, false_letters] = pickThreeLetters()\\n    console.log(correct_letter)\\n    console.log(false_letters)\\n    let pressed = \\"\\"\\n\\n    function extendQueue () {\\n        let extension = shuffle(LETTERS)\\n        while (extension[0] = correct_letter) {extension = shuffle(LETTERS)}\\n        letter_queue.extend(extension)\\n    }\\n\\n    function updateLetters() {\\n        [correct_letter, false_letters] = pickThreeLetters()\\n        if (letter_queue.length < 3) {\\n            extendQueue()\\n        }\\n    }\\n\\n    function updatePressed(letter) {\\n        console.log(\\"pressed \\"+letter)\\n        pressed = letter\\n    }\\n\\n    console.log(false_letters.concat([correct_letter]))\\n<\/script>\\n\\n<div class=\\"outer-grid\\"> \\n    <div class=\\"speaker\\"><SoundSpeaker letter={correct_letter}/></div> \\n    {#each shuffle(false_letters.concat([correct_letter])) as ltr, i}\\n        <div class=\\"letter-{ltr}\\" on:click={updatePressed(ltr)}>\\n            <SoundLetter {pressed} letter={ltr} />\\n        </div>\\n    {/each}\\n</div>\\n\\n<style>\\n.outer-grid { \\n    position: relative;\\n    top: 80px;\\n\\n    display: grid;\\n    padding: 0px 12px;\\n    grid-template-columns: 1fr 1fr 1fr; \\n    grid-template-rows: 3fr 1fr 1fr 1fr;\\n    grid-gap: 24px;\\n\\n    padding-bottom: 20px;\\n\\n    width: 100vw;\\n    height: 100vh;\\n}\\n.speaker {\\n    grid-row: 1 / 2;\\n    grid-column: 1 / 4;\\n    aspect-ratio: 1;\\n}\\n</style>"],"names":[],"mappings":"AA8EA,WAAW,eAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CAET,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CACnC,QAAQ,CAAE,IAAI,CAEd,cAAc,CAAE,IAAI,CAEpB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACjB,CAAC,AACD,QAAQ,eAAC,CAAC,AACN,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,YAAY,CAAE,CAAC,AACnB,CAAC"}'
};
async function load({ page }) {
  let group_num = page.params.groupnum;
  return { props: { group_num } };
}
function shuffle(original) {
  console.log(original);
  var array = original;
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
var Group_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const LETTERS = ["s", "a", "t", "p", "i", "n"];
  let letter_queue = shuffle(LETTERS);
  function pickThreeLetters() {
    if (!letter_queue) {
      return;
    }
    let correct = letter_queue.shift();
    let falses = [];
    falses.push(letter_queue.shift());
    falses.push(letter_queue.shift());
    console.log(correct);
    return [correct, falses];
  }
  let [correct_letter, false_letters] = pickThreeLetters();
  console.log(correct_letter);
  console.log(false_letters);
  let pressed = "";
  console.log(false_letters.concat([correct_letter]));
  $$result.css.add(css);
  return `<div class="${"outer-grid svelte-143rl0t"}"><div class="${"speaker svelte-143rl0t"}">${validate_component(Sound_speaker, "SoundSpeaker").$$render($$result, { letter: correct_letter }, {}, {})}</div> 
    ${each(shuffle(false_letters.concat([correct_letter])), (ltr, i) => `<div class="${"letter-" + escape2(ltr) + " svelte-143rl0t"}">${validate_component(Sound_letter, "SoundLetter").$$render($$result, { pressed, letter: ltr }, {}, {})}
        </div>`)}
</div>`;
});
var group1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Group_1,
  load
});

// .svelte-kit/vercel/entry.js
init();
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
