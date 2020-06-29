import * as firebase from 'firebase/app';
import 'firebase/messaging';

type FirebaseConfig = {
  projectId: string;
  messagingSenderId: string;
  appId: string;
  apiKey: string;
};

class FCMMessaging {
  private _messaging?: firebase.messaging.Messaging;
  private _unsubscribe?: firebase.Unsubscribe;

  get messaging() {
    return this._messaging;
  }

  get unsubscribe() {
    return this._unsubscribe;
  }

  set unsubscribe(unsubscribe: firebase.Unsubscribe | undefined) {
    this._unsubscribe = unsubscribe;
  }

  init(firebaseConfig: FirebaseConfig, firebasePublicKey: string) {
    firebase.initializeApp(firebaseConfig);
    this._messaging = firebase.messaging();
    this._messaging.usePublicVapidKey(firebasePublicKey);
  }

  async getToken(): Promise<string | undefined> {
    if (this.messaging === undefined) {
      return;
    }

    let token;

    try {
      token = await this.messaging.getToken();
    } catch (err) {
      console.error(err);
    }

    return token;
  }

  async deleteToken(token: string): Promise<void> {
    if (this.messaging === undefined) {
      return;
    }

    await this.messaging.deleteToken(token);
  }
}

const fcmMessaging = new FCMMessaging();

export { fcmMessaging };
