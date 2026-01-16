# SkillForge - Program Dokumentáció

## 📚 Dokumentációs Hivatkozások

Üdvözöllek a SkillForge dokumentációs központjában! Itt megtalálod az összes szükséges információt a projekt megértéséhez, használatához és fejlesztéséhez.

## 📖 Fő Dokumentációk

### 1. [README.md](README.md) - Gyors Áttekintés
A projekt alapvető információi, telepítés, használat és gyors bevezető.

**Tartalom:**
- ✨ Funkciók áttekintése
- 🛠️ Technológiai stack
- 📦 Telepítési útmutató
- 🚀 Használati instrukciók
- 📞 Kapcsolat és támogatás

### 2. [DOCUMENTATION.md](DOCUMENTATION.md) - Teljes Programdokumentáció
Részletes, technikai dokumentáció az egész alkalmazásról.

**Tartalom:**
- 🏗️ Architektúra és struktúra
- 🧩 Komponensek részletes leírása
- 🔧 Szolgáltatások (Services) dokumentációja
- 📦 Modulok felépítése
- 🛣️ Routing és navigáció
- 📊 Adatmodellek
- 🎨 Design system és styling
- 🔌 API kommunikáció
- 🔒 Autentikáció és biztonság
- ⚙️ Környezeti konfigurációk

### 3. [CHANGELOG.md](CHANGELOG.md) - Verzió Történet
Az összes verzió változtatásainak nyomon követése.

**Tartalom:**
- 📅 Verziók listája
- ✨ Új funkciók
- 🐛 Hibajavítások
- 🔧 Módosítások
- 🚀 Tervezett fejlesztések

---

## 🎯 Gyors Linkek Fejlesztőknek

### Architektúra és Struktúra
Lásd: [DOCUMENTATION.md - Architektúra](DOCUMENTATION.md#%EF%B8%8F-architektúra)

### Komponensek
Lásd: [DOCUMENTATION.md - Komponensek](DOCUMENTATION.md#-komponensek-részletes-dokumentációja)

### Services (Szolgáltatások)
Lásd: [DOCUMENTATION.md - Szolgáltatások](DOCUMENTATION.md#-szolgáltatások-services)

### API Integráció
Lásd: [DOCUMENTATION.md - API Kommunikáció](DOCUMENTATION.md#-api-kommunikáció)

### Styling Guide
Lásd: [DOCUMENTATION.md - Design System](DOCUMENTATION.md#-styling-és-design-system)

---

## 🚀 Első Lépések

### 1. Projekt Klónozása
```bash
git clone https://github.com/kiszol/skillforge.git
cd skillforge
```

### 2. Függőségek Telepítése
```bash
npm install
```

### 3. Development Szerver Indítása
```bash
ng serve
```

### 4. Böngészőben Megnyitás
Navigálj a `http://localhost:4200/` címre

---

## 📋 Tartalomjegyzék - Gyors Hivatkozások

### Alapvető Dokumentumok
1. **[README.md](README.md)** - Projekt áttekintés és gyors indítás
2. **[DOCUMENTATION.md](DOCUMENTATION.md)** - Teljes technikai dokumentáció
3. **[CHANGELOG.md](CHANGELOG.md)** - Verzió történet és változások

### Technikai Részletek

#### Komponensek Leírása
- [App Component](DOCUMENTATION.md#1-app-component-root) - Root komponens
- [Navbar Component](DOCUMENTATION.md#2-navbar-component) - Navigációs sáv
- [Dashboard Component](DOCUMENTATION.md#3-dashboard-component) - Főoldal
- [Login Component](DOCUMENTATION.md#4-login-component) - Bejelentkezés
- [Courses Module](DOCUMENTATION.md#5-courses-module) - Kurzusok kezelése
  - Course List - Kurzuslista
  - Course Detail - Kurzus részletek
  - Course Form - Kurzus létrehozás/szerkesztés
- [Students Component](DOCUMENTATION.md#6-students-component) - Hallgatók
- [Instructors Component](DOCUMENTATION.md#7-instructors-component) - Oktatók
- [Contact Component](DOCUMENTATION.md#8-contact-component) - Kapcsolat
- [About Component](DOCUMENTATION.md#9-about-component) - Rólunk

#### Services (Szolgáltatások)
- [AuthService](DOCUMENTATION.md#1-authservice) - Autentikáció
- [CourseService](DOCUMENTATION.md#2-courseservice) - Kurzusok CRUD
- [RealtimeService](DOCUMENTATION.md#3-realtimeservice) - WebSocket

#### Modulok
- [CoreModule](DOCUMENTATION.md#1-coremodule) - Singleton szolgáltatások
- [SharedModule](DOCUMENTATION.md#2-sharedmodule) - Közös komponensek
- [CoursesModule](DOCUMENTATION.md#3-coursesmodule) - Kurzusok feature modul

#### Routing és Adatok
- [Routing Konfiguráció](DOCUMENTATION.md#%EF%B8%8F-routing-és-navigáció) - Route-ok beállítása
- [Adatmodellek](DOCUMENTATION.md#-adatmodellek) - TypeScript interfészek

#### Design és Styling
- [Design System](DOCUMENTATION.md#-styling-és-design-system) - SCSS változók és konvenciók
- [Styling Pattern](DOCUMENTATION.md#komponens-styling-pattern) - Komponens stílus minta

#### API és Biztonság
- [API Kommunikáció](DOCUMENTATION.md#-api-kommunikáció) - HTTP Interceptor
- [Autentikáció](DOCUMENTATION.md#-autentikáció-és-biztonság) - Token kezelés
- [Környezeti Változók](DOCUMENTATION.md#%EF%B8%8F-környezeti-konfigurációk) - Environment fájlok

---

## 💡 Gyakori Feladatok

### Új Komponens Hozzáadása
```bash
ng generate component path/to/component-name
```
Részletek: [DOCUMENTATION.md - Fejlesztési Útmutató](DOCUMENTATION.md#-fejlesztési-útmutató)

### Új Service Létrehozása
```bash
ng generate service path/to/service-name
```

### Új Route Hozzáadása
Szerkeszd az `app-routing.module.ts` fájlt.
Példa: [DOCUMENTATION.md - Routing](DOCUMENTATION.md#route-konfiguráció)

### API Hívás Implementálása
Használd a Service osztályokat.
Példa: [DOCUMENTATION.md - CourseService](DOCUMENTATION.md#2-courseservice)

### Form Validáció
Reactive Forms használata validációval.
Példa: [DOCUMENTATION.md - Course Form](DOCUMENTATION.md#53-course-form-component)

---

## 🧪 Tesztelés

### Unit Tesztek Futtatása
```bash
ng test
```

### Code Coverage
```bash
ng test --code-coverage
```

### E2E Tesztek
```bash
ng e2e
```

Részletek: [DOCUMENTATION.md - Tesztelés](DOCUMENTATION.md#-tesztelés)

---

## 🏗️ Build és Deploy

### Development Build
```bash
ng serve
```

### Production Build
```bash
ng build --configuration production
```

A build output a `dist/` mappában lesz.

Részletek: [DOCUMENTATION.md - Build és Deploy](DOCUMENTATION.md#-build-és-deploy)

---

## 📱 Projekt Struktúra Áttekintése

```
src/
├── app/
│   ├── core/                   # Singleton szolgáltatások
│   │   ├── interceptors/       # HTTP interceptorok
│   │   └── services/           # Auth, Realtime stb.
│   ├── features/               # Feature modulok
│   │   └── courses/            # Kurzusok modul
│   ├── pages/                  # Oldal komponensek
│   ├── shared/                 # Megosztott komponensek
│   ├── app-routing.module.ts   # Routing
│   └── app.module.ts           # Root modul
├── assets/                     # Statikus fájlok
├── environments/               # Környezeti változók
└── styles.scss                 # Globális stílusok
```

Részletes struktúra: [DOCUMENTATION.md - Projekt Struktúra](DOCUMENTATION.md#-projekt-struktúra)

---

## 🔍 Kódolási Konvenciók

### TypeScript
- **Komponensek**: PascalCase (`CourseListComponent`)
- **Services**: PascalCase + Service suffix (`CourseService`)
- **Változók**: camelCase (`courseList`)
- **Konstansok**: UPPER_SNAKE_CASE (`API_URL`)

### Fájlnevek
- **Komponens**: `component-name.component.ts`
- **Service**: `service-name.service.ts`
- **Model**: `model-name.model.ts`

### CSS/SCSS
- **Osztályok**: kebab-case (`course-card`)
- **BEM módszer**: block__element--modifier

Teljes guide: [DOCUMENTATION.md - Kódolási Standardok](DOCUMENTATION.md#kódolási-standardok)

---

## 🔗 Hasznos Parancsok

### Angular CLI Parancsok
```bash
# Új komponens
ng g c path/to/component

# Új service
ng g s path/to/service

# Új modul routing-gal
ng g m path/to/module --routing

# Build production-re
ng build --prod

# Tesztek futtatása
ng test

# Lint ellenőrzés
ng lint
```

### Git Parancsok
```bash
# Új branch létrehozása
git checkout -b feature/feature-name

# Változtatások commitolása
git add .
git commit -m "feat: add new feature"

# Push
git push origin feature/feature-name
```

---

## 📞 Segítségkérés

### Dokumentáció Olvasása
Először nézd át a [DOCUMENTATION.md](DOCUMENTATION.md) fájlt, amely részletes magyarázatot ad minden komponensről és funkcióról.

### GitHub Issues
Ha kérdésed van vagy hibát találsz:
1. Ellenőrizd a meglévő [Issues-t](https://github.com/kiszol/skillforge/issues)
2. Ha nem találod, nyiss új Issue-t
3. Használd a megfelelő címkéket (bug, question, enhancement)

### Kapcsolat
- **Email**: info@skillforge.com
- **GitHub**: [https://github.com/kiszol/skillforge](https://github.com/kiszol/skillforge)

---

## 📚 További Tanulási Anyagok

### Angular
- [Angular Official Docs](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [Angular Style Guide](https://angular.io/guide/styleguide)

### TypeScript
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### RxJS
- [RxJS Docs](https://rxjs.dev/)
- [Learn RxJS](https://www.learnrxjs.io/)

### SCSS
- [Sass Documentation](https://sass-lang.com/documentation)

---

## ✅ Checklist Új Fejlesztők Számára

- [ ] README.md elolvasása
- [ ] DOCUMENTATION.md áttekintése
- [ ] Projekt klónozása és telepítése
- [ ] Development szerver futtatása
- [ ] Projekt struktúra megértése
- [ ] Egy meglévő komponens áttekintése
- [ ] API dokumentáció megismerése
- [ ] Git workflow megértése

---

## 🎉 Köszönetnyilvánítás

Köszönjük, hogy érdekel a SkillForge projekt!

Minden visszajelzést és hozzájárulást nagyra értékelünk. Együtt építsük a legjobb oktatási menedzsment rendszert! 🚀

---

**SkillForge Team** - 2026

*Dokumentáció verzió: 1.0.0*
*Utolsó frissítés: 2026-01-16*


## 🤝 Magatartási Kódex

### Várható Viselkedés

- Legyél tiszteletteljes és befogadó minden résztvevővel szemben
- Fogadd el a konstruktív kritikát
- Fókuszálj arra, ami a legjobb a közösség számára
- Mutass empátiát más közreműködők felé

### Nem Elfogadható Viselkedés

- Trollkodás, sértő vagy lenéző megjegyzések
- Zaklatás bármilyen formában
- Mások személyes információinak közzététele
- Professzionális környezetben nem megfelelő magatartás

## 🛠️ Hogyan járulhatok hozzá?

### Típusok

1. **Bug Report** - Hiba jelentése
2. **Feature Request** - Új funkció javaslata
3. **Code Contribution** - Kód hozzájárulás
4. **Documentation** - Dokumentáció javítása
5. **Testing** - Tesztek írása

### Kezdő Lépések

1. Nézd át a meglévő [issues-okat](https://github.com/kiszol/skillforge/issues)
2. Keress egy "good first issue" vagy "help wanted" címkéjű feladatot
3. Kommentálj az issue-ra, hogy jelezd szándékodat
4. Várj a jóváhagyásra a projekt fenntartójától

## 💻 Fejlesztői Környezet Beállítása

### 1. Fork és Clone

```bash
# Fork a repository-t a GitHub felületen
git clone https://github.com/YOUR-USERNAME/skillforge.git
cd skillforge
```

### 2. Upstream Remote Hozzáadása

```bash
git remote add upstream https://github.com/kiszol/skillforge.git
```

### 3. Függőségek Telepítése

```bash
npm install
```

### 4. Development Szerver Indítása

```bash
ng serve
```

### 5. Új Branch Létrehozása

```bash
git checkout -b feature/your-feature-name
# vagy
git checkout -b fix/your-bug-fix-name
```

## 📝 Kódolási Standardok

### TypeScript

```typescript
// ✅ Jó
export class CourseService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }
}

// ❌ Rossz
export class CourseService {
  apiUrl = environment.apiUrl; // nincs access modifier
  
  constructor(http: HttpClient) {} // nincs access modifier
  
  getCourses() { // nincs return type
    return this.http.get(`${this.apiUrl}/courses`); // nincs generic type
  }
}
```

### HTML Template

```html
<!-- ✅ Jó -->
<div class="course-card" *ngIf="course">
  <h3>{{ course.title }}</h3>
  <p>{{ course.description }}</p>
  <button (click)="onEdit(course.id)" class="btn btn-primary">
    Szerkesztés
  </button>
</div>

<!-- ❌ Rossz -->
<div class="course-card" *ngIf="course">
  <h3>{{course.title}}</h3><!-- nincs space -->
  <p>{{course.description}}</p>
  <button (click)="onEdit(course.id)" class="btn btn-primary">Szerkesztés</button><!-- egy sorban -->
</div>
```

### SCSS

```scss
// ✅ Jó
.course-card {
  padding: var(--spacing-md);
  background: white;
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  .course-title {
    font-size: 1.5rem;
    color: var(--color-primary);
  }
}

// ❌ Rossz
.course-card {
  padding: 16px; // ne használj fix értékeket
  background: #ffffff; // használj változókat
  border-radius: 8px;
  
  .course-title { // nincs megfelelő beágyazás
    font-size: 1.5rem;
  }
}
```

### Nevezési Konvenciók

- **Komponensek**: PascalCase (`CourseListComponent`)
- **Services**: PascalCase + Service suffix (`CourseService`)
- **Fájlok**: kebab-case (`course-list.component.ts`)
- **Változók**: camelCase (`courseList`)
- **Konstansok**: UPPER_SNAKE_CASE (`API_URL`)
- **CSS osztályok**: kebab-case (`course-card`)

## 💬 Commit Üzenetek

### Formátum

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: Új funkció
- `fix`: Hibajavítás
- `docs`: Dokumentáció
- `style`: Formázás (nem változtat kódot)
- `refactor`: Refaktorálás
- `test`: Tesztek
- `chore`: Build vagy konfigurációs változtatások

### Példák

```bash
feat(courses): add course filtering functionality

- Add search input component
- Implement filter logic in course service
- Update course list component to use filter

Closes #123

---

fix(navbar): resolve mobile menu toggle issue

The mobile menu wasn't closing after navigation.
Fixed by adding router event listener.

Fixes #456

---

docs(readme): update installation instructions

Add detailed steps for environment setup
```

### Szabályok

- Használj parancsoló módot: "add" nem "added" vagy "adds"
- Ne használj nagybetűt a subject elején
- Ne használj pontot a subject végén
- A body-ban magyarázd el a MIÉRT-et, nem a MIT-et
- Hivatkozz az issue számára ha van

## 🔀 Pull Request Folyamat

### 1. Frissítsd a Branch-ed

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Futtasd a Teszteket

```bash
ng test
ng lint
ng build --configuration production
```

### 3. Push a Branch-ed

```bash
git push origin feature/your-feature-name
```

### 4. Nyiss Pull Request-et

- Menj a GitHub repository-ra
- Kattints a "New Pull Request" gombra
- Válaszd ki a branch-edet
- Töltsd ki a PR template-et

### Pull Request Template

```markdown
## Leírás
[Rövid leírás a változtatásokról]

## Kapcsolódó Issue-k
Closes #[issue szám]

## Változtatások Típusa
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Tesztelés
[Hogyan lehet tesztelni a változtatásokat]

## Checklist
- [ ] A kódom követi a projekt kódolási standardjait
- [ ] Elvégeztem a saját code review-mat
- [ ] Kommentáltam a kódot, különösen a nehezen érthető részeket
- [ ] Megfelelő változtatásokat végeztem a dokumentációban
- [ ] Nem generáltak új warningokat a változtatásaim
- [ ] Hozzáadtam teszteket, amelyek bizonyítják, hogy a javításom működik
- [ ] Az új és meglévő unit tesztek sikeresen lefutnak lokálisan
```

### Review Folyamat

1. A maintainer átnézi a PR-t
2. Kérhet változtatásokat
3. Implementáld a kért változtatásokat
4. Push újra a branch-re
5. A PR automatikusan frissül
6. Jóváhagyás után merge történik

## 🐛 Issue-k Jelentése

### Bug Report Template

```markdown
## Hiba Leírása
[Világos és rövid leírás a hibáról]

## Reprodukálás Lépései
1. Menj ide: '...'
2. Kattints erre: '...'
3. Scrollozz le ide: '...'
4. Lásd a hibát

## Elvárt Viselkedés
[Mit vártál, hogy történjen]

## Tényleges Viselkedés
[Mi történt valójában]

## Screenshots
[Ha alkalmazható, adj hozzá screenshotokat]

## Környezet
- OS: [pl. Windows 10]
- Browser: [pl. Chrome 120]
- Node verzió: [pl. 18.0.0]
- Angular verzió: [pl. 14.2.0]

## További Kontextus
[Bármilyen egyéb információ a problémáról]
```

### Feature Request Template

```markdown
## Feature Leírás
[Világos és rövid leírás a funkcióról]

## Probléma Megoldása
[Mi a probléma, amit ez a feature megoldana?]

## Javasolt Megoldás
[Hogyan képzeled el a megoldást?]

## Alternatívák
[Milyen alternatív megoldásokat fontolóra vettél?]

## További Kontextus
[Screenshots, mockupok, stb.]
```

## 🧪 Tesztelés

### Unit Tesztek

```typescript
describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch courses', () => {
    const mockCourses = [
      { id: 1, title: 'Course 1' },
      { id: 2, title: 'Course 2' }
    ];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
```

### E2E Tesztek

```typescript
describe('Course List Page', () => {
  it('should display courses', () => {
    cy.visit('/courses');
    cy.get('.course-card').should('have.length.greaterThan', 0);
  });

  it('should navigate to course detail', () => {
    cy.visit('/courses');
    cy.get('.course-card').first().click();
    cy.url().should('include', '/courses/');
  });
});
```

## 📚 Dokumentáció

### JSDoc Kommentek

```typescript
/**
 * Service a kurzusok kezeléséhez.
 * Biztosítja a CRUD műveleteket a kurzusokhoz.
 */
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  /**
   * Lekéri az összes kurzust.
   * @returns Observable tömb a kurzusokkal
   */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  /**
   * Lekér egy kurzust ID alapján.
   * @param id - A kurzus azonosítója
   * @returns Observable a kurzussal
   */
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }
}
```

## ❓ Kérdések?

Ha bármilyen kérdésed van:

1. Nézd meg a [meglévő issue-kat](https://github.com/kiszol/skillforge/issues)
2. Nyiss egy új issue-t "question" címkével
3. Írj emailt: info@skillforge.com

## 🎉 Elismerés

Minden hozzájárulót megemlítünk a projekt [Contributors](https://github.com/kiszol/skillforge/graphs/contributors) szekciójában.

---

**Köszönjük a közreműködésedet! 🙏**
