import baseUrl from './config.js'

const http = (options) => {
	let {
		url,
		method = 'get',
		data = {},
		header = {
				'content-type': 'application/json' //自定义请求头信息
			}
	} = options
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + url,
			method,
			data,
			header,
			success:resolve,
			fail:reject
		})
	})
}
export default http
