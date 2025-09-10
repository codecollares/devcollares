const terminal = document.getElementById('terminal');
const outputContainer = document.getElementById('output-container');
const commandInput = document.getElementById('command-input');
const textRuler = document.getElementById('text-ruler');

const commands = {
    'ajuda': `Comandos disponíveis:\n  <span class="title">sobre</span>      - Exibe informações sobre mim\n  <span class="title">projetos</span>   - Lista meus principais projetos\n  <span class="title">habilidades</span>- Mostra minhas competências técnicas\n  <span class="title">contato</span>    - Informações para entrar em contato\n  <span class="title">limpar</span>     - Limpa a tela do terminal (ou use Ctrl+L)\n  <span class="title">ajuda</span>      - Mostra esta lista de comandos`,
    'sobre': `Olá! Meu nome é [Seu Nome].\nSou um Engenheiro de Software apaixonado por criar soluções elegantes e eficientes. Meu foco é no desenvolvimento web full-stack, com experiência em JavaScript, Python e nas melhores práticas de DevOps.\nFora do código, sou um entusiasta de [Seu Hobby].`,
    'projetos': `Aqui estão alguns dos meus projetos:\n\n<span class="title">1. Nome do Projeto Um</span>\n   Descrição: Um app de e-commerce completo com foco em performance.\n   Tecnologias: Next.js, Node.js, PostgreSQL, Tailwind CSS\n   Link: <a href="#" target="_blank">demo.projeto1.com</a>\n\n<span class="title">2. Nome do Projeto Dois</span>\n   Descrição: Uma plataforma de análise de dados em tempo real.\n   Tecnologias: Vue.js, Firebase, D3.js\n   Link: <a href="#" target="_blank">demo.projeto2.com</a>\n\n<span class="title">3. Nome do Projeto Três</span>\n   Descrição: API para um aplicativo móvel de rede social.\n   Tecnologias: Python, Flask, Docker, MongoDB\n   Link: <a href="#" target="_blank">api.projeto3.com</a>`,
    'habilidades': `Minhas competências incluem:\n\n<span class="title">Linguagens:</span>      JavaScript, TypeScript, Python, SQL\n<span class="title">Front-End:</span>       React, Next.js, Vue.js, HTML/CSS\n<span class="title">Back-End:</span>        Node.js, Express, Flask, Django\n<span class="title">Bancos de Dados:</span> PostgreSQL, MongoDB, Redis\n<span class="title">DevOps:</span>          Docker, Git, CI/CD, AWS`,
    'contato': `Vamos nos conectar!\n\n<span class="title">Email:</span>    <a href="mailto:seuemail@example.com">seuemail@example.com</a>\n<span class="title">GitHub:</span>   <a href="https://github.com/seu-usuario" target="_blank">github.com/seu-usuario</a>\n<span class="title">LinkedIn:</span> <a href="https://linkedin.com/in/seu-usuario" target="_blank">linkedin.com/in/seu-usuario</a>`,
    'limpar': () => {
        outputContainer.innerHTML = '';
        return '';
    }
};

const welcomeMessage = `Bem-vindo ao meu portfólio!\nDigite '<span class="title">ajuda</span>' para ver a lista de comandos disponíveis.\n`;

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
    printOutput(`<span class="prompt">visitante@portfolio:~$</span> <span class="command-input">${command}</span>`);

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