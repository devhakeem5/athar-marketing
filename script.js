/**
 * ==========================================
 * وكالة أثر للتسويق والإعلان - JavaScript
 * Athar Marketing Agency - Interactive Script
 * ==========================================
 */

// ====== Wait for DOM to Load ======
document.addEventListener('DOMContentLoaded', function () {

    // ====== Theme Toggle (Dark/Light Mode) ======
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // تحميل الثيم المحفوظ من localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    // دالة تبديل الثيم
    themeToggle.addEventListener('click', function () {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // إضافة animation للزر
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });


    // ====== Mobile Menu Toggle ======
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    mobileMenuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // إغلاق القائمة عند الضغط على أي رابط
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });


    // ====== Header Scroll Effect ======
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // إضافة shadow للهيدر عند السكرول
        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }

        lastScrollTop = scrollTop;
    });


    // ====== Scroll to Top Button ======
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ====== Smooth Scroll for All Links ======
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ====== Contact Form Handling ======
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // جمع بيانات النموذج
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // عرض رسالة نجاح (يمكن استبدالها بإرسال حقيقي للبيانات)
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.', 'success');

        // إعادة تعيين النموذج
        contactForm.reset();

        // في حالة وجود Backend، يمكن إرسال البيانات هنا
        // console.log('Form Data:', formData);
    });


    // ====== Notification Function ======
    function showNotification(message, type = 'success') {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;

        // إضافة الأنماط
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#10B981' : '#EF4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            font-family: 'Cairo', sans-serif;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s;
            max-width: 350px;
        `;

        // إضافة الإشعار للصفحة
        document.body.appendChild(notification);

        // إزالة الإشعار بعد 3 ثواني
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }


    // ====== Scroll Animations ======
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // مراقبة العناصر للـ animation
    const animatedElements = document.querySelectorAll('.service-card, .why-us-card, .about-text, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });


    // ====== Active Nav Link on Scroll ======
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // إزالة active من جميع الروابط
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });

                // إضافة active للرابط الحالي
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.style.color = 'var(--primary-orange)';
                }
            }
        });
    });


    // ====== Form Input Validation & Effects ======
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

    formInputs.forEach(input => {
        // تأثير focus
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.01)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        // إزالة التأثير عند blur
        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });

        // Validation في الوقت الفعلي
        input.addEventListener('input', function () {
            if (this.validity.valid) {
                this.style.borderColor = '#10B981';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });


    // ====== Add CSS Animations ======
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);


    // ====== Console Welcome Message ======
    console.log('%c🎨 وكالة أثر للتسويق والإعلان', 'font-size: 20px; font-weight: bold; color: #E77654;');
    console.log('%cAthar Marketing Agency', 'font-size: 16px; color: #174964;');
    console.log('%cWebsite developed with ❤️ using HTML, CSS, and JavaScript', 'font-size: 12px; color: #666;');

});


// ====== Prevent Right Click (Optional - للحماية) ======
// يمكن تفعيل هذا إذا أردت منع النسخ
/*
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
*/


// ====== Loading Performance ======
window.addEventListener('load', function () {
    console.log('✅ الموقع تم تحميله بنجاح');

    // إخفاء شاشة التحميل إذا كانت موجودة
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});
