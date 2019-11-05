export default class{

  static split(text){

    const splitPositions = []
    let lineComment = false
    let commentLevel = 0

    for(let i = 0; i < text.length; i++){
      const char = text[i]
      const char2 = text.substr(i, 2)
      if(char2 === '--'){
        i++
        lineComment = true
      }else if(char2 === '/*'){
        i++
        commentLevel++
      }else if(char2 === '*/'){
        i++
        commentLevel--
      }else if(char === '\n'){
        lineComment = false
      }else if(char === ';'){
        if(lineComment === false && commentLevel === 0){
          splitPositions.push(i + 1)
        }
      }
    }

    return splitByPosition(text, splitPositions)
      .filter(text => text.match(/[\S]/))
  }

}

function splitByPosition(text, positions){
  const result = []
  for(let i = 0; i < positions.length; i++){
    const start = positions[i - 1] || 0
    const end = positions[i]
    result.push(text.substring(start, end))
  }
  const lastPosition = positions[positions.length - 1]
  result.push(text.substring(lastPosition))
  return result
}
