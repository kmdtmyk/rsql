export default class LocalStorage{

  constructor(name){
    this.name = name
  }

  get(key){
    return LocalStorage.get(this._storageKey(key))
  }

  set(key, value){
    LocalStorage.set(this._storageKey(key), value)
  }

  _storageKey(key){
    if(this.name == null || this.name === ''){
      return key
    }
    return `${this.name}#${key}`
  }

  static get(key){
    try{
      return JSON.parse(localStorage.getItem(key))
    }catch(e){
      return null
    }
  }

  static set(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  }

}
