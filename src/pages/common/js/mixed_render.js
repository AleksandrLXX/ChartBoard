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
            top:"bottom"
        },
        xAxis:[{
            type: 'category',
            data: _data.map(item=>item.year),
            axisPointer: {
                type: 'shadow'
            }
        }],
        yAxis: [{
                type: 'value',
                name: "hot papers"
                
        }, {
            type: 'value',
            name: "top papers",
            // show:false

        }],
        series: [{
                name: 'hot papers',
                type: 'bar',
                data: _data.map(item => item["热点论文"])
            },
            
            {
                name: 'top papers',
                type: 'line',
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