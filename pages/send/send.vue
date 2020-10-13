<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" placeholder="输入手机号" maxlength="12" v-model="newTel" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="_getSms">{{msg}} </text>
			</view>
			<input type="text" placeholder="- - - -" maxlength="4" v-model="code" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="_login">登录</button>
		</view>
		<view class="row">
			<!-- <text style="color: #006699;text-align: center;" >通过微信授权登录</text> -->
		</view>
	</view>
</template>

<script>
	let app = getApp()

	export default {
		data() {
			return {
				newTel: null,
				currentTel: null,
				timer: null,
				msg: '获取手机验证码',
				time: 20,
				code: null,
				timer_open: true
			}

		},
		methods: {
			async _getSms() {
				let phone = this.newTel
				let rgeExp =/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
				if(!rgeExp.test(phone)){
					uni.showToast({
						title:'手机号格式不正确',
						icon:'none'
					})
					return
				}
				// 开关控制连点
				if (this.timer_open) {
					this.timer_open = false;
				} else {
					return
				}
				clearInterval(this.timer)
				let res = await this.$api._getSms({
					phone
				});
				if (res.data.list.code) {
					uni.setStorageSync('code', res.data.list.code)
					this.currentTel = phone
					this.timer = setInterval(() => {
						this.time--
						this.msg = this.time + '秒后重新获取验证码'
						if (this.time < 1) {
							this.time = 20
							this.timer_open = true;
							clearInterval(this.timer)
							uni.removeStorageSync('code')
							this.msg = '获取手机验证码'
						}
					}, 1000)
				}else {
					uni.showToast({
						title:'网络错误',
						icon:'none'
					})
				}

			},
			async _login() {
				let {newTel,code} = this
				console.log(newTel ,this.currentTel);
				let reallyCode = uni.getStorageSync('code') || null
				if (newTel != this.currentTel) {
					uni.showToast({
						title:'手机号错误',
						icon:'none'
					})
					return
				}
				if(code==null || code != reallyCode){
					uni.showToast({
						title:'验证码有误！',
						icon:'none'
					})
					return 
				}
				let res = await this.$api._wxLogin({phone:this.currentTel})
				if(res.data.list != null){
					uni.showToast({
						title:'登陆成功'
					})
					uni.setStorageSync('user',res.data.list)
					setTimeout(()=>{
						uni.switchTab({
							url:'../mine/mine'
						})
					},1500)
				}else{
					uni.showToast({
						title:'登陆失败',
						icon:'none'
					})
				}
			}

		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
