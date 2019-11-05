export default class{

  static getCursorQuery(text, position){
    const lines = text.split('\n')
    let array = []

    const cursorLine = lines[position.row]
    let cursorLeft = deleteLeftQuery(cursorLine.substring(0, position.column))
    let cursorRight = deleteRightQuery(cursorLine.substring(position.column))

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
        array.unshift(deleteLeftQuery(line))
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
        array.push(deleteRightQuery(line))
        break
      }

      array.push(line)
    }

    return array.join('\n')
  }

}

function deleteLeftQuery(text){
  const index = text.lastIndexOf(';')
  if(index !== -1){
    return text.substring(index + 1)
  }
  return text
}

function deleteRightQuery(text){
  const index = text.indexOf(';')
  if(index !== -1){
    return text.substring(0, index)
  }
  return text
}
