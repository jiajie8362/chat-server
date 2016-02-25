class User {
  static discover(auth) {
    return Promise.try(() => {
      switch (auth.credential.type) {
        case 'vnd.mideo.credential/facebook':
          return this.discoverFacebookUser(auth);
        default:
          throw new ResponseError(400, `Unknown auth credential type ${auth.credential.type}`);
      }
    });
  }

  static discoverFacebookUser(auth) {
    let profile;

    return this.validateFacebookUser(auth)
    .then(res => {
      profile = __.defaults(res, __.pick(auth.client, ['deviceType', 'deviceId', 'country']));
      return this.fetchById('facebook:' + profile.id);
    })
    .then(res => {
      profile = __.defaults(profile, { avatar: '', name: '', country: '', gender: 'unknown', birthday: moment() });

      if (res != null) {
        this.update('facebook:' + profile.id, { avatar: profile.avatar });
        return res;
      }

      return this.create({
        user_id: 'facebook:' + profile.id,
        avatar: profile.avatar,
        display_name: profile.name,
        country: profile.country,
        gender: profile.gender,
        birthday: new Date(profile.birthday)
      })
      .then(() => this.fetchById('facebook:' + profile.id));
    });
  }

  static validateFacebookUser(auth) {
    return Promise.retry(() => {
      return Components.superAgent
        .post('https://graph.facebook.com/')
        .send(`access_token=${auth.credential.token}`)
        .send('batch=[{"method": "get", "relative_url": "me"}, {"method": "get", "relative_url": "me/picture?redirect=false%26width=300%26height=300"}]')
        .send('format=json')
        .set({
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36'
        })
        .end()
        .then(res => {
          if (res.status !== 200) {
            throw new ResponseError(403, `Invalid facebook user token ${auth.credential.token}`);
          } else {
            const outter = JSON.parse(res.text);
            const profile = JSON.parse(outter[0].body);
            const photo = JSON.parse(outter[1].body);
            profile.avatar = photo.data.url;

            if (profile.id === null || profile.id === undefined) {
              throw new ResponseError(403, 'Facebook user profile not contain user id');
            }
            return profile;
          }
        });
    });
  }
  }

export default User;
