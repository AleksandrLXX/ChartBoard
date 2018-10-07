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
            subtext: 'data from PM25.in',
            sublink: 'http://www.pm25.in',
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
            }
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
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 20;
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
                }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 10;
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