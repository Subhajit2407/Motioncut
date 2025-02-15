// Store bucket list items in localStorage
let bucketList = JSON.parse(localStorage.getItem('bucketList')) || [];
let currentPage = 'list';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    renderCurrentPage();
    updateProgress();
});

// Initialize navigation
function initializeNavigation() {
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            
            // Update active state for nav links
            if (e.target.classList.contains('nav-link')) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                e.target.classList.add('active');
            }
            
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    currentPage = page;
    renderCurrentPage();
}

function renderCurrentPage() {
    // Reset main content before rendering new page
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = '';
    
    switch(currentPage) {
        case 'achievements':
            // Reset achievements if bucket list is empty
            if (bucketList.length === 0) {
                resetAchievements();
            }
            renderAchievements();
            break;
        case 'profile':
            renderProfile();
            break;
        default:
            mainContent.innerHTML = '<div class="bucket-list" id="bucket-list"></div>';
            renderBucketList();
    }
}

// Reset achievements data
function resetAchievements() {
    const emptyAchievements = {
        totalCompleted: 0,
        milestones: [
            { id: 'first_goal', title: 'First Step', description: 'Complete your first goal', requirement: 1, achieved: false },
            { id: 'go_getter', title: 'Go Getter', description: 'Complete 5 goals', requirement: 5, achieved: false },
            { id: 'dream_chaser', title: 'Dream Chaser', description: 'Complete 10 goals', requirement: 10, achieved: false },
            { id: 'overachiever', title: 'Overachiever', description: 'Complete 25 goals', requirement: 25, achieved: false },
            { id: 'legend', title: 'Living Legend', description: 'Complete 50 goals', requirement: 50, achieved: false }
        ],
        categories: {
            travel: 0,
            career: 0,
            personal: 0,
            health: 0,
            sports:0,
            other: 0
        }
    };
    localStorage.setItem('achievements', JSON.stringify(emptyAchievements));
}

// Render bucket list items
function renderBucketList() {
    const bucketListEl = document.getElementById('bucket-list');
    bucketListEl.innerHTML = '';

    bucketList.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = `bucket-item ${item.completed ? 'completed' : ''}`;
        itemEl.innerHTML = `
            <div class="item-header">
                <span class="category-tag">${item.category || 'Other'}</span>
                <div class="item-actions">
                    <button class="action-btn" onclick="toggleComplete(${index})" 
                            aria-label="${item.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                        ${item.completed ? '↩' : '✓'}
                    </button>
                    <button class="action-btn delete" onclick="deleteItem(${index})" 
                            aria-label="Delete goal">×</button>
                </div>
            </div>
            <h3>${item.text}</h3>
            ${item.completed ? '<span class="completion-date">Completed on ' + 
              new Date(item.completedDate).toLocaleDateString() + '</span>' : ''}
        `;
        bucketListEl.appendChild(itemEl);
    });

    if (bucketList.length === 0) {
        bucketListEl.innerHTML = `
            <div class="empty-state">
                <p>No goals found. Let's add some!</p>
                <button class="cta-button" onclick="openAddModal()">Add Your First Goal</button>
            </div>
        `;
    }
}

// Add new item
function addItem() {
    const input = document.getElementById('new-item');
    const category = document.getElementById('category');
    const text = input.value.trim();

    if (text) {
        bucketList.push({
            text,
            category: category.value,
            completed: false,
            createdDate: new Date().toISOString(),
            completedDate: null
        });
        localStorage.setItem('bucketList', JSON.stringify(bucketList));
        renderCurrentPage();
        updateProgress();
        closeAddModal();
        input.value = '';
    }
}

// Toggle item completion
function toggleComplete(index) {
    if (index >= 0 && index < bucketList.length) {
        const item = bucketList[index];
        const wasCompleted = item.completed;
        item.completed = !wasCompleted;
        item.completedDate = item.completed ? new Date().toISOString() : null;
        
        if (item.completed && !wasCompleted) {
            updateAchievements(item.category || 'other');
        }
        
        localStorage.setItem('bucketList', JSON.stringify(bucketList));
        renderCurrentPage();
        updateProgress();
    }
}

// Delete item
function deleteItem(index) {
    if (index >= 0 && index < bucketList.length && confirm('Are you sure you want to delete this goal?')) {
        // If item was completed, update achievements
        const item = bucketList[index];
        if (item.completed) {
            const achievements = JSON.parse(localStorage.getItem('achievements')) || {};
            if (achievements.totalCompleted > 0) {
                achievements.totalCompleted--;
                if (achievements.categories[item.category]) {
                    achievements.categories[item.category]--;
                }
                localStorage.setItem('achievements', JSON.stringify(achievements));
            }
        }
        
        bucketList.splice(index, 1);
        localStorage.setItem('bucketList', JSON.stringify(bucketList));
        
        // Reset achievements if no items left
        if (bucketList.length === 0) {
            resetAchievements();
        }
        
        renderCurrentPage();
        updateProgress();
    }
}

// Update progress statistics
function updateProgress() {
    const total = bucketList.length;
    const completed = bucketList.filter(item => item.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById('progress').style.width = `${percentage}%`;
    document.getElementById('progress-percentage').textContent = `${percentage}%`;
    document.getElementById('total-goals').textContent = total;
    document.getElementById('completed-goals').textContent = completed;
}

// Modal functions
function openAddModal() {
    document.getElementById('add-modal').style.display = 'block';
    document.getElementById('new-item').focus();
}

function closeAddModal() {
    document.getElementById('add-modal').style.display = 'none';
}

// Close modal when clicking outside
document.getElementById('add-modal').addEventListener('click', (e) => {
    if (e.target.id === 'add-modal') {
        closeAddModal();
    }
});

// Handle Enter key in input
document.getElementById('new-item').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});
