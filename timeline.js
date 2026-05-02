// Random JoJo timeline - changes on every visit

const JOJO_ARCS_DATA = [
    {
        id: 1,
        name: 'Phantom Blood',
        part: 'Part 1',
        protagonist: 'Jonathan Joestar',
        power: 'Hamon',
        villain: 'Dio Brando',
        color: '#8B0000',
        accent: '#FF6B35',
        quote: 'A true gentleman never stoops to the level of his opponent.',
        emoji: '🌹'
    },
    {
        id: 2,
        name: 'Battle Tendency',
        part: 'Part 2',
        protagonist: 'Joseph Joestar',
        power: 'Hamon',
        villain: 'Kars',
        color: '#FF8C00',
        accent: '#FFD700',
        quote: 'Your next line is...',
        emoji: '🌀'
    },
    {
        id: 3,
        name: 'Stardust Crusaders',
        part: 'Part 3',
        protagonist: 'Jotaro Kujo',
        power: 'Star Platinum',
        villain: 'DIO',
        color: '#1a1a2e',
        accent: '#C0A060',
        quote: 'Yare yare daze.',
        emoji: '⭐'
    },
    {
        id: 4,
        name: 'Diamond is Unbreakable',
        part: 'Part 4',
        protagonist: 'Josuke Higashikata',
        power: 'Crazy Diamond',
        villain: 'Yoshikage Kira',
        color: '#FF1493',
        accent: '#FF69B4',
        quote: "Did you just say something rude about my hair?",
        emoji: '💎'
    },
    {
        id: 5,
        name: 'Golden Wind',
        part: 'Part 5',
        protagonist: 'Giorno Giovanna',
        power: 'Gold Experience Requiem',
        villain: 'Diavolo',
        color: '#DAA520',
        accent: '#FFD700',
        quote: 'I, Giorno Giovanna, have a dream!',
        emoji: '🌟'
    },
    {
        id: 6,
        name: 'Stone Ocean',
        part: 'Part 6',
        protagonist: 'Jolyne Cujoh',
        power: 'Stone Free',
        villain: 'Enrico Pucci',
        color: '#228B22',
        accent: '#90EE90',
        quote: 'Stone Free! Let me go!',
        emoji: '🌊'
    },
    {
        id: 7,
        name: 'Steel Ball Run',
        part: 'Part 7',
        protagonist: 'Johnny Joestar',
        power: 'Tusk ACT 4',
        villain: 'Funny Valentine',
        color: '#4169E1',
        accent: '#87CEEB',
        quote: 'I want to stand up... I want to stand up!',
        emoji: '🐎'
    },
    {
        id: 8,
        name: 'JoJolion',
        part: 'Part 8',
        protagonist: 'Josuke Higashikata (Gappy)',
        power: 'Soft & Wet',
        villain: 'Tooru',
        color: '#6A0DAD',
        accent: '#DA70D6',
        quote: 'Soft & Wet!',
        emoji: '🫧'
    }
];

// Pick a random arc (new each session)
function getRandomArc() {
    return JOJO_ARCS_DATA[Math.floor(Math.random() * JOJO_ARCS_DATA.length)];
}

// Render the JoJo timeline banner in the hero section
function renderTimeline() {
    const container = document.getElementById('jojo-timeline');
    if (!container) return;

    const arc = getRandomArc();

    // Apply arc colours to CSS variables
    document.documentElement.style.setProperty('--arc-primary', arc.color);
    document.documentElement.style.setProperty('--arc-accent', arc.accent);

    container.innerHTML = `
        <div class="arc-banner" style="border-color: ${arc.accent}">
            <div class="arc-emoji">${arc.emoji}</div>
            <div class="arc-info">
                <span class="arc-part">${arc.part}</span>
                <h2 class="arc-name">${arc.name}</h2>
                <p class="arc-protagonist">Protagoniste : <strong>${arc.protagonist}</strong></p>
                <p class="arc-power">Pouvoir : <strong>${arc.power}</strong></p>
                <blockquote class="arc-quote">"${arc.quote}"</blockquote>
            </div>
            <div class="arc-badge">🎲 Arc aléatoire</div>
        </div>
    `;
}
