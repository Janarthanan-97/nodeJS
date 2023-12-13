Routes to Rooms

    /rooms
      request type: get
			To get all rooms
	
    /rooms/addRoom
      request type: post
			to Add room in DB
			Schema to add room 
			{
                "name": "Hall 1",
                "type": "Non Dulex",
                "Rent": 1000,
                "BookingHistory":[],
                "furnished": "furnished"
			}

    /rooms/bookRoom/:id
      request type: put
      to book room please replace ":id" with _id from rooms database
      Book with object {userID: "abc@gmail.com", startDate : "yyyy-mm-dd", endDate : "yyyy-mm-dd"}
      
    /rooms/deleteRoom/:id
      request type: delete
    	to delete room please replace ":id" with _id from rooms database
-------------------------------------------------------------------------

routes to Users

    /users
      request type: get
		  To get all users
		
    /users/addUser
      request type: post
		  to Add user in DB
			Schema to add user 
			{
                "name": "name",
                "userID"; "userID",
                "password" "password"
			}
	
    /users/updateUser/:id
      request type: put
		  to update user please replace ":id" with _id from user database
		
	
    /users/deleteUser/:id
      request type: delete
		  to delete user please replace ":id" with _id from user database
	
	
	/users/getRoomsForUser/:id
    request type: get
		to get all rooms boooked by user please replace ":id" with _id from user database