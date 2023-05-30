var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var _currentId = 0;
var EMITTER = class {
  constructor() {
    this.generateUuid = (str) => {
      _currentId += 1;
      const time = new Date().getTime();
      return `${time.valueOf()}-${str || ""}${_currentId}`;
    };
    /**
     * @description subscribe 订阅
     * @param subscribeKey: 订阅类型key值
     * @param fn: 订阅回调事件；
     * @returns token 订阅token标记;
     * 
    */
    this.subscribe = (subscribeKey, fn) => {
      if (typeof fn !== "function") {
        throw new Error("Second argument must be a function");
      }
      if (!this.observer[subscribeKey]) {
        this.observer[subscribeKey] = [];
      }
      const token = this.generateUuid("emitter");
      this.observer[subscribeKey].push({
        token,
        handler: fn
      });
      return token;
    };
    this.emit = (key, args, token) => {
      let events = this.observer[key];
      if (events) {
        if (token) {
          events = events.filter((subscriber) => subscriber.token === token);
        }
        ;
        events.forEach((subscriber) => {
          subscriber.handler.call(this, args);
        });
      }
      ;
    };
    this.unSubscribe = (key, token) => {
      const event = this.observer[key];
      if (!event)
        return;
      if (token) {
        this.observer[key] = this.observer[key].filter((subscriber) => subscriber.token !== token);
      } else {
        delete this.observer[key];
      }
      ;
    };
    this.observer = {};
  }
};
console.log(new EMITTER().subscribe("0091", () => {
}));
var src_default = EMITTER;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
