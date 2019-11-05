export default class{

  static getCursorQuery(text, position){
    const lines = text.split('\n')
    let array = []

    const cursorLine = lines[position.row]
    let cursorLeft = cursorLine.substring(0, position.column)
    let cursorRight = cursorLine.substring(position.column)

    if(cursorLeft.includes(';')){
      cursorLeft = cursorLeft.substring(cursorLeft.lastIndexOf(';') + 1)
    }

    if(cursorRight.includes(';')){
      cursorRight = cursorRight.substring(0, cursorRight.indexOf(';'))
    }

    array.push(cursorLeft + cursorRight)

    for(let i = position.row; 0 <= i; i--){
      let line = lines[i]
      if(i === position.row){
        line = line.substring(0, position.column)
        if(line.includes(';')){
          break
        }
        continue
      }

      if(line.includes(';')){
        line = line.substring(line.lastIndexOf(';') + 1)
        array.unshift(line)
        break
      }
      array.unshift(line)
    }

    for(let i = position.row; i < lines.length; i++){
      let line = lines[i]
      if(i === position.row){
        line = line.substring(position.column)
        if(line.includes(';')){
          break
        }
        continue
      }

      if(line.includes(';')){
        line = line.substring(0, line.indexOf(';'))
        array.push(line)
        break
      }

      array.push(line)
    }

    return array.join('\n')
  }

}
