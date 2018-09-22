import  '../style/bootstrap-reboot.css'
import  '../style/bootstrap-grid.css'

import '../style/theme.css'

import echarts from 'echarts'

import userTheme from '../../common/js/themeConfig.js'
import map_ch_render from '../../common/js/map_ch_render.js'
import line_render from '../../common/js/line_render.js'
import board1Data from './fake.js'

// 不起作用 
// echarts.registerTheme('user',userTheme.theme)

const arr2obj = (arr,key='id')=>{
    let obj = {};
    arr.map(item=>{
        obj[item[key]] = obj[item[key]]||[];
         obj[item[key]].push(item)
    })
    return obj
}

var chart1Data = arr2obj(board1Data['成果数量(分年)'], 'type')

var chart1 = line_render('成果数量(分年)', chart1Data['期刊论文'], '期刊论文')
var chart6 = map_ch_render('国内合作',board1Data['国内合作'])
console.log(echarts)