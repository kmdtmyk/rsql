export default class{

  static isEmpty(text: string): boolean{
    if(text == null){
      return true
    }
    return /^[\s]*$/.test(text)
  }

  static split(text: string): string[]{
    const splitPositions = []
    let lineComment = false
    let commentLevel = 0
    let stringLiteral = false

    for(let i = 0; i < text.length; i++){
      const char = text[i]
      const char2 = text.substr(i, 2)
      if(char2 === '--'){
        i++
        if(stringLiteral === false){
          lineComment = true
        }
      }else if(char2 === '/*'){
        i++
        if(stringLiteral === false){
          commentLevel++
        }
      }else if(char2 === '*/'){
        i++
        if(stringLiteral === false){
          commentLevel--
        }
      }else if(char === '\''){
        if(lineComment === false && commentLevel === 0){
          stringLiteral = !stringLiteral
        }
      }else if(char === '\n'){
        lineComment = false
      }else if(char === ';'){
        if(lineComment === false && commentLevel === 0 && stringLiteral === false){
          splitPositions.push(i + 1)
        }
      }
    }

    return splitByPosition(text, splitPositions)
  }

}

function splitByPosition(text: string, positions: number[]){
  const result = positions.map((position, index) => {
    const start = positions[index - 1] || 0
    return text.substring(start, position)
  })
  const lastPosition = positions[positions.length - 1]
  result.push(text.substring(lastPosition))
  return result
}
