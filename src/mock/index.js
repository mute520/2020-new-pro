import Mock from 'mockjs'
import product from './product'

const { mock, setup } = Mock

mock(new RegExp('/product/get'), 'get', product) // get 时，接口路径使用正则即可传参
mock(new RegExp('/product/post'), 'post', product) // case 1
// mock(/\/product\/post/, 'post', product) // case 2
// mock('/product/post', 'post', product) // case 3