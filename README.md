# Albrecht Sanitär – Website

Statische One-Page-Website für **Albrecht Sanitär Stuttgart** (Bad, Heizung, Sanitär, Kundendienst).
Reines HTML/CSS/JavaScript – kein Build-Schritt, keine Abhängigkeiten.

## Struktur

```
index.html            Seite (alle Abschnitte)
assets/css/main.css   Schriften, Animationen, responsive Regeln
assets/js/main.js     Bewertungs-Laufband (Drag, Trägheit, Auto-Scroll) + mobiles Menü
assets/fonts/         Archivo & Source Sans 3 (lokal gehostet, SIL OFL)
assets/img/logo.png   Logo
```

## Lokal ansehen

`index.html` einfach im Browser öffnen – oder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Veröffentlichen mit GitHub Pages

1. Repository anlegen und diese Dateien pushen.
2. *Settings → Pages → Build and deployment*: Source **Deploy from a branch**, Branch `main`, Ordner `/ (root)`.
3. Optional eigene Domain unter *Custom domain* eintragen und **Enforce HTTPS** aktivieren.

## Vor dem Livegang (TODO)

- [ ] **Impressum & Datenschutzerklärung** als eigene Seiten anlegen (Footer verlinkt aktuell noch auf die alte Website).
- [ ] **Kontaktformular** anbinden (z. B. Formspree, eigenes Backend) – derzeit nur Gestaltung.
- [ ] **Fotos** einsetzen: Platzhalter „Team / Firmengebäude“ im Hero.
- [ ] **Karte** einbinden – Google Maps nur nach Klick/Einwilligung laden (DSGVO).
- [ ] **Kundenstimmen**: Einverständnis der Verfasser einholen.
- [ ] **Karriere**: Stellenangebote prüfen/aktualisieren.
- [ ] Logo durch die Original-Vektordatei (SVG) ersetzen.

Schriften werden lokal ausgeliefert – es werden keine Daten an Google übertragen.
