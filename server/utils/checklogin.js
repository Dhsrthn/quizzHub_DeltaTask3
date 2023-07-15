function checklogin(req){
    console.log(req.session)
    if(req.session.Isloggedin){
        return true
    }else{
        return false
    }
}

module.exports={
    checklogin,
}