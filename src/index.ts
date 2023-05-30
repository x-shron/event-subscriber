

export type Subscribe= (key: string,fn: Function) => string
export type UnSubscribe= (key: string,token: string) => void
export type Emit= (key: string,args: any,token: string) => void

interface Observer {
    token: string,
    handler: Function
}

let  _currentId = 0;

class EMITTER {
    
    private observer: Record<string, Observer[]>;

    constructor() {
        this.observer = {};
    }

    private generateUuid = (str?: string): string =>{
        _currentId += 1;
        const time = new Date().getTime()
        return `${time.valueOf()}-${str || ""}${_currentId}`
     }
     /**
     * @description subscribe 订阅
     * @param subscribeKey: 订阅类型key值
     * @param fn: 订阅回调事件；
     * @returns token 订阅token标记;
     * 
    */
    public subscribe: Subscribe = (subscribeKey,fn) =>{
        if(typeof fn !== 'function'){
            throw new Error('Second argument must be a function')
        }
        if(!this.observer[subscribeKey]){
            this.observer[subscribeKey] = []
        }
        const token = this.generateUuid('emitter')
        this.observer[subscribeKey].push({
            token,
            handler: fn
        })
        return token;
    };

    
    public emit: Emit = (key,args,token) =>{
        let events  = this.observer[key];
        if(events){
            if(token){
                events = events.filter(subscriber => subscriber.token === token)
            };
            events.forEach( (subscriber) => {
                subscriber.handler.call(this, args);
            });
        };
    };

    public unSubscribe: UnSubscribe= (key,token) =>{
        const event = this.observer[key];
        if(!event) return;
        if(token){
            this.observer[key] = this.observer[key].filter(subscriber => subscriber.token !== token)
        }else{
            delete this.observer[key]
        };
    };
    
}

console.log(new EMITTER().subscribe('0091',()=>{}))

export default EMITTER;
