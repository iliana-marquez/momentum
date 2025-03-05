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
        {"title": "Code 1hr", "category": "Coding", "toDoDate": "05.03.2025", "deadline": "04.03.2025", "done": false},
        {"title": "Workout 30min", "category": "Health", "toDoDate": "04.03.2025", "deadline": "04.03.2025", "done": true},
        {"title": "Call Partner", "category": "Relationships", "toDoDate": "04.03.2025", "deadline": "04.03.2025", "done": false},
        {"title": "Plan Project", "category": "Work", "toDoDate": "25.04.2025", "deadline": "28.04.2025", "done": false},
        {"title": "Save $500", "category": "Finances", "toDoDate": "05.03.2025", "deadline": "31.03.2025", "done": false},
        {"title": "Coffee date", "category": "Relationships", "toDoDate": "05.03.2025", "deadline": "11.03.2025", "done": false},
        {"title": "Confirm Container", "category": "Work", "toDoDate": "05.03.2025", "deadline": "06.03.2025", "done": false},
        {"title": "Code Submit", "category": "Coding", "toDoDate": "05.03.2025", "deadline": "06.03.2025", "done": false},
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


// *** DASHBOARD LOGIC *** //

// * Function to prepare and print percentages of each category tasks to update the life sync chart
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

    // Apply to the pie chart
    document.querySelector(".circle").style.background = gradientString;
}

// * Life Sync Chart After Login
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        updateChart(); 
    });
}

// *** DATE LOGIC *** //
// * Function to print date and reuse for dynamic tasks
function udpateDateInfo () {
    let today = new Date();

    // get weeday abbreviation (Mon, Tue, Wed, etc.)
    let weekdayOptions = { weekday: 'short'}
    let dayAbbreviation = today.toLocaleDateString('en-US', weekdayOptions);

    // format today's date
    let day = String(today.getDate()).padStart(2,'0');
    let month = String(today.getMonth() + 1).padStart(2,'0');
    let todayFormat = `${dayAbbreviation}-${day}.${month}.`;

    // get the current week number
    let weekNumber = getWeekNumber(today);

    // get start and end of current-week
    let weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday start
    let weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Sunday end

    // format week range
    let startDay = String(weekStart.getDate()).padStart(2, '0');
    let endDay = String(weekEnd.getDate()).padStart(2, '0');
    let weekRange = `${startDay}.-${endDay}.${month}`;

    // inject 
    document.getElementById('today-date').innerHTML = `Today, ${todayFormat}`;
    document.getElementById('actual-week').innerHTML = `Week ${weekNumber}, ${weekRange}`;

    //calls the function here to recycle date arguments 
    updateProgressBars(todayFormat, weekStart, weekEnd);
}

// * Function to get the week number
function getWeekNumber(date) {
    let startOfYear = new Date(date.getFullYear(), 0, 1);
    let pastDays = (date - startOfYear) / (1000 * 60 * 60 * 24);
    return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
}
// Run the function on page load
document.addEventListener("DOMContentLoaded", udpateDateInfo);


// *** PROGRESS BARS LOGIC *** //
// * Function to update 
function updateProgressBars(todayFormat, weekStart, weekEnd) {
    // get date from todayFormat
    let todayStr = todayFormat.split('-')[1];

    // convert start and end of the week to string type
    let weekStartStr = weekStart.toISOString().split('T')[0];
    let weekEndStr = weekEnd.toISOString().split('T')[0];

    // counters 
    let todayTotal = 0;
    let todayDone = 0;
    let weekTotal = 0;
    let weekDone = 0;


    // counts taks for day and week for max and filters done for value
    userData.tasks.forEach(task => {
        let taskDateStr = task.toDoDate.split('.'); 
        let taskDate = new Date(`${taskDateStr[2]}-${taskDateStr[1]}-${taskDateStr[0]}`);
        // check if task is today
        if (task.toDoDate.includes(`${todayStr}`)) {
            todayTotal++;
            if (task.done) todayDone++;
        }

        //check if task is in this week
        if (taskDate >= weekStartStr && taskDate <= weekEndStr) {
            weekTotal++;
            if (task.done) weekDone++;
        }
    });

    // update progress bars
    let todayProgress = document.getElementById('today-progress');
    let weekProgress = document.getElementById('week-progress');

    // get max and value
    if (todayProgress) {
        todayProgress.max = todayTotal;
        todayProgress.value = todayDone;
    }
    
    if (weekProgress) {
        weekProgress.max = weekTotal;
        weekProgress.value = weekDone;
    }

    // to print in overlay on progress bar - for the future
    console.log(`Today's Progress: ${todayDone}/${todayTotal}`);
    console.log(`Week's Progress: ${weekDone}/${weekTotal}`); 
}

// *** TASKS LOGIC *** //
// * Function to print tasks
function updateTaskList() {
    // for today box in dashboard
    let todayTaskList = document.getElementById("today-task-list");
    todayTaskList.innerHTML = ""; 

    // for task page
    let taskContainer = document.getElementById('tasksAccordion');
    // taskContainer.innerHTML = ""; // Clear previous content

    let today = new Date();
    let todayStr = formatDate(today); 

    let weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1); 
    
    let weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    let categories = {
        today: { title: `Today [${todayStr}]`, tasks: [] },
        week: { title: "This Week", tasks: [] },
        after: { title: "After", tasks: [] },
        done: { title: "Done", tasks: [] },
        expired: { title: "Expired", tasks: [] }
    };

    //sort tasks into categories
    userData.tasks.forEach(task => {
        let taskDate = task.toDoDate;
        let taskDateObj = parseDate(task.toDoDate);
        let deadlineDateObj = task.deadline ? parseDate(task.deadline) : null;

        if (taskDate === todayStr) categories.today.tasks.push(task);
        if (taskDateObj >= weekStart && taskDateObj <= weekEnd) categories.week.tasks.push(task);
        if (taskDateObj > weekEnd) categories.after.tasks.push(task);
        if (task.done) categories.done.tasks.push(task);
        if (deadlineDateObj && deadlineDateObj < today) categories.expired.tasks.push(task);
    });

    // update today-box with category color
    categories.today.tasks.forEach(task => {
        let categoryColor = getCategoryColor(task.category);
        let todayTaskHTML = `
            <li style="color: ${categoryColor};">
                <i class="fa-solid fa-circle-check"></i> ${task.title}
            </li>
        `;
        todayTaskList.innerHTML += todayTaskHTML;
    });
    





}


// call updateTaskList() when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateTaskList();
});

// refresh tasks dynamically after CRUD operations
function refreshTasksAfterCRUD() {
    updateTaskList();
}

// gets the color of lifeGoalCategories
function getCategoryColor(categoryName) {
    let category = userData.lifeGoalCategories.find(cat => cat.name === categoryName);
    return category ? category.color : "#000"; // Default black if category not found
}

// gets the date for filtering purposes
function formatDate(date) {
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// formats date
function parseDate(dateString) {
    let parts = dateString.split(".");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}



// * C R U D
// Mark task done, update done:true and progress 