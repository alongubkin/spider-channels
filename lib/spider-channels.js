"use strict";
(function () {
    function Channel() {
        this.values = [];
        this.listeners = [];
        this.get = function () {
            if (this.values.length > 0) {
                return Promise.resolve(this.values.pop());
            } else {
                let self = this;
                return new Promise(function (resolve) {
                    self.listeners.push(resolve);
                });
            }
        };
        this.push = function (x) {
            if (this.listeners.length > 0) {
                this.listeners.pop()(x);
            } else {
                this.values.push(x);
            }
        };
    }
    if (typeof exports !== "undefined" && exports !== null) {
        exports.Channel = Channel;
    }
}());