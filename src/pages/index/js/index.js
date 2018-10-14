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

$(function(){
    $.getJSON('/static/fake.json',(result)=>{
       renderCanvas(result)
       swipe();
    })
})

function renderCanvas(board1Data) {
    var chart1Data = arr2obj(board1Data['成果数量（分年）'], '成果类型')
    
    var chart2Data;
    var chart2Series = new Set();
    {
        let temp_obj = {}
        let hasIssueType = false;
        board1Data['成果数量（分学科）'].map(item=>{
            !chart2Series.has(item["学科"]) && chart2Series.add(item["学科"])
            let key = item["论文类型"] || item["成果类型"]
            temp_obj[key] = temp_obj[key] || [];
            temp_obj[key].push(item)
        })
        // console.log(temp_obj)
        chart2Data = Object.keys(temp_obj).map((key,index) => {
            let arr = temp_obj[key];
            return Array.from(chart2Series).reduce(function(prev,next){
                prev[next] = arr.find(item => item["学科"] == next) ? Number(arr.find(item => item["学科"] == next)["成果数量"]):0;
                return prev;
            }, {
                category:key,
                stack:["期刊论文","会议论文","学位论文"].indexOf(key)>-1,
                index:index
            })
        })
    }
    
    
    // console.log(chart2Data)
    
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
    
    var chart5Data = board1Data['成果数量（总）'].map(item=>{
        return {name:item["成果类型"],value:item["成果数量"]}
    });
    
    var chart7Data = board1Data['ESI学科排名']
    var chart8Data = board1Data['各类型人才数量统计'].slice(0,4)
    var chart8DataTotal = chart8Data[3]["数量"]
    
    var chart9Data = board1Data['各类型人才数量统计']
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
    // console.log(chart10Data)
    var chart11Data = board1Data["热门研究领域"].map(item=>{
        item.key= item["研究领域名称"]
        item.value = Number(item["论文数量"])
        return item;
    }).sort((prev, next) => next.value-prev.value)
    
    var chart1 = line_render('成果数量(分年)', chart1Data)
    var chart2 = interval_render('成果数量(分学科)',chart2Data,Array.from(chart2Series))
    var chart3 = radar_render('成果数量(分数据库)', chart3Data, '成果数量(分数据库)')
    var chart4 = mixed_render('高被引及热点论文数量', chart4Data)
    let c5l = chart5Data.length
    var chart5 = chart5Data.map((item,index)=>{
        $('.board1-col-2-row-1').append(` <div id='成果数量(分学科)${index}' class='canvas-container flex-1' style='width:${100/c5l}%'></div>`)
        ring_render(`成果数量(分学科)${index}`, chart5Data, item.name)
    }) 
    // console.log('chart5Data',chart5Data)
    var chart6 = map_ch_render('国内合作',board1Data['国内合作'])
    window.chart6 = chart6
    
    var chart7 = $('#ESI学科排名').html(`\
            <div class ='esi-title flex-shrink-0 flex-grow-0 d-flex flex-row text-white justify-content-around align-items-center py-3' style='z-index:99' >
                <div> ESI学科 </div> <div>国际排名</div><div>国内排名</div><div>论文数量</div><div>被引频次</div>
            </div>
            <div  class='esi_list' style='overflow:visible;position:relative;top:0'>
                <div class='esi_list1 d-flex flex-column justify-content-start' >
                    ${chart7Data.map(item=>`<div class ='esi_item flex-shrink-0 flex-grow-0 d-flex flex-row text-white justify-content-around align-items-center py-2' >
                        <div> ${item["ESI学科"]} </div> <div>${item["国际排名"]}</div><div>${item["国内排名"]}</div><div>${item["论文数量"]}</div><div>${item["被引频次"]}</div>
                    </div>`).join('')}
                </div>
                
                <div class='esi_list2'>
                </div>
            </div>
            `);
    
    // 使 这个chart 可以滚动
    $('.esi_list2').html($('.esi_list1').html())

    $('.esi_list').css('height',$('.esi_list1').height())
    var $esi_list = $('.esi_list')
    var $esi_list1 = $('.esi_list1')
    // let item_h = $('.esi_item').height()
    let item_h = $('.esi_list1').height()/chart7Data.length

    // 间隔时间
    var interval_time = 3000;
    var myFunction = setInterval(moveTop, interval_time);
    function moveTop() {
        if ($esi_list1.height() - Math.abs(parseInt($esi_list.css('top'))) - item_h <= 0){
             $esi_list.css('transition', '')
             $esi_list.css('top','0px')
             // 这样处理可以避免抖动
             moveTop()
        }else {
                
            $esi_list.css('transition', 'top ease 1s')
           $esi_list.css('top', parseInt($esi_list.css('top'))-item_h+'px')
        }
    }

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
    <div class='flex-shrink-0 flex-grow-0 d-flex flex-column text-white justify-content-around align-items-strech  px-3 ' style='border-image:linear-gradient(to bottom, transparent,transparent 8%,white 8%,white 92%,transparent 92%) 10;border-right:4px solid #fff;width:40%;font-size:0.8em;'>
        ${chart9Data.slice(4,9).map(item=>`
            <div class='flex-fill d-flex flex-row align-items-center justify-content-between'><div>${item["人才类型"]}</div><div>${item["数量"]}</div></div>
        `).join('')} 
    </div> 
    <div class='flex-shrink-0 flex-grow-0 d-flex flex-column text-white justify-content-around align-items-strech px-3 ' style='width:60%;font-size:0.8em;'>
        ${chart9Data.slice(9,15).map(item=>`
            <div class='flex-fill d-flex flex-row align-items-center justify-content-between'>
                <div>${item["人才类型"]}</div>
                <div>
                    ${item["数量"]}</div>
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
    
    

    var chart11Series = new Set()
    var chart11CountrySeries = new Set()
    var chart11Data = []
    board1Data['国际合作1'].map(item=>{
        if(!chart11Series.has(item["出版年"])){
            chart11Series.add(item["出版年"])
        }
    })
    var schemaArr = Array.from(chart11Series).sort((prev,next)=>{ return Number(prev)-Number(next)})
    var schemaLen = schemaArr.length;
    board1Data['国际合作1'].map(item=>{
        if(!chart11CountrySeries.has(item["国家"])){
            chart11CountrySeries.add(item["国家"])
            chart11Data.push([item["国家"]].concat(new Array(schemaLen).fill(null)))
        }
        let idx = schemaArr.indexOf(item["出版年"])
        chart11Data.find(i_item=>i_item[0]==item["国家"])[idx+1]=Number(item["论文数量"])
    })
    // 先按最大值给 数据排序
    chart11Data.sort((prev, next) => {
        return Math.max(...next.slice(1)) - Math.max(...prev.slice(1))
    })
    // console.log('chart11Data', chart11Data, 'schemaArr', schemaArr, 'chart11Series', chart11Series)
    
    var chart11GuideData = board1Data["国际合作2"].sort((prev,next)=>{return Number(next["论文数量"])-Number(prev["论文数量"])})
    var chart11GuideData2 = board1Data["国际合作3"]

    $('.canvas-board2').append(`<div class='board-guide py-3 position-absolute d-flex flex-column align-items-stretch' 
    style='top:20%;left:2%;z-index:99;color:white;font-size:40px;line-height:1.4;width:650px;'>
        <div class='position-absolute corner'></div>
        <div class='position-absolute corner'></div>
        <div class='position-absolute corner'></div>
        <div class='position-absolute corner'></div>
        <div class='guide-title' style='height:2em;text-align:center'>所有机构</div>
        <div class='guide-seg d-flex flex-row ' style='height:2em'>
            <div class='flex-shrink-0 ' style='width:80%'>合作机构</div>
            <div class='flex-shrink-0 ' style='width:25%'>发文</div>
        </div>
        ${chart11GuideData.slice(0,5).map(item=>`<div style='height:2em' class='d-flex flex-row'>
            <div class='flex-shrink-0' style='width:80%'>${item["国际高校"]}</div>
            <div class='flex-shrink-0' style='width:25%'>${item["论文数量"]}</div>
        </div>`).join('')}
    </div>`).append(`<div class='board-guide py-3 position-absolute d-flex flex-column align-items-stretch' 
    style='top:20%;right:2%;z-index:99;color:white;font-size:40px;line-height:1.4;width:600px;'>
        <div class='position-absolute corner'></div>
        <div class='position-absolute corner'></div>
        <div class='position-absolute corner'></div>
        <div class='position-absolute corner'></div>
        <div class='guide-title' style='height:2em;text-align:center'>合作概况</div>
       ${chart11GuideData2.map(item=>`<div style='height:2em' class='d-flex flex-row'>
            <div class='flex-shrink-0' style='width:70%'>${item["合作概况"]}</div>
            <div class='flex-shrink-0' style='width:30%'>${item["数量"]}</div>
        </div>`).join('')}
    </div>`)

    var chart11 = map_world_render('国际合作1',chart11Data,schemaArr)
    
   
    

}

function swipe(){
    var pageIndex = new Array($('.canvas-board').length).fill('0').map((item, index) => index + 1)
    console.log(pageIndex)
    var vid = document.getElementById("video");
    var vid2 = document.getElementById("video2");
    vid2.volume = 0;
    vid2.pause();
    var bgm = document.getElementById("bgm");
    var interval;
    var $canvas_board_wrapper = $('.canvas-board-wrapper')
    var nextPage = function () {
        pageIndex.push(pageIndex.shift())
        
        $canvas_board_wrapper.attr('data-tab', pageIndex[0])
       
    }
    if(bgm&&vid){
        vid.volume = 0;
        // vid.playbackRate = 2
        // bgm.playbackRate =2
    }
    if (vid) {
        vid.addEventListener("ended", function (params) {
            console.log('ended')
            nextPage()
            interval = setInterval(function () {
                nextPage()
                if(vid2){
                    if (pageIndex[0] == 4) {
                        clearInterval(interval)
                        vid2.currentTime = 0
                        vid2.play()
                    }
                }else{
                    if (pageIndex[0] == 1) {
                        clearInterval(interval)
                        vid.currentTime = 0
                        bgm.currentTime = 0;
                        vid.play()
                    }
                }
            }, 30*1000)
        })
        console.log('vid2',vid2)
        
        vid2.addEventListener("ended",function(){
                nextPage()
                vid.currentTime = 0
                bgm.currentTime = 0;
                vid.play()
            })
        
    } else {
        interval = setInterval(nextPage, 180*1000)
    }
}
