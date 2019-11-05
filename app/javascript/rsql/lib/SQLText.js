export default class{

  static split(text){
    return text
      .split(';')
      .filter(text => text.match(/[\S]/))
  }

}
