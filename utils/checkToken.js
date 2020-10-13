const checkToken =async (token=null,_this)=>{
	if(!token){
		uni.setTabBarItem({
			index:2,
			text:'未登录'
		})
		return false
	}
	let res = await _this.$api._checktoken({authorization:token})
	if(res.data.code == 403){
		uni.setTabBarItem({
			index:2,
			text:'未登录'
		})
		uni.clearStorage();
		return false
	}else if (res.data.code == 200){
		uni.setTabBarItem({
			index:2,
			text:'我的'
		})
		return true
	}else {
		
	}
}
export default checkToken