export type AuthStackParamList = {
  login: undefined;
  register: undefined;
};

export type TabsParamList = {
  index: undefined;
  work: undefined;
  study: undefined;
  personal: undefined;
  profile: undefined;
};

export type RootStackParamList = AuthStackParamList & TabsParamList;

// Declare global types for Expo Router
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}