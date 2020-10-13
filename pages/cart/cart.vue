<template>
	<view class="container">
		<view class="top">
			<view class="top-con" v-if="cateList.length > 0">
				<scroll-view class="scroll-view_H" scroll-x="true" v-for="(item,index) in cateList" :key="item.id">
					<view class="cartInfo">
						<view class="cartInfochild">
							<!-- 选择框 -->
							<view class="cartInfo_switch common">
								<!-- 点击当前商品 -->
								<switch type="checkbox" :checked="item.checked" @click="_changeChecked(index)" />
							</view>
							<!-- 图片 -->
							<view class="cartInfo_image common">
								<image :src="item.img" mode=""></image>
							</view>

							<!-- 信息 -->
							<view class="cartInfo_info">
								<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
								<label for="" style="font-size: 24rpx; color: #ccc;">规格：白色</label>
								<label for="" style="color: red;">￥{{item.price}}</label>
							</view>
							<!-- 加减数量 -->
							<view class="cartInfo_num">
								<view class="cartInfo_num_child">
									<label for="" @click="sub(index)">-</label>
									<label for="">{{item.num}}</label>
									<label for="" @click="add(index)">+</label>
								</view>
							</view>
						</view>

					</view>
					<view class="cartDel" @click="_delGoods(index)">
						<label for="">删除</label>
					</view>
				</scroll-view>
			</view>
			<view class="top-null" v-else>
				暂时没有商品添加哦~~~~
			</view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="_allChecked" @change="_doAllChecked" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">总计：<label style="color: red;">{{_totalPrice}}</label></view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="confirm">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{_totalGoods}}件)</label>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList: []
			}
		},
		onShow() {
			this._getCatList()
		},
		computed: {
			// 全选
			_allChecked() {
				if (this.cateList.length <= 0) {
					return false;
				}
				return this.cateList.every(item => {
					return item.checked
				})
			},
			// 商品总数
			_totalGoods() {
				let total = 0;
				this.cateList.forEach(item => {
					total += item.num
				})
				return total

			},
			// 商品总价
			_totalPrice() {
				let total = 0
				this.cateList.forEach(item => {
					total += item.num * item.price
				})
				return total
			}
		},
		methods: {
			// 获取信息
			async _getCatList() {
				let {
					token = null,
						uid = null
				} = uni.getStorageSync('user');
				let res = await this.$api._cartList({
					uid
				}, {
					authorization: token
				});
				if (res.data.code == 403) {
					uni.setTabBarItem({
						index: 2,
						text: '未登录'
					})
					return
				} else {
					if (res.data.list == null) {
						this.cateList = [];
					} else {
						res.data.list.forEach(item => {
							item.img = this.$baseUrl + item.img;
							item.checked = item.checked > 0
						})
						this.cateList = res.data.list
					}
				}
			},
			async _editCate(index) {
				/*
				id购物车编号，必填项num数量checked状态authorization  header头中需要添加token后台验证条件*/
				let {
					id,
					num,
					checked
				} = this.cateList[index]
				checked = checked ? 1 : 0
				let authorization = uni.getStorageSync('user').token
				let res = await this.$api._cartEdit({
					id,
					num,
					checked
				}, {
					authorization
				})
				if (res.data.code == 403) {
					uni.setTabBarItem({
						index: 2,
						text: '未登录'
					})
					uni.clearStorage();
					return
				}
			},
			// 单选按钮
			_changeChecked(index) {
				this.cateList[index].checked = !this.cateList[index].checked
				this._editCate(index)
			},
			// 全选按钮
			_doAllChecked(e) {
				console.log(e)
				this.cateList.forEach((item, index) => {
					item.checked = e.mp.detail.value
					this._editCate(index)
				})
			},
			// 商品数量操作
			add(index) {
				this.cateList[index].num++;
				this._editCate(index)
			},
			sub(index) {
				this.cateList[index].num--;
				this.cateList[index].num = Math.max(this.cateList[index].num, 1)
				this._editCate(index)
			},
			// 商品删除
			_delGoods(index) {
				uni.showModal({
					title: '删除提示',
					content: '确定删除么？',
					success: async (res) => {
						if (res.confirm) {
							let {
								id
							} = this.cateList[index]
							let authorization = uni.getStorageSync('user').token
							let res = await this.$api._cartDelete({
								id
							}, {
								authorization
							})
							if (res.code == 403) {
								uni.setTabBarItem({
									index: 2,
									text: '未登录'
								})
								uni.clearStorage()
								return
							}
							this.cateList.splice(index, 1)
							uni.showToast({
								title: res.data.msg
							})
						}

					}
				})
			},
			confirm() {
				let cates = this.cateList.filter(item => item.checked)
				if (cates.length <= 0) {
					uni.showToast({
						title: '至少选择一个商品',
						icon: 'none'
					})
					return
				}
				uni.setStorageSync('cates', cates)
				uni.navigateTo({
					url: '../confirm/confirm'
				})
			},
		},
	}
</script>

<style>
	@import url("../../common/css/cart.css");

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}

	.top-null {
		margin: 100rpx auto;
		text-align: center;
		font-size: 40rpx;
	}

	.foot {
		bottom: var(--window-bottom)
	}
</style>
