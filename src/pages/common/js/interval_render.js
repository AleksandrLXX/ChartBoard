import echarts from 'echarts';

var labelOption = {
    normal: {
        show: true,
        position: "insideTop",
        distance:0,
        align: "left",
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}',
        fontSize: 20,
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
            data: series,

            top:'2%',
            left:'0%'
        },
        calculable: true,
        graphic:[{
            type:'text',
            rotation:Math.PI/2,
            // bottom:'5%',
            // left:'15%',
            bounding:'raw',
            position:[145,710],
            style:{
                text:'期刊论文',
                fill:'#fff',
                // textAlign:'center',
                // textVerticalAlign:'middle',
                font:'30px',
            },
            z:5,
        }, {
            type: 'text',
            rotation: Math.PI / 2,
            // bottom:'5%',
            // left:'15%',
            bounding: 'raw',
            position: [205, 710],
            style: {
                text: '会议论文',
                fill: '#fff',
                // textAlign:'center',
                // textVerticalAlign:'middle',
                font: '30px',
            },
            z: 5,
        }, {
            type: 'text',
            rotation: Math.PI / 2,
            // bottom:'5%',
            // left:'15%',
            bounding: 'raw',
            position: [258, 710],
            style: {
                text: '学位论文',
                fill: '#fff',
                // textAlign:'center',
                // textVerticalAlign:'middle',
                font: '30px',
            },
            z: 5,
        }, {
            type: 'text',
            // rotation: Math.PI / 2,
            // bottom:'5%',
            // left:'15%',
            bounding: 'raw',
            position: [400, 605],
            style: {
                text: "图书",
                fill: '#fff',
                // textAlign:'center',
                // textVerticalAlign:'middle',
                font: '30px',
            },
            z: 5,
        }, {
            type: 'text',
            // rotation: Math.PI / 2,
            // bottom:'5%',
            // left:'15%',
            bounding: 'raw',
            position: [600, 605],
            style: {
                text: "专利",
                fill: '#fff',
                // textAlign:'center',
                // textVerticalAlign:'middle',
                font: '30px',
            },
            z: 5,
        }, ],
        xAxis: [{
            gridIndex:0,
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel:{
                fontSize:20,
                show:false
            },
            data: _data[0].category
        },
         {
            gridIndex: 1,
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 20,
                show: false
            },
            data: _data[1].category
        }, {
            gridIndex: 2,
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 20,
                show: false
            },
            data: _data[2].category
        }, {
            gridIndex: 3,
            type: 'category',
            axisTick: {
                show: false
            },
           
            axisLabel: {
                align:'left',
                // fontSize: 20,
                show: false
            },
            data: _data[3].category
        }, {
            gridIndex: 4,
            type: 'category',
            axisTick: {
                show: false
                
            },
            axisLabel: {
                align: 'left',
                // fontSize: 20,
                show: false,
                padding:0,
            },
            data: _data[4].category
        } 
    ],
        grid:[
            {   
                // id:'期刊论文',
                bottom:'18%',
                height:'70%',
                width:'20%',
                left:'20%',
            },
            {   
                // id:'会议论文',
                bottom:'18%',
                height:'70%',
                width: '20%',
                left:'28%',
            },
            {   
                // id:'学位论文',
                bottom:'18%',
                height:'70%',
                 width: '20%',
                left:'36%',
            },
            {   
                // id:'图书',
                bottom:'18%',
                height:'70%',
                width: '40%',
                left:'50%',
            },
            {   
                // id:'专利',
                bottom:'18%',
                height:'70%',
                width: '40%',
                left:'80%',
            },
        ],
        yAxis: [{
            gridIndex: 0,
            type: 'value',
            offset:15,
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
                    barWidth: next.stack ? '100%': '25%',
                    stack: next.stack?'成果'+next.category:null,
                    xAxisIndex: next.index,
                    yAxisIndex: next.index,
                    label: next.stack ? {show:false}:labelOption,
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