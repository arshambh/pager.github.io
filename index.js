// https://tp.money-bbc.workers.dev/?url=https://jsonip.com/
// https://url-result.pages.dev/?url=https://jsonip.com/
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const getRequestUrl = url.search.replace("?url=", "");
        var res = await fetchUrl(getRequestUrl);
        return res;
    }
};
function isNullOrEmpty(str) {
    return str === null || str === '';
}


function getRandomUserAgent() {
    const operatingSystems = {
        desktop: [
            "Windows NT 10.0; Win64; x64",
            "Macintosh; Intel Mac OS X 10_15_7"
        ],
        mobile: [
            "Linux; Android 10",
            "iPhone; CPU iPhone OS 14_0 like Mac OS X"
        ]
    };

    const browsers = {
        desktop: [
            "Chrome",
            "Firefox",
            "Safari",
            "Edge"
        ],
        mobile: [
            "Chrome",
            "Firefox",
            "Safari"
        ]
    };

    const browserVersions = {
        "Chrome": () => `Chrome/${Math.floor(Math.random() * 50) + 50}.0.${Math.floor(Math.random() * 4000) + 1000}.121`,
        "Firefox": () => `Firefox/${Math.floor(Math.random() * 50) + 50}.0`,
        "Safari": () => `Version/${Math.floor(Math.random() * 14) + 10}.0 Safari/605.1.15`,
        "Edge": () => `Edg/${Math.floor(Math.random() * 50) + 80}.0.${Math.floor(Math.random() * 1000) + 1000}.62`
    };

    // Randomly choose between desktop and mobile
    const deviceType = Math.random() < 0.5 ? 'desktop' : 'mobile';

    const randomOS = operatingSystems[deviceType][Math.floor(Math.random() * operatingSystems[deviceType].length)];
    const randomBrowser = browsers[deviceType][Math.floor(Math.random() * browsers[deviceType].length)];
    const randomVersion = browserVersions[randomBrowser]();

    return `Mozilla/5.0 (${randomOS}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomVersion}`;
}

async function fetchUrl(url) {
    try {
        const userAgent = getRandomUserAgent();
        const headers = {
            'User-Agent': userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': '1'
        };

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        let data;
        if (contentType === 'text/json') {
            data = await response.json();
        } else {
            data = await response.text();
        }
        return new Response(data, {
            status: 200,
            headers: {
                'Content-Type': contentType,
            }
        });
    } catch (error) {
        // console.error('Fetch error:', error);
        return new Response(error, {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            }
        });
        //return new Response("The site is being updated... We will be back soon.....!", {
        //    status: 200,
        //    headers: {
        //        'Content-Type': 'text/html',
        //    }
        //});
    }
}

