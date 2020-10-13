let baseUrl = null;
if (process.env.NODE_ENV === 'development') {
	baseUrl = 'http://localhost:3000'
} else {
	baseUrl = ''
}
export default baseUrl
