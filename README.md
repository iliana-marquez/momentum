# Momentum 

Momentum is a life-tracking web app that helps you stay present while building your future. It prevents overwhelm by syncing your life areas into one clear dashboard, where task management, progress bars, and the Life Sync Chart make balance visual and intuitive — guiding steady, meaningful progress toward your full potential.

![Image 1](assets/images/momentum-presentation.png)
**[Try it out!](https://iliana-marquez.github.io/momentum/)**

---
## Table of Contents

- [User Experience (UX)](#user-experience-ux)
  - [User Stories](#user-stories)
  - [Design](#design)
- [Features](#features)
  - [Existing Features](#existing-features)
  - [Features Left to Implement](#features-left-to-implement)
- [Technologies Used](#technologies-used)
  - [Languages](#languages)
  - [Frameworks, Libraries & Tools](#frameworks-libraries--tools)

---
## User Experience (UX)

### Current User Story Goals

As User, I want:
- To easily understand the main purpose of the site and learn how it can help me balance different areas of my life.
- To quickly log in and see my current progress across all life areas through the dashboard's Life Sync pie chart and progress bars.
- To add, edit, complete or delete tasks efficiently while seeing immediate visual feedback through dynamic modals.
- To add, edit, complete or delete milestones efficiently while seeing immediate visual feedback.
- To see my tasks automatically categorized (Today, This Week, Overdue, Done, Expired) and my milestones organized by life goal categories.
- To see real-time updates to the Life Sync chart and progress percentages as I complete tasks.
- To visualize my next due milestones prominently on the dashboard so I stay focused on important deadlines and prevent "out of sight, out of mind" forgetting.
- My data to persist during my browser session so I don't lose updates while navigating between pages.

### Design

#### Colour Scheme
- The primary colors are dark purple (#1d0221) and light grey (#f2f2f2) creating a calmed, focused atmosphere
- Accent colors include highlight purple (#590b5a) and light highlight (#b1b1b1)
![Image 2](assets/images/design-elements.png)

- Category-specific colors: Coding (#f89e37), Health (#cb0e16), Relationships (#900c5e), Work (#bdbdbd), Finances (#92bf1c)
![Image 2](assets/images/life-category-goal-colors.png)

#### Typography
- Montserrat is used for headings, providing a clean, professional look
- Poppins is used for content text, ensuring excellent readability
- Both fonts include fallbacks to ensure cross-platform compatibility

#### Wireframes
Created using Canva during the design planning phase (desktop and mobile versions):
- Landing Page Wireframe - With Hero, About, Contact and Q&A sections
- Login Page Wireframe - Form to log in
- Dashboard Page Wireframe - Focused on pie chart visualization and progress tracking
- Tasks Page Wireframe - Emphasizing CRUD operations and categorization
- Milestones Page Wireframe - Emphasizing CRUD operations and categorization
- Profile Page Wireframe - Emphasizing on User Profile Info display

#### Imagery
- Clean, minimalist design with images form Canva and category-specific icons from FontAwesome
- Visual progress charts including a "Life Sync" pie chart showing category balance
- Consistent color-coding throughout the interface for immediate category recognition

---
## Features

### Existing Features

- **Authentication System:** Login/logout with session persistence
- **Dashboard - Life Sync Chart:** Interactive pie chart automatically syncing with all tasks to show overall balance across 5 life categories
- **Dashboard- Progress Visualization:** Today and weekly progress bars with percentage tracking
- **Dashboard - Week Category Balance:** Real-time percentage distribution showing completed vs incomplete tasks for each category during the current week
- **Dashboard- Next Due Milestones:** Visual section showing upcoming milestone deadlines to maintain focus and prevent oversight
- **Dashboard - Balance Monitoring:** Analytics enabling users to identify when one life area gains disproportionate weight while others diminish
- **Task and Milestone Management:** Complete CRUD operations (Create, Read, Update, Delete) for tasks
- **Milestone Tracking:** Full milestone management with due date tracking
- **Data Persistence:** All user data saved to localStorage for session continuity
- **Responsive Design:** Mobile-first approach working across all device sizes
- **Profile Management:** Username information editing, profile information and life category display
- **Smart Categorization:** Automatic task sorting into Today, This Week, Overdue, Done, Expired - **Interactive Feedback:** Dynamic modals for user actions with immediate confirmation

### Features Left to Implement

- Daily check-up questionnaire for reflection and motivation
- Advanced analytics and progress history tracking
- Social features for sharing progress with accountability partners
- Integration with external calendars, management tools and fitness trackers
- AI-powered goal recommendations and coaching insights
- True cross-session data persistence ("build momentum over time")
- Historical progress tracking showing improvement patterns over weeks/months
- User profile customization and personalized life goal categories

---

## Technologies Used

### Languages:
- HTML, CSS, JavaScript

### Frameworks, Libraries & Tools:
- Bootstrap: responsive layout, modal components, and form styling.
- Font Awesome: icons for life categories, navigation, and user interface elements
- Google Font: typography.
- Canva: design, wireframes, images, icons.
- Github: version control.
- VSCode: code editing.

---

## Testing

- **User Flow:** Login with “iliana.marquez@mail.com” / “MyPassword123”—only Dashboard link—tasks syncs live.
- **Features:** Add task—list updates—Chart recalculates %—Progress bars show today/week—responsive on mobile/tablet.
- **Fixed Bugs:** Consistent live calculations—percentages sync across Dashboard sections.
- **Validation:** Pending—HTML/CSS checks in progress (time crunch).

### Known Bugs
1. Dashboard boxes wrap oddly on very large screens—needs aesthetic fix.
2. Delete/update tasks—missing—CRUD incomplete.
3. Static register, milestones, profile—hardcoded, not dynamic—daily checkup placeholder only.
4. Responsiveness—larger devices lag—mobile/tablet-first design.

### Further Improvements
- Add delete/update—full task control.
- Dynamic register—new users join.
- Milestones/profile—track big goals, personalize.
- Daily checkup—intuitive questions for focus.
- Polish large-screen layout—full responsiveness.

---

## Deployment

Deployed via GitHub Pages:
1. Pushed to `iliana-marquez/momentum` repo.
2. Enabled Pages in settings—main branch.
3. Live at `https://iliana-marquez.github.io/momentum/`.

---

## Credits

- **Bootstrap:** Wireframes, images and icons.
- **Canva:** Layout, modal framework.
- **Font Awesome:** Icons.
- **Code Institute:** README inspiration.

---
