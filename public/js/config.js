var QBApp = {
  appId: 36105,
  authKey: '8Mt-m89xcSmgWDJ',
  authSecret: '2N6a3hLEkdNGgq8'
};

var config = {
  chatProtocol: {
    active: 2
  },
  debug: {
    mode: 1,
    file: null
  }
};

var QBUser1 = {
        id: 6729114,
        name: 'quickuser',
        login: 'chatusr11',
        pass: 'chatusr11',
        token:'CAAY83gvCy7wBABIYEuYMWu7CGsicyYUZAjDaDCWGeet1PAZCIr8ZCIXrHvOlx6O3WdCmMYitZAhdpy3DggYsrdEwfuPBDWMIQZCu1uh0Cwe6xbwdXLZAP8Aih9eVrGtnKRKPjNBSqasghZCCnNUZCD2z1ZAhp1vC7Mbr3DRtMcIvyt3CMtypQrM0Iv4KOHDHunyZBZApBKBZCKcNVwZDZD'
    },
    QBUser2 = {
        id: 6729119,
        name: 'bloxuser',
        login: 'chatusr22',
        pass: 'chatusr22'
    };

QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret, config);
