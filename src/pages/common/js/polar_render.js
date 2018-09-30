import echarts from 'echarts'

var mergeOption = function (data, title, series) {
    let _data = data
    
    return {
        title:{
            text:title,
            top:"top",
            left:"left",
        },
        angleAxis: {
            show:false,
        },
        radiusAxis: {
            type: 'category',
            data: _data.map(item=>item.category),
            boundaryGap: ["20%","20%"],
            max:'dataMax',
            z: 100,
            splitArea:{
                interval:1
            }
        },
        polar: {
          center:["50%","50%"],
        //   radius:[0,"100%"]
        },
        series: series.map(serie => {
                return {
                    name: serie,
                    type: 'bar',
                    barWidth:'80%',
                    barGap: '0%',
                    barCategoryGap:'30%',
                    stack:'a',
                    coordinateSystem: 'polar',
                    data: _data.map((item, index) => item[serie] ? [index, item[serie]] : undefined).filter(item => item)
                }
            }),
        legend: {
            show: true,
            data: series
        }
    }
}
var polar_render = (id, data, title, series) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    // 绘制图表
    chart.setOption(mergeOption(data, title, series));
    return chart;
}

export default polar_render;