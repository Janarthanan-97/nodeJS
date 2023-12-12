Routes to Rooms
    /rooms
			To get all rooms
	
    /rooms/addRoom
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
		to book room please replace ":id" with _id from rooms database
		
    /rooms/deleteRoom/:id
		to delete room please replace ":id" with _id from rooms database
-------------------------------------------------------------------------
routes to Users
    /users
		To get all users
		
    /users/addUser
		to Add user in DB
			Schema to add user 
			{
                "name": "name",
                "userID"; "userID",
                "password" "password"
			}
	
    /users/updateUser/:id
		to update user please replace ":id" with _id from user database
		
	
    /users/deleteUser/:id
		to delete user please replace ":id" with _id from user database
	
	
	/users/getRoomsForUser/:id
		to get all rooms boooked by user please replace ":id" with _id from user database