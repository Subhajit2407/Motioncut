// Store user profile data
let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    name: '',
    joinDate: new Date().toISOString()
};

// Initialize profile if not already set
function initializeProfile() {
    if (!userProfile.name) {
        promptForName();
    }
    updateProfileDisplay();
}

// Prompt user for name
function promptForName() {
    const name = prompt('Welcome! Please enter your name:');
    if (name && name.trim()) {
        userProfile.name = name.trim();
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        updateProfileDisplay();
    }
}

// Update profile display
function updateProfileDisplay() {
    const profileNameEl = document.getElementById('profile-name');
    if (profileNameEl) {
        profileNameEl.textContent = userProfile.name || 'Guest';
    }
}

// Start new profile with complete reset
function startNewProfile() {
    if (confirm('Are you sure you want to start fresh? This will reset all your goals and achievements.')) {
        try {
            // Clear all localStorage data
            localStorage.clear();
            
            // Reset user profile to initial state
            userProfile = {
                name: '',
                joinDate: new Date().toISOString()
            };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            
            // Reset bucket list to empty array
            if (typeof window.bucketList !== 'undefined') {
                window.bucketList = [];
            }
            localStorage.setItem('bucketList', JSON.stringify([]));
            
            // Reset achievements to initial state with sports category
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
                    sports: 0,
                    other: 0
                }
            };
            localStorage.setItem('achievements', JSON.stringify(emptyAchievements));
            
            // Reset all UI elements
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const listLink = document.querySelector('[data-page="list"]');
            if (listLink) listLink.classList.add('active');
            
            // Reset progress indicators using the global function
            if (typeof window.updateProgress === 'function') {
                window.updateProgress();
            }
            
            // Prompt for new name
            promptForName();
            
            // Navigate to list page and render
            if (typeof window.renderCurrentPage === 'function') {
                window.currentPage = 'list';
                window.renderCurrentPage();
            }
        } catch (error) {
            console.error('Error during profile reset:', error);
            alert('There was an error resetting your profile. Please try again.');
        }
    }
}