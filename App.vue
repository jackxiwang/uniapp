<script>
	import checkToken from './utils/checkToken'
	// 项目的根组件
	export default {
		async onLaunch() {
			let token = uni.getStorageSync('user').token
			checkToken(token,this)
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
