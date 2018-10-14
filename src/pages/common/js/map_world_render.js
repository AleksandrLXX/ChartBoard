import echarts from 'echarts'
import world from  './world.js' 
import {worldGeo} from './geocoord_collection'

var groupColors = [
    
    "#c12e34",
    "#e6b600",
    "#0098d9",
    "#2b821d",
    "#005eaa",
    "#339ca8",
    "#cda819",
    "#32a487",
    "#2ec7c9",
    "#b6a2de",
    
]

function makeMapData(rawData,groupIndex,step) {
    var mapData = [];
    for (let i = 0; i < rawData.length; i++) {
        var geoCoord = worldGeo[rawData[i][0]];
        if (geoCoord) {
            mapData.push({
                name: rawData[i][0],
                value: geoCoord.concat(rawData[i].slice(1)),
                emphasis:{
                    itemStyle: i / step >= groupIndex && i / step < groupIndex + 1?{
                        color:  groupColors[i%step],
                        opacity:1,
                    }:{},
                    
                },
                // tooltip:{
                //     // show:true,
                //     trigger:'item',
                //     textStyle:{
                //         fontSize:40,
                //         color: groupColors[i % step]
                //     },
                //     position: [(i % step) * 7 + 5  + '%', '61%' ],
                //     formatter(params){
                //         return params.name
                //     }
                // },
                

            });
        }else{
            console.log('国家信息缺失',rawData[i][0])
        }
    }
    return mapData;
};

function makeParallelAxis(schema) {
    var parallelAxis = [];
    let splitN = Math.floor(schema.length/3)
    for (var i = 1; i < schema.length; i++) {
        parallelAxis.push({
            dim: i,
            name: schema[i],
            axisLabel: {
                show: false,
                color: (i == 1 || i == schema.length-1 || i % splitN == 0) ? '#ffffff' : 'transparent',
                margin: i == schema.length - 1?-90:8
            },
        });
    }
    return parallelAxis;
}

var mergeOption = function (data, schema,groupIndex,step) {
    // data = data.slice(0,10)
    let c_w = $('#国际合作1').width(); 
    let c_h = $('#国际合作1').height();
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
        show:false,
        trigger: 'item',
        
    },
    toolbox: {
        show: false,
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
    graphic: data.slice(groupIndex * step, groupIndex * step+step).map((item,index)=>{
        return {
            type:'text',
            style:{
                text:item[0],
                font: 'normal 1.2em "Microsoft YaHei"',
                fill: '#ffffff',  //groupColors[index]
            },
            position: [ c_w*((index % step) * 10 + 5)/100, c_h*61/100 ],
            zlevel:2
        }
    }).concat(data.slice(groupIndex * step, groupIndex * step + step).map((item, index) => {
        return {
            type: 'circle',
            style: {
                fill:groupColors[index],
                
            },
            shape:{
                r: 20,
                cx: -40,
                cy: 20,
            },
            position: [c_w * ((index % step) * 10 + 5) / 100, c_h * 61 / 100],
            zlevel: 2
        }
    })),
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
        z:200,
        gridIndex:0,
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
        top: '60%',
        bottom: 0,
        borderColor: 'transparent',
        backgroundColor: '#000',//'#333',
        z: 99
    }, {
        show: true,
        left: 0,
        right: 0,
        top: 0,
        height: '60%',
        borderColor: 'transparent',
        backgroundColor: '#404a59',
        z: 199
    }],
    parallel: {
        top: '65%',
        left: 80,
        right: 20,
        bottom: 100,
        axisExpandable: false,
        axisExpandCenter: 15,
        axisExpandCount: 20,
        axisExpandWidth: 200,
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
            // maxInterval:1000,
            // minInterval:2000,
            max:Math.max(...data.slice(groupIndex*step,groupIndex*step+step)[0].slice(1)),
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
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: makeMapData(data,groupIndex,step),
            activeOpacity: 1,
            label: {
                normal: {
                    formatter: '',
                    show: true
                },
               
            },
            groupIndex:0,
            showEffectOn: 'emphasis',
            rippleEffect: {
                brushType: 'stroke',
                scale:5,
                period:8
            },
            symbolSize: function(data,params){
                if(params.dataIndex/step>=groupIndex && params.dataIndex/step < groupIndex+1){
                    return 30
                }else{
                    return 20
                }
            },
            z:201,
            // symbolSize: function (data) {
            //     return Math.max(5, data[2] / 5);
            // },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    color: '#3a4351',
                    opacity:0.6
                },
                // emphasis: {
                //     color: 'blue',
                //     shadowBlur: 10,
                //     shadowColor: '#333'
                // },
            }
        },
        {
            name: '逐年合作数量趋势',
            type: 'parallel',
            smooth: true,
            lineStyle: {
                normal: {
                    color: '#577ceb',
                    width: 0.5,
                    opacity: 0.6
                },
                emphasis:{
                     color: '#ffffff',
                     width:  0.5,
                     opacity: 1
                }
            },
            // emphasis:{
            //     lineStyle:{
            //         color: '#ffffff',
            //         width: 0.5,
            //         opacity: 1
            //     }
            // },
            z: 100,
            blendMode: 'lighter',
            data: data.map((item,index)=>{
                return {
                    name:item[0],
                    value:item,
                     lineStyle: {
                        normal: index/step>=groupIndex&&index/step<groupIndex+1?{
                            color: groupColors[index % step],
                            width: 4,
                            opacity: 0.8
                        }: {
                            color: 'transparent',
                            width: 0.5,
                            opacity: 0.2
                        }
                    },
                    color: groupColors[index%10],
                    width:10,
                    emphasis:{
                        lineStyle:{
                        }
                    }
                }
            })
        }
    ]
    }
}

var map_world_render = (id, data, schema,step=5,interval=5,swipeAmt=6) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    var  dom = $('#'+id)
    var  groupIndexes = new Array(Math.ceil(data.length/step)).fill('0').map((item,index)=>index).slice(0,swipeAmt)
    // 绘制图表
    // chart.setOption(mergeOption(data, schema));
   
    var next = function(){
        let groupIndex = groupIndexes[0]
        // let groupIndex =1 
        dom.find('.toolTip').remove()
        chart.setOption(mergeOption(data, schema,groupIndex,step));
        for(let i=0;i<step;i++){
            let index = i+step*groupIndex;
            chart.dispatchAction({
                type: 'highlight',
                seriesName: '复旦国际合作情况总览',
                dataIndex: index
            })
            chart.dispatchAction({
                type: 'highlight',
                seriesName: '逐年合作数量趋势',
                name:data[index][0]
                // dataIndex: index
            })

            chart.dispatchAction({
                type: 'showTip',
                // seriesName: '复旦国际合作情况总览',
                seriesIndex: 0,
                dataIndex: index
            })

            // dom.append(dom.find('div:nth-child(2)').clone().addClass('toolTip'))
        }
        

        groupIndexes.push(groupIndexes.shift())
    }
    next();
    setInterval(next,interval*1000)
    // console.log(JSON.stringify(echarts.getMap('world').geoJson.features.map(item=>item.properties.name)))
    // console.log(JSON.stringify(echarts.getMap('china').geoJson.features.map(item => item.properties.name)))

    return chart;
}

export default map_world_render;