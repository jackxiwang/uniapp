<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<!--  -->
			<view :class="activeIndex === index? 'left_list activeList':'left_list'" v-for="(item,index) in cates" @click="changeIndex(index)">
				<label for="">{{item.catename}}</label>
			</view>

		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom" v-if="cates.length>0">
					<view class="bottom_list"  v-for="item in cates[activeIndex].children">
						<view @click="navigateTo(item.catename,item.id)">
							<image :src="item.img" alt="">
								<span>{{item.catename}}</span>
						</view>
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
				cates: [],
				activeIndex: 0
			}
		},
		mounted() {
			this.__getCates()
		},
		methods: {
			async __getCates() {
				let res = await this.$api._getCates()
				console.log(res)
				res.data.list.forEach((item,index) => {
					if(item.children){
						item.children.forEach(val => {
							val.img = this.$baseUrl + val.img
						})
					}
				})
				this.cates = res.data.list
			},
			changeIndex(index) {
				this.activeIndex = index
			},
			// 商品列表
			navigateTo(title,fid) {
				uni.navigateTo({
					url:`../product/product?fid=${fid}&title=${title}`
				})
			},
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}

	.bottom {
		text-align: center;
		display: flex;
		flex-direction: row;
	}
</style>
