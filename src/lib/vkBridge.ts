import bridge from '@vkontakte/vk-bridge';

export const initVK = async () => {
  try {
    await bridge.send('VKWebAppInit');
    return true;
  } catch (error) {
    console.error('VK Bridge init failed:', error);
    return false;
  }
};

export const getVKUser = async () => {
  try {
    const user = await bridge.send('VKWebAppGetUserInfo');
    return {
      id: String(user.id),
      name: `${user.first_name} ${user.last_name}`,
      avatar: user.photo_200 || '🏎️',
      photoUrl: user.photo_200
    };
  } catch (error) {
    console.error('Failed to get VK user:', error);
    return null;
  }
};

export const getVKFriends = async () => {
  try {
    const response = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'friends.get',
      params: {
        fields: 'photo_200,first_name,last_name',
        v: '5.131',
        access_token: ''
      }
    });
    return response.response?.items || [];
  } catch (error) {
    console.error('Failed to get VK friends:', error);
    return [];
  }
};

export const shareToVK = async (message: string) => {
  try {
    await bridge.send('VKWebAppShare', {
      link: window.location.href
    });
  } catch (error) {
    console.error('Share failed:', error);
  }
};

export const showVKAd = async () => {
  try {
    await bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' });
    return true;
  } catch (error) {
    console.error('Ad failed:', error);
    return false;
  }
};

export default bridge;
