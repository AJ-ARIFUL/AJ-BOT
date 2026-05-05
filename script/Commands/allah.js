module.exports = {
    config: {
        name: "allah",
        description: "আল্লাহর 99 নাম দেখুন"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        
        const names = [
            "1. আর-রহমান - পরম দয়ালু", "2. আর-রহিম - অতিশয় মেহেরবান", "3. আল-মালিক - সর্বকর্তৃত্বময়",
            "4. আল-কুদ্দুস - নিষ্কলুষ", "5. আস-সালাম - শান্তি দানকারী", "6. আল-মু'মিন - নিরাপত্তা দানকারী",
            "7. আল-মুহাইমিন - রক্ষণাবেক্ষণকারী", "8. আল-আযীয - পরাক্রমশালী", "9. আল-জাব্বার - পরাক্রান্ত",
            "10. আল-মুতাকাব্বির - মহিমান্বিত"
        ];
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        api.sendMessage(`☪️ আল্লাহর পবিত্র নাম ☪️\n━━━━━━━━━━━━━━━\n${randomName}\n\n!allah লিখে আরো দেখুন`, threadID, messageID);
    }
}
