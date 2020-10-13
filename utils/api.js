import http from './http.js'
// 导航
const _getcate = ()=>{
	let options = {
		url:'/api/getcate'
	}
	return http(options)
}
// banner
const _getBanner = ()=>{
	let options = {
		url:'/api/getbanner'
	}
	return http(options)
}
// seckill
const _getseckill = ()=>{
	let options = {
		url:'/api/getseckill'
	}
	return http(options)
}
// 首页商品
const _getindexgoods = ()=>{
	let options ={
		url:'/api/getindexgoods'
	}
	return http(options)
}
// 导航一级分类
const _getCateGoodPage = (data={})=>{
	let options = {
		url:'/api/getcategoodPage',
		data
	}
	return http(options)
}
// /api/getcates全部商品分类
const _getCates = ()=>{
	let options = {
		url:'/api/getcates',
	}
	return http(options)
}
// /api/getgoodsinfo
const _getGoodsInfo = (data={})=>{
	let options = {
		url:'/api/getgoodsinfo',
		data
	}
	return http(options)
}
// 短信验证
const _getSms = (data={})=>{
	let options = {
		url:'/api/sms',
		data
	}
	return http(options)
}
// 登录/api/wxlogin
const _wxLogin = (data={})=>{
	let options = {
		url:'/api/wxlogin',
		data
	}
	return http(options)
}
// token检查 /api/checktoken
const _checktoken = (header={})=>{
	let options = {
		url:'/api/checktoken',
		header
	}
	return http(options)
}
// 购物车添加
const _cartAdd = (data,header)=>{
	let options = {
		url:'/api/cartadd',
		data,
		header
	}
	return http(options)
}
//获取购物车信息/api/cartlist
const _cartList = (data={},header={})=>{
	let options = {
		url:'/api/cartlist',
		data,
		header
	}
	return http(options)
}
// 修改 /api/cartedit
const _cartEdit = (data={},header={})=>{
	let options = {
		url:'/api/cartedit',
		data,
		header
	}
	return http(options)
}
// 购物删除 /api/cartdelete
const _cartDelete = (data={},header={})=>{
	let options = {
		url:'/api/cartdelete',
		data,
		header
	}
	return http(options)
}
// 订单添加 /api/orderadd
const _orderAdd = (data={},header={})=>{
	let options = {
		url:'/api/orderadd',
		data,
		header
	}
	return http(options)
}
// 订单查询 /api/orders
const _orders = (data={},header={})=>{
	let options = {
		url:'/api/orders',
		data,
		header
	}
	return http(options)
}
export default {
	_getcate,
	_getBanner,
	_getseckill,
	_getindexgoods,
	_getCateGoodPage,
	_getCates,
	_getGoodsInfo,
	_getSms,
	_wxLogin,
	_checktoken,
	_cartAdd,
	_cartList,
	_cartEdit,
	_cartDelete,
	_orderAdd,
	_orders
}
