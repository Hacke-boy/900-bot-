import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import pino from "pino"
import fs from "fs"

// ====== SYSÈM MODULE YO ======
import { handlePVP } from "./modules/pvp.js"
import { handleRoulette } from "./modules/roulette.js"
import { handleTournoi } from "./modules/tournoi.js"
import { handleClanWelcome } from "./modules/clan.js"

// ====== BOT ======
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session")

    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        logger: pino({ level: "silent" })
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async (msg) => {
        const m = msg.messages[0]
        if (!m.message || m.key.fromMe) return

        const text = m.message.conversation || m.message.extendedTextMessage?.text || ""

        const sender = m.key.remoteJid

        // ====== COMMANDS ======
        if (text.startsWith("!pvp")) return handlePVP(sock, sender)
        if (text.startsWith("!roulette")) return handleRoulette(sock, sender)
        if (text.startsWith("!tournoi")) return handleTournoi(sock, sender, text)
        if (text.startsWith("!welcome")) return handleClanWelcome(sock, sender)
    })
}

startBot()
