<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{ information.username }}</label>
				<label for="">{{ information.userphone }}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{ information.address }}</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">
			<!-- cartsInfo 循环体 -->
			<view class="cartsInfo" v-for="(item,index) in orderInfo" :key="item.id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:白色</view>
					</view>
					<view class="carts_price">
						<label for="">￥{{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="sub(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="add(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{_totalPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{_totalPrice}}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn" @click="_submit">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary">提交订单</button>
		</view>
	</view>
</template>

<script>
	import checkToken from '../../utils/checkToken.js'
	export default {
		data() {
			return {
				information: {
					idusername: 'YouSu',
					userphone: '15811112222',
					address: '北京市海淀区隐泉路清林苑6号楼中公优就业总部3层'
				},
				orderInfo:[]
			}
		},
		onLoad() {
			this._getOrder()
			
		},
		computed:{
			// 商品总数
			_totalGoods(){
				let total = 0;
				this.orderInfo.forEach(item=>{
				 total += item.num
				})
				return total
				
			},
			// 商品总价
			_totalPrice(){
				let total = 0
				this.orderInfo.forEach(item=>{
					total += item.num*item.price
				})
				return total
			}
		},
		methods: {
			// 获取订单信息
			async _getOrder(){
				let token = uni.getStorageSync('user').token
				let res = await checkToken(token,this)
				if(!res){
					uni.showToast({
						title:'未登录或登录失效',
						icon:'none'
					})
					return
				}
				this.orderInfo = uni.getStorageSync('cates')
				console.log(this.orderInfo)
			},
			// 修改
			async _editCate(index){
				/*
				id购物车编号，必填项num数量checked状态authorization  header头中需要添加token后台验证条件*/
				let {id,num,checked} = this.orderInfo[index]
				checked = checked?1:0
				let authorization = uni.getStorageSync('user').token
				let res =await this.$api._cartEdit({id,num,checked},{authorization})
				if(res.data.code == 403){
					uni.setTabBarItem({
						index:2,
						text:'未登录'
					})
					uni.clearStorage();
					return 
				}
			},
			add(index){
				this.orderInfo[index].num ++;
				this._editCate(index)
			},
			sub(index){
				this.orderInfo[index].num --;
				this.orderInfo[index].num = Math.max(this.orderInfo[index].num,1)
				this._editCate(index)
			},
			// 订单提交
			/*
			uid会员id
			username收货人姓名
			userphone收货人联系方式
			address收货人地址
			countmoney订单总支付金额
			countnumber订单商品数量
			addtime订单添加时间（时间戳）
			idstr购物车数据id字符串 例如：idstr = "1,2,3"
			authorization   header头中需要添加token后台验证条件*/
			async _submit(){
				let uid = uni.getStorageSync('user').uid,authorization = uni.getStorageSync('user').token;
				let {username,userphone,address} = this.information;
				let countmoney = this._totalPrice,countnumber = this._totalGoods;
				let addtime = new Date().getTime();
				let idstr = this.orderInfo.map(item=>{
					return item.id
				}).join()
				// console.log({uid,username,userphone,address,countmoney,countnumber,addtime,idstr,authorization})
				let params = JSON.stringify({uid,username,userphone,address,countmoney,countnumber,addtime})
				let res = await this.$api._orderAdd({idstr,params},{authorization})
				if(res.data.code == 200){
					uni.showToast({
						title:'下单成功'
					})
					uni.removeStorageSync('cates');
					setTimeout(()=>{
						uni.redirectTo({
							url:'../order/order'
						})
					},1500)
				}else {
					uni.showToast({
						title:'下单失败',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style>
	@import url("../../common/css/confirm.css");
</style>
