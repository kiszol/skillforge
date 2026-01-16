# SkillForge - Teljes Programdokumentáció

## 📚 Tartalomjegyzék

1. [Projekt Áttekintés](#projekt-áttekintés)
2. [Architektúra](#architektúra)
3. [Komponensek Részletes Dokumentációja](#komponensek-részletes-dokumentációja)
4. [Szolgáltatások (Services)](#szolgáltatások-services)
5. [Modulok](#modulok)
6. [Routing és Navigáció](#routing-és-navigáció)
7. [Adatmodellek](#adatmodellek)
8. [Styling és Design System](#styling-és-design-system)
9. [API Kommunikáció](#api-kommunikáció)
10. [Autentikáció és Biztonság](#autentikáció-és-biztonság)
11. [Környezeti Konfigurációk](#környezeti-konfigurációk)

---

## 📋 Projekt Áttekintés

### Mi a SkillForge?

A **SkillForge** egy komplett, Angular 14+ alapú oktatási menedzsment rendszer, amely modern technológiákat használ az oktatási intézmények adminisztrációjának egyszerűsítésére.

### Fő Célok

- 🎯 **Egyszerűség**: Könnyen használható felület oktatók és adminisztrátorok számára
- ⚡ **Teljesítmény**: Gyors, reaktív alkalmazás RxJS használatával
- 🔒 **Biztonság**: Token alapú autentikáció és védett route-ok
- 📱 **Reszponzivitás**: Működik minden eszközön (desktop, tablet, mobil)
- 🎨 **Modern Design**: Tiszta, professzionális megjelenés

### Technológiai Stack

```
Frontend Framework: Angular 14+
Nyelv: TypeScript 4.8+
Styling: SCSS (Sass)
State Management: RxJS Observables
HTTP Client: Angular HttpClient
Routing: Angular Router
Forms: Reactive Forms & Template-driven Forms
Build Tool: Angular CLI & Webpack
```

---

## 🏗️ Architektúra

### Általános Struktúra

A projekt követi az Angular Best Practices-t és a következő architektúrát használja:

```
┌─────────────────────────────────────────┐
│         App Module (Root)               │
│  ┌───────────────────────────────────┐  │
│  │     Core Module                   │  │
│  │  - Services (Singleton)           │  │
│  │  - Interceptors                   │  │
│  │  - Guards                         │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │     Shared Module                 │  │
│  │  - Common Components              │  │
│  │  - Directives                     │  │
│  │  - Pipes                          │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │     Feature Modules               │  │
│  │  - Courses Module                 │  │
│  │  - (Future: Students, Teachers)   │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │     Pages (Lazy Loadable)         │  │
│  │  - Dashboard                      │  │
│  │  - Login                          │  │
│  │  - Students                       │  │
│  │  - Instructors                    │  │
│  │  - Contact                        │  │
│  │  - About                          │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Modul Hierarchia

1. **AppModule** (Root)
   - Bootstrap: AppComponent
   - Imports: CoreModule, SharedModule, Feature Modules, Pages

2. **CoreModule** (Singleton)
   - Services: AuthService, RealtimeService
   - Interceptors: AuthInterceptor
   - Csak egyszer töltődik be

3. **SharedModule** (Többször használható)
   - Components: Navbar, Modal
   - Exportálja a közös komponenseket

4. **Feature Modules** (Funkciók csoportosítása)
   - CoursesModule: Kurzusok kezelése
   - Lazy loading támogatással

---

## 🧩 Komponensek Részletes Dokumentációja

### 1. App Component (Root)

**Fájl**: `src/app/app.component.ts`

**Felelősség**: Az alkalmazás gyökér komponense, amely tartalmazza a navbar-t és a router-outlet-et.

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SkillForge';
}
```

**Template Struktúra**:
```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```

---

### 2. Navbar Component

**Fájl**: `src/app/shared/components/navbar/navbar.component.ts`

**Felelősség**: Navigációs sáv, amely tartalmazza a menüpontokat és a felhasználói műveleteket.

**Funkciók**:
- SkillForge logó megjelenítése
- Navigációs linkek (Dashboard, Kurzusok, Hallgatók, Oktatók, Kapcsolat, Rólunk)
- Aktív route kiemelése `routerLinkActive` direktívával
- Mobil menü toggle funkció
- Kijelentkezés gomb

**Komponens Kód**:
```typescript
export class NavbarComponent implements OnInit {
  menuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
```

**SCSS Struktúra**:
- Reszponzív design (desktop + mobil)
- CSS Grid és Flexbox layout
- Hover effektek
- Smooth transitions
- Sticky pozicionálás

---

### 3. Dashboard Component

**Fájl**: `src/app/pages/dashboard/dashboard.component.ts`

**Felelősség**: Főoldal, amely áttekintést nyújt a rendszerről.

**Funkciók**:
- Üdvözlő üzenet megjelenítése
- Gyors navigációs kártyák
- Statisztikák megjelenítése (hallgatók, oktatók, kurzusok száma)

**Komponens Kód**:
```typescript
export class DashboardComponent implements OnInit {
  stats = {
    students: 0,
    instructors: 0,
    courses: 0
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data;
    });
  }
}
```

**Template Jellemzők**:
- Card layout statisztikákhoz
- Grid rendszer gyors linkekhez
- Animált számlálók (opcionális)

---

### 4. Login Component

**Fájl**: `src/app/pages/login/login.component.ts`

**Felelősség**: Bejelentkezési oldal autentikációval.

**Funkciók**:
- Email és jelszó beviteli mezők
- Form validáció (required, email formátum)
- Login gomb kezelés
- Hibaüzenetek megjelenítése
- Sikeres bejelentkezés után átirányítás

**Komponens Kód**:
```typescript
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Hibás email vagy jelszó';
          this.loading = false;
        }
      });
    }
  }
}
```

**Form Validáció**:
- Email: kötelező + email formátum
- Jelszó: kötelező + minimum 6 karakter

---

### 5. Courses Module

#### 5.1 Course List Component

**Fájl**: `src/app/features/courses/components/course-list/course-list.component.ts`

**Felelősség**: Kurzusok listázása kártyás nézetben.

**Funkciók**:
- Kurzusok betöltése API-ból
- Keresési funkció (cím alapján)
- Szűrés állapot szerint (Aktív/Inaktív)
- Kártyás nézet
- Navigáció kurzus részletekhez
- Új kurzus létrehozása gomb

**Komponens Kód**:
```typescript
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm = '';
  loading = false;

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  createCourse(): void {
    this.router.navigate(['/courses/new']);
  }
}
```

**Template Jellemzők**:
- Keresési input
- Grid layout (3 oszlop desktop, 1 oszlop mobil)
- Loading spinner
- Empty state üzenet

#### 5.2 Course Detail Component

**Fájl**: `src/app/features/courses/components/course-detail/course-detail.component.ts`

**Felelősség**: Egy kurzus részletes megjelenítése.

**Funkciók**:
- Kurzus részletek betöltése ID alapján
- Oktató információk megjelenítése
- Beiratkozott hallgatók száma
- Kurzus leírás
- Szerkesztés gomb
- Törlés gomb (megerősítéssel)
- Vissza gomb

**Komponens Kód**:
```typescript
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadCourse(id);
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.courseService.getCourseById(id).subscribe({
      next: (data) => {
        this.course = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.loading = false;
        this.router.navigate(['/courses']);
      }
    });
  }

  editCourse(): void {
    if (this.course) {
      this.router.navigate(['/courses/edit', this.course.id]);
    }
  }

  deleteCourse(): void {
    if (this.course && confirm('Biztosan törölni szeretnéd ezt a kurzust?')) {
      this.courseService.deleteCourse(this.course.id).subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Error deleting course:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
```

#### 5.3 Course Form Component

**Fájl**: `src/app/features/courses/components/course-form/course-form.component.ts`

**Felelősség**: Kurzus létrehozása és szerkesztése.

**Funkciók**:
- Reaktív form kurzus adatokhoz
- Validációk (kötelező mezők, minimum/maximum értékek)
- Képfeltöltés (opcionális)
- Oktató kiválasztása dropdown-ból
- Mentés gomb (létrehozás vagy frissítés)
- Mégse gomb

**Komponens Kód**:
```typescript
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  courseId: number | null = null;
  instructors: Instructor[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      instructorId: ['', Validators.required],
      maxStudents: [30, [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isActive: [true],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadInstructors();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.courseId = +id;
      this.loadCourse(this.courseId);
    }
  }

  loadInstructors(): void {
    // Load instructors from API
  }

  loadCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe(course => {
      this.courseForm.patchValue(course);
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      
      if (this.isEditMode && this.courseId) {
        this.courseService.updateCourse(this.courseId, courseData).subscribe({
          next: () => {
            this.router.navigate(['/courses', this.courseId]);
          },
          error: (error) => console.error('Error updating course:', error)
        });
      } else {
        this.courseService.createCourse(courseData).subscribe({
          next: (response) => {
            this.router.navigate(['/courses', response.id]);
          },
          error: (error) => console.error('Error creating course:', error)
        });
      }
    }
  }

  cancel(): void {
    if (this.isEditMode && this.courseId) {
      this.router.navigate(['/courses', this.courseId]);
    } else {
      this.router.navigate(['/courses']);
    }
  }
}
```

**Form Validációk**:
- Cím: kötelező, min 3 karakter
- Leírás: kötelező, min 10 karakter
- Oktató: kötelező
- Maximum hallgatók: kötelező, min 1
- Kezdő dátum: kötelező
- Befejező dátum: kötelező

---

### 6. Students Component

**Fájl**: `src/app/pages/students/students.component.ts`

**Felelősség**: Hallgatók listázása.

**Funkciók**:
- Hallgatók betöltése
- Kártyás nézet
- Avatar generálás (kezdőbetűkből)
- Email megjelenítése
- Kurzusok száma

**Komponens Kód**:
```typescript
export class StudentsComponent implements OnInit {
  students: any[] = [];
  loading = false;

  constructor() {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.students = [
        { id: 1, name: 'Kiss Anna', email: 'kiss.anna@example.com', courses: 3 },
        { id: 2, name: 'Nagy Péter', email: 'nagy.peter@example.com', courses: 2 },
        { id: 3, name: 'Szabó Eszter', email: 'szabo.eszter@example.com', courses: 4 }
      ];
      this.loading = false;
    }, 500);
  }
}
```

**Design Jellemzők**:
- Grid layout (3 oszlop)
- Színes avatar körök
- Hover effektek
- Statisztikák megjelenítése

---

### 7. Instructors Component

**Fájl**: `src/app/pages/instructors/instructors.component.ts`

**Felelősség**: Oktatók listázása.

**Funkciók**:
- Oktatók betöltése
- Kártyás nézet
- Tanszék megjelenítése
- Kurzusok száma

**Komponens Kód**:
```typescript
export class InstructorsComponent implements OnInit {
  instructors: any[] = [];
  loading = false;

  constructor() {}

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors(): void {
    this.loading = true;
    setTimeout(() => {
      this.instructors = [
        { id: 1, name: 'Dr. Kovács János', department: 'Informatika', courses: 5 },
        { id: 2, name: 'Dr. Tóth Mária', department: 'Matematika', courses: 3 },
        { id: 3, name: 'Dr. Horváth Gábor', department: 'Fizika', courses: 4 }
      ];
      this.loading = false;
    }, 500);
  }
}
```

---

### 8. Contact Component

**Fájl**: `src/app/pages/contact/contact.component.ts`

**Felelősség**: Kapcsolatfelvételi űrlap.

**Funkciók**:
- Kapcsolati űrlap (név, email, tárgy, üzenet)
- Validáció
- Elérhetőségi információk megjelenítése
- Űrlap elküldése

**Komponens Kód**:
```typescript
export class ContactComponent implements OnInit {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Contact form submitted:', this.contactForm);
    alert('Üzenet elküldve! Hamarosan felvesszük Önnel a kapcsolatot.');
    this.resetForm();
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
```

**Elérhetőségi Információk**:
- Cím
- Telefon
- Email
- Nyitvatartás

---

### 9. About Component

**Fájl**: `src/app/pages/about/about.component.ts`

**Felelősség**: Információs oldal a rendszerről.

**Funkciók**:
- Küldetés megjelenítése
- Értékek bemutatása (4 kártya)
- Statisztikák (hallgatók, oktatók, kurzusok, tapasztalat)
- Technológiai stack

**Template Struktúra**:
```html
<!-- Küldetés -->
<section class="mission">
  <h2>🎓 Küldetésünk</h2>
  <p>...</p>
</section>

<!-- Értékek -->
<section class="values">
  <div class="value-card">💡 Innováció</div>
  <div class="value-card">🤝 Együttműködés</div>
  <div class="value-card">🎯 Egyszerűség</div>
  <div class="value-card">🔒 Biztonság</div>
</section>

<!-- Statisztikák -->
<section class="stats">
  <div class="stat-card">500+ Hallgató</div>
  <div class="stat-card">50+ Oktató</div>
  <div class="stat-card">100+ Kurzus</div>
  <div class="stat-card">5+ Év</div>
</section>

<!-- Technológiák -->
<section class="tech">
  <span class="tech-tag">Angular</span>
  <span class="tech-tag">TypeScript</span>
  <!-- ... -->
</section>
```

---

## 🔧 Szolgáltatások (Services)

### 1. AuthService

**Fájl**: `src/app/core/services/auth.service.ts`

**Felelősség**: Autentikáció kezelése.

**Funkciók**:
- Login
- Logout
- Token tárolás
- Token validáció
- Felhasználói információk lekérése

**Szolgáltatás Kód**:
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private loadCurrentUser(): void {
    const token = this.getToken();
    if (token) {
      // Decode token and load user info
    }
  }
}
```

---

### 2. CourseService

**Fájl**: `src/app/features/courses/services/course.service.ts`

**Felelősség**: Kurzusok CRUD műveletei.

**Funkciók**:
- Összes kurzus lekérése
- Egy kurzus lekérése ID alapján
- Kurzus létrehozása
- Kurzus frissítése
- Kurzus törlése

**Szolgáltatás Kód**:
```typescript
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCourses(term: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/search?q=${term}`);
  }
}
```

---

### 3. RealtimeService

**Fájl**: `src/app/core/services/realtime.service.ts`

**Felelősség**: WebSocket kommunikáció real-time frissítésekhez.

**Funkciók**:
- WebSocket kapcsolat kezelése
- Események figyelése
- Üzenetek küldése

---

## 📦 Modulok

### 1. CoreModule

**Fájl**: `src/app/core/core.module.ts`

**Felelősség**: Singleton szolgáltatások és globális konfigurációk.

```typescript
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    RealtimeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
```

---

### 2. SharedModule

**Fájl**: `src/app/shared/shared.module.ts`

**Felelősség**: Megosztott komponensek, direktívák, pipe-ok.

```typescript
@NgModule({
  declarations: [
    NavbarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
```

---

### 3. CoursesModule

**Fájl**: `src/app/features/courses/courses.module.ts`

**Felelősség**: Kurzusok feature modul.

```typescript
@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
```

---

## 🛣️ Routing és Navigáció

### Route Konfiguráció

**Fájl**: `src/app/app-routing.module.ts`

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  
  // Courses routes
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'courses/new', component: CourseFormComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: 'courses/edit/:id', component: CourseFormComponent, canActivate: [AuthGuard] },
  
  // Other pages
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'instructors', component: InstructorsComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  
  // Wildcard route
  { path: '**', redirectTo: '/dashboard' }
];
```

### Route Guards

**AuthGuard** - Védett route-ok kezelése:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

---

## 📊 Adatmodellek

### Course Model

**Fájl**: `src/app/features/courses/models/course.model.ts`

```typescript
export interface Course {
  id: number;
  title: string;
  description: string;
  instructorId: number;
  instructor?: Instructor;
  maxStudents: number;
  enrolledStudents: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Instructor Model

**Fájl**: `src/app/features/courses/models/instructor.model.ts`

```typescript
export interface Instructor {
  id: number;
  name: string;
  email: string;
  department: string;
  bio?: string;
  imageUrl?: string;
}
```

### Student Model

**Fájl**: `src/app/features/courses/models/student.model.ts`

```typescript
export interface Student {
  id: number;
  name: string;
  email: string;
  enrolledCourses: number[];
  registrationDate: Date;
}
```

---

## 🎨 Styling és Design System

### SCSS Változók

**Fájl**: `src/styles.scss`

```scss
:root {
  // Colors
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
  
  // Spacing
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
  
  // Font sizes
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  
  // Shadows
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  // Border radius
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}
```

### Komponens Styling Pattern

```scss
.component-name {
  padding: var(--spacing-md);
  
  &__header {
    margin-bottom: var(--spacing-lg);
  }
  
  &__title {
    font-size: var(--font-size-xl);
    color: var(--color-primary);
  }
  
  &__content {
    display: grid;
    gap: var(--spacing-md);
  }
  
  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
    transition: all 0.3s ease;
  }
}
```

---

## 🔌 API Kommunikáció

### HTTP Interceptor

**Fájl**: `src/app/core/interceptors/auth.interceptor.ts`

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }
    
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          // Redirect to login
        }
        return throwError(() => error);
      })
    );
  }
}
```

---

## 🔒 Autentikáció és Biztonság

### Token Kezelés

1. **Login folyamat**:
   - Felhasználó bejelentkezik
   - Backend visszaad egy JWT tokent
   - Token tárolása localStorage-ban
   - Token hozzáadása minden API híváshoz

2. **Logout folyamat**:
   - Token törlése localStorage-ból
   - User state nullázása
   - Átirányítás login oldalra

3. **Token Refresh** (opcionális):
   - Token lejárat figyelése
   - Automatikus refresh token használata
   - Új token lekérése háttérben

---

## ⚙️ Környezeti Konfigurációk

### Development Environment

**Fájl**: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  websocketUrl: 'ws://localhost:3000',
  enableDebugTools: true,
  logLevel: 'debug'
};
```

### Production Environment

**Fájl**: `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.skillforge.com',
  websocketUrl: 'wss://api.skillforge.com',
  enableDebugTools: false,
  logLevel: 'error'
};
```

---

## 🚀 Build és Deploy

### Development Build

```bash
ng serve
# vagy
ng serve --open
# vagy custom port
ng serve --port 4300
```

### Production Build

```bash
ng build --configuration production
# Output: dist/skillforge/
```

### Build Optimalizálás

- **AOT Compilation**: Ahead-of-Time fordítás
- **Tree Shaking**: Használaton kívüli kód eltávolítása
- **Minification**: Kód tömörítése
- **Lazy Loading**: Modulok késleltetett betöltése

---

## 📝 Fejlesztési Útmutató

### Új Komponens Létrehozása

```bash
ng generate component features/your-feature/components/your-component
# vagy röviden
ng g c features/your-feature/components/your-component
```

### Új Service Létrehozása

```bash
ng generate service features/your-feature/services/your-service
# vagy röviden
ng g s features/your-feature/services/your-service
```

### Új Modul Létrehozása

```bash
ng generate module features/your-feature --routing
# vagy röviden
ng g m features/your-feature --routing
```

---

## 🧪 Tesztelés

### Unit Tesztek

```bash
ng test
# vagy coverage-el
ng test --code-coverage
```

### E2E Tesztek

```bash
ng e2e
```

---

## 📚 További Források

- [Angular Dokumentáció](https://angular.io/docs)
- [TypeScript Dokumentáció](https://www.typescriptlang.org/docs/)
- [RxJS Dokumentáció](https://rxjs.dev/)
- [SCSS Dokumentáció](https://sass-lang.com/documentation)

---

**SkillForge** - Professzionális Oktatási Menedzsment Rendszer 🎓✨

*Dokumentáció verzió: 1.0.0*
*Utolsó frissítés: 2026-01-16*
