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
  `Комп'ютep Prgline Workstation (W67p03) Intel Xeon E-2226G/`,
  `Intel Xeon (52226G (3.4 - 4.7 ГГЦ) / RAM 16 G / SSD 512 ГБ / nVidia Quadro P620, 2 ГБ`,
  [{ id: 1, text: 'Готовий до відправки' }],
  40000,
  10,
)
class Purchase {
  static DELIVERY_PRICE = 150
}

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
  // ↑↑ сюди вводимо JSON дані
})

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
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// router.post Створює нам один ентпоїнт
//↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-submit', function (req, res) {
  // res.render генерує нам HTML сторінку
  console.log(req.query)
  console.log(req.body)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    data: {
      message: 'Успішно',
      info: 'Замовлення створено',
      link: `/purchase-list`,
    },
  })
  //↑↑ сюди вводимо JSON дані
})
// ==========================================================

// Підключаємо роутер до бек-енду
module.exports = router
