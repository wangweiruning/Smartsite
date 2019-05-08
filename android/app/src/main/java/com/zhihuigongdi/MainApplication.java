package com.zhihuigongdi;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.lewin.qrcode.QRScanReaderPackage;
import org.reactnative.camera.RNCameraPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import cn.reactnative.httpcache.HttpCachePackage;
import cn.jpush.reactnativejpush.JPushPackage;
import com.imagepicker.ImagePickerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  // 设置为 true 将不会弹出 toast
   private boolean SHUTDOWN_TOAST = false;
  // 设置为 true 将不会打印 log
   private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new QRScanReaderPackage(),
            new RNCameraPackage(),
            new RNDeviceInfo(),
            new VectorIconsPackage(),
            new HttpCachePackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new ImagePickerPackage(),
            new RNSoundPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
