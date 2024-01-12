POST - http://localhost:3001/users/register
PUT - http://localhost:3001/users/login
GET - http://localhost:3001/users/verify/3uKneLNCSDfWgewreMeq


POST - http://localhost:3001/items/addItem   -----(add and update)
get  - http://localhost:3001/items/getItem
   

POST - http://localhost:3001/orders/addOrder
    {  
    "customerName":"jana",
    "customerNumber": "9876543210",
    "orders": [{"items":[{"id":"659810abd8e313c0a5683191", "quantity": 2}]}]
    }
PUT - http://localhost:3001/orders/getOrder
        {"customerNumber": "987654321"}

