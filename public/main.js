const baseURL = "http://localhost:3000/";
async function createUser() {
    const user = {
        user_name: "saffff",
        user_email: "saff1@test.com",
        user_password: "Saff12!2",
    };
    const data = await fetch(`http://localhost:3000/users/signup/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    console.log(await data.json());
}
createUser();
