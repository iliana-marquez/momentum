// *** USER DATA FOR GLOBAL USAGE *** //
let userData = {
    "info": {
        "username": "Ili",
        "email": "iliana.marquez@mail.com",
        "password": "MyPassword123",
        "firstname": "Iliana",
        "lastname": "Marquez",
        "dateOfBirth": "15.09.1986"
    },
    "lifeGoalCategories": [
        { "name": "Coding", "focus": "Career Change", "color": "#f89e37", "icon": "laptop-code" },
        { "name": "Health", "focus": "Stay Fit", "color": "#cb0e16", "icon": "heart-pulse" },
        { "name": "Relationships", "focus": "Deepen Bonds", "color": "#900c5e", "icon": "peace" },
        { "name": "Work", "focus": "Project Success", "color": "#bdbdbd", "icon": "briefcase" },
        { "name": "Finances", "focus": "Financial Freedom", "color": "#92bf1c", "icon": "hand-holding-dollar" }
    ],
    "tasks": [
        { "title": "Code 1hr", "category": "Coding", "toDoDate": "07.09.2025", "deadline": "08.09.2025", "done": true },
        { "title": "Workout 30min", "category": "Health", "toDoDate": "08.09.2025", "deadline": "08.09.2025", "done": true },
        { "title": "Call Partner", "category": "Relationships", "toDoDate": "08.09.2025", "deadline": "08.09.2025", "done": true },
        { "title": "Plan Project", "category": "Work", "toDoDate": "25.09.2025", "deadline": "28.09.2025", "done": false },
        { "title": "Save $500", "category": "Finances", "toDoDate": "07.09.2025", "deadline": "31.09.2025", "done": true },
        { "title": "Coffee date", "category": "Relationships", "toDoDate": "07.09.2025", "deadline": "11.09.2025", "done": false },
        { "title": "Confirm Container", "category": "Work", "toDoDate": "07.09.2025", "deadline": "10.09.2025", "done": false },
        { "title": "Code Submit", "category": "Coding", "toDoDate": "07.09.2025", "deadline": "10.09.2025", "done": false },
        { "title": "Code Review", "category": "Coding", "toDoDate": "07.09.2025", "deadline": "10.09.2025", "done": false },
        { "title": "Singing lesson", "category": "Health", "toDoDate": "12.09.2025", "deadline": "12.09.2025", "done": false }
    ],
    "milestones": [
        { "title": "Finish Freelance Site", "category": "Coding", "due": "15.09.2025", "done": false },
        { "title": "Workout 4x/week", "category": "Health", "due": "31.09.2025", "done": false },
        { "title": "Adventure w/Partner", "category": "Relationships", "due": "25.09.2025", "done": false },
        { "title": "Launch Project", "category": "Work", "due": "12.09.2025", "done": false },
        { "title": "Save $500", "category": "Finances", "due": "31.09.2025", "done": false }
    ]
}

// ==========================================
// *** DATA PERSISTENCE & AUTHENTICATION ***
// ==========================================
function saveToLocalStorage() {
    localStorage.setItem('momentumUserData', JSON.stringify(userData));
    localStorage.setItem('momentumLoggedIn', 'true');
    console.log('data saved to localStorage')
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('momentumUserData');
    const isLoggedIn = localStorage.getItem('momentumLoggedIn');

    if (savedData && isLoggedIn === 'true') {
        userData = JSON.parse(savedData);
        console.log('data loaded from localStorage');
        return true;
    } else {
        console.log('using default data for new user')
        return false;
    }
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
             // add the save to local storage function for data-persistance after login
            saveToLocalStorage();
            window.location.href = 'dashboard.html';
        } else {
            console.log('Login failed');
            document.getElementById('errorMessage').innerHTML = `Invalid username or password. Please try again`;
        };
    });
}

// *** LOGOUT LOGIC *** //
function logout() {
    localStorage.removeItem('momentumUserData');
    localStorage.removeItem('momentumLoggedIn');
    window.location.href = 'index.html';
}

// ==========================================
// *** UTILITY FUNCTIONS ***
// ==========================================

// Gets the date for filtering purposes
function formatDate(date) {
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Formats date
function parseDate(dateString) {
    let parts = dateString.split(".");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Gets the week number
function getWeekNumber(date) {
    let startOfYear = new Date(date.getFullYear(), 0, 1);
    let pastDays = (date - startOfYear) / (1000 * 60 * 60 * 24);
    return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
}

// Calculates Monday-Sunday week range for any given date
function getCurrentWeekRange(date = new Date()) {
    let weekStart = new Date(date);
    
    if (date.getDay() === 0) {
        // If Sunday, go back 6 days to get previous Monday
        weekStart.setDate(date.getDate() - 6);
        // Week end should be today (Sunday), not tomorrow
        let weekEnd = new Date(date);
        return { weekStart, weekEnd };
    } else {
        // For other days, use normal calculation
        weekStart.setDate(date.getDate() - date.getDay() + 1);
        let weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return { weekStart, weekEnd };
    }
    
}

// Gets the color of lifeGoalCategories
function getCategoryColor(categoryName) {
    let category = userData.lifeGoalCategories.find(cat => cat.name === categoryName);
    return category ? category.color : "#000"; // Default black if category not found
}

function showFeedbackModal(type, title, message = '') {
    // Remove existing modal if present
    const existingModal = document.getElementById('feedbackModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Configure icon and color based on type
    let iconClass, bgClass;
    switch(type) {
        case 'success':
            iconClass = 'fa-solid fa-check fa-2x';
            bgClass = 'bg-success';
            break;
        case 'error':
            iconClass = 'fa-solid fa-exclamation-triangle fa-2x';
            bgClass = 'bg-danger';
            break;
        case 'info':
            iconClass = 'fa-solid fa-info fa-2x';
            bgClass = 'bg-info';
            break;
        default:
            iconClass = 'fa-solid fa-bell fa-2x';
            bgClass = 'bg-secondary';
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade sharp-corners" id="feedbackModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content dark-mode text-center">
                    <div class="modal-body py-4">
                        <div class="mb-3">
                            <span class="badge ${bgClass} rounded-circle p-3">
                                <i class="${iconClass}"></i>
                            </span>
                        </div>
                        <h5>${title}</h5>
                        ${message ? `<p class="small text-muted">${message}</p>` : ''}
                        <button type="button" class="custom-button my-button-light-bg mt-3" data-bs-dismiss="modal">CLOSE</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert into DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
    modal.show();
    
    // Clean up after modal is hidden
    document.getElementById('feedbackModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}


// ==========================================
// *** DASHBOARD FUNCTIONS ***
// ==========================================

// * Prepare and print percentages of each category tasks to update the life sync chart
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

// * Function to print date and reuse for dynamic tasks
function updateDateInfo() {
    let today = new Date();

    // get weeday abbreviation (Mon, Tue, Wed, etc.)
    let weekdayOptions = { weekday: 'short' }
    let dayAbbreviation = today.toLocaleDateString('en-US', weekdayOptions);

    // format today's date
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let todayFormat = `${dayAbbreviation}-${day}.${month}.`;

    // get the current week number
    let weekNumber = getWeekNumber(today);

    // get start and end of current-week w/ extracted utility function
    let { weekStart, weekEnd } = getCurrentWeekRange(today);

    // format week range
    let startDay = String(weekStart.getDate()).padStart(2, '0');
    let endDay = String(weekEnd.getDate()).padStart(2, '0');
    let weekRange = `${startDay}.-${endDay}.${month}`;

    // inject in dashboard
    if (window.location.pathname.includes('dashboard.html')) {
    document.getElementById('today-date').innerHTML = `Today, ${todayFormat}`;
    document.getElementById('actual-week').innerHTML = `Week ${weekNumber}, ${weekRange}`;
    //calls the function here to recycle date arguments 
    updateProgressBars(todayFormat, weekStart, weekEnd);
    }
}

// *** PROGRESS BARS LOGIC *** //
// * Function to update 
function updateProgressBars(todayFormat, weekStart, weekEnd) {
    // get date from todayFormat (today's day)
    let todayStr = todayFormat.split('-')[1];
    let currentYear = new Date().getFullYear();
    let todayFormatted = `${todayStr}${currentYear}`;

    // counters 
    let todayTotal = 0;
    let todayDone = 0;
    let weekTotal = 0;
    let weekDone = 0;

    // counts tasks for today and week
    userData.tasks.forEach(task => {
        // Convert task date (dd.mm.yyyy) to a Date object
        let taskDateStr = task.toDoDate.split('.');
        let taskDate = new Date(`${taskDateStr[2]}-${taskDateStr[1]}-${taskDateStr[0]}`);

        // check if task is today
        if (task.toDoDate === todayFormatted || task.toDoDate.includes(todayStr)) { 
            todayTotal++;
            if (task.done) todayDone++;
        }

        // check if task is in this week (using Date objects for comparison)
        if (taskDate >= weekStart && taskDate <= weekEnd) {
            weekTotal++;
            if (task.done) weekDone++;
        }
    });

    // update progress bars
    let todayProgress = document.getElementById('today-progress');
    let weekProgress = document.getElementById('week-progress');

    // get max and value for today's progress
    if (todayProgress) {
        todayProgress.max = todayTotal;
        todayProgress.value = todayDone;
    }

    // get max and value for this week's progress
    if (weekProgress) {
        weekProgress.max = weekTotal;
        weekProgress.value = weekDone;
    }

    // to print in overlay on progress bar - for the future
    console.log(`Today's Progress: ${todayDone}/${todayTotal}`);
    console.log(`Week's Progress: ${weekDone}/${weekTotal}`);

}

// updateWeeklyPercentageDisplay()
function updateWeeklyPercentageDisplay() {
    let weeklyDisplay = document.getElementById('weekly-percentage-display');
    if (!weeklyDisplay || !userData) return;

    // Calculate category percentages for this week's tasks
    let { weekStart, weekEnd } = getCurrentWeekRange();

    // Count tasks per category for this week
    let weekCategoryTasks = {};
    let totalWeekTasks = 0;

    // Initialize category counts
    userData.lifeGoalCategories.forEach(category => {
        weekCategoryTasks[category.name] = 0;
    });

    // Count this week's tasks per category
    userData.tasks.forEach(task => {
        let taskDateStr = task.toDoDate.split('.');
        let taskDate = new Date(`${taskDateStr[2]}-${taskDateStr[1]}-${taskDateStr[0]}`);
        
        if (taskDate >= weekStart && taskDate <= weekEnd) {
            totalWeekTasks++;
            if (weekCategoryTasks[task.category] !== undefined) {
                weekCategoryTasks[task.category]++;
            }
        }
    });

    // Generate HTML for category indicators with percentages
    let displayHTML = '';
    userData.lifeGoalCategories.forEach(category => {
        let categoryCount = weekCategoryTasks[category.name];
        let percentage = totalWeekTasks > 0 ? Math.round((categoryCount / totalWeekTasks) * 100) : 0;
        
        displayHTML += `
            <li title="${category.name}: ${categoryCount} tasks (${percentage}%)">
                <span style="color: ${category.color};">●</span> ${percentage}%
            </li>
        `;
    });

    weeklyDisplay.innerHTML = displayHTML;
}

// ==========================================
// *** TASK MANAGEMENT ***
// ==========================================

// Add a new task
function registerTaskFormListener() {
    let taskForm = document.querySelector('#add-task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let title = document.querySelector('#task-title').value.trim();
            title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();   
            let category = document.querySelector('#task-category').value;
            let toDoDate = document.querySelector('#task-todo').value.split('-'); 
            toDoDate = `${toDoDate[2]}.${toDoDate[1]}.${toDoDate[0]}`; 
            let deadline = document.querySelector('#task-deadline').value.split('-');
            deadline = `${deadline[2]}.${deadline[1]}.${deadline[0]}`;
            let newTask = {
                title: title,
                category: category,
                toDoDate: toDoDate,
                deadline: deadline,
                done: false
            };

            // Clear focus and close modal immediately for better UX
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
            taskForm.closest('.modal').querySelector('.btn-close').click();

            // Reset form before closing modal
            taskForm.reset();

            // Defer all heavy DOM operations
            setTimeout(() => {
                if (!userData.tasks) {
                    userData.tasks = [];
                }
                console.log("Before Push:", userData.tasks);
                userData.tasks.push(newTask);
                console.log("After Push:", userData.tasks);
                saveToLocalStorage();
                refreshTasksAfterCRUD();
                // gives feed back in tasks page for tasks that arent displyed by default (within the dashboard display or collapsed lists)
                if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('tasks.html')) {
                  showFeedbackModal('success', 'TASK ADDED!', `${title} has been added successfully`);
                }  
            }, 0);
            
        });
    }
}

// Update tasks list afer submitting new task
function updateTaskList() {
    let today = new Date();
    let todayStr = formatDate(today);

    let { weekStart, weekEnd } = getCurrentWeekRange(today);


    let categories = {
        today: { title: `Today [${todayStr}]`, tasks: [] },
        week: { title: "This Week", tasks: [] },
        after: { title: "After", tasks: [] },
        done: { title: "Done", tasks: [] },
        expired: { title: "Expired", tasks: [] }
    };

    // sort tasks into categories
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

    // updates task list in dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        let todayTaskList = document.getElementById("today-task-list");
        todayTaskList.innerHTML = "";
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

    // updates task list in tasks page
    if (window.location.pathname.includes('tasks.html')) {
        let taskContainer = document.getElementById('tasksAccordion');
        taskContainer.innerHTML = ""; // Clear previous content

        Object.keys(categories).forEach((key, index) => {
            let section = categories[key];
            let tasksHTML = section.tasks.map(task => `
                <div class="task-row justify-content-between">
                    <div>
                        <input type="checkbox" class="task-checkbox" ${task.done ? "checked" : ""}>
                        <span class="task-title">${task.title}</span>
                    </div>
                    <div class="task-dates-actions text-end">
                        <span class="task-dates">To Do: ${task.toDoDate} | Deadline: ${task.deadline || "No Deadline"}</span>
                        <button class="custom-button my-button-light-bg my-button-icon"><i class="fa-solid fa-pencil"></i></button>
                        <button class="custom-button my-button-light-bg my-button-icon"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `).join("");

            let accordionHTML = `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button dark-mode" type="button" data-bs-toggle="collapse" 
                            data-bs-target="#taskSection${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" 
                            aria-controls="taskSection${index}">
                            ${section.title}
                        </button>
                    </h2>
                    <div id="taskSection${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">
                        <div class="accordion-body">
                            ${tasksHTML || "<p class='text-muted'>No tasks</p>"}
                        </div>
                    </div>
                </div>
            `;
            taskContainer.innerHTML += accordionHTML;
        });
    }
}

// refresh tasks
function refreshTasksAfterCRUD() {
    updateTaskList();
    if (window.location.pathname.includes('dashboard.html')) {
        updateChart(); // Update life sync chart
        
        let today = new Date();
        let { weekStart, weekEnd } = getCurrentWeekRange(today);
        
        // Create the abbreviated format that updateProgressBars expects
        let weekdayOptions = { weekday: 'short' };
        let dayAbbreviation = today.toLocaleDateString('en-US', weekdayOptions);
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let todayFormatForProgressBars = `${dayAbbreviation}-${day}.${month}.`;


        updateProgressBars(todayFormatForProgressBars, weekStart, weekEnd); // Update progress bars
        updateWeeklyPercentageDisplay(); // Update week box
    }
}

// ==========================================
// *** PAGE INITIALIZATION ***
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Determine which page is loaded
    const currentPage = window.location.pathname.split('/').pop();
    console.log('initializing page', currentPage)
    // Load saved data and check for authenticatio
    if (currentPage === 'login.html'){
        // Special case: login page should redirect if already logged in
        const isAlreadyLoggedIn = loadFromLocalStorage();
        if (isAlreadyLoggedIn) {
            console.log('User already logged in, redirecting to dashboard');
            window.location.href = 'dashboard.html';
            return; 
        }
    } else if (currentPage === 'index.html') {
        // Landing page: load data for potential navigation benefits
        loadFromLocalStorage();
        console.log('Data loaded on landing page for navigation');
    } else {
        // Protected pages: load data and check athentication
        const isLoggedIn = loadFromLocalStorage();
        if(!isLoggedIn){
            console.log('Not authenticaded, redirecting to login');
            window.location.href = 'login.html';
            return;
        }
        console.log('User data loaded for authenticated page:', currentPage);
    }
    // Run page-specific initialization in the correct order
    if (currentPage === 'dashboard.html'){
        // Functions needed on the dashboard
        updateDateInfo();
        updateChart();
        updateWeeklyPercentageDisplay();
        updateTaskList();
    } else if (currentPage === 'tasks.html') {
        updateTaskList();
    }

    // Add logout functionality to all authenticated pages
    if (currentPage === 'dashboard.html' || currentPage === 'tasks.html' || currentPage === 'profile.html' || currentPage === 'milestones.html') {
    document.querySelectorAll('a[href="index.html"][title="Logout"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
    }

    // NEW TASK FORM EVENT LISTENER ONCE PER PAGE LOAD!
    if (currentPage === 'dashboard.html' || currentPage === 'tasks.html') {
        registerTaskFormListener();
    }

})


