// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 移动端汉堡菜单交互（优化动画）
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // 切换汉堡/关闭图标
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        // 汉堡按钮震动反馈
        hamburger.style.transform = 'scale(0.9)';
        setTimeout(() => {
            hamburger.style.transform = 'scale(1)';
        }, 200);
    });

    // 点击导航链接关闭菜单
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // 2. 平滑滚动（锚点链接）优化：更精准的偏移
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight - 20, // 额外偏移20px，更舒适
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. 图片懒加载优化（低版本浏览器兼容）
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease';
                    img.onload = () => {
                        img.style.opacity = '1'; // 图片加载完成后淡入
                    };
                    observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级处理：直接加载
        lazyImages.forEach(img => {
            img.src = img.src;
        });
    }

    // 4. 窗口大小变化重置菜单状态
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }
    });

    // 5. 滚动时导航栏样式变化（更细腻的过渡）
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(22, 45, 79, 0.98)';
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(22, 45, 79, 0.9)';
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }

        // 6. 新增：滚动渐显效果
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    });

    // 初始触发一次滚动事件，显示首屏板块
    window.dispatchEvent(new Event('scroll'));
});