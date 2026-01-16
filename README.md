# SkillForge - Oktatási Menedzsment Rendszer

![SkillForge Logo](skillforge.png)

## 📋 Tartalomjegyzék

- [Áttekintés](#áttekintés)
- [Funkciók](#funkciók)
- [Technológiák](#technológiák)
- [Telepítés](#telepítés)
- [Használat](#használat)
- [Projekt Struktúra](#projekt-struktúra)
- [Komponensek](#komponensek)
- [Routing](#routing)
- [API Integráció](#api-integráció)
- [Fejlesztés](#fejlesztés)
- [Közreműködés](#közreműködés)
- [Licenc](#licenc)

## 🎓 Áttekintés

A **SkillForge** egy modern, Angular alapú oktatási menedzsment rendszer, amely megkönnyíti az oktatók, hallgatók és kurzusok kezelését. Az alkalmazás intuitív felhasználói felületet biztosít, amely lehetővé teszi a hatékony adminisztrációt és kommunikációt az oktatási intézmények számára.

## ✨ Funkciók

### 📊 Dashboard
- Átfogó áttekintés az oktatási rendszerről
- Statisztikák és összefoglalók
- Gyors navigáció a fő funkciókhoz

### 📚 Kurzusok Kezelése
- **Kurzuslista**: Összes kurzus áttekintése kártyás nézetben
- **Kurzus Részletek**: Részletes információk minden kurzusról
- **Kurzus Létrehozás/Szerkesztés**: Egyszerű űrlap kurzusok kezeléséhez
- Kurzus állapot kezelés (Aktív/Inaktív)
- Képek feltöltése kurzusokhoz

### 👥 Hallgatók
- Hallgatók listája kártyás nézetben
- Hallgatói információk (név, email, kurzusok száma)
- Szép, modern dizájn egyedi avatárokkal

### 👨‍🏫 Oktatók
- Oktatók áttekintése
- Tanszék és kurzus információk
- Színes, vizuális megjelenítés

### ✉️ Kapcsolatfelvétel
- Kapcsolatfelvételi űrlap
- Elérhetőségi információk
- Cím, telefon, email, nyitvatartás

### ℹ️ Rólunk
- Küldetés és értékek
- Statisztikák (hallgatók, oktatók, kurzusok száma)
- Használt technológiák bemutatása
- Vizuális értékek megjelenítése

### 🔐 Autentikáció
- Bejelentkezés
- Token alapú autentikáció
- Védett route-ok

## 🛠️ Technológiák

### Frontend
- **Angular 14+** - Modern web alkalmazás keretrendszer
- **TypeScript** - Típusos JavaScript
- **RxJS** - Reaktív programozás
- **SCSS** - CSS preprocesszor
- **Angular Router** - Navigáció kezelés
- **Angular Forms** - Reaktív és template-driven formok
- **HttpClient** - HTTP kommunikáció

### Styling
- Egyedi SCSS változók és mixinek
- Reszponzív dizájn
- CSS Grid és Flexbox
- Animációk és átmenetek
- Modern UI komponensek

### Development Tools
- **Angular CLI** - Fejlesztői eszközök
- **Git** - Verziókezelés
- **VS Code** - Ajánlott IDE

## 📦 Telepítés

### Előfeltételek

Győződj meg róla, hogy telepítve vannak a következők:
- **Node.js** (v14 vagy újabb)
- **npm** (v6 vagy újabb)
- **Angular CLI** (v14 vagy újabb)

```bash
# Angular CLI telepítése globálisan
npm install -g @angular/cli
```

### Projekt Klónozása

```bash
git clone https://github.com/kiszol/skillforge.git
cd skillforge
```

### Függőségek Telepítése

```bash
npm install
```

### Környezeti Változók Beállítása

Állítsd be az API endpoint-ot az `src/environments/` mappában:

**environment.ts** (development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**environment.prod.ts** (production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'
};
```

## 🚀 Használat

### Development Szerver Indítása

```bash
ng serve
```

Navigálj a `http://localhost:4200/` címre. Az alkalmazás automatikusan újratöltődik, ha módosítasz bármilyen forrásfájlt.

### Build

Development build:
```bash
ng build
```

Production build:
```bash
ng build --configuration production
```

A build artifaktok a `dist/` könyvtárban lesznek tárolva.

### Tesztek Futtatása

Unit tesztek:
```bash
ng test
```

E2E tesztek:
```bash
ng e2e
```

## 📁 Projekt Struktúra

```
src/
├── app/
│   ├── core/                      # Singleton szolgáltatások
│   │   ├── interceptors/          # HTTP interceptorok
│   │   │   └── auth.interceptor.ts
│   │   ├── services/              # Core szolgáltatások
│   │   │   ├── auth.service.ts
│   │   │   └── realtime.service.ts
│   │   └── core.module.ts
│   │
│   ├── features/                  # Feature modulok
│   │   └── courses/               # Kurzusok modul
│   │       ├── components/
│   │       │   ├── course-list/
│   │       │   ├── course-detail/
│   │       │   └── course-form/
│   │       ├── models/
│   │       │   ├── course.model.ts
│   │       │   ├── instructor.model.ts
│   │       │   └── student.model.ts
│   │       ├── services/
│   │       │   └── course.service.ts
│   │       ├── courses-routing.module.ts
│   │       └── courses.module.ts
│   │
│   ├── pages/                     # Oldal komponensek
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── students/
│   │   ├── instructors/
│   │   ├── contact/
│   │   └── about/
│   │
│   ├── shared/                    # Megosztott komponensek
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   └── modal/
│   │   └── shared.module.ts
│   │
│   ├── app-routing.module.ts      # Fő routing konfiguráció
│   ├── app.component.ts           # Root komponens
│   └── app.module.ts              # Root modul
│
├── assets/                        # Statikus fájlok
│   └── skillforge.png            # Logo
│
├── environments/                  # Környezeti konfigurációk
│   ├── environment.ts
│   └── environment.prod.ts
│
└── styles.scss                    # Globális stílusok
```

## 🧩 Komponensek

### Core Komponensek

#### Navbar
- Reszponzív navigációs sáv
- SkillForge logó
- Desktop és mobil menü
- Aktív route kiemelés
- Kijelentkezés funkció

#### Modal
- Újrafelhasználható modal komponens
- Egyedi tartalom projekció
- Bezárás eseménykezelés

### Page Komponensek

#### Dashboard
- Üdvözlő üzenet
- Gyors hozzáférés a fő funkciókhoz
- Statisztikák megjelenítése

#### Login
- Bejelentkezési űrlap
- Email és jelszó validáció
- Autentikáció kezelés

#### Courses (Feature Module)
- **CourseList**: Kurzusok listázása, keresés, szűrés
- **CourseDetail**: Kurzus részletes nézete
- **CourseForm**: Kurzus létrehozása/szerkesztése

#### Students
- Hallgatók listája
- Kártyás nézet
- Avatar generálás
- Kurzusok száma megjelenítése

#### Instructors
- Oktatók listája
- Tanszék információk
- Kurzusok száma

#### Contact
- Kapcsolatfelvételi űrlap
- Validáció
- Elérhetőségi információk

#### About
- Küldetés
- Értékek (4 kártya)
- Statisztikák (4 számláló)
- Technológiai stack

## 🛣️ Routing

### Route Konfiguráció

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: CourseFormComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'courses/edit/:id', component: CourseFormComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent }
];
```

### Navigáció

A navigáció a navbar-on keresztül történik, amely `routerLink` direktívát használ:

```html
<a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
  Dashboard
</a>
```

## 🔌 API Integráció

### HTTP Interceptor

Az `AuthInterceptor` automatikusan hozzáadja az autentikációs tokent minden HTTP kéréshez:

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('authToken');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next.handle(req);
}
```

### Course Service

Példa a kurzus szolgáltatás használatára:

```typescript
// Összes kurzus lekérése
this.courseService.getCourses().subscribe(courses => {
  this.courses = courses;
});

// Egy kurzus lekérése
this.courseService.getCourseById(id).subscribe(course => {
  this.course = course;
});

// Kurzus létrehozása
this.courseService.createCourse(courseData).subscribe(response => {
  console.log('Kurzus létrehozva:', response);
});
```

## 💻 Fejlesztés

### Kódolási Standardok

- **TypeScript**: Szigorú típusosság
- **Component Naming**: `*.component.ts`, `*.component.html`, `*.component.scss`
- **Service Naming**: `*.service.ts`
- **Model Naming**: `*.model.ts`

### SCSS Struktúra

Globális változók és mixinek a `styles.scss` fájlban:

```scss
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
}
```

### Komponens Generálás

Új komponens létrehozása:
```bash
ng generate component features/your-feature/components/your-component
```

Új service létrehozása:
```bash
ng generate service features/your-feature/services/your-service
```

### Git Workflow

1. Új branch létrehozása feature-höz:
```bash
git checkout -b feature/your-feature-name
```

2. Változtatások commitolása:
```bash
git add .
git commit -m "feat: add your feature description"
```

3. Push a remote-ra:
```bash
git push origin feature/your-feature-name
```

4. Pull Request létrehozása a GitHub-on

## 🤝 Közreműködés

Szeretettel várunk minden hozzájárulást! Kérjük, kövesd az alábbi lépéseket:

1. **Fork** a repository-t
2. **Clone** a saját fork-od
3. **Hozz létre** egy új branch-et a feature-höz
4. **Commit** a változtatásokat
5. **Push** a branch-et
6. **Nyiss** egy Pull Request-et

### Issue-k Jelentése

Ha hibát találsz vagy új funkciót szeretnél javasolni, nyiss egy issue-t a GitHub-on részletes leírással.

## 📝 Commit Message Konvenció

Használj szemantikus commit üzeneteket:

- `feat:` - Új funkció
- `fix:` - Hibajavítás
- `docs:` - Dokumentáció változtatás
- `style:` - Kód formázás (nem változtat funkcionalitást)
- `refactor:` - Kód refaktorálás
- `test:` - Tesztek hozzáadása vagy módosítása
- `chore:` - Build folyamat vagy segédeszköz változtatások

## 📄 Licenc

Ez a projekt [MIT Licenc](LICENSE) alatt érhető el.

## 👥 Készítők

- **Fejlesztő Csapat** - SkillForge Team

## 🙏 Köszönetnyilvánítás

- Angular csapat a fantasztikus framework-ért
- Minden közreműködőnek
- Open source közösségnek

## 📞 Kapcsolat

- **Email**: info@skillforge.com
- **GitHub**: [https://github.com/kiszol/skillforge](https://github.com/kiszol/skillforge)

---

**SkillForge** - Modern Oktatási Menedzsment Rendszer 🎓✨
