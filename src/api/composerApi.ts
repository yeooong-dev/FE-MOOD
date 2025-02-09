import { withoutTokenInstance } from './instance'

// 작곡가 조회
const composerList = async ({ composer }: { composer: string }) => {
  const response = await withoutTokenInstance.get(`/api/music/?composer=${composer}`)
  console.log(response.data.data);
  
  return response.data.data
}

export { composerList }
