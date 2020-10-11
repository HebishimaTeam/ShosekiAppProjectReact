const mailValidation = (mail) => {
	if (!mail) return `mailを入力してください`
	const regex = /^[a-zA-Z0-9.!#$%&'*=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	if (!regex.test(mail)) return '正しい形式でメールアドレスを入力してください'

	return ''
}

const passwordValidation = (password) => {
	if (!password) return 'passwordを入力してください'
	if (password.length < 8) return 'passwordは8文字以上で入力してください'

	return ''
}

class Validation {
	static formValidate = (type, value) => {
		switch (type) {
			default:
				return ''
			case 'mail':
				return mailValidation(value)
			case 'password':
				return passwordValidation(value)
		}
	}
}
export default Validation