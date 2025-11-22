# 部署到 GitHub Pages 的最简步骤

## 准备工作

1. **创建 GitHub 账户**
   - 访问 https://github.com 注册账户

2. **创建新仓库**
   - 点击 "New repository"
   - 仓库名称建议使用 `yourusername.github.io` (替换为你的用户名)
   - 选择 "Public"
   - 不要初始化 README

## 部署步骤

### 方法一：直接上传文件

1. **下载所有文件**
   - 将本目录下的所有文件打包成 ZIP

2. **上传到 GitHub**
   - 进入你的仓库
   - 点击 "Upload files"
   - 拖拽所有文件到上传区域
   - 点击 "Commit changes"

3. **启用 GitHub Pages**
   - 进入仓库的 "Settings" 标签
   - 滚动到 "Pages" 部分
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main" / "master"
   - 点击 "Save"

### 方法二：使用 Git 命令行

1. **初始化本地仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **连接到 GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

## 自定义域名（可选）

1. **添加 CNAME 文件**
   - 在仓库根目录创建 `CNAME` 文件
   - 内容为你的域名，如：`yourdomain.com`

2. **配置 DNS**
   - 添加 CNAME 记录指向 `yourusername.github.io`
   - 或者添加 A 记录指向 GitHub Pages IP：
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

## 验证部署

1. **访问网站**
   - 默认地址：`https://yourusername.github.io`
   - 自定义域名：`https://yourdomain.com`

2. **检查功能**
   - 所有页面链接是否正常
   - 导航栏是否工作
   - 主题切换功能
   - 背景音乐播放

## 故障排除

### 页面不显示
- 检查仓库是否为 public
- 确认文件是否上传到根目录
- 等待几分钟让 GitHub Pages 生效

### 样式不加载
- 检查文件路径是否正确
- 确认所有资源文件都已上传

### 自定义域名问题
- 检查 CNAME 文件内容
- 确认 DNS 设置已生效（可能需要几分钟到几小时）

## 更新网站

1. **修改文件**
   - 在本地修改 HTML、CSS、JS 文件

2. **重新部署**
   - 重新上传文件到 GitHub
   - 或使用 git 命令：
     ```bash
     git add .
     git commit -m "Update content"
     git push origin main
     ```

## 注意事项

1. **文件结构**
   - 所有文件必须在仓库根目录
   - 保持原始目录结构

2. **资源引用**
   - 使用相对路径引用资源
   - 避免使用绝对路径

3. **浏览器缓存**
   - 更新后可能需要清除浏览器缓存
   - 或使用无痕模式查看

## 技术支持

- GitHub Pages 文档：https://docs.github.com/en/pages
- 自定义域名文档：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

**部署完成后，你的网站将在几分钟内可以通过互联网访问！**