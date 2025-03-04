// ** LOGIN LOGIC ** //
// * AJAX to fetch user email & password
 fetch('assets/js/user_data.json')
    .then(response => response.json())
    .then(data => {
        let email = data.info.email;
        let password = data.info.password;
        console.log(email);
        console.log(password);
    })



  