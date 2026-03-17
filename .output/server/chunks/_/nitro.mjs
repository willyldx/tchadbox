import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { jwtVerify, createRemoteJWKSet } from 'jose';
import { createClient } from '@supabase/supabase-js';
import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getIcons } from '@iconify/utils';
import { createHash } from 'node:crypto';
import { consola } from 'consola';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$2=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$2;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const e$1=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r$1="sha256",s$1="base64url";function digest$1(t){if(e$1)return e$1(r$1,t,s$1);const o=createHash(r$1).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s$1):o.digest(s$1)}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize$1(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash$1(value) {
  return digest$1(typeof value === "string" ? value : serialize$1(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash$1([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash$1(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash$1(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash$1(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash$1([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash$1(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "6cf346b7-d001-418e-aecb-1df864eaaafe",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "apiUrl": "https://tchadbox-backend-production.up.railway.app/api",
    "medusaUrl": "http://31.97.114.49:9000",
    "supabaseUrl": "https://xoeybpypyghunujnlhpa.supabase.co",
    "supabaseAnonKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZXlicHlweWdodW51am5saHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MTk0NTYsImV4cCI6MjA4MzQ5NTQ1Nn0.E2qZdK3-8sis7yvX6-H8dMSJUuQO6sZ7zWq0KztKQV4",
    "siteUrl": "https://tchadbox.vercel.app",
    "convexUrl": "https://ceaseless-alpaca-976.convex.cloud",
    "paystackPublicKey": "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "clerkPublishableKey": "pk_test_bmV4dC1mb2FsLTU3LmNsZXJrLmFjY291bnRzLmRldiQ",
    "meilisearchHost": "https://getmeilimeilisearchv190-production-192b.up.railway.app/",
    "meilisearchKey": "elb9ub0rlkta52gxbexihcau35vutbb0",
    "motion": {}
  },
  "paystackSecretKey": "sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "supabaseServiceKey": "",
  "icon": {
    "serverKnownCssClasses": []
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": [
        "xoeybpypyghunujnlhpa.supabase.co"
      ]
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	// If the client specifically requests HTML, then avoid classifying as JSON.
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		// let Nitro handle JSON errors
		return;
	}
	// invoke default Nitro error handler (which will log appropriately if required)
	const defaultRes = await defaultHandler(error, event, { json: true });
	// let Nitro handle redirect if appropriate
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	// remove proto/hostname/port from URL
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	// add default server message (keep sanitized for unhandled errors)
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	// we will be rendering this error internally so we can pass along the error.data safely
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	// Access request headers
	const reqHeaders = getRequestHeaders(event);
	// Detect to avoid recursion in SSR rendering of errors
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	// HTML response (via SSR)
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	// Fallback to static rendered error page
	if (!res) {
		const { template } = await import('./error-500.mjs');
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"light\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _U4TU7D_zepin3Is_i6oJdNKHbE1xFbQioHdVCeuujhA = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _U4TU7D_zepin3Is_i6oJdNKHbE1xFbQioHdVCeuujhA
];

const assets = {
  "/css/nuxt-google-fonts.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"59bc-Gxf/TMsxEIFY/YZbHM8voNkvnaQ\"",
    "mtime": "2026-03-17T11:47:57.265Z",
    "size": 22972,
    "path": "../public/css/nuxt-google-fonts.css"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"32344-Sg4mnLgFWev+6yq5FFOkMrAy6lU\"",
    "mtime": "2026-02-28T20:03:40.599Z",
    "size": 205636,
    "path": "../public/logo.png"
  },
  "/css/nuxt-google-fonts.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"354-HzMS0r3K8S7Fq7ujCtReU6w8Nak\"",
    "mtime": "2026-03-17T12:17:15.571Z",
    "size": 852,
    "path": "../public/css/nuxt-google-fonts.css.br"
  },
  "/css/nuxt-google-fonts.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"434-Zzb647IyCfoa50N122zoZVoRMW8\"",
    "mtime": "2026-03-17T12:17:15.177Z",
    "size": 1076,
    "path": "../public/css/nuxt-google-fonts.css.gz"
  },
  "/fonts/Inter-normal-300-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
    "mtime": "2026-03-17T11:47:54.610Z",
    "size": 25960,
    "path": "../public/fonts/Inter-normal-300-cyrillic-ext.woff2"
  },
  "/fonts/Inter-normal-300-cyrillic.woff2": {
    "type": "font/woff2",
    "etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
    "mtime": "2026-03-17T11:47:55.050Z",
    "size": 18748,
    "path": "../public/fonts/Inter-normal-300-cyrillic.woff2"
  },
  "/fonts/Inter-normal-300-greek-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
    "mtime": "2026-03-17T11:47:55.197Z",
    "size": 11232,
    "path": "../public/fonts/Inter-normal-300-greek-ext.woff2"
  },
  "/fonts/Inter-normal-300-greek.woff2": {
    "type": "font/woff2",
    "etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
    "mtime": "2026-03-17T11:47:55.295Z",
    "size": 18996,
    "path": "../public/fonts/Inter-normal-300-greek.woff2"
  },
  "/fonts/Inter-normal-300-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
    "mtime": "2026-03-17T11:47:55.595Z",
    "size": 85068,
    "path": "../public/fonts/Inter-normal-300-latin-ext.woff2"
  },
  "/fonts/Inter-normal-300-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
    "mtime": "2026-03-17T11:47:55.729Z",
    "size": 48256,
    "path": "../public/fonts/Inter-normal-300-latin.woff2"
  },
  "/fonts/Inter-normal-400-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
    "mtime": "2026-03-17T11:47:54.610Z",
    "size": 25960,
    "path": "../public/fonts/Inter-normal-400-cyrillic-ext.woff2"
  },
  "/fonts/Inter-normal-300-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2026-03-17T11:47:55.391Z",
    "size": 10252,
    "path": "../public/fonts/Inter-normal-300-vietnamese.woff2"
  },
  "/fonts/Inter-normal-400-cyrillic.woff2": {
    "type": "font/woff2",
    "etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
    "mtime": "2026-03-17T11:47:55.050Z",
    "size": 18748,
    "path": "../public/fonts/Inter-normal-400-cyrillic.woff2"
  },
  "/fonts/Inter-normal-400-greek-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
    "mtime": "2026-03-17T11:47:55.197Z",
    "size": 11232,
    "path": "../public/fonts/Inter-normal-400-greek-ext.woff2"
  },
  "/fonts/Inter-normal-400-greek.woff2": {
    "type": "font/woff2",
    "etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
    "mtime": "2026-03-17T11:47:55.295Z",
    "size": 18996,
    "path": "../public/fonts/Inter-normal-400-greek.woff2"
  },
  "/fonts/Inter-normal-400-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
    "mtime": "2026-03-17T11:47:55.595Z",
    "size": 85068,
    "path": "../public/fonts/Inter-normal-400-latin-ext.woff2"
  },
  "/fonts/Inter-normal-400-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
    "mtime": "2026-03-17T11:47:55.729Z",
    "size": 48256,
    "path": "../public/fonts/Inter-normal-400-latin.woff2"
  },
  "/fonts/Inter-normal-400-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2026-03-17T11:47:55.391Z",
    "size": 10252,
    "path": "../public/fonts/Inter-normal-400-vietnamese.woff2"
  },
  "/fonts/Inter-normal-500-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
    "mtime": "2026-03-17T11:47:54.610Z",
    "size": 25960,
    "path": "../public/fonts/Inter-normal-500-cyrillic-ext.woff2"
  },
  "/hero-contact.png": {
    "type": "image/png",
    "etag": "\"9137e-Z1BgWp1annijspXfYZtley5X5FU\"",
    "mtime": "2026-03-02T16:27:13.165Z",
    "size": 594814,
    "path": "../public/hero-contact.png"
  },
  "/hero-bg.png": {
    "type": "image/png",
    "etag": "\"bf427-nvSKQD10VwfF6dEXgKw9TWCcAKQ\"",
    "mtime": "2026-03-02T16:28:40.947Z",
    "size": 783399,
    "path": "../public/hero-bg.png"
  },
  "/hero-catalogue.png": {
    "type": "image/png",
    "etag": "\"b8267-aAbhk18rTBU8Eo0XM1l+EZ95RmA\"",
    "mtime": "2026-03-02T16:26:44.400Z",
    "size": 754279,
    "path": "../public/hero-catalogue.png"
  },
  "/hero-howto.png": {
    "type": "image/png",
    "etag": "\"b785b-WwKg4v3G05GXGbOeViR+7jDJ1aw\"",
    "mtime": "2026-03-02T16:29:27.722Z",
    "size": 751707,
    "path": "../public/hero-howto.png"
  },
  "/hero-slide2.png": {
    "type": "image/png",
    "etag": "\"b8390-o5MTh7ZLeieVmDB/b3jFVq3wM2E\"",
    "mtime": "2026-03-02T16:36:01.180Z",
    "size": 754576,
    "path": "../public/hero-slide2.png"
  },
  "/hero-slide3.png": {
    "type": "image/png",
    "etag": "\"d5e7f-lllmrkbVMVHiQgTEYjhqlqoIXCY\"",
    "mtime": "2026-03-02T16:36:44.147Z",
    "size": 876159,
    "path": "../public/hero-slide3.png"
  },
  "/fonts/Inter-normal-500-cyrillic.woff2": {
    "type": "font/woff2",
    "etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
    "mtime": "2026-03-17T11:47:55.050Z",
    "size": 18748,
    "path": "../public/fonts/Inter-normal-500-cyrillic.woff2"
  },
  "/fonts/Inter-normal-500-greek-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
    "mtime": "2026-03-17T11:47:55.197Z",
    "size": 11232,
    "path": "../public/fonts/Inter-normal-500-greek-ext.woff2"
  },
  "/fonts/Inter-normal-500-greek.woff2": {
    "type": "font/woff2",
    "etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
    "mtime": "2026-03-17T11:47:55.295Z",
    "size": 18996,
    "path": "../public/fonts/Inter-normal-500-greek.woff2"
  },
  "/fonts/Inter-normal-500-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
    "mtime": "2026-03-17T11:47:55.595Z",
    "size": 85068,
    "path": "../public/fonts/Inter-normal-500-latin-ext.woff2"
  },
  "/fonts/Inter-normal-500-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
    "mtime": "2026-03-17T11:47:55.729Z",
    "size": 48256,
    "path": "../public/fonts/Inter-normal-500-latin.woff2"
  },
  "/fonts/Inter-normal-500-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2026-03-17T11:47:55.391Z",
    "size": 10252,
    "path": "../public/fonts/Inter-normal-500-vietnamese.woff2"
  },
  "/fonts/Inter-normal-600-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
    "mtime": "2026-03-17T11:47:54.610Z",
    "size": 25960,
    "path": "../public/fonts/Inter-normal-600-cyrillic-ext.woff2"
  },
  "/fonts/Inter-normal-600-cyrillic.woff2": {
    "type": "font/woff2",
    "etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
    "mtime": "2026-03-17T11:47:55.050Z",
    "size": 18748,
    "path": "../public/fonts/Inter-normal-600-cyrillic.woff2"
  },
  "/fonts/Inter-normal-600-greek-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
    "mtime": "2026-03-17T11:47:55.197Z",
    "size": 11232,
    "path": "../public/fonts/Inter-normal-600-greek-ext.woff2"
  },
  "/fonts/Inter-normal-600-greek.woff2": {
    "type": "font/woff2",
    "etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
    "mtime": "2026-03-17T11:47:55.295Z",
    "size": 18996,
    "path": "../public/fonts/Inter-normal-600-greek.woff2"
  },
  "/fonts/Inter-normal-600-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
    "mtime": "2026-03-17T11:47:55.595Z",
    "size": 85068,
    "path": "../public/fonts/Inter-normal-600-latin-ext.woff2"
  },
  "/fonts/Inter-normal-600-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
    "mtime": "2026-03-17T11:47:55.729Z",
    "size": 48256,
    "path": "../public/fonts/Inter-normal-600-latin.woff2"
  },
  "/fonts/Inter-normal-600-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2026-03-17T11:47:55.391Z",
    "size": 10252,
    "path": "../public/fonts/Inter-normal-600-vietnamese.woff2"
  },
  "/fonts/Inter-normal-700-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
    "mtime": "2026-03-17T11:47:54.610Z",
    "size": 25960,
    "path": "../public/fonts/Inter-normal-700-cyrillic-ext.woff2"
  },
  "/fonts/Inter-normal-700-cyrillic.woff2": {
    "type": "font/woff2",
    "etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
    "mtime": "2026-03-17T11:47:55.050Z",
    "size": 18748,
    "path": "../public/fonts/Inter-normal-700-cyrillic.woff2"
  },
  "/fonts/Inter-normal-700-greek-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
    "mtime": "2026-03-17T11:47:55.197Z",
    "size": 11232,
    "path": "../public/fonts/Inter-normal-700-greek-ext.woff2"
  },
  "/fonts/Inter-normal-700-greek.woff2": {
    "type": "font/woff2",
    "etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
    "mtime": "2026-03-17T11:47:55.295Z",
    "size": 18996,
    "path": "../public/fonts/Inter-normal-700-greek.woff2"
  },
  "/fonts/Inter-normal-700-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
    "mtime": "2026-03-17T11:47:55.595Z",
    "size": 85068,
    "path": "../public/fonts/Inter-normal-700-latin-ext.woff2"
  },
  "/fonts/Inter-normal-700-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
    "mtime": "2026-03-17T11:47:55.729Z",
    "size": 48256,
    "path": "../public/fonts/Inter-normal-700-latin.woff2"
  },
  "/fonts/Inter-normal-700-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2026-03-17T11:47:55.391Z",
    "size": 10252,
    "path": "../public/fonts/Inter-normal-700-vietnamese.woff2"
  },
  "/fonts/JetBrains_Mono-normal-400-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"668-/q5XIShVD2LrOrPzUnYqfwzlWQM\"",
    "mtime": "2026-03-17T11:47:56.199Z",
    "size": 1640,
    "path": "../public/fonts/JetBrains_Mono-normal-400-cyrillic-ext.woff2"
  },
  "/fonts/JetBrains_Mono-normal-400-cyrillic.woff2": {
    "type": "font/woff2",
    "etag": "\"22a8-nY2y6MzZcjPCL0AMJxGhJCw1tRI\"",
    "mtime": "2026-03-17T11:47:56.332Z",
    "size": 8872,
    "path": "../public/fonts/JetBrains_Mono-normal-400-cyrillic.woff2"
  },
  "/fonts/JetBrains_Mono-normal-400-greek.woff2": {
    "type": "font/woff2",
    "etag": "\"1ab4-vO254uUoPBuIhSU0jLwsXwe94+w\"",
    "mtime": "2026-03-17T11:47:56.460Z",
    "size": 6836,
    "path": "../public/fonts/JetBrains_Mono-normal-400-greek.woff2"
  },
  "/fonts/JetBrains_Mono-normal-400-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"2d68-Bq02AAzYneyT5DmMW2JWWrHRseI\"",
    "mtime": "2026-03-17T11:47:56.717Z",
    "size": 11624,
    "path": "../public/fonts/JetBrains_Mono-normal-400-latin-ext.woff2"
  },
  "/fonts/JetBrains_Mono-normal-400-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"7ac8-TycgbEscr4t4BVl/y8aSL/WAXao\"",
    "mtime": "2026-03-17T11:47:56.862Z",
    "size": 31432,
    "path": "../public/fonts/JetBrains_Mono-normal-400-latin.woff2"
  },
  "/fonts/JetBrains_Mono-normal-400-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"1700-MmqItN278TJfbGZhTwO2+NPcKys\"",
    "mtime": "2026-03-17T11:47:56.563Z",
    "size": 5888,
    "path": "../public/fonts/JetBrains_Mono-normal-400-vietnamese.woff2"
  },
  "/fonts/JetBrains_Mono-normal-500-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"668-/q5XIShVD2LrOrPzUnYqfwzlWQM\"",
    "mtime": "2026-03-17T11:47:56.199Z",
    "size": 1640,
    "path": "../public/fonts/JetBrains_Mono-normal-500-cyrillic-ext.woff2"
  },
  "/fonts/JetBrains_Mono-normal-500-cyrillic.woff2": {
    "type": "font/woff2",
    "etag": "\"22a8-nY2y6MzZcjPCL0AMJxGhJCw1tRI\"",
    "mtime": "2026-03-17T11:47:56.332Z",
    "size": 8872,
    "path": "../public/fonts/JetBrains_Mono-normal-500-cyrillic.woff2"
  },
  "/fonts/JetBrains_Mono-normal-500-greek.woff2": {
    "type": "font/woff2",
    "etag": "\"1ab4-vO254uUoPBuIhSU0jLwsXwe94+w\"",
    "mtime": "2026-03-17T11:47:56.460Z",
    "size": 6836,
    "path": "../public/fonts/JetBrains_Mono-normal-500-greek.woff2"
  },
  "/fonts/JetBrains_Mono-normal-500-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"2d68-Bq02AAzYneyT5DmMW2JWWrHRseI\"",
    "mtime": "2026-03-17T11:47:56.717Z",
    "size": 11624,
    "path": "../public/fonts/JetBrains_Mono-normal-500-latin-ext.woff2"
  },
  "/fonts/JetBrains_Mono-normal-500-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"7ac8-TycgbEscr4t4BVl/y8aSL/WAXao\"",
    "mtime": "2026-03-17T11:47:56.862Z",
    "size": 31432,
    "path": "../public/fonts/JetBrains_Mono-normal-500-latin.woff2"
  },
  "/fonts/JetBrains_Mono-normal-500-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"1700-MmqItN278TJfbGZhTwO2+NPcKys\"",
    "mtime": "2026-03-17T11:47:56.563Z",
    "size": 5888,
    "path": "../public/fonts/JetBrains_Mono-normal-500-vietnamese.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-400-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6b4-nyAHvF050yhgsa69LUWkrBLUegE\"",
    "mtime": "2026-03-17T11:47:56.924Z",
    "size": 1716,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-400-cyrillic-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-400-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"54e0-QvPpAYEn4Ol5O2FiDUNqprR4Zyg\"",
    "mtime": "2026-03-17T11:47:57.103Z",
    "size": 21728,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-400-latin-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-400-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"6ad4-o4nZfeWAotajcjESI0vSs4Oc4Ns\"",
    "mtime": "2026-03-17T11:47:57.211Z",
    "size": 27348,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-400-latin.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-400-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"20a0-C/LCoE0Ze4d2+M75EzjTyDMuymc\"",
    "mtime": "2026-03-17T11:47:57.002Z",
    "size": 8352,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-400-vietnamese.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-500-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6b4-nyAHvF050yhgsa69LUWkrBLUegE\"",
    "mtime": "2026-03-17T11:47:56.924Z",
    "size": 1716,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-500-cyrillic-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-500-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"54e0-QvPpAYEn4Ol5O2FiDUNqprR4Zyg\"",
    "mtime": "2026-03-17T11:47:57.103Z",
    "size": 21728,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-500-latin-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-500-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"6ad4-o4nZfeWAotajcjESI0vSs4Oc4Ns\"",
    "mtime": "2026-03-17T11:47:57.211Z",
    "size": 27348,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-500-latin.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-500-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"20a0-C/LCoE0Ze4d2+M75EzjTyDMuymc\"",
    "mtime": "2026-03-17T11:47:57.002Z",
    "size": 8352,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-500-vietnamese.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-600-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6b4-nyAHvF050yhgsa69LUWkrBLUegE\"",
    "mtime": "2026-03-17T11:47:56.924Z",
    "size": 1716,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-600-cyrillic-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-600-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"54e0-QvPpAYEn4Ol5O2FiDUNqprR4Zyg\"",
    "mtime": "2026-03-17T11:47:57.103Z",
    "size": 21728,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-600-latin-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-600-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"6ad4-o4nZfeWAotajcjESI0vSs4Oc4Ns\"",
    "mtime": "2026-03-17T11:47:57.211Z",
    "size": 27348,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-600-latin.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-600-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"20a0-C/LCoE0Ze4d2+M75EzjTyDMuymc\"",
    "mtime": "2026-03-17T11:47:57.002Z",
    "size": 8352,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-600-vietnamese.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-700-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6b4-nyAHvF050yhgsa69LUWkrBLUegE\"",
    "mtime": "2026-03-17T11:47:56.924Z",
    "size": 1716,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-700-cyrillic-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-700-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"54e0-QvPpAYEn4Ol5O2FiDUNqprR4Zyg\"",
    "mtime": "2026-03-17T11:47:57.103Z",
    "size": 21728,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-700-latin-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-700-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"6ad4-o4nZfeWAotajcjESI0vSs4Oc4Ns\"",
    "mtime": "2026-03-17T11:47:57.211Z",
    "size": 27348,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-700-latin.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-700-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"20a0-C/LCoE0Ze4d2+M75EzjTyDMuymc\"",
    "mtime": "2026-03-17T11:47:57.002Z",
    "size": 8352,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-700-vietnamese.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-800-cyrillic-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"6b4-nyAHvF050yhgsa69LUWkrBLUegE\"",
    "mtime": "2026-03-17T11:47:56.924Z",
    "size": 1716,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-800-cyrillic-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-800-latin-ext.woff2": {
    "type": "font/woff2",
    "etag": "\"54e0-QvPpAYEn4Ol5O2FiDUNqprR4Zyg\"",
    "mtime": "2026-03-17T11:47:57.103Z",
    "size": 21728,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-800-latin-ext.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-800-latin.woff2": {
    "type": "font/woff2",
    "etag": "\"6ad4-o4nZfeWAotajcjESI0vSs4Oc4Ns\"",
    "mtime": "2026-03-17T11:47:57.211Z",
    "size": 27348,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-800-latin.woff2"
  },
  "/fonts/Plus_Jakarta_Sans-normal-800-vietnamese.woff2": {
    "type": "font/woff2",
    "etag": "\"20a0-C/LCoE0Ze4d2+M75EzjTyDMuymc\"",
    "mtime": "2026-03-17T11:47:57.002Z",
    "size": 8352,
    "path": "../public/fonts/Plus_Jakarta_Sans-normal-800-vietnamese.woff2"
  },
  "/_nuxt/-LZFslgy.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1651-nebMn1SmHWqUAOpf58uYaRVd11A\"",
    "mtime": "2026-03-17T12:16:24.757Z",
    "size": 5713,
    "path": "../public/_nuxt/-LZFslgy.js"
  },
  "/_nuxt/-LZFslgy.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"7a3-9slfX+LEYYljhHXdX8aSxnyaS5A\"",
    "mtime": "2026-03-17T12:17:15.416Z",
    "size": 1955,
    "path": "../public/_nuxt/-LZFslgy.js.br"
  },
  "/_nuxt/-LZFslgy.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"893-d/7TNWVBD/rB/vvMkbs2tv5jDGA\"",
    "mtime": "2026-03-17T12:17:15.416Z",
    "size": 2195,
    "path": "../public/_nuxt/-LZFslgy.js.gz"
  },
  "/_nuxt/-sk3FEOk.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1384-UzubMlVaFNyylyZSwV9J+mGyItY\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 4996,
    "path": "../public/_nuxt/-sk3FEOk.js"
  },
  "/_nuxt/-sk3FEOk.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"61d-7jcM2i763e5PQVgo+nnzT9/IrK4\"",
    "mtime": "2026-03-17T12:17:15.416Z",
    "size": 1565,
    "path": "../public/_nuxt/-sk3FEOk.js.br"
  },
  "/_nuxt/-sk3FEOk.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"6b8-UHbqtjZ/+O9xKigV9Q3LlqT6DfM\"",
    "mtime": "2026-03-17T12:17:15.416Z",
    "size": 1720,
    "path": "../public/_nuxt/-sk3FEOk.js.gz"
  },
  "/_nuxt/1kq1Y93Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f0-Vq4GI2MRBpyeJ1SEJbr4J5E3XL4\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 240,
    "path": "../public/_nuxt/1kq1Y93Y.js"
  },
  "/_nuxt/3BubrwQE.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"58c3-g9ZCH/KHdh0rDWtkXIl6FJKE6IA\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 22723,
    "path": "../public/_nuxt/3BubrwQE.js"
  },
  "/_nuxt/3BubrwQE.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1e53-M7NI8NZVvY6PdyADAF1DD7/hILM\"",
    "mtime": "2026-03-17T12:17:15.577Z",
    "size": 7763,
    "path": "../public/_nuxt/3BubrwQE.js.br"
  },
  "/_nuxt/3BubrwQE.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"21b1-MJCP6YvWOuzVn+8sg+Ah0YjBBwg\"",
    "mtime": "2026-03-17T12:17:15.416Z",
    "size": 8625,
    "path": "../public/_nuxt/3BubrwQE.js.gz"
  },
  "/_nuxt/4-DejnDc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11e-hTvlV1xqlt6TnzbWfzZv22bR8k0\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 286,
    "path": "../public/_nuxt/4-DejnDc.js"
  },
  "/_nuxt/404.C4l44VOB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bd-thyPWyR/13dAKLIcnkEqWpAVno0\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 189,
    "path": "../public/_nuxt/404.C4l44VOB.css"
  },
  "/_nuxt/81KppB_o.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1e17-PymQrGBwbRn0u7q1fhKFYzW/iDM\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 7703,
    "path": "../public/_nuxt/81KppB_o.js"
  },
  "/_nuxt/81KppB_o.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"b50-RJJCd+a8edM60z3oNw8ecTtRJy8\"",
    "mtime": "2026-03-17T12:17:15.571Z",
    "size": 2896,
    "path": "../public/_nuxt/81KppB_o.js.br"
  },
  "/_nuxt/81KppB_o.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"cc0-gWcfJSTJa4gJ409OwRJ9V2zzzYg\"",
    "mtime": "2026-03-17T12:17:15.468Z",
    "size": 3264,
    "path": "../public/_nuxt/81KppB_o.js.gz"
  },
  "/_nuxt/89iswirv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bb-dLcLV9NrvfplGDMWNWe8miC8XqY\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 187,
    "path": "../public/_nuxt/89iswirv.js"
  },
  "/_nuxt/9m-Ch5yT.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1f2f-DNh6wr2R/i26OHFUbk2E6qLNPio\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 7983,
    "path": "../public/_nuxt/9m-Ch5yT.js"
  },
  "/_nuxt/9m-Ch5yT.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"a56-59mtfiO7/77XAF4gfvTkewyS/B8\"",
    "mtime": "2026-03-17T12:17:15.600Z",
    "size": 2646,
    "path": "../public/_nuxt/9m-Ch5yT.js.br"
  },
  "/_nuxt/9m-Ch5yT.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"b98-UZkCUPW6qlSqY/91UT2jGmiGgRw\"",
    "mtime": "2026-03-17T12:17:15.621Z",
    "size": 2968,
    "path": "../public/_nuxt/9m-Ch5yT.js.gz"
  },
  "/_nuxt/B--MZRMC.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"3cce-DzVTiy2RvoQi7Yny9Eat17mTrH0\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 15566,
    "path": "../public/_nuxt/B--MZRMC.js"
  },
  "/_nuxt/B--MZRMC.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"130b-f3+Pil04lHHRsKdQDAtgPykfpY8\"",
    "mtime": "2026-03-17T12:17:15.668Z",
    "size": 4875,
    "path": "../public/_nuxt/B--MZRMC.js.br"
  },
  "/_nuxt/B--MZRMC.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1581-ZQt1iIBk+u4j/Wi1U3XyObGVvtw\"",
    "mtime": "2026-03-17T12:17:15.587Z",
    "size": 5505,
    "path": "../public/_nuxt/B--MZRMC.js.gz"
  },
  "/_nuxt/B-H2WQgD.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"326c-0pK4+m868HKclJJcd/WMCEcHnE8\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 12908,
    "path": "../public/_nuxt/B-H2WQgD.js"
  },
  "/_nuxt/B-H2WQgD.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"d7a-PE26X2DN/AL6wLNE82OgpgdhlOw\"",
    "mtime": "2026-03-17T12:17:15.715Z",
    "size": 3450,
    "path": "../public/_nuxt/B-H2WQgD.js.br"
  },
  "/_nuxt/B-H2WQgD.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"f5e-M5wo8yOTS2gRCrNZeq5h3eFaDmY\"",
    "mtime": "2026-03-17T12:17:15.600Z",
    "size": 3934,
    "path": "../public/_nuxt/B-H2WQgD.js.gz"
  },
  "/_nuxt/B1AMtm97.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"12f6-jDUeBmvUDETzKm1pA6b91a6j9x4\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 4854,
    "path": "../public/_nuxt/B1AMtm97.js"
  },
  "/_nuxt/B1AMtm97.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"77d-tBoUv3poG5ZsFavEV5Ccuzxntrg\"",
    "mtime": "2026-03-17T12:17:15.630Z",
    "size": 1917,
    "path": "../public/_nuxt/B1AMtm97.js.br"
  },
  "/_nuxt/B1AMtm97.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"84a-8AzUp8CU3/hglykBlSFQdcA5zlk\"",
    "mtime": "2026-03-17T12:17:15.616Z",
    "size": 2122,
    "path": "../public/_nuxt/B1AMtm97.js.gz"
  },
  "/_nuxt/b9drpY6m.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2e29-c3EhWQ/tXgfPWb4yWD5XI8hNLiU\"",
    "mtime": "2026-03-17T12:16:24.776Z",
    "size": 11817,
    "path": "../public/_nuxt/b9drpY6m.js"
  },
  "/_nuxt/b9drpY6m.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"c5f-AVnCR054b+yTnwEcFpa+PEuALnc\"",
    "mtime": "2026-03-17T12:17:15.730Z",
    "size": 3167,
    "path": "../public/_nuxt/b9drpY6m.js.br"
  },
  "/_nuxt/b9drpY6m.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"e0b-V0Fj3Q4KGXGnHfNjuKW4rqB3I+k\"",
    "mtime": "2026-03-17T12:17:15.715Z",
    "size": 3595,
    "path": "../public/_nuxt/b9drpY6m.js.gz"
  },
  "/_nuxt/B9ly6okn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fd-0JY2puCSvKxvuEHkJzby2uaWeHE\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 253,
    "path": "../public/_nuxt/B9ly6okn.js"
  },
  "/_nuxt/BdH1tpPo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f-SiN3vl5cHgkClzeHJRdzZ6H6hHM\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 159,
    "path": "../public/_nuxt/BdH1tpPo.js"
  },
  "/_nuxt/B9Qa7Geh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2-bmB3tSb5uiH5U6s82LjgodkCEdw\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 210,
    "path": "../public/_nuxt/B9Qa7Geh.js"
  },
  "/_nuxt/BEJvxsGZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fd-8ey+0zXB6EpwR4dwB2X1cdgg7po\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 253,
    "path": "../public/_nuxt/BEJvxsGZ.js"
  },
  "/_nuxt/BezXT4mX.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"14f4-v0XZPOQCvYjCb9str7QWwKMOfmk\"",
    "mtime": "2026-03-17T12:16:24.749Z",
    "size": 5364,
    "path": "../public/_nuxt/BezXT4mX.js"
  },
  "/_nuxt/BezXT4mX.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"73a-xrO/SYtyMLjMU5qdqODaHK/inHw\"",
    "mtime": "2026-03-17T12:17:15.736Z",
    "size": 1850,
    "path": "../public/_nuxt/BezXT4mX.js.br"
  },
  "/_nuxt/BezXT4mX.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"819-e616SthEpyW305IgSW+Z1/MdLOI\"",
    "mtime": "2026-03-17T12:17:15.730Z",
    "size": 2073,
    "path": "../public/_nuxt/BezXT4mX.js.gz"
  },
  "/_nuxt/Bf5JLyVH.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"4893-nzw0BBd0VbLZxaDAjOFY7Qe4UQU\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 18579,
    "path": "../public/_nuxt/Bf5JLyVH.js"
  },
  "/_nuxt/Bf5JLyVH.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"14d4-l2roCVl+CB7PS6r8W1DRcN8PQtk\"",
    "mtime": "2026-03-17T12:17:15.921Z",
    "size": 5332,
    "path": "../public/_nuxt/Bf5JLyVH.js.br"
  },
  "/_nuxt/Bf5JLyVH.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"16f5-BdBXnB1+NRLeKl+aL4s08YTzzV8\"",
    "mtime": "2026-03-17T12:17:15.736Z",
    "size": 5877,
    "path": "../public/_nuxt/Bf5JLyVH.js.gz"
  },
  "/_nuxt/BFQYbQKe.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"49f-69Jfp2ZaeFDUaYboHT/QhA/d9Ho\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 1183,
    "path": "../public/_nuxt/BFQYbQKe.js"
  },
  "/_nuxt/BFQYbQKe.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"25c-7eKbbipGlGFlGnW2jX2qTuhjMxM\"",
    "mtime": "2026-03-17T12:17:15.799Z",
    "size": 604,
    "path": "../public/_nuxt/BFQYbQKe.js.br"
  },
  "/_nuxt/BFQYbQKe.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"29e-DXeOYd/1CvIYQpkDY2wluq6raAQ\"",
    "mtime": "2026-03-17T12:17:15.736Z",
    "size": 670,
    "path": "../public/_nuxt/BFQYbQKe.js.gz"
  },
  "/_nuxt/BFuq7jmB.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"3aa7-zzI47iWc0PTAVJxe1LGjjC9WjG8\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 15015,
    "path": "../public/_nuxt/BFuq7jmB.js"
  },
  "/_nuxt/BFuq7jmB.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1317-/cuXu+2SRl9QDFLa2KFEEv5MbtQ\"",
    "mtime": "2026-03-17T12:17:15.838Z",
    "size": 4887,
    "path": "../public/_nuxt/BFuq7jmB.js.br"
  },
  "/_nuxt/BFuq7jmB.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1541-GZA4EGMa2wduTBnB+Ekr0eKg/Bg\"",
    "mtime": "2026-03-17T12:17:15.752Z",
    "size": 5441,
    "path": "../public/_nuxt/BFuq7jmB.js.gz"
  },
  "/_nuxt/BH3JSrUz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19c-f9Fdhm7qKU5KZGzZikS9K9mfJ4E\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 412,
    "path": "../public/_nuxt/BH3JSrUz.js"
  },
  "/_nuxt/Bl1LxHJ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"77-TuXikpzyhQpTSbTX2V0Yc6nmpqg\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 119,
    "path": "../public/_nuxt/Bl1LxHJ7.js"
  },
  "/_nuxt/BlDbt2hl.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"a74-qJfcywkLwbHHSSAv0rAgPB0EtU8\"",
    "mtime": "2026-03-17T12:17:15.921Z",
    "size": 2676,
    "path": "../public/_nuxt/BlDbt2hl.js.br"
  },
  "/_nuxt/BlDbt2hl.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1cf1-/+80oAXC/USPucPI/yWydco2Mcs\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 7409,
    "path": "../public/_nuxt/BlDbt2hl.js"
  },
  "/_nuxt/BlDbt2hl.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c07-rEKWCLDNtPVlsRx3WdTcDsQ6C48\"",
    "mtime": "2026-03-17T12:17:15.832Z",
    "size": 3079,
    "path": "../public/_nuxt/BlDbt2hl.js.gz"
  },
  "/_nuxt/BldNw92p.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"36a2-8SaPT5G3vaGyUkv6ZAGD8RELEWc\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 13986,
    "path": "../public/_nuxt/BldNw92p.js"
  },
  "/_nuxt/BldNw92p.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"fa4-+IM9oKZuQ87a1XNFOcVuLO/qcO4\"",
    "mtime": "2026-03-17T12:17:15.912Z",
    "size": 4004,
    "path": "../public/_nuxt/BldNw92p.js.br"
  },
  "/_nuxt/BldNw92p.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"119f-BlKxqyRvAuhXsJA/9+6UjC/MIT0\"",
    "mtime": "2026-03-17T12:17:15.885Z",
    "size": 4511,
    "path": "../public/_nuxt/BldNw92p.js.gz"
  },
  "/_nuxt/BOUfEHHS.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"3476-f6kbhDqOan2/tJ7PNIWbkOiKdRk\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 13430,
    "path": "../public/_nuxt/BOUfEHHS.js"
  },
  "/_nuxt/BOUfEHHS.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"107d-8j/KWWriLCDLQ+im1cTL8rTsMwU\"",
    "mtime": "2026-03-17T12:17:16.067Z",
    "size": 4221,
    "path": "../public/_nuxt/BOUfEHHS.js.br"
  },
  "/_nuxt/BOUfEHHS.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1259-2ANsdYHR2j+cRHonGikhmuNqP9c\"",
    "mtime": "2026-03-17T12:17:15.921Z",
    "size": 4697,
    "path": "../public/_nuxt/BOUfEHHS.js.gz"
  },
  "/_nuxt/BPcV1Uag.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2cd-2uCK+F0H1AjH+9wmNR7j8N208eo\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 717,
    "path": "../public/_nuxt/BPcV1Uag.js"
  },
  "/_nuxt/BQkymXVr.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2574-UF+tV6TG8imHWHPhBIrUAGvQCoY\"",
    "mtime": "2026-03-17T12:16:24.749Z",
    "size": 9588,
    "path": "../public/_nuxt/BQkymXVr.js"
  },
  "/_nuxt/BQkymXVr.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"bbc-h5Q0O0NE+CgRvrLrf6es11kaEYw\"",
    "mtime": "2026-03-17T12:17:16.069Z",
    "size": 3004,
    "path": "../public/_nuxt/BQkymXVr.js.br"
  },
  "/_nuxt/BQkymXVr.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"d73-FiYLIWX3vY9qnyhdgMf4qkcJKGE\"",
    "mtime": "2026-03-17T12:17:16.038Z",
    "size": 3443,
    "path": "../public/_nuxt/BQkymXVr.js.gz"
  },
  "/_nuxt/BqVbYLJL.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1744-8RlD0TN/bVx1lOzB9uf1ciaq6ew\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 5956,
    "path": "../public/_nuxt/BqVbYLJL.js"
  },
  "/_nuxt/BqVbYLJL.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"8fe-10K0eoNLRSdKgIHIdlI0ojo7mr8\"",
    "mtime": "2026-03-17T12:17:16.069Z",
    "size": 2302,
    "path": "../public/_nuxt/BqVbYLJL.js.br"
  },
  "/_nuxt/BqVbYLJL.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"a11-yC1Z8Vo7vIkrVOhvD/0Khz6AdAo\"",
    "mtime": "2026-03-17T12:17:16.067Z",
    "size": 2577,
    "path": "../public/_nuxt/BqVbYLJL.js.gz"
  },
  "/_nuxt/BrUarduI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c9-sPN5UMUDapk2cuH4GUuk80uRxZ4\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 201,
    "path": "../public/_nuxt/BrUarduI.js"
  },
  "/_nuxt/BSis58L_.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1991-S+eh9JQjRaBYjSqgP6dHMHZb5Pw\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 6545,
    "path": "../public/_nuxt/BSis58L_.js"
  },
  "/_nuxt/BSis58L_.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"8b3-R+Ij4hZvdAEJxX0QxWXQKMUkPz8\"",
    "mtime": "2026-03-17T12:17:16.100Z",
    "size": 2227,
    "path": "../public/_nuxt/BSis58L_.js.br"
  },
  "/_nuxt/BSis58L_.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"9da-GuREonKFYBDhVLZcl6bAvVIqDtI\"",
    "mtime": "2026-03-17T12:17:16.085Z",
    "size": 2522,
    "path": "../public/_nuxt/BSis58L_.js.gz"
  },
  "/_nuxt/Bw7xfcqu.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"22af-N9x61UATTYKCjzz3y4kvS+1ubaE\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 8879,
    "path": "../public/_nuxt/Bw7xfcqu.js"
  },
  "/_nuxt/Bw7xfcqu.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"d34-VcJjejq/7ccXkxkzeovkWFNAR74\"",
    "mtime": "2026-03-17T12:17:16.186Z",
    "size": 3380,
    "path": "../public/_nuxt/Bw7xfcqu.js.br"
  },
  "/_nuxt/Bw7xfcqu.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"ede-zkSAEhJwQW1UWKzgsdPw+Z1E9hI\"",
    "mtime": "2026-03-17T12:17:16.100Z",
    "size": 3806,
    "path": "../public/_nuxt/Bw7xfcqu.js.gz"
  },
  "/_nuxt/BxuN7PlX.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"230f-i6Hs1kiDXxw1ltFnuKo3V79ahvQ\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 8975,
    "path": "../public/_nuxt/BxuN7PlX.js"
  },
  "/_nuxt/BxuN7PlX.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"d48-6BxjpfIAwBgn8iio0ECJyf0JuJs\"",
    "mtime": "2026-03-17T12:17:16.188Z",
    "size": 3400,
    "path": "../public/_nuxt/BxuN7PlX.js.br"
  },
  "/_nuxt/BxuN7PlX.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"e79-+vsCPEuzHaimMxtNH4pT6sMbpLA\"",
    "mtime": "2026-03-17T12:17:16.168Z",
    "size": 3705,
    "path": "../public/_nuxt/BxuN7PlX.js.gz"
  },
  "/_nuxt/C-Dpp1lg.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"ac0-Yo6l8tz9Mif9d9j8akhVYwpjO6A\"",
    "mtime": "2026-03-17T12:17:16.199Z",
    "size": 2752,
    "path": "../public/_nuxt/C-Dpp1lg.js.br"
  },
  "/_nuxt/C-Dpp1lg.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c03-tgrZ45vnSLfNnwwDahWWtpA6ZBU\"",
    "mtime": "2026-03-17T12:17:16.186Z",
    "size": 3075,
    "path": "../public/_nuxt/C-Dpp1lg.js.gz"
  },
  "/_nuxt/C3v8k0rC.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2197-uRWHx5R7gFqSTUgcLGHRthTBlAM\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 8599,
    "path": "../public/_nuxt/C3v8k0rC.js"
  },
  "/_nuxt/C3v8k0rC.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"c31-Wz33ZpEUHn2S3da5h011wYXZXio\"",
    "mtime": "2026-03-17T12:17:16.237Z",
    "size": 3121,
    "path": "../public/_nuxt/C3v8k0rC.js.br"
  },
  "/_nuxt/C-Dpp1lg.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2602-RiiswwxV68s+cOUoUL/SouINhr0\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 9730,
    "path": "../public/_nuxt/C-Dpp1lg.js"
  },
  "/_nuxt/C3v8k0rC.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"dc1-hEotUITN3dkBpGXMwu6dtdw+/Zo\"",
    "mtime": "2026-03-17T12:17:16.199Z",
    "size": 3521,
    "path": "../public/_nuxt/C3v8k0rC.js.gz"
  },
  "/_nuxt/catalogue.DHMsWgjy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f5-x18o4NcGDkwXIDeGY36lEv+U1Ks\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 501,
    "path": "../public/_nuxt/catalogue.DHMsWgjy.css"
  },
  "/_nuxt/CbcXRhyp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b2-OVMO4CEKP5PHNsZlXCaXqRZsZjM\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 178,
    "path": "../public/_nuxt/CbcXRhyp.js"
  },
  "/_nuxt/CBxIbd9-.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"db8-7oV47d2uousKdyIzLdh5WuCMkos\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 3512,
    "path": "../public/_nuxt/CBxIbd9-.js"
  },
  "/_nuxt/CBxIbd9-.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"487-vqzK0vYLYIDsPZwy50bEO1x81B0\"",
    "mtime": "2026-03-17T12:17:16.271Z",
    "size": 1159,
    "path": "../public/_nuxt/CBxIbd9-.js.br"
  },
  "/_nuxt/CBxIbd9-.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"4ff-iNt7Z6bYWhijBDbiopmvDAvTZ4g\"",
    "mtime": "2026-03-17T12:17:16.253Z",
    "size": 1279,
    "path": "../public/_nuxt/CBxIbd9-.js.gz"
  },
  "/_nuxt/CC2sU54V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"392-RBQo3o/GftAyt9N5ItZAjmpsQ90\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 914,
    "path": "../public/_nuxt/CC2sU54V.js"
  },
  "/_nuxt/CCxMNMr-.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"548a-UeDfK5axSdO3lbgFjUlnipwH7NY\"",
    "mtime": "2026-03-17T12:16:24.641Z",
    "size": 21642,
    "path": "../public/_nuxt/CCxMNMr-.js"
  },
  "/_nuxt/CCxMNMr-.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1909-35js+yURN7IZ185kfVy3U8sdH8o\"",
    "mtime": "2026-03-17T12:17:16.350Z",
    "size": 6409,
    "path": "../public/_nuxt/CCxMNMr-.js.br"
  },
  "/_nuxt/CCxMNMr-.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1c8c-VN+TLZd5+lw+3sIMBBmNbpciAcw\"",
    "mtime": "2026-03-17T12:17:16.271Z",
    "size": 7308,
    "path": "../public/_nuxt/CCxMNMr-.js.gz"
  },
  "/_nuxt/CEnGkGpb.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1636-ebqjdVIOvBg4NUm8O96QynXd0Zc\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 5686,
    "path": "../public/_nuxt/CEnGkGpb.js"
  },
  "/_nuxt/CEnGkGpb.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"7e5-qGMl+a4XyOA9Iwrqr3o7jq6uPwI\"",
    "mtime": "2026-03-17T12:17:16.320Z",
    "size": 2021,
    "path": "../public/_nuxt/CEnGkGpb.js.br"
  },
  "/_nuxt/CEnGkGpb.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"8dc-mqZHE/9wd1ah9i+IAAWxzdhG5CY\"",
    "mtime": "2026-03-17T12:17:16.271Z",
    "size": 2268,
    "path": "../public/_nuxt/CEnGkGpb.js.gz"
  },
  "/_nuxt/ChVbL8aw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11c-/Pcy39u7uVcMRXIxLm0aqq3x//k\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 284,
    "path": "../public/_nuxt/ChVbL8aw.js"
  },
  "/_nuxt/CMolRDhz.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1555-Q2VQzfYmuicbCh5ZCPdg7RIyt04\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 5461,
    "path": "../public/_nuxt/CMolRDhz.js"
  },
  "/_nuxt/CMolRDhz.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"86a-bnycxICKt9qjZbBDT+qNDOyTUTg\"",
    "mtime": "2026-03-17T12:17:16.334Z",
    "size": 2154,
    "path": "../public/_nuxt/CMolRDhz.js.br"
  },
  "/_nuxt/CMolRDhz.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"97c-SZm6DcHv/EbLIA8zQ1YvvS8ETao\"",
    "mtime": "2026-03-17T12:17:16.315Z",
    "size": 2428,
    "path": "../public/_nuxt/CMolRDhz.js.gz"
  },
  "/_nuxt/Co-oLTy9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bf-o9FPBScDx1tI+CQbC0rtU4sBzfA\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 191,
    "path": "../public/_nuxt/Co-oLTy9.js"
  },
  "/_nuxt/confirmation.Blusnzhc.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"43c-jgL1qCot3Z0zjwuyHcPlRQQcLZs\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 1084,
    "path": "../public/_nuxt/confirmation.Blusnzhc.css"
  },
  "/_nuxt/confirmation.Blusnzhc.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"f9-oADkoZYpxpgT/bCbn/J11ty+LAI\"",
    "mtime": "2026-03-17T12:17:16.350Z",
    "size": 249,
    "path": "../public/_nuxt/confirmation.Blusnzhc.css.br"
  },
  "/_nuxt/confirmation.Blusnzhc.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"10e-YmS/KWaRoKboe5PAqJgCj7zGp+s\"",
    "mtime": "2026-03-17T12:17:16.337Z",
    "size": 270,
    "path": "../public/_nuxt/confirmation.Blusnzhc.css.gz"
  },
  "/_nuxt/COOq3zkm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"137-VdCCB5g3cfmcGSFS8itpSCyMydc\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 311,
    "path": "../public/_nuxt/COOq3zkm.js"
  },
  "/_nuxt/CP5CRcrs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f3-gRIDOgvUDPbuC6kHlIieknhrFi8\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 243,
    "path": "../public/_nuxt/CP5CRcrs.js"
  },
  "/_nuxt/CqJ9YzJH.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1a7d-3VV8ap889gkkC4WMLg51Sf5SjJU\"",
    "mtime": "2026-03-17T12:16:24.749Z",
    "size": 6781,
    "path": "../public/_nuxt/CqJ9YzJH.js"
  },
  "/_nuxt/CqJ9YzJH.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"ac4-BJiE8T7rgf2ELhw5JPB1C2gbEok\"",
    "mtime": "2026-03-17T12:17:16.563Z",
    "size": 2756,
    "path": "../public/_nuxt/CqJ9YzJH.js.br"
  },
  "/_nuxt/CqJ9YzJH.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c14-wnGoLd9BCCiCwE6Z6qkk91m1b1I\"",
    "mtime": "2026-03-17T12:17:16.350Z",
    "size": 3092,
    "path": "../public/_nuxt/CqJ9YzJH.js.gz"
  },
  "/_nuxt/CQMb4Rmx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d1-9c/crCAd+F88tzRDpau+4zhQBb8\"",
    "mtime": "2026-03-17T12:16:24.757Z",
    "size": 465,
    "path": "../public/_nuxt/CQMb4Rmx.js"
  },
  "/_nuxt/CQOkXBrr.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1f41-1qmsGm2UYmUw1osi762qMtooJck\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 8001,
    "path": "../public/_nuxt/CQOkXBrr.js"
  },
  "/_nuxt/CQOkXBrr.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"9bd-0e935lB8mCNdH+l+HyPW2yK3h/M\"",
    "mtime": "2026-03-17T12:17:16.677Z",
    "size": 2493,
    "path": "../public/_nuxt/CQOkXBrr.js.br"
  },
  "/_nuxt/CQOkXBrr.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"adf-ek37fCbEex1Q23lXDiX+kKsTEEk\"",
    "mtime": "2026-03-17T12:17:16.363Z",
    "size": 2783,
    "path": "../public/_nuxt/CQOkXBrr.js.gz"
  },
  "/_nuxt/Cs7yY_TN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"185-L4DnF1Rr8GIMVHQc/D4F8xChWkc\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 389,
    "path": "../public/_nuxt/Cs7yY_TN.js"
  },
  "/_nuxt/CT_y2t7E.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2518-IJcbTZ4ZgccvBofrS6Hfs6jnSrQ\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 9496,
    "path": "../public/_nuxt/CT_y2t7E.js"
  },
  "/_nuxt/CT_y2t7E.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"db4-en8GPy6NPdNEl/R6B98pr+4SYtw\"",
    "mtime": "2026-03-17T12:17:16.736Z",
    "size": 3508,
    "path": "../public/_nuxt/CT_y2t7E.js.br"
  },
  "/_nuxt/CT_y2t7E.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"f32-ANOYmRUIcteBF5+P/9Qxph9TESo\"",
    "mtime": "2026-03-17T12:17:16.365Z",
    "size": 3890,
    "path": "../public/_nuxt/CT_y2t7E.js.gz"
  },
  "/_nuxt/CyzONJqa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fb-Qk6nnQj8T1rP6BLyM9GYEi9WJ7o\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 251,
    "path": "../public/_nuxt/CyzONJqa.js"
  },
  "/_nuxt/D0aFiU_B.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"722-BiqmiCGxnsCsjmabJFYXw/O9GO8\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 1826,
    "path": "../public/_nuxt/D0aFiU_B.js"
  },
  "/_nuxt/D0aFiU_B.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"27f-OsYghDHxOfGvgcdav8phG8/8vFM\"",
    "mtime": "2026-03-17T12:17:16.394Z",
    "size": 639,
    "path": "../public/_nuxt/D0aFiU_B.js.br"
  },
  "/_nuxt/D0aFiU_B.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2ec-YDeNQ06KU9KQm70joraCjhB0XaQ\"",
    "mtime": "2026-03-17T12:17:16.394Z",
    "size": 748,
    "path": "../public/_nuxt/D0aFiU_B.js.gz"
  },
  "/_nuxt/D24t3BgJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"362-m7r2hWv8q3g1ONHknfLWmyLtp1s\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 866,
    "path": "../public/_nuxt/D24t3BgJ.js"
  },
  "/_nuxt/D7PJWZBL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10b-yMd+L34/snZ+Ny1Zg6uaumdRHvU\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 267,
    "path": "../public/_nuxt/D7PJWZBL.js"
  },
  "/_nuxt/Db764XlN.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"67e-dO7Jm9WIAAMxGAN2r1mhn//PdD8\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 1662,
    "path": "../public/_nuxt/Db764XlN.js"
  },
  "/_nuxt/Db764XlN.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2b5-+29ykjKYIJC0L2iy/yj5cZyp3yg\"",
    "mtime": "2026-03-17T12:17:16.428Z",
    "size": 693,
    "path": "../public/_nuxt/Db764XlN.js.gz"
  },
  "/_nuxt/Db764XlN.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"23a-fOMJ1XwWhEl5SEKGdCLOtcZ85M0\"",
    "mtime": "2026-03-17T12:17:16.428Z",
    "size": 570,
    "path": "../public/_nuxt/Db764XlN.js.br"
  },
  "/_nuxt/DbSpeO_b.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"b11-zi8Oh5H0g7FzEAPaAgcf2q5kak4\"",
    "mtime": "2026-03-17T12:17:16.852Z",
    "size": 2833,
    "path": "../public/_nuxt/DbSpeO_b.js.br"
  },
  "/_nuxt/DbSpeO_b.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"228d-VBic82y6/MeuYMTsHpJyYmWlOz4\"",
    "mtime": "2026-03-17T12:16:24.749Z",
    "size": 8845,
    "path": "../public/_nuxt/DbSpeO_b.js"
  },
  "/_nuxt/DbSpeO_b.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c4c-AkIHoqjbmlcWNfHjB/wjPYd4H9A\"",
    "mtime": "2026-03-17T12:17:16.550Z",
    "size": 3148,
    "path": "../public/_nuxt/DbSpeO_b.js.gz"
  },
  "/_nuxt/DcdskKt0.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"18f4-5UW+df1Lkjs3XxNlM/UJFCIcEco\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 6388,
    "path": "../public/_nuxt/DcdskKt0.js"
  },
  "/_nuxt/DcdskKt0.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"88f-auEIAtVcbpz81B37s03ZTSs8vY0\"",
    "mtime": "2026-03-17T12:17:16.765Z",
    "size": 2191,
    "path": "../public/_nuxt/DcdskKt0.js.br"
  },
  "/_nuxt/DcdskKt0.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"9cb-RfZOw4EOr6ZD3wSK9PW2GpEfhQc\"",
    "mtime": "2026-03-17T12:17:16.628Z",
    "size": 2507,
    "path": "../public/_nuxt/DcdskKt0.js.gz"
  },
  "/_nuxt/DcT_kRYi.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"12cde-1QEKMcSjKBuekKbLSxZDVRkmLEk\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 77022,
    "path": "../public/_nuxt/DcT_kRYi.js"
  },
  "/_nuxt/DcT_kRYi.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2ba2-becaP1N6d5FpAf7bPsblnwhwsj0\"",
    "mtime": "2026-03-17T12:17:17.383Z",
    "size": 11170,
    "path": "../public/_nuxt/DcT_kRYi.js.br"
  },
  "/_nuxt/DcT_kRYi.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3344-Vba/59bFDPHLQJjd6QAEqCxfYYY\"",
    "mtime": "2026-03-17T12:17:16.752Z",
    "size": 13124,
    "path": "../public/_nuxt/DcT_kRYi.js.gz"
  },
  "/_nuxt/DCX3WEjJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f4-gxmLiWQEeKbAy9k1SaHC7XDec1o\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 244,
    "path": "../public/_nuxt/DCX3WEjJ.js"
  },
  "/_nuxt/DdkUJl6P.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"15cc-FN0flvUw8Ixx8jIHZfaMK1bU9kA\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 5580,
    "path": "../public/_nuxt/DdkUJl6P.js"
  },
  "/_nuxt/DdkUJl6P.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"62c-BC5ZmpoZbpcjzUaphasywPk/nkE\"",
    "mtime": "2026-03-17T12:17:17.064Z",
    "size": 1580,
    "path": "../public/_nuxt/DdkUJl6P.js.br"
  },
  "/_nuxt/DdkUJl6P.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"6fb-sQ629j4Dqh2NaK7Dm3n1xqdk6Mw\"",
    "mtime": "2026-03-17T12:17:16.980Z",
    "size": 1787,
    "path": "../public/_nuxt/DdkUJl6P.js.gz"
  },
  "/_nuxt/default.ClUmcNhF.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"4e2-T04QigIEGGjpLPUTDWMNVjHHH6s\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 1250,
    "path": "../public/_nuxt/default.ClUmcNhF.css"
  },
  "/_nuxt/default.ClUmcNhF.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"194-dhqdWHI0N08bbZ+HdzacqlAPhmQ\"",
    "mtime": "2026-03-17T12:17:17.202Z",
    "size": 404,
    "path": "../public/_nuxt/default.ClUmcNhF.css.br"
  },
  "/_nuxt/default.ClUmcNhF.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1f4-ovj1wEUyZ6oW/kTnpeY1Ac5B7Dc\"",
    "mtime": "2026-03-17T12:17:17.200Z",
    "size": 500,
    "path": "../public/_nuxt/default.ClUmcNhF.css.gz"
  },
  "/_nuxt/DgMWA16F.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"4e65-2CBcD5PSxGJeGwlvbB2hDeiYvos\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 20069,
    "path": "../public/_nuxt/DgMWA16F.js"
  },
  "/_nuxt/DgMWA16F.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"15af-qIS/eEs3ugY/7cdskObWlo0HMU8\"",
    "mtime": "2026-03-17T12:17:17.370Z",
    "size": 5551,
    "path": "../public/_nuxt/DgMWA16F.js.br"
  },
  "/_nuxt/DgMWA16F.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"18e3-oxQIq5e19tgarV9aNpGxngJbEUs\"",
    "mtime": "2026-03-17T12:17:17.202Z",
    "size": 6371,
    "path": "../public/_nuxt/DgMWA16F.js.gz"
  },
  "/_nuxt/DhjCFZbs.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"609e-8yNVxmdEclQSGqzJM4DdgUDqq9w\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 24734,
    "path": "../public/_nuxt/DhjCFZbs.js"
  },
  "/_nuxt/DhjCFZbs.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1f88-+A4pCaTB9kXrZG15062zz8NcoEc\"",
    "mtime": "2026-03-17T12:17:17.371Z",
    "size": 8072,
    "path": "../public/_nuxt/DhjCFZbs.js.br"
  },
  "/_nuxt/DhjCFZbs.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"22c1-X4Z/5CKGx+lANeUcuSNBT84G+oc\"",
    "mtime": "2026-03-17T12:17:17.222Z",
    "size": 8897,
    "path": "../public/_nuxt/DhjCFZbs.js.gz"
  },
  "/_nuxt/DhJXQVgQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"196-7JrEp0gwL69BA0KT3N5X7nTYUCA\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 406,
    "path": "../public/_nuxt/DhJXQVgQ.js"
  },
  "/_nuxt/DHYpA2Fq.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"32b9-nzJOaYyK3qNhZ3Ad12DEDeK4dWg\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 12985,
    "path": "../public/_nuxt/DHYpA2Fq.js"
  },
  "/_nuxt/DHYpA2Fq.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"d26-5cY+48Jn/rllOCy1DQs4H9VxS8Y\"",
    "mtime": "2026-03-17T12:17:17.371Z",
    "size": 3366,
    "path": "../public/_nuxt/DHYpA2Fq.js.br"
  },
  "/_nuxt/DHYpA2Fq.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"eea-4LJyTEz+zEi6H4mXHtmpX9C8qQg\"",
    "mtime": "2026-03-17T12:17:17.368Z",
    "size": 3818,
    "path": "../public/_nuxt/DHYpA2Fq.js.gz"
  },
  "/_nuxt/DJJlWa-h.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"caa-2SXPZkY2fwCSargjLtI4ExO7ImY\"",
    "mtime": "2026-03-17T12:17:17.383Z",
    "size": 3242,
    "path": "../public/_nuxt/DJJlWa-h.js.br"
  },
  "/_nuxt/DJJlWa-h.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"28a5-BT9b5v9hCcmApjiSjWWnz1KWJco\"",
    "mtime": "2026-03-17T12:16:24.749Z",
    "size": 10405,
    "path": "../public/_nuxt/DJJlWa-h.js"
  },
  "/_nuxt/DJJlWa-h.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"e91-z8bMQ6EvXKYTibHYYyujayeQS6o\"",
    "mtime": "2026-03-17T12:17:17.371Z",
    "size": 3729,
    "path": "../public/_nuxt/DJJlWa-h.js.gz"
  },
  "/_nuxt/DnMfRr8L.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1b42-1ghaLzslxqFRw3ujoyGHs5nk35w\"",
    "mtime": "2026-03-17T12:16:24.749Z",
    "size": 6978,
    "path": "../public/_nuxt/DnMfRr8L.js"
  },
  "/_nuxt/DnMfRr8L.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"966-5pneGZj5bCZxGkIzLCtvbQr8rrg\"",
    "mtime": "2026-03-17T12:17:17.380Z",
    "size": 2406,
    "path": "../public/_nuxt/DnMfRr8L.js.br"
  },
  "/_nuxt/DnMfRr8L.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"a92-/8RIqJT5aqbNrcDtP6p+q+ox77Q\"",
    "mtime": "2026-03-17T12:17:17.371Z",
    "size": 2706,
    "path": "../public/_nuxt/DnMfRr8L.js.gz"
  },
  "/_nuxt/DnpQtszg.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"34bd-k4eTcpHY8CLTP6K2tbW/Qq1tuOY\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 13501,
    "path": "../public/_nuxt/DnpQtszg.js"
  },
  "/_nuxt/DnpQtszg.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"e58-mPJwOJkwHZi6GsxGSKK53/AA5Sk\"",
    "mtime": "2026-03-17T12:17:17.501Z",
    "size": 3672,
    "path": "../public/_nuxt/DnpQtszg.js.br"
  },
  "/_nuxt/DnpQtszg.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1055-sdEILmJBqsfFQe2ngkOThjFyXzI\"",
    "mtime": "2026-03-17T12:17:17.371Z",
    "size": 4181,
    "path": "../public/_nuxt/DnpQtszg.js.gz"
  },
  "/_nuxt/DQEfalUn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"77-sTp3l4KrIm/lSerILM0Lm4IBRV4\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 119,
    "path": "../public/_nuxt/DQEfalUn.js"
  },
  "/_nuxt/DR-oUF52.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13a-qolQ+aEroro8JfKD9lgM0U6+kJk\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 314,
    "path": "../public/_nuxt/DR-oUF52.js"
  },
  "/_nuxt/DRZVaE77.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"383-alQJAld24K7bRt6tQNB9ToinMFM\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 899,
    "path": "../public/_nuxt/DRZVaE77.js"
  },
  "/_nuxt/DwIOxKn0.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1ca3-UV4cwPMkNwaTWFGwAVqat1CB/Xc\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 7331,
    "path": "../public/_nuxt/DwIOxKn0.js"
  },
  "/_nuxt/DwIOxKn0.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"a63-kDXu4l1iZsDVarbwEJGvqpZHSRI\"",
    "mtime": "2026-03-17T12:17:17.530Z",
    "size": 2659,
    "path": "../public/_nuxt/DwIOxKn0.js.br"
  },
  "/_nuxt/DwIOxKn0.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"bbc-tftCcVN3Y4ZobJEZ+PEAuDNP/Zs\"",
    "mtime": "2026-03-17T12:17:17.413Z",
    "size": 3004,
    "path": "../public/_nuxt/DwIOxKn0.js.gz"
  },
  "/_nuxt/DwWG92zX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f-AXAJ/pQALxfLevmPX9UXUrRcWqI\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 159,
    "path": "../public/_nuxt/DwWG92zX.js"
  },
  "/_nuxt/DxRAwZ0o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-Eq7JF7KgRr+G5zBiMHUgJm4Nfe8\"",
    "mtime": "2026-03-17T12:16:24.757Z",
    "size": 74,
    "path": "../public/_nuxt/DxRAwZ0o.js"
  },
  "/_nuxt/Dz0dknQn.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"ddde-nMhVzh9cX1/O1XHDSoVpy+j0DNY\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 56798,
    "path": "../public/_nuxt/Dz0dknQn.js"
  },
  "/_nuxt/Dz0dknQn.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"38a8-nGi46tdXdmaDVXPfrhPT1r2Jf/4\"",
    "mtime": "2026-03-17T12:17:17.833Z",
    "size": 14504,
    "path": "../public/_nuxt/Dz0dknQn.js.br"
  },
  "/_nuxt/Dz0dknQn.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3eae-zMQct28Y1Jb5NQ2WXVGEDP0WP1Y\"",
    "mtime": "2026-03-17T12:17:17.530Z",
    "size": 16046,
    "path": "../public/_nuxt/Dz0dknQn.js.gz"
  },
  "/_nuxt/D_fWZ9rO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cd-Wzpb2nVnyJN3zIZaJtwIcNJcTvI\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 205,
    "path": "../public/_nuxt/D_fWZ9rO.js"
  },
  "/_nuxt/F6izzhVK.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1d03-YMVykR8dXGaEgBG3yimL5VeiDjk\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 7427,
    "path": "../public/_nuxt/F6izzhVK.js"
  },
  "/_nuxt/F6izzhVK.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"951-O4678gDBXBIw7Bl4qhOjEmm37io\"",
    "mtime": "2026-03-17T12:17:17.530Z",
    "size": 2385,
    "path": "../public/_nuxt/F6izzhVK.js.br"
  },
  "/_nuxt/F6izzhVK.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"a78-rFzDMbxLYkf2mXOJjIRdHHXLne0\"",
    "mtime": "2026-03-17T12:17:17.501Z",
    "size": 2680,
    "path": "../public/_nuxt/F6izzhVK.js.gz"
  },
  "/_nuxt/FvADsRHq.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2491-9cElC8o5Ugf5kIj6n2JspUoCMZg\"",
    "mtime": "2026-03-17T12:16:24.609Z",
    "size": 9361,
    "path": "../public/_nuxt/FvADsRHq.js"
  },
  "/_nuxt/FvADsRHq.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"cc2-EWHebvJpuWdt+1qvX80A6/2p7tI\"",
    "mtime": "2026-03-17T12:17:17.563Z",
    "size": 3266,
    "path": "../public/_nuxt/FvADsRHq.js.br"
  },
  "/_nuxt/hDq9Ulcf.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"f5e-utwN0wjYPmnvLtQRchMHN02cTNE\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 3934,
    "path": "../public/_nuxt/hDq9Ulcf.js"
  },
  "/_nuxt/FvADsRHq.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"e18-HZRB0axjEpXmI5u4ouMXtzBDLr0\"",
    "mtime": "2026-03-17T12:17:17.530Z",
    "size": 3608,
    "path": "../public/_nuxt/FvADsRHq.js.gz"
  },
  "/_nuxt/hDq9Ulcf.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"5f0-iHP7HGYliY089rH6POOS6Z4okZA\"",
    "mtime": "2026-03-17T12:17:17.536Z",
    "size": 1520,
    "path": "../public/_nuxt/hDq9Ulcf.js.br"
  },
  "/_nuxt/hDq9Ulcf.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"6ab-0KCRQBQLcDmMtac95LCHniaT74A\"",
    "mtime": "2026-03-17T12:17:17.536Z",
    "size": 1707,
    "path": "../public/_nuxt/hDq9Ulcf.js.gz"
  },
  "/_nuxt/iMPo4f8l.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"347e-NM8eJ5eWS7P/h+bE2XGcBV2Uuyo\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 13438,
    "path": "../public/_nuxt/iMPo4f8l.js"
  },
  "/_nuxt/iMPo4f8l.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"e16-yT5/lMdw7y9dT1ePoUFpfLU5AhE\"",
    "mtime": "2026-03-17T12:17:17.627Z",
    "size": 3606,
    "path": "../public/_nuxt/iMPo4f8l.js.br"
  },
  "/_nuxt/iMPo4f8l.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1028-KwFqeOvE8ul9nZh2TsHG2T0u6Tk\"",
    "mtime": "2026-03-17T12:17:17.536Z",
    "size": 4136,
    "path": "../public/_nuxt/iMPo4f8l.js.gz"
  },
  "/_nuxt/index.BgLi25xD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"151-vam+jj9WFgyPSdyt2I1tPs2po2A\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 337,
    "path": "../public/_nuxt/index.BgLi25xD.css"
  },
  "/_nuxt/Inter-normal-300-cyrillic-ext.BOeWTOD4.woff2": {
    "type": "font/woff2",
    "etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 25960,
    "path": "../public/_nuxt/Inter-normal-300-cyrillic-ext.BOeWTOD4.woff2"
  },
  "/_nuxt/Inter-normal-300-cyrillic.DqGufNeO.woff2": {
    "type": "font/woff2",
    "etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 18748,
    "path": "../public/_nuxt/Inter-normal-300-cyrillic.DqGufNeO.woff2"
  },
  "/_nuxt/Inter-normal-300-greek-ext.DlzME5K_.woff2": {
    "type": "font/woff2",
    "etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 11232,
    "path": "../public/_nuxt/Inter-normal-300-greek-ext.DlzME5K_.woff2"
  },
  "/_nuxt/Inter-normal-300-greek.CkhJZR-_.woff2": {
    "type": "font/woff2",
    "etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 18996,
    "path": "../public/_nuxt/Inter-normal-300-greek.CkhJZR-_.woff2"
  },
  "/_nuxt/Inter-normal-300-latin-ext.DO1Apj_S.woff2": {
    "type": "font/woff2",
    "etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 85068,
    "path": "../public/_nuxt/Inter-normal-300-latin-ext.DO1Apj_S.woff2"
  },
  "/_nuxt/Inter-normal-300-latin.Dx4kXJAl.woff2": {
    "type": "font/woff2",
    "etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 48256,
    "path": "../public/_nuxt/Inter-normal-300-latin.Dx4kXJAl.woff2"
  },
  "/_nuxt/Inter-normal-300-vietnamese.CBcvBZtf.woff2": {
    "type": "font/woff2",
    "etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 10252,
    "path": "../public/_nuxt/Inter-normal-300-vietnamese.CBcvBZtf.woff2"
  },
  "/_nuxt/JetBrains_Mono-normal-400-cyrillic.Buze_B52.woff2": {
    "type": "font/woff2",
    "etag": "\"22a8-nY2y6MzZcjPCL0AMJxGhJCw1tRI\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 8872,
    "path": "../public/_nuxt/JetBrains_Mono-normal-400-cyrillic.Buze_B52.woff2"
  },
  "/_nuxt/JetBrains_Mono-normal-400-greek.D3oMJlXt.woff2": {
    "type": "font/woff2",
    "etag": "\"1ab4-vO254uUoPBuIhSU0jLwsXwe94+w\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 6836,
    "path": "../public/_nuxt/JetBrains_Mono-normal-400-greek.D3oMJlXt.woff2"
  },
  "/_nuxt/JetBrains_Mono-normal-400-latin-ext.DIC32ArD.woff2": {
    "type": "font/woff2",
    "etag": "\"2d68-Bq02AAzYneyT5DmMW2JWWrHRseI\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 11624,
    "path": "../public/_nuxt/JetBrains_Mono-normal-400-latin-ext.DIC32ArD.woff2"
  },
  "/_nuxt/JetBrains_Mono-normal-400-latin.6fWv1k7M.woff2": {
    "type": "font/woff2",
    "etag": "\"7ac8-TycgbEscr4t4BVl/y8aSL/WAXao\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 31432,
    "path": "../public/_nuxt/JetBrains_Mono-normal-400-latin.6fWv1k7M.woff2"
  },
  "/_nuxt/JetBrains_Mono-normal-400-vietnamese.BehTv68k.woff2": {
    "type": "font/woff2",
    "etag": "\"1700-MmqItN278TJfbGZhTwO2+NPcKys\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 5888,
    "path": "../public/_nuxt/JetBrains_Mono-normal-400-vietnamese.BehTv68k.woff2"
  },
  "/_nuxt/Jvrtk69n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"319-WHCHVwaFonbj6m9kIuQO+3dBynA\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 793,
    "path": "../public/_nuxt/Jvrtk69n.js"
  },
  "/_nuxt/livreur.B69VVzFm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f-7iTU47LvrxXMQOApkigjSb5apf0\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 79,
    "path": "../public/_nuxt/livreur.B69VVzFm.css"
  },
  "/_nuxt/LOS6HDDQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f0-iy0Jt6rssLv2mEmFYY8hsmnwDoQ\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 240,
    "path": "../public/_nuxt/LOS6HDDQ.js"
  },
  "/_nuxt/NReTtpvT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7a-CHn6GXg8FMt62F5sZj9KwZll6JE\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 122,
    "path": "../public/_nuxt/NReTtpvT.js"
  },
  "/_nuxt/Plus_Jakarta_Sans-normal-400-latin-ext.DmpS2jIq.woff2": {
    "type": "font/woff2",
    "etag": "\"54e0-QvPpAYEn4Ol5O2FiDUNqprR4Zyg\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 21728,
    "path": "../public/_nuxt/Plus_Jakarta_Sans-normal-400-latin-ext.DmpS2jIq.woff2"
  },
  "/_nuxt/Plus_Jakarta_Sans-normal-400-vietnamese.qRpaaN48.woff2": {
    "type": "font/woff2",
    "etag": "\"20a0-C/LCoE0Ze4d2+M75EzjTyDMuymc\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 8352,
    "path": "../public/_nuxt/Plus_Jakarta_Sans-normal-400-vietnamese.qRpaaN48.woff2"
  },
  "/_nuxt/Plus_Jakarta_Sans-normal-400-latin.eXO_dkmS.woff2": {
    "type": "font/woff2",
    "etag": "\"6ad4-o4nZfeWAotajcjESI0vSs4Oc4Ns\"",
    "mtime": "2026-03-17T12:16:24.743Z",
    "size": 27348,
    "path": "../public/_nuxt/Plus_Jakarta_Sans-normal-400-latin.eXO_dkmS.woff2"
  },
  "/_nuxt/qekhTfJy.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"207c9-XdltvVcD9EQqJLCta9qLM82Wd+s\"",
    "mtime": "2026-03-17T12:17:19.981Z",
    "size": 133065,
    "path": "../public/_nuxt/qekhTfJy.js.br"
  },
  "/_nuxt/qekhTfJy.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"6e966-GaSaedlizLJ8IuG34ClR0w4oeZk\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 452966,
    "path": "../public/_nuxt/qekhTfJy.js"
  },
  "/_nuxt/qekhTfJy.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"25d15-yHSNVh5i+vRL1E5lcMgor/heXk8\"",
    "mtime": "2026-03-17T12:17:17.779Z",
    "size": 154901,
    "path": "../public/_nuxt/qekhTfJy.js.gz"
  },
  "/_nuxt/Table.BIrL3Irv.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"dd3-TGuHku3ztMciMzyyRrgGScwZ5Cw\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 3539,
    "path": "../public/_nuxt/Table.BIrL3Irv.css"
  },
  "/_nuxt/Table.BIrL3Irv.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"197-0j/lZ9eb0l5ZgfF4LneKgRp9uB0\"",
    "mtime": "2026-03-17T12:17:17.668Z",
    "size": 407,
    "path": "../public/_nuxt/Table.BIrL3Irv.css.br"
  },
  "/_nuxt/Table.BIrL3Irv.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1de-GuUJ+ael10CrDPrTQME7qlzZgdQ\"",
    "mtime": "2026-03-17T12:17:17.666Z",
    "size": 478,
    "path": "../public/_nuxt/Table.BIrL3Irv.css.gz"
  },
  "/_nuxt/tfZ5jcKS.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"888-Fd0WiVOA8tnXGY/FhXT2RzgNdgE\"",
    "mtime": "2026-03-17T12:16:24.745Z",
    "size": 2184,
    "path": "../public/_nuxt/tfZ5jcKS.js"
  },
  "/_nuxt/tfZ5jcKS.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"3f9-/IBj6DYKNUksIRgxM/+pSQNgTDs\"",
    "mtime": "2026-03-17T12:17:17.668Z",
    "size": 1017,
    "path": "../public/_nuxt/tfZ5jcKS.js.br"
  },
  "/_nuxt/tfZ5jcKS.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"469-+bmboGTQHQe4l+tXHuus5qGhoNE\"",
    "mtime": "2026-03-17T12:17:17.668Z",
    "size": 1129,
    "path": "../public/_nuxt/tfZ5jcKS.js.gz"
  },
  "/_nuxt/UdHOaq4n.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"3637-pWG97t/wQDgG0ag/nWHg7HSoDN4\"",
    "mtime": "2026-03-17T12:16:24.755Z",
    "size": 13879,
    "path": "../public/_nuxt/UdHOaq4n.js"
  },
  "/_nuxt/UdHOaq4n.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"f16-nwIHynfWPtVhdTk0b09beHRKf2o\"",
    "mtime": "2026-03-17T12:17:17.751Z",
    "size": 3862,
    "path": "../public/_nuxt/UdHOaq4n.js.br"
  },
  "/_nuxt/UdHOaq4n.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"10c5-Zbw7KOHd61cfCTXouBHdzjIXq4M\"",
    "mtime": "2026-03-17T12:17:17.668Z",
    "size": 4293,
    "path": "../public/_nuxt/UdHOaq4n.js.gz"
  },
  "/_nuxt/v2oZZuf_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a7-2ff6RvnV2AptjC7paLuUIexv2QY\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 167,
    "path": "../public/_nuxt/v2oZZuf_.js"
  },
  "/_nuxt/vOdsEZ5v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c7-xAJAoy0o2C2NwGqpCAaX4TNuFkA\"",
    "mtime": "2026-03-17T12:16:24.751Z",
    "size": 199,
    "path": "../public/_nuxt/vOdsEZ5v.js"
  },
  "/_nuxt/WRAJ3ogJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8e-xv4T8/0uAenHJj6mAxPBZ8SzQf4\"",
    "mtime": "2026-03-17T12:16:24.753Z",
    "size": 142,
    "path": "../public/_nuxt/WRAJ3ogJ.js"
  },
  "/_nuxt/_4Hkqi0a.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2230-HhBBkGyv+qsSSB8IJ6UEGst9FTQ\"",
    "mtime": "2026-03-17T12:16:24.776Z",
    "size": 8752,
    "path": "../public/_nuxt/_4Hkqi0a.js"
  },
  "/_nuxt/_4Hkqi0a.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"b0e-BGBDeyuFjE+zNh2FXw1+pXQxEkY\"",
    "mtime": "2026-03-17T12:17:17.751Z",
    "size": 2830,
    "path": "../public/_nuxt/_4Hkqi0a.js.br"
  },
  "/_nuxt/_4Hkqi0a.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c55-rjPH3lm/HMvpiaVXIzq8aLv29Qo\"",
    "mtime": "2026-03-17T12:17:17.751Z",
    "size": 3157,
    "path": "../public/_nuxt/_4Hkqi0a.js.gz"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-8I4SqUgW9TyATPXdmfsgu7yZdis\"",
    "mtime": "2026-03-17T12:17:12.302Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/6cf346b7-d001-418e-aecb-1df864eaaafe.json": {
    "type": "application/json",
    "etag": "\"58-h+RkVRaiJvWVUiRpRgcZqDiWKVA\"",
    "mtime": "2026-03-17T12:17:12.304Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/6cf346b7-d001-418e-aecb-1df864eaaafe.json"
  }
};

const _DRIVE_LETTER_START_RE$1 = /^[A-Za-z]:\//;
function normalizeWindowsPath$1(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE$1, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE$1 = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath$1(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute$1(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute$1(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute$1 = function(p) {
  return _IS_ABSOLUTE_RE$1.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath$1(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute$1(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _ZHXJi0 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _SxA8c9 = defineEventHandler(() => {});

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const basename = function(p, extension) {
  const segments = normalizeWindowsPath(p).split("/");
  let lastSegment = "";
  for (let i = segments.length - 1; i >= 0; i--) {
    const val = segments[i];
    if (val) {
      lastSegment = val;
      break;
    }
  }
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

function serialize(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash(input) {
  return digest(serialize(input));
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function baseURL() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	// TODO: support passing event to `useRuntimeConfig`
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

let _jwks = null;
function getClerkJWKS() {
  if (_jwks) return _jwks;
  const config = useRuntimeConfig();
  const publishableKey = config.public.clerkPublishableKey || "";
  const keyParts = publishableKey.replace(/^pk_(test|live)_/, "");
  const base64Domain = keyParts.replace(/\$+$/, "");
  const domain = atob(base64Domain);
  _jwks = createRemoteJWKSet(
    new URL(`https://${domain}/.well-known/jwks.json`)
  );
  return _jwks;
}
function getAuthToken(event) {
  const authHeader = getHeader(event, "Authorization");
  const token = authHeader == null ? void 0 : authHeader.replace(/^Bearer\s+/i, "").trim();
  return token || null;
}
async function getServerUser(event) {
  const token = getAuthToken(event);
  if (!token) {
    return null;
  }
  try {
    const jwks = getClerkJWKS();
    const { payload } = await jwtVerify(token, jwks);
    const clerkUserId = payload.sub;
    const email = payload.email || payload.email_address || "";
    const publicMetadata = payload.public_metadata || payload.publicMetadata || {};
    const role = publicMetadata.role || "client";
    return {
      id: clerkUserId,
      email,
      role
    };
  } catch (error) {
    console.error("Clerk JWT verification failed:", error);
    return null;
  }
}
function requireAuth(event) {
  return getServerUser(event).then((user) => {
    if (!user) {
      throw createError$1({
        statusCode: 401,
        statusMessage: "Non authentifi\xE9"
      });
    }
    return user;
  });
}
function requireAdmin(event) {
  return requireAuth(event).then((user) => {
    if (user.role !== "admin" && user.role !== "super_admin") {
      throw createError$1({
        statusCode: 403,
        statusMessage: "Acc\xE8s r\xE9serv\xE9 aux administrateurs"
      });
    }
    return user;
  });
}
function requireLivreur(event) {
  return requireAuth(event).then((user) => {
    if (user.role !== "livreur" && user.role !== "admin" && user.role !== "super_admin") {
      throw createError$1({
        statusCode: 403,
        statusMessage: "Acc\xE8s r\xE9serv\xE9 aux livreurs"
      });
    }
    return user;
  });
}

let serviceClient = null;
function getSupabaseService() {
  const config = useRuntimeConfig();
  const url = config.public.supabaseUrl;
  const serviceKey = config.supabaseServiceKey;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  if (!serviceClient) {
    serviceClient = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  return serviceClient;
}
function getSupabaseWithAuth(accessToken) {
  const config = useRuntimeConfig();
  const url = config.public.supabaseUrl;
  const anonKey = config.public.supabaseAnonKey;
  return createClient(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

const collections = {
  'heroicons': () => import('./icons.mjs').then(m => m.default),
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _af8DEk = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError$1({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};

const _lsXrCs = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_DBWUUs = () => import('../routes/api/admin/orders.get.mjs');
const _lazy_NTyZZL = () => import('../routes/api/admin/stats.get.mjs');
const _lazy_5elekK = () => import('../routes/api/checkout.post.mjs');
const _lazy_CbI4MO = () => import('../routes/api/livreur/orders.get.mjs');
const _lazy_8QXIDZ = () => import('../routes/api/livreur/orders/_id_.patch.mjs');
const _lazy_X7ADDm = () => import('../routes/api/paystack-webhook.post.mjs');
const _lazy_qxsGT5 = () => import('../routes/api/verify-payment.post.mjs');
const _lazy_8Yp7kW = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _ZHXJi0, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/orders', handler: _lazy_DBWUUs, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/stats', handler: _lazy_NTyZZL, lazy: true, middleware: false, method: "get" },
  { route: '/api/checkout', handler: _lazy_5elekK, lazy: true, middleware: false, method: "post" },
  { route: '/api/livreur/orders', handler: _lazy_CbI4MO, lazy: true, middleware: false, method: "get" },
  { route: '/api/livreur/orders/:id', handler: _lazy_8QXIDZ, lazy: true, middleware: false, method: "patch" },
  { route: '/api/paystack-webhook', handler: _lazy_X7ADDm, lazy: true, middleware: false, method: "post" },
  { route: '/api/verify-payment', handler: _lazy_qxsGT5, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_8Yp7kW, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _af8DEk, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _lsXrCs, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_8Yp7kW, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { $fetch$1 as $, isScriptProtocol as A, defuFn as B, defu as C, klona as D, parseQuery as E, withQuery as F, sanitizeStatusCode as G, parseURL as H, encodePath as I, decodePath as J, createDefu as K, getContext as L, withTrailingSlash as M, withoutTrailingSlash as N, baseURL as O, createHooks as P, executeAsync as Q, withLeadingSlash as R, encodeParam as S, upperFirst as T, trapUnhandledNodeErrors as a, useNitroApp as b, defineEventHandler as c, destr as d, createError$1 as e, getQuery as f, getAuthToken as g, getSupabaseWithAuth as h, readBody as i, getSupabaseService as j, requireLivreur as k, getRouterParam as l, readRawBody as m, getHeader as n, buildAssetsURL as o, getResponseStatusText as p, getResponseStatus as q, requireAdmin as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, defineRenderHandler as v, publicAssetsURL as w, getRouteRules as x, joinURL as y, hasProtocol as z };
//# sourceMappingURL=nitro.mjs.map
