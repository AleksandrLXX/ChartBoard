import echarts from 'echarts'


var mergeOption = function (data, title) {
    let _data = data.sort((prev, next) => prev.year - next.year)
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        // toolbox: {
        //     show:false,
        //     feature: {
        //         dataView: {
        //             show: true,
        //             readOnly: false
        //         },
        //         magicType: {
        //             show: true,
        //             type: ['line', 'bar']
        //         },
        //         restore: {
        //             show: true
        //         },
        //         saveAsImage: {
        //             show: true
        //         }
        //     }
        // },
        legend: {
            data: ['hot papers', 'top papers'],
            left:"center",
            top:"bottom",
            padding:40,
            itemGap:30
        },
        grid:{
            bottom:'20%',
        },
        xAxis:[{
            type: 'category',
            data: _data.map(item=>item.year),
            axisPointer: {
                type: 'shadow'
            },
            axisLine: {
                show: true,
            }
        }],
        yAxis: [{
                type: 'value',
                name: "hot papers",
                nameTextStyle:{
                    color:'transparent'
                }
                
        }, {
            type: 'value',
            name: "top papers",
            show:false,
            // show:false

        }],
        series: [{
                name: 'hot papers',
                type: 'bar',
                barWidth:'50%',
                data: _data.map(item => item["热点论文"])
            },
            {
                name: 'top papers',
                type: 'line',
                symbol: 'emptyCircle',
                symbolSize: 12,
                lineStyle: {
                    width: 4
                },
                yAxisIndex: 1,
                data: _data.map(item => item["高被引论文"])
            }
        ]
    }
}
var mixed_render = (id, data, title) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    // 绘制图表
    chart.setOption(mergeOption(data, title));
    return chart;
}

export default mixed_render;