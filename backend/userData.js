import bcrypt from "bcryptjs";

const userData = [
    {
        name:"milon",
        email:"milon@gmail.com",
        password:bcrypt.hashSync("123456789"),
        isAdmin: true
    },
    {
        name:"alif",
        email:"alif@gmail.com",
        password:bcrypt.hashSync("123456789"),
        isAdmin: false
    }
]

export default userData