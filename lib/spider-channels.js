"use strict";
(function () {
    function Channel() {
        this.values = [];
        this.listeners = [];
        this.get = function () {
            if (this.values.length > 0) {
                return Promise.resolve(this.values.pop());
            } else {
                return new Promise((resolve) => {
                    this.listeners.push(resolve);
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