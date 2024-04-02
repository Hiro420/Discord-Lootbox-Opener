import axios from 'axios';

export const colorize = new (class {
    color = (code: number, ended = false, ...messages: any[]) =>
    `\x1b[${code}m${messages.join(" ")}${ended ? "\x1b[0m" : ""}${ended ? "" : "\x1b[0m"}`;
    black = this.color.bind(null, 30, false);
    red = this.color.bind(null, 31, false);
    green = this.color.bind(null, 32, false);
    yellow = this.color.bind(this, 33, false);
    blue = this.color.bind(this, 34, false);
    magenta = this.color.bind(this, 35, false);
    cyan = this.color.bind(this, 36, false);
    white = this.color.bind(this, 37, false);
    bgBlack = this.color.bind(this, 40, true);
    bgRed = this.color.bind(this, 41, true);
    bgGreen = this.color.bind(this, 42, true);
    bgYellow = this.color.bind(this, 43, true);
    bgBlue = this.color.bind(this, 44, true);
    bgMagenta = this.color.bind(this, 45, true);
    bgCyan = this.color.bind(this, 46, true);
    bgWhite = this.color.bind(this, 47, true);
})();

const itemMap: any = {
    '1214340999644446720': "Buster Blade",
    '1214340999644446721': "Cute Plushie",
    '1214340999644446722': "Wump Shell",
    '1214340999644446723': "Speed Boost",
    '1214340999644446724': "⮕⬆⬇⮕⬆⬇",
    '1214340999644446725': "Power Helmet",
    '1214340999644446726': "Quack!!",
    '1214340999644446727': "OHHHHH BANANA",
    '1214340999644446728': "Dream Hammer"
}

async function postData() {
    const url = 'https://canary.discord.com/api/v9/users/@me/lootboxes/open';
    const headers = {
        'Authorization': '', // here you put your token
        'X-Super-Properties': 'eyJjbGllbnRfYnVpbGRfbnVtYmVyIjoyODA2MTJ9'
    };

    const response = await axios.post(url, {}, { headers: headers });
    return response.data;
}

let intervalCount = 0;

async function mainFunction() {
    const startTime = Date.now(); 
    try {
        const data = await postData();
        console.clear();
        const item = data.opened_item;
        intervalCount++;
        console.log('Opened:', colorize.green(itemMap[item]));
        console.log('Items Count:');
        const itemIds = Object.keys(data.user_lootbox_data.opened_items).sort();
        for (const itemId of itemIds) {
            const itemName = itemMap[itemId];
            if (itemName) {
                console.log(`${colorize.magenta(itemName)} - ${colorize.green(data.user_lootbox_data.opened_items[itemId])}`);
            }
        }
    } catch (error) {
        console.log('Error:', error);
        setTimeout(mainFunction, 200);
        return;
    } finally {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        console.log(`Opened ${intervalCount}th box in ${elapsedTime}ms`);
        setTimeout(mainFunction, 2100 + elapsedTime);
    }
}

mainFunction();
