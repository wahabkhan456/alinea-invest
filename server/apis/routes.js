const Alpaca = require('@alpacahq/alpaca-trade-api');
const express = require('express');
const admin = require('firebase-admin');
const credentials = require('../stock-firebase.json');
const { API_KEY, API_SECRET } = require('../config');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const router = express.Router();
const firestore = admin.firestore();

const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
    usePolygon: false
})

router.get('/popularstocks', async (req, res) => {
    try {
        const stocks = await alpaca.getPositions();
        const popularStocks = stocks.slice(0, 5);
        const popularStocksWithName = await Promise.all(popularStocks.map(async stock => {
            const popularAsset = await alpaca.getAsset(stock.symbol);
            return { ...stock, name: popularAsset.name }
        }));

        res.send(popularStocksWithName);
    } catch (err) {
        res.send(err);
    }
});

router.get('/filterstocks', async (req, res) => {
    try {
        const stocks = await alpaca.getPositions();
        const stocksWithName = await Promise.all(stocks.map(async stock => {
            const asset = await alpaca.getAsset(stock.symbol);
            return { ...stock, name: asset.name }
        }));
        const sortedStocks = stocksWithName.filter(stock => stock.name.toLowerCase().includes(req.query.search));
        const docs = await firestore.collection(req.query.id).get();
        docs.forEach(doc => {
            if (sortedStocks.findIndex(stock => stock.symbol === doc.id) !== -1) {
                sortedStocks.splice(sortedStocks.findIndex(stock => stock.symbol === doc.id), 1);
            }
        });
        res.send(sortedStocks.slice(0, 10));
    } catch (err) {
        res.send(err);
    }
});

router.get('/getstocks', async (req, res) => {
    try {
        let array = [];
        let docs = await firestore.collection(req.query.id).get();
        docs.forEach(doc => array.push(doc.data()));
        res.send(array);
    } catch (err) {
        res.send(err);
    }
});

router.post('/addstock', async (req, res) => {
    try {
        await firestore.collection(req.query.id).doc(req.body.symbol).set(req.body);
        res.send('Success');
    } catch (err) {
        res.send(err);
    }
});

router.get('/deletestock', async (req, res) => {
    try {
        await firestore.collection(req.query.id).doc(req.query.symbol).delete();
        res.send('Success');
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;