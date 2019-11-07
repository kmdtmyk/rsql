import EditorText from './EditorText'

const s = (...args: string[]) => {
  return args.join('\n')
}

describe('getCursorQuery', () => {

  test('1 line, 1 query' , () => {
    const text = 'select * from table1'
    expect(EditorText.getCursorQuery(text, {row: 0, column: 5})).toEqual(text)
    expect(EditorText.getCursorQuery(text, {row: 0, column: 0})).toEqual(text)
    expect(EditorText.getCursorQuery(text, {row: 0, column: 20})).toEqual(text)
  })

  test('1 line, 3 queries' , () => {
    const text = 'select * from table1;select * from table2;select * from table3'
    expect(EditorText.getCursorQuery(text, {row: 0, column: 20})).toEqual('select * from table1')
    expect(EditorText.getCursorQuery(text, {row: 0, column: 21})).toEqual('select * from table2')
    expect(EditorText.getCursorQuery(text, {row: 0, column: 41})).toEqual('select * from table2')
    expect(EditorText.getCursorQuery(text, {row: 0, column: 42})).toEqual('select * from table3')
  })

  test('multiple lines' , () => {
    const text = s(
      'select * from table1',
      ';',
      'select * from table2',
      ';',
      'select * from table3',
    )
    expect(EditorText.getCursorQuery(text, {row: 1, column: 0})).toEqual('select * from table1\n')
    expect(EditorText.getCursorQuery(text, {row: 1, column: 1})).toEqual('\nselect * from table2\n')
    expect(EditorText.getCursorQuery(text, {row: 3, column: 0})).toEqual('\nselect * from table2\n')
    expect(EditorText.getCursorQuery(text, {row: 3, column: 1})).toEqual('\nselect * from table3')
  })

  test('multiple lines (contains comment)' , () => {
    const text = s(
      'select * --;comment',
      'from table',
    )
    expect(EditorText.getCursorQuery(text, {row: 0, column: 0})).toEqual(text)
    expect(EditorText.getCursorQuery(text, {row: 0, column: 15})).toEqual(text)
    expect(EditorText.getCursorQuery(text, {row: 1, column: 0})).toEqual(text)
  })

})

