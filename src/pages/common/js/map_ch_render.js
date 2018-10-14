import echarts from 'echarts'
import chinajs from './china'
import {
    chinaGeo
} from './geocoord_collection'

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = chinaGeo.find(item=>item.name==data[i]["省"]);
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
    var dataLen = data.length;
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
            trigger: 'item',
            textStyle:{
                fontSize:30,
            },
            padding:10,
            formatter:(params)=>{
                // return dataLen - 1 - params.dataIndex + ' ' + params.name + ' ' + params.value[2]
                return params.name + ' ' + params.value[2]
            }
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
                    // show: true
                }
            },
            top:'5%',
            bottom:'5%',
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
        series: [
            // {
            //     name: '国内合作',
            //     type: 'scatter',
            //     coordinateSystem: 'geo',
            //     data: convertData(data.sort(function (a, b) {
            //         return b.value - a.value;
            //     }).slice(5)),
            //     symbolSize: function (val,index) {
            //         console.log('index',index)
            //         return Math.max(10,Math.min(20,val[2] / 200));
                    
            //     },
            //     rippleEffect: {
            //         brushType: 'stroke'
            //     },
            //     label: {
            //         normal: {
            //             formatter:'',
            //             show: true
            //         },
            //         emphasis: {
            //             formatter: '{b}',
            //             position: 'right',
            //             show: true
            //         }
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: '#ddb926'
            //         }
            //     }
            // },
            {
                name: '国内合作',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                    return Number(a["论文数量"]) - Number(b["论文数量"]);
                })),
                symbolSize: function (val,ref) {
                    // return val[2] / 10;
                    // console.log(ref)
                    if(ref.dataIndex > dataLen-6){
                        return Math.max(30, Math.min(40, val[2] / 700));
                    }else{
                        return Math.max(20, Math.min(30, val[2] / 200));
                    }
                },
                showEffectOn: 'emphasis',
                rippleEffect: {
                    brushType: 'stroke',
                    scale:4
                },
                hoverAnimation: true,
                label: {
                     normal: {
                             formatter: '',
                             show: true
                         },
                    emphasis: {
                        formatter: '',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#edb318',
                        shadowBlur: 10,
                        shadowColor: '#333',
                        
                    },
                    emphasis: {
                        color: 'yellow',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    },
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
    var dataIndexes = new Array(data.length).fill('0').map((item,index)=>index);
    var interval = setInterval(next,2000);
    next();
    var flag = false; 
    function next(){
        var lastIndex;
        if(flag){
             lastIndex = dataIndexes.shift()
             dataIndexes.push(lastIndex)
        }else{
            flag =true;
        }
        let index = dataIndexes[0]
        
        chart.dispatchAction({
            type:'highlight',
            seriesName: '国内合作',
            dataIndex:index
        })
        flag &&  chart.dispatchAction({
            type: 'downplay',
            seriesName: '国内合作',
            dataIndex: lastIndex
        })
        chart.dispatchAction({
            type: 'showTip',
            seriesIndex:0,
            dataIndex: index
        })
       
    }

    return chart;
}

export default map_ch_render;