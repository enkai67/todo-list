const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User

router.post('/', (req, res, next) => {
	const {name, email, password, confirmPassword} = req.body
	
	if ( !email || !password ) {
		req.flash('error', 'email及password為必填')
		return res.redirect('back')
	}

	if ( password.toString.length > 8){
		req.flash('error', '長度需大於8位英數字')
		return res.redirect('back')
	}

	if ( password !== confirmPassword) {
		req.flash('error', '驗證密碼與密碼不符')
		return res.redirect('back')
	}

	return User.count({ where: { email }})
		.then((rowCount) => {
			if (rowCount > 0) {
				req.flash('error', 'email已註冊')
				return
			}
			return User.create({email, name, password})
		})
		.then((user) => {
			if (!user){
				return res.redirect('back')
			}
			req.flash('success','註冊成功')
			return res.redirect('/login')
		})
		.catch((error) => {
			error.errorMessage = '註冊失敗'
			next(error)
		})
})

module.exports = router