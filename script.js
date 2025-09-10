const terminal = document.getElementById('terminal');
const outputContainer = document.getElementById('output-container');
const commandInput = document.getElementById('command-input');
const textRuler = document.getElementById('text-ruler');

const commands = {
    'ajuda': `Comandos disponíveis:\n  <span class="title">sobre</span>      - Exibe informações sobre mim\n  <span class="title">projetos</span>   - Lista meus principais projetos\n  <span class="title">habilidades</span>- Mostra minhas competências técnicas\n  <span class="title">contato</span>    - Informações para entrar em contato\n  <span class="title">limpar</span>     - Limpa a tela do terminal (ou use Ctrl+L)\n  <span class="title">ajuda</span>      - Mostra esta lista de comandos`,
    'sobre': `Prazer! Me chamo João Pedro e sou um desenvolvedor de software!\n\nSou apaixonado por tecnologia desde os meus 3 anos de idade e hoje eu estudo a área de desenvolvimento\nde softwares com foco em JavaScript, Python, C# e o banco de dados SQL.`,
    'projetos': `Página em construção! Em breve, aqui estarão meus projetos para exposição.`,
    'habilidades': `Minhas competências incluem:\n\n<span class="title">Linguagens:</span>      JavaScript, Python, SQL\n<span class="title">Front-End:</span>       HTML/CSS\n<span class="title">Back-End:</span>        Node.js\n<span class="title">Bancos de Dados:</span> MySQL\n<span class="title">DevOps:</span>          Git`,
    'contato': `Minhas redes de contato para trabalharmos juntos! ;)\n\n<span class="title">Email:</span>    <a href="mailto:codecollares@gmail.com">codecollares@gmail.com</a>\n<span class="title">GitHub:</span>   <a href="https://github.com/codecollares" target="_blank">github.com/codecollares</a>\n<span class="title">LinkedIn:</span> <a href="https://linkedin.com/in/codecollares" target="_blank">linkedin.com/in/codecollares</a>`,
    'umbreon':  `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡖⠤⢄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢦⠀⠀⢉⣳⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⣴⠋⢀⣤⣾⣶⡄⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠲⣟⣁⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣿⣿⡄⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⠚⠛⢛⠿⢦⣄⡀⠀⠀\n⢹⠒⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠠⡤⠤⠤⠤⠤⠤⣞⣁⠀⠀⠀⠰⡘⢽⣿⢿⣆⠀\n⠀⡇⠀⠀⠉⠑⠢⣤⣀⠀⠀⠀⣀⠤⠒⠉⠁⢸⠀⠀⡇⠀⠀⠀⠀⠀⣀⣬⣥⠄⠀⠀⠈⠓⠭⠼⠻⣄\n⠀⠸⡀⠀⡐⠀⠀⢸⠀⠉⢦⣄⠈⠉⠒⠢⠤⣈⣦⣠⣳⣀⡤⠴⠚⢹⠁⠁⠁⠀⢟⠿⣿⢛⠆⠀⠀⢿\n⠀⠀⠱⡀⠀⠀⢀⠜⠀⠀⢸⠀⠑⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠱⠟⠋⠀⣠⡶⠁\n⠀⠀⠀⠹⡖⠒⠁⠀⠀⠀⡜⠀⠀⠈⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠠⡤⠚⠁⠀⠀\n⠀⠀⠀⠀⠈⠲⣤⠤⣴⠊⠀⡈⠒⠙⠈⣦⠤⠤⠤⠤⣀⣀⠀⠀⣀⠜⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠁⠒⠤⢄⣀⣀⡀⠀⠘⠆⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠀⠙⢳⣸⠀⢀⠔⠉⠆⠀⡼⠀⠀⠀⠀⣷⠀⢀⡴⢢⠀⡼⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠃⠀⠀⠀⡏⢀⡎⣴⡿⢐⡴⠉⠉⣿⣿⣶⣿⠀⡜⣰⡏⣷⠃⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠁⠀⠀⠀⡰⠧⣼⢸⢴⣡⠟⠀⠀⠀⢸⣿⣿⣿⡆⡇⣧⢢⠏⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠔⣻⠑⡀⢙⡺⠟⠁⠀⠀⠀⠀⣼⣿⣿⡏⢧⠳⢴⡞⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⡀⡇⠀⢧⡎⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⡌⢠⠀⡇⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡄⠀⢿⡀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢯⠛⢣⠘⠀⠇⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠦⢄⣈⣳⡄⠈⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⠺⡆⠀⠸⢄⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣄⣀⣀⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠒⠂⠼⠃⠀⠀⠀⠀`,
    'limpar': () => {
        outputContainer.innerHTML = '';
        return '';
    }
};

const welcomeMessage = `Bem-vindo ao Collacritty, meu terminal de acesso. c:\nDigite '<span class="title">ajuda</span>' para ver a lista de comandos disponíveis.\n`;

function printOutput(html) {
     const line = document.createElement('div');
     line.classList.add('line', 'output');
     line.innerHTML = html;
     outputContainer.appendChild(line);
     terminal.scrollTop = terminal.scrollHeight; 
}

function adjustInputWidth() {
    textRuler.textContent = commandInput.value;
    const newWidth = Math.max(1, textRuler.offsetWidth); 
    commandInput.style.width = `${newWidth}px`;
}

function handleCommand(command) {
    printOutput(`<span class="prompt">devcollares@portfolio:~$</span> <span class="command-input">${command}</span>`);

    if (command in commands) {
        const output = commands[command];
        const result = (typeof output === 'function') ? output() : output;
        if (result) printOutput(result);
    } else {
        printOutput(`Comando não encontrado: ${command}. Digite 'ajuda' para ver a lista.`);
    }

    commandInput.value = '';
    adjustInputWidth();
}

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value.trim().toLowerCase();
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
        commands.limpar();
    }
});

printOutput(welcomeMessage);
adjustInputWidth();