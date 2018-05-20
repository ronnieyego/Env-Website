import MobileDetect from 'mobile-detect';

export const addMobileToStore = (req, store) => {
    const md = new MobileDetect(req.headers['user-agent']);
    const isMobile = md.phone() !== null;
    store.userInfo = store.userInfo ? store.userInfo : { };
    store.userInfo.isMobile = isMobile;
    return store;
};
