import echarts from 'echarts'


var mergeOption = function (data, title) {
    let _data = data.sort((prev,next)=>Number(prev["出版年"])-Number(next["出版年"]))
    return {
        xAxis: {
            type: 'category',
            data: _data.map(item => item["出版年"]),
            axisLine:{
                show:true,
            }
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
            data: _data.map(item => item["成果数量"]),
            type: 'line'
        }]
    }
}
var line_render = (id, data,title) => {
    var chart = echarts.init(document.getElementById(id),'user');
    // 绘制图表
    chart.setOption(mergeOption(data,title));
    return chart;
}

export default line_render;