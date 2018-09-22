import echarts from 'echarts'
import themeConfig from './themeConfig'

var mergeOption = function (data, title) {
    let _data = data.sort((prev,next)=>prev.year-next.year)
    return Object.assign({}, themeConfig.theme,{
        xAxis: {
            type: 'category',
            data: _data.map(item => item.year)
        },
        yAxis: {
            type: 'value'
        },
        title: {
            left: 'center',
            top: 30,
            text: title,


        },
        series: [{
            data: _data.map(item => item.value),
            type: 'line'
        }]
    })
}
var line_render = (id, data,title) => {
    var chart = echarts.init(document.getElementById(id),'dark');
    // 绘制图表
    chart.setOption(mergeOption(data,title));
    return chart;
}

export default line_render;