module.exports = (req, res) => {
    const { channel = 'codinggarden' } = req.query;
    const headers = {
        'Client-ID': '91rougkc35nq63ygvxrix9kxzno4y9',
        'Accept': 'application/vnd.twitchtv.v5+json'
    }
    fetch(`https://api.twitch.tv/kraken/users?login=${channel}`, {
        method: 'GET',
        headers: headers
    }).then(res => {
        res.json().then(data => {
            console.log(data.users['_id']);
        });
    });
}