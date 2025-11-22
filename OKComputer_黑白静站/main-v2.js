// 全局变量和配置
const CONFIG = {
    STORAGE_KEY: 'mytoolbox_data',
    THEME_KEY: 'mytoolbox_theme',
    VERSION: '2.0'
};

// 工具函数
const utils = {
    // 防抖函数
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 格式化日期
    formatDate: (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // 复制到剪贴板
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('复制失败:', err);
            return false;
        }
    },

    // 显示通知
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },

    // 获取本地存储数据
    getStorageData: (key, defaultValue = null) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('读取本地存储失败:', error);
            return defaultValue;
        }
    },

    // 设置本地存储数据
    setStorageData: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('写入本地存储失败:', error);
            return false;
        }
    }
};

// 导航栏管理
const navbar = {
    init: async () => {
        try {
            const response = await fetch('_navbar-v2.html');
            const navbarHTML = await response.text();
            document.getElementById('navbar-container').innerHTML = navbarHTML;
            navbar.bindEvents();
            navbar.setActive();
        } catch (error) {
            console.error('加载导航栏失败:', error);
        }
    },

    bindEvents: () => {
        // 移动端菜单切换
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // 导航链接点击
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // 移动端点击后关闭菜单
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            });
        });
    },

    setActive: () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index-v2.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index-v2.html')) {
                link.classList.add('active');
            }
        });
    }
};

// 主题管理
const theme = {
    init: () => {
        const savedTheme = utils.getStorageData(CONFIG.THEME_KEY, 'dark');
        theme.set(savedTheme);
        
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', theme.toggle);
        }
    },

    set: (themeName) => {
        document.documentElement.setAttribute('data-theme', themeName);
        utils.setStorageData(CONFIG.THEME_KEY, themeName);
        
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = themeName === 'dark' ? '☀️' : '🌙';
        }
    },

    toggle: () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        theme.set(newTheme);
    }
};

// 项目展示页面功能
const projects = {
    init: () => {
        if (!document.querySelector('.projects-grid')) return;
        
        projects.bindFilterEvents();
        projects.initModal();
    },

    bindFilterEvents: () => {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 更新按钮状态
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 过滤项目
                const filter = btn.dataset.filter;
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    },

    initModal: () => {
        const modal = document.getElementById('project-modal');
        if (!modal) return;
        
        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                projects.closeModal();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                projects.closeModal();
            }
        });
    },

    openModal: (projectId) => {
        const modal = document.getElementById('project-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        
        const projectData = projects.getProjectData(projectId);
        
        title.textContent = projectData.title;
        body.innerHTML = projectData.content;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    closeModal: () => {
        const modal = document.getElementById('project-modal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    },

    getProjectData: (projectId) => {
        const projectInfo = {
            'p1000': {
                title: '洛谷 P1000 题解',
                content: `
                    <h3>题目描述</h3>
                    <p>输入两个整数a和b，计算a+b的和。</p>
                    
                    <h3>解法一：普通解法</h3>
                    <pre><code>#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}</code></pre>
                    
                    <h3>解法二：快速读写优化</h3>
                    <pre><code>#include <cstdio>
inline int read() {
    int x = 0, f = 1; char c = getchar();
    while (c < '0' || c > '9') { if (c == '-') f = -1; c = getchar(); }
    while (c >= '0' && c <= '9') x = x * 10 + c - '0', c = getchar();
    return x * f;
}
int main() {
    int a = read(), b = read();
    printf("%d\n", a + b);
    return 0;
}</code></pre>
                `
            },
            'dp': {
                title: '动态规划专题',
                content: `
                    <h3>背包问题系列</h3>
                    <p>01背包、完全背包、多重背包等经典问题的解法总结</p>
                    
                    <h3>最长公共子序列</h3>
                    <pre><code>int lcs(const string& s1, const string& s2) {
        int m = s1.size(), n = s2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1[i-1] == s2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }</code></pre>
                `
            },
            'blog': {
                title: '个人博客系统',
                content: `
                    <h3>项目特色</h3>
                    <ul>
                        <li>纯静态博客，无需服务器</li>
                        <li>支持Markdown渲染</li>
                        <li>响应式设计</li>
                        <li>深色/浅色主题切换</li>
                    </ul>
                    
                    <h3>技术栈</h3>
                    <p>HTML5 + CSS3 + JavaScript (ES6+)</p>
                    
                    <h3>在线预览</h3>
                    <p><a href="https://username.github.io" target="_blank">点击访问博客</a></p>
                `
            }
        };
        
        return projectInfo[projectId] || { title: '项目详情', content: '<p>暂无详细信息</p>' };
    }
};

// C++模板页面功能
const cppTemplates = {
    init: () => {
        if (!document.querySelector('.templates-grid')) return;
        
        cppTemplates.bindSearchEvents();
        cppTemplates.bindFilterEvents();
    },

    bindSearchEvents: () => {
        const searchInput = document.getElementById('template-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', utils.debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            const templateCards = document.querySelectorAll('.template-card');
            
            templateCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('.template-desc').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300));
    },

    bindFilterEvents: () => {
        const categoryFilter = document.getElementById('category-filter');
        if (!categoryFilter) return;
        
        categoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            const templateCards = document.querySelectorAll('.template-card');
            
            templateCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};

// 错题本页面功能
const mistakes = {
    init: () => {
        if (!document.querySelector('.mistakes-list')) return;
        
        mistakes.loadMistakes();
        mistakes.bindFilterEvents();
        mistakes.initModal();
    },

    loadMistakes: () => {
        const savedMistakes = utils.getStorageData('mistakes', []);
        // 这里可以加载保存的错题数据
        // 目前使用示例数据
    },

    bindFilterEvents: () => {
        const filters = ['difficulty-filter', 'category-filter', 'status-filter'];
        
        filters.forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', mistakes.applyFilters);
            }
        });
    },

    applyFilters: () => {
        const difficulty = document.getElementById('difficulty-filter').value;
        const category = document.getElementById('category-filter').value;
        const status = document.getElementById('status-filter').value;
        
        const mistakeCards = document.querySelectorAll('.mistake-card');
        
        mistakeCards.forEach(card => {
            let show = true;
            
            if (difficulty !== 'all' && card.dataset.difficulty !== difficulty) {
                show = false;
            }
            if (category !== 'all' && card.dataset.category !== category) {
                show = false;
            }
            if (status !== 'all' && card.dataset.status !== status) {
                show = false;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    },

    initModal: () => {
        const modal = document.getElementById('add-mistake-modal');
        if (!modal) return;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                mistakes.closeAddModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                mistakes.closeAddModal();
            }
        });
    },

    openAddModal: () => {
        const modal = document.getElementById('add-mistake-modal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    closeAddModal: () => {
        const modal = document.getElementById('add-mistake-modal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // 清空表单
        document.getElementById('mistake-form').reset();
    },

    addMistake: (mistakeData) => {
        const mistakes = utils.getStorageData('mistakes', []);
        mistakeData.id = Date.now();
        mistakeData.date = utils.formatDate(new Date());
        mistakes.push(mistakeData);
        utils.setStorageData('mistakes', mistakes);
    },

    deleteMistake: (mistakeId) => {
        const mistakes = utils.getStorageData('mistakes', []);
        const filteredMistakes = mistakes.filter(m => m.id !== mistakeId);
        utils.setStorageData('mistakes', filteredMistakes);
    }
};

// 工具页面功能
const tools = {
    init: () => {
        if (!document.querySelector('.tools-grid')) return;
        
        tools.loadTools();
        tools.bindSearchEvents();
        tools.bindCategoryEvents();
    },

    loadTools: () => {
        // 工具数据可以从userData-v2.js加载或本地存储
        const tools = utils.getStorageData('tools', []);
        // 这里可以动态生成工具卡片
    },

    bindSearchEvents: () => {
        const searchInput = document.getElementById('tool-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', utils.debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            const toolCards = document.querySelectorAll('.tool-card');
            
            toolCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('.tool-desc').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300));
    },

    bindCategoryEvents: () => {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const toolCards = document.querySelectorAll('.tool-card');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 更新按钮状态
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 过滤工具
                const category = btn.dataset.category;
                toolCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
};

// 学习路线图页面功能
const roadmap = {
    init: () => {
        if (!document.querySelector('.roadmap-timeline')) return;
        
        roadmap.bindNodeEvents();
    },

    bindNodeEvents: () => {
        const nodes = document.querySelectorAll('.roadmap-node');
        
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                const content = node.querySelector('.roadmap-content');
                if (content) {
                    content.classList.toggle('expanded');
                }
            });
        });
    }
};

// 全局功能
const global = {
    init: () => {
        global.bindCopyEvents();
        global.updateVisitInfo();
    },

    bindCopyEvents: () => {
        // 复制代码功能
        window.copyCode = async (btn) => {
            const codeBlock = btn.closest('.template-card, .mistake-card').querySelector('code, pre');
            const code = codeBlock.textContent;
            
            const success = await utils.copyToClipboard(code);
            if (success) {
                utils.showNotification('代码已复制到剪贴板', 'success');
                btn.textContent = '已复制';
                setTimeout(() => {
                    btn.textContent = '复制代码';
                }, 2000);
            } else {
                utils.showNotification('复制失败', 'error');
            }
        };
    },

    updateVisitInfo: () => {
        // 更新访问时间和IP显示
        const visitTime = document.getElementById('visit-time');
        const userIP = document.getElementById('user-ip');
        
        if (visitTime) {
            visitTime.textContent = new Date().toLocaleString('zh-CN');
        }
        
        // 模拟获取IP地址
        if (userIP) {
            userIP.textContent = '127.0.0.1';
        }
    }
};

// 页面初始化
document.addEventListener('DOMContentLoaded', async () => {
    // 初始化导航栏
    await navbar.init();
    
    // 初始化主题
    theme.init();
    
    // 初始化全局功能
    global.init();
    
    // 根据页面初始化特定功能
    const currentPage = window.location.pathname.split('/').pop() || 'index-v2.html';
    
    switch (currentPage) {
        case 'index-v2.html':
        case '':
            // 主页功能已在全局中处理
            break;
        case 'projects-v2.html':
            projects.init();
            break;
        case 'cpp-v2.html':
            cppTemplates.init();
            break;
        case 'mistakes-v2.html':
            mistakes.init();
            break;
        case 'tools-v2.html':
            tools.init();
            break;
        case 'roadmap-v2.html':
            roadmap.init();
            break;
    }
});

// 全局函数（供HTML调用）
window.openProjectModal = (projectId) => {
    projects.openModal(projectId);
};

window.closeProjectModal = () => {
    projects.closeModal();
};

window.openAddMistakeModal = () => {
    mistakes.openAddModal();
};

window.closeAddMistakeModal = () => {
    mistakes.closeAddModal();
};

window.editMistake = (btn) => {
    // 编辑错题功能
    utils.showNotification('编辑功能开发中...', 'info');
};

window.deleteMistake = (btn) => {
    if (confirm('确定要删除这个错题吗？')) {
        const card = btn.closest('.mistake-card');
        card.remove();
        utils.showNotification('错题已删除', 'success');
    }
};

// 表单提交处理
document.addEventListener('submit', (e) => {
    if (e.target.id === 'mistake-form') {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const mistakeData = {
            title: formData.get('mistake-title') || document.getElementById('mistake-title').value,
            category: formData.get('mistake-category') || document.getElementById('mistake-category').value,
            difficulty: formData.get('mistake-difficulty') || document.getElementById('mistake-difficulty').value,
            problem: formData.get('mistake-problem') || document.getElementById('mistake-problem').value,
            code: formData.get('mistake-code') || document.getElementById('mistake-code').value,
            analysis: formData.get('mistake-analysis') || document.getElementById('mistake-analysis').value,
            solution: formData.get('mistake-solution') || document.getElementById('mistake-solution').value,
            tags: formData.get('mistake-tags') || document.getElementById('mistake-tags').value
        };
        
        mistakes.addMistake(mistakeData);
        mistakes.closeAddModal();
        utils.showNotification('错题添加成功！', 'success');
        
        // 刷新页面显示新添加的错题
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
});