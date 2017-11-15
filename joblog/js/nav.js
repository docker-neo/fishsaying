
$(function () {
    //左边导航
    leftNav();
    //导航点击事件
    leftNavClick();
    //二级导航展开收起
    leftNavToggle();
    //右边内容加载
    navClick()
    //默认加载右边内容
    logAjax();
})

//默认情况下加载
function logAjax() {
    $.ajax({
        url: "html/cc-log.html",
        type:"get",
        success:function (data) {
            $(".sec").append(data)
        }
    })
}
function leftNav() {
    $(".ln-summary").append(`
        <li class="ln-chaper ln-active" id="cc-log"><a href="#">文化号</a></li>
        <li class="ln-chaper ln-close" id="rootChannel-log">
            <a href="#">根频道</a>
            <ul>
                <li class="ln-chaper" id="rc-procedure"><a href="#">小程序</a></li>
                <li class="ln-chaper" id="rc-h5"><a href="#h5Point">h5</a></li>
            </ul>
        </li>
        <li class="ln-chaper" id="ams-log"><a href="#">ams</a></li>
        <li class="ln-chaper" id="mp-log"><a href="#">mp</a></li>
        <li class="ln-chaper" id="flyBean-log"><a href="#">飞豆</a></li>
        <li class="ln-chaper ln-close" id="app-log">
            <a href="#">app</a>
            <ul>
                <li class="ln-chaper" id="app-ios"><a href="#">ios</a></li>
                <li class="ln-chaper" id="app-android"><a href="#">Android</a></li>
            </ul>
        </li>
        <li class="ln-chaper" id="ai-log"><a href="#">AI平台</a></li>
        <li class="ln-chaper ln-close" id="baseData-log">
            <a href="#" >基础数据平台</a>
            <ul>
                <li class="ln-chaper" id="bd-statistics"><a href="#">根频道统计</a></li>
                <li class="ln-chaper" id="bd-position"><a href="#">位置画像</a></li>
            </ul>
        </li>
        
        
    `)
}

function leftNavClick() {
    $(".ln-chaper").on("click",function (event) {
        $(this).parents(".ln-summary").find(".ln-chaper").removeClass("ln-active");
        //阻止冒泡
        event.stopPropagation();
        if($(this).hasClass("ln-close") || $(this).hasClass("ln-open")){

            $(this).find(".ln-chaper").eq(0).addClass("ln-active")
        }else {
            $(this).addClass("ln-active");
        }

    })
}


function leftNavToggle() {
    //展开
    unfold();
    //收起
    packUp();
}
//点击展开
function unfold() {
    $(".ln-close").click(function () {
        $(this).removeClass("ln-close").addClass("ln-open")
        packUp();
    });
}
//点击收起
function packUp() {
    $(".ln-open").click(function () {
        $(this).removeClass("ln-open").addClass("ln-close");
        unfold();
    })
}

//navId 左边导航id url右边日志文档片段
function secPage(navId,url) {
    navId.click(function () {
        $.ajax({
            url: url,
            type:"get",
            success:function (data) {
                $(".sec").html(data)
            }
        })
    })
}
//左边导航点击右边内容加载
function navClick() {
    secPage($("#cc-log"),"html/cc-log.html");
    secPage($("#flyBean-log"),"html/flyBean-log.html");
    secPage($("#mp-log"),"html/mp-log.html");
    secPage($("#rootChannel-log"),"html/miniApps-log.html");
    secPage($("#rc-procedure"),"html/miniApps-log.html");
    secPage($("#rc-h5"),"html/h5-log.html");
    secPage($("#ai-log"),"html/ai-log.html");
    secPage($("#ams-log"),"html/ams-log.html");
    secPage($("#app-log"),"html/appIos-log.html");
    secPage($("#app-ios"),"html/appIos-log.html");
    secPage($("#app-android"),"html/appAndroid-log.html");
    secPage($("#baseData-log"),"html/rootChannel-log.html");
    secPage($("#bd-statistics"),"html/rootChannel-log.html");
    secPage($("#bd-position"),"html/locationPortrait-log.html");

}
