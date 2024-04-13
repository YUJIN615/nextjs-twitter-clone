import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    // BE > DB에서 데이터 가져오는 과정 있음
    return HttpResponse.json({
      userId: 1,
      nickname: 'yujin',
      id: 'cookie.run',
      image: '/logo.png'
    },{
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;httpOnly;path=/'
      }
    })
  }),
  http.post('api/logout', () => {
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;httpOnly;path=/Max-Age=0'
      }
    })
  })
]
