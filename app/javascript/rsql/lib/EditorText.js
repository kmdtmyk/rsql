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
        if(endOfQuery(line)){
          break
        }
        continue
      }

      if(endOfQuery(line)){
        array.unshift(deleteLeftQuery(line))
        break
      }
      array.unshift(line)
    }

    for(let i = position.row; i < lines.length; i++){
      let line = lines[i]
      if(i === position.row){
        line = line.substring(position.column)
        if(endOfQuery(line)){
          break
        }
        continue
      }

      if(endOfQuery(line)){
        array.push(deleteRightQuery(line))
        break
      }

      array.push(line)
    }

    return array.join('\n')
  }

}

function deleteLeftQuery(text){
  const comment = getComment(text)
  if(comment !== ''){
    return deleteLeftQuery(deleteComment(text)) + comment
  }
  const index = text.lastIndexOf(';')
  if(index !== -1){
    return text.substring(index + 1)
  }
  return text
}

function deleteRightQuery(text){
  const comment = getComment(text)
  if(comment !== ''){
    return deleteRightQuery(deleteComment(text)) + comment
  }
  const index = text.indexOf(';')
  if(index !== -1){
    return text.substring(0, index)
  }
  return text
}

function endOfQuery(line){
  return deleteComment(line).includes(';')
}

function getComment(line){
  const commentIndex = line.indexOf('--')
  if(commentIndex !== -1){
    return line.substring(commentIndex)
  }
  return ''
}

function deleteComment(line){
  const commentIndex = line.indexOf('--')
  if(commentIndex !== -1){
    return line.substring(0, commentIndex)
  }
  return line
}
