module.exports = {
    config: {
        name: "decode",
        description: "Base64 ডিকোড করুন",
        usage: "{p}decode [base64 text]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const encoded = args.join(" ");
        if (!encoded) return api.sendMessage("Base64 টেক্সট দিন:!decode SGVsbG8=", threadID, messageID);
        
        try {
            const decoded = Buffer.from(encoded, 'base64').toString('utf8');
            api.sendMessage(`🔓 ডিকোড রেজাল্ট:\n━━━━━━━━━━━━━━━\n${decoded}`, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ ভ্যালিড Base64 না", threadID, messageID);
        }
    }
}
