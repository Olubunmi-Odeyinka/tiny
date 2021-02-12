import {ensureUrlHasProtocol, navigateUrl} from './urlFunctions';


describe('url helper functions spec', () => {

    it('ensureUrlHasProtocol function should add protocol to url without it', () => {
      const longUrl = "www.google.com/segment/key/"

      const longUrlWithProtocol  = ensureUrlHasProtocol(longUrl);

      expect(longUrl).not.toEqual(longUrlWithProtocol);
      expect(longUrlWithProtocol).toEqual("http://" + longUrl);
    })

    it('navigateUrl function is not a failing function', () => {
      const longUrl = "www.google.com/"

      navigateUrl(longUrl);
    })
});