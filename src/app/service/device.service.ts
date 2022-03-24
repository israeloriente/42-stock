import { Injectable } from '@angular/core';
import { Events } from './events';
import { Platform } from '@ionic/angular';
import { BarcodeProvider } from '../providers/barcode/barcode';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  constructor(
    private events: Events,
    private platform: Platform,
    private barcodeProvider: BarcodeProvider,
  ) { }

  /**
    * Init INTENT command for scanner barcode with Zebra devices
  */
  public initZebra() {
    if (this.platform.is("capacitor")) {
      this.barcodeProvider.sendCommand("com.symbol.datawedge.api.GET_VERSION_INFO", "");
    //  6.3 DataWedge APIs are available
    this.events.subscribe('status:dw63ApisAvailable', (isAvailable) => {
      //  We are able to create the profile under 6.3.  If no further version events are received, notify the user
      //  they will need to create the profile manually
      // IMPORTANT ABAIXO
      this.barcodeProvider.sendCommand("com.symbol.datawedge.api.CREATE_PROFILE", "42-stock");
    });
    //  6.4 Datawedge APIs are available
    this.events.subscribe('status:dw64ApisAvailable', (isAvailable) => {
      //  Configure the created profile (associated app and keyboard plugin)
      // IMPORTANT
      let profileConfig = {
        "PROFILE_NAME": "42-stock",
        "PROFILE_ENABLED": "true",
        "CONFIG_MODE": "UPDATE",
        "PLUGIN_CONFIG": {
          "PLUGIN_NAME": "BARCODE",
          "RESET_CONFIG": "true",
          "PARAM_LIST": {}
        },
        "APP_LIST": [{
          "PACKAGE_NAME": "iot.orientech.stock",
          "ACTIVITY_LIST": ["*"]
        }]
      };
      this.barcodeProvider.sendCommand("com.symbol.datawedge.api.SET_CONFIG", profileConfig);
      //  Configure the created profile (intent plugin)
      // IMPORTANT
      let profileConfig2 = {
        "PROFILE_NAME": "42-stock",
        "PROFILE_ENABLED": "true",
        "CONFIG_MODE": "UPDATE",
        "PLUGIN_CONFIG": {
          "PLUGIN_NAME": "INTENT",
          "RESET_CONFIG": "true",
          "PARAM_LIST": {
            "intent_output_enabled": "true",
            "intent_action": "iot.orientech.stock.ACTION",
            "intent_delivery": "2"
          }
        }
      };
      this.barcodeProvider.sendCommand("com.symbol.datawedge.api.SET_CONFIG", profileConfig2);
    });
    }
  }

}
