//导入mongodb模块
const mongodb = require('mongodb');

//引入config.json文件，获取数据库的连接地址与数据库名称
// const {
//     DBurl,
//     DBname
// } = require('../../config.json');
const DBurl = "mongodb://127.0.0.1:27017";
const DBname = "team_reactProject";

//获取mongo客户端
const {
    MongoClient,
    ObjectId
} = mongodb;

//连接mongoDB
const connect = function () {
    //返回一个promise对象
    return new Promise(function (resolve, reject) {
        //连接数据库,client为连接数据库的客户端
        MongoClient.connect(DBurl, async function (err, client) {
            //连接失败时抛出错误信息，默认为nill
            if (err) throw err;

            //连接一个数据库，没有这个数据则自动创建
            let db = client.db(DBname);

            //成功连接之后返回db与client
            resolve({
                db,
                client
            });
        })
    })
}

//@增
exports.insert = async function (clcName, data, type = false) {
    //连接数据库，获取客户端与数据库对象
    let {
        db,
        client
    } = await connect();

    //获取集合
    let collection = db.collection(clcName); //clcName集合的名称

    //执行插入语句
    let result;
    if (type) {
        result = await collection.insertMany(data);
    } else {
        result = await collection.insertOne(data); //data需要插入的数据
    }

    //执行完成之后，关闭客户端连接，释放资源，并且返回插入结果
    client.close();
    return result;
}

//@删
exports.remove = async function (clcName, query = {}, type = false) {
    //连接数据库，获取客户端与数据库
    let {
        db,
        client
    } = await connect();

    //获取集合
    let collection = db.collection(clcName); //clcName集合的名称

    //针对id进行处理
    if (query._id) {
        query._id = ObjectId(query._id);
    }

    //执行删除语句
    let result;
    if (type) {
        //query为查询条件，删除符合查询条件的数据
        result = await collection.deleteMany(query);
    } else {
        result = await collection.deleteOne(query);
    }

    //关闭客户端连接并且返回删除结果
    client.close();
    return result;
}

//@改
exports.update = async function (clcName, query = {}, data, type = false) {
    //连接数据库，获取数据库与客户端
    let {
        db,
        client
    } = await connect();

    //获取集合
    let collection = db.collection(clcName); //clcName集合名称

    //针对id进行处理,query为查询条件
    if (query._id) {
        query._id = ObjectId(query._id);
    }

    //执行修改语句
    let result;
    if (type) {
        result = await collection.updateMany(query, data); //data新数据
    } else {
        result = await collection.updateOne(query, data);
    }

    //关闭连接并且返回修改信息
    client.close();
    return result;
}

//@查
exports.find = async function (clcName, query = {}, {
    sort,
    limit,
    skip,
    asc
} = {}) {
    //获取客户端与数据库
    let {
        db,
        client
    } = await connect();

    //获取集合
    let collection = db.collection(clcName); //clcName集合的名称

    //针对id进行处理,query为查询条件
    if (query._id) {
        query._id = ObjectId(query._id);
    }

    //执行查询语句
    let result = collection.find(query);

    //筛选
    //sort:按sort进行排序
    //asc为1表示升序，为-1表示降序
    //limit限制数量
    //skip跳过指定数量
    if (sort) {
        //opt = {price:1}
        let opt = {};
        opt[sort] = asc ? 1 : -1;
        result = result.sort(opt);
    }

    if (limit) {
        result = result.limit(limit);
    }

    if (skip) {
        result = result.skip(skip);
    }

    // 将查询到的数据转换成数组
    let data = await result.toArray();

    //关闭连接并且返回数据
    client.close();
    return data;
}