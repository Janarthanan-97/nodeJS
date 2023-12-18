Route to Teachers


/teachers

    Request Type: get
    Action: Get all teacher from DB

    Request Type: Post
    Action: post a new teacher with json formate {"name":"abcd"}

/teachers/addStudent/:id

    Request: put
    Action: add new student in for specific teacher with,
        id: objectID of teacher
        json formate: {"student": "objectID of student"}

/teachers/delete/:id

    Request: delete
    Action: delete a teacher from database,
        id: objectID of teacher

-------------------------------------------------------------------
Route to Teachers


/students

    Request Type: get
    Action: Get all student from DB

    Request Type: Post
    Action: post a new student with json formate {"name":"abcd"}


students/studentsWithoutTeacher

    Request type: get
    Action: get students who was not assigned with any teacher

/students/assignTeacher/:id

    Request: put
    Action: add teacher for specific student with,
        id: objectID of student
        json formate: {"teacher": "objectID of teacher"}


/students/delete/:id

    Request: delete
    Action: delete a student from database,
        id: objectID of student