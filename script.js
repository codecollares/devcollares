document.addEventListener('DOMContentLoaded', () => {

    const terminal = document.getElementById('terminal');
    const outputContainer = document.getElementById('output-container');
    const commandInput = document.getElementById('command-input');
    const textRuler = document.getElementById('text-ruler');
    const btnPT = document.getElementById('lang-pt');
    const btnEN = document.getElementById('lang-en');

    const i18n = {
        'pt': {
            welcomeMessage: `Bem-vindo ao Collacritty, meu terminal de acesso. c:\\nDigite '<span class="title">ajuda</span>' para ver a lista de comandos disponíveis.\\n`,
            commandNotFound: (command) => `Comando não encontrado: ${command}. Digite 'ajuda' para ver a lista.`,
            commands: {
                'ajuda': `Comandos disponíveis:\\n  <span class="title">sobre</span>      - Exibe informações sobre mim\\n  <span class="title">projetos</span>   - Lista meus principais projetos\\n  <span class="title">habilidades</span>- Mostra minhas competências técnicas\\n  <span class="title">contato</span>    - Informações para entrar em contato\\n  <span class="title">limpar</span>     - Limpa a tela do terminal (ou use Ctrl+L | Cmd+L no macOS)\\n  <span class="title">ajuda</span>      - Mostra esta lista de comandos`,
                'sobre': `Prazer! Me chamo João Pedro e sou um desenvolvedor de software!\\n\\nSou apaixonado por tecnologia desde os meus 3 anos de idade e hoje eu estudo a área de desenvolvimento\\n de softwares com foco em JavaScript, Python, C# e o banco de dados SQL.`,
                'projetos': `<span class="title">Site de Pet Shop</span>\\nUma página desenvolvida para apresentar uma pet shop fictícia.\\nTecnologias utilizadas: HTML, CSS e JavaScript.\\nLink: <a href="https://github.com/codecollares/sitePetShop" target="_blank">github.com/codecollares/sitePetShop</a>\\n\\n<span class="title">Gerador de tabuadas</span>\\nUma página com um gerador de tabuadas conforme o número inserido pelo usuário.\\nTecnologias utilizadas: HTML, CSS e JavaScript.\\nLink: <a href="https://github.com/codecollares/tabuada" target="_blank">github.com/codecollares/tabuada</a>\\n\\n<span class="title">Wash my?</span>\\nUma página desenvolvida para apresentar diferentes opções de Wash my _ _ _ _.\\nTecnologias utilizadas: HTML, CSS, JavaScript e APIs.\\nLink: <a href="https://github.com/codecollares/washmywhat" target="_blank">github.com/codecollares/washmywhat</a>`,
                'habilidades': `Minhas competências incluem:\\n\\n<span class="title">Linguagens:</span>    JavaScript, Python, SQL, C#\\n<span class="title">Front-End:</span>    HTML/CSS\\n<span class="title">Back-End:</span>     Node.js, JavaScript\\n<span class="title">Bancos de Dados:</span> MySQL\\n<span class="title">DevOps:</span>       Git`,
                'contato': `Minhas redes de contato para trabalharmos juntos! ;)\\n\\n<span class="title">Email:</span>      <a href="mailto:devcollares@proton.me">devcollares@proton.me</a>\\n<span class="title">GitHub:</span>     <a href="https://github.com/codecollares" target="_blank">github.com/codecollares</a>\\n<span class="title">LinkedIn:</span>   <a href="https://linkedin.com/in/codecollares" target="_blank">linkedin.com/in/codecollares</a>`,
                'umbreon':  `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡖⠤⢄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢦⠀⠀⢉⣳⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⣴⠋⢀⣤⣾⣶⡄⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠲⣟⣁⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣿⣿⡄⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⠚⠛⢛⠿⢦⣄⡀⠀⠀\n⢹⠒⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠠⡤⠤⠤⠤⠤⠤⣞⣁⠀⠀⠀⠰⡘⢽⣿⢿⣆⠀\n⠀⡇⠀⠀⠉⠑⠢⣤⣀⠀⠀⠀⣀⠤⠒⠉⠁⢸⠀⠀⡇⠀⠀⠀⠀⠀⣀⣬⣥⠄⠀⠀⠈⠓⠭⠼⠻⣄\n⠀⠸⡀⠀⡐⠀⠀⢸⠀⠉⢦⣄⠈⠉⠒⠢⠤⣈⣦⣠⣳⣀⡤⠴⠚⢹⠁⠁⠁⠀⢟⠿⣿⢛⠆⠀⠀⢿\n⠀⠀⠱⡀⠀⠀⢀⠜⠀⠀⢸⠀⠑⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠱⠟⠋⠀⣠⡶⠁\n⠀⠀⠀⠹⡖⠒⠁⠀⠀⠀⡜⠀⠀⠈⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠠⡤⠚⠁⠀⠀\n⠀⠀⠀⠀⠈⠲⣤⠤⣴⠊⠀⡈⠒⠙⠈⣦⠤⠤⠤⠤⣀⣀⠀⠀⣀⠜⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠁⠒⠤⢄⣀⣀⡀⠀⠘⠆⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠀⠙⢳⣸⠀⢀⠔⠉⠆⠀⡼⠀⠀⠀⠀⣷⠀⢀⡴⢢⠀⡼⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠃⠀⠀⠀⡏⢀⡎⣴⡿⢐⡴⠉⠉⣿⣿⣶⣿⠀⡜⣰⡏⣷⠃⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠁⠀⠀⠀⡰⠧⣼⢸⢴⣡⠟⠀⠀⠀⢸⣿⣿⣿⡆⡇⣧⢢⠏⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠔⣻⠑⡀⢙⡺⠟⠁⠀⠀⠀⠀⣼⣿⣿⡏⢧⠳⢴⡞⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⡀⡇⠀⢧⡎⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⡌⢠⠀⡇⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡄⠀⢿⡀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢯⠛⢣⠘⠀⠇⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠦⢄⣈⣳⡄⠈⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⠺⡆⠀⠸⢄⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣄⣀⣀⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠒⠂⠼⠃⠀⠀⠀⠀`,
                'limpar': () => {
                    outputContainer.innerHTML = '';
                    return '';
                }
            }
        },
        'en': {
            welcomeMessage: `Welcome to Collacritty, my access terminal. c:\\nType '<span class="title">help</span>' to see the list of available commands.\\n`,
            commandNotFound: (command) => `Command not found: ${command}. Type 'help' to see the list.`,
            commands: {
                'help': `Available commands:\\n  <span class="title">about</span>      - Displays information about me\\n  <span class="title">projects</span>   - Lists my main projects\\n  <span class="title">skills</span>     - Shows my technical skills\\n  <span class="title">contact</span>    - Information to get in touch\\n  <span class="title">clear</span>      - Clears the terminal screen (or use Ctrl+L | Cmd+L for macOS)\\n  <span class="title">help</span>       - Shows this list of commands`,
                'about': `Nice to meet you! I'm João Pedro, a software developer.\\n\\nI've been passionate about technology since I was 3 years old, and today I study software development, focusing on JavaScript, Python, C#, and SQL.`,
                'projects': `<span class="title">Pet Shop Website</span>\\nA page developed to introduce a imaginary pet shop.\\nTechnologies used: HTML, CSS and JavaScript.\\nLink: <a href="https://github.com/codecollares/sitePetShop" target="_blank">github.com/codecollares/sitePetShop</a>\\n\\n<span class="title">Multiplication Table Generator</span>\\nA page that generates a multiplication table of the number you put in there.\\nTechnologies used: HTML, CSS and JavaScript.\\nLink: <a href="https://github.com/codecollares/tabuada" target="_blank">github.com/codecollares/tabuada</a>\\n\\n<span class="title">Wash my?</span>\\nA page developed to show different options of Wash my _ _ _ _.\\nTechnologies used: HTML, CSS, JavaScript and APIs.\\nLink: <a href="https://github.com/codecollares/washmywhat" target="_blank">github.com/codecollares/washmywhat</a>`,
                'skills': `My skills include:\\n\\n<span class="title">Languages:</span>    JavaScript, Python, SQL, C#\\n<span class="title">Front-End:</span>    HTML/CSS\\n<span class="title">Back-End:</span>     Node.js, JavaScript\\n<span class="title">Databases:</span>    MySQL, PostgreSQL\\n<span class="title">DevOps:</span>       Git`,
                'contact': `Here are my contact links for us to work together! ;)\\n\\n<span class="title">Email:</span>      <a href="mailto:devcollares@proton.me">devcollares@proton.me</a>\\n<span class="title">GitHub:</span>     <a href="https://github.com/codecollares" target="_blank">github.com/codecollares</a>\\n<span class="title">LinkedIn:</span>   <a href="https://linkedin.com/in/codecollares" target="_blank">linkedin.com/in/codecollares</a>`,
                'umbreon': `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡖⠤⢄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢦⠀⠀⢉⣳⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⣴⠋⢀⣤⣾⣶⡄⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠲⣟⣁⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣿⣿⡄⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⠚⠛⢛⠿⢦⣄⡀⠀⠀\n⢹⠒⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠠⡤⠤⠤⠤⠤⠤⣞⣁⠀⠀⠀⠰⡘⢽⣿⢿⣆⠀\n⠀⡇⠀⠀⠉⠑⠢⣤⣀⠀⠀⠀⣀⠤⠒⠉⠁⢸⠀⠀⡇⠀⠀⠀⠀⠀⣀⣬⣥⠄⠀⠀⠈⠓⠭⠼⠻⣄\n⠀⠸⡀⠀⡐⠀⠀⢸⠀⠉⢦⣄⠈⠉⠒⠢⠤⣈⣦⣠⣳⣀⡤⠴⠚⢹⠁⠁⠁⠀⢟⠿⣿⢛⠆⠀⠀⢿\n⠀⠀⠱⡀⠀⠀⢀⠜⠀⠀⢸⠀⠑⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠱⠟⠋⠀⣠⡶⠁\n⠀⠀⠀⠹⡖⠒⠁⠀⠀⠀⡜⠀⠀⠈⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠠⡤⠚⠁⠀⠀\n⠀⠀⠀⠀⠈⠲⣤⠤⣴⠊⠀⡈⠒⠙⠈⣦⠤⠤⠤⠤⣀⣀⠀⠀⣀⠜⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠁⠒⠤⢄⣀⣀⡀⠀⠘⠆⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠀⠙⢳⣸⠀⢀⠔⠉⠆⠀⡼⠀⠀⠀⠀⣷⠀⢀⡴⢢⠀⡼⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠃⠀⠀⠀⡏⢀⡎⣴⡿⢐⡴⠉⠉⣿⣿⣶⣿⠀⡜⣰⡏⣷⠃⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠁⠀⠀⠀⡰⠧⣼⢸⢴⣡⠟⠀⠀⠀⢸⣿⣿⣿⡆⡇⣧⢢⠏⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠔⣻⠑⡀⢙⡺⠟⠁⠀⠀⠀⠀⣼⣿⣿⡏⢧⠳⢴⡞⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⡀⡇⠀⢧⡎⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⡌⢠⠀⡇⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡄⠀⢿⡀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢯⠛⢣⠘⠀⠇⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠦⢄⣈⣳⡄⠈⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⠺⡆⠀⠸⢄⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣄⣀⣀⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠒⠂⠼⠃⠀⠀⠀⠀`,
                'clear': () => {
                    outputContainer.innerHTML = '';
                    return '';
                }
            }
        }
    };

    let currentLang = 'pt';
    let commands = i18n[currentLang].commands;

    function setLanguage(lang) {
        if (i18n[lang]) {
            currentLang = lang;
            commands = i18n[currentLang].commands;
            outputContainer.innerHTML = '';
            printOutput(i18n[currentLang].welcomeMessage);
            btnPT.classList.toggle('active', lang === 'pt');
            btnEN.classList.toggle('active', lang === 'en');
            commandInput.focus();
        }
    }

    function printOutput(html, customClass = null) {
        const line = document.createElement('div');
        line.classList.add('line', 'output');
        if (customClass) {
            line.classList.add(customClass);
        }
  
        if (customClass !== 'ascii-art') {
             html = html.replace(/\\n/g, '<br>');
        }
        line.innerHTML = html;
        outputContainer.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    function adjustInputWidth() {
        textRuler.textContent = commandInput.value;
        const newWidth = textRuler.offsetWidth;
        commandInput.style.width = `${newWidth}px`;
    }

    function handleCommand(command) {
        const lowerCaseCommand = command.toLowerCase();
        const outputLine = document.createElement('div');
        outputLine.classList.add('line');
        outputLine.innerHTML = `<span class="prompt">devcollares@portfolio:~$</span> <span class="command-input">${command}</span>`;
        outputContainer.appendChild(outputLine);

        if (lowerCaseCommand in commands) {
            const output = commands[lowerCaseCommand];
            const result = (typeof output === 'function') ? output() : output;
            if (result) {
                if (lowerCaseCommand === 'umbreon') {
                    printOutput(result, 'ascii-art');
                } else {
                    printOutput(result);
                }
            }
        } else {
            printOutput(i18n[currentLang].commandNotFound(command));
        }

        commandInput.value = '';
        adjustInputWidth();
        terminal.scrollTop = terminal.scrollHeight;
    }

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                handleCommand(command);
            }
        }
    });

    commandInput.addEventListener('input', adjustInputWidth);

    terminal.addEventListener('click', () => {
        commandInput.focus();
    });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            commands.clear ? commands.clear() : commands.limpar();
        }
    });

    btnPT.addEventListener('click', () => setLanguage('pt'));
    btnEN.addEventListener('click', () => setLanguage('en'));

    function initializeTerminal() {
        const userLang = navigator.language.startsWith('en') ? 'en' : 'pt';
        setLanguage(userLang);
    }

    initializeTerminal();
    adjustInputWidth();
    commandInput.focus();
});