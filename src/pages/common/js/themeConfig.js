;(function (root, factory) {
	'use strict'
	/* istanbul ignore next */
	if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		exports = module.exports = factory()
	} else {
		// @deprecated
		root.themeConfig = factory()
	}
})(this, function () {
    var contrastColor = '#eee';
    var axisCommon = function () {
        return {
            axisLine: {
                lineStyle: {
                    color: contrastColor
                },
                show: false
            },
            axisTick: {
                lineStyle: {
                    color: contrastColor
                },
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: contrastColor,
                    fontSize: 30
                }
            },

            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#aaa'
                },
                show: false,
            },
            splitArea: {
                areaStyle: {
                    color: contrastColor
                }
            }
        };
    };

    var colorPalette = ['#7ba79d', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'];
    var theme = {
        color: colorPalette,
        backgroundColor: '#404a59',
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: contrastColor
                },
                crossStyle: {
                    color: contrastColor
                }
            }
        },
        legend: {
            textStyle: {
                color: contrastColor,
                fontSize: 26,
            }
        },
        textStyle: {
            color: contrastColor,
            fontSize: 21,
        },
        title: {
            textStyle: {
                color: contrastColor,
                fontSize: 50,
                fontWeight: 'normal',
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: contrastColor
                }
            }
        },
        dataZoom: {
            textStyle: {
                color: contrastColor
            }
        },
        timeline: {
            lineStyle: {
                color: contrastColor
            },
            itemStyle: {
                normal: {
                    color: colorPalette[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: contrastColor
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: contrastColor,
                    borderColor: contrastColor
                }
            }
        },
        timeAxis: axisCommon(),
        logAxis: axisCommon(),
        valueAxis: axisCommon(),
        categoryAxis: axisCommon(),

        line: {
            symbol: 'circle'
        },
        graph: {
            color: colorPalette
        },
        gauge: {
            title: {
                textStyle: {
                    color: contrastColor
                }
            }
        },
        candlestick: {
            itemStyle: {
                normal: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                }
            }
        },

    };
    theme.categoryAxis.splitLine.show = false;

    return theme;
})


