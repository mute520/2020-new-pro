import Mock from 'mockjs'

const { mock, Random } = Mock

export default function (data) {
  // console.log('data:', data)
  let list = []
  for (let i = 0; i < 10; i++) {
    list.push({
      uid: Random.guid(),
      image: Random.image('200x50', '#50B347', '#FFF', 'Mock' + (i + 1)),
      date: Random.datetime(),
      content: Random.cparagraph(),
    })
  }
  return list
}