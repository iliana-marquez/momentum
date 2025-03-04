// *** FETCH USER DATA FOR GLOBAL USAGE *** //
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

// *** LOGIN LOGIC *** //
// * get data from login form, compares and validate
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
        window.location.href = 'dashboard.html'; 
    } else {
        console.log('Login failed');
        document.getElementById('errorMessage').innerHTML = `Invalid username or password. Please try again`;
    };
});

// *** DASBOARD LOGIC *** //
// * Life Sync Chart After Login


// count all the active tasks

let totalTasks = userData.tasks.length();

let totalCategoryTasks = {};

for (let category of userData.lifeGoalCategories) {
    totalCategoryTasks[category.name] = 0;
}

for (let task of userData.tasks) {
    let category = task.category;

    if (taskCounts[category] !== undefined) {
    taskCounts[category]++;
    }

}

console.log (totalTasks);
console.log (totalCategoryTasks);



    


  