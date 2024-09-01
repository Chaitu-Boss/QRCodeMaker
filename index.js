import qr from "qr-image"
import express from "express"
import bodyParser from "body-parser";
import fs from "fs"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("page.ejs")
})

app.get('/qr', (req, res) => {
    const url = req.query.url;
    const qrSvg = qr.image(url, { type: 'svg' });
    res.type('svg');
    qrSvg.pipe(res);
});

app.post("/download", (req, res) => {
    const url = req.body['website']
    res.render("download.ejs",{url:encodeURIComponent(url)})
})

app.listen(port, () => {
    console.log(`File is Runnig On port ${port}`)
})
