Para que pida los permisos de la cámara, hay que modificar el AndroidManifest.xml.

En la carpeta: android/app/src/main/AndroidManifest.xml se debe agregar lo siguiente:

    1. xmlns:tools="http://schemas.android.com/tools"
    2. android:hardwareAccelerated="true"
    3. <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
    4. <uses-permission android:name="android.permission.CAMERA" />
    5. <uses-permission android:name="android.permission.FLASHLIGHT"/>
    6. <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />

Para mostar donde se ponen estas líneas, voy a entregar un archivo completo de ejemplo:

<?xml version='1.0' encoding='utf-8'?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools">
    <application android:allowBackup="true" android:hardwareAccelerated="true" android:icon="@mipmap/ic_launcher" android:label="@string/app_name" android:roundIcon="@mipmap/ic_launcher_round" android:supportsRtl="true" android:theme="@style/AppTheme" android:usesCleartextTraffic="true">
        <activity android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode" android:exported="true" android:label="@string/title_activity_main" android:launchMode="singleTask" android:name=".MainActivity" android:theme="@style/AppTheme.NoActionBarLaunch">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <provider android:authorities="${applicationId}.fileprovider" android:exported="false" android:grantUriPermissions="true" android:name="androidx.core.content.FileProvider">
            <meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/file_paths" />
        </provider>
        <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
    </application>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.FLASHLIGHT"/>
    <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />
</manifest>
