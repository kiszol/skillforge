# Changelog

A projekt összes jelentős változtatása ebben a fájlban kerül dokumentálásra.

A formátum [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) alapján készült,
és a projekt követi a [Semantic Versioning](https://semver.org/spec/v2.0.0.html) verziózást.

## [1.0.0] - 2026-01-16

### Hozzáadva

#### Core Funkciók
- ✨ Angular alapú projekt struktúra létrehozása
- 🔐 Autentikációs rendszer token alapú bejelentkezéssel
- 🔌 HTTP Interceptor automatikus token kezeléshez
- 🎨 Reszponzív navbar komponens SkillForge logóval
- 📱 Mobil-barát felhasználói felület

#### Dashboard
- 📊 Dashboard oldal főbb statisztikákkal
- 🎯 Gyors navigációs gombok
- 👋 Üdvözlő üzenet

#### Kurzusok Modul
- 📚 Kurzuslista oldal kártyás nézettel
- 🔍 Keresési és szűrési funkció
- 📝 Kurzus részletes nézet
- ➕ Kurzus létrehozása űrlap
- ✏️ Kurzus szerkesztése funkció
- 🖼️ Képfeltöltési lehetőség kurzusokhoz
- 🔄 Állapot kezelés (Aktív/Inaktív)

#### Hallgatók
- 👥 Hallgatók lista oldal
- 🎴 Kártyás nézet hallgatói profilokkal
- 🔤 Automatikus avatar generálás kezdőbetűkből
- 📧 Email cím megjelenítése
- 📚 Kurzusok számának mutatása

#### Oktatók
- 👨‍🏫 Oktatók lista oldal
- 🏛️ Tanszék információk
- 📊 Oktatott kurzusok száma
- 🎨 Színes vizuális megjelenítés

#### Kapcsolat
- ✉️ Kapcsolatfelvételi űrlap
- 📍 Elérhetőségi információk (cím, telefon, email)
- ⏰ Nyitvatartási idő
- ✅ Űrlap validáció

#### Rólunk
- ℹ️ Küldetés és értékek bemutatása
- 💡 4 értékkártya (Innováció, Együttműködés, Egyszerűség, Biztonság)
- 📊 Statisztikák (hallgatók, oktatók, kurzusok, tapasztalat)
- 🛠️ Használt technológiák listája

#### Design & Styling
- 🎨 Egységes dizájn rendszer SCSS változókkal
- 🌈 Színpaletta definiálása
- 📏 Konzisztens spacing rendszer
- ✨ Animációk és átmenetek
- 📱 Reszponzív layout minden oldalon
- 🖼️ Hover effektek és interaktív elemek

#### Dokumentáció
- 📖 Részletes README.md
- 🤝 CONTRIBUTING.md közreműködési útmutató
- 📝 CHANGELOG.md verziókövetés
- 💻 Kód dokumentáció JSDoc kommentekkel
- 🚀 Telepítési és használati útmutatók

#### Routing & Navigation
- 🗺️ Teljes routing konfiguráció
- 🔗 Deep linking támogatás
- 🎯 Aktív route kiemelés
- 🔄 Lazy loading előkészítése

#### Services & API
- 🔌 CourseService CRUD műveletekkel
- 🔐 AuthService autentikációhoz
- 📡 RealtimeService WebSocket kommunikációhoz
- 🔄 HTTP Error handling

### Módosítva
- 🔧 Environment konfigurációk optimalizálása
- ⚡ Build folyamat optimalizálása
- 🎨 SkillForge logó integrálása navbar-ba

### Javítva
- 🐛 @ karakter kezelése email címekben HTML template-ben
- 🔧 Git line ending beállítások (CRLF vs LF)
- 📱 Mobil menü toggle működése

### Biztonság
- 🔒 Token alapú autentikáció implementálása
- 🛡️ HTTP Interceptor biztonsági fejlécekkel
- 🔐 Environment fájlok védése

## [Tervezett Fejlesztések]

### Következő verzió (1.1.0)
- [ ] Felhasználói profilok kezelése
- [ ] Képfeltöltés valós implementációja
- [ ] Keresési funkció javítása autocomplete-tel
- [ ] Dashboard statisztikák real-time frissítése
- [ ] Dark mode támogatás
- [ ] Multilingual támogatás (i18n)
- [ ] PWA funkciók

### Hosszú távú (2.0.0)
- [ ] Real-time értesítések
- [ ] Chat funkció oktatók és hallgatók között
- [ ] Fájlmegosztás
- [ ] Naptár integráció
- [ ] Vizsgák és házi feladatok modul
- [ ] Adminisztrációs felület
- [ ] Jelentések és analytics
- [ ] Export funkciók (PDF, Excel)

## Verzió Történet

### Verzió Számozás Szabályok

A projekt a Semantic Versioning-et követi:

- **MAJOR** (1.x.x) - Inkompatibilis API változtatások
- **MINOR** (x.1.x) - Új funkciók visszafelé kompatibilis módon
- **PATCH** (x.x.1) - Hibajavítások visszafelé kompatibilis módon

### Changelog Kategóriák

- **Hozzáadva** - Új funkciók
- **Módosítva** - Meglévő funkciók változtatásai
- **Elavult** - Hamarosan eltávolítandó funkciók
- **Eltávolítva** - Eltávolított funkciók
- **Javítva** - Hibajavítások
- **Biztonság** - Biztonsági javítások

---

## Hivatkozások

- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [GitHub Releases](https://github.com/kiszol/skillforge/releases)

**SkillForge** - Minden verzióban jobb! 🚀
