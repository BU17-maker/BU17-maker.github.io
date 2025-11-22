/**
 * 用户数据配置文件 (v2版本)
 * 
 * 文件职责：
 * - 集中管理所有个人信息和网站内容
 * - 提供统一的配置接口，便于维护和更新
 * - 支持动态内容加载
 * 
 * 二次开发指南：
 * 1. 修改个人信息：直接编辑对应的字符串值
 * 2. 添加社交链接：在socialLinks数组中添加新对象
 * 3. 更新工具列表：在tools对象中修改对应分组
 * 4. 添加项目：在projects数组中push新对象
 * 5. 更新错题：在mistakes数组中添加新记录
 * 6. 修改时间轴：在roadmap数组中添加新计划
 * 
 * 与哪些文件耦合：
 * - 所有HTML页面都会引用此文件
 * - main-v2.js中的函数会调用这些数据
 * - 导航栏组件会显示个人信息
 */

// 个人信息配置
const userInfo = {
    // 基本资料 - 请根据自己的信息修改
    nickname: "高二男生",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face",
    bio: "停更 OIer，C++ 只会 STL 和基础算法，正在学 Docker 和前端。欢迎一起卷！",
    
    // 联系邮箱
    email: "your.email@example.com",
    
    // 个人简介（显示在主页）
    description: "一名热爱编程的高中生，专注于算法竞赛和计算机科学学习。喜欢探索新技术，用代码解决实际问题。目前正在学习Docker容器化技术和前端开发，希望能在技术道路上不断进步。"
};

// 社交链接配置
const socialLinks = [
    {
        name: "GitHub",
        icon: "fab fa-github",
        url: "https://github.com/yourusername",
        color: "#fff"
    },
    {
        name: "洛谷",
        icon: "fas fa-code",
        url: "https://www.luogu.com.cn/user/yourusername",
        color: "#fff"
    },
    {
        name: "Codeforces",
        icon: "fas fa-trophy",
        url: "https://codeforces.com/profile/yourusername",
        color: "#fff"
    },
    {
        name: "邮箱",
        icon: "fas fa-envelope",
        url: "mailto:your.email@example.com",
        color: "#fff"
    }
];

// 工具收藏夹配置
const tools = {
    // OJ平台
    oj: [
        {
            name: "洛谷",
            description: "国内最大的算法竞赛平台，题目质量高",
            url: "https://www.luogu.com.cn",
            icon: "fas fa-code"
        },
        {
            name: "Codeforces",
            description: "国际知名算法竞赛平台，比赛频繁",
            url: "https://codeforces.com",
            icon: "fas fa-trophy"
        },
        {
            name: "AtCoder",
            description: "日本算法竞赛平台，题目风格独特",
            url: "https://atcoder.jp",
            icon: "fas fa-robot"
        },
        {
            name: "LeetCode",
            description: "面试刷题必备，算法题目丰富",
            url: "https://leetcode.cn",
            icon: "fas fa-brain"
        }
    ],
    
    // 可视化工具
    visualization: [
        {
            name: "VisuAlgo",
            description: "算法可视化学习平台，动画演示",
            url: "https://visualgo.net",
            icon: "fas fa-chart-line"
        },
        {
            name: "Algorithm Visualizer",
            description: "算法可视化工具，支持多种算法",
            url: "https://algorithm-visualizer.org",
            icon: "fas fa-project-diagram"
        }
    ],
    
    // 文档资源
    documentation: [
        {
            name: "CPP Reference",
            description: "C++标准库参考文档，权威详细",
            url: "https://cppreference.com",
            icon: "fas fa-book"
        },
        {
            name: "OI Wiki",
            description: "竞赛编程知识库，内容全面",
            url: "https://oi-wiki.org",
            icon: "fas fa-wiki"
        }
    ],
    
    // 美化工具
    beautify: [
        {
            name: "Carbon",
            description: "代码截图美化工具，生成漂亮图片",
            url: "https://carbon.now.sh",
            icon: "fas fa-camera"
        },
        {
            name: "Ray.so",
            description: "代码截图生成器，多种主题",
            url: "https://ray.so",
            icon: "fas fa-image"
        }
    ],
    
    // 图床服务
    imageHosting: [
        {
            name: "SM.MS",
            description: "国内图床服务，上传方便",
            url: "https://sm.ms",
            icon: "fas fa-cloud"
        }
    ]
};

// 项目展示配置
const projects = [
    {
        id: 1,
        title: "洛谷 P1001 A+B 题解页面",
        description: "我的第一道洛谷题目的题解，记录了学习过程",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e126b3?w=400&h=300&fit=crop",
        technologies: ["C++", "算法", "题解"],
        github: "https://github.com/yourusername/luogu-p1001",
        content: "这是我第一次尝试写题解，选择了最经典的A+B问题。通过这个题解，我学会了如何分析问题、编写代码和撰写解题报告。",
        thoughts: "虽然A+B是最简单的题目，但写好题解并不容易。通过这次练习，我提高了自己的表达能力和代码规范意识。"
    },
    {
        id: 2,
        title: "用 GitHub Pages 搭的静态博客",
        description: "使用HTML/CSS/JS搭建的个人技术博客",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        technologies: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/yourusername/personal-blog",
        content: "一个完全静态的个人博客网站，具有简洁的设计和实用的功能。通过这个项目，我学习了前端开发的基础知识。",
        thoughts: "搭建这个博客让我对Web开发有了更深入的理解，特别是对响应式设计和用户体验有了更多的思考。"
    }
];

// 错题本配置
const mistakes = [
    {
        id: 1,
        problemName: "最长上升子序列",
        problemUrl: "https://www.luogu.com.cn/problem/P3902",
        solutionUrl: "https://www.luogu.com.cn/article/yourusername/solution-p3902",
        reason: "忽略了O(nlogn)的优化方法，只想到O(n^2)的DP，时间复杂度分析不准确",
        lastReview: "2024-11-20",
        status: "未复习",
        tags: ["动态规划", "LIS", "优化"]
    },
    {
        id: 2,
        problemName: "线段树区间更新",
        problemUrl: "https://codeforces.com/problemset/problem/339/D",
        solutionUrl: "https://codeforces.com/blog/yourusername/solution-339d",
        reason: "lazy propagation的实现有误，边界条件考虑不周，导致WA",
        lastReview: "2024-11-18",
        status: "复习中",
        tags: ["线段树", "懒加载", "区间操作"]
    },
    {
        id: 3,
        problemName: "网络流最大流",
        problemUrl: "https://www.luogu.com.cn/problem/P3376",
        solutionUrl: "https://www.luogu.com.cn/article/yourusername/solution-p3376",
        reason: "Dinic算法的层次图构建错误，对算法理解不够深入",
        lastReview: "2024-11-15",
        status: "已复习",
        tags: ["网络流", "Dinic算法", "图论"]
    }
];

// 学习路线图配置
const roadmap = [
    {
        year: "2025",
        title: "STL源码学习",
        items: [
            "学习vector、list、map等容器的底层实现",
            "理解allocator和iterator的工作原理",
            "掌握模板元编程的基本概念",
            "阅读SGI STL源码"
        ],
        status: "计划中",
        expanded: false
    },
    {
        year: "2025",
        title: "Linux系统入门",
        items: [
            "学习基本的shell命令和操作",
            "掌握vim编辑器的使用",
            "了解Linux文件系统结构",
            "学习shell脚本编程"
        ],
        status: "计划中",
        expanded: false
    },
    {
        year: "2025",
        title: "高考复习准备",
        items: [
            "制定详细的复习计划",
            "巩固数学和英语基础",
            "练习历年高考真题",
            "调整心态，准备考试"
        ],
        status: "规划中",
        expanded: false
    }
];

// 导出所有配置数据
window.userData = {
    userInfo,
    socialLinks,
    tools,
    projects,
    mistakes,
    roadmap
};