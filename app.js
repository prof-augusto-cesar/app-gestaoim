// ==========================================================================
// BANCO DE DADOS OFICIAL - INSTRUMENTO PI.1 (INTELIGÊNCIAS MÚLTIPLAS)
// ==========================================================================
const bancoPerguntas = {
    "Linguística": [
        "Livros ou textos são muito importantes para mim.",
        "Penso muito bem nas palavras antes de falar ou escrever.",
        "Tenho facilidade com LP, ING, ESP ou outra língua estrangeira.",
        "Em uma viagem, as palavras escritas em placas chamam muito minha atenção.",
        "História para mim é mais fácil que Ciências."
    ],
    "Lógico-Matemática": [
        "Livros ou jogos de estratégia ou enigmas são muito importantes para mim.",
        "Penso muito bem nas explicações racionais antes de falar ou escrever.",
        "Tenho facilidade com MAT, INFO ou LÓGICA.",
        "Em uma viagem, formas da natureza, números ou padrões em torres de energia me chamam atenção.",
        "Filosofia para mim é mais fácil que Literatura."
    ],
    "Espacial": [
        "Livros para mim precisam de muitas ilustrações, figuras, mapas, gráficos.",
        "Imagino muito bem a situação antes de falar ou escrever.",
        "Tenho facilidade com ARTE, GEOG ou GEOM.",
        "Em uma viagem, as paisagens chamam muito minha atenção.",
        "Cinema ou Vídeo para mim são mais fáceis do que Teatro."
    ],
    "Corporal-Cinestésica": [
        "Livros não são muito importantes para mim.",
        "Geralmente gesticulo ou uso outras formas de linguagem corporal quando falo ou escrevo.",
        "Tenho facilidade com ESPORTES, DANÇA, TEATRO ou ARTES MANUAIS.",
        "Em uma viagem, não suporto muito tempo sentado ou parado, necessito movimentar-me.",
        "Teatro para mim é mais fácil que Cinema ou Vídeo."
    ],
    "Musical": [
        "Livros são importantes, mas prefiro ouvir uma boa explicação sobre o assunto.",
        "Gosto de falar ou escrever ouvindo música ou rádio.",
        "Tenho facilidade com Canto/Coral, ritmos variados musicais, Percussão/batidas",
        "Em uma viagem, os ruídos, sons da natureza ou cantos musicais chamam muito minha atenção.",
        "Decorar músicas para mim é mais fácil que decorar textos."
    ],
    "Interpessoal": [
        "Livros são importantes, mas prefiro um bom debate/conversa sobre o assunto.",
        "Gosto de falar ou escrever para a multidão.",
        "Tenho facilidade para ensinar outra pessoa sobre algo que sei.",
        "Em uma viagem, as pessoas chamam minha atenção.",
        "Jogos coletivos para mim são mais fáceis que jogos individuais."
    ],
    "Intrapessoal": [
        "Livros e o meu diário/agenda são muito importantes para mim.",
        "Não gosto muito de falar para multidões, gosto mais de refletir e escrever sobre assuntos.",
        "Tenho facilidade com experimentos científicos ou novos negócios.",
        "Em uma viagem, reflito muito sobre minha vida, isoladamente.",
        "Jogos individuais para mim são mais fáceis que jogos coletivos."
    ],
    "Naturalista": [
        "Livros sobre a Natureza são muito importantes para mim.",
        "Gosto de falar tanto com pessoas como com animais.",
        "Tenho facilidade em perceber as diferenças entre diferentes tipos de animais, plantas ou rochas.",
        "Em uma viagem, toda a Natureza chama muito minha atenção.",
        "Ciências ou Biologia para mim são mais fáceis que LP ou MAT."
    ],
    "Existencial": [
        "Livros sobre o Universo/Cosmos ou a natureza humana chamam muito minha atenção.",
        "Gosto de manter-me interconectado \"mente-corpo-espírito\"",
        "Tenho facilidade em manter conexão entre o que digo/falo e o que faço.",
        "Em uma viagem, a harmonia com o todo é o que chama minha atenção.",
        "Filosofia ou Religião para mim são mais fáceis que Literatura ou Esportes."
    ]
};

// Variáveis Globais de Estado do Aplicativo
let dadosUsuario = {};
let graficoInstancia = null;
// ==========================================================================
// INICIALIZAÇÃO E CONTROLE DE FLUXO DE TELAS
// ==========================================================================

// Escuta o carregamento da página para processar e renderizar as perguntas
document.addEventListener("DOMContentLoaded", () => {
    renderizarQuestoesAleatorias();
});

// Monitora dinamicamente a idade inserida para controle legal de menores
document.getElementById('idade').addEventListener('input', function() {
    const blocoResponsavel = document.getElementById('campos-responsavel');
    const inputResponsavel = document.getElementById('nome-responsavel');
    
    if (this.value && parseInt(this.value) < 18) {
        blocoResponsavel.classList.remove('hidden');
        inputResponsavel.setAttribute('required', 'true');
    } else {
        blocoResponsavel.classList.add('hidden');
        inputResponsavel.removeAttribute('required');
        inputResponsavel.value = ""; // Limpa caso tenha sido preenchido
    }
});

// Processamento do Formulário de Cadastro Inicial
// ==========================================================================
// PROCESSAMENTO DO FORMULÁRIO DE CADASTRO (CORRIGIDO)
// ==========================================================================
document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    // Interrompe o comportamento padrão do navegador de recarregar a página
    e.preventDefault();
    e.stopPropagation();
    
    // Captura e monta o objeto do usuário com o carimbo de data/hora oficial
    dadosUsuario = {
        nome: document.getElementById('nome').value.trim(),
        idade: document.getElementById('idade').value,
        responsavel: document.getElementById('nome-responsavel').value.trim() || 'Não aplicável (Maior de idade)',
        whatsapp: document.getElementById('whatsapp').value.trim(),
        email: document.getElementById('email').value.trim(),
        timestamp: new Date().toLocaleString('pt-BR')
    };

    // Remove a classe que esconde a tela do sistema
    const telaSistema = document.getElementById('tela-sistema');
    telaSistema.classList.remove('hidden');

    // Esconde a tela de cadastro inicial
    const telaCadastro = document.getElementById('tela-cadastro');
    telaCadastro.classList.add('hidden');
    
    // Garante que a visualização comece no topo da página de perguntas
    window.scrollTo(0, 0);
    
    return false;
});


// ==========================================================================
// MOTOR DE EMBARALHAMENTO ALEATÓRIO (Algoritmo Fisher-Yates)
// ==========================================================================
function renderizarQuestoesAleatorias() {
    const container = document.getElementById('container-perguntas-aleatorias');
    container.innerHTML = "";
    
    // Transforma o objeto em uma lista única contendo a pergunta e sua etiqueta
    let listaLinearPerguntas = [];
    
    for (const [inteligencia, questoes] of Object.entries(bancoPerguntas)) {
        questoes.forEach((textoQuestao) => {
            listaLinearPerguntas.push({
                texto: textoQuestao,
                categoria: inteligencia
            });
        });
    }
    
    // Executa o embaralhamento estatístico puro
    for (let i = listaLinearPerguntas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listaLinearPerguntas[i], listaLinearPerguntas[j]] = [listaLinearPerguntas[j], listaLinearPerguntas[i]];
    }
    
    // Injeta as perguntas misturadas na interface mantendo a numeração visual de 1 a 45
    listaLinearPerguntas.forEach((item, index) => {
        const linha = document.createElement('label');
        linha.className = 'questao-linha';
        
        linha.innerHTML = `
            <input type="checkbox" data-categoria="${item.categoria}" value="1">
            <span>${index + 1}. ${item.texto}</span>
        `;
        container.appendChild(linha);
    });
}
// ==========================================================================
// MOTOR DE CÁLCULO, RELATÓRIO E INTEGRAÇÃO WHATSAPP
// ==========================================================================

function calcularResultados() {
    const pontuacoes = {};
    const categorias = Object.keys(bancoPerguntas);
    
    // Varre cada uma das 9 inteligências e soma os checkboxes marcados correspondentes
    categorias.forEach(categoria => {
        const marcados = document.querySelectorAll(`input[data-categoria="${categoria}"]:checked`).length;
        pontuacoes[categoria] = marcados; // Valor máximo garantido: 5 por categoria
    });

    // Oculta a área de testes e exibe a tela do relatório final
    document.getElementById('tela-sistema').classList.add('hidden');
    document.getElementById('tela-relatorio').classList.remove('hidden');
    window.scrollTo(0, 0);

    // Injeta os dados cadastrais coletados no topo do relatório
    document.getElementById('dados-relatorio').innerHTML = `
        <p><strong>Nome do Avaliado:</strong> ${dadosUsuario.nome}</p>
        <p><strong>Idade:</strong> ${dadosUsuario.idade} anos</p>
        <p><strong>Responsável Legal:</strong> ${dadosUsuario.responsavel}</p>
        <p><strong>WhatsApp Cadastrado:</strong> ${dadosUsuario.whatsapp}</p>
        <p><strong>E-mail Cadastrado:</strong> ${dadosUsuario.email}</p>
    `;

    // Injeta formalmente o termo de anuência com carimbo temporal inviolável
    document.getElementById('registro-legal').innerHTML = `
        <p><strong>Autorização Legal Registrada:</strong> Autorizado expressamente através de termo de aceite eletrônico na página inicial do portal.</p>
        <p><strong>Data/Hora do Aceite Técnico:</strong> ${dadosUsuario.timestamp}</p>
        <p><strong>Finalidade Documental:</strong> Subsidiar o Projeto Personalizado de Educação para as Inteligências Múltiplas.</p>
    `;

    // ==========================================================================
    // RENDERIZADOR DO GRÁFICO NATIVO IMPRIMÍVEL (CORRIGIDO SEM ERROS)
    // ==========================================================================
    const containerGrafico = document.getElementById('grafico-barras-nativo');
    if (containerGrafico) {
        containerGrafico.innerHTML = ""; // Limpa qualquer resquício anterior

        categorias.forEach(cat => {
            const pontos = pontuacoes[cat]; // Valor de 0 a 5
            
            // Calcula a porcentagem da altura baseado no máximo de 5 pontos
            const percentualAltura = pontos > 0 ? (pontos / 5) * 100 : 5; 

            const coluna = document.createElement('div');
            coluna.className = 'barra-coluna';

            coluna.innerHTML = `
                <div class="barra-preenchimento" style="height: ${percentualAltura}%;">
                    ${pontos}
                </div>
                <div class="barra-label" title="${cat}">${cat}</div>
            `;
            containerGrafico.appendChild(coluna);
        });
    }
}

function enviarWhatsApp() {
    // Insira seu número de WhatsApp profissional com o código do país no início (Ex: 5516...)
    const numeroProfissional = "5516991110376"; 
    
    // Monta a string de mensagem estruturada com formatação do WhatsApp
    const textoMensagem = `*Portal Toda a Vida da Gente - Notificação de Avaliação*\n\n` +
                          `*Avaliado:* ${dadosUsuario.nome}\n` +
                          `*Idade:* ${dadosUsuario.idade} anos\n` +
                          `*Responsável Legal:* ${dadosUsuario.responsavel}\n` +
                          `*Contatos:* ${dadosUsuario.whatsapp} | ${dadosUsuario.email}\n\n` +
                          `*TERMO DE AUTORIZAÇÃO EXPRESSA:* Registrado eletronicamente em: ${dadosUsuario.timestamp}.\n\n` +
                          `_Nota técnica: O relatório clínico oficial e o respectivo gráfico de 0 a 5 pontos foram gerados e salvos localmente na tela do usuário._`;
                          
    // Abre a API oficial do WhatsApp em uma nova aba
    const urlLink = `https://whatsapp.com{numeroProfissional}&text=${encodeURIComponent(textoMensagem)}`;
    
    window.open(urlLink, '_blank');
}

function reiniciar() {
    // Reseta por completo o estado interno e os formulários para uma nova sessão limpa
    document.getElementById('form-cadastro').reset();
    document.getElementById('form-perguntas').reset();
    document.getElementById('campos-responsavel').classList.add('hidden');
    document.getElementById('tela-relatorio').classList.add('hidden');
    document.getElementById('tela-cadastro').classList.remove('hidden');
    renderizarQuestoesAleatorias(); // Embaralha novamente para o próximo teste
    window.scrollTo(0, 0);
}

// ==========================================================================
// FUNÇÃO DE NAVEGAÇÃO ENTRE AS ABAS (ADICIONADA COMPATÍVEL COM FIREFOX)
// ==========================================================================
function mudarAba(abaId) {
    // Esconde todos os conteúdos de abas
    document.querySelectorAll('.aba-conteudo').forEach(el => el.classList.add('hidden'));
    
    // Remove a classe ativa de todos os botões para limpar o visual
    document.querySelectorAll('.aba-btn').forEach(el => el.classList.remove('ativa'));
    
    // Revela o conteúdo correspondente à aba clicada (Ex: em construção)
    const conteudoAlvo = document.getElementById(`conteudo-${abaId}`);
    if (conteudoAlvo) {
        conteudoAlvo.classList.remove('hidden');
    }
    
    // Identifica e ativa o botão correto
    document.querySelectorAll('.aba-btn').forEach(btn => {
        const cliqueAtributo = btn.getAttribute('onclick') || '';
        if (cliqueAtributo.includes(abaId)) {
            btn.classList.add('ativa');
        }
    });
}
