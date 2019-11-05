import SQLText from './SQLText'

const s = (...args) => {
  return args.join('\n')
}

describe('split', () => {

  test('1 query' , () => {
    const text = s(
      'select * from table1',
    )
    expect(SQLText.split(text)).toEqual(['select * from table1'])
  })

  test('2 queries' , () => {
    const text = s(
      'select * from table1;',
      'select * from table2',
    )
    expect(SQLText.split(text)).toEqual(['select * from table1;', '\nselect * from table2'])
  })

  test('-- comment' , () => {
    const text = s(
      'select * from table1;',
      '--;',
      'select * from table2',
    )
    expect(SQLText.split(text)).toEqual(['select * from table1;', '\n--;\nselect * from table2'])
  })

  test('/* comment */' , () => {
    const text = s(
      'select * from table1;',
      '/* ; */',
      'select * from table2',
    )
    expect(SQLText.split(text)).toEqual(['select * from table1;', '\n/* ; */\nselect * from table2'])
  })

  test('ignore last space' , () => {
    const text = s(
      'select * from table1; \t \n',
    )
    expect(SQLText.split(text)).toEqual(['select * from table1;'])
  })

})

