module.exports=function(router){
    router.all('/list3',(req,res)=>{
        const { method} = req;
        res.json({
            method,
            name:'list3'
        })
    })
}