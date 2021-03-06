;(function (root, factory) {
    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        exports = module.exports = factory(require('echarts'));
    } else {
        // Browser globals
        root.radar_render = factory(root.echarts);
    }
})(this, function (echarts) {
    
var mergeOption = function (data, title) {
    let _data = data.sort((prev, next) => Number(prev['优先级顺序']) - Number(next['优先级顺序'])).slice(0, 6)
    console.log(_data)
    let max = _data.map(item=>Number(item.value)).reduce((prev,next)=>{
        next = Math.max(prev,next)
        return next
    },0)*1.2
    return {
        
        title: {
            text: title,
            show:false,
        },
        
        tooltip: {},
        legend: {
            show:false,
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    fontSize:25,
                    color: '#fff',
                    rotate:true,
                    borderRadius: 3,
                    padding: [0, -5]
                }
            },
             splitArea: {
                 show: false
             },
            indicator: _data.map(item=>{
                return {
                    name:item.key,
                    max:max
                }
            })
        },
        series: [{
            name: '成果数量',
            type: 'radar',
            // areaStyle: {normal: {}},
            symbol: 'emptyCircle',
            symbolSize: 20,
            lineStyle: {
                width: 4
            },
            data: [{
                    value:_data.map(item=>item.value),
                    name: '成果数量'
                }
            ]
        }]
    }
}
var radar_render = (id, data, title) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    // 绘制图表
    chart.setOption(mergeOption(data, title));
    return chart;
}

return radar_render;
})


