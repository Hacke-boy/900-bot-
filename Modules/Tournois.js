let tournoi = []

export function handleTournoi(sock, chat, text) {
    if (text === "!tournoi créer") {
        tournoi = []
        return sock.sendMessage(chat, { text: "🎉 Tournoi créé !\nUtilisez *!tournoi rejoindre* pour entrer." })
    }

    if (text === "!tournoi rejoindre") {
        if (tournoi.includes(chat)) {
            return sock.sendMessage(chat, { text: "⚠️ Ou deja nan tournoi a !" })
        }

        tournoi.push(chat)
        return sock.sendMessage(chat, { text: "✅ Ou antre nan tournoi a !" })
    }

    if (text === "!tournoi liste") {
        if (tournoi.length === 0) {
            return sock.sendMessage(chat, { text: "Aucun joueur inscrit..." })
        }

        let list = tournoi.map((p, i) => `${i + 1}. ${p}`).join("\n")
        return sock.sendMessage(chat, { text: `📜 *Liste joueurs tournoi :*\n${list}` })
    }
}
