// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
// class User {
//   static #list = []

//   constructor(email, login, password) {
//     this.email = email
//     this.login = login
//     this.password = password
//     this.id = new Date().getTime()
//   }
//   verifyPassword = (password) => this.password === password

//   static add = (user) => {
//     this.#list.push(user)
//   }
//   static getList = () => this.#list

//   static getById = (id) =>
//     this.#list.find((user) => user.id === id)

//   static deleteById = (id) => {
//     const index = this.#list.findIndex(
//       (user) => user.id === id,
//     )
//     if (index !== -1) {
//       this.#list.splice(index, 1)
//       return true
//     } else {
//       return false
//     }
//   }

//   static updateById = (id, data) => {
//     const user = this.getById(id)

//     if (user) {
//       this.update(user, data)

//       return true
//     } else {
//       return false
//     }
//   }

//   static update = (user, { email }) => {
//     if (email) {
//       user.email = email
//     }
//   }
// }

// ================================================================

class Product {
  static #list = []

  constructor(name, price, description) {
    this.createDate = currentDate.toISOString()

    this.name = name
    this.price = price
    this.description = description

    this.id = Math.floor(Math.random() * 100000)

    this.createDate = () => {
      this.date = new Date().toISOString()
    }
  }
  static getList = () => this.#list

  static add = (product) => {
    this.#list.push(product)
  }
  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static updateById = (id, data) => {
    const product = this.getById(id)
    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }
  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
  static update = (name, { product }) => {
    if (name) {
      product.name = name
    }
  }
}
// ================================================================
// router.get Створює нам один ентпоїнт
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('/product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: '/product-create',
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  const product = new Product(name, price, description)

  Product.add(product)
  console.log(Product.getList())

  res.render('success-info', {
    style: 'success-info',
    info: 'Продукт створений',
  })
})
// ================================================================

// router.post('/user-create', function (req, res) {
//   const { email, login, password } = req.body

//   const user = new User(email, login, password)

//   User.add(user)

//   console.log(User.getList())

//   res.render('success-info', {
//     style: 'success-info',
//     info: 'Користивач створений',
//   })
// })

// ================================================================

// router.get('/user-delete', function (req, res) {
//   const { id } = req.query

//   // console.log(typeof id)

//   User.deleteById(Number(id))

//   res.render('success-info', {
//     style: 'success-info',
//     info: 'Користивача видалено',
//   })
// })

// ================================================================

// router.post('/user-update', function (req, res) {
//   const { email, password, id } = req.body
//   let result = false

//   const user = User.getById(Number(id))

//   if (user.verifyPassword(password)) {
//     User.update(user, { email })
//     result = true
//   }

//   res.render('success-info', {
//     style: 'success-info',
//     info: result
//       ? 'Емайл пошта оновлена'
//       : 'Сталась помилка',
//   })
// })

// Підключаємо роутер до бек-енду
module.exports = router
