import echarts from 'echarts'
import chinajs from './china'
import {
    mMapPlace
} from './geocoord_collection'

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = mMapPlace.find(item=>item.name==data[i]["省"]);
        if (geoCoord) {
            res.push({
                name: data[i]["省"],
                value: [Number(geoCoord.log), Number(geoCoord.lat), Number(data[i]["论文数量"])]
            });
        }
    }
    return res;
};
var mergeOption = function(data,title){
    return  {
        title: {
            show:false,
            text: title,
            subtext: '国内合作',
            sublink: '',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['国内合作'],
            padding:20,
            textStyle: {
                color: '#fff'
            },
            show:false,
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
                name: '国内合作',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(5)),
                symbolSize: function (val) {
                    return Math.max(10,Math.min(20,val[2] / 200));
                    
                },
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 5)),
                symbolSize: function (val) {
                    // return val[2] / 10;
                    return Math.max(20, Math.min(30, val[2] / 600));
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    }
}
var map_ch_render = (id, data, title) => {
    var chart = echarts.init(document.getElementById(id),'user');
    // 绘制图表
    chart.setOption(mergeOption(data, title));
    return chart;
}

export default map_ch_render;