import echarts from 'echarts'


var mergeOption = function (data, title) {
    let _data = data.sort((prev,next)=>Number(prev["出版年"])-Number(next["出版年"]))
    return {
        xAxis: {
            type: 'category',
            data: _data.map(item =>{
                return {
                    value:item["出版年"]
                }
            }),
            axisLine:{
                show:true,
            }
        },
        yAxis: {
            type: 'value',
            // min:'dataMin'
        },
        
        title: {
            left: 'center',
            top: 30,
            text: title,
        },
        
        graphic:{
        type:'ring'
        },
        series: [{
            symbol: "image://data:image/svg+xml;utf8,<svg t='1539005381794' class='icon'  viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2438' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='200'><defs><style type='text/css'></style></defs><path fill='white' d='M261.5712 508.7936c0 110.5728 89.6448 250.2368 250.2368 250.2368 110.5728 0 250.2368-89.664 250.2368-250.2368 0-110.592-89.664-250.2368-250.2368-250.2368-110.592 0-250.2368 89.664-250.2368 250.2368z' p-id='2439' data-spm-anchor-id='a313x.7781069.0.i3' ></path><path fill='%237ba79d' d='M511.808 32.5568C248.7872 32.5568 35.5712 245.7728 35.5712 508.7936c0 263.0208 213.216 476.2368 476.2368 476.2368 263.0208 0 476.2368-213.216 476.2368-476.2368C988.0448 245.7728 774.8096 32.5568 511.808 32.5568z m0 898.7904c-233.3568 0-422.5344-189.1776-422.5344-422.5344 0-233.3568 189.1776-422.5344 422.5344-422.5344 233.376 0 422.5344 189.1968 422.5344 422.5344 0 233.3568-189.1584 422.5344-422.5344 422.5344z' p-id='2439' data-spm-anchor-id='a313x.7781069.0.i3'></path><path fill='%237ba79d' d='M508.56 829.44c-175.04256 0-317.44-142.39744-317.44-317.44s142.39744-317.44 317.44-317.44 317.44 142.39744 317.44 317.44-142.39744 317.44-317.44 317.44z M261.5712 508.7936c0 110.5728 89.6448 250.2368 250.2368 250.2368 110.5728 0 250.2368-89.664 250.2368-250.2368 0-110.592-89.664-250.2368-250.2368-250.2368-110.592 0-250.2368 89.664-250.2368 250.2368z'  p-id='2595'></path></svg>",
            symbolSize:30,
            lineStyle:{
                width:4
            },
            smooth: 0.1,
            data: _data.map(item => item["成果数量"]),
            type: 'line'
        }]
    }
}
var line_render = (id, data) => {
    var chart = echarts.init(document.getElementById(id),'user');
    // 绘制图表
    var keys = Object.keys(data)
    var next = function(){
        let key = keys[0]
        chart.setOption(mergeOption(data[key],key));

        keys.push(keys.shift())
    }
    next()
    var interval = setInterval(next,5000)
    return chart;
}

export default line_render;