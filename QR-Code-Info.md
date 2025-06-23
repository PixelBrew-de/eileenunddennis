# QR-Code Informationen für Hochzeitseinladungen

## Zugangsdaten für Gäste

Die Hochzeitswebsite ist durch HTTP Basic Authentication geschützt. Gäste benötigen diese Zugangsdaten:

### Option 1:
- **Benutzername**: `hochzeit`
- **Passwort**: `eillen2025`

### Option 2:
- **Benutzername**: `gast` 
- **Passwort**: `dennis2025`

### Option 3:
- **Benutzername**: `einladung`
- **Passwort**: `gutsonenberg`

## QR-Code Generierung

Für die Einladungskarten können Sie QR-Codes erstellen, die direkt zur Website mit den Anmeldedaten führen:

### URL Format:
```
https://[IHRE-DOMAIN]/
```

### QR-Code mit eingebetteten Zugangsdaten:
```
https://hochzeit:eillen2025@[IHRE-DOMAIN]/
```

## Anleitung für Gäste

Wenn Gäste den QR-Code scannen oder die Website besuchen, erscheint automatisch ein Login-Dialog mit dem Text:
**"Hochzeit Eillen & Dennis - Nur für eingeladene Gäste"**

Die Gäste geben dann einen der Benutzernamen und das dazugehörige Passwort ein.

## Sicherheitshinweise

- Die Zugangsdaten sind einfach gehalten, damit sie für alle Gäste leicht zu merken sind
- Sie können jederzeit weitere Zugangsdaten hinzufügen oder bestehende ändern
- Die Authentifizierung erfolgt über HTTPS (sichere Verbindung)