import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AppStorageData } from '../../app/app.component';
import { AITStorage } from '../../app/core/AITStorage';
import { ThemeSettingsProvider, BaseTheme, AccentTheme } from '../../app/core/ThemeSettingsProvider';
import { Navbar } from 'ionic-angular/navigation/nav-interfaces';


@IonicPage()
@Component({
  selector: 'page-app-settings',
  templateUrl: 'app-settings.html',
})
export class AppSettingsPage {
  @ViewChild("Navbar")
  nav: Navbar;

  BaseTheme = BaseTheme;
  AccentTheme = AccentTheme;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage:AITStorage,
              public settings: ThemeSettingsProvider,
              public menuCtrl: MenuController) {

    this.menuCtrl.enable(false, 'left');
    this.menuCtrl.enable(false, 'right');
  }

  ionViewWillEnter() {
    this.storage.getItem(AITStorage.APP_ID).then((value) => {
      this.data = <AppStorageData>value;
    }).catch((reject) => {
      //console.log("app-settings storage error");
    });
  }

  ionViewWillLeave()
  {
    this.storage.setItem(this.data);
  }

  toggleBaseTheme(value: BaseTheme) {
    this.settings.base = value;
    this._data.base = value;
  }

  toggleAccentTheme(value: AccentTheme) {
    this.settings.accent = value;
    this._data.accent = value;
  }

  _data: AppStorageData;
  get data(): AppStorageData {
    return this._data;
  }
  set data(value: AppStorageData) {
    this._data = value;
  }
}
