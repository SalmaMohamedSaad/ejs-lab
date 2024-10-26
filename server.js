const express = require('express')
const app = express()
const port = 3000
const RESTAURANT = {
  name: 'The Green Byte Bistro',
  isOpen: true,
  address: '742 Evergreen Rd, Mapleview, OS 45502',
  phone: '555-321-9876',
  menu: [
    {
      id: 1,
      name: 'Quantum Quinoa Mushroom Burger',
      price: 13.0,
      rating: 4,
      category: 'mains',
      details:
        'A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.'
    },
    {
      id: 2,
      name: 'Binary Berry Cheesecake',
      price: 10.11,
      rating: 3,
      category: 'desserts',
      details:
        'A creamy cheesecake bursting with flavor. A mix of berries in every byte.'
    },
    {
      id: 3,
      name: 'Recursive Rigatoni',
      price: 17.0,
      rating: 5,
      category: 'mains',
      details:
        "A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You'll keep coming back for more."
    },
    {
      id: 4,
      name: 'Pumpkin Pi Squared',
      price: 3.14,
      rating: 5,
      category: 'desserts',
      details: 'A delightful pumpkin dessert, squared and spiced to perfection.'
    },
    {
      id: 5,
      name: 'Fibonacci String Bean Fries',
      price: 11.23,
      rating: 5,
      category: 'sides',
      details:
        'Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.'
    }
  ]
}

app.get('/', (req, res) => {
  res.render('home.ejs', { RESTAURANT })
})
const menu = RESTAURANT.menu
const categoriesArray = []
RESTAURANT.menu.forEach((item) => {
  if (!categoriesArray.includes(item.category)) {
    categoriesArray.push(item.category)
  }
})
app.get('/menu', (req, res) => {
  res.render('menu.ejs', { menu, categoriesArray })
})
app.get('/menu/:category', (req, res) => {
  let cat = req.params.category
  if (!categoriesArray.includes(cat)) {
    return res.json({ error: 'Invalid Category' })
    // res.render('category.ejs', { error: '<h1>Invalid Category</h1>' })
  } else {
    cat = cat.charAt(0).toUpperCase() + cat.slice(1) //got the idea from the following link https://www.shecodes.io/athena/3710-how-to-capitalize-the-first-letter-in-a-string-with-javascript#:~:text=question%20for%20FREE-,%5BJavaScript%5D%20%2D%20How%20to%20Capitalize%20the%20First%20Letter%20in%20a,method%20and%20%60charAt()%60%20function.
    const menuItems = menu.filter((item) => {
      return item.category === req.params.category
    })
    res.render('category.ejs', { menuItems, cat })
  }
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
