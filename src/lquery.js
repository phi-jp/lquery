/*
 * lquery.js
 */

;(function() {

    var lQuery = function() {
        var obj = new lQuery.creator();
        obj.init.apply(obj, arguments);
        return obj;
    };

    lQuery.creator = function(query) {
        return this;
    };

    lQuery.creator.prototype = {
        init: function(query) {
            if (typeof query == 'string') {
                this.domElement = document.querySelector(query);
            }
            else if (query instanceof HTMLElement) {
                this.domElement = query;
            }
        },

        query: function(query) {
            return lQuery(this.domElement.querySelector(query));
        },

        attr: function() {
            return this;
        },

        on: function(eventName, callback) {
            return this;
        },

        off: function() {

        },

        data: function() {
            return this;
        },

        show: function() {
            return this;
        },

        hide: function() {
            return this;
        },

        append: function(element) {
            this.domElement.appendChild(element.domElement);
            return this;
        },

        appendTo: function(element) {
            element.append(this);
            return this;
        },

        create: function(tagName, isAppend) {
            isAppend = (isAppend !== undefined) ? isAppend : true;

            var element = document.createElement(tagName);
            if (isAppend) {
                this.domElement.appendChild(element);
            }

            return lQuery(element);
        },

        remove: function() {
            return this;
        },

        getElement: function() {
            return this.domElement;
        },
    };

    Object.defineProperty(lQuery.creator.prototype, "html", {
        get: function()  { return this.domElement.innerHTML; },
        set: function(v) { this.domElement.innerHTML = v; }
    });

    Object.defineProperty(lQuery.creator.prototype, "value", {
        get: function()  { return this.domElement.value; },
        set: function(v) { this.domElement.value = v; }
    });

    Object.defineProperty(lQuery.creator.prototype, "text", {
        get: function()  { return this.domElement.textContent; },
        set: function(v) { this.domElement.textContent = v; }
    });

    Object.defineProperty(lQuery.creator.prototype, "parent", {
        get: function()  { return lQuery(this.domElement.parent); },
    });

    Object.defineProperty(lQuery.creator.prototype, "children", {
        get: function()  {
            return lQuery.fromArray(this.domElement.children);
        },
    });


    // static methods

    lQuery.id = function(id) {
         return lQuery(document.getElementById('id'));
    };
    lQuery.class = function(className, index) {
         return lQuery(document.getElementsByClassName(className)[index || 0]);
    };
    lQuery.classAll = function(className) {
         return lQuery.fromArray(document.getElementsByClassName(className));
    };
    lQuery.query = function(query) {
         return lQuery(document.querySelector(query));
    };
    lQuery.queryAll = function(id) {
        return lQuery.fromArray( document.querySelectorAll(query) );
    };
    lQuery.create = function(tagName) {
         return lQuery( document.createElement(tagName) );
    };


    lQuery.fromArray = function(elements) {
        var arr = [];

        Array.prototype.forEach.call(elements, function(elm) {
            arr.push(lQuery(elm));
        });

        return arr;
    };

    // add to global
    window.lQuery = window.$ = lQuery;

    /*
    lQuery.id = function(id) {
         return document.getElementById('id');
    };
    lQuery.class = function(className, index) {
         return document.getElementsByClassName(className)[index || 0];
    };
    lQuery.classAll = function(className) {
         return document.getElementsByClassName(className);
    };
    lQuery.query = function(query) {
         return document.querySelector(query);
    };
    lQuery.queryAll = function(id) {
        return document.querySelectorAll(query);
    };
    lQuery.create = function(tagName) {
         return document.createElement(tagName);
    };
    */

})(this);
