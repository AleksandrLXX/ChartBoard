import echarts from 'echarts'
import world from  './world.js' 
import {country} from './geocoord_collection'


function makeMapData(rawData) {
    var mapData = [];
    for (var i = 0; i < rawData.length; i++) {
        var geoCoord = country[rawData[i][0]];
        if (geoCoord) {
            mapData.push({
                name: rawData[i][0],
                value: geoCoord.concat(rawData[i].slice(1))
            });
        }
    }
    return mapData;
};

function makeParallelAxis(schema) {
    var parallelAxis = [];
    for (var i = 1; i < schema.length; i++) {
        parallelAxis.push({
            dim: i,
            name: schema[i]
        });
    }
    return parallelAxis;
}

var mergeOption = function (data, schema) {
    let _data = data
    return {
    backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
        offset: 0,
        color: '#4b5769'
    }, {
        offset: 1,
        color: '#404a59'
    }]),
    title: {
        text: '复旦国际合作情况总览',
        subtext: '',
        sublink: '',
        left: 'center',
        top: 5,
        itemGap: 0,
        textStyle: {
            color: '#eee',
            fontFamily:'微软雅黑',
        },
        z: 200
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + '.' + value[1];
            return params.seriesName + '<br/>' + params.name + ' : ' + value;
        }
    },
    toolbox: {
        show: true,
        left: 'right',
        iconStyle: {
            normal: {
                borderColor: '#ddd'
            }
        },
        feature: {},
        z: 202
    },
    brush: {
        geoIndex: 0,
        brushLink: 'all',
        inBrush: {
            opacity: 1,
            symbolSize: 14
        },
        outOfBrush: {
            color: '#000',
            opacity: 0.2
        },
        z: 10
    },
    geo: {
        map: 'world',
        silent: true,
        label: {
            emphasis: {
                show: false,
                areaColor: '#eee'
            }
        },
        itemStyle: {
            normal: {
                borderWidth: 0.2,
                borderColor: '#404a59'
            }
        },
        left: '6%',
        top: 70,
        bottom: '40%',
        right: '14%',
        roam: true
        // itemStyle: {
        //     normal: {
        //         areaColor: '#323c48',
        //         borderColor: '#111'
        //     },
        //     emphasis: {
        //         areaColor: '#2a333d'
        //     }
        // }
    },
    parallelAxis: makeParallelAxis(schema),
    grid: [{
        show: true,
        left: 0,
        right: 0,
        top: '63%',
        bottom: 0,
        borderColor: 'transparent',
        backgroundColor: '#404a59',
        z: 99
    }, {
        show: true,
        left: 0,
        right: 0,
        top: 0,
        height: 28,
        borderColor: 'transparent',
        backgroundColor: '#404a59',
        z: 199
    }],
    parallel: {
        top: '65%',
        left: 60,
        right: 20,
        bottom: 100,
        axisExpandable: true,
        axisExpandCenter: 15,
        axisExpandCount: 10,
        axisExpandWidth: 60,
        axisExpandTriggerOn: 'mousemove',

        z: 100,
        parallelAxisDefault: {
            type: 'value',
            nameLocation: 'start',
            nameRotate: 25,
            // nameLocation: 'end',
            nameTextStyle: {
                fontSize: 28
            },
            nameTruncate: {
                maxWidth: 170
            },
            nameGap: 20,
            splitNumber: 3,
            tooltip: {
                show: true
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: 'rgba(255,255,255,0.3)'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            z: 100
        }
    },
    series: [{
            name: '复旦国际合作情况总览',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: makeMapData(data),
            activeOpacity: 1,
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
            symbolSize: 20,
            // symbolSize: function (data) {
            //     return Math.max(5, data[2] / 5);
            // },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    color: '#577ceb',
                }
            }
        },
        {
            name: 'parallel',
            type: 'parallel',
            smooth: true,
            lineStyle: {
                normal: {
                    color: '#577ceb',
                    width: 0.5,
                    opacity: 0.6
                }
            },
            z: 100,
            blendMode: 'lighter',
            data: data
        }
    ]
    }
}

var map_world_render = (id, data, schema) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    // 绘制图表
    chart.setOption(mergeOption(data, schema));
    return chart;
}

export default map_world_render;