const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      for (let i=0; i < newCollection.length; i++) {
        callback(newCollection[i])
      }

      return collection
    },

    map: function(collection, callback) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection)
      }

      const newArray = [];

      for (let i=0; i < collection.length; i++) {
        newArray.push(callback(collection[i]))
      }
      return newArray;
    },

    reduce: function(x = [], callback = () => {}, y) {
      let collection = x.slice(0);

      if (!y) {
        y = collection[0];
        collection = collection.slice(1);
      }
      
      for (let i=0; i < collection.length; i++) {
        y = callback(y, collection[i], collection)
      }
      return y
    },

    find: function(collection, value) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection)
      }

      for (let i=0; i < collection.length; i++) {
        if (value(collection[i])) return collection[i]

      }
      return undefined
    },

    filter: function(collection, value) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection);
      }

      const newArray = [];

      for (let i=0; i < collection.length; i++) {
        if (value(collection[i])) newArray.push(collection[i])
      }
      return newArray;
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length;
    },

    first: function(collection, stop=false) {
      return (stop) ? collection.slice(0, stop) : collection[0];
    },

    last: function(collection, start=false) {
      return (start) ? collection.slice(collection.length - start, collection.length) : collection[collection.length - 1];
    },

    compact: function(collection) {
      const remove = new Set([false, null, 0, "", NaN, undefined]);
      return collection.filter(e => !remove.has(e))
    },

    sortBy: function(collection, callback) {
      const newArray = [...collection];
      return newArray.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    flatten: function(collection, valid, newArray = []) {
      if (!Array.isArray(collection)) return newArray.push(collection);

      if (valid) {
        for (let el of collection) 
          Array.isArray(el) ? this.unpack(newArray, el) :newArray.push(el)
        } else {
          for (let el of collection) {
            this.flatten(el, false, newArray)
          }
        }
      
      return newArray
    },

    unpack: function(x, array) {
      for (let el of array) {
        x.push(el)
      }
    },

    uniq: function(collection, sorted=false, value=false) {
      if (sorted) {
        return fi.uniqSorted(collection, value)
      } else if (!value) {
        return Array.from(new Set(collection))
      } else {
        const edited = new Set();
        const uniques = new Set();

        for (let x of collection) {
          const newValue = value(x);
          if(!edited.has(newValue)) {
            edited.add(newValue)
            uniques.add(x)
          }
        }
        return Array.from(uniques)
      }
    },

    keys: function(object) {
      const keys = [];
      for (let key in object) {
        keys.push(key)
      }
      return keys
    },

    values: function(object) {
      const values = [];
      for (let val in object) {
        values.push(object[val])
      }
      return values
    },

    functions: function(object) {
      const functionNames = [];

      for (let key in object) {
        if (typeof object[key] === "function") {
          functionNames.push(key)
        }
      }
      return functionNames
    },
  }
})()

fi.libraryMethod()
