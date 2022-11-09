let https = require('https');
let px = require('px');
let fs = require('fs');

https.get('https://pxweb.stat.si/SiStatData/Resources/PX/Databases/Data/0701084S.PX', (res,err,data) => {
    res.on('data', data => {
        
        peiks = new px(data.toString());
        peiks.variables();
        peiks.values('MESEC');
        
        let zacetek = peiks.dataDict([0, '*']);
        
        try {
            fs.writeFileSync('./zacetek.json', JSON.stringify(zacetek))
        } catch(err) {
            console.err(err);
        }
    });
});

https.get('https://pxweb.stat.si/SiStatData/Resources/PX/Databases/Data/0701099S.PX', (res,err,data) => {
    res.on('data', data => {
        peiks = new px(data.toString());
        peiks.variables();
        peiks.values('MESEC');

        let konec = peiks.dataDict([0, '*']);

        try {
            fs.writeFileSync('./danes.json', JSON.stringify(konec))
        } catch(err) {
            console.err(err);
        }
    });
});