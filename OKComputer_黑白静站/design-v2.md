# 个人网站设计风格 (v2版本)

## 设计理念

### 极简主义
- **黑白灰配色**：严格限制只使用 #000、#fff、#111、#222、#555、#999 六种颜色
- **无装饰元素**：删除所有渐变、霓虹、阴影、透明度动画
- **1px实线边框**：所有边框使用1px实线，颜色为 #222
- **扁平化设计**：保持简洁的二维界面，无3D效果

### 少年感风格
- **内容导向**：突出高二学生、OIer、技术学习者的身份
- **实用主义**：每个功能都有明确的实用价值
- **学习氛围**：体现学习、成长、技术探索的主题

### 移动端优先
- **先移动端设计**：从小屏幕开始设计，逐步增强
- **流式布局**：使用CSS Grid和Flexbox实现自适应
- **触控友好**：最小触控区域48×48px，足够的按钮间距

## 色彩方案

### 严格限制的色板
- **背景色**：#000 (纯黑)
- **主要文字**：#fff (纯白)
- **卡片背景**：#111 (深灰)
- **边框颜色**：#222 (中深灰)
- **次级文字**：#555 (中灰)
- **辅助信息**：#999 (浅灰)

### 颜色使用规则
```css
/* 在每个<style>顶部必须添加的注释 */
/* 颜色只用到 #000/#fff/#111/#222/#555/#999，禁止新增色值 */

/* 背景 */
background: #000;

/* 文字 */
color: #fff;      /* 主要内容 */
color: #999;      /* 辅助信息 */

/* 边框 */
border: 1px solid #222;

/* 卡片 */
background: #111;  /* 默认状态 */
background: #222;  /* hover状态 */
```

## 排版设计

### 字体系统
- **主字体**：系统字体栈
  ```css
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  ```
- **代码字体**：等宽字体
  ```css
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  ```

### 响应式字体大小
```css
/* 基础字体 */
font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);

/* 标题层级 */
h1: clamp(1.5rem, 1.4rem + 0.5vw, 2rem);
h2: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
h3: clamp(1.125rem, 1.075rem + 0.25vw, 1.25rem);
```

### 行高和间距
- **行高**：1.7
- **字符限制**：每行最多65字符
- **段间距**：1rem
- **标题间距**：0.5rem

## 视觉效果

### 极简动画
- **hover效果**：背景色#111→#222，无其他变化
- **过渡时间**：≤50ms
- **动画控制**：
  ```css
  @media (prefers-reduced-motion: reduce) {
      * {
          transition: none !important;
      }
  }
  ```

### 交互状态
- **默认状态**：背景#111，边框#222
- **hover状态**：背景#222，边框#222
- **focus状态**：2px solid #fff 轮廓线
- **active状态**：背景#333

### 布局系统
```css
/* 移动端优先的容器 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* 响应式网格 */
.grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr; /* 移动端单列 */
}

@media (min-width: 480px) {
    .grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
}
```

## 组件设计

### 导航栏
- **背景**：#111
- **边框**：1px solid #222
- **Logo**："我的工具箱"（中文）
- **菜单项**：中文导航文字
- **汉堡菜单**：≤600px时显示"≡"图标

### 卡片组件
```css
.card {
    background: #111;
    border: 1px solid #222;
    border-radius: 8px;
    padding: 1rem;
    transition: background 50ms ease;
}

.card:hover {
    background: #222;
}
```

### 按钮组件
```css
.btn {
    background: #111;
    border: 1px solid #222;
    color: #fff;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 50ms ease;
    min-height: 48px;
    min-width: 48px;
}

.btn:hover {
    background: #222;
}

.btn:active {
    background: #333;
}
```

### 输入框组件
```css
.input {
    background: #111;
    border: 1px solid #222;
    color: #fff;
    padding: 12px 16px;
    border-radius: 6px;
    width: 100%;
}

.input:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
}
```

## 响应式设计

### 断点系统
- **小屏幕**：≤480px (移动端)
- **中屏幕**：481px - 768px (平板)
- **大屏幕**：>768px (桌面)

### 移动端优化
```css
/* 移动端导航栏 */
@media (max-width: 600px) {
    .navbar-menu {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: #111;
        border: 1px solid #222;
        flex-direction: column;
        transform: translateX(-100%);
        transition: transform 50ms ease;
    }
    
    .navbar-menu.show {
        transform: translateX(0);
    }
}

/* 移动端卡片 */
@media (max-width: 480px) {
    .card {
        margin-bottom: 1rem;
    }
    
    .grid {
        grid-template-columns: 1fr;
    }
}
```

## 无障碍设计

### 颜色对比度
- **主要文字**：#fff on #000 → 21:1 (AAA级)
- **次级文字**：#999 on #000 → 7.4:1 (AAA级)
- **边框**：#222 on #000 → 1.5:1 (满足UI元素要求)

### 键盘导航
- **Tab顺序**：逻辑清晰的导航顺序
- **焦点指示**：2px白色实线轮廓
- **跳过链接**：提供主要内容区域的跳转链接

### 屏幕阅读器支持
- **语义化HTML**：使用正确的HTML5标签
- **ARIA标签**：重要交互元素添加aria-label
- **标题层级**：正确使用h1-h6标题层级

## 性能优化

### CSS优化
- **内联关键CSS**：重要样式内嵌在HTML中
- **避免深层嵌套**：保持CSS选择器简洁
- **使用CSS变量**：便于主题统一管理

### JavaScript优化
- **事件委托**：减少事件监听器数量
- **防抖/节流**：优化搜索和滚动事件
- **模块化代码**：按功能拆分JavaScript代码

### 资源优化
- **字体优化**：使用系统字体减少加载时间
- **图片优化**：使用压缩的背景图片
- **CDN资源**：第三方库使用CDN加速

## 浏览器兼容性

### 支持范围
- **Chrome**：≥60
- **Firefox**：≥60
- **Safari**：≥12
- **Edge**：≥79

### 渐进增强
- **基础功能**：在所有浏览器可用
- **增强功能**：在现代浏览器提供更好体验
- **优雅降级**：在不支持的浏览器中降级显示

## 开发规范

### 代码风格
- **缩进**：2个空格
- **命名**：使用小写字母和连字符
- **注释**：中文注释，说明功能和注意事项

### 文件组织
```
/
├── index.html              # 主页
├── tools.html              # 工具页
├── roadmap.html            # 路线图
├── projects.html           # 项目页
├── cpp.html                # C++模板
├── mistakes.html           # 错题本
├── main.js                 # 主要JS逻辑
├── userData.js             # 用户数据
├── _navbar.html            # 导航栏组件
├── css/
│   └── style.css          # 主样式文件
├── assets/
│   └── starry-bg.png      # 背景图
└── cpp-snippets/          # C++代码模板
    ├── quick-sort.cpp
    ├── binary-search.cpp
    ├── dijkstra.cpp
    └── union-find.cpp
```

### 开发工具
- **代码编辑器**：VS Code推荐
- **浏览器调试**：Chrome DevTools
- **移动测试**：Chrome DevTools设备模拟器

## 测试验收

### 桌面端测试
- **Chrome**：最新版本
- **Firefox**：最新版本
- **Safari**：最新版本
- **Edge**：最新版本

### 移动端测试
- **iPhone SE**：375×667
- **安卓360×640**：常见小屏安卓设备
- **iPad**：768×1024

### 功能测试清单
- [ ] 所有导航链接正常工作
- [ ] 汉堡菜单在移动端正常展开/收起
- [ ] 所有按钮hover效果正常
- [ ] 搜索和过滤功能正常
- [ ] 模态框正常打开/关闭
- [ ] 表格在小屏设备可横向滚动
- [ ] 无横向滚动条
- [ ] 所有文字清晰可读
- [ ] 触控区域足够大
- [ ] 键盘导航可用