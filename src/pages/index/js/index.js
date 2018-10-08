import  '../style/bootstrap-reboot.css'
import  '../style/bootstrap-grid.css'
import jQuery from 'jquery'
import '../style/theme.css'

import echarts from 'echarts'

import userTheme from '../../common/js/themeConfig.js'
import map_ch_render from '../../common/js/map_ch_render.js'
import line_render from '../../common/js/line_render.js'
import interval_render from '../../common/js/interval_render.js'
import radar_render from '../../common/js/radar_render.js'
import mixed_render from '../../common/js/mixed_render.js'
import ring_render from '../../common/js/ring_render.js'
import polar_render from '../../common/js/polar_render.js'
import multi_ring_render from '../../common/js/multi_ring_render.js'
import map_world_render from '../../common/js/map_world_render.js'
import board1Data from './fake.js'


window.$= jQuery
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

var chart1Data = arr2obj(board1Data['成果数量（分年）'], '成果类型')

var chart2Data;
var chart2Series = new Set();
{
    let temp_obj = {}
    let hasIssueType = false;
    board1Data['成果数量（分学科）'].map(item=>{
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

var chart3Data = board1Data['成果数量（分数据库）'].map(item=>{
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

var chart5Data = (function(arr) {
    let obj = {};
    arr.map(item => {
        let key = item["论文类型"] ? "论文类型" : "成果类型";
        obj[item[key]] = obj[item[key]] || 0;
        obj[item[key]] += Number(item["成果数量"])
    })
    if ("期刊论文" in obj || "会议论文" in obj || "学术论文" in obj){
        delete obj["论文"]
    }
    return Object.keys(obj).map(item=>{ return {name:item,value:obj[item]}})
})(board1Data['成果数量（分学科）']);

var chart7Data = board1Data['ESI学科排名']
var chart8Data = board1Data['各类型人才数量统计'].filter(item=>new Set(["高级人才","杰出人才","教学科研人员","全校在编教职工"]).has(item["人才类型"]))
var chart8DataTotal = Number(chart8Data.find(item=>item["人才类型"]=='全校在编教职工')["数量"])

var chart9Data = board1Data['各类型人才数量统计'].filter(item=>!new Set(["高级人才","杰出人才","教学科研人员","全校教职工"]).has(item["人才类型"]))
var chart10Data;
var chart10Series = new Set();
{
    let temp_obj = {}
    let hasIssueType = false;
    board1Data['获奖统计'].map(item=>{
        !chart10Series.has(item["学科"]) && chart10Series.add(item["学科"])
       
        temp_obj[item["级别"]] = temp_obj[item["级别"]] || [];
        temp_obj[item["级别"]].push(item)
    })
    chart10Data = Object.keys(temp_obj).map(key => {
        return {category:key,items:temp_obj[key]}
    })
}
console.log(chart10Data)
var chart11Data = board1Data["热门研究领域"].map(item=>{
    item.key= item["研究领域名称"]
    item.value = Number(item["论文数量"])
    return item;
}).sort((prev, next) => next.value-prev.value)

var chart1 = line_render('成果数量(分年)', chart1Data['期刊论文'], '期刊论文')
var chart2 = interval_render('成果数量(分学科)',chart2Data,Array.from(chart2Series))
var chart3 = radar_render('成果数量(分数据库)', chart3Data, '成果数量(分数据库)')
var chart4 = mixed_render('高被引及热点论文数量', chart4Data)
let c5l = chart5Data.length
var chart5 = chart5Data.map((item,index)=>{
    $('.board1-col-2-row-1').append(` <div id='成果数量(分学科)${index}' class='canvas-container flex-1' style='width:${100/c5l}%'></div>`)
    ring_render(`成果数量(分学科)${index}`, chart5Data, item.name)
}) 
console.log('chart5Data',chart5Data)
var chart6 = map_ch_render('国内合作',board1Data['国内合作'])


var chart7 = $('#ESI学科排名').html(`\
        <div class ='flex-shrink-0 flex-grow-0 d-flex flex-row text-white justify-content-around align-items-center py-3' >
            <div> ESI学科 </div> <div>国际排名</div><div>国内排名</div><div>论文数量</div><div>被引频次</div>
        </div>
        ${chart7Data.slice(0,7).map(item=>`<div class ='flex-shrink-0 flex-grow-0 d-flex flex-row text-white justify-content-around align-items-center py-2' >
            <div> ${item["ESI学科"]} </div> <div>${item["国际排名"]}</div><div>${item["国内排名"]}</div><div>${item["论文数量"]}</div><div>${item["被引频次"]}</div>
        </div>`).join('')}
         
        </div>
        `)
let svg_w = $('#各类型人才数量统计').width();
let svg_h = $('#各类型人才数量统计').height();
var chart8 = $('#各类型人才数量统计').html(
    chart8Data.map(item=>`<div class='flex-shrink-0 flex-grow-0 d-flex flex-row text-white justify-content-around align-items-center  py-2' style='height:25%;font-size:0.8em;'>
        <div class='text-right' style='width:25%'>${item["人才类型"]}</div>
        <div style='width:80%' class='pl-3'>
        ${new Array(10).fill(1).map((i_item,index)=>{
            var rate = Number(item['数量']) / chart8DataTotal * 100 - index * 10
            if(rate>0){
                //至少显示一个
                // rate*=100
                rate*=30
            }else{
                rate=0
            }
            return `<svg  class="icon" style="margin:0 -0.4em" viewBox="256 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svg_w*0.85/10}" height="${svg_h/5}">
                <defs><style type="text/css">
                </style>
                    <linearGradient id="linear${item['人才类型']}${index}" x1="0%" y1="0%" x2="100%" y2="0%"> 
                    <stop offset="0%" stop-color="#85baa2"/>
                    <stop offset = "${rate}%"
                    stop-color = "#85baa2"/>
                    <stop offset = "${rate}%"
                    stop-color = "#ddd"/>
                    <stop offset="100%" stop-color="#ddd"/> 
                    </linearGradient>
                </defs>
                <path transform="scale(1.8,1)" d="M606.7936288 133.7860288c0 54.617809066666666-42.91882666666667 98.84319253333334-95.9702944 98.84319253333334-52.8615424 0-95.7585376-44.22538346666667-95.7585376-98.84319253333334 0-54.664744533333334 42.89699626666666-98.9337888 95.7585376-98.9337888C563.8748021333333 34.852239999999995 606.7936288 79.12128533333333 606.7936288 133.7860288z" p-id="1555" fill = "url(#linear${item['人才类型']}${index})"></path>
                <path transform="scale(1.8,1)" d="M663.0028832 250.28138986666664c0 0 23.868412799999998-0.6647392 23.868412799999998 23.726514133333335s0 292.30646079999997 0 292.30646079999997 3.7701333333333333 30.9818912-29.799768533333335 30.9818912c0 0-33.35923626666667 3.6533397333333335-33.35923626666667-37.3454912 0-45.4599008 0-217.37534186666664 0-217.37534186666664l0-3.7483018666666665-13.144163200000001 0 0.5697770666666667 602.0718890666667c0 0 7.117845333333333 48.92331413333333-46.0067552 48.92331413333333-50.32155946666667 0-45.955453866666666-42.327219199999995-45.955453866666666-48.92331413333333 0-6.596094933333333-0.0731328-342.9129088-0.0731328-342.9129088l-13.877669333333333 0 0 345.61771200000004c0 0 4.744866133333333 46.21851093333333-43.8455328 46.21851093333333 0 0-48.0479104 3.416477866666667-48.0479104-45.88668693333333 0-49.11323946666666 0-605.1085162666666 0-605.1085162666666l-14.995393066666665 0 0 232.42203626666665c0 0 0.0949632 26.047099733333333-31.672827733333335 26.047099733333333 0 0-31.602969599999998 0.38421760000000005-31.602969599999998-29.510513066666665 0-29.752832 0-294.25265279999996 0-294.25265279999996s-5.5515039999999996-23.393597866666667 28.80320426666667-23.393597866666667C398.19743573333335 250.13949119999995 663.0028832 250.28138986666664 663.0028832 250.28138986666664z" p-id="1556" fill = "url(#linear${item['人才类型']}${index})">
                </path>
            </svg>`}).join('')}
            
        </div>
        <div class='text-left' style='width:15%'>${item["数量"]}</div>
    </div>`).join("")  
)
var chart9 = $('#各类型人才数量统计2').html(`
<div class='flex-shrink-0 flex-grow-0 d-flex flex-column text-white justify-content-around align-items-strech px-3  py-2' style='width:40%;font-size:0.8em;'>
    ${["两院院士","长江特聘","青年长江","国家千人","青年千人"].map(item=>`
        <div class='flex-fill d-flex flex-row align-items-center justify-content-between'><div>${item}</div><div>${chart9Data.find(i_item=>i_item["人才类型"]==item)["数量"]}</div></div>
    `).join('')} 
</div> 
<div class='flex-shrink-0 flex-grow-0 d-flex flex-column text-white justify-content-around align-items-strech px-3 py-2' style='width:60%;font-size:0.8em;'>
    ${["文科杰出、资深教授","973首席","万人计划","青年拔尖","杰出青年、优秀青年"].map(item=>`
        <div class='flex-fill d-flex flex-row align-items-center justify-content-between'>
            <div>${item}</div>
            <div>
                ${chart9Data.find(i_item=>i_item["人才类型"]==item)
                ?chart9Data.find(i_item=>i_item["人才类型"]==item)["数量"]
                :(chart9Data.find(i_item=>i_item["人才类型"]=='杰出青年')["数量"]+','+chart9Data.find(i_item=>i_item["人才类型"]=='优秀青年')["数量"])
            }</div>
        </div>
    `).join('')} 
</div>  
`)
var colorPalette = ["#c1232b", "#d7504b", "#e87c25", "#fe8463", "#c6e579", "#9bca63","#60c0dd","#26c0c0","#27727b","#aaaaaa"]
var sizeRange = [40,100]
var upBound = chart11Data[0].value
var downBound = chart11Data[chart11Data.length-1].value
var sizeScale = function(val){
    return sizeRange[0] + (sizeRange[1] - sizeRange[0])*(val-downBound)/(upBound-downBound)
}
var colorScale = function(val){
    return colorPalette[Math.min(Math.floor(colorPalette.length - (colorPalette.length) * (val - downBound) / (upBound - downBound)), colorPalette.length-1)]
}
var chart11 = $('#热门研究领域').html(`
    <svg  class="icon" style="margin:0 0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="${$('#热门研究领域').width()}" height="${$('#热门研究领域').height()}">
        <text x='-330'  y='100' fill='#fff' font-size='80'>热门研究领域</text>
        ${chart11Data.sort(()=>Math.random()-0.5).map((item,index)=>{
            let dur = (Math.random()*4+2.5)*2;
            let delay = index*0.15+0.5;
            let interval = 1020/chart11Data.length
            return `<text x='${index==0?400:index*interval+Math.random()*100-200}'  y='1000' opacity='0' fill='${colorScale(item.value)}' font-size='${sizeScale(item.value)}'>
            ${item.key}
            <animate attributeName='y' values='1000;200;200' begin='+${delay}s' dur='${dur}s' fill='remove' repeatCount='indefinite'></animate>  
            <animate attributeName='opacity' values='0;0.5;1;1;1;1;1;1;0.5;0;0;0;0;0;0;0;0;0;0;0;0'  begin='+${delay}s'  dur='${dur}s' fill='remove' repeatCount='indefinite'></animate>  
            
         </text>
        `}).join('')}
    </svg>
`)
var chart10 = multi_ring_render('获奖统计', chart10Data, '获奖统计', Array.from(chart10Series))
var chart11 = map_world_render('国际合作1')
console.log(chart10.getOption())