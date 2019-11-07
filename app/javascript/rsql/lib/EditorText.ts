import SQLText from './SQLText'

export default class{

  static getCursorQuery(text: string, position: {column: number, row: number}){
    const queries = SQLText.split(text)
    const lines = text.split('\n')

    let cursorLength = 0

    for(let i = 0; i <= position.row; i++){
      if(i === position.row){
        cursorLength += position.column
      }else{
        cursorLength += lines[i].length + 1
      }
    }

    let count = 0
    let result = queries[0] || ''
    for(let i = 0; i < queries.length; i++){
      const query = queries[i]
      if(count <= cursorLength && cursorLength < count + query.length){
        result = query
        break
      }
      count += query.length
    }

    if(result.endsWith(';')){
      result = result.slice(0, -1)
    }

    return result
  }

}
