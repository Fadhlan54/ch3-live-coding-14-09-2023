const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////////////////
//  files dengan fs

// blocking code execution -> synchronous
// const textIn = fs.readFileSync('./txt/read-this.txt', 'utf-8');
// console.log(textIn);

// const textOut = `ini tuh penjelasan tentang alpukat dalam bahasa inggris: ${textIn}`;
// fs.writeFileSync('./txt/output-penjelasan.txt', textOut);
// console.log('sukses nyetak data avocado!');

// non-blocking code execution -> asynchronous
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         if (err) throw err;
//         console.log(data2);
//         fs.writeFile(`./txt/gabungan.txt`, `${data}\n${data2}`, err => {
//             console.log(`sukses menggabungkan data`);
//         });
//         fs.readFile(`./txt/final.txt`, 'utf-8', (err, data3) => {
//             if (err) throw err;
//             fs.writeFile('./txt/gabungan2.txt', `${data2}\n${data3}`, err => {
//                 if (err) throw err;
//                 console.log(`sukses menggabungkan data dari read-this.txt dan final.txt`);
//             })
//         });
//     });
// });


//////////////////////////////////////
// SERVER dengan http

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/hello') {
        res.end('ini hello ke FSW 2');
    } else if (pathName === '/product') {
        res.end(JSON.stringify({
            data: 'ini product',
        }));
    } else if (pathName === '/api') {
        const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
        res.writeHead(200, {
            'Content-type': 'application/json',

        });
        res.end(data);
    } else if (pathName === '/overview') {
        const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`);
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end(overviewPage);
    }
    else {
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.end('<h1>url ini gak ada apa apa</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('server sedang berjalan di port 8000');
});