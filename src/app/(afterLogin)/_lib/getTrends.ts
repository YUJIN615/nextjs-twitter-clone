export async function getTrends() {
  // 데이터 불러오기. 반복되는 패턴이 있음
  const res = await fetch('http://localhost:9090/api/trends', {
    next: {
      // 서버 컴포넌트에서 받아올 때 캐싱이 되는데, 그걸 지우기 위해서 tag 필요
      // 리액트 쿼리가 아닌 넥스트 서버에서 사용하는 것
      tags: ['trends']
    },
    cache: 'no-store'
  });

  // 태그를 이용해서 이렇게 캐시를 지워준다.
  // revalidateTag("recommends");

  // 해당 경로에서는 서버 새로고침
  // revalidatePath('/home')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
