document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        themeToggle: document.getElementById('themeToggle'),
        backToTop: document.getElementById('backToTop'),
        projectCards: document.querySelectorAll('.project-card'),
        projectShowcase: document.getElementById('projectShowcase'),
        showcaseTitle: document.getElementById('showcaseTitle'),
        showcaseTechStack: document.getElementById('showcaseTechStack'),
        showcaseStory: document.getElementById('showcaseStory'),
        showcaseLearnings: document.getElementById('showcaseLearnings'),
        closeShowcase: document.getElementById('closeShowcase'),
        heroTitle: document.querySelector('#hero h2'),
        backgroundAnimation: document.querySelector('.background-animation')
    };

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
            title: "Bi-Frost AI",
            techStack: ["Qiskit", "Python", "IBM Quantum Experience", "Machine Learning"],
            story: "Quantum Leap was born from a fascination with the potential of quantum computing to solve complex problems. This project explores practical applications of quantum algorithms in various fields.",
            learnings: "Through this project, I gained hands-on experience with quantum computing frameworks and deepened my understanding of quantum algorithms. It also taught me the importance of staying at the forefront of emerging technologies."
        }
    };

    elements.projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            showProjectDetails(projectId);
        });
    });

    function showProjectDetails(projectId) {
        const details = projectDetails[projectId];

        elements.showcaseTitle.textContent = details.title;
        elements.showcaseTechStack.innerHTML = details.techStack.map(tech => `<span class="tech-stack-label">${tech}</span>`).join('');
        elements.showcaseStory.textContent = details.story;
        elements.showcaseLearnings.textContent = details.learnings;

        elements.projectShowcase.classList.remove('hidden');
        setTimeout(() => {
            elements.projectShowcase.classList.add('active');
            elements.projectShowcase.querySelector('div').classList.add('showcase-enter-active');
        }, 10);
    }

    elements.closeShowcase.addEventListener('click', () => {
        elements.projectShowcase.classList.remove('active');
        elements.projectShowcase.querySelector('div').classList.add('showcase-exit-active');
        setTimeout(() => {
            elements.projectShowcase.classList.add('hidden');
            elements.projectShowcase.querySelector('div').classList.remove('showcase-enter-active', 'showcase-exit-active');
        }, 300);
    });

    elements.themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            elements.backToTop.classList.remove('hidden');
        } else {
            elements.backToTop.classList.add('hidden');
        }
    });

    elements.backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function fadeInOnScroll() {
        elements.projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight * 0.8) {
                card.classList.add('visible');
            }
        });
    }

    const icons = ['code', 'database', 'server', 'cpu', 'hard-drive', 'terminal'];
    for (let i = 0; i < 10; i++) {
        createIcon();
    }

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    const heroText = elements.heroTitle.textContent;
    elements.heroTitle.textContent = '';
    elements.heroTitle.classList.add('typing-effect');

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < heroText.length) {
            elements.heroTitle.textContent += heroText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            elements.heroTitle.classList.remove('typing-effect');
        }
    }
    typeWriter();

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

        elements.backgroundAnimation.appendChild(iconWrapper);
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
});