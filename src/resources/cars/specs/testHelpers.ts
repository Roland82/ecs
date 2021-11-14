import nock from 'nock'

export const mockDataMuseApi = (options: { carMake: string, returnStatusCode: number, responseBody: DataMuseSimilarWordsResponseBody }) => {
  const dataMuseApiMock = nock('https://api.datamuse.com')
  dataMuseApiMock.get(`/words?sl=${options.carMake}`).reply(options.returnStatusCode, options.responseBody)
}