]<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder"/>
		</view>
		<view class="list" v-if="orders.length > 0">
			<!-- row 循环体 -->
			<view class="row" v-for="item in orders" :key="item.id">
				<view class="products">
					<view class="imagebox" v-for="val in item.child" :key="val.id">  
						<image :src="val.img" mode="widthFix"></image>
						<text class="title">{{val.goodsname}}</text>
					</view>
					<!-- <view class="imagebox">
						<image src="@/static/index/goods.jpg" mode="widthFix"></image>
						<text class="title">阿道夫修护滋养洗发香乳</text>
					</view> -->
				</view>
				<view class="info">
					<text  space="nbsp">总计{{item.countnumber}}商品  </text>  
					<text>应付金额 ￥:{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				orders:[]
			}
		},
		onLoad(options){
			this._getOrders()
		},
	
		methods: {
			async _getOrders(){
				let {uid,token} = uni.getStorageSync('user');
				let res = await this.$api._orders({uid},{authorization:token}) 
				if(res.data.code==403){
					uni.showToast({
						title:'登录失效',
						icon:'none'
					})
					return
				}
				res.data.list.forEach(item=>{
					item.child.forEach(val=>{
						val.img =this.$baseUrl + val.img  
					})
				})
				this.orders = res.data.list
			}
		},
		
	}
</script>

<style>
.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		/* float: left; */
		margin:10rpx;
		display: flex;
	}
	.imagebox .title{
		margin-top: 30rpx;
	}
	.products{
		overflow: hidden;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.info{
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
