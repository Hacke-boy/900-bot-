export function handlePVP(sock, chat) {
    const players = ["Joueur A", "Joueur B", "Joueur C", "Joueur D"]
    const shuffled = players.sort(() => Math.random() - 0.5)

    const p1 = shuffled[0]
    const p2 = shuffled[1]

    sock.sendMessage(chat, { text: `🔥 *MATCH PVP !*\n\n${p1} VS ${p2}\n\nChwazi map Free Fire, bonne chance !` })
}
