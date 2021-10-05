const axios = require('axios');
require('dotenv').config();

class iFunnyClient {
    constructor () {
        this.apiUrl = 'https://ifunny.co';
        this.headers = { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36' }
        // this.token = await this.getLoginToken();
    }

    async getLoginToken(email, password) {
        return await axios({
            withCredentials: true,
            method: 'post',
            url: `${this.apiUrl}/api/v1/oauth/login`,
            headers: this.headers,
            data: {
                username: email,
                password: password
            }
            })
            .then((res) => {
                res.headers['set-cookie'][0].split(';')[0]
            });
    }
}

;(async () => {
    const client = new iFunnyClient();
    console.log(await client.getLoginToken(process.env.EMAIL, process.env.PASSWORD));
})();