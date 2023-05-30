export declare type Subscribe = (key: string, fn: Function) => string;
export declare type UnSubscribe = (key: string, token: string) => void;
export declare type Emit = (key: string, args: any, token: string) => void;
declare class EMITTER {
    private observer;
    constructor();
    private generateUuid;
    /**
    * @description subscribe 订阅
    * @param subscribeKey: 订阅类型key值
    * @param fn: 订阅回调事件；
    * @returns token 订阅token标记;
    *
   */
    subscribe: Subscribe;
    emit: Emit;
    unSubscribe: UnSubscribe;
}
export default EMITTER;
