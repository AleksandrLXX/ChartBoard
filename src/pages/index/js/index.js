import  '../style/bootstrap-reboot.css'
import  '../style/bootstrap-grid.css'

import '../style/theme.css'

import echarts from 'echarts'

import userTheme from '../../common/js/themeConfig.js'
import map_ch_render from '../../common/js/map_ch_render.js'
import line_render from '../../common/js/line_render.js'
import interval_render from '../../common/js/interval_render.js'
import radar_render from '../../common/js/radar_render.js'
import mixed_render from '../../common/js/mixed_render.js'
import board1Data from './fake.js'

// 需要是 echarts 4 的配置方法
echarts.registerTheme('user', userTheme)

const arr2obj = (arr,key='id')=>{
    let obj = {};
    arr.map(item=>{
        obj[item[key]] = obj[item[key]]||[];
         obj[item[key]].push(item)
    })
    return obj
}

var chart1Data = arr2obj(board1Data['成果数量(分年)'], 'type')
var chart2Data;
var chart2Series = new Set();
{
    let temp_obj = {}
    let hasIssueType = false;
    board1Data['成果数量(分学科)'].map(item=>{
        !chart2Series.has(item["学科"]) && chart2Series.add(item["学科"])
        item["论文类型"] && (hasIssueType = true)
        item["论文类型"] && !chart2Series.has(item["论文类型"]) && chart2Series.add(item["论文类型"])
        temp_obj[item["成果类型"]] = temp_obj[item["成果类型"]] || [];
        temp_obj[item["成果类型"]].push(item)
    })
    chart2Data = Object.keys(temp_obj).map(key => {
        let arr = temp_obj[key];
        return Array.from(chart2Series).reduce(function(prev,next){
            prev[next] = arr.find(item => item["学科"] == next) ? Number(arr.find(item => item["学科"] == next)["成果数量"]):0;
            return prev;
        }, {
            category:key
        })
    })
}


console.log(chart2Data)

var chart3Data = board1Data['成果数量(分数据库)'].map(item=>{
    item.key = item["来源数据库"]
    item.value = item["成果数量"]
    return item;
})

var chart4Data = board1Data['高被引及热点论文数量'].reduce((prev,next)=>{
    let target = prev.length > 0 ? prev.find(item => item["出版年"] == next["出版年"]) || next: next
    if(target==next){
        prev.push(next);
    }
    target.year = next["出版年"]
    target[next["类型"]] = Number(next["成果数量"])
    return prev;
},[])
console.log(chart3Data)
console.log(chart4Data)
var chart1 = line_render('成果数量(分年)', chart1Data['期刊论文'], '期刊论文')
var chart2 = interval_render('成果数量(分学科)',chart2Data,Array.from(chart2Series))
var chart3 = radar_render('成果数量(分数据库)', chart3Data, '成果数量(分数据库)')
var chart4 = mixed_render('高被引及热点论文数量', chart4Data)

var chart6 = map_ch_render('国内合作',board1Data['国内合作'])
console.log(echarts)