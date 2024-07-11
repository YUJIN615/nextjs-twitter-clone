import {http, HttpResponse, StrictResponse} from 'msw'
import {faker} from "@faker-js/faker";

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

const User = [
  {id: 'elonmusk', nickname: 'Elon Musk', image: '/logo.png'},
  {id: 'yujin', nickname: 'cookie.run', image: '/logo_2.png'},
  {id: 'leoturtle', nickname: '레오', image: faker.image.avatar()},
]

export const handlers = [
  // 로그인
  http.post('/api/login', ({ request }) => {
    // BE > DB에서 데이터 가져오는 과정 있음
    // json으로 응답을 보냄
    return HttpResponse.json(User[1],{
      // 헤더 설정
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;httpOnly;path=/'
      }
    })
  }),
  // 로그아웃
  http.post('api/logout', () => {
    // 보낼 데이터가 없을 때 주로 new HttpResponse 씀
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;httpOnly;path=/Max-Age=0'
      }
    })
  }),
  // 회원가입
  http.post('api/users', async () => {
    console.log('회원가입')
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403
    // })
    // text를 보낼 때 주로 HttpResponse.text() 씀
    return HttpResponse.text(JSON.stringify('ok'),{
      headers: {
        'Set-Cookie': 'connect.sid=;httpOnly;path=/Max-Age=0'
      }
    })
  }),
  // 홈 > 추천
  http.get('/api/postRecommends', ({ request }) => {
    const url = new URL(request.url)
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0
    return HttpResponse.json(
      [
        {
          postId: cursor + 1,
          User: User[0],
          content: `${cursor + 1} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 2,
          User: User[0],
          content: `${cursor + 2} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 3,
          User: User[0],
          content: `${cursor + 3} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 4,
          User: User[0],
          content: `${cursor + 4} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 5,
          User: User[0],
          content: `${cursor + 5} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  // 홈 > 팔로우 중
  http.get('/api/followingPosts', ({ request }) => {
    const url = new URL(request.url)
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0
    return HttpResponse.json(
      [
        {
          postId: cursor + 1,
          User: User[0],
          content: `${cursor + 1} Stop following me`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 2,
          User: User[0],
          content: `${cursor + 2} Stop following me`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 3,
          User: User[0],
          content: `${cursor + 3} Stop following me`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 4,
          User: User[0],
          content: `${cursor + 4} Stop following me`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 5,
          User: User[0],
          content: `${cursor + 5} Stop following me`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  // 검색
  http.get('/api/search/:tag', ({ request, params }) => {
    const { tag } = params;
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[0],
          content: `${1} 검색결과 ${tag}`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${2} 검색결과 ${tag}`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[0],
          content: `${3} 검색결과 ${tag}`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[0],
          content: `${4} 검색결과 ${tag}`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[0],
          content: `${5} 검색결과 ${tag}`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  // 프로필 > 사용자 정보
  http.get('/api/users/:userId', ({ request, params }): StrictResponse<any> => {
    const { userId, postId } = params;
    const found = User.find(v => v.id === userId);

    if (found) {
      return HttpResponse.json(
        found
      );
    }
    return HttpResponse.json({ message: 'no_such_user' }, { status: 404 })
  }),
  // 프로필 > 게시글
  http.get('/api/users/:userId/posts', ({ request, params }) => {
    const { userId } = params;
    const found = User.find(v => v.id === userId);

    return HttpResponse.json(
      [
        {
          postId: 1,
          User: found,
          content: `${1} ${userId} 의 게시글`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: found,
          content: `${2} ${userId} 의 게시글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: found,
          content: `${3} ${userId} 의 게시글`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: found,
          content: `${4} ${userId} 의 게시글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: found,
          content: `${5} ${userId} 의 게시글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  // 프로필 > 게시글 상세
  http.get('/api/posts/:postId', ({ request, params }): StrictResponse<any> => {
    const { postId } = params;
    if (parseInt(postId as string) > 10) {
      return HttpResponse.json({ message: 'no_such_post'}, {
        status: 404
      })
    }

    return HttpResponse.json(
      {
        postId,
        User: User[0],
        content: `postId ${postId}의 내용`,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}, {imageId: 1, link: faker.image.urlLoremFlickr()}, {imageId: 1, link: faker.image.urlLoremFlickr()}],
        createdAt: generateDate(),
      },
    );
  }),
  // 프로필 > 게시글 답글
  http.get('/api/users/posts/:postId/comments', ({ request, params }) => {
    const { postId } = params;

    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[1],
          content: `${1} 게시글 ${postId}의 답글`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[1],
          content: `${2} 게시글 ${postId}의 답글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[1],
          content: `${3} 게시글 ${postId}의 답글`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[1],
          content: `${4} 게시글 ${postId}의 답글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[1],
          content: `${5} 게시글 ${postId}의 답글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  // 홈 > 팔로우 추천
  http.get('api/followRecommends', ({ request,}) => {
    return HttpResponse.json(User);
  }),
  // 홈 > 트렌드
  http.get('api/trends', ({ request }) => {
    return HttpResponse.json([
      {tagId: 1, title: '제로초', count: 1264},
      {tagId: 2, title: '원초', count: 1264},
      {tagId: 3, title: '투초', count: 1264},
      {tagId: 4, title: '쓰리초', count: 1264},
      {tagId: 5, title: '포초', count: 1264},
      {tagId: 6, title: '파이브초', count: 1264},
      {tagId: 7, title: '식스초', count: 1264},
      {tagId: 8, title: '세븐초', count: 1264},
      {tagId: 9, title: '나인초', count: 1264},
    ])
  })
]
