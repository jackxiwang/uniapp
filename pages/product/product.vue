<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder"/>
		</view>
		<view class="list" v-if="showData">
			<view class="row" v-for="(item,index) in cateList" :key="index" @click="_goDetail(item.id)">
			<!-- <view class="row"> -->
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.price}}</text>	
					<text>3565评论</text>	
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
	data(){
		return {
			showData:true,
			cateList:[],
			page:1,//分页
			size:3
		}
	},
	onLoad(options) {
		let {fid,title} = options;
		this.fid = fid;
		this.title = title;
		uni.setNavigationBarTitle({
			title:title
		})
		this._getCateGood()
	},
	// 下拉分页
	onReachBottom() {
		this.page ++;
		if(this.page > this.totalPage){
			uni.showToast({
				title:'已经到底啦！',
				icon:'none'
			})
			return
		}
		this._getCateGood()
	},
	methods:{
		async _getCateGood(){
			let {fid,page,size} = this
			let res = await this.$api._getCateGoodPage({fid,page,size});
			console.log(res)
			if(res.data.list[1] == null){
				this.cateList = null
				this.showData = false
				return
			}
			this.totalPage = res.data.list[0]
			res.data.list[1].forEach(item=>{
				item.img = this.$baseUrl + item.img
			})
			this.cateList = this.cateList.concat(res.data.list[1]) 
			this.showData = true
			
		},
		async _goDetail(id){
			uni.navigateTo({
				url:'../details/details?id='+id
			})
		}
	}
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
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
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
