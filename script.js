document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const projectCards = document.querySelectorAll('.project-card');
    const projectShowcase = document.getElementById('projectShowcase');
    const showcaseTitle = document.getElementById('showcaseTitle');
    const showcaseTechStack = document.getElementById('showcaseTechStack');
    const showcaseStory = document.getElementById('showcaseStory');
    const showcaseLearnings = document.getElementById('showcaseLearnings');
    const closeShowcase = document.getElementById('closeShowcase');

    const projectDetails = {
        1: {
            title: "Voyager Dashboard",
            techStack: ["Django", "Webscrapers", "PostgreSQL", "Bootstrap", "Highcharts.js"],
            story: "I created this project to address the growing need for efficient data management in small businesses. The challenge was to design a user-friendly interface that could handle complex data operations.",
            learnings: "Through this project, I deepened my understanding of full-stack development and learned the importance of user-centered design in creating effective business solutions."
        },
        2: {
            title: "Risk Of Ruin Simulator",
            techStack: ["HTML", "CSS", "JavaScript"],
            story: "This project was born out of a desire to apply cutting-edge AI technology to solve real-world industry problems. I wanted to create a tool that could predict maintenance needs in manufacturing equipment.",
            learnings: "I gained valuable experience in machine learning and data analysis. This project also taught me the importance of collaborating with domain experts to create truly impactful solutions."
        },
        3: {
            title: "Cypher FOMC Tracker",
            techStack: ["Django", "Webscrapers", "PostgreSQL", "FRED API", "Highcharts.js", "Selenium"],
            story: "The goal of this project was to reimagine the user experience for a popular productivity app. I wanted to create an interface that was not only visually appealing but also highly intuitive and efficient.",
            learnings: "This project significantly improved my UI/UX design skills and taught me the value of iterative design and user testing in creating successful digital products."
        },
        4: {
            title: "Quantum Leap",
            techStack: ["Qiskit", "Python", "IBM Quantum Experience", "Machine Learning"],
            story: "Quantum Leap was born from a fascination with the potential of quantum computing to solve complex problems. This project explores practical applications of quantum algorithms in various fields.",
            learnings: "Through this project, I gained hands-on experience with quantum computing frameworks and deepened my understanding of quantum algorithms. It also taught me the importance of staying at the forefront of emerging technologies."
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            showProjectDetails(projectId);
        });
    });

    function showProjectDetails(projectId) {
        const details = projectDetails[projectId];

        showcaseTitle.textContent = details.title;
        showcaseTechStack.innerHTML = details.techStack.map(tech => `<span class="tech-stack-label">${tech}</span>`).join('');
        showcaseStory.textContent = details.story;
        showcaseLearnings.textContent = details.learnings;

        projectShowcase.classList.remove('hidden');
        setTimeout(() => {
            projectShowcase.classList.add('active');
            projectShowcase.querySelector('div').classList.add('showcase-enter-active');
        }, 10);
    }

    closeShowcase.addEventListener('click', () => {
        projectShowcase.classList.remove('active');
        projectShowcase.querySelector('div').classList.add('showcase-exit-active');
        setTimeout(() => {
            projectShowcase.classList.add('hidden');
            projectShowcase.querySelector('div').classList.remove('showcase-enter-active', 'showcase-exit-active');
        }, 300);
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // Set initial theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Staggered animation for project cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => observer.observe(card));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Typing effect for hero section
    const heroTitle = document.querySelector('#hero h2');
    const heroText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('typing-effect');

    let i = 0;
    function typeWriter() {
        if (i < heroText.length) {
            heroTitle.textContent += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            heroTitle.classList.remove('typing-effect');
        }
    }
    typeWriter();

    // Background animation
    const backgroundAnimation = document.querySelector('.background-animation');
    const icons = ['code', 'database', 'server', 'cpu', 'hard-drive', 'terminal'];
    
    function createIcon() {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'icon-wrapper';
        iconWrapper.style.position = 'absolute';
        iconWrapper.style.opacity = '0.2';
        
        const icon = document.createElement('i');
        icon.dataset.feather = icons[Math.floor(Math.random() * icons.length)];
        iconWrapper.appendChild(icon);
        
        const size = Math.random() * 30 + 20;
        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
        
        iconWrapper.style.left = `${Math.random() * 100}%`;
        iconWrapper.style.top = `${Math.random() * 100}%`;
        
        backgroundAnimation.appendChild(iconWrapper);
        feather.replace();
        
        animateIcon(iconWrapper);
    }
    
    function animateIcon(iconWrapper) {
        const duration = Math.random() * 20 + 10;
        const xMove = Math.random() * 100 - 50;
        const yMove = Math.random() * 100 - 50;
        
        iconWrapper.animate([
            { transform: 'translate(0, 0) rotate(0deg)' },
            { transform: `translate(${xMove}px, ${yMove}px) rotate(360deg)` }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
    }
    
    for (let i = 0; i < 10; i++) {
        createIcon();
    }
});