;(function (root, factory) {
    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        exports = module.exports = factory(require('echarts'));
    } else {
        // Browser globals
        root.ring_render = factory(root.echarts);
    }
})(this, function (echarts) {
    var mergeOption = function (data, title) {
        let _data = data.sort((prev, next) => next.name == title ? 1 : -1)
        return {
            color: ['#7ba79d', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            title: {
                text: title,
                top: 'bottom',
                show: true,
                left: "center",
            },
            legend: {
                show: false,
                orient: 'vertical',
                x: 'left',
                data: _data.map(item => item.name)
            },
            series: [{
                name: '成果数量(分学科)',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: "#7ba79d",
                    borderWidth: 2,
                },
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        },
                        formatter: function (params) {
                            return params.dataIndex == 0 ? params.value : ''
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        },
                        formatter: '{c}'

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

    return ring_render;
})



