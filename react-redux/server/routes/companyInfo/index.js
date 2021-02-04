module.exports = function(router) {
    console.log('xxxxxxx')
    router.post('/companyInfo', (req,res)=>{
        console.log('请求来了')
        res.status(200).send('suceess')
    });
   
  };