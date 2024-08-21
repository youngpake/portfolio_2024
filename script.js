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
        showcaseVisitButton: document.getElementById('showcaseVisitButton'),
        closeShowcase: document.getElementById('closeShowcase'),
        heroTitle: document.querySelector('#hero h2'),
        backgroundAnimation: document.querySelector('.background-animation'),
        projectsLinks: document.querySelectorAll('a[href="#projects"]'),
        projectsSection: document.getElementById('projects'),
        hireMeLinks: document.querySelectorAll('a[href="#hire-me"]'),
    };

    const projectDetails = {
        1: {
            title: "Voyager Dashboard",
            techStack: [
                "Python",
                "Django",
                "Web Scrapers",
                "PostgreSQL",
                "Bootstrap",
                "Highcharts.js",
                "Azure Functions",
                "Contabo VPS",
                "Linux",
                "GPT 3.5",
                "Relational Databases",
                "Data Regulations",
                "JavaScript",
            ],
            story: "After mastering web scraping, I tried using GPT-3.5 to link market moves to news articles. The AI always found a link, even when there wasn't one, so I switched to analyzing overall market sentiment. I developed advanced scraping techniques to gather data from various websites, successfully scraping every site I encountered.",
            learnings: "As the project grew, I learned about designing larger systems to avoid slowing down. I explored different cloud platforms, starting with Azure, then a Contabo VPS for better resources at lower cost. However, unexpected data regulations made me switch to Heroku. This journey taught me about various hosting options and server configuration, while also improving my skills in building scalable systems.",
            url: "https://voyager-terminal.com/"
        },
        2: {
            title: "Risk of Ruin Simulator",
            techStack: ["HTML", "CSS", "JavaScript", "Statistics", "Probability"],
            story: "I created this tool because I couldn't find any risk of ruin simulators that allowed for floating point risks or rewards, which I needed. Since it could be built as a static website, I was able to develop it within a day without much hassle.",
            learnings: "This project taught me that the top search results aren't always the best websites - they're often just the ones earning the most from ads or selling user data. It also showed me how quickly a useful tool can be built when keeping it simple and focused on solving a specific problem.",
            url: "https://youngpake.github.io/risk_of_ruin/"
        },
        3: {
            title: "Cypher FOMC Tracker",
            techStack: ["Python", "Django", "Webscrapers", "PostgreSQL", "FRED API", "Highcharts.js", "JavaScript", "Selenium", "GPT-4", "Relational Databases", "Data Regulations"],
            story: "This project analyzes FOMC meeting transcripts from the Federal Reserve using GPT-4. It extracts key datasets and potential future actions based on specific conditions mentioned. For example, it might identify a statement like 'We'll cut interest rates next meeting if unemployment rises more than 1%'. The system then fetches relevant data (like unemployment stats), calculates year-over-year, month-over-month, and year-to-date statistics, and evaluates the conditions as true, false, or pending. It also highlights current economic bottlenecks and accelerators.",
            learnings: "I discovered that interpreting Federal Reserve statements becomes more of an art than a science beyond a certain point. This was a significant realization in my learning journey. The project also improved my skills in natural language processing, data analysis, and integrating various APIs and technologies.",
            url: "https://cypher-terminal.com/"
        },
        4: {
            title: "Bi-Frost AI",
            techStack: ["Python", "GPT", "Web Scraping", "Stripe API", "Data Regulations"],
            story: "I created this project to explore how well GPT could analyze someone's entire online footprint and extract insights about their personality. The goal was to see if AI could form a comprehensive understanding of a person based on their digital presence. Development was smooth and enjoyable, making it a fun project to work on.",
            learnings: "This project taught me how to integrate Stripe for payments, which was a key learning objective. I also gained insights into AI's capabilities for personality analysis and improved my skills in handling and processing large amounts of online data.",
            url: "https://bi-frost.ai/"
        }
    };
    elements.projectCards.forEach(card => {
        card.addEventListener('click', () => {
            showProjectDetails(card.dataset.project);
        });
    });

    function smoothScroll(target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function showProjectDetails(projectId) {
        const details = projectDetails[projectId];
    
        elements.showcaseTitle.textContent = details.title;
        elements.showcaseTechStack.innerHTML = details.techStack.map(tech => 
            `<span class="tech-stack-label">${tech}</span>`
        ).join('');
        elements.showcaseStory.textContent = details.story;
        elements.showcaseLearnings.textContent = details.learnings;
    
        if (elements.showcaseVisitButton) {
            elements.showcaseVisitButton.href = details.url;
            elements.showcaseVisitButton.classList.remove('hidden');
        }
    
        elements.projectShowcase.classList.remove('hidden');
        setTimeout(() => elements.projectShowcase.classList.add('active'), 10);
    }

    elements.closeShowcase.addEventListener('click', () => {
        elements.projectShowcase.classList.remove('active');
        setTimeout(() => elements.projectShowcase.classList.add('hidden'), 300);
    });

    elements.themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const isDarkMode = storedTheme === 'dark' || (storedTheme === null && prefersDarkMode);

    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', () => {
        elements.backToTop.classList.toggle('hidden', window.pageYOffset <= 300);
    });

    elements.backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function fadeInOnScroll() {
        elements.projectCards.forEach(card => {
            if (card.getBoundingClientRect().top < window.innerHeight * 0.8) {
                card.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();

    const heroText = elements.heroTitle.textContent;
    elements.heroTitle.textContent = '';
    elements.heroTitle.classList.add('typing-effect');

    (function typeWriter(index = 0) {
        if (index < heroText.length) {
            elements.heroTitle.textContent += heroText[index];
            setTimeout(() => typeWriter(index + 1), 100);
        } else {
            elements.heroTitle.classList.remove('typing-effect');
        }
    })();

    const icons = ['code', 'database', 'server', 'cpu', 'hard-drive', 'terminal'];
    
    function createIcon() {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'icon-wrapper';
        iconWrapper.style.cssText = `
            position: absolute;
            opacity: 0.2;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;

        const icon = document.createElement('i');
        icon.dataset.feather = icons[Math.floor(Math.random() * icons.length)];
        const size = Math.random() * 30 + 20;
        icon.style.cssText = `width: ${size}px; height: ${size}px;`;

        iconWrapper.appendChild(icon);
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

    for (let i = 0; i < 10; i++) {
        createIcon();
    }

    if (elements.projectsLinks.length > 0 && elements.projectsSection) {
        elements.projectsLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScroll(elements.projectsSection);
            });
        });
    }
});