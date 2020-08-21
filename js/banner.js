window.onload=function(){
    var showindex=0;
    //定时器调用的方法
    function timershow(){
            /*样式切换图片
            var index=$(".img").index($(".imgshow"));                    
            //隐藏当前图片
            $(".img").eq(index).removeClass("imgshow").addClass("imghide");
            if(index==5){
                index=-1
            }
            $(".img").eq(index+1).removeClass("imghide").addClass("imgshow");
            */
            var imageindex=showindex;
            //点击按钮，下标向后移动
            showindex++;
            //切换到第一张图片，showindex改为0
            if(showindex==5){
                showindex=0
            }
            //返回当前图片的位置
            //console.log(imageindex);
            //上一张图片淡出
            $(".img").eq(imageindex).fadeOut(1000);
            //当前图片淡出
            $(".img").eq((imageindex+1)%5).fadeIn(1000);
            //上一个导航点样式修改为divhide
            $("#nav div").eq(imageindex).removeClass("divshow").addClass("divhide");
            //当前导航点样式修改为divshow
            $("#nav div").eq((imageindex+1)%5).removeClass("divhide").addClass("divshow");
    }
    
    $(function(){
        //自动调用方法
        var timer=setInterval(timershow,2000);
        //上一张图片
        $("#right").click(function(){
            /*样式切换图片
            var index=$(".img").index($(".imgshow"));                    
            //隐藏当前图片
            $(".img").eq(index).removeClass("imgshow").addClass("imghide");
            if(index==5){
                index=-1
            }
            $(".img").eq(index+1).removeClass("imghide").addClass("imgshow");
            */
            var imageindex=showindex;
            //点击按钮，下标向后移动
            showindex++;
            //切换到第一张图片，showindex改为0
            if(showindex==5){
                showindex=0
            }
            //返回当前图片的位置
            console.log(imageindex);
            //上一张图片淡出
            $(".img").eq(imageindex).fadeOut(1000);
            //当前图片淡出
            $(".img").eq((imageindex+1)%5).fadeIn(1000);
            //上一个导航点样式修改为divhide
            $("#nav div").eq(imageindex).removeClass("divshow").addClass("divhide");
            //当前导航点样式修改为divshow
            $("#nav div").eq((imageindex+1)%5).removeClass("divhide").addClass("divshow");
        });
        //下一张图片
        $("#left").click(function(){
            console.log("修改前："+showindex)
            var imageindex=showindex;
            //点击按钮，下标向后移动
            showindex--;
            //切换到最后一张图片，showindex变为5
            if(showindex==-1){
                showindex=5;
            }
            //上一张图片淡出
            $(".img").eq(imageindex).fadeOut(1000);
            //当前图片淡出
            $(".img").eq((imageindex-1)%5).fadeIn(1000);
            //上一个导航点样式修改为divhide
            $("#nav div").eq(imageindex).removeClass("divshow").addClass("divhide");
            //当前导航点样式修改为divshow
            $("#nav div").eq((imageindex-1)%5).removeClass("divhide").addClass("divshow");
        });
        //导航点
        $("#nav div").mouseover(function(){
            console.log("修改前"+showindex);//修改前的位置
            var divindex=$("#nav div").index($(this));//获取当前鼠标在哪一个点上
            //选定的为当前的自己则不产生动画效果
            if(divindex!=showindex)
            {
                //将以前的点的样式修改成divhide
                $("#nav div").eq(showindex).removeClass("divshow").addClass("divhide");
                //将现在的点的样式修改成div
                $("#nav div").eq(divindex).removeClass("divhide").addClass("divshow");
                //以前图片淡出
                $(".img").eq(showindex).fadeOut(1000);
                //新图片淡入
                $(".img").eq(divindex).fadeIn(1000);
                showindex=divindex;
                console.log("修改后"+divindex);//修改后的位置
            }
        });
        //鼠标在图片范围时停止切换(清除定时器)
        $("#content").mouseenter(function() {
            window.clearInterval(timer);
        }   
        );
        $("#content").mouseleave(function(){
            timer=window.setInterval(timershow,2000);
        });
    });
}