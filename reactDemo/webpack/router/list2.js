module.exports = function(router){
    router.post('/list2',(req,res)=>{
        res.json({
            type:req.method,
            name:'list2'
        })
    })
}