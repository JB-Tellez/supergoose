import Roadie from '../../../src/models/roadies';
import testHelper from '../../../scripts/test-helper';

afterEach(testHelper.afterEach);

describe('Roadie model', () => {

  it('should be defined', () => {
    expect(Roadie).toBeDefined();
  });
});