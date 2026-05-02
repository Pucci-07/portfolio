// LocalStorage management
const storage = {
    save: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    load: function(key) {
        return JSON.parse(localStorage.getItem(key));
    }
};
