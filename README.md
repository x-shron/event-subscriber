# Usage

## subscribe
```
import EMITTER from '@shron/event-subscriber';

const emitter =  new EMITTER();

const currentToken1 = emitter.subscribe('9999',()=>{ 
    console.log('订阅执行了1')
})
const currentToken2 = emitter.subscribe('9999',()=>{ 
    console.log('订阅执行了2')
})
```

## emit

```
emitter.emit('9999')
```


## unSubscribe

```
emitter.unSubscribe('9999')
```
or
```
emitter.unSubscribe('9999', currentToken1)
```