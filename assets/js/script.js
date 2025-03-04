// *** USER DATA FOR GLOBAL USAGE *** //
let userData =  {
    "info": {
        "username": "Ili",
        "email": "iliana.marquez@mail.com",
        "password": "MyPassord123",
        "firstname": "Iliana",
        "lastname": "Marquez",
        "dateOfBirth": "15.09.1986"
    },
    "lifeGoalCategories": [
        {"name": "Coding", "focus": "Career Change", "color": "#f89e37", "icon": "laptop-code"},
        {"name": "Health", "focus": "Stay Fit", "color": "#cb0e16", "icon": "heart-pulse"},
        {"name": "Relationships", "focus": "Deepen Bonds", "color": "#900c5e", "icon": "peace"},
        {"name": "Work", "focus": "Project Success", "color": "#bdbdbd", "icon": "briefcase"},
        {"name": "Finances", "focus": "Financial Freedom", "color": "#92bf1c", "icon": "hand-holding-dolar"}
    ],
    "tasks": [
        {"title": "Code 1hr", "category": "Coding", "toDoDate": "04.03.2025", "deadline": "04.03.2025", "done": false},
        {"title": "Workout 30min", "category": "Health", "toDoDate": "04.03.2025", "deadline": "04.03.2025", "done": true},
        {"title": "Call Partner", "category": "Relationships", "toDoDate": "04.03.2025", "deadline": "04.03.2025", "done": false},
        {"title": "Plan Project", "category": "Work", "toDoDate": "25.04.2025", "deadline": "28.04.2025", "done": false},
        {"title": "Save $500", "category": "Finances", "toDoDate": "31.03.2025", "deadline": "31.03.2025", "done": false},
        {"title": "Coffee date", "category": "Relationships", "toDoDate": "11.03.2025", "deadline": "11.03.2025", "done": false},
        {"title": "Confirm Container", "category": "Work", "toDoDate": "05.03.2025", "deadline": "06.03.2025", "done": false},
        {"title": "Code Review", "category": "Coding", "toDoDate": "05.03.2025", "deadline": "06.03.2025", "done": false},
        {"title": "Singing lesson", "category": "Health", "toDoDate": "12.03.2025", "deadline": "12.03.2025", "done": false}
    ],
    "milestones": [
        {"title": "Finish Freelance Site", "category": "Coding", "due": "05.03.2025", "done": false},
        {"title": "Workout 4x/week", "category": "Health", "due": "31.03.2025", "done": false},
        {"title": "Adventure w/Partner", "category": "Relationships", "due": "25.03.2025", "done": false},
        {"title": "Launch Project", "category": "Work", "due": "07.03.2025", "done": false},
        {"title": "Save $500", "category": "Finances", "due": "31.03.2025", "done": false}
    ]
}

// *** LOGIN LOGIC *** //
// * get data from login form, compares and validate
if (window.location.pathname.includes('login.html')) {
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
}


// *** DASBOARD LOGIC *** //

// ** Prepares the percentages of each category tasks to update the life sync chart
function updateChart() {
    if (!userData) {
        console.log("User data not loaded yet.");
        return;
    }
    
    // get total tasks
    let totalTasks = userData.tasks.length;
    if (totalTasks === 0) {
        console.log("No tasks available to generate the chart.");
        return;
    }

    let totalPercentage = 100;
    let totalCategoryTasks = {};

    
    // Initialise count for each category
    for (let category of userData.lifeGoalCategories) {
        totalCategoryTasks[category.name] = 0;
    }
    
    // Count tasks per category
    for (let task of userData.tasks) {
        let category = task.category;
        if (totalCategoryTasks[category] !== undefined) {
            totalCategoryTasks[category]++;
        }
    }

    // Generate the string that will inject the background property to the .pie-chart element
    let startPercentage = 0;
    let gradientString = 'conic-gradient(';

    // Build the conic-gradient string for each category
    userData.lifeGoalCategories.forEach((category, index) => {
        let categoryName = category.name;
        let categoryColor = category.color;
        let categoryPercentage = (totalCategoryTasks[categoryName] / totalTasks) * totalPercentage;
        
        let endPercentage = startPercentage + categoryPercentage;

        // Append to gradient string
        gradientString += `${categoryColor} ${startPercentage.toFixed(2)}% ${endPercentage.toFixed(2)}%`;
        
        // Only add a comma if it's not the last item
        if (index < userData.lifeGoalCategories.length - 1) {
            gradientString += ", ";
        }

        // Update startPercentage for next slice
        startPercentage = endPercentage;
    });

    gradientString += ")";

    console.log("Final Gradient String:", gradientString);

    // Apply to the pie chart
    document.querySelector(".circle").style.background = gradientString;
}
    

        

// * Life Sync Chart After Login
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        updateChart(); 
    });
}