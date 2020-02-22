import SecureLS from "secure-ls";

const ls = new SecureLS({
  encodingType: "aes"
});

const customStorage = {
  getItem: key => {
    return new Promise((resolve, reject) => {
      resolve(ls.get(key));
    });
  },
  setItem: (key, item) => {
    return new Promise((resolve, reject) => {
      resolve(ls.set(key, item));
    });
  },
  removeItem: key => {
    return new Promise((resolve, reject) => {
      resolve(ls.remove(key));
    });
  }
};

export default customStorage;
