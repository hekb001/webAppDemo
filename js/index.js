
(
    function(){
        window.onload=function(){
            //导航栏添加鼠标事件
            var tabLis = $('.tabs ul li');
            console.log(tabLis,'tabLis')
            tabLis.on('mouseover',(event)=>{
                console.log(event,'event')
                tabLis.map((item)=>{
                    $(item).removeClass('active')
                })
                $(event.target).addClass('active')
            }).on('mouseout',(event)=>{
                $(event.target).removeClass('active')
            })
        };
    }
)()