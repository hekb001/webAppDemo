
module.exports = function(router){
    router.get('/list1',(req,res)=>{
        res.json({
            type:req.method,
            name:'list1'
        })
    })
}