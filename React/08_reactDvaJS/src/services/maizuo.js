// ./src/services/maizuo.js

import request from '../utils/request';

export function getList(){
  return request('https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=9761834',{
    method:"GET",
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"110100"}',
      'X-Host': 'mall.film-ticket.cinema.list'
    }
  })
}