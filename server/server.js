const express = require("express");

const router = require("./route");

let app = express();

app.use(express.static("./"));
app.use(router);

app.listen(1902, () => {
    console.log("服务开启成功，端口号为：" + 1902);
})