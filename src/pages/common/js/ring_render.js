import echarts from 'echarts'

var mergeOption = function (data, title) {
    let _data = data.sort((prev,next)=>next.name==title?1:-1)
    return {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title:{
            text:title,
            top:'bottom',
            show:true,
            left:"center",
        },
        legend: {
            show:false,
            orient: 'vertical',
            x: 'left',
            data:_data.map(item => item.name)
        },
        series: [{
            name: '成果数量(分学科)',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
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
            data: _data
        }]
    }
}
var ring_render = (id, data, title) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    // 绘制图表
    chart.setOption(mergeOption(data, title));
    return chart;
}

export default ring_render;