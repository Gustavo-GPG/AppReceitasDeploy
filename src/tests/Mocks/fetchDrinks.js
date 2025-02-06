import testDataDrinks from './testDataDrinks';

const mockFetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(testDataDrinks),
});

export default mockFetch;
