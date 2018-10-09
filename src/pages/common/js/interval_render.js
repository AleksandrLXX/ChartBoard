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
            gridIndex:0,
            type: 'category',
            axisTick: {
                show: false
            },
            data: _data[0].category
        },
         {
            gridIndex: 1,
            type: 'category',
            axisTick: {
                show: false
            },
            data: _data[1].category
        }, {
            gridIndex: 2,
            type: 'category',
            axisTick: {
                show: false
            },
            data: _data[2].category
        }, {
            gridIndex: 3,
            type: 'category',
            axisTick: {
                show: false
            },
            data: _data[3].category
        }, {
            gridIndex: 4,
            type: 'category',
            axisTick: {
                show: false
            },
            data: _data[4].category
        } 
    ],
        grid:[
            {   
                // id:'期刊论文',
                bottom:'10%',
                width:'15%',
                left:'20%',
            },
            {   
                // id:'会议论文',
                bottom:'10%',
                width: '15%',
                left:'32%',
            },
            {   
                // id:'学位论文',
                bottom:'10%',
                 width: '15%',
                left:'44%',
            },
            {   
                // id:'图书',
                bottom:'10%',
                 width: '35%',
                left:'55%',
            },
            {   
                // id:'专利',
                bottom:'10%',
                width: '35%',
                left:'75%',
            },
        ],
        yAxis: [{
            gridIndex: 0,
            type: 'value'
        }, {
            gridIndex: 1,
            type: 'value',
            show:false
        }, {
            gridIndex: 2,
            type: 'value',
                show: false
        }, {
            gridIndex: 3,
            type: 'value',
                show: false
        }, {
            gridIndex: 4,
            type: 'value',
                show: false
        }, ],
        series:_data.reduce((prev,next)=>{
            prev.push(...series.map(serie => {
                return {
                    name: serie,
                    type: 'bar',
                    barGap: 0,
                    barWidth: next.stack ? '100%': 'auto',
                    stack: next.stack?'成果'+next.category:null,
                    xAxisIndex: next.index,
                    yAxisIndex: next.index,
                    label: labelOption,
                    data: [next[serie]]
                }
            }))
            return prev;
        },[])
    }
}
var interval_render = (id, data, series) => {
    var chart = echarts.init(document.getElementById(id), 'user');
    // 绘制图表
    console.log('option',mergeOption(data, series))
    chart.setOption(mergeOption(data, series));
    return chart;
}

export default interval_render;