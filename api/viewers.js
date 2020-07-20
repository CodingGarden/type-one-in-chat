module.exports = (req, res) => {
    const clientid = '91rougkc35nq63ygvxrix9kxzno4y9';
    const { channel = 'codinggarden' } = req.query;
    const headers = {
        'Client-ID': '91rougkc35nq63ygvxrix9kxzno4y9',
        'Accept': 'application/vnd.twitchtv.v5+json'
    }
    const user_id = await fetch('https://api.twitch.tv/kraken/users', {
        method: 'GET',
        headers: headers
    }).then(res => {
        return res.json().then(data => {
            return data.users['_id'];
        });
    });
}