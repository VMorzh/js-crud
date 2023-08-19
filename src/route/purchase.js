// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    this.id = ++Product.#count // Генеруємо унікальний id для товару
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }
  static add = (...data) => {
    const newProduct = new Product(...data)
    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }
  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    // Фільтруємо товари, цоб вилучити той, з яким порівнюсмо id
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )

    // constructor(name, price, description) {
    //   this.name = name
    //   this.price = price
    //   this.description = description
    //   this.id = Math.floor(Math.random() * 100000)
    //   this.createDate = () => {
    //     this.date = new Date().toISOString()
    //   }
    // }
    // static getList = () => this.#list
    // checkId = (id) => this.id === id

    // static add = (product) => {
    //   this.#list.push(product)
    // }
    // static getById = (id) =>
    //   this.#list.find((product) => product.id === id)

    // static updateById = (id, data) => {
    //   const product = this.getById(id)
    //   if (product) {
    //     this.update(product, data)
    //     return true
    //   } else {
    //     return false
    //   }
    // }

    //   static deleteById = (id) => {
    //     const index = this.#list.findIndex(
    //       (product) => product.id === id,
    // >>>>>>> 63fb66c1d71b26d87d51750aec888c208e94722b

    // Відсортуємо за допомогою Math. random() та перемішаємо масив
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )
    // Повертаємо перші 3 елементи з перемішаного масиву
    return shuffledList.slice(0, 3)
  }
}

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютep Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 (Гц) / RAM 16 ГБ / HOD 1 T6 + SSD 488 ГБ / nVidia Geforce F `,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Ton продажів' },
  ],
  27000,
  10,
)
Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютep ProLine Business (B112p19) Intel Core 15 9400F/`,
  `Intel Core 15 9400F (2.9 - 4.1 Fru) / RAM 8 Г5 / HD0 1 T6 / Intel UND Graphics 630 / DI`,
  [{ id: 2, text: 'Ton продажів' }],
  20000,
  10,
)
Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютep Proline Workstation (W67p03) Intel Xeon E-2226G/`,
  `Intel Xeon (52226G (3.4 - 4.7 ГГЦ) / RAM 16 G / SSD 512 ГБ / nVidia Quadro P620, 2 ГБ`,
  [{ id: 1, text: 'Готовий до відправки' }],
  40000,
  10,
)

class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1

  static #count = 0
  static #list = []

  static #bonusAccount = new Map()

  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }

  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR
  }

  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    const amount = this.calcBonusAmount(price)

    const currentBalance = Purchase.getBonusBalance(email)
    const updatedBalance =
      currentBalance + amount - bonusUse

    Purchase.#bonusAccount.set(email, updatedBalance)

    console.log(email, updatedBalance)

    return amount
  }

  constructor(data, product) {
    this.id = ++Purchase.#count

    this.firstname = data.firstname
    this.lastname = data.lastname

    this.phone = data.phone
    this.email = data.email
    this.delivery = data.delivery
    this.comment = data.comment || null

    this.bonus = data.bonus || 0
    this.promocode = data.promocode || null

    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice

    this.deliveryPrice = data.deliveryPrice

    this.amount = data.amount
    this.product = product
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)

    this.#list.push(newPurchase)
    //оновлення об'єкту product після успішної покупки
    newPurchase.product.amount -= newPurchase.amount

    return newPurchase
  }

  static getList = () => {
    return Purchase.#list.reverse().map((purchase) => ({
      id: purchase.id,
      product: purchase.product.title,
      totalPrice: purchase.totalPrice,
      bonus: Purchase.calcBonusAmount(purchase.totalPrice),
    }))
  }

  static getById = (id) => {
    return this.#list.find((item) => item.id === id)
    // return Purchase.#list.find((item) => item.ad === id)
  }

  static updateById = (id, data) => {
    const purchase = Purchase.getById(id)

    if (purchase) {
      if (data.firstnane)
        purchase.firstname = data.firstname
      if (data.lastname) purchase.lastnane = data.lastname
      if (data.phone) purchase.phone = data.phone
      if (data.emall) purchase.email = data.email
      if (data.delivery) purchase.delivery = data.delivery

      // const product = this.getById(id)
      // const { name, price, description } = data

      // if (product) {
      //   if (name) {
      //     product.name = name
      //   } else if (price) {
      //     product.price = price
      //   } else if (description) {
      //     product.description = description
      //   }
      // >>>>>>> 63fb66c1d71b26d87d51750aec888c208e94722b

      return true
    } else {
      return false
    }
  }
}

class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }

  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }

  static calc = (promo, price) => {
    return price * promo.factor
  }
}

Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNTSO', 0.5)
Promocode.add('SALE25', 0.75)

// // ================================================================

// router.get Створює нам один ентпоїнт
// // ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (reg, res) {
  // res.render генерує нам HTML сторінку

  //↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Product.getList(),
    },
  })

  // static update = (name, { product }) => {
  //   if (name) {
  //     product.name = name
  //   }
  // }
})
// ================================================================
// // router.get Створює нам один ентпоїнт
// // ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/product-create', function (req, res) {
//   // res.render генерує нам HTML сторінку
//   const list = Product.getList()

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('product-create', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'product-create',
//   })
//   // ↑↑ сюди вводимо JSON дані
// })
// // ================================================================
// >>>>>>> 63fb66c1d71b26d87d51750aec888c208e94722b

// // router.get Створює нам один ентпоїнт
// // ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/product-list', function (req, res) {
//   // res.render генерує нам HTML сторінку
//   const list = Product.getList()

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('product-list', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'product-list',
//     data: {
// <<<<<<< HEAD
//       list: Product.getList(),
// =======
//       products: {
//         list,
//         isEmpty: list.length === 0,
//       },
// >>>>>>> 63fb66c1d71b26d87d51750aec888c208e94722b
//     },
//   })
//   // ↑↑ сюди вводимо JSON дані
// })
// <<<<<<< HEAD

// // ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })

  // ↑↑ сюди вводимо JSON дані
})

//  ================================================================

// router. Створює нам один ентпоїнт
// ↙️ тут вводимо шлях (PATH) до сторінки

router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  if (amount < 1) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  const product = Product.getById(id)

  if (product.amount < 1) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такої кількісті товару немає в наявності',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  console.log(product, amount)

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Purchase.calcBonusAmount(totalPrice)

  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-create',

    data: {
      id: product.id,

      cart: [
        {
          text: `${product.title} (${amount} шт.)`,
          price: productPrice,
        },
        {
          text: `Доставка`,
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
      bonus,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// router.post('/product-create', function (req, res) {
//   const { name, price, description } = req.body

//   const product = new Product(name, price, description)

//   Product.add(product)

//   console.log(Product.getList())
//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('product-alert', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'product-alert',
//     info: 'Товар успішно додано',
//   })
//   // ↑↑ сюди вводимо JSON дані
// })
// ================================================================

// router.get('/product-edit', function (req, res) {
//   const { id } = req.query

//   const product = Product.getById(Number(id))

//   if (product) {
//     // ↙️ cюди вводимо назву файлу з сontainer
//     return res.render('product-edit', {
//       style: 'product-edit',

//       data: {
//         name: product.name,
//         price: product.price,
//         id: product.id,
//         description: product.description,
//       },
//     })
//   } else {
//     return res.render('product-alert', {
//       // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//       style: 'product-alert',
//       info: 'Продукту за таким ID не знайдено',
//     })
//   }
// })
//======================================

// router.post('/product-edit', function (req, res) {
//   // res.render генерує нам HTML сторінку
//   const { id, name, price, description } = req.body

//   const product = Product.updateById(Number(id), {
//     name,
//     price,
//     description,
//   })

//   console.log(id)
//   console.log(product)

//   if (product) {
//     // ↙️ cюди вводимо назву файлу з сontainer
//     res.render('product-alert', {
//       // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//       style: 'product-alert',
//       info: 'Інформація про товар оновлена',
//     })
//   } else {
//     // ↙️ cюди вводимо назву файлу з сontainer
//     res.render('product-alert', {
//       // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//       style: 'product-alert',
//       info: 'Сталася помилка',
//     })
//   }
//   // ↑↑ сюди вводимо JSON дані
// })
// ================================================================

// router.get('/product-delete', function (req, res) {
//   const { id } = req.query

//   Product.deleteById(Number(id))

//   res.render('product-alert', {
//     style: 'product-alert',
//     info: 'Товар видалено',
// >>>>>>> 63fb66c1d71b26d87d51750aec888c208e94722b
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// ===============================================================

// router.post Створює нам один ентпоїнт ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-submit', function (req, res) {
  const id = Number(req.query.id)

  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    comment,

    promocode,
    bonus,
  } = req.body

  const product = Product.getById(id)

  if (!product) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Товар не знайдено',
        link: `/purchase-list`,
      },
    })
  }

  if (product.amount < amount) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Немає такої кількості товару',
        link: `/purchase-list`,
      },
    })
  }
  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)

  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus)
  ) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Некоректні дані',
        link: '/purchase-list',
      },
    })
  }

  if (!firstname || !lastname || !email || !phone) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: `Заповніть обов'язкові поля`,
        info: 'Некоректні дані',
        link: `/purchase-list`,
      },
    })
  }

  if (bonus || bonus > 0) {
    const bonusAmount = Purchase.getBonusBalance(email)

    console.log(bonusAmount)

    if (bonus > bonusAmount) {
      bonus = bonusAmount
    }
    Purchase.updateBonusBalance(email, totalPrice, bonus)
    totalPrice -= bonus
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0)
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode)

    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }

  if (totalPrice < 0) totalPrice = 0

  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      bonus,

      firstname,
      lastname,
      email,
      phone,

      promocode,
      comment,
    },
    product,
  )
  console.log(purchase)

  res.render('alert', {
    style: 'alert',
    data: {
      message: 'Успішно',
      info: 'Замовлення створено',
      link: `/purchase-list`,
    },
  })
  //↑↑ сюди вводимо JSON дані
})
// ================================================================

// // ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-list', function (req, res) {
  const list = Purchase.getList()
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-list',

    title: 'Мої замовлення',

    data: {
      purchases: {
        list,
      },
      // bonus, // Отримати bonusAmount з параметрів URL
    },
  })

  // ↑↑ сюди вводимо JSON дані
})
// ==========================================================
// router.get Створює нам один ентпоїнт
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-info', function (req, res) {
  const id = Number(req.query.id)
  const purchase = Purchase.getById(id)
  const bonus = Purchase.calcBonusAmount(
    purchase.totalPrice,
  )
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-info',

    title: 'Інформація про замовлення',

    data: {
      id: purchase.id,
      firstname: purchase.firstname,
      lastname: purchase.lastname,

      phone: purchase.phone,
      email: purchase.email,
      delivery: purchase.delivery,
      product: purchase.product,

      productPrice: purchase.productPrice,
      deliveryPrice: purchase.deliveryPrice,
      totalPrice: purchase.totalPrice,
      bonus: bonus,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ==========================================================
// ==========================================================
// router.get Створює нам один ентпоїнт
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-edit', function (req, res) {
  const id = Number(req.query.id)

  const purchase = Purchase.getById(id)

  if (!purchase) {
    // Якщо товар з таким id не знайдено, відображаємо повідомлення про помилку
    res.render('alert', {
      style: 'alert',
      component: ['button', 'heading'],

      isError: true,
      title: 'Помилка',
      info: 'Замовлення з таким ID не знайдено',
    })
  } else {
    // Якщо товар знайдено, передаємо його дані у шаблон product-edit
    res.render('purchase-edit', {
      style: 'purchase-edit',
      component: ['heading', 'divider', 'field', 'button'],

      title: 'Зміна данних замовлення',

      data: {
        id: purchase.id,
        firstname: purchase.firstname,
        lastname: purchase.lastname,

        phone: purchase.phone,
        email: purchase.email,
        delivery: purchase.delivery,
      },
    })
  }
  // ↑↑ сюди вводимо JSON дані
})
// =========================================================
router.post('/purchase-edit', function (req, res) {
  const id = Number(req.query.id)
  let { firstname, lastname, phone, email, delivery } =
    req.body

  const purchase = Purchase.getById(id)

  console.log(purchase)

  if (purchase) {
    const newPurchase = Purchase.updateById(id, {
      firstname,
      lastname,
      phone,
      email,
      delivery,
    })

    console.log(newPurchase)
    // Якщо оновлення вдалося, відображаємо повідомлення про успіх
    if (newPurchase) {
      res.render('alert', {
        style: 'alert',
        component: ['button', 'heading'],

        data: {
          link: '/purchase-list',
          title: 'Успішне виконання дії',
          info: 'Товар успішно оновлено',
        },
      })
    } else {
      // Якщо оновлення не вдалося (наприклад, товару з таким id не існує),
      // відображаємо повідомлення про помилку
      res.render('alert', {
        style: 'alert',
        component: ['button', 'heading'],

        data: {
          link: '/purchase-list',
          title: 'Помилка',
          info: 'Товар не вдалося оновити',
        },
      })
    }
  } else {
    // Якщо оновлення не вдалося (наприклад, товару з таким id не існує),
    // відображаємо повідомлення про помилку
    res.render('alert', {
      style: 'alert',
      component: ['button', 'heading'],

      data: {
        link: '/purchase-list',
        title: 'Помилка',
        info: 'Товар не вдалося оновити',
      },
    })
  }
})
// ===============================================================
// Підключаємо роутер до бек-енду
module.exports = router
