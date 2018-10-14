;(function (root, factory) {
    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        exports = module.exports = factory(require('echarts'));
    } else {
        // Browser globals
        root.multi_ring_render = factory(root.echarts);
    }
})(this, function (echarts) {
    var mergeOption = function (data,title,series,width,height) {
    let _data = data;
    let len = _data.length
    let rootDom =getComputedStyle(document.querySelector(':root'));
   
    return {
        color:["#abc0d1","#a5ab81","#7ba790","#407097"],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        splitArea:{
            areaStyle:{
                color:'#f0f'
            }
        },
        title:{
            text:title,
            top:'top',
            show:true,
            left:"left",
        },
        legend: {
            show:true,
            // orient: 'vertical',
            x: 'right',
            padding:20,
            data:series.map(item=>{
                return {
                    name:item,
                    icon: 'path://M10 15 v 80 h 80 v -80 z'
                }
            })
        },
        // 辅助图形
        graphic:{
            elements:data.map((item,index)=>{
                return {
                    type:'text',
                   
                    // top:'top',
                    style:{
                        text:item.category,
                        fill:'#fff',
                        textAlign:'center',
                        font:'40px bolder',
                        x:width*(100/len*(1/2+index))/100,
                        y:height*0.8
                    },
                    
                }
            })
        },
        series: data.map((item,index)=>{
            return [{
                name: item.category,
                type: 'pie',
                center:[100/len*(1/2+index)+'%','50%'],
                radius: ['38%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    
                        show: false,
                        position: 'bottom',
                        distance:200,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        },
                        formatter: function (params) {
                            return params.dataIndex=='0'?params.seriesName:''
                        }
                    
                },
                labelLine: {
                    show:false,
                },
                itemStyle: {
                    borderColor:'transparent',
                    borderWidth: 0,
                    shadowColor:'rgba(0, 0, 0, 0.0)'
                },
                data: item.items.map(i_item=> {
                    return {
                        name:i_item['学科'],
                        value:Number(i_item['数量'])
                    }
                })
            },{
                name: item.category,
                type: 'pie',
                center:[100/len*(1/2+index)+'%','50%'],
                radius: ['26%', '38%'],
                avoidLabelOverlap: false,
                itemStyle:{
                    color:params=>{
                       return ['#d0dfeb','#d7dacb','#c5d8d4','#94b6d2'][params.dataIndex]
                    },
                    borderWidth:0
                },
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        },
                        
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        },
                        formatter:'{c}'
                        
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                
                data: item.items.map(i_item=> {
                    return {
                        name:i_item['学科'],
                        value:Number(i_item['数量'])
                    }
                })
            },{
                name: item.category,
                type: 'pie',
                center:[100/len*(1/2+index)+'%','50%'],
                radius: ['0%', '26%'],
                itemStyle:{
                    color:'#abafb6',
                    borderWidth: 0
                },
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        },
                        formatter: function (params) {
                            return params.dataIndex==0 ? params.value :''
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        },
                        formatter:'{c}'
                        
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: item.items.map(i_item=> {
                    return {
                        name:i_item['学科'],
                        value:Number(i_item['数量']),
                    }
                })
            }]
        }).reduce((prev,next)=>{
            prev.push(...next)
            return prev;
        },[])
    }
}
var multi_ring_render = (id, data, title,series) => {
    var dom = document.getElementById(id)
    var chart = echarts.init(dom, 'user');
    // 绘制图表
    chart.setOption(mergeOption(data, title,series,$(dom).width(),$(dom).height()));
    return chart;
}

  return multi_ring_render;
})



