import Mock from 'mockjs'
import product from './product'

const { mock, setup } = Mock

mock(new RegExp('/product/get'), 'get', product) // get 时，接口路径使用正则即可传参
mock('/product/post', 'post', product)