Installationsanleitung

## Vorbereitung:

### Voraussetzungen:

- [ ] Java
- [ ] ​

1. Installiere NodeJS https://nodejs.org/en/

2. `npm install exp --global` um Expo Funktionen von der Kommandozeile verwenden zu können. 

3. Installation der Expo XDE: https://github.com/expo/xde/releases

   ​	Bei Verwendung der XDE wird ein Login benötigt. Hierfür kann man einfach einen GitHub Account verwenden.

   ​	Doku von Expo: https://docs.expo.io/versions/latest/guides/index.html

4. `npm install -g react-native-cli`

5. Wenn das Projekt von GitHub gepullt wurde muss im Projektverzeichnis der Befehl:

   `npm install` ausgeführt werden um alle verwendeten in der package.json vermerkten Pakete zu installieren. Dies kann einige Minuten dauern. Bei mir kam es beim installieren zu einem Problem wegen der dependency:

   ​	`"react-native": "https://github.com/expo/react-native/archive/sdk-24.0.0.tar.gz"`  

   Sollte hier ein Fehler auftreten einfach die Zeile mit der react native dependency löschen und und den Befehl `npm install` ohne die react-native dependency ausführen. Wenn alle Pakete installiert wurden die Zeile wieder hinzufügen und `npm install` ein letztes mal ausführen.

   ​

   Jetzt kann Expo XDE gestartet und der Projektordner ausgewählt werden. 

![Start packager](F:\Git\Start packager.png)

Wenn NodeJS in Version v8.9.4 oder höher installiert wurde kommt npm in Version 5.6.0 mit, was zur Folge hat, dass EXPO XDE darauf hinweist, dass evtl. bugs in dieser Version auftreten können.

![Expo Issue](F:\Git\Expo Issue.png)

Mit einem Klick auf das Zahnrad kann der Verbindungstyp bzw. Host geändert werden. Wenn hier Tunnel ausgewählt wird, kann das Live Preview direkt auf dem Smartphone angesteuert werden.

![Start packager](F:\Git\change Host.png)

Hierzu einfach den Expo Client auf dem Smartphone installieren und den QR-Code scannen, der angezeigt wird, wenn man auf den Share Button klickt. Andernfalls die URL unter Explore in der Suchzeile der Expo App eingeben und bestätigen. 

Wenn auf dem PC direkt getestet werden soll, sollte Android Studio verwendet werden, da hierüber die Android SDK installiert wird und virtuelle Android Geräte erzeugt und verwaltet werden können. Die Installation kann einige Minuten in Anspruch nehmen.
https://developer.android.com/studio/index.html 



Da mit Expo bzw. React Native unabhängig vom OS gearbeitet wird empfiehlt es sich Android Studio erstmal nur als Quelle zum emulieren von Geräten zu verwenden. Ich erzeuge also nur ein separates Dummy Projekt um den AVD Manager nutzen zu können und importiere nicht das bestehende Projekt. Gradle erzeugt nun ein neues Android Projekt, das ungenutzt bleiben kann. 

Wenn beim Start dennoch das bestehende Expo Projekt ausgewählt und geladen wurde wird beim ersten Laden des Projektes das Android Framewok erkannt und entsprechend konfiguriert. Im Projektordner sollten nun zwei neue Ordner mit Namen `.idea` und `gen` erscheinen, die für das React Native Projekt keine Bedeutung spielen. 
Da mit React Native kein Java erzeugt wurde kann mit Android Studio als IDE nicht gearbeitet werden.

Im rechten Teil des Menübandes von Android Studio kann nun die SDK und der AVD Manager konfiguriert werden.

![Start packager](F:\Git\SDK AVD .png)

Über das Android SDK Menü können die enstprechenden SDK Platformen installiert werden. By default sollte die neueste Android Version ausgewählt und installiert sein. Klickt man auf das Häkchen bei "Show Package Details" kann man für die jeweilige Android Version auch ein ARM Package installieren. Diese Option ist wichtig falls man auf einem System mit einer AMD CPU arbeitet und muss in diesem Fall ebenfalls installiert werden.



In dem Tab SDK Tools müssen die SDK-Build Tools, der Emulator, die SDK Tools und die Platform Tools installiert sein.

![Start packager](F:\Git\SDK Tools.png)

Über den Android Virtual Device Manager können nun virtuelle Geräte erzeugt werden. Es können vorgefertigte Hardwareprofile verwendet werden oder individuelle Profile erzeugt bzw. importiert werden. Nach der Auswahl des Geräteprofils muss im nächsten Schritt die entsprechende Betriebssystemversion auf dem Gerät installiert werden. Auch dies kann wieder einige Minuten dauern. 

**Wichtig** ist hierbei, dass Computer mit AMD Prozessoren nicht die Versionen in der Rubrik "Recommended" verwenden können. In dem Bereich "Other Images" muss eine entsprechende "arm" Version gewählt und installiert werden, damit das emulierte Gerät funktioniert. Das klappt nur, wenn vorher im SDK Manager das entsprechende ARM Package installiert wurde und auch dann funktioniert diese Variante nur sehr schlecht und unzuverlässig. Auf Geräten mit AMD Prozessor sollte also evtl. auf eine andere Lösung zur Emulierung von Geräten zurück gegriffen werden.  