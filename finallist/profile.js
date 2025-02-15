// Get user statistics
function getUserStats() {
    const bucketList = JSON.parse(localStorage.getItem('bucketList')) || [];
    const achievements = JSON.parse(localStorage.getItem('achievements')) || {
        totalCompleted: 0,
        categories: { travel: 0, career: 0, personal: 0, health: 0, other: 0 }
    };

    return {
        total: bucketList.length,
        completed: bucketList.filter(item => item.completed).length,
        inProgress: bucketList.filter(item => !item.completed).length,
        achievements: achievements.totalCompleted,
        categories: achievements.categories
    };
}

// Render profile page
function renderProfile() {
    const stats = getUserStats();
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-info">
                    <h2>Welcome, <span id="profile-name">${userProfile.name || 'Guest'}</span>!</h2>
                    <p>Member since: ${new Date(userProfile.joinDate).toLocaleDateString()}</p>
                    <button class="secondary-button" onclick="promptForName()">Change Name</button>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Goals</h3>
                    <span class="stat-number">${stats.total}</span>
                </div>
                <div class="stat-card">
                    <h3>Completed</h3>
                    <span class="stat-number">${stats.completed}</span>
                </div>
                <div class="stat-card">
                    <h3>In Progress</h3>
                    <span class="stat-number">${stats.inProgress}</span>
                </div>
                <div class="stat-card">
                    <h3>Achievements</h3>
                    <span class="stat-number">${stats.achievements}</span>
                </div>
            </div>
            
            <div class="progress-section">
                <h3>Completion Rate</h3>
                <div class="progress-bar">
                    <div class="progress" style="width: ${stats.total ? (stats.completed / stats.total) * 100 : 0}%"></div>
                </div>
                <span class="progress-label">${stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}%</span>
            </div>
            
            <div class="category-section">
                <h3>Goals by Category</h3>
                <div class="category-grid">
                    ${Object.entries(stats.categories).map(([category, count]) => `
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