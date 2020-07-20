module.exports = (req, res) => {
    const { channel = 'codinggarden' } = req.query;
    res.status(200).send(`channel: ${channel}`);
}