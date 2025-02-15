// Store achievements data
let achievements = JSON.parse(localStorage.getItem('achievements')) || {
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
        other: 0
    }
};

// Update achievements when a goal is completed
function updateAchievements(category) {
    achievements.totalCompleted++;
    achievements.categories[category]++;
    
    // Check milestones
    achievements.milestones.forEach(milestone => {
        if (!milestone.achieved && achievements.totalCompleted >= milestone.requirement) {
            milestone.achieved = true;
            showAchievementNotification(milestone);
        }
    });
    
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

// Show achievement notification
function showAchievementNotification(milestone) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-content">
            <h4>${milestone.title}</h4>
            <p>${milestone.description}</p>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
}

// Render achievements page
function renderAchievements() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
        <div class="achievements-container">
            <div class="achievements-header">
                <h2>Your Achievements</h2>
                <p>Total Goals Completed: ${achievements.totalCompleted}</p>
            </div>
            
            <div class="achievements-grid">
                ${achievements.milestones.map(milestone => `
                    <div class="achievement-card ${milestone.achieved ? 'achieved' : ''}">
                        <div class="achievement-icon">${milestone.achieved ? '🏆' : '🔒'}</div>
                        <h3>${milestone.title}</h3>
                        <p>${milestone.description}</p>
                        <div class="achievement-progress">
                            <div class="progress-bar">
                                <div class="progress" style="width: ${Math.min(100, (achievements.totalCompleted / milestone.requirement) * 100)}%"></div>
                            </div>
                            <span>${achievements.totalCompleted}/${milestone.requirement}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="category-stats">
                <h3>Category Breakdown</h3>
                <div class="category-grid">
                    ${Object.entries(achievements.categories).map(([category, count]) => `
                        <div class="category-card">
                            <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                            <span class="category-count">${count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}