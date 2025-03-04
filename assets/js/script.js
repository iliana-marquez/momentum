// *** Let user data for global usage *** //
let userData; 

fetch('assets/js/user_data.json')
    .then(response => {
        if (!response.ok) throw new Error ('Failed to fetch user data');
        return response.json();
     })
    .then(data => {
        userData = data;
        console.log(userData);
    })
    .catch(error => console.error('Fetch error', error));

// ** LOGIN LOGIC ** //
// ** get data from login form and compare
    document.querySelector('#login-form').addEventListener('submit', function login(e) {
        e.preventDefault();
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        

    if (!userData) {
        console.log('Data not loaded—try again');
        return;
    }
    if (userData.info.email === email && userData.info.password === password) {
        console.log('Login success:', userData.info.username);
        window.location.href = 'dashboard.html'; // Redirect
    } else {
        console.log('Login failed');
    };
});


    


  