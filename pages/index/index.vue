<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" style="text-align: center;" type="text" value="" placeholder="寻找商品" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->

		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" scroll-x="{true}">
				<view class="uni-tab-item">
					<text class="uni-tab-item-title" :class="0===activeIndex?'uni-tab-item-title-active':''">推荐</text>
				</view>
				<view class="uni-tab-item" v-for="(item,index) in navList" :key="index">
					<text class="uni-tab-item-title" :class="index+1===activeIndex?'uni-tab-item-title-active':''" @click="navigateTo(index,item.catename,item.id)">{{item.catename}}</text>
				</view>

			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="banner-container">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>


			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="@/static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="@/static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="@/static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="_goClassify">
				<image src="@/static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="@/static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{seckillTime.h}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{seckillTime.m}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{seckillTime.s}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image :src="seckill.img" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="@/static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="@/static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="@/static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="@/static/index/swiper.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view @click="productIndex = 0" class="tag_list " :class="productIndex===0?'active_tag_list':''">
					<label for="">热门推荐</label>
				</view>
				<view @click="productIndex = 1" class="tag_list" :class="productIndex===1?'active_tag_list':''">
					<label for="">最新好货</label>
				</view>
				<view @click="productIndex = 2" class="tag_list" :class="productIndex===2?'active_tag_list':''">
					<label for="">所有商品</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product" v-if=" goodsList.length>0">
				<view class="product" v-for="(item,index) in goodsList[productIndex].content" :key="index" @click="_toProduct(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售50件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [], //头部nav
				bannerList: [], //banner图
				goodsList: [],
				seckill: {},
				seckillTime: {},
				timer:null,
				productIndex: 0, //底部推荐选项卡
				activeIndex: 0
			}
		},
		onShow() {
			this._getCate()
			this._getBanner()
			this._getSeckill()
			this._getIndexGoods()
		},
		methods: {
			// 获取推荐列表
			async _getCate() {
				let res = await this.$api._getcate()
				this.navList = res.data.list
			},
			// 获取banner
			async _getBanner() {
				let res = await this.$api._getBanner()
				res.data.list.forEach(item => {
					item.img = 'http://localhost:3000' + item.img;
				})
				this.bannerList = res.data.list
			},
			// 获取秒杀
			async _getSeckill() {
				clearInterval(this.timer)
				let res = await this.$api._getseckill()
				res.data.list[0].img = this.$baseUrl + res.data.list[0].img
				this.seckill = res.data.list[0]
				this.timer = setInterval(()=>{
					this._sekillTime(res.data.list[0].endtime)
				},1000)
				
				
			},
			// 处理时间函数
			_sekillTime(endtime) {
				let time = parseInt((endtime - new Date().getTime()) / 1000);
				let h = (parseInt((time % 86400) / 3600) + '').padStart(2, '0')
				let m = (parseInt((time % 3600) / 60) + '').padStart(2, '0')
				let s = parseInt(time % 60)
				s--
				this.seckillTime = {
					h,
					m,
					s:s<0?'59':(s+'').padStart(2, '0')	
				}
				if (s <= 0){
					this._getSeckill()
				}
				
			},
			// 获取底部推荐
			async _getIndexGoods() {
				let res = await this.$api._getindexgoods()
				if(res.data.list==null) return
				res.data.list.forEach(item => {
					item.content.forEach(val => {
						val.img = this.$baseUrl + val.img
					})
				})
				this.goodsList = res.data.list
			},
			// 详情
			_toProduct(id){
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			},
			// 列表跳转
			navigateTo(i,title,fid) {
				this.activeIndex = i + 1
				
				uni.navigateTo({
					url: `../product/product?fid=${fid}&title=${title}`
				})
			},
			_goClassify(){
				uni.navigateTo({
					url: `../classify/classify`
				})
			}
		},
		


	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
