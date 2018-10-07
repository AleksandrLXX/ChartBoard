import echarts from 'echarts';

var labelOption = {
    normal: {
        show: false,
        position: "insideBottom",
        distance:15,
        align: "left",
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    }
};

/**
 * 
 * @param {*} data 
 * @param {*} series 需要分出来的种类
 */
var mergeOption = function (data, series) {
    let _data = data

    return {
        color:["#968c8c","#7ba79d","#d8b25c",'#5b5353','#94b6d2','#a5ab81','#d7dacb','#c5d8d4'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: series
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            data: _data.map(item=>item.category)
        }],
        yAxis: [{
            type: 'value'
        }],
        series: series.map(serie=>{
            return {
                name:serie,
                type:'bar',
                barGap:0,
                label: labelOption,
                data: _data.map((item, index) => item[serie]?[index, item[serie]]:undefined).filter(item=>item)
            }
        })
    }
}
var interval_render = (id, data, series) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    // 绘制图表
    chart.setOption(mergeOption(data, series));
    return chart;
}

export default interval_render;