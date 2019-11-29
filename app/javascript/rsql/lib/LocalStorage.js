export default class LocalStorage{

  constructor(name){
    this.name = name
  }

  get(key, type){
    return LocalStorage.get(this._storageKey(key), type)
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

  static get(key, type){
    try{
      const result = JSON.parse(localStorage.getItem(key))
      if(type != null && result instanceof type === false){
        return null
      }
      return result
    }catch(e){
      return null
    }
  }

  static set(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  }

}
