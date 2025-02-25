var exportz;
var memory=new WebAssembly.Memory({
    initial:1344,
    maximum:36000,
});


WebAssembly.instantiateStreaming(
    fetch("qrBuilder.wasm"),{
        js:{
            mem:memory
        },
        env:{
            emscripten_resize_heap : function(delta){ memory.grow(delta);}
        }
    }
).then( 
    results =>{
        exportz=results.instance.exports;
        memory=results.instance.exports.memory;
    }
);