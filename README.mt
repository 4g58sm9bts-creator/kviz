# 📘 Hrvatski gramatika kviz

Moderni web kviz iz hrvatske gramatike za učenike od 5. do 8. razreda.

- 🎯 Fokus na gradivo hrvatskog jezika (gramatika)
- 🧠 Posebno naglašene nezavisnosložene rečenice za 8. razred
- 👨‍🏫 Učiteljski panel za dodavanje, uređivanje i brisanje pitanja
- 💾 Pitanja se spremaju u LocalStorage (ostaju nakon ponovnog otvaranja preglednika)
- 🎨 Modern School stil (responsive dizajn, prilagođeno za mobitel i računalo)

---

## 🚀 Funkcionalnosti

### Za učenike (index.html)

- Odabir razreda: **5., 6., 7. i 8. razred**
- Random poredak pitanja
- Vizualni **progress bar**
- Brojanje točnih odgovora
- Prikaz postotka i procijenjena **školska ocjena (1–5)**

### Za učitelja (admin.html)

- Dodavanje novih pitanja:
  - tekst pitanja
  - 3 ponuđena odgovora
  - odabir točnog odgovora
  - odabir razreda
- Uređivanje postojećih dodanih pitanja
- Brisanje pitanja
- Pregled pitanja po razredima

Početna (default) pitanja su "zaključana" – ne brišu se preko panela.

---

## 🗂 Struktura projekta

```text
hrvatski-gramatika-kviz/
│
├── index.html      # Kviz za učenike
├── admin.html      # Učiteljski panel
├── style.css       # Dizajn
├── script.js       # Logika kviza
├── admin.js        # Logika učiteljskog panela
├── README.md       # Dokumentacija
└── assets/
    ├── logo.png    # Logo kviza (po želji)
    └── favicon.ico # Favicon (po želji)
