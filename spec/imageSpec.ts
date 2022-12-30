import { imageProcessor } from '../src/routes/api/image';

describe('Testing image processing', (): void => {
  it('process the fjord image to 100x500', async (): Promise<void> => {
    const error: null | string = await imageProcessor({
      name: 'fjord',
      w: '100',
      h: '500'
    });
    expect(error).toBeNull();
  });

  it('invalid width value', async (): Promise<void> => {
    const error: null | string = await imageProcessor({
      name: 'fjord',
      w: '-100',
      h: '500'
    });
    expect(error).not.toBeNull();
  });
  it('invalid filename', async (): Promise<void> => {
    const error: null | string = await imageProcessor({
      name: 'ford',
      w: '100',
      h: '500'
    });
    expect(error).not.toBeNull();
  });
});
