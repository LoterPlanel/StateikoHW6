/**
 * Created by PC on 26.10.2017.
 */


var basil = require('basil.js');
basil = new basil();

exports.write = function (key, value) {
    basil.set(key, value);
}

exports.read = function (key) {
    return basil.get(key);
}