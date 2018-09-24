import echarts from 'echarts'

var mergeOption = function (data, title) {
    let _data = data
    let max = _data.map(item => Number(item.value)).reduce((prev, next) => {
        next = prev + next
        return next
    }, 0)
    return {

        title: {
            text: title,
            show: false,
        },
        tooltip: {},
        legend: {
            show: false,
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    // backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: _data.map(item => {
                return {
                    name: item.key,
                    max: max
                }
            })
        },
        series: [{
            name: '成果数量',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                value: _data.map(item => item.value),
                name: '成果数量'
            }]
        }]
    }
}
var radar_render = (id, data, title) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    // 绘制图表
    chart.setOption(mergeOption(data, title));
    return chart;
}

export default radar_render;