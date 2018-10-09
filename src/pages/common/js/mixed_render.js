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
                barWidth:'60%',
                data: _data.map(item => item["热点论文"])
            },
            {
                name: 'top papers',
                type: 'line',
                symbol: "image://data:image/svg+xml;utf8,<svg t='1539005381794' class='icon'  viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2438' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='200'><defs><style type='text/css'></style></defs><path fill='white' d='M261.5712 508.7936c0 110.5728 89.6448 250.2368 250.2368 250.2368 110.5728 0 250.2368-89.664 250.2368-250.2368 0-110.592-89.664-250.2368-250.2368-250.2368-110.592 0-250.2368 89.664-250.2368 250.2368z' p-id='2439' data-spm-anchor-id='a313x.7781069.0.i3' ></path><path fill='white' d='M511.808 32.5568C248.7872 32.5568 35.5712 245.7728 35.5712 508.7936c0 263.0208 213.216 476.2368 476.2368 476.2368 263.0208 0 476.2368-213.216 476.2368-476.2368C988.0448 245.7728 774.8096 32.5568 511.808 32.5568z m0 898.7904c-233.3568 0-422.5344-189.1776-422.5344-422.5344 0-233.3568 189.1776-422.5344 422.5344-422.5344 233.376 0 422.5344 189.1968 422.5344 422.5344 0 233.3568-189.1584 422.5344-422.5344 422.5344z' p-id='2439' data-spm-anchor-id='a313x.7781069.0.i3'></path><path fill='white' d='M508.56 829.44c-175.04256 0-317.44-142.39744-317.44-317.44s142.39744-317.44 317.44-317.44 317.44 142.39744 317.44 317.44-142.39744 317.44-317.44 317.44z M261.5712 508.7936c0 110.5728 89.6448 250.2368 250.2368 250.2368 110.5728 0 250.2368-89.664 250.2368-250.2368 0-110.592-89.664-250.2368-250.2368-250.2368-110.592 0-250.2368 89.664-250.2368 250.2368z'  p-id='2595'></path></svg>",
                symbolSize: 30,
                lineStyle: {
                    width: 4,
                    color:'white'
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