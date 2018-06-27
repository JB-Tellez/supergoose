import Musician from '../../../src/models/musicians';
import testHelper from '../../../scripts/test-helper';

afterEach(testHelper.afterEach);

describe('Musicans model', () => {

  it('should be defined', () => {
    expect(Musician).toBeDefined();
  });
});