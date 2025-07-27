// App State
const state = {
    password: '1234', // Default password
    enteredPassword: '',
    notes: [],
    tasks: [],
    events: [],
    links: [],
    currentSection: 'dashboard',
    currentDate: new Date(),
    aiMessages: [
        {
            sender: 'ai',
            content: 'Hello! I\'m your Nexus AI Assistant. How can I help you be more productive today?'
        }
    ]
};

// DOM Elements
const elements = {
    lockScreen: document.getElementById('lock-screen'),
    appContainer: document.getElementById('app-container'),
    passwordDots: document.getElementById('password-dots'),
    numberButtons: document.querySelectorAll('.number-btn'),
    backspaceButton: document.getElementById('backspace-btn'),
    unlockButton: document.getElementById('unlock-btn'),
    lockButton: document.getElementById('lock-btn'),
    mobileMenuButton: document.getElementById('mobile-menu-btn'),
    navLinks: document.querySelectorAll('.nav-link'),
    sectionContents: document.querySelectorAll('.section-content'),
    
    // Dashboard
    notesCount: document.getElementById('notes-count'),
    tasksCount: document.getElementById('tasks-count'),
    eventsCount: document.getElementById('events-count'),
    linksCount: document.getElementById('links-count'),
    recentNotes: document.getElementById('recent-notes'),
    upcomingTasks: document.getElementById('upcoming-tasks'),
    
    // Notes
    searchNotes: document.getElementById('search-notes'),
    addNoteButton: document.getElementById('add-note-btn'),
    addNewNoteButton: document.getElementById('add-new-note-btn'),
    createFirstNote: document.getElementById('create-first-note'),
    notesGrid: document.getElementById('notes-grid'),
    
    // Tasks
    todayDate: document.getElementById('today-date'),
    taskFilterButtons: document.querySelectorAll('.task-filter-btn'),
    addTaskButton: document.getElementById('add-task-btn'),
    addNewTaskButton: document.getElementById('add-new-task-btn'),
    createFirstTask: document.getElementById('create-first-task'),
    tasksList: document.getElementById('tasks-list'),
    
    // Calendar
    prevMonthButton: document.getElementById('prev-month'),
    nextMonthButton: document.getElementById('next-month'),
    todayButton: document.getElementById('today-btn'),
    currentMonth: document.getElementById('current-month'),
    calendarGrid: document.getElementById('calendar-grid'),
    upcomingEvents: document.getElementById('upcoming-events'),
    createFirstEvent: document.getElementById('create-first-event'),
    
    // Links
    searchLinks: document.getElementById('search-links'),
    linkFilterButtons: document.querySelectorAll('.link-filter-btn'),
    addNewLinkButton: document.getElementById('add-new-link-btn'),
    createFirstLink: document.getElementById('create-first-link'),
    linksList: document.getElementById('links-list'),
    
    // AI
    aiMessageInput: document.getElementById('ai-message-input'),
    sendAiMessage: document.getElementById('send-ai-message'),
    chatMessages: document.getElementById('chat-messages'),
    aiQuickQuestions: document.querySelectorAll('.ai-quick-question'),
    aiToolButtons: document.querySelectorAll('.ai-tool-btn'),
    
    // Modals
    modals: document.querySelectorAll('[id$="-modal"]'),
    closeModalButtons: document.querySelectorAll('.close-modal'),
    
    // Note Modal
    noteModal: document.getElementById('note-modal'),
    noteModalTitle: document.getElementById('note-modal-title'),
    noteTitle: document.getElementById('note-title'),
    noteContent: document.getElementById('note-content'),
    cancelNote: document.querySelector('.cancel-note'),
    saveNote: document.querySelector('.save-note'),
    
    // Task Modal
    taskModal: document.getElementById('task-modal'),
    taskModalTitle: document.getElementById('task-modal-title'),
    taskTitle: document.getElementById('task-title'),
    taskDueDate: document.getElementById('task-due-date'),
    taskPriority: document.getElementById('task-priority'),
    taskDescription: document.getElementById('task-description'),
    cancelTask: document.querySelector('.cancel-task'),
    saveTask: document.querySelector('.save-task'),
    
    // Event Modal
    eventModal: document.getElementById('event-modal'),
    eventModalTitle: document.getElementById('event-modal-title'),
    eventTitle: document.getElementById('event-title'),
    eventStart: document.getElementById('event-start'),
    eventEnd: document.getElementById('event-end'),
    eventDescription: document.getElementById('event-description'),
    eventColorOptions: document.querySelectorAll('.event-color-option'),
    cancelEvent: document.querySelector('.cancel-event'),
    saveEvent: document.querySelector('.save-event'),
    
    // Link Modal
    linkModal: document.getElementById('link-modal'),
    linkModalTitle: document.getElementById('link-modal-title'),
    linkTitle: document.getElementById('link-title'),
    linkUrl: document.getElementById('link-url'),
    linkCategory: document.getElementById('link-category'),
    linkNotes: document.getElementById('link-notes'),
    cancelLink: document.querySelector('.cancel-link'),
    saveLink: document.querySelector('.save-link')
};

// Initialize the app
function init() {
    // Set up event listeners
    setupEventListeners();
    
    // Load mock data (in a real app, this would come from a database)
    loadMockData();
    
    // Update the UI with the current state
    updateUI();
    
    // Render password dots
    renderPasswordDots();
    
    // Set today's date in tasks section
    const today = new Date();
    elements.todayDate.textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    // Render calendar
    renderCalendar();
}

// Set up event listeners
function setupEventListeners() {
    // Password lock screen
    elements.numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (state.enteredPassword.length < 6) {
                state.enteredPassword += button.dataset.number;
                renderPasswordDots();
            }
        });
    });
    
    elements.backspaceButton.addEventListener('click', () => {
        state.enteredPassword = state.enteredPassword.slice(0, -1);
        renderPasswordDots();
    });
    
    elements.unlockButton.addEventListener('click', unlockApp);
    
    // App navigation
    elements.lockButton.addEventListener('click', lockApp);
    elements.mobileMenuButton.addEventListener('click', toggleMobileMenu);
    
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.section);
        });
    });
    
    // Dashboard buttons
    elements.addNoteButton.addEventListener('click', () => openModal('note'));
    elements.addTaskButton.addEventListener('click', () => openModal('task'));
    
    // Notes section
    elements.addNewNoteButton.addEventListener('click', () => openModal('note'));
    elements.createFirstNote.addEventListener('click', () => openModal('note'));
    elements.searchNotes.addEventListener('input', filterNotes);
    
    // Tasks section
    elements.addNewTaskButton.addEventListener('click', () => openModal('task'));
    elements.createFirstTask.addEventListener('click', () => openModal('task'));
    elements.taskFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.taskFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterTasks(button.dataset.filter);
        });
    });
    
    // Calendar section
    elements.prevMonthButton.addEventListener('click', () => {
        state.currentDate.setMonth(state.currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    elements.nextMonthButton.addEventListener('click', () => {
        state.currentDate.setMonth(state.currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    elements.todayButton.addEventListener('click', () => {
        state.currentDate = new Date();
        renderCalendar();
    });
    
    elements.createFirstEvent.addEventListener('click', () => openModal('event'));
    
    // Links section
    elements.addNewLinkButton.addEventListener('click', () => openModal('link'));
    elements.createFirstLink.addEventListener('click', () => openModal('link'));
    elements.searchLinks.addEventListener('input', filterLinks);
    elements.linkFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.linkFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterLinksByCategory(button.dataset.filter);
        });
    });
    
    // AI section
    elements.sendAiMessage.addEventListener('click', sendAiMessage);
    elements.aiMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendAiMessage();
        }
    });
    
    elements.aiQuickQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const text = question.textContent;
            elements.aiMessageInput.value = text;
            sendAiMessage();
        });
    });
    
    elements.aiToolButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tool = button.querySelector('span').textContent;
            elements.aiMessageInput.value = `Please help me with: ${tool}`;
            sendAiMessage();
        });
    });
    
    // Modal handling
    elements.closeModalButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Note modal
    elements.cancelNote.addEventListener('click', closeAllModals);
    elements.saveNote.addEventListener('click', saveNote);
    
    // Task modal
    elements.cancelTask.addEventListener('click', closeAllModals);
    elements.saveTask.addEventListener('click', saveTask);
    
    // Event modal
    elements.cancelEvent.addEventListener('click', closeAllModals);
    elements.saveEvent.addEventListener('click', saveEvent);
    
    // Link modal
    elements.cancelLink.addEventListener('click', closeAllModals);
    elements.saveLink.addEventListener('click', saveLink);
    
    // Event color selection
    elements.eventColorOptions.forEach(option => {
        option.addEventListener('click', () => {
            elements.eventColorOptions.forEach(opt => {
                opt.classList.remove('border-accent');
                opt.classList.add('border-transparent');
            });
            option.classList.remove('border-transparent');
            option.classList.add('border-accent');
        });
    });
}

// Load mock data
function loadMockData() {
    // Sample notes
    state.notes = [
        {
            id: 1,
            title: 'Meeting Notes',
            content: 'Discussed project timeline and deliverables. Need to follow up with design team.',
            createdAt: new Date(2023, 5, 10),
            pinned: true
        },
        {
            id: 2,
            title: 'Shopping List',
            content: 'Milk, eggs, bread, fruits, vegetables, coffee',
            createdAt: new Date(2023, 5, 12),
            pinned: false
        },
        {
            id: 3,
            title: 'Book Recommendations',
            content: 'Atomic Habits, Deep Work, The Psychology of Money',
            createdAt: new Date(2023, 5, 15),
            pinned: false
        }
    ];
    
    // Sample tasks
    state.tasks = [
        {
            id: 1,
            title: 'Finish project proposal',
            dueDate: '2023-06-20',
            priority: 'high',
            description: 'Complete the draft and send for review',
            completed: false
        },
        {
            id: 2,
            title: 'Call mom',
            dueDate: '2023-06-18',
            priority: 'medium',
            description: 'Wish her happy birthday',
            completed: false
        },
        {
            id: 3,
            title: 'Gym session',
            dueDate: '2023-06-17',
            priority: 'low',
            description: 'Leg day workout',
            completed: true
        }
    ];
    
    // Sample events
    state.events = [
        {
            id: 1,
            title: 'Team Meeting',
            start: '2023-06-20T10:00',
            end: '2023-06-20T11:00',
            description: 'Weekly team sync',
            color: 'accent'
        },
        {
            id: 2,
            title: 'Dentist Appointment',
            start: '2023-06-22T14:00',
            end: '2023-06-22T15:00',
            description: 'Regular checkup',
            color: 'blue'
        },
        {
            id: 3,
            title: 'Dinner with Friends',
            start: '2023-06-25T19:00',
            end: '2023-06-25T22:00',
            description: 'At Italian restaurant',
            color: 'purple'
        }
    ];
    
    // Sample links
    state.links = [
        {
            id: 1,
            title: 'Tailwind CSS Docs',
            url: 'https://tailwindcss.com/docs',
            category: 'work',
            notes: 'CSS framework documentation'
        },
        {
            id: 2,
            title: 'Favorite Recipes',
            url: 'https://example.com/recipes',
            category: 'personal',
            notes: 'Collection of go-to recipes'
        },
        {
            id: 3,
            title: 'JavaScript Tutorials',
            url: 'https://example.com/js-tutorials',
            category: 'learning',
            notes: 'Advanced JS concepts'
        }
    ];
}

// Update UI based on current state
function updateUI() {
    // Update counts
    elements.notesCount.textContent = state.notes.length;
    elements.tasksCount.textContent = state.tasks.filter(task => !task.completed).length;
    elements.eventsCount.textContent = state.events.length;
    elements.linksCount.textContent = state.links.length;
    
    // Render recent notes
    renderRecentNotes();
    
    // Render upcoming tasks
    renderUpcomingTasks();
    
    // Render notes grid
    renderNotesGrid();
    
    // Render tasks list
    renderTasksList();
    
    // Render upcoming events
    renderUpcomingEvents();
    
    // Render links list
    renderLinksList();
    
    // Render AI chat
    renderAiChat();
}

// Password lock functions
function renderPasswordDots() {
    elements.passwordDots.innerHTML = '';
    const dotCount = state.enteredPassword.length;
    
    for (let i = 0; i < 4; i++) {
        const dot = document.createElement('div');
        dot.className = `password-dot ${i < dotCount ? 'opacity-100' : 'opacity-20'}`;
        elements.passwordDots.appendChild(dot);
    }
}

function unlockApp() {
    if (state.enteredPassword === state.password) {
        elements.lockScreen.classList.add('hidden');
        elements.appContainer.classList.remove('hidden');
        state.enteredPassword = '';
        renderPasswordDots();
    } else {
        alert('Incorrect password. Try again.');
        state.enteredPassword = '';
        renderPasswordDots();
    }
}

function lockApp() {
    elements.lockScreen.classList.remove('hidden');
    elements.appContainer.classList.add('hidden');
    state.enteredPassword = '';
    renderPasswordDots();
}

// Navigation functions
function toggleMobileMenu() {
    const sidebar = document.querySelector('.fixed.left-0');
    sidebar.classList.toggle('-translate-x-full');
}

function navigateTo(section) {
    // Hide all sections
    elements.sectionContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show the selected section
    document.getElementById(section).classList.remove('hidden');
    
    // Update active nav link
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu if open
    const sidebar = document.querySelector('.fixed.left-0');
    sidebar.classList.remove('-translate-x-full');
    
    // Update current section
    state.currentSection = section;
    
    // Special rendering for certain sections
    if (section === 'calendar') {
        renderCalendar();
    }
}

// Modal functions
function openModal(type) {
    closeAllModals();
    
    switch (type) {
        case 'note':
            elements.noteModalTitle.textContent = 'New Note';
            elements.noteTitle.value = '';
            elements.noteContent.value = '';
            elements.noteModal.classList.remove('hidden');
            break;
        case 'task':
            elements.taskModalTitle.textContent = 'New Task';
            elements.taskTitle.value = '';
            elements.taskDueDate.value = '';
            elements.taskPriority.value = 'medium';
            elements.taskDescription.value = '';
            elements.taskModal.classList.remove('hidden');
            
            // Set default due date to today
            const today = new Date().toISOString().split('T')[0];
            elements.taskDueDate.value = today;
            break;
        case 'event':
            elements.eventModalTitle.textContent = 'New Event';
            elements.eventTitle.value = '';
            
            // Set default start to now, end to +1 hour
            const now = new Date();
            const endTime = new Date(now.getTime() + 60 * 60 * 1000);
            
            // Format for datetime-local input
            const formatDateTime = (date) => {
                return date.toISOString().slice(0, 16);
            };
            
            elements.eventStart.value = formatDateTime(now);
            elements.eventEnd.value = formatDateTime(endTime);
            
            elements.eventDescription.value = '';
            
            // Reset color selection
            elements.eventColorOptions.forEach(opt => {
                opt.classList.remove('border-accent');
                opt.classList.add('border-transparent');
            });
            elements.eventColorOptions[0].classList.remove('border-transparent');
            elements.eventColorOptions[0].classList.add('border-accent');
            
            elements.eventModal.classList.remove('hidden');
            break;
        case 'link':
            elements.linkModalTitle.textContent = 'New Link';
            elements.linkTitle.value = '';
            elements.linkUrl.value = '';
            elements.linkCategory.value = 'work';
            elements.linkNotes.value = '';
            elements.linkModal.classList.remove('hidden');
            break;
    }
}

function closeAllModals() {
    elements.modals.forEach(modal => {
        modal.classList.add('hidden');
    });
}

// Utility functions
function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'high': return 'priority-high';
        case 'medium': return 'priority-medium';
        case 'low': return 'priority-low';
        default: return 'priority-medium';
    }
}

// Note functions
function saveNote() {
    const title = elements.noteTitle.value.trim();
    const content = elements.noteContent.value.trim();
    
    if (!title) {
        alert('Please enter a title for your note');
        return;
    }
    
    const newNote = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date(),
        pinned: document.querySelector('.custom-checkbox').checked
    };
    
    state.notes.unshift(newNote);
    updateUI();
    closeAllModals();
}

function renderRecentNotes() {
    elements.recentNotes.innerHTML = '';
    
    const pinnedNotes = state.notes.filter(note => note.pinned);
    const recentNotes = state.notes.filter(note => !note.pinned).slice(0, 3);
    
    if (pinnedNotes.length === 0 && recentNotes.length === 0) {
        elements.recentNotes.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-sticky-note text-4xl mb-2"></i>
                <p>No notes yet. Create your first note!</p>
            </div>
        `;
        return;
    }
    
    if (pinnedNotes.length > 0) {
        const pinnedSection = document.createElement('div');
        pinnedSection.className = 'mb-6';
        pinnedSection.innerHTML = `
            <h3 class="text-sm font-medium text-gray-400 mb-3 flex items-center">
                <i class="fas fa-thumbtack text-accent mr-2"></i>
                Pinned Notes
            </h3>
        `;
        
        const pinnedList = document.createElement('div');
        pinnedList.className = 'space-y-3';
        
        pinnedNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'bg-primary-dark hover:bg-gray-800 rounded-lg p-4 transition cursor-pointer';
            noteElement.innerHTML = `
                <h4 class="font-medium mb-1">${note.title}</h4>
                <p class="text-sm text-gray-400 line-clamp-2">${note.content}</p>
                <div class="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>${formatDate(note.createdAt)}</span>
                    <button class="delete-note text-gray-500 hover:text-red-400" data-id="${note.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            pinnedList.appendChild(noteElement);
        });
        
        pinnedSection.appendChild(pinnedList);
        elements.recentNotes.appendChild(pinnedSection);
    }
    
    if (recentNotes.length > 0) {
        const recentSection = document.createElement('div');
        recentSection.innerHTML = `
            <h3 class="text-sm font-medium text-gray-400 mb-3">Recent Notes</h3>
        `;
        
        const recentList = document.createElement('div');
        recentList.className = 'space-y-3';
        
        recentNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'bg-primary-dark hover:bg-gray-800 rounded-lg p-4 transition cursor-pointer';
            noteElement.innerHTML = `
                <h4 class="font-medium mb-1">${note.title}</h4>
                <p class="text-sm text-gray-400 line-clamp-2">${note.content}</p>
                <div class="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>${formatDate(note.createdAt)}</span>
                    <button class="delete-note text-gray-500 hover:text-red-400" data-id="${note.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            recentList.appendChild(noteElement);
        });
        
        recentSection.appendChild(recentList);
        elements.recentNotes.appendChild(recentSection);
    }
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-note').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(button.dataset.id);
            deleteNote(id);
        });
    });
}

function renderNotesGrid() {
    elements.notesGrid.innerHTML = '';
    
    if (state.notes.length === 0) {
        elements.notesGrid.innerHTML = `
            <div class="col-span-3 text-center py-16 text-gray-500">
                <i class="fas fa-sticky-note text-5xl mb-4"></i>
                <h3 class="text-xl mb-2">No notes yet</h3>
                <p class="mb-4">Create your first note to get started</p>
                <button id="create-first-note" class="bg-accent hover:bg-accent-dark text-primary-dark px-6 py-2 rounded-lg font-medium transition">
                    Create Note
                </button>
            </div>
        `;
        
        document.getElementById('create-first-note').addEventListener('click', () => openModal('note'));
        return;
    }
    
    state.notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'bg-primary-light hover:bg-gray-800 rounded-xl border border-gray-800 p-5 transition cursor-pointer h-full';
        noteElement.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold text-lg">${note.title}</h3>
                ${note.pinned ? '<i class="fas fa-thumbtack text-accent"></i>' : ''}
            </div>
            <p class="text-gray-400 text-sm mb-4 line-clamp-3">${note.content}</p>
            <div class="flex justify-between items-center text-xs text-gray-500">
                <span>${formatDate(note.createdAt)}</span>
                <button class="delete-note text-gray-500 hover:text-red-400" data-id="${note.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        elements.notesGrid.appendChild(noteElement);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-note').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(button.dataset.id);
            deleteNote(id);
        });
    });
}

function filterNotes() {
    const searchTerm = elements.searchNotes.value.toLowerCase();
    const filteredNotes = state.notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.content.toLowerCase().includes(searchTerm)
    );
    
    // Re-render notes grid with filtered notes
    if (filteredNotes.length === 0) {
        elements.notesGrid.innerHTML = `
            <div class="col-span-3 text-center py-16 text-gray-500">
                <i class="fas fa-search text-5xl mb-4"></i>
                <h3 class="text-xl mb-2">No notes found</h3>
                <p>Try a different search term</p>
            </div>
        `;
    } else {
        elements.notesGrid.innerHTML = '';
        filteredNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'bg-primary-light hover:bg-gray-800 rounded-xl border border-gray-800 p-5 transition cursor-pointer h-full';
            noteElement.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-lg">${note.title}</h3>
                    ${note.pinned ? '<i class="fas fa-thumbtack text-accent"></i>' : ''}
                </div>
                <p class="text-gray-400 text-sm mb-4 line-clamp-3">${note.content}</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                    <span>${formatDate(note.createdAt)}</span>
                    <button class="delete-note text-gray-500 hover:text-red-400" data-id="${note.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            elements.notesGrid.appendChild(noteElement);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-note').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(button.dataset.id);
                deleteNote(id);
            });
        });
    }
}

function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        state.notes = state.notes.filter(note => note.id !== id);
        updateUI();
    }
}

// Task functions
function saveTask() {
    const title = elements.taskTitle.value.trim();
    const dueDate = elements.taskDueDate.value;
    const priority = elements.taskPriority.value;
    const description = elements.taskDescription.value.trim();
    
    if (!title) {
        alert('Please enter a title for your task');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        title,
        dueDate,
        priority,
        description,
        completed: false
    };
    
    state.tasks.push(newTask);
    updateUI();
    closeAllModals();
}

function renderUpcomingTasks() {
    elements.upcomingTasks.innerHTML = '';
    
    // Sort tasks by due date (soonest first)
    const sortedTasks = [...state.tasks].sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    
    // Get upcoming tasks (not completed, due in the next 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingTasks = sortedTasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return !task.completed && dueDate <= nextWeek;
    }).slice(0, 5);
    
    if (upcomingTasks.length === 0) {
        elements.upcomingTasks.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-tasks text-4xl mb-2"></i>
                <p>No upcoming tasks. Add your first task!</p>
            </div>
        `;
        return;
    }
    
    upcomingTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'bg-primary-dark hover:bg-gray-800 rounded-lg p-3 transition cursor-pointer';
        taskElement.innerHTML = `
            <div class="flex items-start">
                <input type="checkbox" class="custom-checkbox mr-3 mt-1 task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-medium ${task.completed ? 'line-through text-gray-500' : ''}">${task.title}</h4>
                        <span class="text-xs ${getPriorityColor(task.priority)}">${task.priority}</span>
                    </div>
                    <p class="text-sm text-gray-400 mt-1">${formatDate(new Date(task.dueDate))}</p>
                </div>
            </div>
        `;
        elements.upcomingTasks.appendChild(taskElement);
    });
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const id = parseInt(checkbox.dataset.id);
            toggleTaskCompletion(id);
        });
    });
}

function renderTasksList() {
    elements.tasksList.innerHTML = '';
    
    if (state.tasks.length === 0) {
        elements.tasksList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-tasks text-5xl mb-4"></i>
                <h3 class="text-xl mb-2">No tasks yet</h3>
                <p class="mb-4">Add your first task to get started</p>
                <button id="create-first-task" class="bg-accent hover:bg-accent-dark text-primary-dark px-6 py-2 rounded-lg font-medium transition">
                    Add Task
                </button>
            </div>
        `;
        
        document.getElementById('create-first-task').addEventListener('click', () => openModal('task'));
        return;
    }
    
    // Sort tasks by due date (soonest first)
    const sortedTasks = [...state.tasks].sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    
    sortedTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'bg-primary-dark hover:bg-gray-800 rounded-lg p-4 transition cursor-pointer';
        taskElement.innerHTML = `
            <div class="flex items-start">
                <input type="checkbox" class="custom-checkbox mr-3 mt-1 task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-medium ${task.completed ? 'line-through text-gray-500' : ''}">${task.title}</h4>
                        <span class="text-xs ${getPriorityColor(task.priority)}">${task.priority}</span>
                    </div>
                    <p class="text-sm text-gray-400 mt-1">${formatDate(new Date(task.dueDate))}</p>
                    ${task.description ? `<p class="text-sm text-gray-500 mt-2">${task.description}</p>` : ''}
                </div>
            </div>
        `;
        elements.tasksList.appendChild(taskElement);
    });
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const id = parseInt(checkbox.dataset.id);
            toggleTaskCompletion(id);
        });
    });
}

function filterTasks(filter) {
    let filteredTasks = [...state.tasks];
    
    switch (filter) {
        case 'active':
            filteredTasks = filteredTasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = filteredTasks.filter(task => task.completed);
            break;
        default:
            // 'all' - no filtering needed
            break;
    }
    
    // Sort by due date
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    // Re-render tasks list
    elements.tasksList.innerHTML = '';
    
    if (filteredTasks.length === 0) {
        elements.tasksList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-tasks text-5xl mb-4"></i>
                <h3 class="text-xl mb-2">No tasks found</h3>
                <p>Try a different filter or add a new task</p>
            </div>
        `;
        return;
    }
    
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'bg-primary-dark hover:bg-gray-800 rounded-lg p-4 transition cursor-pointer';
        taskElement.innerHTML = `
            <div class="flex items-start">
                <input type="checkbox" class="custom-checkbox mr-3 mt-1 task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-medium ${task.completed ? 'line-through text-gray-500' : ''}">${task.title}</h4>
                        <span class="text-xs ${getPriorityColor(task.priority)}">${task.priority}</span>
                    </div>
                    <p class="text-sm text-gray-400 mt-1">${formatDate(new Date(task.dueDate))}</p>
                    ${task.description ? `<p class="text-sm text-gray-500 mt-2">${task.description}</p>` : ''}
                </div>
            </div>
        `;
        elements.tasksList.appendChild(taskElement);
    });
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const id = parseInt(checkbox.dataset.id);
            toggleTaskCompletion(id);
        });
    });
}

function toggleTaskCompletion(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        updateUI();
    }
}

// Calendar functions
function renderCalendar() {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    
    // Update month display
    elements.currentMonth.textContent = state.currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Clear calendar grid
    elements.calendarGrid.innerHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'p-2 text-center text-gray-600';
        elements.calendarGrid.appendChild(emptyCell);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'p-2 text-center cursor-pointer hover:bg-gray-800 rounded-lg transition';
        
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === new Date().toDateString();
        
        if (isToday) {
            cell.classList.add('bg-accent', 'text-primary-dark', 'font-semibold');
        }
        
        cell.textContent = day;
        elements.calendarGrid.appendChild(cell);
    }
}

function renderUpcomingEvents() {
    elements.upcomingEvents.innerHTML = '';
    
    if (state.events.length === 0) {
        elements.upcomingEvents.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-calendar-alt text-5xl mb-4"></i>
                <h3 class="text-xl mb-2">No events scheduled</h3>
                <p class="mb-4">Add your first event to get started</p>
                <button id="create-first-event" class="bg-accent hover:bg-accent-dark text-primary-dark px-6 py-2 rounded-lg font-medium transition">
                    Add Event
                </button>
            </div>
        `;
        
        document.getElementById('create-first-event').addEventListener('click', () => openModal('event'));
        return;
    }
    
    // Sort events by start date
    const sortedEvents = [...state.events].sort((a, b) => new Date(a.start) - new Date(b.start));
    
    // Get upcoming events (next 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingEvents = sortedEvents.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= today && eventDate <= nextWeek;
    }).slice(0, 5);
    
    if (upcomingEvents.length === 0) {
        elements.upcomingEvents.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-calendar-alt text-5xl mb-4"></i>
                <h3 class="text-xl mb-2">No upcoming events</h3>
                <p>Add an event to get started</p>
            </div>
        `;
        return;
    }
    
    upcomingEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'bg-primary-dark hover:bg-gray-800 rounded-lg p-4 transition cursor-pointer';
        
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        
        eventElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="font-medium mb-1">${event.title}</h4>
                    <p class="text-sm text-gray-400">${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    ${event.description ? `<p class="text-sm text-gray-500 mt-2">${event.description}</p>` : ''}
                </div>
                <button class="delete-event text-gray-500 hover:text-red-400 ml-2" data-id="${event.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        elements.upcomingEvents.appendChild(eventElement);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-event').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(button.dataset.id);
            deleteEvent(id);
        });
    });
}

function saveEvent() {
    const title = elements.eventTitle.value.trim();
    const start = elements.eventStart.value;
    const end = elements.eventEnd.value;
    const description = elements.eventDescription.value.trim();
    
    if (!title || !start || !end) {
        alert('Please fill in all required fields');
        return;
    }
    
    const selectedColor = document.querySelector('.event-color-option.border-accent').dataset.color;
    
    const newEvent = {
        id: Date.now(),
        title,
        start,
        end,
        description,
        color: selectedColor
    };
    
    state.events.push(newEvent);
    updateUI();
    closeAllModals();
}

function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        state.events = state.events.filter(event => event.id !== id);
        updateUI();
    }
}

// Link functions
function saveLink() {
    const title = elements.linkTitle.value.trim();
    const url = elements.linkUrl.value.trim();
    const category = elements.linkCategory.value;
    const notes = elements.linkNotes.value.trim();
    
    if (!title || !url) {
        alert('Please fill in title and URL');
        return;
    }
    
    const newLink = {
        id: Date.now(),
        title,
        url,
        category,
        notes
    };
    
    state.links.push(newLink);
    updateUI();
    closeAllModals();
}

function renderLinksList() {
    elements.linksList.innerHTML = '';
    
    if (state.links.length === 0) {
        elements.linksList.innerHTML = `
            <div class="text-center py-16 text-gray-500">
                <i class="fas fa-link text-5xl mb-4"></i>
                <h3 class="text-xl mb-2">No saved links yet</h3>
                <p class="mb-4">Save your first link to get started</p>
                <button id="create-first-link" class="bg-accent hover:bg-accent-dark text-primary-dark px-6 py-2 rounded-lg font-medium transition">
                    Save Link
                </button>
            </div>
        `;
        
        document.getElementById('create-first-link').addEventListener('click', () => openModal('link'));
        return;
    }
    
    state.links.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'bg-primary-dark hover:bg-gray-800 rounded-lg p-4 transition cursor-pointer';
        linkElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center mb-2">
                        <h4 class="font-medium mr-3">${link.title}</h4>
                        <span class="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">${link.category}</span>
                    </div>
                    <a href="${link.url}" target="_blank" class="text-sm text-accent hover:underline block mb-2">${link.url}</a>
                    ${link.notes ? `<p class="text-sm text-gray-400">${link.notes}</p>` : ''}
                </div>
                <button class="delete-link text-gray-500 hover:text-red-400 ml-2" data-id="${link.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        elements.linksList.appendChild(linkElement);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-link').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(button.dataset.id);
            deleteLink(id);
        });
    });
}

function filterLinks() {
    const searchTerm = elements.searchLinks.value.toLowerCase();
    const filteredLinks = state.links.filter(link => 
        link.title.toLowerCase().includes(searchTerm) || 
        link.url.toLowerCase().includes(searchTerm) ||
        link.notes.toLowerCase().includes(searchTerm)
    );
    
    renderFilteredLinks(filteredLinks);
}

function filterLinksByCategory(category) {
    let filteredLinks = [...state.links];
    
    if (category !== 'all') {
        filteredLinks = filteredLinks.filter(link => link.category === category);
    }
    
    renderFilteredLinks(filteredLinks);
}

function renderFilteredLinks(filteredLinks) {
    elements.linksList.innerHTML = '';
    
    if (filteredLinks.length === 0) {
        elements.linksList.innerHTML = `
            <div class="text-center py-16 text-gray-500">
                <i class="fas fa-search text-5xl mb-4"></i>
                <h3 class="text-xl mb-2">No links found</h3>
                <p>Try a different search term or filter</p>
            </div>
        `;
        return;
    }
    
    filteredLinks.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'bg-primary-dark hover:bg-gray-800 rounded-lg p-4 transition cursor-pointer';
        linkElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center mb-2">
                        <h4 class="font-medium mr-3">${link.title}</h4>
                        <span class="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">${link.category}</span>
                    </div>
                    <a href="${link.url}" target="_blank" class="text-sm text-accent hover:underline block mb-2">${link.url}</a>
                    ${link.notes ? `<p class="text-sm text-gray-400">${link.notes}</p>` : ''}
                </div>
                <button class="delete-link text-gray-500 hover:text-red-400 ml-2" data-id="${link.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        elements.linksList.appendChild(linkElement);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-link').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(button.dataset.id);
            deleteLink(id);
        });
    });
}

function deleteLink(id) {
    if (confirm('Are you sure you want to delete this link?')) {
        state.links = state.links.filter(link => link.id !== id);
        updateUI();
    }
}

// AI functions
function sendAiMessage() {
    const message = elements.aiMessageInput.value.trim();
    if (!message) return;
    
    // Add user message
    state.aiMessages.push({
        sender: 'user',
        content: message
    });
    
    // Clear input
    elements.aiMessageInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAiResponse(message);
        state.aiMessages.push({
            sender: 'ai',
            content: aiResponse
        });
        renderAiChat();
    }, 1000);
    
    // Render immediately to show user message
    renderAiChat();
}

function generateAiResponse(message) {
    const responses = [
        "That's a great question! Here's what I think...",
        "I'd recommend focusing on your priorities first.",
        "Have you tried breaking this down into smaller tasks?",
        "Time management is key here. Consider using the Pomodoro technique.",
        "Let me help you organize this better.",
        "Remember to take breaks and stay hydrated!",
        "This sounds like a perfect opportunity to use the 2-minute rule.",
        "I suggest creating a detailed plan for this.",
        "Don't forget to celebrate your small wins!",
        "This is a common productivity challenge. Here's my advice..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function renderAiChat() {
    elements.chatMessages.innerHTML = '';
    
    state.aiMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'flex';
        
        if (message.sender === 'ai') {
            messageElement.innerHTML = `
                <div class="bg-accent/20 text-accent p-4 rounded-lg ai-bubble max-w-xs md:max-w-md lg:max-w-lg">
                    <p>${message.content}</p>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="ml-auto bg-accent text-primary-dark p-4 rounded-lg user-bubble max-w-xs md:max-w-md lg:max-w-lg">
                    <p>${message.content}</p>
                </div>
            `;
        }
        
        elements.chatMessages.appendChild(messageElement);
    });
    
    // Scroll to bottom
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 