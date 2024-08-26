# На устройстве MacOS

## Необходимое ПО для разработки и развертывания

Node v18.18.0

Yarn v3.4.6

### Android

Android Studio

### iOS

XCode

Cocoapods

```
$ brew install cocoapods
```

1. Выполнить команду:

```
$ yarn install
```

## Запуск на девайсе

### iOS. Запуск приложения из XCode.

1. Открыть в XCode файл `AuReactNativeApp.xcworkspace`
2. Если не настроено: настроить development team и т.д.
3. Выбрать девайс
4. Нажать PLAY

### Запуск из терминала

Установить Pods

```
$ cd ios && pod install
```

1. Выполнить команду:

```
$ yarn run ios
```

Или

### Android

1. Сгенерировать ключ

```
keytool -genkeypair -v -keystore [ИМЯ_КЛЮЧА].keystore -alias [АЛИАС_КЛЮЧА] -keyalg RSA -keysize 2048 -validity 10000
```

2. Переместить ключ в android/app

3. Подключить девайс
4. Убедиться, что он есть в списке подключенных девайсов

```
$ adb devices
```

5. Выполнить команду:

```
$ yarn run android
```
