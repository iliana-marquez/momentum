// *** USER DATA FOR GLOBAL USAGE *** //
let userData = {
    "info": {
        "username": "Ili",
        "email": "test@mail.com",
        "password": "test",
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
        { "title": "Save $500", "category": "Finances", "toDoDate": "07.09.2025", "deadline": "30.09.2025", "done": true },
        { "title": "Coffee date", "category": "Relationships", "toDoDate": "07.09.2025", "deadline": "11.09.2025", "done": false },
        { "title": "Confirm Container", "category": "Work", "toDoDate": "07.09.2025", "deadline": "10.09.2025", "done": false },
        { "title": "Code Submit", "category": "Coding", "toDoDate": "07.09.2025", "deadline": "10.09.2025", "done": false },
        { "title": "Code Review", "category": "Coding", "toDoDate": "07.09.2025", "deadline": "10.09.2025", "done": false },
        { "title": "Singing lesson", "category": "Health", "toDoDate": "12.09.2025", "deadline": "12.09.2025", "done": false }
    ],
    "milestones": [
        { "title": "Finish Freelance Site", "category": "Coding", "due": "15.09.2025", "done": false },
        { "title": "Workout 4x/week", "category": "Health", "due": "30.09.2025", "done": false },
        { "title": "Adventure w/Partner", "category": "Relationships", "due": "25.09.2025", "done": false },
        { "title": "Launch Project", "category": "Work", "due": "12.09.2025", "done": false },
        { "title": "Save $500", "category": "Finances", "due": "30.09.2025", "done": false }
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
// * Get data from login form, compares and validate
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
        weekStart.setDate(date.getDate() - 6);
        let weekEnd = new Date(date);
        // Reset time to avoid comparison issues
        weekStart.setHours(0, 0, 0, 0);
        weekEnd.setHours(23, 59, 59, 999);
        return { weekStart, weekEnd };
    } else {
        weekStart.setDate(date.getDate() - date.getDay() + 1);
        let weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        // Reset time to avoid comparison issues
        weekStart.setHours(0, 0, 0, 0);
        weekEnd.setHours(23, 59, 59, 999);
        return { weekStart, weekEnd };
    }

}

// Gets the color of lifeGoalCategories
function getCategoryColor(categoryName) {
    let category = userData.lifeGoalCategories.find(cat => cat.name === categoryName);
    return category ? category.color : "#000"; // Default black if category not found
}

// Creates dynamic modal for user feedback 
function showFeedbackModal(type, title, message = '') {
    // Remove existing modal if present
    const existingModal = document.getElementById('feedbackModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Configure icon and color based on type
    let iconClass, bgClass;
    switch (type) {
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

    // Also clear focus when modal is hiding (before hidden)
    document.getElementById('feedbackModal').addEventListener('hide.bs.modal', function () {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
        document.body.focus();
    });


}

// Date conversion to dd.mm.yyyy
function convertDateToUserFormat(dateInput) {
    const parts = dateInput.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

// Convert dd.mm.yyyy to yyyy-mm-dd for HTML date inputs
function convertToDateInput(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('.');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

// Creates a taskUpdateModal form for task editing
function openTaskEditModal(taskIndex) {
    let task = userData.tasks[taskIndex];
    if (!task) return;

    // Remove existing modal
    const existingModal = document.getElementById('editTaskModal');
    if (existingModal) existingModal.remove();

    // Create edit modal
    const editModalHTML = `
        <div class="modal fade sharp-corners" id="editTaskModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content dark-mode">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Task</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="edit-task-form">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="edit-task-title" value="${task.title}" required>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" id="edit-task-category" required>
                                    ${userData.lifeGoalCategories.map(cat =>
        `<option value="${cat.name}" ${task.category === cat.name ? 'selected' : ''}>${cat.name}</option>`
    ).join('')}
                                </select>
                            </div>
                            <div class="mb-3">
                                <label>To Do Date:</label>
                                <input type="date" class="form-control" id="edit-task-todo" value="${convertToDateInput(task.toDoDate)}" required>
                            </div>
                            <div class="mb-3">
                                <label>Deadline:</label>
                                <input type="date" class="form-control" id="edit-task-deadline" value="${convertToDateInput(task.deadline)}" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="edit-task-done" ${task.done ? 'checked' : ''}>
                                    <label class="form-check-label">Mark as completed</label>
                                </div>
                            </div>
                            <button type="submit" class="my-button-light-bg w-100">Update Task</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', editModalHTML);
    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    modal.show();

    // Handle form submission
    document.getElementById('edit-task-form').addEventListener('submit', function (e) {
        e.preventDefault();

        let title = document.getElementById('edit-task-title').value.trim();
        title = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        // Update all task properties
        userData.tasks[taskIndex] = {
            title: document.getElementById('edit-task-title').value.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
            category: document.getElementById('edit-task-category').value,
            toDoDate: convertDateToUserFormat(document.getElementById('edit-task-todo').value),
            deadline: convertDateToUserFormat(document.getElementById('edit-task-deadline').value),
            done: document.getElementById('edit-task-done').checked
        };

        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
        modal.hide();

        setTimeout(() => {
            saveToLocalStorage();
            refreshTasksAfterCRUD();
            showFeedbackModal('success', 'TASK UPDATED!', 'Task updated successfully');
        }, 0);
    });

    // Cleanup
    document.getElementById('editTaskModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Creates a milestoneUpdateModal form for milestone editing
function openMilestoneEditModal(milestoneIndex) {
    let milestone = userData.milestones[milestoneIndex];
    if (!milestone) return;

    // Remove existing modal
    const existingModal = document.getElementById('editMilestoneModal');
    if (existingModal) existingModal.remove();

    // Create edit modal
    const editModalHTML = `
        <div class="modal fade sharp-corners" id="editMilestoneModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content dark-mode">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Milestone</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="edit-milestone-form">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="edit-milestone-title" value="${milestone.title}" required>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" id="edit-milestone-category" required>
                                    ${userData.lifeGoalCategories.map(cat =>
        `<option value="${cat.name}" ${milestone.category === cat.name ? 'selected' : ''}>${cat.name}</option>`
    ).join('')}
                                </select>
                            </div>
                            <div class="mb-3">
                                <label>Due Date:</label>
                                <input type="date" class="form-control" id="edit-milestone-due" value="${convertToDateInput(milestone.due)}" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="edit-milestone-done" ${milestone.done ? 'checked' : ''}>
                                    <label class="form-check-label">Mark as completed</label>
                                </div>
                            </div>
                            <button type="submit" class="my-button-light-bg w-100">Update Milestone</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', editModalHTML);
    const modal = new bootstrap.Modal(document.getElementById('editMilestoneModal'));
    modal.show();

    // Handle form submission
    document.getElementById('edit-milestone-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Update milestone properties
        userData.milestones[milestoneIndex] = {
            title: document.getElementById('edit-milestone-title').value.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
            category: document.getElementById('edit-milestone-category').value,
            due: convertDateToUserFormat(document.getElementById('edit-milestone-due').value),
            done: document.getElementById('edit-milestone-done').checked
        };

        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
        modal.hide();

        setTimeout(() => {
            saveToLocalStorage();
            updateMilestoneList();
            showFeedbackModal('success', 'MILESTONE UPDATED!', 'Milestone updated successfully');
        }, 0);
    });

    // Cleanup
    document.getElementById('editMilestoneModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Creates a dynamic modal for delete confirmation
function openDeleteConfirmModal(itemType, itemIndex, itemTitle, deleteCallback) {
    // Remove existing modal
    const existingModal = document.getElementById('deleteConfirmModal');
    if (existingModal) existingModal.remove();
    
    // Create universal delete confirmation modal
    const deleteModalHTML = `
        <div class="modal fade sharp-corners" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content dark-mode text-center">
                    <div class="modal-body py-4">
                        <div class="mb-3">
                            <span class="badge bg-danger rounded-circle p-3">
                                <i class="fa-solid fa-trash-can fa-2x"></i>
                            </span>
                        </div>
                        <h5>Delete ${itemType}</h5>
                        <p class="text-muted">Are you sure you want to delete "${itemTitle}"?</p>
                        <div class="d-flex gap-2 justify-content-center">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" id="confirmDelete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', deleteModalHTML);
    const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    modal.show();
    
    // Handle delete confirmation
    document.getElementById('confirmDelete').addEventListener('click', function() {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
        modal.hide();
        
        // Execute the callback function for the specific delete operation
        deleteCallback();
    });
    
    // Cleanup
    document.getElementById('deleteConfirmModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}


// ==========================================
// *** DASHBOARD FUNCTIONS ***
// ==========================================

// Welcome message for dashboard
function updateWelcomeMessage() {
    let welcomeContainer = document.querySelector('.welcome-message');
    if (!welcomeContainer || !userData) return;
    
    let username = userData.info.firstname;
    
    welcomeContainer.innerHTML = `
        <h3>Hey ${username}, your edge is sharp today!</h3>
    `;
}

// *** PROGRESS LOGIC *** //
// Prepare and print percentages of each category tasks to update the life sync chart
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


    // Clear existing icons
    document.querySelectorAll('.pie-icon').forEach(el => el.remove());

    // Add icon to center of each slice
    let currentAngle = 0;
    userData.lifeGoalCategories.forEach((category) => {
        let categoryCount = totalCategoryTasks[category.name];
        let categoryPercentage = (categoryCount / totalTasks) * 100;
        let sliceAngle = (categoryPercentage / 100) * 360;

        // Find middle of this slice
        let middleAngle = currentAngle + (sliceAngle / 2);

        // Convert to position (adjust distance from center near to the border)
        let radians = (middleAngle - 90) * (Math.PI / 180);
        let x = Math.cos(radians) * 120;
        let y = Math.sin(radians) * 120;

        // Create icon element
        let icon = document.createElement('i');
        icon.className = `fa-solid fa-${category.icon} pie-icon`;
        icon.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px));
            font-size: 2rem;
            color: #1d0221;
            pointer-events: none;
        `;

        document.querySelector('.pie-chart').appendChild(icon);
        currentAngle += sliceAngle;
    });
}

// Print date and reuse for dynamic tasks
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

    // convert Date objects back to display format only for UI
    let startDay = String(weekStart.getDate()).padStart(2, '0');
    let endDay = String(weekEnd.getDate()).padStart(2, '0');
    let weekRange = `${startDay}.-${endDay}.${month}`;

    // inject in dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        document.getElementById('today-date').innerHTML = `Today, ${todayFormat}`;
        document.getElementById('actual-week').innerHTML = `Week ${weekNumber}, ${weekRange}`;
        //calls the function here to recycle date arguments 
        updateProgressBars(weekStart, weekEnd);
    }
}

// Update progress bars
function updateProgressBars(weekStart, weekEnd) {
    let today = formatDate(new Date());

    // counters 
    let todayTotal = 0;
    let todayDone = 0;
    let weekTotal = 0;
    let weekDone = 0;

    // counts tasks for today and week
    userData.tasks.forEach(task => {
        // Today comparison (string is fine for exact match)
        if (task.toDoDate === today) {
            todayTotal++;
            if (task.done) todayDone++;
        }

        // Week comparison: Convert task date to Date object for reliable comparison
        let taskDate = parseDate(task.toDoDate); // Convert "dd.mm.yyyy" to Date object
        if (taskDate >= weekStart && taskDate <= weekEnd) {
            weekTotal++;
            if (task.done) weekDone++;
        }
    });

    // Update progress bars (unchanged)
    let todayProgress = document.getElementById('today-progress');
    let weekProgress = document.getElementById('week-progress');

    if (todayProgress) {
        todayProgress.max = todayTotal;
        todayProgress.value = todayDone;
    }

    if (weekProgress) {
        weekProgress.max = weekTotal;
        weekProgress.value = weekDone;
    }

    console.log(`Today's Progress: ${todayDone}/${todayTotal}`);
    console.log(`Week's Progress: ${weekDone}/${weekTotal}`);

}

// Update for icons and percentages on week-box
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
        // convert task date to Date object for comparison
        let taskDate = parseDate(task.toDoDate);
        
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
        let categoryIcon = category.icon;
        let percentage = totalWeekTasks > 0 ? Math.round((categoryCount / totalWeekTasks) * 100) : 0;

        displayHTML += `
            <li title="${category.name}: ${categoryCount} tasks (${percentage}%)">
                <i style="color: ${category.color};" class="fa-solid fa-${categoryIcon}"></i><br>
                <span>${percentage}%</span>
            </li>
        `;
    });

    weeklyDisplay.innerHTML = displayHTML;
}


// ==========================================
// *** TASK MANAGEMENT ***
// ==========================================

// Update tasks list
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
        if (taskDateObj >= weekStart && taskDateObj <= weekEnd) categories.week.tasks.push(task); // Now uses Date objects
        if (taskDateObj > weekEnd) categories.after.tasks.push(task);
        if (task.done) categories.done.tasks.push(task);
        if (deadlineDateObj && deadlineDateObj < today) categories.expired.tasks.push(task);
    });

    // updates task list in dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        let todayTaskList = document.getElementById("today-task-list");
        todayTaskList.innerHTML = "";
        categories.today.tasks.forEach(task => {
            let taskIndex = userData.tasks.findIndex(t => t === task);
            let categoryColor = getCategoryColor(task.category);
            let todayTaskHTML = `
                <li class="task-row" style="color: ${categoryColor};">
                    <input type="checkbox" class="task-checkbox" data-task-index="${taskIndex}" ${task.done ? "checked" : ""}>
                    <span class="task-title">${task.title}</span>
                </li>
            `;
            todayTaskList.innerHTML += todayTaskHTML;
        });
    }

    // updates task list in task displays
    if (window.location.pathname.includes('tasks.html')) {
        let taskContainer = document.getElementById('tasksAccordion');
        taskContainer.innerHTML = ""; 

        Object.keys(categories).forEach((key, index) => {
            let section = categories[key];
            let tasksHTML = section.tasks.map(task => {
                let taskIndex = userData.tasks.findIndex(t => t === task);
                let categoryColor = getCategoryColor(task.category);
                return `
                    <div class="task-row justify-content-between">
                        <div>
                            <input type="checkbox" class="task-checkbox" data-task-index="${taskIndex}" ${task.done ? "checked" : ""}>
                            <span style="color: ${categoryColor};" class="task-title">${task.title}</span>
                        </div>
                        <div class="task-dates-actions text-end">
                            <span class="task-dates">To Do: ${task.toDoDate} | Deadline: ${task.deadline || "No Deadline"}</span>
                            <button class="edit-task-btn custom-button my-button-light-bg my-button-icon" data-task-index="${taskIndex}"><i class="fa-solid fa-pencil"></i></button>
                            <button class="delete-task-btn custom-button my-button-light-bg my-button-icon" data-task-index="${taskIndex}"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                    `;
            }).join("");

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
        })
    }
}

// Add a new task
function registerTaskFormListener() {
    let taskForm = document.querySelector('#add-task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', function (e) {
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

// Update and delete functions for tasks
function initializeTaskUpdateAndDelete() {
    document.addEventListener('click', function (e) {
        let taskIndex;

        // Update - Checkbox toggle
        if (e.target.classList.contains('task-checkbox')) {
            e.preventDefault();
            taskIndex = parseInt(e.target.getAttribute('data-task-index'));
            userData.tasks[taskIndex].done = !userData.tasks[taskIndex].done;
            e.target.checked = userData.tasks[taskIndex].done;
            saveToLocalStorage();
            refreshTasksAfterCRUD();
            let status = userData.tasks[taskIndex].done ? 'completed' : 'marked as pending';
            showFeedbackModal('success', 'TASK UPDATED!', `Task ${status}`);
        }

        // Update - Edit task
        if (e.target.closest('.edit-task-btn')) {
            e.preventDefault();
            taskIndex = parseInt(e.target.closest('.edit-task-btn').getAttribute('data-task-index'));
            openTaskEditModal(taskIndex);
        }

        // Delete task
        if (e.target.closest('.delete-task-btn')) {
            e.preventDefault();
            taskIndex = parseInt(e.target.closest('.delete-task-btn').getAttribute('data-task-index'));
            let taskTitle = userData.tasks[taskIndex].title;
                
            openDeleteConfirmModal('Task', taskIndex, taskTitle, function() {
                userData.tasks.splice(taskIndex, 1);
                saveToLocalStorage();
                refreshTasksAfterCRUD();
                showFeedbackModal('success', 'TASK DELETED!', `${taskTitle} has been removed`);
            });
        }
    })
}

// Refresh tasks for progress and percentage calculations
function refreshTasksAfterCRUD() {
    updateTaskList();
    if (window.location.pathname.includes('dashboard.html')) {
        updateChart(); // Update life sync chart

        let today = new Date();
        let { weekStart, weekEnd } = getCurrentWeekRange(today);

        updateProgressBars(weekStart, weekEnd); // Update progress bars
        updateWeeklyPercentageDisplay(); // Update week box
    }
}


// ==========================================
// *** MILESTONE MANAGEMENT ***
// ==========================================

// Update milestones 
function updateMilestoneList() {
    let categories = {};

    // Initialize categories based on lifeGoalCategories
    userData.lifeGoalCategories.forEach(category => {
        categories[category.name] = {
            title: category.name,
            color: category.color,
            icon: category.icon,
            milestones: []
        };
    });

    // Sort milestones into their respective categories
    userData.milestones.forEach(milestone => {
        if (categories[milestone.category]) {
            categories[milestone.category].milestones.push(milestone);
        }
    });

    // Sort milestones within each category by due date (chronological order)
    Object.keys(categories).forEach(categoryName => {
        categories[categoryName].milestones.sort((a, b) => parseDate(a.due) - parseDate(b.due));
    });

    // Update dashboard milestones section
    if (window.location.pathname.includes('dashboard.html')) {
        let nextDueMilestones = document.getElementById("next-due-milestones");
        nextDueMilestones.innerHTML = "";
        // Get next 4-5 upcoming milestones sorted by due date across all categories
        let allMilestones = userData.milestones
            .filter(m => !m.done)
            .sort((a, b) => parseDate(a.due) - parseDate(b.due))
            .slice(0, 5);
        
        //loop for all the next due milestones
        allMilestones.forEach(milestone => {
            let category = userData.lifeGoalCategories.find(cat => cat.name === milestone.category);
            let categoryIcon = category ? category.icon : 'circle';
            let categoryColor = category ? category.color : '';
            let nextDueMilestoneHTML = `
                <div style="background-color: ${categoryColor};" class="due-milestone">
                    <i class="fs-1 fa-solid fa-${categoryIcon}"></i>
                    <p class="small">${milestone.title}</p>
                </div>            
            `;
            nextDueMilestones.innerHTML += nextDueMilestoneHTML;
        });
    }

    // Update milestones page
    if (window.location.pathname.includes('milestones.html')) { 
        let milestonesContainer = document.getElementById('milestonesAccordion');
        milestonesContainer.innerHTML = "";

        // Loop through each category
        Object.keys(categories).forEach((categoryName, index) => {
            let category = categories[categoryName];

            // Generate milestones HTML for this category
            let milestonesHTML = category.milestones.map(milestone => {
                let milestoneIndex = userData.milestones.findIndex(m => m === milestone);
                return `
                    <div class="task-row justify-content-between">
                        <div>
                            <input type="checkbox" class="milestone-checkbox" data-milestone-index="${milestoneIndex}" ${milestone.done ? "checked" : ""}>
                            <span class="task-title" style="color: ${category.color};">${milestone.title}</span>
                        </div>
                        <div class="task-dates-actions text-end">
                            <span class="task-dates">Due: ${milestone.due}</span>
                            <button class="edit-milestone-btn custom-button my-button-light-bg my-button-icon" data-milestone-index="${milestoneIndex}">
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                            <button class="delete-milestone-btn custom-button my-button-light-bg my-button-icon" data-milestone-index="${milestoneIndex}">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join("");

            // Create accordion section for this category
            let accordionHTML = `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button dark-mode" type="button" data-bs-toggle="collapse" 
                            data-bs-target="#milestone${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" 
                            aria-controls="milestone${index}" style="color: ${category.color};">
                            <i class="fa-solid fa-${category.icon}" style="margin-right: 10px;"></i>
                            ${category.title}
                        </button>
                    </h2>
                    <div id="milestone${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">
                        <div class="accordion-body">
                            ${milestonesHTML || "<p class='text-muted'>No milestones</p>"}
                        </div>
                    </div>
                </div>
            `;
            milestonesContainer.innerHTML += accordionHTML;
        });
    }
}

// Add a new milestone
function registerMilestoneFormListener() {
    let milestoneForm = document.querySelector('#add-milestone-form');
    if (milestoneForm) {
        milestoneForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let title = document.querySelector('#milestone-title').value.trim();
            title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
            let category = document.querySelector('#milestone-category').value;
            let due = document.querySelector('#milestone-due').value.split('-');
            due = `${due[2]}.${due[1]}.${due[0]}`;
            
            let newMilestone = {
                title: title,
                category: category,
                due: due,
                done: false
            };

            // Clear focus and close modal
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
            milestoneForm.closest('.modal').querySelector('.btn-close').click();
            milestoneForm.reset();

            setTimeout(() => {
                if (!userData.milestones) {
                    userData.milestones = [];
                }
                userData.milestones.push(newMilestone);
                saveToLocalStorage();
                updateMilestoneList(); // Refresh the display
                showFeedbackModal('success', 'MILESTONE ADDED!', `${title} has been added successfully`);
            }, 0);
        });
    }
}

// Update and delete functions for milestones
function initializeMilestoneUpdateAndDelete() {
    document.addEventListener('click', function (e) {
        let milestoneIndex;

        // Update - Checkbox toggle
        if (e.target.classList.contains('milestone-checkbox')) {
            e.preventDefault();
            milestoneIndex = parseInt(e.target.getAttribute('data-milestone-index'));
            userData.milestones[milestoneIndex].done = !userData.milestones[milestoneIndex].done;
            e.target.checked = userData.milestones[milestoneIndex].done;
            saveToLocalStorage();
            updateMilestoneList();
            let status = userData.milestones[milestoneIndex].done ? 'completed' : 'marked as pending';
            showFeedbackModal('success', 'MILESTONE UPDATED!', `Milestone ${status}`);
        }

        // Update - Edit milestone
        if (e.target.closest('.edit-milestone-btn')) {
            e.preventDefault();
            milestoneIndex = parseInt(e.target.closest('.edit-milestone-btn').getAttribute('data-milestone-index'));
            openMilestoneEditModal(milestoneIndex);
        }

        // Delete milestone
        if (e.target.closest('.delete-milestone-btn')) {
            e.preventDefault();
            milestoneIndex = parseInt(e.target.closest('.delete-milestone-btn').getAttribute('data-milestone-index'));
            let milestoneTitle = userData.milestones[milestoneIndex].title;
                
            openDeleteConfirmModal('Milestone', milestoneIndex, milestoneTitle, function() {
                userData.milestones.splice(milestoneIndex, 1);
                saveToLocalStorage();
                updateMilestoneList();
                showFeedbackModal('success', 'MILESTONE DELETED!', `${milestoneTitle} has been removed`);
            });
        }
    })
}
 

// ==========================================
// *** PROFILE MANAGEMENT ***
// ==========================================

function profileDisplay() {
    if (!window.location.pathname.includes('profile.html')) return;
    
    // Update motivation message
    let motivationSection = document.querySelector('.profile-motivation');
    if (motivationSection && userData.info) {
        let username = userData.info.username || userData.info.firstname;
        motivationSection.innerHTML = `<h2>${username},</h2><h3>the conquerer!</h3>`;
    }

    // Update the profile display spans 
    document.getElementById('username-display').textContent = userData.info.username;
    document.getElementById('firstname-display').textContent = userData.info.firstname;
    document.getElementById('lastname-display').textContent = userData.info.lastname;
    document.getElementById('email-display').textContent = userData.info.email;
    document.getElementById('birthdate-display').textContent = userData.info.dateOfBirth;
}



// ==========================================
// *** PAGE INITIALIZATION ***
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // Determine which page is loaded
    const currentPage = window.location.pathname.split('/').pop();
    console.log('initializing page', currentPage)
    // Load saved data and check for authenticatio
    if (currentPage === 'login.html') {
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
        if (!isLoggedIn) {
            console.log('Not authenticaded, redirecting to login');
            window.location.href = 'login.html';
            return;
        }
        console.log('User data loaded for authenticated page:', currentPage);
    }
    // Run page-specific initialization in the correct order
    if (currentPage === 'dashboard.html') {
        // Functions needed on the dashboard
        updateWelcomeMessage();
        updateDateInfo();
        updateChart();
        updateWeeklyPercentageDisplay();
        updateTaskList();
        updateMilestoneList()
    } else if (currentPage === 'tasks.html') {
        updateTaskList();
    } else if (currentPage === 'milestones.html') {
        updateMilestoneList();
    } else if (currentPage === 'profile.html') {
        updateProfileDisplay();
    }

    // Add logout functionality to all authenticated pages
    if (currentPage === 'dashboard.html' || currentPage === 'tasks.html' || currentPage === 'profile.html' || currentPage === 'milestones.html') {
        document.querySelectorAll('a[href="index.html"][title="Logout"]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                logout();
            });
        });
    }

    // NEW TASK FORM EVENT LISTENER ONCE PER PAGE LOAD!
    if (currentPage === 'dashboard.html' || currentPage === 'tasks.html' || currentPage === 'milestones.html' ) {
        registerTaskFormListener();
        initializeTaskUpdateAndDelete();
        registerMilestoneFormListener();
        initializeMilestoneUpdateAndDelete();
    }

})


